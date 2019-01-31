---
title: Validate Required Conditional Fields
description: An example on how to implement required conditional field validation based on the value of another input on the form when working with the Kendo UI Validator.
page_title: Validate Required Conditional Fields | Kendo UI Validator
slug: validator-required-if-rule
tags: validator, required, required if, required-if, validation, conditional
ticketid: 1384728
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Validator</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I create a "required if" validation that only demands an input if another input is filled in?

## Solution

Denote the desired input in an attribute on the validated element and implement a [custom validation rule](https://docs.telerik.com/kendo-ui/controls/editors/validator/overview#custom-rules-for-validation).

The code comments contain tips for the suggested implementation. For more information, refer to the following key points:

* The `form` elements must have a `name` attribute so that the Kendo UI Validator can properly attach to them.
* The suggested approach is only one out of many ways to implement conditional validation.
* The suggested approach can also apply to other technologies, such as MVC, as it requires only the setting of an attribute on the DOM element. For example, for the Kendo UI for MVC MultiSelect Html Helper, adding the `.HtmlAttributes(new { requiredIf = "input1" })` setting is equivalent to the markup from the following example.

```dojo
<form id="myform">
	<input type="text" id="input1" name="input1" placeholder="type something here and click Validate" style="width: 250px" />

	<br /><br />

	<select id="requiredIfSample" multiple="multiple" requiredIf="input1" data-placeholder="Select attendees..." name="multiSelect">
		<option>Steven White</option>
		<option>Nancy King</option>
		<option>Nancy Davolio</option>
		<option>Robert Davolio</option>
		<option>Michael Leverling</option>
		<option>Andrew Callahan</option>
		<option>Michael Suyama</option>
		<option>Anne King</option>
		<option>Laura Peacock</option>
		<option>Robert Fuller</option>
		<option>Janet White</option>
		<option>Nancy Leverling</option>
		<option>Robert Buchanan</option>
		<option>Margaret Buchanan</option>
		<option>Andrew Fuller</option>
		<option>Anne Davolio</option>
		<option>Andrew Suyama</option>
		<option>Nige Buchanan</option>
		<option>Laura Fuller</option>
	</select>

	<br /><br />

	<input type="text" id="secondInput" requiredIf="input1" name="secondInput" />

	<br /><br />

	<button id="save">Validate</button>

</form>

<script>
	$(document).ready(function () {
		$("#requiredIfSample").kendoMultiSelect();

		$("#myform").kendoValidator({
			messages: {
				// defines a message for the custom validation rule
				requiredIf: "this field is now required based on your other form choices"
			},
			rules: {
				requiredIf: function (input) {
					if (input.is("[requiredIf]")) {//you can use other attributes (inlcuding data-* attributes)
						//you can also use more attributes from the DOM element here to denote more complex logic
						var targetInput = $("#" + input.attr("requiredIf")); //you may want to apply here logic similar to the lines below that check for the type of the element
						if (targetInput.length > 0) {
							var targetVal = targetInput.first().val();

							//get current element value. To make it more generic you can use the kendo.widgetInstance(element) method
							//https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/widgetinstance
							var currVal = "";
							var widget = kendo.widgetInstance(input);
							if (widget && widget.value) {
								currVal = widget.value();
							} else {
								currVal = input.val();
							}

							if (targetVal) {//current field is required because the designated related input has a value
								//implement actual validation logic. For example, see what the current value type is and expand it
								if (typeof currVal === "object" && currVal instanceof Array) {//check for arrays - e.g., for a MultiSelect
									return currVal.length > 0;
								}
								if (!currVal) {//primitive types like strings and numbers can be evaluated with a simple bool check like this
									return false;
								}
								return true;
							}
						}
						return true;
					}
					return true;
				}
			}
		});

		$("#save").click(function (e) {
			e.preventDefault();//prevent form submission so we can have custom validation
			var validator = $("#myform").data("kendoValidator");
			if (validator.validate()) {
				//save form here
				alert("Data saved");
			}
			else {
				//you can show a more global notification about failed validation, e.g., for very large forms
			}
		});
	});
</script>
```

## See Also

* [Custom Validator Rules](https://docs.telerik.com/kendo-ui/controls/editors/validator/overview#custom-rules-for-validation)
* [Demo on Custom Validation Rules](https://demos.telerik.com/kendo-ui/validator/custom-validation)
* [API Reference of the kendo.widgetInstance() Method](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/widgetinstance)
