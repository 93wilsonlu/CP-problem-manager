/* eslint-disable jsx-a11y/anchor-is-valid */
/*global chrome*/
import "./App.css";
import React from "react";
import { List } from "./components/List";
import { SettingPanel } from "./components/SettingPanel";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            problem_list: [],
            is_refreshing: false,
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdateStatus = this.handleUpdateStatus.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        chrome.storage.sync.get(["problem_list"], (obj) => {
            this.setState(obj);
        });
    }
    handleDelete(id) {
        let problem_list = this.state.problem_list.filter(
            (problem) => problem.id !== id
        );
        this.setState({
            problem_list: problem_list,
        });
        chrome.storage.sync.set({ problem_list: problem_list }, () => {
            console.log("Deleted problems");
        });
    }
    handleUpdateStatus(id, status) {
        if (status === "Delete") {
        } else {
            let problem_list = this.state.problem_list;
            let index = problem_list.findIndex((problem) => problem.id === id);
            console.log(problem_list[index].name, status)
            problem_list[index].status = status;
            this.setState({
                problem_list: problem_list,
            });
            chrome.storage.sync.set({ problem_list: problem_list }, () => {
                console.log("Updated problem Status");
            });
        }
    }
    async handleRefresh() {
        this.setState({ is_refreshing: true });
        let response = await chrome.runtime.sendMessage({ message: "REFRESH" });
        if (response === "OK") {
            let { problem_list } = await chrome.storage.sync.get([
                "problem_list",
            ]);
            this.setState({
                problem_list: problem_list,
            });
        }
        this.setState({ is_refreshing: false });
    }
    render() {
        let refresh_icon = this.state.is_refreshing ? (
            <i className="bi bi-check text-success"></i>
        ) : (
            <a href="#" onClick={this.handleRefresh}>
                <i className="bi bi-arrow-clockwise"></i>
            </a>
        );
        return (
            <div className="container my-2">
                <div className="d-flex justify-content-between align-items-center mb-1">
                    <h2>Problems manager</h2>
                    <a
                        data-bs-toggle="offcanvas"
                        href="#offcanvasRight"
                        role="button"
                        aria-controls="offcanvasRight"
                    >
                        <i class="bi bi-gear-fill"></i>
                    </a>
                </div>
                <List
                    problem_list={this.state.problem_list}
                    handleUpdateStatus={this.handleUpdateStatus}
                />
                <div className="d-flex justify-content-evenly align-items-center mb-1">
                    {refresh_icon}
                    <a
                        href="https://github.com/93wilsonlu/cp-problem-manager"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Github
                    </a>
                </div>
                <SettingPanel />
            </div>
        );
    }
}

export default App;
