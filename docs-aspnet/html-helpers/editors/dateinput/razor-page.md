---
title:  Razor Pages
page_title: Configure a Telerik UI DateInput with Globalization in Razor Pages.
description: "An example on how to configure a DateInput with Globalization in Razor Pages."
slug: htmlhelpers_dateinput_razorpage_aspnetcore
position: 2
---

# Razor Page

This article demonstrates how to set up the DateInput component in a Razor Pages scenario and how to configure it for Globalization.

See the implementation details in the example below. For the full project with Razor Pages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)
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