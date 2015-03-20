---
title: Scaffolding
page_title: How to use the Kendo UI Scaffolder extension.
description: Learn how to scaffold Kendo UI Grid for ASP.NET MVC using the Kendo UI Scaffolder extension for Visual Studio.
---

# Grid Scaffolding

The following tutorial shows how to scaffold a Kendo UI Grid for ASP.NET MVC using the **Kendo UI Scaffolder** Visual Studio extension.

> The Kendo UI Scaffolder will not include the required **UI for ASP.NET MVC** files to the project. You could achieve this automatically using the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/vs-integration/introduction) or manually as demonstrated [here](/aspnet-mvc/asp-net-mvc-5).

# Getting started

1.  Create a new ASP.NET MVC application, include an Entity Framework Data Model and add **Telerik UI for ASP.NET MVC**. If you have already done so, you can skip to the next step, otherwise you can follow the first 4 steps of the [following tutorial](/aspnet-mvc/helpers/grid/overview#getting-started).

2.  Right click on the location where the Grid Controller should be generated and select **Add | New Scaffolded item...** from the displayed menu. In this example we will generate it in the **Controllers** folder.
![New Scaffolded Item](/aspnet-mvc/images/scaffolding/new_scaffolded_item.png)

3.  Select **Kendo UI Scaffolder** from the list of available scaffolders.
![Kendo UI Scaffolder](/aspnet-mvc/images/scaffolding/kendo_ui_scaffolder.png)

4.  On the next screen you will be presented with the Model and Data Context options.
    - First enter the Controller and View names.  
![Grid options](/aspnet-mvc/helpers/grid/images/scaffolding/kendo_ui_grid1.png)
    - The **Model Class** DropDownList will contain all model types from the active project. In this example we will list products in the Grid. Select the **Product** entity.  
![Model Class](/aspnet-mvc/helpers/grid/images/scaffolding/model_class.png)
    - From the **Data Context Class** DropDownList you could select the **Entity Framework Data Model** class to be used. In this example it is **NorthwindEntities**.  
![Data Context Class](/aspnet-mvc/helpers/grid/images/scaffolding/data_context_class.png)

5. This step is optional. In some scenarios it is convenient to use view model objects instead of the entities returned by Entity Framework. If this is the case, check the **Use an existing ViewModel** checkbox. This will present you with a DropDownList similar to the first one, from which you could select the ViewModel to be used.
    - If you have not yet created it, add a new class to the `~/Models` folder. Name it `ProductViewModel`.

	        public class ProductViewModel
	        {
	            public int ProductID { get; set; }
	            public string ProductName { get; set; }
	            public short? UnitsInStock { get; set; }
	        }
    - Select the **ProductViewModel** class from the **ViewModel Class** DropDownList.  
    ![ViewModel Class](/aspnet-mvc/helpers/grid/images/scaffolding/view_model_class.png)

		> It is important that the names of the properties in the ViewModel are exactly the same as the corresponding ones in the Entity. Otherwise the Kendo UI Scaffolder won't be able to link them correctly.

6. Click the **Grid options** item on the left.  
![Grid options](/aspnet-mvc/helpers/grid/images/scaffolding/kendo_ui_grid2.png)  
This screen contains the Grid functionalities that could be configured before scaffolding:
    - DataSource Type - Ajax, Server or WebApi.
    - Editable - Enable the editing, configure the edit mode (InLine, InCell or PopUp) and the operations to be included (Create, Update, Destroy).  
![Editable options](/aspnet-mvc/helpers/grid/images/scaffolding/editable.png)  
    - Filterable - Enable the filtering of the Grid and select the filter **mode**.  
![Filterable options](/aspnet-mvc/helpers/grid/images/scaffolding/filterable.png)  
    - Column Menu - Enable the column menu.
    - Navigatable - Enable the keyboard navigation.
    - Pageable - Enable the paging of the Grid.
    - Reorderable - Enable the column reording.
    - Scrollable - Enable the scrolling of the Grid table.
    - Selectable - Enable the selection and specify the selection **mode** and **type**.  
![Selectable options](/aspnet-mvc/helpers/grid/images/scaffolding/selectable.png)  
    - Sortable - Enable the sorting and specify the sorting **mode**.  
![Sortable options](/aspnet-mvc/helpers/grid/images/scaffolding/sortable.png)  
    - Excel Export - Enable the Excel export functionality.
    - PDF Export - Enable the PDF export functionality.

7. Click the **Events** item on the left.  
![Grid options](/aspnet-mvc/helpers/grid/images/scaffolding/kendo_ui_grid3.png)  
From this screen you could select the Grid events that you would like to attach handlers to.

	> Note that not all events are supported in server binding mode. The complete list could be found [here](/aspnet-mvc/helpers/grid/server-binding#client-side-events-and-server-binding).

8. When finished with the Grid configuration, click the **Add** button at the bottom. The Grid Controller and the corresponding View will be generated.