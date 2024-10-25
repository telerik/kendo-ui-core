---
title: Integrate the PivotGrid with the Kendo UI Chart
page_title: Integrate the PivotGrid and Chart Components
description: "Learn how to integrate a Kendo UI PivotGrid component with a Kendo UI Chart component."
slug: howto_integratewith_kendoui_chart_pivotgrid
previous_url: /controls/charts/how-to/binding/bind-chart-to-pivotgrid-data, /controls/data-management/pivotgrid/how-to/chart-integration, /controls/charts/how-to/integration/pivotgrid-chart-integration
tags: kendoui, pivotgrid, integrate, with, kendo, chart
component: pivotgrid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® PivotGrid for jQuery</td>
  <td>Progress® Kendo UI® Chart for jQuery</td>
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

How can I integrate a Kendo UI PivotGrid with a Kendo UI Chart?  

## Solution

The following example demonstrates how to integrate a Kendo UI PivotGrid widget with a [Kendo UI Chart]({% slug overview_kendoui_charts_widget %}) widget.

> The example omits the totals from the PivotGrid, so that they are not shown in the data visualization of the Chart.

```dojo
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
                if(tuple.dataIndex !== undefined) {
                    result.push(tuple);
                }

                spliceIndex = 0;
                for (idx = 0, length = tuple.members.length; idx < length; idx++) {
                    member = tuple.members[idx];
                    children = member.children;
                    if (member.measure) {
                        [].splice.apply(tuples, [0, 0].concat(expandMeasures(children, tuple)));
                    } else {
                        [].splice.apply(tuples, [spliceIndex, 0].concat(children));
                    }
                    spliceIndex += children.length;
                }

                tuple = tuples.shift();
            }

            return result;
        }

        function clone(tuple, dataIndex) {
            var members = tuple.members.slice();

            return {
                dataIndex: dataIndex,
                members: $.map(members, function(m) {
                    return $.extend({}, m, { children: [] });
                })
            };
        }

        function replaceLastMember(tuple, member) {
            tuple.members[tuple.members.length - 1] = member;
            return tuple;
        };

        function expandMeasures(measures, tuple) {
            return $.map(measures, function(measure) {
                return replaceLastMember(clone(tuple, measure.dataIndex), measure);
            });
        }

        //Check whether the tuple has been collapsed
        function isCollapsed(tuple, collapsed) {
          var members = tuple.members;

          for (var idx = 0, length = collapsed.length; idx < length; idx++) {
            var collapsedPath = collapsed[idx];
            if (indexOfPath(fullPath(members, collapsedPath.length -1), [collapsedPath]) !== -1) {
              return true;
            }
          }

          return false;
        }

        //Work with tuple names/captions
        function indexOfPath(path, paths) {
            var path = path.join(",");

          for (var idx = 0; idx < paths.length; idx++) {
            if (paths[idx].join(",") === path) {
                return idx;
            }
          }

          return -1;
        }

        function fullPath(members, idx) {
            var path = [];
          var parentName = members[idx].parentName;

          idx -= 1;

          while (idx > -1) {
            path.push(members[idx].name);
            idx -= 1;
          }

          path.push(parentName);

          return path;
        }

        function memberCaption(member) { return member.caption };

        function extractCaption(members) {
            return $.map(members, memberCaption).join(" ");
        };

        function fullPathCaptionName(members, dLength, idx) {
            var result = extractCaption(members.slice(0, idx + 1));
            var measureName = extractCaption(members.slice(dLength, members.mLength));

            if (measureName) {
                result += " - " + measureName;
            }

            return result;
        }

        //the main function that convert PivotDataSource data into understandable for the Chart widget format
        function convertData(dataSource, collapsed) {
          var columnDimensionsLength = dataSource.columns().length;
          var rowDimensionsLength = dataSource.rows().length;

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
                    for (var ri = 0; ri < rowTuple.members.length; ri++) {
                      for (var ci = 0; ci < columnTuple.members.length; ci++) {
                        //do not add root tuple members, e.g. [CY 2005, All Employees]
                        //Add only children
                        if (!columnTuple.members[ci].parentName || !rowTuple.members[ri].parentName) {
                          continue;
                        }

                        result.push({
                          measure: Number(data[idx].value),
                          column: fullPathCaptionName(columnTuple.members, columnDimensionsLength, ci),
                          row: fullPathCaptionName(rowTuple.members, rowDimensionsLength, ri)
                        });
                      }
                    }
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
                  var path = e.path;

                  if (indexOfPath(path, axis) === -1) {
                     axis.push(path);
                  }
                },
                //gather the expanded members
                expandMember: function(e) {
                  var axis = collapsed[e.axis];
                  var index = indexOfPath(e.path, axis);

                  if (index !== -1) {
                    axis.splice(index, 1);
                  }
                },
                columnWidth: 100,
                height: 330,
                dataSource: {
                    type: "xmla",
                    columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Employee].[Gender]" }],
                  rows: [{ name: "[Product].[Category]", expand: true }],
                    measures: ["[Measures].[Reseller Freight Cost]", "[Measures].[Internet Order Quantity]"],
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
                  categoryAxis: {
                      labels: {
                          rotation: 310
                      }
                  },
                  valueAxis: {
                      labels: {
                          format: "${0}"
                      }
                  },
                  dataBound: function(e) {
                      var categoryAxis = e.sender.options.categoryAxis;

                      if (categoryAxis && categoryAxis.categories) {
                          categoryAxis.categories.sort();
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

* [PivotGrid JavaScript API Reference](/api/javascript/ui/pivotgrid)
* [Change Data Source Dynamically]({% slug howto_change_datasource_dynamically_pivotgrid %})
* [Drill Down Navigation Always Starting from Root Tuple]({% slug howto_drill_down_navigation_startingfrom_root_tuple_pivotgrid %})
* [Expand Multiple Column Dimensions]({% slug howto_expand_multiple_column_dimensions_pivotgrid %})
* [Filter by Using the include Operator]({% slug howto_use_include_operator_pivotgrid %})
* [Make the Include fields Window Modal]({% slug howto_make_include_fields_window_modal_pivotgrid %})
* [Modify Measure Tag Captions]({% slug howto_modify_measure_tag_captions_pivotgrid %})
* [Reload PivotGrid Configuration Options]({% slug howto_reload_configuration_options_pivotgrid %})
* [Reset Expand State]({% slug howto_reset_expand_state_pivotgrid %})
* [Show Tooltip with Data Cell Information]({% slug howto_show_tooltip_withdata_cellinformation_pivotgrid %})
* [Translate PivotConfigurator Field Items]({% slug howto_translate_pivotconfigurator_messages_pivotgrid %})

For more runnable examples on the Kendo UI PivotGrid, browse its [**How To** documentation folder]({% slug howto_change_pivotgrid_fields_names_pivotgrid %}).
