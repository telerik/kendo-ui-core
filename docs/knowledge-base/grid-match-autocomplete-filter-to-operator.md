---
title: Match AutoComplete Filter to Selected Operator in Grid
description: An example on how to change the filter in the AutoComplete to match the selected operator in a Kendo UI Grid.
type: how-to
page_title: Match AutoComplete Filter to Selected Operator in Grid | Kendo UI Grid for jQuery
slug: grid-match-autocomplete-filter-to-operator
tags: grid, filter, autocomplete, dynamic, change, option, operator
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
</table>

## Description

How can I match the filter in the AutoComplete with the selected option in the Grid column?

## Solution

1. Handle the `click` event for the **Filter** button and get a reference to the AutoComplete widget which is used as a filter.
1. Based on the `clicked` option in the filter menu, change the [`filter`](https://docs.telerik.com/kendo-ui/api/javascript/ui/autocomplete/configuration/filter) setting of the AutoComplete.

```dojo
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/people.js"></script>

<div id="grid"></div>

<script>
$(document).ready(function() {
    $("#grid").kendoGrid({
    dataSource: {
        data: createRandomData(50),
        schema: {
        model: {
            fields: {
            City: { type: "string" },
            Title: { type: "string" },
            BirthDate: { type: "date" }
            }
        }
        },
        pageSize: 15
    },
    height: 550,
    scrollable: true,
    filterable: {
        extra: false,
        mode: "row",
        operators: {
        string: {
            contains: "Contains",
            startswith: "Starts with",
            eq: "Is equal to",
            neq: "Is not equal to"
        }
        }
    },
    pageable: true,
    columns: [
        {
        title: "Name",
        width: 160,
        filterable: false,
        template: "#=FirstName# #=LastName#"
        },
        {
        field: "City",
        width: 130,
        },
        {
        field: "Title",
        filterable: {
            cell : {
            template: titleFilter
            }
        }
        },
        {
        field: "BirthDate",
        title: "Birth Date",
        format: "{0:MM/dd/yyyy HH:mm tt}",
        }
    ]
    });


    $(".k-filter-row .k-dropdown-operator").on("click", function(e) {

    var autoComplete = $(this).closest("th").find("[data-role='autocomplete']").getKendoAutoComplete();

    $(".k-list").on("click", function(e) {

        switch(e.target.textContent.toLowerCase()) {
        case "contains":
            autoComplete.options.filter = "contains";
            break;
        case "starts with":
            autoComplete.options.filter = "startswith";
            break;
        case "is equal to":
            autoComplete.options.filter = "eq";
            break;
        case "is not equal to":
            autoComplete.options.filter = "neq";
            break;
        default:
            autoComplete.options.filter = "contains";
            break;
        }
    });
    });
});

function titleFilter(args) {
    args.element.kendoAutoComplete({
    dataSource: titles,
    filter: "contains"
    });
}


</script>
```
