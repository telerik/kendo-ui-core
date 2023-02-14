---
title: Tabs
page_title: Tabs
description: "Configure the tabs of the Telerik UI TabStrip component for {{ site.framework }}."
slug: htmlhelpers_tabstrip_aspnetcore_tabs
position: 2
---

# Tabs

The TabStrip provides advanced options for configuring its tabs.

## Tabs Positioning

The TabStrip API provides the [`TabPosition`](/api/Kendo.Mvc.UI.Fluent/TabStripBuilder#tabpositionkendomvcuitabstriptabposition) configuration option that allows you to set the position of the tabs. You can position the tabs to the top, left, right or bottom of the TabStrip via the [`TabStripTabPosition`](/api/Kendo.Mvc.UI/TabStripTabPosition)

The following example demonstrates how to position the TabStrip tabs to the right:

```HtmlHelper
@(Html.Kendo().TabStrip()
    .Name("tabstrip")
    .TabPosition(TabStripTabPosition.Right)
    .Items(items =>
    {
        items.Add().Text("One")
                .Content(@<text>
                    <p>Tab One</p>
                </text>);
        items.Add().Text("Two")
                .Content(@<text>
                    <p>Tab Two</p>
                </text>);
        items.Add().Text("Three")
                .Content(@<text>
                    <p>Tab Three</p>
                </text>);
    })
)
```
{% if site.core %}
```TagHelper
<kendo-tabstrip name="tabstrip"
                tab-position="right">
    <items>
        <tabstrip-item text="One">
            <content>
                <p>Tab One</p>
            </content>
        </tabstrip-item>
        <tabstrip-item text="Two">
            <content>
                <p>Tab Two</p>
            </content>
        </tabstrip-item>
        <tabstrip-item text="Three">
            <content>
                <p>Tab Three</p>
            </content>
        </tabstrip-item>
    </items>
</kendo-tabstrip>
```
{% endif %}

## Dynamic Tabs

The TabStrip API provides methods for dynamically adding or removing TabStrip bars.

1. Obtain a reference to the TabStrip widget in JavaScript.
1. Provide the new item as a JSON object along with a reference item. A reference item is a target HTML `tab` element that already exists in the TabStrip. The reference item will be used to determine the exact position of the new tab. To obtain a reference to the target item, you can use any valid jQuery selector.

The following example demonstrates how to add a new TabStrip tab and position it after the first existing tab.

```HtmlHelper
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
{% if site.core %}
```TagHelper
<kendo-tabstrip name="tabstrip"
                tab-position="@TabStripTabPosition.Right">
    <items>
        <tabstrip-item text="Paris">
            <content>
                <div class="weather">
                    <p>Rainy weather in Paris.</p>
                </div>
            </content>
        </tabstrip-item>
        <tabstrip-item text="Sofia" selected="true">
            <content>
                <div class="weather">
                    <p>Sunny weather in Sofia.</p>
                </div>
            </content>
        </tabstrip-item>
    </items>
</kendo-tabstrip>
```
{% endif %}
```script
<script>
    var tabstrip = $("#tabstrip").data("kendoTabStrip");

    tabstrip.insertAfter(
        {
            text: 'Sydney',
            content: '<p>Rainy weather in Sidney.</p>'
        },
        tabstrip.tabGroup.children("li:first")
    );
</script>
```

## Scrollable Tabs

The TabStrip supports scrollable `top` and `bottom` tabs through `TabPosition()`. During initialization, the TabStrip checks if the tabs fit in the available horizontal space and if not, renders scroll buttons on the sides. By default, the scrollable tabs are enabled. To disable them, use the [`Scrollable(false)`](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip/configuration/scrollable) method of the Kendo UI for jQuery widget.

If the TabStrip has no fixed width and is placed in a fluid layout, it can re-check whether tab scrolling is necessary or no longer required. To enable this option, execute the [`resize()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/widget/methods/resize) method of the Kendo UI TabStrip for jQuery upon `window.resize`. The `resize` method will also render the right scroll button if the last and selected tab becomes invisible as a result of TabStrip shrinking.

```HtmlHelper
<div style="width: 150px;">
    @(Html.Kendo().TabStrip()
        .Name("tabstrip")
        .Scrollable(false)
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
</div>
```
{% if site.core %}
```TagHelper
<kendo-tabstrip name="tabstrip">
    <scrollable enabled="false" />
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

    </items>
</kendo-tabstrip>
```
{% endif %}

## Selecting Tab on Initial Load

You can select a tab and display its associated content upon the initial load of the TabStrip.

To select a tab on initial load, apply either of the following approaches:
* Use the `Selected()` configuration option on the required tab.
* Use the `SelectedIndex()` configuration method on the TabStrip HTML helper.

The following example demonstrates how to use the `Selected()` configuration method.

```HtmlHelper
@(Html.Kendo().TabStrip()
    .Name("tabstrip")
    .Items(tabstrip =>
    {
        tabstrip.Add().Text("Paris")
            .Content(@<text>
                <p>Rainy weather in Paris.</p>
            </text>);

        tabstrip.Add().Text("Sofia")
            .Selected(true)
            .Content(@<text>
                <p>Sunny weather in Sofia.</p>
            </text>);
    })
)
```
{% if site.core %}
```TagHelper
<kendo-tabstrip name="tabstrip">
    <items>
        <tabstrip-item text="Paris">
            <content>
                <div class="weather">
                    <p>Rainy weather in Paris.</p>
                </div>
            </content>
        </tabstrip-item>
        <tabstrip-item text="Sofia"
                       selected="true">
            <content>
                <div class="weather">
                    <p>Sunny weather in Sofia.</p>
                </div>
            </content>
        </tabstrip-item>

    </items>
</kendo-tabstrip>
```
{% endif %}

## See Also

* [Scrollable Tabs by the TabStrip HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tabstrip/scrollable-tabs)
* [Tab Position in the TabStrip HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tabstrip/tab-position)
* [Server-Side API](/api/tabstrip)
