---
title: CustomFilter
page_title: Configuration, methods and events of Kendo UI Spreadsheet CustomFilter Instance object
---

# kendo.spreadsheet.CustomFilter

Represents a filter applied to a column of a given [range](/api/javascript/spreadsheet/range).  It may specify one or two criterion, comparison operator (equals, starts with, greater than etc.) and logical operator (and, or).

## Methods

### init

The constructor of the filter.

#### Parameters

##### options `Object`

An object which may contain the following keys:

* `logic` -  *string* - either `"and"` or `"or"`.
* `criteria` - an *array* of objects, containing `operator` (String) and `value` (String|Date|Number) fields.

The supported criteria operators are: `eq` (equal to), `neq` (not equal to), `lt` (less than), `lte` (less than or equal to), `gt` (greater than), `gte` (greater than or equal to).
In addition, `startswith`, `endswith`, `contains`, `doesnotstartwith` and `doesnotendwith` are supported for cells that contain strings.


#### Example - custom filter


```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        var values = [
            [ "C 1", "C 2", "C 3" ],
            [ "John", 5, 6 ],
            [ "Jane", 8, 9 ],
            [ "Burke", 3, 9 ]
        ];

        sheet.range("A1:C4").values(values);

        var filter = new kendo.spreadsheet.CustomFilter({
            operator: "or",
            criteria: [
                { operator: "starstwith", value: "Jo" },
                { operator: "starstwith", value: "Ja" }
            ]
        });

        sheet.range("A1:C4").filter([ { column: 0, filter: filter } ]);
    </script>
```

