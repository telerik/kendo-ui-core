---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI SkeletonContainer component for {{ site.framework }}."
slug: htmlhelpers_skeletoncontainer_aspnetcore_overview
position: 1
---

# {{ site.framework }} SkeletonContainer Overview

{% if site.core %}
The Telerik UI SkeletonContainer TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI SkeletonContainer widget.
{% else %}
The Telerik UI SkeletonContainer HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI SkeletonContainer widget.
{% endif %}

The SkeletonContainer widget indicates to the user that the content is coming but has not yet been loaded. It aims at helping the user focus on progress and makes the page load time appear shorter.

A SkeletonContainer is basically a simplified preview version of a page into which information is gradually loaded (i.e. via AJAX requests).

* [Demo page for the SkeletonContainer HtmlHelper](https://demos.telerik.com/{{ site.platform }}/skeletoncontainer/index)
{% if site.core %}
* [Demo page for the SkeletonContainer TagHelper](https://demos.telerik.com/aspnet-core/skeletoncontainer/tag-helper)
{% endif %}

## Initializing the SkeletonContainer

It is recommended to initialize the widget from a div HTML element.

The following example demonstrates how to initialize the SkeletonContainer from an existing `<div>` element.

```HtmlHelper
    @(Html.Kendo().SkeletonContainer()
        .Name("skeleton")
        .Animation(SkeletonContainerAnimation.Pulse)
        .TemplateId("tmpl")
    )
```
{% if site.core %}
```TagHelper

        <kendo-skeletoncontainer name="skeleton" 
                                 animation="SkeletonContainerAnimation.Pulse"
                                 template-id="tmpl">
        </kendo-skeletoncontainer>
```
```JavaScript
        <script id="tmpl" type="text/html">
        <div class='k-card'>
                <div class='k-card-header'>
                <div>
                        <span data-shape-circle class='k-card-image avatar'></span>
                </div>
                <div class='user-info'>
                        <span data-shape-text class='k-card-title'></span>
                        <span data-shape-text class='k-card-subtitle'></span>
                </div>
                </div>
                <span data-shape-rectangle style='width: 340px; height: 225px; '></span>
                <div class='k-card-body'>
                <span data-shape-text></span>
                </div>
        </div>
        </script>
```
{% endif %}

## Functionality and Features

The Telerik UI SkeletonContainer for {{ site.framework }} accepts either a template or a CSS Grid. While the developer can pass merely anything at the template, the CSS Grid exposes an `Item` object that has a set of predefined properties. Find out more about the CSS Grid setup here: 

* [Items]({% slug htmlhelpers_skeletoncontainer_aspnetcore_items %})

## See Also

* [Overview of the SkeletonContainer HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/skeletoncontainer/index)
{% if site.core %}
* [Basic Usage of the SkeletonContainer TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/skeletoncontainer/tag-helper)
{% endif %}
* [Server-Side API](/api/skeletoncontainer)
