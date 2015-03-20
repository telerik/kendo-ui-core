---
title: Visual Studio Extensions Options
---

#Visual Studio Extensions Options

The Visual Studio Extensions options dialog provides settings allowing you to configure the Telerik UI for ASP.NET MVC Visual Studio Extensions to best suit your needs.

It can be accessed via the **Telerik | VSExtensions Options** menu item.

![Options menu](/aspnet-mvc/vs-integration/images/options_menu.png)

The Options dialog contains two sets of options that affect the Telerik UI for ASP.NET MVC Visual Studio Extensions.

## General Settings ##
The settings under the General category affect all of the installed **Telerik Visual Studio Extensions**.

![Options Dialog](/aspnet-mvc/vs-integration/images/options.png)

###Project setup
- **Add referenced assemblies to solution and source control** – Sets the default value for the Add referenced assemblies to solution option in the Project Configuration Wizard.

###Project Upgrade Notifications for Detected Local Distributions

- **Suggest project upgrades for Telerik product version available on my computer** - When enabled, you will be prompted to upgrade upon opening a project, which is not using the latest version of Telerik products installed on your system.
- **Suggest upgrades when an equal Dev release detected on projects using a Trial** - When enabled, you will be prompted to upgrade if a licensed version is available on your system,  but the current project uses a trial version.

###Other Notifications
- **Notify me when a Telerik subscription I have is about to expire** - When enabled, you will receive reminders if any of your subscriptions expire within the next month.

>**Note:**
You can benefit subscription reminders only if you have saved your credentials in the Latest Version Acquirer tool.

###Select a folder for downloads
Configures the path where the extensions look for and store distributions.

>**Note:**
Changing the folder path will not move existing folder contents from your previous path. Please, move your previous folder contents manually in case you still want to use them.

##Telerik UI for ASP.NET MVC Settings
All settings under the KendoUI category affect only the Telerik UI for ASP.NET MVC Visual Studio Extensions.

![Options Dialog](/aspnet-mvc/vs-integration/images/options_kendo.png)

###Latest version retrieval

- **Include internal builds in Latest Version update and retrieval** - When enabled, the Latest Version Acquirer tool will retrieve internal builds as well as official releases when checking for a new version.

###Notifications

- **Show me message when a newer version is available on www.telerik.com** - When enabled, you will receive notifications if a new version of Telerik UI for ASP.NET MVC is available on the Telerik website.
