---
title: Events
page_title: Events
description: "Learn how to handle the events of the ActionSheet component."
slug: htmlhelpers_events_actionsheet_aspnetcore
position: 3
---

# Events

The Telerik UI ActionSheet for {{ site.framework }} [exposes multiple events](/api/kendo.mvc.ui.fluent/actionsheeteventbuilder) that allow you to control the behavior of the UI component.

For a complete example on basic ActionSheet events, refer to the [demo on using the events of the  ActionSheet](https://demos.telerik.com/{{ site.platform }}/actionsheet/events).

The following example demonstrates how you can subscribe to the `Open` and `Close` events of the component. 

```HtmlHelper
    @(Html.Kendo().ActionSheet()
        .Name("actionsheet")
        .Title("Select item")
        .Items(items =>
        {
            items.Add().Text("Edit Item").IconClass("k-icon k-i-edit");
            items.Add().Text("Add to Favorites").IconClass("k-icon k-i-heart");
            items.Add().Text("Upload New").IconClass("k-icon k-i-upload");
            items.Add().Text("Cancel").IconClass("k-icon k-i-cancel").Group("bottom");
        })
        .Events(e => 
        {
            e.Open("onOpen");
            e.Close("onClose");
        })
    )

    <script>
        function onOpen() {
            console.log("Open")
            // Custom logic when the ActionSheet opens.
        }

        function onClose() {
            console.log("Close")
            // Custom logic when the ActionSheet closes.
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-actionsheet name="actionsheet" title="Select item" on-open="onOpen" on-close="onClose">
        <items>
            <item text="Edit Item" icon-class="k-icon k-i-edit"/>
            <item text="Add to Favorites" icon-class="k-icon k-i-heart" />
            <item text="Upload New" icon-class="k-icon k-i-upload" />
            <item text="Cancel" icon-class="k-icon k-i-cancel" group="bottom" />
        </items>
    </kendo-actionsheet>

    <script>
        function onOpen() {
            console.log("Open")
            // Custom logic when the ActionSheet opens.
        }

        function onClose() {
            console.log("Close")
            // Custom logic when the ActionSheet closes.
        }
    </script>
```
{% endif %}

## Next Steps

* [Using the ActionSheet Events (Demo)](https://demos.telerik.com/aspnet-core/actionsheet/events)

## See Also

* [Using the API of the ActionSheet for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/actionsheet/api)
* [Client-Side API of the ActionSheet](https://docs.telerik.com/kendo-ui/api/javascript/ui/actionsheet)
* [Server-Side API of the ActionSheet HtmlHelper](/api/actionsheet)
{% if site.core %}
* [Server-Side API of the ActionSheet TagHelper](/api/taghelpers/actionsheet)
{% endif %}

