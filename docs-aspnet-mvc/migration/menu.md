---
title: Menu
page_title: Migrating the Menu Extension | Telerik UI for ASP.NET MVC
description: "Handle the Telerik UI ASP.NET MVC server-side API for migrating the Menu Extension."
previous_url: /migration/widgets/menu
slug: menu_migrationextensions_aspnetmvc
---

# Migrating the Menu Extension

To migrate the Telerik UI Menu Extension for ASP.NET MVC to Telerik UI for ASP.NET MVC, use the available and updated API.

* The following example demonstrates the change when working with animations.

    ```Previous

        Html.Telerik().Menu().Name("SampleMenu")
            .Effects(effects => effects.Slide())
    ```
    ```Current
        Html.Kendo().Menu().Name("SampleMenu")
            .Animation(animation => animation
                .Open(open => open.FadeIn(FadeDirection.Down)
            )
    ```

* Telerik UI for ASP.NET MVC does not support action syntax, that is, `“() => {}”`. The helpers do not feature the `OnLoad` event anymore and require you to use `$(document).ready()` instead.

```Previous

    Html.Telerik().Menu().Name("Menu")
        .ClientEvents(events => events
            .OnChange(“change”)
        )
```
```Current
    Html.Kendo().Menu().Name("Menu")
        .Events(events => events
            .Change(“change”)
        )
```

## See Also

* [Migrating the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrating from Telerik UI Extensions (Overview of Changes)]({% slug overview_migrationextensions_aspnetmvc %})
