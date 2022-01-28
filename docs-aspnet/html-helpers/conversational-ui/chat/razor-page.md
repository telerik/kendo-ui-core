---
title:  Razor Page
page_title: Configure a Chat in Razor Page.
description: "An example on how to configure the Telerik UI Chat HtmlHelper for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_chat_razorpage_aspnetcore
position: 3
---

# Razor Page

This article describes how to configure the Telerik UI Chat HtmlHelper for {{ site.framework }} in a RazorPage scenario.

For the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)        
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

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [Chat Overview]({% slug htmlhelpers_chat_aspnetcore %})

