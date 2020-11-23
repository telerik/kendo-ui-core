---
title: Upgrade
page_title: Upgrade
description: "Upgrade your current version of {{ site.product_long }} and switch from a trial to a developer license."
slug: upgrade_aspnetcore
position: 11
---

# Upgrade

You can upgrade the version of the {{ site.product }} helpers and also switch from a trial to a developer license.

## Upgrading to New Versions

To update {{ site.product }} to a new version, either:

{% if site.core %}

* Upgrade with NuGet and Bower, or
* Manually replace the references and files.

### Using NuGet and Bower

To upgrade the version with NuGet and Bower:

1. In Visual Studio, open the NuGet Package Manager on the **Installed** tab and click **Update** for the **Telerik.UI.for.AspNet.Core** package.
1. In Visual Studio, open the Bower Package Manager on the **Installed** tab and click **Update** for the **kendo-ui** package.
1. In the application, manually replace any references which point to the old Kendo UI resource files such as scripts and styles.

> To properly load the Telerik and Kendo UI packages, both [NuGet](https://docs.telerik.com/aspnet-mvc/getting-started/nuget-install#set-up-nuget-package-source) and [Bower](https://docs.telerik.com/kendo-ui/intro/installation/bower-install#kendo-ui-professional) require authentication.

### Upgrading Manually

1. [Download]({% slug downloadinstall_aspnetcore %}#download) the desired version from the **Download** section of your account.
1. Replace all scripts, styles, and images that are related to Telerik UI for ASP.NET Core with the desired version of the framework.
1. Change the reference to the new `Kendo.MVC` dll and verify that the dll refers to the correct ASP.NET Core version.
1. In the application, manually replace any references which point to the old Kendo UI resource files such as scripts and styles.

## Switching to a Developer License

1. Delete (uninstall) the trial version from your machine. This approach will eliminate the possibility for trial assemblies to end up in the project references or in production.
1. [Install]({% slug downloadinstall_aspnetcore %}#installation) the licensed Kendo UI version and follow the steps for updating the Telerik UI for ASP.NET Core version.

## See Also

* [First steps on Visual Studio for Windows (online guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First steps on Visual Studio for Mac (online guide)]({% slug gettingstarted_firststeps_vsmac %})
* [First steps with CLI (online guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})

{% else %}

* Use the [Upgrade Project Wizard]({% slug projectwizardupgrade_visualstudio_aspnetmvc %}), or
* Manually replace the scripts and the style files.

### Using the Upgrade Project Wizard

To upgrade your project with the Upgrade Project Wizard, refer to the following articles:

* [Downloading new versions]({% slug latestversionretrieval_visualstudio_aspnetmvc %})
* [Upgrading the Project Wizard]({% slug projectwizardupgrade_visualstudio_aspnetmvc %})

### Upgrading Manually

1. Replace all scripts, styles, and images that are related to Telerik UI for ASP.NET MVC with the desired version of the framework.
1. Download the desired version from the **Download** section of your account.
1. Load the scripts and styles locally or from the [Kendo UI CDN Services]({% slug cdnservices_aspnetmvc %}).
1. Change the reference to the new `Kendo.MVC` dll. Verify that the dll refers to the correct ASP.NET MVC version.

## Switching to a Developer License

1. Delete (uninstall) the trial version from your machine. This approach will eliminate the possibility for trial assemblies to end up in the project references or in production.
1. Install the licensed Kendo UI version and follow the steps for updating the Telerik UI for ASP.NET MVC version.

## See Also

* [Telerik UI for ASP.NET MVC Download and Installation]({% slug overview_downloadinstallation_mvc %})
* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})

{% endif %}
