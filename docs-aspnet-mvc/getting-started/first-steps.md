---
title: First Steps
page_title: Getting Started on Visual Studio | Telerik UI for ASP.NET MVC
description: "Create a sample project on Visual Studio with Progress Telerik UI for ASP.NET MVC."
slug: gettingstarted_aspnetmvc
position: 1
---

# First Steps

Welcome to the First Steps guide on getting started with Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET MVC with Visual Studio!

The guide creates a use-case scenario which demonstrates how to start working with the suite and implements the Kendo UI DatePicker for ASP.NET MVC in your project by using the Telerik UI DatePicker HtmlHelper. For its purposes, the guide uses Visual Studio for Windows 2019.

To configure an ASP.NET MVC web application to use UI for ASP.NET MVC, you can use either of the following approaches:
* (Demonstrated in this guide) Create the application from scratch and manually add the necessary setup.
* [Use the Telerik UI for ASP.NET MVC Visual Studio extensions]({% slug newprojectwizards_visualstudio_aspnetmvc %}) and create an application that has all necessary scripts, styles, and editor templates.

To get up and running with the project:

1. [Create the ASP.NET MVC Web Application](#creating-the-application)
1. [Include the Telerik UI for ASP.NET MVC client-side resources](#including-the-client-side-resources)
1. [Reference the `Kendo.Mvc.dll` assembly](#adding-the-kendo.mvc.dll-reference)
1. [Update the `web.config` file of the application](#updating-the-web.config-file)
1. [Set the HtmlHelper initialization](#setting-the-htmlhelper-initialization)

## Creating the Application

1. Open Visual Studio for Windows 2019 and select **Create a New Project**.
1. Select **ASP.NET Web Application (.NET Framework)** and click **Next**.
1. Set a name and location for the project and click **Create**.
1. Select **MVC** and click **Create**.

## Including the Client-Side Resources

> * The CDN links and/or package versions have to point to the same UI for ASP.NET MVC version which your project references.
> * The Kendo UI scripts have to be placed after `jQuery`.

To include the necessary Telerik UI for ASP.NET MVC JavaScript and CSS files:

1. Go to `~\Views\Shared\_Layout.cshtml` and add the theme of your choice to the `<head>` of the document. Since the Microsoft project uses Bootstrap, you can use the Kendo UI SASS Bootstrap v4 theme to match it.
1. The Microsoft template comes with a jQuery script referenced in the body. Find it and move it to the `head`.

		@Scripts.Render("~/bundles/jquery")

1. After `jQuery`, copy and paste the scripts from this snippet. Make sure that the versions match `Kendo.Mvc.dll`. For more information, refer to the article on [including client-side resources]({% slug copyclientresources_aspnetmvc %}).

		<link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/styles/kendo.bootstrap-v4.min.css" />
		<script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>   
		<script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.aspnetmvc.min.js"></script>   			

## Adding the Kendo.Mvc.dll Reference

The `Kendo.Mvc.dll` assembly contains the Telerik UI for ASP.NET MVC helpers. `Kendo.Mvc.dll` depends on the latest version of `System.Web.Mvc`. If the application uses a previous MVC version, [upgrade to the latest version](https://www.nuget.org/packages/Microsoft.AspNet.Mvc/).

1. Right-click the **References** node in **Solution Explorer**. Click **Add Reference**.
1. Select the **Browse** tab of the **Add Reference** dialog. Navigate to the install location of Telerik UI for ASP.NET MVC.
1. Navigate to `wrappers/aspnetmvc/Binaries/MVC5`. This directory contains the ASP.NET MVC 5 version of Telerik UI for ASP.NET MVC.
1. Select `Kendo.Mvc.dll`. Click **OK**.

Alternatively, use the following approach:

1. Copy the assembly from the Telerik UI for ASP.NET MVC install location.
1. Paste the assembly in the `bin` folder of the application.
1. Add a reference to the assembly in Visual Studio.

## Updating the web.config File

By updating the `web.config` file of the web application you indicate the `Kendo.Mvc.UI` namespace where the helpers are located. For issues related to unmatching `System.Web.Mvc` versions, refer to the [article on troubleshooting]({% slug troubleshooting_aspnetmvc %}).

1. Open `Views/Web.config` or, if using ASPX, the root `Web.config` file.
1. Locate the `namespaces` tag.
1. Append an `add` tag to the `namespaces` tag.

        <namespaces>
            <add namespace="System.Web.Mvc" />
            <add namespace="System.Web.Mvc.Ajax" />
            <add namespace="System.Web.Mvc.Html" />
            <add namespace="System.Web.Routing" />
            <add namespace="Kendo.Mvc.UI" />
        </namespaces>

1. Add a binding redirect to your current `System.Web.Mvc` version.

        <configuration>
            <runtime>
                <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
                    <dependentAssembly>
                        <assemblyIdentity name="System.Web.Mvc" publicKeyToken="31bf3856ad364e35" />
                        <bindingRedirect oldVersion="1.0.0.0-5.2.7.0" newVersion="5.2.7.0" />
                    </dependentAssembly>
                </assemblyBinding>
            </runtime>
        </configuration>

## Setting the HtmlHelper Initialization

When you use a Kendo UI widget through its MVC server-side wrapper initialization:

1. Open the `~/Views/Home/Index.cshtml` view or, if using ASPX, the `Index.aspx` file.
1. Add a Kendo UI Grid HtmlHelper.

    ```Razor
        <div class="text-center">
			<h2>Kendo UI Grid</h2>
			@(Html.Kendo().Grid<GridInTabStrip.Models.Product>()
				.Name("grid")
				.Columns(columns =>
				{
					columns.Bound(c => c.ProductID).Width(100);
					columns.Bound(c => c.ProductName).Width(300);
					columns.Bound(c => c.UnitPrice).Width(100);
					columns.Bound(c => c.Discontinued).Width(200);
				})
				.DataSource(dataSource => dataSource
					.Ajax()
					.Read(read => read.Action("Select", "Home"))
				)
			)
		</div>
    ```

1. Open the `HomeController.cs` and add a new action method which will return the data as JSON. The Grid makes Ajax requests to this action. Import the `Kendo.Mvc.UI` and the `Kendo.Mvc.Extensions` namespaces do that you can use `Kendo.Mvc.UI.DataSourceRequest` and the `ToDataSourceResult` extension method.

        public ActionResult Select([DataSourceRequest]DataSourceRequest request)
        {
            var data = Enumerable.Range(1, 10)
                .Select(index => new Product
                {
                    ProductID = index,
                    ProductName = "Product #" + index,
                    UnitPrice = index * 10,
                    Discontinued = false
                });

            return Json(data.ToDataSourceResult(request), JsonRequestBehavior.AllowGet);
        }

1. Press `CTRL+F5` to build and run the application. As a result, the following sample page is created.

    ![Sample page](images/sample-page.png)

## Next Steps

* [Explore the Telerik UI for ASP.NET MVC fundamentals]({% slug fundamentals_aspnetmvc %})
* [Install Telerik UI for ASP.NET MVC with NuGet]({% slug aspnetmvc_nuget %})
* [Scaffold the Telerik UI for ASP.NET MVC project]({% slug scaffolding_aspnetmvc %})
* [Integrate Telerik UI for ASP.NET MVC in Visual Studio]({% slug overview_visualstudio_aspnetmvc %})
* [Upgrade Telerik UI for ASP.NET MVC]({% slug upgrade_aspnetmvc %})

## See Also

* [Exploring the Helper Script Dependencies]({% slug script_filesfor_barcodes_widgets %})
* [Collected Examples on ASP.NET MVC](https://github.com/telerik/kendo-examples-asp-net-mvc)
* [Collected Examples on ASP.NET Web Technologies](https://github.com/telerik/kendo-examples-asp-net)
* [Collected Examples on Telerik UI for ASP.NET MVC](https://github.com/telerik/ui-for-aspnet-mvc-examples)
