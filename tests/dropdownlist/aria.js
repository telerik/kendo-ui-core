(function() {
    var DropDownList = kendo.ui.DropDownList,
    input;

    module("kendo.ui.DropDownList Aria", {
        setup: function() {
            kendo.ns = "kendo-";
            input = $("<input />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.ns = "";
            var ddl = input.data("kendoDropDownList");

            if (ddl) {
                ddl.destroy();
                ddl.wrapper.remove();
            } else {
                input.remove();
            }
        }
    });

  test("DropDownList renders role='listbox'", function() {
      var dropdownlist = new DropDownList(input);

      equal(dropdownlist.wrapper.attr("role"), "listbox");
  });

  test("DropDownList renders aria-haspopup", function() {
      var dropdownlist = new DropDownList(input);

      equal(dropdownlist.wrapper.attr("aria-haspopup"), "true");
  });

  test("DropDownList renders aria-expanded", function() {
      var dropdownlist = new DropDownList(input);

      equal(dropdownlist.wrapper.attr("aria-expanded"), "false");
  });

  test("DropDownList renders aria-owns", function() {
      var dropdownlist = new DropDownList(input.attr("id", "test"));

      equal(dropdownlist.wrapper.attr("aria-owns"), dropdownlist.ul.attr("id"));
  });

  test("DropDownList renders aria-activedescendant", function() {
      var dropdownlist = new DropDownList(input.attr("id", "test"), {
          dataSource: ["Item", "Item2"]
      });

      equal(dropdownlist.wrapper.attr("aria-activedescendant"), dropdownlist.current()[0].id);
  });

  test("DropDownList renders aria-selected", function() {
      var dropdownlist = new DropDownList(input.attr("id", "test"), {
          dataSource: ["Item", "Item2"]
      });

      equal(dropdownlist.current().attr("aria-selected"), "true");
  });

  //filter input
  test("DropDownList renders role='listbox' to filter input", function() {
      var dropdownlist = new DropDownList(input, {
          filter: "startswith"
      });

      equal(dropdownlist.filterInput.attr("role"), "listbox");
  });

  test("DropDownList renders aria-haspopup to filter input", function() {
      var dropdownlist = new DropDownList(input, {
          filter: "startswith"
      });

      equal(dropdownlist.filterInput.attr("aria-haspopup"), "true");
  });

  test("DropDownList renders aria-expanded to filter input", function() {
      var dropdownlist = new DropDownList(input, {
          filter: "startswith"
      });

      equal(dropdownlist.filterInput.attr("aria-expanded"), "false");
  });

  test("DropDownList renders aria-owns to filter input", function() {
      var dropdownlist = new DropDownList(input.attr("id", "test"), {
          filter: "startswith"
      });

      equal(dropdownlist.filterInput.attr("aria-owns"), dropdownlist.ul.attr("id"));
  });

  test("DropDownList renders aria-activedescendant", function() {
      var dropdownlist = new DropDownList(input.attr("id", "test"), {
          filter: "startswith",
          dataSource: ["Item", "Item2"]
      });

      equal(dropdownlist.filterInput.attr("aria-activedescendant"), dropdownlist.current()[0].id);
  });

    test("widget adds activedescendant to the wrapper when optionLabel is focused", 3, function() {
        var dropdownlist = new DropDownList(input, {
            filter: "contains",
            dataSource: [
                { item: "item1" },
                { item: "item2" }
            ],
            dataTextField: "item",
            dataValueField: "item",
            optionLabel: "Select..."
        });

        var current = dropdownlist.current();

        ok(current.attr("id"));
        ok(current.hasClass("k-list-optionlabel"));
        equal(dropdownlist.wrapper.attr("aria-activedescendant"), dropdownlist.current()[0].id);
    });

    test("widget removes aria id from the optionLabel", 1, function() {
        var dropdownlist = new DropDownList(input, {
            filter: "contains",
            dataSource: [
                { item: "item1" },
                { item: "item2" }
            ],
            dataTextField: "item",
            dataValueField: "item",
            optionLabel: "Select..."
        });

        dropdownlist.select(1);

        var optionLabel = dropdownlist.list.find(".k-list-optionlabel");

        ok(!optionLabel.attr("id"));
    });

    test("widget takes aria-label attribute", 1, function() {
        var dropdownlist = new DropDownList(input.attr("aria-label", "labeltext"));

        equal(dropdownlist.wrapper.attr("aria-label"), "labeltext");
    });

    test("widget takes aria-labelledby attribute", 1, function() {
        var dropdownlist = new DropDownList(input.attr("aria-labelledby", "labelID"));

        equal(dropdownlist.wrapper.attr("aria-labelledby"), "labelID");
    });

    test("widget sets aria-labelledby attribute to label's id", 2, function() {
        var label = input.before("<label id='labelID' for='ddInput'>labeltext</label>").prev("label");
        var dropdownlist = new DropDownList(input.attr("id", "ddInput"));

        ok(dropdownlist.wrapper.attr("aria-labelledby"));
        equal(dropdownlist.wrapper.attr("aria-labelledby"), label.attr("id"));

        label.remove();
    });

    test("widget sets aria-labelledby attribute to label's generated id", 2, function() {
        var label = input.before("<label for='ddInput'>labeltext</label>").prev("label");
        var dropdownlist = new DropDownList(input.attr("id", "ddInput"));

        ok(dropdownlist.wrapper.attr("aria-labelledby"));
        equal(dropdownlist.wrapper.attr("aria-labelledby"), label.attr("id"));

        label.remove();
    });
})();
