---
title: Reset your credentials for the Telerik Nuget Feed
description: Learn how you can reset your credentials for the Telerik Nuget Feed
type: how-to
page_title: Reset Telerik Nuget Feed credentials
slug: reset-nuget-feed-credentials
tags: nuget, credentials, reset,
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Telerik® UI for ASP.NET Core</td>
 </tr>
</table>

## Description

I entered wrong credentials for the private Telerik NuGet Feed. How can I reset my credentials on a Windows machine?

## Solution 1: Resetting The Credentials in `NuGet.config`

Try resetting your credentials by using the approach suggested in the {% if site.core %} [Troubleshooting section]({% slug nuget_install_aspnetmvc6_aspnetmvc %}#after-changing-my-telerik-password-i-get-telerik-nuget-the-v2-feed-at--returned-an-unexpected-status-code-401-logon-failed-error) {% else %} [Troubleshooting section]({% slug aspnetmvc_nuget %}#after-changing-my-telerik-password-i-get-telerik-nuget-the-v2-feed-at--returned-an-unexpected-status-code-401-logon-failed-error) {% endif %} of the Installing with Nuget article. If the credentials are not updated, continue with [Solution 2](#solution-2-windows-credentials-manager).

## Solution 2: Windows Credentials Manager

Alternatively, use Windows Credentials Manager to remove the saved credentials:

1. In Visual Studio navigate to **Tools** > **NuGet Package Manager** > **Package Manager Settings**. Select **NuGet Package Manager**, click **Package Sources**, and remove the listed Telerik NuGet package source.
1. Close Visual Studio.
1. Open the Windows Credentials Manager. To access it, navigate to **Control Panel** > **User Accounts** > **Credential Manager**.
1. Click **Windows Credentials**.
1. Remove the following saved credentials:
    * `nuget.telerik.com`
    * `VSCredentials_nuget.telerik.com`
![My Image](../knowledge-base/images/windows-credential-manager.png)
1. Add the Telerik NuGet Feed again, and then enter the correct credentials. For more details, see the {% if site.core %} [Installing with Nuget]({% slug nuget_install_aspnetmvc6_aspnetmvc %}) {% else %} [Installing with Nuget]({% slug aspnetmvc_nuget %}) {% endif %} article.
1. If desired, verify the NuGet credentials by inspecting the `NuGet.config` file located in `%AppData%\NuGet\NuGet.config`
