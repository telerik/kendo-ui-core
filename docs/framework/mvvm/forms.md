---
title: Building MVVM-Bound Forms
page_title: Building MVVM-Bound Forms | Kendo UI MVVM
description: "Learn how to build MVVM-bound forms with Kendo UI."
previous_url: /tutorials/mvvm-in-kendo-ui, /framework/mvvm/tutorials/forms
slug: mvvmboundforms_mvvmpattern_kendoui
position: 6
---

# Building MVVM Bound Forms

You can collect data from HTML forms by using the [Kendo UI framework MVVM features]({% slug overview_mvvmpattern_kendoui %}).

MVVM helps you avoid many of the manual details and also dramatically simplifies the code so that in JavaScript you only work with model objects. The DOM only reflects the changes that you make to the model. For more information on the Kendo UI MVVM features, refer to the [MVVM Overview article]({% slug overview_mvvmpattern_kendoui %}).

1. Create the initial form. The following example demonstrates the markup that is to be used as a starting point for the implementation of the sample case in this tutorial.

        <div class="form">
          <dl>
            <dt>Type</dt>
            <dd>
                <select id="type">
                    <option value="food">Food</option>
                    <option value="shopping">Shopping</option>
                    <option value="bills">Bills</option>
                </select>
            </dd>
            <dt>Merchant</dt>
            <dd><input id="merchant" type="text" /></dd>
            <dt>Amount</dt>
            <dd><input id="amount" type="text" /></dd>
          </dl>
            <dt>&nbsp;</dt>
            <dd><button id="create" class="k-button">Add</button></dd>
        </div>

        <table id="expenses">

        <table>

1. Declare the ViewModel. To start using the MVVM pattern, you need to create a View-Model. A View-Model is an observable object. This object has properties and methods. Each property will be bound to something in the HTML. In MVVM, this binding is a two-way one, meaning that if the binding changes on the UI, the model also changes, and vice versa.

  The following example demonstrates how to declare the `ViewModel` and what it looks like.
  * `expenses`&mdash;Instead of using a plain HTML table to display the values from the sample input form, the example is going to use a Kendo UI Grid. The `expenses` array holds the values that the grid will use as its source.
  * `type`&mdash;Instead of defining the items inline with options in the HTML, you are going to bind a `select` element to this array and also apply some Kendo UI magic to the drop-down.
  * `expenseType`&mdash;This variable will be bound to whatever value is currently selected in the above mentioned dropdown.
  * `merchant`&mdash;It is bound to the value of the merchant input box.
  * `amount`&mdash;Bound to the value of the amount input box.
  * `create`&mdash;This is the event that will be fired by the **Add** button. In the event-handler, you are going to add the item to the expenses array and reset the form.
  * `kendo.bind(document.body.children, viewModel)`&mdash;The statement that initializes the binding between the View-Model and the relevant HTML.

    	    viewModel = kendo.observable({

        	    // The expenses array will hold the Grid values.
            	expenses: [],

        	    // The type array populates the drop-down.
            	type: [
            		{ name: "Food", value: "food"},
            		{ name: "Merchant", value: "merchant"},
            		{ name: "Bills", value: "bills" }
            	],

            	// expenseType holds the currently selected value of the drop-down list.
             	expenseType: "food",

             	// The values are bound to the merchant and amount fields.
             	merchant: null,
             	amount: null,

             	// The event is to execute on clicking the Add button.
             	create: function(e) {

    	        // Add the items to the array of expenses.
    	        this.get("expenses").push({Type: this.get("expenseType"),
    	                                   Merchant: this.get("merchant"),
    	                                   Amount: this.get("amount")});

    	        // Reset the form.
    	        this.set("expenseType", "food");
    	        this.set("merchant", "");
    	        this.set("amount", "");
        	  }
        	});

        	// Apply the bindings.
        	kendo.bind(document.body.children, viewModel);

