---
title: Paste Custom Values in the MultiSelect
description: Learn how to paste a delimited string into the Kendo UI for jQuery MultiSelect and select each value, including values that are not in the data source.
type: how-to
page_title: Paste Custom Values in the MultiSelect - Kendo UI for jQuery MultiSelect
slug: multiselect-paste-custom-values
tags: multiselect, paste, custom, values, clipboard, split, delimiter, add new items
res_type: kb
components: ["multiselect"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® MultiSelect for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with the {{ site.cdnVersion }} version</td>
 </tr>
</table>

## Description

How can I paste a delimited list of values into the Kendo UI for jQuery MultiSelect and select each value, including values that do not exist in the data source?

This KB also answers the following questions:

* How to handle the `paste` event in the MultiSelect.
* How to split pasted text by different delimiters.
* How to add new items to the data source if they do not exist.

## Solution

1. Handle the `paste` event of the visible MultiSelect input. Access the input through the [`input`](/api/ui/multiselect/fields/input) field.
1. Read the pasted text from the `clipboardData` of the original browser event and split it by commas, semicolons, or new lines.
1. If the text contains a single value, return without changes, so the MultiSelect filters as usual. Otherwise, call `preventDefault` to stop the text from appearing in the input.
1. Trim each value and skip the empty ones. If a value is not in the data source, [`add`](/api/data/datasource/methods/add) it to the [`dataSource`](/api/ui/multiselect/fields/datasource).
1. Merge the pasted values with the current selection without duplicates and pass the result to the [`value`](/api/ui/multiselect/methods/value) method.
1. The `value` method does not trigger the [`change`](/api/ui/multiselect/events/change) event. To notify the application, [trigger](/api/observable/methods/trigger) the event manually.

The following example demonstrates the full implementation of the suggested approach. Copy the `S, M; L, XL, XXL` text, focus the MultiSelect, and paste the text.

```dojo
<p>Text to paste: <code>S, M; L, XL, XXL</code></p>
<select id="sizes"></select>

<script>
    var multiselect = $("#sizes").kendoMultiSelect({
        placeholder: "Select or paste sizes...",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        dataSource: [
            { text: "XS", value: "XS" },
            { text: "S", value: "S" },
            { text: "M", value: "M" },
            { text: "L", value: "L" }
        ]
    }).data("kendoMultiSelect");

    multiselect.input.on("paste", function (e) {
        var clipboardData = e.originalEvent.clipboardData || window.clipboardData;
        var tokens = clipboardData ? clipboardData.getData("text").split(/[,;\r\n]+/) : [];
        var dataSource = multiselect.dataSource;
        var values = multiselect.value().slice();

        if (tokens.length < 2) {
            return;
        }

        e.preventDefault();

        tokens.forEach(function (token) {
            var text = token.trim();
            var dataItem;

            if (!text) {
                return;
            }

            dataItem = $.grep(dataSource.data(), function (item) {
                return item.text.toLowerCase() === text.toLowerCase();
            })[0];

            if (!dataItem) {
                dataItem = dataSource.add({ text: text, value: text });
            }

            if (values.indexOf(dataItem.value) === -1) {
                values.push(dataItem.value);
            }
        });

        multiselect.value(values);
        multiselect.trigger("change");
    });
</script>
```

The example uses local data. When the MultiSelect is bound to a remote service, `dataSource.add` adds the item only on the client. To persist the new items, sync the data source. For more information, refer to the article on [adding new items to the MultiSelect]({% slug newitems_multiselect %}).

If you set the [`maxSelectedItems`](/api/ui/multiselect/configuration/maxselecteditems) option, the `value` method ignores the values that exceed the limit.

## See Also

* [JavaScript API Reference of the MultiSelect](/api/ui/multiselect)
* [Overview of the MultiSelect]({% slug overview_kendoui_multiselect_widget %})
* [Adding New Items to the MultiSelect]({% slug newitems_multiselect %})
* [Clear the Filter in the MultiSelect When AutoClose Is False]({% slug multiselect-autoclose-clear-filter %})
