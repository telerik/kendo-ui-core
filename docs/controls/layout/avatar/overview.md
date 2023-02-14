---
title: Overview
page_title: jQuery Avatar Documentation - Avatar Overview
description: "Get started with the jQuery Avatar by Kendo UI and learn how to create and initialize the widget."
slug: overview_kendoui_avatar_widget
position: 1
---

# {{ site.product }} Avatar Overview

The Kendo UI for jQuery Avatar is typically used to display images, icons or initials representing people or other entities.

It also gives you the flexibility to customize its border radius, size, color, etc.

* [Avatar demos](https://demos.telerik.com/kendo-ui/avatar/index)

## Initializing the Avatar

To initialize the Avatar, you can use any `div` element. The following example demonstrates how to initialize the Avatar.

```dojo
    <div id="avatar"></div>

    <script>
        $(document).ready(function(){
            $("#avatar").kendoAvatar({
                text: "IMG"
            });
        });
    </script>
```

## Referencing Existing Instances

You can access an existing Avatar instance by using the `.data()` jQuery method which gets executed by the jQuery object of the originating element.

```dojo
    <div id="avatar"></div>

    <script>
        $(document).ready(function(){
            $("#avatar").kendoAvatar();
        });

        var avatar = $('#avatar').data('kendoAvatar');
    </script>
```

## Accessibility and Keyboard Navigation

The [alt](/api/javascript/ui/avatar/configuration/alt) option can be used when the [type](/api/javascript/ui/avatar/configuration/type) is set to `image`. This value will be used to populate the alt attribute of the `<img>` element.

The Avatar is a non-focusable element.


## See Also

* [Overview of the Avatar (Demo)](https://demos.telerik.com/kendo-ui/avatar/index)
* [JavaScript API Reference of the Avatar](/api/javascript/ui/avatar)
