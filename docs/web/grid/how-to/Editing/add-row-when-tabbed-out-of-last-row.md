---
title: Add new row when tabbed out of the last row
page_title: Add new row when tabbed out of the last row
description: Add new row when tabbed out of the last row
---

# Add new row when tabbed out of the last row

The following runnable sample demonstrates how to add a new row when the user navigates out of the last row in the grid.

#### Example:

```html
    <div id="grid"></div>
    <script>
      var data = [
        { Id: 1, Name: "Decision 1", Position: 1 , ContractDate : new Date('1996/12/12')},
        { Id: 2, Name: "Decision 2", Position: 2 , ContractDate : new Date('2012/5/4')},
        { Id: 3, Name: "Decision 3", Position: 3 , ContractDate : new Date('1998/12/30')}
      ];

      var dataSource = new kendo.data.DataSource({
        //data: data,
        transport: {
          read: function(e) {                                
            e.success(data);
          },
          update: function(e) {                                
            e.success();
          }, 
          create: function(e) {
            var item = e.data;
            item.Id = data.length + 1;
            e.success(item);
          }
        },
        schema: {
          model: {
            id: "Id",
            fields: {
              Id: { type: "number" },
              Name: { type: "string" },
              Position: { type: "number" },
              ContractDate :{ type: "date"}
            }
          }
        }
      });

      var grid= $("#grid").kendoGrid({
        dataSource: dataSource,  
        scrollable: false,   
        navigatable: true,
        editable : {
          createAt : "bottom"
        },      
        navigatable: true,
        toolbar:  ["save","cancel", "create"],
        columns: ["Id", "Name", "Position", {field:"ContractDate",format:"{0:d}"}]            
      }).data("kendoGrid");     

      grid.tbody.on('keydown',function(e){
        if($(e.target).closest('td').is(':last-child') && $(e.target).closest('tr').is(':last-child')){
          grid.addRow();
        }
      })

    </script>
```