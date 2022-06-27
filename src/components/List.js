import React from "react";
import { ListItem } from "./ListItem";

class List extends React.Component {
    render() {
        return (
            <ul id="filter-list" className="list-group list-group-flush mb-2">
                {this.props.problem_list.map((problem) => (
                    <ListItem
                        key={problem.id}
                        problem={problem}
                        handleDelete={this.props.handleDelete}
                    />
                ))}
            </ul>
        );
    }
}

export { List };
