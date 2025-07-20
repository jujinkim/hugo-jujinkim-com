function initialize() {
    loadSlot(document.getElementById('jujin'));
    //loadSlot(document.getElementById('bio'));
    loadSlot(document.getElementById('career'));
    loadSlot(document.getElementById('project'));
    loadSlot(document.getElementById('exp'));
    loadSlot(document.getElementById('link'));

    setTheme();
}

function loadSlot(elem) {
    //get page url
    let xhttp = new XMLHttpRequest();
    switch(elem.id) {
        case 'jujin' :
            xhttp.open('GET', 'pages/jujin.html', true);
        break;
        // case 'bio' :
        //     xhttp.open('GET', 'pages/bio.html', true);
        // break;
        case 'career' :
            xhttp.open('GET', 'pages/career.html', true);
        break;
        case 'exp' :
            xhttp.open('GET', 'pages/exp.html', true);
        break;
        case 'project' :
            xhttp.open('GET', 'pages/project.html', true);
        break;
        case 'link' :
            xhttp.open('GET', 'pages/link.html', true);
        break;
    }

    //push page when loaded
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState === 4) {
            elem.innerHTML = xhttp.responseText;
        }
        //hide loading
        // let loading = document.getElementById("loading");
        // loading.classList.remove("show");
        // loading.classList.add("hide");
    }
    
    //load page
    xhttp.send();
}

function setTheme() {
    const hour = new Date().getHours();
    let themeName;

    const urlStr = window.location.search.toString();
    if (urlStr.includes("mystic")) {
        themeName = "rosegold";
    }
    else {
        try {
            // Try to get theme from user's preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                themeName = "dark";
            } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                themeName = "light";
            } else {
                throw new Error("Unable to read user's preferred theme");
            }
            console.log(`Set ${themeName} theme by user's preference`);

        } catch (e) {
            // Fail to get theme from user's preference, set theme based on time
            if (hour >= 7 && hour <= 19) {
                // Day, Light
                themeName = "light";
            } else {
                // Night, Dark
                themeName = "dark";
            }
            console.log(`Set ${themeName} theme by time`);
        }   
    }

    document.body.classList.add(themeName);
}

/**
 * When buttons on navigation bar clicked
 */
function navButton_OnClick(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

/**
 * When the document is scrolled
 */
let navElem;
window.onscroll = function() {
    if (document.body.clientWidth < 1024) {
        // ignore mobile
        return;
    }

    if (navElem == null) {
        navElem = document.getElementById("nav");
    }

    let scrollTop = window.scrollY;
    navElem.style.marginTop = scrollTop + 20 + 'px';
}
