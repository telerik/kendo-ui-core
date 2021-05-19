---
title: Frequently Asked Questions
page_title: Frequently Asked Questions | Kendo UI Grid for jQuery
description: "Find answers to the most frequently asked questions related to the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/grid-faq
slug: frequently_asked_questions_grid
tags: grid, faq
component: grid
type: how-to
res_type: kb
---

This article provides a collection of the most frequently asked questions (FAQ) on checkbox and answers related to the Kendo UI Grid.

> * The latest tested version is 2017.2 621.
> * The checkbox selectable column is available as of the Kendo UI R2 2017 SP1 release.
> * The suggested approaches are tested up to Kendo UI version 2017.2 621.

## How can I check checkboxes and select rows programmatically?

1. In the `dataBound` event handler, get all the rows of the Grid.
1. Loop through the rows and based on the `dataItem` select the desired rows.

For more information, refer to the article on [selecting rows programmatically on load]({% slug checkbox-selection-select-rows-on-load %}).

## How can I limit the selection to a single row and remove the master checkbox?

1. Remove the master checkbox by adding an empty header template.
1. In the `click` event handler of the checkboxes, use the `clearSelection` method to remove the selection from the other rows.

For more information, refer to the article on [limiting the selection to a single row]({% slug checkbox-selection-select-single-row %}).

## How can I get the data item of the last selected row?

1. In the `click` event handler of the checkboxes, get the row by using the `closest` jQuery method.
1. Get the row data by passing it as a parameter to the `dataItem` method.

For more information, refer to the article on [getting the `dataItem` for the last selected row]({% slug checkbox-selection-dataitem-last-selected-row %}).

## How can I get all the selected rows dataItems?

1. In the `change` event handler, get all the selected rows.
1. Loop through the rows and use the `dataItem` method for each row.

For more information, refer to the article on [getting the `dataItem` for each selected row]({% slug checkbox-selection-dataitems-selected-rows %}).

## How can I select all the rows on all the pages?

> The implementation of this functionality might lead to slow Grid performance.

1. Set the `persistSelection` configuration of the Grid to `true`.
1. In the `click` event handler of the master checkbox, show all rows on a single page.
1. Select the rows.
1. Bring back the old page size.

For more information, refer to the article on [selecting all the rows on all the pages]({% slug checkbox-selection-select-all-rows-all-pages %}).

## How can I implement my own checkbox selectable column?

Use the configurations, methods, and events of the Grid and jQuery. For more information, refer to the article on [selecting multiple rows by using checkboxes]({% slug howto_select_deselect_all_rowswith_checkboxes_grid %}).

## See Also

* [Grid Checkbox Selection Demo](https://demos.telerik.com/kendo-ui/grid/checkbox-selection)
* [API Reference for the columns.selectable Configuration](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.selectable)
