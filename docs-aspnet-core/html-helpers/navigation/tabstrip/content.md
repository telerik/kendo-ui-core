---
title: Tab Content
page_title: Tab Content | Kendo UI TabStrip HtmlHelper for ASP.NET Core
description: "Use the options for loading and configuring the tab content of the Kendo UI TabStrip HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_tabstrip_aspnetcore_content
position: 3
---

# Tab Content

The TabStrip provides options for loading and configuring its tab content area.

## Defining Content Locally

To define the tab content declaratively, use the `tab.Content()` configuration method.

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

## Loading Content with AJAX

Telerik UI for ASP.NET Core TabStrip provides built-in support for asynchronously loading content from remote URLs. These URLs return HTML content that can be loaded in the item content area of the TabStrip.

The following example demonstrates how to load the tab content asynchronously by using AJAX.

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

By default, the containers of the TabStrip content are scrollable which enables a TabStrip with a fixed height and large content that cannot fit to display scrollbars. You can also disable the scrolling of the TabStrip content which is useful when the TabStrip hosts a widget (such as a Menu) that needs to overflow the TabStrip. To disable the scrolling of the TabStrip content, use the [`Scrollable(false)`](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip/configuration/scrollable#scrollable) configuration method.

Depending on the browser, you can reset the scroll position of the content when the active tab is changed. To persist the scroll position, use the [`select`](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip/events/select) event to save the current scroll position and then the [`activate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip/events/activate) event to restore it.

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
