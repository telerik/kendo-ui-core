(function() {
    var Popup = kendo.ui.Popup, div, anchor, popup;

    function round100(value) {
        return Math.round(value);
    }

    module("kendo.ui.Popup", {
        setup: function() {
            kendo.effects.disable();
            div = $("<div style='background:red'>popup</div>");
            anchor = $("<div style='background:blue;position:absolute;left:100px;top:100px;'>anchor</div>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            if (popup) {
                popup.destroy();
            }
            div.add(anchor).remove();
            kendo.effects.enable();
        }
    });

    test("updates zIndex based on anchor container property", function() {
        QUnit.fixture.css({ zIndex: 2, position: 'relative' });
        popup = new Popup(div, { anchor: anchor });

        popup.open();
        equal(div.parent().css("zIndex"), "12");
    });

    asyncTest("mousedown outside the element should close it", function(){
        div.kendoPopup( {
            anchor: anchor,
            close: function() {
                ok(true);
                start();
            }
        }).data("kendoPopup").open();

        popup = div.data("kendoPopup");

        $(document.documentElement).mousedown();
    });

    test("mousedown inside toggleTarget should not close the popup", function() {
        var closed = false;
        var MyPopup = Popup.extend( {
            close: function() {
                closed = true;
            }
        });

        popup = new MyPopup(div, {
            toggleTarget: anchor
        });

        anchor.mousedown();
        ok(!closed);
    });

    test("window.scroll does not close popup when hovered", function() {
        expect(1);
        popup = new Popup(div, {
            close: function() {
                ok(false);
            }
        });

        popup.open();
        div.mouseenter();

        $(window).scroll();

        ok(popup.visible());
    });

    test("window.scroll closes popup even when the active element is in it", function() {
        expect(1);

        div.append("<input />");

        popup = new Popup(div, {
            animation: false
        });

        popup.open();
        div.find("input").focus();

        $(window).scroll();

        ok(!popup.visible());
    });

    test("popup appends element to body", function() {
        div.kendoPopup();

        popup = div.data('kendoPopup');

        ok(div.parent().is("body"));
    });

    test("popup hides the element", function() {
        div.kendoPopup();

        popup = div.data('kendoPopup');

        ok(!div.is(":visible"));
    });

    asyncTest("open raises the open event", function() {
        div.kendoPopup( {
            open: function() {
                ok(true);
                start();
            }
        });

        popup = div.data('kendoPopup');
        div.data("kendoPopup").open();
    });

    test("open shows the element", function() {
        div.kendoPopup();
        popup = div.data('kendoPopup');

        div.data("kendoPopup").open();

        ok(div.is(":visible"));
    });

    test("open with coordinates skips alignment", function() {
        popup = div.kendoPopup().data("kendoPopup");

        popup.open(50, 50);

        ok(popup.wrapper.css("left") == "50px");
        ok(popup.wrapper.css("top") == "50px");
    });

    asyncTest("close triggers the close event", function() {
        div.kendoPopup( {
            close: function() {
                ok(true);
                start();
            }
        });
        popup = div.data('kendoPopup');

        div.show().data("kendoPopup").close();
    });

    asyncTest("close closes the element", function() {
        div.kendoPopup();
        popup = div.data('kendoPopup');

        div.show().data("kendoPopup").close();

        setTimeout(function(){
            start();
            ok(!div.is(":visible"));
        }, 400);
    });

    test("popup is made absolute", function() {
        div.kendoPopup();
        popup = div.data('kendoPopup');
        equal(div.css("position"), "absolute");
    });

    test("default popup origin is bottom left", function() {
        popup = new Popup(div, {
            animation: false,
            collision: "flip",
            anchor: anchor
        });

        equal(popup.options.origin, "bottom left");
    });

    test("default popup position is top left", function() {
        popup = new Popup(div, {
            animation: false,
            collision: "flip",
            anchor: anchor
        });

        equal(popup.options.position, "top left");
    });

    test("origin bottom and position top", function() {
        popup = new Popup(div, {
            animation: false,
            anchor: anchor,
            origin: "bottom left",
            collision: "none"
        });

        popup.open();
        equal(round100(div.parent().offset().top), round100(anchor.offset().top + anchor.outerHeight()));
    });

    test("origin bottom and position bottom", function() {
        popup = new Popup(div, {
            animation: false,
            collision: "flip",
            anchor: anchor,
            origin: "bottom left",
            position: "bottom left"
        });

        popup.open();
        equal(round100(div.parent().offset().top + div.outerHeight()), round100(anchor.offset().top + anchor.outerHeight()));
    });

    test("origin bottom and position center", function() {
        popup = new Popup(div, {
            animation: false,
            collision: "flip",
            anchor: anchor,
            origin: "bottom left",
            position: "center left"
        });

        popup.open();
        equal(round100(div.parent().offset().top + Math.round(div.outerHeight() / 2)), round100(anchor.offset().top + anchor.outerHeight()));
    });

    test("origin top and position top", function() {
        popup = new Popup(div, {
            animation: false,
            collision: "flip",
            anchor: anchor,
            origin: "top left"
        });

        popup.open();
        equal(round100(div.parent().offset().top), round100(anchor.offset().top), 2);
    });

    test("origin top and position bottom", function() {
        popup = new Popup(div, {
            animation: false,
            collision: "flip",
            anchor: anchor,
            origin: "top left",
            position: "bottom left"
        });

        scrollTo(0, anchor.offset().top);
        popup.open();
        scrollTo(0, 0);
        equal(round100(div.parent().offset().top) + Math.round(div.outerHeight()), round100(anchor.offset().top), 8);
    });

    test("origin top and position center", function() {
        popup = new Popup(div, {
            animation: false,
            collision: "flip",
            anchor: anchor,
            origin: "top left",
            position: "center left"
        });

        popup.open();
        equal(round100(div.parent().offset().top + Math.round(div.outerHeight() / 2)), round100(anchor.offset().top), 2);
    });

    test("origin center and position top", function() {
        popup = new Popup(div, {
            animation: false,
            collision: "flip",
            anchor: anchor,
            origin: "center left"
        });

        popup.open();
        equal(round100(div.parent().offset().top), Math.round(anchor.offset().top + round100(anchor.outerHeight() / 2 )), 2);
    });

    test("origin center and position bottom", function() {
        popup = new Popup(div, {
            animation: false,
            collision: "flip",
            anchor: anchor,
            origin: "center left",
            position: "bottom left"
        });

        popup.open();
        equal(round100(div.parent().offset().top + div.outerHeight()), round100(anchor.offset().top + Math.round(anchor.outerHeight() / 2 )), 2);
    });

    test("origin center and position center", function() {
        popup = new Popup(div, {
            animation: false,
            collision: "flip",
            anchor: anchor,
            origin: "center left",
            position: "center left"
        });

        popup.open();
        equal(round100(div.parent().offset().top + Math.round(div.outerHeight() / 2)), round100(anchor.offset().top + Math.round(anchor.outerHeight() / 2 )), 2);
    });

    test("origin left and position left", function() {
        popup = new Popup(div, {
            animation: false,
            collision: "flip",
            anchor: anchor,
            origin: "center left",
            position: "center left"
        });

        popup.open();

        equal(div.parent().offset().left, anchor.offset().left);
    });

    test("origin left and position right", function() {
        popup = new Popup(div, {
            animation: false,
            anchor: anchor,
            origin: "center left",
            position: "center right",
            collision: "none"
        });

        popup.open();

        equal(div.parent().offset().left + div.outerWidth(), anchor.offset().left);
    });

    test("origin left and position center", function() {
        popup = new Popup(div, {
            animation: false,
            collision: "flip",
            anchor: anchor,
            origin: "center left",
            position: "center center"
        });

        popup.open();

        equal(div.parent().offset().left + Math.round(div.outerWidth() / 2), anchor.offset().left);
    });

    test("origin right and position left", function() {
        popup = new Popup(div, {
            animation: false,
            collision: "none",
            anchor: anchor,
            origin: "center right",
            position: "center left"
        });

        popup.open();

        equal(div.parent().offset().left, anchor.offset().left + anchor.outerWidth());
    });

    test("origin right and position right", function() {
        popup = new Popup(div, {
            animation: false,
            collision: "flip",
            anchor: anchor,
            origin: "center right",
            position: "center right"
        });

        popup.open();

        equal(div.parent().offset().left + div.outerWidth(), anchor.offset().left + anchor.outerWidth());
    });

    test("origin right and position center", function() {
        popup = new Popup(div, {
            animation: false,
            collision: "flip",
            anchor: anchor,
            origin: "center right",
            position: "center center"
        });

        popup.open();

        equal(div.parent().offset().left + Math.round(div.outerWidth() / 2), anchor.offset().left + anchor.outerWidth());
    });

    test("origin center and position left", function() {
        popup = new Popup(div, {
            animation: false,
            collision: "flip",
            anchor: anchor,
            origin: "center center",
            position: "center left"
        });

        popup.open();

        equal(div.parent().offset().left, anchor.offset().left + Math.round(anchor.outerWidth() / 2));
    });

    test("origin center and position right", function() {
        popup = new Popup(div, {
            animation: false,
            collision: "flip",
            anchor: anchor,
            origin: "center center",
            position: "center right"
        });

        popup.open();

        equal(div.parent().offset().left + div.outerWidth(), anchor.offset().left + Math.round(anchor.outerWidth() / 2));
    });

    test("origin center and position center", function() {
        popup = new Popup(div, {
            animation: false,
            collision: "flip",
            anchor: anchor,
            origin: "center center",
            position: "center center"
        });

        popup.open();

        equal(div.parent().offset().left + Math.round(div.outerWidth() / 2), anchor.offset().left + Math.round(anchor.outerWidth() / 2));
    });

    test("toggleEvent is click by default", function() {
        popup = new Popup(div);

        equal(popup.options.toggleEvent, "click");
    });

    test("toggle opens closed popup", function() {
        popup = new Popup(div);

        popup.toggle();
        ok(div.is(":visible"));
    });

    asyncTest("toggle closes opened popup", function() {
        popup = new Popup(div, {
            close: function() {
                ok(true);
                start();
            }
        });

        div.show();
        popup.toggle();
    });

    asyncTest("triggering the toggleEvent on the toggleTarget toggles the popup", function() {
        var toggleTarget = $("<div />").appendTo(QUnit.fixture);
        popup = new Popup(div, {
            open: function() {
                ok(true);
                start();
            },
            toggleTarget: toggleTarget
        });

        toggleTarget.click();
    });

    test("update position of the popup on window.onresize", function() {
        var toggleTarget = $("<div />").appendTo(QUnit.fixture);

        var called = false,
            MyPopup = Popup.extend({
                _position: function() {
                    called = true;
                }
            });

        popup = new MyPopup(div, {
            animation: false,
            toggleTarget: toggleTarget
        });
        popup.open();
        $(window).trigger("resize");

        ok(called);
    });

    test("fit returns inverted position if position is negative", function() {
        popup = new Popup(div);
        equal(popup._fit(-42, 42, 42), 42);
    });

    test("fit returns offset if element does not fit in original position", function() {
        popup = new Popup(div);
        equal(popup._fit(42, 42, 42), -42);
    });

    test("fit if element does not fit in the original and new position", function() {
        popup = new Popup(div);
        equal(popup._fit(42, 24, 42), -24); // should return offset from the current position - in this case its size
    });

    test("collision is \"flip fit\" by default", function() {
        popup = new Popup(div);

        equal(popup.options.collision, "flip fit");
    });

    test("setting collision to false stops boundary detection", function() {
        popup = new Popup(div, { collision: false });

        ok($.isArray(popup.collisions));
        equal(popup.collisions.length, 0);
    });

    test("collision fit calls fit strategy when opened", function() {
        var argsCount,
            MyPopup = Popup.extend({
                _fit: function() {
                    argsCount = arguments.length;
                }
            });

        var toggleTarget = $("<div />").appendTo(QUnit.fixture);

        popup = new MyPopup(div, {
            animation: false,
            collision: "fit",
            toggleTarget: toggleTarget
        });
        popup.open();

        equal(argsCount, 3);
    });

    test("collision fit calls fit strategy for each settings", function() {
        var calledCount = 0,
            MyPopup = Popup.extend({
                _fit: function() {
                    calledCount++
                }
            });

        var toggleTarget = $("<div />").appendTo(QUnit.fixture);

        popup = new MyPopup(div, {
            animation: false,
            collision: "fit fit",
            toggleTarget: toggleTarget
        });
        popup.open();

        equal(calledCount, 2);
    });

    test("collision flip calls flip strategy when opened", function() {
        var argsCount,
            MyPopup = Popup.extend({
                _flip: function() {
                    argsCount = arguments.length;
                    return {top:0, left:0};
                }
            });

        var toggleTarget = $("<div />").appendTo(QUnit.fixture);
        popup = new MyPopup(div, {
            animation: false,
            collision: "flip",
            toggleTarget: toggleTarget
        });
        popup.open();

        equal(argsCount, 7);
    });

    test("collision flip calls flip strategy when opened horizontal", function() {
        var argsCount,
            MyPopup = Popup.extend({
                _flip: function() {
                    argsCount = arguments.length;
                    return {top:0, left:0};
                }
            });

        var toggleTarget = $("<div />").appendTo(QUnit.fixture);
        popup = new MyPopup(div, {
            animation: false,
            collision: "flip flip",
            toggleTarget: toggleTarget,
            origin: "top left",
            position: "top right"

        });
        popup.open();

        equal(argsCount, 7);
    });

    test("flip when element does not fit right should be position left", function() {
        popup = new Popup(div, {
            animation: false,
            collision: "flip"
        });

        var result = popup._flip(82, 42, 20, 100, "right", "left");

        equal(result, -62);
    });

    test("flip when element does not fit right and does not fit left should be position right", function() {

        popup = new Popup(div, {
            animation: false,
            collision: "flip"
        });

        var result = popup._flip(42, 42, 42, 60, "right", "left");

        equal(result, 0);
    });

    test("flip offset is not modified if position is center", function() {
        popup = new Popup(div, {
            animation: false,
            collision: "flip"
        });

        var result = popup._flip(30, 35, 35, 60, "center", "left");

        equal(result, 0);
    });

    test("flip offset is not modified if origin is center", function() {
        popup = new Popup(div, {
            animation: false,
            collision: "flip"
        });

        var result = popup._flip(30, 35, 35, 60, "left", "center");

        equal(result, 0);
    });

    test("flip offset is not modified if origin and position have same value", function() {
        popup = new Popup(div, {
            animation: false,
            collision: "flip"
        });

        var result = popup._flip(30, 35, 35, 60, "left", "left");

        equal(result, 0);
    });

    test("flip when element does not fit bellow should be position at the top", function() {

        popup = new Popup(div, {
            animation: false,
            collision: "flip"
        });

        var result = popup._flip(82, 42, 20, 100, "bottom", "top");

        equal(result, -62);
    });

    test("flip when element does not fit bellow and above should be position bellow", function() {
        popup = new Popup(div, {
            animation: false,
            collision: "flip"
        });

        var result = popup._flip(42, 42, 42, 60, "bottom", "top");

        equal(result, 0);
    });

    test("open adds active state to parent state changers", function() {
        anchor.append("<div class=\"k-dropdown-wrap\"></div><div class=\"k-link\"></div>");
        popup = new Popup(div, {
            anchor: anchor
        });

        popup.open();
        ok(anchor.children().hasClass("k-state-active"));
    });

    test("gets biggest zindex if sibling container does not have zIndex", function() {
        var anchor = $("<div style='background:blue'>anchor</div>").appendTo($("<div />").appendTo(QUnit.fixture));
        anchor.wrap('<div style="z-index:2; position: relative;" />');

        popup = new Popup(div, { anchor: anchor });
        popup.open();

        ok(div.parent().css("zIndex") > 2);
    });

    test("copy font styles from anchor", function() {
        anchor.css("font-size", "1rem");
        anchor.css("font-family", "Serif");
        anchor.css("font-style", "italic");

        popup = new Popup(div, { anchor: anchor });
        popup.open();

        equal(anchor.css("font-size"), div.css("font-size"));
        equal(anchor.css("font-family"), div.css("font-family"));
        equal(anchor.css("font-style"), div.css("font-style"));
    });

    asyncTest("re-position on resize", function() {
        popup = new Popup(div, { anchor: anchor });
        popup.open();

        stub(popup, {
            _position: popup._position
        });

        $(window).trigger("resize");
        setTimeout(function() {
            start();
            equal(popup.calls("_position"), 1);
        }, 100);
    });
})();
