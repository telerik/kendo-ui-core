---
title: Overview
page_title: Overview
description: "The Telerik UI TabStrip component for {{ site.framework }} enables users to categorize content in different views for tidier visualization."
previous_url: /helpers/html-helpers/tabstrip, /helpers/navigation/tabstrip/overview
slug: htmlhelpers_tabstrip_aspnetcore
position: 0
---

# {{ site.framework }} TabStrip Overview
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

* [Tabs]({% slug htmlhelpers_tabstrip_aspnetcore_tabs %})—The TabStrip provides various configuration options for the tabs, which allows you to organize the content into different views.
* [Tab content]({% slug htmlhelpers_tabstrip_aspnetcore_content %})—You can customize the content shown to the user.
* [Animation effects]({% slug htmlhelpers_tabstrip_animations_aspnetcore %})—The animation options help you to configure the desired switch transitions between the different tabs.
{% if site.mvc %}
* [Forms]({% slug forms_tabstrip_aspnetmvc %})—You can render forms inside the TabStrip and let users submit data.
{% endif %}
* [Images]({% slug htmlhelpers_tabstrip_images_aspnetcore %})—The TabStrip supports adding custom images.

## Next Steps

* [Getting Started with the TabStrip]({% slug aspnetcore_tabstrip_getting_started %})
* [Basic Usage of the TabStrip HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tabstrip/index)
{% if site.core %}
* [Basic Usage of the TabStrip TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/tabstrip/tag-helper)
{% endif %}

## See Also

* [Using the API of the TabStrip for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tabstrip/api)
* [Knowledge Base Section](/knowledge-base)

