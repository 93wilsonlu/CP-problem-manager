import React from "react";

class CheckDeleteWindow extends React.Component {
    render() {
        return (
            <div
                class="modal fade"
                id="deleteModal"
                tabindex="-1"
                aria-labelledby="deleteModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog modal-dialog-centered justify-content-center">
                    <div class="modal-content w-75">
                        <div class="modal-header">
                            <h6 class="modal-title" id="deleteModalLabel">
                                Are you sure you want to delete this problem?
                            </h6>
                            <button
                                type="button"
                                class="btn-close btn-sm"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-sm btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                class="btn btn-sm btn-danger"
                                data-bs-dismiss="modal"
                                onClick={this.props.handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export { CheckDeleteWindow };
