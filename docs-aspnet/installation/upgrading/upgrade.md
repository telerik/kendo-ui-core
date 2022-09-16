---
title: Upgrading Telerik UI
page_title: Upgrading Telerik UI
description: "Upgrade your current version of {{ site.product }} and switch from a trial to a developer license."
previous_url: /upgrade, /installation-mvc/upgrading/upgrade
slug: upgrade_aspnetcore
position: 1
---

# Upgrading Telerik UI

This document describes how to upgrade the version of the {{ site.product }} helpers and how to switch from a trial to a developer (commercial) license.

## Upgrading to New Versions

To update {{ site.product }} to a new version, either:

{% if site.core %}

* [Upgrade with NuGet or Bower](#using-nuget-or-bower).
* [Manually replace the references and files](#upgrading-manually).

### Using NuGet or Bower

To upgrade the version with NuGet or Bower:

1. In Visual Studio, open the NuGet Package Manager and navigate to the **Installed** tab. Click **Update** for the **Telerik.UI.for.AspNet.Core** package.
   * If you use Bower instead of NuGet, open the Bower Package Manager and select the **Installed** tab. Click **Update** for the **kendo-ui** package.
1. In the application, manually replace any references which point to the old Kendo UI resource files such as [scripts and styles](#providing-the-client-side-resources).

> To properly load the Telerik and Kendo UI packages, both [NuGet]({% slug nuget_install_aspnetmvc6_aspnetmvc %}) and [Bower](https://docs.telerik.com/kendo-ui/intro/installation/bower-install#kendo-ui-professional) require authentication.

### Upgrading Manually

1. [Download]({% slug downloadinstall_aspnetcore %}#download) the desired version from the **Download** section of your account.
1. Replace all scripts, styles, and images that are related to Telerik UI for ASP.NET Core with the desired version of the framework.
1. Change the reference to the new `Kendo.MVC` dll. Verify that the dll refers to the correct ASP.NET Core version.
1. In the application, manually replace any references which point to the old Kendo UI resource files such as [scripts and styles](#providing-the-client-side-resources).

## Switching to a Developer License

1. Delete (uninstall) the trial version from your machine. This approach will eliminate the possibility for trial assemblies to end up in the project references or in production.
1. [Install]({% slug downloadinstall_aspnetcore %}#installation) the commercial Kendo UI version and follow the steps for updating the Telerik UI for ASP.NET Core version.

If you still see the Trial message after you switch to a developer (commercial) license, check the [troubleshooting knowledge base article]({% slug troubleshooting_trial_message %}).

{% else %}

* Use the [Upgrade Project Wizard](#using-the-upgrade-project-wizard)
* [Manually replace the scripts and the style files](#upgrading-manually).

### Using the Upgrade Project Wizard

To upgrade your project with the Upgrade Project Wizard, refer to the following articles:

1. [Download the new Telerik UI version]({% slug latestversionretrieval_visualstudio_aspnetcore %}).
1. [Start the **Upgrade Wizard**]({% slug projectwizardupgrade_visualstudio_aspnetmvc %}).

### Upgrading Manually

1. Replace all scripts, styles, and images that are related to Telerik UI for ASP.NET MVC with the desired version of the framework.
1. Download the desired version from the **Download** section of your account.
1. Load the scripts and styles locally or from the [Kendo UI CDN Services]({% slug cdnservices_core %}).
1. Change the reference to the new `Kendo.MVC` dll. Verify that the dll refers to the correct ASP.NET MVC version.

## Switching to a Developer License

1. Delete (uninstall) the trial version from your machine. This approach will eliminate the possibility for trial assemblies to end up in the project references or in production.
1. Install the licensed Kendo UI version and follow the steps for [updating the Telerik UI for ASP.NET MVC version](#upgrading-to-new-versions).

## See Also

* [Telerik UI for ASP.NET MVC Download and Installation]({% slug downloadinstall_aspnetcore %})
* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})

{% endif %}
