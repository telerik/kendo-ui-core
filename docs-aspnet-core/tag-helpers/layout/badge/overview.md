---
title: Overview
page_title: Badge Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Telerik UI Badge TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
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

You can access an existing Button instance by using the .data() jQuery method which gets executed by the jQuery object of the originating element.

```dojo
    <a class="k-button k-badge-overlay">
        <kendo-badge name="badge" value="42" type="warning" appearance="rectangle">
        </kendo-badge>
    </a>

    <script>
        var badge = $('#badge').data('kendoBadge');
    </script>
```

## See Also

* [Basic Usage of the Badge (Demo)](https://demos.telerik.com/aspnet-core/badge/tag_helper)
* [API Reference of the Badge](/api/dialog)