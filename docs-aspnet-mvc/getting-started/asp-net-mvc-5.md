---
title: Creating Applications
page_title: Creating Applications | Telerik UI for ASP.NET MVC
description: "Use Telerik UI for ASP.NET MVC in ASP.NET MVC 5 applications."
previous_url: /aspnetmvc-apps/asp-net-mvc-5, /asp-net-mvc-5
slug: aspnetmvc5_aspnetmvc
position: 14
---

# Creating Applications

This article demonstrates how to use Telerik UI for ASP.NET MVC in ASP.NET MVC 5 applications.

It uses Visual Studio 2013 but the examples are applicable to all Visual Studio versions that support ASP.NET MVC 5. The examples create a new ASP.NET MVC 5 application but the steps to use Telerik UI for ASP.NET MVC in existing ASP.NET MVC 5 applications are the same.

> **Important**
>
> The Telerik UI for ASP.NET MVC [Visual Studio extensions]({% slug overview_visualstudio_aspnetmvc %}) automate the whole procedure. This is the main topic of the current article.

## Create New ASP.NET MVC 5 Applications

Below are listed the steps for you to follow when creating a new ASP.NET MVC 5 application.

1. Open Visual Studio 2013.

1. Press `CTRL+SHIFT+N` to create a new project.

1. Select the **Visual C#** > **Web** to show all available web project templates for C#.

1. Select **ASP.NET Web Application** > **OK**. This starts the **New ASP.NET Project** wizard.

1. Select **MVC** from the available templates and click **OK**.

1. Press `CTRL+F5` to build and run the application.

    **Figure 1. The new ASP.NET MVC 5 application**

    ![New ASP.NET MVC 5 Application](/images/mvc5-new-app.png)

## Add Telerik UI for ASP.NET MVC

To use Telerik UI for ASP.NET MVC, include the required JavaScript and CSS files, reference the `Kendo.Mvc.dll` assembly and update the `web.config` file of the application.

### Include JavaScript and CSS Files

Telerik UI for ASP.NET MVC requires certain JavaScript and CSS files to be included in the page.

There are two options:
* Either include a local copy of those files
* Or use the Kendo UI CDN (Content Delivery Network) services

#### Use Local JavaScript and CSS

Below are listed the steps for you to follow when copying the required JavaScript and CSS files in the Visual Studio Solution of the application.

