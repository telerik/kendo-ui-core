---
title: Grid Fixed Headers on scroll
page_title:  Grid Fixed Headers Layout | Kendo UI Grid
description: "Learn how to create fixed headers in the Kendo UI Grid widget."
slug: howto_create_fixed_headers_grid
---

# Create Fixed Headers in the Kendo UI Grid widget

The example shows how to use the window `scrollTop()` to toggle a "fixed-header" class and achieve a window level fixed headers look and feel. The "fixed-header" class in the example has the following CSS rules:

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

###### Example

```html
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

Other articles on the Kendo UI Grid and how-to examples related to its layout:

* [Kendo UI Grid JavaScript API Reference](/api/javascript/ui/grid)
* [How to Adjust Row Height with Virtual Scrolling]({% slug howto_adjust_row_height_withvirtual_scrolling_grid %})
* [How to Apply Minimum Width during Column Resize]({% slug howto_apply_min_width_during_column_resize_grid %})
* [How to Change Group Header Position with Locked Columns]({% slug howto_change_group_header_position_wthlocked_columns_grid %})
* [How to Disable Resizing for Specific Columns]({% slug howto_disable_column_resizing_grid %})
* [How to Hide the Vertical Scrollbar When Not Needed]({% slug howto_hide_vertical_scrollbar_grid %})
* [How to Resize Grid When Window Is Resized]({% slug howto_resize_whenthe_windowis_resized_grid %})
* [How to Use FontAwesome Icons in Custom Command Buttons]({% slug howto_use_fontawesomeiconsin_custom_command_buttons_grid %})
* [How to Create and Use Auto Layout]({% slug howto_create_and_use_autolayout_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
