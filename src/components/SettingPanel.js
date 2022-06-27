/*global chrome*/
import React from "react";

class SettingPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            codeforces_username: "",
            refresh_count: 10,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        chrome.storage.sync.get(
            ["codeforces_username", "refresh_count"],
            (obj) => {
                this.setState(obj);
            }
        );
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    handleClose() {
        chrome.storage.sync.set(this.state, () => {});
    }
    render() {
        return (
            <div
                className="offcanvas offcanvas-end"
                tabindex="-1"
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
            >
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasRightLabel">
                        Setting
                    </h5>
                    <button
                        type="button"
                        class="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                        onClick={this.handleClose}
                    ></button>
                </div>
                <div class="offcanvas-body">
                    <div class="mb-3">
                        <label for="codeforces-username" class="form-label">
                            Codeforces username
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="codeforces-username"
                            name="codeforces_username"
                            onChange={this.handleChange}
                            value={this.state.codeforces_username}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="refresh-count" class="form-label">
                            Refresh count
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="refresh-count"
                            name="refresh_count"
                            onChange={this.handleChange}
                            value={this.state.refresh_count}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export { SettingPanel };
