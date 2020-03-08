---
title: Expand TreeView with Include Fields Items
page_title: Expand TreeView with Include Fields Items | Kendo UI PivotGrid
description: "Learn how to access the TreeView with the Include Fields items and expand the root node on opening the window in a Kendo UI PivotGrid widget."
previous_url: /controls/data-management/pivotgrid/how-to/expand-include-treeview
slug: howto_expand_include_fields_treeview_pivotgrid
---

# Expand TreeView with Include Fields Items

The following example demonstrates how to access the TreeView with the **Include Fields** items and expand the root node on opening the window in a Kendo UI PivotGrid widget.

```dojo
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

## See Also

* [PivotGrid JavaScript API Reference](/api/javascript/ui/pivotgrid)
* [How to Change Data Source Dynamically]({% slug howto_change_datasource_dynamically_pivotgrid %})
* [How to Drill Down Navigation Always Starting from Root Tuple]({% slug howto_drill_down_navigation_startingfrom_root_tuple_pivotgrid %})
* [How to Expand Multiple Column Dimensions]({% slug howto_expand_multiple_column_dimensions_pivotgrid %})
* [How to Filter by Using the include Operator]({% slug howto_use_include_operator_pivotgrid %})
