---
title: Select All
page_title: jQuery MultiSelect Documentation - Select All
description: "Learn how to enable a Select All header in the Kendo UI for jQuery MultiSelect that allows users to select or deselect all items at once, optionally combined with checkboxes and summarized tags."
components: ["multiselect"]
slug: selectall_multiselect
position: 7
---

# Select All

The MultiSelect provides a built-in Select All feature that renders a sticky header at the top of the dropdown list. Clicking the header selects or deselects all items in the list. This feature works with filtering, checkboxes, virtualization, and the summary-tag mode to cover common bulk-selection scenarios.

## Basic Select All

To enable the Select All header, set the [`selectAll`](/api/javascript/ui/multiselect/configuration/selectall) option to `true`. Clicking the header selects all items when none or some are selected, and deselects all items when all are already selected.

```dojo
    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
        dataSource: ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"],
        selectAll: true,
        placeholder: "Select fruits..."
    });
    </script>
```

## Select All with Checkboxes

When you enable the [`checkboxes`](/api/javascript/ui/multiselect/configuration/checkboxes) option together with `selectAll`, each item in the dropdown renders a checkbox and the sticky header displays a checkbox that reflects the aggregate selection state:

* Unchecked&mdash;No items are selected.
* Indeterminate&mdash;Some items are selected.
* Checked&mdash;All items are selected.

```dojo
    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
        dataSource: ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"],
        selectAll: true,
        checkboxes: true,
        value: ["Apple", "Cherry"],
        placeholder: "Select fruits..."
    });
    </script>
```

## Select All with Filtering

The Select All feature operates on all data source items regardless of the current filter. When a user types a filter and clicks the Select All header, all items from the data source are selected&mdash;not only the visible subset. After the selection completes, the filter is cleared.

```dojo
    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
        dataSource: ["Apple", "Apricot", "Avocado", "Banana", "Blueberry", "Cherry", "Cranberry", "Date"],
        selectAll: true,
        checkboxes: true,
        filter: "contains",
        placeholder: "Type to filter, then select all..."
    });
    </script>
```

## Summarized Tags

You can combine Select All with the [`summarizeAfter`](/api/javascript/ui/multiselect/configuration/summarizeafter) option to keep the input compact when many items are selected. When the number of selected items reaches or exceeds the specified threshold, the tag list switches to a summarized display&mdash;the first N items render as individual tags and the remaining items collapse into a single overflow chip showing the count.

```dojo
    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
        dataSource: [
            "Apple", "Apricot", "Avocado", "Banana", "Blackberry",
            "Blueberry", "Cherry", "Coconut", "Cranberry", "Date",
            "Dragon fruit", "Elderberry", "Fig", "Grape", "Guava"
        ],
        selectAll: true,
        checkboxes: true,
        summarizeAfter: 3,
        placeholder: "Select fruits..."
    });
    </script>
```

## Customizing the Select All Label

To change the text displayed in the sticky header, set the [`messages.selectAll`](/api/javascript/ui/multiselect/configuration/messages.selectall) option.

```dojo
    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
        dataSource: ["Apple", "Banana", "Cherry", "Date", "Elderberry"],
        selectAll: true,
        checkboxes: true,
        messages: {
            selectAll: "Check All Items"
        }
    });
    </script>
```

## Handling the selectAllChange Event

The [`selectAllChange`](/api/javascript/ui/multiselect/events/selectallchange) event fires when the user clicks the Select All header. The event is preventable&mdash;calling `e.preventDefault()` cancels the built-in selection logic so you can implement custom behavior, such as loading all records from a remote service before selecting them.

The event data includes:

* `e.checked`&mdash;`true` when the action is selecting all, `false` when deselecting.
* `e.preventDefault()`&mdash;Cancels the default select/deselect-all behavior.

```dojo
    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
        dataSource: ["Apple", "Banana", "Cherry", "Date", "Elderberry"],
        selectAll: true,
        checkboxes: true,
        selectAllChange: function(e) {
            if (e.checked) {
                console.log("Selecting all items");
            } else {
                console.log("Deselecting all items");
            }
        }
    });
    </script>
```

The following example demonstrates how to prevent the default behavior and implement custom selection logic:

```dojo
    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
        dataSource: ["Apple", "Banana", "Cherry", "Date", "Elderberry"],
        selectAll: true,
        checkboxes: true,
        selectAllChange: function(e) {
            e.preventDefault();
            if (e.checked) {
                this.value(["Apple", "Cherry", "Elderberry"]);
            } else {
                this.value([]);
            }
        }
    });
    </script>
```

## See Also

* [Select All Demo](https://demos.telerik.com/kendo-ui/multiselect/select-all)
* [Summary-Tag Mode]({% slug tagmode_multiselect %})
* [JavaScript API Reference of the MultiSelect](/api/javascript/ui/multiselect)
