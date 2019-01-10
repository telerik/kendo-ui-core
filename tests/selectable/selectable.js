(function() {
    var Selectable = kendo.ui.Selectable,
        ul,
        SELECTED = "k-state-selected",
        ACTIVE = "k-state-selecting",
        SELECTABLE = "k-selectable",
        UNSELECTING = "k-state-unselecting";

    describe("kendo.ui.Selectable", function() {
        beforeEach(function() {
            ul = $("<ul><li>1</li><li>2</li><li>3</li></ul>").appendTo(Mocha.fixture);
            secondUL = $("<ul><li>11</li><li>21</li><li>31</li></ul>").appendTo(Mocha.fixture);

            $.fn.press = function(x, y, ctrlKey, metaKey) {
                return triggerEvent(this, "mousedown", {
                    pageX: x,
                    pageY: y,
                    ctrlKey: ctrlKey,
                    metaKey: metaKey
                });
            }

            $.fn.move = function(x, y, ctrlKey, metaKey) {
                return triggerEvent(this, "mousemove", {
                    pageX: x,
                    pageY: y,
                    ctrlKey: ctrlKey,
                    metaKey: metaKey
                });
            }

            $.fn.release = function(info) {
                info = $.extend({}, info);
                return triggerEvent(this, "mouseup", info);
            }

            $.fn.tap = function(info) {
                return triggerEvent(this, "click", info);
            }
        });
        afterEach(function() {
            ul.kendoSelectable("destroy");
            ul.remove();
            secondUL.remove();
            $(".k-marquee").remove();
        });

        function triggerEvent(element, type, info) {
            element.trigger($.Event(type, info));

            return element;
        };

        it("selectable class is applied on the element when initialized", function() {
            var selectable = new Selectable(ul);
            assert.isOk(ul.hasClass(SELECTABLE));
        });

        it("single selection does not attach the marquee", function() {
            var selectable = new Selectable(ul);

            ul.children().eq(0).press();
            assert.equal($(".k-marquee").length, 0);
        });

        it("multiple selection attach the marquee to the document", function() {
            var selectable = new Selectable(ul, { multiple: true });

            ul.children().eq(0).press().move(10, 10);
            assert.equal($(".k-marquee").length, 1);
        });

        it("element get selected on mouseup", function() {
            var selectable = new Selectable(ul);
            var selectee = $(ul.find(">li")[0]);

            selectee.tap();

            assert.isOk(selectee.hasClass(SELECTED));
        });

        it("unselect all previosly selected when select new element", function() {
            var selectable = new Selectable(ul);
            var selectees = ul.find(">li");

            selectees.eq(0).tap();
            selectees.eq(1).tap();

            assert.equal(selectees.eq(0).hasClass(SELECTED), false);
            assert.equal(selectees.eq(1).hasClass(SELECTED), true);
        });

        it("item is marked for selection on start", function() {
            var selectable = new Selectable(ul, { multiple: true });
            var selectee = ul.find(">li:first");
            var position = selectee.offset();

            selectee.press(0, 0).move(position.left, position.top).move(position.left + 1, position.top);

            assert.isOk(selectee.hasClass(ACTIVE));
        });

        it("moving over item marks it for selection", function() {
            var selectable = new Selectable(ul, { multiple: true });
            var selectees = ul.find(">li");
            var position = selectees.eq(1).offset();

            selectees.eq(0).press().move(position.left, position.top);

            assert.isOk(selectees.eq(0).hasClass(ACTIVE));
            assert.isOk(selectees.eq(1).hasClass(ACTIVE));
        });

        it("moving away from selectable item removes selection mark", function() {
            var selectable = new Selectable(ul, { multiple: true });
            var selectees = ul.find(">li");
            var position = selectees.eq(1).offset();

            selectees.eq(0).press(0, 0).move(position.left, position.top).move(position.left, position.top - 1);

            assert.isOk(selectees.eq(0).hasClass(ACTIVE));
            assert.isOk(!selectees.eq(1).hasClass(ACTIVE));
        });

        it("value returns all selected items", function() {
            var selectable = new Selectable(ul);
            var selectees = ul.find(">li");

            selectees.eq(0).tap();

            var values = selectable.value();

            assert.equal(values.length, 1);
            assert.isOk(values[0], selectees[0]);
        });

        it("multiple selection ctrlKey click on selected items does not unselects it", function() {
            var selectable = new Selectable(ul, { multiple: true });
            var selectees = ul.find(">li");

            selectees.eq(0).tap();
            selectees.eq(1).tap({ ctrlKey: true });

            assert.isOk(selectees.eq(0).hasClass(SELECTED));
            assert.isOk(selectees.eq(1).hasClass(SELECTED));
        });

        it("multiple selection metaKey click on selected items does not unselects it", function() {
            var selectable = new Selectable(ul, { multiple: true });
            var selectees = ul.find(">li");

            selectees.eq(0).tap();
            selectees.eq(1).tap({ metaKey: true });

            assert.isOk(selectees.eq(0).hasClass(SELECTED));
            assert.isOk(selectees.eq(1).hasClass(SELECTED));
        });

        it("single selection ctrlKey click on item when another is selected", function() {
            var selectable = new Selectable(ul);
            var selectees = ul.find(">li");

            selectees.eq(0).tap();
            selectees.eq(1).tap({ ctrlKey: true });

            assert.isOk(!selectees.eq(0).hasClass(SELECTED));
            assert.isOk(selectees.eq(1).hasClass(SELECTED));
        });

        it("single selection metaKey click on item when another is selected", function() {
            var selectable = new Selectable(ul);
            var selectees = ul.find(">li");

            selectees.eq(0).tap();
            selectees.eq(1).tap({ metaKey: true });

            assert.isOk(!selectees.eq(0).hasClass(SELECTED));
            assert.isOk(selectees.eq(1).hasClass(SELECTED));
        });

        it("single selection ctrlKey click on selected item unselects it", function() {
            var selectable = new Selectable(ul);
            var selectee = $(ul.find(">li")[0]);

            selectee.tap();
            selectee.tap({ ctrlKey: true });

            assert.isOk(!selectee.hasClass(SELECTED));
            assert.isOk(!selectee.hasClass(ACTIVE));
        });

        it("single selection metaKey click on selected item unselects it", function() {
            var selectable = new Selectable(ul);
            var selectee = $(ul.find(">li")[0]);

            selectee.tap();
            selectee.tap({ metaKey: true });

            assert.isOk(!selectee.hasClass(SELECTED));
            assert.isOk(!selectee.hasClass(ACTIVE));
        });

        it("multiple selection mousedown with ctrlKey on selected item persist selection", function() {
            var selectable = new Selectable(ul, { multiple: true });
            var selectee = $(ul.find(">li")[0]);

            selectee.tap();
            selectee.press(0, 0, true);

            assert.isOk(selectee.hasClass(SELECTED));
            assert.isOk(!selectee.hasClass(ACTIVE));
        });

        it("multiple selection mousedown with metaKey on selected item persist selection", function() {
            var selectable = new Selectable(ul, { multiple: true });
            var selectee = $(ul.find(">li")[0]);

            selectee.tap();
            selectee.press(0, 0, false, true);

            assert.isOk(selectee.hasClass(SELECTED));
            assert.isOk(!selectee.hasClass(ACTIVE));
        });

        it("multiple selection click on selected item with ctrlKey pressed unselect it", function() {
            var selectable = new Selectable(ul, { multiple: true });
            var selectee = $(ul.find(">li")[0]);

            selectee.addClass(SELECTED);
            selectee.tap({ ctrlKey: true });

            assert.isOk(!selectee.hasClass(SELECTED));
            assert.isOk(!selectee.hasClass(ACTIVE));
        });

        it("multiple selection click on selected item with metaKey pressed unselect it", function() {
            var selectable = new Selectable(ul, { multiple: true });
            var selectee = $(ul.find(">li")[0]);

            selectee.addClass(SELECTED);
            selectee.tap({ metaKey: true });

            assert.isOk(!selectee.hasClass(SELECTED));
            assert.isOk(!selectee.hasClass(ACTIVE));
        });

        it("moving after selected item with ctrlKey pressed", function() {
            var selectable = new Selectable(ul, { multiple: true }),
                firstSelectee = $(ul.find(">li")[0]),
                secondSelectee = $(ul.find(">li")[1]),
                position = secondSelectee.offset();

            firstSelectee.addClass(SELECTED);
            secondSelectee.addClass(SELECTED);

            firstSelectee.press(0, 0, true).move(position.left, position.top, true).move(position.left, position.top + 1, true);

            assert.isOk(firstSelectee.hasClass(SELECTED));
            assert.isOk(!secondSelectee.hasClass(ACTIVE));
            assert.isOk(!secondSelectee.hasClass(SELECTED));
        });

        it("moving after selected item with metaKey pressed", function() {
            var selectable = new Selectable(ul, { multiple: true }),
                firstSelectee = $(ul.find(">li")[0]),
                secondSelectee = $(ul.find(">li")[1]),
                position = secondSelectee.offset();

            firstSelectee.addClass(SELECTED);
            secondSelectee.addClass(SELECTED);

            firstSelectee.press(0, 0, false, true).move(position.left, position.top, false, true).move(position.left, position.top + 1, false, true);

            assert.isOk(firstSelectee.hasClass(SELECTED));
            assert.isOk(!secondSelectee.hasClass(ACTIVE));
            assert.isOk(!secondSelectee.hasClass(SELECTED));
        });

        it("moving back from selected item with ctrlKey pressed", function() {
            var selectable = new Selectable(ul, { multiple: true }),
                firstSelectee = $(ul.find(">li")[0]),
                secondSelectee = $(ul.find(">li")[1]),
                position = secondSelectee.offset();

            firstSelectee.addClass(SELECTED);
            secondSelectee.addClass(SELECTED);


            firstSelectee.press(0, 0, true).move(position.left, position.top, true).move(position.left, position.top - 1, true);


            assert.isOk(firstSelectee.hasClass(SELECTED));
            assert.isOk(!secondSelectee.hasClass(ACTIVE));
            assert.isOk(secondSelectee.hasClass(SELECTED));
            assert.isOk(!secondSelectee.hasClass(UNSELECTING));
        });

        it("moving back from selected item with metaKey pressed", function() {
            var selectable = new Selectable(ul, { multiple: true }),
                firstSelectee = $(ul.find(">li")[0]),
                secondSelectee = $(ul.find(">li")[1]),
                position = secondSelectee.offset();

            firstSelectee.addClass(SELECTED);
            secondSelectee.addClass(SELECTED);


            firstSelectee.press(0, 0, false, true).move(position.left, position.top, false, true).move(position.left, position.top - 1, false, true);


            assert.isOk(firstSelectee.hasClass(SELECTED));
            assert.isOk(!secondSelectee.hasClass(ACTIVE));
            assert.isOk(secondSelectee.hasClass(SELECTED));
            assert.isOk(!secondSelectee.hasClass(UNSELECTING));
        });

        it("select range between two selected elements when shift key is pressed", function() {
            var selectable = new Selectable(ul, { multiple: true }),
                firstSelectee = $(ul.find(">li")[0]),
                secondSelectee = $(ul.find(">li")[2]);

            firstSelectee.addClass(SELECTED);
            secondSelectee.tap({ shiftKey: true });

            var selected = selectable.value();
            assert.equal(selected.length, 3);
        });

        it("select range when no item selected with shift key pressed select from first selectable", function() {
            var selectable = new Selectable(ul, { multiple: true }),
                selectee = $(ul.find(">li")[2]);

            selectee.tap({ shiftKey: true });

            var selected = selectable.value();
            assert.equal(selected.length, 3);
        });

        it("selectRange when start element is in oposite order in the DOM", function() {
            var selectable = new Selectable(ul, { multiple: true }),
                start = ul.find(">li")[1],
                end = ul.find(">li")[0];

            selectable.selectRange(start, end);
            var selected = selectable.value();
            assert.equal(selected.length, 2);
        });

        it("shift and click clears selected items outside the selected range", function() {
            var selectable = new Selectable(ul, { multiple: true }),
                selectees = ul.find(">li");

            selectees.eq(0).addClass(SELECTED);
            selectees.eq(1).tap();
            selectees.eq(2).tap({ shiftKey: true });

            var selected = selectable.value();
            assert.equal(selected.length, 2);
            assert.isOk(selectees[1] === selected[0]);
            assert.isOk(selectees[2] === selected[1]);
        });

        it("selecting range with equal start and end element", function() {
            var selectable = new Selectable(ul, { multiple: true }),
                selectee = $(ul.find(">li")[0]);

            ul.children().addClass(SELECTED);
            selectee.tap({ shiftKey: true });

            var selected = selectable.value();
            assert.equal(selected.length, 1);
            assert.equal(selected[0], selectee[0]);
        });

        it("selecting element fires select event", function() {
            var selectable = new Selectable(ul),
                selectee = $(ul.find(">li")[0]),
                selectWasCalled = false;

            selectable.bind("select", function() { selectWasCalled = true; });
            selectee.tap();

            assert.isOk(selectWasCalled);
        });

        it("select event recieve as argument element to be selected", function() {
            var selectable = new Selectable(ul),
                selectee = $(ul.find(">li")[0]),
                elementToSelect;

            selectable.bind("select", function(arg) {
                elementToSelect = arg.element;
            });
            selectee.tap();

            assert.equal(elementToSelect, selectee[0]);
        });

        it("cancel select event will prevent element selection", function() {
            var selectable = new Selectable(ul),
                selectee = $(ul.find(">li")[0]);

            selectable.bind("select", function(arg) {
                arg.preventDefault();
            });
            selectee.tap();

            var selected = selectable.value();
            assert.equal(selected.length, 0);
            assert.isOk(!selectee.hasClass(SELECTED));
            assert.isOk(!selectee.hasClass(ACTIVE));
        });

        it("change fires when elements are selected", function() {
            var selectable = new Selectable(ul),
                selectee = $(ul.find(">li")[0]),
                changetWasCalled = false;

            selectable.bind("change", function() { changetWasCalled = true; });
            selectee.tap();

            assert.isOk(changetWasCalled);
            assert.isOk(selectee.hasClass(SELECTED));
        });

        it("ctrlKey click on selected triggers change event", function() {
            var wasCalled = false,
                selectable = new Selectable(ul, {
                    change: function() {
                        wasCalled = true;
                    }
                });

            ul.children().first().addClass(SELECTED).tap({ ctrlKey: true });

            assert.isOk(wasCalled);
            assert.isOk(!ul.children().first().hasClass(SELECTED));
        });

        it("metaKey click on selected triggers change event", function() {
            var wasCalled = false,
                selectable = new Selectable(ul, {
                    change: function() {
                        wasCalled = true;
                    }
                });

            ul.children().first().addClass(SELECTED).tap({ metaKey: true });

            assert.isOk(wasCalled);
            assert.isOk(!ul.children().first().hasClass(SELECTED));
        });

        it("selectRange accept arguments as jQuery object", function() {
            var selectable = new Selectable(ul, { multiple: true }),
                start = $(ul.find(">li")[1]),
                end = $(ul.find(">li")[0]);

            selectable.selectRange(start, end);
            var selected = selectable.value();
            assert.equal(selected.length, 2);
        });

        it("selectRange accept arguments as jQuery selectors", function() {
            var selectable = new Selectable(ul, { multiple: true });

            selectable.selectRange("ul>li", "ul>li");
            var selected = selectable.value();
            assert.equal(selected.length, 1);
        });

        it("clear unselect all selected elements", function() {
            var selectable = new Selectable(ul, { multiple: true });
            $(ul.find(">li")).addClass(SELECTED);

            selectable.clear();

            var selected = selectable.value();
            assert.equal(selected.length, 0);
        });

        it("set values to select through value method selects the elements", function() {
            var selectable = new Selectable(ul, { multiple: true }),
                selectees = $(ul.find(">li"));

            selectable.value(selectees);

            var selected = selectable.value();
            assert.equal(selected.length, 3);
            assert.isOk(selected.first().hasClass(SELECTED));
        });

        it("set values to select through value method triggers select event", function() {
            var selectable = new Selectable(ul, { multiple: true }),
                selectees = $(ul.find(">li")),
                selectWasFired = false;

            selectable.bind("select", function() {
                selectWasFired = true;
            });
            selectable.value(selectees);

            assert.isOk(selectWasFired);
        });

        it("set null as value to select", function() {
            var selectable = new Selectable(ul),
                selectees = null;

            selectable.value(selectees);

            assert.isOk(true);
        });

        it("set values to select through value method triggers change event", function() {
            var selectable = new Selectable(ul, { multiple: true }),
                selectees = $(ul.find(">li")),
                changeWasFired = false;

            selectable.bind("change", function() {
                changeWasFired = true;
            });
            selectable.value(selectees);

            assert.isOk(changeWasFired);
        });

        it("selectRange with shift key pressed triggers select event", function() {
            var selectable = new Selectable(ul, { multiple: true }),
                start = $(ul.find(">li")[1]),
                end = $(ul.find(">li")[0]),
                selectWasFired = false;

            selectable.bind("select", function() {
                selectWasFired = true;
            });
            selectable.selectRange(start, end);

            assert.equal(selectable.value().length, 2);
            assert.isOk(selectWasFired);
        });

        it("selectRange with shift key pressed triggers change event", function() {
            var selectable = new Selectable(ul, { multiple: true }),
                start = $(ul.find(">li")[1]),
                end = $(ul.find(">li")[0]),
                changeWasFired = false;

            selectable.bind("change", function() {
                changeWasFired = true;
            });
            selectable.selectRange(start, end);

            assert.equal(selectable.value().length, 2);
            assert.isOk(changeWasFired);
        });

        it("select element adds aria attribute", function() {
            new Selectable(ul, { aria: true });

            ul.children().first().tap();

            assert.equal(ul.children().first().attr("aria-selected"), "true");
        });

        it("unselecting element sets aria attribute to false", function() {
            new Selectable(ul, { aria: true });

            ul.children().first().tap().tap({ ctrlKey: true });

            assert.equal(ul.children().first().attr("aria-selected"), "false");
        });

        it("multiple selection unselecting element sets aria attribute to false", function() {
            new Selectable(ul, { aria: true, multiple: true });

            ul.children().first().tap().tap({ ctrlKey: true });

            assert.equal(ul.children().first().attr("aria-selected"), "false");
        });

        it("select another element invalidates aria attribute", function() {
            new Selectable(ul, { aria: true });

            ul.children().first().tap();
            ul.children().eq(1).tap();

            assert.equal(ul.children().first().attr("aria-selected"), "false");
            assert.equal(ul.children().eq(1).attr("aria-selected"), "true");
        });

        it("moving over item sets aria attribute", function() {
            var selectable = new Selectable(ul, { aria: true, multiple: true });
            var selectees = ul.find(">li");
            var position = selectees.eq(1).offset();

            selectees.eq(0).tap().press().move(position.left, position.top).release();

            assert.equal(selectees.eq(0).attr("aria-selected"), "true");
            assert.equal(selectees.eq(1).attr("aria-selected"), "true");
        });

        it("calls relatedTarget when initialzied with two elements", function() {
            var selectable = new Selectable(ul.add(secondUL), {
                relatedTarget: function(item) {
                    assert.equal(item[0], selectee[0]);
                }
            });
            var selectee = ul.find(">li").eq(0);

            selectee.tap();

            assert.isOk(selectee.hasClass(SELECTED));
        });

        it("element returned from relatedTarget is selected on tap", function() {
            var selectable = new Selectable(ul.add(secondUL), {
                relatedTarget: function() {
                    return secondUL.children().first();
                }
            });
            var selectee = ul.find(">li").eq(0);

            selectee.tap();

            assert.isOk(selectee.hasClass(SELECTED));
            assert.isOk(secondUL.children().first().hasClass(SELECTED));
        });

        it("ctrl click with multiple elements", function() {
            var selectable = new Selectable(ul.add(secondUL), {
                multiple: true
            });
            var first = ul.find(">li").eq(0);
            var second = secondUL.find(">li").eq(0);

            first.tap();
            second.tap({ ctrlKey: true });

            assert.isOk(first.hasClass(SELECTED));
            assert.isOk(second.hasClass(SELECTED));
        });

        it("unselect previous selected with multiple elements", function() {
            var selectable = new Selectable(ul.add(secondUL), {
                multiple: true
            });
            var first = ul.find(">li").eq(0);
            var second = secondUL.find(">li").eq(0);

            first.tap();
            second.tap();

            assert.isOk(!first.hasClass(SELECTED));
            assert.isOk(second.hasClass(SELECTED));
        });

        it("item in both elements is mark for selection", function() {
            var selectable = new Selectable(ul.add(secondUL),
                {
                    multiple: true,
                    relatedTarget: function(item) {
                        var idx = $.inArray(item[0], ul.children());
                        return secondUL.children().eq(idx);
                    }
                });
            var selectee = ul.find(">li:first");
            var position = selectee.offset();

            selectee.press(0, 0).move(position.left, position.top).move(position.left + 1, position.top);

            assert.isOk(selectee.hasClass(ACTIVE));
            assert.isOk(secondUL.children().first().hasClass(ACTIVE));
        });

        it("selectRange calls continuousItems", function() {
            var selectable = new Selectable(ul.add(secondUL),
                {
                    multiple: true,
                    continuousItems: function() {
                        assert.isOk(true);
                    }
                });

            selectable.selectRange(ul.children().first(), ul.children().last());
        });

        it("selecting range with multiple elements", function() {
            var selectable = new Selectable(ul.add(secondUL),
                {
                    multiple: true,
                    continuousItems: function() {
                        var result = [];
                        ul.children().each(function(index, item) {
                            result.push(item);
                            result.push(secondUL.children()[index]);
                        });

                        return result;
                    }
                });

            selectable.selectRange(ul.children().first(), secondUL.children().first());
            assert.isOk(ul.children().eq(0).hasClass(SELECTED));
            assert.isOk(ul.children().eq(1).hasClass(SELECTED));
            assert.isOk(!ul.children().eq(2).hasClass(SELECTED));

            assert.isOk(secondUL.children().eq(0).hasClass(SELECTED));
            assert.isOk(!secondUL.children().eq(1).hasClass(SELECTED));
            assert.isOk(!secondUL.children().eq(2).hasClass(SELECTED));
        });

        it("selecting range with multiple elements and useAllItems enabled", function() {
            var selectable = new Selectable(ul.add(secondUL),
                {
                    multiple: true,
                    useAllItems: true,
                    continuousItems: function() {
                        var result = [];
                        ul.children().each(function(index, item) {
                            result.push(item);
                            result.push(secondUL.children()[index]);
                        });

                        return result;
                    }
                });

            selectable.selectRange(ul.children().first(), secondUL.children().first());
            assert.isOk(ul.children().eq(0).hasClass(SELECTED));
            assert.isOk(!ul.children().eq(1).hasClass(SELECTED));
            assert.isOk(!ul.children().eq(2).hasClass(SELECTED));

            assert.isOk(secondUL.children().eq(0).hasClass(SELECTED));
            assert.isOk(!secondUL.children().eq(1).hasClass(SELECTED));
            assert.isOk(!secondUL.children().eq(2).hasClass(SELECTED));
        });

        it("selectRange clears previous selected items", function() {
            var selectable = new Selectable(ul,
                {
                    multiple: true,
                });

            ul.children().first().tap();
            selectable.selectRange(ul.children().eq(1), ul.children().last());

            assert.isOk(!ul.children().eq(0).hasClass(SELECTED), "First item must not be selected");
            assert.isOk(ul.children().eq(1).hasClass(SELECTED), "Second item must be selected");
            assert.isOk(ul.children().eq(2).hasClass(SELECTED), "Third item must be selected");
        });

        it("multiple selection adds aria attribute", function() {
            new Selectable(ul, { aria: true, multiple: true });

            assert.isOk(ul.is("[aria-multiselectable]"));
        });

        it("non-aria selectable does not add aria-multiselectable", function() {
            new Selectable(ul, { multiple: true });

            assert.isOk(!ul.is("[aria-multiselectable]"));
        });

        it("non-aria selectable does not add aria-multiselectable", function() {
            new Selectable(ul, { aria: true });

            assert.isOk(!ul.is("[aria-multiselectable]"));
        });

    });
}());
