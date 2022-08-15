---
title: TabStrip
page_title: TabStrip Integration
description: "Learn how to reorder TabStrip items when using the Telerik UI Sortable component for {{ site.framework }}."
slug: htmlhelpers_sortable_aspnetcore_integration_tabstrip
position: 3
---

# TabStrip Integration

You can use the [Telerik UI Sortable component for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/sortable/index) to reorder the items in the tabs of a TabStrip.

## Prerequisites

* [Overview of the Telerik UI Sortable component for {{ site.framework }}]({% slug htmlhelpers_sortable_aspnetcore %})
* [Overview of the Telerik UI TabStrip component for {{ site.framework }}]({% slug htmlhelpers_tabstrip_aspnetcore %})

## Reordering of Sortable Items

The Sortable reorders the HTML DOM elements. It does not automatically update the order of the items in the DataSource. This means that you have to explicitly implement the desired behavior.

## Reordering of TabStrip Items

To reorder the tabs of a TabStrip, initialize the Sortable on the `ul.k-tabstrip-items` element of the TabStrip. Normally, the `filter` property selects all `li.k-item` elements. If required, you can restrict the hint movement within the `ul.k-tabstrip-items` element.

```HtmlHelper
    @(Html.Kendo().Sortable()
        .For("#tabstrip")
        .Filter("li.k-item")
        .ContainerSelector("ul.k-tabstrip-items")
        .HintHandler("hintHandler")
        .Events(ev=>ev.Start("onStart").Change("onChange"))
    )
```
{% if site.core %}
```TagHelper
    <kendo-sortable name="tabstrip" filter="li.k-item" hint="hintHandler"
        container="ul.k-tabstrip-items"
        on-start="onStart"
        on-change="onChange">
    </kendo-sortable>
```
{% endif %}
```JavaScript
    <script>
        function hintHandler(element) {
            return $("<div id='hint' class='k-widget k-tabstrip'><ul class='k-tabstrip-items k-reset'><li class='k-item k-active k-tab-on-top'>" + element.html() + "</li></ul></div>");
        }

        function onStart(e) {
            $("#tabstrip").data("kendoTabStrip").activateTab(e.item);
        }

        function onChange(e) {
            var tabstrip = $("#tabstrip").data("kendoTabStrip"),
                    reference = tabstrip.tabGroup.children().eq(e.newIndex);

            if(e.oldIndex < e.newIndex) {
                tabstrip.insertAfter(e.item, reference);
            } else {
                tabstrip.insertBefore(e.item, reference);
            }
        }
    </script>
```
To avoid visual glitches, activate the current tab at the `start` event handler of the Sortable.

```
    function onStart(e) {
        $("#tabstrip").data("kendoTabStrip").activateTab(e.item);
    }
```

After a tab is sorted, update its order in the TabStrip.

```
    function onChange(e) {
        var tabstrip = $("#tabstrip").data("kendoTabStrip"),
                reference = tabstrip.tabGroup.children().eq(e.newIndex);

        if(e.oldIndex < e.newIndex) {
            tabstrip.insertAfter(e.item, reference);
        } else {
            tabstrip.insertBefore(e.item, reference);
        }
    }
```

## See Also

* [Server-side API](/api/sortable)
