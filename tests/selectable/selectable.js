(function() {
    var Selectable = kendo.ui.Selectable,
    ul,
    SELECTED = "k-state-selected",
    ACTIVE = "k-state-selecting",
    SELECTABLE = "k-selectable",
    UNSELECTING = "k-state-unselecting";

    module("kendo.ui.Selectable", {
        setup: function() {
            ul = $("<ul><li>1</li><li>2</li><li>3</li></ul>").appendTo(QUnit.fixture);
            secondUL = $("<ul><li>11</li><li>21</li><li>31</li></ul>").appendTo(QUnit.fixture);

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
                return this.press().release(info);
            }
        },
        teardown: function() {
            ul.kendoSelectable("destroy");
            ul.remove();
            secondUL.remove();
            $(".k-marquee").remove();
        }
    });

    function triggerEvent(element, type, info) {
        element.trigger($.Event(type, info));

        return element;
    };

    test("selectable class is applied on the element when initialized", function() {
        var selectable = new Selectable(ul);
        ok(ul.hasClass(SELECTABLE));
    });

    test("single selection does not attach the marquee", function() {
        var selectable = new Selectable(ul);

        ul.children().eq(0).press();
        equal($(".k-marquee").length, 0);
    });

    test("multiple selection attach the marquee to the document", function() {
        var selectable = new Selectable(ul, { multiple: true });

        ul.children().eq(0).press().move(10, 10);
        equal($(".k-marquee").length, 1);
    });

    test("element get selected on mouseup", function() {
        var selectable = new Selectable(ul);
        var selectee = $(ul.find(">li")[0]);

        selectee.tap();

        ok(selectee.hasClass(SELECTED));
    });

    test("unselect all previosly selected when select new element", function() {
        var selectable = new Selectable(ul);
        var selectees = ul.find(">li");

        selectees.eq(0).tap();
        selectees.eq(1).tap();

        equal(selectees.eq(0).hasClass(SELECTED), false);
        equal(selectees.eq(1).hasClass(SELECTED), true);
    });

    test("item is marked for selection on start", function() {
        var selectable = new Selectable(ul, { multiple: true });
        var selectee = ul.find(">li:first");
        var position = selectee.offset();

        selectee.press(0, 0).move(position.left, position.top).move(position.left + 1, position.top);

        ok(selectee.hasClass(ACTIVE));
    });

    test("moving over item marks it for selection", function() {
        var selectable = new Selectable(ul, { multiple: true });
        var selectees = ul.find(">li");
        var position = selectees.eq(1).offset();

        selectees.eq(0).press().move(position.left, position.top);

        ok(selectees.eq(0).hasClass(ACTIVE));
        ok(selectees.eq(1).hasClass(ACTIVE));
    });

    test("moving away from selectable item removes selection mark", function() {
        var selectable = new Selectable(ul, { multiple: true });
        var selectees = ul.find(">li");
        var position = selectees.eq(1).offset();

        selectees.eq(0).press(0, 0).move(position.left, position.top).move(position.left, position.top - 1);

        ok(selectees.eq(0).hasClass(ACTIVE));
        ok(!selectees.eq(1).hasClass(ACTIVE));
    });

    test("value returns all selected items", function() {
        var selectable = new Selectable(ul);
        var selectees = ul.find(">li");

        selectees.eq(0).tap();

        var values = selectable.value();

        equal(values.length, 1);
        ok(values[0], selectees[0]);
    });

    test("multiple selection ctrlKey click on selected items does not unselects it", function() {
        var selectable = new Selectable(ul, { multiple: true });
        var selectees = ul.find(">li");

        selectees.eq(0).tap();
        selectees.eq(1).tap({ ctrlKey: true });

        ok(selectees.eq(0).hasClass(SELECTED));
        ok(selectees.eq(1).hasClass(SELECTED));
    });

    test("multiple selection metaKey click on selected items does not unselects it", function() {
        var selectable = new Selectable(ul, { multiple: true });
        var selectees = ul.find(">li");

        selectees.eq(0).tap();
        selectees.eq(1).tap({ metaKey: true });

        ok(selectees.eq(0).hasClass(SELECTED));
        ok(selectees.eq(1).hasClass(SELECTED));
    });

    test("single selection ctrlKey click on item when another is selected", function() {
        var selectable = new Selectable(ul);
        var selectees = ul.find(">li");

        selectees.eq(0).tap();
        selectees.eq(1).tap({ ctrlKey: true });

        ok(!selectees.eq(0).hasClass(SELECTED));
        ok(selectees.eq(1).hasClass(SELECTED));
    });

    test("single selection metaKey click on item when another is selected", function() {
        var selectable = new Selectable(ul);
        var selectees = ul.find(">li");

        selectees.eq(0).tap();
        selectees.eq(1).tap({ metaKey: true });

        ok(!selectees.eq(0).hasClass(SELECTED));
        ok(selectees.eq(1).hasClass(SELECTED));
    });

    test("single selection ctrlKey click on selected item unselects it", function() {
        var selectable = new Selectable(ul);
        var selectee = $(ul.find(">li")[0]);

        selectee.tap();
        selectee.tap({ ctrlKey: true });

        ok(!selectee.hasClass(SELECTED));
        ok(!selectee.hasClass(ACTIVE));
    });

    test("single selection metaKey click on selected item unselects it", function() {
        var selectable = new Selectable(ul);
        var selectee = $(ul.find(">li")[0]);

        selectee.tap();
        selectee.tap({ metaKey: true });

        ok(!selectee.hasClass(SELECTED));
        ok(!selectee.hasClass(ACTIVE));
    });

    test("multiple selection mousedown with ctrlKey on selected item persist selection", function() {
        var selectable = new Selectable(ul, { multiple: true });
        var selectee = $(ul.find(">li")[0]);

        selectee.tap();
        selectee.press(0, 0, true);

        ok(selectee.hasClass(SELECTED));
        ok(!selectee.hasClass(ACTIVE));
    });

    test("multiple selection mousedown with metaKey on selected item persist selection", function() {
        var selectable = new Selectable(ul, { multiple: true });
        var selectee = $(ul.find(">li")[0]);

        selectee.tap();
        selectee.press(0, 0, false, true);

        ok(selectee.hasClass(SELECTED));
        ok(!selectee.hasClass(ACTIVE));
    });

    test("multiple selection click on selected item with ctrlKey pressed unselect it", function() {
        var selectable = new Selectable(ul, { multiple: true });
        var selectee = $(ul.find(">li")[0]);

        selectee.addClass(SELECTED);
        selectee.tap({ ctrlKey: true });

        ok(!selectee.hasClass(SELECTED));
        ok(!selectee.hasClass(ACTIVE));
    });

    test("multiple selection click on selected item with metaKey pressed unselect it", function() {
        var selectable = new Selectable(ul, { multiple: true });
        var selectee = $(ul.find(">li")[0]);

        selectee.addClass(SELECTED);
        selectee.tap({ metaKey: true });

        ok(!selectee.hasClass(SELECTED));
        ok(!selectee.hasClass(ACTIVE));
    });

    test("moving after selected item with ctrlKey pressed", function() {
        var selectable = new Selectable(ul, { multiple: true }),
        firstSelectee = $(ul.find(">li")[0]),
        secondSelectee = $(ul.find(">li")[1]),
        position = secondSelectee.offset();

        firstSelectee.addClass(SELECTED);
        secondSelectee.addClass(SELECTED);

        firstSelectee.press(0, 0, true).move(position.left, position.top, true).move(position.left, position.top + 1, true);

        ok(firstSelectee.hasClass(SELECTED));
        ok(!secondSelectee.hasClass(ACTIVE));
        ok(!secondSelectee.hasClass(SELECTED));
    });

    test("moving after selected item with metaKey pressed", function() {
        var selectable = new Selectable(ul, { multiple: true }),
        firstSelectee = $(ul.find(">li")[0]),
        secondSelectee = $(ul.find(">li")[1]),
        position = secondSelectee.offset();

        firstSelectee.addClass(SELECTED);
        secondSelectee.addClass(SELECTED);

        firstSelectee.press(0, 0, false, true).move(position.left, position.top, false, true).move(position.left, position.top + 1, false, true);

        ok(firstSelectee.hasClass(SELECTED));
        ok(!secondSelectee.hasClass(ACTIVE));
        ok(!secondSelectee.hasClass(SELECTED));
    });

    test("moving back from selected item with ctrlKey pressed", function() {
        var selectable = new Selectable(ul, {multiple: true}),
        firstSelectee = $(ul.find(">li")[0]),
        secondSelectee = $(ul.find(">li")[1]),
        position = secondSelectee.offset();

        firstSelectee.addClass(SELECTED);
        secondSelectee.addClass(SELECTED);


        firstSelectee.press(0, 0, true).move(position.left, position.top, true).move(position.left, position.top - 1, true);


        ok(firstSelectee.hasClass(SELECTED));
        ok(!secondSelectee.hasClass(ACTIVE));
        ok(secondSelectee.hasClass(SELECTED));
        ok(!secondSelectee.hasClass(UNSELECTING));
    });

    test("moving back from selected item with metaKey pressed", function() {
        var selectable = new Selectable(ul, {multiple: true}),
        firstSelectee = $(ul.find(">li")[0]),
        secondSelectee = $(ul.find(">li")[1]),
        position = secondSelectee.offset();

        firstSelectee.addClass(SELECTED);
        secondSelectee.addClass(SELECTED);


        firstSelectee.press(0, 0, false, true).move(position.left, position.top, false, true).move(position.left, position.top - 1, false, true);


        ok(firstSelectee.hasClass(SELECTED));
        ok(!secondSelectee.hasClass(ACTIVE));
        ok(secondSelectee.hasClass(SELECTED));
        ok(!secondSelectee.hasClass(UNSELECTING));
    });

    test("select range between two selected elements when shift key is pressed", function() {
        var selectable = new Selectable(ul, { multiple: true }),
        firstSelectee = $(ul.find(">li")[0]),
        secondSelectee = $(ul.find(">li")[2]);

        firstSelectee.addClass(SELECTED);
        secondSelectee.tap({ shiftKey: true });

        var selected = selectable.value();
        equal(selected.length, 3);
    });

    test("select range when no item selected with shift key pressed select from first selectable", function() {
        var selectable = new Selectable(ul, { multiple: true }),
        selectee = $(ul.find(">li")[2]);

        selectee.tap({ shiftKey: true });

        var selected = selectable.value();
        equal(selected.length, 3);
    });

    test("selectRange when start element is in oposite order in the DOM", function() {
        var selectable = new Selectable(ul, {multiple: true}),
        start = ul.find(">li")[1],
        end = ul.find(">li")[0];

        selectable.selectRange(start, end);
        var selected = selectable.value();
        equal(selected.length, 2);
    });

    test("shift and click clears selected items outside the selected range", function() {
        var selectable = new Selectable(ul, { multiple: true }),
        selectees = ul.find(">li");

        selectees.eq(0).addClass(SELECTED);
        selectees.eq(1).tap();
        selectees.eq(2).tap({ shiftKey: true });

        var selected = selectable.value();
        equal(selected.length, 2);
        ok(selectees[1] === selected[0]);
        ok(selectees[2] === selected[1]);
    });

    test("selecting range with equal start and end element", function() {
        var selectable = new Selectable(ul, { multiple: true }),
        selectee = $(ul.find(">li")[0]);

        ul.children().addClass(SELECTED);
        selectee.tap({ shiftKey: true });

        var selected = selectable.value();
        equal(selected.length, 1);
        equal(selected[0], selectee[0]);
    });

    test("selecting element fires select event", function() {
        var selectable = new Selectable(ul),
        selectee = $(ul.find(">li")[0]),
        selectWasCalled = false;

        selectable.bind("select", function () { selectWasCalled = true; });
        selectee.tap();

        ok(selectWasCalled);
    });

    test("select event recieve as argument element to be selected", function() {
        var selectable = new Selectable(ul),
        selectee = $(ul.find(">li")[0]),
        elementToSelect;

        selectable.bind("select", function (arg) {
            elementToSelect = arg.element;
        });
        selectee.tap();

        equal(elementToSelect, selectee[0]);
    });

    test("cancel select event will prevent element selection", function() {
        var selectable = new Selectable(ul),
        selectee = $(ul.find(">li")[0]);

        selectable.bind("select", function (arg) {
            arg.preventDefault();
        });
        selectee.tap();

        var selected = selectable.value();
        equal(selected.length, 0);
        ok(!selectee.hasClass(SELECTED));
        ok(!selectee.hasClass(ACTIVE));
    });

    test("change fires when elements are selected", function() {
        var selectable = new Selectable(ul),
        selectee = $(ul.find(">li")[0]),
        changetWasCalled = false;

        selectable.bind("change", function () { changetWasCalled = true; });
        selectee.tap();

        ok(changetWasCalled);
        ok(selectee.hasClass(SELECTED));
    });

    test("ctrlKey click on selected triggers change event", function() {
        var wasCalled = false,
        selectable = new Selectable(ul, {
            change: function() {
                wasCalled = true;
            }
        });

        ul.children().first().addClass(SELECTED).tap({ ctrlKey: true });

        ok(wasCalled);
        ok(!ul.children().first().hasClass(SELECTED));
    });

    test("metaKey click on selected triggers change event", function() {
        var wasCalled = false,
        selectable = new Selectable(ul, {
            change: function() {
                wasCalled = true;
            }
        });

        ul.children().first().addClass(SELECTED).tap({ metaKey: true });

        ok(wasCalled);
        ok(!ul.children().first().hasClass(SELECTED));
    });

    test("selectRange accept arguments as jQuery object", function() {
        var selectable = new Selectable(ul, {multiple: true}),
        start = $(ul.find(">li")[1]),
        end = $(ul.find(">li")[0]);

        selectable.selectRange(start, end);
        var selected = selectable.value();
        equal(selected.length, 2);
    });

    test("selectRange accept arguments as jQuery selectors", function() {
        var selectable = new Selectable(ul, {multiple: true});

        selectable.selectRange("ul>li", "ul>li");
        var selected = selectable.value();
        equal(selected.length, 1);
    });

    test("clear unselect all selected elements", function() {
        var selectable = new Selectable(ul, {multiple: true});
        $(ul.find(">li")).addClass(SELECTED);

        selectable.clear();

        var selected = selectable.value();
        equal(selected.length, 0);
    });

    test("set values to select through value method selects the elements", function() {
        var selectable = new Selectable(ul, {multiple: true}),
        selectees = $(ul.find(">li"));

        selectable.value(selectees);

        var selected = selectable.value();
        equal(selected.length, 3);
        ok(selected.first().hasClass(SELECTED));
    });

    test("set values to select through value method triggers select event", function() {
        var selectable = new Selectable(ul, {multiple: true}),
        selectees = $(ul.find(">li")),
        selectWasFired = false;

        selectable.bind("select", function () {
            selectWasFired = true;
        });
        selectable.value(selectees);

        ok(selectWasFired);
    });

    test("set null as value to select", function() {
        var selectable = new Selectable(ul),
        selectees = null;

        selectable.value(selectees);

        ok(true);
    });

    test("set values to select through value method triggers change event", function() {
        var selectable = new Selectable(ul, {multiple: true}),
        selectees = $(ul.find(">li")),
        changeWasFired = false;

        selectable.bind("change", function () {
            changeWasFired = true;
        });
        selectable.value(selectees);

        ok(changeWasFired);
    });

    test("selectRange with shift key pressed triggers select event", function() {
        var selectable = new Selectable(ul, {multiple: true}),
        start = $(ul.find(">li")[1]),
        end = $(ul.find(">li")[0]),
        selectWasFired = false;

        selectable.bind("select", function () {
            selectWasFired = true;
        });
        selectable.selectRange(start, end);

        equal(selectable.value().length, 2);
        ok(selectWasFired);
    });

    test("selectRange with shift key pressed triggers change event", function() {
        var selectable = new Selectable(ul, {multiple: true}),
        start = $(ul.find(">li")[1]),
        end = $(ul.find(">li")[0]),
        changeWasFired = false;

        selectable.bind("change", function () {
            changeWasFired = true;
        });
        selectable.selectRange(start, end);

        equal(selectable.value().length, 2);
        ok(changeWasFired);
    });

    test("select element adds aria attribute", function() {
        new Selectable(ul, { aria: true });

        ul.children().first().tap();

        equal(ul.children().first().attr("aria-selected"), "true");
    });

    test("unselecting element sets aria attribute to false", function() {
        new Selectable(ul, { aria: true });

        ul.children().first().tap().tap({ ctrlKey: true });

        equal(ul.children().first().attr("aria-selected"), "false");
    });

    test("multiple selection unselecting element sets aria attribute to false", function() {
        new Selectable(ul, { aria: true, multiple: true});

        ul.children().first().tap().tap({ ctrlKey: true });

        equal(ul.children().first().attr("aria-selected"), "false");
    });

    test("select another element invalidates aria attribute", function() {
        new Selectable(ul, { aria: true });

        ul.children().first().tap();
        ul.children().eq(1).tap();

        equal(ul.children().first().attr("aria-selected"), "false");
        equal(ul.children().eq(1).attr("aria-selected"), "true");
    });

    test("moving over item sets aria attribute", function() {
        var selectable = new Selectable(ul, { aria:true, multiple: true });
        var selectees = ul.find(">li");
        var position = selectees.eq(1).offset();

        selectees.eq(0).tap().press().move(position.left, position.top).release();

        equal(selectees.eq(0).attr("aria-selected"), "true");
        equal(selectees.eq(1).attr("aria-selected"), "true");
    });

    test("calls relatedTarget when initialzied with two elements", 2, function() {
        var selectable = new Selectable(ul.add(secondUL), {
            relatedTarget: function(item) {
                equal(item[0], selectee[0]);
            }
        });
        var selectee = ul.find(">li").eq(0);

        selectee.tap();

        ok(selectee.hasClass(SELECTED));
    });

    test("element returned from relatedTarget is selected on tap", function() {
        var selectable = new Selectable(ul.add(secondUL), {
            relatedTarget: function() {
                return secondUL.children().first();
            }
        });
        var selectee = ul.find(">li").eq(0);

        selectee.tap();

        ok(selectee.hasClass(SELECTED));
        ok(secondUL.children().first().hasClass(SELECTED));
    });

    test("ctrl click with multiple elements", function() {
        var selectable = new Selectable(ul.add(secondUL), {
            multiple: true
        });
        var first = ul.find(">li").eq(0);
        var second = secondUL.find(">li").eq(0);

        first.tap();
        second.tap({ ctrlKey: true });

        ok(first.hasClass(SELECTED));
        ok(second.hasClass(SELECTED));
    });

    test("unselect previous selected with multiple elements", function() {
        var selectable = new Selectable(ul.add(secondUL), {
            multiple: true
        });
        var first = ul.find(">li").eq(0);
        var second = secondUL.find(">li").eq(0);

        first.tap();
        second.tap();

        ok(!first.hasClass(SELECTED));
        ok(second.hasClass(SELECTED));
    });

    test("item in both elements is mark for selection", function() {
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

        ok(selectee.hasClass(ACTIVE));
        ok(secondUL.children().first().hasClass(ACTIVE));
    });

    test("selectRange calls continuousItems", 1, function() {
        var selectable = new Selectable(ul.add(secondUL),
            {
                multiple: true,
                continuousItems: function() {
                    ok(true);
                }
            });

        selectable.selectRange(ul.children().first(), ul.children().last());
    });

    test("selecting range with multiple elements", function() {
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
        ok(ul.children().eq(0).hasClass(SELECTED));
        ok(ul.children().eq(1).hasClass(SELECTED));
        ok(!ul.children().eq(2).hasClass(SELECTED));

        ok(secondUL.children().eq(0).hasClass(SELECTED));
        ok(!secondUL.children().eq(1).hasClass(SELECTED));
        ok(!secondUL.children().eq(2).hasClass(SELECTED));
    });

    test("selecting range with multiple elements and useAllItems enabled", function() {
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
        ok(ul.children().eq(0).hasClass(SELECTED));
        ok(!ul.children().eq(1).hasClass(SELECTED));
        ok(!ul.children().eq(2).hasClass(SELECTED));

        ok(secondUL.children().eq(0).hasClass(SELECTED));
        ok(!secondUL.children().eq(1).hasClass(SELECTED));
        ok(!secondUL.children().eq(2).hasClass(SELECTED));
    });

    test("selectRange clears previous selected items", function() {
        var selectable = new Selectable(ul,
            {
                multiple: true,
            });

        ul.children().first().tap();
        selectable.selectRange(ul.children().eq(1), ul.children().last());

        ok(!ul.children().eq(0).hasClass(SELECTED), "First item must not be selected");
        ok(ul.children().eq(1).hasClass(SELECTED), "Second item must be selected");
        ok(ul.children().eq(2).hasClass(SELECTED), "Third item must be selected");
    });

    test("multiple selection adds aria attribute", function() {
        new Selectable(ul, { aria: true, multiple: true });

        ok(ul.is("[aria-multiselectable]"));
    });

    test("non-aria selectable does not add aria-multiselectable", function() {
        new Selectable(ul, { multiple: true });

        ok(!ul.is("[aria-multiselectable]"));
    });

    test("non-aria selectable does not add aria-multiselectable", function() {
        new Selectable(ul, { aria: true });

        ok(!ul.is("[aria-multiselectable]"));
    });

})();
