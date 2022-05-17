---
title: Overview
page_title: Providing Client-Side Resources
description: "Get started with Telerik UI for ASP.NET MVC and learn about different ways of copying the client-side resources into Telerik UI for ASP.NET MVC project."
previous_url: getting-started/installation/getting-started-copy-client-resources
slug: copyclientresources_aspnetmvc
position: 1
---

# Providing Client-Side Resources

This article outlines the approaches for adding the Kendo client-side assets to your project in Visual Studio.

The UI for ASP.NET MVC suite is a set of server-side wrappers over the <a href="https://www.telerik.com/kendo-jquery-ui" target="_blank">Kendo UI for jQuery client-side widgets</a>. To use the UI for ASP.NET MVC components in an application, you need not only the binaries that enable you to use the HtmlHelpers, but also the required JavaScript and CSS client-side web assets. 

## Available Approaches

There are two popular methods for adding the Kendo client-side resources to your project: 

* Using local files

    You can provide the client-side assets by downloading the required JavaScript and CSS files from the Telerik website and then copying them into your project. For the detailed step-by-step procedure, see the [Using Local Files]({% slug using_local_client_side_resources_mvc %}) article.

* Using CDN

    The Kendo UI client-side resources like JavaScript files and CSS files are available online through the Kendo CDN service. This allows you to configure your project to import the client-side resources directly from the CDN. For more details, see the [Using CDN]({% slug cdnservices_aspnetmvc %}) article.

## Creating Custom Script Bundles

Depending on the Telerik UI components that you use in your project, you may need only the scripts that support the components in your application. To identify the scripts that you must include in your application, check the documents under [**Installation** > **Providing Client-Side Resources** > **Creating Custom Script Bundles**]({% slug script_filesfor_barcodes_widgets %}). For example, to find out what scripts are required to use the Telerik UI Charts, see the [Individual Scripts for Charts]({% slug script_filesfor_charts_widgets %}) document.

Clients with a commercial license can use the [Custom Download Builder tool](https://www.telerik.com/download/custom-download) to create a single JavaScript file which contains the dependencies only for the required widgets and features.

> * Do not use multiple custom combined scripts, as they will contain duplicate code. Instead, create one combined script file, which includes everything you need.
> * Do not use RequireJS to load Download Builder packages because the tool will not create the required AMD modules.
> * Make sure the `Server Wrappers` checkbox is checked&mdash;this will include the scripts required by the wrappers. 

## Next Steps

* [Using Local Files to Add Client-Side Resources]({% slug using_local_client_side_resources_mvc %})
* [Using CDN to Add Client-Side Resources]({% slug cdnservices_aspnetmvc %})

## See Also

* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Download and Installation]({% slug overview_downloadinstallation_mvc %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
