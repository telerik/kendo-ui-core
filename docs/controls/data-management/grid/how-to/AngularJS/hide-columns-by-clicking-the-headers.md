---
title: Hide Columns on Clicking the Headers and Restore Them on Clicking a Button
page_title: Hide Columns on Clicking the Headers and Restore Them on Clicking a Button | Kendo UI Grid
description: "Learn how to hide columns and sub-columns in a Kendo UI Grid when working in AngularJS applications by clicking the column headers. Show them back later when you click on a button."
slug: howto_hide_columns_and_subcolumns_grid
---

# Hide Columns on Clicking the Headers and Restore Them on Clicking a Button

The following example demonstrates how to hide columns and sub-columns in a Kendo UI Grid when working in AngularJS applications by clicking the column headers and restore the hidden columns later by clicking a button.

###### Example

```html
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

## See Also

Other articles on the Kendo UI Grid and how-to examples related to AngularJS:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Bind to Telerik Backend Services]({% slug howto_bindto_telerik_backend_services_grid %})
* [How to Change Languages Dynamically]({% slug howto_dynamic_language_change %})
* [How to Create Custom ToolBar Templates]({% slug howto_create_custom_toolbar_templates_grid %})
* [How to Create Custom Editors]({% slug howto_create_custom_editors_grid %})
* [How to Create Custom Edit Buttons]({% slug howto_create_custom_edit_buttons_grid %})
* [How to Use AngularJS in Popup Editor Templates]({% slug howto_use_angularin_popup_editor_templates_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
