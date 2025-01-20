import '@progress/kendo-ui/src/kendo.multiselect.js';
import { stub } from '../../helpers/stub.js';
import { asyncTest } from '../../helpers/async-utils.js';

let MultiSelect = kendo.ui.MultiSelect,
    keys = kendo.keys,
    select,
    CONTAINER_HEIGHT = 200;

function populateSelect(length) {
    let options = [];
    length = length || 5;
    for (let i = 0; i < length; i++) {
        options.push("<option value='" + i + "'>Option" + i + "</option>");
    }

    select.html(options);
}

describe("kendo.ui.MultiSelect navigation", function() {
    beforeEach(function() {
        $.fn.press = function(character) {
            let keyCode = character.charCodeAt(0);
            $(this).trigger({
                type: "keydown",
                keyCode: keyCode
            });
        };

        kendo.ns = "kendo-";

        select = $("<select multiple=multiple/>").appendTo(Mocha.fixture);
        populateSelect();
    });
    afterEach(function() {
        kendo.ns = "";

        if (select.data("kendoMultiSelect")) {
            select.data("kendoMultiSelect").destroy();
        }

        select.parents(".k-widget").remove();
    });

    it("MultiSelect opens popup on keydown", function() {
        let multiselect = new MultiSelect(select);

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        assert.isOk(multiselect.popup.visible());
    });

    it("MultiSelect highlights first LI", function() {
        let multiselect = new MultiSelect(select);

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        assert.isOk(multiselect.current().hasClass("k-focus"));
    });

    it("MultiSelect highlights next LI", function() {
        let multiselect = new MultiSelect(select);

        multiselect.open();
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        assert.equal(multiselect.current().index(), 1);
        assert.isOk(multiselect.current().hasClass("k-focus"));
    });

    it("MultiSelect does nothing if LI is last", function() {
        let multiselect = new MultiSelect(select);

        multiselect.open();
        multiselect.current(multiselect.ul.children().last());

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        assert.isOk(multiselect.current());
        assert.equal(multiselect.current().index(), multiselect.ul.children().length - 1);
        assert.isOk(multiselect.current().hasClass("k-focus"));
    });

    it("MultiSelect highlights prev LI", function() {
        let multiselect = new MultiSelect(select);

        multiselect.open();
        multiselect.current(multiselect.ul.children().last());

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.UP
        });

        assert.equal(multiselect.current().index(), multiselect.ul.children().length - 2);
        assert.isOk(multiselect.current().hasClass("k-focus"));
    });

    it("MultiSelect closes popup if no previous LI", async function() {
        let multiselect = new MultiSelect(select);

        multiselect.open();
        multiselect.current(multiselect.ul.children().first());

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.UP
        });

        await vi.waitUntil(() => !multiselect.popup.visible());
    });

    it("MultiSelect selects current highlighted on ENTER", function() {
        let multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.ENTER
        });

        assert.equal(multiselect.tagList.children(".k-chip").length, 1);
    });

    it("MultiSelect selects all on CTRL+A", function() {
        let multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: 65,
            ctrlKey: true
        });

        assert.equal(multiselect.tagList.children(".k-chip").length, 5);
    });

    it("MultiSelect deselects all on CTRL+A if already selected", function() {
        let multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: 65,
            ctrlKey: true
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: 65,
            ctrlKey: true
        });

        assert.equal(multiselect.tagList.children(".k-chip").length, 0);
    });

    it("MultiSelect respects maxSelectedItems on CTRL+A", function() {
        let multiselect = new MultiSelect(select, {
            maxSelectedItems: 2
        });

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: 65,
            ctrlKey: true
        });

        assert.equal(multiselect.tagList.children(".k-chip").length, 2);
    });

    it("MultiSelect selects item on CTRL+SPACEBAR", function() {
        let multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.SPACEBAR,
            ctrlKey: true
        });

        assert.equal(multiselect.tagList.children(".k-chip").length, 1);
        assert.equal(multiselect.tagList.children(".k-chip").eq(0).text().indexOf("Option1"), 0);
    });

    it("MultiSelect selects item on SHIFT+DOWN", function() {
        let multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN,
            shiftKey: true
        });

        assert.equal(multiselect.tagList.children(".k-chip").length, 1);
        assert.equal(multiselect.tagList.children(".k-chip").eq(0).text().indexOf("Option1"), 0);
    });

    it("MultiSelect selects multiple items on SHIFT+DOWN", function() {
        let multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN,
            shiftKey: true
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN,
            shiftKey: true
        });

        assert.equal(multiselect.tagList.children(".k-chip").length, 2);
        assert.equal(multiselect.tagList.children(".k-chip").eq(0).text().indexOf("Option1"), 0);
        assert.equal(multiselect.tagList.children(".k-chip").eq(1).text().indexOf("Option2"), 0);
    });

    it("MultiSelect respects maxSelectedItems on SHIFT+DOWN", function() {
        let multiselect = new MultiSelect(select, {
            maxSelectedItems: 1
        });

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN,
            shiftKey: true
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN,
            shiftKey: true
        });

        assert.equal(multiselect.tagList.children(".k-chip").length, 1);
        assert.equal(multiselect.tagList.children(".k-chip").eq(0).text().indexOf("Option1"), 0);
    });

    it("MultiSelect selects item on SHIFT+UP", function() {
        let multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.UP,
            shiftKey: true
        });

        assert.equal(multiselect.tagList.children(".k-chip").length, 1);
        assert.equal(multiselect.tagList.children(".k-chip").eq(0).text().indexOf("Option2"), 0);
    });

    it("MultiSelect selects multiple items on SHIFT+UP", function() {
        let multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.UP,
            shiftKey: true
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.UP,
            shiftKey: true
        });

        assert.equal(multiselect.tagList.children(".k-chip").length, 2);
        assert.equal(multiselect.tagList.children(".k-chip").eq(0).text().indexOf("Option2"), 0);
        assert.equal(multiselect.tagList.children(".k-chip").eq(1).text().indexOf("Option1"), 0);
    });

    it("MultiSelect respects maxSelectedItems on SHIFT+UP", function() {
        let multiselect = new MultiSelect(select, {
            maxSelectedItems: 1
        });

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.UP,
            shiftKey: true
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.UP,
            shiftKey: true
        });

        assert.equal(multiselect.tagList.children(".k-chip").length, 1);
        assert.equal(multiselect.tagList.children(".k-chip").eq(0).text().indexOf("Option2"), 0);
    });

    it("MultiSelect selects multiple items on CTRL+SHIFT+END", function() {
        let multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.END,
            ctrlKey: true,
            shiftKey: true
        });

        assert.equal(multiselect.tagList.children(".k-chip").length, 4);
    });

    it("MultiSelect respects maxSelectedItems on CTRL+SHIFT+END", function() {
        let multiselect = new MultiSelect(select, {
            maxSelectedItems: 2
        });

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.END,
            ctrlKey: true,
            shiftKey: true
        });

        assert.equal(multiselect.tagList.children(".k-chip").length, 2);
        assert.equal(multiselect.tagList.children(".k-chip").eq(0).text(), "Option1");
        assert.equal(multiselect.tagList.children(".k-chip").eq(1).text(), "Option2");
    });

    it("MultiSelect selects multiple items on CTRL+SHIFT+HOME", function() {
        let multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.HOME,
            ctrlKey: true,
            shiftKey: true
        });

        assert.equal(multiselect.tagList.children(".k-chip").length, 4);
    });

    it("MultiSelect respects maxSelectedItems on CTRL+SHIFT+HOME", function() {
        let multiselect = new MultiSelect(select, {
            maxSelectedItems: 2
        });

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DOWN
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.HOME,
            ctrlKey: true,
            shiftKey: true
        });

        assert.equal(multiselect.tagList.children(".k-chip").length, 2);
        assert.equal(multiselect.tagList.children(".k-chip").eq(0).text(), "Option3");
        assert.equal(multiselect.tagList.children(".k-chip").eq(1).text(), "Option2");
    });

    it("MultiSelect closes on ENTER", async function() {
        let multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.ENTER
        });

        await vi.waitUntil(() => !multiselect.popup.visible());
    });

    it("MultiSelect closes on ESC", async function() {
        let multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.ESC
        });

        await vi.waitUntil(() => !multiselect.popup.visible());
    });

    it("MultiSelect prevent default on ESC", function() {
        let multiselect = new MultiSelect(select);

        multiselect.open();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.ESC,
            preventDefault: function() {
                assert.isOk(true);
            }
        });
    });

    it("MultiSelect scrolls list to the focused element", function() {
        populateSelect(50);
        let multiselect = new MultiSelect(select);

        multiselect.value(["30"]);
        multiselect.open();

        assert.isOk(multiselect.listView.content[0].scrollTop > 50);
    });
});

