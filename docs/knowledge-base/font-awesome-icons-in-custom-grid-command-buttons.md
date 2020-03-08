---
title: Use FontAwesome Icons in Kendo UI Grid
page_title:  FontAwesome Icons in Buttons | Kendo UI Grid for jQuery
description: "An example on how to use FontAwesome icons with the built-in buttons of the Kendo UI Grid widget for jQuery."
previous_url: /controls/data-management/grid/how-to/Layout/font-awesome-icons-in-custom-grid-command-buttons
slug: howto_use_fontawesomeiconsin_custom_command_buttons_grid
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

How can I use FontAwesome icons with the built-in buttons of the Kendo UI Grid widget for jQuery?

## Solution

The following example demonstrates how to use FontAwesome icons with the built-in buttons of the Kendo UI Grid for jQuery.

```dojo
    <link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/people.js"></script>

    <div id="example" class="k-content">
        <div id="grid"></div>
        <div id="details"></div>
    <script>
        var wnd,
            detailsTemplate;

        $(function () {
          var grid = $("#grid").kendoGrid({
            dataSource: {
              pageSize: 20,
              data: createRandomData(50)
            },
            sortable: true,
            columnMenu: true,
            filterable: true,
            pageable: true,
            height: 430,
            columns: [
              { field: "FirstName", title: "First Name", width: "140px" },
              { field: "LastName", title: "Last Name", width: "140px" },
              { field: "Title" },
              { command: {
                text: " View Details",
                click: showDetails,
                iconClass: "fa fa-map-marker"
              },
               title: " ",
               width: "140px"
              }]
          }).data("kendoGrid");

          wnd = $("#details")
          .kendoWindow({
            title: "Customer Details",
            modal: true,
            visible: false,
            resizable: false,
            width: 300
          }).data("kendoWindow");

          detailsTemplate = kendo.template($("#template").html());
        });

        function showDetails(e) {
          e.preventDefault();

          var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
          wnd.content(detailsTemplate(dataItem));
          wnd.center().open();
        }
      </script>
      <script type="text/x-kendo-template" id="template">
            <div id="details-container">
                <h2>#= FirstName # #= LastName #</h2>
                <em>#= Title #</em>
                <dl>
                    <dt>City: #= City #</dt>
                    <dt>Birth Date: #= kendo.toString(BirthDate, "MM/dd/yyyy") #</dt>
                </dl>
            </div>
      </script>
      <style>
      .k-header-column-menu .k-icon,
      .k-column-menu .k-icon,
      .k-column-menu .k-sprite,
      .k-grid-pager .k-icon,
      .k-grid .k-pager-numbers .k-current-page .k-pager-nav:after {
        background-image: none;
        font-size: 1em;
        font-family: FontAwesome;
      }

      .k-header-column-menu .k-icon:before,
      .k-header-column-menu .k-sprite:before,
      .k-column-menu .k-icon:before,
      .k-column-menu .k-sprite:before,
      .k-grid-pager .k-icon:before {
        display: inline-block;
        padding-top: 0.5em;
        color: #2e2e2e;
        width: 16px;
        height: 20px;
      }

      .k-column-menu .k-i-arrow-60-right:before {
        content: "\f061";
      }
       .k-header-column-menu .k-i-more-vertical:before{
        content: "\f063";
      }

      .k-column-menu .k-i-filter:before {
        content: "\f0b0";
      }

      .k-column-menu .k-i-arrow-60-down:before {
        content: "\f063";
      }  

      .k-column-menu .k-i-columns:before {
        content: "\f0db";
      }

      .k-column-menu .k-i-sort-asc-sm:before {
        content: "\f0dd";
      }

      .k-column-menu .k-i-sort-desc-sm:before {
        content: "\f0de";
      }

      .k-grid-pager .k-i-arrow-e:before {
        content: "\f061";
      }

      .k-grid-pager .k-i-seek-e:before {
        content: "\f0da";
      }

      .k-grid-pager .k-i-seek-w:before {
        content: "\f0d9";
      }

      .k-grid-pager .k-i-arrow-w:before {
        content: "\f060";
      }

      .k-grid-pager .k-pager-numbers .k-current-page .k-pager-nav:after {
        content: "\f047";
      }
    </style>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
