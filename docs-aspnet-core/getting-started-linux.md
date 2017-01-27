---
title: Getting Started on Linux
page_title: Getting Started on Linux | Telerik UI for ASP.NET Core
description: "Learn the basics when working with Telerik UI for ASP.NET Core (aka MVC 6 or ASP.NET Core MVC) on Linux."
previous_url: /aspnetmvc-apps/mvc-6/getting-started-linux, /mvc-6/getting-started-linux
slug: gettingstartedlinux_aspnetmvc6_aspnetmvc
position: 3
---

# Getting Started on Linux

This article demonstrates how to configure an ASP.NET Core project that enables you to use Telerik UI for ASP.NET MVC on Linux.

> **Important**  
>
> The following steps are tested on Ubuntu 14.04 and 16.04. and on MacOS X El Capitan 10.11.6.

## Prerequisites

Make sure you install the [Microsoft ASP.NET](http://docs.asp.net/en/latest/getting-started/installing-on-linux.html) and **NuGet**.

## Configuration

To configure an ASP.NET Core project that enables you to use Telerik UI for ASP.NET MVC on Linux, do the following:

1. Create an ASP.NET MVC web site.
2. Add the Kendo UI NuGet package.

### Create ASP.NET Core Web Sites

Below are listed the steps for you to follow when creating an ASP.NET Core web site. The examples use [Yeoman](http://yeoman.io/) to scaffold an empty ASP.NET application.

> **Important**
>
> Skip this step if you are configuring an existing project.

**Step 1.** Install [Node.js](https://github.com/nodesource/distributions) v.4.x.

###### Example

        curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
        sudo apt-get install -y nodejs

**Step 2.** Check if the Node.js version is the desired one.

###### Example

        kendo@kendo-docker:~$ nodejs -v
        v4.2.2

**Step 3.** Install Yeoman and an [aspnet](https://github.com/omnisharp/generator-aspnet#readme) generator.

###### Example

        sudo npm install -g yo generator-aspnet

**Step 4.** Navigate to the folder where you want to create the project folder using Terminal.

###### Example

        kendo@kendo-docker:~$ mkdir Projects
        kendo@kendo-docker:~$ cd Projects/
        kendo@kendo-docker:~/Projects$

**Step 5.** Type the command from the example below.

###### Example

        yo aspnet

The example below demonstrates a similar result to the response that is expected to show.

###### Example

        kendo@kendo-docker:~/Projects$ yo aspnet

             _-----_
            |       |    .--------------------------.
            |--(o)--|    |      Welcome to the      |
           `---------´   |   marvellous ASP.NET 5   |
            ( _´U`_ )    |        generator!        |
            /___A___\    '--------------------------'
             |  ~  |     
           __'.___.'__   
         ´   `  |° ´ Y `

        ? What type of application do you want to create?
          Empty Application
          Console Application
          Web Application
        ❯ Web Application Basic [without Membership and Authorization]
          Web API Application
          Nancy ASP.NET Application
          Class Library
          Unit test project


**Step 6.** Select the **Web Application Basic** option by using the keyboard arrow keys and press `Enter`. Create the name of the new application. Note that you can skip this step and use the default name by pressing `Enter`. After setting the name, the generator creates the desired folder and the selected application.

> **Important**
>
> Yeoman gets improved in time and the steps above might change. For more information, refer to the [Yeoman resources](http://yeoman.io/).

When finished, the scaffolded project should be ready.

**Step 7.** Navigate to the created folder and execute the command from the example below.

> **Important**
>
> For up-to-date commands, refer to the [guide on getting started with .NET Core](https://docs.asp.net/en/latest/getting-started.html)

###### Example

        dotnet restore

As a result, the packages are downloaded from NuGet. The end of the response looks similar to the one demonstrated in the example below.

###### Example

        Restore complete, 10070ms elapsed

        kendo@kendo-docker:~/Projects/WebApplicationBasic$

**Step 8.** Start the application by using the command from the example below.

###### Example

        dotnet run

As a result, the response demonstrated in the example below is delivered.

###### Example

        Hosting environment: Production
        Now listening on: http://localhost:5000
        Application started. Press Ctrl+C to shut down.

**Step 9.** Use your favorite browser to navigate to the above location and make sure the application is working in the way shown below. After checking the application in the browser, stop the server.

**Figure 1. The web application in the browser**

![Web application in browser](images/website.png)

### Add the Telerik.UI.for.AspNet.Core NuGet Package

**Step 1.** Open the `project.json` file, using a text editor, add the `Telerik.UI.for.AspNet.Core` dependency, and replace `productVersion` with an actual **Telerik UI for AspNet Core** version&mdash;for example, `2016.3.914`.

###### Example

        "dependencies": {
            ...
            "Telerik.UI.for.AspNet.Core": "productVersion"
        }

**Step 2.** Add the private Telerik NuGet feed. Make sure that you **store the password in clear text** because the .NET Core tooling does not support encryption.

###### Example 

```sh
NuGet Sources Add -Name "telerik.com" -Source "https://nuget.telerik.com/nuget" -UserName "your telerik.com login email" -Password "your telerik.com password" -StorePasswordInClearText
```


**Step 3.** Restore restore the packages again by running `dotnet restore`.

You may get an error similar to the following: `error: Unable to resolve 'Telerik.UI.for.AspNet.Core (>= 2017.1.118)' for '.NETCoreApp,Version=v1.1'.`. It is caused by issues in the tooling (see the following GitHub issues: in [Nuget/Home](https://github.com/NuGet/Home/issues/4413) and in [dotnet/core](https://github.com/dotnet/core/issues/453)). See below for workarounds.

When using NuGet to add a private feed, `NuGet Sources Add` writes in `~/.config/NuGet/NuGet.Config` file. But when using `dotnet restore` the `~/.nuget/NuGet/NuGet.Config` file is used to read the `packageSources` and `packageSourceCredentials`. 

Until this is fixed in the tooling you have two options:

 * Copy your `telerik.com` credentials manually from `~/.config/NuGet/NuGet.Config` to `~/.nuget/NuGet/NuGet.Config`.
 * Or, create a `NuGet.Config` file in the project folder with the contents from `~/.config/NuGet/NuGet.Config`.

###### Example

```
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" protocolVersion="3" />
    <add key="telerik.com" value="https://nuget.telerik.com/nuget" />
  </packageSources>
  <packageSourceCredentials>
    <telerik.com>
      <add key="Username" value="your.telerik.com@email.login" />
      <add key="ClearTextPassword" value="your.telerik.com.password.in.clear.text" />
    </telerik.com>
  </packageSourceCredentials>
</configuration>
```   
        
        



**Step 4.** Open `Startup.cs`, using a text editor (IDE) and update it as described below.

Locate the `ConfigureServices` method and add a call to `services.AddKendo` at the end.

###### Example

        ...
        using Newtonsoft.Json.Serialization;
        ...
        public void ConfigureServices(IServiceCollection services)
        {
            ...
            // Maintain property names during serialization. See:
            // https://github.com/aspnet/Announcements/issues/194
            services
                .AddMvc()
                .AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

            // Add Kendo UI services to the services container
            services.AddKendo();
        }

Locate the `Configure` method and add a call to `app.UseKendo` at the end.

###### Example

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            ...

            // Configure Kendo UI
            app.UseKendo(env);
        }

**Step 4.** Import the `Kendo.Mvc.UI` namespace in `~/Views/_ViewImports.cshtml`.

###### Example

        @using Kendo.Mvc.UI

**Step 5.** Copy the Kendo UI client-side resources.

* **Manual installation**

Copy the `js` and `styles` folders from the `telerik.ui.for.aspnetmvc` archive to `wwwroot\lib\kendo-ui`.

**Figure 2. Kendo UI resources**

![Kendo UI resources](images/resources.png)

* **[Kendo UI Professional Bower package installation](../kendo-ui/intro/installation/bower-install)**

**Step 6.** Register Kendo UI styles and scripts in `~/Views/Shared/Layout.cshtml`.

###### Example

        <head>
        ...

        <link rel="stylesheet" href="~/lib/kendo-ui/styles/kendo.common-bootstrap.min.css" />
        <link rel="stylesheet" href="~/lib/kendo-ui/styles/kendo.bootstrap.min.css" />
        <link rel="stylesheet" href="~/lib/kendo-ui/styles/kendo.dataviz.bootstrap.min.css" />
        </head>
        <body>
        ...

        <script src="~/lib/kendo-ui/js/kendo.all.min.js"></script>
        <script src="~/lib/kendo-ui/js/kendo.aspnetmvc.min.js"></script>

        @RenderSection("scripts", required: false)
        </body>

**Step 7.** Use a Kendo UI widget by adding the snippet demonstrated in the example below to `~/Views/Home/Index.cshtml`.

###### Example

        <h2>Kendo UI DatePicker</h2>

        @(Html.Kendo().DatePicker()
                .Name("datepicker")
                .Deferred()
        )

        @section scripts {
            @Html.Kendo().DeferredScripts()
        }

**Step 8.** Navigate to the project folder by using the Terminal and run it using the command shown in the example below.

###### Example

        dotnet run

Now that all is done, you can see the sample page.

**Figure 3. The end result&mdash;a sample page**

![Sample page](images/sample-page.png)

## See Also

Other articles on Telerik UI for ASP.NET MVC in ASP.NET Core applications:

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
* [Tag Helpers for ASP.NET Core]({% slug taghelpers_aspnetmvc6_aspnetmvc %})
