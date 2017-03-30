---
title: DateInput
page_title: DateInput | UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the DateInput tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_dateinput_aspnetcore
---

# DateInput Tag Helper

The DateInput tag helper helps you configure the Kendo UI DateInput widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the DateInput by using the DateInput tag helper.

###### Example

        <kendo-dateinput name="dateinput1"></kendo-dateinput>

## Configuration

The DateInput tag helper configuration options are passed as attributes of the tag.

###### Example

```tab-cshtml

        @(Html.Kendo().DateInput()
                .Name("dateinput1")
                .Format("MMMM yyyy")
                .Value(DateTime.Now)
        )
```
```tab-tagHelper

        <kendo-dateinput name="dateinput1" format="MMMM yyyy" value="DateTime.Now">
        </kendo-dateinput>
```


## See Also

* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
