---
title: Create Fixed Headers on Scroll
page_title:  Create Fixed Headers on Scroll | Kendo UI Grid for jQuery
description: "An example on how to create fixed headers on scroll in the Kendo UI Grid widget for jQuery."
previous_url: /controls/data-management/grid/how-to/Layout/fixed-headers-grid
slug: howto_create_fixed_headers_grid
tags: grid, fixed, header, scrolling
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I create fixed headers on scroll in the Kendo UI Grid widget for jQuery?

## Solution

The following example demonstrates how to toggle a `fixed-header` class by using the window `scrollTop()`.

This approach helps you achieve the look and feel of window-level fixed headers. The `fixed-header` class from the example applies the following CSS rules.

```
    <style>
     .fixed-header {
        top:0;
        position:fixed;
        width:auto;
        z-index: 1;
      }
    </style>
```

To see the following demo in action, click **Open in Dojo**.

```dojo
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2017.1.118/styles/kendo.flat.min.css"/>
    <h1>&darr; SCROLL &darr;</h1>
    <div id="products"></div>

    <h1 class="scrollMore">&darr; SCROLL MORE &darr;</h1>
    <div id="employees"></div>

    <h1 class="up scrollMore">&uarr; UP &uarr;</h1>

    <script>
      function onDataBound() {
        var wrapper = this.wrapper,
            header = wrapper.find(".k-grid-header");

        function resizeFixed() {
          var paddingRight = parseInt(header.css("padding-right"));
          header.css("width", wrapper.width() - paddingRight);
        }

        function scrollFixed() {
          var offset = $(this).scrollTop(),
              tableOffsetTop = wrapper.offset().top,
              tableOffsetBottom = tableOffsetTop + wrapper.height() - header.height();
          if(offset < tableOffsetTop || offset > tableOffsetBottom) {
            header.removeClass("fixed-header");
          } else if(offset >= tableOffsetTop && offset <= tableOffsetBottom && !header.hasClass("fixed")) {
            header.addClass("fixed-header");
          }
        }

        resizeFixed();
        $(window).resize(resizeFixed);
        $(window).scroll(scrollFixed);
      }

      $(document).ready(function() {
        $("#products").kendoGrid({
          dataBound:onDataBound,
          dataSource: {
            data: products
          },
          columns: [
            "ProductName",
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px" },
            { field: "UnitsInStock", title: "Units In Stock", width: "130px" },
            { field: "Discontinued", width: "130px" }
          ]
        });

        $("#employees").kendoGrid({
          dataBound:onDataBound,
          dataSource: {
            type: "odata",
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
            }
          },
          columns: [{
            field: "ContactName",
            title: "Contact Name",
            width: 240
          }, {
            field: "ContactTitle",
            title: "Contact Title"
          }, {
            field: "CompanyName",
            title: "Company Name"
          }, {
            field: "Country",
            width: 150
          }]
        });

        $(".up").click(function() {
          $('html, body').animate({ scrollTop: 0 }, 2000);
        });
      });
    </script>
    <style>
      .fixed-header {
        top:0;
        position:fixed;
        width:auto;
        z-index: 1;
      }

      body{
        font:1em normal Arial,sans-serif;
        color:#34495E;
      }

      h1 {
        text-align:center;
        text-transform:uppercase;
        letter-spacing:-2px;
        font-size:2.5em;
        margin:20px 0;
      }

      .scrollMore {
        margin-top:600px;
      }

      .up {
        cursor:pointer;
      }
    </style>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
