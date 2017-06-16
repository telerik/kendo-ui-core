---
title: Visual Studio Online Continuous Integration Asking for Login
description: A solution for The login dialog is randomly displayed during builds in VS Online builds
type: troubleshooting
page_title: VS Online Continuous Integration has an authentication issue
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

We have stored passwords by using clear text on developer systems. Yet the login dialog is (randomly) displayed. Other NuGet repositories that are secured work as expected. 

## Solutions

There is no built-in solution. Check the [suggested workarounds](#suggested-workarounds) instead.

## Suggested Workarounds

The following options have helped other clients to overcome reported issues with credentials in ASP.NET MVC & Core Projects.

1) Reset the `Nuget.config` file and use the `nuget restore` command.
  - Delete the `NuGet.config` file `%AppData%\\NuGet\\`  
  - Go through the procedure of storing the Telerik credentials once again and answer the questions "Is my assumption regarding the NuGet package correct or is it the [Telerik.UI.for.AspNet.Core NuGet feed](http://docs.telerik.com/aspnet-mvc/getting-started/nuget-install#use-the-telerik-private-nuget-feed) that is needed?  
  - Use the `nuget restore` instead of `dotnet restore` command  

  This workaround is related to the known [https://github.com/dotnet/cli/issues/3174](https://github.com/dotnet/cli/issues/3174) issue in the official .NET Core CLI repository.  

2) [Create your own NuGet package](https://docs.microsoft.com/en-us/nuget/create-packages/creating-a-package).

3) The issue was related to the Nuget Server and the problem was solved on its own.
