---
title: Razor Pages Support
page_title: Configuring the Chat in Razor Pages
description: "Learn how to configure the Telerik UI Chat component for {{ site.framework }} in Razor Pages."
slug: htmlhelpers_chat_razorpage_aspnetcore
position: 3
---

# Chat Support for Razor Pages

This article describes how to configure the Telerik UI Chat component for {{ site.framework }} in a Razor Pages scenario.

For the full project, refer to the [Razor Pages examples on GitHub](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-HtmlHelper      
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()
	
	
	@(Html.Kendo().Chat()
        .Name("chat")
        .Toolbar(toolbar =>
        {
            toolbar.Toggleable(Model.Toggable);
            toolbar.Scrollable(Model.Scrollable);
            toolbar.Buttons(buttons =>
            {                
                buttons.Add().Name("Bold").IconClass("k-icon k-i-bold");
                buttons.Add().Name("Italic").IconClass("k-icon k-i-italic");
                buttons.Add().Name("Underline").IconClass("k-icon k-i-underline");
            });
        })
        .Messages(messages =>
        {
            messages.Placeholder(Model.Placeholder);
            messages.SendButton(Model.SendButton);
        })        
    )
	
```
```tab-TagHelper
    <kendo-chat name="chat">
        <toolbar toggleable="@Model.Toggable" scrollable="@Model.Scrollable">
            <buttons>
                <button name="Bold" icon-class="k-icon k-i-bold" />
                <button name="Italic" icon-class="k-icon k-i-italic" />
                <button name="Underline" icon-class="k-icon k-i-underline" />
            </buttons>
        </toolbar>
        <messages placeholder="@Model.Placeholder" send-button="@Model.SendButton"/>
    </kendo-chat>
```
```tab-PageModel(cshtml.cs)      
	
	public bool Toggable { get; set; }
	
    public bool Scrollable { get; set; }

    public string Placeholder { get; set; }

    public string SendButton { get; set; }

    public void OnGet()
    {
        Toggable = true;
        Scrollable = true;
        Placeholder = "Custom placeholder";
        SendButton = "Custom send button message";
    }
```

## See Also

* [Razor Pages Support by Telerik UI for {{ site.framework }}]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [Overview of the Chat for {{ site.framework }}]({% slug htmlhelpers_chat_aspnetcore %})