1. Navigate to the install location of Telerik UI for ASP.NET MVC. By default, it is in `C:\Program Files (x86)\Telerik\`.

1. Copy the `js` directory from the install location and paste it in the `Scripts` folder of the application.

1. Copy the `styles` directory from the install location and paste it in the `Content` folder of the application.

1. Rename the `Scripts/js` directory to `Scripts/kendo`. Rename `Content/styles` to `Content/kendo`.

    **Figure 2. Kendo UI directories in the Solution Explorer**

    ![Kendo directories in Solution Explorer](/images/mvc5-solution.png)

    After the needed JavaScript and CSS files are added to the application, you can include them.

1. Open `App_Start/BundleConfig.cs` to add bundles for Telerik UI for ASP.NET MVC.

1. Add a script bundle for Telerik UI for ASP.NET MVC.

    ###### Example

            bundles.Add(new ScriptBundle("~/bundles/kendo").Include(
                        "~/Scripts/kendo/kendo.all.min.js",
                        // "~/Scripts/kendo/kendo.timezones.min.js", // uncomment if using the Scheduler
                        "~/Scripts/kendo/kendo.aspnetmvc.min.js"));

1. Add a style bundle for Telerik UI for ASP.NET MVC.

    > **Important**
    >
    > Make sure you are familiar with the article on the Telerik UI for ASP.NET MVC [fundamentals and CSS bundling]({% slug fundamentals_aspnetmvc %}#css-bundling).

    ###### Example

            bundles.Add(new StyleBundle("~/Content/kendo/css").Include(
                        "~/Content/kendo/kendo.common-bootstrap.min.css",
                        "~/Content/kendo/kendo.bootstrap.min.css"));

1. Tell the ASP.NET bundles to allow minified files in debug mode.

    ###### Example

            bundles.IgnoreList.Clear();

1. Open the layout of the application. By default, it is `Views/Shared/_Layout.cshtml`, or `Site.master` if using ASPX.

1. Render the Telerik UI for ASP.NET MVC style bundle.

    ###### Example

    ```tab-ASPX

        <%: Styles.Render("~/Content/kendo/css") %>
    ```
    ```tab-Razor

        @Styles.Render("~/Content/kendo/css")
    ```

1. Move the jQuery bundle to the `head` tag of the page. It is at the end of the page by default.

1. Render the Telerik UI for ASP.NET MVC script bundle after jQuery.

    ###### Example

    ```tab-ASPX

        <%: Scripts.Render("~/bundles/jquery") %>
        <%: Scripts.Render("~/bundles/kendo") %>
    ```
    ```tab-Razor

        @Scripts.Render("~/bundles/jquery")
        @Scripts.Render("~/bundles/kendo")
    ```

#### Use CDN Services

Below are listed the steps for you to follow when including the Telerik UI for ASP.NET MVC JavaScript and CSS files from CDN.

> **Important**
>
> Make sure you replace the `kendo ui version` from the code snippets below with the current version of the product&mdash;for example, `2013.2.918`.

1. Open the layout of the application. By default, it is `Views/Shared/_Layout.cshtml`, or `Site.master` if using ASPX.

1. Include `kendo.common-bootstrap.min.css` and `kendo.bootstrap.min.css`. Add a `link` tag within the `head` tag of the layout.

    ###### Example

            <link rel="stylesheet" href="http://kendo.cdn.telerik.com/<kendo ui version>/styles/kendo.common-bootstrap.min.css" />
            <link rel="stylesheet" href="http://kendo.cdn.telerik.com/<kendo ui version>/styles/kendo.bootstrap.min.css" />

1. Include `kendo.all.min.js` and `kendo.aspnetmvc.min.js` after jQuery.

    ###### Example

            <script src="http://kendo.cdn.telerik.com/<kendo ui version>/js/kendo.all.min.js"></script>
            <script src="http://kendo.cdn.telerik.com/<kendo ui version>/js/kendo.aspnetmvc.min.js"></script>

1. If using the Telerik MVC Scheduler wrapper, include `kendo.timezones.min.js` after `kendo.all.min.js`.

    ###### Example

            <script src="http://kendo.cdn.telerik.com/<kendo ui version>/js/kendo.all.min.js"></script>
            <script src="http://kendo.cdn.telerik.com/<kendo ui version>/js/kendo.timezones.min.js"></script>
            <script src="http://kendo.cdn.telerik.com/<kendo ui version>/js/kendo.aspnetmvc.min.js"></script>

### Add Kendo.Mvc.dll Reference

The next step is to add a reference to `Kendo.Mvc.dll` which is the assembly containing the Kendo UI MVC server-side wrappers.

1. Right-click the **References** node in Solution Explorer. Click **Add Reference**.

1. Select the **Browse** tab of the **Add Reference** dialog. Navigate to the install location of Telerik UI for ASP.NET MVC.

1. Navigate to `wrappers/aspnetmvc/Binaries/MVC5`. This directory contains the ASP.NET MVC 5 version of Telerik UI for ASP.NET MVC.

1. Select `Kendo.Mvc.dll`. Click **OK**.

### Update web.config

The next step is to let ASP.NET MVC know of the `Kendo.Mvc.UI` namespace where the server-side wrappers are. To do this, update the `web.config` file of the web application.

1. Open `Views/Web.config`, or root `Web.config` if using ASPX.

1. Locate the `namespaces` tag.

1. Append an `add` tag to the `namespaces` tag.

    ###### Example

            <namespaces>
                <add namespace="System.Web.Mvc" />
                <add namespace="System.Web.Mvc.Ajax" />
                <add namespace="System.Web.Mvc.Html" />
                <add namespace="System.Web.Routing" />
                <add namespace="Kendo.Mvc.UI" />
            </namespaces>

1. Add a binding redirect to your current `System.Web.Mvc` version.

    ###### Example

            <dependentAssembly>
                <assemblyIdentity name="System.Web.Mvc" publicKeyToken="31bf3856ad364e35" />
                <bindingRedirect oldVersion="0.0.0.0-5.2.3.0" newVersion="5.2.3.0" />
            </dependentAssembly>

## Use Kendo UI Widgets

Below are listed the steps for you to follow when using a Kendo UI widget through its MVC server-side wrapper initialization.

1. Open the `Views/Home/Index.cshtml` view, or `Index.aspx` if using ASPX.

1. Add a Kendo UI DatePicker widget.

    ###### Example

    ```tab-ASPX

        <%: Html.Kendo().DatePicker().Name("datepicker") %>
    ```
    ```tab-Razor

        @(Html.Kendo().DatePicker().Name("datepicker"))
    ```

1. Press `CTRL+F5` to build and run the application.

    **Figure 3. The final result**

    ![Final result](/images/mvc5-final.png)

## Next Steps

* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Use the Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})

## See Also

* [Telerik UI for ASP.NET MVC Overview]({% slug overview_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Custom DataSource]({% slug customdatasource_aspnetmvc %})
* [Validation with Telerik UI for ASP.NET MVC]({% slug validation_aspnetmvc %})
* [Globalization with Telerik UI for ASP.NET MVC]({% slug globalization_aspnetmvc %})
* [Localization with Telerik UI for ASP.NET MVC]({% slug localization_aspnetmvc %})
* [Visual Basic Syntax]({% slug visualbasic_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Wrappers vs Kendo UI Widgets]({% slug wrappersvswidgets_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Visual Studio Integration]({% slug overview_visualstudio_aspnetmvc %})
* [Migration from Telerik Extensions]({% slug overview_migrationextensions_aspnetmvc %})
* [Telerik UI for ASP.NET MVC HtmlHelpers]({% slug overview_autocompletehelper_aspnetmvc %})
* [ASP.NET Core](http://docs.telerik.com/aspnet-core/introduction)
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Telerik UI for ASP.NET MVC NuGet Packages]({% slug aspnetmvc_nuget %})
* [Scaffolding with Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
