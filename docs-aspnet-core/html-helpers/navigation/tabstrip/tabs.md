---
title: Tabs
page_title: TabStrip Tabs | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the configuration options for the Kendo UI TabStrip tabs."
slug: htmlhelpers_tabstrip_aspnetcore_tabs
position: 2
---

# TabStrip Tabs

The TabStrip widget offers some advanced functionality on its tabs that can be adjusted to meet your needs.

## Dynamic Tabs

The TabStrip API provides methods for dynamically adding or removing TabStrip bars. To add items, first you should obtain a reference to the TabStrip widget in JavaScript. Then you should provide the new item as a JSON object along with a reference item. A reference item is a target tab HTML element that already exists in the TabStrip. The reference item will be used to determine the exact position of the new tab. Any valid jQuery selector can be used to obtain a reference to the target item.

For more information on configuring TabStrip items, see the [Kendo UI TabStrip API demo](https://demos.telerik.com/kendo-ui/tabstrip/api).

The example below demonstrates how to add a new TabStrip tab and position it after the firs existing tab.

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

The TabStrip supports scrollable tabs for [`TabPosition()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip/configuration/tabposition) of "top" and "bottom". During initialization, the widget checks if the tabs fit in the available horizontal space and if not, scroll buttons will appear on the widget sides. This behavior is enabled by default, but can be disabled using the [`Scrollable(false)`](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip/configuration/scrollable) configuration method.

If the TabStrip has no fixed width and is placed in a fluid layout, it can re-check whether tab scrolling is necessary, or is no longer required. To achieve this, execute the widget's [resize()](https://docs.telerik.com/kendo-ui/api/javascript/ui/widget/methods/resize) method upon window.resize. The resize method will also show the right scroll button if the last and selected tab becomes invisible as a result of TabStrip shrinking.

###### Example

```
<div style="width: 150px;">
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
</div>
```

## Select Tab on Initial Load

It is possible to select a tab and display its associated content upon the initial load. To achieve the above, you could use one of the following two approaches:

* Use the `Selected()` configuration option on the required tab; or
* Use the `SelectedIndex()` configuration method on the TabStrip HTML helper.

The below example demonstrates the use of the `Selected()` configuration method:

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
            .Selected(true)
            .Content(@<text>
                <p>Sunny weather in Sofia.</p>
            </text>);
    })
)
```


## See Also

* [Overview of TabStrip HTML helper]({% slug htmlhelpers_tabstrip_aspnetcore %})
* [TabStrip Tab Content]({% slug htmlhelpers_tabstrip_aspnetcore_content %})
* [JavaScript API Reference of the TabStrip](http://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip)
* [TabStrip HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/tabstrip/overview)
* [TabStrip Official Demos](http://demos.telerik.com/aspnet-core/tabstrip/index)

