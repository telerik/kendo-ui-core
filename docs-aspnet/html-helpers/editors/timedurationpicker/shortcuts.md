---
title: Shortcuts
page_title: TimeDurationPicker Shortcuts
description: "Learn how to use the shortcuts of the TimeDurationPicker component for {{ site.framework }}."
slug: htmlhelpers_timedurationpickerhelper_shortcuts
position: 5
---

# TimeDurationPicker Shortcuts

The shortcuts configuration of the Kendo UI for {{ site.framework }} TimeDurationPicker enables you to render custom button elements in the popup.

These buttons can hold time frame values. Upon clicking any of them, the value of the TimeDurationPicker will be updated with the value of the corresponding button. You have to specify the value of the shortcuts in milliseconds.

The following example showcases how to define a shortcut:
```HtmlHelper
        @(Html.Kendo().TimeDurationPicker()
        .Name("timeDurationPicker")
        .Columns(c =>
        {
            c.Hours().Format("## hours ");
            c.Minutes().Format(" ## minutes ");
        })
        .Shortcuts(s =>
        {
            s.Add().Text("1h 30min").Value(5400000);
            s.Add().Text("2h 30min").Value(9000000);
            s.Add().Text("4 hours").Value(14400000);
        })
        .Separator(":")
    )
```
{% if site.core %}

```TagHelper
<div class="k-d-flex k-justify-content-center" style="padding-top: 54px;">
    <div class="k-w-300">
        <kendo-timedurationpicker name="timedurationpicker" separator=":">
            <shortcuts>
                <shortcut text="1h 30min" value="5400000"></shortcut>
                <shortcut text="2h 30min" value="9000000"></shortcut>
                <shortcut text="4 hours" value="14400000"></shortcut>
            </shortcuts>
            <timedurationpicker-columns>
                <timedurationpicker-column name="hours" format="## hours "></timedurationpicker-column>
                <timedurationpicker-column name="minutes" format=" ## minutes"></timedurationpicker-column>
            </timedurationpicker-columns>
        </kendo-timedurationpicker>
    </div>
</div>
```
{% endif %}


## See Also

* [Overview by the TimeDurationPicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timedurationpicker)
* [Using the API of the TimeDurationPicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timedurationpicker/api)
* [Server-Side API](/api/timedurationpicker)
