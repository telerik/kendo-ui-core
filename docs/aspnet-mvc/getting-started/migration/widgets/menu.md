---
title: Menu
page_title: Menu | Migrate from Telerik Extensions
description: "Handle ASP.NET MVC server-side API for the Kendo UI Menu widget."
slug: menu_migrationextensions_aspnetmvc
---

# Menu Migration

This article demonstrates the ASP.NET MVC server-side API for the Kendo UI Menu widget.

## Server-Side API

### Animations

```tab-Previous

    Html.Telerik().Menu().Name("SampleMenu")
        .Effects(effects => effects.Slide())
```
```tab-Current
    Html.Kendo().Menu().Name("SampleMenu")
        .Animation(animation => animation
            .Open(open => open.FadeIn(FadeDirection.Down)
        )
```

## Client-side API

### Events

Kendo UI Complete for ASP.NET MVC does not support action syntax, that is, `“() => {}”`.

None of the widgets features the `OnLoad` event anymore. Use the `$(document).ready()` instead.

```tab-Previous

    Html.Telerik().Menu().Name("Menu")
        .ClientEvents(events => events
            .OnChange(“change”)
        )
```
```tab-Current
    Html.Kendo().Menu().Name("Menu")
        .Events(events => events
            .Change(“change”)
        )
```
## See Also

Other articles on migrating from Telerik Extensions:

* [Migrate the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrate the Calendar]({% slug calendar_migrationextensions_aspnetmvc %})
* [Migrate the Chart]({% slug chart_migrationextensions_aspnetmvc %})

To see the articles on migrating Кendo UI controls from Telerik Extensions, browse [this section]({% slug combobox_migrationextensions_aspnetmvc %}).
