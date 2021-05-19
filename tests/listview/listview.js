(function() {
    var DataSource = kendo.data.DataSource,
        dom,
        dataSource;
    var wrapper;

    function setup(options) {
        options = $.extend({
            template: "<div class='k-listview-item'></div>",
            navigatable: true,
            dataSource: dataSource = new DataSource({ data: [1, 2, 3, 4, 5] })
        }, options);
        return dom.kendoListView(options);
    }

    function createListView(element, userOptions) {
        var options = $.extend({
            navigatable: true,
            template: "<div class='k-listview-item'>#= value #</div>",
            dataSource: dataSource = new DataSource({
                data: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }]
            })
        }, userOptions);

        return new kendo.ui.ListView(element, options);
    }

    describe("listview initialization", function() {
        beforeEach(function() {
            kendo.ns = "kendo-";

            $.fn.press = function(key, ctrl, shift) {
                return this.trigger({ type: "keydown", keyCode: key, ctrlKey: ctrl, shiftKey: shift });
            };

            dom = $("<div />").appendTo(Mocha.fixture);
            $("<div id=\"pager\"></div>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
            kendo.ns = "";
            $("#pager").remove();
            dom.remove();
        });

        it("when contentElement is an empty string content wrapper is not rendered", function() {
            var dom = setup({
                contentElement: ''
            });

            assert.equal(dom.find(".k-listview-content").length, 0);
        });

        it("kendoListView attaches listView to element", function() {
            var dom = setup();

            assert.isOk(dom.data("kendoListView") instanceof kendo.ui.ListView);
        });

        it("k-widget and k-listview classes are applied on element", function() {
            var dom = setup();

            assert.isOk(dom.hasClass("k-widget"));
            assert.isOk(dom.hasClass("k-listview"));
        });

        it("renders item for dataSource items", function() {
            var dom = setup();

            assert.equal(dom.find(".k-listview-content > .k-listview-item").length, 5);
        });

        it("options as array is used for dataSource", function() {
            var dom = $("<div></div>").appendTo(Mocha.fixture).kendoListView([1, 2, 3]),
                dataSource = dom.data("kendoListView").dataSource.data();

            assert.equal(dataSource.length, 3);
        });

        it("dataBound event should be raised when bound", function() {
            var called = false,
                dom = setup({
                    dataBound: function() {
                        called = true;
                    }
                });
            assert.isOk(called);
        });

        it("cancelling databinding event prevents refresh", function() {
            var dom = setup({
                dataBinding: function(e) {
                    e.preventDefault();
                }
            });

            assert.equal(dom.find(".k-listview-content > .k-listview-item").length, 0);
        });

        it("DataSource change action is passed to databinding event", function() {
            var listView = setup().data("kendoListView");

            listView.bind("dataBinding", function(e) {
                assert.equal(e.action, "add");
                assert.equal(e.items.length, 1);
                assert.equal(e.index, 1);
            });

            listView.dataSource.insert(1, {});
        });

        it("autoBind false does not populate listView", function() {
            var dom = setup({ autoBind: false });
            assert.equal(dom.find(".k-listview-content > .k-listview-item").length, 0);
        });

        it("altTemplate defaults to template if is not set", function() {
            var listView = setup({ template: "<li>1</li>" }).data("kendoListView");

            assert.equal(listView.template({}), "<li>1</li>");
            assert.equal(listView.altTemplate({}), "<li>1</li>");
        });

        it("altTemplate defined", function() {
            var listView = setup({ template: "<li>1</li>", altTemplate: "<li>2</li>" }).data("kendoListView");

            assert.equal(listView.template({}), "<li>1</li>");
            assert.equal(listView.altTemplate({}), "<li>2</li>");
        });

        it("altTemplate is rendered", function() {
            var dom = setup({ template: "<li>1</li>", altTemplate: "<li>2</li>", contentTemplate: "" });

            assert.equal(dom.children(".k-listview-content").children().eq(0).html(), "1");
            assert.equal(dom.children(".k-listview-content").children().eq(1).html(), "2");
        });

        it("contentElement is rendered correctly", function() {
            var dom = setup({ contentElement:"ul", template: "<li>1</li>", altTemplate: "<li>2</li>"});

            assert.equal(dom.find(".k-listview-content")[0].nodeName.toLocaleLowerCase(), "ul");
        });

        it("progress mask is shown when request starts", function() {
            var dom = setup();

            dataSource.bind("progress", function() {
                assert.equal(dom.find("div.k-loading-mask").length, 1);
            });
            dataSource.read();
        });

        it("progress mask is hidden when request finish", function() {
            var dom = setup();

            dataSource.read();

            assert.equal(dom.find("div.k-loading-mask").length, 0);
        });

        it("selectable false does not instantiate Selectable object", function() {
            var dom = setup({ selectable: false });
            assert.isOk(!dom.data("kendoListView").selectable);
        });

        it("selectable true instantiate Selectable object", function() {
            var dom = setup({ selectable: true });
            assert.isOk(dom.data("kendoListView").selectable);
        });

        it("selectable true instantiate Selectable object", function() {
            var listView = setup({ selectable: true }).data("kendoListView");

            assert.isOk(listView.selectable);
            assert.isOk(!listView.selectable.options.multiple);
        });

        it("selectable multiple set multiple mode of the selectable", function() {
            var listView = setup({ selectable: "multiple" }).data("kendoListView");

            assert.isOk(listView.selectable.options.multiple);
        });

        it("setOptions changes the selectable configuration", function() {
            var listView = setup({ selectable: true }).data("kendoListView");

            listView.setOptions({ "selectable": "multiple" });

            assert.isOk(listView.selectable.options.multiple);
        });

        it("setOptions disables the selectable", function() {
            var listView = setup({ selectable: true }).data("kendoListView");

            listView.setOptions({ selectable: false });

            assert.isOk(!listView.selectable);
        });

        it("focusing grid element focus first item ", function() {
            var dom = setup();

            dom.focus();
            assert.isOk(dom.find(".k-listview-content > .k-listview-item").first().is(".k-state-focused"));
        });

        it("down arrow moves focus on the next row same cell", function() {
            var dom = setup();

            dom.focus().press(kendo.keys.DOWN);
            assert.isOk(dom.find(".k-listview-content > .k-listview-item:eq(1)").hasClass("k-state-focused"));
        });

        it("right arrow moves focus on the next cell on the same row", function() {
            var dom = setup();
            dom.focus().press(kendo.keys.RIGHT);
            assert.isOk(dom.find(".k-listview-content > .k-listview-item:eq(1)").hasClass("k-state-focused"));
        });

        it("left arrow moves focus on the prev cell on the same row", function() {
            var dom = setup();
            dom.focus().press(kendo.keys.RIGHT).press(kendo.keys.LEFT);
            assert.isOk(dom.find(".k-listview-content > .k-listview-item:eq(0)").hasClass("k-state-focused"));
        });

        it("up arrow moves focus on the prev row same cell", function() {
            var dom = setup();
            dom.focus().press(kendo.keys.DOWN).press(kendo.keys.UP);
            assert.isOk(dom.find(".k-listview-content > .k-listview-item:eq(0)").hasClass("k-state-focused"));
        });

        it("space key select the focused item", function() {
            var dom = setup({ selectable: true });

            dom.focus().press(kendo.keys.DOWN).press(kendo.keys.SPACEBAR);

            assert.isOk(dom.find(".k-listview-content > .k-listview-item:eq(1)").hasClass("k-state-selected"));
        });

        it("ctrl + space key when multiple selectoin is enabled persist the selected items", function() {
            var dom = setup({ selectable: "multiple" });

            dom.focus().press(kendo.keys.DOWN).press(kendo.keys.SPACEBAR);
            dom.press(kendo.keys.DOWN).press(kendo.keys.SPACEBAR, true);

            assert.equal(dom.find(".k-listview-content > .k-listview-item.k-state-selected").length, 2);
            assert.isOk(dom.find(".k-listview-content > .k-listview-item:eq(1)").hasClass("k-state-selected"));
            assert.isOk(dom.find(".k-listview-content > .k-listview-item:eq(2)").hasClass("k-state-selected"));
        });

        it("space key on already selected item when multiple selectoin is enabled unselects the item", function() {
            var dom = setup({ selectable: "multiple" });

            dom.focus().press(kendo.keys.DOWN).press(kendo.keys.SPACEBAR).press(kendo.keys.SPACEBAR, true);

            assert.isOk(!dom.find(".k-listview-content > .k-listview-item:eq(1)").hasClass("k-state-selected"));
        });

        it("select without arguments returns selected items", function() {
            var dom = setup({ selectable: true }),
                selected;

            dom.find(".k-listview-content > .k-listview-item:first").addClass("k-state-selected");

            selected = dom.data("kendoListView").select();
            assert.equal(selected.length, 1);
        });

        it("select with arguments mark the arguments as selected", function() {
            var dom = setup({
                selectable: true
            }),
                item = dom.find(".k-listview-content > .k-listview-item:eq(0)");

            dom.data("kendoListView").select(item);

            assert.isOk(item.hasClass("k-state-selected"));
        });

        it("select clears previously selected items if single select", function() {
            var dom = setup({
                selectable: true
            }),
                items = dom.children(".k-listview-content").children();

            items.eq(0).addClass("k-state-selected");
            dom.data("kendoListView").select(items.eq(1));

            assert.isOk(!items.eq(0).hasClass("k-state-selected"));
            assert.isOk(items.eq(1).hasClass("k-state-selected"));
        });

        it("select persist previously selected items if multi select", function() {
            var dom = setup({
                selectable: "multiple",
            }),
                items = dom.children(".k-listview-content").children();

            items.eq(0).addClass("k-state-selected");
            dom.data("kendoListView").select(items.eq(1));

            assert.isOk(items.eq(0).hasClass("k-state-selected"));
            assert.isOk(items.eq(1).hasClass("k-state-selected"));
        });

        it("select with array of items as argument select first if single select", function() {
            var dom = setup({
                selectable: true
            }),
                items = dom.children();

            dom.data("kendoListView").select(items);

            assert.isOk(items.eq(0).hasClass("k-state-selected"));
            assert.isOk(!items.eq(1).hasClass("k-state-selected"));
            assert.isOk(!items.eq(2).hasClass("k-state-selected"));
        });

        it("clearSelection clears selected items", function() {
            var listView = setup({
                selectable: true
            }).data("kendoListView"),
                item = listView.element.find(".k-listview-content > .k-listview-item:eq(1)").addClass("k-state-selected");

            listView.clearSelection();

            assert.isOk(!item.hasClass("k-state-selected"));
        });

        it("clearSelection triggers change event", function() {
            var triggered = false,
                listView = setup({
                    selectable: true,
                    change: function() {
                        triggered = true;
                    }
                }).data("kendoListView");

            listView.element.find(".k-listview-content > .k-listview-item:eq(1)").addClass("k-state-selected");

            listView.clearSelection();

            assert.isOk(triggered);
        });

        it("resetting dataSource detaches the previouse events", function() {
            var listView = new kendo.ui.ListView($("<ul/>").appendTo(Mocha.fixture), { template: "<li></li>" });

            var dataSource = listView.dataSource;
            listView._dataSource();

            listView.bind("dataBound", function() {
                assert.isOk(false, "Change event is not detached");
            });

            dataSource.read();
            assert.notStrictEqual(listView.dataSource, dataSource);
        });

        it("resetting DataSource rebinds the widget", function() {
            var listView = new kendo.ui.ListView($("<ul/>").appendTo(Mocha.fixture), { template: "<li></li>" });

            listView.setDataSource(new kendo.data.DataSource({
                data: [{ text: 1, value: 1 }, { text: 2, value: 2 }]
            }));

            assert.equal(listView.element.find("li").length, 2);
        });

        it("pageable option initialize pager", function() {
            var dom = setup({ pageable: { pagerId: "pager" } });

            assert.isOk($("#pager").data("kendoPager") instanceof kendo.ui.Pager);
        });

        it("listview DataSource is applied on the pager", function() {
            var listView = setup({ pageable: { pagerId: "pager" } }).data("kendoListView");
            var pager = $("#pager").data("kendoPager");

            assert.isOk(pager.dataSource === listView.dataSource);
        });

        it("listview pageable settings are applied on the pager", function() {
            var listView = setup({
                pageable: {
                    pagerId: "pager",
                    selectTemplate: "<li>foo</li>"
                }
            })
                .data("kendoListView");
            var pager = $("#pager").data("kendoPager");

            assert.equal(pager.options.selectTemplate, "<li>foo</li>");
        });

        it("uid is set to item wrapper", function() {
            var listView = setup({
                dataSource: {
                    data: [{ foo: 1 }, { foo: 2 }]
                }
            }).data("kendoListView"),
                view = listView.dataSource.view(),
                items = listView.items();

            assert.equal(items.eq(0).attr(kendo.attr("uid")), view[0].uid);
            assert.equal(items.eq(1).attr(kendo.attr("uid")), view[1].uid);
        });

        it("uid is set to item wrapper on dataSource change", function() {
            var listView = setup({
                dataSource: {
                    data: [{ foo: 1 }, { foo: 2 }]
                }
            }).data("kendoListView");

            listView.dataSource.view()[0].set("foo", 3);

            var view = listView.dataSource.view(),
                items = listView.items();

            assert.equal(items.eq(0).attr(kendo.attr("uid")), view[0].uid);
            assert.equal(items.eq(1).attr(kendo.attr("uid")), view[1].uid);
        });

        it("correct item is updated when model itemchange changes the sorting order", function() {
            var listView = setup({
                dataSource: {
                    data: [{ foo: 1 }, { foo: 2 }],
                    sort: { field: "foo", dir: "asc" }
                }
            }).data("kendoListView");

            listView.dataSource.at(0).set("foo", 3);

            var view = listView.dataSource.view(),
                items = listView.items();

            assert.equal(items.eq(0).attr(kendo.attr("uid")), view[1].uid);
            assert.equal(items.eq(1).attr(kendo.attr("uid")), view[0].uid);
        });

        it("dataItem returns data item for given element", function() {
            var listView = setup({
                dataSource: [
                    { foo: 1 }, { foo: 2 }
                ]
            }).data("kendoListView");

            var items = listView.items();

            assert.equal(listView.dataItem(items.eq(0)).foo, 1);
            assert.equal(listView.dataItem(items.eq(1)).foo, 2);
        });
    });

    describe("listview navigation", function() {
        beforeEach(function() {
            wrapper = $("<div id='wrapper' style='height: 100px; overflow-y: scroll;'>" +
                "<div id='listView' />" +
                "</div>").appendTo(Mocha.fixture);
            element = Mocha.fixture.find("#listView");
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
            element.remove();
        });

        it("selecting an item focuses it", function() {
            var listView = createListView(element, { selectable: "multiple" });

            listView.content.children().css("height", 100);
            wrapper.scrollTop(wrapper[0].scrollHeight);

            listView.content.children().last().mousedown();

            assert.equal(kendo._activeElement(), element[0]);
        });

        it("selecting an item sets it as current", function() {
            var listView = createListView(element, { selectable: "multiple" });

            element.find(".k-listview-content").children().css("height", 100);
            wrapper.scrollTop(wrapper[0].scrollHeight);

            element.find(".k-listview-content").children().last().mousedown();

            assert.equal(listView.current()[0], element.find(".k-listview-content").children().last()[0]);
        });

        it("selecting an item does not scroll parent element", function() {
            createListView(element, { selectable: "multiple" });

            element.find(".k-listview-content").children().css("height", 100);
            wrapper.scrollTop(wrapper[0].scrollHeight);;
            var initialScrollTop = wrapper.scrollTop();

            element.find(".k-listview-content").children().last().mousedown();

            assert.equal(initialScrollTop, wrapper.scrollTop());
        });

        it("_setContentHeight sets the height of the content when listview is scrollable", function() {
            var lv = createListView(element, {scrollable:{endless: true}, height: 400, template: "<div style='padding:100px' class='k-listview-item'>#= value #</div>" });

            assert.equal(lv.content.height(), lv.wrapper.innerHeight());
        });

        it("init calls _setContentHeight", function() {
            var lv = createListView(element, {scrollable:{endless: true}, height: 400, template: "<div style='padding:100px' class='k-listview-item'>#= value #</div>" });

            var lvStub = stub(lv, {
                _setContentHeight: $.noop
            });

            lv.init(lv.element, lv.options);

            assert.equal(lvStub.calls('_setContentHeight'), 2);
        });

        it("refresh calls _setContentHeight", function() {
            var lv = createListView(element, {scrollable:{endless: true}, height: 400, template: "<div style='padding:100px' class='k-listview-item'>#= value #</div>" });

            var lvStub = stub(lv, {
                _setContentHeight: $.noop
            });

            lv.refresh();

            assert.equal(lvStub.calls('_setContentHeight'), 1);
        });
    });
}());
