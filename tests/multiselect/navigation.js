(function() {
    var MultiSelect = kendo.ui.MultiSelect,
        keys = kendo.keys,
        select;

    function populateSelect(length) {
        var options = [];
        length = length || 5;
        for (var i=0; i < length; i++) {
            options.push("<option value='" + i + "'>Option" + i + "</option>");
        }

        select.html(options);
    }

    module("kendo.ui.MultiSelect navigation", {
        setup: function() {
            $.fn.press = function(character) {
                var keyCode = character.charCodeAt(0);
                $(this).trigger({
                    type: "keydown",
                    keyCode: keyCode
                });
            }

            kendo.ns = "kendo-";
            kendo.effects.disable();
            select = $("<select multiple=multiple/>").appendTo(QUnit.fixture);
            populateSelect();
        },
        teardown: function() {
            kendo.ns = "";
            kendo.effects.enable();
            if (select.data("kendoMultiSelect")) {
                select.data("kendoMultiSelect").destroy();
            }

            select.parents(".k-widget").remove();
        }
    });

    asyncTest("MultiSelect expands input element on keydown", 1, function() {
        var multiselect = new MultiSelect(select, { delay: 0 });
        var initial = multiselect.input.width();

        multiselect.input.val("2").press("2");

        setTimeout(function() {
            start();
            ok(multiselect.input.width() > initial);
        });
    });

    asyncTest("MultiSelect fits input inside of the wrapper", 1, function() {
        var multiselect = new MultiSelect(select, { delay: 0 }),
            wrapperWidth = 200;

        multiselect.wrapper.width(wrapperWidth);
        multiselect.input.val("222222222222222222222222222222222222222222222").press("2");

        setTimeout(function() {
            start();
            equal(Math.round(multiselect.input.width()), wrapperWidth);
        });
    });

    test("MultiSelect opens popup on keydown", function() {
        var multiselect = new MultiSelect(select);

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        ok(multiselect.popup.visible());
    });

    test("MultiSelect highlights first LI", function() {
        var multiselect = new MultiSelect(select);

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        ok(multiselect.current().hasClass("k-state-focused"));
    });

    test("MultiSelect highlights next LI", function() {
        var multiselect = new MultiSelect(select);

        multiselect.open();
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        equal(multiselect.current().index(), 1);
        ok(multiselect.current().hasClass("k-state-focused"));
    });

    test("MultiSelect does nothing if LI is last", function() {
        var multiselect = new MultiSelect(select);

        multiselect.open();
        multiselect.current(multiselect.ul.children().last());

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        ok(multiselect.current());
        equal(multiselect.current().index(), multiselect.ul.children().length - 1);
        ok(multiselect.current().hasClass("k-state-focused"));
    });

    test("MultiSelect highlights prev LI", function() {
        var multiselect = new MultiSelect(select);

        multiselect.open();
        multiselect.current(multiselect.ul.children().last());

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.UP
        });

        equal(multiselect.current().index(), multiselect.ul.children().length - 2);
        ok(multiselect.current().hasClass("k-state-focused"));
    });

    test("MultiSelect closes popup if no previous LI", function() {
        var multiselect = new MultiSelect(select);

        multiselect.open();
        multiselect.current(multiselect.ul.children().first());

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.UP
        });

        ok(!multiselect.popup.visible());
    });

    test("MultiSelect selects current highlighted on ENTER", function() {
        var multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.ENTER
        });

        equal(multiselect.tagList.children().length, 1);
    });

    test("MultiSelect closes on ENTER", function() {
        var multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.ENTER
        });

        ok(!multiselect.popup.visible());
    });

    test("MultiSelect closes on ESC", function() {
        var multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.ESC
        });

        ok(!multiselect.popup.visible());
    });

    test("MultiSelect prevent default on ESC", 1, function() {
        var multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.ESC,
            preventDefault: function() {
                ok(true);
            }
        });
    });

    test("MultiSelect scrolls list to the focused element", function() {
        populateSelect(50);
        var multiselect = new MultiSelect(select);

        multiselect.value(["30"]);
        multiselect.open();

        ok(multiselect.listView.content[0].scrollTop > 50);
    });

    module("kendo.ui.MultiSelect tag navigation", {
        setup: function() {
            select = $("<select multiple=multiple/>").appendTo(document.body);
            populateSelect();
        },
        teardown: function() {
            if (select.data("kendoMultiSelect")) {
                select.data("kendoMultiSelect").destroy();
            }

            select.parents(".k-widget").remove();
        }
    });

    test("MultiSelect focuses last tag if input is empty", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["1", "2"]);

        multiselect.input.focus();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.LEFT
        });

        var tag = multiselect.tagList.children().last();

        ok(tag.hasClass("k-state-focused"));
    });

    test("MultiSelect focuses previous tag if input is empty", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["1", "2"]);
        multiselect.input.focus();
        multiselect.currentTag(multiselect.tagList.children().last());
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.LEFT
        });

        var tag = multiselect.currentTag();

        equal(tag.index(), 0);
        ok(tag.hasClass("k-state-focused"));
    });

    test("MultiSelect persist focus to the first LI on LEFT", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["1", "2"]);
        multiselect.input.focus();
        multiselect.currentTag(multiselect.tagList.children().first());
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.LEFT
        });

        var tag = multiselect.currentTag();

        equal(tag.index(), 0);
        ok(tag.hasClass("k-state-focused"));
    });

    test("MultiSelect focuses next tag if any is focused", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["1", "2"]);
        multiselect.input.focus();

        multiselect.currentTag(multiselect.tagList.children().first());

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.RIGHT
        });

        var tag = multiselect.currentTag();

        equal(tag.index(), 1);
        ok(tag.hasClass("k-state-focused"));
    });

    test("MultiSelect un-focuses last tag if RIGHT is pressed ", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["1", "2"]);
        multiselect.input.focus();

        multiselect.currentTag(multiselect.tagList.children().last());

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.RIGHT
        });

        var tag = multiselect.currentTag();

        equal(tag, null);
    });

    test("MultiSelect un-focuses tag on selection", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.input.mousedown();

        multiselect.currentTag(multiselect.tagList.children().last());

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.ENTER
        });

        var tag = multiselect.currentTag();

        equal(tag, null);
    });

    test("MultiSelect deletes focused tag", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["1", "2"]);
        multiselect.input.focus();

        multiselect.currentTag(multiselect.tagList.children().last());

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DELETE
        });

        equal(multiselect.currentTag(), null);
        equal(multiselect.tagList.children().length, 1);
    });

    test("MultiSelect deletes focused tag when source is filtered", function() {
        var multiselect = new MultiSelect(select);

        multiselect.search("Option1");
        multiselect.ul.children(":first").click();

        multiselect.search("Option2");
        multiselect.ul.children(":first").click();

        multiselect.currentTag(multiselect.tagList.children().first());

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DELETE
        });

        multiselect.open();

        equal(multiselect.currentTag(), null);
        equal(multiselect.tagList.children().length, 1);
        equal(multiselect.tagList.children().eq(0).text().indexOf("Option2"), 0);
    });

    test("MultiSelect deletes last tag on BACKSPACE if input is empty", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["0", "1"]);
        multiselect.input.focus();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.BACKSPACE
        });

        equal(multiselect.currentTag(), null);
        equal(multiselect.tagList.children().length, 1);
        equal(multiselect.tagList.children().eq(0).find("span").html(), "Option0");
    });

    test("MultiSelect does not raise exception on DELETE", 1, function() {
        var multiselect = new MultiSelect(select);
        multiselect.input.focus();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.BACKSPACE
        });

        ok(true);
    });

    test("MultiSelect focuses first tag on HOME", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["0", "1"]);
        multiselect.input.focus();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.HOME
        });

        var tag = multiselect.currentTag();

        equal(tag.index(), 0);
    });

    test("MultiSelect focuses last tag on END", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["0", "1"]);
        multiselect.input.focus();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.END
        });

        var tag = multiselect.currentTag();

        equal(tag.index(), 1);
    });

    test("MultiSelect closes popup when deletes tag", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["0", "1"]);
        multiselect.input.click();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.BACKSPACE
        });

        ok(!multiselect.popup.visible());
    });

    test("MultiSelect highlights last item of the popup on END", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["0", "1"]);
        multiselect.open();

        multiselect.input.focus().trigger({
            type: "keydown",
            keyCode: keys.END
        });

        var item = multiselect.current();

        equal(item[0], multiselect.ul.children().last()[0]);
    });

    test("MultiSelect clears focused tag when navigate through the popup", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["0", "1"]);
        multiselect.open();

        multiselect.currentTag(multiselect.tagList.children().first());
        multiselect.input.focus().trigger({
            type: "keydown",
            keyCode: keys.END
        });

        equal(multiselect.currentTag(), null);
    });

    test("MultiSelect highlights first item of the popup on HOME", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["0", "1"]);
        multiselect.open();

        multiselect.current(multiselect.ul.children().last());
        multiselect.input.focus().trigger({
            type: "keydown",
            keyCode: keys.HOME
        });

        var item = multiselect.current();

        equal(item[0], multiselect.ul.children(":visible").first()[0]);
    });

    test("MultiSelect clears focused tag when navigate through the popup", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["0", "1"]);
        multiselect.open();

        multiselect.currentTag(multiselect.tagList.children().first());
        multiselect.input.focus().trigger({
            type: "keydown",
            keyCode: keys.HOME
        });

        equal(multiselect.currentTag(), null);
    });

    test("MultiSelect clears selection in selected items on ESC", function() {
        var multiselect = new MultiSelect(select, { value: "1" });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.HOME
        });
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.ESC
        });

        equal(multiselect.currentTag(), null);
    });
})();
