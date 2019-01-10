(function() {
    var keys = kendo.keys;
    var panelbar;
    var ul;

    describe("panelbar navigation", function () {
        beforeEach(function() {


            ul = $('<ul />').appendTo(Mocha.fixture);

            panelbar = new kendo.ui.PanelBar(ul);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);


        });

    function addItems(count, parent) {
        for (var i = 0; i < count; i++) {
            panelbar.append({
                text: "Item" + i
            }, parent);
        }
    }


    it("PanelBar adds tabindex", function() {
        assert.equal(ul.attr("tabindex"), 0);
    });

    it("PanelBar selects first item on focus", function() {
        addItems(2);

        ul.focus();

        var first = ul.children(":first");
        assert.isOk(first.children(":first").hasClass("k-state-focused"));
    });

    it("PanelBar clears focused item on blur", function() {
        addItems(2);

        ul.focus();
        ul.blur();

        var first = ul.children(":first");
        assert.isOk(!first.children(":first").hasClass("k-state-focused"));
    });

    it("PanelBar selects next item on key DOWN", function() {
        addItems(2);

        ul.focus();
        ul.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        assert.isOk(ul.children(":last").children(".k-link").hasClass("k-state-focused"));
        assert.isOk(!ul.children(":first").children(".k-link").hasClass("k-state-focused"));
    });

    it("PanelBar misses next item if disabled", function() {
        addItems(3);

        panelbar.enable(ul.children().eq(1), false);

        ul.focus();

        ul.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        assert.isOk(ul.children(":last").children(".k-link").hasClass("k-state-focused"));
    });

    it("PanelBar selects first item of group", function() {
        addItems(2);
        addItems(2, ul.children(":first"));

        ul.focus();
        ul.data("kendoPanelBar").expand(ul.children(":first"));
        ul.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        assert.isOk(ul.children(":first").find("li:first > span.k-link").hasClass("k-state-focused"));
    });

    it("PanelBar selects next item if current is last in a group", function() {
        addItems(2);
        addItems(2, ul.children(":first"));

        ul.focus();
        panelbar.expand(ul.children(":first"));
        panelbar._current(ul.children(":first").find("li:last"));

        ul.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        assert.isOk(ul.children(":last").children("span.k-link").hasClass("k-state-focused"));
    });

    it("PanelBar selects first if last is selected", function() {
        addItems(2);
        addItems(2, ul.children(":first"));

        ul.focus();
        panelbar.expand(ul.children(":first"));
        panelbar._current(ul.children(":last"));

        ul.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        assert.isOk(ul.children(":first").children("span.k-link").hasClass("k-state-focused"));
    });

    it("PanelBar selects first on HOME key", function() {
        addItems(2);
        addItems(2, ul.children(":first"));

        ul.focus();
        panelbar.expand(ul.children(":first"));
        panelbar._current(ul.children(":last"));

        ul.trigger({
            type: "keydown",
            keyCode: keys.HOME
        });

        assert.isOk(ul.children(":first").children("span.k-link").hasClass("k-state-focused"));
    });

    it("PanelBar selects last on END key", function() {
        addItems(2);
        addItems(2, ul.children(":first"));

        ul.focus();
        panelbar.expand(ul.children(":first"));

        ul.trigger({
            type: "keydown",
            keyCode: keys.END
        });

        assert.isOk(ul.children(":last").children("span.k-link").hasClass("k-state-focused"));
    });

    it("PanelBar selects prev item on key UP", function() {
        addItems(2);

        ul.focus();
        ul.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        ul.trigger({
            type: "keydown",
            keyCode: keys.UP
        });

        assert.isOk(ul.children(":first").children(".k-link").hasClass("k-state-focused"));
        assert.isOk(!ul.children(":last").children(".k-link").hasClass("k-state-focused"));
    });

    it("PanelBar selects prev parent item", function() {
        addItems(2);
        addItems(2, ul.children(":first"));

        ul.focus();
        panelbar.expand(ul.children(":first"));
        panelbar._current(ul.children(":first").find("li:first"));

        ul.trigger({
            type: "keydown",
            keyCode: keys.UP
        });

        assert.isOk(ul.children(":first").children(".k-link").hasClass("k-state-focused"));
    });

    it("PanelBar selects last if no prev", function() {
        addItems(2);
        addItems(2, ul.children(":first"));

        ul.focus();
        panelbar.expand(ul.children(":first"));
        panelbar._current(ul.children(":first").find("li:first"));

        ul.trigger({
            type: "keydown",
            keyCode: keys.UP
        });

        ul.trigger({
            type: "keydown",
            keyCode: keys.UP
        });

        assert.isOk(ul.children(":last").children(".k-link").hasClass("k-state-focused"));
    });

    it("PanelBar selects prev nested and visible item", function() {
        addItems(2);
        addItems(2, ul.children(":first"));
        addItems(2, ul.children(":first").children(".k-group").children(":last"));

        ul.focus();
        panelbar.expand(ul.children(":first"));
        panelbar.expand(ul.children(":first").children(".k-group").children(":last"));
        panelbar._current(ul.children(":last"));

        ul.trigger({
            type: "keydown",
            keyCode: keys.UP
        });

        assert.isOk(ul.children(":first")
             .children(".k-group").children(":last")
             .children(".k-group").children(":last")
             .children("span.k-link")
             .hasClass("k-state-focused"));
    });

    it("PanelBar misses prev item if disabled", function() {
        addItems(3);

        panelbar.enable(ul.children().eq(1), false);

        ul.focus();
        panelbar._current(ul.children(":last"));

        ul.trigger({
            type: "keydown",
            keyCode: keys.UP
        });

        assert.isOk(ul.children(":first").children(".k-link").hasClass("k-state-focused"));
    });

    it("PanelBar moves focus to last element in the last expanded group", function() {
        addItems(3);
        addItems(2, ul.children(":last"));

        ul.focus();
        panelbar.expand(ul.children(":last"));
        panelbar._current(ul.children(":first"));

        ul.trigger({
            type: "keydown",
            keyCode: keys.UP
        });

        assert.isOk(ul.children(":last").children(".k-group").children(":last").children(".k-link").hasClass("k-state-focused"));
    });

    it("PanelBar expands current focused item on Enter", function() {
        addItems(3);
        addItems(2, ul.children(":first"));

        ul.focus();
        panelbar._current(ul.children(":first"));

        ul.trigger({
            type: "keydown",
            keyCode: keys.ENTER
        });

        assert.isOk(ul.children(":first").children(".k-group:visible")[0]);
    });

    it("PanelBar selects item on Enter", function() {
        addItems(3);
        addItems(2, ul.children(":first"));

        ul.focus();
        panelbar._current(ul.children(":first"));

        ul.trigger({
            type: "keydown",
            keyCode: keys.ENTER
        });

        assert.isOk(ul.children(":first").children(".k-link").hasClass("k-state-selected"));
    });

    it("PanelBar collapses expanded group", function() {
        addItems(3);
        addItems(2, ul.children(":first"));

        ul.focus();
        panelbar._current(ul.children(":first"));

        ul.trigger({
            type: "keydown",
            keyCode: keys.ENTER
        });

        ul.trigger({
            type: "keydown",
            keyCode: keys.ENTER
        });

        assert.isOk(!ul.children(":first").children(".k-group").is(":visible"));
    });

    it("PanelBar makes clicked element focused", function() {
        addItems(3);

        var item = ul.children().eq(1);

        ul.focus();
        panelbar._click(item.find(".k-link"));
        assert.equal(panelbar._focused[0], item[0]);
    });

    it("PanelBar selects next visible item", function() {
        addItems(3);
        ul.find("li:eq(1)").hide();
        ul.focus();

        ul.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        assert.isOk(ul.children(":last").find(".k-link").hasClass("k-state-focused"));
    });

    it("PanelBar selects prev visible item", function() {
        addItems(3);
        ul.find("li:eq(1)").hide();
        ul.focus();

        ul.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        ul.trigger({
            type: "keydown",
            keyCode: keys.UP
        });

        assert.isOk(ul.children(":first").find(".k-link").hasClass("k-state-focused"));
    });

    });
}());
