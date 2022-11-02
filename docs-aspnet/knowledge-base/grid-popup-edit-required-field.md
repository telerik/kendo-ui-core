---
title: Use DropDownList field for making another property required or not required
description: How can I dynamically change if a field is required in PopUp Edit Mode of a Telerik UI Grid
type: how-to
page_title: Dynamically change if a field is required in PopUp Edit Mode of a Telerik UI Grid
slug: grid-popup-edit-required-field
tags: grid, dropdownlist, popup, required
res_type: kb
component: grid
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2022.3.913</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Grid for Progress® Telerik® {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description

How to dynamically change if a field is required in PopUp Edit Mode of a Telerik UI Grid by using another field with DropDownList Editor?

## Solution

The example below is implemented as per the following steps:

1. Use a DataAnnotation attribute for the DropDownList in order to point to the desired EditorTemplate for the field.
1. Handle the ["Change"](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist/events/change) Event of the DropDownList.
1. In the Event handler, get the input field that should be set as required/non-required, depending on the value of the DropDownList.
1. Use jQuery to set the required property to true or false.
1. Here is an example:

```TestEditor.cshtml
@model string

@(Html.Kendo().DropDownList()
          .Name("EnableShipName")
          .BindTo(new List<string>() {
              "ShipName is required",
              "ShipName is not required"
          })
         .HtmlAttributes(new { style = "width: 100%" })
         .Events(e => e.Change("onDDLChange"))
        )
```

```Model
        [UIHint("TestEditor")]
        public string EnableShipName { get; set; }
```


```JavaScript
   function onDDLChange() {
        var dropDownList = this;
        var ddlValue = dropDownList.value();

        if (ddlValue == "ShipName is required") {
            $("#ShipName").prop('required', true);
        }
        else {
            $("#ShipName").prop('required', false);
        }
    }
```

## See Also
 * [Grid Popup Editing](https://demos.telerik.com/aspnet-mvc/grid/editing-popup)
 * [Grid Editing Custom Editor](https://demos.telerik.com/aspnet-mvc/grid/editing-custom)