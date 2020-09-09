$(document).ready(function () {
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 200) {
      $(".siteHeader").addClass("-is-scrolling");
    } else {
      $(".siteHeader").removeClass("-is-scrolling");
    }
  });

  $(".navigation__link-toggle").click(function (e) {
    $(".siteHeader").addClass("-dropdown-active");
    $(e.target).addClass("-active").removeClass("-active");
    const dropdownnmenu = $(e.target).parent().find(".navigation__dropdown");
    $(e.target)
      .parent()
      .siblings()
      .find(".navigation__dropdown__section")
      .removeClass("-active");
    $(e.target)
      .parent()
      .siblings()
      .find(".navigation__dropdown")
      .removeClass("-active");

    if (dropdownnmenu.hasClass("-active")) {
      dropdownnmenu.removeClass("-active");
    } else {
      dropdownnmenu.addClass("-active");
    }

    const submenu = $(e.target)
      .siblings()
      .find(".navigation__dropdown__section");
    if (submenu.hasClass("-active")) {
      submenu.removeClass("-active");
      $(".siteHeader").removeClass("-dropdown-active");
    } else {
      submenu.toggleClass("-active");
    }
  });

  $("#mobileNavToggle").click(function () {
    $(this).toggleClass("-active");
    $(".horizontalNavigation ").toggleClass("-active");
    // $(".siteHeader").toggleClass("-dropdown-active");
    document.getElementsByTagName("html")[0].classList.toggle("-no-scroll");
  });
});
