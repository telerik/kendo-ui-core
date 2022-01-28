---
title: Constraining the Position
page_title: Constraining the Position
description: "Learn how to configure the containment limits for the Telerik UI Window HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_window_constrain_aspnetcore
position: 4
---

# Constraining the Position

The Window provides the `Draggable(d => d.Containment())` configuration option that you can use to constrain the movement of the widget inside a container element.

The `Containment()` option overrides the `appendTo` setting and attaches the Window to the specified DOM element. You have to correctly position the `containment` element by using the `relative`, `absolute`, or `fixed` CSS rules.

The following example demonstrates how to create a modal Window and constrain its movement inside a DOM element.

    <style>
        #container {
            position: relative;
            width: 500px;
            height: 500px;
            border: 1px solid grey;
        }
    </style>

    <div id="container">
        @(Html.Kendo().Window()
            .Name("window")
            .Title("Alvar Aalto")
            .Width(300)
            .Height(250)
            .Draggable(d => d.Containment("#container"))
            .Content(@<text>
                <p>
                    Alvar Aalto is one of the greatest names in modern architecture and design.
                    Glassblowers at the iittala factory still meticulously handcraft the legendary vases
                    that are variations on one theme, fluid organic shapes that let the end user decide the use.
                </p>
            </text>)
        )
        <div id="window">

        </div>
    </div>

## See Also

* [Constraining the Movement of the Window HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/window/constrain-movement)
* [Server-Side API](/api/window)
