---
title: Overview
page_title: Avatar Overview
description: "Learn the basics when working with the Telerik UI Avatar HtmlHelper for {{ site.framework }}."
slug: overview_avatarhelper_aspnetcore
position: 1
---

# {{ site.framework }} Avatar Overview

The Telerik UI Avatar for {{ site.framework }} is typically used to display images, icons or initials representing people or other entities.

It also gives you the flexibility to customize its border radius, size, color, etc.

* [Avatar demos](https://demos.telerik.com/{{ site.platform }}/avatar/index)

## Initializing the Avatar

The following example demonstrates how to initialize an Avatar component.

```HtmlHelper
    @(Html.Kendo().Avatar()
        .Name("avatar-text")
        .Type(AvatarType.Text)
        .Text("JS")
    )
```
{% if site.core %}
```TagHelper
    <kendo-avatar name="avatar-text"
        type="AvatarType.Text"
        text="JS">
    </kendo-avatar>
```
{% endif %}

## Referencing Existing Instances

You can access an existing Avatar instance by using the `.data()` jQuery method which gets executed by the jQuery object of the originating element.

```HtmlHelper
    @(Html.Kendo().Avatar()
        .Name("avatar")
        .Type(AvatarType.Text)
        .Text("MJ")
    )
```
{% if site.core %}
```TagHelper
    <kendo-avatar name="avatar"
        type="AvatarType.Text"
        text="MJ">
    </kendo-avatar>
```
{% endif %}
```JavaScript
    <script>
        var avatar = $('#avatar').data('kendoAvatar');
    </script>
```

## Accessibility and Keyboard Navigation

The `Alt` option can be used when the `Type` is set to `Image`. This value will be used to populate the alt attribute of the `<img>` element.

The Avatar is a non-focusable element.


## See Also

* [Overview of the Avatar (Demo)](https://demos.telerik.com/{{ site.platform }}/avatar/index)
* [JavaScript API Reference of the Avatar](https://docs.telerik.com/kendo-ui/api/javascript/ui/avatar)
