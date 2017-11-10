---
title: Generate DataSource model from the retrieved data
description: An example on how to generate the Model from the data returned by the server
type: how-to
page_title: Generate model dynamically | Kendo UI Grid
slug: grid-generate-model-from-data
tags: grid, data, model, dynamic, columns, generate
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>


## Description

I have dynamic data and would like to generate the DataSource Model based on that. It needs to include validation and use the correct data types. 

## Solution

To generate the model for DataSource you can iterate through the data and try parsing each field to determine what type it is. Based on that the respective model properties can be defined. If necessary validation properties can also be included. 

When the [columns setting](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-columns) in Grid is omitted a column will be generated for each field in the model.


````html
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

    //in the success handler of the ajax method call the function below with the received data:
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

