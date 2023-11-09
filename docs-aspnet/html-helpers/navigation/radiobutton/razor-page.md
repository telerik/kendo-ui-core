---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to configure the Telerik UI RadioButton for {{ site.framework }} in a Razor Pages scenario."
slug: razor_page_radiobutton_aspnetcore
position: 7
---

# RadioButton in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI RadioButton for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the RadioButton component in a Razor Pages scenario.

For the complete project, refer to the [RadioButton in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/RadioButon/RadioButtonIndex.cshtml).

```tab-HtmlHelper(cshtml)
    @page
    @model Telerik.Examples.RazorPages.Pages.RadioButon.RadioButtonIndexModel
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <h4>Agree to Terms and Conditions:</h4>
    <ul class="fieldlist">
        <li>
            @(Html.Kendo().RadioButtonFor(m => m.IAgreeProp).Label("I Agree").Value(true))
        </li>
        <li>
            @(Html.Kendo().RadioButtonFor(m => m.IAgreeProp).Label("I Disagree").Value(false))
        </li>
    </ul>
```
{% if site.core %}
```tab-TagHelper(cshtml)
    @page
    @model Telerik.Examples.RazorPages.Pages.RadioButon.RadioButtonIndexModel
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <h4>Agree to Terms and Conditions:</h4>
    <ul class="fieldlist">
        <li>
            <kendo-radiobutton name="IAgreeProp" label="I Agree" value="true"></kendo-radiobutton>
        </li>
        <li>
            <kendo-radiobutton name="IAgreeProp" label="I Disagree" value="false"></kendo-radiobutton>
        </li>
    </ul>
```
{% endif %}
```tab-PageModel(cshtml.cs)      
	[BindProperty]
    public bool IAgreeProp { get; set; }
    public void OnGet()
    {
        IAgreeProp = true;
    }
```
