function CustomerMarquee(t, i) {
  (i = i || {}),
    (this.outer = t),
    (this.inner = t.querySelector(".customerMarquee-wrapper")),
    (this.slides = t.querySelectorAll(".customerMarquee-item")),
    (this.cursor = t.querySelector(".drag-cursor")),
    (this.drag = i.drag || 0.1),
    (this.wheelDrag = i.wheelDrag || 0.1),
    (this.scrollSpeed = i.scrollSpeed || 0.4),
    (this.direction = i.direction || "right"),
    (this.autoScroll = i.autoScroll || !0),
    (this.mousePos = { x: 0, y: 0 }),
    (this.lastMousePos = null),
    (this.wheelX = null),
    (this.isHovered = !1),
    (this.dragOrigin = null),
    (this.dragComplete = !1),
    (this.targetVelocity =
      "right" === this.direction ? -this.scrollSpeed : this.scrollSpeed),
    (this.velocity = this.targetVelocity),
    (this.position = 0),
    (this.isTouch = !1),
    (this.createSlideDuplicates = function () {
      for (var t = 0; t < this.slides.length; t++) {
        var i = this.slides[t].cloneNode(!0);
        i.setAttribute("aria-hidden", !0), this.inner.appendChild(i);
      }
    }),
    (this.calculateWidth = function () {
      this.outer.setAttribute("style", "width:auto; transform: none;"),
        (this.sliderWidth = this.inner.getBoundingClientRect().width),
        (this.inner.style.width = this.sliderWidth + "px"),
        this.outer.setAttribute("style", "");
    }),
    this.createSlideDuplicates(),
    this.calculateWidth(),
    (this.ctas = t.querySelectorAll(".customerMarquee-item-link")),
    (this.step = function () {
      this.wheelX
        ? ((this.velocity += -this.wheelX), (this.wheelX = 0))
        : this.dragOrigin
        ? (this.position =
            this.mousePos.x - this.dragOrigin.mouseX + this.dragOrigin.position)
        : this.dragComplete &&
          ((this.dragComplete = !1),
          (this.velocity = this.mousePos.x - this.lastMousePos.x)),
        this.autoScroll
          ? (this.targetVelocity =
              this.velocity > 0 ? this.scrollSpeed : -this.scrollSpeed)
          : (this.targetVelocity = 0),
        (this.velocity =
          this.velocity * (1 - this.drag) + this.targetVelocity * this.drag),
        (this.position += this.velocity),
        this.position > 0 && (this.position -= this.sliderWidth / 2),
        this.position < -this.sliderWidth / 2 &&
          (this.position += this.sliderWidth / 2),
        this.isHovered &&
          (this.cursor.style.webkitTransform =
            "translate(" +
            Math.round(this.mousePos.x - 55) +
            "px, " +
            (this.mousePos.y - this.outer.getBoundingClientRect().top - 36) +
            "px)"),
        (this.inner.style.webkitTransform =
          "translate3d(" + Math.round(10 * this.position) / 10 + "px, 0, 0)"),
        (this.rafId = window.requestAnimationFrame(this.step));
    }.bind(this)),
    (this.rafId = window.requestAnimationFrame(this.step)),
    this.outer.addEventListener(
      "mouseenter",
      function () {
        this.isTouch || this.cursor.classList.add("-active"),
          (this.isHovered = !0),
          (this.dragOrigin = null);
      }.bind(this)
    ),
    this.outer.addEventListener(
      "mouseleave",
      function () {
        this.cursor.classList.remove("-active", "-down"),
          this.outer.classList.remove("-active"),
          (this.isHovered = !1),
          (this.dragOrigin = null);
      }.bind(this),
      !1
    ),
    this.outer.addEventListener(
      "mousedown",
      function (t) {
        this.isTouch || this.cursor.classList.add("-down"),
          this.outer.classList.add("-active"),
          (this.dragOrigin = { mouseX: t.clientX, position: this.position });
      }.bind(this)
    ),
    this.outer.addEventListener(
      "mouseup",
      function () {
        this.cursor.classList.remove("-down"),
          this.outer.classList.remove("-active"),
          (this.dragOrigin = null),
          (this.dragComplete = !0);
      }.bind(this)
    ),
    this.outer.addEventListener(
      "mousemove",
      function (t) {
        (this.lastMousePos = this.mousePos),
          (this.mousePos = { x: t.clientX, y: t.clientY });
      }.bind(this)
    ),
    this.outer.addEventListener(
      "wheel",
      function (t) {
        0 !== t.deltaX &&
          (t.preventDefault(), (this.wheelX = t.deltaX * this.wheelDrag));
      }.bind(this)
    );
  for (var s = 0; s < this.ctas.length; s++)
    this.ctas[s].addEventListener(
      "mouseenter",
      function (t) {
        t.stopPropagation(),
          this.isTouch || this.cursor.classList.remove("-active"),
          this.pauseAutoscroll();
      }.bind(this)
    ),
      this.ctas[s].addEventListener(
        "mouseleave",
        function () {
          this.isTouch || this.cursor.classList.add("-active"),
            this.playAutoscroll();
        }.bind(this)
      );
  this.outer.addEventListener(
    "touchstart",
    function (t) {
      (this.isTouch = !0),
        (this.lastMousePos = this.mousePos),
        (this.mousePos = {
          x: t.targetTouches[0].clientX,
          y: t.targetTouches[0].clientY,
        }),
        (this.dragOrigin = {
          mouseX: t.targetTouches[0].clientX,
          position: this.position,
        });
    }.bind(this)
  ),
    this.outer.addEventListener(
      "touchmove",
      function (t) {
        0 !== t.targetTouches[0].clientX &&
          ((this.lastMousePos = this.mousePos),
          (this.mousePos = {
            x: t.targetTouches[0].clientX,
            y: t.targetTouches[0].clientY,
          }));
      }.bind(this)
    ),
    this.outer.addEventListener(
      "touchend",
      function () {
        (this.dragOrigin = null), (this.dragComplete = !0);
      }.bind(this)
    ),
    window.addEventListener(
      "resize",
      function () {
        this.calculateWidth();
      }.bind(this)
    ),
    (this.playAutoscroll = function () {
      this.autoScroll = !0;
    }),
    (this.pauseAutoscroll = function () {
      this.autoScroll = !1;
    }),
    (this.play = function () {
      this.rafId || (this.rafId = window.requestAnimationFrame(this.step));
    }),
    (this.pause = function () {
      this.rafId &&
        (window.cancelAnimationFrame(this.rafId), (this.rafId = null));
    });
}
window.addEventListener("DOMContentLoaded", function () {
  if (!(window.marquees && window.marquees.length > 0)) {
    var t = document.getElementsByClassName("customerMarquee-row");
    window.marquees = [];
    for (var i = 0; i < t.length; i++)
      window.marquees.push(
        new CustomerMarquee(t[i], { direction: i % 2 == 0 ? "left" : "right" })
      );
  }
});
