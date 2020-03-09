//OFF-CANVAS MENU_______________________________________________________________________
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0%";
}

//hamburger menu
// Look for .hamburger
var hamburger = document.querySelector(".hamburger");
// On click
hamburger.addEventListener("click", function () {
  // Toggle class "is-active"
  hamburger.classList.toggle("is-active");
  if (hamburger.className == "hamburger hamburger--collapse is-active") {
    openNav();
  } else {
    closeNav();
  }
});

//Plus minus toggle script
$(function() {
    $('.plus-minus-toggle').on('click', function() {
      $(this).toggleClass('collapsed');
    });
  });

  function toggleDocs(event) {
    if (event.target && event.target.className == 'plus-minus-toggle' || event.target && event.target.className == 'plus-minus-toggle collapsed') {

        var next = event.target.nextElementSibling;


        if (next.style.display == "none") {
            next.style.display = "block";

        } else {
            next.style.display = "none";
        }
    }
}

document.addEventListener('click', toggleDocs, true);

//goback method
function goBack() {
  window.history.back();
}