document.addEventListener('DOMContentLoaded', function () {
    var hamburger = document.querySelector('.hamburger');
    var navList = document.querySelector('.nav-list');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close the menu when a nav link is clicked
    var navLinks = document.querySelectorAll('.nav-list ul li a');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });
});



// slide show transtions 

var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 5000); // Change image every 3 seconds
}




// newsfeed 

function fetchNewsFeed() {
    var rssFeedUrl = "https://feeds.bbci.co.uk/news/world/rss.xml";

    fetch(rssFeedUrl)
        .then(response => response.text())
        .then(data => {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(data, "text/xml");
            var items = xmlDoc.querySelectorAll("item");

            var newsList = document.getElementById("news-list");
            items.forEach(item => {
                var title = item.querySelector("title").textContent;
                var link = item.querySelector("link").textContent;
                var listItem = document.createElement("li");
                var anchor = document.createElement("a");
                anchor.textContent = title;
                anchor.href = link;
                listItem.appendChild(anchor);
                newsList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching news feed:', error));
}

window.onload = fetchNewsFeed;