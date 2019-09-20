---
title: PanelBar
page_title: Migrating the PanelBar Extension | Telerik UI for ASP.NET MVC
description: "Handle the Telerik UI ASP.NET MVC server-side API for migrating the PanelBar Extension."
previous_url: /migration/widgets/panelbar
slug: panelbar_migrationextensions_aspnetmvc
---

# Migrating the PanelBar Extension

To migrate the Telerik UI PanelBar Extension for ASP.NET MVC to Telerik UI for ASP.NET MVC, use the available and updated API.

* The following example demonstrates the change when setting the animations.

    ```Previous

        Html.Telerik().PanelBar().Name("SamplePanelBar").Effects(effects => effects.Slide())
    ```
    ```Current

        Html.Kendo().PanelBar().Name("SamplePanelBar").Animation(animation => animation.Open(open => open.FadeIn(FadeDirection.Down))
    ```

* Telerik UI for ASP.NET MVC does not support action syntax, that is, `“() => {}”`. The helpers do not feature the `OnLoad` event anymore and require you to use `$(document).ready()` instead.

```Previous

    Html.Telerik().PanelBar().Name("SamplePanelBar").ClientEvents(events => events.OnChange(“change”))
```
```Current

    Html.Kendo().PanelBar().Name("SamplePanelBar").Events(events => events.Change(“change”))
```

## See Also

* [Migrating the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrating from Telerik UI Extensions (Overview of Changes)]({% slug overview_migrationextensions_aspnetmvc %})
