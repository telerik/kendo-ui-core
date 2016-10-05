---
title: Create and Edit Orders
page_title: Create and Edit Orders | Kendo UI Sales Hub Tutorial
description: "Learn how to create and edit customer orders in the Kendo UI Sales Hub project by using Telerik UI for ASP.NET MVC."
previous_url: /tutorials/asp.net/saleshub/order-page/kendo-saleshub-creating-and-editing-orders
slug: createeditorders_saleshubtutorial_aspnetmvc
position: 1
---

# Create and Edit Orders

Since there are many similarities between the create and edit views of an Order, this article demonstrates how both of them work.

**Figure 1. A screenshot of the Kendo UI Sales Hub Orders page**

![kendo-saleshub-order-edit-screenshot](/aspnet-mvc/tutorial-saleshub/order-page/images/kendo-saleshub-order-edit-screenshot.png)

## Set up the Partial View for an Order

Since the contents of the Edit and New view for Orders are nearly the same, content-wise, we created
a MVC partial view which contains the markup that is shared between the views. This partial view
can be found in **Views/Order/_Order.cshtml**.

## Set up the basic Order fields

![kendo-saleshub-order-info-screenshot](/aspnet-mvc/tutorial-saleshub/order-page/images/kendo-saleshub-order-info-screenshot.png)

The first part of the form is where we declare the fields where the user can set the contract weight/amount,
date, and the order number for the given order. For the sake of brevity, we'll only cover the fields which
use Kendo UI widgets.

    <div>
        @Html.LabelFor(m => m.ContractWeight, "Contract Weight:")
        @Html.Kendo().NumericTextBoxFor(m => m.ContractWeight).Decimals(2).Min(1).Deferred()
        @Html.ValidationMessageFor(m => m.ContractWeight)
    </div>

