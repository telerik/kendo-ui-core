---
title: Reset Expand State
page_title: Reset Expand State | Kendo UI PivotGrid
description: "Learn how to reset expand/collapse state and fetch the data again in a Kendo UI PivotGrid widget."
previous_url: /controls/data-management/pivotgrid/how-to/reset-expand-state
slug: howto_reset_expand_state_pivotgrid
---

# Reset Expand State

The following example demonstrates how to reset the expand/collapse state and fetch the data again in a Kendo UI PivotGrid widget.

```dojo
<div id="example">
    <ol>
        <li>Expand "CY 2005" member</li>
        <li>Click "reset" button</li>
    <ol>
    <br />
    <button id="reset">Reset</button>
    <br />
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

            $("#reset").click(function() {
                pivotgrid.dataSource.trigger("stateReset");
                pivotgrid.dataSource.read();
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
