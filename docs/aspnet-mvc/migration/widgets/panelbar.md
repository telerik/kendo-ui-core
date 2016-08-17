---
title: PanelBar
page_title: PanelBar | Migrate from Telerik Extensions
description: "Handle ASP.NET MVC server-side API for the Kendo UI PanelBar widget."
slug: panelbar_migrationextensions_aspnetmvc
---

# PanelBar Migration

This article demonstrates the ASP.NET MVC server-side API for the Kendo UI PanelBar widget.

## Server-Side API

### Animations

```tab-Previous

    Html.Telerik().PanelBar().Name("SamplePanelBar").Effects(effects => effects.Slide())
```
```tab-Current

    Html.Kendo().PanelBar().Name("SamplePanelBar").Animation(animation => animation.Open(open => open.FadeIn(FadeDirection.Down))
```

## Client-Side API

### Events

Kendo UI Complete for ASP.NET MVC does not support action syntax, that is, `“() => {}”`.

None of the widgets features the `OnLoad` event anymore. Use the `$(document).ready()` instead.

```tab-Previous

    Html.Telerik().PanelBar().Name("SamplePanelBar").ClientEvents(events => events.OnChange(“change”))
```
```tab-Current

    Html.Kendo().PanelBar().Name("SamplePanelBar").Events(events => events.Change(“change”))
```

## See Also

Other articles on migrating from Telerik Extensions:

* [Migrate the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrate the Calendar]({% slug calendar_migrationextensions_aspnetmvc %})
* [Migrate the Chart]({% slug chart_migrationextensions_aspnetmvc %})

To see the articles on migrating Кendo UI controls from Telerik Extensions, browse [this section]({% slug combobox_migrationextensions_aspnetmvc %}).
