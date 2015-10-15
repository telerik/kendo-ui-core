---
title: Translate PivotConfigurator Field items
page_title: Translate PivotConfigurator Field items
description: Translate PivotConfigurator Field items
---

# Translate PivotConfigurator Field items

The example below demonstrates how to access PivotConfigurator TreeView widget and rename 'Measures' and 'KPIs' messages.

#### Example:

```html
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
                    read: "http://demos.telerik.com/olap/msmdpump.dll"
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
