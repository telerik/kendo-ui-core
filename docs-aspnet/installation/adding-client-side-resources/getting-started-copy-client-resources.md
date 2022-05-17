---
title: Overview
page_title: Copying Client-Side Resources
description: "Get started with Telerik UI for ASP.NET Core and learn about the different ways of copying the client-side resources into a Telerik UI for ASP.NET Core project."
previous_url: /aspnetmvc-apps/mvc-6/getting-started-vscode, /mvc-6/getting-started-vscode, /getting-started/getting-started-copy-client-resources, /getting-started/installation/getting-started-copy-client-resources, /installation/getting-started-copy-client-resources
slug: copyclientresources_aspnetmvc6_aspnetmvc
position: 1
---

# Providing Client-Side Resources

This article outlines the approaches for adding the Kendo client-side assets to your application.

The UI for ASP.NET Core suite is a set of server-side wrappers over the <a href="https://www.telerik.com/kendo-jquery-ui" target="_blank">Kendo UI for jQuery client-side widgets</a>. To use the UI for ASP.NET Core components in an application, you need not only the binaries that enable you to use the TagHelpers and HtmlHelpers, but also the required JavaScript and CSS client-side web assets. 

## Available Approaches

There are three popular methods for adding the Kendo client-side resources to your project: 

* Using local files

    You can provide the client-side assets by downloading the required JavaScript and CSS files from the Telerik website and then copying them in your project. For the detailed step-by-step procedure, see the [Using Local Files]({% slug using_local_client_side_resources %}) article.

* Using LibMan

    The LibMan client-side library management tool allows you to fetch the Kendo UI client-side files that are distributed as NPM packages and place them in a folder within your ASP.NET Core project. The scripts in the NPM packages are not usable in the browser. This requires you to use a bundler such as <a href="https://webpack.js.org/" target="_blank">WebPack</a>. For the detailed step-by-step procedure, see the [Using LibMan]({% slug using_libman %}) article.

* Using CDN

    The Kendo UI client-side resources like JavaScript files and CSS files are available online through the Kendo CDN service. This allows you to configure your project to import the client-side resources directly from the CDN. For more details, see the [Using CDN]({% slug cdnservices_core %}) article.

## Creating Custom Script Bundles

Depending on the Telerik UI components that you use in your project, you may need lighter scripts that support only the components in your application. You have the choice to select scripts for individual components or to create your custom scripts. For more details, see [Creating Your Own Custom Script Bundles]({% slug custombundles_core %}).

## Next Steps

* [Using Local Files to Add Client-Side Resources]({% slug using_local_client_side_resources %})
* [Using LibMan to Add Client-Side Resources]({% slug using_libman %})
* [Using CDN to Add Client-Side Resources]({% slug cdnservices_core %})
* [Creating Your Own Custom Script Bundles with Client-Side Resources]({% slug custombundles_core %})

## See Also

* [Introduction to Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Mac (Online Guide)]({% slug gettingstarted_firststeps_vsmac %})
* [First Steps with CLI (Online Guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %}) 
