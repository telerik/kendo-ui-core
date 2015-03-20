---
title: Part 4 - Hello Kendo UI
page_title: First tutorial for HTML5 development with ASP.NET - Kendo UI Grid
description: This tutorial will help you get used to working with Kendo UI Grid widget and Kendo UI DataSource component. Learn how to use them together in your web app.
position: 4
---

# Tutorial: HTML5 Development For ASP.NET Developers Part 4

## Hello Kendo UI

In this tutorial, you will work with the most complex widget, the [Kendo UI Grid](http://demos.telerik.com/kendo-ui/web/grid/index.html) as well as one of the core components,
the [Kendo UI DataSource](http://demos.telerik.com/kendo-ui/web/datasource/index.html).  It is absolutely essential to understand how these two work in your app, and how they work together.
We will create a grid, and wire it up to an ASP.NET WebAPI service while doing some heavy server lifting along the way.

## Screencast

<iframe height="360" src="http://www.youtube.com/embed/pFOJTlbbpIc?rel=0" frameborder="0" width="640"></iframe>

## Written Content

This tutorial builds off of the Hello Services module, so it's highly
recommended that you download that project from GitHub [here](https://github.com/telerik/html5-dev-for-aspnet-devs) before we
get started.  If you are interested in seeing the completed solution, you can
download that [here](https://github.com/telerik/html5-dev-for-aspnet-devs).

In the **Hello Services** project, delete the **Site.Master**, **About.aspx**
and **Default.aspx** pages.  Add a new WebForm to the project and call it
**Default.aspx**.

![add-new-webform](/images/webforms/add-new-webform.png)

When the document comes up, delete all of the unnecessary `DOCTYPE` declaration and HTML namespacing.  If you refer to Hello HTML5, you
will remember that none of this is necessary and really just clutters up the
code.

**Removing the `<form>`**

I'm going to have you remove the form tag, but just a word about why before you actually do it.

The `<form>` tag in the page is what WebForms uses to post any data in the
page back to the server and then back again. By default, WebForms pages post
back to themselves. The server then takes this form data (any .NET controls in
the page) and manipulates their values based on methods you have defined in
the code behind. There is a whole [page lifecycle](http://msdn.microsoft.com/en-us/library/ms178472.aspx) that goes into
effect here. Since we are essentially building an [SPA](http://en.wikipedia.org/wiki/Single-page_application), we don't need
this form.

Now that you have removed the form tag, the server tag at the top of the page
declaring the page language and code behind is also not necessary. We are
going all straight HTML here, so also remove the **runat** attribute from the
head.

### Remove Unnecessary Markup

    <!DOCTYPE html>

        <html>
            <head>
                <title></title>
            </head>
            <body>

            </body>
        </html>

### Add Kendo UI

Add Kendo UI to your project by installing it from NuGet.  This will also
install jQuery.  Right-click the project and select **add library package
reference**. Select **online** from the left-hand side and search for
**kendoui.**  Select the package and choose **install.**

**While you are free to install and try out Kendo UI, please make sure that
you have a licensed copy before using Kendo UI in a production application.
Click [here][11] for more information on Kendo UI licensing.**

![kendo-ui-nuget](/images/webforms/kendo-ui-nuget.png)

Notice that you now have a **Content** folder that contains a **kendo**
subfolder.  You also have a **Scripts** folder which also has a **kendo**
subfolder.

![solution-explorer-content](/images/webforms/solution-explorer-content.jpg)

### Add Kendo UI To The Default Page

In order to build with Kendo UI, you need to include it's styles, jQuery and
the Kendo UI JavaScript files.  Out of the **Content** folder and
**kendo/version** subfolder, drag the `kendo.common.min.css` file to the
head of the page, just below `<title>`.  This style sheet always needs to be
included.  It's used in all the themes.  Next, pick your favorite theme and
drag that stylesheet to the head of the page.  For this example, I used the
default style which is `kendo.default.min.css`.

Expand the **Scripts **folder.  Select `jQuery-1.8.2.min.js` and drag it
into the body of the page.  We put the script files in the body of the page
because it's best practice to load scripts last as they will delay loading of
the whole page.  Loading them last ensures that your application doesn't
suffer from seemingly poor performance while waiting on a JavaScript file.

Next expand the **kendo** subfolder (and the appropriate version subfolder
under that 2012.2.710 at the time of this writing) and drag
`kendo.web.min.js` out and drop it just below **jQuery**. It's important to
load jQuery BEFORE loading Kendo UI as Kendo UI takes a dependency on jQuery
and expects it to be loaded.

**Type Not Required**

It turns out that **Script **includes do not need a type.  If you do not
specify a type, it is assumed to be JavaScript and parsed as such.  This is
safe in every browser.  Go ahead and remove the `type` attribute off the
script tags.

When you are done pruning, your code should be very simple and look like this:

### Kendo UI Added To The Page

    <!DOCTYPE html>

    <html>

        <head>

            <title>Hello Kendo UI</title>
            <link href="Content/kendo/2012.2.710/kendo.common.min.css" rel="stylesheet" type="text/css" />
            <link href="Content/kendo/2012.2.710/kendo.default.min.css" rel="stylesheet" type="text/css" />

        </head>

        <body>

            <script src="Scripts/jquery-1.8.2.min.js"></script>
            <script src="Scripts/kendo/2012.2.710/kendo.web.min.js"></script>

        </body>

    </html>



We now have everything it takes to get started.  Since we already have an
**employees** endpoint from the **[Hello Services][2]** modules, we will use
the grid to display those employees.  Don't worry.  This is going to get a lot
more complex as we go.  We are just starting out simple.

Make a grid by adding an empty div to the page with an id of
**employeesGrid**.  We will select this later with jQuery to turn it into a Kendo UI Grid.

### Grid Markup


    <div id="employeesGrid"></div>


Now we need to turn this grid into a Kendo UI Grid using JavaScript.
To do that, select the `div` by it's ID with a jQuery selector and then call
the `kendoGrid` function.  Inside that function, you will need to create the
[Kendo UI DataSource](http://demos.telerik.com/kendo-ui/web/datasource/index.html) for the grid and set its read endpoint to the
**Get** method on the **EmployeesController**.  If you don't recall, the
**Get** method simply specifies that the controller should respond to a
**GET** HTTP request at the **api/employees** endpoint.

### Create A Kendo UI Grid


    $(function () {

        $("#employeesGrid").kendoGrid({
            dataSource: new kendo.data.DataSource({
                transport: {
                    read: "api/employees"
                }
            })
        });
    });

Now with that simple piece of markup and small bit of JavaScript, you have
created a** Kendo UI Grid.

![kendo-grid-preview](/images/webforms/kendo-grid-preview.png)

Kendo UI automatically creates columns for each of the data items and assigns
the field name as the column header.  We want to change this to make it more
user friendly. Specifically, we don't need to display the Id, and we want to
format the **First Name** and **Last Name** columns so they display headers in
spaced title case.  Right now they are title cased, but there is no space.

### Specify Grid Columns


    $(function () {
        $("#employeesGrid").kendoGrid({
            columns: [
                { field: "FirstName", title: "First Name" },
                { field: "LastName", title: "Last Name" }
            ],
            dataSource: new kendo.data.DataSource({
                transport: {
                    read: "api/employees"
                }
            }),
            sortable: true
        });
    });

Now the grid displays the column headers correctly and does not display the
unnecessary **Id** column.

![grid-preview-with-columns-and-sorting](/images/webforms/grid-preview-with-columns-and-sorting.png)

You can also enable drag-and-drop grouping by setting the `groupable: true` flag, as well as multi-column sorting, aggregating, and paging.

This is all great when there are only a few items in your grid.  But what
happens when there are hundreds of items in the grid.  At some point, you want
to push actions back to the server.  Let's take a look at how to do that.

## Performing Grid Actions Server-Side

Assume that this grid is backed by data with thousands of rows, not just 10.
In this case, you would want to do some paging on the grid.  You could show
possibly 10 rows per page.  Maybe 20.  While you could easily enable this in
the grid client-side, you really need to do this paging on the server.  Let's
wire up the grid to the server so that we can perform paging actions on the
database which will really boost the performance of massive record sets.

### Setup Paging In The Grid

You need to setup paging in the grid first.  To do that, simply set
`pageable: true` on the grid, and then set the `pageSize` on the
DataSource.  I'm setting the `pageSize` to 3 since I only have 10 records to
work with.

### Configure Grid For Paging

    $(function () {
        $("#employeesGrid").kendoGrid({
            columns: [
                { field: "FirstName", title: "First Name" },
                { field: "LastName", title: "Last Name" }
            ],
            dataSource: new kendo.data.DataSource({
                transport: {
                    read: "api/employees"
                },
                pageSize: 3
            }),
            pageable: true
        });
    });

Now the grid is setup for paging.

![grid-preview-client-paging](/images/webforms/grid-preview-client-paging.png)

You need to push this paging to the server.  To tell Kendo UI to do this,
simply toggle the `serverPaging: true` on the DataSource in the grid.

### Tell Grid To Send Paging To The Server


    $(function () {
        $("#employeesGrid").kendoGrid({
            columns: [
                { field: "FirstName", title: "First Name" },
                { field: "LastName", title: "Last Name" }
            ],
            dataSource: new kendo.data.DataSource({
                transport: {
                    read: "api/employees"
                },
                pageSize: 3,
                serverPaging: true
            }),
            pageable: true
        });
    });

![grid-preview-server-paging-only-1-page](/images/webforms/grid-preview-server-paging-only-1-page.png)

The grid now displays only 1 page.  The reason for this is that it is
expecting the server to send it some information that we have not yet
specified.  Open up the Dev Tools by pressing `ctrl+shift+i` in Chrome or
**F12** in IE.  You will have noticed that I switched to using Chrome as my
primary browser.  The reason is simply the robust nature of it's developer
tools when compared to IE.  You will want to test your application on
whichever browser you are targeting for deployment.

An inspection of the request in the **DevTools** reveals that Kendo UI is now
sending `take`, `skip` and `pageSize` parameters back to the WebAPI service.
You need to handle these parameters in the method on the server.

![grid-preview-server-paging-broken-dev-tools](/images/webforms/grid-preview-server-paging-broken-dev-tools.png)

### Handling Request Parameters

If you recall from the Hello Services tutorial, you mapped a URL back to
a method with an optional `id` parameter that may or may not be after
**employees** in the URL path.  But these parameters for paging are in the
query string.  How do we get to these parameters?

These parameters can be retrieved off of the **Request** object.  You can
create a reference to this variable at the top of your **EmployeesController**
class for brevity.  The you just need to look for the parameters by name.

The `take` parameter tells you how many records you need to fetch (i.e. the
page size).

The `skip` parameter tells you how many records to skip before you start
fetching records.

Luckily, LINQ has these functions built right in and they are dead simple to
use.  Simply retrieve the values off of the **Request** parameter and  then
call the `Skip` and `Take` methods on your query to the **Employees** table.

### Create A Kendo UI Grid

    HttpRequest request = HttpContext.Current.Request;

    public List Get() {
        // get the take and skip parameters int skip = request["skip"] == null ? 0 :
        int.Parse(request["skip"]); int take = request["take"] == null ? 10 :
        int.Parse(request["take"]);

        // select the employees from the database, skipping and taking the correct amount
        var employees = (from e in _context.Employees
                         select new Models.Employee(e)).Skip(skip).Take(take);

        return employees.ToList();
    }

The server is now handling the paging.  Start the application and preview it
in the browser.

![grid-preview-server-paging-only-1-page](/images/webforms/grid-preview-server-paging-only-1-page.png)

You will notice that there is still only 1 page of data.  This is because you
have not yet given Kendo UI an essential piece of information.

**How many total pages of data are there?**

You will need to pass a variable to Kendo UI from the server that will specify
the total number of pages.  In order to do this, you need to modify the
response.  Currently, you are sending back an array of employees as the top
level element in your JSON response from the server.  What you need now is a
top level element that has two values:

1. The total count of records

2. The array of employees

To solve this, create a new class in the **Models** folder called
**Response**.  This will be the generic response container for all responses
coming from the server.  This class will have to properties, the total count
and an **Array**.

Now if you are a .NET developer, and the thought of using an array sends off
warning bells in your head, you are on the right track.  This is normal.
Arrays are not type-safe and C#/VB.NET are strongly typed languages.  Arrays
are not often used.  Instead, you would use a generic list which allows you to
specify the type.

However for this scenario, the **Array** is going to contain a collection of
class objects that could be of any type.  You might later want to send down
customers or orders.  We could jump through some hoops here with generics and
interfaces to force a type-safe container, but the simplest way to accomplish
this is with an Array.  Remember that this object is strictly for you to
interface with the JavaScript where arrays are first class citizens.

Your **Reponse** model object should look like this:

### Response Model Object

    public class Response {
        // properties public Array Data { get; set; }
        public int Count { get; set; }
        // constructor
        public Response(Array data, int count) {
            this.Data = data; this.Count = count;
        }
    }

I also added a constructor so that I can build this object by passing values
into it.  This keeps me from having to build the object in the method that
executes the query, thus decreasing the amount of code in that block.

Now alter the **Get** method to return `Model.Response` instead of
`List<Model.Employee>`.  Also, instead of casting the returned query results
to a list, cast them `ToArray()`; You can do this inline right off of the
LINQ query.  The count can be ascertained from the `Data.Employee` LINQ
object by calling its `Count()` method.

### Return The Models.Response Object

    public Models.Response Get() {
        // get the take and skip parameters
        int skip = request["skip"] == null ? 0 : int.Parse(request["skip"]);
        int take = request["take"] == null ? 10 : int.Parse(request["take"]);

        // select the employees from the database, skipping and taking the correct amount
        var employees = (from e in _context.Employees
                         select new Models.Employee(e)).Skip(skip).Take(take).ToArray();

        return new Models.Response(employees, _context.Employees.Count());
    }

If you fire up the application now and have a look, you will see an empty
grid.  This is because the collection of employees is no longer the top level
element.  We need to tell Kendo UI about our new response structure.
Specifically, it needs to know where the repeating data is (employees array)
and where the total count of records is.  This is done in the **schema** configuration.

### Specify The Schema


    $(function () {
        $("#employeesGrid").kendoGrid({
            columns: [ { field: "FirstName", title: "First Name" }, { field: "LastName", title: "Last Name" } ],
            dataSource: new kendo.data.DataSource({
                transport: {
                    read: "api/employees"
                },
                schema: {
                    data: "Data",
                    total: "Count"
                },
                pageSize: 3,
                serverPaging: true
            }),
            pageable: true
        });
    });

Now you can run the application and see that paging is working.  If you open
the developer tools, you can watch each request go to the server and watch the
server return only the appropriate page of data.  If you watch closely,
depending on your server latency, you might see the Kendo UI spinner come up
indicating a server action.  You can add a
`System.Threading.Thread.Sleep(1000);` to your **Get** method on the
**EmployeesController** if you want to see what your application will look
like while the UI is waiting for the server to respond.  Kendo UI takes care
of that too.

![grid-preview-paging-server-dev-tools](/images/webforms/grid-preview-paging-server-dev-tools.png)

Download the full source for the project in this tutorial [here](https://github.com/telerik/html5-dev-for-aspnet-devs).  You
will build on this tutorial in the weeks to come as you add more and more
advanced functionality to this application.

   [4]: http://demos.telerik.com/kendo-ui/web/grid/index.html

   [5]: http://demos.telerik.com/kendo-ui/web/datasource/index.html

   [6]: https://github.com/telerik/html5-dev-for-aspnet-devs

   [9]: http://msdn.microsoft.com/en-us/library/ms178472.aspx

   [10]: http://en.wikipedia.org/wiki/Single-page_application
