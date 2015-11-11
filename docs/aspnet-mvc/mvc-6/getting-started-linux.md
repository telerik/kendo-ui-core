---
title: Getting Started On Linux
page_title: Getting started with Telerik UI for ASP.NET MVC 6 on Linux
description: How to configure a project to use Telerik UI for ASP.NET MVC 6 on Linux.
position: 2
---

# Using Telerik UI for ASP.NET MVC in MVC 6 applications on Linux

This tutorial shows how to configure an ASP.NET MVC6 project to use Telerik UI for ASP.NET MVC on Linux.

> The following steps are tested on Ubuntu 14.04.

### Prerequisites 
1. [Microsoft ASP.NET (Beta8)](http://docs.asp.net/en/latest/getting-started/installing-on-linux.html)

### 1. Create an ASP.NET MVC 6 Web Site
Please skip this step if you're configuring an existing project. We will use [Yeoman](http://yeoman.io/) to scaffold empty ASP.NET application. 

1. Install [Node.js](https://github.com/nodesource/distributions) v.4.x (if not yet installed):
        
        curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
        sudo apt-get install -y nodejs

2. Check if the Node.js version is the desired one:
        
        kendo@kendo-docker:~$ nodejs -v
        v4.2.2

3. Install Yeoman and [aspnet](https://github.com/omnisharp/generator-aspnet#readme) generator:

        sudo npm install -g yo generator-aspnet

4. Navigate to the folder where the project folder should be created using Terminal:

        kendo@kendo-docker:~$ mkdir Projects$
        kendo@kendo-docker:~$ cd Projects/
        kendo@kendo-docker:~/Projects$
        
5. Type the following command:

        yo aspnet
   
You should see the following response:

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

        
6. Navigate using arrow keys to select the `Web Application Basic` option and press enter. Then enter te name of the new application (you can skip this step and use the default name by pressing enter). After setting the name the generator will create desired folder and the selected application. You should see the following response:

        Your project is now created, you can use the following commands to get going
            cd "WebApplicationBasic"
            dnu restore
            dnu build (optional, build will also happen when it's run)
            dnx web
        
7. As stated in the above response, navigate to the created folder and execute the following command:

        dnu restore
        
After typing the command above, the packages will be downloaded from nuget. The end of the response should look like:

        Restore complete, 10070ms elapsed
        
        Feeds used:
            https://api.nuget.org/v3-flatcontainer/
        kendo@kendo-docker:~/Projects/WebApplicationBasic$ 
        
8. Start the application using the following command:

        dnx web
        
This will output the following response:

        Hosting environment: Production
        Now listening on: http://localhost:5000
        Application started. Press Ctrl+C to shut down.

9. Finally use your favorite browser to navigate to the above location and make sure the application is working:

    ![Web application in browser](images/website.png)

After checking the application in the browser stop the server.

### 2. Add Kendo nuget package

1. Open `project.json` file using your favorite text editor and add the `Kendo.Mvc` dependency:

        "dependencies": {
            ...
            "Kendo.Mvc": "2015.3.1026"
        }

1. Navigate to the project folder and restore the packages again:

        dnu restore

1. Open `Startup.cs` using your favorite text editor (IDE) and locate the `ConfigureServices` method. Add the following snippet:

        // Register UI for ASP.NET MVC helpers
        services.AddKendo();

1. Import the `Kendo.Mvc.UI` namespace in `~/Views/_ViewImports.cshtml`

        @using Kendo.Mvc.UI

1. Copy the Kendo UI client-side resources
    1. Manual installation

        Copy the `js` and `styles` folders from the `telerik.ui.for.aspnetmvc` archive to `wwwroot\lib\kendo-ui`

        ![Kendo UI resources](images/resources.png)

    1. [Install Kendo UI Professional as a Bower package](/install/bower#install-kendo-ui-professional-bower-package)

1. Register the Kendo UI styles and scripts in `~/Views/Shared/Layout.cshtml`

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

1. Use a Kendo UI Widget

    Add the following snippet to `~/Views/Home/Index.cshtml`

            <h2>Kendo UI DatePicker</h2>

            @(Html.Kendo().DatePicker()
                    .Name("datepicker")
                    .Deferred()
            )

            @section scripts {
                @Html.Kendo().DeferredScripts()
            }

1. Navigate to the project folder using Terminal and run it using the following command:
 
        dnx web

1. All done

    ![Sample page](images/sample-page.png)
