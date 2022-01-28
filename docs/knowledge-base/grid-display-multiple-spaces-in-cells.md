---
title: Show Multiple Spaces in Grid Cells
description: An example on how to have multiple spaces in the cells of the Kendo UI Grid.
type: how-to
page_title: Display Whitespaces in Cells | Kendo UI Grid for jQuery
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

When I enter a value with multiple spaces in the Grid, how can I display all spaces and avoid trimming the spaces down to a single space?  

## Solution

The skipping of all spaces but one is due to the default HTML behavior&mdash;in HTML, additional spaces are trimmed. To display the text as is, specify a [`template`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.template) for the Grid cell which will display the value in a [`pre`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre) element.

```dojo
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
