---
title: An Invalid Form Control with Is Not Focusable Error Occurs
description: An Invalid Form Control is Not Focusable error occurs when working with the Kendo UI ComboBox and Kendo UI Validator.
type: troubleshooting
page_title: Avoid the Invalid Form Control is Not Focusable Error | Kendo UI ComboBox
slug: combobox-invalid-form-control-is-not-focusable
ticketid: 1397842
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product</td>
		<td>ComboBox for Kendo UI for jQuery, ComboBox for ASP.NET Core, ComboBox for ASP.NET MVC</td>
	</tr>
	<tr>
		<td>Browser</td>
		<td>Google Chrome</td>
	</tr>
</table>

## Description

When I use a Kendo UI ComboBox and/or a Kendo UI Validator in Chrome, I get the `An invalid form control with name='' is not focusable.` error.

## Steps to Reproduce

The following example demonstrates a basic approach for submitting the form where a required field is present (set through an `input` attribute) and a Kendo UI ComboBox is instantiated from it.

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

The following example demonstrates how you can get a similar error when working with the Kendo UI Validator.

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

The `An invalid form control with name='' is not focusable.` error is thrown in Chrome when a form with a Kendo UI ComboBox in it is submitted.

## Cause

The browser throws such an error when an input with validation attributes is hidden from the user and the user attempts to submit its form. The Kendo UI ComboBox hides the original `input` element because it has a complex UI to show and thus form submission can trigger such an error in case the `required` attribute is set by the developer on the `input`.

## Solution

**In jQuery** Instantiate a Kendo UI Validator on the `<form>` and not on a `<div>`. The following example demonstrates how to modify the previous Validator example to achieve this.

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

**In ASP.NET MVC and ASP.NET Core** Use the `...For(model => model.desiredField)` helpers and use data annotations to set the required state of a field. The data annotations do not render the `required` attribute which triggers the error.

```tab-Model
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
```tab-View
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

Alternatively, add the following CSS to hide the input through other CSS rules that do not trigger the browser warning. Using a Kendo UI Validator on the `<form>` element or using `DataAnnotations` on the MVC model are the recommended approaches.

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
