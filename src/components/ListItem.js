/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Style } from "../constant";

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
                <div class="dropdown">
                    <button
                        type="button"
                        class="btn dropdown-toggle rounded-circle p-2"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={Style[this.props.problem.status]}
                    ></button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                            <a
                                class="dropdown-item"
                                href="#"
                                onClick={() =>
                                    this.props.handleUpdateStatus(
                                        this.props.problem.id,
                                        "Unsolved"
                                    )
                                }
                            >
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Unsolved
                            </a>
                        </li>
                        <li>
                            <a
                                class="dropdown-item"
                                href="#"
                                onClick={() =>
                                    this.props.handleUpdateStatus(
                                        this.props.problem.id,
                                        "Practicing"
                                    )
                                }
                            >
                                <i class="bi bi-code-slash text-warning"></i>{" "}
                                Practicing
                            </a>
                        </li>
                        <li>
                            <a
                                class="dropdown-item"
                                href="#"
                                onClick={() =>
                                    this.props.handleUpdateStatus(
                                        this.props.problem.id,
                                        "Solved"
                                    )
                                }
                            >
                                <i class="bi bi-check text-success"></i> Solved
                            </a>
                        </li>
                        <li>
                            <a
                                class="dropdown-item"
                                href="#"
                                onClick={() =>
                                    this.props.handleUpdateStatus(
                                        this.props.problem.id,
                                        "Reviewing"
                                    )
                                }
                            >
                                <i class="bi bi-eye-fill"></i> Reviewing
                            </a>
                        </li>
                        <li>
                            <a
                                class="dropdown-item"
                                href="#"
                                onClick={() =>
                                    this.props.handleUpdateStatus(
                                        this.props.problem.id,
                                        "Delete"
                                    )
                                }
                            >
                                <i class="bi bi-trash text-danger"></i> Delete
                            </a>
                        </li>
                    </ul>
                </div>
            </li>
        );
    }
}

export { ListItem };
