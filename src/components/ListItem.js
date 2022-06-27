import React from "react";

class ListItem extends React.Component {
    render() {
        return (
            <li className="list-group-item d-flex justify-content-between py-1">
                <a
                    href={this.props.problem.url}
                    className="text-break"
                    target="_blank"
                    rel="noreferrer"
                >
                    {this.props.problem.name}
                </a>
                <button
                    className="btn btn-sm"
                    onClick={() =>
                        this.props.handleDelete(this.props.problem.id)
                    }
                >
                    <i className="bi bi-trash-fill"></i>
                </button>
            </li>
        );
    }
}

export { ListItem };
