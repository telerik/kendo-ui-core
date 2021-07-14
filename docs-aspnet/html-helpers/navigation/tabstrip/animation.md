---
title: Animations
page_title: Animations
description: "Learn how to control the animations in the Telerik UI TabStrip HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_tabstrip_animations_aspnetcore
position: 8
---

# Animations

By default, the TabStrip uses animations to reveal the content of the tabs. You can modify these animations through the `Animation` configuration option.

The following example demonstrates how to configure the TabStrip animation:

```
@(Html.Kendo().TabStrip()
    .Name("tabstrip")
    .Animation(animation =>
    {
        animation.Enable(true);
        animation.Open(config =>
        {
            config.Expand(ExpandDirection.Vertical);
            config.Fade(FadeDirection.In);
            config.Duration(AnimationDuration.Slow);
        });
        animation.Close(config =>
        {
            config.Reverse(true);
        });
    })
    .Items(tabstrip =>
    {
        // add TabStrip items
    })
    )
```

## See Also

* [Animations in the TabStrip HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tabstrip/animation)
* [Server-Side API](/api/tabstrip)
