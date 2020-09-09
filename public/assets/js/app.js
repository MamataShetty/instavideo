!(function (e) {
  var t = e(window),
    a = e(document),
    i = {
      updateLeftNav: function (t) {
        var a = e(".sidebar li"),
          i = e(".sidebar li a[data-filter='" + t + "']");
        a.removeClass("-is-active"), i.parent().addClass("-is-active");
      },
      updateUrl: function (e) {
        var t = { currentCategory: e };
        history.pushState(t, "", window.location.pathname + "?category=" + e);
      },
      filterCategory: function (t) {
        for (
          var a = e(
              ".filterable .app:not([data-app-category*='" + t + "']:visible)"
            ),
            r = e(".filterable .app[data-app-category*='" + t + "']:hidden"),
            o = document.querySelectorAll(".sidebar-anchor"),
            l = [],
            n = 0;
          n < o.length;
          n++
        )
          o[n].getAttribute("data-filter") &&
            (l[n] = o[n].getAttribute("data-filter"));
        console.log(l);
        console.log(t);
        l.indexOf(t) >= 0 &&
          (i.updateLeftNav(t), i.updateUrl(t), a.hide(), r.show());
      },
    };
  t.on("load", function () {
    // var t = AsanaHelpers.getParameterByName("category");
    // t &&
    //   (i.filtercategory(t),
    //   e("html, body").animate(
    //     { scrollTop: e("#directory").offset().top - 350 },
    //     500
    //   ));
  }),
    a.ready(function () {
      var t = e(".sidebar li a"),
        a = e(".sidebar-select"),
        r = e(".appsCarousel"),
        o = e("#sticky");
      t.on("click tap", function () {
        var t = e(this).data("filter");
        i.filterCategory(t);
      }),
        a.on("change", function () {
          var t = e(this).find(":selected").val();
          i.filterCategory(t);
        }),
        r.slick({
          autoplay: !0,
          autoplaySpeed: 5e3,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: !0,
          dots: !0,
          draggable: !1,
          centerMode: !0,
          centerPadding: "22%",
          responsive: [
            {
              breakpoint: 960,
              settings: {
                autoplay: !1,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: !1,
                centerPadding: "16px",
              },
            },
          ],
        }),
        o.sticky({ topSpacing: 50, bottomSpacing: 0 }),
        t.click(function () {
          document.getElementById("apps-directory-scroll-to").scrollIntoView();
        });
    });
})(jQuery);
