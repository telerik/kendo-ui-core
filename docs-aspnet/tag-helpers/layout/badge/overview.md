---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Badge TagHelper for ASP.NET Core."
slug: taghelpers_badge_aspnetcore
position: 1
---

# Badge Overview

The Badge is an absolutely positioned element that is used to decorate avatars, navigation menus, or other components in the application when the visual notification is needed.

It also provides customizing its content through templates, setting different types and layouts.

* [Demo page for the Badge](https://demos.telerik.com/aspnet-core/badge/tag_helper)

## Initializing the Badge

The following example demonstrates how to define the Badge by using the Badge TagHelper.

```
    <a class="k-button">
        <kendo-badge name="badge" value="42" appearance="rectangle">
        </kendo-badge>
    </a>

```

## Basic Configuration

The badge also provides the choice to be inline or overlay and set its type. To make the badge overlay add the `k-badge-overlay` class to the parent parent element.

```
    <a class="k-button k-badge-overlay">
        <kendo-badge name="badge" value="42" type="warning" appearance="rectangle">
        </kendo-badge>
    </a>
```

## Using templates

With the badge you can customize the content using templates.

```
    <a class="k-button k-badge-overlay">
        <kendo-badge name="badge" value="42" type="warning" appearance="rectangle" template="#= +value > 10 ? '9+' : value #">
        </kendo-badge>
    </a>
```


## Referencing Existing Instances

You can access an existing Button instance by using the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method which gets executed by the jQuery object of the originating element. Once a reference is established, use the [Badge client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/badge#methods) to control its behavior.

```
    <a class="k-button k-badge-overlay">
        <kendo-badge name="badge" value="42" type="warning" appearance="rectangle">
        </kendo-badge>
    </a>

    <script>
        var badge = $('#badge').data('kendoBadge');
    </script>
```

## See Also

* [Basic Usage of the Badge TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/badge/tag_helper)
* [Server-Side API](/api/badge)
