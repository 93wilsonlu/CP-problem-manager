/* eslint-disable jsx-a11y/anchor-is-valid */
/*global chrome*/
import "./App.css";
import React from "react";
import { List } from "./components/List";
import { SettingPanel } from "./components/SettingPanel";
import { CheckDeleteWindow } from "./components/CheckDeleteWindow";
import { Filter } from "./components/Filter";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            problem_list: [],
            is_refreshing: false,
            want_delete_id: 0,
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleWantDelete = this.handleWantDelete.bind(this);
        this.handleUpdateStatus = this.handleUpdateStatus.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        chrome.storage.local.get(["problem_list"], (obj) => {
            this.setState(obj);
        });
    }
    handleDelete() {
        let problem_list = this.state.problem_list.filter(
            (problem) => problem.id !== this.state.want_delete_id
        );
        this.setState({
            problem_list: problem_list,
        });
        chrome.storage.local.set({ problem_list: problem_list }, () => {
            console.log("Deleted problems");
        });
    }
    handleWantDelete(id) {
        this.setState({
            want_delete_id: id,
        });
    }
    handleUpdateStatus(id, status) {
        let problem_list = this.state.problem_list;
        let index = problem_list.findIndex((problem) => problem.id === id);
        problem_list[index].status = status;
        this.setState({
            problem_list: problem_list,
        });
        chrome.storage.local.set({ problem_list: problem_list }, () => {
            console.log("Updated problem Status");
        });
    }
    async handleRefresh() {
        this.setState({ is_refreshing: true });
        let response = await chrome.runtime.sendMessage({ message: "REFRESH" });
        if (response === "OK") {
            let { problem_list } = await chrome.storage.local.get([
                "problem_list",
            ]);
            this.setState({
                problem_list: problem_list,
            });
        }
        this.setState({ is_refreshing: false });
    }
    async handleFilter(filter) {
        let { problem_list } = await chrome.storage.local.get(["problem_list"]);
        problem_list = problem_list.filter(
            (problem) =>
                problem.name.includes(filter.search_text) &&
                filter[problem.status]
        );
        this.setState({
            problem_list: problem_list,
        });
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
                <Filter onSubmit={this.handleFilter} />
                <List
                    problem_list={this.state.problem_list}
                    handleUpdateStatus={this.handleUpdateStatus}
                    handleDelete={this.handleWantDelete}
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
                <CheckDeleteWindow handleDelete={this.handleDelete} />
            </div>
        );
    }
}

export default App;
