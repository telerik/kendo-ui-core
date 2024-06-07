---
title: Handling Visual Studio Code Extension Issues
description: Learn how to handle issues when using Telerik UI for ASP.NET Core Productivity Tools extension for Visual Studio Code.
type: troubleshooting
page_title: Visual Studio Code Extension Issues
slug: vs-code-extension-issues
tags: vscode, extension, troubleshooting
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Telerik UI for ASP.NET Core Productivity Tools</td>
 </tr>
</table>

## Description

I cannot create a new project through the template wizard of the Telerik UI for ASP.NET Core Productivity Tools extension for Visual Studio Code, or the extension does not work as expected. How can I solve the issue?

## Solution

If the extension does not work right (missing pages, not starting, and more), follow the next steps to clean up the cache files and get it working again:

1. Uninstall the extension from VS Code.
2. Go to the extensions templates cache folder and delete the `CoreT` folder (this is where the cache for the Telerik extensions is stored):
    * on Windows, open `%localappdata%`
    * on Mac, open `/Users/[user_name]/.local/share/`
3. [Install](https://marketplace.visualstudio.com/items?itemName=TelerikInc.aspnetcoretemplatewizard) the extension again.

If you see `Response status code does not indicate success: 401 (Logon failed.).`, then the `Nuget.Config` file in `%APPDATA%\NuGet` may contain invalid credentials or keys. For more information, refer to the [Installing with NuGet]({% slug nuget_install_aspnetmvc6_aspnetmvc %}#setup-with-nuget-cli) or [NuGet Setup with CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %}#integrating-ui-for-aspnet-core) articles.


## More {{ site.framework }} Resources

* [Telerik UI for ASP.NET Core Productivity Tools Extension](https://marketplace.visualstudio.com/items?itemName=TelerikInc.aspnetcoretemplatewizard)

* [Telerik UI for ASP.NET Core Visual Studio Code Integration Documentation]({%slug overview-vs-code-integration%})

* [{{ site.product }} Product Page](https://www.telerik.com/aspnet-core-ui/)

* [{{ site.product }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

## See Also

* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)