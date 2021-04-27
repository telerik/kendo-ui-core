---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ActionSheet HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_actionsheet_aspnetcore
position: 1
---

# ActionSheet HtmlHelper Overview

The Telerik ActionSheet HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ActionSheet widget.

The ActionSheet is a dialog that displays a set of options for the user to choose from. It appears on top of the app's content, and must be manually dismissed by the user before they can resume interaction with the app.

Visit the [Demo page for the ActionSheet](https://demos.telerik.com/{{ site.platform }}/actionsheet/index) to see it in action.

## Initializing the ActionSheet

The following example demonstrates how to define the ActionSheet by using the ActionSheet HtmlHelper.

```Razor
    @(Html.Kendo().ActionSheet()
        .Name("actionsheet")
    )
```

## Basic Configuration

The following example demonstrates the basic configuration for the ActionSheet HtmlHelper.

```Razor
    @(Html.Kendo().ActionSheet()
        .Name("actionsheet")
        .Title("Select item")
        .Items(items =>
        {
            items.Add().Text("Edit Item").IconClass("k-icon k-i-edit").Click("onClick");
            items.Add().Text("Add to Favorites").IconClass("k-icon k-i-heart").Click("onClick");
            items.Add().Text("Upload New").IconClass("k-icon k-i-upload").Click("onClick");
            items.Add().Text("Cancel").IconClass("k-icon k-i-cancel").Group("bottom").Click("onClick");
        })
    )

    <script>
    $(function() {
        // The Name() of the ActionSheet is used to get its client-side instance.
        function onClick(e) {
            e.preventDefault();
            var actionsheet = $("#actionsheet").data("kendoActionSheet");
            actionsheet.close();
        }
    });
    </script>
```

## Functionality and Features

* [Items]({% slug htmlhelpers_items_actionsheet_aspnetcore %}) - the configuration allows you to set various attributes like icons and text.
* [Events]({% slug htmlhelpers_events_actionsheet_aspnetcore %}) - the events that provide easy configuration or extension points for custom functionality
* [Accessibility]({% slug htmlhelpers_accessibility_actionsheet_aspnetcore %}) - the ActionSheet supports various accessibility standards.

## See Also

* [Basic Usage of the ActionSheet HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/actionsheet/index)
* [Using the API of the ActionSheet HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/actionsheet/api)
