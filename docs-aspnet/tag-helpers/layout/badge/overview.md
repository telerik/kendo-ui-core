---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Badge TagHelper for ASP.NET Core."
slug: taghelpers_badge_aspnetcore
position: 1
---

# {{ site.framework }} Badge Overview

The Badge is an absolutely positioned element that is used to decorate avatars, navigation menus, or other components in the application when the visual notification is needed.

It also provides customizing its content through templates, setting different types and layouts.

* [Demo page for the Badge](https://demos.telerik.com/aspnet-core/badge/tag_helper)

## Initializing the Badge

The following example demonstrates how to define the Badge by using the Badge TagHelper.

```tagHelper

    <a class="k-button">
        <kendo-badge name="badge" text="42" shape="@BadgeShape.Rectangle">
        </kendo-badge>
    </a>

```
```cshtml

    <a class="k-button">
        @(Html.Kendo().Badge()
            .Name("badge")
            .Text("42")
            .Shape(BadgeShape.Rectangle)
        )
    </a>

```

## Basic Configuration

The badge also provides the choice to be inline or overlay and set its type. To make the badge overlay add the `k-badge-overlay` class to the parent parent element.

```tagHelper

    <a class="k-button k-badge-overlay">
        <kendo-badge name="badge" text="42" theme-color="@BadgeColor.Warning" shape="@BadgeShape.Rounded">
        </kendo-badge>
    </a>

```
```cshtml

    <a class="k-button k-badge-overlay">
        @(Html.Kendo().Badge()
            .Name("badge")
            .Text("42")
            .ThemeColor(BadgeColor.Warning)
            .Shape(BadgeShape.Rounded)
            )
    </a>

```

## Using templates

With the badge you can customize the content using templates.

```tagHelper
    <a class="k-button k-badge-overlay">
        <kendo-badge name="badge" text="101" theme-color="@BadgeColor.Success" shape="@BadgeShape.Pill" template-id="badge-template">
        </kendo-badge>
    </a>

    <script type="text/x-kendo-template" id="badge-template">
        # var badgeText = this.options.text;#
        #if(badgeText > 100){#
            100+
        #}else{#
            #=badgeText#
        #}#
    </script>
```
```cshtml

    <a class="k-button k-badge-overlay">
        @(Html.Kendo().Badge()
            .Name("badge")
            .Text("101")
            .ThemeColor(BadgeColor.Success)
            .Shape(BadgeShape.Pill)
            .TemplateId("badge-template")
        )
    </a>

    <script type="text/x-kendo-template" id="badge-template">
        # var badgeText = this.options.text;#
        #if(badgeText > 100){#
            100+
        #}else{#
            #=badgeText#
        #}#
    </script>

```

## Referencing Existing Instances

You can access an existing Button instance by using the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method which gets executed by the jQuery object of the originating element. Once a reference is established, use the [Badge client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/badge#methods) to control its behavior.

```
    <a class="k-button k-badge-overlay">
        <kendo-badge name="badge" text="1" theme-color="@BadgeColor.Primary" shape="@BadgeShape.Circle">
        </kendo-badge>
    </a>

    <script>
        var badge = $('#badge').data('kendoBadge');
    </script>
```

## See Also

* [Basic Usage of the Badge TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/badge/tag_helper)
* [Server-Side API](/api/badge)
