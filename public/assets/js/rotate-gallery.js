function RotatingGallery() {
  var e = document.querySelector(".rotatingGallery"),
    t = e
      .querySelector(".rotatingGallery-slides")
      .querySelectorAll(".rotatingGallery-slide"),
    i = t.length,
    s = r(function () {
      var e = l(),
        s = e.currentRight,
        n = e.currentCenter,
        r = e.currentLeft;
      t[s].classList.remove("moving-slide", "fade-in-right", "fade-in-left"),
        t[n].classList.remove("moving-slide", "fade-in-right", "fade-in-left"),
        t[r].classList.remove("fade-in-right", "fade-in-right");
      var c = s > 0 ? s - 1 : i - 1,
        o = c > 0 ? c - 1 : i - 1,
        f = o > 0 ? o - 1 : i - 1;
      t[c].classList.add("moving-slide"),
        t[o].classList.add("moving-slide"),
        t[f].classList.add("fade-in-left"),
        a(s, n, r, c, o, f),
        d();
    }, 750),
    n = r(function () {
      var e = l(),
        s = e.currentRight,
        n = e.currentCenter,
        r = e.currentLeft;
      t[r].classList.remove("moving-slide", "fade-in-right", "fade-in-left"),
        t[n].classList.remove("moving-slide", "fade-in-right", "fade-in-left"),
        t[s].classList.remove("moving-slide", "fade-in-right", "fade-in-left");
      var c = r < i - 1 ? r + 1 : 0,
        o = c < i - 1 ? c + 1 : 0,
        f = o < i - 1 ? o + 1 : 0;
      t[c].classList.add("moving-slide"),
        t[o].classList.add("moving-slide"),
        t[f].classList.add("fade-in-right"),
        a(s, n, r, f, o, c),
        d();
    }, 750);
  function r(e, t) {
    return function (i) {
      var s = this.lastCall;
      (this.lastCall = Date.now()),
        (void 0 === s || this.lastCall - s > t) && e(i);
    };
  }
  function d() {
    var i = l().currentCenter,
      s = t[i].offsetHeight;
    e.style.paddingBottom = s + "px";
  }
  function l() {
    return {
      currentRight:
        parseInt(
          document.querySelector(".right-slide").getAttribute("data-index")
        ) - 1,
      currentCenter:
        parseInt(
          document.querySelector(".center-slide").getAttribute("data-index")
        ) - 1,
      currentLeft:
        parseInt(
          document.querySelector(".left-slide").getAttribute("data-index")
        ) - 1,
    };
  }
  function a(e, i, r, d, l, a) {
    t[e].classList.remove("right-slide"),
      t[d].classList.add("right-slide"),
      t[e].removeEventListener("click", n),
      t[d].addEventListener("click", n),
      t[i].classList.remove("center-slide"),
      t[l].classList.add("center-slide"),
      t[r].classList.remove("left-slide"),
      t[a].classList.add("left-slide"),
      t[r].removeEventListener("click", s),
      t[a].addEventListener("click", s);
  }
  return (
    window.addEventListener("resize", function () {
      d();
    }),
    t[0].classList.add("center-slide"),
    t[1].classList.add("right-slide"),
    t[i - 1].classList.add("left-slide"),
    t[1].addEventListener("click", n),
    t[i - 1].addEventListener("click", s),
    void d()
  );
}
window.addEventListener("load", function () {
  new RotatingGallery();
});
