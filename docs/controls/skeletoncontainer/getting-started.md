---
title: Getting Started
page_title: jQuery SkeletonContainer Documentation - Getting Started with the SkeletonContainer
description: "Get started with the jQuery SkeletonContainer by Kendo UI and learn how to create and initialize the component in a few easy steps."
components: ["skeletoncontainer"]
slug: getting_started_kendoui_skeletoncontainer_component
position: 2
---


# Getting Started with the SkeletonContainer 

This guide demonstrates how to get up and running with the Kendo UI for jQuery SkeletonContainer.

After the completion of this guide, you will achieve the following end result:

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

## 1. Create a Div Element

First, create a `<div>` element on the page that will be used to initialize the component.

```html
    <div id="skeleton"></div>
```

## 2. Initialize the SkeletonContainer

In this step, you will initialize the SkeletonContainer from the `<div>` element.

```dojo
    <div id="skeleton"></div>
    <script>
        $("#skeleton").kendoSkeletonContainer();
    </script>
```

## 3. Apply Configuration Settings

Here, you will apply configuration settings, such as [`animation`](/api/javascript/ui/skeletoncontainer/configuration/animation), [`height`](/api/javascript/ui/skeletoncontainer/configuration/height), [`width`](/api/javascript/ui/skeletoncontainer/configuration/width), and [`grid`](/api/javascript/ui/skeletoncontainer/configuration/grid).

```dojo
    <div id="skeleton"></div>
    <script>
        $("#skeleton").kendoSkeletonContainer({
            animation: "wave", // Defines a value determining whether the items will be animated.
            height: 200, // Determines the height of the component.
            width: 340, // Determines the width of the component.
            grid: { // Defines the settings for the CSS Grid used for layouting the skeleton shapes.
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

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the SkeletonContainer](https://demos.telerik.com/kendo-ui/skeletoncontainer/index)

## See Also 

* [JavaScript API Reference of the SkeletonContainer](/api/javascript/ui/skeletoncontainer)
* [Knowledge Base Section](/knowledge-base)


