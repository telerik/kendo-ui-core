---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Dialog TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/dialog, /helpers/tag-helpers/dialog
slug: taghelpers_dialog_aspnetcore
position: 1
---

# Dialog TagHelper Overview

The Telerik UI Dialog TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Dialog widget.

The Dialog is a modal popup that brings information to the user. It also provides actions through its action buttons to prompt the user for input or to ask for a decision. The component can also contain more complex UI elements that require the focus of the user. The Dialog is a subset of the [Kendo UI for jQuery Window]({% slug htmlhelpers_window_aspnetcore %}) where the most prominent difference is the added functionality for actions and predefined dialogs.

* [Demo page for the Dialog](https://demos.telerik.com/aspnet-core/dialog/tag-helper)

## Initializing the Dialog

The following example demonstrates how to define the Dialog by using the Dialog TagHelper.

> To enable more complex widget configuration scenarios, the Kendo UI R1 2018 release introduces a change in the tags of the Dialog. Previously, it was possible to nest content directly in the `<kendo-dialog>` tag while now, after the release, the content must be nested within a `<content>` tag.

        <kendo-dialog name="dialog1">
			<content>Dialog contents</content>
		</kendo-dialog>

## Basic Configuration

The Dialog TagHelper configuration options are passed as attributes of the tag. Its content is placed within a `<content>` tag.

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

        <kendo-dialog name="dialog" title="Software Update" content="Some content"></kendo-dialog>

## See Also

* [Basic Usage of the Dialog TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/dialog/tag-helper)
* [Server-Side API](/api/dialog)
