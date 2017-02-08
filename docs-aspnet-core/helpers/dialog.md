---
title: Dialog
page_title: Dialog | UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Dialog tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
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
            .Width(400)
            .Modal(false)
            .Actions(actions =>
                {
                    actions.Add().Text("NO");
                    actions.Add().Text("YES").Primary(true);
                })
            .Events(ev => ev.Close("dialog_close"))
        )
```
```tab-tagHelper

        <kendo:dialog name="dialog" title="Software Update" closable="false" modal="false"
                content="Do you agree terms and conditions?" close="dialog_close">
                <kendo:dialog-actions>
                        <kendo:dialog-action text="NO" />
                        <kendo:dialog-action text="YES" primary="true" />
                </kendo:dialog-actions>
        </kendo:dialog>
```

## See Also

* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
