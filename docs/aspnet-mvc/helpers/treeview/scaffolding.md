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
> The Kendo UI Scaffolder will not include the required UI for ASP.NET MVC files to the project. You are able to achieve this automatically by using the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %}), or manually, as demonstrated [in this article]({% slug aspnetmvc5_aspnetmvc %}).

## Getting Started

### Configuration

Below are listed the steps for you to follow when scaffolding the Kendo UI TreeView.

**Step 1** Create a new Telerik Application for ASP.NET MVC or create a standard ASP.NET MVC application and add Telerik UI for ASP.NET MVC. If you already have a working Telerik MVC application, you can move on to the next step.

**Figure 1. Creating a new Telerik MVC Application**

![New Telerik MVC Application](/aspnet-mvc/helpers/treeview/images/treeview-scaffolding1.png)

**Step 2** Include an Entity Framework Data Model. You can follow the steps described [in this article]({% slug ajaxbinding_treeviewhelper_aspnetmvc %}) to do that.

>Note If you are using the [Northwind dummy datasource](http://northwinddatabase.codeplex.com/) as demonstrated in the example in this article, you might need to upgrade it to match a newer version of your Visual Studio LocalDb definition. If this is the case, you can easily do that using the [Server Explorer](https://msdn.microsoft.com/en-us/library/hh873188.aspx). Visual Studio will ask you to confirm whether you want to upgrade the database and when you accept, you are ready to go.

>Important You will need to Rebuild your project after adding the Entity data model.

**Step 3** Right-click the location where the TreeView Controller should be generated. Select **Add** > **New Scaffolded item...** from the displayed menu. In this example, you generate it in the **Controllers** folder.

**Figure 2. Add a new scaffolded item**

![New Scaffolded Item](/aspnet-mvc/helpers/treeview/images/treeview-scaffolding2.png)

**Step 4** Select **Kendo UI Scaffolder** from the list of available scaffolders. On the next window step select the **UI for MVC TreeView** widget.


**Step 5** On the next window screen, you are presented with the configuration options for the TreeView scaffolder.

**Figure 3. Configure the TreeView Scaffolder**

![TreeView Scaffolder](/aspnet-mvc/helpers/treeview/images/treeview-scaffolding3.png)

* **Controller Name** - the scaffolder will automatically generate the Action in this new Controller to initiate the query to the database.
* **View Name** - defines the View, which will be created and added to a new corresponding folder. It will hold the mark-up definition of the TreeView widget.
* **Model Class** - contains all model types from the active project. In this example, you build a tree containing the Employees depending on their hierarchical roles.
* **Data Context Class** - select the Entity Framework Data Model class to be used.
* **Parent Field Name** - indicates the field, which the tree relations would be built upon.
* **Has Children Field Name** - represents an enumerable collection to hint the widget about the children records. If not defined, the TreeView will display expand buttons for all of the items, even if they do not contain any child records.


**Step 6** Click the **TreeView options** item on the left. It will open the section for configuring the settings of the TreeView widget.

**Figure 4. Pick TreeView options**

![TreeView options](/aspnet-mvc/helpers/treeview/images/treeview-scaffolding4.png)  

* **Animation** - check to enable for expand/collapse action.
* **DataTextField** - defines the field, which will be used to display the text of the items.
* **DataUrlField** - if entered, defines the field, which will be used to automatically transform the text content of the items to links. These links point to a new site depending on the value, e.g. ~/TreeView/Robert.


**Step 7** You can also add Events if you'd like to. When finished with the TreeView configuration, click **Add** at the bottom. The TreeView Controller and the corresponding View are now generated and you are ready to run the site.

**Figure 5. Result after running the generated view**

![Result](/aspnet-mvc/helpers/treeview/images/treeview-scaffolding5.png)


## See Also

Other articles on the Kendo UI TreeView for ASP.NET MVC:

* [Overview of the TreeView HtmlHelper]({% slug overview_treeviewhelper_aspnetmvc %})
* [Live Samples](http://demos.telerik.com/aspnet-mvc/treeview/index)


Articles on Telerik UI for ASP.NET MVC:

* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
