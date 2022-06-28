import React from "react";
import { ListItem } from "./ListItem";

class List extends React.Component {
    render() {
        return (
            <ul
                className="list-group list-group-flush mb-2 overflow-auto"
                style={{ height: "250px" }}
            >
                {this.props.problem_list.map((problem) => (
                    <ListItem
                        key={problem.id}
                        problem={problem}
                        handleUpdateStatus={this.props.handleUpdateStatus}
                        handleDelete={this.props.handleDelete}
                    />
                ))}
            </ul>
        );
    }
}

export { List };
