---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Switch TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/switch, /helpers/tag-helpers/switch
slug: taghelpers_switch_aspnetcore
position: 1
---

# Switch TagHelper Overview

The Telerik UI Switch TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Switch widget.

The Switch displays two exclusive choices. With the new Switch variables introduced in the Kendo UI for jQuery R1 2019 release, the default styling of the Switch component for each of the [Sass-based Kendo UI for jQuery themes](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes) can be modified to match the desired custom layout.

* [Demo page for the Switch](https://demos.telerik.com/aspnet-core/switch/tag-helper)

## Initializing the Switch

The following example demonstrates how to define the Switch by using the Switch TagHelper.

    <kendo-switch name="switch"
            checked="true"></kendo-switch>

## Basic Configuration

The configuration options of the Switch TagHelper are passed as attributes of the tag.

```tab-tagHelper
    <kendo-switch name="switch"
            checked="true"
            enabled="true"></kendo-switch>
```
```tab-cshtml
    @(Html.Kendo().Switch()
        .Name("switch")
        .Checked(true)
        .Enabled(true))
```

## See Also

* [Basic Usage of the Switch TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/switch/tag-helper)
* [Server-Side API](/api/switch)
