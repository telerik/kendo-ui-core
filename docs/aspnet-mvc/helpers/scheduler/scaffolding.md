---
title: Scaffolding
page_title: How to use the Kendo UI Scaffolder extension.
description: Learn how to scaffold Kendo UI Scheduler for ASP.NET MVC using the Kendo UI Scaffolder extension for Visual Studio.
slug: scaffoldingscheduler_aspnetmvc
---

# Scheduler Scaffolding

This chapter provides information on how to scaffold a Kendo UI Scheduler for ASP.NET MVC using the Kendo UI Scaffolder Visual Studio extension.

> The Kendo UI Scaffolder will not include the required UI for ASP.NET MVC files in your project:  
> - To automatically add them, use the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/vs-integration/introduction).  
> - To manually add them, follow the steps demonstrated [here](/aspnet-mvc/asp-net-mvc-5).

# Getting Started

1. Create a new ASP.NET MVC application, include an Entity Framework Data Model and add Telerik UI for ASP.NET MVC. On how to do this, follow steps 1-5 from the [Telerik UI for ASP.NET MVC in MVC 5 Applications tutorial](/aspnet-mvc/helpers/scheduler/ajax-editing#getting-started).

2. Right-click on the location where the `Scheduler Controller` should be generated. Select **Add** -> **New Scaffolded Item...** from the displayed menu. In this example we generate it in the `Controllers` folder:
<br>
![New Scaffolded Item](/aspnet-mvc/helpers/scheduler/images/scaffolding/scheduler_new_scaffolded_item.png)

3. Select **Kendo UI Scaffolder** from the list of available scaffolders. Then choose the desired Scheduler option:
<br>
![Kendo UI Scaffolder](/aspnet-mvc/images/scaffolding/kendo_ui_scaffolder.png)  

4. The next screen displays the `Model` and `Data Context` options:
    - Enter the `Controller` and `View` names:  
![Scheduler options](/aspnet-mvc/helpers/scheduler/images/scaffolding/ui_for_aspnetmvc_scheduler_1.png)
<br>
    - The **Model Class** DropDownList contains all model types from the active project. In this example we list products in the Scheduler. Select the **Product** entity:  
![Model Class](/aspnet-mvc/helpers/scheduler/images/scaffolding/ui_for_aspnetmvc_scheduler_3.png)
<br>
    - From the **Data Context Class** DropDownList you can select the **Entity Framework Data Model** class to be used. In this example we select **SampleEntities**. Note that the DataBase used is taken from the [offline examples](/aspnet-mvc/introduction#running-the-sample-application):  
![Data Context Class](/aspnet-mvc/helpers/scheduler/images/scaffolding/ui_for_aspnetmvc_scheduler_2.png)  

5. Select the fields from your original model that match the fields from the required `ISchedulerEvent` interface. The Scaffolder automatically generates a view model that inherits from the `ISchedulerEvent` interface. This view model includes a constructor and a method that map the view model fields to the original model:  
![View Model Fields Selection](/aspnet-mvc/helpers/scheduler/images/scaffolding/ui_for_aspnetmvc_scheduler_4.png)  
<br>
The newly created class will later be added to the `~/Models` folder:  
![View Model Class](/aspnet-mvc/helpers/scheduler/images/scaffolding/ui_for_aspnetmvc_scheduler_7.png)

6. Click **Scheduler Options**:  
![Scheduler options](/aspnet-mvc/helpers/scheduler/images/scaffolding/ui_for_aspnetmvc_scheduler_5.png)
<br>
This screen contains the Scheduler functionalities that can be configured before scaffolding:  
	- **DataSource Type** - Ajax or WebApi
	- **Edit operations** - configures the operations to be included (**Create**, **Update**, **Destroy**, **Resize**, **Move**)  
    - **Other options** -> **PDF Export** - enables the PDF export functionality
    - **Other options** -> **Selectable** - enables the selection functionality  
    - **Scheduler Views** - opts for the desired views

7. Click **Events**. Select the Scheduler events that you want to attach handlers to:  
![Scheduler options](/aspnet-mvc/helpers/scheduler/images/scaffolding/ui_for_aspnetmvc_scheduler_6.png)  

8. When finished with the Scheduler configuration, click **Add**. The `Scheduler Controller` and the corresponding `View` are now generated.
