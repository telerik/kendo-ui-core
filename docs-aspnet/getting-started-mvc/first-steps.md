---
title: First Steps
page_title: First Steps with Telerik UI for ASP.NET MVC
meta_title: First Steps with Telerik UI for ASP.NET MVC | Telerik UI for ASP.NET MVC
description: "Learn how to use the Telerik UI for ASP.NET MVC components in an ASP.NET MVC application by setting up your Telerik development environment, creating a new project, and adding a UI component."
components: ["general"]
tag: "new"
slug: gettingstartedtelerik_cli_aspnetmvc
position: 1
---

# First Steps with {{ site.product }}

This article explains how to use the Telerik UI for ASP.NET MVC components in an ASP.NET MVC application. You will set up your Telerik development environment, create a new application from scratch, and finally, add a UI component to a View.

{% if site.has_cta_panels == true %}
{% include cta-panel-introduction.html %}
{% endif %}

## Prerequisites

To successfully complete the steps in this tutorial, install the [.NET Framework](https://dotnet.microsoft.com/download/dotnet-framework) and [Visual Studio](https://visualstudio.microsoft.com/downloads/) 2019, 2022, or later.

## Set Up Telerik Development Environment

The fastest way to set up your Telerik development environment is to use the [Telerik CLI]({% slug installation_cli %}) .NET tool. Run the following commands in your preferred command shell (Visual Studio Terminal, cmd, PowerShell, Bash, macOS Terminal, or other).

>tip If you have already set up your Telerik development environment and it doesn't need updating, skip to [Create New ASP.NET MVC App](#create-new-aspnet-mvc-app).

1. Install Telerik CLI

    ````SH.skip-repl
    dotnet tool install -g Telerik.CLI --source https://api.nuget.org/v3/index.json
    ````

1. Run the Telerik CLI `setup` command:

    ````SH.skip-repl
    telerik setup aspnetmvc
    ````

The [`setup` command performs multiple actions]({% slug installation_cli %}#set-up-telerik-environment) to configure your Telerik development environment:

* Create your Telerik account or log in if you already have one.
* Activate a {{ site.product }} trial if you don't have an active license.
* Download your Telerik license key.
* Configure the Telerik NuGet package source.
* Install the Telerik UI for ASP.NET MVC MCP server.

## Create New ASP.NET MVC App

This section assumes that you have successfully completed the Telerik-specific setup in the [previous step](#set-up-telerik-development-environment).

> If you are configuring an existing project, skip this step.

To create a new Telerik ASP.NET MVC app, use your preferred approach:

<TabStrip>
<TabStripTab title="Visual Studio">

1. Open Visual Studio and select **Create a new project**.

1. Search for **ASP.NET Web Application (.NET Framework)**, select the MVC template, and create the project.

1. Add the {{ site.product }} NuGet package. Since the [Telerik NuGet feed is already configured](#set-up-telerik-development-environment), open the **NuGet Package Manager** and install `Telerik.UI.for.AspNet.Mvc5`.

</TabStripTab>
<TabStripTab title="Project Template">

1. Install the Telerik UI for ASP.NET MVC [Visual Studio extension](https://marketplace.visualstudio.com/items?itemName=TelerikInc.TelerikUIforMVCVS2022Extensions).

1. In Visual Studio, create a new Telerik ASP.NET MVC project from the Telerik project templates.

1. Follow [Using a Project Template]({% slug gettingstarted_aspnetmvc %}) for the complete workflow and screenshots.

When you use the project template approach, the generated application is already configured for Telerik UI and includes Telerik components. Skip the [Configure the Application](#configure-the-application) and [Add Telerik Component](#add-telerik-component) sections.

</TabStripTab>
</TabStrip>

> To manually add Telerik UI for ASP.NET MVC to an existing app, see [Setup with Telerik NuGet]({% slug setupwithnuget_aspnetmvc %}) or [Adding Telerik UI through Local Files]({% slug manualsetup_aspnetmvc %}).

### Configure the Application

After creating the project and adding the NuGet package, configure the application to use {{ site.product }}:

1. Import the `Kendo.Mvc.UI` namespace. Add the following to the `~/Views/web.config` file inside the `<namespaces>` node:

    ```xml
    <add namespace="Kendo.Mvc.UI" />
    ```

1. Include the client-side resources in `~/Views/Shared/_Layout.cshtml`:

    ```HTML
    <head>
        ...
        <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-main.css" />

        <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>
        <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.aspnetmvc.min.js"></script>
    </head>
    ```
* The `kendo.all.min.js` and `kendo.aspnetmvc.min.js` scripts must be loaded after the `jquery.min.js` script.
* `jQuery` must be loaded only once. Ensure there are no duplicate references elsewhere in the `_Layout`.

## Add Telerik Component

Add a new Telerik component. For example, add a {{ site.product }} DatePicker to `~/Views/Home/Index.cshtml`:

```HtmlHelper
<div class="text-center">
    <h2>Kendo UI DatePicker</h2>
    @(Html.Kendo().DatePicker()
        .Name("my-picker")
    )
</div>
```

Press `F5` in Visual Studio to build and run the application.


Upon successful run in a web browser, the new Telerik ASP.NET MVC app looks like this:

![{{ site.product_short }} Sample page](../getting-started-mvc/images/sample-page-datepicker.png)


Well done! Now you have your first {{ site.product }} component running in your ASP.NET MVC application.


## Next Steps

<article-card-container>
    <article-card
        href="slug://htmlhelpers_grid_aspnetcore_overview"
        src="../images/aicomponents/AI_Data_Highlight_Light_Large.svg"
        title="Get Started with Data Grid"
        darkSrc="../images/aicomponents/AI_Data_Highlight_Dark_Large.svg"
        description="Bind the {{ site.product }} Grid to data and choose from the large variety of built-in features.">
    </article-card>
    <article-card
        href="slug://htmlhelpers_grid_aspnetcore_binding_overview"
        src="../images/aicomponents/AI_Column_Assistant_Light_Large.svg"
        title="Learn Telerik Data Binding"
        darkSrc="../images/aicomponents/AI_Column_Assistant_Dark_Large.svg"
        description="Learn the data binding fundamentals for {{ site.product }} components.">
    </article-card>
    <article-card
        href="slug://overview_aspnetmvc6_aspnetmvc#list-of-helpers"
        src="../images/aicomponents/Editor_AI_Integration_Light_Large.svg"
        title="Use Components"
        darkSrc="../images/aicomponents/Editor_AI_Integration_Dark_Large.svg"
        description="Check the list of available {{ site.product }} components.">
    </article-card>
    <article-card
        href="https://demos.telerik.com/aspnet-mvc"
        src="../images/aicomponents/Grid_AI_Chat_Integration_Light_Large.svg"
        title="Browse Online Demos"
        darkSrc="../images/aicomponents/Grid_AI_Chat_Integration_Dark_Large.svg"
        description="Explore the live {{ site.product }} examples.">
    </article-card>
    <article-card
        href="slug://sassbasedthemes_overview"
        src="../images/aicomponents/AIPrompt_Light_Large.svg"
        title="Create Themes"
        darkSrc="../images/aicomponents/AIPrompt_Dark_Large.svg"
        description="Review the built-in themes, customize them, or create your own.">
    </article-card>
    <article-card
        href="slug://overview_ai"
        src="../images/aicomponents/Chat_Light_Large.svg"
        title="Use Telerik AI Tools"
        darkSrc="../images/aicomponents/Chat_Dark_Large.svg"
        description="{{ site.product }} provides AI-powered development assistance through a unified MCP server that delivers intelligent, context-aware help directly in your IDE.">
    </article-card>
</article-card-container>

## See Also

* [Using a Project Template]({% slug gettingstarted_aspnetmvc %})
* [Adding Telerik UI through Local Files]({% slug manualsetup_aspnetmvc %})
* [Adding Telerik UI through NuGet]({% slug setupwithnuget_aspnetmvc %})
* [Video Onboarding]({% slug virtualclass_uiformvc %})
