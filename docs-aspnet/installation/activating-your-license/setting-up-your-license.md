---
title: Setting Up Your License Key
page_title: Setting Up Your License Key File
description: Learn how to create and install a Telerik license key file, which is required during application building and deployment.
slug: installation_license_key_aspnetcore
tags: installation, license, key
position: 0
---

# Setting Up Your License Key File

{{ site.product }} requires activation through a license key for both trial and commercial licenses. This article describes how to download your personal license key and use it to activate the {{ site.product_short }} components.

@[template](/_contentTemplates/licensing-templates.md#license-key-version)

## Basics

To install a license key, you must have a developer or trial license for:

* {{ site.product }}
* Any product bundle that includes {{ site.product }}, such as DevCraft.

{% if site.core %}
If you are new to {{ site.product }}, <a href="https://www.telerik.com/aspnet-core-ui" target="_blank">sign up for a free trial</a>.

The `Telerik.UI.for.AspNet.Core` NuGet package [depends on the `Telerik.Licensing` NuGet package]({%slug nuget_install_aspnetmvc6_aspnetmvc%}#telerik-packages-available-on-the-telerik-nuget-feed). During project build, the `Telerik.Licensing` package automatically verifies the license key and activates {{ site.product }} in that project.
{% else %}
If you are new to {{ site.product }}, <a href="https://www.telerik.com/aspnet-mvc" target="_blank">sign up for a free trial</a>.

The `Telerik.UI.for.AspNet.Mvc5` NuGet package [depends on the `Telerik.Licensing` NuGet package]({%slug nuget_install_aspnetmvc6_aspnetmvc%}#telerik-packages-available-on-the-telerik-nuget-feed). During project build, the `Telerik.Licensing` package automatically verifies the license key and activates {{ site.product }} in that project.
{% endif %}

Follow the steps below for [automatic](#automatic-installation) or [manual](#manual-installation) license key installation in your local development environment. To build {{ site.product_short }} apps in a CI/CD environment, [set up a Telerik license key in CI/CD]({%slug deployment_license_key_aspnetcore%}).

An [invalid or missing license key results in app build warnings]({%slug troubleshooting-license-key-errors%}) and watermarks in the application UI.

>warning The license key file is personal and confidential. Do not commit this file to source control and do not save it to a publicly accessible location!

## Automatic Installation

To download and install your Telerik license key automatically, use either of the following Telerik productivity tools:

* <a href="https://docs.telerik.com/controlpanel/introduction" target="_blank">Telerik Control Panel</a>&mdash;this tool downloads and installs different Telerik products on your machine.
* [{{ site.product }} Visual Studio extension]({%slug overview_visualstudio_aspnetcore%})&mdash;this tool adds or upgrades {{ site.product }} in new or existing apps.

The above tools download and install a license key for you and make it available for all projects that you develop on your local machine. The license key file and location is specified in the [Manual Installation](#manual-installation) section below.

@[template](/_contentTemplates/licensing-templates.md#license-key-update-whenever)

## Manual Installation

@[template](/_contentTemplates/licensing-templates.md#license-key-manual-steps)
If you need to activate {{ site.product }} only in a specific app, then save `telerik-license.txt` to the root folder of your project or solution.

@[template](/_contentTemplates/licensing-templates.md#license-key-update-whenever)

By default, when you have an active license, the [required Kendo UI scripts]({% slug copyclientresources_aspnetmvc6_aspnetmvc%}) are activated internally. Version 2025.1.227 introduces the `ActivateKendoScripts` method that you can use to activate the Kendo UI scripts manually. Call this method if no HtmlHelper {% if site.core %}or TagHelper {% endif %}components are used on the View. 

```
    @(Html.Kendo().ActivateKendoScripts())
```

## License Key Updates

Always install a new license key whenever you:

* renew or purchase a new Telerik license
* Start a new trial

The new license key includes information about all previous purchases. The download and installation of a new license key is referred to as a *license key update*.

* If you used [automatic license key installation](#automatic-installation), then open the tool that you used to download and install the license key file. You can also update the license key file by using the [manual steps above](#manual-installation).
* If you used the [manual license key installation](#manual-installation), then repeat the same manual steps.
* To [update your license key in CI/CD environments]({%slug deployment_license_key_aspnetcore%}), get your new license key and update the environment variable value.

## Next Steps

* [Set Up the Telerik NuGet Feed]({%slug nuget_install_aspnetmvc6_aspnetmvc%})
* [Install License Key in CI/CD Environment]({%slug deployment_license_key_aspnetcore%})

## See Also

* [Licensing FAQ]({%slug licensing-faq%})
* [Troubleshoot License Key Errors]({%slug troubleshooting-license-key-errors%})
{% if site.core %}
* [Get Started with {{ site.product }}]({%slug gettingstarted_aspnetmvc6_aspnetmvc%})
{% else %}
* [Get Started with {{ site.product }}]({%slug gettingstarted_aspnetmvc%})
{% endif %}
