---
title: TabStrip
page_title: Migrating the TabStrip Extension | Telerik UI for ASP.NET MVC
description: "Handle the Telerik UI ASP.NET MVC server-side API for migrating the TabStrip Extension."
previous_url: /migration/widgets/tabstrip
slug: tabtrip_migrationextensions_aspnetmvc
---

# Migrating the TabStrip Extension

To migrate the Telerik UI TabStrip Extension for ASP.NET MVC to Telerik UI for ASP.NET MVC, use the available and updated API.

* The following example demonstrates the change when setting the animations.

    ```Previous

        Html.Telerik().TabStrip().Name("SampleTabStrip").Effects(effects => effects.Slide())
    ```
    ```Current

        Html.Kendo().TabStrip().Name("SampleTabStrip").Animation(animation => animation.Open(open => open.FadeIn(FadeDirection.Down))
    ```

* Telerik UI for ASP.NET MVC does not support action syntax, that is, `“() => {}”`. The helpers do not feature the `OnLoad` event anymore and require you to use `$(document).ready()` instead.

    ```Previous

        Html.Telerik().TabStrip().Name("SampleTabStrip").ClientEvents(events => events.OnChange(“change”))
    ```
    ```Current

        Html.Kendo().TabStrip().Name("SampleTabStrip").Events(events => events.Change(“change”))
    ```

## See Also

* [Migrating the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrating from Telerik UI Extensions (Overview of Changes)]({% slug overview_migrationextensions_aspnetmvc %})
