---
title: Use with ASP.NET MVC 3
page_title: Use with ASP.NET MVC 3 | Telerik UI for ASP.NET MVC
description: "Use Telerik UI for ASP.NET MVC in ASP.NET MVC 3 applications."
previous_url: /aspnet-mvc/aspnetmvc-apps/asp-net-mvc-3
slug: aspnetmvc3_aspnetmvc
position: 11
---

# Use with ASP.NET MVC 3

This article demonstrates how to use Telerik UI for ASP.NET MVC in ASP.NET MVC 3 applications. It uses Visual Studio 2010 but the examples are applicable to all Visual Studio versions that support ASP.NET MVC 3. The examples create a new ASP.NET MVC 3 application but the steps to use Telerik UI for ASP.NET MVC in existing ASP.NET MVC 3 applications are the same.

> **Important**
>
> The [Telerik UI for ASP.NET MVC Visual Studio extensions]({% slug overview_visualstudio_aspnetmvc %}) automate the whole procedure which this document describes.

## Create New ASP.NET MVC 3 Applications

Below are listed the steps for you to follow when creating a new ASP.NET MVC 3 application.

**Step 1** Open Visual Studio 2010.

**Step 2** Press `CTRL+SHIFT+N` to create a new project.

**Step 3** Select the **Visual C#** > **Web** to show all available web project templates for C#.

**Step 4** Select **ASP.NET MVC 3 Web Application** > **OK**. This starts the **New ASP.NET MVC 3 Project** wizard.

**Step 5** Select **Internet Application** from the available templates and click **OK**. Alternatively, you can select other templates&mdash;the remaining steps are the same.

**Step 6** Press `CTRL+F5` to build and run the application.

**Figure 1. The new ASP.NET MVC 3 application**

![New ASP.NET MVC 3 Application](/aspnet-mvc/images/mvc3-new-app.png)

## Add Telerik UI for ASP.NET MVC

To use Telerik UI for ASP.NET MVC, include the required JavaScript and CSS files, reference the `Kendo.Mvc.dll` assembly and update the `web.config` file of the application.

### Include JavaScript and CSS Files

Telerik UI for ASP.NET MVC requires certain JavaScript and CSS files to be included in the page.

There are two options:
* Either include a local copy of those files, or
* Use the Kendo UI CDN (Content Delivery Network) services

#### Use Local JavaScript and CSS

Below are listed the steps for you to follow when copying the required JavaScript and CSS files in the Visual Studio Solution of the application.

**Step 1** Navigate to the install location of Telerik UI for ASP.NET MVC. By default, it is in `C:\Program Files (x86)\Telerik\`.

**Step 2** Copy the `js` directory from the install location and paste it in the `Scripts` folder of the application.

**Step 3** Copy the `styles` directory from the install location and paste it in the `Content` folder of the application.

**Step 4** Rename the `Scripts/js` directory to `Scripts/kendo`. Rename `Content/styles` to `Content/kendo`.

**Figure 2. Kendo UI directories in the Solution Explorer**

![Kendo directories in Solution Explorer](/aspnet-mvc/images/mvc3-solution.png)

After the needed JavaScript and CSS files are added to the application, you can include them.

**Step 5** Open the layout of the application. By default, it is `Views/Shared/_Layout.cshtml`, or `Site.master` if you are using ASPX.

**Step 6** Include `Content/kendo/kendo.common.min.css` and `Content/kendo/kendo.default.min.css`. Add a `link` tag within the `head` tag of the layout.

###### Example

```tab-ASPX

    <link rel="stylesheet" href="<%: Url.Content("~/Content/kendo/kendo.common.min.css") %>" />
    <link rel="stylesheet" href="<%: Url.Content("~/Content/kendo/kendo.default.min.css") %>" />
```
```tab-Razor

    <link rel="stylesheet" href="@Url.Content("~/Content/kendo/kendo.common.min.css")" />
    <link rel="stylesheet" href="@Url.Content("~/Content/kendo/kendo.default.min.css")" />
