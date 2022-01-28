---
title: Default State
page_title: ExpansionPanel Default State
description: "Learn how to enable and use the default state functionality of the Telerik UI ExpansionPanel HtmlHelper for {{ site.framework }}"
slug: state_htmlhelpers_expansionpanel_aspnetcore
position: 2
---

# ExpansionPanel Default State

You can configure the default state of the Telerik UI ExpansionPanel HtmlHelper for {{ site.framework }} by using the `Disabled`, `Expanded`, `Toggleable` and `Animation` properties.

## ExpansionPanel Disabled State

You can disable the Kendo UI ExpansionPanel component and make the user unable to expand or collapse the panel. To configure this state, set the [`Disabled`](/api/Kendo.Mvc.UI.Fluent/ExpansionPanelBuilder#disabledsystemboolean) property to `true`.

```Razor
@(Html.Kendo().ExpansionPanel()
            .Name("brazil")
            .Title("Brazil")
            .SubTitle("South America")
            .Disabled(true)
            .Content("...")
            )
```

## ExpansionPanel Expanded State

The Kendo UI ExpansionPanel component can be expanded by default. To configure this state, set the [`Expanded`](/api/Kendo.Mvc.UI.Fluent/ExpansionPanelBuilder#expandedsystemboolean) property to `true`.

```Razor
@(Html.Kendo().ExpansionPanel()
            .Name("brazil")
            .Title("Brazil")
            .SubTitle("South America")
            .Expanded(true)
            .Content("...")
            )
```

## ExpansionPanel Toggleable State

By default, the user can expand or collapse the ExpansionPanel. To prevent this, set the [`Toggleable`](/Kendo.Mvc.UI.Fluent/ExpansionPanelBuilder#toggleablesystemboolean) property to `false`.

```Razor
@(Html.Kendo().ExpansionPanel()
            .Name("brazil")
            .Title("Brazil")
            .SubTitle("South America")
            .Toggleable(false)
            .Content("...")
            )
```

## ExpansionPanel Animation State

You can disable the ExpansionPanel visual animations that appear when the user expands or collapses the panel. To disable the animations, set the [`Animation`](/api/Kendo.Mvc.UI.Fluent/ExpansionPanelBuilder#animationsystemboolean) property to `false`.

```Razor
@(Html.Kendo().ExpansionPanel()
            .Name("brazil")
            .Title("Brazil")
            .SubTitle("South America")
            Animation(false)
            .Content("...")
            )
```

## See Also

* [Overview of the ExpansionPanel (Demo)](https://demos.telerik.com/{{ site.platform }}/expansionpanel/index)
* [Client-side API Reference of the TileLayout](/api/expansionpanel)
* [Keyboard Navigation]({% slug keynav_htmlhelpers_expansionpanel_aspnetcore %})
