---
title: Project Setup
position: 1
---

# Project Setup - Kendo UI Music Store

## Add Kendo UI to the project

Start by adding Kendo UI to the project. There are a lot of ways to accomplish this.
Kendo UI can be downloaded from [telerik.com](http://www.telerik.com/download/kendo-ui-complete), referenced from the CDN, or fetched with NuGet.

### Download Kendo UI

The preferred method of getting Kendo UI is to browse to [telerik.com](http://www.telerik.com/download/kendo-ui) and download Kendo UI as a .zip file.
Depending on whether you are using the Trial version or have purchased the full Commercial version,
you will have a .zip file that follows one of these directory structures:

![kendo-commecrial-zip-layout](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-commecrial-zip-layout.png)

The **\js** and **\styles** folders in the root of the .zip file contain the "minified" versions of the Kendo UI .js and .css files.
If you have the commercial version of Kendo UI, you may also notice the **\source** folder.
This folder also contains \js and \styles folders, but these are the full, non-minified versions of the .js and .css.
These would typically be used for local development and debugging, but the minified versions are the ones that should be deployed in a real application.
For that reason, we will use the minified files in the remainder of this example project.

### Fetch from the CDN

Kendo UI can also be fetched from a CDN instead of downloading the files. For more information and the CDN URLs, please see: **[Getting Started: Javascript Dependencies](http://docs.telerik.com/kendo-ui/javascript-dependencies)**

### Fetch from NuGet

Kendo UI is also available using the NuGet package manager in Visual Studio.
Simply search for 'kendo'.

![kendo-nuget](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-nuget.png)

### More Information

In the Music Store project, we referenced the **kendo.all.min.js** file and the **Default** Kendo theme, because we were going to be using data visualization widgets and a good number of the Kendo UI Widgets.
If we were only going to be using a few select portions of Kendo UI, we would have taken individual JavaScript files and make a separate bundle for them, reducing the download size for the end user.

For more information on this topic, see: [Getting Started with Kendo UI](http://docs.telerik.com/kendo-ui/introduction)

## Create MVC Bundles

ASP.NET MVC 4 has the ability to bundle and minify JavaScript and Style Sheets.
In the Music Store project, we are not bundling the Kendo UI .js and .css files.
This is because we are using **kendo.all.min.js** which is already pre bundled and minified.

Also, it is important to note that in **Debug** mode, by default the bundler will not include minified files.
This means that if we made a bundle of the Kendo UI .css files:

    bundles.Add(new StyleBundle("~/Content/kendo").Include(
        "~/Content/kendo.common.min.css",
        "~/Content/kendo.default.min.css"));

These files would not be included when running in Debug mode, only in Release mode.
You can see and modify which files the ASP.NET bundler will ignore by inspecting the **bundles.IgnoreList** collection at runtime. For example:

    // Clear all items from the default ignore list to allow minified CSS and JavaScript files to be included in debug mode
    bundles.IgnoreList.Clear();

    // Do not include intellisense files
    bundles.IgnoreList.Ignore("*.intellisense.js");

### Separate Libs and App code into bundles

Most sizable web applications will include a number of .js files. It is a good practice to separate these into
bundles for third-party libraries and your own application code.

In the Music Store application, the only third-party library we are using (aside from Kendo UI) is Date.js.
We set up a **libs** bundle for this third-party library, plus an **app** bundle for our own application code.

    bundles.Add(new ScriptBundle("~/bundles/libs").Include(
        "~/Scripts/date.js"));

    bundles.Add(new ScriptBundle("~/bundles/app").Include(
        "~/Scripts/App/kendo-custom-bindings.js",
        "~/Scripts/App/kendo-cart-menu-widget.js",
        "~/Scripts/App/config.js",
        "~/Scripts/App/cart.js",
        "~/Scripts/App/store.js",
        "~/Scripts/App/shared-layout.js"));

And render them in **_Layout.cshtml**:

    @Scripts.Render("~/bundles/libs")
    @Scripts.Render("~/bundles/app")

### Easier debugging with the commercial version of Kendo UI

While it is typically good practice to always include the minified versions of .js and .css files that you use, it makes debugging JavaScript errors more difficult.
The commercial version of Kendo UI comes with the full non-minified source code. We can include these files instead, using the ASP.NET bundler to bundle and minify them for production, while still keeping them un-minified for development.

To do this, include the non-minified .js and .css files from the **\source** folder of the downloaded Kendo UI .zip file in your project.
Then configure the ASP.NET bundles to include these files. For example:

    bundles.Add(new ScriptBundle("~/bundles/kendo").Include(
        "~/Scripts/kendo.all.js"));

    bundles.Add(new StyleBundle("~/Content/kendo").Include(
        "~/Content/kendo.common.css",
        "~/Content/kendo.default.css"));

Then set up your **web.config** file to enable bundling only for **Release** builds of the application.
This way, ASP.NET will server the non-minified files for Debug, and a bundled minified version for Release.
To do this, set compilation debug to true in the **Debug** version of your **web.config** file:

    <system.web>
      <compilation debug="true" targetFramework="4.5" />

The **Release** version of the **web.config** file would set debug to false:

    <system.web>
      <compilation debug="false" targetFramework="4.5" />

## Add Kendo UI to the ASP.NET Layout Page

We can now add Kendo UI and any other third-party libraries to the pages.
The Music Store uses the **Views\Shared\_Layout.cshtml** master page, so we will add Kendo UI here.
We need to make sure that Kendo UI JavaScript files come after jQuery. For styling, we include
**kendo.common.min.css**, plus one of the Kendo UI Themes. In this example we are using
**kendo.default.min.css**, which is the Default theme.

    <head>
        <meta charset="utf-8" />
        <title>@ViewBag.Title - Kendo UI Music Store</title>
        <link href="~/favicon.ico" rel="shortcut icon" type="image/x-icon" />
        <meta name="viewport" content="width=device-width" />
        <link href="~/Content/kendo.common.min.css" rel="stylesheet" /> // <-- Added Here.
        <link href="~/Content/kendo.default.min.css" rel="stylesheet" /> // <-- Added Here.
        @Styles.Render("~/Content/css")
        @Scripts.Render("~/bundles/modernizr")
    </head>
    <body>
        // ...

        @Scripts.Render("~/bundles/jquery")
        <script src="~/Scripts/kendo.all.min.js"></script> // <-- Added Here.
        @RenderSection("scripts", required: false)
    </body>

Typical practice is to include as much JavaScript at the bottom of the **&lt;body&gt;** element as possible.
In the Music Store project, we are actually including jQuery in the **&lt;head&gt;**.
This will be discussed later in the tutorial, but it is because we later use some of [UI for ASP.NET MVC](http://docs.telerik.com/kendo-ui/aspnet-mvc/asp-net-mvc-4) which insert **&lt;script&gt;** tags into the **&lt;body&gt;** of the page, and require that jQuery already be defined.

## Database

The Kendo UI Music Store demo application uses a SQL Server database with sample data for artists, albums, genres, etc. In order to populate the sample database, the application uses Entity Framework Code First migrations to create the database and seed the sample data. The migrations are configured to only run in DEBUG mode. If you run in RELEASE mode, the code will assume that the database has already been created and will not try to create or seed the data.

The connection string configured in the web.config file is set to use LocalDB and will connect to a local database file in the App_Data folder. LocalDB requires a SQL Server 2012 or later instance. To run the Kendo UI Music Store demo, please ensure that your system meets these requirements or simply change the connection string to use a SQL Server instance available on your computer.
