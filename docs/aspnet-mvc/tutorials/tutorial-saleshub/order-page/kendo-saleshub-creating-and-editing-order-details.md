---
title: Creating and Editing Orders Details
page_title: Tutorial SalesHub - Creating and Editing Order Details
previous_url: /tutorials/asp.net/saleshub/order-page/kendo-saleshub-creating-and-editing-order-details
---

# Tutorial: SalesHub: Creating and Editing Order Details

  - [How to Setup the Custom Order Detail Editor](#how-to-setup-the-custom-order-detail-editor)
  - [Auto Update Fields Based on Value Changes](#auto-update-fields-based-on-value-changes)
  - [Add Server-side Validation](#add-server-side-validation)
  - [Handle Errors from the Server](#handle-errors-from-the-server)

![kendo-saleshub-order-details-edit-dialog-screenshot](/aspnet-mvc/tutorial-saleshub/order-page/images/kendo-saleshub-order-details-edit-dialog-screenshot.png)

## How to Setup the Custom Order Detail Editor

Since the MVC extensions for the [Kendo Grid](http://demos.telerik.com/kendo-ui/web/grid/index.html) make use of MVC's
[EditorForModel](http://msdn.microsoft.com/en-us/library/system.web.mvc.html.editorextensions.editorformodel.aspx)
we're able to customize the editor that the grid uses by creating an Editor template. To
set up the custom editor for the grid, we first have to create a partial Razor view with the same name as the type that
we bound against the grid. If we look at how we set up the grid we can see how this works.

    @(Html.Kendo().Grid<OrderDetailViewModel>()
        .Name("orderDetailsGrid"))

Since we declared the grid to bind against `OrderDetailViewModel`'s this means we need to a create a partial view
 called `OrderDetailViewModel.cshtml`. Once we've created this partial view it needs to be moved into the
`Views/Shared/EditorTemplates`. The reason for this is that MVC will look in the `EditorTemplates` folder
when it's trying to resolve an editor for a model.

The contents of `OrderDetailViewModel.cshtml` include inputs for the fields that we would like users to be able
to edit when the `PopUp` editor for the grid is open. We'll go over a few key aspects of the OrderDetailViewModel
editor template, which can be found in `Views/Shared/EditorTemplates/OrderDetailViewModel.cshtml`. Since we've
already gone over how to set up most of the Kendo widgets that this template uses, we'll only cover the important
parts of the template.

    @model OrderDetailViewModel

Since this partial view will be displaying inputs for properties on an OrderDetailViewModel we need to set the model
for the view.

    <ul class="errors"></ul>

Since we also want to display validation errors from the server, we add a `<ul>` with a `class` of "errors",
which will be used by our custom client-side JavaScript to display the errors that we got back from the server.

    <div class="editor-label">
        @Html.LabelFor(model => model.Origin)
    </div>
    <div class="editor-field">
        @Html.Kendo().DropDownListFor(m => m.Origin).BindTo((System.Collections.IEnumerable) ViewData["Origins"]).DataTextField("Name").DataValueField("Value").OptionLabel("Select an Origin")
        @Html.ValidationMessageFor(model => model.Origin)
    </div>

Here we setup the [Kendo DropDownList](http://demos.telerik.com/kendo-ui/web/dropdownlist/index.html) for the `Origin`
property. We're using its `BindTo` function against the `Origins` property in the `ViewData`. As we're not
binding the dropdown list against `SelectListItem`s, we have to tell it which property should be used as the
text and which property should be used as the value. To do this we use the `DataTextField` and `DataValueField`
functions. Lastly we specify the `OptionLabel` for the dropdown list; this is the text that is displayed when
no value from the dropdown has been selected.

The reason we're getting the list of origins from the `ViewData` is because this partial view isn't being bound
against its data until the grid opens its editor. This means we can't use any of the values of properties on the view
model because the partial view is rendered server-side and those values don't exist yet. Another reason is because
we're getting the `OrderDetailViewModel`'s back from a remote service call, which means every `OrderDetailViewModel`
that we get back from the server would have to have all of the possible Origins stored in them. This would result in a
lot of duplicate/unneeded data being sent back to the client. To avoid all of this, we store the Origins in the
`ViewData`.

## Auto Update Fields Based on Value Changes

There are a couple of properties on an order detail which are interrelated, and when one changes we need to update the
others.

The related fields are:

* **NetWeight** - When the net weight is changed, we update the units count.

* **Units** - When the number of units is changed, we recalculate the net weight.

* **UnitWeight** - When the unit weight is updated, we recalculate the net weight.

In order to update these values we need to set up event handlers for the `Change` event of the widgets.

    @Html.Kendo().NumericTextBoxFor(model => model.NetWeight).Decimals(2).Events(events => events.Change("window.SalesHub.OrderDetailsEdit_NetWeight_Change"))

How you hook up the change event handlers is the same regardless of which Kendo UI widget is being used.

After setting up the event handlers we need to actually handle the changes events correctly.

    window.SalesHub.OrderDetailsEdit_NetWeight_Change = function(e) {
        var grid = $("#orderDetailsGrid").data("kendoGrid");
        var orderDetails = grid.editable.options.model;
        if (orderDetails.UnitWeight !== 0) {
            orderDetails.set("Units", orderDetails.NetWeight / orderDetails.UnitWeight);
        }
    };

    window.SalesHub.OrderDetailsEdit_UnitWeight_Change = function(e) {
        var grid = $("#orderDetailsGrid").data("kendoGrid");
        var orderDetails = grid.editable.options.model;
        orderDetails.set("NetWeight", orderDetails.UnitWeight * orderDetails.Units);
    };

    window.SalesHub.OrderDetailsEdit_Units_Change = function() {
        var grid = $("#orderDetailsGrid").data("kendoGrid");
        var orderDetails = grid.editable.options.model;
        orderDetails.set("NetWeight", orderDetails.UnitWeight * orderDetails.Units);
    };

Each of the event handlers has the same basic set of operations -- they find the order details grid on the
page and get the `kendoGrid` object from it. Once they have the grid, they access the order detail which
is currently being edited by the user. To do this easily we access the grid's `editable` property, which
contains an `option` property that has the order detail which is currently being edited. After we get
the order detail, we then compute and update the related value using the `set`. The reason we use the
`set` function is because the order detail is bound to the dialog using Kendo's MVVM framework, and we
want the value update to be visible to the user.

## Add Server-side Validation

On top of the validation that Kendo provides client-side, we'd also like to have some validation server-side. Using
the Kendo UI MVC extensions makes this simple to do. In the `Api/CustomerOrderDetailsController.cs` you can see how
the server-side validation is implemented.

    [HttpPost]
    public JsonResult UpdateOrderDetail([DataSourceRequest] DataSourceRequest dataSourceRequest, OrderDetailViewModel orderDetailViewModel)
    {
        var order = _orderRepository.GetOrderById(orderDetailViewModel.OrderId);

        if (order.OrderDate > orderDetailViewModel.ValueDate)
        {
            ModelState.AddModelError("OrderDate", "Order detail can't pre-date order");
        }
        if (ModelState.IsValid)
        {
            var recordToUpdate = _orderDetailRepository.GetOrderDetailById(orderDetailViewModel.OrderDetailId);
            recordToUpdate.NetWeight = orderDetailViewModel.NetWeight;
            recordToUpdate.Origin = orderDetailViewModel.Origin;
            recordToUpdate.PricePerUnitOfWeight = orderDetailViewModel.PricePerUnitOfWeight;
            recordToUpdate.Units = orderDetailViewModel.Units;
            recordToUpdate.UnitWeight = orderDetailViewModel.UnitWeight;
            recordToUpdate.ValueDate = orderDetailViewModel.ValueDate;
            recordToUpdate.PackageTypeId = int.Parse(orderDetailViewModel.PackageTypeId);
            _orderRepository.SaveChanges();
        }

        var resultData = new[] { orderDetailViewModel };
        return Json(resultData.AsQueryable().ToDataSourceResult(dataSourceRequest, ModelState));
    }

Since the datasource for the grid is sending the update request to the server, we'll be receiving both
a `DataSourceRequest` and a `OrderDetailViewModel`. Our service only does one validation check on
top of the validation that MVC does by default using any validation attributes that are the properties
of the models. We simply check to make sure that the date of the order detail does not pre-date that of
the order it's a part of. If it does pre-date the order, then we add a model error to the `ModelState`.

We only want to update the Order detail in the database if there aren't any `ModelState` errors, so we
check to make sure the `ModelState` is valid.

The datasource for the grid also expects the order detail which is being updated to be returned in the
response from the server. This is why we create an array which only contains the `OrderDetailViewModel`
that we got from the datasource.

Using this array, we convert it to a `Queryable` and use the `ToDataSourceResult` extension method that is
provided by the Kendo UI MVC extensions. This extension provides a few different overloads, but each one
requires you to at least pass in a `DataSourceRequest`. One of the overloads for this function allows you
to pass in the `ModelState` of your controller and it will use this to generate errors that it sends
back to client (if there are any errors in the `ModelState`).

![kendo-saleshub-order-details-errors](/aspnet-mvc/tutorial-saleshub/order-page/images/kendo-saleshub-order-details-errors.png)

Using your browser's developer tools, you can see how `ToDataSourceResult` formats the errors in the
`ModelState` when it generates the response. The `Errors` property of the response contains the
errors that were found in the `ModelState`. We can use these errors to display messages to user about
what fields they need to change in order to update the object.

## Handle Errors from the Server

Now that we send back any server-side validation errors we need a way of handling them client-side.
This is where the `Error` event of a datasource comes in handy. As you remember from our declaration
of the order details grid we subscribed to the `Error` event of the datsource.

    .Events(events =>  events.Error("window.SalesHub.OrderDetails_Error"))

In **Views/Order/_Order.cshtml** we also declared a
[Kendo template](http://demos.telerik.com/kendo-ui/web/templates/index.html):

    <script type="text/x-kendo-template" id="orderDetailsValidationMessageTemplate">
        # if (messages.length) { #
            <li>#=field#
                <ul>
                    # for (var i = 0; i < messages.length; ++i) { #
                        <li>#= messages[i] #</li>
                    # } #
                </ul>
            </li>
        # } #
    </script>

This template is used to display the errors from server. The template takes an object
with two properties: `field` and `messages`. The `field` property is the name of the
property on the `OrderDetailViewModel` that the errors apply to. The `messages` property
contains all of the error messages associated with the property. All this template does is
generate an `<li>` with the `field` as text and a nested `<ul>` that contains the
error messages for the `field`.

Now let's see how the event handler is set up:

    window.SalesHub.OrderDetails_Error = function (args) {
        if (args.errors) {
            var grid = $("#orderDetailsGrid").data("kendoGrid");
            var validationTemplate = kendo.template($("#orderDetailsValidationMessageTemplate").html());
            grid.one("dataBinding", function (e) {
                e.preventDefault();

                $.each(args.errors, function (propertyName) {
                    var renderedTemplate = validationTemplate({ field: propertyName, messages: this.errors });
                    grid.editable.element.find(".errors").append(renderedTemplate);
                });
            });
        }
    };

The event handler is passed an object (**args**) which contains the errors that were received from the server.
Using **args** we check to see if there are any errors that we need to process. The reason we check this is because
a datasource request can fail for reasons other than validation errors server-side (ex. network
related issues).

Next we find the order details grid on the page using jQuery and we get the `kendoGrid` object off of it. The next
thing we do is find the Kendo template that we declared earlier. To actually turn this into a real Kendo template we
need to pass the html contents of the template into `kendo.template`. This function will return a template function
that we can call later (with parameters) and it will render the template against those parameters and return the
resulting html.

Now that we have our template function we need to setup a one time event handler for the `dataBinding` event on
the grid. We do this to prevent the grid from rebinding against the data which failed
the server-side validation. To prevent the binding from occurring, we call `preventDefault()` on the event object
that we get as a parameter. To display the errors inside of the editor dialog we use
[jQuery's each](http://api.jquery.com/jQuery.each/) function to iterate over each property in the `errors`
object. Using the `validationTemplate` function, we construct a new object which has the properties that
the template uses.

Using the rendered result of the template we find the `<ul class="errors">` which is in the editor dialog and
append the result to it using jQuery. An easy way of finding the editor dialog in the DOM is use the `editable`
property on the grid. The `editable` object has a property called `element` which is a jQuery object that
points the dialog in the DOM.
