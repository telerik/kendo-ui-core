/* exported createListBoxFromHtml */
function createListBoxFromHtml(html, options, container) {
    return $(html || "<select />").appendTo(container || Mocha.fixture[0]).kendoListBox(options).data("kendoListBox");
}

/* exported createListBoxFromOptions */
function createListBoxFromOptions(widgetOptions, options) {
    var container = Mocha.fixture;

    options = options || {};

    if (options.rtl) {
        container = $("<select class='k-rtl' />").appendTo(container);
    }

    return createListBoxFromHtml("<select />", widgetOptions, container);
}

/* exported destroyListBox */
function destroyListBox(widget) {
    if (widget && widget instanceof kendo.ui.ListBox) {
        widget.destroy();
        widget = null;
    }
}

/* exported createListBox */
function createListBox(options, html) {
    var dataItems = [{
        id: 1,
        text: "item1"
    }, {
        id: 2,
        text: "item2"
    }, {
        id: 3,
        text: "item3"
    }, {
        id: 4,
        text: "item4"
    }];

    var listbox = createListBoxFromHtml(html, $.extend({}, {
        dataSource: {
            data: dataItems
        },
        dataTextField: "text",
        selectable: "multiple"
    }, options || {}));

    return listbox;
}

/* exported createListBoxWithToolbar */
function createListBoxWithToolbar(options, html) {
    var listbox = createListBox($.extend({}, {
        toolbar: {
            tools: [
                "remove",
                "transferTo",
                "transferFrom",
                "moveUp",
                "moveDown",
                "transferAllTo",
                "transferAllFrom"
            ]
        }
    }, options), html);

    return listbox;
}

/* exported equalListItems */
function equalListItems(item1, item2) {
    assert.equal($(item1).data("uid"), $(item2).data("uid"));
}

/* exported equalListItemArrays  */
function equalListItemArrays(array1, array2) {
    assert.equal(array1.length, array2.length);

    for (var i = 0; i < array1.length; i++) {
        equalListItems(array1.eq(i), array2.eq(i));
    }
}

/* exported equalDataArrays */
function equalDataArrays(array1, array2) {
    assert.equal(array1.length, array2.length);

    for (var i = 0; i < array1.length; i++) {
        assert.deepEqual(array1[i], array2[i]);
    }
}

/* exported getDataItem */
function getDataItem(listbox, item) {
    return listbox.dataSource.getByUid(item.data("uid"));
}

function getToolElementClassName(command) {
    var clssClassNames = {
        "remove": "k-i-x",
        "moveUp": "k-i-arrow-60-up",
        "moveDown": "k-i-arrow-60-down",
        "transferTo": "k-i-arrow-60-right",
        "transferFrom": "k-i-arrow-60-left",
        "transferAllTo": "k-i-arrow-double-60-right",
        "transferAllFrom": "k-i-arrow-double-60-left"
    };

    return clssClassNames[command];
}

function clickButton(listbox, command, event) {
    listbox.toolbar.element
        .find("a.k-button>." + getToolElementClassName(command))
        .trigger(event || $.Event({ type: "click", preventDefault: $.noop }));
}

/* exported clickRemoveButton */
function clickRemoveButton(listbox, event) {
    clickButton(listbox, "remove", event);
}

/* exported clickMoveDownButton */
function clickMoveDownButton(listbox, event) {
    clickButton(listbox, "moveDown", event);
}

/* exported clickMoveUpButton */
function clickMoveUpButton(listbox, event) {
    clickButton(listbox, "moveUp", event);
}

/* exported clickTransferToButton */
function clickTransferToButton(listbox, event) {
    clickButton(listbox, "transferTo", event);
}

/* exported clickTransferFromButton */
function clickTransferFromButton(listbox, event) {
    clickButton(listbox, "transferFrom", event);
}

/* exported clickTransferAllToButton */
function clickTransferAllToButton(listbox, event) {
    clickButton(listbox, "transferAllTo", event);
}

/* exported clickTransferAllFromButton */
function clickTransferAllFromButton(listbox, event) {
    clickButton(listbox, "transferAllFrom", event);
}

/* exported getToolElement */
function getToolElement(listbox, toolName) {
    return listbox.wrapper.find("[data-command='" + toolName + "']");
}