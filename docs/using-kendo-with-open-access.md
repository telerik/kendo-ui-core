---
title: Bind to Open Access ORM using OData
page_title: Use Kendo UI With The Open Access ORM Tool
position: 240
---

In this article you will learn how [OpenAccess ORM](http://www.telerik com/products/orm.aspx) can be leveraged on the backend, and [Kendo UI](http://www.telerik.com/kendo-ui) can take care of the UI.

## Set up the project

To get started create a new **Telerik MVC Web Application.**

![New Web Project](/images/oa1.png)

When you are asked about the Data Access approach you can select *Skip creating a Telerik Data Access Model Library Project*

This will create an empty Telerik UI for MVC project.

Now we are ready to build the OpenAccess ORM model!

## Build The Model

To build an OpenAccess ORM data model, select the Telerik menu item, select **Telerik Data Access-->Add Domain Model**

*Note: If you do not have OpenAccess ORM installed, you can get the trial
edition [here](http://www.telerik.com/download-trial-file.aspx?pid=638).*

![Build The Model](/images/oa3.png)

In the next window select **Populate from Database**, and click **Next**.

![Populate From Data](/images/oa4.png)

Set up a connection to NorthwindOA, which is installed with OpenAccess, and
then click next.

![Connect To NorthwindOA](/images/oa5.png)

At this point go ahead and include all tables from the database in the data
model.

![Include All Tables](/images/oa6.png)

Click finish, and step 2 is done!  The data model is ready to be used.  The
next step is to expose this data model through a service layer.

## Build The Service Layer

Perform a **build** on the application, and right click on the `.rlinq` file in the
solution explorer. Select **Add Telerik Data Access Service**, and the domain service wizard will fire up.

![Generate OpenAccess Domain Model](/images/oa7.png)

Select the EntitiesModel context in the wizard, and click Next.

![Select Northwind OA](/images/oa9.png)

This screen allows you to configure the service that will be created.  Select the ** WCF Service - OData v3**, option and then click Next.

![Configure The Service](/images/oa10.png)

On this screen you can change the name of the service and select which tables to be included. Click **Finish** and your service will be created.

![Configure The entitites](/images/oa11.png)

## Connect the OData Service to a Kendo Grid

Now all that is left to do is configure the front end.  For now we will wire up the Orders to a Kendo UI grid, but feel free to take it even further! Kendo UI has a lot of cool features to play around with.

First thing we need to do is edit the *Global.asax.cs* file and add the following route configuration in RegisterRoutes method:

    routes.IgnoreRoute("EntitiesModelService.svc/{*pathInfo}"); //here you need to specify the correct service path

Next, we need to set up the grid.  Kendo UI's web site provides many [great examples](http://demos.telerik.com/kendo-ui/web/grid/index.html) of how to configure binding; so I won't go into too much detail here.  The basic idea is that we need a div that will be used as the container for the Kendo UI grid, and then we just have to configure the grid in script.

The code needed is here:

    <!--Will be turned into a kendo-ized grid! -->
    <div id="grid"></div>

    <!-- configure grid-->
    <script>

        // document ready fires when the whole page is ready
        // and all elements, scripts, styles have been loaded
        $(function () {

            // regex for some date parsing
            // select the div and create the grid element
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

Now run the application. If all went well you should be presented with a great looking grid:

![Grid](/images/oa12.png)

## Conclusions

The OpenAccess ORM Visual Designer and Service Layer Generator make it extremely easy to get started working with Kendo UI.  In fact, we only had to write 1 line of server side code thanks to these great tools!
