/*global chrome*/
chrome.runtime.onInstalled.addListener(() => {
    console.log("Chrome extension successfully installed!");
    chrome.storage.local.set({
        codeforces_username: "",
        refresh_count: 10,
        problem_list: [],
    });
});

const fetchCodeforces = async () => {
    let { codeforces_username, refresh_count, problem_list } =
        await chrome.storage.local.get([
            "codeforces_username",
            "refresh_count",
            "problem_list",
        ]);
    if (codeforces_username !== "") {
        let response = await fetch(
            `https://codeforces.com/api/user.status?handle=${codeforces_username}&from=1&count=${refresh_count}`
        ).then((res) => res.json());
        if (response.status === "OK") {
            let submissions = response.result;
            for (let submission of submissions) {
                let url;
                if (submission.problem.contestId) {
                    if (submission.problem.contestId > 100000) {
                        url = `https://codeforces.com/gym/${submission.problem.contestId}/problem/${submission.problem.index}`;
                    } else {
                        url = `https://codeforces.com/contest/${submission.problem.contestId}/problem/${submission.problem.index}`;
                    }
                } else {
                    url = `https://codeforces.com/problemsets/acmsguru/problem/99999/${submission.problem.index}`;
                }
                let index = problem_list.findIndex(
                    (problem) => problem.url === url
                );
                if (index === -1) {
                    problem_list.push({
                        id: submission.id,
                        name: submission.problem.name,
                        url: url,
                        status: "Practicing",
                    });
                    index = problem_list.length - 1;
                }
                if (submission.verdict === "OK") {
                    problem_list[index].status = "Solved";
                }
            }
            await chrome.storage.local.set({ problem_list: problem_list });
            console.log("Sucessfully fetched!");
        } else {
            console.log("Fetch failed!");
        }
    }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Recieved message: " + request.message);
    if (request.message === "REFRESH") {
        fetchCodeforces().then(() => {
            sendResponse("OK");
        });
    }
    return true;
});
