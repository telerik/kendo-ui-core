---
title: Introduction
page_title: Introduction
description: "Download and install {{ site.product_long }}, and run the sample application."
previous_url: /aspnetmvc-apps/mvc-6/introduction, /mvc-6/introduction, /getting-started/kendo-ui-vs-mvc-wrappers
slug: overview_aspnetmvc6_aspnetmvc
position: 1
---
{% if site.core %} 
    {% assign telerik_product_url = "aspnet-core-ui" %}
{% else %}
    {% assign telerik_product_url = "aspnet-mvc" %}
{% endif %}

# Welcome to {{ site.product }} Components

Thank you for choosing Progress<sup>®</sup> Telerik<sup>®</sup> {{ site.product_short }}!  

[{{ site.product }}](https://www.telerik.com/{{ telerik_product_url }}) is a set of 110+ performance optimized components that allow you to deliver high-quality applications faster. These components come in the form of HTML{% if site.core %} and Tag{% endif %} helpers that wrap the [HTML/JavaScript Kendo UI widgets](https://docs.telerik.com/kendo-ui/introduction) and bring them to .NET {{ site.framework_short }}. From client-side perspective, the vanilla HTML/JavaScript Kendo UI widgets and their {{ site.framework }} server-side wrappers represent the same functionalities and provide the same capabilities.


The {{ site.product }} HTML{% if site.core %} and Tag{% endif %} helpers:
* Allow you to configure a Kendo UI widget through C# or VB.NET code&mdash;for example, to set its value, data source, and so on.
* Render the HTML and JavaScript that are needed to initialize a Kendo UI widget.
* Propagate the widget’s options to the client-side through its initialization script.

To read more about the benefits of using {{ site.product }}, visit the {% if site.core %}<a href="https://www.telerik.com/aspnet-core-ui" target="_blank">product overview page</a>{% else %}<a href="https://www.telerik.com/aspnet-mvc" target="_blank">product overview page</a>{% endif %}.

{% if site.has_cta_panels == true %}
{% include cta-panel-introduction.html %}
{% endif %}

## List of Helpers

{% include_relative list-of-helpers.html %}

## Getting Started

To make your first steps with {{ site.product_short }}, you can {% if site.core %}<a href="https://www.telerik.com/aspnet-core-ui" target="_blank">start a free trial</a>{% else %}<a href="https://www.telerik.com/aspnet-mvc" target="_blank">start a free trial</a>{% endif %} and check some of the getting started tutorials:

{% if site.core %}
* [First Steps with {{ site.product_short }} on Visual Studio for Windows]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})&mdash;A tutorial demonstrating how to start using {{ site.product }} in new or already existing projects.
* [Using a Project Template in VS for Windows]({% slug gettingstarted_project_template %})&mdash;The easiest way to create a new project with {{ site.product }}.
* [First Steps with {{ site.product_short }} on Visual Studio for Mac]({% slug gettingstarted_firststeps_vsmac %})&mdash;Create your first project with {{ site.product }} controls on macOS.
* [First Steps with {{ site.product_short }} with CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})&mdash;Use .NET CLI to create a project that uses {{ site.product }} controls.
* [Video Onboarding]({% slug virtualclass_uiforcore %})&mdash;A free course developed to help you get started with the Telerik UI for ASP.NET Core components and features.

To get a quick overview of  {{ site.product_short }}, you can also see the following video:

<iframe width="853" height="480" src="https://www.youtube.com/embed/jAOZY9TZi78?list=PLvmaC-XMqeBaHWzU1zyFgaNi2pcuix6Ps" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

