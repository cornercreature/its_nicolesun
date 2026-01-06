// Get current page number from the URL
function getCurrentPageNumber() {
    const path = window.location.pathname;
    const match = path.match(/page(\d+)\.html/);
    return match ? parseInt(match[1]) : null;
}

function checkIndex(){
    const match = window.location.pathname.match(/index.html/);
    return match ? true : false;
}

// Navigate to the next page
function goToNextPage() {
    const currentPage = getCurrentPageNumber();
    const isIndex = checkIndex();
    if (currentPage == null && isIndex == true) {
        window.location.href = `page2.html`;
    }

    else if (currentPage !== null && currentPage < 51) {
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