---
title: Integration with TabStrip
page_title: Integration with TabStrip | Kendo UI Sortable
description: "Learn how to reorder Kendo UI TabStrip items with the Kendo UI Sortable widget."
slug: integrationwith_tabstrip_sortable_widget
position: 3
---

# Integration with TabStrip

[Kendo UI Sortable widget](http://demos.telerik.com/kendo-ui/sortable/index) can be used to reorder the items in the tabs of a TabStrip.

## Prerequisites

Before going on reading, make sure you are familiar with the following topics:

* [Overview of the Sortable Widget]({% slug overview_kendoui_sortable_widget %})
* [Overview of Kendo UI TabStrip](/web/tabstrip/overview)

## Reordering of Items

> **Important**
>
> The Sortable widget reorders the HTML DOM elements. It does not automatically update the order of the items in the DataSource. This means that you should explicitly implement this behavior.

## Sortable and TabStrip

### Reorder TabStrip Items

To reorder the tabs of a TabStrip, initialize the Sortable widget on the TabStrip's `ul.k-tabstrip-items` element. Normally, the `filter` property of the widget should select all `li.k-item` elements. If required, the Hint movement can be restricted within the `ul.k-tabstrip-items` element.

###### Example

    $("#tabstrip ul.k-tabstrip-items").kendoSortable({
        filter: "li.k-item",
        axis: "x",
        container: "ul.k-tabstrip-items",
        hint: function(element) {
            return $("<div id='hint' class='k-widget k-header k-tabstrip'><ul class='k-tabstrip-items k-reset'><li class='k-item k-state-active k-tab-on-top'>" + element.html() + "</li></ul></div>");
        },
        start: function(e) {
            $("#tabstrip").data("kendoTabStrip").activateTab(e.item);
        },
        change: function(e) {
            var tabstrip = $("#tabstrip").data("kendoTabStrip"),
                reference = tabstrip.tabGroup.children().eq(e.newIndex);

            if(e.oldIndex < e.newIndex) {
                tabstrip.insertAfter(e.item, reference);
            } else {
                tabstrip.insertBefore(e.item, reference);
            }
        }
    });

To avoid visual glitches, it is advisable to activate the current tab at the `start` event handler of the Sortable widget.

###### Example

    start: function(e) {
        $("#tabstrip").data("kendoTabStrip").activateTab(e.item);
    }

After a tab is sorted, update its order in the TabStrip widget.

###### Example

    change: function(e) {
        var tabstrip = $("#tabstrip").data("kendoTabStrip"),
            reference = tabstrip.tabGroup.children().eq(e.newIndex);

        if(e.oldIndex < e.newIndex) {
            tabstrip.insertAfter(e.item, reference);
        } else {
            tabstrip.insertBefore(e.item, reference);
        }
    }

For additional information on the Sortable events, refer to the [JavaScript API article on Sortable events](/api/javascript/ui/sortable#events) and the [TabStrip/Sortable integration demo](http://demos.telerik.com/kendo-ui/web/sortable/integration-tabstrip.html).

## See Also

Other articles on Kendo UI Sortable:

* [Integration with Grid and ListView]({% slug integrationwith_gridandlistview_sortable_widget %})
* [Sortable JavaScript API Reference](/api/javascript/ui/sortable)
