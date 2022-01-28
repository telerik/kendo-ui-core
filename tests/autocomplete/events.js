(function() {

    var AutoComplete = kendo.ui.AutoComplete;
    var CLICK = kendo.support.touch ? "touchend" : "click";
    var input;

    describe("kendo.ui.AutoComplete events", function() {
        beforeEach(function() {
            input = $("<input>").appendTo(Mocha.fixture);

            $.fn.press = function(key) {
                return this.trigger({ type: "keydown", keyCode: key });
            }
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("_blur calls _change", function() {
            var changeWasCalled = false, autocomplete = new AutoComplete(input, {
                dataSource: ["foo", "bar"]
            });

            autocomplete._change = function() {
                changeWasCalled = true;
            }

            autocomplete._blur();

            assert.isOk(changeWasCalled);
        });

        it("value set with value method does not trigger change event", function() {
            var changeWasCalled = false, autocomplete = new AutoComplete(input, {
                dataSource: ["foo", "bar"],
                change: function() {
                    assert.isOk(false);
                }
            });

            autocomplete.value("test");
            autocomplete._blur();
        });

        it("raise change after search()", function(done) {
            var autocomplete = new AutoComplete(input, {
                delay: 0,
                dataSource: ["foo", "bar"],
                change: function() {
                    assert.isOk(true);
                    done();
                }
            });

            input.val("test");
            autocomplete._search();

            setTimeout(function() {
                autocomplete._change();
            }, 100);
        });

        it("_change raises the change event if value has changed", function() {
            var changeWasCalled = false, autocomplete = new AutoComplete(input, {
                change: function() {
                    changeWasCalled = true;
                }
            });

            autocomplete._prev = "foo";
            autocomplete._accessor("bar");
            autocomplete._change();
            assert.isOk(changeWasCalled);
        });

        it("_change is not raised initially", function() {
            var changeWasCalled = false, autocomplete = new AutoComplete(input, {
                change: function() {
                    changeWasCalled = true;
                }
            });
            input.focus();
            autocomplete._change();
            assert.isOk(!changeWasCalled);
        });

        it("_change does not raise change event if value has't changed", function() {
            var changeWasCalled = false, autocomplete = new AutoComplete(input, {
                change: function() {
                    changeWasCalled = true;
                }
            });

            autocomplete._old = "foo";
            autocomplete.value("foo");
            autocomplete._change();
            assert.isOk(!changeWasCalled);
        });

        it("_prev is initialzed on focus", function() {
            var autocomplete = new AutoComplete(input, {
            });

            input.val("foo").focus();

            assert.equal(autocomplete._prev, "foo");
        });

        it("change is not triggered on blur with empty value", function() {
            var autocomplete = new AutoComplete(input, {
                change: function() {
                    assert.isOk(false);
                }
            });

            autocomplete.value(null);
            input.focus();
            input.blur();
        });

        it("select does not raise the change event", function() {
            var changeWasCalled = false, autocomplete = new AutoComplete(input, {
                change: function() {
                    changeWasCalled = true;
                }
            });

            input.focus();
            autocomplete.select($("<li>foo</li>"));
            assert.isOk(!changeWasCalled);
        });

        it("clicking an item raises the change event", function() {
            var autocomplete = new AutoComplete(input, {
                dataSource: ["foo"],
                change: function() {
                    assert.isOk(true);
                }
            });

            input.focus().val("f");
            autocomplete.search();
            autocomplete.ul.children().first().trigger(CLICK);
        });

        it("clicking an item raises the change event of the dom element", function() {
            var autocomplete = new AutoComplete(input, {
                dataSource: ["foo"]
            });

            input.focus().val("f");
            autocomplete.search();
            input.change(function() {
                assert.isOk(true);
            });
            autocomplete.ul.children().first().trigger(CLICK);
        });

        it("clicking an item raises the change event of the dom element even when same item is selected", function() {
            var autocomplete = new AutoComplete(input, {
                dataSource: ["foo"],
                value: "foo"
            });

            input.focus().val("f");
            autocomplete.search();

            input.change(function() {
                assert.isOk(true);
            });

            autocomplete.ul.children().first().trigger(CLICK);
        });

        it("does not force element's DOM change event when the user manually edits the value and presses 'Enter'", function() {
            input.kendoAutoComplete({
                dataSource: ["foo"]
            });

            input.bind("change", function() {
                assert.isOk(false);
            });

            input.focus()
                .trigger($.Event("keydown", { keyCode: 70 }))
                .val("f")
                .trigger($.Event("keypress", { keyCode: 70 }))
                .trigger($.Event("keydown", { keyCode: 13 }));
        });

        it("open event when open popup on search", function() {
            input.kendoAutoComplete({
                delay: 0,
                dataSource: ["foo", "bar"],
                open: function() {
                    assert.isOk(true);
                }
            });

            var autocomplete = input.data("kendoAutoComplete");
            input.focus().val("f");
            autocomplete.search();
        });

        it("open event should be cancellable", function(done) {
            input.kendoAutoComplete({
                delay: 0,
                dataSource: ["foo", "bar"],
                open: function(e) {
                    e.preventDefault();
                }
            });

            var autocomplete = input.data("kendoAutoComplete");
            input.focus().val("f");
            autocomplete.search();

            setTimeout(function() {
                assert.isOk(!autocomplete.popup.visible());
                done();
            }, 200);
        });

        it("close event when popup close on click", function() {
            input.kendoAutoComplete({
                delay: 0,
                dataSource: ["foo", "bar"],
                close: function() {
                    assert.isOk(true);
                }
            });

            var autocomplete = input.data("kendoAutoComplete");
            input.focus().val("f");
            autocomplete.search();
            autocomplete.ul.children().first().click();
        });

        it("click item raises select event", function() {
            var autocomplete = input.kendoAutoComplete({
                dataSource: ["foo"],
                select: function(e) {
                    assert.equal(e.item[0], autocomplete.ul.children()[0]);
                    assert.equal(e.dataItem, autocomplete.dataSource.view()[0]);
                }
            }).data("kendoAutoComplete");

            input.focus().val("f");
            autocomplete.search();
            autocomplete.ul.children().first().trigger(CLICK);
        });

        it("prevent select event should only close the popup", function() {
            var autocomplete = input.kendoAutoComplete({
                dataSource: ["foo"],
                select: function(e) {
                    e.preventDefault();
                },
                change: function() {
                    assert.isOk(false);
                }
            }).data("kendoAutoComplete");

            input.focus().val("f");
            autocomplete.search();
            autocomplete.ul.children().first().trigger(CLICK);

            assert.isOk(!autocomplete.popup.visible());
        });

        it("select event is not raised when custom value is entered", function() {
            var autocomplete = input.kendoAutoComplete({
                dataSource: ["foo"],
                select: function(e) {
                    assert.isOk(false);
                }
            }).data("kendoAutoComplete");

            autocomplete.dataSource.read();
            autocomplete.popup.open();

            autocomplete.element.trigger({
                type: "keydown",
                keyCode: kendo.keys.ENTER
            });
        });

        it("select event is raised when first item is entered", function() {
            var autocomplete = input.kendoAutoComplete({
                dataSource: ["foo"],
                select: function(e) {
                    assert.equal(e.item[0], autocomplete.ul.children()[0]);
                    assert.equal(e.dataItem, autocomplete.dataSource.view()[0]);
                }
            }).data("kendoAutoComplete");

            autocomplete.dataSource.read();
            autocomplete.popup.open();
            autocomplete.listView.focus(0);

            autocomplete.element.trigger({
                type: "keydown",
                keyCode: kendo.keys.ENTER
            });
        });

        it("AutoComplete triggers filtering event on data source filter", function() {
            var autocomplete = input.kendoAutoComplete({
                dataSource: ["foo", "bar"],
                filter: "contains",
                filtering: function(e) {
                    var filter = e.filter;

                    assert.equal(filter.field, "");
                    assert.equal(filter.operator, "contains");
                    assert.equal(filter.value, "baz");
                }
            }).data("kendoAutoComplete");

            autocomplete.search("baz");
        });

        it("modifying filter expression in filtering event changes datasource result", function() {
            var autocomplete = input.kendoAutoComplete({
                dataSource: ["foo", "bar"],
                filter: "contains",
                filtering: function(e) {
                    e.filter.value = "foo";
                }
            }).data("kendoAutoComplete");

            autocomplete.search("baz");

            var data = autocomplete.dataSource.view();

            assert.equal(data.length, 1);
            assert.equal(data[0], "foo");
        });

        it("AutoComplete filtering event can be prevented", function() {
            var autocomplete = input.kendoAutoComplete({
                dataSource: ["foo", "bar"],
                filter: "contains",
                filtering: function(e) {
                    e.preventDefault();
                }
            }).data("kendoAutoComplete");

            autocomplete.dataSource.bind("change", function() {
                assert.isOk(false);
            });

            autocomplete.search("baz");
        });

        it("reset value when _clear is clicked", function() {
            var autocomplete = new AutoComplete(input, {
                dataTextField: "name",
                dataSource: [
                    { id: 1, name: "name1" },
                    { id: 2, name: "name2" },
                    { id: 3, name: "name3" }
                ],
                value: "2"
            });

            autocomplete._clear.click();
            assert.equal(autocomplete.value(), "");
        });

        it("focus input when _clear is clicked", function() {
            var autocomplete = new AutoComplete(input, {
                dataTextField: "name",
                dataSource: [
                    { id: 1, name: "name1" },
                    { id: 2, name: "name2" },
                    { id: 3, name: "name3" }
                ],
                value: "2"
            });

            autocomplete._clearValue();

            assert.equal(assert.equal(document.activeElement, autocomplete.element[0]));
        });

        it("show clear button", function() {
            var autocomplete = new AutoComplete(input, {
                dataTextField: "name",
                dataSource: [
                    { id: 1, name: "name1" },
                    { id: 2, name: "name2" },
                    { id: 3, name: "name3" }
                ],
                value: "2"
            });

            assert.isOk(autocomplete.wrapper.find(autocomplete._clear).length > 0);
        });

        it("hide clear button with setOptions", function() {
            var autocomplete = new AutoComplete(input, {
                dataTextField: "name",
                dataSource: [
                    { id: 1, name: "name1" },
                    { id: 2, name: "name2" },
                    { id: 3, name: "name3" }
                ],
                value: "2"
            });
            autocomplete.setOptions({
                clearButton: false
            });
            assert.isOk(autocomplete.wrapper.find(autocomplete._clear).length === 0);
        });

        it("hide clear button", function() {
            var autocomplete = new AutoComplete(input, {
                clearButton: false,
                dataTextField: "name",
                dataSource: [
                    { id: 1, name: "name1" },
                    { id: 2, name: "name2" },
                    { id: 3, name: "name3" }
                ],
                value: "2"
            });

            assert.equal(autocomplete.wrapper.find(autocomplete._clear).length, 0);
        });
    });
}());
