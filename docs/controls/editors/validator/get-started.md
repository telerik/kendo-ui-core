---
title: Getting Started
page_title: jQuery Validator Documentation - Getting Started with the Validator
description: "Get started with the jQuery Validator by Kendo UI and learn how to create, initialize, and enable the widget."
slug: getting_started_kendoui_validator_widget
position: 2
---

# Getting Started with the Validator

This guide demonstrates how to get up and running with the Kendo UI for jQuery Validator. 

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <form id="sampleForm">
      <p>
        <label for="fullname">Your Name</label>
        <input type="text" id="fullname" name="fullname" placeholder="Full name" required />
      </p>
      <p>
        <label for="age">Age</label>

        <input id="age" name="age" type="number" min="18" max="65"  required/>
        <span class="k-invalid-msg" data-for="age"></span>
      </p>
      <p>
        <label for="time">Country</label>

        <input type="text" name="country" id="country" required data-required-msg="Select a country of origin"/>
        <span class="k-invalid-msg" data-for="country"></span>
      </p> 
      <p>
        <label for="email">Email</label>

        <input type="email" id="email" name="email" placeholder="e.g. myname@example.net"  required data-email-msg="Email format is not valid" /> 
      </p> 
      <p>
      <div class="custom">
        <label for="accept">I accept the terms of service.</label>
        <input type="checkbox" id="accept" name="Accept" required validationMessage="Acceptance is required" />       
      </div>
      </p> 

    <button class="k-button k-button-solid-primary k-button-solid k-button-md k-rounded-md" type="submit">Submit</button>
    </form>

    <script>
      $(document).ready(function() {
    
        $("#fullname").kendoTextBox();
        $("#email").kendoTextBox();
        $("#accept").kendoCheckBox();
        $("#country").kendoDropDownList({
          optionLabel: "-- Select a country of origin --",
          dataSource: ["Argentina", "Brazil", "Italy", "Japan", "Portugal"],
        });    
        $("#age").kendoNumericTextBox();
    
        $("#sampleForm").kendoValidator({
          validationSummary: true,
          messages: {
            // Defines a message for the custom validation rule.
            fullname: "The FullName must be at least 3 characters long",
          },
          rules: {
            fullname: function(input) {
              // The FullName must be at least three characters long.
              if (input.is("[name=fullname]")) {
                return input.val().length > 3;
              }
              return true;
            }
          }
        }).data("kendoValidator");
      });
    </script>
```

## 1. Create a form Element

First, create a `<form>` element on the page that will serve as the main container of the Validator widget.

```html
	<form id="sampleForm"></form>
```

## 2. Add Fields to the Form

Add elements in the `form` where the user can fill in the data that will be validated.  

```html
	<form id="sampleForm">
      <p>
        <label for="fullname">Your Name</label>
        <input type="text" id="fullname" name="fullname" placeholder="Full name" required />
      </p>
      <p>
        <label for="age">Age</label>

        <input id="age" name="age" type="number" min="18" max="65"  required/>
        <span class="k-invalid-msg" data-for="age"></span>
      </p>
      <p>
        <label for="time">Country</label>

        <input type="text" name="country" id="country" required data-required-msg="Select a country of origin"/>
        <span class="k-invalid-msg" data-for="country"></span>
      </p> 
      <p>
        <label for="email">Email</label>

        <input type="email" id="email" name="email" placeholder="e.g. myname@example.net"  required data-email-msg="Email format is not valid" /> 
      </p> 
      <p>
      <div class="custom">
        <label for="accept">I accept the terms of service.</label>
        <input type="checkbox" id="accept" name="Accept" required validationMessage="Acceptance is required" />       
      </div>
      </p> 

	  <button class="k-button k-button-solid-primary k-button-solid k-button-md k-rounded-md" type="submit">Submit</button>
    </form>
```

## 3. Initialize the Validator 

In this step, you will initialize the Validator from the existing `<form>` element. When you initialize the component, all settings of the Validator will be provided in the initialization script statement and you have to describe its configuration in JavaScript.

If other Kendo widgets are used in the form, you will also need to initialize them as well. 

```html
<form id="sampleForm">
  ...
</form>

<script>
	// The code below initializes the Kendo UI widgets that are used in the form. Using Kendo UI widgets inside the form is optional. 
	$("#fullname").kendoTextBox();
    $("#email").kendoTextBox();
    $("#accept").kendoCheckBox();
    $("#country").kendoDropDownList({
      optionLabel: "-- Select a country of origin --",
      dataSource: ["Argentina", "Brazil", "Italy", "Japan", "Portugal"],
    });
    $("#age").kendoNumericTextBox();
	
    // Target the form element by using jQuery and then call the kendoValidator() method.
    $("#sampleForm").kendoValidator();
</script>
```


## 4. Create a Custom Rule

Once the basic initialization is completed, you can start adding additional configurations to the Validator. The following example demonstrates how to configure a [custom rule]({% slug rules_kendoui_validator %}#custom-rules) for the `fullname` field.

```html
<form id="sampleForm">
  ...
</form>

<script>    
    $("#sampleForm").kendoValidator({        
        rules: {
          fullname: function(input) {
            // The FullName must be at least three characters long.
            if (input.is("[name=fullname]")) {
              return input.val().length > 3;
            }
            return true;
          }
        }
    });
</script>
```

## 5. Configure Custom Validation Messages

The Validator allows you to define [custom messages]({% slug rules_kendoui_validator %}#custom-messages) which override the built-in messages.

```html
	<form id="sampleForm">
	...
	</form>
	
	<script>    
		$("#sampleForm").kendoValidator({  
			messages: {
				// Defines a message for the custom validation rule.
				fullname: "The FullName must be at least 3 characters long",
			},
			rules: {
				fullname: function(input) {
					// The FullName must be at least three characters long.
					if (input.is("[name=fullname]")) {
						return input.val().length > 3;
					}
					return true;
				}
			}
		});
	</script>
```

## 6. Enable the Validation Summary

Among other functionalities, the Validator provides the ability to list validation errors in a separate container. To achieve that, you can enable the [`validationSummary`]({% slug validationsummary_kendoui_validator %}) option. 

```html
	<form id="sampleForm">
	...
	</form>
	
	<script>    
		$("#sampleForm").kendoValidator({        
			validationSummary: true
		});
	</script>
```

## Next Steps 

* [Referencing Existing Widget Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the Validator](https://demos.telerik.com/kendo-ui/validator/index)

## See Also 

* [JavaScript API Reference of the Validator](/api/javascript/ui/validator)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>