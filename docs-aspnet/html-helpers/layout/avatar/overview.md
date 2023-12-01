---
title: Overview
page_title: Avatar Overview
description: "Learn the basics when working with the Telerik UI Avatar HtmlHelper for {{ site.framework }}."
slug: overview_avatarhelper_aspnetcore
position: 0
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

## Accessibility and Keyboard Navigation

The `Alt` option can be used when the `Type` is set to `Image`. This value will be used to populate the alt attribute of the `<img>` element.

The Avatar is a non-focusable element.

## Functionality and Features

* [Appearance]({% slug appearance_avatar_aspnetcore %})&mdash;Use different configuration settings to control the styling of the component.

## Next Steps

* [Getting Started with the Avatar]({% slug avatar_getting_started %})
* [Overview of the Avatar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/avatar/index)
{% if site.core %}
* [Overview of the Avatar TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/avatar/tag-helper)
{% endif %}

## See Also

* [Integrating the Avatar for {{ site.framework }} into a Grid (Demo)](https://demos.telerik.com/{{ site.platform }}/avatar/gridintegration)
* [Knowledge Base Section](/knowledge-base)
