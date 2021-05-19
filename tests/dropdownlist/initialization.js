(function() {
    var DropDownList = kendo.ui.DropDownList,
        select,
        input;

    describe("kendo.ui.DropDownList initialization", function() {
        beforeEach(function() {
            kendo.ns = "kendo-";
            input = $("<input class='test'/>").appendTo(Mocha.fixture);
            select = $("<select></select>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            var element = $(document.body).find("[data-kendo-role=dropdownlist]")

            if (element[0]) {
                try {
                    element.data("kendoDropDownList").destroy();
                } catch (e) {
                    //destroy failed because widget is not fully initialized
                }
                element.closest(".k-dropdown").remove();
            }

            $(".test").remove();

            kendo.support.touch = false;
            kendo.support.mobileOS = false;
            kendo.ns = "";
        });

        it("kendoDropDownList attaches a dropdownlist object to target", function() {
            input.kendoDropDownList({ data: [] });

            assert.isOk(input.data("kendoDropDownList") instanceof DropDownList);
        });

        it("kendoDropDownList extends passed options", function() {
            input.kendoDropDownList({ test: 1 });

            var options = input.data("kendoDropDownList").options;
            assert.notEqual(options.test, undefined)
            assert.equal(options.test, 1);
        });

        it("wraps element if no wrapper span and hide element", function() {
            input.wrap("<span class='test'/>");
            input.kendoDropDownList();

            var wrapper = input.data("kendoDropDownList").wrapper;

            assert.isOk(wrapper.parent().is("span.test"));
            assert.isOk(wrapper.is("span.k-widget"));
            assert.isOk(wrapper.hasClass("k-widget k-dropdown"));
            assert.isOk(!input.is(":visible"));
        });

        it("DropDownList creates span when input has k-input class", function() {
            input.addClass("k-input");
            input.kendoDropDownList();

            assert.equal(input.data("kendoDropDownList").wrapper.find(".k-input")[0].nodeName, "SPAN");
        });

        it("set tabIndex to the wrapper", function() {
            input.kendoDropDownList();

            var wrapper = input.data("kendoDropDownList").wrapper;

            assert.equal(wrapper.attr("tabIndex"), 0);
        });

        it("persist tabIndex of the original element", function() {
            input.attr("tabIndex", 5);
            input.kendoDropDownList();

            var wrapper = input.data("kendoDropDownList").wrapper;

            assert.equal(wrapper.attr("tabIndex"), 5);
        });

        it("create text span", function() {
            input.kendoDropDownList();

            var span = input.data("kendoDropDownList").span;

            assert.isOk(span.is("span"));
            assert.isOk(span.hasClass("k-input"));
        });

        it("text span should wrapped with span", function() {
            input.kendoDropDownList();

            var dropDownWrapper = input.data("kendoDropDownList").span.parent();

            assert.isOk(dropDownWrapper.is("span"));
            assert.isOk(dropDownWrapper.hasClass("k-dropdown-wrap k-state-default"));
        });

        it("include arrow after span.k-input", function() {
            input.kendoDropDownList();

            var spanArrow = input.data("kendoDropDownList").span.next(),
                arrow = spanArrow.children().eq(0);

            assert.isOk(spanArrow.is("span"));
            assert.isOk(spanArrow.hasClass("k-select"));
            assert.isOk(arrow.is("span"));
            assert.isOk(arrow.hasClass("k-icon k-i-arrow-60-down"));
            assert.equal(arrow.html(), "");
        });

        it("data source is when pass DataSource", function() {
            var dataSource = kendo.data.DataSource.create([{ text: 1, value: 1 }, { text: 2, value: 2 }]),
                dropdownlist = new DropDownList(input, { dataSource: dataSource });

            assert.isOk(dropdownlist.dataSource);
            assert.equal(dropdownlist.dataSource, dataSource);
            assert.equal(dropdownlist.options.dataSource, dataSource);
        });

        it("data source is initialized from options when it is an array", function() {
            var data = [{ text: 1, value: 1 }, { text: 2, value: 2 }],
                dropdownlist = new DropDownList(input, data);

            assert.isOk(dropdownlist.dataSource);
            dropdownlist.dataSource.read();
            assert.equal(dropdownlist.dataSource.data().length, 2);
        });

        it("data source is initialized from options.dataSource when array is passed", function() {
            var data = [{ text: 1, value: 1 }, { text: 2, value: 2 }],
                dropdownlist = new DropDownList(input, {
                    dataSource: data
                });

            assert.isOk(dropdownlist.dataSource);
            dropdownlist.dataSource.read();
            assert.equal(dropdownlist.dataSource.data().length, 2);
        });

        it("data source is initialized from options.dataSource", function() {
            var data = [{ text: 1, value: 1 }, { text: 2, value: 2 }],
                dropdownlist = new DropDownList(input, {
                    dataSource: {
                        data: data
                    }
                });

            assert.isOk(dropdownlist.dataSource);
            dropdownlist.dataSource.read();
            assert.equal(dropdownlist.dataSource.data().length, 2);
        });

        it("data source is initialized from OPTION items", function() {
            var select = $("<select><option value=1>Chai</option><option value=2 selected='selected'>Chai</option></select>").appendTo(Mocha.fixture);
            var dropdownlist = new DropDownList(select);
            var data;

            data = dropdownlist.dataSource.view();

            assert.isOk(dropdownlist.dataSource);
            assert.equal(data.length, 2);
            assert.equal(data[0].text, "Chai");
            assert.equal(data[0].value, "1");
        });

        it("dataSource infer OPTION value correctly", function() {
            var select = $("<select><option>Chai</option><option value=2>Chai</option></select>").appendTo(Mocha.fixture),
                dropdownlist = new DropDownList(select),
                data;

            data = dropdownlist.dataSource.view();

            assert.equal(data[0].value, "Chai");
            assert.equal(data[1].value, "2");
        });

        it("if no options, do not set index", function() {
            var select = $("<select/>").appendTo(Mocha.fixture);
            var dropdownlist = new DropDownList(select, { index: 2 });

            assert.equal(dropdownlist.options.index, 2);
        });

        it("selected index is got from select element", function() {
            var select = $("<select><option value='1'>Chai</option><option value='2' selected='selected'>Chai</option></select>").appendTo(Mocha.fixture);
            var dropdownlist = new DropDownList(select);

            assert.equal(select[0].selectedIndex, 1);
            assert.equal(dropdownlist.options.index, 1);
        });

        it("set selectedIndex when autoBind:false", function() {
            var dropdownlist = input.kendoDropDownList({ autoBind: false }).data("kendoDropDownList");
            assert.equal(dropdownlist.selectedIndex, -1);
        });

        it("retrived data from OPTIONS does not override options.dataSource", function() {
            var select = $("<select><option value=1>Chai</option><option value=2 selected='selected'>Beverages</option></select>").appendTo(Mocha.fixture),
                data = [{ text: "Foo", value: "Foo" }],
                dropdownlist = new DropDownList(select, {
                    dataSource: {
                        data: data
                    }
                });

            assert.isOk(dropdownlist.dataSource);

            dropdownlist.dataSource.read();
            data = dropdownlist.dataSource.data();

            assert.equal(data.length, 1);
            assert.equal(data[0].text, "Foo");
            assert.equal(data[0].value, "Foo");
        });

        it("dropdownlist initializes an UL for its items", function() {
            input.attr("id", "dropdownlist");
            var dropdownlist = new DropDownList(input, []);

            assert.isOk(dropdownlist.ul);
            assert.isOk(dropdownlist.ul.is("ul"));
            assert.isOk(dropdownlist.list.attr("id"), input.attr("id") + "-list");
            assert.equal(dropdownlist.listView.content.css("overflow"), "auto");
        });

        it("dropdownlist initializes a popup for its items", function() {
            var dropdownlist = new DropDownList(input, []);

            assert.isOk(dropdownlist.popup);
            assert.isOk(dropdownlist.popup instanceof kendo.ui.Popup);
            assert.equal(dropdownlist.popup.options.anchor[0], dropdownlist.wrapper[0]);
            assert.equal(dropdownlist.popup.element[0], dropdownlist.list[0]);
        });

        it("dropdownlist shrink ul if the height of the items is more then options.height", function() {
            var data = [{ text: "foo", value: 1 },
            { text: 2, value: 2 },
            { text: 2, value: 2 },
            { text: 2, value: 2 },
            { text: 2, value: 2 },
            { text: 2, value: 2 },
            { text: 2, value: 2 },
            { text: 2, value: 2 },
            { text: 2, value: 2 }];

            var dropdownlist = new DropDownList(input, data);
            dropdownlist.options.height = 100;

            dropdownlist.dataSource.read();
            dropdownlist.open();

            assert.equal(dropdownlist.list.css("height"), "100px");
        });

        it("dropdownlist populates its list when the datasource changes", function() {
            var dropdownlist = new DropDownList(input, {
                dataTextField: "text",
                dataValueField: "text",
                dataSource: [{ text: "foo" }, { text: 2 }]
            });

            dropdownlist.dataSource.read();

            assert.equal(dropdownlist.ul.children("li").length, 2);
            assert.equal(dropdownlist.ul.children("li").first().text(), "foo");
        });

        it("dropdownlist creates static list view", function() {
            var dropdownlist = new DropDownList(input);

            assert.isOk(dropdownlist.listView instanceof kendo.ui.StaticList);
        });

        it("dropdownlist sets default item template", function() {
            var dropdownlist = new DropDownList(input, {
            });

            var template = dropdownlist.listView.options.template;

            assert.equal(template, "#:data#");
        });

        it("dropdownlist sets default item template using dataTextField option", function() {
            var dropdownlist = new DropDownList(input, {
                dataTextField: "test"
            });

            var template = dropdownlist.listView.options.template;

            assert.equal(template, "#:data.test#");
        });

        it("dropdownlist sets a default group template", function() {
            var dropdownlist = new DropDownList(input, {
            });

            var template = dropdownlist.listView.options.groupTemplate;

            assert.equal(template, "#:data#");
        });

        it("dropdownlist supports setting a custom group template", function() {
            var dropdownlist = new DropDownList(input, {
                groupTemplate: "#= data.toUpperCase() #"
            });

            var template = dropdownlist.listView.options.groupTemplate;

            assert.equal(template, "#= data.toUpperCase() #");
        });

        it("dropdownlist sets a default fixed group template", function() {
            var dropdownlist = new DropDownList(input, {
            });

            var template = dropdownlist.listView.options.fixedGroupTemplate;

            assert.equal(template, "#:data#");
        });

        it("dropdownlist supports setting a custom fixed group template", function() {
            var dropdownlist = new DropDownList(input, {
                fixedGroupTemplate: "#= data.toUpperCase() #"
            });

            var template = dropdownlist.listView.options.fixedGroupTemplate;

            assert.equal(template, "#= data.toUpperCase() #");
        });

        it("defining header template", function() {
            var dropdownlist = new DropDownList(input, {
                template: "#= data.toUpperCase() #",
                headerTemplate: "<div>Header</div>"
            });

            var list = dropdownlist.list;

            assert.equal(list.children()[0].outerHTML, "<div>Header</div>");
        });

        it("defining option label template", function() {
            var dropdownlist = new DropDownList(input, {
                optionLabel: "Select...",
                optionLabelTemplate: "#= data.toUpperCase() #",
                headerTemplate: "<div>Header</div>"
            });

            var optionHeader = dropdownlist.list.children(":first")[0];

            assert.isOk(optionHeader.id)
            assert.equal(optionHeader.className, "k-list-optionlabel k-state-selected k-state-focused");
            assert.equal(optionHeader.innerHTML, "SELECT...");
        });

        it("optionLabel template supports complex object", function() {
            var dropdownlist = new DropDownList(input, {
                dataTextField: "name",
                optionLabel: { name: "Select..." },
                headerTemplate: "<div>Header</div>",
            });

            var optionHeader = dropdownlist.list.children(":first")[0];

            assert.isOk(optionHeader.id)
            assert.equal(optionHeader.className, "k-list-optionlabel k-state-selected k-state-focused");
            assert.equal(optionHeader.innerHTML, "Select...");
        });

        it("use optionLabelTemplate when bound asynchronously", function(done) {
            var dropdownlist = new DropDownList(input, {
                dataSource: {
                    transport: {
                        read: function(options) {
                            setTimeout(function() {
                                options.success([]);
                            }, 0);
                        }
                    }
                },
                optionLabel: "Select...",
                optionLabelTemplate: "#= data.toUpperCase() #",
                headerTemplate: "<div>Header</div>",
                dataTextField: "text",
                dataValueField: "value",
                dataBound: function() {

                    assert.equal(this.text(), "SELECT...");
                    done();
                }
            });

            dropdownlist.value("");
        });

        it("render footer container", function() {
            var dropdownlist = new DropDownList(input, {
                footerTemplate: "footer"
            });

            var footer = dropdownlist.footer;

            assert.isOk(footer);
            assert.isOk(footer.hasClass("k-footer"));
        });

        it("render footer template", function() {
            var dropdownlist = new DropDownList(input, {
                autoBind: true,
                footerTemplate: "footer"
            });

            var footer = dropdownlist.footer;

            assert.equal(footer.html(), "footer");
        });

        it("compile footer template with the dropdownlist instance", function() {
            var dropdownlist = new DropDownList(input, {
                autoBind: true,
                footerTemplate: "#: instance.dataSource.total() #"
            });

            var footer = dropdownlist.footer;

            assert.equal(footer.html(), dropdownlist.dataSource.total());
        });

        it("update footer template on dataBound", function() {
            var dropdownlist = new DropDownList(input, {
                autoBind: true,
                footerTemplate: "#: instance.dataSource.total() #"
            });

            var footer = dropdownlist.footer;

            dropdownlist.dataSource.data(["Item1"]);

            assert.equal(footer.html(), dropdownlist.dataSource.total());
        });

        it("defining input template", function() {
            var dropdownlist = new DropDownList(input, {
                valueTemplate: "#= data #",
                dataSource: ["<strong>Test</strong>"]
            });

            var span = dropdownlist.span;

            assert.equal(span.html(), "<strong>Test</strong>");
        });

        it("support for valueField named 'data'", function() {
            var dropdownlist = new DropDownList(input, {
                dataTextField: "ProductName",
                dataValueField: "data",
                dataSource: [
                    { ProductName: "Chai", data: 1 },
                    { ProductName: "Chang", data: 2 }
                ]
            });

            var span = dropdownlist.span;

            assert.equal(span.html(), "Chai");
        });

        it("should populate text and value if items", function() {
            var dropdownlist = new DropDownList(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }]
            });

            assert.equal(dropdownlist.text(), "foo");
            assert.equal(dropdownlist.value(), "1");
        });

        it("disabled input rendered with wrapper.k-state-disabled", function() {
            input.attr("disabled", "disabled").kendoDropDownList();

            var wrapper = input.data("kendoDropDownList")._inputWrapper;

            assert.isOk(wrapper.hasClass("k-state-disabled"));
        });

        it("DropDownList disables on init", function() {
            input.kendoDropDownList({
                enabled: false
            });

            var wrapper = input.data("kendoDropDownList")._inputWrapper;

            assert.isOk(wrapper.hasClass("k-state-disabled"));
        });

        if (!kendo.support.touch) {
            it("pointer over widget should add hover state", function() {
                var data = [{ text: 1, value: 1 }, { text: 2, value: 2 }],
                    dropdownlist = new DropDownList(input, {
                        dataSource: data
                    });

                var wrap = dropdownlist.wrapper.children(".k-dropdown-wrap");
                wrap.mouseenter();

                assert.isOk(wrap.hasClass("k-state-hover"));
            });
        }

        it("leaving widget should remove hover state", function() {
            var data = [{ text: 1, value: 1 }, { text: 2, value: 2 }],
                dropdownlist = new DropDownList(input, {
                    dataSource: data
                });

            var wrap = dropdownlist.wrapper.children(".k-dropdown-wrap");
            wrap.mouseenter();
            wrap.mouseleave();

            assert.isOk(!wrap.hasClass("k-state-hover"));
        });

        it("add k-list class to the UL", function() {
            var data = [{ text: 1, value: 1 }, { text: 2, value: 2 }],
                dropdownlist = new DropDownList(input, {
                    dataSource: data
                });

            assert.isOk(dropdownlist.ul.hasClass("k-list"));
        });

        it("set height if items height is bigger than options.height", function() {
            var dataSource = new kendo.data.DataSource.create([{ text: 1, value: 1 }, { text: 2, value: 2 }]);
            dataSource.read();

            dropdownlist = new DropDownList(input, {
                autoBind: false,
                dataSource: dataSource,
                template: "<div style='height:30px'><%= text %> </div>",
                height: 50
            });

            dropdownlist.refresh();
            dropdownlist.open();

            assert.equal(dropdownlist.list.height(), 50);
        });

        it("persist selected index on rebind", function() {
            select[0].selectedIndex = -1;

            var dropdownlist = new DropDownList(select, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: 1, value: 1 }, { text: 2, value: 2 }],
                optionLabel: "Select..."
            });

            dropdownlist.dataSource.fetch();

            assert.equal(dropdownlist.text(), "Select...");
            assert.equal(dropdownlist.value(), "");
        });

        it("optionLabel is not lost when textField and valueField are equal", function() {
            var data = [{ text: 1, value: 1 }, { text: 2, value: 2 }];
            var dropdownlist = new DropDownList(input, {
                dataTextField: "text",
                dataValueField: "text",
                dataSource: data,
                optionLabel: "Select..."
            });

            assert.equal(dropdownlist.text(), "Select...");
            assert.equal(dropdownlist.value(), "");
        });

        it("dropdownlist supports complex optionLabel", function() {
            var data = [{ text: 1, value: 1 }, { text: 2, value: 2 }];
            var dropdownlist = new DropDownList(input, {
                dataTextField: "Order.Ship.Desc",
                dataValueField: "Order.Ship.City",
                dataSource: [
                    { Order: { Ship: { Desc: "City1", City: "1" } } }
                ],
                optionLabel: { Order: { Ship: { Desc: "Select..." } } }
            });

            assert.equal(dropdownlist.text(), "Select...");
            assert.equal(dropdownlist.value(), "");
        });

        it("_options should render option with value if optionLabel", function() {
            var select = $("<select/>").appendTo(Mocha.fixture),
                dropdownlist = new DropDownList(select, {
                    dataSource: ["item1", "item2"],
                    optionLabel: "Select..."
                });

            assert.equal(select[0].children[0].innerHTML, "Select...");
        });

        it("_options uses optionLabel directly if object", function() {
            var select = $("<select/>").appendTo(Mocha.fixture),
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

            assert.equal(select[0].children[0].innerHTML, "Select...");
        });

        it("_options method escape value of the option", function() {
            var select = $("<select/>").appendTo(Mocha.fixture),
                dropdownlist = new DropDownList(select, {
                    dataSource: ['item1"', "item2"]
                });

            assert.equal(select[0].childNodes[0].value, 'item1"');
        });

        it("set id to the popup if the input does not have", function() {
            input.removeAttr("id");
            dropdownlist = new DropDownList(input);

            // for accessibility reasons the list must be associated to the input
            assert.isOk(dropdownlist.list.attr("id"));
        });

        it("binding to primitive types", function() {
            dropdownlist = new DropDownList(input, {
                dataSource: ["foo", "bar"]
            });

            assert.equal(dropdownlist.text(), "foo");
            assert.equal(dropdownlist.value(), "foo");
        });

        it("persist selectedIndex", function() {
            dropdownlist = new DropDownList(input, {
                dataSource: ["foo", "bar"]
            });

            assert.isOk(dropdownlist.current()[0]);
            assert.equal(dropdownlist.selectedIndex, 0);
        });

        it("form reset support", function(done) {
            input.attr("value", "1");

            var form = $("<form/>").appendTo(Mocha.fixture).append(input),
                dropdownlist = new DropDownList(input, {
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: [{ text: 1, value: 1 }, { text: 2, value: 2 }]
                });

            dropdownlist.select(1);

            form[0].reset();

            setTimeout(function() {
                assert.equal(dropdownlist.element.val(), "1");
                assert.equal(dropdownlist.span.text(), "1");
                done();
            }, 200);
        });

        it("form reset support (select element)", function(done) {
            var select = $('<select><option>Item1</option><option selected="selected">Item2</option></select>');

            var form = $("<form/>").appendTo(Mocha.fixture).append(select),
                dropdownlist = new DropDownList(select);

            dropdownlist.select(0);

            form[0].reset();

            setTimeout(function() {
                assert.equal(dropdownlist.element.val(), "Item2");
                assert.equal(dropdownlist.span.text(), "Item2");
                done();
            }, 200);
        });

        it("form defined by form attribute", function(done) {
            var select = $('<select form="form1"><option>Item1</option><option selected="selected">Item2</option></select>').appendTo(Mocha.fixture);

            var form = $('<form id="form1"/>').appendTo(Mocha.fixture),
                dropdownlist = new DropDownList(select);

            dropdownlist.select(0);

            form[0].reset();

            setTimeout(function() {
                assert.equal(dropdownlist.element.val(), "Item2");
                assert.equal(dropdownlist.span.text(), "Item2");
                done();
            }, 200);
        });

        it("set selected text on init if autoBind:true (select)", function() {
            var dropdownlist = new DropDownList($("<select><option>text</option></select>").appendTo(Mocha.fixture), {
                optionLabel: "Select...",
                index: 1
            });

            assert.equal(dropdownlist.text(), "text");
        });

        it("set selected text on init if autoBind:false (select)", function() {
            var select = $("<select><option>text</option></select>").appendTo(Mocha.fixture);
            var dropdownlist = new DropDownList(select, {
                autoBind: false,
                optionLabel: "Select...",
                index: 1
            });

            assert.equal(dropdownlist.text(), "text");
        });

        it("set optionLabel on init if autoBind:false (select)", function() {
            var dropdownlist = new DropDownList($("<select/>").appendTo(Mocha.fixture), {
                autoBind: false,
                optionLabel: "Select..."
            });

            assert.equal(dropdownlist.text(), "Select...");
        });

        it("get text from optionLabel on init", function() {
            var dropdownlist = new DropDownList($("<select/>").appendTo(Mocha.fixture), {
                autoBind: false,
                dataTextField: "text",
                dataValueField: "value",
                optionLabel: {
                    text: "Select...",
                    value: ""
                }
            });

            assert.equal(dropdownlist.text(), "Select...");
        });

        it("set optionLabel on init if autoBind:false (input)", function() {
            var dropdownlist = new DropDownList($("<input/>").appendTo(Mocha.fixture), {
                autoBind: false,
                optionLabel: "Select..."
            });

            assert.equal(dropdownlist.text(), "Select...");
        });

        it("set empty text if autoBind:false and index = 1", function() {
            var dropdownlist = new DropDownList($("<input/>").appendTo(Mocha.fixture), {
                autoBind: false,
                index: 1,
                optionLabel: "Select..."
            });

            assert.equal(dropdownlist.text(), "");
        });

        it("Add km-popup class to the animation container", function() {
            $(document.documentElement).addClass("km-root");
            var dropdownlist = new DropDownList($("<input/>").appendTo(Mocha.fixture));
            dropdownlist.popup.trigger("open");

            var animationContainer = dropdownlist.popup.wrapper;

            assert.isOk(animationContainer.hasClass("k-animation-container"));
            assert.isOk(animationContainer.hasClass("km-popup"));
            $(document.documentElement).removeClass("km-root");
        });

        it("resetting dataSource detaches the previouse events", function() {
            var dropdownlist = new DropDownList($("<input/>").appendTo(Mocha.fixture));

            var dataSource = dropdownlist.dataSource;

            dropdownlist.setDataSource([]);

            dropdownlist.bind("dataBound", function() {
                assert.isOk(false, "Change event is not detached");
            });

            dataSource.read();
        });

        it("resetting DataSource rebinds the widget", function() {
            var dropdownlist = new DropDownList($("<input/>").appendTo(Mocha.fixture), {
                dataTextField: "text",
                dataValueField: "value"
            });

            dropdownlist.setDataSource(new kendo.data.DataSource({
                data: [{ text: 1, value: 1 }, { text: 2, value: 2 }]
            }));

            assert.equal(dropdownlist.ul.children().length, 2);
        });

        it("extend popup options if dropdownlist.options.popup", function() {
            var appendTo = "body",
                dropdownlist = new DropDownList($("<input/>").appendTo(Mocha.fixture), {
                    popup: {
                        appendTo: appendTo
                    }
                });

            assert.equal(dropdownlist.popup.options.appendTo[0], $(appendTo)[0]);
        });

        it("dropdownlist can be initialized in hidden container", function() {
            var div = $("<div style='display: none'></div>").appendTo(Mocha.fixture);

            var dropdown = input.appendTo(div).kendoDropDownList({
                animation: false,
                dataSource: [0, 1],
                height: 200
            }).data("kendoDropDownList");

            div.show();
            dropdown.open();

            assert.equal(dropdown.popup.element.parent().width(), dropdown.wrapper.width());
        });

        it("dropdownlist put in hidden container can be re-bound", function() {
            var div = $("<div style='display: none'></div>").appendTo(Mocha.fixture);

            var dropdown = input.appendTo(div).kendoDropDownList({
                animation: false,
                dataSource: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
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

            assert.equal(dropdown.list.height(), 200);
        });

        it("DropDownList does not set width if list has style.width", function() {
            var dropdown = input.kendoDropDownList(["item"]).data("kendoDropDownList");

            dropdown.list.width(400);

            dropdown.open();

            assert.equal(dropdown.list.width(), 400);
        });

        it("DropDownList clears the id of the timeout on hideBusy", function() {
            var dropdown = input.kendoDropDownList().data("kendoDropDownList");

            assert.isOk(dropdown._busy === null);
        });

        it("DropDownList displays text if autoBind false", function() {
            var dropdown = input.kendoDropDownList({
                text: "Chai",
                autoBind: false
            }).data("kendoDropDownList");

            assert.equal(dropdown.text(), "Chai");
        });

        it("DropDownList sets element value if option.value is defined", function() {
            var dropdown = input.kendoDropDownList({
                dataSource: ["Item1", "Item2"],
                value: "Item2",
            }).data("kendoDropDownList");

            assert.equal(dropdown.value(), "Item2");
        });

        it("DropDownList sets element value if option.value is defined (select)", function() {
            var dropdown = $("<select/>").appendTo(Mocha.fixture).kendoDropDownList({
                dataSource: ["Item1", "Item2"],
                value: "Item2",
            }).data("kendoDropDownList");

            assert.equal(dropdown.value(), "Item2");
        });

        it("Using triggerHandler('focus') focuses the wrapper", function() {
            var data = [{ text: 1, value: 1 }, { text: 2, value: 2 }],
                dropdownlist = new DropDownList(input, {
                    dataSource: data
                });

            input.triggerHandler("focus");

            assert.equal(document.activeElement, dropdownlist.wrapper[0]);
        });

        it("DropDownList sets value of the element if options.value and autoBind set to false", function() {
            var data = [{ text: 1, value: 1 }, { text: 2, value: 2 }],
                dropdownlist = new DropDownList(input, {
                    autoBind: false,
                    dataSource: data,
                    value: "1"
                });

            assert.equal(dropdownlist.value(), "1");
        });

        it("DropDownList set height on first open", function() {
            var fixture = $("#qunit-fixture").hide();
            var dropdownlist = new DropDownList(input, {
                dataSource: generate(20),
                popup: {
                    appendTo: "#qunit-fixture"
                }
            });

            fixture.show();

            dropdownlist.open();

            assert.equal(dropdownlist.popup.element.height(), 200);
        });

        it("DropDownList honors readonly attribute", function() {
            var dropdownlist = input.attr("readonly", true).kendoDropDownList().data("kendoDropDownList");

            stub(dropdownlist, { toggle: dropdownlist.toggle });

            dropdownlist.wrapper.click();

            assert.isOk(!dropdownlist.popup.visible());
        });

        it("DropDownList uses disabled attr over the readonly", function() {
            var dropdownlist = input.attr("readonly", true).attr("disabled", true)
                .kendoDropDownList().data("kendoDropDownList");

            assert.equal(input.attr("readonly"), undefined);
        });

        it("DropDownList selects option label even when it is initially available", function() {
            var select = $("<select><option>Select...</option><option>Value1</option></select>").appendTo(Mocha.fixture);

            select.kendoDropDownList({
                optionLabel: "Select...",
                dataSource: ["Value1"]
            }).data("kendoDropDownList");

            assert.equal(select[0].selectedIndex, 0);
        });

        it("kendoDropDownList clears selected value and text when bind to empty array", function() {
            var ddl = input.kendoDropDownList({
                autoBind: false,
                value: "1",
                text: "Test1"
            }).data("kendoDropDownList");

            ddl.dataSource.data([]);

            assert.isOk(!ddl.value());
            assert.isOk(!ddl.text());
        });

        it("Widget uses options.index if value was not defined", function() {
            var select = $("<select></select>").appendTo(Mocha.fixture);

            var ddl = select.kendoDropDownList({
                dataSource: ["Value1", "Value2"],
                index: 1
            }).data("kendoDropDownList");

            assert.equal(ddl.value(), "Value2");
        });

        it("ValueTemplate supports complex model", function() {
            var dropdownlist = new DropDownList(input, {
                autoBind: false,
                optionLabel: "Select...",
                dataTextField: "Orders.ShipCity",
                dataValueField: "OrderID"
            });

            assert.equal(dropdownlist.span.html(), "Select...");
        });

        it("ValueTemplate supports template with multiple fields", function() {
            var dropdownlist = new DropDownList(input, {
                dataTextField: "text",
                dataValueField: "value",
                valueTemplate: "#=text# #=customField#"
            });

            assert.equal(dropdownlist.span.html(), "");
        });

        it("widget throws an error when optionLabel does not match valueTemplate", function() {
            try {
                new DropDownList(input, {
                    optionLabel: "Select...",
                    dataTextField: "text",
                    dataValueField: "value",
                    valueTemplate: "#=text# #=customField#"
                });
            } catch (e) {
                assert.isOk(true);
            }
        });

        it("widget doesn't throw an error when optionLabelTemplate is defined", function() {
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
            } catch (e) {
                assert.isOk(false);
            }

            assert.equal(widget.span.text(), "Select...");
        });

        it("widget renders filter header in input", function() {
            var dropdownlist = new DropDownList(input, {
                autoBind: false,
                optionLabel: "Select...",
                dataTextField: "Orders.ShipCity",
                dataValueField: "OrderID",
                filter: "startswith"
            });

            var filterHeader = dropdownlist.list.find(".k-list-filter");

            assert.isOk(filterHeader.hasClass("k-list-filter"));
            assert.isOk(filterHeader.find("input")[0]);
        });

        it("widget calculates popup height properly when ul has overflow-x styling", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: ["item1", "item2", "item3", "item4", "item5"],
                height: 50
            });

            dropdownlist.ul.css("overflow-x", "hidden");

            dropdownlist.open();

            var list = dropdownlist.list;

            assert.equal(list.height(), 50);
        });

        it("adjust height if footer template", function() {
            var dropdownlist = new DropDownList(input, {
                animation: false,
                autoBind: false,
                dataSource: ["item1", "item2", "item3", "item4", "item5"],
                footerTemplate: "<div>Footer</div>",
                height: 100
            });

            dropdownlist.open();

            assert.isOk(dropdownlist.listView.content.height() < 100);
        });

        it("widget renders search icon in filter header", function() {
            var dropdownlist = new DropDownList(input, {
                autoBind: false,
                optionLabel: "Select...",
                dataTextField: "Orders.ShipCity",
                dataValueField: "OrderID",
                filter: "startswith"
            });

            var filterHeader = dropdownlist.list.find(".k-list-filter");
            var icon = filterHeader.find("input").next();

            assert.isOk(icon[0]);
            assert.isOk(icon.hasClass("k-i-zoom"));
        });

        it("widget does not retrieve data attributes if options are set", function() {
            input.attr({
                "data-kendo-text-field": "text1",
                "data-kendo-value-field": "value1",
            });

            var dropdownlist = new DropDownList(input, {
                dataTextField: "Orders.ShipCity",
                dataValueField: "OrderID"
            });

            assert.equal(dropdownlist.options.dataTextField, "Orders.ShipCity");
            assert.equal(dropdownlist.options.dataValueField, "OrderID");
        });

        function generate(count) {
            var data = [];
            for (var idx = 0; idx < count; idx++) {
                data.push(idx);
            }

            return data;
        }

        it("DropDownList scrolls list to the focused element", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: generate(50)
            });

            dropdownlist.value("30");
            dropdownlist.open();

            assert.isOk(dropdownlist.listView.content[0].scrollTop > 50);
        });

        it("DropDownList adds scrollbar width to the fixed group header padding", function() {
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

            assert.isOk(parseFloat(padding) >= kendo.support.scrollbar());
        });

        it("DropDownList does not add scrollbar width to the fixed group header padding if popup has not scroll", function() {
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

            assert.isOk(parseFloat(padding) < 15);
        });

        it("pointer over optionLabel should adds hover state", function() {
            var dropdownlist = new DropDownList(input, {
                optionLabel: "Select..."
            });

            dropdownlist.open();

            var optionLabel = dropdownlist.optionLabel;

            optionLabel.mouseenter();

            assert.isOk(optionLabel.hasClass("k-state-hover"));
        });

        it("leave optionLabel should remove hover state", function() {
            var dropdownlist = new DropDownList(input, {
                optionLabel: "Select..."
            });

            dropdownlist.open();

            var optionLabel = dropdownlist.optionLabel;

            optionLabel.mouseenter();
            optionLabel.mouseleave();

            assert.isOk(!optionLabel.hasClass("k-state-hover"));
        });

        it("copy input title attribute to the visible input", function() {
            var dropdown = input.attr("title", "foo").kendoDropDownList(["item"]).data("kendoDropDownList");
            var title = input.attr("title");

            assert.equal(dropdown.wrapper.attr("title"), title);
        });

        it("copy input title attribute to the filter input", function() {
            var title = "foo";
            var dropdown = input.attr("title", title).kendoDropDownList({ filter: "contains" }).data("kendoDropDownList");

            assert.equal(dropdown.filterInput.attr("title"), title);
        });

        it("DropDownList displays optionLabel when autoBind: false and text is not defined", function() {
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

            assert.equal(dropdownlist.text(), optionLabel);
        });

        it("DropDownList updates selected text when selected item is changed", function() {
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

            assert.equal(dropdownlist.span.text(), "updated");
        });

        it("DropDownList updates the selected text on source rebind", function() {
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

            assert.equal(dropdownlist.text(), "Item new");
        });

        it("DropDownList displays optionLabel when value is cleared until the widget is not bound", function(done) {
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

                assert.equal(dropdownlist.text(), dropdownlist.options.optionLabel);
                done();
            });

            dropdownlist.value("");
        });

        it("DropDownList does not select first item if its value is set to null (no option label)", function(done) {
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

                assert.equal(dropdownlist.value(), "");
                done();
            });

            dropdownlist.value("");
        });

        it("DropDownList does not trigger cascade event on click when source is empty", function() {
            dropdownlist = input.kendoDropDownList({
                optionLabel: "--Select Value--",
                dataTextField: "Name",
                dataValueField: "Name",
                dataSource: []
            }).data("kendoDropDownList");

            dropdownlist.one("cascade", function() {
                assert.isOk(false);
            });

            dropdownlist.wrapper.click();
        });

        it("DropDownList is disabled when placed in disabled fieldset", function() {
            $(input).wrap('<fieldset disabled="disabled"></fieldset>');
            input.kendoDropDownList().data("kendoDropDownList");
            assert.equal(input.attr("disabled"), "disabled");
        });

        it("copy placeholder value to the filter input", function() {
            var placeholder = "Type...";

            input.attr("placeholder", placeholder);

            var dropdownlist = new DropDownList(input, {
                filter: "contains"
            });

            assert.equal(dropdownlist.filterInput.attr("placeholder"), placeholder);
        });

        it("copy accesskey to the wrapper", function() {
            input.attr("accesskey", "w");

            var dropdownlist = new DropDownList(input);

            assert.equal(dropdownlist.wrapper.attr("accesskey"), "w");
        });

        it("remove accesskey from the element", function() {
            input.attr("accesskey", "w");

            var dropdownlist = new DropDownList(input);

            assert.notEqual(input.attr("accesskey"), "w");
        });

        it("render empty option for optionLabel with null value", function() {
            dropdownlist = select.kendoDropDownList({
                optionLabel: {
                    text: "Select...",
                    value: null
                },
                dataTextField: "text",
                dataValueField: "value",
                dataSource: []
            }).data("kendoDropDownList");

            assert.equal(dropdownlist.value(), "");
        });

        it("DropDownList opens the popup if optionLabel is defined", function() {
            var dropdownlist = new DropDownList(input, {
                optionLabel: "Select"
            });

            dropdownlist.wrapper.click();

            assert.isOk(dropdownlist.popup.visible());
        });

        it("DropDownList opens the popup if filtering is enabled", function() {
            var dropdownlist = new DropDownList(input, {
                filter: "contains"
            });

            dropdownlist.wrapper.click();

            assert.isOk(dropdownlist.popup.visible());
        });

        it("widget keeps defaultSelected property", function() {
            dropdownlist = new DropDownList(select, {
                dataSource: ["foo", "bar", "baz"],
                value: "bar"
            });

            dropdownlist.value("baz");

            var options = select[0].children;

            assert.equal(options[1].selected, false);
            assert.equal(options[2].selected, true);

            assert.equal(options[1].defaultSelected, true);
            assert.equal(options[2].defaultSelected, false);
        });

        it("DropDownList does not bind on open if minLength & autoBind: false", function() {
            var dropdownlist = new DropDownList(input, {
                minLength: 3,
                autoBind: false,
                filter: "startswith"
            });

            dropdownlist.dataSource.bind("change", function() {
                assert.isOk(false, "change does not fire");
            });
            dropdownlist.wrapper.click();

            assert.isOk(dropdownlist.popup.visible());
        });

        //no data template
        it("DropDownList builds a noDataTemplate", function() {
            var dropdownlist = new DropDownList(input, {
                noDataTemplate: "test"
            });

            assert.isOk(dropdownlist.noDataTemplate);
        });

        it("render nodata container", function() {
            var dropdownlist = new DropDownList(input, {
                noDataTemplate: "test"
            });

            assert.isOk(dropdownlist.noData);
            assert.isOk(dropdownlist.noData.hasClass("k-nodata"));
            assert.equal(dropdownlist.noData.children("div").length, 1);
            assert.equal(dropdownlist.noData.text(), dropdownlist.options.noDataTemplate);
        });

        it("render nodata before footerTemplate", function() {
            var dropdownlist = new DropDownList(input, {
                noDataTemplate: "test",
                footerTemplate: "footer"
            });

            assert.isOk(dropdownlist.noData.next().hasClass("k-footer"));
        });

        it("hides noData template if any data", function() {
            var dropdownlist = new DropDownList(input, {
                dataValueField: "name",
                dataTextField: "name",
                dataSource: {
                    data: [
                        { name: "item1", type: "a" },
                        { name: "item2", type: "a" },
                        { name: "item3", type: "b" }
                    ]
                },
                noDataTemplate: "no data",
                template: '#:data.name#'
            });

            dropdownlist.open();

            assert.isOk(!dropdownlist.noData.is(":visible"));
        });

        it("shows noData template if no data", function() {
            var dropdownlist = new DropDownList(input, {
                dataValueField: "name",
                dataTextField: "name",
                dataSource: {
                    data: []
                },
                noDataTemplate: "no data",
                template: '#:data.name#'
            });

            dropdownlist.open();

            assert.isOk(dropdownlist.noData.is(":visible"));
        });

        it("hides noData template if widget is bound on subsequent call", function() {
            var dropdownlist = new DropDownList(input, {
                dataValueField: "name",
                dataTextField: "name",
                dataSource: {
                    data: []
                },
                noDataTemplate: "no data",
                template: '#:data.name#'
            });

            dropdownlist.open();

            assert.isOk(dropdownlist.noData.is(":visible"));

            dropdownlist.dataSource.data([
                { name: "item1", type: "a" },
                { name: "item2", type: "a" },
                { name: "item3", type: "b" }
            ]);

            assert.isOk(!dropdownlist.noData.is(":visible"));
        });

        it("update noData template on dataBound", function() {
            var dropdownlist = new DropDownList(input, {
                autoBind: true,
                noDataTemplate: "#: instance.dataSource.total() #"
            });

            var noData = dropdownlist.noData;

            dropdownlist.dataSource.data(["Item1"]);

            assert.equal(noData.text(), dropdownlist.dataSource.total());
        });

        it("DropDownList opens the popup if noDataTemplate", function() {
            var dropdownlist = new DropDownList(input, {
                noDataTemplate: "no data"
            });

            dropdownlist.wrapper.click();

            assert.isOk(dropdownlist.popup.visible());
        });

        it("DropDownList doesn't open the popup if no data", function() {
            var dropdownlist = new DropDownList(input, {
                noDataTemplate: ""
            });

            dropdownlist.wrapper.click();

            assert.isOk(!dropdownlist.popup.visible());
        });

        it("DropDownList should support calculated fields", function() {
            var dropdownlist = new DropDownList(input, {
                autoBind: false,
                dataTextField: 'name$()',
                dataValueField: 'id',
                dataSource: {
                    data: [{ id: kendo.guid(), firstName: 'Peter', lastName: 'Parker' }],
                    schema: {
                        model: kendo.data.Model.define({
                            idField: 'id',
                            fields: {
                                firstName: { type: 'string' },
                                lastName: { type: 'string' }
                            },
                            name$: function() { return this.get('firstName') + ' ' + this.get('lastName'); }
                        })
                    }
                }
            });

            assert.isOk(true); //no errors were thrown;
        });

        it("unifyType parses booleans correctly", function() {
            assert.equal(kendo.ui.List.unifyType("false", "boolean"), false);
            assert.equal(kendo.ui.List.unifyType("true", "boolean"), true);
        });

        it("unifyType parses numbers to booleans correctly", function() {
            assert.equal(kendo.ui.List.unifyType(0, "boolean"), false);
            assert.equal(kendo.ui.List.unifyType(1, "boolean"), false);
        });
    });
}());
