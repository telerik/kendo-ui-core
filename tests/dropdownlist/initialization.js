(function() {
    var DropDownList = kendo.ui.DropDownList,
    select,
    input;

    module("kendo.ui.DropDownList initialization", {
        setup: function() {
            kendo.ns = "kendo-";
            input = $("<input class='test'/>").appendTo(QUnit.fixture);
            select = $("<select></select>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            var element = $(document.body).find("[data-kendo-role=dropdownlist]")

            if (element[0]) {
                try {
                    element.data("kendoDropDownList").destroy();
                } catch(e) {
                    //destroy failed because widget is not fully initialized
                }
                element.closest(".k-dropdown").remove();
            }

            $(".test").remove();

            kendo.support.touch = false;
            kendo.support.mobileOS = false;
            kendo.ns = "";
        }
    });

    test("kendoDropDownList attaches a dropdownlist object to target", function() {
        input.kendoDropDownList({ data: [] });

        ok(input.data("kendoDropDownList") instanceof DropDownList);
    });

    test("kendoDropDownList extends passed options", function() {
        input.kendoDropDownList({test: 1});

        var options = input.data("kendoDropDownList").options;
        notEqual(options.test, undefined)
        equal(options.test, 1);
    });

    test("wraps element if no wrapper span and hide element", function() {
        input.wrap("<span class='test'/>");
        input.kendoDropDownList();

        var wrapper = input.data("kendoDropDownList").wrapper;

        ok(wrapper.parent().is("span.test"));
        ok(wrapper.is("span.k-widget"));
        ok(wrapper.hasClass("k-widget k-dropdown k-header"));
        ok(!input.is(":visible"));
    });

    test("DropDownList creates span when input has k-input class", function() {
        input.addClass("k-input");
        input.kendoDropDownList();

        equal(input.data("kendoDropDownList").wrapper.find(".k-input")[0].nodeName, "SPAN");
    });

    test("set tabIndex to the wrapper", function() {
        input.kendoDropDownList();

        var wrapper = input.data("kendoDropDownList").wrapper;

        equal(wrapper.attr("tabIndex"), 0);
    });

    test("persist tabIndex of the original element", function() {
        input.attr("tabIndex", 5);
        input.kendoDropDownList();

        var wrapper = input.data("kendoDropDownList").wrapper;

        equal(wrapper.attr("tabIndex"), 5);
    });

    test("create text span", function() {
        input.kendoDropDownList();

        var span = input.data("kendoDropDownList").span;

        ok(span.is("span"));
        ok(span.hasClass("k-input"));
    });

    test("text span should wrapped with span", function(){
        input.kendoDropDownList();

        var dropDownWrapper = input.data("kendoDropDownList").span.parent();

        ok(dropDownWrapper.is("span"));
        ok(dropDownWrapper.hasClass("k-dropdown-wrap k-state-default"));
    });

    test("include arrow after span.k-input", function(){
        input.kendoDropDownList();

        var spanArrow = input.data("kendoDropDownList").span.next(),
        arrow = spanArrow.children().eq(0);

        ok(spanArrow.is("span"));
        ok(spanArrow.hasClass("k-select"));
        ok(arrow.is("span"));
        ok(arrow.hasClass("k-icon k-i-arrow-s"));
        equal(arrow.html(), "select");
    });

    test("data source is when pass DataSource", function() {
        var dataSource = kendo.data.DataSource.create([{text: 1, value: 1}, {text:2, value:2}]),
        dropdownlist = new DropDownList(input, {dataSource: dataSource});

        ok(dropdownlist.dataSource);
        equal(dropdownlist.dataSource, dataSource);
        equal(dropdownlist.options.dataSource, dataSource);
    });

    test("data source is initialized from options when it is an array", function() {
        var data = [{text: 1, value: 1}, {text:2, value:2}],
        dropdownlist = new DropDownList(input, data);

        ok(dropdownlist.dataSource);
        dropdownlist.dataSource.read();
        equal(dropdownlist.dataSource.data().length, 2);
    });

    test("data source is initialized from options.dataSource when array is passed", function() {
        var data = [{text: 1, value: 1}, {text:2, value:2}],
        dropdownlist = new DropDownList(input, {
            dataSource: data
        });

        ok(dropdownlist.dataSource);
        dropdownlist.dataSource.read();
        equal(dropdownlist.dataSource.data().length, 2);
    });

    test("data source is initialized from options.dataSource", function() {
        var data = [{text: 1, value: 1}, {text:2, value:2}],
        dropdownlist = new DropDownList(input, {
            dataSource: {
                data: data
            }
        });

        ok(dropdownlist.dataSource);
        dropdownlist.dataSource.read();
        equal(dropdownlist.dataSource.data().length, 2);
    });

    test("data source is initialized from OPTION items", function() {
        var select = $("<select><option value=1>Chai</option><option value=2 selected='selected'>Chai</option></select>").appendTo(QUnit.fixture);
        var dropdownlist = new DropDownList(select);
        var data;

        data = dropdownlist.dataSource.view();

        ok(dropdownlist.dataSource);
        equal(data.length, 2);
        equal(data[0].text, "Chai");
        equal(data[0].value, "1");
    });

    test("dataSource infer OPTION value correctly", function() {
        var select = $("<select><option>Chai</option><option value=2>Chai</option></select>").appendTo(QUnit.fixture),
        dropdownlist = new DropDownList(select),
        data;

        data = dropdownlist.dataSource.view();

        equal(data[0].value, "Chai");
        equal(data[1].value, "2");
    });

    test("if no options, do not set index", function() {
        var select = $("<select/>").appendTo(QUnit.fixture);
        var dropdownlist = new DropDownList(select, {index: 2});

        equal(dropdownlist.options.index, 2);
    });

    test("selected index is got from select element", function() {
        var select = $("<select><option value='1'>Chai</option><option value='2' selected='selected'>Chai</option></select>").appendTo(QUnit.fixture);
        var dropdownlist = new DropDownList(select);

        equal(select[0].selectedIndex, 1);
        equal(dropdownlist.options.index, 1);
    });

    test("set selectedIndex when autoBind:false", function() {
        var dropdownlist = input.kendoDropDownList({ autoBind: false }).data("kendoDropDownList");
        equal(dropdownlist.selectedIndex, -1);
    });

    test("retrived data from OPTIONS does not override options.dataSource", function() {
        var select = $("<select><option value=1>Chai</option><option value=2 selected='selected'>Beverages</option></select>").appendTo(QUnit.fixture),
        data = [{text: "Foo", value: "Foo"}],
        dropdownlist = new DropDownList(select, {
            dataSource: {
                data: data
            }
        });

        ok(dropdownlist.dataSource);

        dropdownlist.dataSource.read();
        data = dropdownlist.dataSource.data();

        equal(data.length, 1);
        equal(data[0].text, "Foo");
        equal(data[0].value, "Foo");
    });

    test("dropdownlist initializes an UL for its items", function() {
        input.attr("id", "dropdownlist");
        var dropdownlist = new DropDownList(input, []);

        ok(dropdownlist.ul);
        ok(dropdownlist.ul.is("ul"));
        ok(dropdownlist.list.attr("id"), input.attr("id") + "-list");
        equal(dropdownlist.listView.content.css("overflow"), "auto");
    });

    test("dropdownlist initializes a popup for its items", function() {
        var dropdownlist = new DropDownList(input, []);

        ok(dropdownlist.popup);
        ok(dropdownlist.popup instanceof kendo.ui.Popup);
        equal(dropdownlist.popup.options.anchor[0], dropdownlist.wrapper[0]);
        equal(dropdownlist.popup.element[0], dropdownlist.list[0]);
    });

    test("dropdownlist shrink ul if the height of the items is more then options.height", function() {
        var data = [{text: "foo", value: 1},
        {text:2, value:2},
        {text:2, value:2},
        {text:2, value:2},
        {text:2, value:2},
        {text:2, value:2},
        {text:2, value:2},
        {text:2, value:2},
        {text:2, value:2}];

        var dropdownlist = new DropDownList(input, data);
        dropdownlist.options.height = 100;

        dropdownlist.dataSource.read();
        dropdownlist.open();

        equal(dropdownlist.list.css("height"), "100px");
    });

    test("dropdownlist populates its list when the datasource changes", function() {
        var dropdownlist = new DropDownList(input, {
            dataTextField: "text",
            dataValueField: "text",
            dataSource: [{text: "foo"}, {text:2}]
        });

        dropdownlist.dataSource.read();

        equal(dropdownlist.ul.children("li").length, 2);
        equal(dropdownlist.ul.children("li").first().text(), "foo");
    });

    test("dropdownlist creates static list view", function() {
        var dropdownlist = new DropDownList(input);

        ok(dropdownlist.listView instanceof kendo.ui.StaticList);
    });

    test("dropdownlist sets default item template", function() {
        var dropdownlist = new DropDownList(input, {
        });

        var template = dropdownlist.listView.options.template;

        equal(template, "#:data#");
    });

    test("dropdownlist sets default item template using dataTextField option", function() {
        var dropdownlist = new DropDownList(input, {
            dataTextField: "test"
        });

        var template = dropdownlist.listView.options.template;

        equal(template, "#:data.test#");
    });

    test("dropdownlist sets a default group template", function() {
        var dropdownlist = new DropDownList(input, {
        });

        var template = dropdownlist.listView.options.groupTemplate;

        equal(template, "#:data#");
    });

    test("dropdownlist supports setting a custom group template", function() {
        var dropdownlist = new DropDownList(input, {
            groupTemplate: "#= data.toUpperCase() #"
        });

        var template = dropdownlist.listView.options.groupTemplate;

        equal(template, "#= data.toUpperCase() #");
    });

    test("dropdownlist sets a default fixed group template", function() {
        var dropdownlist = new DropDownList(input, {
        });

        var template = dropdownlist.listView.options.fixedGroupTemplate;

        equal(template, "#:data#");
    });

    test("dropdownlist supports setting a custom fixed group template", function() {
        var dropdownlist = new DropDownList(input, {
            fixedGroupTemplate: "#= data.toUpperCase() #"
        });

        var template = dropdownlist.listView.options.fixedGroupTemplate;

        equal(template, "#= data.toUpperCase() #");
    });

    test("defining header template", function() {
        var dropdownlist = new DropDownList(input, {
            template: "#= data.toUpperCase() #",
            headerTemplate: "<div>Header</div>"
        });

        var list = dropdownlist.list;

        equal(list.children()[0].outerHTML, "<div>Header</div>");
    });

    test("defining option label template", function() {
        var dropdownlist = new DropDownList(input, {
            optionLabel: "Select...",
            optionLabelTemplate: "#= data.toUpperCase() #",
            headerTemplate: "<div>Header</div>"
        });

        var optionHeader = dropdownlist.list.children(":first")[0];

        ok(optionHeader.id)
        equal(optionHeader.className, "k-list-optionlabel k-state-selected k-state-focused");
        equal(optionHeader.innerHTML, "SELECT...");
    });

    test("optionLabel template supports complex object", function() {
        var dropdownlist = new DropDownList(input, {
            dataTextField: "name",
            optionLabel: { name: "Select..." },
            headerTemplate: "<div>Header</div>",
        });

        var optionHeader = dropdownlist.list.children(":first")[0];

        ok(optionHeader.id)
        equal(optionHeader.className, "k-list-optionlabel k-state-selected k-state-focused");
        equal(optionHeader.innerHTML, "Select...");
    });

    test("defining input template", function() {
        var dropdownlist = new DropDownList(input, {
            valueTemplate: "#= data #",
            dataSource: ["<strong>Test</strong>"]
        });

        var span = dropdownlist.span;

        equal(span.html(), "<strong>Test</strong>");
    });

    test("support for valueField named 'data'", function() {
        var dropdownlist = new DropDownList(input, {
            dataTextField: "ProductName",
            dataValueField: "data",
            dataSource: [
                { ProductName: "Chai", data: 1 },
                { ProductName: "Chang", data: 2 }
            ]
        });

        var span = dropdownlist.span;

        equal(span.html(), "Chai");
    });

    test("should populate text and value if items", function() {
        var dropdownlist = new DropDownList(input, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource:[{text: "foo", value: 1}, {text:2, value:2}]
        });

        equal(dropdownlist.text(), "foo");
        equal(dropdownlist.value(), "1");
    });

    test("disabled input rendered with wrapper.k-state-disabled", function() {
        input.attr("disabled", "disabled").kendoDropDownList();

        var wrapper = input.data("kendoDropDownList")._inputWrapper;

        ok(wrapper.hasClass("k-state-disabled"));
    });

    test("DropDownList disables on init", function() {
        input.kendoDropDownList({
            enabled: false
        });

        var wrapper = input.data("kendoDropDownList")._inputWrapper;

        ok(wrapper.hasClass("k-state-disabled"));
    });

    if (!kendo.support.touch) {
        test("pointer over widget should add hover state", function() {
            var data = [{text: 1, value: 1}, {text:2, value:2}],
            dropdownlist = new DropDownList(input, {
                dataSource: data
            });

            var wrap = dropdownlist.wrapper.children(".k-dropdown-wrap");
            wrap.mouseenter();

            ok(wrap.hasClass("k-state-hover"));
        });
    }

    test("leaving widget should remove hover state", function() {
        var data = [{text: 1, value: 1}, {text:2, value:2}],
        dropdownlist = new DropDownList(input, {
            dataSource: data
        });

        var wrap = dropdownlist.wrapper.children(".k-dropdown-wrap");
        wrap.mouseenter();
        wrap.mouseleave();

        ok(!wrap.hasClass("k-state-hover"));
    });

    test("add k-list class to the UL", function() {
        var data = [{text: 1, value: 1}, {text:2, value:2}],
        dropdownlist = new DropDownList(input, {
            dataSource: data
        });

        ok(dropdownlist.ul.hasClass("k-list"));
    });

    test("set height if items height is bigger than options.height", function() {
        var dataSource = new kendo.data.DataSource.create([{text: 1, value: 1}, {text:2, value:2}]);
        dataSource.read();

        dropdownlist = new DropDownList(input, {
            autoBind: false,
            dataSource: dataSource,
            template: "<div style='height:30px'><%= text %> </div>",
            height: 50
        });

        dropdownlist.refresh();
        dropdownlist.open();

        equal(dropdownlist.list.height(), 50);
    });

    test("persist selected index on rebind", function() {
        select[0].selectedIndex = -1;

        var dropdownlist = new DropDownList(select, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [{text: 1, value: 1}, {text:2, value:2}],
            optionLabel: "Select..."
        });

        dropdownlist.dataSource.fetch();

        equal(dropdownlist.text(), "Select...");
        equal(dropdownlist.value(), "");
    });

    test("optionLabel is not lost when textField and valueField are equal", function() {
        var data = [{text: 1, value: 1}, {text:2, value:2}];
        var dropdownlist = new DropDownList(input, {
            dataTextField: "text",
            dataValueField: "text",
            dataSource: data,
            optionLabel: "Select..."
        });

        equal(dropdownlist.text(), "Select...");
        equal(dropdownlist.value(), "");
    });

    test("dropdownlist supports complex optionLabel", function() {
        var data = [{text: 1, value: 1}, {text:2, value:2}];
        var dropdownlist = new DropDownList(input, {
            dataTextField: "Order.Ship.Desc",
            dataValueField: "Order.Ship.City",
            dataSource: [
                { Order: { Ship: { Desc: "City1", City: "1" } } }
            ],
            optionLabel: { Order: { Ship: { Desc: "Select..." } } }
        });

        equal(dropdownlist.text(), "Select...");
        equal(dropdownlist.value(), "");
    });

    test("_options should render option with value if optionLabel", function() {
        var select = $("<select/>").appendTo(QUnit.fixture),
            dropdownlist = new DropDownList(select, {
                dataSource: ["item1", "item2"],
                optionLabel: "Select..."
            });

            equal(select[0].children[0].innerHTML, "Select...");
    });

    test("_options uses optionLabel directly if object", function() {
        var select = $("<select/>").appendTo(QUnit.fixture),
            dropdownlist = new DropDownList(select, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    { text: "text", value: "1" }
                ],
                optionLabel: {
                    text: "Select..."
                }
            });

            equal(select[0].children[0].innerHTML, "Select...");
    });

    test("_options method escape value of the option", function() {
        var select = $("<select/>").appendTo(QUnit.fixture),
            dropdownlist = new DropDownList(select, {
                dataSource: ['item1"', "item2"]
            });

            equal(select[0].childNodes[0].value, 'item1"');
    });

    test("should not set id to the popup if the input does not have", function() {
        input.removeAttr("id");
        dropdownlist = new DropDownList(input);
        ok(!dropdownlist.list.attr("id"));
    });

    test("binding to primitive types", function() {
        dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"]
        });

        equal(dropdownlist.text(), "foo");
        equal(dropdownlist.value(), "foo");
    });

    test("persist selectedIndex", function() {
        dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar"]
        });

        ok(dropdownlist.current()[0]);
        equal(dropdownlist.selectedIndex, 0);
    });

    asyncTest("form reset support", 2, function() {
        input.attr("value", "1");

        var form = $("<form/>").appendTo(QUnit.fixture).append(input),
            dropdownlist = new DropDownList(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{text: 1, value: 1}, {text:2, value:2}]
            });

        dropdownlist.select(1);

        form[0].reset();

        setTimeout(function() {
            equal(dropdownlist.element.val(), "1");
            equal(dropdownlist.span.text(), "1");
            start();
        }, 200);
    });

    asyncTest("form reset support (select element)", 2, function() {
        var select = $('<select><option>Item1</option><option selected="selected">Item2</option></select>');

        var form = $("<form/>").appendTo(QUnit.fixture).append(select),
            dropdownlist = new DropDownList(select);

        dropdownlist.select(0);

        form[0].reset();

        setTimeout(function() {
            equal(dropdownlist.element.val(), "Item2");
            equal(dropdownlist.span.text(), "Item2");
            start();
        }, 200);
    });

    asyncTest("form defined by form attribute", 2, function() {
        var select = $('<select form="form1"><option>Item1</option><option selected="selected">Item2</option></select>').appendTo(QUnit.fixture);

        var form = $('<form id="form1"/>').appendTo(QUnit.fixture),
            dropdownlist = new DropDownList(select);

        dropdownlist.select(0);

        form[0].reset();

        setTimeout(function() {
            equal(dropdownlist.element.val(), "Item2");
            equal(dropdownlist.span.text(), "Item2");
            start();
        }, 200);
    });

    test("set selected text on init if autoBind:true (select)", function() {
        var dropdownlist = new DropDownList($("<select><option>text</option></select>").appendTo(QUnit.fixture), {
            optionLabel: "Select...",
            index: 1
        });

        equal(dropdownlist.text(), "text");
    });

    test("set selected text on init if autoBind:false (select)", function() {
        var select = $("<select><option>text</option></select>").appendTo(QUnit.fixture);
        var dropdownlist = new DropDownList(select, {
            autoBind: false,
            optionLabel: "Select...",
            index: 1
        });

        equal(dropdownlist.text(), "text");
    });

    test("set optionLabel on init if autoBind:false (select)", function() {
        var dropdownlist = new DropDownList($("<select/>").appendTo(QUnit.fixture), {
            autoBind: false,
            optionLabel: "Select..."
        });

        equal(dropdownlist.text(), "Select...");
    });

    test("get text from optionLabel on init", function() {
        var dropdownlist = new DropDownList($("<select/>").appendTo(QUnit.fixture), {
            autoBind: false,
            dataTextField: "text",
            dataValueField: "value",
            optionLabel: {
                text: "Select...",
                value: ""
            }
        });

        equal(dropdownlist.text(), "Select...");
    });

    test("set optionLabel on init if autoBind:false (input)", function() {
        var dropdownlist = new DropDownList($("<input/>").appendTo(QUnit.fixture), {
            autoBind: false,
            optionLabel: "Select..."
        });

        equal(dropdownlist.text(), "Select...");
    });

    test("set empty text if autoBind:false and index = 1", function() {
        var dropdownlist = new DropDownList($("<input/>").appendTo(QUnit.fixture), {
            autoBind: false,
            index: 1,
            optionLabel: "Select..."
        });

        equal(dropdownlist.text(), "");
    });

    test("Add km-popup class to the animation container", function() {
        $(document.documentElement).addClass("km-root");
        var dropdownlist = new DropDownList($("<input/>").appendTo(QUnit.fixture));
        dropdownlist.popup.trigger("open");

        var animationContainer = dropdownlist.popup.wrapper;

        ok(animationContainer.hasClass("k-animation-container"));
        ok(animationContainer.hasClass("km-popup"));
        $(document.documentElement).removeClass("km-root");
    });

    test("resetting dataSource detaches the previouse events", 0, function() {
        var dropdownlist = new DropDownList($("<input/>").appendTo(QUnit.fixture));

        var dataSource = dropdownlist.dataSource;

        dropdownlist.setDataSource([]);

        dropdownlist.bind("dataBound", function() {
            ok(false, "Change event is not detached");
        });

        dataSource.read();
    });

    test("resetting DataSource rebinds the widget", function() {
        var dropdownlist = new DropDownList($("<input/>").appendTo(QUnit.fixture),{
            dataTextField: "text",
            dataValueField: "value"
        });

        dropdownlist.setDataSource(new kendo.data.DataSource({
            data:[{text: 1, value: 1}, {text:2, value:2}]
        }));

        equal(dropdownlist.ul.children().length, 2);
    });

    test("extend popup options if dropdownlist.options.popup", function() {
        var appendTo = "body",
            dropdownlist = new DropDownList($("<input/>").appendTo(QUnit.fixture), {
            popup: {
                appendTo: appendTo
            }
        });

        equal(dropdownlist.popup.options.appendTo[0], $(appendTo)[0]);
    });

    test("dropdownlist can be initialized in hidden container", function() {
        var div = $("<div style='display: none'></div>").appendTo(QUnit.fixture);

        var dropdown = input.appendTo(div).kendoDropDownList({
            animation: false,
            dataSource: [0,1],
            height: 200
        }).data("kendoDropDownList");

        div.show();
        dropdown.open();

        equal(dropdown.popup.element.parent().width(), dropdown.wrapper.width());
    });

    test("dropdownlist put in hidden container can be re-bound", function() {
        var div = $("<div style='display: none'></div>").appendTo(QUnit.fixture);

        var dropdown = input.appendTo(div).kendoDropDownList({
            animation: false,
            dataSource: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
            height: 200,
            popup: {
                appendTo: div
            }
        }).data("kendoDropDownList");

        div.show();
        dropdown.open();
        dropdown.close();
        div.hide();

        dropdown.dataSource.read();

        div.show();
        dropdown.open();

        equal(dropdown.list.height(), 200);
    });

    test("DropDownList does not set width if list has style.width", function() {
        var dropdown = input.kendoDropDownList(["item"]).data("kendoDropDownList");

        dropdown.list.width(400);

        dropdown.open();

        equal(dropdown.list.width(), 400);
    });

    test("DropDownList clears the id of the timeout on hideBusy", function() {
        var dropdown = input.kendoDropDownList().data("kendoDropDownList");

        ok(dropdown._busy === null);
    });

    test("DropDownList displays text if autoBind false", function() {
        var dropdown = input.kendoDropDownList({
            text: "Chai",
            autoBind: false
        }).data("kendoDropDownList");

        equal(dropdown.text(), "Chai");
    });

    test("DropDownList sets element value if option.value is defined", function() {
        var dropdown = input.kendoDropDownList({
            dataSource: ["Item1", "Item2"],
            value: "Item2",
        }).data("kendoDropDownList");

        equal(dropdown.value(), "Item2");
    });

    test("DropDownList sets element value if option.value is defined (select)", function() {
        var dropdown = $("<select/>").appendTo(QUnit.fixture).kendoDropDownList({
            dataSource: ["Item1", "Item2"],
            value: "Item2",
        }).data("kendoDropDownList");

        equal(dropdown.value(), "Item2");
    });

    test("Using triggerHandler('focus') focuses the wrapper", function() {
        var data = [{text: 1, value: 1}, {text:2, value:2}],
            dropdownlist = new DropDownList(input, {
                 dataSource: data
            });

        input.triggerHandler("focus");

        equal(document.activeElement, dropdownlist.wrapper[0]);
    });

    test("DropDownList sets value of the element if options.value and autoBind set to false", function() {
        var data = [{text: 1, value: 1}, {text:2, value:2}],
            dropdownlist = new DropDownList(input, {
                autoBind: false,
                dataSource: data,
                value: "1"
            });

        equal(dropdownlist.value(), "1");
    });

    test("DropDownList set height on first open", function() {
        var fixture = $("#qunit-fixture").hide();
        var dropdownlist = new DropDownList(input, {
            dataSource: generate(20),
            popup: {
                appendTo: "#qunit-fixture"
            }
        });

        fixture.show();

        dropdownlist.open();

        equal(dropdownlist.popup.element.height(), 200);
    });

    test("DropDownList honors readonly attribute", function() {
        var dropdownlist = input.attr("readonly", true).kendoDropDownList().data("kendoDropDownList");

        stub(dropdownlist, {toggle: dropdownlist.toggle});

        dropdownlist.wrapper.click();

        ok(!dropdownlist.popup.visible());
    });

    test("DropDownList uses disabled attr over the readonly", function() {
        var dropdownlist = input.attr("readonly", true).attr("disabled", true)
                                .kendoDropDownList().data("kendoDropDownList");

        equal(input.attr("readonly"), undefined);
    });

    test("DropDownList selects option label even when it is initially available", function() {
        var select = $("<select><option>Select...</option><option>Value1</option></select>").appendTo(QUnit.fixture);

        select.kendoDropDownList({
            optionLabel: "Select...",
            dataSource: ["Value1"]
        }).data("kendoDropDownList");

        equal(select[0].selectedIndex, 0);
    });

    test("kendoDropDownList clears selected value and text when bind to empty array", function() {
        var ddl = input.kendoDropDownList({
            autoBind: false,
            value: "1",
            text: "Test1"
        }).data("kendoDropDownList");

        ddl.dataSource.data([]);

        ok(!ddl.value());
        ok(!ddl.text());
    });

    test("Widget uses options.index if value was not defined", function() {
        var select = $("<select></select>").appendTo(QUnit.fixture);

        var ddl = select.kendoDropDownList({
            dataSource: ["Value1", "Value2"],
            index: 1
        }).data("kendoDropDownList");

        equal(ddl.value(), "Value2");
    });

    test("ValueTemplate supports complex model", function() {
        var dropdownlist = new DropDownList(input, {
            autoBind: false,
            optionLabel: "Select...",
            dataTextField: "Orders.ShipCity",
            dataValueField: "OrderID"
        });

        equal(dropdownlist.span.html(), "Select...");
    });

    test("ValueTemplate supports template with multiple fields", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataTextField: "text",
            dataValueField: "value",
            valueTemplate: "#=text# #=customField#"
        });

        equal(dropdownlist.span.html(), "");
    });

    test("widget throws an error when optionLabel does not match valueTemplate",  function() {
        try {
            new DropDownList(input, {
                optionLabel: "Select...",
                dataTextField: "text",
                dataValueField: "value",
                valueTemplate: "#=text# #=customField#"
            });
        } catch(e) {
            ok(true);
        }
    });

    test("widget doesn't throw an error when optionLabelTemplate is defined", 1, function() {
        var widget;
        try {
            widget = new DropDownList(input, {
                optionLabel: {
                    text: "Select...",
                    value: ""
                },
                optionLabelTemplate: "#=text#",
                dataTextField: "text",
                dataValueField: "value",
                valueTemplate: "#=text# #=customField#"
            });
        } catch(e) {
            ok(false);
        }

        equal(widget.span.text(), "Select...");
    });

    test("widget renders filter header in input", function() {
        var dropdownlist = new DropDownList(input, {
            autoBind: false,
            optionLabel: "Select...",
            dataTextField: "Orders.ShipCity",
            dataValueField: "OrderID",
            filter: "startswith"
        });

        var filterHeader = dropdownlist.list.find(".k-list-filter");

        ok(filterHeader.hasClass("k-list-filter"));
        ok(filterHeader.find("input")[0]);
    });

    test("widget calculates popup height properly when ul has overflow-x styling", function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["item1", "item2", "item3", "item4", "item5"],
            height: 50
        });

        dropdownlist.ul.css("overflow-x", "hidden");

        dropdownlist.open();

        var list = dropdownlist.list;

        equal(list.height(), 50);
    });

    /*
    test("adjust ul height if filter header is rendered", function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: ["item1", "item2", "item3", "item4", "item5"],
            filter: "startswith",
            height: 50
        });

        dropdownlist.open();

        var list = dropdownlist.list;
        var filterHeader = list.find(".k-textbox");
        var height = list.height() - dropdownlist.ul[0].offsetTop;

        equal(dropdownlist.ul.height(), height);
    });
    */

    test("widget renders search icon in filter header", function() {
        var dropdownlist = new DropDownList(input, {
            autoBind: false,
            optionLabel: "Select...",
            dataTextField: "Orders.ShipCity",
            dataValueField: "OrderID",
            filter: "startswith"
        });

        var filterHeader = dropdownlist.list.find(".k-list-filter");
        var icon = filterHeader.find("input").next();

        ok(icon[0]);
        ok(icon.hasClass("k-i-search"));
    });

    test("widget does not retrieve data attributes if options are set", function() {
        input.attr({
            "data-kendo-text-field": "text1",
            "data-kendo-value-field": "value1",
        });

        var dropdownlist = new DropDownList(input, {
            dataTextField: "Orders.ShipCity",
            dataValueField: "OrderID"
        });

        equal(dropdownlist.options.dataTextField, "Orders.ShipCity");
        equal(dropdownlist.options.dataValueField, "OrderID");
    });

    function generate(count) {
        var data = [];
        for (var idx = 0; idx < count; idx++) {
            data.push(idx);
        }

        return data;
    }

    test("DropDownList scrolls list to the focused element", function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: generate(50)
        });

        dropdownlist.value("30");
        dropdownlist.open();

        ok(dropdownlist.listView.content[0].scrollTop > 50);
    });

    test("DropDownList adds scrollbar width to the fixed group header padding", function() {
        var dataSource = new kendo.data.DataSource({
            data: [
                { value: 1 },
                { value: 2 },
                { value: 3 },
                { value: 4 },
                { value: 5 }
            ],
            group: "value"
        });

        var dropdownlist = input.kendoDropDownList({
            dataSource: dataSource,
            height: 50
        }).data("kendoDropDownList");

        dropdownlist.open();

        var padding = dropdownlist.list.find(".k-group-header").css("padding-right");

        ok(parseFloat(padding) >= kendo.support.scrollbar());
    });

    test("DropDownList does not add scrollbar width to the fixed group header padding if popup has not scroll", function() {
        var dataSource = new kendo.data.DataSource({
            data: [
                { value: 1 },
                { value: 2 },
                { value: 3 },
                { value: 4 },
                { value: 5 }
            ],
            group: "value"
        });

        var dropdownlist = input.kendoDropDownList({
            dataSource: dataSource,
            height: 350
        }).data("kendoDropDownList");

        dropdownlist.open();

        var padding = dropdownlist.list.find(".k-group-header").css("padding-right");

        ok(parseFloat(padding) < 15);
    });

    test("pointer over optionLabel should adds hover state", function() {
        var dropdownlist = new DropDownList(input, {
            optionLabel: "Select..."
        });

        dropdownlist.open();

        var optionLabel = dropdownlist.optionLabel;

        optionLabel.mouseenter();

        ok(optionLabel.hasClass("k-state-hover"));
    });

    test("leave optionLabel should remove hover state", function() {
        var dropdownlist = new DropDownList(input, {
            optionLabel: "Select..."
        });

        dropdownlist.open();

        var optionLabel = dropdownlist.optionLabel;

        optionLabel.mouseenter();
        optionLabel.mouseleave();

        ok(!optionLabel.hasClass("k-state-hover"));
    });

    test("copy input title attribute to the visible input", function() {
        var dropdown = input.attr("title", "foo").kendoDropDownList(["item"]).data("kendoDropDownList");
        var title = input.attr("title");

        equal(dropdown.wrapper.attr("title"), title);
    });

    test("DropDownList displays optionLabel when autoBind: false and text is not defined", function() {
        var data = [
            { text: "Black", value: "1" },
            { text: "Orange", value: "2" },
            { text: "Grey", value: "3" }
        ];

        var optionLabel = "Select color...";

        var dropdownlist = input.val("0").kendoDropDownList({
            autoBind: false,
            optionLabel: optionLabel,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: data
        }).data("kendoDropDownList");

        equal(dropdownlist.text(), optionLabel);
    });

    test("DropDownList updates selected text when selected item is changed", function() {
        var dataSource = new kendo.data.DataSource({
            data: [
                { text: "item1", value: 1 },
                { text: "item2", value: 2 },
                { text: "item3", value: 3 },
                { text: "item4", value: 4 },
                { text: "item5", value: 5 }
            ]
        });

        dropdownlist = input.kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: dataSource,
            value: "3"
        }).data("kendoDropDownList");

        dataSource.view()[2].set("text", "updated");

        equal(dropdownlist.span.text(), "updated");
    });

    test("DropDownList updates the selected text on source rebind", function() {
        var data = [
            { name: "item", value: 1, group: "a" },
            { name: "item2", value: 2, group: "b" }
        ];

        dropdownlist = input.kendoDropDownList({
            dataSource: {
                transport: {
                    read: function(options) {
                        options.success(data);
                    }
                }
            },
            dataValueField: "value",
            dataTextField: "name",
            value: 1
        }).data("kendoDropDownList");

        data[0].name = "Item new";

        dropdownlist.dataSource.read();

        equal(dropdownlist.text(), "Item new");
    });

    asyncTest("DropDownList displays optionLabel when value is cleared until the widget is not bound", 1, function() {
        dropdownlist = input.kendoDropDownList({
          optionLabel: "--Select Value--",
          dataTextField: "Name",
          dataValueField: "Name",
          dataSource: new kendo.data.DataSource({
            schema: {
              model: {
                id: "StateId"
              }
            },
            transport: {
              read: function(options) {
                setTimeout(function() {
                  options.success([
                    { Name: "foo" }
                  ]);
                });
              }
            }
          })
        }).data("kendoDropDownList");

        dropdownlist.one("dataBound", function() {
            start();

            equal(dropdownlist.text(), dropdownlist.options.optionLabel);
        });

        dropdownlist.value("");
    });

    asyncTest("DropDownList does not select first item if its value is set to null (no option label)", 1, function() {
        dropdownlist = input.kendoDropDownList({
          dataTextField: "Name",
          dataValueField: "Name",
          dataSource: new kendo.data.DataSource({
            schema: {
              model: {
                id: "StateId"
              }
            },
            transport: {
              read: function(options) {
                setTimeout(function() {
                  options.success([
                    { Name: "foo" }
                  ]);
                });
              }
            }
          })
        }).data("kendoDropDownList");

        dropdownlist.one("dataBound", function() {
            start();

            equal(dropdownlist.value(), "");
        });

        dropdownlist.value("");
    });

    test("DropDownList does not trigger cascade event on click when source is empty", 0, function() {
        dropdownlist = input.kendoDropDownList({
          optionLabel: "--Select Value--",
          dataTextField: "Name",
          dataValueField: "Name",
          dataSource: []
        }).data("kendoDropDownList");

        dropdownlist.one("cascade", function() {
            ok(false);
        });

        dropdownlist.wrapper.click();
    });

    test("DropDownList is disabled when placed in disabled fieldset", function() {
         $(input).wrap('<fieldset disabled="disabled"></fieldset>');
         input.kendoDropDownList().data("kendoDropDownList");
         equal(input.attr("disabled"), "disabled");
    });

    test("copy placeholder value to the filter input", function() {
        var placeholder = "Type...";

        input.attr("placeholder", placeholder);

        var dropdownlist = new DropDownList(input, {
            filter: "contains"
        });

        equal(dropdownlist.filterInput.attr("placeholder"),  placeholder);
    });

    test("copy accesskey to the wrapper", function() {
        input.attr("accesskey", "w");

        var dropdownlist = new DropDownList(input);

        equal(dropdownlist.wrapper.attr("accesskey"),  "w");
    });

})();
