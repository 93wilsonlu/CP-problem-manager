import React from "react";

class InputBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textbox_url: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ textbox_url: event.target.value });
    }
    handleSubmit(event) {
        if (this.state.textbox_url !== "") {
            this.props.onSubmit(this.state.textbox_url);
        }
        event.preventDefault();
    }
    render() {
        return (
            <form
                className="d-flex justify-content-center align-items-center mb-2"
                onSubmit={this.handleSubmit}
            >
                <input
                    type="text"
                    className="form-control form-control-sm me-2"
                    value={this.state.textbox_url}
                    onChange={this.handleChange}
                />
                <button type="submit" className="btn btn-sm btn-primary">
                    Add
                </button>
            </form>
        );
    }
}

export { InputBox };
