---
title: Scaffolding
page_title: Introduction to Kendo UI Scaffolder Visual Studio extension.
description: How to use the Kendo UI Scaffolder extension.
position: 0
---

# Kendo UI Scaffolder Visual Studio extension

Since the **Q1 2015** release, **Telerik UI for ASP.NET MVC** contains the **Kendo UI Scaffolder** extension. It 
allows the developer to generate an MVC wrapper widget declarations together with the related Controller action methods. Currently only the Kendo UI Grid widget can be scaffolded. More widgets will be added in future releases.

# Requirements and Supported Environments

* Visual Studio 2013 (with Update 2 or higher) or Visual Studio 2015
* ASP.NET MVC 4 or ASP.NET MVC 5
* C#
* Entity Framework Data Model

# Installation

The extension will be automatically installed by the **Telerik UI for ASP.NET MVC** installer.

You could also manually install it by navigating to the **wrappers\aspnetmvc\Scaffolding** folder of the distribution package and opening the included **vsix** file. It will automatically detect compatible Visual Studio versions.

# Usage

The **Kendo UI Scaffolder** extension could be accessed through the **New Scaffolded Item...** menu which has different items depending on the currently installed Scaffolders:

![New Scaffolded Item](/aspnet-mvc/images/scaffolding/new_scaffolded_item.png)

Select the **Kendo UI Scaffolder** from the next menu:

![Kendo UI Scaffolder](/aspnet-mvc/images/scaffolding/kendo_ui_scaffolder.png)

This will bring up the **Kendo UI Grid** scaffolding configuration panel. Detailed information about the possible configuration options could be found in the [scaffolding section of the Grid Helper documentation](/aspnet-mvc/helpers/grid/scaffolding). The Grid Controller will be generated in the currently selected location along with the corresponding view.

# Troubleshooting

This list provides solutions to common problems you may encounter while working with the **Kendo UI Scaffolder** extension.

### The "New Scaffolded Item..." menu is not displayed when right clicking a project location.

* Make sure that a compatible Visual Studio version is used and all of the listed requirements are fulfilled.
* Check if the **Kendo UI Scaffolder** extension is listed in the **Tools | Extensions and Updates** list.

### The "Data Context Class" DropDownList is empty.

* Make sure that the current project contains a valid **Entity Framework Data Model**. If this is true, rebuild the solution.

### I get "Invalid model configuration" error when running the scaffolder.

* The most probable reason for this error is that the selected **Model Class** is not a valid entity in the current **Data Context**. Make sure that a valid entity is selected.