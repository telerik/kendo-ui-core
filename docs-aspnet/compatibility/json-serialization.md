---
title: JSON Serialization
page_title: JSON Serialization
description: "How to configure JSON Serialization when working with Grid and other data-bound widgets."
previous_url: /getting-started/prerequisites/environment-support, /getting-started/prerequisites/json-serialization
slug: jsonserialization_core
position: 1
---

# JSON Serialization

When you use Grid or other data-bound widgets in your code, make sure that the property name casing doesn't change during serialization. This document describes the recommended approaches.   

### Configure JSON Serialization in ASP.NET Core 2
 
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

### Configure JSON Serialization in ASP.NET Core 3 

There are three ways to configure JSON Serialization in ASP.NET Core 3:

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

* The first alternative approach is to maintain the property names casing globally, locate the `ConfigureServices` method and update it by adding the `using Newtonsoft.Json.Serialization;` line at the top.

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

* The second alternative approach is to use the default Json serialization throughout the application and include the built-in `System.Text.Json.JsonSerializerOptions` in the controller action method response.

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

## See Also

* [Web Browser Support by Telerik UI for ASP.NET Core]({% slug webbrowsersupport_core %})
* [PDF and Excel Export Support by Telerik UI for ASP.NET Core]({% slug exportsupport_core %})
* [Operation System Support by Telerik UI for ASP.NET Core]({% slug ossupport_core %})
* [Earlier Versions Support Policy by Telerik UI for ASP.NET Core]({% slug oldversionssupportpolicy_core %})
