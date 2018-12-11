---
title: Tabs
page_title: Tabs | Kendo UI TabStrip HtmlHelper for ASP.NET Core
description: "Configure the tabs of the Kendo UI TabStrip HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_tabstrip_aspnetcore_tabs
position: 2
---

# Tabs

The TabStrip provides advanced options for configuring its tabs.

## Dynamic Tabs

The TabStrip API provides methods for dynamically adding or removing TabStrip bars.

To add TabStrip items

1. Obtain a reference to the TabStrip widget in JavaScript.
1. Provide the new item as a JSON object along with a reference item.

  A reference item is a target HTML `tab` element that already exists in the TabStrip. The reference item will be used to determine the exact position of the new tab. To obtain a reference to the target item, you can use any valid jQuery selector.

For more information on configuring TabStrip items, refer to the [demo on the TabStrip API](https://demos.telerik.com/kendo-ui/tabstrip/api).

The following example demonstrates how to add a new TabStrip tab and position it after the first existing tab.

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

The TabStrip supports scrollable `top` and `bottom` tabs through [`TabPosition()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip/configuration/tabposition). During initialization, the TabStrip checks if the tabs fit in the available horizontal space and if not, renders scroll buttons on the sides. By default, the scrollable tabs are enabled. To disable them, use the [`Scrollable(false)`](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip/configuration/scrollable) configuration method.

If the TabStrip has no fixed width and is placed in a fluid layout, it can re-check whether tab scrolling is necessary or no longer required. To enable this option, execute the [`resize()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/widget/methods/resize) method of the TabStrip upon `window.resize`. The `resize` method will also render the right scroll button if the last and selected tab becomes invisible as a result of TabStrip shrinking.

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

## Selecting Tab on Initial Load

It is possible to select a tab and display its associated content upon the initial load of the TabStrip.

To select a tab on initial load, apply either of the following approaches:

* Use the `Selected()` configuration option on the required tab.
* Use the `SelectedIndex()` configuration method on the TabStrip HTML helper.

The following example demonstrates how to use the `Selected()` configuration method.

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

* [Overview of TabStrip HTML Helper]({% slug htmlhelpers_tabstrip_aspnetcore %})
* [TabStrip Tab Content]({% slug htmlhelpers_tabstrip_aspnetcore_content %})
* [JavaScript API Reference of the TabStrip](http://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip)
* [TabStrip HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/tabstrip/overview)
* [TabStrip Official Demos](http://demos.telerik.com/aspnet-core/tabstrip/index)
