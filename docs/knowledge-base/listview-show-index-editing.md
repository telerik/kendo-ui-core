---
title: How to Show Index in Kendo UI ListView
description: Learn how to display the index of an item when editing in the Kendo UI ListView.
type: how-to
page_title: Show Index in Kendo UI ListView
slug: listview-show-index-editing
tags: kendo ui, listview, index, editing
res_type: kb
components: ["listview"]
---

## Environment
| Product | Version |
|---------|---------|
| Kendo UI ListView | 2023.3.1114 |

## Description
I want to show the index of an item when editing in the Kendo UI ListView.

## Solution
To display the index of an item in the Kendo UI ListView, you can [create a template function](/api/javascript/ui/listview/configuration/template) within the [editTemplate](/api/javascript/ui/listview/configuration/edittemplate) that returns the [index from the ListView's dataSource](/api/javascript/data/datasource/methods/indexof). Here is an example:

```html
EditTemplate
<div class="product-view k-widget">
  <dl>
    <div>#:getIndex(data)#</div>
    <!-- Rest of the template -->
  </dl>
  <!-- Edit buttons -->
</div>
```

```javascript
JavaScript
function getIndex(data){
  //Get ListView
  var listView = $("#listView").data("kendoListView");
  
  //Get its DataSource
  var lvDataSource = listView.dataSource;
  
  //Return Index
  return "Index: " + lvDataSource.indexOf(data);
}
```

The [following Progress Kendo UI Dojo](https://dojo.telerik.com/imuvinoV) demonstrates the above steps in action.
