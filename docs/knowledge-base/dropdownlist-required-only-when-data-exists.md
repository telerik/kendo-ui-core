---
title: Dropdown selection mandatory only if data existsts
description: How to make Kendo DropDownList a required field only if the user has data options to select from
type: how-to
page_title: Required Dropdown Only if Data Exists
slug: dropdownlist-required-only-when-data-exists
position: 
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
In some cases, the dropdown should be mandatory only when there is data in it. Otherwise, it must not be a required field if there is no data.

## Solution

Use its [dataBound event](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist/events/databound) to toggle the `required` or `data-val-required` attribute that triggers the required field validation depending on the data source of the dropdown.

Which attributes will be used depends on the validation mode you use. For example, the `required` attribute works on a generic HTML page, and the `data-val-required` attribute works with the Unobtrusive Validation used in ASP.NET.

## Examples

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

Here is an MVC sample:

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

Here is a basic controller example you can toggle to see how it behaves with and without data

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

	//remove the declaration above and uncomment the empty list below, then build to test without data

	//List<MyClassModel> data = new List<MyClassModel>();

	return Json(data, JsonRequestBehavior.AllowGet);
}
```

based on a simple model:

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

