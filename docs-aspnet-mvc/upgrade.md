---
title: Upgrade
page_title: Upgrade | Progress Telerik UI for ASP.NET MVC
description: "Upgrade your current version of Progress Telerik UI for ASP.NET MVC and switch from a trial to a developer license."
slug: upgrade_aspnetmvc
position: 30
---

# Upgrade

You can upgrade the version of the Telerik UI for ASP.NET MVC helpers and also switch from a trial to a developer license.

## Upgrading to New Versions

To update Telerik UI for ASP.NET MVC to a new version, either:

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
1. Change the reference to the new [`Kendo.MVC` dll]({% slug gettingstarted_aspnetmvc %}#adding-the-kendo.mvc.dll-reference). Verify that the dll refers to the correct ASP.NET MVC version.

## Switching to a Developer License

1. Delete (uninstall) the trial version from your machine. This approach will eliminate the possibility for trial assemblies to end up in the project references or in production.
1. Install the licensed Kendo UI version and follow the steps for updating the Telerik UI for ASP.NET MVC version.

## See Also

* [Telerik UI for ASP.NET MVC Download and Installation]({% slug overview_downloadinstallation_mvc %})
* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