```

**Step 7** Delete any existing `script` tags that include older versions of jQuery.

**Step 8** Include the jQuery JavaScript file distributed with Telerik UI for ASP.NET MVC, or a compatible version from other location. Add a `script` tag in within the `head` tag of the layout.

###### Example

```tab-ASPX

    <script src="<%: Url.Content("~/Scripts/kendo/jquery.min.js") %>"></script>
```
```tab-Razor

    <script src="@Url.Content("~/Scripts/kendo/jquery.min.js")"></script>
```

**Step 9** Include `Scripts/kendo/kendo.all.min.js` and `Scripts/kendo/kendo.aspnetmvc.min.js` after jQuery.

###### Example

```tab-ASPX

    <script src="<%: Url.Content("~/Scripts/kendo/jquery.min.js") %>"></script>
    <script src="<%: Url.Content("~/Scripts/kendo/kendo.all.min.js") %>"></script>
    <script src="<%: Url.Content("~/Scripts/kendo/kendo.aspnetmvc.min.js") %>"></script>
```
```tab-Razor

    <script src="@Url.Content("~/Scripts/kendo/jquery.min.js")"></script>
    <script src="@Url.Content("~/Scripts/kendo/kendo.all.min.js")"></script>
    <script src="@Url.Content("~/Scripts/kendo/kendo.aspnetmvc.min.js")"></script>
```

**Step 10** If using the Telerik ASP.NET MVC Scheduler wrapper, include `Scripts/kendo/kendo.timezones.min.js` after `kendo.all.min.js`.

###### Example

```tab-ASPX

    <script src="<%: Url.Content("~/Scripts/kendo/jquery.min.js") %>"></script>
    <script src="<%: Url.Content("~/Scripts/kendo/kendo.all.min.js") %>"></script>
    <script src="<%: Url.Content("~/Scripts/kendo/kendo.timezones.min.js") %>"></script>
    <script src="<%: Url.Content("~/Scripts/kendo/kendo.aspnetmvc.min.js") %>"></script>
```
```tab-Razor

    <script src="@Url.Content("~/Scripts/kendo/jquery.min.js")"></script>
    <script src="@Url.Content("~/Scripts/kendo/kendo.all.min.js")"></script>
    <script src="@Url.Content("~/Scripts/kendo/kendo.timezones.min.js")"></script>
    <script src="@Url.Content("~/Scripts/kendo/kendo.aspnetmvc.min.js")"></script>
