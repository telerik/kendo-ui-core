---
title: Bold Matched Text in MultiSelect Items During Filtering
description: Learn how to bold the matching text in Kendo UI for jQuery MultiSelect items while the user filters the list.
type: how-to
page_title: Bold Matched Text in Filtered MultiSelect Items
slug: multiselect-bold-matched-text-filtering
tags: kendo, kendo-ui, jquery, multiselect, filter, filtering, itemtemplate, bold, highlight, matched, text
res_type: kb
components: ["multiselect"]
ticketid: 1050384
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Progress® Kendo UI® MultiSelect for jQuery</td>
</tr>
<tr>
<td>Version</td>
<td>2026.1.212</td>
</tr>
</tbody>
</table>

## Description

How can I bold the part of each Kendo UI MultiSelect item that matches the current filter text?

This knowledge base article also answers the following questions:

- How can I highlight the matching text in filtered MultiSelect items?
- How can I use the current filter value inside a MultiSelect [`itemTemplate`](/api/javascript/ui/multiselect/configuration/itemtemplate)?

## Solution

Use a custom formatting function and assign an [`itemTemplate`](/api/javascript/ui/multiselect/configuration/itemtemplate) after the MultiSelect is initialized. This approach lets the template use the current filter input value and wrap the matched text in a `<strong>` element.

```dojo
<div id="example" role="application">
    <div class="demo-section k-content">
        <h2>Invite Attendees</h2>
        <label for="required">Required</label>
        <select id="required" multiple="multiple" data-placeholder="Select attendees...">
            <option>Steven White</option>
            <option>Nancy King</option>
            <option>Nancy Davolio</option>
            <option>Robert Davolio</option>
            <option>Michael Leverling</option>
            <option>Andrew Callahan</option>
            <option>Michael Suyama</option>
            <option>Anne King</option>
            <option>Laura Peacock</option>
            <option>Robert Fuller</option>
            <option>Janet White</option>
            <option>Nancy Leverling</option>
            <option>Robert Buchanan</option>
            <option>Margaret Buchanan</option>
            <option>Andrew Fuller</option>
            <option>Anne Davolio</option>
            <option>Andrew Suyama</option>
            <option>Nige Buchanan</option>
            <option>Laura Fuller</option>
        </select>
    </div>

    <script>
        function formatValue(dataItem, filterText) {
            var itemText = typeof dataItem === "string" ? dataItem : (dataItem.text || dataItem.value || "");

            if (!filterText) {
                return itemText;
            }

            var escapedText = filterText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            var textMatcher = new RegExp(escapedText, "ig");

            return itemText.replace(textMatcher, function(match) {
                return "<strong>" + match + "</strong>";
            });
        }

        $(document).ready(function() {
            var multiSelect = $("#required").kendoMultiSelect({
                filter: "contains"
            }).data("kendoMultiSelect");

            multiSelect.setOptions({
                itemTemplate: $.proxy(
                    kendo.template("#= formatValue(data, this.input.val()) #"),
                    multiSelect
                )
            });
        });
    </script>
</div>
```

## See Also

- [Kendo UI MultiSelect Overview](/controls/multiselect/overview)
- [MultiSelect API Documentation](/api/javascript/ui/multiselect)
