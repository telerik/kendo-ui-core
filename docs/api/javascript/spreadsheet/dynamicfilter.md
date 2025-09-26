---
title: DynamicFilter
page_title: Configuration, methods and events of Kendo UI Spreadsheet DynamicFilter Instance object
res_type: api
---

# kendo.spreadsheet.DynamicFilter

Represents a filter applied to a column of a given [range](/api/javascript/spreadsheet/range). It may be used to filter dates and numbers for relative values, like `belowAverage`, `yesterday`, etc.

## Methods

### init

The constructor of the filter.


<div class="meta-api-description">
Initialize and create a dynamic filtering mechanism for spreadsheet data by configuring and setting up filter criteria, rules, or conditions dynamically within a spreadsheet environment; enable, instantiate, or set up the filter component to apply, evaluate, or modify data filtering based on custom options, parameters, or configurations that govern how dynamic filters respond to spreadsheet content changes or user interactions, effectively managing filter state, behavior, and criteria programmatically for advanced data querying and manipulation scenarios.
</div>

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
