---
title: Overview
page_title: Download and Installation Overview | Download and Installation | Kendo UI for jQuery
description: "Get started with Kendo UI for jQuery and learn how to download the library and initialize its widgets."
slug: overviewdownload_kendoui
position: 1
---

# Download and Installation Overview

To start using Kendo UI, you need to [download the library](#downloading-the-library) by using any of the available approaches and then [initialize the widgets](#initializing-the-widgets) you need.   

## Downloading Kendo UI

Depending on your preferences and the requirements of your project, you can:

* Download [Kendo UI for a Trial Period](https://www.telerik.com/download/kendo-ui).
* Get your [Commercial License for Kendo UI Professional](https://www.telerik.com/purchase/kendo-ui).
* Get your [Commercial License for Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET MVC](https://www.telerik.com/purchase/aspnet-mvc).
* Get your [Commercial License for Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET JSP](https://www.telerik.com/purchase/jsp-ui).
* Get your [Commercial License for Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET PHP](https://www.telerik.com/purchase/php-ui).
* Use the [GitHub Open-Source License for Kendo UI Core](https://github.com/telerik/kendo-ui-core).

Kendo UI for jQuery uses the [Bower web package manager](https://bower.io/) which handles frameworks, libraries, assets, and utilities. The library maintains the Kendo UI Core and the Kendo UI Professional Bower packages which provide all official releases, service packs, and internal Kendo UI for jQuery builds. For more information, refer to the article on [installing Kendo UI as a Bower package]({% slug kendoui_bower_packages_kendoui_installation %}).

To install Kendo UI for jQuery widgets, you can use the [available Kendo UI CDN services]({% slug kendoui_cdn_services_installation %}) which are hosted on [Amazon CloudFront](https://aws.amazon.com/cloudfront/).

Another approach to install Kendo UI is by accessing the [Node Package Manager (NPM)](http://npmjs.com/) JavaScript package manager and [downloading the available Kendo UI packages on NPM]({% slug kendoui_npm_packages_kendoui_installation %}).

If you are a registered user, you can use the [available Kendo UI NuGet packages]({% slug kendoui_nuget_packages %}) from the private Kendo UI NuGet feed. [NuGet](https://www.nuget.org) is an open-source .NET package manager which hosts Kendo UI packages for the jQuery and ASP.NET MVC flavors.  

You can also install part of the Kendo UI for jQuery widgets and framework components that your project requires and include [only what you need]({% slug include_only_what_you_need_kendoui_installation %}) by picking the combined scripts, by building a custom combined script, or by using Gulp to build a custom script.

## Initializing the Widgets

Once you have done the Kendo UI installation, you can move on and initialize the desired Kendo UI widgets. The documentation for each Kendo UI widget features an **Overview** article that provides information on the individual initialization approaches&mdash;for example, the [overview article of the Grid]({% slug overview_kendoui_grid_widget %}).

All Kendo UI widgets are registered as [jQuery plugins](http://learn.jquery.com/plugins/) which means that [you can instantiate each widget on a jQuery `object` instance]({% slug initialize_widgets_using_jquery_plugins_installation %}).

Apart from the jQuery plugin syntax, the [widgets can also be instantiated through markup from custom HTML attributes]({% slug initialize_widgets_using_markup_installation %}).

## Next Steps

* [Create your own custom bundles]({% slug include_only_what_you_need_kendoui_installation %})
* [Learn about the widget DOM element structure]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Initialize widgets as jQuery plugins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize widgets with MVVM]({% slug mvvm_initialization_kendoui %})
* [Check out the jQuery version support]({% slug jquerysupport_kendoui %})
* [Check out the web browser support]({% slug wbe_browserand_operating_system_support %})
* [Check out the operation system support]({% slug ossupport_kendo %})
* [Check out the PDF and Excel export support]({% slug export_support_kendoui %})
* [Explore the widget script dependencies]({% slug script_filesfor_barcodes_widgets %})
* [Create your own custom widgets]({% slug createcustomkendouiwidgets_gettingstarted %})

## See Also

* [Hosting Kendo UI in Your Project]({% slug hosting_kendoui %})
* [Installing Kendo UI with Bower]({% slug kendoui_bower_packages_kendoui_installation %})
* [Installing Kendo UI by Using the CDN Services]({% slug kendoui_cdn_services_installation %})
* [Installing Kendo UI with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Installing Kendo UI with NuGet]({% slug kendoui_nuget_packages %})
* [Getting Up and Running with Your Kendo UI Project (Guide)]({% slug getting_started_installation_kendoui %})
