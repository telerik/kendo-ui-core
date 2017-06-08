---
title: Visual Studio Online Continuous Integration Asking for Login
description: The login dialog is randomly displayed during builds in VS Online builds
type: troubleshooting
page_title: VS Online Continuous Integration has authentication issue
slug: vs_online_continuous_integration_login_problem
position: 0
tags: vs2017
ticketid: 1106905
publish: false
pitsid:
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
We have stored passwords using clear text on developer systems, yet the login dialog is (randomly) displayed.Other nuget repositories that are secured work as expected. 

## Solutions
There is no built-in solution. Check the [suggested workarounds](#suggested-workarounds) instead.

## Suggested Workarounds
In our experience, the following options have helped other clients who have reported issues with credentials in ASP.NET MVC & Core Projects.
  
1) Reset the Nuget.config file and use nuget restore
  - Delete the NuGet.config file %AppData%\\NuGet\\  
  - Go over the procedure of storing the Telerik credentials once again. Is my assumption regarding the NuGet package correct or is it the [Telerik.UI.for.AspNet.Core NuGet feed](http://docs.telerik.com/aspnet-mvc/getting-started/nuget-install#use-the-telerik-private-nuget-feed) which is needed?  
  - use **nuget restore** instead of **dotnet restore** command  
  
This suggestion is related to a known issue in the official .NET Core CLI repository:  
[https://github.com/dotnet/cli/issues/3174](https://github.com/dotnet/cli/issues/3174)  
  
2) [Create own NuGet package](https://docs.microsoft.com/en-us/nuget/create-packages/creating-a-package) 

3) The issue has been with the Nuget Server and the problem disappeared on its own.
