---
title: Scaffolding
page_title: Scaffolding | Kendo UI Chart HtmlHelper
description: "Scaffold the Kendo UI Chart for ASP.NET MVC using the Kendo UI Scaffolder extension for Visual Studio."
slug: scaffoldingchart_aspnetmvc
position: 3
---

# Scaffolding

This article demonstrates how to scaffold a Kendo UI Chart for ASP.NET MVC by using the Kendo UI Scaffolder Visual Studio extension.

> **Important**  
>
> The Kendo UI Scaffolder will not include the required `UI for ASP.NET MVC` files to the project. To achieve this automatically, use the [Telerik UI for ASP.NET MVC Visual Studio extensions]({% slug overview_aspnetmvc %}). To achieve this manually, refer to [this article]({% slug aspnetmvc5_aspnetmvc %}).

## Getting Started

Below are listed the steps for you to follow when scaffolding the Kendo UI Chart for ASP.NET MVC.

### Create a New ASP.NET MVC Application

Create a new ASP.NET MVC application. Include an Entity Framework Data Model and add `Telerik UI for ASP.NET MVC`. If you have already done so, you can move on to next step. Otherwise, follow the steps of the [steps described in the Getting Started section of this article]({% slug overview_charthelper_aspnetmvc %}).

### Generate the Chart Controller

Right-click the location where the Chart Controller should be generated. Select **Add** > **New Scaffolded item...** from the displayed menu. In this example, you are going to generate it in the **Controllers** folder.

**Figure 1. A new scaffolded item**

![New Scaffolded Item](/aspnet-mvc/images/scaffolding/new_scaffolded_item.png)

### Select the Scaffolder

Select **Kendo UI Scaffolder** from the list of available scaffolders.

**Figure 2. The Kendo UI Scaffolder**

![Kendo UI Scaffolder](/aspnet-mvc/images/scaffolding/kendo_ui_scaffolder.png)

### Select the Chart

Select the Kendo UI Chart from the available widgets to the left to scaffold.

**Figure 3. The Kendo UI Chart Scaffolder**

![Kendo UI Chart Scaffolder](/aspnet-mvc/helpers/chart/images/scaffolding/kendo_ui_chart.png)

### Set Model and Data Context Options

On the next screen, you are presented with the Model and Data Context options.

**Step 1** Enter the Controller and View names.  

**Figure 4. The Grid options**

![Grid options](/aspnet-mvc/helpers/grid/images/scaffolding/kendo_ui_grid1.png)

**Step 2** The **Model Class** DropDownList contains all model types from the active project. In this example, you are going to list products in the Chart. Select the **Product** entity.

**Figure 5. The Model class**

![Model Class](/aspnet-mvc/helpers/grid/images/scaffolding/model_class.png)

**Step 3** From the **Data Context Class** DropDownList, select the **Entity Framework Data Model** class to be used. In this example, it is **NorthwindEntities**.  

**Figure 6. The Data Context class**

![Data Context Class](/aspnet-mvc/helpers/grid/images/scaffolding/data_context_class.png)

### Use View Model Objects

(Optional) In some scenarios it is convenient to use view model objects instead of the entities returned by Entity Framework. If this is the case, check the **Use an existing ViewModel** checkbox. This presents you with a DropDownList similar to the first one, from which select the ViewModel to be used.

**Step 1** If you have not yet created it, add a new class to the `~/Models` folder. Name it `ProductViewModel`.

###### Example

	        public class ProductViewModel
	        {
	            public int ProductID { get; set; }
	            public string ProductName { get; set; }
	            public short? UnitsInStock { get; set; }
	        }

**Step 2** Select the **ProductViewModel** class from the **ViewModel Class** DropDownList.  

**Figure 7. The ViewModel class**

![ViewModel Class](/aspnet-mvc/helpers/grid/images/scaffolding/view_model_class.png)

> **Important**
>
> The names of the properties in the ViewModel must be exactly the same as the corresponding ones in the Entity. Otherwise, the Kendo UI Scaffolder is not able to link them correctly.

### Set Chart Functionalities

**Step 1** Click the **Chart options** item on the left.  

**Figure 8. The options when setting the Chart functionalities**

![Grid options](/aspnet-mvc/helpers/chart/images/scaffolding/kendo_ui_chart2.png)  

This screen contains the Chart functionalities that you can configure before scaffolding:
* **Data Binding Type**&mdash;Remote or Local.
* **Title**&mdash;Define the `Title` of the Chart.   
* **Show Tooltip**&mdash;Show the tooltip.    
* **Show Legend**&mdash;Show a legend. The available options are `Bottom` and `Top`.

**Figure 9. The legend options**

![Legend options](/aspnet-mvc/helpers/chart/images/scaffolding/legend.png)

* **Series Type**&mdash;Select the series type. Each series type shows different **Series Options** configuration.

**Figure 10. The series options**

![Series options](/aspnet-mvc/helpers/chart/images/scaffolding/series_options_1.png)

* **Add More Series**&mdash;Add one additional configuration panel for a series.

Each field marked with an asterisk `*` is mandatory and the rest of the fields are optional.

When finished with the Chart configuration, click **Add** at the bottom. The Chart Controller and the corresponding View are generated.

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Chart:

* [Overview of the Kendo UI Chart for ASP.NET MVC]({% slug overview_charthelper_aspnetmvc %})
* [How to Bind to SignalR Hubs in ASP.NET MVC Apps]({% slug howto_bindtosignalr_chartaspnetmvc %})
* [How to Create View Model Bound Dynamic Series in ASP.NET MVC Apps]({% slug howto_cerateviewmodelboundseries_chartaspnetmvc %})
* [Ajax Binding of the Kendo UI Chart for ASP.NET MVC]({% slug ajaxbinding_charthelper_aspnetmvc %})
* [Overview of the Kendo UI Chart Widget]({% slug overview_kendoui_charts_widget %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
