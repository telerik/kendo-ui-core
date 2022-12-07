---
title: Overview
page_title: jQuery SkeletonContainer Documentation - SkeletonContainer Overview
description: "Get started with the jQuery SkeletonContainer by Kendo UI and learn how to initialize the widget."
slug: overview_kendoui_skeletoncontainer_widget
position: 1
CTAControlName: SkeletonContainer
---

# {{ site.product }} SkeletonContainer Overview

The SkeletonContainer widget indicates to the user that the content is coming but has not yet been loaded. It aims at helping the user focus on progress and makes the page load time appear shorter.

A SkeletonContainer is basically a simplified preview version of a page into which information is gradually loaded (i.e. via AJAX requests).

Visit the [SkeletonContainer demo page](https://demos.telerik.com/kendo-ui/SkeletonContainer/index) to see it in action.

{% if site.has_cta_panels == true %}
{% include cta-panel-overview.html %}
{% endif %}

## Initializing the SkeletonContainer

It is recommended to initialize the widget from a div HTML element.

The following example demonstrates how to initialize the SkeletonContainer from an existing `<div>` element.

```dojo
    <div id="skeleton"></div>
    <script>
        $("#skeleton").kendoSkeletonContainer({
            animation: "wave",
            height: 200,
            width: 340,
            grid: {
                items: [{
                    colStart: 1,
                    colSpan: 1,
                    rowStart: 1,
                    rowSpan: 1,
                    shape:"rectangle"
                }],
                rows: 1,
                columns:1
            },
        });
    </script>
```

## Functionality and Features

The Kendo UI SkeletonContainer for jQuery accepts either a template or a CSS Grid. While the developer can pass merely anything at the template, the CSS Grid exposes an `item` object that has a set of predefined properties. Find out more about the CSS Grid setup here: 

* [Items]({% slug items_kendoui_skeletoncontainer_widget %})

## See Also

* [Overview of the SkeletonContainer (Demo)](https://demos.telerik.com/kendo-ui/skeletoncontainer/index)
* [JavaScript API Reference of the SkeletonContainer](/api/javascript/ui/skeletoncontainer)
