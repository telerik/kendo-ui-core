---
title: Animations
page_title: Animations
description: "Learn how to configure the animation options when working with the Telerik UI TreeView for {{ site.framework }}."
slug: htmlhelpers_treeview_animations_aspnetcore
position: 3
---

# Animations

By default, the Telerik UI for {{ site.framework }} TreeView uses animations to expand and collapse its hierarchical data when you interact with a given node.

You can modify these animations through the `Expand()` and `Close()` configuration methods.

## Supported Options

The **Expand** and **Collapse** animations provide the following methods for further configuration:

* `Fade()`&mdash;Configures the fade effect direction.
* `Zoom()`&mdash;Specifies the zoom effect direction.
* `SlideIn()`&mdash;Sets the slide effect direction.
* `Reverse()`&mdash;Enables or disables the effect animation reverse.
* `Duration()`&mdash;Sets a predefined animation duration.

The following example demonstrates how to change the TreeView animations.

```HtmlHelper
    @(Html.Kendo().TreeView()
        .Name("treeview")
        .DataTextField("Name")
        .Animation(animation =>
        {
            animation.Expand(expand =>
            {
                expand.Expand(ExpandDirection.Vertical);
                expand.SlideIn(SlideDirection.Down);
                expand.Duration(500);
                expand.Fade(FadeDirection.In);
                expand.Zoom(ZoomDirection.In);
                expand.Reverse(false);
            });

            animation.Collapse(collapse =>
            {
                collapse.SlideIn(SlideDirection.Up);
                collapse.Fade(FadeDirection.Out);
                collapse.Duration(600);
                collapse.Reverse(false);
            });
        })
        .DataSource(dataSource => dataSource
            .Read(read => read
                .Action("Read_TreeViewData", "TreeView")
            )
        )
    )
```

{% if site.core %}
```TagHelper
    <kendo-treeview auto-bind="true" datatextfield="Name" load-on-demand="true" name="treeview">
        <animation>
            <expand effects="expand:vertical slideIn:down fade:in zoom:in" duration="500"/>
            <collapse effects="slideIn:up fade:out" duration="600"/>
        </animation>
        <hierarchical-datasource>
            <schema>
                <hierarchical-model id="id"></hierarchical-model>
            </schema>
            <transport>
                <read url="@Url.Action("Read_TreeViewData", "TreeView")" cache="true" />
            </transport>
        </hierarchical-datasource>
    </kendo-treeview>
```
{% endif %}

## See Also

* [Animation Effects TreeView (Demo)](https://demos.telerik.com/{{ site.platform }}/treeview/animation)
* [Server-Side API Reference of the TreeView for {{ site.product }}](/api/treeview)
* [Client-Side API Reference of the TreeView](/api/javascript/ui/treeview)





