---
title: Select All Items From a Group in the MultiSelect by Clicking the Group
description: An example on how to programmatically select all items from a group the Kendo UI MultiSelect.
type: how-to
page_title: Select All Items From a Group | Kendo UI MultiSelect
slug: multiselect-select-all-items-from-group
tags: multiselect, select, all, items, group
res_type: kb
component: multi-select
---

## Environment
<table>
	<tr>
		<td>Product Version</td>
		<td>2018.2.516</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>MultiSelect for Progress® Kendo UI®</td>
	</tr>
</table>

## Description

How can I select all items from a group in the MultiSelect by clicking the group?

## Solution

Attach a click handler to the group element. Get all items from the cliked group and pass them to the `value` API method of the MultiSelect to select them.

```html
<select id="customers"></select>

<script>
    $(document).ready(function () {
        $("#customers").kendoMultiSelect({
            placeholder: "Select customers...",
            dataTextField: "ContactName",
            dataValueField: "CustomerID",
            height: 400,
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                },
                group: { field: "Country" }
            }
        });

        $(".k-list-scroller").delegate(".k-group", "click", function () {
            var ms = $("#customers").data("kendoMultiSelect");
            var data = ms.dataSource.data();
            var msValue = [];

            for (var i = 0; i < data.length; i++) {
                if (data[i].Country == this.textContent) {
                    msValue.push(data[i].CustomerID);
                }
            }

            ms.value(msValue);
        });
    });
</script>
```
