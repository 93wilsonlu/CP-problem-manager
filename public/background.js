/*global chrome*/
chrome.runtime.onInstalled.addListener(() => {
    console.log("Chrome extension successfully installed!");
    chrome.storage.sync.set({
        codeforces_username: "",
        refresh_count: 10,
        problem_list: [],
    });
});

const fetchCodeforces = async () => {
    let { codeforces_username, refresh_count, problem_list } =
        await chrome.storage.sync.get([
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
                let url = `https://codeforces.com/${
                    submission.problem.contestId > 100000 ? "gym" : "contest"
                }/${submission.problem.contestId}/problem/${
                    submission.problem.index
                }`;
                let index = problem_list.findIndex(
                    (problem) => problem.url === url
                );
                if (index === -1) {
                    problem_list.push({
                        id: +new Date(),
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
            await chrome.storage.sync.set({ problem_list: problem_list });
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
