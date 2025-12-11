---
title: Tab Content
page_title: Tab Content
description: "Use the options for loading and configuring the tab content of the Telerik UI TabStrip component for {{ site.framework }}."
components: ["tabstrip"]
slug: htmlhelpers_tabstrip_aspnetcore_content
position: 3
---

# Tab Content

The TabStrip provides options for loading and configuring its tab content area.

## Defining Content Locally

To define the tab content declaratively, use the `tab.Content()` configuration method.

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
<kendo-tabstrip name="tabstrip">
    <items>
        <tabstrip-item text="Paris">
            <content>
                <p>Rainy weather in Paris.</p>
            </content>
        </tabstrip-item>
        <tabstrip-item text="Sofia">
            <content>
                <p>Sunny weather in Sofia.</p>
            </content>
        </tabstrip-item>
    </items>
</kendo-tabstrip>

```
{% endif %}

## Loading Content with AJAX

{{ site.product }} TabStrip provides built-in support for asynchronously loading content from remote URLs. These URLs return HTML content that can be loaded in the item content area of the TabStrip.

The following example demonstrates how to load the tab content asynchronously by using AJAX. The {{ site.product }} 2024 Q3 Release adds the `Data`, `Type` and `Headers` overloads of the `TabStripItemBuilder` to provide support for configuring additional `jQuery.ajax` options of the request, fetching the Tab content from to the remote endpoint:

```HtmlHelper
@(Html.Kendo().TabStrip()
    .Name("tabstrip")
    .Items(tabstrip =>
    {
        tabstrip.Add().Text("Paris")
            .LoadContentFrom(Url.Action("Paris", "Home")).Data("additionalData").Type(HttpVerbs.Post);

        tabstrip.Add().Text("Sofia")
            .LoadContentFrom(Url.Action("Sofia", "Home"));
    })
)
```
{% if site.core %}
```TagHelper
<kendo-tabstrip name="tabstrip">
    <items>
        <tabstrip-item text="Paris"
                       content-url="@Url.Action("Paris", "Home")"
                       data="additionalData"
                       type="POST">
        </tabstrip-item>
        <tabstrip-item text="Sofia"
                       content-url="@Url.Action("Paris", "Home")">
        </tabstrip-item>
    </items>
</kendo-tabstrip>

```
{% endif %}
```JavaScript
    function additionalData(){
        return {
            myParam: "myValue"
        }
    }
```


## Scrollable Content

By default, the containers of the TabStrip content are scrollable which enables a TabStrip with a fixed height and large content that cannot fit to display scrollbars. You can also disable the scrolling of the TabStrip content which is useful when the TabStrip hosts a widget (such as a Menu) that needs to overflow the TabStrip. To disable the scrolling of the TabStrip content, use the [`Scrollable(false)`](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip/configuration/scrollable#scrollable) method of the Kendo UI for jQuery widget.

Depending on the browser, you can reset the scroll position of the content when the active tab is changed. To persist the scroll position, use the [`select`](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip/events/select) event of the Kendo UI for jQuery widget to save the current scroll position and then the [`activate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip/events/activate) event to restore it.

```HtmlHelper
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
{% if site.core %}
```TagHelper
<kendo-tabstrip name="tabstrip">
    <scrollable enabled="false"/>
    <items>
        <tabstrip-item text="Paris"
                       content-url="@Url.Action("Paris", "Home")">
        </tabstrip-item>
        <tabstrip-item text="Sofia"
                       content-url="@Url.Action("Paris", "Home")">
        </tabstrip-item>
    </items>
</kendo-tabstrip>
```
{% endif %}

## See Also

* [Loading Content with AJAX in the TabStrip HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tabstrip/ajax)
* [Server-Side API](/api/tabstrip)
