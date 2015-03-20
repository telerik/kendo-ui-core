---
title: TabStrip
page_title: API documentation for Kendo UI TabStrip widget for ASP.NET MVC
description: With this document you will learn how to create animations in the server-side API of Kendo UI TabStrip helper and trigger events in the client-side API.
---

# Server-Side API

Animations:

#### Old

    Html.Telerik().TabStrip().Name("SampleTabStrip").Effects(effects => effects.Slide())

#### New

    Html.Kendo().TabStrip().Name("SampleTabStrip").Animation(animation => animation.Open(open => open.FadeIn(FadeDirection.Down))

# Client-Side API

## Events

Kendoui Complete for Asp.Net Mvc Does Not Support Action Syntax i.e. “() => {}”.

All Widgets No Longer Have The OnLoad Event. Please Use **$(document).ready()** Instead.

#### Old

    Html.Telerik().TabStrip().Name("SampleTabStrip").ClientEvents(events => events.OnChange(“change”))

#### New

    Html.Kendo().TabStrip().Name("SampleTabStrip").Events(events => events.Change(“change”))