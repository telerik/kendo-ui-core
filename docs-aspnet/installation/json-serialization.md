---
title: JSON Serialization
page_title: JSON Serialization
description: "How to configure JSON Serialization when working with Grid and other data-bound widgets."
previous_url: /getting-started/prerequisites/environment-support, /getting-started/prerequisites/json-serialization, /compatibility/json-serialization
slug: jsonserialization_core
position: 5
---

# JSON Serialization

When you use Grid or other data-bound widgets in your code, make sure that the property name casing doesn't change during serialization.

Data-bound Telerik UI components like the Grid depend on Pascal case-formatted response from the server. However, the default casing for JSON strings in ASP.NET Core is the Camel case. If the serializer changes the casing to Camel, the data-bound widget cannot display the data correctly.

This document describes the recommended approaches to maintain the Pascal case in different ASP.NET Core versions.

## Configure JSON Serialization in ASP.NET Core 6 and the Minimal Hosting Model

For applications using .NET 6 and the [minimal hosting model](https://docs.microsoft.com/en-us/aspnet/core/migration/50-to-60?view=aspnetcore-6.0&tabs=visual-studio#new-hosting-model) open the `Program.cs` file. To set the serialization options for the application use any of the approaches demonstrated below.

* Use the default serialization that is delivered with ASP.NET Core (recommended approach).
	```
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

* Use the `Newtonsoft` library.

	```
	var builder = WebApplication.CreateBuilder(args);

	// Add services to the container.
	builder.Services.AddControllersWithViews()
					// Maintain property names during serialization. See:
					// https://github.com/aspnet/Announcements/issues/194
					.AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.DefaultContractResolver());
	
	// Add Kendo UI services to the services container
	builder.Services.AddKendo();
	```
## Configure JSON Serialization in ASP.NET Core 3 and Later

There are three ways to configure the JSON serialization in ASP.NET Core 3 or later versions:

* The recommended approach is to use the default serialization that is delivered with ASP.NET Core. To configure it, locate the `ConfigureServices` method and update it by adding the code below.

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

* The first alternative approach is to maintain the property names casing globally. Locate the `ConfigureServices` method and update it by adding the `using Newtonsoft.Json.Serialization;` line at the top.

	```
	...
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

* The second alternative approach is to use the default JSON serialization throughout the application and include the built-in `System.Text.Json.JsonSerializerOptions` in the controller action method response.

	```
	...
		using System.Text.Json;
	...

	public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
    {

        DataSourceResult result =  orders.ToDataSourceResult(request);
        return Json(result, new JsonSerializerOptions() { PropertyNameCaseInsensitive = false });
    }
	```

## Configure JSON Serialization in ASP.NET Core 2
 
To maintain the property names casing, locate the `ConfigureServices` method and update it by adding the `using Newtonsoft.Json.Serialization;` line at the top.

			...
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

## See Also

* [PDF and Excel Export Support by Telerik UI for ASP.NET Core]({% slug exportsupport_core %})
* [Operation System Support by Telerik UI for ASP.NET Core]({% slug ossupport_core %})
* [Earlier Versions Support Policy by Telerik UI for ASP.NET Core]({% slug oldversionssupportpolicy_core %})
* [Data Binding of the Telerik UI for ASP.NET Core Grid]({% slug htmlhelpers_grid_aspnetcore_binding_overview %})
