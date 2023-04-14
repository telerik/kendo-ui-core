---
title: Overview
page_title: Overview
description: "The Telerik UI Notification component for {{ site.framework }} provides a styled UI element with arbitrary content which can display information to the user on various occasions."
previous_url: /helpers/html-helpers/notification, /helpers/layout/notification/overview
slug: htmlhelpers_notification_aspnetcore
position: 0
---

# {{ site.framework }} Notification Overview

{% if site.core %}
The Telerik UI Notification TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Notification widget.
{% else %}
The Telerik UI Notification HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Notification widget.
{% endif %}

The Notification provides a styled UI widget with arbitrary content which can provide information to the user on various occasions.

* [Demo page for the Notification HtmlHelper](https://demos.telerik.com/{{ site.platform }}/notification/index)
{% if site.core %}
* [Demo page for the Notification TagHelper](https://demos.telerik.com/aspnet-core/notification/tag-helper)
{% endif %}

## Initializing the Notification

You can initialize the Notification from any element because it does not manipulate its content. The element will be hidden if the widget uses popup notifications or if the static notifications are not appended to the Notification element. In such cases, the element is not needed.

If the Notification element contains static (non-popup) notifications, enable its tag to allow nesting the elements inside the template of the notifications. For example, inline elements, such as `span`, `a`, or `em` cannot contain block elements such as `div`, `p`, `ul`, `li`, or headings. However, you can use a `div` element.

The following example demonstrates how to define the Notification.

```HtmlHelper
   @(Html.Kendo().Notification()
        .Name("notification")
    )

    <script type="text/javascript">
        $(document).ready(function () {
            var popupNotification = $("#notification").data("kendoNotification");

            popupNotification.show("Test popup message", "info");                        
        });
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-notification name="notification" auto-hide-after="0"></kendo-notification>
```
{% endif %}

## Basic Configuration

The following example demonstrates the basic configuration of the Notification.

{% if site.core %}
```HtmlHelper
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
```TagHelper
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
{% else %}
```    
    @(Html.Kendo().Notification()
        .Name("notification")
        .Stacking(NotificationStackingSettings.Down)
        .Width("12em")
        .Height(200)
        .HideOnClick(false)
        .Events(ev => ev.Show("onShow").Hide("onHide"))
        .Templates(t =>
        {
            t.Add().Type("time").ClientTemplate("<div style='padding: .6em 1em'>Time is: #: time #</div>");
        })
        .Button(true)
    )

    <script type="text/javascript">
        $(function () {
            // The Name() of the Notification is used to get its client-side instance.
            var notification = $("#notification").data("kendoNotification");
            console.log(notification);
        });
    </script>
```
{% endif %}

## Functionality and Features

* [Positioning]({% slug positioning_notificatiomhelper_aspnetmvc %})—You can predefine the position of the Notification.
* [Types]({% slug types_notificatiomhelper_aspnetmvc %})—The Notification provides built-in `"info"`, `"success"`, `"warning"`, and `"error"` types.
* [Hiding Options]({% slug hiding_notificatiomhelper_aspnetmvc %})—You can select different hiding behavior for the Notification.

## Next Steps

* [Getting Started with the Notification]({% slug aspnetcore_notification_getting_started %})
* [Basic Usage of the Notification HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/notification)
{% if site.core %}
* [Basic Usage of the Notification TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/notification/tag-helper)
{% endif %}

## See Also

* [Using the API of the Notification HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/notification/api)
* [Server-Side API](/api/notification)
