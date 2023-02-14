---
title: Razor Page
page_title: Configure the RadioGroup in Razor Page
description: "Learn how to configure the Telerik UI RadioGroup for {{ site.framework }} in RazorPages scenario."
slug: htmlhelpers_radiogroup_aspnetcore_razor_page
position: 5
---

# Razor Page

This article demonstrates how to configure the Telerik UI RadioGroup for {{ site.framework }} in a RazorPage scenario.

For the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

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