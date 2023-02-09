---
title: Show Tooltip for Header Titles
page_title: Show Tooltip for Header Titles - Kendo UI Grid for jQuery
description: "An example demonstrating how to show a Kendo UI Tooltip for the Kendo UI Grid headers."
slug: grid-show-full-header-title-on-hover
tags: grid, show, display, tooltip, header, title, field
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2021.2.616</td>
 </tr>
</table>

## Description

The titles of some of my Grid headers are very long. How can I display a tooltip that contains all of the text when I hover over the headers?

## Solution

The following example demonstrates how to show a Kendo UI Tooltip for the Kendo UI Grid headers.

```dojo
    <div id="grid"></div>
    <script>
      $(document).ready(function () {
        var dataSource = new kendo.data.DataSource({
          data: [
            {ID:1 ,Text: "Text 1"},
            {ID:2 ,Text: "Text 2"},
            {ID:3 ,Text: "Text 3"}
          ],
          schema: {
            model: {
              fields: {
                ID: { type: "number" },
                Text: { type: "string" }
              }}
          },
          pageSize: 20
        });

        $("#grid").kendoGrid({
          dataSource: dataSource,
          scrollable: true,
          filterable: true,
          width: 300,
          toolbar: ["create"],
          columns: [
            { field: "ID", width: "50px" },
            { field: "Text", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", width: "200px", attributes: {
              style: 'white-space: nowrap '
            }  }],
          editable: "incell"
        });

        $("#grid").kendoTooltip({
          filter: "th", // Select the th elements of the Grid.
          position: "right",
          width: 250,
          content: function(e){
            // Return the text content of the hovered header.
            return e.target.text();
          }
        }).data("kendoTooltip");
      });
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
