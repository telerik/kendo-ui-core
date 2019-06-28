---
title: Hide Columns on Clicking the Headers and Restore Them on Clicking a Button
page_title: Hide Columns on Clicking Headers | AngularJS Kendo UI Grid
description: "An example on how to hide columns and show them back later when working in AngularJS applications with the Kendo UI Grid."
previous_url: /controls/data-management/grid/how-to/AngularJS/hide-columns-by-clicking-the-headers, /controls/data-management/grid/how-to/AngularJS/hide-columns-by-clicking-the-headers
slug: howto_hide_columns_and_subcolumns_grid
tags: grid, hide, columns, click, restore, headers, buttonclick, angularjs
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Preferred Framework</td>
  <td>AngularJS</td>
 </tr>
</table>

## Description

How can I hide columns and show them back later when working in AngularJS applications with the Kendo UI Grid?

## Solution

Your AngularJS project might require you to hide Grid columns and sub-columns by clicking the column headers and, then, restore the hidden columns by clicking a button.

The following example demonstrates how to achieve this behavior.

```dojo
<div id="example" ng-app="KendoDemos">
      <div ng-controller="MyCtrl">
        <div kendo-grid="grid" k-options="gridOptions"></div>
        <br />
        <button kendo-button k-click="showColumns">Show hidden columns</button>
      </div>
    </div>
    <script>
      function getColumnByTitle(columns, title){
        return columns.reduce(function(acc, curr) {          
          if (acc) {
            return acc;
          }

          if (curr.title === title) {
            return curr;
          }

          if (curr.columns && curr.columns.length) {
            return getColumnByTitle(curr.columns, title);
          }          

          return null;          
        }, null);      
      }

      function showHiddenColumns(columns, grid){
        columns.forEach(function(col){
          if(!col.columns){
            if(col.hidden){
              grid.showColumn(col);
            }
          } else {
            showHiddenColumns(col.columns, grid);
          }  
        });

      }

      angular.module("KendoDemos", [ "kendo.directives" ])
        .controller("MyCtrl", function($scope){
        $scope.showColumns = function(){
          var columns = $scope.grid.columns;
          showHiddenColumns(columns, $scope.grid);
        };

        $scope.gridOptions = {
          dataSource: {
            type: "odata",
            transport: {
              read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
            },
            pageSize: 20
          },
          height: 550,
          sortable: true,
          pageable: true,
          columns: [{
            field: "CompanyName",
            title: "Company Name",
            width: 420
          },
                    {
                      title: "Contact Info",
                      columns: [{
                        field: "ContactTitle",
                        title: "Contact Title",
                        width: 200
                      },{
                        field: "ContactName",
                        title: "Contact Name",
                        width: 200
                      },{
                        title: "Location",
                        columns: [ {
                          field: "Country",
                          width: 200
                        },{
                          field: "City",
                          width: 200
                        }]
                      },{
                        field: "Phone",
                        title: "Phone"
                      }]
                    }]
        };

        $scope.$on("kendoRendered", function(e) {
          $scope.grid.thead.on('click', 'th', function(ev){
            var columnOrFieldTitle = $(ev.target).closest('th').attr('data-field') || $(ev.target).closest('th').attr('data-title');

            if($(ev.target).closest('th').attr('data-field')){
              $scope.grid.hideColumn(columnOrFieldTitle);
            } else {
              var columnByColumnTitle = getColumnByTitle($scope.grid.columns, columnOrFieldTitle);
              $scope.grid.hideColumn(columnByColumnTitle);
            }
          });
        });
      });
    </script>
```
