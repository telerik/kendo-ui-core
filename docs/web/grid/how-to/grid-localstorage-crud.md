---
title: CRUD operations with local storage as a database.
page_title: Grid CRUD operations with local storage as a database.
description: Grid example how to perform CRUD operations using the local storage as a database.
---

# CRUD operations with local storage as a database

The following runnable sample demonstrates how to perform CRUD operations with local storage data.

#### Example:

```html
<button onClick="reset()" class="k-button">Reset test data</button>
<div id="grid"></div>
<script>

function setTestData(){
    var testData = [
      {ID: 1, Value: "TEST1"},
      {ID: 2, Value: "TEST2"},
      {ID: 3, Value: "TEST3"}, 
      {ID: 4, Value: "TEST4"}, 
      {ID: 5, Value: "TEST5"}  
    ]; 
    localStorage["grid_data"] = JSON.stringify(testData); 
}

function reset(){
    setTestData();
    $("#grid").data("kendoGrid").dataSource.read();
}

$(document).ready(function () { 
  
    if(localStorage["grid_data"] == undefined){ 
        setTestData();
    }

    var dataSource = new kendo.data.DataSource({
        transport: {
          create: function(options){
            var localData = JSON.parse(localStorage["grid_data"]); 
            options.data.ID = localData[localData.length-1].ID + 1;
            localData.push(options.data);
            localStorage["grid_data"] = JSON.stringify(localData); 
            options.success(options.data);
          },
          read: function(options){ 
              var localData = JSON.parse(localStorage["grid_data"]); 
              options.success(localData);
          },
          update: function(options){
            var localData = JSON.parse(localStorage["grid_data"]); 
            
            for(var i=0; i<localData.length; i++){
              if(localData[i].ID == options.data.ID){
                localData[i].Value = options.data.Value;
              } 
            }
            localStorage["grid_data"] = JSON.stringify(localData); 
            options.success(options.data);
          },
          destroy: function(options){ 
            var localData = JSON.parse(localStorage["grid_data"]); 
            for(var i=0; i<localData.length; i++){
                if(localData[i].ID === options.data.ID){
                    localData.splice(i,1);
                    break;
                }
            } 
            localStorage["grid_data"] = JSON.stringify(localData); 
            options.success(localData);
          },
        },
        schema: {
          model: {
            id: "ID",
            fields: {
              ID: { type: "number", editable: false },
              Value: { type: "string" }
            }}
        },
        pageSize: 20
    });

    var grid = $("#grid").kendoGrid({
        dataSource: dataSource,
        pageable: true,
        height: 500,
        toolbar: ["create", "save", "cancel"],
        columns: [
          { field: "ID", width: "100px" }, 
          { field: "Value", width: "100px"},
          { command: "destroy" }
        ],
        editable: "incell",
    }).data("kendoGrid");
});
</script>
```
