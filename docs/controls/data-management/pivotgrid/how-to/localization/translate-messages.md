---
title: Translate PivotGrid Messages
page_title: Translate PivotGrid Messages | Kendo UI PivotGrid
description: "Learn how to translate the messages of a Kendo UI PivotGrid widget."
previous_url: /controls/data-management/pivotgrid/how-to/translate-messages
slug: howto_translate_pivotgrid_messages_pivotgrid
---

# Translate PivotGrid Messages

The following example demonstrates how to translate the messages of a Kendo UI PivotGrid widget.

```dojo
<div id="example">
    <div id="pivotgrid"></div>
    <script>
      //messages
      kendo.ui.PivotSettingTarget.fn.options.messages = {
        empty: "Translated 'Drop fields here'"
      };

      kendo.ui.PivotFieldMenu.fn.options.messages = {
        info: "Translated 'info'",
        sortAscending: "Translated 'sortAsc'",
        sortDescending: "Translated 'sortDesc'",
        filterFields: "Translated 'filterFields'",
        filter: "Translated 'filter'",
        include: "Translated 'include'",
        title: "Translated 'title'",
        clear: "Translated 'clear'",
        ok: "Translated 'ok'",
        cancel: "Translated 'cancel'",
        operators: {
            contains: "Translated 'contains'",
            doesnotcontain: "Translated 'doesnotcontain'",
            startswith: "Translated 'startswith'",
            endswith: "Translated endswith'",
            eq: "Translated 'eq'",
            neq: "Translated 'neq'"
        }
      };

      kendo.ui.PivotConfigurator.fn.options.messages = {
        measures: "Translated 'measures'",
        columns: "Translated 'columns'",
        rows: "Translated 'rows'",
        measuresLabel: "Translated 'measuresLabel'",
        columnsLabel: "Translated 'columnsLabel'",
        rowsLabel: "Translated 'rowsLabel'",
        fieldsLabel: "Translated 'fieldsLabel'"
      };

      kendo.ui.PivotGrid.fn.options.messages = {
        measureFields: "Translated measure fields",
        columnFields: "Translated column fields",
        rowFields: "Translated row fields"
      };
    </script>

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
                        read: "https://demos.telerik.com/olap/msmdpump.dll"
                    },
                    schema: {
                        type: "xmla"
                    },
                    error: function (e) {
                        alert("error: " + kendo.stringify(e.errors[0]));
                    }
                }
            }).data("kendoPivotGrid");
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
