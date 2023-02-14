---
title: Translate the PivotConfigurator Messages
page_title: Translate PivotConfigurator Messages
description: "Learn how to access PivotConfigurator TreeView widget and rename the Measures and KPIs messages in a Kendo UI PivotGrid widget."
previous_url: /controls/data-management/pivotgrid/how-to/translate-configurator-items, /controls/data-management/pivotgrid/how-to/localization/translate-configurator-items
slug: howto_translate_pivotconfigurator_messages_pivotgrid
tags: kendoui, pivotgrid, translate, pivotconfigurator, messages
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
  <td>Browser</td>
  <td>Google Chrome</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>61.0.3163.100</td>
 </tr>
</table>


## Description

How can I access the PivotConfigurator and rename some of its messages?  

## Solution

The following example demonstrates how to access PivotConfigurator TreeView widget and rename the **Measures** and **KPIs** messages.

```dojo
<div id="example">
    <div id="configurator"></div>

    <script>
        $(document).ready(function () {
            var ds = new kendo.data.PivotDataSource({
                type: "xmla",
                columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Product].[Category]" } ],
                rows: [{ name: "[Geography].[City]" }],
                measures: ["[Measures].[Reseller Freight Cost]"],
                transport: {
                    connection: {
                        catalog: "Adventure Works DW 2008R2",
                        cube: "Adventure Works"
                    },
                    read: "https://demos.telerik.com/olap/msmdpump.dll"
                },
                schema: {
                    type: "xmla"
                },
                error: function (e) {
                    alert("error: " + kendo.stringify(e.errors[0]));
                }
            });

            var configurator = $("#configurator").kendoPivotConfigurator({
                dataSource: ds,
                filterable: true,
                sortable: true,
                height: 580
            }).getKendoPivotConfigurator();

            var source = configurator.treeView.dataSource;

            source.one("change", function() {
              source.get("[Measures]").set("caption", "Translaged Measures");
              source.get("[KPIs]").set("caption", "Translaged KPIs");
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
