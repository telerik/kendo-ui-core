---
title: Use FontAwesome Icons in Kendo UI Grid
page_title:  Use FontAwesome Icons in Custom Command Buttons | Kendo UI Grid
description: "Learn how to use FontAwesome icons in the Kendo UI Grid widget."
slug: howto_use_fontawesomeiconsin_custom_command_buttons_grid
---

# Use FontAwesome Icons in Kendo UI Grid

The example below demonstrates how to use FontAwesome icons with the Kendo UI Grid's built-in buttons.

###### Example

```html
    <link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
    <script src="http://demos.kendoui.com/content/shared/js/people.js"></script>

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
            pageable: true,
            height: 430,
            columns: [
              { field: "FirstName", title: "First Name", width: "140px" },
              { field: "LastName", title: "Last Name", width: "140px" },
              { field: "Title" },
              { command: {
                text: " View Details",
                click: showDetails,
                className: "fa fa-map-marker"
              },
               title: " ",
               width: "140px"
              }],
              dataBound: function (e) {
                e.sender.tbody.find(".k-button.fa").each(function(idx, element){
                  $(element).removeClass("fa fa-map-marker").find("span").addClass("fa fa-map-marker");
                });
              }
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
        width: 20px;
        height: 20px;
      }

      .k-grid-pager .k-pager-numbers .k-current-page .k-pager-nav:after {
        margin-top: -1em;
      }

      .k-column-menu .k-i-arrow-e:before {
        content: "\f061";
      }
      .k-header-column-menu .k-i-arrowhead-s:before{
        content: "\f063";
      }

      .k-column-menu .k-filter:before {
        content: "\f0b0";
      }

      .k-column-menu .k-i-columns:before {
        content: "\f0db";
      }

      .k-column-menu .k-i-sort-asc:before {
        content: "\f0dd";
      }

      .k-column-menu .k-i-sort-desc:before {
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

Other articles on the Kendo UI Grid and how-to examples related to its layout:

* [Kendo UI Grid JavaScript API Reference](/api/javascript/ui/grid)
* [How to Adjust Row Height with Virtual Scrolling]({% slug howto_adjust_row_height_withvirtual_scrolling_grid %})
* [How to Apply Minimum Width during Column Resize]({% slug howto_apply_min_width_during_column_resize_grid %})
* [How to Change Group Header Position with Locked Columns]({% slug howto_change_group_header_position_wthlocked_columns_grid %})
* [How to Create and Use Auto Layout]({% slug howto_create_and_use_autolayout_grid %})
* [How to Disable Resizing for Specific Columns]({% slug howto_disable_column_resizing_grid %})
* [How to Hide the Vertical Scrollbar When Not Needed]({% slug howto_hide_vertical_scrollbar_grid %})
* [How to Resize Grid When Window Is Resized]({% slug howto_resize_whenthe_windowis_resized_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
