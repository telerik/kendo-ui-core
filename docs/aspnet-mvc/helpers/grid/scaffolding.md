---
title: Scaffolding
page_title: Scaffolding | Kendo UI Grid HtmlHelper
description: "Scaffold the Kendo UI Grid for ASP.NET MVC by using the Kendo UI Scaffolder extension for Visual Studio."
slug: scaffoldinggrid_aspnetmvc
position: 3
---

# Scaffolding

This article demonstrates how to scaffold a Kendo UI Grid for ASP.NET MVC by using the Kendo UI Scaffolder Visual Studio extension.

> **Important**  
>
> The Kendo UI Scaffolder will not include the required UI for ASP.NET MVC files to the project. You are able to achieve this automatically by using the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %}), or manually, as demonstrated [in this article]({% slug aspnetmvc5_aspnetmvc %}).

## Getting Started

### Configuration

Below are listed the steps for you to follow when scaffolding the Kendo UI Grid.

**Step 1** Create a new ASP.NET MVC application, include an Entity Framework Data Model and add Telerik UI for ASP.NET MVC. If you have already done so, move on tot he next step. Otherwise, follow the first four steps described [in this article]({% slug overview_gridhelper_aspnetmvc %}).

**Step 2** Right-click the location where the Grid Controller should be generated. Select **Add** > **New Scaffolded item...** from the displayed menu. In this example, you generate it in the **Controllers** folder.

**Figure 1. Add a new scaffolded item**

![New Scaffolded Item](/aspnet-mvc/images/scaffolding/new_scaffolded_item.png)

**Step 3** Select **Kendo UI Scaffolder** from the list of available scaffolders.

**Figure 2. Choose the Kendo UI Scaffolder**

![Kendo UI Scaffolder](/aspnet-mvc/images/scaffolding/kendo_ui_scaffolder.png)

**Step 4** On the next screen, you are presented with the **Model** and **Data Context** options.

Enter the **Controller** and **View** names.

**Figure 3. Provide the controller name**

![Grid options](/aspnet-mvc/helpers/grid/images/scaffolding/kendo_ui_grid1.png)

The **Model Class** DropDownList contains all model types from the active project. In this example, you list products in the Grid. Select the **Product** entity.

**Figure 4. Choose the Model class**

![Model Class](/aspnet-mvc/helpers/grid/images/scaffolding/model_class.png)

From the **Data Context Class** DropDownList, select the **Entity Framework Data Model** class to be used. In this example it is **NorthwindEntities**.  

**Figure 5. Choose the Data Context class**

![Data Context Class](/aspnet-mvc/helpers/grid/images/scaffolding/data_context_class.png)

**Step 5** (Optional) In some scenarios it is convenient to use view model objects instead of the entities returned by the Entity Framework. If this is the case, check the **Use an existing ViewModel** checkbox. It displays a DropDownList similar to the first one, from which you can select the ViewModel to be used.

If you have not created it yet, add a new class to the `~/Models` folder. Name it `ProductViewModel`.

###### Example

	        public class ProductViewModel
	        {
	            public int ProductID { get; set; }
	            public string ProductName { get; set; }
	            public short? UnitsInStock { get; set; }
	        }

Select the **ProductViewModel** class from the **ViewModel Class** DropDownList.  

**Figure 6. Select the ViewModel class**

![ViewModel Class](/aspnet-mvc/helpers/grid/images/scaffolding/view_model_class.png)

> **Important**  
>
> The names of the properties in the ViewModel must be exactly the same as the corresponding ones in the Entity. Otherwise, the Kendo UI Scaffolder is not able to link them correctly.

**Step 6** Click the **Grid options** item on the left.  

**Figure 7. Pick Grid options**

![Grid options](/aspnet-mvc/helpers/grid/images/scaffolding/kendo_ui_grid2.png)  

This screen contains the Grid functionalities that can be configured before scaffolding:

* `DataSource Type`&mdash;Ajax, Server, or WebApi.
* `Editable`&mdash;Enable the editing, configure the edit mode&mdash;`InLine`, `InCell`, or `PopUp`&mdash;and the operations to be included&mdash;`Create`, `Update`, `Destroy`.  

  **Figure 8. Choose the editable options**

  ![Editable options](/aspnet-mvc/helpers/grid/images/scaffolding/editable.png)  

* `Filterable`&mdash;Enable the filtering of the Grid and select the filter mode.  

  **Figure 9. Select the filterable options**

  ![Filterable options](/aspnet-mvc/helpers/grid/images/scaffolding/filterable.png)  

* `Column Menu`&mdash;Enable the column menu.
* `Navigatable`&mdash;Enable the keyboard navigation.
* `Pageable`&mdash;Enable the paging of the Grid.
* `Reorderable`&mdash;Enable the column reordering.
* `Scrollable`&mdash;Enable the scrolling of the Grid table.
* `Selectable`&mdash;Enable the selection and specify the selection mode and type.  

  **Figure 10. Pick the selectable options**

  ![Selectable options](/aspnet-mvc/helpers/grid/images/scaffolding/selectable.png)  

* `Sortable`&mdash;Enable the sorting and specify the sorting mode.  

  **Figure 11. The sortable options**

  ![Sortable options](/aspnet-mvc/helpers/grid/images/scaffolding/sortable.png)  

* `Excel Export`&mdash;Enable the Excel export functionality.
* `PDF Export`&mdash;Enable the PDF export functionality.

**Step 7** Click the **Events** item on the left.

**Figure 12. The Events item in the Grid options**

![Grid options](/aspnet-mvc/helpers/grid/images/scaffolding/kendo_ui_grid3.png)  

From this screen you could select the Grid events that you would like to attach handlers to.

> **Important**
>
> Not all events are supported in the server-binding mode. To see the complete list, refer to [this article]({% slug serverbinding_grid_aspnetmvc %}#client-side-events-and-server-binding).

**Step 8** When finished with the Grid configuration, click **Add** at the bottom. The Grid Controller and the corresponding View are now generated.

## See Also

Other articles on the Kendo UI Grid for ASP.NET MVC:

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [Configuration of the Grid HtmlHelper]({% slug configuration_gridhelper_aspnetmvc %})
* [Excel Export]({% slug excelexport_gridhelper_aspnetmvc %})
* [Frequently Asked Questions]({% slug freqaskedquestions_gridhelper_aspnetmvc %})
* [Binding of the Grid HtmlHelper]({% slug ajaxbinding_grid_aspnetmvc %})
* [Editing of the Grid HtmlHelper]({% slug ajaxediting_grid_aspnetmvc %})
* [Templating of the Grid HtmlHelper]({% slug clientdetailtemplate_grid_aspnetmvc %})
* [Troubleshooting for the Grid HtmlHelper]({% slug troubleshoot_gridhelper_aspnetmvc %})
* [API Reference of the Grid HtmlHelper](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridBuilder)
* [Overview of the Kendo UI Grid Widget]({% slug overview_kendoui_grid_widget %})

Articles on Telerik UI for ASP.NET MVC:

* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
