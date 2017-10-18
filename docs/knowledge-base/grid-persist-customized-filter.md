---
title: Persist custom filter in Grid
description: Example on how to persist custom filter when restoring the Grid state 
type: how-to
page_title: Persist state for custom Grid filters | Kendo UI Grid
slug: grid-persist-customized-filter
tags: grid, filtering, persist, state, custom, filter, template, restore, session, localstorage
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with version 2017.3.913</td>
 </tr>
</table>

## Description

I have customized the Grid filters. However, when I save and restore the Grid state only inputs are shown instead of the custom filters.

## Solution

JSON.stringify() cannot serialize function references. Since generally stringification is used for the retrieved Grid state, all configuration fields, which represent function references, will be lost. As result the custom filters are not restored. 

The solution is to add the function references back to the deserialized configuration object before passing it to the [setOptions method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-setOptions).


```html
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