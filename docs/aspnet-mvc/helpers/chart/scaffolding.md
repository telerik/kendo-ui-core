---
title: Scaffolding
page_title: How to use the Kendo UI Scaffolder extension.
description: Learn how to scaffold Kendo UI Chart for ASP.NET MVC using the Kendo UI Scaffolder extension for Visual Studio.
---

# Chart Scaffolding

The following tutorial shows how to scaffold a Kendo UI Chart for ASP.NET MVC using the **Kendo UI Scaffolder** Visual Studio extension.

> **Important**  
> The Kendo UI Scaffolder will not include the required **UI for ASP.NET MVC** files to the project. You could achieve this automatically using the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/vs-integration/introduction) or manually as demonstrated [here](/aspnet-mvc/asp-net-mvc-5).

## Getting Started

1.  Create a new ASP.NET MVC application, include an Entity Framework Data Model and add **Telerik UI for ASP.NET MVC**. If you have already done so, you can skip to the next step, otherwise you can follow the first 4 steps of the [following tutorial](/aspnet-mvc/helpers/chart/overview#getting-started).

2.  Right click on the location where the Chart Controller should be generated and select **Add | New Scaffolded item...** from the displayed menu. In this example we will generate it in the **Controllers** folder.
![New Scaffolded Item](/aspnet-mvc/images/scaffolding/new_scaffolded_item.png)

3.  Select **Kendo UI Scaffolder** from the list of available scaffolders.
![Kendo UI Scaffolder](/aspnet-mvc/images/scaffolding/kendo_ui_scaffolder.png)

4.  Select Kendo UI Chart from the available widgets to scaffold on the left:
![Kendo UI Chart Scaffolder](/aspnet-mvc/helpers/chart/images/scaffolding/kendo_ui_chart.png)

5.  On the next screen you will be presented with the Model and Data Context options.
    - First enter the Controller and View names.  
![Grid options](/aspnet-mvc/helpers/grid/images/scaffolding/kendo_ui_chart1.png)
    - The **Model Class** DropDownList will contain all model types from the active project. In this example we will list products in the Chart. Select the **Product** entity.  
![Model Class](/aspnet-mvc/helpers/grid/images/scaffolding/model_class.png)
    - From the **Data Context Class** DropDownList you could select the **Entity Framework Data Model** class to be used. In this example it is **NorthwindEntities**.  
![Data Context Class](/aspnet-mvc/helpers/grid/images/scaffolding/data_context_class.png)

6. This step is optional. In some scenarios it is convenient to use view model objects instead of the entities returned by Entity Framework. If this is the case, check the **Use an existing ViewModel** checkbox. This will present you with a DropDownList similar to the first one, from which you could select the ViewModel to be used.
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

7. Click the **Chart options** item on the left.  
![Grid options](/aspnet-mvc/helpers/chart/images/scaffolding/kendo_ui_chart2.png)  
This screen contains the Chart functionalities that could be configured before scaffolding:
    - Data Binding Type - Remote or Local.
    - Title - Define the Title of the Chart.   
    - Show Tooltip - Show the tooltip.    
    - Show Legend - Show a legend. The available options are Bottom and Top.
![Legend options](/aspnet-mvc/helpers/chart/images/scaffolding/legend.png)
    - Series Type - Select the series type. Each series type will show different Series Options configuration.
![Series options](/aspnet-mvc/helpers/chart/images/scaffolding/series_options_1.png)
    - Add More Series - Adds one additional configuration panel for a series.

Each field marked with a star * is mandatory and the rest of the fields are optional. 

When finished with the Chart configuration, click the **Add** button at the bottom. The Chart Controller and the corresponding View will be generated.