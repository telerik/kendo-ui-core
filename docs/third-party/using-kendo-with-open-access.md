---
title: Telerik Data Access
page_title: Telerik Data Access | Kendo UI Third-Party Tools
description: "Learn how to leverage Telerik Data Access Framework on the backend and let Kendo UI take care of the user interface."
previous_url: /using-kendo-with-open-access
slug: bindtotelerikdataaccesstool_integration_kendoui
position: 7
---

# Telerik Data Access

In this article you will learn how to leverage [Telerik Data Access](http://www.telerik.com/data-access) on the backend and let [Kendo UI](http://www.telerik.com/kendo-ui) take care of the user interface.

## Set Up the Project

To get started, create a new Telerik MVC Web Application.

![New Web Project](/images/oa1.png)

When asked about the Data Access approach, select **Skip Creating a Telerik Data Access Model Library Project**. This is going to create an empty Telerik UI for an MVC project.

## Build the Model

**Step 1** To build a Data Access data model, select **TELERIK** > **Telerik Data Access** > **Add Domain Model**, as shown below.

> **Important**
>
> If you do not have Telerik Data Access installed, you are able to get the trial edition on the [Free Trials page](http://www.telerik.com/download-trial-file.aspx?pid=638).

![Build The Model](/images/oa3.png)

**Step 2** On the window that opens next, select **Populate from database**. Click **Next**.

![Populate From Data](/images/oa4.png)

**Step 3** Set up a connection to NorthwindOA, installed with Data Access, by choosing the option from the drop-down list. Click **Next**.

![Connect To NorthwindOA](/images/oa5.png)

**Step 4** Include all tables from the database in the data model by ticking the **Tables** check box.

![Include All Tables](/images/oa6.png)

**Step 5** Click **Finish**. The data model is now ready to be used. Next, you need to expose this data model through a service layer.

## Build the Service Layer

**Step 1** Perform a build on the application. Right-click the `.rlinq` file in **Solution Explorer**. Select **Add Telerik Data Access Service** so that the domain service wizard fires up.

![Generate OpenAccess Domain Model](/images/oa7.png)

**Step 2** From the drop-down list of the wizard select **EntitiesModel**. Click **Next**.

![Select Northwind OA](/images/oa9.png)

**Step 3** The screen that loads next allows you to configure the service that is going to be created. Select **WCF Service - OData v3** and click **Next**.

![Configure The Service](/images/oa10.png)

**Step 4** On the next screen you are able to change the name of the service and select which tables to include. Click **Finish** to create your service.

![Configure The entitites](/images/oa11.png)

## Connect OData Service to Kendo UI Grid

Now configure the front end. Wire up the Orders to a Kendo UI Grid. Kendo UI is a very rich and powerful framework that provides you with full control over the UI of your project, so make sure you explore it even further.

**Step 1** Edit the `Global.asax.cs` file and add the following route configuration in the `RegisterRoutes` method:

    RouteTable.Routes.IgnoreRoute("EntitiesModelService.svc/{*pathInfo}"); // specify the correct service path here

**Step 2** Set up the Grid widget. For detailed information on how to configure data binding, visit the [Kendo UI live demo page](http://demos.telerik.com/kendo-ui/web/grid/index.html). Basically, use a `div` that is going to be applied as the container for the Grid and configure the widget in script.

The example below demonstrates some sample code you need.

###### Example

    <!--Will be turned into a Kendo UI Grid! -->
    <div id="grid"></div>

    <!-- configure the Grid-->
    <script>

        // document ready fires when the whole page is ready
        // and all elements, scripts, styles have been loaded
        $(function () {

            // regex for some date parsing
            // select the div and create the Grid element
            $("#grid").kendoGrid({
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "/EntitiesModelService.svc/Orders"
                    },
                    schema: {
                        data: "value",
                        total: "['odata.count']",
                        model: {
                            fields: {
                                OrderID: { type: "number" },
                                Freight: { type: "number" },
                                ShipName: { type: "string" },
                                OrderDate: { type: "date" },
                                ShipCity: { type: "string" }
                            }
                        }
                    },
                    pageSize: 10,
                    serverPaging: true,
                    serverFiltering: true,
                    serverSorting: true
                },
                filterable: true,
                sortable: true,
                pageable: true,
                columns: [
                    {
                        field: "OrderID",
                        filterable: false
                    },
                    "Freight",
                    {
                        field: "OrderDate"
                    },
                    "ShipName",
                    "ShipCity"
                ]
            });

        });

    </script>

**Step 3** Run the application. You are expected to see the Grid below as a result.

![Grid](/images/oa12.png)

## See Also

Other articles on Kendo UI integration with third-party tools and frameworks:

* [Angular 2.0]({% slug angular2support_integration_kendoui %})
* [Twitter Bootstrap]({% slug twitterbootstrapintegration_integration_kendoui %})
* [Web Components]({% slug webcomponents_integration_kendoui %})
* [RequireJS]({% slug requirejs_integration_kendoui %})
* [TypeScript]({% slug typescript_integration_kendoui %})
* [Visual Studio IntelliSense]({% slug visualstudiointellisense_integration_kendoui %})
* [SystemJS Support]({% slug systemjs_integration_kendoui %})
* [Webpack Support]({% slug webpacksupport_integration_kendoui %})
* [Aurelia]({% slug aurelia_integration_kendoui %})
