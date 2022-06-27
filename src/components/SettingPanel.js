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
        this.props.onClose();
    }
    render() {
        return (
            <div
                className={
                    this.props.show
                        ? "offcanvas offcanvas-end show"
                        : "offcanvas offcanvas-end"
                }
                tabindex="-1"
                id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel"
                style={{ visibility: "visible" }}
            >
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasExampleLabel">
                        Setting
                    </h5>
                    <button
                        type="button"
                        class="btn-close text-reset"
                        onClick={this.handleClose}
                    ></button>
                </div>
                <div class="offcanvas-body">
                    <form>
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
                    </form>
                </div>
            </div>
        );
    }
}

export { SettingPanel };
