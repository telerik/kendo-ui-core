---
title: Make DropDownList Selection Mandatory Only If Data Exists
description: An example on how to make the Kendo UI DropDownList a required field only if the user has data options to select from.
type: how-to
page_title: Make DropDownList Selection Mandatory Only If Data Exists | Kendo UI DropDownList for jQuery
slug: dropdownlist-required-only-when-data-exists
tags: dropdown, required, field, validation, conditional, change
ticketid: 1364233
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® DropDownList for ASP.NET MVC</td>
	</tr>
</table>


## Description

In some cases, the DropDownList has to be mandatory only when it presents some data. If it contains no data, it does not have to be a required field.

## Solution

Use the [`dataBound` event](/api/javascript/ui/dropdownlist/events/databound) of the DropDownList to toggle the `required` or `data-val-required` attribute that triggers the required field validation depending on the data source of the DropDownList.

The attributes that will be used depend on the validation mode you use. For example, the `required` attribute works in a generic HTML page and the `data-val-required` attribute works with the Unobtrusive Validation used in ASP.NET.

```html
<form id="myForm" action="someAction" method="post">
    <input id="ddl" />
</form>
<script>
    var blankData = [];
    var data = [
      { text: "Black", value: "1" },
      { text: "Orange", value: "2" },
      { text: "Grey", value: "3" }
    ];

    $("#ddl").kendoDropDownList({
      dataTextField: "text",
      dataValueField: "value",
      dataSource: data, //to test, swap for blankData.
      // In a real case, this will probably be a remote data source
      optionLabel: "select an option",
      dataBound: setRequiredAttr
    });

    function setRequiredAttr(evt) {
        if (evt.sender.dataSource.data().length < 1) {
            evt.sender.element.removeAttr("required");
        }
        else {
            evt.sender.element.attr("required", "required");
        }
    }
</script>

<!-- a sample way of using a Kendo Validator to show a user friendly message -->

<div id="result"></div>
<input id="submitBtn" type="submit" value="Create" class="btn btn-default" />
<script>
    $("#submitBtn").click(function () {
        var validator = $("#myForm").kendoValidator().data('kendoValidator');
        if (validator.validate()) {
            $("#result").text("");
        } else {
            $("#result").text("fill in the form");
        }
    });
</script>
```

The following example demonstrates how to implement the suggested approach in MVC.

```
@(Html.Kendo().DropDownListFor(model => model.ClassId)
                                  .DataTextField("Name")
                                  .DataValueField("ClassId")
                                  .DataSource(source =>
                                  {
                                      source.Read(read =>
                                      {
                                          read.Action("Questions_GetClasses", "Questions");
                                      });
                                  })
                                  .Events(ev => ev.DataBound("setRequiredAttr"))
)

<script>
    function setRequiredAttr(evt) {
        if (evt.sender.dataSource.data().length < 1) {
            evt.sender.element.removeAttr("data-val-required");
        }
        else {
            evt.sender.element.attr("data-val-required", "This field is required, please choose an option.");
        }
    }
</script>

@* a sample way of using a Kendo Validator to show a user friendly message *@

<div id="result"></div>
<input id="submitBtn" type="submit" value="Create" class="btn btn-default" />
<script>
    $("#submitBtn").click(function () {
        var validator = $("#myForm").kendoValidator().data('kendoValidator');
        if (validator.validate()) {
            $("#result").text("");
        } else {
            $("#result").text("fill in the form");
        }
    });
</script>
```

The following example demonstrates how to implement the suggested approach with a controller and which you can toggle to see how it behaves with and without data.

```
[HttpGet]
public JsonResult Questions_GetClasses(string text)
{
	var data = Enumerable.Range(0, 30).Select(p => new MyClassModel
	{
		ClassId = p + 0.5f,
		Name = "Name " + p
	}
	);

	// Remove the declaration above and uncomment the empty list below.
	// Then build to test without data.

	// List<MyClassModel> data = new List<MyClassModel>();

	return Json(data, JsonRequestBehavior.AllowGet);
}
```

The following code implements the simple model on which the previous example is based. 

```
namespace SampleMvcApp.Models
{
	public class MyClassModel
	{
		public float ClassId { get; set; }
		public string Name { get; set; }
	}
}
```
