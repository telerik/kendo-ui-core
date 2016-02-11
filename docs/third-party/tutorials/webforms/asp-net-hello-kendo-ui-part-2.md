---
title: Part 5 - Hello CRUD Data Operations
page_title: Part 5 - Hello CRUD Data Operations | Kendo UI Third-Party Frameworks
description: "Learn how to enable CRUD operations, handle the editing functionality and failed requests in the Kendo UI Grid widget."
slug: part5_aspnetwebforms_tutorials
position: 5
---

# Part 5 - Hello CRUD Data Operations

In this tutorial, you will learn how to fully enable the Create, Read, Update, Destroy (CRUD) data operations in the Grid and how to additionally handle errors on your server and bubble them up to the browser.

## Screencast

<iframe height="360" src="http://www.youtube.com/embed/BRv7Gvf1w6A?rel=0" frameborder="0" width="640"></iframe>

## Written Summary

You can build off of [Part 1](https://github.com/telerik/html5-dev-for-aspnet-devs/tree/master/hello-kendo-ui-part-1), or you can download the completed code for Part 2 [here](https://github.com/telerik/html5-dev-for-aspnet-devs/tree/master/hello-kendo-ui-part-2).

## Create Sample Application

To start with, return some additional data from the database. Add in the **Title**, **BirthDate** and **City** fields to the `Employee` model object. Add a constructor that takes in a `Data.Employee` object and maps that object to the model properties. This makes the code in the `EmployeesController` cleaner.

The example below demonstrates how the `Employee` model object now looks like.

###### Example

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

> **Important**
>
> Modify the LinqToSQL context to make BirthDate a non- nullable field. That should be fixed in the database. While it is more than possible to handle nullable dates, having a nullable BirthDate column lacks a strong use case.

The `EmployeesController` `Get` method now looks a bit different. Notice that it is now quite slim and consists mostly of comments, as demonstrated in the example below.

###### Example

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

<!--_-->
### Enable Editing in Grid

To enable full CRUD operations in the Grid, add the interactive bit of UI. Kendo UI has several options for how to do this. You can edit grid rows in a [popup](http://demos.telerik.com/kendo-ui/web/grid/editing-popup.html), or [inline](http://demos.telerik.com/kendo-ui/web/grid/editing-inline.html). You can get very granular control over the look and feel of the editing experience with [custom editors](http://demos.telerik.com/kendo-ui/web/grid/editing-custom.html).

This example uses the built-in [inline](http://demos.telerik.com/kendo-ui/web/grid/editing-inline.html) editing that comes with the Kendo UI Grid widget.

To start, open the `Default.aspx` file. Specify `editable: true` in the Grid, as demonstrated in the example below. With this change, you can now save the page and launch it with Visual Studio. When you click on a row, it becomes editable.

###### Example

    editable: true

**Figure 1. An editable Grid**

![grid_is_editable](/images/webforms/grid_is_editable.png)

### Use Command Columns

To get a better editing experience, use a [command column](http://demos.telerik.com/kendo-ui/web/grid/editing-inline.html) in the grid.

In the `Default.aspx` file, add a column to the columns definition that specifies the commands that you want to include. For this example, specify `edit` and `destroy` Make the `title` an empty string. Also, format the DateTime that will be coming back as the `BirthDate` to make the date cleaner.

The example below demonstrates how to specify command columns.

###### Example

    // specify the columns on the grid
    columns: [
        { field: "FirstName", title: "First Name" },
        { field: "LastName", title: "Last Name" },
        "Address",
        "City",
        { field: "BirthDate", title: "Birthday", format: "{0:MM/dd/yyyy}" },
        { command: ["edit", "destroy"], title: " " }
    ],

### Use Inline Edit Mode

This will create the **Edit** and **Delete** buttons in the last column of the Grid with no title on the column. At this point, the application shows the buttons. However, if you click them, nothing happens, because the Grid is expecting you to click on the cell to edit the field. To fix this, change the `editable: true` to `editable: "inline"`, as demonstrated in the example below.

###### Example

    editable: "inline"

With this change, the Grid puts the entire row in edit mode when you click the **Edit** button. Notice that the Grid automatically gives you **Cancel** and **Update** buttons when you go into the edit mode. If you click **Delete**, you get a prompt asking you if you are sure you want to delete this item.

### Specify Model for DataSource

However, you will notice that the Grid currently has the `BirthDate` field as a textbox and allows you to completely null out the **LastName**. This is not ideal. You can add constraints for column editing by specifying a model in the schema on the DataSource. The [`Model`](http://api/framework/model) object specifies a client-side model structure that can describe the data in terms of type and validation rules.

Add a `model` to the `schema` declaration specifying that the `id` is mapped to the **Id** field from the database. Then specify a `fields` object. Each object in the fields can be either a simple string, or an object that provides some more information about the `model` field. To specify that fields are required, add a `validation` object. Also, specify that its type is `date`, so that the Grid gives you a [DatePicker](http://demos.telerik.com/kendo-ui/web/datepicker) for the **BirthDate** column when in edit mode.

The example below demonstrates how to specify a model for the DataSource.

###### Example

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

In the above declaration, the `FirstName` field is additionally marked as being not editable.

Run the application now and notice that when you put the grid into edit mode you get a Kendo UI [DatePicker](http://demos.telerik.com/kendo-ui/web/datepicker) for the **BirthDate** column. You cannot edit the **FirstName** column either. If you try and null out the **LastName** field, the Grid displays a popup message telling you that the **LastName** is required.

**Figure 2. An editable Grid with model**

![grid_is_editable_with_model](/images/webforms/grid_is_editable_with_model.png)

If you want to tweak this validation message, change the model definition for the **LastName** so it looks like the one demonstrated in the example below.

###### Example

    LastName: {
        editable: true,
        nullable: false,
        validation: {
            required: {
                message: "Please enter a last name for this employee"
            }
        }
    }

### Set CRUD Endpoints in Grid

Right now the Grid seems to be editable, but is actually not, because it is not connected to the server in any way. The first step in doing that is specifying the `update` and `destroy` objects on the transport. The endpoints that you are going to call are very RESTful. This means that the `update` action is at `api/employees/id` with an HTTP verb of `POST`. See an example request [here](http://myapp.com/api/employees/31). This updates the employee with an `Id` of 31, sending in all of the information to update.

The `delete` method needs to be handled in much the same way, except that its `type` is `DELETE`. Do not use `delete` as the object name because `delete` is a reserved keyword in JavaScript. Use `destroy` instead.

The required `Id` parameter can be retrieved by setting the `url` portion of the transport to a function. Kendo UI automatically passes in the current model item to these functions off of which you can get the `Id`.

The example below demonstrates how to add updates, create, and destroy to the transport.

###### Example

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

## Handle CRUD Operations Server-Side

The next step is to handle the different HTTP request types in the `EmployeesController`. Since this project builds off of [Hello Services]({% slug part2_halloservices_aspnetwebforms_tutorials %}), the `DELETE` type is already handled. Just add one for `update`. In this method, you are going to select the employee that needs to be updated from the database based on the `id` parameter that is passed in. Then set the fields one by one based on the request parameters.

Since you cannot rely on client-side validation, as anything in the browser can be circumvented, check to make sure the fields are not null before you assign them to the database object. Also, make sure that the date is valid. Return a status message of **OK** or **200** to the Grid for it to know that the update succeeded. You can do that by using the `HTTPResponseMessage` object. If the update succeeds, return a **200**. If it fails, return a **500** and give a little more info in the response body about what went wrong.

The example below demonstrates how to add `POST` to the transport.

###### Example

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

<!--_-->
Test this method out by going to the Grid and editing an item. If you do not make any changes, the Grid is not going to make a request to the server. Open the Developer Tools by pressing `F12`, and switch to the **Network** tab. If it tells you to refresh to start capturing requests, do so. Place the Grid in edit mode and make an update to a field. Click **Update**.

You are expected to see an error in the Network requests. If you click into the error, it tells you that it was unable to convert the BirthDate to a valid DateTime. If you examine the parameters of the request, you see that some strange date format has been sent back by the server.

**Figure 3. Strange date format appearing in the Grid**

![grid_bad_datetime](/images/webforms/grid_bad_datetime.png)

This is because Dates are formatted for JavaScript and you need to get the date formatted correctly. To do so, add a `parameterMap` method to the `transport` on the DataSource. The `parameterMap` takes in two parameters: `options` and `operation`. `options` are the parameters as Kendo UI is about to try to send them. `operation` is `read`, `update`, `create`, or `destroy`. You must always return at least `options` out of this function when you specify it. In this case, check for the `update` operation. If the current operation is indeed an update, format the date and reset the parameter value on the options.

The example below demonstrates how to cleanse the  BirthDate in the parameter map.

###### Example

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

The `update` is now expected to work flawlessly.

### Raise Errors in Other Ways

There is more than one way to tell Kendo UI that there has been an error. All you must do is provide a return value for an `errors` field in the model. Modify the `Models.Response` object to have an `Errors` field. Additionally, add a constructor that takes in just an `error` parameter and sets the value, and a constructor that takes no parameters.

The example below demonstrates how to add an `Errors` field  to the response object.

###### Example

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


If the update succeeds, you can return an empty `Models.Response` object. If it fails, set the value of the `Errors` field on the `Models.Response` object.

The example below demonstrates how to return an `Errors` property on error.

###### Example

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

<!--_-->
Now modify the `schema` to map the `Errors` property of the response to the `Errors` field. When this field has a value, it will automatically raise the `error` event on the DataSource. Specify an action here for that as well.

This demonstration is made for the sake of showing how to do things differently on the `update` and `delete` for accomplishing the same thing. The example below demonstrates how to map the `errors` field int he `schema`.  

###### Example

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

### Handle Errors

In the above scenario, the error is thrown out to the screen. If you try to delete certain people from the **Employees** table, i.e. Nancy Davalio, you get an error back from the server.

**Figure 4. A sample server error**

![sample_error](/images/webforms/sample_error.png)

> **Important**
>
> You must never expose so much information about your database to the user.

Pick a notification strategy and a standard error platform. It is better to just log the error and give the user only the information that they need. The deletion failed because Nancy has related records in the **Orders** table.

If you did not throw the error, the user is not aware that the `delete` failed because the row has disappeared from the grid. This is not what you want. However, the DataSource needs to know how to handle this situation. It is currently storing the object as dirty and is going to try and sync it again when it gets the chance. In this situation, it is best to rollback the change by calling `cancelChanges` on the DataSource. This can also be called directly on the Grid.

The example below demonstartes how to cancel changes on a failed request.

###### Example

    error: function (e) {
        alert("The action failed. Please see the logs.");
        this.cancelChanges();
    }

The code above roll backs the changes made to the Grid and puts the row back.

## Further Reading

Download the finished code for this module from [here](https://github.com/telerik/html5-dev-for-aspnet-devs/tree/master/hello-kendo-ui-part-2).

Build on this tutorial by gradually adding more advanced functionalities to this application and consider the information from these pages:

* [Hello Kendo UI Tutorial Part 1 on GitHub](https://github.com/telerik/html5-dev-for-aspnet-devs/tree/master/hello-kendo-ui-part-1)
* [Hello Kendo UI Tutorial Part 2 on GitHub](https://github.com/telerik/html5-dev-for-aspnet-devs/tree/master/hello-kendo-ui-part-2)
* [Kendo UI Grid Editing Functionality in Popups](http://demos.telerik.com/kendo-ui/web/grid/editing-popup.html)
* [Kendo UI Grid Editing Functionality Inline](http://demos.telerik.com/kendo-ui/web/grid/editing-inline.html)
* [Kendo UI Grid Custom Editing](http://demos.telerik.com/kendo-ui/web/grid/editing-custom.html)
* [JavaScript `model` API](/api/javascript/data/model)
* [Kendo UI DatePicker Demo Online](http://demos.telerik.com/kendo-ui/web/datepicker)

## See Also

Tutorials on how to build an HTML application in ASP.NET:

* [Part 1 - Hello jQuery]({% slug part1_aspnetwebforms_tutorials %})
* [Part 2 - Hello Services]({% slug part2_halloservices_aspnetwebforms_tutorials %})
* [Part 3 - Hello HTML5]({% slug part3_aspnetwebforms_tutorials %})
* [Part 4 - Hello Kendo UI]({% slug part4_aspnetwebforms_tutorials %})
