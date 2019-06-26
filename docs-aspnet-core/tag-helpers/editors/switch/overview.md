---
title: Overview
page_title: Switch Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Switch tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/switch, /aspnet-core/helpers/tag-helpers/switch
slug: taghelpers_switch_aspnetcore
position: 1
---

# Switch Tag Helper Overview

The Kendo UI Switch displays two exclusive choices.

With the new Switch variables introduced in the Kendo UI R1 2019 release, the default styling of the Switch component for each of the [Sass-based themes](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes) can be modified to match the desired custom layout. For more information and examples, refer to the article on [custom Switch layout](https://github.com/telerik/kendo-themes/wiki/Change-the-Switch-Layout).

The Switch tag helper extension is a server-side wrapper for the [Kendo UI Switch](https://demos.telerik.com/kendo-ui/switch/index) widget and enables you to configure the Kendo UI Switch widget in ASP.NET Core applications.

## Initializing the Switch

The following example demonstrates how to define the Switch by using the Switch tag helper.

    <kendo-switch name="switch"
            checked="true"></kendo-switch>

## Basic Configuration

The configuration options of the Switch tag helper are passed as attributes of the tag.

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

* [Basic Usage of the Switch Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/switch/tag-helper)
* [JavaScript API Reference of the Switch](https://docs.telerik.com/kendo-ui/api/javascript/ui/switch)
