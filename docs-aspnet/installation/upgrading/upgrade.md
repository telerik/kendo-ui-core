---
title: Upgrading Telerik UI
page_title: Upgrading Telerik UI
description: "Upgrade your current version of {{ site.product }} and switch from a trial to a developer license."
previous_url: /upgrade, /installation-mvc/upgrading/upgrade
slug: upgrade_aspnetcore
position: 1
---

# Upgrading {{ site.product }}

This document describes how to upgrade the version of the {{ site.product }} helpers.

## Upgrading to New Versions

To update {{ site.product }} to a new version, either:

{% if site.core %}
* [Upgrade with NuGet or Bower](#using-nuget-or-bower).
{% else %}
* [Use the Upgrade Project Wizard](#using-the-upgrade-project-wizard).
{% endif %}
* [Manually replace the references and files](#upgrading-manually).

{% if site.core %}

### Using NuGet or Bower

To upgrade the version with NuGet or Bower:

1. In Visual Studio, open the NuGet Package Manager and navigate to the **Installed** tab. Click **Update** for the **Telerik.UI.for.AspNet.Core** package.
   * If you use Bower instead of NuGet, open the Bower Package Manager and select the **Installed** tab. Click **Update** for the **kendo-ui** package.
1. In the application, manually replace any references which point to the old Kendo UI [scripts and styles]({% slug copyclientresources_aspnetmvc6_aspnetmvc %}).

   * If the scripts and styles are referenced through the Kendo CDN service, update the links with the new version.

      ```HTML _Layout.cshtml
      <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-main.css" />
      <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
      <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>
      <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.aspnetmvc.min.js"></script>
      ```

   * If the scripts and styles are referenced locally, download the JavaScript and CSS files from the Telerik website and then copying them in your project. For the detailed step-by-step procedure, refer to the [Using Local Files]({% slug using_local_client_side_resources%}) article.


> To properly load the Telerik and Kendo UI packages, both [NuGet]({% slug nuget_install_aspnetmvc6_aspnetmvc %}) and [Bower](https://docs.telerik.com/kendo-ui/intro/installation/bower-install#kendo-ui-professional) require authentication.

{% else %}

### Using the Upgrade Project Wizard

To upgrade your project by using the **Upgrade Project Wizard**, follow these steps:

1. Open the **Extensions->Telerik Menu** or click the **Update Now** button as in the screenshot below to start the upgrading process.

    ![Upgrade Step 1](../images/upgrade-step-0.png)
1. Select the files that must be included in the update process and click **Next**.

    ![Upgrade Step 2](../images/upgrade-step-1.png)
1. Choose the project or projects you want to upgrade.

    ![Upgrade Step 3](../images/upgrade-step-2.png)
1. Pick an option for the **EditorTemplates** folder.

    ![Upgrade Step 4](../images/upgrade-step-3.png)
1. Create a backup.

    ![Upgrade Step 5](../images/upgrade-step-4.png)
1. Be careful not to overwrite any existing customized editor templates.

    ![Upgrade Step 6](../images/upgrade-step-5.png)

The project will be upgraded to the latest {{ site.product }} version.

{% endif %}

{% if site.core %}

### Upgrading Manually

1. [Download]({% slug downloadinstall_aspnetcore %}#getting-the-binaries) the desired version from the **Download** section of your account.
1. Change the reference to the new `Kendo.MVC` dll. Verify that the dll refers to the correct ASP.NET Core version.
1. In the application, manually replace any references which point to the old Kendo UI [scripts and styles]({% slug copyclientresources_aspnetmvc6_aspnetmvc %}).

   * If the scripts and styles are referenced through the Kendo CDN service, update the links with the new version.

      ```HTML _Layout.cshtml
      <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-main.css" />
      <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
      <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>
      <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.aspnetmvc.min.js"></script>
      ```

   * If the scripts and styles are referenced locally, download the JavaScript and CSS files from the Telerik website and then copying them in your project. For the detailed step-by-step procedure, refer to the [Using Local Files]({% slug using_local_client_side_resources%}) article.

@[template](/_contentTemplates/general-info.md#identical-versions-note-core)

{% else %}

### Upgrading Manually

1. Replace all scripts, styles, and images that are related to Telerik UI for ASP.NET MVC with the desired version of the framework.
1. Download the desired version from the [UI for ASP.NET MVC download page](https://www.telerik.com/account/product-download?product=KENDOUIMVC).
1. In the application, manually replace any references that point to the old Kendo UI [scripts and styles]({% slug copyclientresources_aspnetmvc6_aspnetmvc %}).

   * If the scripts and styles are referenced through the Kendo UI CDN service, update the links with the new version.

      ```HTML _Layout.cshtml
      <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-main.css" />
      <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
      <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>
      <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.aspnetmvc.min.js"></script>
      ```

   * If the scripts and styles are referenced locally, download the JavaScript and CSS files from the Telerik website and then copying them in your project. For the detailed step-by-step procedure, refer to the [Using Local Files]({% slug using_local_client_side_resources%}) article.

@[template](/_contentTemplates/general-info.md#identical-versions-note-mvc)

{% endif %}

## Switching to a Developer License [Deprecated]

> Starting with version 2025 Q3, the Trial package is deprecated, and the toolset is available only with a Developer License.

1. After the purchase of a Developer License, follow the [Update your license key]({%slug installation_license_key_aspnetcore%}#license-key-updates) guidelines.
1. To upgrade to the latest product version, follow the steps for [updating the {{ site.product }} version](#upgrading-to-new-versions).

{% if site.core %}
If you still see the Trial message after you switch to a developer (commercial) license, check the [troubleshooting knowledge base article]({% slug troubleshooting_trial_message %}).
{% endif %}

## See Also

* [Upgrade Troubleshooting]({% slug upgrade_aspnetcore_troubleshooting %})
{% if site.core %}
* [Telerik UI for ASP.NET Core Download and Installation]({% slug downloadinstall_aspnetcore %})
* [Downloading New Versions of Telerik UI for ASP.NET Core](https://www.telerik.com/aspnet-core-ui/documentation/vs-integration/latest-version-retrieval).
{% else %}
* [Upgrading Telerik UI for ASP.NET MVC Projects](https://www.telerik.com/aspnet-mvc/documentation/vs-integration/upgrade-wizard).
{% endif %}
