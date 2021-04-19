---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI SkeletonContainer HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_skeletoncontainer_aspnetcore_overview
position: 1
---

# SkeletonContainer Overview

The Telerik UI SkeletonContainer HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI SkeletonContainer widget.

The SkeletonContainer widget indicates to the user that the content is coming but has not yet been loaded. It aims at helping the user focus on progress and makes the page load time appear shorter.

A SkeletonContainer is basically a simplified preview version of a page into which information is gradually loaded (i.e. via AJAX requests).

## Initializing the SkeletonContainer

It is recommended to initialize the widget from a div HTML element.

The following example demonstrates how to initialize the SkeletonContainer from an existing `<div>` element.

```Razor
    @(Html.Kendo().SkeletonContainer()
        .Name("skeleton")
    )
```

## Functionality and Features

The Telerik UI SkeletonContainer for {{ site.framework }} accepts either a template or a CSS Grid. While the developer can pass merely anything at the template, the CSS Grid exposes an `Item` object that has a set of predefined properties. Find out more about the CSS Grid setup here: 

* [Items]({% slug htmlhelpers_skeletoncontainer_aspnetcore_items %})

## See Also

* [Overview of the SkeletonContainer HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/skeletoncontainer/index)
* [Server-Side API](/api/skeletoncontainer)
