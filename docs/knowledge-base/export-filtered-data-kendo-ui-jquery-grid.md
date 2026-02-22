---
title: Exporting Filtered Data Across All Pages in Kendo UI for jQuery Grid
description: Learn how to export filtered grid data, including all items across pages, in the Kendo UI for jQuery Grid.
type: how-to
page_title: How to Export Filtered Data Including All Pages in Kendo UI for jQuery Grid
slug: export-filtered-data-kendo-ui-jquery-grid
tags: kendo, ui, jquery, grid, export, excel, filter, all pages
res_type: kb
components: ["grid"]
ticketid: 1684843
---

## Description
When using the Kendo UI for jQuery Grid, you might encounter a scenario where you want to export data to an Excel file. This export should include all items in the data table, regardless of paging. Additionally, when filters are applied, you expect the exported data to mirror the filtered dataset accurately. This knowledge base article also answers the following questions:
- How can I export all data from the Kendo UI for jQuery Grid including filtered results?
- What is the method to export data across all pages in the Kendo UI for jQuery Grid when filters are applied?
- How do I ensure my Excel export from Kendo UI for jQuery Grid contains all records or only those filtered?

## Solution
To export the entire filtered dataset from the Kendo UI for jQuery Grid, including data across all pages, you need to implement a custom export functionality. This involves binding to the `excelExport` event and utilizing the dataSource filter method to assess if filters are applied. If filters are present, you will prevent the default export action and execute a custom logic to iterate over all pages and dynamically generate a workbook with the filtered data.

### Custom Export Functionality
Bind to the `excelExport` event to check for any applied filters:

```javascript
excelExport: function(e){  
    if(e.sender.dataSource.filter() !== undefined &&  e.sender.dataSource.filter() !== null ){
          e.preventDefault();
          exportFilteredData()
    }
},
```

### Page Iteration and Workbook Generation
Implement a function to traverse through pages and gather filtered data:

```javascript
function PageTraverser(dataSource, targetPage, totalPages, filters, completionFunction) {
            dataSource.query({
                page: targetPage,
                pageSize: 5,
                filter: filters,
              }).then(function () {
                var view = dataSource.view();
                var filteredRows = [];
                for (
                  var viewItemId = 0;
                  viewItemId < view.length;
                  viewItemId++
                ) {
                  var viewItem = view[viewItemId];
                  filteredRows.push(viewItem);
                }
                targetPage++;
                if (targetPage <= totalPages) {
                  PageTraverser(dataSource, targetPage, totalPages, filters, completionFunction);
                } else {
                  completionFunction(filteredRows);
                }
              });
          }
```

Generate a workbook with the gathered data:

```javascript
PageTraverser(dataSource, 1, totalPages, filters, function (filteredRows) {
              var rows = [];
              for (var i = 0; i < filteredRows.length; i++) {
                rows.push({
                  cells: [
                    { value: filteredRows[i].OrderID },
                    { value: filteredRows[i].Freight },
                    { value: filteredRows[i].OrderDate },
                    { value: filteredRows[i].ShipName },
                    { value: filteredRows[i].ShipCity },
                  ],
                });
              }
              var workbook = new kendo.ooxml.Workbook({
                sheets: [
                  {
                    columns: [
                      { autoWidth: true },
                      { autoWidth: true },
                      { autoWidth: true },
                      { autoWidth: true },
                      { autoWidth: true },
                    ],
                    title: "Orders",
                    rows: rows,
                  },
                ],
              });
              workbook.toDataURLAsync().then(function (dataURL) {
                kendo.saveAs({
                  dataURI: dataURL,
                  fileName: "FilteredDataExport.xlsx",
                });
              });
            });
```

This custom approach allows for the export of all grid data or only filtered results, across all pages, ensuring your Excel file contains exactly what you need. [Here you will find a runnable example showcasing the above](https://dojo.telerik.com/CQPQWKTE/18).
 

## See Also
- [Kendo UI for jQuery Grid Documentation](https://docs.telerik.com/kendo-ui/controls/grid/overview)
- [Kendo UI for jQuery Grid excelExport Event API](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/excelexport)
- [Kendo UI DataSource filter() Method API](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/filter)
