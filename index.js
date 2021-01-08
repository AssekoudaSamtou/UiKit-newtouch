
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



(function() {

if(!window.StyleFix) return;
if(hasxmldatauri()) return;
  
// Test unescaped XML data uri
function hasxmldatauri() {
  var img = new Image();
  datauri = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0 1,1" fill="#000"></svg>';
  img.src = datauri;
  return (img.width == 1 && img.height == 1);
}

StyleFix.register(function(css) {

  return css.replace(RegExp(/url\(\'data:image\/svg\+xml,(.*)\'\)/gi), function($0, svg) {
		return "url('data:image/svg+xml," + escape(svg) + "')";
	});
  
});

})();

/* Radial Gradient Syntax fix */
StyleFix.register(function(css, raw) {
	if (PrefixFree.functions.indexOf('radial-gradient') > -1) {
		css = css.replace(/radial-gradient\(([a-z-\s]+\s+)?at ([^,]+)(?=,)/g, function($0, shape, center){
			return 'radial-gradient(' + center + (shape? ', ' + shape : '');
		});
	}

	return css;
});