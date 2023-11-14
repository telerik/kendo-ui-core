---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure a DateInput with Globalization in Razor Pages."
slug: htmlhelpers_dateinput_razorpage_aspnetcore
position: 5
---

# DateInput in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI DateInput for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the DateInput component in a Razor Pages scenario.

For the complete project, refer to the [DateInput in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/DateInput/DateInputIndex.cshtml).

```tab-HtmlHelper(csthml)
@page
@model Telerik.Examples.RazorPages.Pages.DateInput.DateInputGlobalizationModel
@{
    ViewData["Title"] = "DateInputGlobalization";
}

@using System.Globalization

@{
    // Set the server culture.
    var culture = CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("de-DE");
}

/* Add the culture script from your local folder or the Kendo CDN. Use the culture variable from above to make sure the server and client cultures match. */
<script src="@Url.Content("https://kendo.cdn.telerik.com/2020.3.1118/js/cultures/kendo.culture." + culture + ".min.js")"></script>

<script type="text/javascript">
    // Set the client culture.
    kendo.culture("@culture");
</script>

<div>
    <h4>Enter a date</h4>
    @(Html.Kendo().DateInput()
        .Name("dateinput")
        .Value(DateTime.Today)
    )

    @(Html.Kendo().DateInput()
      .Name("dateinput2")
    )
</div>


<style>
    div {
        text-align: center;
    }
</style>
```
{% if site.core %}
```tab-TagHelper(csthml)
@page
@model Telerik.Examples.RazorPages.Pages.DateInput.DateInputGlobalizationModel
@{
    ViewData["Title"] = "DateInputGlobalization";
}

@addTagHelper *, Kendo.Mvc
@using System.Globalization

@{
    // Set the server culture.
    var culture = CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("de-DE");
}

/* Add the culture script from your local folder or the Kendo CDN. Use the culture variable from above to make sure the server and client cultures match. */
<script src="@Url.Content("https://kendo.cdn.telerik.com/2020.3.1118/js/cultures/kendo.culture." + culture + ".min.js")"></script>

<script type="text/javascript">
    // Set the client culture.
    kendo.culture("@culture");
</script>

<div>
    <h4>Enter a date</h4>
    <kendo-dateinput name="dateinput" value="DateTime.Today">
    </kendo-dateinput>

    <kendo-dateinput name="dateinput2">
    </kendo-dateinput>
</div>


<style>
    div {
        text-align: center;
    }
</style>
```
{% endif %}

```tab-PageModel(cshtml.cs)
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Telerik.Examples.RazorPages.Pages.DateInput
{
    public class DateInputGlobalizationModel : PageModel
    {
        public void OnGet()
        {
        }
    }
}
```

* [Server-Side API](/api/dateinput)