import { $ } from "../../core/services/kendo-jquery.service.js";
import { utilsService } from "../../core/services/utils.service.js";
export function inferSelect(select, fields) {
    const selectElement = $(select)[0];
    const options = selectElement.options;
    const firstField = fields[0];
    const secondField = fields[1];
    const data = [];
    let idx;
    let length;
    let optgroup;
    let option;
    let record;
    let value;
    for (idx = 0, length = options.length; idx < length; idx++) {
        record = {};
        option = options[idx];
        optgroup = option.parentNode instanceof HTMLOptGroupElement ? option.parentNode : null;
        if (option.disabled || optgroup?.disabled) {
            continue;
        }
        if (optgroup) {
            record.optgroup = optgroup.label;
        }
        record[firstField.field] = option.text;
        value = option.hasAttribute("value");
        if (value) {
            value = option.value;
        }
        else {
            value = option.text;
        }
        record[secondField.field] = value;
        data.push(record);
    }
    return data;
}
export function inferTable(table, fields) {
    const tableElement = $(table)[0];
    const tbody = tableElement.tBodies[0];
    const rows = tbody ? tbody.rows : [];
    let idx;
    let length;
    let fieldIndex;
    const fieldCount = fields.length;
    const data = [];
    let cells;
    let record;
    let cell;
    let empty;
    for (idx = 0, length = rows.length; idx < length; idx++) {
        record = {};
        empty = true;
        cells = rows[idx].cells;
        for (fieldIndex = 0; fieldIndex < fieldCount; fieldIndex++) {
            cell = cells[fieldIndex];
            if (cell.nodeName.toLowerCase() !== "th") {
                empty = false;
                record[fields[fieldIndex].field] = cell.innerHTML;
            }
        }
        if (!empty) {
            data.push(record);
        }
    }
    return data;
}
export function inferList(list, fields) {
    const items = $(list).children();
    let idx;
    let length;
    const data = [];
    let record;
    const textField = fields[0].field;
    const urlField = fields[1] && fields[1].field;
    const spriteCssClassField = fields[2] && fields[2].field;
    const imageUrlField = fields[3] && fields[3].field;
    let item;
    let id;
    let textChild;
    let className;
    let children;
    function elements(collection, tagName) {
        return collection.filter(tagName).add(collection.find(tagName));
    }
    for (idx = 0, length = items.length; idx < length; idx++) {
        record = {
            _loaded: true
        };
        item = items.eq(idx);
        textChild = item[0]?.firstChild ?? null;
        children = item.children();
        const childLists = children.filter("ul");
        children = children.filter(":not(ul)");
        id = item.attr("data-id");
        if (id) {
            record.id = id;
        }
        if (textChild) {
            record[textField] = textChild.nodeType == 3 ? textChild.nodeValue ?? "" : children.text();
        }
        if (urlField) {
            record[urlField] = elements(children, "a").attr("href");
        }
        if (imageUrlField) {
            record[imageUrlField] = elements(children, "img").attr("src");
        }
        if (spriteCssClassField) {
            className = elements(children, ".k-sprite").prop("className");
            record[spriteCssClassField] = className && utilsService.trim(className.replace("k-sprite", ""));
        }
        if (childLists.length) {
            record.items = inferList(childLists.eq(0), fields);
        }
        if (item.attr("data-hasChildren") == "true") {
            record.hasChildren = true;
        }
        data.push(record);
    }
    return data;
}
