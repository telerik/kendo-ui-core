---
title: Scaffolding
page_title: How to use the Kendo UI Scaffolder extension.
description: Learn how to scaffold Kendo UI Scheduler for ASP.NET MVC using the Kendo UI Scaffolder extension for Visual Studio.
---

# Scheduler Scaffolding

The following tutorial shows how to scaffold a Kendo UI Scheduler for ASP.NET MVC using the **Kendo UI Scaffolder** Visual Studio extension.

> The Kendo UI Scaffolder will not include the required **UI for ASP.NET MVC** files to the project. You could achieve this automatically using the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/vs-integration/introduction) or manually as demonstrated [here](/aspnet-mvc/asp-net-mvc-5).

# Getting started

1.  Create a new ASP.NET MVC application, include an Entity Framework Data Model and add **Telerik UI for ASP.NET MVC**. If you have already done so, you can skip to the next step, otherwise you can follow the first 5 steps of the [following tutorial](/aspnet-mvc/helpers/scheduler/ajax-editing#getting-started).

2.  Right click on the location where the Scheduler Controller should be generated and select **Add | New Scaffolded item...** from the displayed menu. In this example we will generate it in the **Controllers** folder.
![New Scaffolded Item](/aspnet-mvc/helpers/scheduler/images/scaffolding/scheduler_new_scaffolded_item.png)

3.  Select **Kendo UI Scaffolder** from the list of available scaffolders and then select the desired Scheduler option.
![Kendo UI Scaffolder](/aspnet-mvc/images/scaffolding/kendo_ui_scaffolder.png)

4.  On the next screen you will be presented with the Model and Data Context options.
    - First enter the Controller and View names.  
![Scheduler options](/aspnet-mvc/helpers/scheduler/images/scaffolding/ui_for_aspnetmvc_scheduler_1.png)
    - The **Model Class** DropDownList will contain all model types from the active project. In this example we will list products in the Scheduler. Select the **Product** entity.  
![Model Class](/aspnet-mvc/helpers/scheduler/images/scaffolding/ui_for_aspnetmvc_scheduler_3.png)
    - From the **Data Context Class** DropDownList you could select the **Entity Framework Data Model** class to be used. In this example it is **SampleEntities** (the DataBase used is the one from the [offline examples](/aspnet-mvc/introduction#running-the-sample-application)).  
![Data Context Class](/aspnet-mvc/helpers/scheduler/images/scaffolding/ui_for_aspnetmvc_scheduler_2.png)

5. In this step you will have to select the fields from your original model that match the fields from the required ISchedulerEvent interface. The scaffolder will automatically generate view model for you that inherit from the ISchedulerEvent interface. That view model will include constructor and method that map the view model fields to the original model.
 ![View Model Fields Selection](/aspnet-mvc/helpers/scheduler/images/scaffolding/ui_for_aspnetmvc_scheduler_4.png)

    - Later the newly created class will be added to the `~/Models` folder.
    ![View Model Class](/aspnet-mvc/helpers/scheduler/images/scaffolding/ui_for_aspnetmvc_scheduler_7.png)

6. Click the **Scheduler options** item on the left.  
![Scheduler options](/aspnet-mvc/helpers/scheduler/images/scaffolding/ui_for_aspnetmvc_scheduler_5.png)  
This screen contains the Scheduler functionalities that could be configured before scaffolding:
    - DataSource Type - Ajax or WebApi.
    - Edit operations - Configure the operations to be included (Create, Update, Destroy, Move, Resize).  
    - PDF Export - Enable the PDF export functionality.
    - Selectable - Enable the selection functionality.  
    - Views - Select the desired views to be included. 

7. Click the **Events** item on the left.  
![Scheduler options](/aspnet-mvc/helpers/scheduler/images/scaffolding/ui_for_aspnetmvc_scheduler_6.png)  
From this screen you could select the Scheduler events that you would like to attach handlers to.

8. When finished with the Scheduler configuration, click the **Add** button at the bottom. The Scheduler Controller and the corresponding View will be generated.