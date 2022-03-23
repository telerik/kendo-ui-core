---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI TabStrip component for {{ site.framework }}."
previous_url: /helpers/html-helpers/tabstrip, /helpers/navigation/tabstrip/overview
slug: htmlhelpers_tabstrip_aspnetcore
position: 1
---

# TabStrip Overview
{% if site.core %}
The Telerik UI TabStrip TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI TabStrip widget.
{% else %}
The Telerik UI TabStrip HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI TabStrip widget.
{% endif %}

The TabStrip displays a collection of tabs with associated content. It is composed of an unordered list of items which represent tabs, and a collection of `div` elements, which contain the content for each tab.

* [Demo page for the TabStrip TagHelper](https://demos.telerik.com/{{ site.platform }}/tabstrip/index)
{% if site.core %}
* [Demo page for the TabStrip HtmlHelper](https://demos.telerik.com/aspnet-core/tabstrip/tag-helper)
{% endif %}

## Initializing the TabStrip

The following example demonstrates how to define the TabStrip.

```HtmlHelper
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
{% if site.core %}
```TagHelper
<kendo-tabstrip name="tabstrip">
    <items>
        <tabstrip-item text="Paris"
                       selected="true">
            <content>
                <div class="weather">
                    <p>Rainy weather in Paris.</p>
                </div>
            </content>
        </tabstrip-item>
        <tabstrip-item text="Sofia">
            <content>
                <div class="weather">
                    <p>Sunny weather in Sofia.</p>
                </div>
            </content>
        </tabstrip-item>
        <tabstrip-item text="Moscow">
            <content>
                <div class="weather">
                    <p>Cloudy weather in Moscow.</p>
                </div>
            </content>
        </tabstrip-item>
        <tabstrip-item text="Sydney">
            <content>
                <div class="weather">
                    <p>Rainy weather in Sidney.</p>
                </div>
            </content>
        </tabstrip-item>
    </items>
</kendo-tabstrip>
```
{% endif %}
```Controller
public class TabStripController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
```

## Basic Configuration

The following example demonstrates the basic configuration of the TabStrip.

```HtmlHelper
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
        // The Name() of the TabStrip is used to get its client-side instance.
        var tabstrip = $("#tabstrip").data("kendoTabStrip");
        console.log(tabstrip);
    });
</script>
```
{% if site.core %}
```TagHelper
<kendo-tabstrip name="tabstrip"
                tab-position="bottom"
                collapsible="true"
                navigatable="false">
    <popup-animation>
        <open duration="300" effects="fade:in" />
    </popup-animation>
    <items>
        <tabstrip-item text="One">
            <content>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </content>
        </tabstrip-item>
        <tabstrip-item text="Two">
            <content>
                <p>Mauris pulvinar molestie accumsan.</p>
            </content>
        </tabstrip-item>
    </items>
</kendo-tabstrip>

<script type="text/javascript">
    $(function () {
        // The Name() of the TabStrip is used to get its client-side instance.
        var tabstrip = $("#tabstrip").data("kendoTabStrip");
        console.log(tabstrip);
    });
</script>
```
{% endif %}

## Functionality and Features

* [Tabs]({% slug htmlhelpers_tabstrip_aspnetcore_tabs %})
* [Tab content]({% slug htmlhelpers_tabstrip_aspnetcore_content %})
* [Animation Effects]({% slug htmlhelpers_tabstrip_animations_aspnetcore %})
* [Images]({% slug htmlhelpers_tabstrip_images_aspnetcore %})

## Events

The following example demonstrates the available TabStrip events and how an event handler could be implemented for each of them. For a complete example on basic TabStrip events, refer to the [demo on using the events of the TabStrip](https://demos.telerik.com/{{ site.platform }}/tabstrip/events).

```HtmlHelper
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
```
{% if site.core %}
```TagHelper
<kendo-tabstrip name="tabstrip"
                on-show="onShow"
                on-select="onSelect"
                on-activate="onActivate"
                on-content-load="onContentLoad"
                on-error="onError">
    <items>
        <tabstrip-item text="Paris"
                       content-url="@Url.Action("Paris", "Home")">
            
        </tabstrip-item>
        <tabstrip-item text="Sofia"
                        content-url="@Url.Action("Sofia", "Home")">
           
        </tabstrip-item>
    </items>
</kendo-tabstrip>

```
{% endif %}
```script
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

* [Basic Usage of the TabStrip HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tabstrip)
{% if site.core %}
* [Basic Usage of the TabStrip TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/tabstrip/tag-helper)
{% endif %}
* [Using the API of the TabStrip HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tabstrip/api)
* [Server-Side API](/api/tabstrip)
