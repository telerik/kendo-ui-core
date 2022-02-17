---
title: Events
page_title: Events
description: "Learn how to handle the events of the ActionSheet component."
slug: htmlhelpers_events_actionsheet_aspnetcore
position: 3
---

# Events

The Kendo UI ActionSheet exposes events that provide easy configuration or extension points for custom functionality.

## Open

The `open` event fires when the ActionSheet is opened.

The following example demonstrates how you can subscribe to the `open` event of the component: 

```HtmlHelper
    @(Html.Kendo().ActionSheet()
        .Name("actionsheet")
        .Title("Select item")
        .Items(items =>
        {
            items.Add().Text("Edit Item").IconClass("k-icon k-i-edit");
            items.Add().Text("Add to Favorites").IconClass("k-icon k-i-heart");
            items.Add().Text("Upload New").IconClass("k-icon k-i-upload").Click("onClick");
            items.Add().Text("Cancel").IconClass("k-icon k-i-cancel").Group("bottom");
        })
        .Events(e => e.open("onOpen"))
    )

    <script>
        function onOpen() {
            console.log("Open")
            //your custom logic here
        }
    </script>
```

## Close

The `close` event fires when the ActionSheet is closed.

The following example demonstrates how you can subscribe to the `close` event of the widget:

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
        .Events(e => e.Close("onClose"))
    )

    <script>
        function onClose() {
            console.log("Close")
            //your custom logic here
        }
    </script>
```

## See Also

* [Overview of the ActionSheet HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/actionsheet)
* [Server-Side API](/api/actionsheet)
