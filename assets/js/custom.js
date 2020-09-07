$(document).ready(function () {
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 200) {
      $(".siteHeader").addClass("-is-scrolling");
    } else {
      $(".siteHeader").removeClass("-is-scrolling");
    }
  });
  $("#navigation__dropdown-toggle-why-instavideo").click(function () {
    $(".siteHeader").toggleClass("-dropdown-active");
    $(this)
      .siblings()
      .find(".navigation__dropdown__section")
      .addClass("-active");
  });
});
