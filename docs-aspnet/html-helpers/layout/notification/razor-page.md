---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI Notification component for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_notification_razorpage_aspnetcore
components: ["notification"]
position: 7
---

# Notification in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI Notification for {{ site.framework }} in Razor Pages applications.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Showing Notification on Post Request

The following example demonstrates how to display a Notification with data retrieved from a `PageModel` handler method through an AJAX POST request.

```HtmlHelper
@page
@model NotificationIndexModel

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()	

<button id="showNotification" class="k-button">Show notification</button>

@(Html.Kendo().Notification()
	.Name("notification")
	.Width("20em")
	.Templates(t =>
	{
		t.Add().Type("info")
			.ClientTemplate("<div>TEXT: <span class='custom-style'>#: text #</span> </div> <div>TIME: <span class='custom-style'>#: time #</span> </div>");
	})
)
```
{% if site.core%}
```TagHelper
@page
@model NotificationIndexModel

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()	

<button id="showNotification" class="k-button">Show notification</button>

<kendo-notification name="notification" width="200">
    <templates>
        <notification-template type="info"
		template="<div>TEXT: <span class='custom-style'>#: text #</span> </div> <div>TIME: <span class='custom-style'>#: time #</span> </div>">
        </notification-template>
    </templates>
</kendo-notification>
```
```JS Scripts
<script>
	$(document).ready(function () {
		$("#showNotification").click(function () {
			$.ajax({
				url: '/NotificationIndex?handler=Read',
				type: "POST",
				contentType: "application/json; charset=utf-8",
				headers: {
					RequestVerificationToken: $('input:hidden[name="__RequestVerificationToken"]').val()
				},
				dataType: "json",
				success: function (response) {
					// Show notification based on the returned data from the server                    
					var notification = $("#notification").getKendoNotification();
					notification.show({
						text: response.Text,
						time: kendo.toString(new Date(response.Time), "dd MMMM yy hh:mm tt")
					}, "info");
				}
			});
		});
	});
</script>
```
{% endif %}
```C# PageModel
public class NotificationIndexModel : PageModel
{
	public JsonResult OnPostRead()
    {
        NotificationModel model = new NotificationModel()
        {
            Text = "Notification Text",
            Time = DateTime.Now
        };
        return new JsonResult(model);
    }
}
```

For the complete project, refer to the [Notification in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Notification/NotificationIndex.cshtml).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Notification](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/notification)
* [Server-Side HtmlHelper API of the Notification](/api/notification)
* [Server-Side TagHelper API of the Notification](/api/taghelpers/notification)
* [Knowledge Base Section](/knowledge-base)


