---
title: Using Telerik UI for ASP.NET MVC with RequireJS
description: Learn how to use RequireJS in a {{ site.product }} application.
type: how-to
page_title: Using Telerik UI for ASP.NET MVC with RequireJS
previous_url: /how-to/use-with-requirejs-mvc
slug: mvc-with-requirejs
tags: requirejs, telerik, mvc
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }}</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with version 2024.4.1112</td>
 </tr>
</table>

## Description

How can I use [RequireJS](https://requirejs.org/) in a [{{ site.product }} application]({% slug overview_aspnetmvc6_aspnetmvc%})?

## Solution

The following example demonstrates how to use bundled scripts with RequireJS to initialize a [Grid]({% slug htmlhelpers_grid_aspnetcore_overview %}) component.

1. Include the desired [Kendo UI theme]({% slug sassbasedthemes_overview%}) and the RequireJS script.
1. Initialize the Grid component and [defer its initialization script]({% slug deferred_initialization_overview%}) using the [`Deferred()`](/api/kendo.mvc.ui.fluent/gridbuilder#deferredsystemboolean) method.
1. Use RequireJS to load jQuery and the [required Kendo UI scripts]({% slug copyclientresources_aspnetmvc6_aspnetmvc%}).
1. Initialize the Grid by calling the `DeferredScripts()` method in the `initApp()` function.

```Razor Index.cshtml
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/10.0.1/default/default-main.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.1/require.js"></script>

    @(Html.Kendo().Grid<Telerik.Examples.Mvc.Areas.RequireJS.Models.Product>()
        .Name("grid")
        .DataSource(dataSource => dataSource.Ajax().Read("Read", "Home"))
        .Deferred()
    )

    <script>
        require.config({
            baseUrl: "https://kendo.cdn.telerik.com/2024.4.1112/js/",
            paths: {
                "jquery": "https://code.jquery.com/jquery-3.7.1.min",
                "jszip": "https://unpkg.com/jszip/dist/jszip.min.js",
                "kendo.grid.min": "https://kendo.cdn.telerik.com/2024.4.1112/js/kendo.all.min",
                "kendo.aspnetmvc.min": "https://kendo.cdn.telerik.com/2024.4.1112/js/kendo.aspnetmvc.min"
            }
        });

        require(["jquery", "jszip", "kendo.grid.min", "kendo.aspnetmvc.min" ], initApp);

        function initApp($, JSZip, kendo) {
            window.JSZip = JSZip;

            @Html.Kendo().DeferredScripts(false)
        }
    </script>
```

For a runnable example, refer to the [ASP.NET MVC application](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/RequireJS) in the [UI for ASP.NET MVC Examples repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master).

## More {{ site.framework }} Resources

* [Telerik UI for {{ site.framework }} Product Page](https://www.telerik.com/aspnet-mvc)

* [Telerik UI for {{ site.framework }} Demos](https://demos.telerik.com/aspnet-mvc/)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forum](https://www.telerik.com/forums/aspnet-mvc)

## See Also

* [RequireJS Integration in Kendo UI for jQuery](https://docs.telerik.com/kendo-ui/third-party/using-kendo-with-requirejs)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2024%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)