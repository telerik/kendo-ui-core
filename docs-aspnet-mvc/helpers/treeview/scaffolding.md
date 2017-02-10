---
title: Scaffolding
page_title: Scaffolding | Kendo UI TreeView HtmlHelper
description: "Scaffold the Kendo UI TreeView for ASP.NET MVC by using the Kendo UI Scaffolder extension for Visual Studio."
slug: scaffoldingtreeview_aspnetmvc
position: 3
---

# Scaffolding

This article demonstrates how to scaffold a Kendo UI TreeView for ASP.NET MVC by using the Kendo UI Scaffolder Visual Studio extension.

> **Important**  
>
> The Kendo UI Scaffolder will not include the required UI for ASP.NET MVC files to the project. To automatically achieve this, use the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %}). To manually achieve this, refer to [this article]({% slug aspnetmvc5_aspnetmvc %}).

## Getting Started

### Configuration

Below are listed the steps for you to follow when scaffolding the Kendo UI TreeView.

1. Create a new Telerik Application for ASP.NET MVC or create a standard ASP.NET MVC application and add Telerik UI for ASP.NET MVC. If you already have a working Telerik MVC application, move on to the next step.

    **Figure 1. Create a new Telerik MVC application**

    ![New Telerik MVC Application](/helpers/treeview/images/treeview-scaffolding1.png)

1. Include an Entity Framework Data Model. Follow the steps described [in this article]({% slug ajaxbinding_treeviewhelper_aspnetmvc %}) to do that.

    > **Important**
    > * If you are using the [Northwind dummy datasource](http://northwinddatabase.codeplex.com/) as is the example on which this article is based, you might need to upgrade it to match a more recent version of your Visual Studio LocalDb definition. In such case, do that  by using the [Server Explorer](https://msdn.microsoft.com/en-us/library/hh873188.aspx). Visual Studio will require you to confirm whether you want to upgrade the database. Upon accepting it, you are ready to go.
    > * You must rebuild your project after adding the Entity Data Model.

1. Right-click the location where the TreeView Controller is to be generated. Select **Add** > **New Scaffolded item...** from the displayed menu. In this example, you generate it in the **Controllers** folder.

    **Figure 2. Add a new scaffolded item**

    ![New Scaffolded Item](/helpers/treeview/images/treeview-scaffolding2.png)

1. Select **Kendo UI Scaffolder** from the list of available scaffolders. Next, select the **UI for MVC TreeView** widget.

1. You are now presented with the configuration options for the TreeView scaffolder.

    **Figure 3. Configure the TreeView Scaffolder**

    ![TreeView Scaffolder](/helpers/treeview/images/treeview-scaffolding3.png)

    * **Controller Name**&mdash;The scaffolder will automatically generate the Action in this new Controller to initiate the query to the database.
    * **View Name**&mdash;Defines the View, which will be created and added to a new corresponding folder. It will hold the mark-up definition of the TreeView widget.
    * **Model Class**&mdash;Contains all model types from the active project. In this example, you build a tree which contains the employees depending on their hierarchical roles.
    * **Data Context Class**&mdash;Selects the Entity Framework Data Model class to be used.
    * **Parent Field Name**&mdash;Indicates the field, which the tree relations would be built upon.
    * **Has Children Field Name**&mdash;Represents an enumerable collection to hint the widget about the children records. If not defined, the TreeView will display expand buttons for all of the items, even if they do not contain any child records.

1. Click the **TreeView options** item on the left. It will open the section for configuring the settings of the TreeView widget.

    **Figure 4. Pick TreeView options**

    ![TreeView options](/helpers/treeview/images/treeview-scaffolding4.png)  

    * **Animation**&mdash;Checks to enable for expand or collapse action.
    * **DataTextField**&mdash;Defines the field, which will be used to display the text of the items.
    * **DataUrlField**&mdash;If entered, defines the field, which will be used to automatically transform the text content of the items to links. These links point to a new site depending on the value&mdash;for example, `~/TreeView/Robert`.

1. You are also able to add events. When finished with the TreeView configuration, click **Add** at the bottom. The TreeView Controller and the corresponding View are now generated and you are ready to run the site.

    **Figure 5. The result after running the generated view**

    ![Result](/helpers/treeview/images/treeview-scaffolding5.png)

## See Also

* [Overview of the TreeView HtmlHelper]({% slug overview_treeviewhelper_aspnetmvc %})
* [Live Samples](http://demos.telerik.com/aspnet-mvc/treeview/index)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
