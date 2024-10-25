---
title: Date Editing
page_title: Date Editing
description: "Learn the basic date editing when working with the Telerik UI DateInput component for {{ site.framework }}."
slug: dateinput_date_editing
position: 2
---

# Date Editing

The Telerik UI DateInput for {{ site.framework }} exposes several configuration methods that allow you to control the behavior of the component when a user edits the date.

## Auto-Switch Parts

The following example demonstrates how to enable switching to the next segment of the date automatically when a valid input is set with the `AutoSwitchParts` configuration method.

```HtmlHelper
    @(Html.Kendo().DateInput()
        .Name("dateinput")
        .AutoSwitchParts(true)
    )
```
{% if site.core %}
```TagHelper
    <kendo-dateinput name="dateinput" auto-switch-parts="false">
    </kendo-dateinput>
```
{% endif %}

## Auto-Switch Keys

The `AutoSwitchKeys` configuration enables you to set up custom symbols that switch to the next segment of the date when entered.

```HtmlHelper
    @(Html.Kendo().DateInput()
        .Name("dateinput")
        .AutoSwitchKeys(new string[]{"+"})
    )
```
{% if site.core %}
```TagHelper
    <kendo-dateinput name="dateinput" 
        auto-switch-keys='new string[] { "+" }'>
    </kendo-dateinput>
```
{% endif %}

## Mouse Wheel 

When set to `true`, the `EnableMouseWheel` setting allows the user to change the selected date segment by scrolling the mouse wheel.

```HtmlHelper
    @(Html.Kendo().DateInput()
        .Name("dateinput")
        .EnableMouseWheel(true)
    )
```
{% if site.core %}
```TagHelper
    <kendo-dateinput name="dateinput" 
        enable-mouse-wheel="true">
    </kendo-dateinput>
```
{% endif %}

## Auto-Correct

The `AutoCorrect` configuration turns on or off auto-correct of the date segments.

```HtmlHelper
    @(Html.Kendo().DateInput()
        .Name("dateinput")
        .AutoCorrect(true)
    )
```
{% if site.core %}
```TagHelper
    <kendo-dateinput name="dateinput" auto-correct="true">
    </kendo-dateinput>
```
{% endif %}

## Steps

The following example demonstrates how to configure the step change for each date segment when the user navigates with the mouse wheel or the keyboard arrows. Based on the preferred format of the DateInput's date, the available `Step` configurations are `Year`, `Month`, `Day`, `Minute`, `Second`, and `Millisecond`.

```HtmlHelper
    @(Html.Kendo().DateInput()
        .Name("dateinput")
        .Steps(steps=>{
            steps.Year(4);
            steps.Month(6);
            steps.Day(14);
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-dateinput name="dateinput">
        <steps year="4" month="6" day="14" />
    </kendo-dateinput>
```
{% endif %}

## See Also

* [Date Editing of the DateInput for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dateinput/date-editing)
* [Using the API of the DateInput for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dateinput/api)
* [Client-Side API of the DateInput](https://docs.telerik.com/kendo-ui/api/javascript/ui/dateinput)
* [Server-Side API](/api/dateinput)
* [Knowledge Base Section](/knowledge-base)
