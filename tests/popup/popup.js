(function() {
    var Popup = kendo.ui.Popup, div, anchor, popup;

    function round100(value) {
        return Math.round(value);
    }

    describe("kendo.ui.Popup", function() {
        beforeEach(function() {

            div = $("<div style='background:red'>popup</div>");
            anchor = $("<div style='background:blue;position:absolute;left:100px;top:100px;'>anchor</div>").appendTo($("#qunit-fixture"));
        });
        afterEach(function() {
            if (popup) {
                popup.destroy();
            }
            div.add(anchor).remove();

        });

        it("updates zIndex based on anchor container property", function() {
            $("#qunit-fixture").css({ zIndex: 2, position: 'relative' });
            popup = new Popup(div, { anchor: anchor });

            popup.open();
            assert.equal(div.parent().css("zIndex"), "12");
        });

        it("mousedown outside the element should close it", function() {
            popup = new Popup(div, {
                anchor: anchor,
                close: function() {
                    assert.isOk(true);
                }
            });

            popup.open();

            $(document.documentElement).mousedown();
        });

        it("mousedown inside toggleTarget should not close the popup", function() {
            var closed = false;
            var MyPopup = Popup.extend({
                close: function() {
                    closed = true;
                }
            });

            popup = new MyPopup(div, {
                toggleTarget: anchor
            });

            anchor.mousedown();
            assert.isOk(!closed);
        });

        it("window.scroll does not close popup when hovered", function() {
            expect(1);
            popup = new Popup(div, {
                close: function() {
                    assert.isOk(false);
                }
            });

            popup.open();
            div.mouseenter();

            $(window).scroll();

            assert.isOk(popup.visible());
        });

        it("window.scroll closes popup even when the active element is in it", function() {
            expect(1);

            div.append("<input />");

            popup = new Popup(div, {
                animation: false
            });

            popup.open();
            div.find("input").focus();

            $(window).scroll();

            assert.isOk(!popup.visible());
        });

        it("do not fall in infinitive loop when window.scroll during close", function() {
            expect(1);
            popup = new Popup(div, {
                close: function() {
                    $(window).scroll();
                }
            });

            popup.open();
            popup.close();

            assert.isOk(!popup.visible());
        });

        it("popup appends element to body", function() {
            div.kendoPopup();

            popup = div.data('kendoPopup');

            assert.isOk(div.parent().is("body"));
        });

        it("popup hides the element", function() {
            div.kendoPopup();

            popup = div.data('kendoPopup');

            assert.isOk(!div.is(":visible"));
        });

        it("open raises the open event", function(done) {
            div.kendoPopup({
                open: function() {
                    assert.isOk(true);
                    done();
                }
            });

            popup = div.data('kendoPopup');
            div.data("kendoPopup").open();
        });

        it("open shows the element", function() {
            div.kendoPopup();
            popup = div.data('kendoPopup');

            div.data("kendoPopup").open();

            assert.isOk(div.is(":visible"));
        });

        it("open with coordinates skips alignment", function() {
            popup = div.kendoPopup().data("kendoPopup");

            popup.open(50, 50);

            assert.isOk(popup.wrapper.css("left") == "50px");
            assert.isOk(popup.wrapper.css("top") == "50px");
        });

        it("close triggers the close event", function(done) {
            div.kendoPopup({
                close: function() {
                    assert.isOk(true);
                    done();
                }
            });
            popup = div.data('kendoPopup');

            div.show().data("kendoPopup").close();
        });

        it("close closes the element", function(done) {
            div.kendoPopup();
            popup = div.data('kendoPopup');

            div.show().data("kendoPopup").close();

            setTimeout(function() {
                assert.isOk(!div.is(":visible"));
                done();
            }, 400);
        });

        it("popup close(true) hides wrapper", function() {
            popup = div.kendoPopup().data("kendoPopup");

            popup.open();
            popup.close(true);

            assert.equal(popup.wrapper.css("display"), "none");
        });

        it("popup is made absolute", function() {
            div.kendoPopup();
            popup = div.data('kendoPopup');
            assert.equal(div.css("position"), "absolute");
        });

        it("default popup origin is bottom left", function() {
            popup = new Popup(div, {
                animation: false,
                collision: "flip",
                anchor: anchor
            });

            assert.equal(popup.options.origin, "bottom left");
        });

        it("default popup position is top left", function() {
            popup = new Popup(div, {
                animation: false,
                collision: "flip",
                anchor: anchor
            });

            assert.equal(popup.options.position, "top left");
        });

        it("origin bottom and position top", function() {
            popup = new Popup(div, {
                animation: false,
                anchor: anchor,
                origin: "bottom left",
                collision: "none"
            });

            popup.open();
            assert.equal(round100(div.parent().offset().top), round100(anchor.offset().top + anchor.outerHeight()));
        });

        it("origin bottom and position bottom", function() {
            popup = new Popup(div, {
                animation: false,
                collision: "flip",
                anchor: anchor,
                origin: "bottom left",
                position: "bottom left"
            });

            popup.open();
            assert.equal(round100(div.parent().offset().top + div.outerHeight()), round100(anchor.offset().top + anchor.outerHeight()));
        });

        it("origin bottom and position center", function() {
            popup = new Popup(div, {
                animation: false,
                collision: "flip",
                anchor: anchor,
                origin: "bottom left",
                position: "center left"
            });

            popup.open();
            assert.equal(round100(div.parent().offset().top + Math.round(div.outerHeight() / 2)), round100(anchor.offset().top + anchor.outerHeight()));
        });

        it("origin top and position top", function() {
            popup = new Popup(div, {
                animation: false,
                collision: "flip",
                anchor: anchor,
                origin: "top left"
            });

            popup.open();
            assert.equal(round100(div.parent().offset().top), round100(anchor.offset().top), 2);
        });

        it("origin top and position bottom", function() {
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
            assert.equal(round100(div.parent().offset().top) + Math.round(div.outerHeight()), round100(anchor.offset().top), 8);
        });

        it("origin top and position center", function() {
            popup = new Popup(div, {
                animation: false,
                collision: "flip",
                anchor: anchor,
                origin: "top left",
                position: "center left"
            });

            popup.open();
            assert.equal(round100(div.parent().offset().top + Math.round(div.outerHeight() / 2)), round100(anchor.offset().top), 2);
        });

        it("origin center and position top", function() {
            popup = new Popup(div, {
                animation: false,
                collision: "flip",
                anchor: anchor,
                origin: "center left"
            });

            popup.open();
            assert.equal(round100(div.parent().offset().top), Math.round(anchor.offset().top + round100(anchor.outerHeight() / 2)), 2);
        });

        it("origin center and position bottom", function() {
            popup = new Popup(div, {
                animation: false,
                collision: "flip",
                anchor: anchor,
                origin: "center left",
                position: "bottom left"
            });

            popup.open();
            assert.equal(round100(div.parent().offset().top + div.outerHeight()), round100(anchor.offset().top + Math.round(anchor.outerHeight() / 2)), 2);
        });

        it("origin center and position center", function() {
            popup = new Popup(div, {
                animation: false,
                collision: "flip",
                anchor: anchor,
                origin: "center left",
                position: "center left"
            });

            popup.open();
            assert.equal(round100(div.parent().offset().top + Math.round(div.outerHeight() / 2)), round100(anchor.offset().top + Math.round(anchor.outerHeight() / 2)), 2);
        });

        it("origin left and position left", function() {
            popup = new Popup(div, {
                animation: false,
                collision: "flip",
                anchor: anchor,
                origin: "center left",
                position: "center left"
            });

            popup.open();

            assert.equal(div.parent().offset().left, anchor.offset().left);
        });

        it("origin left and position right", function() {
            popup = new Popup(div, {
                animation: false,
                anchor: anchor,
                origin: "center left",
                position: "center right",
                collision: "none"
            });

            popup.open();

            assert.equal(div.parent().offset().left + div.outerWidth(), anchor.offset().left);
        });

        it("origin left and position center", function() {
            popup = new Popup(div, {
                animation: false,
                collision: "flip",
                anchor: anchor,
                origin: "center left",
                position: "center center"
            });

            popup.open();

            assert.equal(div.parent().offset().left + Math.round(div.outerWidth() / 2), anchor.offset().left);
        });

        it("origin right and position left", function() {
            popup = new Popup(div, {
                animation: false,
                collision: "none",
                anchor: anchor,
                origin: "center right",
                position: "center left"
            });

            popup.open();

            assert.closeTo(div.parent().offset().left, anchor.offset().left + anchor.outerWidth(), 0.1);
        });

        it("origin right and position right", function() {
            popup = new Popup(div, {
                animation: false,
                collision: "flip",
                anchor: anchor,
                origin: "center right",
                position: "center right"
            });

            popup.open();

            assert.closeTo(div.parent().offset().left + div.outerWidth(), anchor.offset().left + anchor.outerWidth(), 0.1);
        });

        it("origin right and position center", function() {
            popup = new Popup(div, {
                animation: false,
                collision: "flip",
                anchor: anchor,
                origin: "center right",
                position: "center center"
            });

            popup.open();

            assert.closeTo(div.parent().offset().left + Math.round(div.outerWidth() / 2), anchor.offset().left + anchor.outerWidth(), 0.1);
        });

        it("origin center and position left", function() {
            popup = new Popup(div, {
                animation: false,
                collision: "flip",
                anchor: anchor,
                origin: "center center",
                position: "center left"
            });

            popup.open();

            assert.equal(div.parent().offset().left, anchor.offset().left + Math.round(anchor.outerWidth() / 2));
        });

        it("origin center and position right", function() {
            popup = new Popup(div, {
                animation: false,
                collision: "flip",
                anchor: anchor,
                origin: "center center",
                position: "center right"
            });

            popup.open();

            assert.equal(div.parent().offset().left + div.outerWidth(), anchor.offset().left + Math.round(anchor.outerWidth() / 2));
        });

        it("origin center and position center", function() {
            popup = new Popup(div, {
                animation: false,
                collision: "flip",
                anchor: anchor,
                origin: "center center",
                position: "center center"
            });

            popup.open();

            assert.equal(div.parent().offset().left + Math.round(div.outerWidth() / 2), anchor.offset().left + Math.round(anchor.outerWidth() / 2));
        });

        it("position method updates popup position", function() {
            popup = new Popup(div, {
                animation: false,
                collision: "flip",
                anchor: anchor,
                origin: "bottom left"
            });

            popup.open();
            popup.setOptions({
                origin: "top left"
            });

            popup.position();

            assert.equal(round100(div.parent().offset().top), round100(anchor.offset().top), 2);
        });

        it("toggleEvent is click by default", function() {
            popup = new Popup(div);

            assert.equal(popup.options.toggleEvent, "click");
        });

        it("toggle opens closed popup", function() {
            popup = new Popup(div);

            popup.toggle();
            assert.isOk(div.is(":visible"));
        });

        it("toggle closes opened popup", function(done) {
            popup = new Popup(div, {
                close: function() {
                    assert.isOk(true);
                    done();
                }
            });

            div.show();
            popup.toggle();
        });

        it("triggering the toggleEvent on the toggleTarget toggles the popup", function(done) {
            var toggleTarget = $("<div />").appendTo($("#qunit-fixture"));
            popup = new Popup(div, {
                open: function() {
                    assert.isOk(true);
                    done();
                },
                toggleTarget: toggleTarget
            });

            toggleTarget.click();
        });

        it("update position of the popup on window.onresize", function() {
            var toggleTarget = $("<div />").appendTo($("#qunit-fixture"));

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

            assert.isOk(called);
        });

        it("fit returns inverted position if position is negative", function() {
            popup = new Popup(div);
            assert.equal(popup._fit(-42, 42, 42), 42);
        });

        it("fit returns offset if element does not fit in original position", function() {
            popup = new Popup(div);
            assert.equal(popup._fit(42, 42, 42), -42);
        });

        it("fit if element does not fit in the original and new position", function() {
            popup = new Popup(div);
            assert.equal(popup._fit(42, 24, 42), -24); // should return offset from the current position - in this case its size
        });

        it("collision is \"flip fit\" by default", function() {
            popup = new Popup(div);

            assert.equal(popup.options.collision, "flip fit");
        });

        it("setting collision to false stops boundary detection", function() {
            popup = new Popup(div, { collision: false });

            assert.isOk($.isArray(popup.collisions));
            assert.equal(popup.collisions.length, 0);
        });

        it("collision fit calls fit strategy when opened", function() {
            var argsCount,
                MyPopup = Popup.extend({
                    _fit: function() {
                        argsCount = arguments.length;
                    }
                });

            var toggleTarget = $("<div />").appendTo($("#qunit-fixture"));

            popup = new MyPopup(div, {
                animation: false,
                collision: "fit",
                toggleTarget: toggleTarget
            });
            popup.open();

            assert.equal(argsCount, 3);
        });

        it("collision fit calls fit strategy for each settings", function() {
            var calledCount = 0,
                MyPopup = Popup.extend({
                    _fit: function() {
                        calledCount++
                    }
                });

            var toggleTarget = $("<div />").appendTo($("#qunit-fixture"));

            popup = new MyPopup(div, {
                animation: false,
                collision: "fit fit",
                toggleTarget: toggleTarget
            });
            popup.open();

            assert.equal(calledCount, 2);
        });

        it("collision flip calls flip strategy when opened", function() {
            var argsCount,
                MyPopup = Popup.extend({
                    _flip: function() {
                        argsCount = arguments.length;
                        return { top: 0, left: 0 };
                    }
                });

            var toggleTarget = $("<div />").appendTo($("#qunit-fixture"));
            popup = new MyPopup(div, {
                animation: false,
                collision: "flip",
                toggleTarget: toggleTarget
            });
            popup.open();

            assert.equal(argsCount, 7);
        });

        it("collision flip calls flip strategy when opened horizontal", function() {
            var argsCount,
                MyPopup = Popup.extend({
                    _flip: function() {
                        argsCount = arguments.length;
                        return { top: 0, left: 0 };
                    }
                });

            var toggleTarget = $("<div />").appendTo($("#qunit-fixture"));
            popup = new MyPopup(div, {
                animation: false,
                collision: "flip flip",
                toggleTarget: toggleTarget,
                origin: "top left",
                position: "top right"

            });
            popup.open();

            assert.equal(argsCount, 7);
        });

        it("flip when element does not fit right should be position left", function() {
            popup = new Popup(div, {
                animation: false,
                collision: "flip"
            });

            var result = popup._flip(82, 42, 20, 100, "right", "left");

            assert.equal(result, -62);
        });

        it("flip when element does not fit right and does not fit left should be position right", function() {

            popup = new Popup(div, {
                animation: false,
                collision: "flip"
            });

            var result = popup._flip(42, 42, 42, 60, "right", "left");

            assert.equal(result, 0);
        });

        it("flip offset is not modified if position is center", function() {
            popup = new Popup(div, {
                animation: false,
                collision: "flip"
            });

            var result = popup._flip(30, 35, 35, 60, "center", "left");

            assert.equal(result, 0);
        });

        it("flip offset is not modified if origin is center", function() {
            popup = new Popup(div, {
                animation: false,
                collision: "flip"
            });

            var result = popup._flip(30, 35, 35, 60, "left", "center");

            assert.equal(result, 0);
        });

        it("flip offset is not modified if origin and position have same value", function() {
            popup = new Popup(div, {
                animation: false,
                collision: "flip"
            });

            var result = popup._flip(30, 35, 35, 60, "left", "left");

            assert.equal(result, 0);
        });

        it("flip when element does not fit bellow should be position at the top", function() {

            popup = new Popup(div, {
                animation: false,
                collision: "flip"
            });

            var result = popup._flip(82, 42, 20, 100, "bottom", "top");

            assert.equal(result, -62);
        });

        it("flip when element does not fit bellow and above should be position bellow", function() {
            popup = new Popup(div, {
                animation: false,
                collision: "flip"
            });

            var result = popup._flip(42, 42, 42, 60, "bottom", "top");

            assert.equal(result, 0);
        });

        it("open adds active state to parent state changers", function() {
            anchor.append("<div class=\"k-dropdown-wrap\"></div><div class=\"k-link\"></div>");
            popup = new Popup(div, {
                anchor: anchor
            });

            popup.open();
            assert.isOk(anchor.children().hasClass("k-state-active"));
        });

        it("gets biggest zindex if sibling container does not have zIndex", function() {
            var anchor = $("<div style='background:blue'>anchor</div>").appendTo($("<div />").appendTo($("#qunit-fixture")));
            anchor.wrap('<div style="z-index:2; position: relative;" />');

            popup = new Popup(div, { anchor: anchor });
            popup.open();

            assert.isOk(div.parent().css("zIndex") > 2);
        });

        it("copy font styles from anchor", function() {
            anchor.css("font-size", "1rem");
            anchor.css("font-family", "Serif");
            anchor.css("font-style", "italic");

            popup = new Popup(div, { anchor: anchor });
            popup.open();

            assert.equal(anchor.css("font-size"), div.css("font-size"));
            assert.equal(anchor.css("font-family"), div.css("font-family"));
            assert.equal(anchor.css("font-style"), div.css("font-style"));
        });

        it("add direction class to the anchor and popup", function() {
            anchor = $("<div style='background:blue;position:absolute;left:100px;top:100px;'><div class='k-dropdown-wrap'>anchor</div></div>").appendTo($("#qunit-fixture"));
            popup = new Popup(div, { anchor: anchor });
            popup.open();

            assert.equal(anchor.hasClass("k-state-border-down"), true);
            assert.equal(anchor.find(".k-dropdown-wrap").hasClass("k-state-border-down"), true);
            assert.equal(div.hasClass("k-state-border-up"), true);
        });

        it("removes direction class from the anchor and popup", function() {
            anchor = $("<div style='background:blue;position:absolute;left:100px;top:100px;'><div class='k-dropdown-wrap'>anchor</div></div>").appendTo($("#qunit-fixture"));
            popup = new Popup(div, { anchor: anchor });

            popup.open();
            popup.close();

            assert.equal(anchor.hasClass("k-state-border-down"), false);
            assert.equal(anchor.find(".k-dropdown-wrap").hasClass("k-state-border-down"), false);
            assert.equal(div.hasClass("k-state-border-up"), false);
        });

        it("calculate position correctly when content height is 'auto'", function() {
            popup = new Popup(div, { anchor: anchor });
            popup.open();

            popup.element[0].style.height = "auto";
            popup.wrapper[0].style.height = "auto";

            stub(popup, {
                _flip: popup._flip
            });

            popup.position();

            var flipArgs = popup.args("_flip");
            var elementHeight = flipArgs[1];
            var wrapperHeight = flipArgs[6];

            assert.equal(elementHeight, wrapperHeight);
        });

        it("re-position on resize", function(done) {
            popup = new Popup(div, { anchor: anchor });
            popup.open();

            stub(popup, {
                _position: popup._position
            });

            $(window).trigger("resize");
            setTimeout(function() {
                assert.equal(popup.calls("_position"), 1);
                done();
            }, 100);
        });

        it("re-positions if device orientation has changed", function(done) {
            var defaultResize = kendo.support.resize;
            kendo.support.resize = "orientationchange resize";

            popup = new Popup(div, { anchor: anchor });
            popup.open();

            stub(popup, {
                _position: popup._position
            });

            $(window).trigger("orientationchange");
            setTimeout(function() {
                assert.equal(popup.calls("_position"), 1);
                done();
            }, 100);

            kendo.support.resize = defaultResize;
        });

        it("exclude shadows during positioning", function() {
            var body = $(document.body);
            var defaultMargin = body.css("margin");
            var localAnchor = $("<div style='background:blue;'>anchor</div>").appendTo($("#qunit-fixture"));

            body.css("margin", 0);
            div.css("box-shadow", "0 2px 2px 0 rgba(0,0,0,.3)");

            popup = new Popup(div, { anchor: localAnchor });
            popup.open();

            assert.equal(localAnchor[0].getBoundingClientRect().left, div[0].getBoundingClientRect().left);

            body.css("margin", defaultMargin);
        });

        it("Add k-animation-container-sm class to the animation container", function() {
            popup = new Popup(div, { anchor: anchor });
            popup.element.css("width", "110vw");
            popup.open();

            var animationContainer = popup.wrapper;

            assert.isOk(animationContainer.hasClass("k-animation-container-sm"));
        });

        it("Remove k-animation-container-sm class from the animation container", function() {
            popup = new Popup(div, { anchor: anchor });
            popup.element.css("width", "110vw");
            popup.open();
            popup.close();
            popup.element.css("width", "10vw");
            popup.open();

            var animationContainer = popup.wrapper;

            assert.isOk(!animationContainer.hasClass("k-animation-container-sm"));
        });
    });

    var svgWrapper;

    describe("kendo.ui.Popup (multiple bodies)", function() {
        beforeEach(function() {

            var foreignObjectHtml = '<foreignObject width="100" height="50" requiredExtensions="http://www.w3.org/1999/xhtml"><body xmlns="http://www.w3.org/1999/xhtml"><h1>HTML Foreign Object</h1></body></foreignObject>';

            svgWrapper = $('<svg width="400px" height="300px" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"></svg>').appendTo(document.body);
            svgWrapper.append(foreignObjectHtml);

            div = $("<div style='background:red'>popup</div>");
            anchor = $("<div style='background:blue;position:absolute;left:100px;top:100px;'>anchor</div>").appendTo($("#qunit-fixture"));
        });
        afterEach(function() {
            if (popup) {
                popup.destroy();
            }

            div.add(anchor).remove();
            svgWrapper.remove();

        });

        it("appends to document.body", function() {
            popup = new Popup(div, { anchor: anchor });

            popup.open();

            assert.equal(div.closest("body")[0], document.body);
        });
    });
}());
