$(document).ready(function () {
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 200) {
      $(".siteHeader").addClass("-is-scrolling");
    } else {
      $(".siteHeader").removeClass("-is-scrolling");
    }
  });

  $(".navigation__link-toggle").click(function (event) {
    $(".siteHeader").addClass("-dropdown-active");
    updateMenu(event);
  });

  function updateMenu(e) {
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
  }

  $("#mobileNavToggle").click(function (e) {
    if ($(this).hasClass("-active")) {
      $(this).removeClass("-active");
      $(".horizontalNavigation ").removeClass("-active");
      $(e.target)
        .parents()
        .find(".navigation__dropdown")
        .removeClass("-active");
      console.log($(e.target).parents().find(".navigation__dropdown"));
      $(".siteHeader").removeClass("-dropdown-active");
    } else {
      $(this).addClass("-active");
      $(".horizontalNavigation ").addClass("-active");
      $(".siteHeader").addClass("-dropdown-active");
    }
    document.getElementsByTagName("html")[0].classList.toggle("-no-scroll");
  });
});
