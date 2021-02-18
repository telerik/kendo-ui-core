---
title: Razor Page
page_title: Configure the RadioButton in Razor Page
description: "Learn how to configure the Telerik UI RadioButton for {{ site.framework }} in Razor Page scenario."
previous_url: /helpers/navigation/radiobutton/model-binding
slug: razor_page_radiobutton_aspnetcore
position: 4
---

# Razor Page

This article demonstrates how to configure the Telerik UI RadioButton HtmlHelper for {{ site.framework }} in a RazorPage scenario.

For the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)
    @page
    @model Telerik.Examples.RazorPages.Pages.RadioButon.RadioButtonIndexModel
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <h4>Agree to Terms and Conditions:</h4>
    <ul class="fieldlist">
        <li>
            @(Html.Kendo().RadioButtonFor(m => m.IAgreeProp).Label("I agree").Value(true))
        </li>
        <li>
            @(Html.Kendo().RadioButtonFor(m => m.IAgreeProp).Label("I Disagree").Value(false))
        </li>
    </ul>
```
```tab-PageModel(cshtml.cs)      
	[BindProperty]
    public bool IAgreeProp { get; set; }
    public void OnGet()
    {
        IAgreeProp = true;
    }
```
