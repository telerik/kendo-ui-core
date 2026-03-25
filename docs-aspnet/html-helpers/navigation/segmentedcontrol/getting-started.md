---
title: Getting Started
page_title: SegmentedControl Getting Started
description: "Make your first steps with the Telerik UI for {{ site.framework }} SegmentedControl component by following a complete step-by-step tutorial."
components: ["segmentedcontrol"]
slug: htmlhelpers_segmentedcontrol_getting_started
position: 1
---

# Getting Started with the SegmentedControl

This tutorial explains how to set up a basic Telerik UI for {{ site.framework }} SegmentedControl and highlights the major steps in the configuration of the component.

You will initialize a SegmentedControl with several items, configure icons, set a default selection, and handle the `Change` event.{% if site.core %} Finally, you can run the sample code in [Telerik REPL](https://netcorerepl.telerik.com/) and continue exploring the components.{% endif %}

@[template](/_contentTemplates/core/getting-started-prerequisites.md#repl-component-gs-prerequisites)

## 1. Prepare the CSHTML File

The first step is to add the required directives at the top of the `.cshtml` document:

* To use the Telerik UI for {{ site.framework }} HtmlHelpers:

    ```
    @using Kendo.Mvc.UI
    ```
{% if site.core %}
* To use the Telerik UI for {{ site.framework }} TagHelpers:

    ```
    @addTagHelper *, Kendo.Mvc
    ```
{% endif %}

## 2. Initialize the SegmentedControl

Use the SegmentedControl HtmlHelper {% if site.core %}or TagHelper {% endif %}to add the component to a page. The `Name()` configuration method is mandatory as its value is used for the `id` and the `name` attributes of the SegmentedControl element.

```HtmlHelper
@using Kendo.Mvc.UI

@(Html.Kendo().SegmentedControl()
    .Name("segmentedControl")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-segmentedcontrol name="segmentedControl">
</kendo-segmentedcontrol>
```
{% endif %}

## 3. Add Items

Use the [`Items()`](/api/kendo.mvc.ui.fluent/segmentedcontrolbuilder#itemssystemactionkendomvcuifluentsegeentedcontrolitemfactory) configuration to define the selectable segments. Each item requires a `Text()` and a `Value()`.

```HtmlHelper
@using Kendo.Mvc.UI

@(Html.Kendo().SegmentedControl()
    .Name("segmentedControl")
    .Items(items =>
    {
        items.Add().Text("Day").Value("day");
        items.Add().Text("Week").Value("week");
        items.Add().Text("Month").Value("month");
    })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-segmentedcontrol name="segmentedControl">
    <items>
        <item text="Day" value="day"></item>
        <item text="Week" value="week"></item>
        <item text="Month" value="month"></item>
    </items>
</kendo-segmentedcontrol>
```
{% endif %}

## 4. Add Icons

Enhance the visual representation of the items by adding icons with the [`Icon()`](/api/kendo.mvc.ui.fluent/segmentedcontrolitembuilder#iconsystemstring) option.

```HtmlHelper
@using Kendo.Mvc.UI

@(Html.Kendo().SegmentedControl()
    .Name("segmentedControl")
    .Items(items =>
    {
        items.Add().Text("Day").Value("day").Icon("calendar");
        items.Add().Text("Week").Value("week").Icon("clock");
        items.Add().Text("Month").Value("month").Icon("calendar-date");
    })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-segmentedcontrol name="segmentedControl">
    <items>
        <item text="Day" value="day" icon="calendar"></item>
        <item text="Week" value="week" icon="clock"></item>
        <item text="Month" value="month" icon="calendar-date"></item>
    </items>
</kendo-segmentedcontrol>
```
{% endif %}

## 5. Set a Default Selection

Use `SelectedValue()` to pre-select one of the items when the component renders.

```HtmlHelper
@using Kendo.Mvc.UI

@(Html.Kendo().SegmentedControl()
    .Name("segmentedControl")
    .Items(items =>
    {
        items.Add().Text("Day").Value("day").Icon("calendar");
        items.Add().Text("Week").Value("week").Icon("clock");
        items.Add().Text("Month").Value("month").Icon("calendar-date");
    })
    .SelectedValue("week")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-segmentedcontrol name="segmentedControl" selected-value="week">
    <items>
        <item text="Day" value="day" icon="calendar"></item>
        <item text="Week" value="week" icon="clock"></item>
        <item text="Month" value="month" icon="calendar-date"></item>
    </items>
</kendo-segmentedcontrol>
```
{% endif %}

## 6. Handle the Change Event

Use the `Events()` configuration to subscribe to the [`Change`](/api/kendo.mvc.ui.fluent/segmentedcontroleventbuilder#changesystemstring) event and react when the user selects a different segment.

```HtmlHelper
@using Kendo.Mvc.UI

@(Html.Kendo().SegmentedControl()
    .Name("segmentedControl")
    .Items(items =>
    {
        items.Add().Text("Day").Value("day").Icon("calendar");
        items.Add().Text("Week").Value("week").Icon("clock");
        items.Add().Text("Month").Value("month").Icon("calendar-date");
    })
    .SelectedValue("week")
    .Events(ev => ev.Change("onChange"))
)

<script>
    function onChange(e) {
        console.log("Selected value: " + e.value);
    }
</script>
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-segmentedcontrol name="segmentedControl" selected-value="week" on-change="onChange">
    <items>
        <item text="Day" value="day" icon="calendar"></item>
        <item text="Week" value="week" icon="clock"></item>
        <item text="Month" value="month" icon="calendar-date"></item>
    </items>
</kendo-segmentedcontrol>

<script>
    function onChange(e) {
        console.log("Selected value: " + e.value);
    }
</script>
```
{% endif %}

## Next Steps

* [Referencing Existing Component Instances](https://docs.telerik.com/kendo-ui/intro/widget-basics/events-and-methods#referencing-existing-component-instances)
* [Demo Page for the SegmentedControl](https://demos.telerik.com/{{ site.platform }}/segmentedcontrol)

## See Also

* [Using the API of the SegmentedControl for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/segmentedcontrol/api)
* [Client-Side API of the SegmentedControl](https://docs.telerik.com/kendo-ui/api/javascript/ui/segmentedcontrol)
* [Server-Side API of the SegmentedControl HtmlHelper for {{ site.framework }}](/api/segmentedcontrol)
* [Knowledge Base Section](/knowledge-base)
