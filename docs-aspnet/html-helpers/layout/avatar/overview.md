---
title: Overview
page_title: Avatar Overview
description: "Learn the basics when working with the Telerik UI Avatar HtmlHelper for {{ site.framework }}."
slug: overview_avatarhelper_aspnetcore
position: 1
---

# Avatar Overview

The Telerik UI Avatar for {{ site.framework }} is typically used to display images, icons or initials representing people or other entities.

It also gives you the flexibility to customize its border radius, size, color, etc.

* [Avatar demos](https://demos.telerik.com/{{ site.platform }}/avatar/index)

## Initializing the Avatar

To initialize the Avatar, you can use any `div` element. The following example demonstrates how to initialize the Avatar.

```
    @(Html.Kendo().Avatar()
        .Name("avatar-text")
        .Type(AvatarType.Text)
        .Text("JS")
    )
```

## Referencing Existing Instances

You can access an existing Avatar instance by using the `.data()` jQuery method which gets executed by the jQuery object of the originating element.

```C#
    @(Html.Kendo().Avatar()
        .Name("avatar")
        .Type(AvatarType.Text)
        .Text("MJ")
    )
```
```JavaScript
    <script>
        var avatar = $('#avatar').data('kendoAvatar');
    </script>
```

## Accessibility and Keyboard Navigation

The [alt](/api/javascript/ui/avatar/configuration/alt) option can be used when the [type](/api/javascript/ui/avatar/configuration/type) is set to `image`. This value will be used to populate the alt attribute of the `<img>` element.

The Avatar is a non-focusable element.


## See Also

* [Overview of the Avatar (Demo)](https://demos.telerik.com/{{ site.platform }}/avatar/index)
* [JavaScript API Reference of the Avatar](/api/javascript/ui/avatar)
