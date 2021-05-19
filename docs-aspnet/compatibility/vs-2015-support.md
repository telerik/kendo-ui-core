---
title: Visual Studio 2015 Support
page_title: Visual Studio 2015 Support
description: "Learn about the Visual Studio 2015 specifics related to the Progress Telerik UI for ASP.NET Core."
previous_url: /getting-started/prerequisites/vs-2015-support
slug: vs2015support_core
position: 7
---

## Overview

To enjoy the full functionality of the Telerik UI for ASP.NET Core, we recommend the latest Visual Studio version. Read further if you would like to learn more about the VS 2015 specifics.

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

## See Also

* [Visual Studio Support by Telerik UI for ASP.NET Core]({% slug visualstudiosupport_core %})
* [PDF and Excel Export Support by Telerik UI for ASP.NET Core]({% slug exportsupport_core %})
* [Operation System Support by Telerik UI for ASP.NET Core]({% slug ossupport_core %})
* [Earlier Versions Support Policy by Telerik UI for ASP.NET Core]({% slug oldversionssupportpolicy_core %})