{% else %}
* [First Steps with {{ site.product_short }}]({% slug gettingstarted_aspnetmvc %})&mdash;Create your first project with {{ site.product }} controls by using a project template.
* [Installing Telerik UI for ASP.NET MVC with NuGet]({% slug nuget_install_aspnetmvc6_aspnetmvc %})&mdash;Learn how to add the Telerik NuGet server to Visual Studio and to install the {{ site.product }} controls in your project.
* [Scaffolding the Telerik UI for ASP.NET MVC project]({% slug scaffolding_aspnetcore %})&mdash;Learn how to use standard scaffolding to generate MVC-helper declarations together with the related Controller action methods.
* [Telerik UI for ASP.NET MVC fundamentals]({% slug fundamentals_aspnetmvc %})&mdash;Learn the basics about the {{ site.product }} HtmlHelpers.
* [Integrating the Telerik UI for ASP.NET MVC project with Visual Studio]({% slug overview_visualstudio_aspnetcore %})&mdash;Take advantage of the Visual Studio extensions that help you with the project creation and configuration.
* [Video Onboarding]({% slug virtualclass_uiformvc %})&mdash;A free course developed to help you get started with the Telerik UI for ASP.NET MVC components and features
{% endif %}

## Support Options

For any issues you might encounter while working with {{ site.product_short }}, use any of the available support channels:

* {{ site.product_short }} license holders and active trialists can take advantage of the outstanding customer support delivered by the developers building the library. To submit a support ticket, use the [{{ site.product_short }} dedicated support](https://www.telerik.com/account/support-tickets/) system.
* [{{ site.product_short }} forums](https://www.telerik.com/forums/{{ telerik_product_url }}) are part of the free support you can get from the community and from the {{ site.product_short }} team on all kinds of general issues.
* [{{ site.product_short }} feedback portal](https://feedback.telerik.com/{{ telerik_product_url }}) and [{{ site.product_short }} roadmap](https://www.telerik.com/support/whats-new/kendo-ui/roadmap) provide information on the features in discussion and also the planned ones for release.
* You may still need a tailor-made solution for your project. In such cases, go straight to [Progress Services](https://www.progress.com/services).

## Learning Resources

{% if site.core %} 
* [Online Demos](https://demos.telerik.com/aspnet-core/)
* [Knowledge Base](https://docs.telerik.com/aspnet-core/knowledge-base.html)
* [Support Resources Hub Page](https://www.telerik.com/support/aspnet-core)
* [Code Examples with Telerik UI for ASP.NET Core](https://github.com/telerik/ui-for-aspnet-core-examples)
{% else %}
* [Online Demos](https://demos.telerik.com/aspnet-mvc/)
* [Tutorials]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Support Resources Hub Page](https://www.telerik.com/support/aspnet-mvc)
* [Code Examples with Telerik UI for ASP.NET MVC](https://github.com/telerik/ui-for-aspnet-mvc-examples)
* [Code Examples with ASP.NET MVC](https://github.com/telerik/kendo-examples-asp-net-mvc)
* [Code Examples with ASP.NET Web Technologies](https://github.com/telerik/kendo-examples-asp-net)

{% endif %}

>If you prefer videos, check out the free [Online Technical Training](https://docs.telerik.com/{{site.platform}}/virtual-classroom).

## Next Steps

{% if site.core %}
* [First steps on Visual Studio for Windows (online guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First steps on Visual Studio for Mac (online guide)]({% slug gettingstarted_firststeps_vsmac %})
* [First steps with CLI (online guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Including client-side resources]({% slug copyclientresources_aspnetmvc6_aspnetmvc %})
* [Integrating UI for ASP.NET Core in Visual Studio]({% slug overview_visualstudio_aspnetcore %})
* [Upgrading UI for ASP.NET Core in Visual Studio]({% slug upgrade_aspnetcore %})
{% else %}
* [Downloading and installing Telerik UI for ASP.NET MVC]({% slug downloadinstall_aspnetcore %})
* [Exploring the Telerik UI for ASP.NET MVC fundamentals]({% slug fundamentals_aspnetmvc %})
* [Integrating Telerik UI for ASP.NET MVC in Visual Studio]({% slug overview_visualstudio_aspnetcore %})
* [Upgrading Telerik UI for ASP.NET MVC]({% slug upgrade_aspnetcore %})
{% endif %}
