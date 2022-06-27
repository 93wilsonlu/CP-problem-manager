import React from "react";

class SettingPage extends React.Component {
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
                        onClick={this.props.onClick}
                    ></button>
                </div>
                <div class="offcanvas-body">
                    <form>
                        <div class="mb-3">
                            <label for="cf-username" class="form-label">
                                Codeforces username
                            </label>
                            <input
                                type="text"
                                class="form-control"
                                id="cf-username"
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
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export { SettingPage };
