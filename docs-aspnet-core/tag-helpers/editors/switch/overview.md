---
title: Overview
page_title: Switch | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Switch tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/switch, /aspnet-core/helpers/tag-helpers/switch
slug: taghelpers_switch_aspnetcore
position: 1
---

# Switch Tag Helper Overview

The Switch tag helper helps you configure the Kendo UI Switch widget in ASP.NET Core applications.

The Switch displays two exclusive choices.

## Basic Usage

The following example demonstrates how to define the Switch by using the Switch tag helper.

###### Example

    <kendo-switch name="switch"
            checked="true"></kendo-switch>

## Configuration

The configuration options of the Switch tag helper are passed as attributes of the tag.

###### Example

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

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
