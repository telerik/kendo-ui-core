---
title: Installing with NuGet
page_title: Installing with NuGet
description: "Learn how to install Telerik UI for ASP.NET Core by using the NuGet packages available from the Telerik NuGet source."
previous_url: /getting-started/nuget-install, /getting-started/installation/nuget-install
slug: nuget_install_aspnetmvc6_aspnetmvc
position: 3
---

# Installing with NuGet

This article describes how to configure your system to use the Telerik NuGet source and to install Telerik UI for ASP.NET Core in your project. 

[NuGet](https://www.nuget.org) is a popular .NET package manager. Telerik maintains a NuGet feed with official UI for ASP.NET Core releases and service packs. These packages are available only for registered users with an active trial or commercial license. In the Telerik NuGet feed, you will see only the packages that are licensed to your account.

>tipLooking for a complete tutorial? Check out the [Getting Started guide that uses NuGet]({%slug gettingstarted_aspnetmvc6_aspnetmvc%}) to add Telerik UI to the project.

## Setting Up the Telerik NuGet Feed

The Telerik NuGet feed allows you instant access to various Telerik and Kendo packages that you can install in your project. Before you can use the Telerik NuGet Feed as a **Package source**, you must configure your machine by utilizing any of the following methods:

* [Use the NuGet Package Manager in Visual Studio](#setup-with-the-nuget-package-manager).

* [Use the Telerik UI for ASP.NET Core trial installer](#setup-with-the-trial-installer).

* [Use the Progress Control Panel application](#setup-with-the-progress-control-panel-application).

* [Use NuGet CLI](#setup-with-nuget-cli).

* [Edit the `nuget.config` file](#setup-with-nugetconfig).

>The legacy https://nuget.telerik.com/nuget server is now deprecated. Make sure to switch to the new https://nuget.telerik.com/v3/index.json server, which is faster, lighter, and reduces the number of requests from your NuGet client.

### Setup with the NuGet Package Manager

The following video demonstrates how to add the Telerik NuGet feed through the NuGet Package Manager tool in Visual Studio. Scroll below the video to find the required steps.

<iframe width="560" height="315" src="https://www.youtube.com/embed/dJo1Ij4CcIY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

To configure the Telerik NuGet feed in Visual Studio:

1. Open Visual Studio.

1. Go to **Tools > NuGet Package Manager > Package Manager Settings**, select **Package Manager Sources**, and then click the **+** button.

1. Enter a **Name** for the Telerik NuGet feed, for example, `telerik.com`.

1. In the **Source** field, enter `https://nuget.telerik.com/v3/index.json` and click **OK**.

    ![Kendo UI resources](../getting-started-core/images/add-nuget-source.png)

You have successfully added the Telerik NuGet feed as a Package source. 

The next steps describe how to authenticate your local NuGet instance and how to display the available packages:

1. Create a new project or open an existing project.

1. Right-click the solution in the **Solution Explorer** window.

1. Select **Manage NuGet Packages for Solution...**

	![Locating and opening the NuGet package manager menu](../getting-started-core/images/manage-nuget.png)

1. Select the Telerik NuGet **Package source** from the drop-down list.

1. Click on the **Browse** tab to see the available packages.

1. Enter your Telerik credentials in the Windows Authentication dialog.

1. In the Visual Studio Package Manager, you will see all packages that are licensed to your user account.

### Setup with the Trial Installer

The UI for ASP.NET Core <a href="https://www.telerik.com/try/aspnet-core-ui" target="_blank">free trial installer package</a> comes with an option that will automatically configure the Telerik NuGet feed for you. Refer to the [NuGet feed setup section]({% slug gettingstarted_aspnetmvc6_aspnetmvc %}#adding-the-telerik-nuget-feed-for-trial-license-users) in the First Steps article for step-by-step instructions.

### Setup with the Progress Control Panel Application

If you have already purchased a commercial Telerik UI license, you can use the <a href="https://www.telerik.com/try/control-panel" target="_blank">Progress Control Panel application</a> to configure the Telerik NuGet. The Control Panel has an option that you can select, and it will configure the Visual Studio Package Manager to use the Telerik NuGet feed. Refer to the [NuGet feed setup section]({%slug gettingstarted_aspnetmvc6_aspnetmvc%}#adding-the-telerik-nuget-feed-for-users-with-commercial-license) in the First Steps article for step-by-step instructions.

### Setup with NuGet CLI

The following video demonstrates how to add the Telerik NuGet feed by using the NuGet CLI or directly editing the `nuget.config` file. Scroll below the video to find the required steps.

<iframe width="560" height="315" src="https://www.youtube.com/embed/c3m_BLMXNDk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

To add the Telerik NuGet feed by using the NuGet CLI:

1. Download the [latest NuGet executable](https://dist.nuget.org/win-x86-commandline/latest/nuget.exe).
1. Open a command prompt and change the path to where the `nuget.exe` was downloaded. 
1. Execute the command:

   ```
   NuGet Sources Add -Name "telerik.com" -Source "https://nuget.telerik.com/v3/index.json" -UserName "your login email" -Password "your password"
   ```

   The above command stores a token in the `%AppData%\NuGet\NuGet.config` file. Your original credentials cannot be obtained from this token.

If you are unable to connect to the feed by using encrypted credentials, try the alternative approach of storing credentials in clear text:

   ```
   NuGet Sources Add -Name "telerik.com" -Source "https://nuget.telerik.com/v3/index.json" -UserName "your login email" -Password "your password" -StorePasswordInClearText
   ```

If you have already stored a token instead of storing the credentials as clear text, you can update the definition in the `%AppData%\NuGet\NuGet.config` file by using the following command:

   ```
   NuGet Sources Update -Name "telerik.com" -Source "https://nuget.telerik.com/v3/index.json" -UserName "your login email" -Password "your password" -StorePasswordInClearText
   ```

### Setup with nuget.config

An alternative way to add the Telerik NuGet feed is to directly edit the `nuget.config` file. You can read more about it in the [Nuget Config File - Package Sources](https://docs.microsoft.com/en-us/nuget/reference/nuget-config-file#packagesources) article.

Make sure you are familiar with how such configurations work. The [Common NuGet Configurations](https://docs.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior#creating-a-new-config-file) article is a reference document you can use.

To use a `nuget.config` file for the Telerik feed, you need to:

1. Ensure you have the relevant config file: `%AppData%\NuGet\NuGet.Config`. You can create a new one by via the [dotnet new command](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new) by calling `dotnet new nugetconfig`.

2. Add the Telerik feed to the `nuget.config` file, and make sure to use plain-text credentials because the .NET Core NuGet tooling does not fully support encrypted credentials. Here is an example of how your config file can look like:

    ```
        <?xml version="1.0" encoding="utf-8"?>
        <configuration>
         <packageSources>
            <!--To inherit the global NuGet package sources remove the <clear/> line below -->
            <clear />
            <add key="nuget" value="https://api.nuget.org/v3/index.json" />
            <add key="telerik" value="https://nuget.telerik.com/v3/index.json" />
         </packageSources>
         <packageSourceCredentials>
            <telerik>
              <add key="Username" value="your telerik account email" />
              <add key="ClearTextPassword" value="your plain text password" />
           </telerik>
         </packageSourceCredentials>
        </configuration>
    ```

Refer to the [Telerik NuGet feed instructional video](https://youtu.be/c3m_BLMXNDk?t=129) for more details.




## Installing the NuGet Packages

After setting up the Telerik NuGet package source, install the packages either through the [Package Manager Dialog](https://docs.nuget.org/consume/package-manager-dialog) or the [Package Manager Console](http://docs.nuget.org/Consume/Package-Manager-Console).

The NuGet packages allow you to use the Telerik UI TagHelpers and HtmlHelpers in your application. For the UI components to render correctly, you must also provide the required [client-side resources]({% slug copyclientresources_aspnetmvc6_aspnetmvc %}).

>tip To check the status of the Progress Live Services, like Telerik NuGet, Kendo UI CDN, Kendo UI Dojo playground and others, visit the [Progress<sup>®</sup> Telerik<sup>®</sup> Live Services Status Page](http://status.telerik.com/).

## List of Provided Packages

The NuGet feed provides the following packages related to UI for ASP.NET Core and UI for ASP.NET MVC:

- `Telerik.UI.for.AspNet.Core`&mdash;Telerik UI for ASP.NET Core Commercial.
- `Telerik.UI.for.AspNet.Core.Trial`&mdash;Telerik UI for ASP.NET Core Trial.
- `Telerik.UI.for.AspNet.Mvc5`&mdash;Telerik UI for ASP.NET MVC 5 Commercial.
- `Telerik.UI.for.AspNet.Mvc5.Trial`&mdash;Telerik UI for ASP.NET MVC 5 Trial.
- `Telerik.UI.for.AspNet.Mvc4`&mdash;Telerik UI for ASP.NET MVC 4 Commercial.
- `Telerik.UI.for.AspNet.Mvc4.Trial`&mdash;Telerik UI for ASP.NET MVC 4 Trial.
- `Telerik.UI.for.AspNet.Mvc3`&mdash;Telerik UI for ASP.NET MVC 3 Commercial.
- `Telerik.UI.for.AspNet.Mvc3.Trial`&mdash;Telerik UI for ASP.NET MVC 3 Trial.

For more information on the list of the provided Kendo UI packages, refer to the article on [installing Kendo UI for jQuery with NuGet](https://docs.telerik.com/kendo-ui/intro/installation/nuget-install).

## Troubleshooting Issues with NuGet

If you experience any issues while configuring or using the Telerik NuGet server, check the dedicated [Telerik NuGet Troubleshooting]({% slug troubleshooting_telerik_nuget %}) article.

## Further Reading

You may find useful the following Microsoft articles on securing your NuGet feed setup and supply chain as general best practices:

* [Lock down your dependencies using configurable trust policies - Blog Post](https://devblogs.microsoft.com/nuget/lock-down-your-dependencies-using-configurable-trust-policies/)

* [How to Scan NuGet Packages for Security Vulnerabilities - Blog Post](https://devblogs.microsoft.com/nuget/how-to-scan-nuget-packages-for-security-vulnerabilities/)

* [Best practices for a secure software supply chain - MSDN docs](https://docs.microsoft.com/en-us/nuget/concepts/security-best-practices)

## See Also

* [Introduction to Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Including Client-Side Resources]({% slug copyclientresources_aspnetmvc6_aspnetmvc %})
* [Installing Telerik UI for ASP.NET Core by Using the CDN Services]({% slug cdnservices_core %})
