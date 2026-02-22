---
title: Getting Started
page_title: jQuery Avatar Documentation - Getting Started with the Avatar
description: "Get started with the jQuery Avatar by Kendo UI and learn how to create and initialize the component in a few easy steps."
components: ["avatar"]
slug: getting_started_kendoui_avatar_component
position: 2
---


# Getting Started with the Avatar 

This guide demonstrates how to get up and running with the Kendo UI for jQuery Avatar.

After the completion of this guide, you will achieve the following end result:

```dojo
    <div id="avatar-icon"></div>
    <script>
      $("#avatar-icon").kendoAvatar({
        type: "icon",
        icon: "user",
        size: "large"
      });
    </script>
```

## 1. Create a Div Element

First, create a `<div>` element on the page that will be used to initialize the component.

```html
    <div id="avatar-icon"></div>
```

## 2. Initialize the Avatar

In this step, you will initialize the Avatar from the `<div>` element.

```dojo
    <div id="avatar-icon"></div>
    <script>
      $("#avatar-icon").kendoAvatar();
    </script>
```

## 3. Apply Configuration and Styling Settings

Here, you will apply configuration settings, such as [`type`](/api/javascript/ui/avatar/configuration/type) and [`icon`](/api/javascript/ui/avatar/configuration/icon) and styling settings like [`size`](/api/javascript/ui/avatar/configuration/size).

```dojo
    <div id="avatar-icon"></div>
    <script>
      $("#avatar-icon").kendoAvatar({
        type: "icon", // Specify the type of the component: icon, image, or text (default).
        icon: "user", // Specifies an icon name to be used if the avatar type is set to icon.
        size: "large" // The size of the component.
      });
    </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Avatar](https://demos.telerik.com/kendo-ui/avatar/index)

## See Also 

* [JavaScript API Reference of the Avatar](/api/javascript/ui/avatar)
* [Knowledge Base Section](/knowledge-base)


