---
title: Environment Specifics
page_title: Environment Specifics | Prerequisites | Telerik UI for ASP.NET Core
description: "Learn about IDE or framework specifics while working with Progress Telerik UI for ASP.NET Core (aka MVC 6 or ASP.NET Core MVC) and Visual Studio."
slug: environmentsupport_core
position: 1
---

# Environment Specifics

If you use Visual Studio 2015 or when you serialize data in JSON format in .Net Core version 2 or 3, note some specific environment issues that may occur.   

## VS 2015 Support

You can use Visual Studio 2015 only for .NET Core 1.x development. However, this is not recommended because:
* The .NET Core tooling is in a preview version which is not officially supported.
* The projects are `project.json`-based which is deprecated.

In VS 2015, to ensure the matching of the ASP.NET Core version which is distributed with the Telerik UI for ASP.NET Core, manually change the `Microsoft.AspNetCore.Routing` and `Microsoft.AspNetCore.Mvc` versions to `1.1.0` in `project.json`.

If you are new to ASP.NET Core and are experiencing any compatibility issues, check [this issue](https://github.com/dotnet/sdk/issues/3124) from the `dotnet/sdk` repository and the compatibility matrix.

If you are using a VS 2015 version prior to R2 2018, locate the `Configure` method and add a call to `app.UseKendo` at the end.

		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			...

			//If using versions older than R2 2018, configure Kendo UI
			app.UseKendo(env);
		}

## JSON Serialization

(For ASP.NET Core 2) To maintain the property names casing, locate the `ConfigureServices` method and update it by adding the `using Newtonsoft.Json.Serialization;` line at the top.

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

(For ASP.NET Core 3) To maintain the property names casing, locate the `ConfigureServices` method and update it by adding the `using Newtonsoft.Json.Serialization;` line at the top.

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

## See Also

* [Web Browser Support by Telerik UI for ASP.NET Core]({% slug webbrowsersupport_core %})
* [PDF and Excel Export Support by Telerik UI for ASP.NET Core]({% slug exportsupport_core %})
* [Operation System Support by Telerik UI for ASP.NET Core]({% slug ossupport_core %})
* [Earlier Versions Support Policy by Telerik UI for ASP.NET Core]({% slug oldversionssupportpolicy_core %})
