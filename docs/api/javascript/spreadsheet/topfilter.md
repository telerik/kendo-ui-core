---
title: TopFilter
page_title: Configuration, methods and events of Kendo UI Spreadsheet TopFilter Instance object
res_type: api
---

# kendo.spreadsheet.TopFilter

Represents a filter applied to a column of a given [range](/api/javascript/spreadsheet/range). It may be used to filter the top X items (top X percent, bottom X percent, top X number, bottom X number)

## Methods

### init

The constructor of the filter.


<div class="meta-api-description">
How do I initialize a Kendo UI top filter instance programmatically? Instantiate, initialize, set up, or create a filter instance programmatically for a spreadsheet or data grid by configuring its initial state, preparing internal settings, enabling filter functionality, and constructing the filter object to manage or apply top-level filtering operations, including initializing all necessary parameters to control filtering behavior before using its methods or APIs.
</div>

#### Parameters

##### options `Object`

An object which may contain the following keys:

* `type` -  *String* - can be `"topPercent"`, `"topNumber"`, `"bottomPercent"`, or `"bottomNumber"`.

* `value` - *Number*, the count | percentage of items to display.


#### Example - top 2 numbers


```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        var values = [
            [ "C 1", "C 2", "C 3" ],
            [1, 2, 3 ],
            [2, 3, 4 ],
            [3, 4, 5 ],
        ];

        sheet.range("A1:C4").values(values);

        var filter = new kendo.spreadsheet.TopFilter({ type: "topNumber", value: 2 });

        sheet.range("A1:C4").filter([ { column: 0, filter: filter } ]);
    </script>
```

#### Example - filter the top 50 percent of the items


```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        var values = [
            [ "C 1", "C 2", "C 3" ],
            [1, 2, 3 ],
            [2, 3, 4 ],
            [3, 4, 5 ],
            [4, 5, 6 ],
        ];

        sheet.range("A1:C5").values(values);

        var filter = new kendo.spreadsheet.TopFilter({ type: "topPercent", value: 50 });

        sheet.range("A1:C5").filter([ { column: 0, filter: filter } ]);
    </script>
```

