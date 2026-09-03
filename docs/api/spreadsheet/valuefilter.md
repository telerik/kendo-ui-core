---
title: ValueFilter
page_title: Configuration, methods and events of Kendo UI Spreadsheet ValueFilter Instance object
res_type: api
---

# kendo.spreadsheet.ValueFilter

Represents a filter applied to a column of a given [range](/api/javascript/spreadsheet/range). Used to filter a column by a predefined set of values.

## Methods

### init

The constructor of the filter.


<div class="meta-api-description">
How do I set up value filtering in Kendo UI for jQuery? Initialize or construct a value-based filtering mechanism by configuring and setting up a filter instance ready to filter data or component content based on specific values, enabling value matching, criteria setup, default filtering options, internal state initialization, and preparation for use in custom filtering logic or extended filter features, ensuring the filter is activated and correctly configured for value comparisons and selective data display.
</div>

#### Parameters

##### options `Object`

An object which may contain the following keys:

* `values` - an *array* of the matching values that should be preserved.
* `blanks` - if set as *true*, empty cells will be shown, too.
* `dates` - an array which works like the `values` option, but performs partial matching for date values. It should contain objects with `year`, `month`, `day`, `hours`, `minutes`, and `seconds`. Each field is optional.


#### Example - filter a range by values


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
            [ 6, 3, 9 ]
        ];

        sheet.range("A1:C4").values(values);

        var filter = new kendo.spreadsheet.ValueFilter({ values: [ 7 ] });

        sheet.range("A1:C4").filter([ { column: 0, filter: filter } ]);
    </script>
```

#### Example - filter a range by values with blanks


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
            [ null, 8, 9 ],
            [ 6, 3, 9 ]
        ];

        var range = sheet.range("A1:C5");

        range.values(values);

        var filter = new kendo.spreadsheet.ValueFilter({ values: [ 7 ], blanks: true });

        range.filter([ { column: 0, filter: filter } ]);
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
            [ new Date(2000, 10, 10), 5, 6 ],
            [ new Date(2010, 10, 10), 8, 9 ],
            [ null,                   8, 9 ],
            [ new Date(2000, 1, 1),   3, 9 ]
        ];

        var range = sheet.range("A1:C5");

        range.values(values);

        var filter = new kendo.spreadsheet.ValueFilter({ dates: [ { year: 2000 } ], blanks: true });

        range.filter([ { column: 0, filter: filter } ]);
    </script>

```
