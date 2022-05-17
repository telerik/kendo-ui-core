---
title: Upgrading Telerik UI
page_title: Upgrading Telerik UI
description: "Upgrade your current version of {{ site.product_long }} and switch from a trial to a developer license."
previous_url: /upgrade
slug: upgrade_aspnetmvc
position: 1
---

# Upgrading Telerik UI

This document describes how to upgrade the version of the {{ site.product }} helpers and how to switch from a trial to a developer (commercial) license.

## Upgrading to New Versions

To update {{ site.product }} to a new version, either:

* Use the [Upgrade Project Wizard](#using-the-upgrade-project-wizard)
* [Manually replace the scripts and the style files](#upgrading-manually).

### Using the Upgrade Project Wizard

To upgrade your project with the Upgrade Project Wizard, refer to the following articles:

1. [Download the new Telerik UI version]({% slug latestversionretrieval_visualstudio_aspnetmvc %}).
1. [Start the **Upgrade Wizard**]({% slug projectwizardupgrade_visualstudio_aspnetmvc %}).

### Upgrading Manually

1. Replace all scripts, styles, and images that are related to Telerik UI for ASP.NET MVC with the desired version of the framework.
1. Download the desired version from the **Download** section of your account.
1. Load the scripts and styles locally or from the [Kendo UI CDN Services]({% slug cdnservices_aspnetmvc %}).
1. Change the reference to the new `Kendo.MVC` dll. Verify that the dll refers to the correct ASP.NET MVC version.

## Switching to a Developer License

1. Delete (uninstall) the trial version from your machine. This approach will eliminate the possibility for trial assemblies to end up in the project references or in production.
1. Install the licensed Kendo UI version and follow the steps for [updating the Telerik UI for ASP.NET MVC version](#upgrading-to-new-versions).

## See Also

* [Telerik UI for ASP.NET MVC Download and Installation]({% slug overview_downloadinstallation_mvc %})
* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
