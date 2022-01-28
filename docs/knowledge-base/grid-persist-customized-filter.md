---
title: Persist Custom Filters in Grid
description: An example on how to persist a custom filter when restoring the state of a Kendo UI Grid.
type: how-to
page_title: Persist the State of Custom Filters | Kendo UI Grid for jQuery
slug: grid-persist-customized-filter
tags: grid, filtering, persist, state, custom, filter, template, restore, session, localstorage
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with version 2017.3.913</td>
 </tr>
</table>

## Description

How can I persist the customized Grid filters when I save and restore the Grid state?

## Solution

The `JSON.stringify()` method is not able to serialize function references. As a result and because, generally, stringification is used for the retrieved Grid state, all configuration fields which represent function references are lost and the custom filters are not restored.

Add the function references back to the de-serialized configuration object before passing it to the [`setOptions`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/setoptions) method.

```dojo
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/people.js"></script>

<a href="#" class="k-button" id="save">Save State</a>
<a href="#" class="k-button" id="load">Load State</a>

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
        mode: "row",
    },
    pageable: true,
    columns: [
        {
        title: "Name",

        filterable: false,
        template: "#=FirstName# #=LastName#"
        },
        {
        field: "City",
        width: 250,
        filterable: {
            cell: {
            operator: "eq",
            showOperators: false,
            template: cityFilter
            }
        }
        },
        {
        field: "Title",
        width: 300,
        filterable: {
            cell: {
            operator: "eq",
            showOperators: false,
            template: titleFilter
            }
        }
        }
    ]
    });

    var grid = $("#grid").data("kendoGrid");

    $("#save").click(function (e) {
    e.preventDefault();
    localStorage["kendo-grid-options"] = kendo.stringify(grid.getOptions());
    });

    $("#load").click(function (e) {
    e.preventDefault();
    var options = localStorage["kendo-grid-options"];
    var optionsJSON = JSON.parse(options);
    optionsJSON.columns[1].filterable = {
            cell: {
            operator: "eq",
            showOperators: false,
            template: cityFilter
            }
        };

    optionsJSON.columns[2].filterable = {
            cell: {
            operator: "eq",
            showOperators: false,
            template: titleFilter
            }
        };

    if (optionsJSON) {
        grid.setOptions(optionsJSON);
    }
    });

});

function titleFilter(args) {
    args.element.kendoAutoComplete({
    dataSource: titles
    });
}

function cityFilter(args) {
    args.element.kendoDropDownList({
    dataSource: cities,
    optionLabel: "--Select Value--"
    });
}

</script>
```
