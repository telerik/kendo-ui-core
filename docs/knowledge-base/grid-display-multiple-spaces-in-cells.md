---
title: Show multiple spaces in Grid cells
description: An example on how to have multiple spaces in the cells of Kendo UI Grid.
type: how-to
page_title: Display whitespaces in grid cells | Kendo UI Grid
slug: grid-display-multiple-spaces-in-cells
tags: grid, spaces, multiple, display, show, keep, whitespaces, intervals
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
  <td>Created with version 2017.3.1026</td>
 </tr>
</table>

## Description

When I enter a value with multiple spaces in the Grid they are trimmed to a single space. I would like all spaces displayed.

## Solution

This is due to the default HTML behavior. By default additional spaces will be trimmed in HTML. In order to display the text as-is you can specify [template](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.template) for the Grid cell that will display the value in a [pre element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre).

```html
<div id="grid"></div>

<script>
    $(document).ready(function () {
        var dataSource = new kendo.data.DataSource({
            data: [
                { "TextField": "Text     with     multiple    spaces" }
            ]
        });

        $("#grid").kendoGrid({
            dataSource: dataSource,
            height: 550,
            columns: [
                { field: "TextField", template: "<pre>#=TextField#</pre>" }
            ],
            editable: true
        });
    });

</script>
```
