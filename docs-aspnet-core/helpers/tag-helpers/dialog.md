---
title: Dialog
page_title: Dialog | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Dialog tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/dialog
slug: taghelpers_dialog_aspnetcore
---

# Dialog Tag Helper Overview

The Dialog tag helper helps you configure the Kendo UI Dialog widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the Dialog by using the Dialog tag helper.

> **Important**
>
> A change in the Dialog's tags has been introduced in R1 2018, in order to allow more complex configuration of the widget. Previously it was possible to nest content directly within the `<kendo-dialog>` tag, since R1 2018 content must be nested within a `<content>` tag.

###### Example

        <kendo-dialog name="dialog1">
			<content>Dialog contents</content>
		</kendo-dialog>

## Configuration

The Dialog tag helper configuration options are passed as attributes of the tag. Its content is placed within a `<content>` tag.

###### Example

```tab-cshtml
        @(Html.Kendo().Dialog()
            .Name("dialog")
            .Title("Software Update")
            .Content("<p>A new version of <strong>Kendo UI</strong> is available. Would you like to download and install it now?<p>")
            .Modal(false)
			.Actions(actions =>
			{
				actions.Add().Text("Skip this version");
				actions.Add().Text("Remind me later");
				actions.Add().Text("Install update").Primary(true);
			})
            .Events(ev => ev.Close("dialog_close"))
        )
```
```tab-tagHelper
		<kendo-dialog name="dialog" title="Software Update" modal="false" on-close="dialog_close">
			<content>
				<p>A new version of <strong>Kendo UI</strong> is available. Would you like to download and install it now?<p>
			</content>
			<actions>            
				<action text="Skip this version">
				</action>
				<action text="Remind me later">
				</action>
				<action primary="true" text="Install update">
				</action>
			</actions>
		</kendo-dialog>
```

Simple content can be set through the `content` attribute:

###### Example

        <kendo-dialog name="dialog" title="Software Update" content="Some content"></kendo-dalog>

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
