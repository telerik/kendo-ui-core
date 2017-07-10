---
title: Visual Studio Online Continuous Integration Asks for Login
description: A solution for preventing the Login dialog from being randomly displayed during builds in VS Online builds.
type: troubleshooting
page_title: Visual Studio Online Continuous Integration Asks for Login
slug: vs_online_continuous_integration_login_problem
position: 0
tags: vs2017
ticketid: 1106905
pitsid:
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Telerik® UI for ASP.NET Core</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Edge</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>25</td>
 </tr>
 <tr>
  <td>.Net framework</td>
  <td>Version 4.6.1</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio Online</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>C#</td>
 </tr>
</table> 

## Description

I have stored the passwords on the developer systems by using clear text. Yet, while other secured NuGet repositories work as expected, the **Login** dialog (randomly) displays. 

## Possible Solution

While the project does not provide a built-in solution, you can still work around this behavior.

Users have applied the following workarounds to overcome issues related to credentials in ASP.NET MVC and Core projects.

**Workaround 1** This approach is related to the known [https://github.com/dotnet/cli/issues/3174](https://github.com/dotnet/cli/issues/3174) issue in the official .NET Core CLI repository. To apply it, reset the `Nuget.config` file and use the `nuget restore` command:

1. Delete the `NuGet.config` file `%AppData%\\NuGet\\`  
1. Go through the procedure of storing the Telerik credentials once again and decide whether your assumption regarding the NuGet package is correct or the [Telerik.UI.for.AspNet.Core NuGet feed](http://docs.telerik.com/aspnet-mvc/getting-started/nuget-install#use-the-telerik-private-nuget-feed) is needed.  
1. Use the `nuget restore` instead of `dotnet restore` command.  

**Workaround 2** [Create your own NuGet package](https://docs.microsoft.com/en-us/nuget/create-packages/creating-a-package).

**Workaround 3** The reason for this behavior might lay in the NuGet Server and the issue might be solved on its own.
