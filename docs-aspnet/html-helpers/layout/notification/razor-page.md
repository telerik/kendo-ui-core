---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI Notification component for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_notification_razorpage_aspnetcore
position: 7
---

# Notification in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Notification for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the Notification component in a Razor Pages scenario.

For the complete project, refer to the [Notification in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Notification/NotificationIndex.cshtml).

```HtmlHelper
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
	<script>
		$(document).ready(function () {
			$("#showNotification").click(function () {
				$.ajax({
					url: '/Notification/NotificationIndex?handler=Read',
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
{% if site.core%}
```TagHelper
<kendo-notification name="notification"
                    width="200">
    <templates>
        <notification-template type="info"
                               template="<div>TEXT: <span class='custom-style'>#: text #</span> </div> <div>TIME: <span class='custom-style'>#: time #</span> </div>">
            
        </notification-template>
    </templates>
</kendo-notification>
```
{% endif %}
```C# PageModel
	
	public JsonResult OnPostRead()
    {
        NotificationModel model = new NotificationModel()
        {
            Text = "Notification Text",
            Time = DateTime.Now
        };
        return new JsonResult(model);
    }
```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})

