---
title: Make the Include Fields Window of the PivotGrid Modal
page_title: Make the Include Fields Window of the PivotGrid Modal
description: "Learn how to make the Include fields filter window modal in a Kendo UI PivotGrid widget."
previous_url: /controls/data-management/pivotgrid/how-to/modal-include-fields, /controls/data-management/pivotgrid/how-to/appearance/modal-include-fields
slug: howto_make_include_fields_window_modal_pivotgrid
tags: pivotgrid, make, include, fields, window, modal
component: pivotgrid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® PivotGrid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I render the **Fields to include** filter window of the PivotGrid as a modal dialog?

## Solution

The following example demonstrates how to access the **Fields to include** filter window and render it as a modal dialog in a PivotGrid widget.

```dojo
<div id="example">
    <div id="pivotgrid"></div>

    <script>
        $(document).ready(function () {
            var pivotgrid = $("#pivotgrid").kendoPivotGrid({
                filterable: true,
                columnWidth: 200,
                height: 580,
                dataSource: {
                    type: "xmla",
                    columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Product].[Category]" } ],
                    rows: [{ name: "[Geography].[City]" }],
                    measures: ["[Measures].[Internet Sales Amount]"],
                    transport: {
                        connection: {
                            catalog: "Adventure Works DW 2008R2",
                            cube: "Adventure Works"
                        },
                        read: "https://demos.telerik.com/olap/msmdpump.dll",
                      parameterMap: function(options, type) {
                        var query = kendo.data.transports.xmla.fn.options.parameterMap(options, type);

                        //modify the query here if needed

                        return query;
                      }
                    },
                    schema: {
                        type: "xmla"
                    },
                    error: function (e) {
                        alert("error: " + kendo.stringify(e.errors[0]));
                    }
                }
            }).data("kendoPivotGrid");

            //wire 'Include fields' open
            $("[data-role=pivotsettingtarget]").each(function(_, setting) {
              var fieldMenu = $(setting).data("kendoPivotSettingTarget").fieldMenu;
                            if (fieldMenu) {
                fieldMenu.includeWindow.bind("open", function(e) {
                    e.sender.setOptions({ modal: true }); //set modality to `true`
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
