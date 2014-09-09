(function() {

var ComboBox = kendo.ui.ComboBox,
    combobox,
    input;

module("kendo.ui.ComboBox initialization", {
    setup: function() {
        kendo.ns = "kendo-";
        input = $("<input />").appendTo(QUnit.fixture);
    },
    teardown: function() {
        kendo.ns = "";

        combobox.destroy();
        kendo.destroy(QUnit.fixture);
    }
});

test("kendoComboBox attaches a combobox object to target", function() {
   combobox = input.kendoComboBox({ data: [] }).data("kendoComboBox");

   ok(input.data("kendoComboBox") instanceof ComboBox);
});

test("kendoComboBox extends passed options", function() {
    combobox = new ComboBox(input, { test: 1});

    var options = combobox.options;

    notEqual(options.test, undefined);
    equal(options.test, 1);
});

test("wraps element if no wrapper span.k-widget and hide element", function() {
   input.wrap("<span class='test'/>");

   combobox = new ComboBox(input);

   var wrapper = combobox.wrapper;

   ok(wrapper.is("span"));
   ok(wrapper.parent().is("span.test"));
   ok(wrapper.hasClass("k-widget k-combobox k-header"));
   ok(!input.is(":visible"));

   input.parent().remove();
});

test("create text input", function() {
   combobox = new ComboBox(input.attr("name", "combo1"), {
       text: "test"
   });

   var text = combobox.input;

   ok(text.is("input"));
   ok(text.hasClass("k-input"));
   equal(text.val(), "test");
   equal(text.attr("autocomplete"), "off");
   equal(text.attr("name"), "combo1_input");
});

test("text input should be wrapped with span", function(){
   combobox = new ComboBox(input);

   var comboWrapper = combobox.input.parent();

   ok(comboWrapper.is("span"));
   ok(comboWrapper.hasClass("k-dropdown-wrap k-state-default"));
});

test("include arrow after input.k-input", function(){
   combobox = new ComboBox(input);

   var spanArrow = combobox.input.next(),
       arrow = spanArrow.children().eq(0);

   ok(spanArrow.is("span"));
   ok(spanArrow.hasClass("k-select"));
   ok(arrow.is("span"));
   ok(arrow.hasClass("k-icon k-i-arrow-s"));
   equal(arrow.html(), "select");
});

test("text input should copy value of the hidden input on create", function() {
   combobox = new ComboBox(input.val("item"), {
        autoBind: false
   });

   equal(combobox.input.val(), input.val());
});

test("data source is when pass DataSource", function() {
   var dataSource = kendo.data.DataSource.create([{text: 1, value: 1}, {text:2, value:2}]);

   combobox = new ComboBox(input, {dataSource: dataSource});

    ok(combobox.dataSource);
    equal(combobox.dataSource, dataSource);
    equal(combobox.options.dataSource, dataSource);
});

test("data source is initialized from options when it is an array", function() {
    var data = [{text: 1, value: 1}, {text:2, value:2}];

    combobox = new ComboBox(input, data);

    ok(combobox.dataSource);
    combobox.dataSource.read();
    equal(combobox.dataSource.data().length, 2);
});

test("data source is initialized from options.dataSource when array is passed", function() {
    var data = [{text: 1, value: 1}, {text:2, value:2}];

    combobox = new ComboBox(input, {
        dataSource: data
    });

    ok(combobox.dataSource);
    combobox.dataSource.read();
    equal(combobox.dataSource.data().length, 2);
});

test("data source is initialized from options.dataSource", function() {
   var data = [{text: 1, value: 1}, {text:2, value:2}];

   combobox = new ComboBox(input, {
       dataSource: {
           data: data
       }
   });

   ok(combobox.dataSource);
   combobox.dataSource.read();
   equal(combobox.dataSource.data().length, 2);
});

test("data source is initialized from OPTION items + one custom OPTION", function() {
   var select = $("<select><option value=1>Chai</option><option value=1 selected='selected'>Chai</option></select>");

   combobox = new ComboBox(select);

   var data = combobox.dataSource.view();

   ok(combobox.dataSource);
   equal(data.length, 2);
   equal(data[0].text, "Chai");
   equal(data[0].value, "1");

});

test("ComboBox persists custom value after re-bind", function() {
   var select = $("<select></select>");

   combobox = new ComboBox(select);

   combobox.value("custom");
   combobox.dataSource.data(["test"]);

   equal(combobox.value(), "custom");
});

test("selected index is get from select element", function() {
   var select = $("<select><option value=1>Chai</option><option value=1 selected='selected'>Chai</option></select>");

   combobox = new ComboBox(select);

   equal(combobox.options.index, 1);
});

test("set text if select and not autoBind", function() {
   var select = $("<select><option value=1>Chai</option><option value=1 selected='selected'>Chai</option></select>");

   combobox = new ComboBox(select, {autoBind: false});

   equal(combobox.input.val(), "Chai");
});

test("retrived data from OPTIONS does not override options.dataSource", function() {
   var select = $("<select><option value=1>Chai</option><option value=2 selected='selected'>Beverages</option></select>"),
       data = [{text: "Foo", value: "Foo"}];

   combobox = new ComboBox(select, {
       dataSource: {
           data: data
       }
   });

   ok(combobox.dataSource);

   combobox.dataSource.read();
   data = combobox.dataSource.data();

   equal(data.length, 1);
   equal(data[0].text, "Foo");
   equal(data[0].value, "Foo");
});

test("combobox does not select first item if initialized from empty select", function() {
   var select = $("<select></select>");

   combobox = new ComboBox(select, {
       dataSource: [{text: "Foo", value: "Foo"}],
       dataTextField: "text",
       dataValueField: "value"
   });

   ok(!combobox.value());
   ok(!combobox.text());
});

test("combobox selects first item when initalized from select with TEXT node", function() {
   var select = $("<select></select>");

   select.append(document.createTextNode(""));

   combobox = new ComboBox(select, {
       dataSource: [{text: "Foo", value: "Foo"}],
       dataTextField: "text",
       dataValueField: "value"
   });

   ok(!combobox.value());
   ok(!combobox.text());
});

test("combobox initializes an UL for its items", function() {
     combobox = new ComboBox(input, []);

     ok(combobox.ul);
     ok(combobox.ul.is("ul"));
     equal(combobox.ul.css("overflow"), "auto");
});

test("combobox initializes a popup for its items", function() {
     combobox = new ComboBox(input, []);

     ok(combobox.popup);
     ok(combobox.popup instanceof kendo.ui.Popup);
     ok(combobox.popup.options.anchor[0], combobox.input[0]);
     ok(combobox.popup.element[0], combobox.ul[0]);
});

test("combobox shrink ul if the height of the items is more then options.height", function() {
   var data = [{text: "foo", value: 1},
               {text:2, value:2},
               {text:2, value:2},
               {text:2, value:2},
               {text:2, value:2},
               {text:2, value:2},
               {text:2, value:2},
               {text:2, value:2},
               {text:2, value:2}];

      combobox = new ComboBox(input, data);
      combobox.options.height = 100;

      combobox.dataSource.read();

      equal(combobox.list.css("height"), "100px");
});

test("combobox substracts height of header from list", function() {
   var data = [{text: "foo", value: 1},
               {text:2, value:2},
               {text:2, value:2},
               {text:2, value:2},
               {text:2, value:2},
               {text:2, value:2},
               {text:2, value:2},
               {text:2, value:2},
               {text:2, value:2}];

      combobox = new ComboBox(input, {
          dataSource: data,
          headerTemplate: "<div>Header</div>"
      });

      combobox.options.height = 100;

      combobox.dataSource.read();
      combobox.open();

      equal(combobox.ul.height(), 100 - combobox.ul[0].offsetTop);
});

test("combobox populates its list when the datasource changes", function() {
   combobox = new ComboBox(input, {
       dataTextField: "text",
       dataValueField: "value",
       dataSource: [{text: "foo", value: 1}, {text:2, value:2}]
   });

   combobox.dataSource.read();

   equal(combobox.ul.children("li").length, 2);
   equal(combobox.ul.children("li").first().text(), "foo");
});

test("template should render item directly if datatextField is empty string", function(){
    combobox = new ComboBox(input, { dataTextField : ""});

    equal(combobox.template("foo"), '<li tabindex="-1" role="option" unselectable="on" class="k-item">foo</li>');
});

test("template should use defined datatextField", function(){
    combobox = new ComboBox(input, {
        dataTextField : "ProductName"
    });

    equal(combobox.template({ProductName: "foo"}), '<li tabindex="-1" role="option" unselectable="on" class="k-item">foo</li>');
});

test("changing the template", function() {
    combobox = new ComboBox(input, {
        datatextField: "",
        template: "#= data.toUpperCase() #"
    });

    equal(combobox.template("foo"), '<li tabindex="-1" role="option" unselectable="on" class="k-item">FOO</li>');
    equal(combobox.options.template, "#= data.toUpperCase() #");
});

test("defining header template", function() {
    combobox = new ComboBox(input, {
        template: "#= data.toUpperCase() #",
        headerTemplate: "<div>Header</div>"
    });

    var list = combobox.list;

    equal(list.children()[0].outerHTML, "<div>Header</div>");
});

test("should populate text and value if items", function() {
   combobox = new ComboBox(input, {
       dataTextField: "text",
       dataValueField: "value",
       dataSource: [{text: "foo", value: 1}, {text:2, value:2}],
       index: 0
   });

   equal(combobox.text(), "foo");
   equal(combobox.value(), "1");
});

test("disabled input rendered with wrapper.k-state-disabled", function() {
   input.attr("disabled", "disabled").kendoComboBox();

   combobox = input.data("kendoComboBox");

   ok(combobox._inputWrapper.hasClass("k-state-disabled"));
   ok(combobox.input.prop("disabled"));
});

test("ComboBox disables on init", function() {
   input.kendoComboBox({
        enabled: false
   });

   combobox = input.data("kendoComboBox");

   ok(combobox._inputWrapper.hasClass("k-state-disabled"));
   ok(combobox.input.prop("disabled"));
});

test("rebuild select options if data", function() {
   var select = $("<select><option>&lt;script&gt;alert(1)&lt;/script&gt;</option></select>").appendTo(QUnit.fixture);

   combobox = new ComboBox(select);

   equal(select.children(":first")[0].text, "<script>alert(1)<\/script>");
});

test("Encodes the text value of the option element", function() {
   var select = $("<select><option value=1>foo1</option><option value=2>foo2</option><option value=3>foo3</option></select>").appendTo(QUnit.fixture);

   combobox = new ComboBox(select, {
       dataTextField: "text",
       dataValueField: "value",
       dataSource: [{text: "Foo&", value: 0}, {text: 0, value:5}]
   });

   equal(select.find("option:first").html(), "Foo&amp;");
});

test("value with space should be added to option", 1, function() {
   var select = $("<select><option value=1>foo1</option><option value=2>foo2</option><option value=3>foo3</option></select>").appendTo(QUnit.fixture);

   combobox = new ComboBox(select, {
       index: 0,
       value: "",
       dataTextField: "text",
       dataValueField: "value",
       dataSource: [{text: "Foo", value: "Foo 1"}, {text: "Foo 2", value:"Foo 2"}],
       dataBound: function() {
           equal(this.value(), "Foo 1");
       }
   });
});

test("copy input styles to the visible input", function() {
   input.css("color", "red").kendoComboBox();

   var color = input.css("color");

   combobox = input.data("kendoComboBox");

   equal(combobox.input.css("color"), color);
   ok(combobox.input.is(":visible"));

});

test("copy input className to the visible input", function() {
   input.addClass("test").kendoComboBox();

   combobox = input.data("kendoComboBox");

   ok(combobox.input.hasClass("test"));
});

test("copy input className to the wrapper", function() {
   input.addClass("test").kendoComboBox();

   combobox = input.data("kendoComboBox");

   ok(combobox.wrapper.hasClass("test"));
});

test("set height if items height is bigger than options.height", function() {
   var dataSource = new kendo.data.DataSource.create([{text: 1, value: 1}, {text:2, value:2}]);
   dataSource.read();

   combobox = new ComboBox(input, {
       autoBind: false,
       dataSource: dataSource,
       template: "<div style='height:30px'>#= text # </div>",
       height: 50
   });

   combobox.refresh();

   equal(combobox.list.height(), 50);
});

if (!kendo.support.touch) {
    test("pointer over widget should add hover state", function() {
        var data = [{text: 1, value: 1}, {text:2, value:2}];

        combobox = new ComboBox(input, {
             dataSource: data
        });

        var wrap = combobox.wrapper.children(".k-dropdown-wrap");

        wrap.mouseenter();

        ok(wrap.hasClass("k-state-hover"));
    });
}

test("leaving widget should remove hover state", function() {
    var data = [{text: 1, value: 1}, {text:2, value:2}];

    combobox = new ComboBox(input, {
         dataSource: data
    });

    wrap = combobox.wrapper.children(".k-dropdown-wrap");
    wrap.mouseenter();
    wrap.mouseleave();

    ok(!wrap.hasClass("k-state-hover"));
});

test("set selectedIndex", function() {
    combobox = input.kendoComboBox().data("kendoComboBox");

    equal(combobox.selectedIndex, -1);
});

test("set selectedIndex when autoBind: false", function() {
    combobox = input.kendoComboBox({ autoBind: false }).data("kendoComboBox");

    equal(combobox.selectedIndex, -1);
});

test("do not suggest on init", function() {
    combobox = input.kendoComboBox({
        dataSource: ["text1", "text2"],
        suggest: true
    }).data("kendoComboBox");

    equal(combobox.input.val(), "");
});

test("list.mousedown should focus input", function() {
    var data = [{text: 1, value: 1}, {text:2, value:2}];

    combobox = new ComboBox(input, {
         dataSource: data
    });

    combobox.input.focus();
    combobox.open();
    combobox.list.mousedown();

    equal(document.activeElement.nodeName, "INPUT");
});

test("Calling triggerHandler('focus') focuses visible one", function() {
    var data = [{text: 1, value: 1}, {text:2, value:2}];

    combobox = new ComboBox(input, {
         dataSource: data
    });

    input.triggerHandler("focus");

    equal(document.activeElement, combobox.input[0]);
});

test("resetting dataSource detaches the previouse events", 0, function() {
    combobox = new ComboBox($("<input/>").appendTo(QUnit.fixture));

    var dataSource = combobox.dataSource;

    combobox._dataSource();

    combobox.bind("dataBound", function() {
        ok(false, "Change event is not detached");
    });

    dataSource.read();
});

test("resetting DataSource rebinds the widget", function() {
    combobox = new ComboBox($("<input/>").appendTo(QUnit.fixture),{
        dataTextField: "text",
        dataValueField: "value"
    });

    combobox.setDataSource(new kendo.data.DataSource({
        data:[{text: 1, value: 1}, {text:2, value:2}]
    }));

    equal(combobox.ul.children().length, 2);
});

test("Set data source does not change selected index", function() {
   var select = $("<select></select>").appendTo(QUnit.fixture);

   combobox = new ComboBox(select, {
        dataTextField: "text",
        dataValueField: "value",
        index: -1
   });

   combobox.setDataSource(new kendo.data.DataSource({
       data:[{text: 1, value: 1}, {text:2, value:2}]
   }));

   combobox.open();

   equal(combobox.value(), "");
});

test("Persist value when rebind data source", function() {
    combobox = new ComboBox(input,{
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [{text: 1, value: 1}, {text:2, value:2}],
        value: "1"
    });

    combobox.value("");

    combobox.refresh();

    equal(combobox.value(), "");
});

test("persist tabIndex of the original element", function() {
    combobox = new ComboBox($("<input tabindex='5'/>").appendTo(QUnit.fixture));

    var text = combobox.input;

    equal(text.attr("tabIndex"), 5);
});

test("move accesskey to the visible input", function() {
    combobox = new ComboBox($("<input accesskey='w'/>").appendTo(QUnit.fixture));

    var text = combobox.input;

    equal(text.attr("accesskey"), "w");
});

test("ComboBox sets element value if option.value is defined", function() {
    combobox = input.kendoComboBox({
        dataSource: ["Item1", "Item2"],
        value: "Item2",
    }).data("kendoComboBox");

    equal(combobox.value(), "Item2");
});

test("ComboBox sets element value if option.value is defined (select)", function() {
    combobox = $("<select/>").appendTo(QUnit.fixture).kendoComboBox({
        dataSource: ["Item1", "Item2"],
        value: "Item2",
    }).data("kendoComboBox");

    equal(combobox.value(), "Item2");
});

test("ComboBox displays text if autoBind false", function() {
    combobox = input.kendoComboBox({
        text: "Chai",
        placeholder: "Select...",
        autoBind: false
    }).data("kendoComboBox");

    equal(combobox.text(), "Chai");
});

test("ComboBox copies maxlength attr to the fake input", function() {
    input.attr("maxLength", 10);
    combobox = new kendo.ui.ComboBox(input);

    equal(combobox.input.attr("maxLength"), 10);
});

test("ComboBox set value on refresh", function() {
    input.val("Foo");
    combobox = new kendo.ui.ComboBox(input);

    combobox.dataSource.data(["Boo", "Foo"]);

    equal(combobox.selectedIndex, 1);
});

test("ComboBox does not suggest on load", function() {
    combobox = new kendo.ui.ComboBox(input.val("Item2"), {
        suggest: true,
        value: "Item2",
        autoBind: false
    });

    stub(combobox, {
        suggest: combobox.suggest
    });

    input.focus();
    combobox.dataSource.data(["Boo", "Foo"]);

    equal(combobox.calls("suggest"), 0);
    equal(combobox.text(), "Item2");
});

asyncTest("ComboBox fetches only once on open and not data is returned", function() {
    $.mockjaxSettings.responseTime = 0;
    $.mockjaxSettings.contentType = "application/json";
    $.mockjax({ url: "foo.json", responseText: '[]' });

    var called = 0;
    combobox = new kendo.ui.ComboBox(input.val("Item2"), {
        autoBind: false,
        dataSource: {
            transport: {
                read: "foo.json"
            },
            requestStart: function() {
                called += 1;
            }
        }
    });

    combobox.open();

    setTimeout(function() {
        start();
        $.mockjaxClear();

        equal(called, 1);
    }, 200);
});

asyncTest("form reset support", 2, function() {
    input.attr("value", "123");

    var form = $("<form/>").appendTo(QUnit.fixture).append(input);

    combobox = new ComboBox(input, {
         dataSource: [{text: 1, value: 1}, {text:2, value:2}]
    });

    combobox.select(1);

    form[0].reset();

    setTimeout(function() {
        equal(combobox.element.val(), "123");
        equal(combobox.input.val(), "123");
        start();
    }, 150);
});

test("ComboBox honors readonly attribute", function() {
    combobox = input.attr("readonly", true).kendoComboBox().data("kendoComboBox");

    combobox._arrow.click();

    ok(!combobox.popup.visible());
});

test("ComboBox uses disabled attr over the readonly", function() {
    combobox = input.attr("readonly", true)
                    .attr("disabled", true)
                    .kendoComboBox()
                    .data("kendoComboBox");

    equal(input.attr("readonly"), undefined);
});

asyncTest("ComboBox hides loading image on error", function() {
    combobox = input.kendoComboBox().data("kendoComboBox");

    //simulate request start
    combobox.dataSource.trigger("progress");

    setTimeout(function() {
        start();

        //simulate error
        combobox.dataSource.trigger("error");

        ok(!combobox.wrapper.find(".k-loading").is(":visible"));
    }, 200);
});

test("ComboBox sets options.value to input value on init", function() {
    combobox = input.val("1").kendoComboBox().data("kendoComboBox");

    equal(combobox.options.value, "1");
});

})();
