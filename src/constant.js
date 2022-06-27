const Status = Object.freeze({
    Solved: Symbol("Solved"),
    Practicing: Symbol("Practicing"),
    Unsolved: Symbol("Unsolved"),
    Reviewing: Symbol("Reviewing"),
});

class Problem {
    constructor(name, url, status) {
        this.id = +new Date();
        this.name = name;
        this.url = url;
        this.status = status;
    }
}

export { Problem, Status };
