---
title: Scaffolding
page_title: Scaffolding
description: "Learn the basics about scaffolding the Telerik UI Grid HtmlHelper for ASP.NET MVC by using the Scaffolder extension for Visual Studio."
previous_url: /helpers/data-management/grid/scaffolding
slug: scaffoldinggrid_aspnetmvc
position: 3
---

# Scaffolding

The Grid HtmlHelper for ASP.NET MVC enables you to use the Kendo UI Scaffolder Visual Studio extension.

> The Kendo UI Scaffolder will not include the required UI for ASP.NET MVC files to the project. To automatically achieve this, use the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %}). To manually achieve this, refer to [this article]({% slug gettingstarted_aspnetmvc %}).

To scaffold the Grid HtmlHelper for ASP.NET MVC:

1. Create a new ASP.NET MVC application, include an Entity Framework Data Model and add Telerik UI for ASP.NET MVC. If you have already done so, move on to the next step. Otherwise, follow the first four steps described [in this article]({% slug htmlhelpers_grid_aspnetcore_overview %}).
1. Right-click the location where the Grid Controller should be generated. Select **Add** > **New Scaffolded item...** from the displayed menu. In this example, you generate it in the **Controllers** folder.

	![A new scaffolded item](../../../images/scaffolding/new_scaffolded_item.png)

1. Select **Kendo UI Scaffolder** from the list of available scaffolders.

	![Choosing the Kendo UI Scaffolder](../../../images/scaffolding/kendo_ui_scaffolder.png)

1. On the next screen, you are presented with the **Model** and **Data Context** options. Enter the **Controller** and **View** names.

	![Providing the Controller name](images/scaffolding/kendo_ui_grid1.png)

	The **Model Class** DropDownList contains all model types from the active project. In this example, you list products in the Grid. Select the **Product** entity.

	![Choosing the Model class](images/scaffolding/model_class.png)

	From the **Data Context Class** DropDownList, select the **Entity Framework Data Model** class to be used. In this example it is **NorthwindEntities**.

	![Choosing the Data Context class](images/scaffolding/data_context_class.png)

1. (Optional) In some scenarios it is convenient to use view model objects instead of the entities returned by the Entity Framework. If this is the case, check the **Use an existing ViewModel** checkbox. It displays a drop-down list similar to the first one from which you can select the ViewModel that will be used.

	If you have not created it yet, add a new class to the `~/Models` folder. Name it `ProductViewModel`.

        public class ProductViewModel
        {
            public int ProductID { get; set; }
            public string ProductName { get; set; }
            public short? UnitsInStock { get; set; }
        }

	Select the **ProductViewModel** class from the **ViewModel Class** drop-down list.

	![Selecting the ViewModel Class](images/scaffolding/view_model_class.png)

	> The names of the properties in the ViewModel must be exactly the same as the corresponding ones in the Entity. Otherwise, the Kendo UI Scaffolder is not able to link them correctly.

1. Click the **Grid options** item on the left.

	![Selecting the Grid options](images/scaffolding/kendo_ui_grid2.png)

	This screen contains the Grid functionalities that can be configured before scaffolding:

	* `DataSource Type`&mdash;Ajax, Server, or WebApi.
	* `Editable`&mdash;Enable the editing, configure the edit mode&mdash;`InLine`, `InCell`, or `PopUp`&mdash;and the operations that will be included&mdash;`Create`, `Update`, `Destroy`.

	  ![Selecting the editable options](images/scaffolding/editable.png)

	* `Filterable`&mdash;Enable the filtering of the Grid and select the filter mode.

	  ![Selecting the filterable options](images/scaffolding/filterable.png)

	* `Column Menu`&mdash;Enable the column menu.
	* `Navigatable`&mdash;Enable the keyboard navigation.
	* `Pageable`&mdash;Enable the paging of the Grid.
	* `Reorderable`&mdash;Enable the column reordering.
	* `Scrollable`&mdash;Enable the scrolling of the Grid table.
	* `Selectable`&mdash;Enable the selection and specify the selection mode and type.

	  ![Selecting the selectable options](images/scaffolding/selectable.png)

	* `Sortable`&mdash;Enable the sorting and specify the sorting mode.

	  ![Selecting the sortable options](images/scaffolding/sortable.png)

	* `Excel Export`&mdash;Enable the Excel export functionality.
	* `PDF Export`&mdash;Enable the PDF export functionality.

1. Click the **Events** item on the left.

	![The Events item in the Grid options](images/scaffolding/kendo_ui_grid3.png)

	From this screen, you can select the Grid events to which you want to attach handlers.

	> Not all events are supported in the server-binding mode. To see the complete list, refer to [this article]({% slug htmlhelpers_grid_aspnetcore_localbinding %}#supported-client-side-events).

1. When finished with the Grid configuration, click **Add** at the bottom. The Grid Controller and the corresponding View are now generated.

## See Also

* [Basic Usage of the Grid HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/grid)
* [Using the API of the Grid HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/grid/api)
* [Server-Side API](/api/grid)
