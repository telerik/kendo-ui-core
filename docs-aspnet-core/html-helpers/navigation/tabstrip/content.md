---
title: Tab Content
page_title: TabStrip Tab Content | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the loading and the configuration options for the Kendo UI TabStrip tab content."
slug: htmlhelpers_tabstrip_aspnetcore_content
position: 3
---

# Tab Content

The TabStrip widget offers various ways to load and configure the tab content area.

## Locally Define Tab Content

The easiest way to define the tab content is to make it declaratively, using the `tab.Content()` configuration method:

###### Example

```
@(Html.Kendo().TabStrip()
    .Name("tabstrip")
    .Items(tabstrip =>
    {
        tabstrip.Add().Text("Paris")
            .Content(@<text>
                <p>Rainy weather in Paris.</p>
            </text>);

        tabstrip.Add().Text("Sofia")
            .Content(@<text>
                <p>Sunny weather in Sofia.</p>
            </text>);
    })
)
```

## Load Content with AJAX

Telerik UI for ASP.NET Core TabStrip provides built-in support for asynchronously loading content from remote URLs. These URLs return HTML content that can be loaded in the TabStrip item content area.

The example below demonstrates how to load content asynchronously using AJAX:

###### Example

```
@(Html.Kendo().TabStrip()
    .Name("tabstrip")
    .Items(tabstrip =>
    {
        tabstrip.Add().Text("Paris")
            .LoadContentFrom(Url.Action("Paris", "Home"));

        tabstrip.Add().Text("Sofia")
            .LoadContentFrom(Url.Action("Sofia", "Home"));
    })
)
```

## Scrollable Content

The TabStrip content containers are scrollable by default. This allows the widget to display scrollbars if it has a fixed height and holds large content that cannot fit. If needed, it is possible to disable TabStrip content scrolling. This can help in scenarios where the TabStrip hosts a widget such as a Menu that needs to overflow outside the TabStrip. To disable scrolling use the [`Scrollable(false)`](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip/configuration/scrollable#scrollable) configuration method:


Depending on the browser, the content's scroll position may be reset when changing the active tab. If persisting the scroll position is required, use the [`select`](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip/events/select) event to save the current scroll position, and the [`activate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip/events/activate) event to restore it.

###### Example

```
@(Html.Kendo().TabStrip()
    .Name("tabstrip")
    .Scrollable(false)
    .Items(tabstrip =>
    {
        tabstrip.Add().Text("Paris")
            .LoadContentFrom(Url.Action("Paris", "Home"));

        tabstrip.Add().Text("Sofia")
            .LoadContentFrom(Url.Action("Sofia", "Home"));
    })
)
```

## See Also

* [Overview of TabStrip HTML helper]({% slug htmlhelpers_tabstrip_aspnetcore %})
* [TabStrip Tabs]({% slug htmlhelpers_tabstrip_aspnetcore_tabs %})
* [JavaScript API Reference of the TabStrip](http://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip)
* [TabStrip HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/tabstrip/overview)
* [TabStrip Official Demos](http://demos.telerik.com/aspnet-core/tabstrip/index)
