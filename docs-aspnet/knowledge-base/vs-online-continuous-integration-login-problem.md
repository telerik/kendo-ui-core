---
title: Visual Studio Online Continuous Integration Randomly Asks for Login
description: The Visual Studio Online Login dialog is randomly displayed during VS Online builds.
type: troubleshooting
page_title: VS Online Continuous Integration Has an Authentication Issue
slug: vs-online-continuous-integration-login-problem
tags: vs2017
ticketid: 1106905
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Telerik® UI for ASP.NET Core</td>
 </tr>
 <tr>
  <td>.Net framework</td>
  <td>Version 4.6.1</td>
 </tr>
 <tr>
  <td>Visual Studio Version</td>
  <td>Visual Studio Online</td>
 </tr>
</table>

## Description

I have stored the passwords on the developer systems by using clear text but the **Login** dialog (randomly) displays while other secured NuGet repositories work as expected. 

## Suggested Workarounds

Telerik UI for ASP.NET Core does not provide a built-in solution for avoiding this behavior. However, you can still work around this issue and apply approaches that worked with other users.

### Workaround #1

The reason for this problem might be related to the known [https://github.com/dotnet/cli/issues/3174](https://github.com/dotnet/cli/issues/3174) issue in the official .NET Core CLI repository.

To apply the described approach, reset the `Nuget.config` file and use the `nuget restore` command:

1. Delete the `NuGet.config` file `%AppData%\\NuGet\\`
1. Go through the procedure of storing the Telerik credentials once again and decide whether your assumption regarding the NuGet package is correct or the [Telerik.UI.for.AspNet.Core NuGet feed](https://docs.telerik.com/aspnet-mvc/getting-started/nuget-install#use-the-telerik-private-nuget-feed) is needed.
1. Use the `nuget restore` instead of `dotnet restore` command.

### Workaround #2

To avoid the issue, [create your own NuGet package](https://docs.microsoft.com/en-us/nuget/create-packages/creating-a-package).

### Workaround #3

The reason for this problem might be in the NuGet Server. If so, it will resolve on its own.
