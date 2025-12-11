---
title: Animations
page_title: ActionSheet Documentation - Animations
description: "Learn how to control the animations in the Telerik UI ActionSheet component for {{ site.framework }}."
components: ["actionsheet"]
slug: htmlhelpers_animations_actionsheet
position: 4
---

# Animations

The ActionSheet in [adaptive mode](/api/kendo.mvc.ui.fluent/actionsheetbuilder#adaptivesystemboolean) supports opening and closing animations. 

By default, the ActionSheet animations are disabled, and the component opens and closes instantly.

You can modify the opening and closing animations through the `Open` and `Close` options of the `Animation` configuration. These properties are effective only when the `Adaptive` mode is enabled.

The following example demonstrates how to specify animation effects with duration when the ActionSheet opens and closes.

```HtmlHelper
    @(Html.Kendo().ActionSheet()
        .Name("actionsheet")
        .Title("Select item")
        .Animation(animation =>
        {
            animation.Enable(true);
            animation.Open(config =>
            {
                config.Expand();
                config.Fade(FadeDirection.In);
                config.Duration(AnimationDuration.Slow);
                config.Zoom(ZoomDirection.In);
            })
            .Close(config =>
            {
                config.Fade(FadeDirection.Out);
                config.Duration(AnimationDuration.Fast);
            });
        })
        .Adaptive(true)
        .Items(items =>
        {
            // add actionsheet items
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-actionsheet name="actionsheet" title="Select item" adaptive="true">
        <popup-animation>
            <open effects="expand:vertical fade:in zoom:in" duration="600"/>
            <open effects="fade:out" duration="200" />
        </popup-animation>
        <items>
            @* add actionsheet items *@
        </items>
    </kendo-actionsheet>
```
{% endif %}

## See Also

* [Using Animations in the ActionSheet for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/actionsheet/animation)
* [Server-Side API of the ActionSheet HtmlHelper](/api/actionsheet)
{% if site.core %}
* [Server-Side API of the ActionSheet TagHelper](/api/taghelpers/actionsheet)
{% endif %}
* [Client-Side API of the ActionSheet](https://docs.telerik.com/kendo-ui/api/javascript/ui/actionsheet)