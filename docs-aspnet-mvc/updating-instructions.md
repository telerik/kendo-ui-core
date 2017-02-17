# Upgrading a Trial to a Developer License or to a Newer Version

This article explains how to upgrade the version of the Telerik UI for ASP.NET MVC wrappers and how to switch from a Trial to a Developer license.

## Upgrade to a Newer Version of Telerik UI for ASP.NET MVC

There are two approaches to update the version of the Telerik UI for ASP.NET MVC. The first one is using our Upgrade Project Wizard, and the second one is to manually replace the scripts and the style files.

### Automatic update

You can utilize the Upgrade Project Wizard:

- [Upgrade Project Wizard](http://docs.telerik.com/aspnet-mvc/vs-integration/upgrade-wizard)

### Manual update

1) Replace all Telerik UI for ASP.NET MVC related scripts, styles and images with the desired version of Telerik UI for ASP.NET MVC. The latest or the desired version of Kendo UI can be downloaded from the Download section of your account.

2) Change the reference to the new Kendo.MVC dll. Please make sure that the dll is for the correct version of ASP.NET MVC.

## Upgrade From Trial to Licensed Version of Telerik UI for ASP.NET MVC

1) Delete(uninstall) the Trial version from your machine before upgrading to the licensed ones. Doing so eliminates the chance of trial assemblies still making it into the project references or even production.

2) Install the Licensed version of Kendo UI and follow the steps for updating the Telerik UI for ASP.NET MVC version.