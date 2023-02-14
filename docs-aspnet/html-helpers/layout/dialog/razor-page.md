---
title:  Razor Page
page_title: Configure a Dialog in Razor Page.
description: "An example on how to configure the Telerik UI Dialog component for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_dialog_razorpage_aspnetcore
position: 5
---

# Razor Page

This article describes how to configure the Telerik UI Dialog for {{ site.framework }} in a RazorPage scenario.

The example below demonstrates how to pass antiforgery token when an action from the Dialog is clicked. See the implementation details in the example below, and for the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

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

