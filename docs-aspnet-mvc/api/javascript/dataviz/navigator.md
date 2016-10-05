---
title: Navigator
page_title: API reference for Kendo UI Stock Chart Navigator
---

# kendo.dataviz.Navigator : kendo.Observable
Controls the navigation pane of a Stock Chart.

## Methods

### select
Gets or sets the Navigator selected date range.

> **Important**
>
> The select method is available in Kendo UI v.2016.2.517 and later

##### Example - Set selected range
    <input id="fromDate" />
    <input id="toDate" />
    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
      dataSource: {
        data: [
          { value: 1, category: "One", date: new Date(2016, 1, 1)},
          { value: 2, category: "Two", date: new Date(2016, 3, 1)}
        ]
      },
      dateField: "date",
      series: [{
          type: "line",
          field: "value",
          name: "Value"
      }],
      navigator: {
          series: [{
              type: "area",
              field: "value",
              name: "Value"
          }]
      }
    });

    function selectRange() {
        navi.select(
            $("#fromDate").data("kendoDatePicker").value(),
            $("#toDate").data("kendoDatePicker").value()
        );
    }

    var chart = $("#stock-chart").data("kendoStockChart");
    var navi = chart.navigator;

    $("#fromDate").kendoDatePicker({
        value: navi.select().from,
        change: selectRange
    });

    $("#toDate").kendoDatePicker({
        value: navi.select().to,
        change: selectRange
    });
    </script>

#### Parameters

##### from `Date`
The from date (inclusive) of the selected date range.

##### to `Date`
The to date (exclusive) of the selected date range.

#### Returns
`Object` An object with two date fields - `from` and `to`.

