---
title: Use FontAwesome Icons in Custom Command Buttons
page_title:  Use FontAwesome Icons in Custom Command Buttons | Kendo UI Grid Widget
description: "Learn how to use FontAwesome icons in custom command buttons while working with the Kendo UI Grid widget."
slug: howto_use_fontawesomeiconsin_custom_command_buttons_grid
---

# Use FontAwesome Icons in Custom Command Buttons

The example below demonstrates how to use FontAwesome icons inside a Kendo UI Grid custom command button.

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

        $(document).ready(function () {
          var grid = $("#grid").kendoGrid({
            dataSource: {
              pageSize: 20,
              data: createRandomData(50)
            },
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
```

## See Also

Other articles on Kendo UI Grid:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Adjust Row Height with Virtual Scrolling]({% slug howto_adjust_row_height_withvirtual_scrolling_grid %})
* [How to Apply Minimum Width during Column Resize]({% slug howto_apply_min_width_during_column_resize_grid %})
* [How to Change Group Header Position with Locked Columns]({% slug howto_change_group_header_position_wthlocked_columns_grid %})
* [How to Create and Use Auto Layout]({% slug howto_create_and_use_autolayout_grid %})
* [How to Hide the Vertical Scrollbar When Not Needed]({% slug howto_hide_vertical_scrollbar_grid %})
* [How to Resize Grid When Window Is Resized]({% slug howto_resize_whenthe_windowis_resized_grid %})