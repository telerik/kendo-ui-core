---
title: Select All MultiSelect Items by Clicking the Group
description: An example on how to programmatically select all items from a group in the Kendo UI MultiSelect.
type: how-to
page_title: Select All Items from a Group | Kendo UI MultiSelect
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

1. Attach a click handler to the group element.
1. Get all items from the clicked group and pass them to the `value` method to select them.

```dojo
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
