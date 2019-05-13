(function() {
    var DataSource = kendo.data.DataSource,
        ListView = kendo.ui.ListView,
        dataSource,
        ul;

    function setup(options) {
        var data = [];
        for (var idx = 0; idx < 50; idx++) {
            data.push({ id: idx, foo: "foo " + idx });
        }

        options = $.extend({
            template: "<li>${foo}</li>",
            editTemplate: "<li><input value='${foo}' /></li>",
            scrollable: "endless",
            height: 50,
            dataSource: dataSource = new DataSource({
                transport: {
                    read: function(options) {
                        options.success(data);
                    },
                    destroy: $.noop,
                    update: $.noop
                },
                schema: {
                    model: {
                        id: "id",
                        fields: {
                            id: { type: "number", defaultValue: -1 },
                            foo: { type: "string" }
                        }
                    }
                },
                pageSize: 5
            })
        }, options);
        return ul.kendoListView(options).data("kendoListView");
    }

    describe("listview endless scrolling", function () {
        beforeEach(function() {
            ul = $("<ul/>").appendTo(Mocha.fixture);
            $("<div id=\"pager\"></div>").appendTo(Mocha.fixture);

            $.fn.press = function(key, ctrl, shift) {
                return this.trigger({ type: "keydown", keyCode: key, ctrlKey: ctrl, shiftKey: shift });
            };
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
            kendo.ns = "";
            $("#pager").remove();
            ul.remove();
        });

    it("Endless scroll is disabled by default", function() {
        assert.equal(ListView.prototype.options.scrollable, undefined);
    });

    it("More items are requested when scrolled to the bottom", function() {
        var listview = setup();
        listview.element.scrollTop(listview.element[0].scrollHeight);
        listview.element.scroll();

        assert.equal(listview.dataSource.view().length, 10);
    });

    it("User can add only one insert item", function() {
        var listview = setup();

        listview.add();
        listview.element.scrollTop(listview.element.height());
        listview.element.scroll();
        listview.add();

        assert.equal(listview.element.find(".k-edit-item").length, 1);
    });

    it("User can enter only one item in edit mode", function() {
        var listview = setup();
        listview.edit(listview.element.children().eq(0));
        listview.element.scrollTop(listview.element.height());
        listview.element.scroll();
        listview.edit(listview.element.children().eq(1));

        assert.equal(listview.element.find(".k-edit-item").length, 1);
    });

    it("Pager shows correct info when endless scrolling is used", function() {
        var listview = setup({ pageable: { pagerId: "pager" } });

        listview.element.scrollTop(listview.element[0].scrollHeight);
        listview.element.scroll();
        assert.equal($("#pager").data("kendoPager").element.find(".k-pager-info").text(), "1 - 10 of 50 items");
    });

    it("Calling the datasource read method replaces only the last subset of items", function() {
        var listview = setup();

        listview.element.scrollTop(listview.element[0].scrollHeight);
        listview.element.scroll();
        listview.dataSource.read();

        assert.equal(listview.dataSource.view().length, 10);
        assert.equal(listview.items().length, 10);
    });

    it("After calling the datasource read method the uid attributes are applied correctly", function() {
        var listview = setup();

        listview.element.scrollTop(listview.element[0].scrollHeight);
        listview.element.scroll();
        listview.dataSource.read();

        assert.equal(listview.dataSource.view()[6].uid,listview.items().eq(6).attr("data-uid"));
    });

    it("when last child is focused down arrow will retrieve next items and listiview will focus the correct item", function() {
        var listView = setup({ navigatable: true });
        listView.element.children().last().mousedown();
        listView.element.trigger("focus").press(kendo.keys.DOWN);

        assert.isOk(listView._focusNext);
    });

    });
}());
