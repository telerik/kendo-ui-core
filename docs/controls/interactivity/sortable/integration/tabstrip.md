---
title: TabStrip
page_title: jQuery Sortable Documentation | TabStrip Integration
description: "Get started with the jQuery Sortable by Kendo UI and integrate the widget with the Kendo UI TabStrip."
previous_url: /controls/interactivity/sortable/integration-tabstrip
slug: integrationwith_tabstrip_sortable_widget
---

# TabStrip Integration

You can use the [Kendo UI Sortable wisget](https://demos.telerik.com/kendo-ui/sortable/index) to reorder the items in the tabs of a TabStrip.

## Prerequisites

* [Overview of the Kendo UI Sortable widget]({% slug overview_kendoui_sortable_widget %})
* [Overview of Kendo UI TabStrip widget]({% slug overview_kendoui_tabstrip_widget %})
* [API reference of the Kendo UI DataSource component](/api/javascript/data/datasource#methods)

## Reordering of Sortable Items

The Sortable reorders the HTML DOM elements. It does not automatically update the order of the items in the DataSource. This means that you have to explicitly implement the desired behavior.

## Reordering of TabStrip Items

To reorder the tabs of a TabStrip, initialize the Sortable on the `ul.k-tabstrip-items` element of the TabStrip. Normally, the `filter` property selects all `li.k-item` elements. If required, you can restrict the hint movement within the `ul.k-tabstrip-items` element.

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

To avoid visual glitches, activate the current tab at the `start` event handler of the Sortable. For more information on the Sortable events, refer to the [Sortable API](/api/javascript/ui/sortable#events) and the [demo on integrating the Sortable with the TabStrip](https://demos.telerik.com/kendo-ui/web/sortable/integration-tabstrip.html).

    start: function(e) {
        $("#tabstrip").data("kendoTabStrip").activateTab(e.item);
    }

After a tab is sorted, update its order in the TabStrip.

    change: function(e) {
        var tabstrip = $("#tabstrip").data("kendoTabStrip"),
            reference = tabstrip.tabGroup.children().eq(e.newIndex);

        if(e.oldIndex < e.newIndex) {
            tabstrip.insertAfter(e.item, reference);
        } else {
            tabstrip.insertBefore(e.item, reference);
        }
    }

## See Also

* [TabStrip Integration of the Sortable (Demo)](https://demos.telerik.com/kendo-ui/sortable/integration-tabstrip)
* [JavaScript API Reference of the Sortable](/api/javascript/ui/sortable)
