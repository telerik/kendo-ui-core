---
title: Latest Version Retrieval
page_title: Latest Version Retrieval | UI for ASP.NET MVC Visual Studio Integration
description: "Learn how to keep your projects updated when using Telerik UI for ASP.NET MVC."
slug: latestversionretrieval_visualstudio_aspnetmvc
position: 6
---

# Latest Version Retrieval

With the Telerik UI for ASP.NET MVC Visual Studio Extensions you keep your projects in an up-to-date state. The Latest Version Acquirer tool automatically retrieves the latest Telerik UI for ASP.NET MVC distribution available on the Telerik website.

Once a day, upon Visual Studio launch, the extensions query the Telerik website for a new version of Telerik UI for ASP.NET MVC. A notification gets displayed when a new version is discovered.

**Figure 1. A displayed notification upon locating a new Telerik UI for ASP.NET MVC version**

![Notification](/aspnet-mvc/vs-integration/images/notification.png)

> **Important**
>
> If you disable the notifications, you can use the **Options** Dialog to activate them again.

Clicking **Get Now** starts the Latest Version Acquirer tool, prompting for your Telerik credentials in its first page. If you do not have a `www.telerik.com` account, you can create one through the **Register** link.

**Figure 2. The Get the Latest Version dialog**

![Get latest version](/aspnet-mvc/vs-integration/images/lva1.png)

> **Important**
>
> You cannot use the tool if you have a trial license. Attempting to download a distribution results in an error message.

Check for any additional information about the release by clicking the **Release Notes** link. This starts a browser, navigating to a page with the release notes related to the specific version.

Use the **Save my password** checkbox to avoid having to enter your Telerik credentials multiple times. The persistence is done in a secure manner and credentials are saved in a per-user context. Other users on the machine do not have access to your stored credentials.

The download starts automatically after a confirmation window.

**Figure 3, 4 and 5. The dialog indicating the download progress**

![Get latest version](/aspnet-mvc/vs-integration/images/lva2.png)
![Get latest version](/aspnet-mvc/vs-integration/images/lva3.png)
![Get latest version](/aspnet-mvc/vs-integration/images/lva4.png)

Once the download succeeds, the latest version of Telerik UI for ASP.NET MVC is available to use in the **Upgrade Wizard** and the **New Project Wizard**.

> **Important**
> * The Download buttons of the **Upgrade Wizard** and the **New Project Wizard** launch the **Latest Version Acquirer** tool too.
> * The **Latest Version Acquirer** tool downloads the `.zip` files, containing the latest Telerik UI for ASP.NET MVC binaries and any resources vital for a Telerik UI for ASP.NET MVC application. These get unpacked to the `%APPDATA%\Telerik\Updates` folder by default. If you find the list of packages offered too long and you do not need the older versions, close the Visual Studio and use the Windows Explorer to delete these distributions.

## See Also

Other articles on Telerik UI for ASP.NET MVC Visual Studio integration:

* [Visual Studio Integration Overview]({% slug overview_visualstudio_aspnetmvc %})
* [New Project Wizards]({% slug newprojectwizards_visualstudio_aspnetmvc %})
* [Project Wizard Configuration]({% slug projectwizardconfig_visualstudio_aspnetmvc %})
* [Project Wizard Upgrade]({% slug projectwizardupgrade_visualstudio_aspnetmvc %})
* [Project Wizard Conversion]({% slug projectwizardcoversion_visualstudio_aspnetmvc %})
* [Visual Studio Extensions Options]({% slug vsextensionsoptions_visualstudio_aspnetmvc %})
