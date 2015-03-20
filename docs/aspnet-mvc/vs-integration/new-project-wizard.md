---
title: New Project Wizard
---

#New Project Wizard

This help topic shows how to create a new Telerik UI for ASP.NET MVC Application.

The New Project wizard is used for creation of a new Telerik UI for ASP.NET MVC Application (Telerik | UI for ASP.NET MVC | Create New Telerik Project). The wizard consists of two steps. On the first page the user can specify some project-wide settings while on the second page he can configure the data access layer.

##Project Settings

![New Project Wizard](/aspnet-mvc/vs-integration/images/new1.png)

Using the options in the Telerik UI for ASP.NET MVC Project Settings page you can modify various project-wide settings:

-   **Version** - Choose which version of Telerik UI for ASP.NET MVC to use
-   **Add referenced assemblies to solution** - Choose whether to copy referenced assemblies to your solution folder. The assemblies will automatically get added to source control when using Microsoft Team Foundation Server.
-   **Target ASP.NET MVC Version** - Choose the targeted ASP.NET MVC version
-   **View Engine** - Choose between Razor and WebForms
-   **Theme** – Choose the visual theme for your Telerik UI for ASP.NET MVC Application
-   **Copy Editor Templates** - Copy the predefined editor templates to ~/Views/Shared/EditorTemplates
-   **Use CDN Support** - Enable or disable [CDN](/javascript-dependencies#cdn) support.
-   **Copy Global Resources** - Copy the localization files to ~/Scripts/kendo/{version}/cultures
-   **Add Test Project** - Choose whether to add a test project to the solution.

##Data Access Settings

![Data Access Settings](/aspnet-mvc/vs-integration/images/data_access.png)

On the next step the New Project wizard's Data Access page offers you initialize the creation of your data access layer using Telerik OpenAccess ORM. You are given the following options:

- **Create OpenAccess Fluent Library Project** - After you choose this option an OpenAccess ORM project will be added, enabling you to create your object mapping in a declarative way. With this Code-Only approach all the necessary persistent classes and mappings are defined manually – the project will initially contain only a sample declaration to get you started. You can find more information about the Fluent Library project type [here](http://www.telerik.com/help/openaccess-orm/getting-started-fluent-mapping-overview.html).
- **Create OpenAccess Domain Model Library Project** - The Domain Model is an auto-generated and editable diagram of your persistent classes. This option will start the Add Domain Model wizard after exiting Project Configuration Wizard, so that you can configure your data layer without writing a single line of code. You can create a new model and define you classes later using the tools that OpenAccess Visual Designer is offering, or retrieve the schema of an already designed database and generate classes for the selected tables and views. The different scenarios are described in the articles below:
    - [Create an empty model - Model First](http://www.telerik.com/help/openaccess-orm/getting-started-root-getting-started-with-update-schema-tools.html)
    - [Generate the domain model from a database - Database First](http://www.telerik.com/help/openaccess-orm/getting-started-root-generating-model-mappings-taking-database-first-approach.html)

- **Skip creating an OpenAccess Model Library Project** - No data access project will be added.

##Creation of New Kendo UI web application

When you click 'Finish', the creation of new Kendo UI web application will begin. The wizard will:

- Create new ASP.NET MVC application
- Copy all Kendo UI scripts, including the vsdoc script that enables the VS Intellisense feature (if CDN support is not enabled)
- Copy all Kendo UI content files (if CDN support is not enabled)
- Copy all Kendo UI global resources (optional)
- Copy all Kendo UI editor templates (optional)
- Copy the Kendo UI assembly to your solution folder (optional)
- Add reference to the Kendo.Mvc assembly
- Apply the pre-selected theme
- Create test project (optional)

## Modernizr inclusion

The Kendo UI ASP.NET MVC application includes a custom stripped-down Modernizr in a file called `kendo.modernizr.custom.js`. Its goal is to provide HTML5 element support for old browsers, specifically Internet Explorer.
If you need Modernizr in your application, you may want to remove the existing Modernizr and register another version, which includes more components and features. In this case, if HTML5 element support is required,
make sure that the newly registered Modernizr [provides such support](http://modernizr.com/docs/#html5inie) by including the **html5shiv** component.