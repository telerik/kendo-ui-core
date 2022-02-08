---
title: Animations
page_title: Animations
description: "Learn how to control the animations in the Telerik UI PanelBar component for {{ site.framework }}."
slug: htmlhelpers_panelbar_animations_aspnetcore
position: 6
---

# Animations

By default, the PanelBar uses animations to expand and reveal its subitems when an item header is clicked.

You can modify these animations through the `Expand` and `Collapse` configuration options. You can also configure the PanelBar to render a single opened panel at a time.

The following example demonstrates how to configure the PanelBar animation:

```HtmlHelper
@(Html.Kendo().PanelBar()
    .Name("panelbar")
    .Animation(animation =>
    {
        animation.Enable(true);
        animation.Expand(config =>
        {
            config.Expand();
            config.Fade(FadeDirection.In);
            config.Duration(AnimationDuration.Slow);
            config.Zoom(ZoomDirection.In);
        })
        .Collapse(config =>
         {
             config.Fade(FadeDirection.Out);
             config.Duration(AnimationDuration.Fast);
         });
    })
    .Items(panelbar =>
    {
        // add panelbar items
    })
    )
```
