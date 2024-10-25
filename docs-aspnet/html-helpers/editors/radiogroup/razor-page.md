---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to configure the Telerik UI RadioGroup for {{ site.framework }} in RazorPages scenario."
slug: htmlhelpers_radiogroup_aspnetcore_razor_page
position: 5
---

# RadioGroup in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI RadioGroup for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the RadioGroup component in a Razor Pages scenario.

For the complete project, refer to the [RadioGroup in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/RadioGroup/RadioGroupIndex.cshtml).

```tab-HtmlHelper(csthml)
    @page
    @model Telerik.Examples.RazorPages.Pages.RadioGroup.RadioGroupIndexModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <h1>RadioGroup</h1>

    @(Html.Kendo().RadioGroup()
            .Name("radiogroup")
            .Items(i =>
            {
                i.Add().Label("Phone (SMS)").Value("1");
                i.Add().Label("E-mail").Value("2");
                i.Add().Label("None").Value("3");
            })
            .Value("1")
    )
```
{% if site.core %}
```tab-TagHelper(csthml)
    @page
    @model Telerik.Examples.RazorPages.Pages.RadioGroup.RadioGroupIndexModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <h1>RadioGroup</h1>
    
    <kendo-radiogroup name="radiogroup" 
                      radio-name="radiogroup" 
                      value="1">
          <kendo-radiogroup-items>
              <kendo-radiogroup-item label="Phone (SMS)" value="1"></kendo-radiogroup-item>
              <kendo-radiogroup-item label="E-mail" value="2"></kendo-radiogroup-item>
              <kendo-radiogroup-item label="None" value="3"></kendo-radiogroup-item>
          </kendo-radiogroup-items>
    </kendo-radiogroup>
```
{% endif %}
```tab-PageModel(cshtml.cs)      
	public class RadioGroupIndexModel : PageModel
    {
        public void OnGet()
        {
        }
    }
```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [RadioGroup Overview]({% slug htmlhelpers_radiogroup_aspnetcore_overview %})