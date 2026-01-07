// Get current page number from the URL
function getCurrentPageNumber() {
    const path = window.location.pathname;
    const match = path.match(/page(\d+)\.html/);
    return match ? parseInt(match[1]) : null;
}

function checkFirst(){
    const match = window.location.pathname.match(/first.html/);
    return match ? true : false;
}

// Navigate to the next page
function goToNextPage() {
    const currentPage = getCurrentPageNumber();
    const isFirst = checkFirst();
    if (currentPage == null && isFirst == true) {
        window.location.href = `page2.html`;
    }

    else if (currentPage !== null && currentPage < 55) {
        const nextPage = currentPage + 1;
        window.location.href = `page${nextPage}.html`;
    }
}

// Add click event to navigate to next page
window.addEventListener('click', function() {
    goToNextPage();
})

document.querySelectorAll('a').forEach(link => {
    link.hidden = true;
});

// Automatically go to the next page after 0.3ish second delay (comment out for click mode)
function setInterval() {setTimeout(function() {
    goToNextPage();
}, 300);}

window.addEventListener('load', setInterval);