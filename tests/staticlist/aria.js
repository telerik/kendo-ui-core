(function() {
    var StaticList = kendo.ui.StaticList,
    input;

    module("kendo.ui.StaticList Aria", {
        setup: function() {
            kendo.ns = "kendo-";
            element = $("<ul></ul>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            element.data("kendoStaticList").destroy();

            kendo.support.touch = false;
            kendo.support.mobileOS = false;
            kendo.ns = "";
        }
    });

  test("StaticList renders aria-selected", function() {
      var staticlist = new StaticList(element, {
          dataSource: ["Item", "Item2"],
          template: "#:data#",
          value: ["Item"]
      });

      staticlist.dataSource.read();

      equal(staticlist.focus().attr("aria-selected"), "true");
  });
})();
