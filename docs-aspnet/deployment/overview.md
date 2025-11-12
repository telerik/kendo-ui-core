---
title: Overview
page_title: Deployment Overview
description: Troubleshooting deployment issues involving the {{ site.product_short }} suite.
slug: deployment_overview
position: 0
---

# {{ site.product }} Deployment Overview

This article explains the basics about deploying a {{ site.product_short }} web application.

@[template](/_contentTemplates/licensing-templates.md#ci-cd-support)

## Prerequisites

First, make sure you can deploy an {{ site.framework }} application without the Telerik components in order to have the entire pipeline working as a baseline.

You can read more about deploying {{ site.framework }} applications in MSDN - make sure that you are familiar with this information, as the {{ site.product }} suite does not add any specific requirements or steps:

{% if site.core %}
* [Host and deploy ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/?view=aspnetcore-9.0)
{% else %}
* [Host and deploy ASP.NET MVC](https://learn.microsoft.com/en-us/aspnet/mvc/overview/deployment/)
{% endif %}

## License Key

Before building a {{ site.framework }} app in a CI/CD environment, [set up a Telerik license key in CI/CD]({%slug deployment_license_key_aspnetcore%}). The process is different than in a [local development environment]({%slug installation_license_key_aspnetcore%}).

## Telerik Components

The {{ site.product }} components consist of:

* assembly&mdash;It is distributed through [NuGet]({%slug nuget_install_aspnetmvc6_aspnetmvc%}#list-of-provided-packages).
* [static CSS and JavaScript assets]({%slug copyclientresources_aspnetmvc6_aspnetmvc%})&mdash;The required client-side resources to use the components.

>important The machine that performs the publish build must be able to properly restore the referenced Telerik NuGet packages. See the [CI, CD, Build Server]({%slug deployment_ci_cd_build%}) article for more details on automation setup.

## Testing and Building Licenses

The licensing model of {{ site.product }} is based on developer seats. Separate licenses for test and build environments are not available. For details and next steps, refer to the **Testing and Building License** section in the [{{ site.product }} license agreement](https://www.telerik.com/purchase/license-agreement/kendo-ui).

## Next Steps and Troubleshooting

The following articles provide more information on {{ site.product }} deployment:

* [CI, CD, Build Server]({%slug deployment_ci_cd_build%}) provides guidance on setting up continuous integration, continuous delivery and automated builds. Mostly related to using the Telerik NuGet packages as this is the only specific thing that we require.
* [Telerik Private NuGet Feed]({%slug nuget_install_aspnetmvc6_aspnetmvc%}) shows how to set up our private NuGet package source.
* [NuGet Feed Troubleshooting]({%slug troubleshooting_telerik_nuget%}) provides troubleshooting tips for the most common issues with our NuGet feed.
* [Deployment Troubleshooting]({%slug deployment_troubleshooting%}) describes the most common problems and solutions related to deploying {{ site.product }} applications.

## See Also

* [Set Up Private NuGet Feed for Azure]({%slug howto_setupprivatefeedazure_aspnetcore%})