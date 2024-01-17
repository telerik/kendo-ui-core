---
title: Binding Change Event to Sortable TabStrip in Kendo UI
description: Learn how to bind the change event to the sortable functionality of the Kendo UI TabStrip.
type: how-to
page_title: How to Bind Change Event to Sortable TabStrip in Kendo UI
slug: tabstrip-binding-change-event-sortable
tags: kendo ui, tabstrip, sortable, change event
res_type: kb
---
## Environment
| Product | Version |
|---|---|
| Progress® Kendo UI® TabStrip | 2023.3.1114 |

## Description
I want to fire the change event whenever the user reorders the tabs in the Kendo UI TabStrip. I have enabled the sortable property, but the change event does not seem to get fired when the user moves the tab.

## Solution
To [bind the change event](https://docs.telerik.com/kendo-ui/api/javascript/ui/sortable/events/change) when the Kendo UI TabStrip is sorted, follow these steps:

1. Initialize the TabStrip with the [`sortable` property](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip/configuration/sortable) set to `true`:
```javascript
$("#tabstrip").kendoTabStrip({
  sortable: true
});
```

2. [Create a client-side reference](https://docs.telerik.com/kendo-ui/intro/widget-basics/events-and-methods?#referencing-existing-component-instances) to the TabStrip's Kendo UI Sortable:
```javascript
var tabstripSortable = $("#tabstrip ul.k-tabstrip-items").data("kendoSortable");
```

3. [Bind the change event after initialization](https://docs.telerik.com/kendo-ui/intro/widget-basics/events-and-methods?#binding-events-after-initialization) to the TabStrip's Kendo UI Sortable:
```javascript
tabstripSortable.bind("change", sortable_change);
```

4. Configure the `sortable_change` event function:
```javascript
function sortable_change(e) {
  console.log("from " + e.oldIndex + " to " + e.newIndex);
}
```

Here is a [Progress Kendo UI Dojo](https://dojo.telerik.com/OraMazOD) that demonstrates the above steps.
