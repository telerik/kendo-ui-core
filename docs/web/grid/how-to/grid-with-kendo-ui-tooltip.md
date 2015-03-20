---
title: Show Kendo UI Tooltip for column records
page_title: Show Kendo UI Tooltip for column records
description: Show Kendo UI Tooltip for columns records
---

# Show Kendo UI Tooltip for columns records

The following runnable sample demonstrates how to show Kendo UI Tooltip for Kendo UI Grid columns.

#### Example:

```html
    <div id="grid"></div> 
    <style>
      #grid{
        width:300px;
      }
    </style>
    <script>
      var grid = null;

      $(document).ready(function () { 
        var dataSource = new kendo.data.DataSource({
          data: [
            {ID:1 ,Text: "Integer arcu odio, egestas nec pretium sit amet, aliquet vel nibh. Aliquam ac ante fringilla, consectetur erat at, dapibus est. Pellentesque facilisis iaculis neque, in auctor eros fringilla ut. Proin sit amet aliquet lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer porttitor vel neque ac dapibus. Nullam bibendum, velit quis tristique placerat, nibh ante vulputate sem, vel sodales tellus felis nec mi. In hac habitasse platea dictumst. Suspendisse in lacus nec ligula elementum interdum. Mauris at bibendum elit. Mauris dignissim, quam quis blandit rutrum, nunc nulla porttitor eros, eget volutpat magna nulla eu massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce consectetur blandit est ut commodo. Vestibulum vel tellus a purus accumsan venenatis."},
            {ID:2 ,Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "},
            {ID:3 ,Text: " Duis ut nulla eget lectus posuere tempor. "}
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

        grid = $("#grid").kendoGrid({ 
          dataSource: dataSource, 
          scrollable: true, 
          filterable: true, 
          toolbar: ["create"],
          columns: [
            { field: "ID", width: "50px" }, 
            { field: "Text", width: "200px", attributes: {
              style: 'white-space: nowrap '
            }  }], 
          editable: "incell"
        }).data("kendoGrid");  

        $("#grid").kendoTooltip({
          filter: "td:nth-child(2)", //this filter selects the second column's cells
          position: "right", 
          content: function(e){
            var dataItem = $("#grid").data("kendoGrid").dataItem(e.target.closest("tr"));
            var content = dataItem.Text;
            return content;
          }
        }).data("kendoTooltip");
      });
    </script>
```