```

#### Use CDN Services

Below are listed the steps for you to follow when including the Telerik UI for ASP.NET MVC JavaScript and CSS files from CDN.

> **Important**
>
> Make sure you replace the `kendo ui version` from the code snippets below with the current version of the product&mdash;for example, `2013.2.918`.

**Step 1** Open the layout of the application. By default, it is `Views/Shared/_Layout.cshtml`, or `Site.master` if using ASPX.

**Step 2** Include `kendo.common.min.css` and `kendo.default.min.css`. Add a `link` tag within the `head` tag of the layout.

###### Example

        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/<kendo ui version>/styles/kendo.common.min.css" />
        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/<kendo ui version>/styles/kendo.default.min.css" />

**Step 3** Delete any existing `script` tags that include older versions of jQuery.

**Step 4** Include the jQuery JavaScript file from the CDN or a compatible version from other location. Add a `script` tag in within the `head` tag.

###### Example

        <script src="http://kendo.cdn.telerik.com/<kendo ui version>/js/jquery.min.js”></script>

**Step 5** Include `kendo.all.min.js` and `kendo.aspnetmvc.min.js` after jQuery.

###### Example

        <script src="http://kendo.cdn.telerik.com/<kendo ui version>/js/kendo.all.min.js”></script>
        <script src=”http://kendo.cdn.telerik.com/<kendo ui version>/js/kendo.aspnetmvc.min.js”></script>

**Step 6** If using the Telerik MVC Scheduler wrapper, include `kendo.timezones.min.js` after `kendo.all.min.js`.

###### Example

        <script src="http://kendo.cdn.telerik.com/<kendo ui version>/js/kendo.all.min.js"></script>
        <script src="http://kendo.cdn.telerik.com/<kendo ui version>/js/kendo.timezones.min.js"></script>
        <script src="http://kendo.cdn.telerik.com/<kendo ui version>/js/kendo.aspnetmvc.min.js"></script>

### Add Kendo.Mvc.dll Reference

The next step is to add a reference to `Kendo.Mvc.dll` which is the assembly containing the Kendo UI MVC server-side wrappers.

**Step 1** Right-click the **References** node in Solution Explorer. Click **Add Reference**.

**Step 2** Select the **Browse** tab of the **Add Reference** dialog. Navigate to the install location of Telerik UI for ASP.NET MVC.

**Step 3** Navigate to `wrappers/aspnetmvc/Binaries/MVC3`. This directory contains the ASP.NET MVC 3 version of Telerik UI for ASP.NET MVC.

**Step 4** Select `Kendo.Mvc.dll`. Click **OK**.

### Update web.config

The next step is to let ASP.NET MVC know of the `Kendo.Mvc.UI` namespace where the server-side wrappers are. To do this, update the `web.config` file of the web application.

**Step 1** Open `Views/Web.config`, or root `Web.config` if using ASPX.

**Step 2** Locate the `namespaces` tag.

**Step 3** Append an `add` tag to the `namespaces` tag.

###### Example

        <namespaces>
            <add namespace="System.Web.Mvc" />
            <add namespace="System.Web.Mvc.Ajax" />
            <add namespace="System.Web.Mvc.Html" />
            <add namespace="System.Web.Routing" />
            <add namespace="Kendo.Mvc.UI" />
        </namespaces>

## Use Kendo UI Widgets

Below are listed the steps for you to follow when using a Kendo UI widget through its MVC server-side wrapper initialization.

**Step 1** Open the `Views/Home/Index.cshtml` view, or `Index.aspx` if using ASPX.

**Step 2** Add a Kendo UI DatePicker widget.

###### Example

```tab-ASPX

    <%: Html.Kendo().DatePicker().Name("datepicker") %>
```
```tab-Razor

    @(Html.Kendo().DatePicker().Name("datepicker"))
```

**Step 3** Press `CTRL+F5` to build and run the application.

**Figure 3. The final result**

![Final result](/aspnet-mvc/images/mvc3-final.png)

## Next Steps

* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Use the Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})

## See Also

Other articles on Telerik UI for ASP.NET MVC:

* [Telerik UI for ASP.NET MVC Overview]({% slug overview_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Custom DataSource]({% slug customdatasource_aspnetmvc %})
* [Validation with Telerik UI for ASP.NET MVC]({% slug validation_aspnetmvc %})
* [Globalization with Telerik UI for ASP.NET MVC]({% slug globalization_aspnetmvc %})
* [Localization with Telerik UI for ASP.NET MVC]({% slug localization_aspnetmvc %})
* [Visual Basic Syntax]({% slug visualbasic_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Wrappers vs Kendo UI Widgets]({% slug wrappersvswidgets_aspnetmvc %})
* [Migration from Telerik Extensions]({% slug overview_migrationextensions_aspnetmvc %})
* [Telerik UI for ASP.NET MVC HtmlHelpers]({% slug overview_autocompletehelper_aspnetmvc %})
* [ASP.NET MVC 4]({% slug aspnetmvc4_aspnetmvc %})
* [ASP.NET MVC 5]({% slug aspnetmvc5_aspnetmvc %})
* [ASP.NET Core MVC]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC NuGet Packages]({% slug aspnetmvc_nuget %})
* [Scaffolding with Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
