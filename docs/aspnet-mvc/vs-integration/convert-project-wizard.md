---
title: Convert Project Wizard
---

#Convert Project Wizard

This help topic shows how to convert an existing ASP.NET MVC Application to a Telerik UI for ASP.NET MVC Application.

The **Convert Project Wizard** converts an existing ASP.NET MVC 3, 4 or 5 to Telerik UI for ASP.NET MVC Application.
To start the wizard click the **Telerik | UI for ASP.NET MVC | Convert to Telerik Application)** menu item. The convert wizard has two steps - project settings and master pages settings.

##Project Settings

![Project Settings](/aspnet-mvc/vs-integration/images/convert.png)

You can modify the following project-wide settings:

- **Version** - Choose which version of Telerik UI for ASP.NET MVC to use
- **Add referenced assemblies to solution** - Choose whether to copy referenced assemblies to your solution folder. The assemblies will automatically get added to source control when using Microsoft Team Foundation Server
- **Copy Editor Templates** - Copy the predefined editor templates to ~/Views/Shared/EditorTemplates
- **Use CDN Support** - Enable or disable [CDN](/javascript-dependencies#cdn) support.
- **Copy Global Resources** - Copy the localization files to ~/Scripts/kendo/{version}/cultures

##Master Page Settings

If you have layout and master page you can choose whether you want to apply the selected settings to both or only one of them:

![update Project Resources](/aspnet-mvc/vs-integration/images/convert2.png)

- **Theme** - Choose the visual theme for your Telerik UI for ASP.NET MVC Application

In case you have neither a master page nor a layout page you have the opportunity to add one:

![No Master Page](/aspnet-mvc/vs-integration/images/no_master_page.png)

The wizard gives you the option to create a new master page or layout page so that the user can set the Master Page settings. Depending on the selected view engine the wizard will create master page for WebForms or layout page for Razor.

##Converting existing Telerik MVC Extensions project

If you have an existing Telerik MVC Extensions project, you can convert it to Kendo UI project with the aid of the Convert Wizard. This will add the Kendo UI components to the project without removing the existing Telerik MVC Extensions content. For compatibility reasons, the Kendo UI Convert Wizard will attempt to disable the Telerik MVC Extensions embedded jQuery usage because it might interfere with the Kendo UI jQuery inclusion.

