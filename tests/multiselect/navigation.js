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

    describe("kendo.ui.MultiSelect navigation", function () {
        beforeEach(function() {
            $.fn.press = function(character) {
                var keyCode = character.charCodeAt(0);
                $(this).trigger({
                    type: "keydown",
                    keyCode: keyCode
                });
            }

            kendo.ns = "kendo-";

            select = $("<select multiple=multiple/>").appendTo(Mocha.fixture);
            populateSelect();
        });
        afterEach(function() {
            kendo.ns = "";

            if (select.data("kendoMultiSelect")) {
                select.data("kendoMultiSelect").destroy();
            }

            select.parents(".k-widget").remove();
        });

    it("MultiSelect expands input element on keydown", function(done) {
        var multiselect = new MultiSelect(select, { delay: 0 });
        var initial = multiselect.input.width();

        multiselect.input.val("2").press("2");

        setTimeout(function() {
            assert.isOk(multiselect.input.width() > initial);
            done();
        });
    });

    it("MultiSelect fits input inside of the wrapper", function(done) {
        var multiselect = new MultiSelect(select, { delay: 0 }),
            wrapperWidth = 200;

        multiselect.wrapper.find(".k-multiselect-wrap").width(wrapperWidth);
        multiselect.input.val("222222222222222222222222222222222222222222222").press("2");

        setTimeout(function() {
            assert.equal(Math.round(multiselect.input.width()), wrapperWidth);
            done();
        });
    });

    it("MultiSelect opens popup on keydown", function() {
        var multiselect = new MultiSelect(select);

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        assert.isOk(multiselect.popup.visible());
    });

    it("MultiSelect highlights first LI", function() {
        var multiselect = new MultiSelect(select);

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        assert.isOk(multiselect.current().hasClass("k-state-focused"));
    });

    it("MultiSelect highlights next LI", function() {
        var multiselect = new MultiSelect(select);

        multiselect.open();
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        assert.equal(multiselect.current().index(), 1);
        assert.isOk(multiselect.current().hasClass("k-state-focused"));
    });

    it("MultiSelect does nothing if LI is last", function() {
        var multiselect = new MultiSelect(select);

        multiselect.open();
        multiselect.current(multiselect.ul.children().last());

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        assert.isOk(multiselect.current());
        assert.equal(multiselect.current().index(), multiselect.ul.children().length - 1);
        assert.isOk(multiselect.current().hasClass("k-state-focused"));
    });

    it("MultiSelect highlights prev LI", function() {
        var multiselect = new MultiSelect(select);

        multiselect.open();
        multiselect.current(multiselect.ul.children().last());

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.UP
        });

        assert.equal(multiselect.current().index(), multiselect.ul.children().length - 2);
        assert.isOk(multiselect.current().hasClass("k-state-focused"));
    });

    it("MultiSelect closes popup if no previous LI", function() {
        var multiselect = new MultiSelect(select);

        multiselect.open();
        multiselect.current(multiselect.ul.children().first());

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.UP
        });

        assert.isOk(!multiselect.popup.visible());
    });

    it("MultiSelect selects current highlighted on ENTER", function() {
        var multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.ENTER
        });

        assert.equal(multiselect.tagList.children().length, 1);
    });

    it("MultiSelect selects all on CTRL+A", function() {
        var multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: 65,
            ctrlKey: true
        });

        assert.equal(multiselect.tagList.children().length, 5);
    });

    it("MultiSelect deselects all on CTRL+A if already selected", function() {
        var multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: 65,
            ctrlKey: true
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: 65,
            ctrlKey: true
        });

        assert.equal(multiselect.tagList.children().length, 0);
    });

    it("MultiSelect respects maxSelectedItems on CTRL+A", function () {
        var multiselect = new MultiSelect(select, {
            maxSelectedItems: 2
        });

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: 65,
            ctrlKey: true
        });

        assert.equal(multiselect.tagList.children().length, 2);
    });

    it("MultiSelect selects item on CTRL+SPACEBAR", function() {
        var multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.SPACEBAR,
            ctrlKey: true
        });

        assert.equal(multiselect.tagList.children().length, 1);
        assert.equal(multiselect.tagList.children().eq(0).text().indexOf("Option1"), 0);
    });

    it("MultiSelect selects item on SHIFT+DOWN", function () {
        var multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN,
            shiftKey: true
        });

        assert.equal(multiselect.tagList.children().length, 1);
        assert.equal(multiselect.tagList.children().eq(0).text().indexOf("Option1"), 0);
    });

    it("MultiSelect selects multiple items on SHIFT+DOWN", function () {
        var multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN,
            shiftKey: true
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN,
            shiftKey: true
        });

        assert.equal(multiselect.tagList.children().length, 2);
        assert.equal(multiselect.tagList.children().eq(0).text().indexOf("Option1"), 0);
        assert.equal(multiselect.tagList.children().eq(1).text().indexOf("Option2"), 0);
    });

    it("MultiSelect respects maxSelectedItems on SHIFT+DOWN", function () {
        var multiselect = new MultiSelect(select, {
            maxSelectedItems: 1
        });

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN,
            shiftKey: true
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN,
            shiftKey: true
        });

        assert.equal(multiselect.tagList.children().length, 1);
        assert.equal(multiselect.tagList.children().eq(0).text().indexOf("Option1"), 0);
    });

    it("MultiSelect selects item on SHIFT+UP", function () {
        var multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.UP,
            shiftKey: true
        });

        assert.equal(multiselect.tagList.children().length, 1);
        assert.equal(multiselect.tagList.children().eq(0).text().indexOf("Option2"), 0);
    });

    it("MultiSelect selects multiple items on SHIFT+UP", function () {
        var multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.UP,
            shiftKey: true
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.UP,
            shiftKey: true
        });

        assert.equal(multiselect.tagList.children().length, 2);
        assert.equal(multiselect.tagList.children().eq(0).text().indexOf("Option2"), 0);
        assert.equal(multiselect.tagList.children().eq(1).text().indexOf("Option1"), 0);
    });

    it("MultiSelect respects maxSelectedItems on SHIFT+UP", function () {
        var multiselect = new MultiSelect(select, {
            maxSelectedItems: 1
        });

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.UP,
            shiftKey: true
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.UP,
            shiftKey: true
        });

        assert.equal(multiselect.tagList.children().length, 1);
        assert.equal(multiselect.tagList.children().eq(0).text().indexOf("Option2"), 0);
    });

    it("MultiSelect selects multiple items on CTRL+SHIFT+END", function () {
        var multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.END,
            ctrlKey: true,
            shiftKey: true
        });

        assert.equal(multiselect.tagList.children().length, 4);
    });

    it("MultiSelect respects maxSelectedItems on CTRL+SHIFT+END", function () {
        var multiselect = new MultiSelect(select, {
            maxSelectedItems: 2
        });

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.END,
            ctrlKey: true,
            shiftKey: true
        });

        assert.equal(multiselect.tagList.children().length, 2);
        assert.equal(multiselect.tagList.children().eq(0).text(), "Option1");
        assert.equal(multiselect.tagList.children().eq(1).text(), "Option2");
    });

    it("MultiSelect selects multiple items on CTRL+SHIFT+HOME", function () {
        var multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.HOME,
            ctrlKey: true,
            shiftKey: true
        });

        assert.equal(multiselect.tagList.children().length, 4);
    });

    it("MultiSelect respects maxSelectedItems on CTRL+SHIFT+HOME", function () {
        var multiselect = new MultiSelect(select, {
            maxSelectedItems: 2
        });

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.HOME,
            ctrlKey: true,
            shiftKey: true
        });

        assert.equal(multiselect.tagList.children().length, 2);
        assert.equal(multiselect.tagList.children().eq(0).text(), "Option3");
        assert.equal(multiselect.tagList.children().eq(1).text(), "Option2");
    });

    it("MultiSelect closes on ENTER", function() {
        var multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.ENTER
        });

        assert.isOk(!multiselect.popup.visible());
    });

    it("MultiSelect closes on ESC", function() {
        var multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.ESC
        });

        assert.isOk(!multiselect.popup.visible());
    });

    it("MultiSelect prevent default on ESC", function() {
        var multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.ESC,
            preventDefault: function() {
                assert.isOk(true);
            }
        });
    });

    it("MultiSelect scrolls list to the focused element", function() {
        populateSelect(50);
        var multiselect = new MultiSelect(select);

        multiselect.value(["30"]);
        multiselect.open();

        assert.isOk(multiselect.listView.content[0].scrollTop > 50);
    });
});

    describe("kendo.ui.MultiSelect tag navigation", function () {
        beforeEach(function() {
            select = $("<select multiple=multiple/>").appendTo(document.body);
            populateSelect();
        });
        afterEach(function() {
            if (select.data("kendoMultiSelect")) {
                select.data("kendoMultiSelect").destroy();
            }

            select.parents(".k-widget").remove();
        });

    it("MultiSelect focuses last tag if input is empty", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["1", "2"]);

        multiselect.input.focus();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.LEFT
        });

        var tag = multiselect.tagList.children().last();

        assert.isOk(tag.hasClass("k-state-focused"));
    });

    it("MultiSelect focuses previous tag if input is empty", function() {
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

        assert.equal(tag.index(), 0);
        assert.isOk(tag.hasClass("k-state-focused"));
    });

    it("MultiSelect persist focus to the first LI on LEFT", function() {
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

        assert.equal(tag.index(), 0);
        assert.isOk(tag.hasClass("k-state-focused"));
    });

    it("MultiSelect focuses next tag if any is focused", function() {
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

        assert.equal(tag.index(), 1);
        assert.isOk(tag.hasClass("k-state-focused"));
    });

    it("MultiSelect un-focuses last tag if RIGHT is pressed ", function() {
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

        assert.equal(tag, null);
    });

    it("MultiSelect un-focuses tag on selection", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.input.mousedown();

        multiselect.currentTag(multiselect.tagList.children().last());

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.ENTER
        });

        var tag = multiselect.currentTag();

        assert.equal(tag, null);
    });

    it("MultiSelect deletes focused tag", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["1", "2"]);
        multiselect.input.focus();

        multiselect.currentTag(multiselect.tagList.children().last());

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DELETE
        });

        assert.equal(multiselect.currentTag(), null);
        assert.equal(multiselect.tagList.children().length, 1);
    });

    it("MultiSelect deletes focused tag when source is filtered", function() {
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

        assert.equal(multiselect.currentTag(), null);
        assert.equal(multiselect.tagList.children().length, 1);
        assert.equal(multiselect.tagList.children().eq(0).text().indexOf("Option2"), 0);
    });

    it("MultiSelect deletes last tag on BACKSPACE if input is empty", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["0", "1"]);
        multiselect.input.focus();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.BACKSPACE
        });

        assert.equal(multiselect.currentTag(), null);
        assert.equal(multiselect.tagList.children().length, 1);
        assert.equal(multiselect.tagList.children().eq(0).find("span").html(), "Option0");
    });

    it("MultiSelect does not raise exception on DELETE", function() {
        var multiselect = new MultiSelect(select);
        multiselect.input.focus();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.BACKSPACE
        });

        assert.isOk(true);
    });

    it("MultiSelect focuses first tag on HOME", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["0", "1"]);
        multiselect.input.focus();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.HOME
        });

        var tag = multiselect.currentTag();

        assert.equal(tag.index(), 0);
    });

    it("MultiSelect focuses last tag on END", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["0", "1"]);
        multiselect.input.focus();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.END
        });

        var tag = multiselect.currentTag();

        assert.equal(tag.index(), 1);
    });

    it("MultiSelect closes popup when deletes tag", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["0", "1"]);
        multiselect.input.click();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.BACKSPACE
        });

        assert.isOk(!multiselect.popup.visible());
    });

    it("MultiSelect highlights last item of the popup on END", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["0", "1"]);
        multiselect.open();

        multiselect.input.focus().trigger({
            type: "keydown",
            keyCode: keys.END
        });

        var item = multiselect.current();

        assert.equal(item[0], multiselect.ul.children().last()[0]);
    });

    it("MultiSelect clears focused tag when navigate through the popup", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["0", "1"]);
        multiselect.open();

        multiselect.currentTag(multiselect.tagList.children().first());
        multiselect.input.focus().trigger({
            type: "keydown",
            keyCode: keys.END
        });

        assert.equal(multiselect.currentTag(), null);
    });

    it("MultiSelect highlights first item of the popup on HOME", function() {
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

        assert.equal(item[0], multiselect.ul.children(":visible").first()[0]);
    });

    it("MultiSelect clears focused tag when navigate through the popup", function() {
        var multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["0", "1"]);
        multiselect.open();

        multiselect.currentTag(multiselect.tagList.children().first());
        multiselect.input.focus().trigger({
            type: "keydown",
            keyCode: keys.HOME
        });

        assert.equal(multiselect.currentTag(), null);
    });

    it("MultiSelect clears selection in selected items on ESC", function() {
        var multiselect = new MultiSelect(select, { value: "1" });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.HOME
        });
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.ESC
        });

        assert.equal(multiselect.currentTag(), null);
    });

    it("MultiSelect scrolls content down", function() {
        populateSelect(100);
        var multiselect = new MultiSelect(select, {
            animation: false
        });

        stub(multiselect.listView, {
            scrollWith: multiselect.listView.scrollWith
        });

        multiselect.open();
        multiselect.input.trigger({ type: "keydown", keyCode: keys.PAGEDOWN });

        assert.equal(multiselect.listView.calls("scrollWith"), 1);
        assert.equal(multiselect.listView.args("scrollWith")[0], multiselect.listView.screenHeight());
    });

    it("MultiSelect scrolls content up", function() {
        populateSelect(100);
        var multiselect = new MultiSelect(select, {
            animation: false
        });

        stub(multiselect.listView, {
            scrollWith: multiselect.listView.scrollWith
        });

        multiselect.open();
        multiselect.input.trigger({ type: "keydown", keyCode: keys.PAGEUP });

        assert.equal(multiselect.listView.calls("scrollWith"), 1);
        assert.equal(multiselect.listView.args("scrollWith")[0], -1 * multiselect.listView.screenHeight());
    });

    it("MultiSelect prevents default on PAGEDOWN", function() {
        populateSelect(100);
        var multiselect = new MultiSelect(select, {
            animation: false
        });

        multiselect.open();
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.PAGEDOWN,
            preventDefault: function() {
                assert.isOk(true);
            }
        });
    });
    });
}());
