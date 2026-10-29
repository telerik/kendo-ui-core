---
title: How to Filter Null Values in a Nullable Boolean Grid Column
description: "Learn to filter nullable Boolean fields in the {{ site.product }} Grid, including null values."
type: how-to
page_title: Filter Null Values in a Nullable Boolean Grid Column
slug: grid-filter-nullable-boolean-values
tags: grid, nullable boolean, filtering, null values, filter messages
ticketid: 1584735
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product Version</td>
            <td>2022.2.621</td>
        </tr>
        <tr>
            <td>Product</td>
            <td>Grid for {{ site.framework }}</td>
        </tr>
    </tbody>
</table>

## Description

When you filter a nullable Boolean Grid column for `false`, rows with a `null` value are not included. You can also display null values as false and change the Boolean filter-menu labels.

## Cause

A filter for `false` does not match `null`, because they are distinct values. A `ClientTemplate` changes only the displayed cell value; it does not change the underlying value used for filtering.

## Solution

The Grid model must define the column as nullable:

```C#.skip-repl
public bool? Processed { get; set; }
```

### Change the Boolean Filter Labels and Display Null as False

The `IsTrue` and `IsFalse` messages apply to the Boolean filter menu. Use the default menu mode for the radio buttons; do not set `Mode(GridFilterMode.Row)` for this example.

Add the following configuration to the Grid:

```HtmlHelper.skip-repl
@(Html.Kendo().Grid<ProductViewModel>()
    .Name("grid")
    .Columns(columns => columns
        .Bound(p => p.Processed)
        .ClientTemplate("#= Processed == null ? false : Processed #"))
    .Filterable(filterable => filterable.Messages(messages =>
        messages.IsTrue("Yes").IsFalse("No")))
    .Events(events => events.Filter("onFilter"))
)
```

{% if site.core %}
```TagHelper.skip-repl
@addTagHelper *, Kendo.Mvc

<kendo-grid name="grid" on-filter="onFilter">
    <columns>
        <column field="Processed" template="#= Processed == null ? false : Processed #" />
    </columns>
    <filterable>
        <messages is-true="Yes" is-false="No" />
    </filterable>
</kendo-grid>
```
{% endif %}

### Include Null Values When Filtering for False

Handle the Grid `Filter` event. When the selected value for `Processed` is false, replace that field's filter with an `or` group that matches false and null. The handler accepts either a Boolean `false` or the string `"false"`.

```JS.skip-repl
function onFilter() {
    var grid = this;

    setTimeout(function () {
        var dataSource = grid.dataSource;
        var filter = dataSource.filter();

        if (filter && filter.filters) {
            var processedFilters = filter.filters.filter(function (item) {
                return item.field === "Processed";
            });

            if (processedFilters.length > 0 &&
                (processedFilters[0].value === false || processedFilters[0].value === "false")) {
                filter.filters = filter.filters.filter(function (item) {
                    return item.field !== "Processed";
                });

                filter.filters.push({
                    logic: "or",
                    filters: [
                        { field: "Processed", operator: "eq", value: false },
                        { field: "Processed", operator: "eq", value: null }
                    ]
                });

                dataSource.filter(filter);
            }
        }
    }, 0);
}
```

### Test the Behavior

1. Open the Boolean filter menu for the `Processed` column. The radio labels should read **Yes** and **No**.
2. Select **No**. Rows with `Processed` set to `false` or `null` should appear.
3. Select **Yes**. Rows with `Processed` set to `true` should appear.
4. Confirm that null values display as `false` in the column.

## See Also

- [Grid Filtering]({% slug htmlhelpers_grid_aspnetcore_filtering %})
- [Grid Localization]({% slug localization_aspnetcore_grid %})
- [Using a DropDownList as a Boolean Grid Filter]({% slug grid-boolean-dropdownlist-filter %})
