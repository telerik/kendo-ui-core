(function() {
    var splitter;
    var create = SplitterHelpers.create;
    var keys = kendo.keys;

    module("splitter keyboard navigation", SplitterHelpers.basicModule);

    test("Splitter explicitly call resizing.end() on blur of the splitbar", function() {
        splitter = create();

        var splitbar = splitter.dom.find(".k-splitbar");

        stub(splitter.object.resizing, "end");

        splitbar.focus().blur();

        equal(splitter.object.resizing.calls("end"), 1);
    });

    test("Splitter explicitly presses the clicked bar", function() {
        splitter = create();

        var splitbar = splitter.dom.find(".k-splitbar");

        splitbar.mousedown();

        equal(splitbar[0], document.activeElement);
    });

    test("Splitter moves splitbar to left on key LEFT", function() {
        splitter = create();

        var splitbar = splitter.dom.find(".k-splitbar");

        splitbar.focus().press({ keyCode: keys.LEFT });

        var hint = splitter.object.resizing._resizable.hint;

        equal(hint.position().left, splitbar.position().left - 10);
    });

    test("Splitter moves splitbar to right on key RIGHT", function() {
        splitter = create();

        var splitbar = splitter.dom.find(".k-splitbar");

        splitbar.focus().press({ keyCode: keys.RIGHT });

        var hint = splitter.object.resizing._resizable.hint;

        equal(hint.position().left, splitbar.position().left + 10);
    });

    test("Splitter uses only specific keys depending on the orientation", function() {
        splitter = create();

        var splitbar = splitter.dom.find(".k-splitbar");

        splitbar.focus().press({ keyCode: keys.RIGHT });

        var hint = splitter.object.resizing._resizable.hint;

        equal(hint.position().left, splitbar.position().left + 10);

        splitbar.focus().press({ keyCode: keys.DOWN });

        equal(hint.position().left, splitbar.position().left + 10);
    });

    test("Splitter accepts resized splitbar on ENTER", function() {
        splitter = create();

        var splitbar = splitter.dom.find(".k-splitbar"),
            initialLeft = splitbar.position().left;

        splitbar.focus().press({ keyCode: keys.LEFT });
        splitbar.focus().press({ keyCode: keys.ENTER });

        equal(splitbar.position().left, initialLeft - 10);
    });

    test("Splitter can resize splitbar after previous resize", function() {
        splitter = create();

        var splitbar = splitter.dom.find(".k-splitbar");

        splitbar.focus().press({ keyCode: keys.ENTER });
        splitbar.focus().press({ keyCode: keys.LEFT });

        var hint = splitter.object.resizing._resizable.hint;

        equal(hint.position().left, splitbar.position().left - 10);
    });

    test("Splitter defines navigationKeys depending on the orientation", function() {
        splitter = create({ orientation: "vertical" });

        var navKeys = splitter.object._keys;

        equal(navKeys.decrease, keys.UP);
        equal(navKeys.increase, keys.DOWN);
    });

    test("Resizable handles ESC", function() {
        splitter = create();

        var splitbar = splitter.dom.find(".k-splitbar"),
            initialLeft = splitbar.position().left;

        splitbar.focus().press({ keyCode: keys.LEFT });
        splitbar.focus().press({ type: "keyup", keyCode: keys.ESC });

        var hint = splitter.object.resizing._resizable.hint;

        ok(!hint.is(":visible"));
        equal(splitbar.position().left, initialLeft);
   });

   test("Splitter collapses left pane on CTRL + LEFT", function() {
       splitter = create({
           panes: [ { collapsible: true }, {} ]
       });
       var splitbar = splitter.dom.find(".k-splitbar"),
           pane = splitter.dom.find(".k-pane:first");

       splitbar.focus().press({ ctrlKey: true, keyCode: keys.LEFT });

       equal(pane.width(), 0);
   });

   test("Splitter collapses left pane on CTRL + RIGHT", function() {
       splitter = create({
           panes: [
               { collapsible: true },
               { collapsible: true }
           ]
       });

       var splitbar = splitter.dom.find(".k-splitbar"),
           pane = splitter.dom.find(".k-pane:last");

       splitbar.focus().press({ ctrlKey: true, keyCode: keys.RIGHT });

       equal(pane.width(), 0);
   });

   test("Splitter expands left pane on CTRL + RIGHT", function() {
       splitter = create({
           panes: [
               { collapsible: true },
               { collapsible: true }
           ]
       });

       var splitbar = splitter.dom.find(".k-splitbar"),
           pane = splitter.dom.find(".k-pane:first");

       splitbar.focus().press({ ctrlKey: true, keyCode: keys.LEFT });
       splitbar.focus().press({ ctrlKey: true, keyCode: keys.RIGHT });

       notEqual(pane.width(), 0);
   });

   test("Splitter expands right pane on CTRL + LEFT", function() {
       splitter = create({
           panes: [
               { collapsible: true },
               { collapsible: true }
           ]
       });

       var splitbar = splitter.dom.find(".k-splitbar"),
           pane = splitter.dom.find(".k-pane:last");

       splitbar.focus().press({ ctrlKey: true, keyCode: keys.RIGHT });
       splitbar.focus().press({ ctrlKey: true, keyCode: keys.LEFT });

       notEqual(pane.width(), 0);
   });

   test("Splitter calls resizing.end if pane is process of resizing when press CTRL + LEFT", function() {
       splitter = create({
           panes: [
               { collapsible: true },
               { collapsible: true }
           ]
       });

       var resizing = splitter.object.resizing,
           splitbar = splitter.dom.find(".k-splitbar");

       stub(resizing, "end");

       splitbar.focus().press({ keyCode: keys.RIGHT });
       splitbar.focus().press({ ctrlKey: true, keyCode: keys.LEFT });

       equal(resizing.calls("end"), 1);
   });

   test("Splitter calls resizing.end if pane is process of resizing when press CTRL + RIGHT", function() {
       splitter = create({
           panes: [
               { collapsible: true },
               { collapsible: true }
           ]
       });

       var resizing = splitter.object.resizing,
           splitbar = splitter.dom.find(".k-splitbar");

       stub(resizing, "end");

       splitbar.focus().press({ keyCode: keys.RIGHT });
       splitbar.focus().press({ ctrlKey: true, keyCode: keys.RIGHT });

       equal(resizing.calls("end"), 1);
   });

   test("Splitter adds focused class on focus", function() {
        splitter = create();

        var splitbar = splitter.dom.find(".k-splitbar");

        splitbar.focus();

        ok(splitbar.hasClass("k-state-focused"));
    });

    test("Splitter removes focused class on focus", function() {
        splitter = create();

        var splitbar = splitter.dom.find(".k-splitbar");

        splitbar.focus().blur();

        ok(!splitbar.hasClass("k-state-focused"));
    });
})();
