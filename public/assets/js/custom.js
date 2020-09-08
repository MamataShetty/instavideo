$(document).ready(function () {
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 200) {
      $(".siteHeader").addClass("-is-scrolling");
    } else {
      $(".siteHeader").removeClass("-is-scrolling");
    }
  });
  $(".navigation__link-toggle").click(function () {
    $(".siteHeader").toggleClass("-dropdown-active");
    console.log(
      $(this).siblings().find(".navigation__dropdown").addClass("-active")
    );
    $(this).next().toggleClass("-active");
    $(this)
      .siblings()
      .find(".navigation__dropdown__section")
      .toggleClass("-active");
  });
});
