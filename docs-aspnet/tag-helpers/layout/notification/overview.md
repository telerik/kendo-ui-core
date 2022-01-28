---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Notification TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/notification, /helpers/tag-helpers/notification
slug: taghelpers_notification_aspnetcore
position: 1
---

# Notification TagHelper Overview

The Telerik UI Notification TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Notification widget.

The Notification provides a styled UI widget with arbitrary content which can provide information to the user on various occasions.

* [Demo page for the Notification](https://demos.telerik.com/aspnet-core/notification/tag-helper)

## Initializing the Notification

The following example demonstrates how to define the Notification by using the Notification TagHelper.

        <kendo-notification name="notification" auto-hide-after="0"></kendo-notification>

## Basic Configuration

The Notification TagHelper configuration options are passed as attributes of the tag and through nested tags.

```cshtml

	@(Html.Kendo().Notification()
		.Name("notification")
		.Position(p => p.Pinned(true).Top(30).Right(30))
		.Stacking(NotificationStackingSettings.Down)
		.AutoHideAfter(0)
		.Templates(t =>
		{
			t.Add().Type("info").ClientTemplateID("emailTemplate");
			t.Add().Type("error").ClientTemplateID("errorTemplate");
			t.Add().Type("upload-success").ClientTemplateID("successTemplate");
		})
		.Animation(a => a.Open(e => e.Duration(500)).Close(e => e.Duration(0)))
	)

```
```tagHelper

	<kendo-notification name="notification"
				        stacking="NotificationStackingSettings.Down"
				        auto-hide-after="0">
		<position pinned="true" top="30" right="30" />
		<templates>
			<notification-template type="info" template-id="emailTemplate" />
			<notification-template type="error" template-id="errorTemplate" />
			<notification-template type="upload-success" template-id="successTemplate" />
		</templates>
		<popup-animation>
			<open duration="500" />
			<close duration="0" />
		</popup-animation>
	</kendo-notification>
```

## See Also

* [Basic Usage of the Notification TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/notification/tag-helper)
* [Server-Side API](/api/notification)
