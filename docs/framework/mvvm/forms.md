---
title: MVVM-Bound Forms
page_title: Build MVVM-Bound Forms With Kendo UI
previous_url: /tutorials/mvvm-in-kendo-ui
---

# Build MVVM Bound Forms With Kendo UI

This article provides an in-depth look on collecting data from HTML forms using the [Kendo UI framework MVVM features](/framework/mvvm/overview).

### The Initial Form

This is the markup we will use as a starting point for our implementation:

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

    <div class="span4"><b>Expenses</b><hr />
        <table id="expenses">

        <table>
    </div>

### Developing With MVVM

To starting using the MVVM pattern, we need to create a view model. A view model is an observable object. This object has properties and methods.
Each property will be bound to something in the HTML. In MVVM, this binding is two way, meaning that if the binding changes on the UI, the model
changes, and vice versa.

#### The ViewModel

Here is what the `ViewModel` looks like.

	viewModel = kendo.observable({

	    // the expenses array will hold the grid values
    	expenses: [],

	    // type array populates the drop down
    	type: [
    		{ name: "Food", value: "food"},
    		{ name: "Merchant", value: "merchant"},
    		{ name: "Bills", value: "bills" }
    	],

    	// expenseType holds the currently selected value of the dropdown list
     	expenseType: "food",

     	// the values are bound to the merchant and amount fields
     	merchant: null,
     	amount: null,

     	// event to execute on click of add button
     	create: function(e) {

	        // add the items to the array of expenses
	        this.get("expenses").push({Type: this.get("expenseType"),
	                                   Merchant: this.get("merchant"),
	                                   Amount: this.get("amount")});

	        // reset the form
	        this.set("expenseType", "food");
	        this.set("merchant", "");
	        this.set("amount", "");
    	}
	});

	// apply the bindings
	kendo.bind(document.body.children, viewModel);

Let's walk through each section:

* `expenses`: Instead of using a plain HTML table to display the values from our input form, we are going to use a Kendo UI Grid. The `expenses` array holds the values that the grid will use as its source.

* `type`: Instead of defining the items inline with options in the HTML, we are going to bind a `SELECT` element to this array. We’ll also apply some Kendo UI magic to this boring dropdown.

* `expenseType`: This variable will be bound to whatever value is currently selected in the above mentioned dropdown.

* `merchant`: Bound to the value of the merchant input box.

* `amount`: Bound to the value of amount input box.

* `create`: This is the event that will be fired by the Add button. In the event handler, we are going to add the item to the expenses array and reset the form.

* `kendo.bind(document.body.children, viewModel)`: The statement that initializes the binding between the view model and the relevant HTML.

#### The View (Markup)

Now, we need to make some changes in our markup. Lets take it element by element and examine the bindings:

	<select data-role="dropdownlist" data-bind="source: type, value: expenseType" data-text-field="name" data-value-field="value">
	</select>

The `select` element now has no options. Instead, it has some new `data` attributes.

	<dt>Merchant</dt>
	<dd>
		<input id="merchant" type="text" class='k-textbox' data-bind="value: merchant" />
	</dd>

The `merchant` input has a new binding. The `data-bind=”value: merchant”` says that we want to bind the value of this input to the `merchant`
variable in the view model. We also added a `k-textbox` CSS class to it to style it using [Kendo UI
styles](/ui-widgets/appearance-styling).

	<dt>Amount</dt>
	<dd>
		<input data-role="numerictextbox" data-bind="value: amount" id="amount" type="text" />
	</dd>

The `amount` input has two new bindings: `data-role` sets the input to a [Kendo UI NumericTextBox](/web/numerictextbox/overview) and `data-bind` which binds the value to our `amount` variable.

	<button id="create" data-bind="click: create" class="k-button">Add</button>

The `Add` button has only one new change. It now has a `data-bind="click: create"`. This binds its click event to the `create` function in the view model. It’s crazy how easy this is.

	<div data-role="grid" data-sortable="true" data-bind="source: expenses"
    	 data-columns='["Type", "Merchant", "Amount"]' ></div>

This last one is the grid. Yes, this one line creates a [Kendo UI Grid](/ui-widgets/grid/walkthrough).

### The Final Result

Here is the finished product. Kendo UI bindings are keeping the UI and the model in sync as changes are made.

<iframe frameborder="0" allowfullscreen="allowfullscreen" src="http://jsfiddle.net/burkeholland/NqSuS/6/embedded/result,js,html" style="width: 100%; height: 450px;"></iframe>

Not only does MVVM keep you from having to worry about many of the manual details, it also dramatically simplifies your code so that in your JavaScript you are only working with model objects. The DOM simply reflects the changes that you make to the model.

To explore Kendo UI MVVM Features more, visit the [MVVM Overview Page](/framework/mvvm/overview) and related docs.
