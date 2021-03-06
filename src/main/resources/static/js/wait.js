/*
 waitMe - 1.14 [20.11.15]
 Author: vadimsva
 Github: https://github.com/vadimsva/waitMe
 */
(function(b) {
    b.fn.waitMe = function(p) {
        return this.each(function() {
            var h = b(this), z, v, e, w = !1, t = "background-color", q = "", r = "", x, f, d, c, y, m = {init: function() {
                    function A(a) {
                        u.css({top: "auto", transform: "translateY(" + a + "px) translateZ(0)"})
                    }
                    c = b.extend({effect: "bounce", text: "", bg: "rgba(255,255,255,0.7)", color: "#000", sizeW: "", sizeH: "", source: "", onClose: function() {
                        }}, p);
                    y = (new Date).getMilliseconds();
                    x = b('<div class="waitMe" data-waitme_id="' + y + '"></div>');
                    var a = "width:" + c.sizeW + ";height:" + c.sizeH;
                    switch (c.effect) {
                        case "none":
                            e =
                                    0;
                            break;
                        case "bounce":
                            e = 3;
                            f = "";
                            d = a;
                            break;
                        case "rotateplane":
                            e = 1;
                            f = "";
                            d = a;
                            break;
                        case "stretch":
                            e = 5;
                            f = "";
                            d = a;
                            break;
                        case "orbit":
                            e = 2;
                            f = a;
                            d = "";
                            break;
                        case "roundBounce":
                            e = 12;
                            f = a;
                            d = "";
                            break;
                        case "win8":
                            e = 5;
                            w = !0;
                            d = f = a;
                            break;
                        case "win8_linear":
                            e = 5;
                            w = !0;
                            f = a;
                            d = "";
                            break;
                        case "ios":
                            e = 12;
                            f = a;
                            d = "";
                            break;
                        case "facebook":
                            e = 3;
                            f = "";
                            d = a;
                            break;
                        case "rotation":
                            e = 1;
                            t = "border-color";
                            f = "";
                            d = a;
                            break;
                        case "timer":
                            e = 2;
                            var g = b.isArray(c.color) ? c.color[0] : c.color;
                            q = "border-color:" + g;
                            f = a;
                            d = "";
                            break;
                        case "pulse":
                            e = 1;
                            t = "border-color";
                            f = "";
                            d = a;
                            break;
                        case "progressBar":
                            e = 1;
                            f = "";
                            d = a;
                            break;
                        case "bouncePulse":
                            e = 3;
                            f = "";
                            d = a;
                            break;
                        case "img":
                            e = 1, f = "", d = a
                    }
                    "" === c.sizeW && "" === c.sizeH && (f = d = "");
                    "" !== f && "" !== q && (q = ";" + q);
                    if (0 < e) {
                        v = b('<div class="waitMe_progress ' + c.effect + '"></div>');
                        if ("img" == c.effect)
                            r = '<img src="' + c.source + '" style="' + d + '">';
                        else
                            for (a = 1; a <= e; ++a)
                                b.isArray(c.color) ? (g = c.color[a], void 0 == g && (g = "#000")) : g = c.color, r = w ? r + ('<div class="waitMe_progress_elem' + a + '" style="' + d + '"><div style="' + t + ":" + g + '"></div></div>') : r + ('<div class="waitMe_progress_elem' +
                                        a + '" style="' + t + ":" + g + ";" + d + '"></div>');
                        v = b('<div class="waitMe_progress ' + c.effect + '" style="' + f + q + '">' + r + "</div>")
                    }
                    c.text && (g = b.isArray(c.color) ? c.color[0] : c.color, z = b('<div class="waitMe_text" style="color:' + g + '">' + c.text + "</div>"));
                    var l = h.find("> .waitMe");
                    l && l.remove();
                    g = b('<div class="waitMe_content"></div>');
                    g.append(v, z);
                    x.append(g);
                    "HTML" == h[0].tagName && (h = b("body"));
                    h.addClass("waitMe_container").attr("data-waitme_id", y).append(x);
                    var l = h.find("> .waitMe"), u = h.find(".waitMe_content");
                    l.css({background: c.bg});
                    u.css({marginTop: -u.outerHeight() / 2 + "px"});
                    if (h.outerHeight() > b(window).height()) {
                        var g = b(window).scrollTop(), k = u.outerHeight(), n = h.offset().top, m = h.outerHeight(), a = g - n + b(window).height() / 2;
                        0 > a && (a = Math.abs(a));
                        0 <= a - k && a + k <= m ? n - g > b(window).height() / 2 && (a = k) : a = g > n + m - k ? g - n - k : g - n + k;
                        A(a);
                        b(document).scroll(function() {
                            var a = b(window).scrollTop() - n + b(window).height() / 2;
                            0 <= a - k && a + k <= m && A(a)
                        })
                    }
                    l.on("destroyed", function() {
                        if (c.onClose && b.isFunction(c.onClose))
                            c.onClose();
                        l.trigger("close")
                    });
                    b.event.special.destroyed =
                            {remove: function(a) {
                                    a.handler && a.handler()
                                }};
                    return l
                }, hide: function() {
                    var b = h.attr("data-waitme_id");
                    h.removeClass("waitMe_container").removeAttr("data-waitme_id");
                    h.find('.waitMe[data-waitme_id="' + b + '"]').remove()
                }};
            if (m[p])
                return m[p].apply(this, Array.prototype.slice.call(arguments, 1));
            if ("object" === typeof p || !p)
                return m.init.apply(this, arguments)
        })
    };
    b(window).load(function() {
        b("body.waitMe_body").addClass("hideMe");
        setTimeout(function() {
            b("body.waitMe_body").find(".waitMe_container:not([data-waitme_id])").remove();
            b("body.waitMe_body").removeClass("waitMe_body hideMe")
        }, 200)
    })
})(jQuery);