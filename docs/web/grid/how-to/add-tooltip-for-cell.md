---
title: Add tooltip for grid cell
page_title: Add tooltip for grid cell
description: Add tooltip for grid cell
---

# Add tooltip for grid cell

The example below demonstrates how to add a Kendo UI tooltip for grid cell record.

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
            {ID:1 ,Text: "Integer arcu odio, egestas nec pretium sit amet, aliquet vel nibh."},
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
          filter: "td:nth-child(2)", //this filter selects the first column cells
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
