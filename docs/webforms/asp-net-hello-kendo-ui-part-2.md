---
title: Part 5 - Hello Kendo UI  - Grid CRUD
page_title: Second tutorial for HTML5 development with ASP.NET - Crud Operations
description: Learn how to enable CRUD operations in Kendo UI Grid widget, handle editing the grid and failed requests.
position: 5
---

In this tutorial, you will learn how to fully enable CRUD operations in the
grid and how to additionally handle errors on your server and bubble them up
to the browser.

## Screencast

<iframe height="360" src="http://www.youtube.com/embed/BRv7Gvf1w6A?rel=0" frameborder="0" width="640"></iframe>

## Written Content

You can build off of [Part 1](https://github.com/telerik/html5-dev-for-aspnet-devs/tree/master/hello-kendo-ui-part-1), or you can download the completed code
for Part 2 [here](https://github.com/telerik/html5-dev-for-aspnet-devs/tree/master/hello-kendo-ui-part-2).

To start with, return some additional data from the database. Add in the
Title, BirthDate and City Fields to the **Employee** model object. Also add a
constructor that takes in a **Data.Employee** object and maps that object to
the model properties. This will make the code in the **EmployeesController**
cleaner.

The **Employee** model object now looks like this:

### Employee Model Object

    public class Employee {

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Title { get; set; }
        public DateTime BirthDate { get; set; }
        public string City { get; set; }

        public Employee(hello_kendo_ui.Data.Employee employee) {
            this.Id = employee.EmployeeID;
            this.FirstName = employee.FirstName;
            this.LastName = employee.LastName;
            this.Title = employee.Title;
            this.BirthDate = employee.BirthDate;
            this.City = employee.City;
        }
    }

> You will need to modify the LinqToSQL context to make BirthDate a non- nullable field. That should really be fixed in the database. While it's more than possible to handle nullable dates, having a nullable BirthDate column lacks a strong use case.

The **EmployeesController** **Get** method now looks a bit different. You will
notice that it's become quite slim and consists mostly of comments by now:

### EmployeesController Get Method


    // WebAPI will respond to an HTTP GET with this method
    public Models.Response Get() {

        // the the take and skip parameters off of the incoming request
        int take = _request["take"] == null ? 10 : int.Parse(_request["take"]);
        int skip = _request["skip"] == null ? 0 : int.Parse(_request["skip"]);

        // get all of the records from the employees table in the
        // northwind database.  return them in a collection of user
        // defined model objects for easy serialization. skip and then
        // take the appropriate number of records for paging.
        var employees = (from e in _context.Employees
                         select new Models.Employee(e)).Skip(skip).Take(take).ToArray();

        // returns the generic response object which will contain the
        // employees array and the total count
        return new Models.Response(employees, _context.Employees.Count());
    }

## Enable Editing In The Grid

In order to enable full CRUD operations in the grid, you need to add the
interactive bit of UI. Kendo UI has several options for how to do this. You
can edit grid rows in a [popup](http://demos.telerik.com/kendo-ui/web/grid/editing-popup.html), or [inline](http://demos.telerik.com/kendo-ui/web/grid/editing-inline.html). You can get very
granular control over the look and feel of the editing experience with
[custom editors](http://demos.telerik.com/kendo-ui/web/grid/editing-custom.html).

For this example, I am going to use the built-in [inline](http://demos.telerik.com/kendo-ui/web/grid/editing-inline.html) editing that
comes with Kendo UI grid.

To start, open the **Default.aspx** file. On the grid, you are going to need
to specify `editable: true` With this one change, you can save the page and
launch it with Visual Studio. You will notice that when you click on a row, it
becomes editable.

### Make The Grid Editable

    editable: true

![grid_is_editable](/images/webforms/grid_is_editable.png)

To get a better editing experience, use a [command column](http://demos.telerik.com/kendo-ui/web/grid/editing-inline.html) in the grid.

In the **Default.aspx** file, add a column to the columns definition that
specifies the commands that you want to include. For this example, specify
`edit` and `destroy` Make the `title` an empty string.

Also format the DateTime that will be coming back as the **BirthDate** so that
it's a bit of a cleaner date.

### Specify Command Columns

    // specify the columns on the grid
    columns: [
        { field: "FirstName", title: "First Name" },
        { field: "LastName", title: "Last Name" },
        "Address",
        "City",
        { field: "BirthDate", title: "Birthday", format: "{0:MM/dd/yyyy}" },
        { command: ["edit", "destroy"], title: " " }
    ],

This will create **Edit** and **Delete** buttons in the last column of the
grid with no title on the column. At this point, the application will show the
buttons, but if you click on them, nothing will happen because the grid is
expecting you to click on the cell to edit the field. To fix this, change the
`editable: true` to `editable: "inline"`.

### Specify Inline Editing

    editable: "inline"

With this change, the grid will put the entire row in edit mode when you click
the "Edit" button. Also notice that the grid automatically gives you
**Cancel** and **Update** buttons when you go into edit mode. If you click the
**Delete** button, you will get a prompt asking you if you are sure you want
to delete this item.

However you will notice that the grid currently has the **BirthDate** field as
a textbox and allows you to completely null out the **LastName**. This is not
ideal. You can add constraints for column editing by specifying a model in the
schema on the DataSource.

The [Model](http://api/framework/model) object will specify a client-side model structure that can
describe the data in terms of type and validation rules.

Add a `model` to the `schema` declaration specifying that the `id` is
mapped to the "Id" field from the database. Then specify a `fields` object.
Each object in the fields can be either a simple string, or an object that
provides some more information about the model field. In order to specify that
fields are required, you will need to add a `validation` object. Also, so
that the grid will know to give you a [DatePicker](http://demos.telerik.com/kendo-ui/web/datepicker) for the
**BirthDate** column when in edit mode, specify that it's type is `date`.

### Specify A Model For The DataSource

    // the schema defines the schema of the JSON coming
    // back from the server so the datasource can parse it
    schema: {
    // the array of repeating data elements (employees)
    data: "Data",
    // the total count of records in the whole dataset. used
    // for paging.
    total: "Count",
    model: {
        id: "Id",
        fields: {
            FirstName: { editable: false },
            LastName: { editable: true, nullable: false, validation: { required: true} },
            Address: { editable: true, nullable: false, validation: { required: true} },
            City: { editable: true, nullable: false, validation: { required: true} },
            BirthDate: { editable: true, type: "date" }
        }
    }

In the above declaration, the **FirstName** field is additionally marked as
being not editable.

Run the application now and notice that when you put the grid into edit mode
you get a Kendo UI [DatePicker](http://demos.telerik.com/kendo-ui/web/datepicker) for the **BirthDate** column. You also
can't edit the **FirstName** column. If you try and null out the **LastName**
field, the grid will display a popup message telling you that the **LastName**
is required.

![grid_is_editable_with_model](/images/webforms/grid_is_editable_with_model.png)

If you wanted to tweak this validation message, you could change the model
definition for the **LastName** to look like this:

### A Custom Validation Message

    LastName: {
        editable: true,
        nullable: false,
        validation: {
            required: {
                message: "Please enter a last name for this employee"
            }
        }
    }

## Specify CRUD Endpoints In The Grid

Right now the grid looks like it's editable, but it really isn't because it's
not connected to the server in any way. The first step in doing that is
specifying the `update` and `destroy` objects on the transport. The
endpoints that we are going to be calling are very RESTful. This means that
the `update` action will be at `api/employees/id` with an HTTP verb of
**POST**. An example request might be `http://myapp.com/api/employees/31`
This will update the employee with an Id of 31, sending in all of the
information to update.

The `delete` method needs to be handled in much the same way, except that
it's `type` is **DELETE**. We also don't use `delete` as the object name
because "delete" is a reserved keyword in JavaScript.  We use `destroy`
instead.

The required `Id` parameter can be retrieved by setting the `url` portion
of the transport to a function. Kendo UI will automatically pass in the
current model item to these functions off of which you can get the `Id`

### Add update, create and destroy To The Transport

    // the transport tells the datasource what endpoints
    // to use for CRUD actions
    transport: {
        read: "api/employees",
        update: {
            url: function (employee) {
                return "api/employees/" + employee.Id
            },
            type: "POST"
        },
        destroy: {
            url: function (employee) {
                return "api/employees/" + employee.Id
            },
            type: "DELETE"
        }
    }

## Handle CRUD Operations On The Server

The next step is to handle the different HTTP request types in the
**EmployeesController**. Since this project built off of **Hello Services**,
the **DELETE** type is already handled. You just need to add one for
`update` In this method, you are going to select the employee that needs to
be updated from the database based on the `id` parameter that is passed in.
Then set the fields one by one based on the request parameters.

Since you cannot rely on client side validation (as anything in the browser
can be circumvented), check to make sure the fields are not null before you
assign them to the database object. Also make sure that the date is valid.

You only need to return a status message of "OK" or 200 to the grid for it to
know that the update succeeded. You can do that by using the
`HTTPResponseMessage` object. If the update succeeds, return a 200. If it
fails, return a 500 and give a little more info in the response body about
what went wrong.

### Add POST To The Transport


    public HttpResponseMessage Post(int id) {
        // create a response message to send back
        var response = new HttpResponseMessage();
        try {
            // select the employee from the database where the id
            // matches the one passed in at api/employees/id
            var employeeToUpdate = (from e in _context.Employees
                                    where e.EmployeeID == id
                                    select e).FirstOrDefault();

            // if there was an employee returned from the database
            if (employeeToUpdate != null) {

                // update the employee object handling null values or empty strings
                employeeToUpdate.LastName = string.IsNullOrEmpty(_request["LastName"]) ? employeeToUpdate.LastName : _request["LastName"];
                employeeToUpdate.Address = string.IsNullOrEmpty(_request["Address"]) ? employeeToUpdate.Address : _request["Address"];
                employeeToUpdate.City = string.IsNullOrEmpty(_request["City"]) ? employeeToUpdate.City : _request["City"];
                employeeToUpdate.BirthDate = string.IsNullOrEmpty(_request["BirthDate"]) ? employeeToUpdate.BirthDate : Convert.ToDateTime(_request["BirthDate"]);

                // submit the changes to the database
                _context.SubmitChanges();

                // set the server response to OK
                response.StatusCode = HttpStatusCode.OK;
            }
            else {
                // we couldn't find the employee with the passed in id
                // set the response status to error and return a message
                // with some more info.
                response.StatusCode = HttpStatusCode.InternalServerError;
                response.Content = new StringContent(string.Format("The employee with id {0} was not found in the database", id.ToString()));
            }
        } catch (Exception ex) {
            // something went wrong - possibly a database error. return a
            // 500 server error and send the details of the exception.
            response.StatusCode = HttpStatusCode.InternalServerError;
            response.Content = new StringContent(string.Format("The database updated failed: {0}", ex.Message));
        }

        // return the HTTP Response.
        return response;
    }

Test this method out by going to the grid and editing an item. Note that if
you don't make any changes, the grid will not make a request to the server.
Open the developer tools (F12) and switch to the Network Tab. If it tells you
to refresh to start capturing requests, do so. Place the grid in edit mode and
make an update to a field,then click the **Update** button.

You should see an error in the Network requests. If you click into the error,
it should be telling you that it was unable to convert the BirthDate to a
valid DateTime. If you examine the parameters of the request, you will see
that indeed a very strange date format has been sent back by the server.

![grid_bad_datetime](/images/webforms/grid_bad_datetime.png)

This is because Dates (which are notoriously awful to work with) are formatted
for JavaScript. You need to get the date formatted correctly. To do this, add
a `parameterMap` method to the `transport` on the DataSource. The
`parameterMap` takes in two parameters: `options` and `operation` The
`options` will be the parameters as Kendo UI is about to try to send them.
The `operation` will be either a `read` `update` `create` or
`destroy` You ALWAYS need to return at least `options` out of this
function when you specify it. In this case, check for the `update`
operation. If the current operation is indeed an update, format the date and
reset the parameter value on the options.

### Cleanse The BirthDate In The Parameter Map

    // the transport tells the datasource what endpoints
    // to use for CRUD actions
    transport: {
        read: "api/employees",
        update: {
            url: function (employee) {
                return "api/employees/" + employee.Id
            },
            type: "POST"
        },
        destroy: {
            url: function (employee) {
                return "api/employees/" + employee.Id
            },
            type: "DELETE"
        },
        parameterMap: function (options, operation) {

            // if the current operation is an update
            if (operation === "update") {
                // create a new JavaScript date object based on the current
                // BirthDate parameter value
                var d = new Date(options.BirthDate);
                // overwrite the BirthDate value with a formatted value that WebAPI
                // will be able to convert
                options.BirthDate = kendo.toString(new Date(options.BirthDate), "MM/dd/yyyy");
            }

            // ALWAYS return options
            return options;
        }
    }

The `update` should now work flawlessly.

### Other Ways Of Raising Errors

There is more than one way to tell Kendo UI that there has been an error. All
you really need to do is to provide a return value for an `errors` field in
the model. Modify the `Models.Response` object to have an `Errors` field.
Additionally, add a constructor that takes in just an `error` parameter and
sets the value, and a constructor that takes no parameters.

### Add Errors Field To The Response Object


    public class Response {

        public Array Data { get; set; }
        public int Count { get; set; }
        public string Errors { get; set; }

        public Response(Array data, int count) {
            this.Data = data;
            this.Count = count;
        }

        public Response(string errors) {
            this.Errors = errors;
        }
    }

In the case that the update succeeds, you can return an empty
`Models.Response` object. If it fails, you will set the value of the
`Errors` field on the `Models.Response` object.

### Return An Errors Property On Error


    public Models.Response Delete(int id) {

        try {
            // retrieve the employee to update from the database
            // based on the parameter passed in from api/employees/id
            var employeeToDelete = (from e in _context.Employees
                                    where e.EmployeeID == id
                                    select e).FirstOrDefault();

            // if a valid employee object was found by id
            if (employeeToDelete != null) {
                // mark the object for deletion
                _context.Employees.DeleteOnSubmit(employeeToDelete);
                // delete the object from the database
                _context.SubmitChanges();

                // return an empty Models.Response object (this returns a 200 OK)
                return new Models.Response();
            } else {
                // otherwise set the error field of a response object and return it.
                return new Models.Response(string.Format("The employee with id {0} was not found in the database", id.ToString()));
            }
        }
        catch (Exception ex) {
            // something went wrong. set the errors field of
            return new Models.Response(string.Format("There was an error updating employee with id {0}: {1}", id.ToString(), ex.Message));
        }
    }

Now you need to modify the schema to map the `Errors` property of the
response to the `errors` field. When this field has a value, it will
automatically raise the `error` event on the DataSource. Specify an action
here for that as well.

Of course you don't want to do things differently on the `update` and
`delete` but I wanted to show you more than one way to accomplish the same
thing.

### Map The Errors Field In The Schema


    // the schema defines the schema of the JSON coming
    // back from the server so the datasource can parse it
    schema: {
        // the array of repeating data elements (employees)
        data: "Data",
        // the total count of records in the whole dataset. used
        // for paging.
        total: "Count",
        model: {
            id: "Id",
            fields: {
                FirstName: { editable: false },
                LastName: { editable: true, nullable: false, validation: { required: true} };
                Address: { editable: true, nullable: false, validation: { required: true} },
                City: { editable: true, nullable: false, validation: { required: true} },
                BirthDate: { editable: true, type: "date" }
            }
        },
        // map the errors if there are any. this automatically raises the "error"
        // event
        errors: "Errors"
        }
    }
    error: function (e) {
        alert(e.errors);
    }

### Handling Errors

In the above scenario, the error is simply thrown out to the screen. In fact,
if you try to delete certain people from the **Employees** table - like Nancy
Davalio - you will get an error back from the server.

![sample_error](/images/webforms/sample_error.png)

**DO NOT EVER EXPOSE THIS MUCH INFORMATION ABOUT YOUR DATABASE TO THE USER!**

You will want to pick a notification strategy and standard error platform.
It's better to just log the error and give the user only the information that
they need. The delete failed because Nancy has related records in the Orders
table.

You will also notice that if you didn't throw the error, the user would never
know that the `delete` failed because the row has disappeared from the grid.
This is not what you want. However the DataSource needs to know how to handle
this situation. It's currently storing the object as dirty and will try to
sync it again when it gets the chance. In this situation, it's best to simply
rollback the change by calling `cancelChanges` on the DataSource. This can
also be called directly on the grid.

### Cancel The Changes On A Failed Request

    error: function (e) {
        alert("The action failed. Please see the logs.");
        this.cancelChanges();
    }

This will rollback the changes to the grid and put the row back.

## Wrap Up

You have now learned how to do grid actions on the server (like paging), as
well as how to handle grid editing and failed requests. Download the finished
code for this module [here](https://github.com/telerik/html5-dev-for-aspnet-devs/tree/master/hello-kendo-ui-part-2).

   [2]: https://github.com/telerik/html5-dev-for-aspnet-devs/tree/master/hello-kendo-ui-part-1

   [3]: https://github.com/telerik/html5-dev-for-aspnet-devs/tree/master/hello-kendo-ui-part-2

   [4]: http://demos.telerik.com/kendo-ui/web/grid/editing-popup.html

   [5]: http://demos.telerik.com/kendo-ui/web/grid/editing-inline.html

   [6]: http://demos.telerik.com/kendo-ui/web/grid/editing-custom.html

   [9]: http://api/framework/model

   [10]: http://demos.telerik.com/kendo-ui/web/datepicker
