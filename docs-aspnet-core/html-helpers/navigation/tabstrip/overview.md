---
title: Overview
page_title: TabStrip | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI TabStrip HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/tabstrip
slug: htmlhelpers_tabstrip_aspnetcore
position: 1
---

# TabStrip HtmlHelper Overview

The TabStrip HtmlHelper extension is a server-side wrapper for the [Kendo UI TabStrip](http://demos.telerik.com/kendo-ui/tabstrip/index) widget.

It allows you to configure the Kendo UI TabStrip widget from server-side code. The [TabStrip](http://docs.telerik.com/kendo-ui/controls/navigation/tabstrip/overview) displays a collection of tabs with associated content. It is composed of an unordered list of items which represent tabs, and a collection of `div` elements, which contain the content for each tab.

For more information on the HtmlHelper, refer to the article on the [TabStrip HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/tabstrip/overview).

## Basic Usage

The following example demonstrates how to define the TabStrip by using the TabStrip HtmlHelper.

```Razor
@(Html.Kendo().TabStrip()
    .Name("tabstrip")
    .Items(tabstrip =>
    {
        tabstrip.Add().Text("Paris")
            .Selected(true)
            .Content(@<text>
                <div class="weather">
                    <p>Rainy weather in Paris.</p>
                </div>
            </text>);

        tabstrip.Add().Text("Sofia")
            .Content(@<text>
                <div class="weather">
                    <p>Sunny weather in Sofia.</p>
                </div>
            </text>);

        tabstrip.Add().Text("Moscow")
            .Content(@<text>
                <div class="weather">
                    <p>Cloudy weather in Moscow.</p>
                </div>
            </text>);

        tabstrip.Add().Text("Sydney")
            .Content(@<text>
                <div class="weather">
                    <p>Rainy weather in Sidney.</p>
                </div>
            </text>);
    })
)
```
```Controller
public class TabStripController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
```

## Configuration

The following example demonstrates the basic configuration of the TabStrip HtmlHelper and how to get the TabStrip widget instance.

###### Example

```
@(Html.Kendo().TabStrip()
    .Name("tabstrip")
    .TabPosition(TabStripTabPosition.Bottom)
    .Collapsible(true)
    .Navigatable(false)
    .Animation(animation =>
    {
        animation.Open(config =>
        {
            config.Fade(FadeDirection.In);
        });
    })
    .Items(items =>
    {
        items.Add().Text("One")
            .Content(@<text>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </text>);

        items.Add().Text("Two")
            .Content(@<text>
                <p>Mauris pulvinar molestie accumsan.</p>
            </text>);
    })
)

<script type="text/javascript">
    $(function () {
        //Notice that the Name() of the TabStrip is used to get its client-side instance.
        var tabstrip = $("#tabstrip").data("kendoTabStrip");
        console.log(tabstrip);
    });
</script>
```

## Events

The following example demonstrates the available TabStrip events and how an event handler could be implemented for each of them.

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
    .Events(events => events
        .Show("onShow")
        .Select("onSelect")
        .Activate("onActivate")
        .ContentLoad("onContentLoad")
        .Error("onError")
    )
)

<script type="text/javascript">
    function onShow(e) {
        console.log("Shown: " + $(e.item).find("> .k-link").text());
    }

    function onSelect(e) {
        console.log("Selected: " + $(e.item).find("> .k-link").text());
    }

    function onActivate(e) {
        console.log("Activated: " + $(e.item).find("> .k-link").text());
    }

    function onContentLoad(e) {
        console.log("Content loaded in <b>"+ $(e.item).find("> .k-link").text() + "</b>");
    }

    function onError(e) {
        console.error("Loading failed with " + e.xhr.statusText + " " + e.xhr.status);
    }
</script>
```

## See Also

* [TabStrip Tabs]({% slug htmlhelpers_tabstrip_aspnetcore_tabs %})
* [TabStrip Tab Content]({% slug htmlhelpers_tabstrip_aspnetcore_content %})
* [JavaScript API Reference of the TabStrip](http://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip)
* [TabStrip HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/tabstrip/overview)
* [TabStrip Official Demos](http://demos.telerik.com/aspnet-core/tabstrip/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
