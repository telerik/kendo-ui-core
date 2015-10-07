---
title: Expand 'Include fields' treeview
page_title: Expand 'Include fields' treeview
description: Expand 'Include fields' treeview
---

# Expand 'Include fields' treeview

The example below demonstrates how to access the 'Include fields' TreeView widget and expand the root node on window open.

#### Example:

```html
<div id="example">
    <div id="configurator"></div>
    <div id="pivotgrid"></div>

    <script>
        $(document).ready(function () {
            var pivotgrid = $("#pivotgrid").kendoPivotGrid({
                filterable: true,
                sortable: true,
                columnWidth: 200,
                height: 580,
                dataSource: {
                    type: "xmla",
                    columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Product].[Category]" } ],
                    rows: [{ name: "[Geography].[City]" }],
                    measures: ["[Measures].[Reseller Freight Cost]"],
                    transport: {
                        connection: {
                            catalog: "Adventure Works DW 2008R2",
                            cube: "Adventure Works"
                        },
                        read: "//demos.telerik.com/olap/msmdpump.dll"
                    },
                    schema: {
                        type: "xmla"
                    },
                    error: function (e) {
                        alert("error: " + kendo.stringify(e.errors[0]));
                    }
                }
            }).data("kendoPivotGrid");

            $("#configurator").kendoPivotConfigurator({
                dataSource: pivotgrid.dataSource,
                filterable: true,
                sortable: true,
                height: 580
            });

            //wire 'Include fields' open
            $("[data-role=pivotsettingtarget]").each(function(_, setting) {
              var fieldMenu = $(setting).data("kendoPivotSettingTarget").fieldMenu; //get setting FieldMenu

              if (fieldMenu) {
                fieldMenu.includeWindow.bind("open", function() { //wire open event of the 'Include Fields' window
                  var treeView = fieldMenu.treeView;
                  if (treeView) {
                    treeView.one("dataBound", function() {
                      treeView.expand(".k-item:first"); //Expand the root node
                    });
                  }
                });
              }
            });
        });
    </script>
</div>
```
