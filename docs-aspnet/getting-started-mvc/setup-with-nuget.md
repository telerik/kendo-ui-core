---
title: Adding Telerik UI through NuGet
page_title: Adding Telerik UI through NuGet
description: "Create a sample project in Visual Studio, and configure Telerik UI for ASP.NET MVC with the Telerik NuGet."
slug: setupwithnuget_aspnetmvc
position: 2
permalink: /getting-started/setup-with-nuget
---

# Adding Telerik UI with NuGet

This article demonstrates how to add Telerik UI components to an ASP.NET MVC Web Application by using the Telerik NuGet server. You will add the Telerik UI NuGet package and the required client-side resources manually, and then implement the Kendo UI Grid in your project by using the Telerik UI Grid HTML Helper.

To get up and running with the project:

1. [Check the prerequisites](#prerequisites)
1. [Create the ASP.NET MVC Web Application](#creating-the-application)
1. [Add the Telerik NuGet Feed to Visual Studio](#adding-the-telerik-nuget-feed-to-visual-studio)
1. [Install the UI for ASP.NET MVC NuGet package](#installing-the-nuget-package)
1. [Include the Telerik UI for ASP.NET MVC client-side resources](#including-the-client-side-resources)
1. [Initialize the HtmlHelper](#initializing-the-htmlhelper)
1. [Build and run the application](#building-and-running-the-application)

## Prerequisites

* Telerik UI for ASP.NET MVC requires the <a href="https://dotnet.microsoft.com/download/dotnet-framework" target="_blank">.NET Framework</a>.

* [Visual Studio](https://www.visualstudio.com/downloads/) 2012 or later.

   For Visual Studio 2017 or later, you must install the **ASP.NET & web development** workload. See Microsoft's <a href="/docs.microsoft.com/en-us/visualstudio/install/install-visual-studio?view=vs-2019#step-4---choose-workloads" target="_blank">Install Visual Studio workloads</a> documentation for guidance.

* To download the Telerik UI NuGet packages, you need a [Telerik account](https://www.telerik.com/account).

## Creating the Application

If you already have an existing project and you want to add Telerik UI for ASP.NET MVC to the application, skip this section and continue with [adding the Telerik NuGet](#adding-the-telerik-nuget-feed-to-visual-studio).

1. Open Visual Studio 2019 for Windows and select **Create a new project**.
1. Select **ASP.NET Web Application (.NET Framework)** and click **Next**.
1. Set a name and location for the project and click **Create**.
1. Select **MVC** and click **Create**.

## Adding the Telerik NuGet Feed to Visual Studio

Telerik maintains a NuGet feed with official UI ASP.NET MVC releases and service packs. These packages are available for registered users with active licenses.

* If you will use a free trial license, follow [these steps](#adding-the-telerik-nuget-feed-for-trial-license-users) to add the NuGet feed to Visual Studio.
* If you have already purchased a commercial license, follow [these steps](#adding-the-telerik-nuget-feed-for-users-with-commercial-license) to add the NuGet feed to Visual Studio.

>tip If you have already configured the Telerik NuGet feed in Visual Studio, jump to [Installing the NuGet Package](#installing-the-nuget-package).
	
### Adding the Telerik NuGet Feed for Trial License Users

The easiest way to add the Telerik NuGet feed to Visual Studio if you are a trial user is to install the UI for ASP.NET MVC free trial:

1. Download the [UI for ASP.NET MVC free trial](https://www.telerik.com/aspnet-mvc) installer. You need to create a free account if don't have one.

1. Run the installer.

1. Select the option **Set up Telerik NuGet package source** to automatically add the [Telerik NuGet feed]({% slug nuget_install_aspnetmvc6_aspnetmvc %}).

	![{{ site.product_short }} NuGet checkbox in Progress Trial Installer](../getting-started-mvc/images/check-nuget.png)

	>The setup wizard activates your trial license when you complete the installation. This step is mandatory because the Telerik NuGet packages are available only to clients with active licenses.
	
### Adding the Telerik NuGet Feed for Users with Commercial License

The easiest way to add the Telerik NuGet feed to Visual Studio if you purchased a commercial license is to use the Progress Control Panel:

1. Download the Progress Control Panel from the **Overview** page of your [Telerik account](https://www.telerik.com/account/). 

	![{{ site.product_short }} Download Progress Control Panel](../getting-started-mvc/images/download-control-panel.png)
	
1. Run the Progress Control Panel exe.

1. On the Login screen, check the **set up Telerik NuGet package source** option.

	![{{ site.product_short }} Set Up Nuget on Progress Control Panel Login](../getting-started-mvc/images/login-control-panel.png)
	
	If you miss to set up the Nuget Feed on login, go to the Progress Control Panel options and scroll to **Nuget Settings**. Enter your Telerik credentials and click the **Save and Close** button.

	![{{ site.product_short }} Set Up Nuget on Progress Control Panel options](../getting-started-mvc/images/nuget-control-panel-options.png)

## Installing the NuGet Package

Once you configure Visual Studio to access the Telerik NuGet server, you can add NuGet package with the Telerik UI components to the project:

1. Right-click the solution and select **Manage NuGet Packages for Solution...**.

	![{{ site.product_short }} Locating and opening the NuGet package manager menu](../getting-started-mvc/images/manage-nuget.png)
	
1. From the **Package source** drop-down, select the Telerik NuGet source.

1. Click the **Browse** tab, search for `Telerik.UI.for.AspNet.Mvc5` (or `Telerik.UI.for.AspNet.Mvc5.Trial`), and install it.

	![{{ site.product_short }} Selecting and installing the NuGet package](../getting-started-mvc/images/install-nuget-mvc.png)
	
>When you use the NuGet package manager to install `Telerik.UI.for.AspNet.Mvc5`, you save time. It performs the following steps in the background:
>* Adds a reference to the `Kendo.Mvc.dll` assembly that contains the Telerik UI for ASP.NET MVC helpers.
>* Updates the `web.config` file to indicate the `Kendo.Mvc.UI` namespace where the helpers are located.

@[template](/_contentTemplates/mvc/add-client-side-resources.md#including-client-side-resources)

## Initializing the HtmlHelper 

Perform the steps below to initialize the HtmlHelper:

1. Create a model in the `Models` folder of the application.

        public class Product
        {
            public int ProductID { get; set; }
            public string ProductName { get; set; }
            public Nullable<decimal> UnitPrice { get; set; }
            public bool Discontinued { get; set; }
        }

1. Open the `~/Views/Home/Index.cshtml` view or, if using ASPX, the `Index.aspx` file.
1. Add a Kendo UI Grid HtmlHelper.

    ```Razor
        <div class="text-center">
			<h2>Kendo UI Grid</h2>
			@(Html.Kendo().Grid<TelerikMvcApp1.Models.Product>()
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
1. Open the `HomeController.cs` and import the `Kendo.Mvc.UI` and the `Kendo.Mvc.Extensions` namespaces so that you can use `Kendo.Mvc.UI.DataSourceRequest` and the `ToDataSourceResult` extension method in the next step.

    	using Kendo.Mvc.Extensions;
    	using Kendo.Mvc.UI;

Additionally, import the namespace for the model that you created in step 1.

1. In the `HomeController.cs`, add a new action method which will return the data as JSON. The Grid makes Ajax requests to this action.

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

## Building and Running the Application 

Press `CTRL+F5` to build and run the application. As a result, the following sample page is created.

![{{ site.product_short }} Sample page](../getting-started-mvc/images/sample-page.png)

## Next Steps

* [Explore the Telerik UI for ASP.NET MVC fundamentals]({% slug fundamentals_aspnetmvc %})
* [Grid Overview]({% slug htmlhelpers_grid_aspnetcore_overview %})
* [Integrate Telerik UI for ASP.NET MVC in Visual Studio]({% slug overview_visualstudio_aspnetcore %})

## See Also

* [Exploring the Helper Script Dependencies]({% slug script_filesfor_barcodes_widgets %})
* [Collected Examples on ASP.NET MVC](https://github.com/telerik/kendo-examples-asp-net-mvc)
* [Collected Examples on ASP.NET Web Technologies](https://github.com/telerik/kendo-examples-asp-net)
* [Collected Examples on Telerik UI for ASP.NET MVC](https://github.com/telerik/ui-for-aspnet-mvc-examples)
