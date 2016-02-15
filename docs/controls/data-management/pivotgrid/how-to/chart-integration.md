---
title: Integrate with Kendo UI Chart
page_title: Integrate with Kendo UI Chart | Kendo UI PivotGrid Widget
description: "Learn how to integrate a Kendo UI PivotGrid widget with a Kendo UI Chart widget."
slug: howto_integratewith_kendoui_chart_pivotgrid
---

# Integrate with Kendo UI Chart

The example below demonstrates how to integrate a Kendo UI PivotGrid widget with a Kendo UI Chart widget.

> **Important**  
> The example omits the totals from the PivotGrid, so they are not shown in the Chart data visualization.

###### Example

```html
<div id="example">
    <div id="pivotgrid"></div>
    <div id="chart"></div>
    <script>
        //function flatten the tree of tuples that datasource returns
        function flattenTree(tuples) {
            tuples = tuples.slice();
            var result = [];
            var tuple = tuples.shift();
            var idx, length, spliceIndex, children, member;

            while (tuple) {
                //required for multiple measures
                if (tuple.dataIndex !== undefined) {
                    result.push(tuple);
                }

                spliceIndex = 0;
                for (idx = 0, length = tuple.members.length; idx < length; idx++) {
                    member = tuple.members[idx];
                    children = member.children;
                    if (member.measure) {
                        [].splice.apply(tuples, [0, 0].concat(children));
                    } else {
                        [].splice.apply(tuples, [spliceIndex, 0].concat(children));
                    }
                    spliceIndex += children.length;
                }

                tuple = tuples.shift();
            }

            return result;
        }

        //Check whether the tuple has been collapsed
        function isCollapsed(tuple, collapsed) {
          var name = tuple.members[0].parentName;

          for (var idx = 0, length = collapsed.length; idx < length; idx++) {
            if (collapsed[idx] === name) {
              console.log(name);
              return true;
            }
          }

          return false;
        }

        //the main function that convert PivotDataSource data into understandable for the Chart widget format
        function convertData(dataSource, collapsed) {
          var columnTuples = flattenTree(dataSource.axes().columns.tuples || [], collapsed.columns);
          var rowTuples = flattenTree(dataSource.axes().rows.tuples || [], collapsed.rows);
          var data = dataSource.data();
          var rowTuple, columnTuple;

          var idx = 0;
          var result = [];
          var columnsLength = columnTuples.length;

          for (var i = 0; i < rowTuples.length; i++) {
            rowTuple = rowTuples[i];

            if (!isCollapsed(rowTuple, collapsed.rows)) {
              for (var j = 0; j < columnsLength; j++) {
                columnTuple = columnTuples[j];

                if (!isCollapsed(columnTuple, collapsed.columns)) {
                  if (idx > columnsLength && idx % columnsLength !== 0) {
                    result.push({
                      measure: Number(data[idx].value),
                      column: columnTuple.members[0].caption,
                      row: rowTuple.members[0].caption
                    });
                  }
                }
                idx += 1;
              }
            }
          }

          return result;
        }
    </script>
    <script>
        $(document).ready(function () {
            var collapsed = {
              columns: [],
              rows: []
            };

            var pivotgrid = $("#pivotgrid").kendoPivotGrid({
                filterable: true,
                //gather the collapsed members
                collapseMember: function(e) {
                  var axis = collapsed[e.axis];
                  var path = e.path[0];

                  if (axis.indexOf(path) === -1) {
                     axis.push(path);
                  }
                },
                //gather the expanded members
                expandMember: function(e) {
                  var axis = collapsed[e.axis];
                  var index = axis.indexOf(e.path[0]);

                  if (index !== -1) {
                    axis.splice(index, 1);
                  }
                },
                columnWidth: 100,
                height: 230,
                dataSource: {
                    type: "xmla",
                    columns: [{ name: "[Date].[Calendar]", expand: true }],
                  rows: [{ name: "[Product].[Category]", expand: true }],
                    measures: ["[Measures].[Internet Sales Amount]"],
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
                },
                dataBound: function() {
                  //create/bind the chart widget
                  initChart(convertData(this.dataSource, collapsed));
                }
            }).data("kendoPivotGrid");

            function initChart(data) {
              var chart = $("#chart").data("kendoChart");

              if (!chart) {
                $("#chart").kendoChart({
                  dataSource: {
                    data: data,
                    group: "row"
                  },
                  series: [{
                      type: "column",
                      field: "measure",
                      name: "#= group.value # (category)",
                      categoryField: "column"
                  }],
                  legend: {
                      position: "bottom"
                  },
                  valueAxis: {
                      labels: {
                          format: "${0}"
                      }
                  },
                  dataBound: function(e) {
                    if (e.sender.options.categoryAxis) {
                        e.sender.options.categoryAxis.categories.sort()
                    }
                  }
                });
              } else {
                chart.dataSource.data(data);
              }
            }
        });
    </script>
</div>
```

## See Also

Other articles on Kendo UI PivotGrid and how-to examples:

* [PivotGrid JavaScript API Reference](/api/javascript/ui/pivotgrid)
* [How to Access MDX Query]({% slug howto_access_mdx_query_pivotgrid %})
* [How to Add Dimension to Column Axis]({% slug howto_add_dimension_column_axis_pivotgrid %})
* [How to Change Data Source Dynamically]({% slug howto_change_datasource_dynamically_pivotgrid %})
* [How to Drill Down Navigation Always Starting from Root Tuple]({% slug howto_drill_down_navigation_startingfrom_root_tuple_pivotgrid %})
* [How to Expand the Include fields TreeView]({% slug howto_expand_include_fields_treeview_pivotgrid %})
* [How to Expand Multiple Column Dimensions]({% slug howto_expand_multiple_column_dimensions_pivotgrid %})
* [How to Filter by Using the include Operator]({% slug howto_use_include_operator_pivotgrid %})
* [How to Filter Dimensions]({% slug howto_filter_dimensions_pivotgrid %})
* [How to Format Dates in Dimension Labels]({% slug howto_format_date_query_pivotgrid %})
* [How to Make the Include fields Window Modal]({% slug howto_make_include_fields_window_modal_pivotgrid %})
* [How to Modify Exported Excel Files]({% slug howto_modify_exported_excel_files_pivotgrid %})
* [How to Modify Measure Tag Captions]({% slug howto_modify_measure_tag_captions_pivotgrid %})
* [How to Reload PivotGrid Configuration Options]({% slug howto_reload_configuration_options_pivotgrid %})
* [How to Render Row Header Caption As Anchor]({% slug howto_render_rowheader_captionas_anchor_pivotgrid %})
* [How to Reset Expand State]({% slug howto_reset_expand_state_pivotgrid %})
* [How to Right-Align Text]({% slug howto_right_align_text_pivotgrid %})
* [How to Show Tooltip with Data Cell Information]({% slug howto_show_tooltip_withdata_cellinformation_pivotgrid %})
* [How to Sort Dimensions]({% slug howto_sort_dimensions_pivotgrid %})
* [How to Translate PivotConfigurator Field Items]({% slug howto_translate_pivotconfigurator_messages_pivotgrid %})
* [How to Translate PivotGrid Messages]({% slug howto_translate_pivotgrid_messages_pivotgrid %})
