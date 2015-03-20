---
title: ASP.NET MVC 3
page_title: Using Telerik UI for ASP.NET MVC with MVC 3
description: How to use Telerik UI  for ASP.NET MVC in ASP.NET MVC 3 applications
position: 1
---

# Telerik UI for ASP.NET MVC in MVC 3 applications

This tutorial shows how to use Telerik UI for ASP.NET MVC in ASP.NET MVC 3 applications. The tutorial uses Visual Studio 2010 but will work with all Visual Studio versions that support ASP.NET MVC 3. The tutorial also creates a new ASP.NET MVC 3 application but the steps to use Telerik UI for ASP.NET MVC in existing ASP.NET MVC 3 application are the same.

**The Telerik UI for ASP.NET MVC Visual Studio extensions (http://docs.telerik.com/kendo-ui/aspnet-mvc/vs-integration/introduction) automate the whole procedure which this document describes.**

## Create a new ASP.NET MVC 3 Application

To create a new ASP.NET MVC 3 Application follow these steps.

1. Open **Visual Studio 2010**.
2. Press **CTRL+SHIFT+N** to create a new project.
3. Select the **Visual C#** node and then **Web** to show all available web project templates for C#.
4. Select ASP.NET MVC 3 Web Application and click **OK**. This will start the New ASP.NET MVC 3 Project wizard.
5. Select **Internet Application** from the available templates and click **OK**. Alternatively you can select other templates - the remaining steps are the same.
6. Press **CTRL+F5** to build and run the application.

![New ASP.NET MVC 3 Application](/aspnet-mvc/images/mvc3-new-app.png)

## Add Telerik UI for ASP.NET MVC to the application

To use Telerik UI for ASP.NET MVC you need to include the required JavaScript and CSS files, reference the Kendo.Mvc.dll assembly and update the web.config file of the application.

### Include the JavaScript and CSS files

Telerik UI for ASP.NET MVC requires certain JavaScript and CSS files to be included in the page. There are two options - either to include a local copy of those files **or** to use our CDN (Content Delivery Network).

Using local JavaScript and CSS

To copy the required JavaScript and CSS files in the Visual Studio Solution of the application follow these steps.

1. Navigate to the install location of Telerik UI for ASP.NET MVC**. By default it is in **C:\Program Files (x86)\Telerik\.
2. Copy the **js** directory from the install location and paste it in the **Scripts** folder of the application.
3. Copy the **styles** directory from the install location and paste it in the **Content** folder of the application.
4. Rename the **Scripts/js** directory to **Scripts/kendo**. Rename **Content/styles** to **Content/kendo**.
![Kendo directories in Solution Explorer](/aspnet-mvc/images/mvc3-solution.png)

After the needed JavaScript and CSS files are added in the application you can include them.

1. Open the layout of the application. By default it is **Views/Shared/_Layout.cshtml** (or **Site.master** if using ASPX).
2. Include **Content/kendo/kendo.common.min.css** and **Content/kendo/kendo.default.min.css**. Add a **link** tag within the **head** tag of the layout.
    - Razor

            <link rel="stylesheet" href="@Url.Content("~/Content/kendo/kendo.common.min.css")" />
            <link rel="stylesheet" href="@Url.Content("~/Content/kendo/kendo.default.min.css")" />
    - ASPX

            <link rel="stylesheet" href="<%: Url.Content("~/Content/kendo/kendo.common.min.css") %>" />
            <link rel="stylesheet" href="<%: Url.Content("~/Content/kendo/kendo.default.min.css") %>" />

3. Delete any existing **script** tags that include older versions of jQuery.
4. Include the jQuery JavaScript file distributed with Telerik UI for ASP.NET MVC or a compatible version from other location. Add a **script** tag in within the **head** tag of the layout.
    - Razor

            <script src="@Url.Content("~/Scripts/kendo/jquery.min.js")"></script>
    - ASPX

            <script src="<%: Url.Content("~/Scripts/kendo/jquery.min.js") %>"></script>

5. Include **Scripts/kendo/kendo.all.min.js** and **Scripts/kendo/kendo.aspnetmvc.min.js** after jQuery.
    - Razor

            <script src="@Url.Content("~/Scripts/kendo/jquery.min.js")"></script>
            <script src="@Url.Content("~/Scripts/kendo/kendo.all.min.js")"></script>
            <script src="@Url.Content("~/Scripts/kendo/kendo.aspnetmvc.min.js")"></script>

    - ASPX

            <script src="<%: Url.Content("~/Scripts/kendo/jquery.min.js") %>"></script>
            <script src="<%: Url.Content("~/Scripts/kendo/kendo.all.min.js") %>"></script>
            <script src="<%: Url.Content("~/Scripts/kendo/kendo.aspnetmvc.min.js") %>"></script>

6. If using the Telerik MVC Scheduler wrapper, include **Scripts/kendo/kendo.timezones.min.js** after **kendo.all.min.js**.
    - Razor

            <script src="@Url.Content("~/Scripts/kendo/jquery.min.js")"></script>
            <script src="@Url.Content("~/Scripts/kendo/kendo.all.min.js")"></script>
            <script src="@Url.Content("~/Scripts/kendo/kendo.timezones.min.js")"></script>
            <script src="@Url.Content("~/Scripts/kendo/kendo.aspnetmvc.min.js")"></script>

    - ASPX

            <script src="<%: Url.Content("~/Scripts/kendo/jquery.min.js") %>"></script>
            <script src="<%: Url.Content("~/Scripts/kendo/kendo.all.min.js") %>"></script>
            <script src="<%: Url.Content("~/Scripts/kendo/kendo.timezones.min.js") %>"></script>
            <script src="<%: Url.Content("~/Scripts/kendo/kendo.aspnetmvc.min.js") %>"></script>

#### Using CDN

To include the Telerik UI for ASP.NET MVC JavaScript and CSS files from CDN follow these steps. Important! Dont’t forget to replace "kendo ui version" from the code snippets below with the current version of the product, e.g. “2013.2.918”.

1. Open the layout of the application. By default it is **Views/Shared/_Layout.cshtml** (or **Site.master** if using ASPX).
2. Include **kendo.common.min.css** and **kendo.default.min.css**. Add a **link** tag within the **head** tag of the layout.

        <link rel="stylesheet" href="http://cdn.kendostatic.com/<kendo ui version>/styles/kendo.common.min.css" />
        <link rel="stylesheet" href="http://cdn.kendostatic.com/<kendo ui version>/styles/kendo.default.min.css" />

3. Delete any existing **script** tags that include older versions of jQuery.
4. Include the jQuery JavaScript file from our CDN or a compatible version from other location. Add a **script** tag in within the **head** tag.

        <script src="http://cdn.kendostatic.com/<kendo ui version>/js/jquery.min.js”></script>

5. Include **kendo.all.min.js** and **kendo.aspnetmvc.min.js** after jQuery.

        <script src="http://cdn.kendostatic.com/<kendo ui version>/js/kendo.all.min.js”></script>
        <script src=”http://cdn.kendostatic.com/<kendo ui version>/js/kendo.aspnetmvc.min.js”></script>

6. If using Telerik MVC Scheduler wrapper, include **kendo.timezones.min.js** _after_ **kendo.all.min.js**

        <script src="http://cdn.kendostatic.com/<kendo ui version>/js/kendo.all.min.js"></script>
        <script src="http://cdn.kendostatic.com/<kendo ui version>/js/kendo.timezones.min.js"></script>
        <script src="http://cdn.kendostatic.com/<kendo ui version>/js/kendo.aspnetmvc.min.js"></script>
### Add reference to Kendo.Mvc.dll

The next step is to add a reference to **Kendo.Mvc.dll** which is the assembly containing the Kendo UI MVC server-side wrappers.

1. Right-click the **References** node in Solution Explorer and click **Add Reference**.
2. Select the **Browse** tab of the **Add Reference** dialog and navigate to the install location of Telerik UI for ASP.NET MVC.
3. Navigate to **wrappers/aspnetmvc/Binaries/MVC3**. This directory contains the ASP.NET MVC 3 version of Telerik UI for ASP.NET MVC.
4. Select **Kendo.Mvc.dll** and click **OK**.

### Update the web.config

The next step is to let ASP.NET MVC know of the Kendo.Mvc.UI namespace where the server-side wrappers are. To do this update the web.config file of the web application.

1. Open **Views/Web.config** (or root **Web.config** if using **ASPX**).
2. Locate the **namespaces** tag.
3. Append an **add** tag to the **namespaces** tag.

        <namespaces>
            <add namespace="System.Web.Mvc" />
            <add namespace="System.Web.Mvc.Ajax" />
            <add namespace="System.Web.Mvc.Html" />
            <add namespace="System.Web.Routing" />
            <add namespace="Kendo.Mvc.UI" />
        </namespaces>

## Use a Kendo UI widget

Finally lets use a Kendo UI widget via its MVC server wrapper initialization.

1. Open the **Views/Home/Index.cshtml** view (or **Index.aspx** if using **ASPX**).
2. Add a Kendo UI DatePicker widget.
    - Razor

            @(Html.Kendo().DatePicker().Name("datepicker"))
    - ASPX

            <%: Html.Kendo().DatePicker().Name("datepicker") %>

3. Press **CTRL+F5** to build and run the application.

![Final result](/aspnet-mvc/images/mvc3-final.png)

## Next steps

* [Fundamentals](/aspnet-mvc/fundamentals)
* [Using the Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/vs-integration/introduction)
* [Troubleshooting](/aspnet-mvc/troubleshooting)
