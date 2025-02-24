---
title: Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI Dialog component for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_dialog_razorpage_aspnetcore
position: 6
---

# Dialog in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Dialog for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the Dialog component in a Razor Pages scenario.

For the complete project, refer to the [Dialog in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Dialog/DialogIndex.cshtml).

```tab-HtmlHelper(csthml)  	
	@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()

	@(Html.Kendo().Dialog()
        .Name("dialog")
        .Title("Data Update")
        .Content("<p>Would you like to confirm updating the data?<p>")
        .Width(400)
        .Modal(false)
        .Actions(actions =>
        {
            actions.Add().Text("Cancel");
            actions.Add().Text("Send data").Primary(true).Action("onSendData");
        })
	)	

	<script>
		function onSendData() {
			$.ajax({
				url: "/Dialog/DialogIndex",
				type: "POST",				
				headers: {
					RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken
				},
				dataType: "json"
			});
		}
	</script>
```
{% if site.core %}
```tab-TagHelper
    <kendo-dialog name="dialog" title="Data Update" width="400" modal="false" >
        <actions>            
            <action text="Cancel">
            </action>
            <action text="Send data" primary="true" action="onSendData">
            </action>
        </actions>
        <content>
            <p>Would you like to confirm updating the data?</p>
        </content>
    </kendo-dialog>
	
	<script>
		function onSendData() {
			$.ajax({
				url: "/Dialog/DialogIndex",
				type: "POST",				
				headers: {
					RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken
				},
				dataType: "json"
			});
		}
```
{% endif %}
```tab-PageModel(cshtml.cs)      

    public void OnPost()
        {
			....
        }
```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [Dialog Overview]({% slug overview_dialoghelper_aspnetcore %})

