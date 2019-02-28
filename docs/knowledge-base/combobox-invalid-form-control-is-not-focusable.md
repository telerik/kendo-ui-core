---
title: An invalid form control with name is not focusable
description: How to avoid the Invalid Form Control is Not Focusable error with Kendo ComboBox and Kendo Validator
type: troubleshooting
page_title: Invalid Form Control is Not Focusable
slug: combobox-invalid-form-control-is-not-focusable
position: 
tags: 
ticketid: 1397842
res_type: kb
---

## Environment
<table>
	<tr>
		<td>Product</td>
		<td>ComboBox for Kendo UI for jQuery, ComboBox for ASP.NET Core,  ComboBox for ASP.NET MVC</td>
	</tr>
	<tr>
		<td>Browser</td>
		<td>Google Chrome</td>
	</tr>
</table>


## Description
When using a Kendo ComboBox and/or a Kendo Validator, I get the "An invalid form control with name='' is not focusable." error under Chrome.

## Steps to Reproduce
The following example shows a basic approach of submitting the form where a required field is present (set through an input attribute), and a Kendo ComboBox is instantiated from it.

```
<form id="theForm" method="post">
  <div id="validationDiv">
    <input name="someField" required id="theCombo" />
  </div>
  <button type="submit" id="theSubmitButton">validate and submit</button>
</form>

<script>
$(document).ready(function(){
  $("#theCombo").kendoComboBox({
     dataTextField: "text",
    dataValueField: "value",
    dataSource: [
      { text: "Cotton", value: "1" },
      { text: "Polyester", value: "2" },
      { text: "Cotton/Polyester", value: "3" },
      { text: "Rib Knit", value: "4" }
    ]
  });
  
});
</script>
```

This second snippet shows that you can get a similar error when using a Kendo Validator as well:

```
<form id="theForm" method="post">
  <div id="validationDiv">
    <input name="someField" required id="theCombo" />
  </div>
  <button type="submit" id="theSubmitButton">validate and submit</button>
</form>

<script>
var validator;
$(document).ready(function(){
  $("#theCombo").kendoComboBox({
     dataTextField: "text",
    dataValueField: "value",
    dataSource: [
      { text: "Cotton", value: "1" },
      { text: "Polyester", value: "2" },
      { text: "Cotton/Polyester", value: "3" },
      { text: "Rib Knit", value: "4" }
    ]
  });
  
  validator = $("#validationDiv").kendoValidator().data("kendoValidator");
  
  $("#theSubmitButton").click(function () {
    if(validator.validate()){
      //do some other custom validation logic here
    }
  });
});
</script>
```

## Error Message
 "An invalid form control with name='' is not focusable." error is thrown under Chrome when a form is submitted with a Kendo ComboBox in it.

## Cause\Possible Cause(s)
Generally, the error is thrown by the browser when an input with validation attributes is hidden from the user and the user attempts to submit its form.

The Kendo combo box hides the original input element because it has a complex UI to show and thus form submission can trigger such an error in case the `required` attribute is set by the developer on the `input`.

## Solution
Instantiate a Kendo Validator on the `<form>` and not on a `<div>`. Here is how to modify the Kendo Validator snippet to do this:

```
<form id="theForm" method="post">
  <div id="validationDiv">
    <input name="someField" required id="theCombo" />
  </div>
  <button type="submit" id="theSubmitButton">validate and submit</button>
</form>

<script>
var validator;
$(document).ready(function(){
  $("#theCombo").kendoComboBox({
     dataTextField: "text",
    dataValueField: "value",
    dataSource: [
      { text: "Cotton", value: "1" },
      { text: "Polyester", value: "2" },
      { text: "Cotton/Polyester", value: "3" },
      { text: "Rib Knit", value: "4" }
    ]
  });
  
  validator = $("#theForm").kendoValidator().data("kendoValidator");
  
  $("#theSubmitButton").click(function () {
    if(validator.validate()){
      //do some other custom validation logic here
    }
  });
});
</script>
```

### For ASP.NET MVC and ASP.NET Core

**For MVC**, use data annotations to set the required state of a field, and also use the `...For(model => model.desiredField)` helpers. The data annotations render different attributes and they do not render the `required` attribute which triggers the error.

Model:

```
using System.ComponentModel.DataAnnotations;

namespace SampleCoreApp.Models
{
	public class SampleRequiredFieldModel
	{
		[Required]
		public string SomeField { get; set; }
	}
}
```

View:

```
<form action="post" id="theActualForm">
    @(Html.Kendo().ComboBoxFor(m => m.SomeField)
                  //.Name("SomeField")//make sure that you don't set the Name when using the ...For editors
                  .DataTextField("Text")
                  .DataValueField("Value")
                  .BindTo(new List<SelectListItem>() {
                      new SelectListItem() {
                        Text = "Cotton", Value = "1"
                      },
                      new SelectListItem() {
                        Text = "Polyester", Value = "2"
                      },
                      new SelectListItem() {
                        Text = "Cotton/Polyester", Value = "3"
                      },
                      new SelectListItem() {
                        Text = "Rib Knit", Value = "4"
                      }
                  })
    			})
    
    )

	<input type="submit" value="POST" />
</form>

<script>
	$(document).ready(function () {
		$("#theActualForm").kendoValidator();
	});

	$("#btn_SpeichernSenden").click(function () {
		var validator = $("#theActualForm").data('kendoValidator');
		//the rest of the validation logic is irrelevant to this issue

		if (validator.validate()) {
			//other logic
		}
	});
</script>
```

## Suggested Workarounds
Another option you can try is adding the CSS below to hide the input through other CSS rules that don't trigger the browser warning.

Note that using a Kendo Validator on the `<form>`, or using DataAnnotations on the MVC model are the recommended approaches.

```
input[data-role='combobox'] {
	display: inline-block !important;
	height: 0 !important;
	padding: 0 !important;
	border: 0 !important;
	z-index: -1 !important;
	position: absolute !important;
}
```

