---
title: Make TileLayout Columns Responsive
description: "Learn How to Make TileLayout Columns Responsive"
type: how-to
page_title: How to Make TileLayout Columns Responsive - Kendo UI TileLayout for jQuery
slug: make-tilelayout-columns-responsive-tilelayout
tags: kendo, jquery, tilelayout, responsive, columns
ticketid: 1580279
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® TileLayout for jQuery</td>
		</tr>
	</tbody>
</table>


## Description

How can I Make the columns of the TileLayout widget responsive?

## Solution

You can use the [`setOptions()`] method of the TileLayout to update its [`columns`](/api/javascript/ui/tilelayout/configuration/columns) dynamically in the [`Window: resize event`](https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event)


```dojo

    <div id="tilelayout"></div>

    <!-- container templates -->
    <script id="barcelona" type="text/x-kendo-template">
            <img class="k-card-image" draggable="false" src="https://demos.telerik.com/kendo-ui/content/web/cards/barcelona.jpg")" />
    </script>
    <script id="sofia" type="text/x-kendo-template">
            <img class="k-card-image" draggable="false" src="https://demos.telerik.com/kendo-ui/content/web/cards/sofia.jpg")" />
    </script>
    <script id="rome" type="text/x-kendo-template">
            <img class="k-card-image" draggable="false" src="https://demos.telerik.com/kendo-ui/content/web/cards/rome.jpg")" />
    </script>
    <script id="sa" type="text/x-kendo-template">
            <img class="k-card-image" draggable="false" src="https://demos.telerik.com/kendo-ui/content/web/cards/south-africa.jpg")" />
    </script>
    <script id="sanfran" type="text/x-kendo-template">
            <img class="k-card-image" draggable="false" src="https://demos.telerik.com/kendo-ui/content/web/cards/sanfran.jpg")" />
    </script>
    <script id="seaview" type="text/x-kendo-template">
            <img class="k-card-image" draggable="false" src="https://demos.telerik.com/kendo-ui/content/web/cards/seaview-appartments.png")" />
    </script>

    <script>
      $("#tilelayout").kendoTileLayout({
        containers: [{
          colSpan: 1,
          rowSpan: 1,
          header: {
            text: "Barcelona"
          },
          bodyTemplate: kendo.template($("#barcelona").html())
        }, {
          colSpan: 1,
          rowSpan: 1,
          header: {
            text: "Sofia"
          },
          bodyTemplate: kendo.template($("#sofia").html())
        }, {
          colSpan: 1,
          rowSpan: 1,
          header: {
            text: "Rome"
          },
          bodyTemplate: kendo.template($("#rome").html())
        }, {
          colSpan: 1,
          rowSpan: 1,
          header: {
            text: "South Africa"
          },
          bodyTemplate: kendo.template($("#sa").html())
        }, {
          colSpan: 1,
          rowSpan: 1,
          header: {
            text: "San Francisco"
          },
          bodyTemplate: kendo.template($("#sanfran").html())
        }, {
          colSpan: 1,
          rowSpan: 1,
          header: {
            text: "Sea View Apartments"
          },
          bodyTemplate: kendo.template($("#seaview").html())
        }],
        columns: 2,
        columnsWidth: 385,
        rowsHeight: 385,
      });

      $(document).ready(function () {
        setTileLayoutColumnsCount();
      });

      $(window).on("resize", function () {
        setTileLayoutColumnsCount();
      });

      function setTileLayoutColumnsCount() {
        var tile = $("#tilelayout").data("kendoTileLayout");
        if ($(window).width() <= 716) {
          console.log(1)
          tile.setOptions({
            columns: 1
          });
        }
        else {
          console.log(2)
          tile.setOptions({
            columns: 2
          });
        }
      }
    </script>

    <style>
      .k-card-image {
        width: 385px;
        height: 290px;
      }
    </style>
```

## See Also

* [JavaScript API Reference of the TileLayout](/api/javascript/ui/tilelayout)
* [Documentation for the TileLayout](/controls/layout/tilelayout/overview)
* [TileLayout demos](https://demos.telerik.com/kendo-ui/tilelayout/index)
