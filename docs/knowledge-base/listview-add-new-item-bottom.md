---
title: Adding New Item at the Bottom of Kendo UI ListView
description: Learn how to add a new item at the bottom of a Kendo UI ListView.
type: how-to
page_title: How to Add New Item at the Bottom of Kendo UI ListView
slug: listview-add-new-item-bottom
tags: kendo-ui, listview, add, item, bottom
res_type: kb
components: ["listview"]
---

## Environment

| Product | Version |
| ------------------------------------  | ------- |
| Progress® Kendo UI® ListView for jQuery | 2023.3.1114 |

## Description

I want to add a new item at the bottom of a Kendo UI ListView instead of at the top. How can I achieve this?

## Solution

You can achieve this by using the following approach:

1. Get the [ListView's dataSource](/api/javascript/ui/listview/fields/datasource), the [last item in the view](/api/javascript/data/datasource/methods/view), and [its index](/api/javascript/data/datasource/methods/indexof).
2. Place the new item in the appropriate position based on the [dataSource's total](/api/javascript/data/datasource/methods/total).
3. [Insert the new item](/api/javascript/data/datasource/methods/insert) at the calculated [index in the dataSource](/api/javascript/data/datasource/methods/indexof).
4. [Edit the newly inserted item](/api/javascript/ui/listview/methods/edit) at the bottom of the page.

Here's an example implemented in JavaScript:

```javascript
$("#add-new-button").click(function(e) {
  e.preventDefault();

  // Get dataSource, last item in the view, and its index
  var dataSource = listView.dataSource,
      lastItemInView = dataSource.view()[dataSource.view().length - 1],
      index = dataSource.indexOf(lastItemInView);

  // Place new item in appropriate position on page
  // If at the end of the ListView
  if (index + 1 === dataSource.total()) {
    index += 1;
  }

  // Insert item
  dataSource.insert(index, {});

  // Edit newly inserted item at bottom of page
  listView.edit(listView.content.children().last());
});
```

Please refer to the following Progress Kendo UI Dojo for a working example: [ListView - Add New Item at the Bottom](https://dojo.telerik.com/ENEKufex)
