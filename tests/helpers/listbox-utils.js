import '@progress/kendo-ui/src/kendo.listbox.js';

export function createListBoxFromHtml(html, options, container) {
    return $(html || "<select aria-label='listbox label' />").appendTo(container || Mocha.fixture[0]).kendoListBox(options).data("kendoListBox");
}

export function createListBoxFromOptions(widgetOptions, options) {
    let container = Mocha.fixture;

    options = options || {};

    if (options.rtl) {
        container = $("<select class='k-rtl' />").appendTo(container);
    }

    return createListBoxFromHtml("<select />", widgetOptions, container);
}

export function destroyListBox(widget) {
    if (widget && widget instanceof kendo.ui.ListBox) {
        widget.destroy();
        widget = null;
    }
}

export function createListBox(options, html) {
    let dataItems = [{
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

    let listbox = createListBoxFromHtml(html, $.extend({}, {
        dataSource: {
            data: dataItems
        },
        dataTextField: "text",
        selectable: "multiple"
    }, options || {}));

    return listbox;
}

export function createListBoxWithToolbar(options, html) {
    let listbox = createListBox($.extend({}, {
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

export function equalListItems(item1, item2) {
    assert.equal($(item1).data("uid"), $(item2).data("uid"));
}

export function equalListItemArrays(array1, array2) {
    assert.equal(array1.length, array2.length);

    for (let i = 0; i < array1.length; i++) {
        equalListItems(array1.eq(i), array2.eq(i));
    }
}

export function equalDataArrays(array1, array2) {
    assert.equal(array1.length, array2.length);

    for (let i = 0; i < array1.length; i++) {
        assert.deepEqual(array1[i], array2[i]);
    }
}

export function getDataItem(listbox, item) {
    return listbox.dataSource.getByUid(item.data("uid"));
}

function getToolElementClassName(command) {
    let clssClassNames = {
        "remove": "x",
        "moveUp": "caret-alt-up",
        "moveDown": "caret-alt-down",
        "transferTo": "caret-alt-right",
        "transferFrom": "caret-alt-left",
        "transferAllTo": "caret-double-alt-right",
        "transferAllFrom": "caret-double-alt-left"
    };

    return "k-svg-i-" + clssClassNames[command];
}

function clickButton(listbox, command, event) {
    listbox.toolbar.element
        .find("button.k-button>." + getToolElementClassName(command))
        .trigger(event || $.Event({ type: "click", preventDefault: $.noop }));
}

export function clickRemoveButton(listbox, event) {
    clickButton(listbox, "remove", event);
}

export function clickMoveDownButton(listbox, event) {
    clickButton(listbox, "moveDown", event);
}

export function clickMoveUpButton(listbox, event) {
    clickButton(listbox, "moveUp", event);
}

export function clickTransferToButton(listbox, event) {
    clickButton(listbox, "transferTo", event);
}

export function clickTransferFromButton(listbox, event) {
    clickButton(listbox, "transferFrom", event);
}

export function clickTransferAllToButton(listbox, event) {
    clickButton(listbox, "transferAllTo", event);
}

export function clickTransferAllFromButton(listbox, event) {
    clickButton(listbox, "transferAllFrom", event);
}

export function getToolElement(listbox, toolName) {
    return listbox.wrapper.find("[data-command='" + toolName + "']");
}