describe("kendo.ui.MultiSelect navigation in virtual scenario", function() {
    function generateData(parameters) {
        let items = [];
        for (let i = parameters.skip, len = parameters.skip + parameters.take; i < len; i++) {
            items.push({
                id: i,
                value: i,
                text: "Item " + i
            });
        }

        return items;
    }

    function createAsyncDataSource(options) {
        options = options || {};
        let transport = {
            read: function(options) {
                setTimeout(function() {
                    options.success({ data: generateData(options.data), total: 300 });
                }, 0);
            }
        };

        return new kendo.data.DataSource({
            transport: options.transport || transport,
            serverPaging: true,
            serverFiltering: true,
            pageSize: 40,
            schema: {
                data: "data",
                total: "total"
            }
        });
    }

    beforeEach(function() {
        kendo.ns = "";
        select = $("<select multiple />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        if (select.data("kendoMultiSelect")) {
            select.data("kendoMultiSelect").destroy();
        }

        select.parents(".k-widget").remove();
    });

    asyncTest("MultiSelect selects all on CTRL+A", function(done) {
        let multiselect = new MultiSelect(select, {
            height: CONTAINER_HEIGHT,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 40
            }
        });

        multiselect.one("dataBound", function() {
            multiselect.open();

            multiselect.input.trigger({
                type: "keydown",
                keyCode: 65,
                ctrlKey: true
            });

            done(() => assert.equal(multiselect.tagList.children(".k-chip").length, 0));
        });
    });

    asyncTest("MultiSelect selects multiple items on SHIFT+DOWN", function(done) {
        let multiselect = new MultiSelect(select, {
            height: CONTAINER_HEIGHT,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 40
            }
        });

        multiselect.one("dataBound", function() {
            multiselect.open();

            multiselect.input.trigger({
                type: "keydown",
                keyCode: keys.DOWN
            });

            multiselect.input.trigger({
                type: "keydown",
                keyCode: keys.DOWN,
                shiftKey: true
            });

            multiselect.input.trigger({
                type: "keydown",
                keyCode: keys.DOWN,
                shiftKey: true
            });

            done(() => assert.equal(multiselect.tagList.children(".k-chip").length, 0));
        });
    });

    asyncTest("MultiSelect selects multiple items on SHIFT+UP", function(done) {
        let multiselect = new MultiSelect(select, {
            height: CONTAINER_HEIGHT,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 40
            }
        });

        multiselect.one("dataBound", function() {
            multiselect.open();

            multiselect.input.trigger({
                type: "keydown",
                keyCode: keys.DOWN
            });
            multiselect.input.trigger({
                type: "keydown",
                keyCode: keys.DOWN
            });

            multiselect.input.trigger({
                type: "keydown",
                keyCode: keys.UP,
                shiftKey: true
            });

            multiselect.input.trigger({
                type: "keydown",
                keyCode: keys.UP,
                shiftKey: true
            });

            done(() => assert.equal(multiselect.tagList.children(".k-chip").length, 0));
        });
    });

    asyncTest("MultiSelect selects multiple items on CTRL+SHIFT+END", function(done) {
        let multiselect = new MultiSelect(select, {
            height: CONTAINER_HEIGHT,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 40
            }
        });

        multiselect.one("dataBound", function() {
            multiselect.open();

            multiselect.input.trigger({
                type: "keydown",
                keyCode: keys.DOWN
            });

            multiselect.input.trigger({
                type: "keydown",
                keyCode: keys.END,
                ctrlKey: true,
                shiftKey: true
            });

            done(() => assert.equal(multiselect.tagList.children(".k-chip").length, 0));
        });
    });

    asyncTest("MultiSelect selects multiple items on CTRL+SHIFT+HOME", function(done) {
        let multiselect = new MultiSelect(select, {
            height: CONTAINER_HEIGHT,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 40
            }
        });

        multiselect.one("dataBound", function() {
            multiselect.open();

            multiselect.input.trigger({
                type: "keydown",
                keyCode: keys.DOWN
            });
            multiselect.input.trigger({
                type: "keydown",
                keyCode: keys.DOWN
            });
            multiselect.input.trigger({
                type: "keydown",
                keyCode: keys.DOWN
            });

            multiselect.input.trigger({
                type: "keydown",
                keyCode: keys.HOME,
                ctrlKey: true,
                shiftKey: true
            });

            done(() => assert.equal(multiselect.tagList.children(".k-chip").length, 0));
        });
    });
});

