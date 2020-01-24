function getPopup() {
    return document.body.getElementsByClassName("popup")[0].cloneNode(true);
}

function sleep(ms) {
    if (ms > 0) return new Promise(resolve => setTimeout(resolve, ms));
}

function getSleepTime(i) {
    return 3 * (numPopups - i + 1) * baseSleep / (2 * numPopups);
}

async function display() {
    var p, left;
    const win98 = document.body;
    const dynamic = document.getElementById("dynamic");

    while (dynamic.firstChild) dynamic.removeChild(dynamic.firstChild);
    win98.style.visibility = "hidden";
    await sleep(getSleepTime(0));

    win98.style.visibility = "visible";
    await sleep(getSleepTime(1));

    for (var i = 0; i < numPopups - 1; i++) {
        p = getPopup();
        dynamic.appendChild(p);

        left = getComputedStyle(p).getPropertyValue("margin-left");
        p.style.marginLeft = parseInt(left, 10) + 10 * (i + 1);

        await sleep(getSleepTime(i + 2));
    }

    if (baseSleep > 99) await display();
}

function run() {
    const urlParams = new URLSearchParams(window.location.search);

    numPopups = parseInt(urlParams.get("n"), 10) || 1;
    baseSleep = parseInt(urlParams.get("T"), 10) || 0;

    if (numPopups > 0) display();
}

var baseSleep, numPopups;
window.onload = run;
