---
title: TabStrip
page_title: TabStrip | UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the TabStrip HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_tabstrip_aspnetcore
---

# TabStrip HtmlHelper Overview

The TabStrip HtmlHelper extension is a server-side wrapper for the [Kendo UI TabStrip](http://demos.telerik.com/kendo-ui/tabstrip/index).

It allows you to configure the Kendo UI TabStrip widget from server-side code. The [TabStrip](http://docs.telerik.com/kendo-ui/controls/navigation/tabstrip/overview) displays a collection of tabs with associated content. It is composed of an unordered list of items which represent tabs, and a collection of `div` elements, which contain the content for each tab.

For more information on the HtmlHelper, refer to the article on the [TabStrip HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/tabstrip/overview).

## Basic Usage

The following example demonstrates how to define the TabStrip by using the TabStrip HtmlHelper.

###### Example

```tab-Razor
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
```tab-Controller
    public class TabStripController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
```

## Configuration

The following example demonstrates the basic configuration of the TabStrip HtmlHelper and how to get the TabStrip instance.

```tab-Razor
    @(Html.Kendo().TabStrip()
        .Name("tabstrip")
        .TabPosition(TabStripTabPosition.Bottom)
        .Animation(animation =>
        {
            animation.Open(config =>
            {
                config.Fade(FadeDirection.In);
            });
        })
        .SelectedIndex(0)
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

            items.Add().Text("Three")
                .Content(@<text>
                    <p>In commodo scelerisque enim, eget sodales lorem condimentum rutrum.</p>
                </text>);

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
        $(function () {
            //Notice that the Name() of the TabStrip is used to get its client-side instance.
            var tabstrip = $("#tabstrip").data("kendoTabStrip");
            console.log(tabstrip);
        });
    </script>
```

## See Also

* [JavaScript API Reference of the TabStrip](http://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip)
* [TabStrip HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/tabstrip/overview)
* [TabStrip Official Demos](http://demos.telerik.com/aspnet-core/tabstrip/index)
* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
