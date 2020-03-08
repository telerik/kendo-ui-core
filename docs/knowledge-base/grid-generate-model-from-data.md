---
title: Generate DataSource Model from Retrieved Data
description: An example on how to generate the Model from the data that is returned by the server in a Kendo UI Grid.
type: how-to
page_title: Generate Model Dynamically | Kendo UI Grid for jQuery
slug: grid-generate-model-from-data
tags: grid, data, model, dynamic, columns, generate
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>


## Description

How can I generate the DataSource Model based on the dynamic data I have in the Grid so that it includes validation and uses the correct data types?

## Solution

1. Iterate through the data and try to parse each field to determine what type it is.
1. Based on that, define the respective model properties.
1. If necessary, you can also include validation properties.

If you omit the [`columns`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns) setting of the Grid, a column is generated for each field in the model.


````dojo
<div id="grid"></div>

<script>
    //example data received from remote source via jQuery ajax merthod
    var data = [{
        "Name": "John",
        "Role": "Developer",
        "Dept": "Dev",
        "Date": "\/Date(836438400000)\/",
        "Balance": 23
    }, {
        "Name": "Jane",
        "Role": "Developer",
        "Dept": "Dev",
        "Date": "\/Date(836438400000)\/",
        "Balance": 23
    }, {
        "Name": "James",
        "Role": "QA",
        "Dept": "Dev",
        "Date": "\/Date(836438400000)\/",
        "Balance": 23
    }, {
        "Name": "Jimmy",
        "Role": "Designer",
        "Dept": "Dev",
        "Date": "\/Date(836438400000)\/",
        "Balance": 23
    }];

    //in the success handler of the AJAX method call the function below with the received data:
    var dateFields = [];
    generateGrid(data);

    function generateGrid(gridData) {

        var model = generateModel(gridData[0]);

        var parseFunction;

        if (dateFields.length > 0) {
            parseFunction = function (response) {
                for (var i = 0; i < response.length; i++) {
                    for (var fieldIndex = 0; fieldIndex < dateFields.length; fieldIndex++) {
                        var record = response[i];
                        record[dateFields[fieldIndex]] = kendo.parseDate(record[dateFields[fieldIndex]]);
                    }
                }
                return response;
            };
        }

        var grid = $("#grid").kendoGrid({
            dataSource: {
                data: gridData,
                schema: {
                    model: model,
                    parse: parseFunction
                }
            },
            editable: true,
            sortable: true
        });
    }

    function generateModel(gridData) {
        var model = {};
        model.id = "ID";
        var fields = {};
        for (var property in gridData) {
            var propType = typeof gridData[property];

            if (propType == "number") {
                fields[property] = {
                    type: "number",
                    validation: {
                        required: true
                    }
                };
            } else if (propType == "boolean") {
                fields[property] = {
                    type: "boolean",
                    validation: {
                        required: true
                    }
                };
            } else if (propType == "string") {
                var parsedDate = kendo.parseDate(gridData[property]);
                if (parsedDate) {
                    fields[property] = {
                        type: "date",
                        validation: {
                            required: true
                        }
                    };
                    dateFields.push(property);
                } else {
                    fields[property] = {
                        validation: {
                            required: true
                        }
                    };
                }
            } else {
                fields[property] = {
                    validation: {
                        required: true
                    }
                };
            }

        }
        model.fields = fields;

        return model;
    }
</script>
````
