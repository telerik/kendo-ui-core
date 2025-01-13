---
title: Using DropDownList field for making another property required or not required
description: How can I dynamically change if a field is required in PopUp Edit Mode of a {{ site.product }} Grid? Find the solution in the {{ site.product }} Knowledge Base.
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
			<td>{{ site.product }} Grid</td>
		</tr>
	</tbody>
</table>

## Description

How to dynamically change if a field is required in PopUp Edit Mode of a {{ site.product }} Grid by using another field with DropDownList Editor?

## Solution

The example below is implemented as per the following steps:

1. Use a DataAnnotation attribute for the DropDownList to point to the desired Editor Template for the field.
1. Handle the [`Change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist/events/change) Event of the DropDownList.
1. In the Event handler, get the input field that will be set as required or non-required, depending on the value of the DropDownList.
1. Use jQuery to set the required property to true or false.

The following example demonstrates the steps described above.

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

For more examples on Grid editing, see the following demos:

* [Grid Popup Editing](https://demos.telerik.com/{{ site.platform }}/grid/editing-popup)
* [Grid Editing Custom Editor](https://demos.telerik.com/{{ site.platform }}/grid/editing-custom)

 ## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)