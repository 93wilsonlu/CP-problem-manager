/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

class ListItem extends React.Component {
    render() {
        return (
            <li className="list-group-item d-flex py-1">
                <a
                    href={this.props.problem.url}
                    className="text-break me-auto text-decoration-none"
                    target="_blank"
                    rel="noreferrer"
                >
                    {this.props.problem.name}
                </a>
            </li>
        );
    }
}

export { ListItem };
