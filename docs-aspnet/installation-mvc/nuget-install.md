---
title: Installing with NuGet
page_title: Installing with NuGet
description: "Get started with Telerik UI for ASP.NET MVC and install the NuGet packages of the helpers."
previous_url: getting-started/installation/nuget-install
slug: aspnetmvc_nuget
previous_url: /nuget-install, /getting-started/nuget-install
position: 4
---

# Installing with NuGet

This article describes how to configure the Telerik NuGet feed and use it to install Telerik UI for ASP.NET MVC in your project. 

[NuGet](https://www.nuget.org) is a popular .NET package manager. Telerik maintains a NuGet feed with official UI for ASP.NET MVC releases and service packs. These packages are available for registered users with active trial or commercial licenses. In the Telerik NuGet feed, you will see only the packages that are licensed to your account.

>tipLooking for a complete tutorial? Check out the [Getting Started guide that uses NuGet]({%slug setupwithnuget_aspnetmvc%}) to add Telerik UI to the project.
## Setup the Telerik NuGet Feed

The Telerik NuGet feed allows you instant access to various Telerik and Kendo packages that you can install in your project. Before you can use the Telerik NuGet server as a **Package source**, you must configure your machine by utilizing either of the following methods:

* [Use the NuGet Package Manager tool in Visual Studio](#setup-with-nuget-package-manager).

* [Use the Telerik UI for ASP.NET MVC trial installer](#setup-with-the-trial-installer).

* [Use the **Progress Control Panel** application](#setup-with-the-progress-control-panel-application).

* [Use NuGet CLI](#setup-with-nuget-cli).

* [Edit the `nuget.config` file](#setup-with-nugetconfig).

>The legacy https://nuget.telerik.com/nuget server is now deprecated. Make sure to switch to the new https://nuget.telerik.com/v3/index.json server, which is faster, lighter, and reduces the number of requests from your NuGet client.

The following video demonstrates how to add the Telerik NuGet feed through the NuGet Package Manager tool in Visual Studio or the `nuget.config` file.

<iframe width="560" height="315" src="https://www.youtube.com/embed/c3m_BLMXNDk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Setup with NuGet Package Manager

1. Open Visual Studio.

1. Go to **Tools > NuGet Package Manager > Package Manager Settings**, select Package Manager Sources, and then click the **+** button.

1. Enter a **Name** for the Telerik NuGet feed, for example, Telerik NuGet.

1. Add the **Source** URL: https://nuget.telerik.com/v3/index.json and click **OK**.

    ![Kendo UI resources](../getting-started-mvc/images/add-nuget-source.png)

You have successfully added the Telerik NuGet feed as a Package source. The steps below describe how to authenticate your local NuGet instance and how to display the available packages:

1. Create a new project or open an existing project.

1. Right-click on the solution in the **Solution Explorer** window.

1. Select **Manage NuGet Packages for Solution...**

1. Select the Telerik NuGet **Package source** from the drop-down list.

1. Click on the **Browse** tab to see the available packages.

1. Enter your Telerik credentials in the Windows Authentication dialog. You will see all packages that are licensed to your user account in the Visual Studio Package Manager.

### Setup with the Trial Installer

The UI for ASP.NET MVC free trial installer package comes with an option that will automatically configure the Telerik NuGet feed for you. Refer to the [Getting Started article]({% slug setupwithnuget_aspnetmvc %}#adding-the-telerik-nuget-feed-for-trial-license-users) for more details.

### Setup with the Progress Control Panel Application

If you have already purchased a commercial Telerik UI license, you can use the Progress Control Panel application to configure the Telerik NuGet. The Control Panel has an option that you can select, and it will configure the Visual Studio Package Manager to use the Telerik NuGet feed. Refer to the [Getting Started article]({% slug setupwithnuget_aspnetmvc %}#adding-the-telerik-nuget-feed-for-users-with-commercial-license) for step-by-step instructions.

### Setup with NuGet CLI

1. Download the [latest NuGet executable](https://dist.nuget.org/win-x86-commandline/latest/nuget.exe).

1. Open a command prompt and change the path to where the `nuget.exe` is downloaded.

1. Execute the command:

    ```
        NuGet Sources Add -Name "telerik.com" -Source "https://nuget.telerik.com/v3/index.json" -UserName "your login email" -Password "your password"
    ```

The above command stores a token in the `%AppData%\NuGet\NuGet.config` file. Your original credentials cannot be obtained from this token.

If you are unable to connect to the feed by using encrypted credentials, try the alternative approach of storing credentials in clear text:

    ```
        NuGet Sources Add -Name "telerik.com" -Source "https://nuget.telerik.com/v3/index.json" -UserName "your login email" -Password "your password" -StorePasswordInClearText
    ```

If you have already stored a token instead of storing the credentials as clear text, you could update the definition in the `%AppData%\NuGet\NuGet.config` file using the following command:

    ```
        NuGet Sources Update -Name "telerik.com" -Source "https://nuget.telerik.com/v3/index.json" -UserName "your login email" -Password "your password" -StorePasswordInClearText
    ```
### Setup with nuget.config

An alternative way to add the Telerik NuGet feed is to directly edit the nuget.config file. Refer to [this video](https://youtu.be/c3m_BLMXNDk?t=129) for more details.

## Install the NuGet Packages

After you configure the Telerik NuGet package source, install the packages either through the [Package Manager Console](http://docs.nuget.org/Consume/Package-Manager-Console) or through the [Package Manager Dialog](https://docs.nuget.org/consume/package-manager-dialog).

The NuGet packages allow you to use the Telerik UI HTML Helpers in your application. For the UI components to render correctly, you must also provide the required [client-side resources]({% slug copyclientresources_aspnetmvc %}).

>tip To check the status of the Progress Live Services, like Telerik NuGet, Kendo UI CDN, Kendo UI Dojo playground and others, visit the [Progress<sup>®</sup> Telerik<sup>®</sup> Live Services Status Page](http://status.telerik.com/).

## List of Provided Packages

The NuGet feed provides the following packages related to Telerik UI for ASP.NET MVC:

- `Telerik.UI.for.AspNet.Mvc5`&mdash;Telerik UI for ASP.NET MVC 5 Commercial.
- `Telerik.UI.for.AspNet.Mvc5.Trial`&mdash;Telerik UI for ASP.NET MVC 5 Trial.
- `Telerik.UI.for.AspNet.Mvc4`&mdash;Telerik UI for ASP.NET MVC 4 Commercial.
- `Telerik.UI.for.AspNet.Mvc4.Trial`&mdash;Telerik UI for ASP.NET MVC 4 Trial.
- `Telerik.UI.for.AspNet.Mvc3`&mdash;Telerik UI for ASP.NET MVC 3 Commercial.
- `Telerik.UI.for.AspNet.Mvc3.Trial`&mdash;Telerik UI for ASP.NET MVC 3 Trial.

For more information on the list of the provided Kendo UI packages, refer to the article on [installing Kendo UI for jQuery with NuGet](https://docs.telerik.com/kendo-ui/intro/installation/nuget-install).

## Troubleshooting Issues with NuGet

If you experience any issues while configuring or using the Telerik NuGet server, check the dedicated [Telerik NuGet Troubleshooting]({% slug troubleshooting_telerik_nuget %}) article.

## See Also

* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Scaffolding the Telerik UI for ASP.NET MVC Project]({% slug scaffolding_aspnetmvc %})
* [Using Telerik UI for ASP.NET MVC in MVC 5 Applications]({% slug gettingstarted_aspnetmvc %})
* [Using Telerik UI for ASP.NET MVC in MVC 4 Applications]({% slug aspnetmvc4_aspnetmvc %})
* [Using Telerik UI for ASP.NET MVC in MVC 3 Applications]({% slug aspnetmvc3_aspnetmvc %})
* [Set Up Private NuGet Feed for Azure](https://docs.telerik.com/aspnet-core/knowledge-base/setup-private-nuget-feed-azure)
