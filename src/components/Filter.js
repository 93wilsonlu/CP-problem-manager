/*global chrome*/
import React from "react";
import { Style } from "../constant";

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_text: "",
            Solved: true,
            Practicing: true,
            Unsolved: true,
            Reviewing: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        chrome.storage.local.get(["filter"], (obj) => {
            this.setState(obj.filter);
        });
    }
    handleChange(event) {
        this.setState({
            [event.target.name]:
                event.target.type === "checkbox"
                    ? event.target.checked
                    : event.target.value,
        });
    }
    handleSubmit(event) {
        chrome.storage.local.set({ filter: this.state }, () => {});
        this.props.onSubmit(this.state);
        event.preventDefault();
    }
    render() {
        let checkboxes = Object.keys(Style).map((status) => (
            <div class="form-check form-check-inline" key={status}>
                <input
                    class="form-check-input"
                    type="checkbox"
                    id={status + "-checkbox"}
                    name={status}
                    checked={this.state[status]}
                    onChange={this.handleChange}
                />
                <label class="form-check-label" for={status + "-checkbox"}>
                    {status}
                </label>
            </div>
        ));
        return (
            <div class="accordion mb-2" id="accordionPanelsExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panels-headingOne">
                        <button
                            class="accordion-button collapsed py-2 bg-light"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panels-collapseOne"
                            aria-expanded="false"
                            aria-controls="panels-collapseOne"
                        >
                            Filter
                        </button>
                    </h2>
                    <div
                        id="panels-collapseOne"
                        class="accordion-collapse collapse"
                        aria-labelledby="panels-headingOne"
                        data-bs-parent="accordionPanelsExample"
                    >
                        <div class="accordion-body p-3">
                            <form onSubmit={this.handleSubmit}>
                                <input
                                    type="text"
                                    className="form-control form-control-sm me-2 mb-1"
                                    value={this.state.search_text}
                                    name="search_text"
                                    onChange={this.handleChange}
                                />
                                <div className="mb-1">{checkboxes}</div>
                                <button
                                    type="submit"
                                    className="btn btn-sm btn-primary"
                                >
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export { Filter };
