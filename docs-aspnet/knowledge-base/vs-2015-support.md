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


For more information, see the [Supported OS and Visual Studio Versions]({% slug ossupport_core %}) article.

## More {{ site.framework }} Resources

* [{{ site.product }} Documentation]({%slug overview_aspnetmvc6_aspnetmvc%})

* [{{ site.product }} Demos](https://demos.telerik.com/{{ site.platform }})

{% if site.core %}
* [{{ site.product }} Product Page](https://www.telerik.com/aspnet-core-ui/dropdownlist)

* [{{ site.product }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.product }} Product Page](https://www.telerik.com/aspnet-mvc)

* [{{ site.product }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
