---
title: JSON Serialization
page_title: JSON Serialization
description: "How to configure JSON Serialization when working with Grid and other data-bound components."
previous_url: /getting-started/prerequisites/environment-support, /getting-started/prerequisites/json-serialization, /compatibility/json-serialization
slug: jsonserialization_core
position: 5
---

# JSON Serialization

When you use Grid or other data-bound components, ensure that the property name casing does not change during serialization.

The data-bound Telerik UI components like the Grid, Scheduler, ListView, and more, depend on Pascal case-formatted response from the server. However, the default casing for JSON strings in ASP.NET Core is Camel case. If the serializer changes the casing to Camel, the data-bound components cannot display the data correctly.

This document describes the recommended approaches to maintain the Pascal case in different ASP.NET Core versions.

## Configure JSON Serialization in ASP.NET Core 6 and the Minimal Hosting Model

For applications using .NET 6 and the [minimal hosting model](https://docs.microsoft.com/en-us/aspnet/core/migration/50-to-60?view=aspnetcore-6.0&tabs=visual-studio#new-hosting-model), open the `Program.cs` file. To set the serialization options of the application, use any of the approaches demonstrated below.

* Use the default serialization that is delivered with ASP.NET Core **(recommended approach)**.
	```Program.cs
		var builder = WebApplication.CreateBuilder(args);

		// Add services to the container.
		builder.Services.AddControllersWithViews()
					// Maintain property names during serialization. See:
					// https://github.com/aspnet/Announcements/issues/194
					.AddJsonOptions(options =>
						options.JsonSerializerOptions.PropertyNamingPolicy = null);
		
		// Add Kendo UI services to the services container
		builder.Services.AddKendo();
	```

* Use the [`Newtonsoft`](https://www.newtonsoft.com/json) library.

	```Program.cs
		var builder = WebApplication.CreateBuilder(args);

		// Add services to the container.
		builder.Services.AddControllersWithViews()
						// Maintain property names during serialization. See:
						// https://github.com/aspnet/Announcements/issues/194
						.AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.DefaultContractResolver());
		
		// Add Kendo UI services to the services container
		builder.Services.AddKendo();
	```

## Configure JSON Serialization in ASP.NET Core 3 through ASP.NET Core 5

To configure the JSON serialization in ASP.NET Core 3 to 5, use any of the following approaches:

* Use the default serialization that is delivered with ASP.NET Core. Locate the `ConfigureServices` method and update it by adding the code below **(recommended approach)**.

	```
		public void ConfigureServices(IServiceCollection services)
		{
			...
			services
					.AddControllersWithViews()
					.AddJsonOptions(options => 
						options.JsonSerializerOptions.PropertyNamingPolicy = null);

			// Add the Kendo UI services to the services container.
			services.AddKendo();
		}
	```

* Maintain the property names casing globally. Locate the `ConfigureServices` method and update it by adding the `using Newtonsoft.Json.Serialization;` line at the top.

	```
		using Newtonsoft.Json.Serialization;
		...

		public void ConfigureServices(IServiceCollection services)
		{
			...
			services.AddMvc()
				.AddNewtonsoftJson(options =>
				options.SerializerSettings.ContractResolver =
					new DefaultContractResolver());
					
			// Add the Kendo UI services to the services container.
			services.AddKendo();
		}
	```

* Use the default JSON serialization throughout the application and include the built-in `System.Text.Json.JsonSerializerOptions` in the Controller Action method response.

	```
		using System.Text.Json;

		public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
		{

			DataSourceResult result =  orders.ToDataSourceResult(request);
			return Json(result, new JsonSerializerOptions() { PropertyNameCaseInsensitive = false });
		}
	```

## Configure JSON Serialization in ASP.NET Core 2
 
To maintain the property names casing, locate the `ConfigureServices` method and update it by adding the `using Newtonsoft.Json.Serialization;` line at the top.

```
	using Newtonsoft.Json.Serialization;
	...
    public void ConfigureServices(IServiceCollection services)
	{
		...
		// Maintain the property names during serialization.
		// For more information, refer to https://github.com/aspnet/Announcements/issues/194.
		services
			.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
			.AddJsonOptions(options =>
				options.SerializerSettings.ContractResolver = new DefaultContractResolver());

		// Add the Kendo UI services to the services container.
		services.AddKendo();
	}
```

## Serialization Indentation Options

For applications using .NET 9, [`System.Text.Json`](https://learn.microsoft.com/en-us/dotnet/api/system.text.json?view=net-9.0) provides indentation properties that allow you to specify an [indentation character](https://learn.microsoft.com/en-us/dotnet/api/system.text.json.jsonserializeroptions.indentcharacter?view=net-9.0) and [indentation size](https://learn.microsoft.com/en-us/dotnet/api/system.text.json.jsonserializeroptions.indentsize?view=net-9.0) of the JSON string.

The following example shows how to set the indentation options for the JSON result in the Grid's read request response.

```HomeController.cs
	public IActionResult ReadGridData([DataSourceRequest] DataSourceRequest request)
	{
		var gridData = new List<OrderViewModel>()
		{
			new OrderViewModel
			{
				ID = 1,
				OrderName = "Name 1"
			},
			new OrderViewModel
			{
				ID = 2,
				OrderName = "Name 2"
			}
		};

		DataSourceResult result = gridData.ToDataSourceResult(request);
		return Json(result, new JsonSerializerOptions() { 
			WriteIndented = true,
			IndentCharacter = '\t',
			IndentSize = 1,
		});
	}
```
```HtmlHelper
	@(Html.Kendo().Grid<OrderViewModel>()
		.Name("grid")
		...
		.DataSource(dataSource => dataSource
			.Ajax()
			.Read(read => read.Action("ReadGridData", "Home"))
			...
		)
    )
```
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
        <datasource type="DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("ReadGridData","Home")"/>
            </transport>
        </datasource>
        <!-- Other configuration-->
    </kendo-grid>
```

The next example shows how to set the indentation options for the default JSON serialization of the application.

```Program.cs
	var builder = WebApplication.CreateBuilder(args);

	// Add services to the container.
	builder.Services.AddControllersWithViews()
    .AddJsonOptions(options => 
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
        options.JsonSerializerOptions.WriteIndented = true;
        options.JsonSerializerOptions.IndentCharacter = '\t';
        options.JsonSerializerOptions.IndentSize = 1;
    });
	
	// Add Kendo UI services to the services container.
	builder.Services.AddKendo();
```

## See Also

* [PDF and Excel Export Support by Telerik UI for ASP.NET Core]({% slug exportsupport_core %})
* [Operation System Support by Telerik UI for ASP.NET Core]({% slug ossupport_core %})
* [Earlier Versions Support Policy by Telerik UI for ASP.NET Core]({% slug oldversionssupportpolicy_core %})
* [Data Binding of the Telerik UI for ASP.NET Core Grid]({% slug htmlhelpers_grid_aspnetcore_binding_overview %})
