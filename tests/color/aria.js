module("Color tools", {
    setup: function() {
        cp = $("#x").kendoColorSelectorSimple().data("kendoColorSelectorSimple");
    },
    teardown: function() {
        x.innerHTML = "";
    }
});

test("Simple color selector renders aria-label for each color", function(){
    cp.element.find("li.k-item").each(function(){
        var label = $(this).attr("aria-label");
        ok(label, "aria-label defined on LI elements"); // label defined
        var bg = $(this).find("div");
        var color = kendo.Color.parse(label);
        bg = kendo.Color.parse(bg.css("background-color"));
        ok(color && bg && color.equals(bg), "aria-label is same as background color");
    });
});

test("Simple color selector maintains aria-selected attribute consistent with selection", function(){
    var items = cp.element.find("li.k-item");
    for (var i = 0; i < 5; ++i) {
        var index = Math.floor(items.length * Math.random());
        var li = $(items[index]);
        li.click();
        var a = cp.element.find("li[aria-selected]");
        ok(a.length == 1 && a[0] === li[0]);
    }
});
