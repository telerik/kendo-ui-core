---
title: Upgrading Telerik UI
page_title: Upgrading Telerik UI
description: "Upgrade your current version of {{ site.product }} and switch from a trial to a developer license."
previous_url: /upgrade, /installation-mvc/upgrading/upgrade
slug: upgrade_aspnetcore
position: 1
---

# Upgrading {{ site.product }}

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
1. In the application, manually replace any references which point to the old Kendo UI [scripts and styles]({% slug copyclientresources_aspnetmvc6_aspnetmvc %}).

   * If the scripts and styles are referenced through the Kendo CDN service, update the links with the new version.

      ```_Layout.cshtml
      
            <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-main.css" />
            <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
            <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>
            <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.aspnetmvc.min.js"></script>

      ```

   * If the scripts and styles are referenced locally, download the JavaScript and CSS files from the Telerik website and then copying them in your project. For the detailed step-by-step procedure, refer to the [Using Local Files]({% slug using_local_client_side_resources%}) article.


> To properly load the Telerik and Kendo UI packages, both [NuGet]({% slug nuget_install_aspnetmvc6_aspnetmvc %}) and [Bower](https://docs.telerik.com/kendo-ui/intro/installation/bower-install#kendo-ui-professional) require authentication.

### Upgrading Manually

1. [Download]({% slug downloadinstall_aspnetcore %}#getting-the-binaries) the desired version from the **Download** section of your account.
1. Change the reference to the new `Kendo.MVC` dll. Verify that the dll refers to the correct ASP.NET Core version.
1. In the application, manually replace any references which point to the old Kendo UI [scripts and styles]({% slug copyclientresources_aspnetmvc6_aspnetmvc %}).

   * If the scripts and styles are referenced through the Kendo CDN service, update the links with the new version.

      ```_Layout.cshtml
      
            <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-main.css" />
            <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
            <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>
            <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.aspnetmvc.min.js"></script>

      ```

   * If the scripts and styles are referenced locally, download the JavaScript and CSS files from the Telerik website and then copying them in your project. For the detailed step-by-step procedure, refer to the [Using Local Files]({% slug using_local_client_side_resources%}) article.

> The `NuGet package` and the required [`client-side resources`]({% slug copyclientresources_aspnetmvc6_aspnetmvc %}) must have identical versions.

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
1. In the application, manually replace any references which point to the old Kendo UI [scripts and styles]({% slug copyclientresources_aspnetmvc6_aspnetmvc %}).

   * If the scripts and styles are referenced through the Kendo CDN service, update the links with the new version.

      ```_Layout.cshtml
      
            <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-main.css" />
            <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
            <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>
            <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.aspnetmvc.min.js"></script>

      ```

   * If the scripts and styles are referenced locally, download the JavaScript and CSS files from the Telerik website and then copying them in your project. For the detailed step-by-step procedure, refer to the [Using Local Files]({% slug using_local_client_side_resources%}) article.

> The `Kendo.Mvc.dll` and the required [`client-side resources`]({% slug copyclientresources_aspnetmvc6_aspnetmvc %}) must have identical versions.

## Switching to a Developer License

1. Delete (uninstall) the trial version from your machine. This approach will eliminate the possibility for trial assemblies to end up in the project references or in production.
1. Install the licensed Kendo UI version and follow the steps for [updating the Telerik UI for ASP.NET MVC version](#upgrading-to-new-versions).

## See Also

* [Telerik UI for ASP.NET MVC Download and Installation]({% slug downloadinstall_aspnetcore %})
* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})

{% endif %}
