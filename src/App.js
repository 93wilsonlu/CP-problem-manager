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
            show_setting: false,
        };
        this.deleteProblem = this.deleteProblem.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.toggleSettingPanel = this.toggleSettingPanel.bind(this);
        chrome.storage.sync.get(["problem_list"], (obj) => {
            this.setState(obj);
        });
    }
    deleteProblem(id) {
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
    toggleSettingPanel() {
        this.setState({
            show_setting: !this.state.show_setting,
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
                    <a href="#" onClick={this.toggleSettingPanel}>
                        <i class="bi bi-gear-fill"></i>
                    </a>
                </div>
                <List
                    problem_list={this.state.problem_list}
                    handleDelete={this.deleteProblem}
                />
                <div className="d-flex justify-content-evenly align-items-center mb-1">
                    {refresh_icon}
                    <a
                        href="https://github.com/93wilsonlu/cp-problem-manager"
                        class="text-decoration"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Github
                    </a>
                </div>
                <SettingPanel
                    show={this.state.show_setting}
                    onClose={this.toggleSettingPanel}
                />
            </div>
        );
    }
}

export default App;
