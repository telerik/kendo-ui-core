---
title: Overview
page_title: Dialog Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Dialog tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/dialog, /aspnet-core/helpers/tag-helpers/dialog
slug: taghelpers_dialog_aspnetcore
position: 1
---

# Dialog Tag Helper Overview

The Dialog is a modal popup that brings information to the user.

It also provides actions through its action buttons to prompt the user for input or to ask for a decision. The component can also contain more complex UI elements that require the focus of the user. The Dialog is a subset of the [Kendo UI Window widget]({% slug htmlhelpers_window_aspnetcore %}) where the most prominent difference is the added functionality for actions and predefined dialogs.

The Dialog tag helper extension is a server-side wrapper for the [Kendo UI Dialog](https://demos.telerik.com/kendo-ui/dialog/index) widget and enables you to configure the Kendo UI Dialog widget in ASP.NET Core applications.

## Initializing the Dialog

The following example demonstrates how to define the Dialog by using the Dialog tag helper.

> To enable more complex widget configuration scenarios, the Kendo UI R1 2018 release introduces a change in the tags of the Dialog. Previously, it was possible to nest content directly in the `<kendo-dialog>` tag while now, after the release, the content must be nested within a `<content>` tag.

        <kendo-dialog name="dialog1">
			<content>Dialog contents</content>
		</kendo-dialog>

## Basic Configuration

The Dialog tag helper configuration options are passed as attributes of the tag. Its content is placed within a `<content>` tag.

```cshtml
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
```tagHelper
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

To set simple content, use the `content` attribute.

        <kendo-dialog name="dialog" title="Software Update" content="Some content"></kendo-dalog>

## See Also

* [Basic Usage of the Dialog Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/tag-helper)
* [JavaScript API Reference of the Dialog](http://docs.telerik.com/kendo-ui/api/javascript/ui/dialog)
