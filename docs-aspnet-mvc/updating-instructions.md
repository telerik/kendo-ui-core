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

# Upgrading Troubleshooting

###I Still Get the Old Version

Sometimes the .NET Framework caches the old Kendo.MVC dll and therefore the update may seem to have failed. Try the following to ensure that no caches remain:

Terminate the IIS process (from the Windows Task Manager) and close Visual Studio.

Clean up the Temporary ASP.NET Files from <sysdrive>:\Windows\Microsoft.NET\Framework[64]\<vernum>\Temporary ASP.NET Files.

Delete your browser cache. For example, these are the steps for IE: Tools -> Internet Options -> Delete Files.

Clean up the Windows WebSite Cache from `:\Users<UserName>\AppData\Local\Microsoft\WebsiteCache. The location of this cache may vary from one operating system to the next.

Clean up the Visual Studio Backup from <sysdrive>:\Users\<UserName>\Documents\Visual Studio <vsVersion>\Backup Files. This location depends on your VS settings and installation.

### The icons are missing after the update

As from [R1 2017](http://docs.telerik.com/kendo-ui/backwards-compatibility/2017-backward-compatibility#kendo-ui-2017-r1) the Telerik UI for ASP.NET MVC is using font icons. When updating the project from a version before R1 2017 to the R1 2017 version(2017.1.118) or newer, please have in mind that if custom CSS rules are used the classes have to be changed accordingly.

If the icons are still missing after the classes are changed, please ensure that the version is fully updated.