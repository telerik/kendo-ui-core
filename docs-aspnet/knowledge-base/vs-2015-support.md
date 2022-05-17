---
title: Visual Studio 2015 Support
description: How can I use Visual Studio 2015 with Telerik UI for ASP.NET Core?
type: how-to
page_title: Visual Studio 2015 Support
previous_url: /getting-started/prerequisites/vs-2015-support, /compatibility/vs-2015-support
slug: vs2015support_core
tags: vs2015, support
res_type: kb
---

## Environment

<table>
	<tbody>
        <tr>
			<td>Product</td>
			<td>Progress® Telerik® UI for {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description

How can I use Visual Studio 2015 with to develop applications with Telerik UI for ASP.NET Core?

## Solution

To enjoy the full functionality of the Telerik UI for ASP.NET Core, we recommend the latest Visual Studio version. Read further if you would like to learn more about the VS 2015 specifics.

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

* [Supported OS and Visual Studio Versions]({% slug ossupport_core %})
