---
title: Menu
page_title: API documentation for Kendo UI jQuery Menu control with ASP.NET MVC
description: Documentation and code examples about server-side and client-side API for Kendo UI Menu component.
---

# Server-side API

Animations:

#### Old

    Html.Telerik().Menu().Name("SampleMenu").Effects(effects => effects.Slide())

#### New

    Html.Kendo().Menu().Name("SampleMenu").Animation(animation => animation.Open(open => open.FadeIn(FadeDirection.Down))

# Client-side API

## Events

KendoUI Complete for ASP.NET MVC does not support action syntax i.e. “() => {}”.

All Widgets No Longer Have the OnLoad Event. Please Use **$(Document).Ready()** Instead.

#### Old

    Html.Telerik().Menu().Name("Menu").ClientEvents(events => events.OnChange(“change”))

#### New

    Html.Kendo().Menu().Name("Menu").Events(events => events.Change(“change”))

## See Also

Other articles on migrating from Telerik Extensions:

* [Migrate the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrate the Calendar]({% slug calendar_migrationextensions_aspnetmvc %})
* [Migrate the Chart]({% slug chart_migrationextensions_aspnetmvc %})

To see the articles on migrating kendo UI controls from Telerik Extensions, browse [this section]({% slug combobox_migrationextensions_aspnetmvc %}).
