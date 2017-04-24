---
title: Dialog
page_title: Dialog | UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Dialog tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/dialog
slug: taghelpers_dialog_aspnetcore
---

# Dialog Tag Helper

The Dialog tag helper helps you configure the Kendo UI Dialog widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the Dialog by using the Dialog tag helper.

###### Example

        <kendo-dialog name="dialog1">Dialog contents</kendo-dialog>

## Configuration

The Dialog tag helper configuration options are passed as attributes of the tag. Its content is placed between the opening and closing tags.

###### Example

```tab-cshtml
        @(Html.Kendo().Dialog()
            .Name("dialog")
            .Title("Software Update")
            .Content("Do you agree terms and conditions?")
            .Modal(false)
            .Events(ev => ev.Close("dialog_close"))
        )
```
```tab-tagHelper
        <kendo-dialog name="dialog" title="Software Update" closable="false" modal="false"
                content="Do you agree terms and conditions?" on-close="dialog_close">
        </kendo-dialog>
```

> **Important**
>
> The Dialog tag helper does not provide options for adding actions. For more information on how to work around this limitation, refer to the demo on using the [Razor syntax helper method](http://demos.telerik.com/aspnet-core/dialog/index).

## See Also

* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
