---
title: Integrate with Kendo UI Chart
page_title: Integrate with Kendo UI Chart | Kendo UI PivotGrid
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

//Check whether the tuple has been collapsed
function isCollapsed(tuple, collapsed) {
    var members = tuple.members;

    for (var idx = 0, length = collapsed.length; idx < length; idx++) {
        var collapsedPath = collapsed[idx];
        if (indexOfPath(fullPath(members, collapsedPath.length - 1), [collapsedPath]) !== -1) {
            return true;
        }
    }

    return false;
}

function indexOfPath(path, paths) {
    var path = path.join(",");

    for (var idx = 0; idx < paths.length; idx++) {
        if (paths[idx].join(",") === path) {
            return idx;
        }
    }

    return -1;
}

function fullPathCaptionName(members, idx) {
    var name = "'";
    var member;

    for (var i = 0; i <= idx; i++) {
        member = members[i];
        name += parseInt(member.levelNum) !== 0 ?
                    (member.parentName + " " + member.caption) :
                        (member.caption !== "All" ? member.caption : member.parentName);

        name += "' " + (idx > 0 ? "'" : "");
    }

    return name;
}

//the main function that convert PivotDataSource data into understandable for the Chart widget format
function convertData(dataSource, collapsed) {
    var columnTuples = flattenTree(dataSource.axes().columns.tuples || [], collapsed.columns);
    var rowTuples = flattenTree(dataSource.axes().rows.tuples || [], collapsed.rows);
    var data = dataSource.data();
    var rowTuple, columnTuple;
    dsrc = dataSource;
    clpsd = collapsed;
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
                                if (parseInt(columnTuple.members[ci].levelNum) == 0 || !rowTuple.members[ri].parentName) {
                                    continue;
                                }

                                var name = fullPathCaptionName(columnTuple.members, ci).trim();
                                var parentName = columnTuple.members[ci].parentName;
                                var rName=rowTuple.members[ri].caption;
                                    result.push({
                                        measure: Number(data[idx].value),
                                        column: name,
                                        row: rName,
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


            var jsondata = '{"ID":"112", "T":"5","Summary":[{"category":"Engineering","value":"17"},{"category":"Home","value":"6"},{"category":"Support","value":"6"}],"header":[{"name":"Team","grouped":"True"},{"name":"Interaction state","grouped":"True"},{"name":"Assigned to","grouped":"True"},{"name":"Interaction priority","grouped":"False"},{"name":"Interaction ID","grouped":"False"},{"name":"Created","grouped":"False"}],"data":[{"Team":"Engineering","Interactionstate":"Expired","Assignedto":"Ash1","Interactionpriority":"Normal","InteractionID":"511","Created":"06-03-2016 00:00:00"},{"Team":"Engineering","Interactionstate":"Expired","Assignedto":"Ash1","Interactionpriority":"Normal","InteractionID":"512","Created":"06-03-2016 00:00:00"},{"Team":"Engineering","Interactionstate":"Expired","Assignedto":"Ash1","Interactionpriority":"Normal","InteractionID":"513","Created":"06-03-2016 00:00:00"},{"Team":"Engineering","Interactionstate":"Expired","Assignedto":"Ash1","Interactionpriority":"Normal","InteractionID":"514","Created":"06-03-2016 00:00:00"},{"Team":"Engineering","Interactionstate":"Expired","Assignedto":"Ash1","Interactionpriority":"Normal","InteractionID":"515","Created":"06-03-2016 00:00:00"},{"Team":"Engineering","Interactionstate":"Expired","Assignedto":"Ash1","Interactionpriority":"Normal","InteractionID":"517","Created":"06-03-2016 00:00:00"},{"Team":"Engineering","Interactionstate":"Expired","Assignedto":"Jack","Interactionpriority":"Normal","InteractionID":"519","Created":"06-03-2016 00:00:00"},{"Team":"Engineering","Interactionstate":"Expired","Assignedto":"Jack","Interactionpriority":"Normal","InteractionID":"520","Created":"06-03-2016 00:00:00"},{"Team":"Engineering","Interactionstate":"Expired","Assignedto":"Jack","Interactionpriority":"Normal","InteractionID":"521","Created":"06-03-2016 00:00:00"},{"Team":"Engineering","Interactionstate":"Expired","Assignedto":"Jack","Interactionpriority":"Normal","InteractionID":"522","Created":"06-03-2016 00:00:00"},{"Team":"Engineering","Interactionstate":"Expired","Assignedto":"Jack","Interactionpriority":"Normal","InteractionID":"523","Created":"06-03-2016 00:00:00"},{"Team":"Engineering","Interactionstate":"Open","Assignedto":"Ash1","Interactionpriority":"Normal","InteractionID":"501","Created":"05-03-2016 00:00:00"},{"Team":"Engineering","Interactionstate":"Open","Assignedto":"Ash1","Interactionpriority":"Normal","InteractionID":"502","Created":"05-03-2016 00:00:00"},{"Team":"Engineering","Interactionstate":"Open","Assignedto":"Ash1","Interactionpriority":"Normal","InteractionID":"503","Created":"05-03-2016 00:00:00"},{"Team":"Engineering","Interactionstate":"Open","Assignedto":"deep","Interactionpriority":"Normal","InteractionID":"504","Created":"05-03-2016 00:00:00"},{"Team":"Engineering","Interactionstate":"Open","Assignedto":"deep","Interactionpriority":"Normal","InteractionID":"505","Created":"05-03-2016 00:00:00"},{"Team":"Engineering","Interactionstate":"Open","Assignedto":"deep","Interactionpriority":"Normal","InteractionID":"506","Created":"05-03-2016 00:00:00"},{"Team":"Home","Interactionstate":"Expired","Assignedto":"Ash2","Interactionpriority":"Normal","InteractionID":"525","Created":"06-03-2016 00:00:00"},{"Team":"Home","Interactionstate":"Expired","Assignedto":"crmtest","Interactionpriority":"Normal","InteractionID":"516","Created":"06-03-2016 00:00:00"},{"Team":"Home","Interactionstate":"Open","Assignedto":"deep","Interactionpriority":"Normal","InteractionID":"507","Created":"05-03-2016 00:00:00"},{"Team":"Home","Interactionstate":"Open","Assignedto":"deep","Interactionpriority":"Normal","InteractionID":"508","Created":"05-03-2016 00:00:00"},{"Team":"Home","Interactionstate":"Open","Assignedto":"deep","Interactionpriority":"Normal","InteractionID":"509","Created":"05-03-2016 00:00:00"},{"Team":"Home","Interactionstate":"Open","Assignedto":"deep","Interactionpriority":"Normal","InteractionID":"510","Created":"05-03-2016 00:00:00"},{"Team":"Support","Interactionstate":"Expired","Assignedto":"(None)","Interactionpriority":"Normal","InteractionID":"527","Created":"06-03-2016 00:00:00"},{"Team":"Support","Interactionstate":"Expired","Assignedto":"Ash2","Interactionpriority":"Normal","InteractionID":"526","Created":"06-03-2016 00:00:00"},{"Team":"Support","Interactionstate":"Expired","Assignedto":"Jack","Interactionpriority":"Normal","InteractionID":"518","Created":"06-03-2016 00:00:00"},{"Team":"Support","Interactionstate":"Open","Assignedto":"Ash1","Interactionpriority":"Normal","InteractionID":"524","Created":"06-03-2016 00:00:00"},{"Team":"Support","Interactionstate":"Open","Assignedto":"deep1","Interactionpriority":"Normal","InteractionID":"529","Created":"06-03-2016 00:00:00"},{"Team":"Support","Interactionstate":"Open","Assignedto":"Jack","Interactionpriority":"Normal","InteractionID":"528","Created":"06-03-2016 00:00:00"}]}';


            var data = JSON.parse(jsondata);

            var Dimentions = "";
            var pivotColumn = $('#pivotColumn');
            jsonColumns = [];
            $.each(data.header, function (i, row) {
                ele = {}
                var name = row.name.replace(/[_\s\.\%\-]/g, '');
                ele["name"] = name;
                if (i == 1)
                    ele["expand"] = true;
                else
                    ele["expand"] = false;
                ele["title"] = name;
                jsonColumns.push(ele);
                if (Dimentions == "")
                    Dimentions = '{"' + name + '": {"caption":"' + name + '"}';
                else
                    Dimentions = Dimentions + ',"' + name + '": {"caption":"' + name + '"}';
            });
            Dimentions = JSON.parse(Dimentions + '}');

            var pivotgrid = $("#pivotgrid").kendoPivotGrid({
                filterable: true,

                //gather the collapsed members
                collapseMember: function (e) {
                    var axis = collapsed[e.axis];
                    var path = e.path[0];

                    if (axis.indexOf(path) === -1) {
                        axis.push(path);
                    }
                },
                //gather the expanded members
                expandMember: function (e) {
                    var axis = collapsed[e.axis];
                    var index = axis.indexOf(e.path[0]);

                    if (index !== -1) {
                        axis.splice(index, 1);
                    }
                },
                columnWidth: 100,
                height: 230,
                 groupable: true,
                reorderable: true,
                resizable: true,
                columnMenu: true,
                dataSource: {
                    data: data.data,
                    schema: {
                        cube: {
                            dimensions: Dimentions,
                            measures: {
                                "Aggregate": { field: "InteractionID", aggregate: "count" }
                            }
                        }
                    },
                    columns: [{ name: "Team", expand: true }, { name: "Assignedto"}],
                    rows: [{ name: "Interactionstate", expand: true }, { name: "Created"}],
                    measures: ["Aggregate"],
                },
                dataBound: function () {
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
                        categoryAxis: {
                            labels: {
                                rotation: "auto"
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
* [How to Change Data Source Dynamically]({% slug howto_change_datasource_dynamically_pivotgrid %})
* [How to Drill Down Navigation Always Starting from Root Tuple]({% slug howto_drill_down_navigation_startingfrom_root_tuple_pivotgrid %})
* [How to Expand Multiple Column Dimensions]({% slug howto_expand_multiple_column_dimensions_pivotgrid %})
* [How to Filter by Using the "include" Operator]({% slug howto_use_include_operator_pivotgrid %})
* [How to Make the Include fields Window Modal]({% slug howto_make_include_fields_window_modal_pivotgrid %})
* [How to Modify Measure Tag Captions]({% slug howto_modify_measure_tag_captions_pivotgrid %})
* [How to Reload PivotGrid Configuration Options]({% slug howto_reload_configuration_options_pivotgrid %})
* [How to Reset Expand State]({% slug howto_reset_expand_state_pivotgrid %})
* [How to Show Tooltip with Data Cell Information]({% slug howto_show_tooltip_withdata_cellinformation_pivotgrid %})
* [How to Translate PivotConfigurator Field Items]({% slug howto_translate_pivotconfigurator_messages_pivotgrid %})

For more runnable examples on Kendo UI PivotGrid, browse the [how-to section of articles]({% slug howto_add_dimension_column_axis_pivotgrid %}).