Here we create a [Kendo NumericTextBox](http://demos.telerik.com/kendo-ui/web/numerictextbox/index.html) for the ContractWeight
property of an Order. The numeric textbox is set up to only support two decimal places and the user must enter a value
which is greater than or equal to one.

The `Deferred()` call makes the Kendo UI MVC extensions wait on injecting the necessary JavaScript into the page
in order to setup the widget. The normal workflow for the extensions is automatically inserting
a `<script>` tag, which contains the JavaScript needed to setup the element as a Kendo widget, right after the
element you want to be a Kendo widget. Deferring the creation of this script tag means that you're in charge of telling
the extensions when it should generate the JavaScript for the deferred widgets. To make the extensions generate the
JavaScript for the deferred widgets, you have to call `@Html.Kendo().DeferredScripts()`. The standard convention for
`<script>` tags is to add them at the end of the `<body>`, so this is the recommended place for calling the
`DeferredScripts` function.

    <div>
        @Html.LabelFor(m => m.OrderDate, "Order Date:")
        @Html.Kendo().DatePickerFor(m => m.OrderDate).Deferred()
        @Html.ValidationMessageFor(m => m.OrderDate)
    </div>

Here we set up a [Kendo DatePicker](http://demos.telerik.com/kendo-ui/web/datepicker/index.html) for the OrderDate of an Order.

    <div>
        @Html.LabelFor(m => m.CurrencyTypeId, "Invoicing Currency:")
        @Html.Kendo().DropDownListFor(m => m.CurrencyTypeId).BindTo(Model.CurrencyTypesSelectList).Deferred()
    </div>

To create the currency dropdown we use a [Kendo DropDownList](http://demos.telerik.com/kendo-ui/web/dropdownlist/index.html),
which we bind to server-side using the `BindTo` function. The `BindTo` function takes `IEnumerable<SelectListItem>`
as a parameter and will cause the extensions to generate the markup for the underlying `<select>` server-side.

## Set up the TabStrip

![kendo-saleshub-order-tabstrip-screenshot](/aspnet-mvc/tutorial-saleshub/order-page/images/kendo-saleshub-order-tabstrip-screenshot.png)

The next part of the Orders view is the [Kendo TabStrip](http://demos.telerik.com/kendo-ui/web/tabstrip/index.html), which contains
the grids for Order details and notes.

    @if (!Model.IsNew)
    {
        <!-- TabStrip contents -->
    }

The [Kendo TabStrip](http://demos.telerik.com/kendo-ui/web/tabstrip/index.html) is only displayed when we're editing an Order, not
when we're creating one.

    <div id="detailLinesTabStrip">
        <ul>
            <li class="k-state-active">Details</li>
            <li>Notes</li>
        </ul>
        <div>
            <!-- Order details grid -->
        </div>
        <div>
            <!-- Order notes grid -->
        </div>
    </div>
    @Html.Kendo().TabStrip().Name("detailLinesTabStrip").Deferred()

To setup the [Kendo TabStrip](http://demos.telerik.com/kendo-ui/web/tabstrip/index.html) we first have to write some basic HTML markup
that tells the tabstrip what its tabs are and what content goes into each tab. To do this we declare a `<ul>` as the first
child element of the `<div>` that we would like to be a tabstrip.

    <ul>
        <li class="k-state-active">Details</li>
        <li>Notes</li>
    </ul>

This tells the tabstrip that we want one tab to be called "Details" and another tab to be called "Notes". The `class="k-state-active"`
tells the tabstrip that that is the tab that you would like it to have selected by default.

> If you don't specify a default selected tab, then no tab will be selected when the page loads.

Next we have to declare the contents for each tab. This is done by adding `<div>`'s with the content you would like in each tab,
after the `<ul>`. The ordering of these `<div>`'s is important, as the tabstrip will render them as content for tabs in the
same order that the tabs appear.

Now that we've declared the markup for our tabstrip we can turn it into one.

    @Html.Kendo().TabStrip().Name("detailLinesTabStrip").Deferred()

Normally the `Name()` function call will tell the extensions to generate an HTML element with an `id` as that, but we can also use
it to tell the extensions to use an existing element element on the page. In our case we point it to the `detailLinesTabStrip` div
that we declared just above.

## Set up the Order details grid

Order details represent the line items for each Order. The total amount/weight of all of the Order details for an Order should be equal
to the Contract weight/amount of an Order. The Order details grid allows a user to create/edit Order details using the "PopUp" editor
mode for a [Kendo Grid](http://demos.telerik.com/kendo-ui/web/grid/index.html). The following snippets will only cover how the Order details grid
is created using the extensions. If you would like to read more on how the "PopUp" editor is configured for the grid, please read
[Creating and Editing Order Details](kendo-saleshub-creating-and-editing-order-details).

    @(Html.Kendo().Grid<OrderDetailViewModel>()
        .Name("orderDetailsGrid")
        .Columns(columns =>
        {
            columns.Bound(p => p.Origin).Title("Origin").Filterable(false);
            columns.Bound(p => p.Units).Title("Units").Filterable(false).ClientFooterTemplate("Total units: #= sum #");
            columns.Bound(p => p.UnitWeight).Title("Unit Weight").Filterable(false);
            columns.Bound(p => p.NetWeight).Title("Net Wt").Filterable(false).ClientFooterTemplate("Total weight: #= kendo.toString(sum, 'n') #");
            columns.Bound(p => p.PricePerUnitOfWeight).Title("Price").ClientTemplate("#= kendo.toString(PricePerUnitOfWeight, 'c2') #").Filterable(false);
            columns.Bound(p => p.TotalAmount).Title("Amount").ClientTemplate("#= kendo.toString(TotalAmount, 'c2') #").ClientFooterTemplate("Total amount: #= kendo.toString(sum, 'c2') #");
            columns.Command(command => { command.Edit(); command.Destroy(); });
        })
        .Filterable()
        .ToolBar(toolbar => toolbar.Create())
        .Editable(editable => editable.Mode(GridEditMode.PopUp))
        .Selectable(settings => settings.Mode(GridSelectionMode.Single))
        .Events(events => events.Save("window.SalesHub.OrderDetailsGrid_Save"))
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(builder => builder.Url("/api/CustomerOrderDetails/GetOrderDetails/" + Model.OrderId).Type(HttpVerbs.Get))
            .Create(builder => builder.Url("/api/CustomerOrderDetails/CreateOrderDetail/" + Model.OrderId).Type(HttpVerbs.Put))
            .Update(builder => builder.Url("/api/CustomerOrderDetails/UpdateOrderDetail").Type(HttpVerbs.Post))
            .Destroy(builder => builder.Url("/api/CustomerOrderDetails/DeleteOrderDetail").Type(HttpVerbs.Delete))
            .Model(model => {
                model.Id(x => x.OrderDetailId);
                model.Field(m => m.OrderDetailId).DefaultValue(0);
            })
            .Events(events =>  events.Error("window.SalesHub.OrderDetails_Error").Change("window.SalesHub.OrderDetails_Change"))
            .ServerOperation(false)
            .Aggregates(a => a.Add(x => x.Units).Sum())
            .Aggregates(a => a.Add(x => x.NetWeight).Sum())
            .Aggregates(a => a.Add(x => x.TotalAmount).Sum())
        ).Deferred())

Let's step through this grid declaration and see what each part does.

    @(Html.Kendo().Grid<OrderDetailViewModel>()
        .Name("orderDetailsGrid")

The first part is the standard boilerplate which is used to create any Kendo UI widget using the extensions. The `Grid<OrderDetailViewModel>` tells
the extensions that the grid will be bound against `OrderDetailViewModel`'s.

    .Columns(columns =>
    {
        columns.Bound(p => p.Origin).Title("Origin").Filterable(false);
        columns.Bound(p => p.Units).Title("Units").Filterable(false).ClientFooterTemplate("Total units: #= sum #");
        columns.Bound(p => p.UnitWeight).Title("Unit Weight").Filterable(false);
        columns.Bound(p => p.NetWeight).Title("Net Wt").Filterable(false).ClientFooterTemplate("Total weight: #= kendo.toString(sum, 'n') #");
        columns.Bound(p => p.PricePerUnitOfWeight).Title("Price").ClientTemplate("#= kendo.toString(PricePerUnitOfWeight, 'c2') #").Filterable(false);
        columns.Bound(p => p.TotalAmount).Title("Amount").ClientTemplate("#= kendo.toString(TotalAmount, 'c2') #").ClientFooterTemplate("Total amount: #= kendo.toString(sum, 'c2') #");
        columns.Command(command => { command.Edit(); command.Destroy(); });
    })

Here we set up each column for the Grid. Calling `Filterable(false)` allows you to selectively choose when a column cannot be filtered by the user.

Calling `ClientFooterTemplate` allows you to specify a footer which is displayed for the specified column. In our case these footer templates
make use of the [DataSource aggregates](/api/framework/datasource#configuration-aggregate) that we set up, later on, in our DataSource. As the
client footer templates are bound client-side we use [Kendo's template syntax](/api/framework/kendo#methods-template) to tell it which aggregate
to display the result of (in our case we only bind against a `sum` aggregate).

The last column is a command column and we use the Grid's built-in `Edit` and `Destroy` commands.

    .Filterable()
    .ToolBar(toolbar => toolbar.Create())
    .Editable(editable => editable.Mode(GridEditMode.PopUp))
    .Selectable(settings => settings.Mode(GridSelectionMode.Single))
    .Events(events => events.Save("window.SalesHub.OrderDetailsGrid_Save"))

Next we specify that the grid is filterable and we have the grid add a "Create new item" to the Toolbar. We also tell the grid to run in `PopUp`
edit mode and that the user can select a whole row at a time. Lastly, we subscribe to the `Save` event of the grid. We do this because the
`TotalAmount` for an OrderDetailViewModel is a computed property and we need to update it any time the user updates the order detail.

The event handler for this very simple:

    window.SalesHub.OrderDetailsGrid_Save = function(e) {
        e.model.set("TotalAmount", e.model.Units * e.model.PricePerUnitOfWeight);
    };

When the user updates an order detail, we find the modified order detail by accessing the `model` property on the event object
that our handler receives. Using this, we `set` the new value of `TotalAmount` based on the new values of the `Units` and `PricePerUnitOfWeight`
properties.

> Since the `model` is a Kendo Observable, we need to call the `set` function on it when we update the property, because we want these
changes to be reflected in the Grid. If we don't call set, then the data bindings that the grid uses internally to display the data won't
be updated.

    .DataSource(dataSource => dataSource
        .Ajax()
        .Read(builder => builder.Url("/api/CustomerOrderDetails/GetOrderDetails/" + Model.OrderId).Type(HttpVerbs.Get))
        .Create(builder => builder.Url("/api/CustomerOrderDetails/CreateOrderDetail/" + Model.OrderId).Type(HttpVerbs.Put))
        .Update(builder => builder.Url("/api/CustomerOrderDetails/UpdateOrderDetail").Type(HttpVerbs.Post))
        .Destroy(builder => builder.Url("/api/CustomerOrderDetails/DeleteOrderDetail").Type(HttpVerbs.Delete))
        .Model(model => {
            model.Id(x => x.OrderDetailId);
            model.Field(m => m.OrderDetailId).DefaultValue(0);
        })
        .Events(events =>  events.Error("window.SalesHub.OrderDetails_Error").Change("window.SalesHub.OrderDetails_Change"))
        .ServerOperation(false)
        .Aggregates(a => a.Add(x => x.Units).Sum())
        .Aggregates(a => a.Add(x => x.NetWeight).Sum())
        .Aggregates(a => a.Add(x => x.TotalAmount).Sum())
    )

Now we set up the [Kendo DataSource](http://demos.telerik.com/kendo-ui/web/datasource/index.html) for the Grid. As we're going to be
using a remote data service, we need to call `Ajax()` first.

    .Read(builder => builder.Url("/api/CustomerOrderDetails/GetOrderDetails/" + Model.OrderId).Type(HttpVerbs.Get))
    .Create(builder => builder.Url("/api/CustomerOrderDetails/CreateOrderDetail/" + Model.OrderId).Type(HttpVerbs.Put))
    .Update(builder => builder.Url("/api/CustomerOrderDetails/UpdateOrderDetail").Type(HttpVerbs.Post))
    .Destroy(builder => builder.Url("/api/CustomerOrderDetails/DeleteOrderDetail").Type(HttpVerbs.Delete))

Next we set up where and how the DataSource performs its actions against the remote data service. For the `Read` and `Create`
methods we inject the `OrderId` into the URL as a path parameter. This is so our data service knows which order details to retrieve
and so it knows which order the new order detail will apply to. The data service also follows the HTTP Verb conventions of a RESTful service,
so we change what HTTP verb that DataSource should use depending on which CRUD operation it's performing.

    .Model(model => {
        model.Id(x => x.OrderDetailId);
        model.Field(m => m.OrderDetailId).DefaultValue(0);
    })

Here we tell the DataSource which property is the Id for the data it receives from the server. We also tell it what the default
value for that field is.

    .Events(events =>  events.Error("window.SalesHub.OrderDetails_Error"))

We also subscribe to the Error event of the DataSource. This is so we can handle server-side validation errors when creating/editing
order details. If you would like to read more on how this works, please read the [Creating and Editing Order Details](kendo-saleshub-creating-and-editing-order-details)
article.

    .Aggregates(a => a.Add(x => x.Units).Sum())
    .Aggregates(a => a.Add(x => x.NetWeight).Sum())
    .Aggregates(a => a.Add(x => x.TotalAmount).Sum())

Finally we set up some aggregates for a few of the properties on the model. Adding aggregates works by calling `Add()` and specifying a property on the model that the
grid is being bound against. After you `Add` an aggregate for a property you can then specify the type(s) of the aggregate which can be `Sum`, `Count`, `Min`,
`Max`, or `Average`. We use these aggregates in the footer templates for each of these that are bound to these properties.

## Set up the Order notes grid

    @(Html.Kendo().Grid<OrderNoteViewModel>()
        .Name("orderNotesGrid")
        .Columns(columns =>
        {
            columns.Bound(p => p.PostedDate).Title("Date").ClientTemplate("#= kendo.toString(PostedDate, 'G') #");
            columns.Bound(p => p.Author).Title("Author");
            columns.Bound(p => p.Note).Title("Note");
        })
        .Editable(editable => editable.Mode(GridEditMode.PopUp))
        .ToolBar(toolbar => toolbar.Create())
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(builder => builder.Url("/api/OrderNotes/GetOrderNotesForOrder/" + Model.OrderId).Type(HttpVerbs.Get))
            .Create(builder => builder.Url("/api/OrderNotes/CreateOrderNote/" + Model.OrderId).Type(HttpVerbs.Put))
            .Model(model =>
            {
                model.Id("OrderNoteId");
                model.Field(m => m.OrderNoteId).DefaultValue(0);
            })
            .ServerOperation(false)
        ).Deferred())

Setting up the Order notes grid is somewhat similar to how we set up the order details grid. Since we're display a DateTime to the user, we specify
a ClientTemplate for the `PostedDate` column which makes use of Kendo UI's [date formatting](/framework/globalization/dateformatting)
capabilities. Another difference is that we only support viewing and creating order notes, so we only provide `Read` and `Create` URLs for the
DataSource.

## Set up the Panel Bar

![kendo-saleshub-order-panelbar-screenshot](/aspnet-mvc/tutorial-saleshub/order-page/images/kendo-saleshub-order-panelbar-screenshot.png)

After the tabstrip containing the order details and order notes grid we have a [Kendo PanelBar](http://demos.telerik.com/kendo-ui/web/panelbar/index.html) which contains
the fields for editing the payment terms of an Order, along with setting invoice comments.

    <ul id="panelBar">
        <li>
            Payment Terms
            <!-- Contents for Payment Terms section -->
        </li>
        <li>
            Comments
            <!-- Contents for Comments section -->
        </li>
    </ul>
    @Html.Kendo().PanelBar().Name("panelBar").Deferred()

We set up the PanelBar by declaring its HTML structure and then telling the extensions to create a PanelBar around it. The PanelBar expects the HTML element it works
against to be a `<ul>`. Where each `<li>` is a section in the PanelBar and the first text element that appears it the title for that section. So in our case
"Payment Terms" and "Comments" will be the titles for each PanelBar section. Any element that appears after the title will be included in the contents of that section.

## Set up the Payment Terms Section

    <li>
        Payment Terms
        @Html.PartialFor("_OrderPaymentTerm", m => m.PaymentTerm1)
        @Html.PartialFor("_OrderPaymentTerm", m => m.PaymentTerm2)
        <div>
            @Html.LabelFor(m => m.PaymentTermsOverride, "Payment Term Override:")
            @Html.TextAreaFor(m => m.PaymentTermsOverride, new { @class = "k-textbox" })

            <input type="button" value="Suggested Value" id="suggestedValueButton" />
            @(Html.Kendo().Window()
                .Name("suggestedValuesWindow")
                .Visible(false)
                .Title("Suggested Values")
                .Width(200)
                .Modal(true)
                .Content(@<text>
                    @(Html.Kendo().Grid<SuggestedValue>()
                    .Name("suggestedValuesGrid")
                    .Columns(columns => columns.Bound(c => c.Value))
                    .BindTo(Model.SuggestedValues)
                    .DataSource(dataSource => dataSource
                        .Server()
                        .Model(model => model.Id(m => m.SuggestedValueId)))
                    .Selectable()
                    .Events(events => events.Change("window.SalesHub.SuggestedValuesGrid_Changed")))
                </text>))
        </div>
    </li>

To prevent having duplicate HTML markup in the payment terms section there's a Partial view which we render for each payment term that is on an Order. This
partial view can be found in **Views/Order/_OrderPaymentTerm.cshtml**.

> Since standard HTML textboxes do not look like the Kendo UI text widgets it throws off the uniform look and feel widgets on your page. To fix this
you can add the `k-textbox` class to a standard HTML text field and this will give it some of the textbox styles that Kendo UI applies to its widgets.
This can be done using MVC by specifying an additional parameter to the text widget you're creating with the MVC HtmlHelper, which is an anonymous object
with a property name of `class` and a value of `k-textbox`.

    <div class="paymentterm">
        <div>
            @Html.LabelFor(m => m.PaymentTerm.SplitPercentage, "Split:")
            @Html.Kendo().DropDownListFor(m => m.PaymentTerm.SplitPercentage).BindTo(Model.SplitPercentages).SelectedIndex(Model.SplitPercentages.FindSelected(Model.PaymentTerm.SplitPercentage.ToString("F1"))).Deferred()
        </div>
        <div>
            @Html.LabelFor(m => m.PaymentTerm.PaymentTermType, "Payment Terms:")
            @Html.Kendo().DropDownListFor(m => m.PaymentTerm.PaymentTermType.PaymentTermTypeId).BindTo(Model.PaymentTermTypes).SelectedIndex(Model.PaymentTermTypes.FindSelected(Model.PaymentTerm.PaymentTermType.PaymentTermTypeId.ToString())).Deferred()
        </div>
        <div>
            @Html.LabelFor(m => m.PaymentTerm.CreditTerms, "Credit Terms:")
            @Html.Kendo().DropDownListFor(m => m.PaymentTerm.CreditTerms).BindTo(Model.CreditTermDurations).SelectedIndex(Model.CreditTermDurations.FindSelected(Model.PaymentTerm.CreditTerms.ToString())).Deferred()
        </div>
        <div>
            @Html.LabelFor(m => m.PaymentTerm.EstPaymentDays, "Est. Payment Days After Invoice:")
            @Html.Kendo().NumericTextBoxFor(m => m.PaymentTerm.EstPaymentDays).Min(0).Max(999).Value(Model.PaymentTerm.EstPaymentDays).Decimals(0).Format("n0").Deferred()
        </div>
    </div>

The Payment Terms view mostly consists of [Kendo DropDownLists](http://demos.telerik.com/kendo-ui/web/dropdownlist/index.html) along with a
[Kendo NumericTextBox](http://demos.telerik.com/kendo-ui/web/numerictextbox/index.html). The DropDownLists are generated server-side using the
`BindTo` function and we set the selected index by calling the `SelectedIndex` function. To find which item in each dropdown needs to be
selected when the page loads, we use the `FindSelected`, which is provided by MVC. This function runs against an Enumerable of SelectListItems
and finds which SelectListItem has its `Selected` property set to true.

The last part of the Payment terms section is the Payment terms override textarea and the "Suggested Values" window and grid.

    @Html.TextAreaFor(m => m.PaymentTermsOverride, new { @class = "k-textbox" })

    <input type="button" value="Suggested Value" id="suggestedValueButton" />
    @(Html.Kendo().Window()
        .Name("suggestedValuesWindow")
        .Visible(false)
        .Title("Suggested Values")
        .Width(600)
        .Modal(true)
        .Content(@<text>
            @(Html.Kendo().Grid<SuggestedValue>()
                .Name("suggestedValuesGrid")
                .Columns(columns => columns.Bound(c => c.Value))
                .BindTo(Model.SuggestedValues)
                .DataSource(dataSource => dataSource
                    .Server()
                    .Model(model => model.Id(m => m.SuggestedValueId)))
                .Selectable()
                .Events(events => events.Change("window.SalesHub.SuggestedValuesGrid_Changed")))
        </text>))

We set up the Suggested Values window to be modal and to have a width of 600px. The contents of the window is a [Kendo Grid](http://demos.telerik.com/kendo-ui/web/grid/index.html)
which displays a list of suggested values that the user can select from. When the user selects a value from the grid, that value is copied into the payment terms override
textarea and the window is closed. In order to know when the user selects a value, we listen to the `Change` event of the Grid.

The event handler for the change event, which can be found in **Scripts/order.js**, is:

    window.SalesHub.SuggestedValuesGrid_Changed = function (e) {
        var selectedRow = this.select()[0];

        $("#PaymentTermsOverride").val($(selectedRow).find("td").text());
        $("#suggestedValuesWindow").data("kendoWindow").close();
    };

We first get the selected item in the grid by using the `select()` function on the grid (which is the `this` context in our event handler). Since
the `select` function returns an array of selected elements we index into it to get the first selected element. Since we bound the grid server-side,
the grid on the client-side doesn't actually have any `dataItem`s that we can access. This means we have to find the text of the suggested value by
using jQuery to find the `<td>` that has the text we need. Once this is done, we assign the text we found to the value of the payment terms override textarea. After
setting the value, we find the suggested values window, using jQuery, and close it.

## Setting up the Comments Section

    Comments
    <div>
        <div>
            @Html.LabelFor(m => m.IntentComments, "Intent Comments:")
            @Html.TextAreaFor(m => m.IntentComments, new { @class = "k-textbox" })
        </div>
        <div>
            @Html.LabelFor(m => m.IntentComments, "Invoice Comments:")
            @Html.TextAreaFor(m => m.InvoiceComments, new { @class = "k-textbox" })
        </div>
        <div>
            @Html.LabelFor(m => m.HeaderComments, "Header Comments:")
            @Html.TextAreaFor(m => m.HeaderComments, new { @class = "k-textbox" })
        </div>
        <div>
            @Html.LabelFor(m => m.FooterComments, "Footer Comments:")
            @Html.TextAreaFor(m => m.FooterComments, new { @class = "k-textbox" })
        </div>
    </div>

The comments section is small and simple and contains four standard HTML textareas.
