---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to configure the Telerik UI Chat component for {{ site.framework }} in Razor Pages."
slug: htmlhelpers_chat_razorpage_aspnetcore
position: 3
---

# Chat in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Chat for {{ site.framework }} in Razor Pages applications.

This article showcases how to configure a basic Chat component in a Razor Pages scenario.

For the complete project, refer to the [Chat in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Chat/ChatIndex.cshtml).


```tab-HtmlHelper_Index.cshtml  
    @page
    @IndexModel
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

	@(Html.Kendo().Chat()
        .Name("chat")
        .Toolbar(toolbar =>
        {
            toolbar.Toggleable(true);
            toolbar.Scrollable(true);
            toolbar.Buttons(buttons =>
            {                
                buttons.Add().Name("Bold").IconClass("k-icon k-i-bold");
                buttons.Add().Name("Italic").IconClass("k-icon k-i-italic");
                buttons.Add().Name("Underline").IconClass("k-icon k-i-underline");
            });
        })   
    )
```
```tab-TagHelper_Index.cshtml  
    @page
    @IndexModel
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <kendo-chat name="chat">
        <toolbar toggleable="true" scrollable="true">
            <buttons>
                <button name="Bold" icon-class="k-icon k-i-bold" />
                <button name="Italic" icon-class="k-icon k-i-italic" />
                <button name="Underline" icon-class="k-icon k-i-underline" />
            </buttons>
        </toolbar>
    </kendo-chat>
```
```tab-Index.cshtml.cs     
    public void OnGet()
    {

    }
```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Chat](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat)
* [Server-Side HtmlHelper API of the Chat](/api/chat)
* [Server-Side TagHelper API of the Chat](/api/taghelpers/chat)
* [Knowledge Base Section](/knowledge-base)

