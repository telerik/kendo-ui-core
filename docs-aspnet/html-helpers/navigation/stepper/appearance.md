---
title: Appearance
page_title: Appearance
description: "Learn how to enable editing and alter the Steps value."
components: ["stepper"]
slug: htmlhelpers_stepper_aspnetcore_appearance
position: 4
---

# Appearance

The {{ site.product }} Stepper is rendered horizontally with an indictor element and a label for each Step. The Stepper provides the possibility to customize all of these configurations

## Orientation

The orientation of the Stepper widget could be configured via the `orientation` configuration property.

The following example demonstrates how to initialize a vertical Stepper.

```HtmlHelper
    @(Html.Kendo().Stepper()
        .Name("stepper")
        .Orientation(StepperOrientationType.Vertical)
        .Steps(s =>
        {
            s.Add().Label("First Step");
            s.Add().Label("Second Step");
            s.Add().Label("Third Step");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-stepper name="stepper" orientation="@StepperOrientationType.Vertical">
        <steps>
            <step label="First"></step>
            <step label="Second"></step>
            <step label="Third"></step>
        </steps>
    </kendo-stepper>
```
{% endif %}

## Layout

By default both the label and indicator of each Step are displayed. The Stepper layout could be configured via the `label` and `indicator` configuration properties.

The following example demonstrates how to initialize a Stepper with only indicator elements displayed.

```HtmlHelper
    @(Html.Kendo().Stepper()
        .Name("stepper")
        .Label(false)
        .Indicator(true)
        .Steps(s =>
        {
            s.Add().Label("First Step");
            s.Add().Label("Second Step");
            s.Add().Label("Third Step");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-stepper name="stepper" label="false" indicator="true">
        <steps>
            <step label="First"></step>
            <step label="Second"></step>
            <step label="Third"></step>
        </steps>
    </kendo-stepper>
```
{% endif %}

## See Also

* [Basic Usage of the Stepper HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/stepper/index)
