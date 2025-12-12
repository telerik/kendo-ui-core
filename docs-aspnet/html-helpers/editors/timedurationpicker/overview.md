---
title: Overview
page_title: TimeDurationPicker Overview
description: "Discover the Telerik UI TimeDurationPicker component for {{ site.framework }} that allows you to configure the appearance of the popup and its displayed columns."
components: ["timedurationpicker"]
slug: htmlhelpers_timedurationpickerhelper_overview
position: 1
---

# {{ site.framework }} TimeDurationPicker Overview

{% if site.core %}
The Telerik UI TimeDurationPicker TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI TimeDurationPicker widget.
{% else %}
The Telerik UI TimeDurationPicker HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI TimeDurationPicker widget.
{% endif %}

The TimeDurationPicker component enables the end user to select a time range stored in milliseconds.

* [Demo page for the TimeDurationPicker](https://demos.telerik.com/{{ site.platform }}/timedurationpicker/index)

## Initializing the TimeDurationPicker

The following example demonstrates how to define the TimeDurationPicker.

```HtmlHelper
        @(Html.Kendo().TimeDurationPicker()
			.Name("timeDurationPicker")
        )
```
{% if site.core %}
```TagHelper
            <kendo-timedurationpicker name="timedurationpicker"></kendo-timedurationpicker>
```
{% endif %}

{% if site.core %}
@[template](/_contentTemplates/core/declarative-initialization-note.md#declarative-initialization-note)
{% endif %}

## Basic Configuration

To configure the TimeDurationPicker, pass the configuration options as attributes of the helper.

```HtmlHelper
        @(Html.Kendo().TimeDurationPicker()
			.Name("timeDurationPicker")
			.Columns(c =>
			{
				c.Hours().Format("## hours ").Min(8).Max(11);
				c.Minutes().Format(" ## minutes ").Min(15).Max(45).Step(5);
				c.Seconds().Format(" ## seconds").Min(10).Max(50).Step(10);
			})
			.Separator(":")
        )
```
{% if site.core %}
```TagHelper
        <kendo-timedurationpicker name="timedurationpicker" separator=":">
            <timedurationpicker-columns>
                <timedurationpicker-column name="hours" format="## hours "></timedurationpicker-column>
                <timedurationpicker-column name="minutes" format=" ## minutes"></timedurationpicker-column>
                <timedurationpicker-column name="seconds" format=" ## seconds"></timedurationpicker-column>
            </timedurationpicker-columns>
        </kendo-timedurationpicker>
```
{% endif %}

## Functionality and Features

* [Columns]({% slug htmlhelpers_timedurationpickerhelper_columns %})&mdash;The TimeDurationPicker allows you to configure the columns displayed in the popup and apply formatting to the input value.
* [Shortcuts]({% slug htmlhelpers_timedurationpickerhelper_shortcuts %})&mdash;You can add TimeDurationPicker buttons that hold certain time frame values.
* [Appearance]({% slug htmlhelpers_timedurationpickerhelper_appearance %})&mdash;You can use various built-in styling options that control the appearance of the TimeDurationPicker.
* [Adaptiveness]({% slug htmlhelpers_timedurationpicker_adaptive_mode_aspnetcore %})&mdash;The TimeDurationPicker supports adaptive mode that provides mobile-friendly rendering by automatically adjusting its popup layout based on screen size.
* [Model Binding]({% slug htmlhelpers_timedurationpickerhelper_model_binding %})&mdash;Bind the TimeDurationPicker to a model field of type `decimal?` and configure the input mode and columns.
* [Events]({% slug htmlhelpers_timedurationpickerhelper_events %})&mdash;Handling the events of the TimeDurationPicker allows you to implement custom functionality.
* [Accessibility]({% slug htmlhelpers_timedurationpicker_accessibility %})&mdash;The TimeDurationPicker is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and [keyboard support]({% slug htmlhelpers_timedurationpickerhelper_keyboard_navigation %}).

## Next Steps

* [Getting Started with the TimeDurationPicker]({% slug htmlhelpers_timedurationpickerhelper_getting_started %})
* [Basic Usage of the TimeDurationPicker for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timedurationpicker)
{% if site.core %}
* [TimeDurationPicker in Razor Pages]({%slug htmlhelpers_timedurationpickerhelper_razorpage_aspnetcore%})
{% endif %}



## See Also

* [Configuring the TimeDurationPicker Columns]({% slug htmlhelpers_timedurationpickerhelper_columns %})
* [Using the API of the TimeDurationPicker for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timedurationpicker/api)
* [Knowledge Base Section](/knowledge-base)
