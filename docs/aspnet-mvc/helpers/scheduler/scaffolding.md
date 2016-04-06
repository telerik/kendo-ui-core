---
title: Scaffolding
page_title: Scaffolding | Kendo UI Scheduler HtmlHelper
description: "Scaffold the Kendo UI Scheduler for ASP.NET MVC using the Kendo UI Scaffolder extension for Visual Studio."
slug: scaffoldingscheduler_aspnetmvc
position: 3
---

# Scaffolding

This article demonstrates how to scaffold a Kendo UI Scheduler for ASP.NET MVC by using the Kendo UI Scaffolder Visual Studio extension.

> **Important**  
>
> The Kendo UI Scaffolder will not include the required `UI for ASP.NET MVC` files to the project. To achieve this automatically, use the [Telerik UI for ASP.NET MVC Visual Studio extensions]({% slug overview_aspnetmvc %}). To achieve this manually, refer to [this article]({% slug aspnetmvc5_aspnetmvc %}).

## Configuration

Below are listed the steps for you to follow when scaffolding the Kendo UI Scheduler for ASP.NET MVC.

### Create a New ASP.NET MVC Application

Create a new ASP.NET MVC application, include an Entity Framework Data Model, and add Telerik UI for ASP.NET MVC.

For information on how to do this, follow steps 1 to 5 from the [article about Telerik UI for ASP.NET MVC in MVC 5 Applications]({% slug ajaxbinding_schedulerhelper_aspnetmvc %}).

### Generate the Scheduler Controller

Right-click the location where the `Scheduler Controller` should be generated. Select **Add** > **New Scaffolded Item...** from the displayed menu. In this example, you are going to generate it in the **Controllers** folder.

**Figure 1. A new scaffolded item**

![New Scaffolded Item](/aspnet-mvc/helpers/scheduler/images/scaffolding/scheduler_new_scaffolded_item.png)

### Select the Scaffolder

Select **Kendo UI Scaffolder** from the list of available scaffolders. Then choose the desired Scheduler option.

**Figure 2. The Kendo UI Scaffolder**

![Kendo UI Scaffolder](/aspnet-mvc/images/scaffolding/kendo_ui_scaffolder.png)  

### Choose Model and Data Options

The next screen displays the `Model` and `Data Context` options.

**Step 1** Enter the `Controller` and `View` names.

**Figure 3. The Controller and View names**

![Scheduler options](/aspnet-mvc/helpers/scheduler/images/scaffolding/ui_for_aspnetmvc_scheduler_1.png)

**Step 2** The **Model Class** DropDownList contains all model types from the active project. List the products in the Scheduler. In this case, select the **Product** entity.

**Figure 4. The Model Class list**

![Model Class](/aspnet-mvc/helpers/scheduler/images/scaffolding/ui_for_aspnetmvc_scheduler_3.png)

**Step 3** From the **Data Context Class** DropDownList, select the **Entity Framework Data Model** class to be used. In this case, select **SampleEntities**. Note that the DataBase used is taken from the [offline examples]({% slug overview_aspnetmvc %}#sample-application).

**Figure 5. The Data Context class**

![Data Context Class](/aspnet-mvc/helpers/scheduler/images/scaffolding/ui_for_aspnetmvc_scheduler_2.png)  

### Set the View Model

Select the fields from your original model that match the fields from the required `ISchedulerEvent` interface. The Scaffolder automatically generates a view model that inherits from the `ISchedulerEvent` interface. This view model includes a constructor and a method that map the view model fields to the original model:  

**Figure 6. View Model fields selection**

![View Model Fields Selection](/aspnet-mvc/helpers/scheduler/images/scaffolding/ui_for_aspnetmvc_scheduler_4.png)  

**Figure 7. The View Model class**

The newly created class will later be added to the `~/Models` folder.

![View Model Class](/aspnet-mvc/helpers/scheduler/images/scaffolding/ui_for_aspnetmvc_scheduler_7.png)

### Pick the Scheduler Options

**Step 1** Click **Scheduler Options**.

**Figure 8. The Scheduler options**

![Scheduler options](/aspnet-mvc/helpers/scheduler/images/scaffolding/ui_for_aspnetmvc_scheduler_5.png)

This screen contains the Scheduler functionalities that can be configured before scaffolding:  

* **DataSource Type**&mdash;Ajax or WebApi.
* **Edit operations**&mdash;Configures the operations to be included (**Create**, **Update**, **Destroy**, **Resize**, **Move**).
* **Other options** > **PDF Export**&mdash;Enables the PDF export functionality.
* **Other options** > **Selectable**&mdash;Enables the selection functionality.
* **Scheduler Views**&mdash;Opts for the desired views.

**Step 2** Click **Events**. Select the Scheduler events that you want to attach handlers to.

**Figure 9. The Scheduler events**

![Scheduler options](/aspnet-mvc/helpers/scheduler/images/scaffolding/ui_for_aspnetmvc_scheduler_6.png)  

**Step 3.** When finished with the Scheduler configuration, click **Add**. The `Scheduler Controller` and the corresponding `View` are now generated.

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Scheduler:

* [Overview of the Scheduler HtmlHelper]({% slug overview_schedulerhelper_aspnetmvc %})
* [Ajax Binding of the Scheduler HtmlHelper]({% slug ajaxbinding_schedulerhelper_aspnetmvc %})
* [Resources of the Scheduler HtmlHelper]({% slug scaffoldingscheduler_aspnetmvc %})
* [Scheduler HtmlHelper How-To Examples]({% slug howto_bindtowebapicontroller_scheduleraspnetmvc %})
* [Overview of the Kendo UI Scheduler Widget]({% slug overview_kendoui_scheduler_widget %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
