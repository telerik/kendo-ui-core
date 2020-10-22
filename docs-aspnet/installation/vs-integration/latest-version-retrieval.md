---
title: Downloading New Versions
page_title: Downloading New Versions
description: "Learn how to keep your projects updated when using Progress&reg; Telerik&reg; UI for ASP.NET Core."
previous_url: /getting-started/vs-integration/latest-version-retrieval
slug: latestversionretrieval_visualstudio_aspnetcore
position: 4
---

# Downloading New Versions

The Progress&reg; Telerik&reg; UI for ASP.NET Core Visual Studio (VS) extensions enable you to keep your projects updated.

## Latest Version Acquirer Tool

The Latest Version Acquirer tool automatically retrieves the latest Telerik UI for ASP.NET Core distribution which is available on the Telerik website. Once a day, upon loading a project with Telerik UI for ASP.NET Core controls, the extensions query the Telerik website for a new version of Telerik UI for ASP.NET Core. When a new version is detected, a notification is displayed.

![Getting the latest version notification](../../installation/vs-integration/images/lva_notification.png)

Clicking **Update Now** starts the Latest Version Acquirer tool which prompts for your Telerik credentials on its first page. If you do not have a [www.telerik.com](https://www.telerik.com) account, you can create one through the **Create an account for free** link.

![Getting the latest version dialog](../../installation/vs-integration/images/lva1.png)

## The Download Process

1. Go to the [release notes of the Telerik UI for ASP.NET Core distribution](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history) to get information on the latest available versions.
1. To avoid having to enter your Telerik credentials multiple times, use the **Save my password** checkbox. The persistence is securely done and the credentials are saved in a per-user context. Other users on the machine do not have access to your stored credentials.
1. In the dialog that appears, confirm the download.

    ![Confirming the download of the latest version dialog](../../installation/vs-integration/images/lva2.png)

    As a result, the latest version automatically starts to download.

    ![The download of the latest version is in progress dialog](../../installation/vs-integration/images/lva3.png)

1. Click **OK** when the download process of the latest version completes.

    ![The download of the latest version is complete dialog](../../installation/vs-integration/images/lva4.png)

1. To access the latest version of Telerik UI for ASP.NET Core, after the download completes, go to **New Project Wizard**.

    > * The **Download** buttons of the **New Project Wizard** launch the **Latest Version Acquirer** tool.
    > * The **Latest Version Acquirer** tool downloads the `.zip` files which contain the latest Telerik UI for ASP.NET Core binaries and any resources that are vital for a Telerik UI for ASP.NET Core application. These get unpacked in the `%APPDATA%\Telerik\Updates` folder by default. If you find the list of the offered packages too long and you do not need the older versions, close the VS and use the Windows Explorer to delete these distributions.

## See Also

* [Integrating Visual Studio in Your .Net Project (Overview)]({% slug overview_visualstudio_aspnetcore %})
* [Creating New Projects with Visual Studio]({% slug newprojectwizards_visualstudio_aspnetcore %})
