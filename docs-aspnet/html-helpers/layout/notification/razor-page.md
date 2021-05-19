---
title:  Razor Page
page_title: Configure a Notification in Razor Page.
description: "An example on how to configure the Telerik UI Notification HtmlHelper for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_notification_razorpage_aspnetcore
position: 6
---

# Razor Page

This article describes an example how to configure the Telerik UI Notification HtmlHelper for {{ site.framework }} in a RazorPage scenario and get its value from the server.

For the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)        
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
```tab-PageModel(cshtml.cs)      
	
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

