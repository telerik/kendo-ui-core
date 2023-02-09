---
title: Load Spreadsheet data based on conditional criteria
description: The selection of the DropDown loads new remote dataSource to the SpreadSheet
type: how-to
page_title: SpreadSheet dataSource loaded from Kendo UI DropDown
slug: spreadsheet-loading-data-in-sheet-conditionally
tags: spreadsheet
ticketid: 1428399
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2021.1.224</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® for jQuery</td>
	</tr>
</table>


## Description

How to populate Spreadsheet remote dataSource conditionally by dynamically changing the URL?

## Solution
1. Initialize the DropDown Widget
1. Set up the DropDown's `dataSource` to match the different remote dataSource options of the Spreadsheet 
1. Subscribe to the `select` event of the DropDown and set 'url' variable to be equal to the name of the selected `dataItem`, then pass it to the loadData() function
1. Initialize the Speadsheet 
1. Define the loadData() function and in it
    1. set the parameter to be equal to a local variable url  
	1. define a [new `kendo.data.DataSource`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#kendodatadatasource)
	1. get the `activeSheet`, then get its `_rows`.`_count` and `_columns`.`_count`
	1. use the `sheet.range(0,0,rowsCount,columnsCount).clear()` to clear any leftover data from the Spreadsheet
	1. pass the local url variable to the Speadsheet's [transport.read.url](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/transport.read#transportreadurl)
    1. finally in the loadData() use [setDataSource](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/sheet/methods/setdatasource) to set the dataSource of the [activeSheet](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet/methods/activesheet) to be  equal to the `kendo.data.DataSource`

```dojo
 <div id="dropdownlist" style="margin-bottom: 5px"></div>
    <div id="spreadsheet" style="width: 100%"></div>
    <script>
      
      $(document).ready(function(){
        $("#dropdownlist").kendoDropDownList({
          dataTextField: "name",
          dataValueField: "id",
          optionLabel: "Select dataSource...",
          dataSource:[
            { id: "1", name:"Products"},
            { id: "2", name:"Customers"}
          ],
          select:function(e){
            if(e.dataItem){
              var url = `/${e.dataItem.name}`;
              loadData(url);
            }
          }

        });
        $("#spreadsheet").kendoSpreadsheet({
          toolbar:false,
          columns:15,
          sheets: [{
            rows: [{
              height: 40,
              cells: [
                {
                  bold: "true",
                  background: "#9c27b0",
                  textAlign: "center",
                  color: "white"
                },{
                  bold: "true",
                  background: "#9c27b0",
                  textAlign: "center",
                  color: "white"
                },{
                  bold: "true",
                  background: "#9c27b0",
                  textAlign: "center",
                  color: "white"
                },{
                  bold: "true",
                  background: "#9c27b0",
                  textAlign: "center",
                  color: "white"
                },{
                  bold: "true",
                  background: "#9c27b0",
                  textAlign: "center",
                  color: "white"
                }]
            }],
            columns: [
              { width: 100 },
              { width: 415 },
              { width: 145 },
              { width: 145 },
              { width: 145 }
            ]
          }]
        });

        function loadData(path){
          var url = path;
          var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
          var sheet = spreadsheet.activeSheet();
          var rowsCount = sheet._rows._count;
          var columnsCount = sheet._columns._count;
          sheet.range(0,0,rowsCount,columnsCount).clear();

          var dataSource = new kendo.data.DataSource({
            transport: {
              read: function(options) {
				  
                $.ajax({
                  url: "https://demos.telerik.com/kendo-ui/service"+url,
                  dataType: "jsonp", 
                  success: function(result) {
                    options.success(result);
                  },
                  error: function(result) {
                    options.error(result);
                  }
                });
              }
            },
            batch: true
          });
          sheet.setDataSource(dataSource);
        }
      });

</script>
```


## See Also
* [JavaScript API Reference of the DropDown](/api/javascript/ui/dropdown)
* [JavaScript API Reference of the DataSource](/api/javascript/ui/datasource)
* [JavaScript API Reference of the Spreadsheet](/api/javascript/ui/spreadsheet)
* [JavaScript API Reference of the Spreadsheet's Sheet](/api/javascript/ui/spreadsheet/sheet)
* [jQuery API Reference of the AJAX method](https://api.jquery.com/jquery.ajax/)