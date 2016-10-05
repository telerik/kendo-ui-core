---
title: DynamicFilter
page_title: Configuration, methods and events of Kendo UI Spreadsheet DynamicFilter Instance object
---

# kendo.spreadsheet.DynamicFilter

Represents a filter applied to a column of a given [range](/api/javascript/spreadsheet/range). It may be used to filter dates and numbers for relative values, like `belowAverage`, `yesterday`, etc.

## Methods

### init

The constructor of the filter.

#### Parameters

##### options `Object`

An object which should have a `type` field set to:

* `"belowAverage"`, `"aboveAverage"`, `"bottomPercent"`, or `"bottomNumber"` for numbers.
* `"tomorrow"`, `"today"`, `"yesterday"`, `"nextWeek"`, `"thisWeek"`, `"lastWeek"`, `"nextMonth"`, `"thisMonth"`, `"lastMonth"`, `"nextQuarter"`, `"thisQuarter"`,
`"lastQuarter"`, `"nextYear"`, `"thisYear"`, `"lastYear"`, `"yearToDate"` for date fields. `"quarter1"`, `"quarter2"`, `"quarter3"`, `"quarter4"` and month (en-US) names are also accepted.

#### Example - aboveAverage


```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        var values = [
            [ "C 1", "C 2", "C 3" ],
            [ 7, 5, 6 ],
            [ 7, 8, 9 ],
            [ 6, 3, 9 ],
            [ 1, 3, 9 ],
            [ 1, 3, 9 ]
        ];

        sheet.range("A1:C6").values(values);

        var filter = new kendo.spreadsheet.DynamicFilter({ type: "aboveAverage" });

        sheet.range("A1:C6").filter([ { column: 0, filter: filter } ]);
    </script>
```


#### Example - filter a range with dates

```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        var values = [
            [ "C 1", "C 2", "C 3" ],
            [ new Date(), 5, 6 ],
            [ new Date(2000, 10, 10), 8, 9 ],
        ];

        sheet.range("A1:C6").values(values);

        var filter = new kendo.spreadsheet.DynamicFilter({ type: "today" });

        sheet.range("A1:C6").filter([ { column: 0, filter: filter } ]);
    </script>
```