1. Update the markup. Take it element by element and examine the bindings. As demonstrated in the following example, the `select` element now has no options. Instead, it has some new `data` attributes.

    	<select data-role="dropdownlist" data-bind="source: type, value: expenseType" data-text-field="name" data-value-field="value">
    	</select>

  The `merchant` input has a new binding. The `data-bind=”value: merchant”` says that you want to bind the value of this input to the `merchant` variable in the View-Model. A `k-textbox` CSS class was also added to it to style it using [Kendo UI styles]({% slug themesandappearnce_kendoui_desktopwidgets %}).

    	<dt>Merchant</dt>
    	<dd>
    		<input id="merchant" type="text" class='k-textbox' data-bind="value: merchant" />
    	</dd>

  The `amount` input has two new `data-role` and `data-bind` bindings. The `data-role` sets the input to a [Kendo UI NumericTextBox](/web/numerictextbox/overview) and the `data-bind` binds the value to our `amount` variable.

    	<dt>Amount</dt>
    	<dd>
    		<input data-role="numerictextbox" data-bind="value: amount" id="amount" type="text" />
    	</dd>

  The `Add` button has only one new change. It now has a `data-bind="click: create"`. This binds its click event to the `create` function in the view model.

    	<button id="create" data-bind="click: create" class="k-button">Add</button>

1. Create the [Kendo UI Grid widget]({% slug overview_kendoui_grid_widget %}).

    	<div data-role="grid" data-sortable="true" data-bind="source: expenses"
        	 data-columns='["Type", "Merchant", "Amount"]' ></div>

1. Get the final result. The following example demonstrates the finished product. The Kendo UI bindings keep the UI and the model in sync as changes are made.

     ```dojo
        <div class="form">       
          <dl>
            <dt>Type</dt>
            <dd><select data-role="dropdownlist" data-bind="source: type, value: expenseType" data-text-field="name" data-value-field="value"></select></dd>
            <dt>Merchant</dt>
            <dd><input id="merchant" type="text" class='k-textbox' data-bind="value: merchant" /></dd>
            <dt>Amount</dt>
            <dd><input data-role="numerictextbox" data-bind="value: amount" id="amount" type="text" /></dd>
          </dl>
            <dt>&nbsp;</dt>
            <dd><button id="create" data-bind="click: create" class="k-button">Add</button></dd>
        </div>

        <div class="grid" data-role="grid" data-sortable="true" data-bind="source: expenses" data-columns='["Type", "Merchant", "Amount"]' data-scrollable="false"></div>

        <script>

        var viewModel = kendo.observable({

            // The expenses array will hold the grid values.
            expenses: [],

            // The type array populates the drop-down.
            type: [{ name: "Food", value: "food"}, { name: "Clothing", value: "clothing"}, { name: "Bills", value: "bills" }],

            // The expenseType holds the currently selected value of the drop-down list.
            expenseType: "food",

            // The values are bound to the merchant and amount fields.
            merchant: null,
            amount: null,

            // The event executes on clicking the Add button.
            create: function(e) {         
                // Add the items to the array of expenses.
                this.get("expenses").push({Type: this.get("expenseType"), Merchant: this.get("merchant"), Amount: this.get("amount")});

                // Reset the form.
                this.set("expenseType", "food");
                this.set("merchant", "");
                this.set("amount", "");
            }

        });

        // Apply the bindings.
        kendo.bind(document.body.children, viewModel);

        </script>

        <style>

        .form
        {
            padding: 0 2em;
        }

        .form:after
        {
            content: "";
            display: block;
            clear: both;
        }

        dl, dt, dd
        {
            margin: 0;
            padding: 0;
        }

        dt, dd
        {
            float: left;
            margin-top: 1em;
        }

        dt
        {
            clear: left;
            text-align: right;
            width: 6em;
            margin-right: 2em;
            line-height: 2.4;
        }

        .grid {
            margin: 2em;
        }

        </style>
      ```

## See Also

* [MVVM Overview]({% slug overview_mvvmpattern_kendoui %})
* [ObservableObject Overview]({% slug overview_observabeobject_kendoui %})

For detailed information on the bindings Kendo UI MVVM supports, refer to the section about [Kendo UI MVVM bindings]({% slug attributebinding_mvvm_kendoui %}).
