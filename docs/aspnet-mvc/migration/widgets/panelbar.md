---
title: PanelBar
page_title: Help guide for Kendo UI PanelBar widget server-side API
description: Learn more about animations and events in the API for Kendo UI PanelBar component with ASP.NET MVC.
---

# Server-Side API

Animations:

#### Old

    Html.Telerik().PanelBar().Name("SamplePanelBar").Effects(effects => effects.Slide())

#### New

    Html.Kendo().PanelBar().Name("SamplePanelBar").Animation(animation => animation.Open(open => open.FadeIn(FadeDirection.Down))

# Client-Side API

## Events

KendoUI Complete for ASP.NET MVC does not support action syntax i.e. “() => {}”.

All Widgets No Longer Have The OnLoad Event. Please Use **$(document).ready()** Instead.

#### Old

    Html.Telerik().PanelBar().Name("SamplePanelBar").ClientEvents(events => events.OnChange(“change”))

#### New

    Html.Kendo().PanelBar().Name("SamplePanelBar").Events(events => events.Change(“change”))

## See Also

Other articles on migrating from Telerik Extensions:

* [Migrate the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrate the Calendar]({% slug calendar_migrationextensions_aspnetmvc %})
* [Migrate the Chart]({% slug chart_migrationextensions_aspnetmvc %})

To see the articles on migrating kendo UI controls from Telerik Extensions, browse [this section]({% slug combobox_migrationextensions_aspnetmvc %}).
