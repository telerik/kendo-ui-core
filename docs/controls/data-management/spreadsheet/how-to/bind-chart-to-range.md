---
title: Bind Charts to Sheet Data
page_title: Bind Charts to Sheet Data | Kendo UI Spreadsheet
description: "Learn how to bind a Kendo UI Chart to the data of a Kendo UI Spreadsheet widget."
slug: howto_bindcharttosheet_spreadsheet_widget
---

# Bind Charts to Sheet Data

The example below demonstrates how to extract spreadsheet data and populate a chart.

The chart will be updated on sheet [on change](/api/javascript/spreadsheet/sheet#events-change).

###### Example

```html
<style>
    #spreadsheet, #chart {
        height: 500px;
        float: left;
    }

    #spreadsheet {
        width: 350px;
    }

    #chart {
        width: 550px;
    }
</style>
<div id="spreadsheet"></div>
<div id="chart"></div>
<script>
    $("#spreadsheet").kendoSpreadsheet({
        toolbar: false,
        sheetsbar: false
    });

    $("#chart").kendoChart({
        dataSource: {
            // Produce series for each region
            group: {
                field: "Region",
                dir: "asc"
            }
        },
        series: [{
            // Notice the syntax for fields
            // that are not valid JS identifiers
            field: "['GDP Growth']",
            categoryField: "Year",
            type: "column"
        }],
        dataBound: function(e) {
            // Sort categories (years) as grouping
            var axis = e.sender.options.categoryAxis;
            if (axis.categories) {
                axis.categories.sort();
            }
        },
        valueAxis: {
            labels: {
                // Percents
                format: "P"
            }
        },
        legend: {
            position: "bottom"
        },
        transitions: false
    });

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var chart = $("#chart").data("kendoChart");
    var sheet = spreadsheet.sheetByIndex(0);
    var range = sheet.range("A1:C100");

    // Implementation below
    populateData(sheet);
    bindChart(chart, sheet, range);


    function bindChart(chart, sheet, range) {
        // Change will fire when the sheet data changes
        // http://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/sheet#events-change
        sheet.bind("change", function(e) {
            if (e.recalc) {
               update();
            }
        });

        // Populate chart immediately
        update();

        function update() {
            chart.dataSource.data(fetchData());
        }

        function fetchData() {
            var values = range.values();
            var headers = [];
            var data = [];

            // Iterate range rows and cells and extract data
            for (var row = 0; row < values.length; row++) {
                var dataItem = {};

                for(var cell = 0; cell < values[row].length; cell++) {
                    var value = values[row][cell];
                    if (!value) {
                        continue;
                    }

                    if (row > 0) {
                        // Data cell
                        dataItem[headers[cell]] = value;
                    } else {
                        // Header cell
                        headers.push(value);
                    }
                }

                // Make sure we have all required fields
                if (row > 0 && dataItem.Year && dataItem.Region) {
                    data.push(dataItem);
                }
            }

            return data;
        }
    }

    function populateData(sheet) {
        sheet.fromJSON({
          "rows": [
            {
              "index": 29,
              "height": 20.078125,
              "cells": [
                {
                  "value": 2009,
                  "index": 0
                },
                {
                  "value": "India",
                  "index": 1
                },
                {
                  "value": 0.08238,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 40,
              "height": 20.078125,
              "cells": [
                {
                  "value": 2011,
                  "index": 0
                },
                {
                  "value": "World",
                  "index": 1
                },
                {
                  "value": 0.02727,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 0,
              "cells": [
                {
                  "value": "Year",
                  "bold": true,
                  "textAlign": "center",
                  "index": 0
                },
                {
                  "value": "Region",
                  "bold": true,
                  "textAlign": "center",
                  "index": 1
                },
                {
                  "value": "GDP Growth",
                  "bold": true,
                  "textAlign": "center",
                  "index": 2
                }
              ]
            },
            {
              "index": 1,
              "cells": [
                {
                  "value": 2002,
                  "index": 0
                },
                {
                  "value": "India",
                  "index": 1
                },
                {
                  "value": 0.0391,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 2,
              "cells": [
                {
                  "value": 2002,
                  "index": 0
                },
                {
                  "value": "Russian Federation",
                  "index": 1
                },
                {
                  "value": 0.04743,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 3,
              "cells": [
                {
                  "value": 2002,
                  "index": 0
                },
                {
                  "value": "Germany",
                  "index": 1
                },
                {
                  "value": 0.0001,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 4,
              "cells": [
                {
                  "value": 2002,
                  "index": 0
                },
                {
                  "value": "World",
                  "index": 1
                },
                {
                  "value": 0.01988,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 5,
              "cells": [
                {
                  "value": 2003,
                  "index": 0
                },
                {
                  "value": "India",
                  "index": 1
                },
                {
                  "value": 0.0794,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 6,
              "cells": [
                {
                  "value": 2003,
                  "index": 0
                },
                {
                  "value": "Russian Federation",
                  "index": 1
                },
                {
                  "value": 0.07295,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 7,
              "cells": [
                {
                  "value": 2003,
                  "index": 0
                },
                {
                  "value": "Germany",
                  "index": 1
                },
                {
                  "value": -0.00375,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 8,
              "cells": [
                {
                  "value": 2003,
                  "index": 0
                },
                {
                  "value": "World",
                  "index": 1
                },
                {
                  "value": 0.02733,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 9,
              "cells": [
                {
                  "value": 2004,
                  "index": 0
                },
                {
                  "value": "India",
                  "index": 1
                },
                {
                  "value": 0.07848,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 10,
              "cells": [
                {
                  "value": 2004,
                  "index": 0
                },
                {
                  "value": "Russian Federation",
                  "index": 1
                },
                {
                  "value": 0.07175,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 11,
              "cells": [
                {
                  "value": 2004,
                  "index": 0
                },
                {
                  "value": "Germany",
                  "index": 1
                },
                {
                  "value": 0.01161,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 12,
              "cells": [
                {
                  "value": 2004,
                  "index": 0
                },
                {
                  "value": "World",
                  "index": 1
                },
                {
                  "value": 0.03994,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 13,
              "cells": [
                {
                  "value": 2005,
                  "index": 0
                },
                {
                  "value": "India",
                  "index": 1
                },
                {
                  "value": 0.09284,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 14,
              "cells": [
                {
                  "value": 2005,
                  "index": 0
                },
                {
                  "value": "Russian Federation",
                  "index": 1
                },
                {
                  "value": 0.06376,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 15,
              "cells": [
                {
                  "value": 2005,
                  "index": 0
                },
                {
                  "value": "Germany",
                  "index": 1
                },
                {
                  "value": 0.00684,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 16,
              "cells": [
                {
                  "value": 2005,
                  "index": 0
                },
                {
                  "value": "World",
                  "index": 1
                },
                {
                  "value": 0.03464,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 17,
              "cells": [
                {
                  "value": 2006,
                  "index": 0
                },
                {
                  "value": "India",
                  "index": 1
                },
                {
                  "value": 0.09263,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 18,
              "cells": [
                {
                  "value": 2006,
                  "index": 0
                },
                {
                  "value": "Russian Federation",
                  "index": 1
                },
                {
                  "value": 0.08153,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 19,
              "cells": [
                {
                  "value": 2006,
                  "index": 0
                },
                {
                  "value": "Germany",
                  "index": 1
                },
                {
                  "value": 0.037,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 20,
              "cells": [
                {
                  "value": 2006,
                  "index": 0
                },
                {
                  "value": "World",
                  "index": 1
                },
                {
                  "value": 0.04001,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 21,
              "cells": [
                {
                  "value": 2007,
                  "index": 0
                },
                {
                  "value": "India",
                  "index": 1
                },
                {
                  "value": 0.09801,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 22,
              "cells": [
                {
                  "value": 2007,
                  "index": 0
                },
                {
                  "value": "Russian Federation",
                  "index": 1
                },
                {
                  "value": 0.08535,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 23,
              "cells": [
                {
                  "value": 2007,
                  "index": 0
                },
                {
                  "value": "Germany",
                  "index": 1
                },
                {
                  "value": 0.03269,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 24,
              "cells": [
                {
                  "value": 2007,
                  "index": 0
                },
                {
                  "value": "World",
                  "index": 1
                },
                {
                  "value": 0.03939,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 25,
              "cells": [
                {
                  "value": 2008,
                  "index": 0
                },
                {
                  "value": "India",
                  "index": 1
                },
                {
                  "value": 0.0389,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 26,
              "cells": [
                {
                  "value": 2008,
                  "index": 0
                },
                {
                  "value": "Russian Federation",
                  "index": 1
                },
                {
                  "value": 0.05247,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 27,
              "cells": [
                {
                  "value": 2008,
                  "index": 0
                },
                {
                  "value": "Germany",
                  "index": 1
                },
                {
                  "value": 0.01083,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 28,
              "cells": [
                {
                  "value": 2008,
                  "wrap": true,
                  "index": 0
                },
                {
                  "value": "World",
                  "index": 1
                },
                {
                  "value": 0.01333,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 30,
              "cells": [
                {
                  "value": 2009,
                  "index": 0
                },
                {
                  "value": "Russian Federation",
                  "index": 1
                },
                {
                  "value": -0.07832,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 31,
              "cells": [
                {
                  "value": 2009,
                  "index": 0
                },
                {
                  "value": "Germany",
                  "index": 1
                },
                {
                  "value": -0.05127,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 32,
              "cells": [
                {
                  "value": 2009,
                  "index": 0
                },
                {
                  "value": "World",
                  "index": 1
                },
                {
                  "value": -0.02245,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 33,
              "cells": [
                {
                  "value": 2010,
                  "index": 0
                },
                {
                  "value": "India",
                  "index": 1
                },
                {
                  "value": 0.09552,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 34,
              "cells": [
                {
                  "value": 2010,
                  "index": 0
                },
                {
                  "value": "Russian Federation",
                  "index": 1
                },
                {
                  "value": 0.043,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 35,
              "cells": [
                {
                  "value": 2010,
                  "index": 0
                },
                {
                  "value": "Germany",
                  "index": 1
                },
                {
                  "value": 0.0369,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 36,
              "cells": [
                {
                  "value": 2010,
                  "index": 0
                },
                {
                  "value": "World",
                  "index": 1
                },
                {
                  "value": 0.04339,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 37,
              "cells": [
                {
                  "value": 2011,
                  "index": 0
                },
                {
                  "value": "India",
                  "index": 1
                },
                {
                  "value": 0.06855,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 38,
              "cells": [
                {
                  "value": 2011,
                  "index": 0
                },
                {
                  "value": "Russian Federation",
                  "index": 1
                },
                {
                  "value": 0.043,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            },
            {
              "index": 39,
              "cells": [
                {
                  "value": 2011,
                  "index": 0
                },
                {
                  "value": "Germany",
                  "index": 1
                },
                {
                  "value": 0.02995,
                  "format": "0.00%",
                  "index": 2
                }
              ]
            }
          ],
          "columns": [
            {
              "index": 1,
              "width": 122
            },
            {
              "index": 2,
              "width": 103
            }
          ]
        });
    }
</script>
```

## See Also

Other articles and how-to examples on Kendo UI Spreadsheet and Charts:

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Spreadsheet JavaScript API Reference](/api/javascript/ui/spreadsheet)
* [How to Get Flagged Cells Containing Invalid Values]({% slug howto_get_flagged_cells_containing_invalid_values_spreadsheet_widget %})
* [How to Set Validation Rules to Column Ranges]({% slug howto_validationtocolumn_spreadsheet_widget %})
