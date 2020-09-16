
function onWindowScroll() {
	let sections = document.getElementsByClassName("uk-section"),
		slideshow = document.getElementById("slideshow"),
		navbar = document.getElementById("navbar"),
		slideshow_top = slideshow.getBoundingClientRect().top,
		top = null;

	// console.log(slideshow.getBoundingClientRect().top);

	if (slideshow_top == 0) {
		navbar.style.backgroundColor = "#0000007a";
	}else{
		navbar.style.backgroundColor = "#000000";
	}

	for (var i = 0; i < sections.length; i++) {
		top = sections[i].getBoundingClientRect().top;
		if (top > 0 && top < 160) {
			// console.log(sections[i].id);
			activateNavbarItem(sections[i].id);
		}
	}
}

function activateNavbarItem(item) {
	let navbarItems = document.getElementsByClassName("navbar-item");
	for (var i = navbarItems.length - 1; i >= 0; i--) {
		navbarItems[i].getElementsByTagName("hr")[0].style.display = "none";
	}
	if (document.getElementById("navbar-item-" + item))
		document.getElementById("navbar-item-" + item).getElementsByTagName("hr")[0].style.display = "block";
	document.getElementsByClassName("navbar-item-divider");
}


document.addEventListener('DOMContentLoaded', function () {
	if (UIkit.slideshow("#slideshow"))
		UIkit.slideshow("#slideshow").startAutoplay();

	if (UIkit.slider("#partenaires-slider"))
		UIkit.slider("#partenaires-slider").startAutoplay();

	if (UIkit.slider("#avis-slider"))
		UIkit.slider("#avis-slider").startAutoplay();
	
	document.querySelectorAll("#offcanvas-overlay .uk-offcanvas-bar .uk-nav li a").forEach(element => {
		element.addEventListener('click',  () => {
			UIkit.offcanvas("#offcanvas-overlay").hide();
		});
	});

	var body = document.getElementsByTagName("body")[0];
	body.onscroll = onWindowScroll;
	
	var navbarItems = document.getElementsByClassName("navbar-item");

	for (var i = navbarItems.length - 1; i >= 0; i--) {

		navbarItems[i].addEventListener('click', function () {

			let navbarItems = document.getElementsByClassName("navbar-item");
			for (var i = navbarItems.length - 1; i >= 0; i--) {
				navbarItems[i].getElementsByTagName("hr")[0].style.display = "none";
			}
			this.getElementsByTagName("hr")[0].style.display = "block";
			document.getElementsByClassName("navbar-item-divider");
		});
	}
});