describe("kendo.ui.MultiSelect tag navigation", function() {
    beforeEach(function() {
        select = $("<select multiple=multiple/>").appendTo(Mocha.fixture);
        populateSelect();
    });
    afterEach(function() {
        if (select.data("kendoMultiSelect")) {
            select.data("kendoMultiSelect").destroy();
        }

        select.parents(".k-widget").remove();
    });

    it("MultiSelect focuses last tag if input is empty", function() {
        let multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["1", "2"]);

        multiselect.input.focus();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.LEFT
        });

        let tag = multiselect.tagList.children(".k-chip").last();

        assert.isOk(tag.hasClass("k-focus"));
    });

    it("MultiSelect focuses previous tag if input is empty", function() {
        let multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["1", "2"]);
        multiselect.input.focus();
        multiselect.currentTag(multiselect.tagList.children(".k-chip").last());
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.LEFT
        });

        let tag = multiselect.currentTag();

        assert.equal(tag.index(), 0);
        assert.isOk(tag.hasClass("k-focus"));
    });

    it("MultiSelect persist focus to the first LI on LEFT", function() {
        let multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["1", "2"]);
        multiselect.input.focus();
        multiselect.currentTag(multiselect.tagList.children(".k-chip").first());
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.LEFT
        });

        let tag = multiselect.currentTag();

        assert.equal(tag.index(), 0);
        assert.isOk(tag.hasClass("k-focus"));
    });

    it("MultiSelect focuses next tag if any is focused", function() {
        let multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["1", "2"]);
        multiselect.input.focus();

        multiselect.currentTag(multiselect.tagList.children(".k-chip").first());

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.RIGHT
        });

        let tag = multiselect.currentTag();

        assert.equal(tag.index(), 1);
        assert.isOk(tag.hasClass("k-focus"));
    });

    it("MultiSelect un-focuses last tag if RIGHT is pressed ", function() {
        let multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["1", "2"]);
        multiselect.input.focus();

        multiselect.currentTag(multiselect.tagList.children(".k-chip").last());

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.RIGHT
        });

        let tag = multiselect.currentTag();

        assert.equal(tag, null);
    });

    it("MultiSelect un-focuses tag on selection", function() {
        let multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.input.mousedown();

        multiselect.currentTag(multiselect.tagList.children(".k-chip").last());

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.ENTER
        });

        let tag = multiselect.currentTag();

        assert.equal(tag, null);
    });

    it("MultiSelect deletes focused tag", function() {
        let multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["1", "2"]);
        multiselect.input.focus();

        multiselect.currentTag(multiselect.tagList.children(".k-chip").last());

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DELETE
        });

        assert.equal(multiselect.currentTag(), null);
        assert.equal(multiselect.tagList.children(".k-chip").length, 1);
    });

    it("MultiSelect deletes focused tag when source is filtered", function() {
        let multiselect = new MultiSelect(select);

        multiselect.search("Option1");
        multiselect.ul.children(":first").click();

        multiselect.search("Option2");
        multiselect.ul.children(":first").click();

        multiselect.currentTag(multiselect.tagList.children(".k-chip").first());

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.DELETE
        });

        multiselect.open();

        assert.equal(multiselect.currentTag(), null);
        assert.equal(multiselect.tagList.children(".k-chip").length, 1);
        assert.equal(multiselect.tagList.children(".k-chip").eq(0).text().indexOf("Option2"), 0);
    });

    it("MultiSelect deletes last tag on BACKSPACE if input is empty", function() {
        let multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["0", "1"]);
        multiselect.input.focus();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.BACKSPACE
        });

        assert.equal(multiselect.currentTag(), null);
        assert.equal(multiselect.tagList.children(".k-chip").length, 1);
        assert.equal(multiselect.tagList.children(".k-chip").eq(0).find("span").html(), '<span class="k-chip-label">Option0</span>');
    });

    it("MultiSelect does not raise exception on DELETE", function() {
        let multiselect = new MultiSelect(select);
        multiselect.input.focus();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.BACKSPACE
        });

        assert.isOk(true);
    });

    it("MultiSelect focuses first tag on HOME", function() {
        let multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["0", "1"]);
        multiselect.input.focus();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.HOME
        });

        let tag = multiselect.currentTag();

        assert.equal(tag.index(), 0);
    });

    it("MultiSelect focuses last tag on END", function() {
        let multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["0", "1"]);
        multiselect.input.focus();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.END
        });

        let tag = multiselect.currentTag();

        assert.equal(tag.index(), 1);
    });

    it("MultiSelect closes popup when deletes tag", function() {
        let multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["0", "1"]);
        multiselect.input.click();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.BACKSPACE
        });

        assert.isOk(!multiselect.popup.visible());
    });

    it("MultiSelect highlights last item of the popup on END", function() {
        let multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["0", "1"]);
        multiselect.open();

        multiselect.input.focus().trigger({
            type: "keydown",
            keyCode: keys.END
        });

        let item = multiselect.current();

        assert.equal(item[0], multiselect.ul.children().last()[0]);
    });

    it("MultiSelect clears focused tag when navigate through the popup", function() {
        let multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["0", "1"]);
        multiselect.open();

        multiselect.currentTag(multiselect.tagList.children(".k-chip").first());
        multiselect.input.focus().trigger({
            type: "keydown",
            keyCode: keys.END
        });

        assert.equal(multiselect.currentTag(), null);
    });

    it("MultiSelect highlights first item of the popup on HOME", function() {
        let multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["0", "1"]);
        multiselect.open();

        multiselect.current(multiselect.ul.children().last());
        multiselect.input.focus().trigger({
            type: "keydown",
            keyCode: keys.HOME
        });

        let item = multiselect.current();

        assert.equal(item[0], multiselect.ul.children(":visible").first()[0]);
    });

    it("MultiSelect clears focused tag when navigate through the popup", function() {
        let multiselect = new MultiSelect(select);

        //opens popup and scrolls
        multiselect.value(["0", "1"]);
        multiselect.open();

        multiselect.currentTag(multiselect.tagList.children(".k-chip").first());
        multiselect.input.focus().trigger({
            type: "keydown",
            keyCode: keys.HOME
        });

        assert.equal(multiselect.currentTag(), null);
    });

    it("MultiSelect clears selection in selected items on ESC", function() {
        let multiselect = new MultiSelect(select, { value: "1" });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.HOME
        });
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.ESC
        });

        assert.equal(multiselect.currentTag(), null);
    });

    it("MultiSelect scrolls content down", function() {
        populateSelect(100);
        let multiselect = new MultiSelect(select, {
            animation: false
        });

        stub(multiselect.listView, {
            scrollWith: multiselect.listView.scrollWith
        });

        multiselect.open();
        multiselect.input.trigger({ type: "keydown", keyCode: keys.PAGEDOWN });

        assert.equal(multiselect.listView.calls("scrollWith"), 1);
        assert.equal(multiselect.listView.args("scrollWith")[0], multiselect.listView.screenHeight());
    });

    it("MultiSelect scrolls content up", function() {
        populateSelect(100);
        let multiselect = new MultiSelect(select, {
            animation: false
        });

        stub(multiselect.listView, {
            scrollWith: multiselect.listView.scrollWith
        });

        multiselect.open();
        multiselect.input.trigger({ type: "keydown", keyCode: keys.PAGEUP });

        assert.equal(multiselect.listView.calls("scrollWith"), 1);
        assert.equal(multiselect.listView.args("scrollWith")[0], -1 * multiselect.listView.screenHeight());
    });

    it("MultiSelect prevents default on PAGEDOWN", function() {
        populateSelect(100);
        let multiselect = new MultiSelect(select, {
            animation: false
        });

        multiselect.open();
        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.PAGEDOWN,
            preventDefault: function() {
                assert.isOk(true);
            }
        });
    });
});
