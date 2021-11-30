---
title: Animations
page_title: Animations
description: "Learn how to configure the animations for the Telerik UI Window HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_window_animations_aspnetcore
position: 10
---

# Animations

The Telerik UI Window for {{ site.framework }} allows you to customize the animation effects upon display via the [`Animation()`](/api/Kendo.Mvc.UI.Fluent/WindowBuilder#animationsystemactionkendomvcuifluentpopupanimationbuilder) configuration option.

The Following example demonstrates how you can configure the [Animation effects](/api/Kendo.Mvc.UI/EffectsBuilder) for the Window:
```
@(Html.Kendo().Window()
    .Name("window")
    .Title("Window")
    .Animation(animation =>
    {
        animation.Open(open =>
        {
            open.Zoom(ZoomDirection.In);
            open.Fade(FadeDirection.In);
            open.Duration(500);
        });

        animation.Close(close =>
        {
            close.Reverse(false);
            close.Zoom(ZoomDirection.Out);   
            close.Fade(FadeDirection.In);
        });
    })
    .Content("Window Content")
)
```

## See Also

* [Adding Animation Effects to the Window (Demo)](https://demos.telerik.com/{{ site.platform }}/window/animation)
* [Server-Side API of the Telerik UI Window HtmlHelper for {{ site.framework }}](/api/window)
* [JavaScript API Reference of the Window](/api/javascript/ui/window)
