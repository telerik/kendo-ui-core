---
title: Columns
page_title: TimeDurationPicker Columns
description: "Learn how configure the columns of the Telerik UI TimeDurationPicker component for {{ site.framework }}."
slug: htmlhelpers_timedurationpickerhelper_columns
position: 3
---

# TimeDurationPicker Columns

The Telerik UI TimeDurationPicker for {{ site.framework }} columns configuration is mandatory and must always be configured.

The columns configuration enables you to specify which time portion columns will be visible in the TimeDurationPicker popup. Additionally, the configuration also enables you to specify format, min, max, and step values for each column individually.

## Setting the Columns

The columns configuration accepts the following time units:

* days
* hours
* minutes
* seconds
* milliseconds

```HtmlHelper
        @(Html.Kendo().TimeDurationPicker()
            .Name("timeDurationPicker")
            .Columns(c =>
            {
                c.Hours();
                c.Minutes();
                c.Seconds();
            })
        )
```
{% if site.core %}
The name configuration contains the name of the time unit the specific column will hold, and supports the following values:

* days
* hours
* minutes
* seconds
* milliseconds

```TagHelper
        <kendo-timedurationpicker name="timedurationpicker" separator=":">
            <timedurationpicker-columns>
                <timedurationpicker-column name="hours"></timedurationpicker-column>
                <timedurationpicker-column name="minutes"></timedurationpicker-column>
                <timedurationpicker-column name="seconds"></timedurationpicker-column>
            </timedurationpicker-columns>
        </kendo-timedurationpicker>
```
{% endif %}

## Format

The format configuration enables you to specify the format which will be used in the input of the component. Each column can have its own format.
```HtmlHelper
        @(Html.Kendo().TimeDurationPicker()
            .Name("timeDurationPicker")
            .Columns(c =>
            {
                c.Hours().Format("## hours ");
                c.Minutes().Format(" ## minutes ");
                c.Seconds().Format(" ## seconds");
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

## Min

The min configuration enables you to specify the minimum allowed value that can be selected for the specific column.

The following example showcases how to allow the user to select hour values starting from 6 and upwards.
```HtmlHelper
        @(Html.Kendo().TimeDurationPicker()
            .Name("timeDurationPicker")
            .Columns(c =>
            {
                c.Hours().Format("## hours ").Min(6);
                c.Minutes().Format(" ## minutes ").Min(15);
                c.Seconds().Format(" ## seconds").Min(10);
            })
            .Separator(":")
        )
```
{% if site.core %}

```TagHelper
        <kendo-timedurationpicker name="timedurationpicker" separator=":">
            <timedurationpicker-columns>
                <timedurationpicker-column name="hours" format="## hours " min="8"></timedurationpicker-column>
                <timedurationpicker-column name="minutes" format=" ## minutes" min="15"></timedurationpicker-column>
                <timedurationpicker-column name="seconds" format=" ## seconds" min="10"></timedurationpicker-column>
            </timedurationpicker-columns>
        </kendo-timedurationpicker>
```
{% endif %}

## Max

The max configuration enables you to specify the maximum allowed value that can be selected for the specific column.

The following example showcases how to allow the user to select hour values between 6 and 12.
```HtmlHelper
        @(Html.Kendo().TimeDurationPicker()
            .Name("timeDurationPicker")
            .Columns(c =>
            {
                c.Hours().Format("## hours ").Min(6).Max(12);
                c.Minutes().Format(" ## minutes ").Min(15).Max(45);
                c.Seconds().Format(" ## seconds").Min(10).Max(50);
            })
            .Separator(":")
        )
```
{% if site.core %}

```TagHelper
        <kendo-timedurationpicker name="timedurationpicker" separator=":">
            <timedurationpicker-columns>
                <timedurationpicker-column name="hours" format="## hours " min="6" max="12"></timedurationpicker-column>
                <timedurationpicker-column name="minutes" format=" ## minutes" min="15" max="45"></timedurationpicker-column>
                <timedurationpicker-column name="seconds" format=" ## seconds" min="10" max="50"></timedurationpicker-column>
            </timedurationpicker-columns>
        </kendo-timedurationpicker>
```
{% endif %}

## Step

The step configuration enables you to specify the step value of the column. For example, if the hour step value is set to 2, the popup will display the available hours in the following manner—2, 4, 6, 8, 10, 12.
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
                <timedurationpicker-column name="hours" format="## hours " min="8" max="11"></timedurationpicker-column>
                <timedurationpicker-column name="minutes" format=" ## minutes" min="15" max="45" step="5"></timedurationpicker-column>
                <timedurationpicker-column name="seconds" format=" ## seconds" min="10" max="50" step="10"></timedurationpicker-column>
            </timedurationpicker-columns>
        </kendo-timedurationpicker>
```
{% endif %}

## See Also

* [Using the TimeDurationPicker for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timedurationpicker)
* [Using the API of the TimeDurationPicker for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timedurationpicker/api)
* [Server-Side API](/api/timedurationpicker)
