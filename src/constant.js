const Style = {
    Solved: { backgroundColor: "#198754", borderColor: "#198754" },
    Practicing: { backgroundColor: "#ffc107", borderColor: "#ffc107" },
    Unsolved: { backgroundColor: "#f8f9fa", borderColor: "#212529" },
    Reviewing: { backgroundColor: "#212529", borderColor: "#212529" },
};

class Problem {
    constructor(name, url, status) {
        this.id = +new Date();
        this.name = name;
        this.url = url;
        this.status = status;
    }
}

export { Problem, Style };
