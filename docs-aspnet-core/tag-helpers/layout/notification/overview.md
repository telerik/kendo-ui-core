---
title: Overview
page_title: Notification | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Notification tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/notification, /aspnet-core/helpers/tag-helpers/notification
slug: taghelpers_notification_aspnetcore
position: 1
---

# Notification Tag Helper Overview

The Notification tag helper helps you configure the Kendo UI Notification widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the Notification by using the Notification tag helper.

###### Example

        <kendo-notification name="notification" auto-hide-after="0"></kendo-notification>

## Configuration

The Notification tag helper configuration options are passed as attributes of the tag and through nested tags.

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

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
