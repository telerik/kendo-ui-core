(function() {
    var keys = kendo.keys;
    var create = SplitterHelpers.create;

    module("splitter aria", SplitterHelpers.basicModule);

    test("adds role group to the panes", function() {
        var splitter = create();

        var panes = splitter.dom.find(".k-pane");

        equal(panes.length, 2);
        equal(panes.eq(0).attr("role"), "group");
        equal(panes.eq(1).attr("role"), "group");
    });

    test("adds role separator to the splitbars", function() {
        var splitter = create();

        var splitbars = splitter.dom.find(".k-splitbar");

        equal(splitbars.length, 1);
        equal(splitbars.eq(0).attr("role"), "separator");
        equal(splitbars.eq(0).attr("aria-expanded"), "true");
    });

    test("sets aria-expanded=false when collapse pane", function() {
        var splitter = create({
               panes: [ { collapsible: true }, {} ]
           });
        var splitbar = splitter.dom.find(".k-splitbar");

        splitbar.focus().press({
            ctrlKey: true,
            keyCode: keys.LEFT
        });

        equal(splitbar.attr("aria-expanded"), "false");
   });
})();
