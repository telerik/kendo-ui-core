---
title: Overview
page_title: Providing Client-Side Resources
description: "Get started with {{ site.product }} and learn about the different ways of copying the client-side resources into a Telerik UI for ASP.NET Core project."
components: ["general"]
previous_url: /aspnetmvc-apps/mvc-6/getting-started-vscode, /mvc-6/getting-started-vscode, /getting-started/getting-started-copy-client-resources, /getting-started/installation/getting-started-copy-client-resources, /installation/getting-started-copy-client-resources, installation-mvc/adding-client-side-resources/getting-started-copy-client-resources
slug: copyclientresources_aspnetmvc6_aspnetmvc
position: 1
---

# Providing Client-Side Resources for {{ site.product }}

This article outlines the approaches for adding the Kendo client-side assets to your application.

The {{ site.product }} suite is a set of server-side wrappers over the <a href="https://www.telerik.com/kendo-jquery-ui" target="_blank">Kendo UI for jQuery client-side widgets</a>. To use the {{ site.product_short }} components in an application, you need not only the [binaries]({% slug downloadinstall_aspnetcore %}) that enable you to use the {% if site.core %}TagHelpers and HtmlHelpers{% else %}HtmlHelpers{% endif %}, but also the required JavaScript and CSS client-side web assets. 

## Available Approaches

You can use the following methods for adding the Kendo client-side resources to your project: 

* Using local files

    You can provide the client-side assets by downloading the required JavaScript and CSS files from the Telerik website and then copying them in your project. For the detailed step-by-step procedure, see the [Using Local Files]({% slug using_local_client_side_resources %}) article.

{% if site.core %}
* Using LibMan

    The LibMan client-side library management tool allows you to fetch the Kendo UI client-side files that are distributed as NPM packages and place them in a folder within your ASP.NET Core project. The scripts in the NPM packages are not usable in the browser. This requires you to use a bundler such as <a href="https://webpack.js.org/" target="_blank">WebPack</a>. For the detailed step-by-step procedure, see the [Using LibMan]({% slug using_libman %}) article.
{% endif %}

* Using CDN

    The Kendo UI client-side resources like JavaScript files and CSS files are available online through the Kendo CDN service. This allows you to configure your project to import the client-side resources directly from the CDN. For more details, see the [Using CDN]({% slug cdnservices_core %}) article.

## Creating Custom Script Bundles

Depending on the Telerik UI components that you use in your project, you may need lighter scripts that support only the components in your application. You can create your custom script file that contains the scripts for the required components or use combined scripts. For more details, refer to the [Creating Custom Bundles article]({% slug creating-custom-bundles %}).

## Next Steps

* [Installing a License File]({% slug installation_license_key_aspnetcore %})
* [Using Local Files to Add Client-Side Resources]({% slug using_local_client_side_resources %})
* [Using CDN to Add Client-Side Resources]({% slug cdnservices_core %})
{% if site.core %}
* [Using LibMan to Add Client-Side Resources]({% slug using_libman %})
{% endif %}
* [Creating Your Own Custom Script Bundles with Client-Side Resources]({% slug creating-custom-bundles %})

## See Also

{% if site.core %}
* [Introduction to Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First Steps with CLI (Online Guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %}) 
{% else %}
* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Download and Installation]({% slug downloadinstall_aspnetcore %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
{% endif %}