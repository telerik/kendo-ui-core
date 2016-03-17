---
title: Client Side
page_title: Client Side | Team Efficiency Dashboard Tutorial
description: "Learn how to take control of Kendo UI while building the Team Efficiency Dashboard application by using Telerik UI for ASP.NET MVC."
slug: clientside_timeefficiencyapp_aspnetmvc6
position: 7
---

# Client Side

The client side is where Kendo UI really shines. Kendo UI uses a common JavaScript language and standards so that it’s easy for any JavaScript developer to get started. In this chapter you'll learn about client-side events and how to take control of Kendo UI using JavaScript.

## Working with Client-Side Events

### Overview

Telerik UI for MVC helpers provide an Events method that is part of the HTML Helper's property chain. The `events` method is used to set event handlers for the Kendo UI widget. Each widget has a variety of events that can be handled including: `cancel`, `change`, `dataBound`, `dataBinding`, `edit`, `remove`, and `save`.

###### Example

    @(Html.Kendo().ListView<ProductViewModel>()
            .Name("listView")
            .TagName("div")
            .ClientTemplateId("template")
            .DataSource(dataSource => {
                dataSource.Read(read => read.Action("Products_Read", "ListView"));
            })
            .Events(e => e
                .DataBound("productListView_dataBound")
                .Change("productListView_change")
            )
    )

Let's continue to work with the `EmployeesList` that was created in the previous chapter. The list is selectable, but when the application starts the first item should be selected by default giving the user a starting point to begin interacting with the dashboard.

### Exercise: Select the First List Item by Default

**Step 1** Find the `EmployeeList`.

###### Example

	<!-- Employee List View -->
	@(Html.Kendo().ListView<Employee>()
            .Name("EmployeesList")
			...
        	.Selectable(s => s.Mode(ListViewSelectionMode.Single))
	)

**Step 2** Add an event handler named `onListDataBound` for the `DataBound` event for the EmployeeList.

###### Example

	@(Html.Kendo().ListView<KendoQsBoilerplate.Employee>()
		...
		.Selectable(s => s.Mode(ListViewSelectionMode.Single))
		.Events(e => e.DataBound("onListDataBound"))
	)

The resulting code should be like the one shown below.

###### Example

	<!-- Employee List View -->
	@(Html.Kendo().ListView<KendoQsBoilerplate.Employee>()
    	.Name("EmployeesList")
        .ClientTemplateId("EmployeeItemTemplate")
        .TagName("ul")
        .DataSource(dataSource =>
        {
        	dataSource.Read(read => read.Action("EmployeesList_Read", "Home"));
        	dataSource.PageSize(9);
		})
        	.Selectable(s => s.Mode(ListViewSelectionMode.Single))
            .Events(e => e.DataBound("onListDataBound"))
	)

**Step 3** In the same view, find the `Scripts` section.

###### Example

	@section Scripts {
	    <script>
	        //Custom Scripts
	    </script>
	}

**Step 4** In the `<script>` element, add a function `onListDataBound`.

**Step 5** Select the first element by calling the `.select` function on the ListView `this` object and pass in the first employee element using the jQuery selector `$(".employee:first")`.

###### Example

	@section Scripts {
	    <script>
	        //Custom Scripts
			function onListDataBound(e) {
		        this.select($(".employee:first"));
		    }
	    </script>
	}

**Step 6** Refresh the page to see that the first item in the list is selected by default.

![employee list selected](images\chapter6\employee-list-selected.jpg)

Selecting the first item using the `DataBound` event was a good start. Next we'll take it a step further by using the selected item to populate a Kendo UI template showing the selected employee on the dashboard.

### Exercise: Use the Change Event to Populate Templates

**Step 1** Add an event handler named `onCriteriaChange` for the `Change` event for the `EmployeeList`.

###### Example

	@(Html.Kendo().ListView<Employee>()
			...
        	.Selectable(s => s.Mode(ListViewSelectionMode.Single))
            .Events(e => e.DataBound("onListDataBound")
   					      .Change("onCriteriaChange"))
	)

**Step 2** Find the `<!-- Kendo Templates -->` placeholder.

###### Example

	<!-- Kendo Templates -->
		...
	<!-- /Kendo Templates -->

**Step 3** Add a new template that will display the selected employee's image and full name.

###### Example

	<!-- Kendo Templates -->
	<script type="text/x-kendo-tmpl" id="employeeAvatarTemplate">
	    <img src="@(Url.Content("~/content/employees/"))#:EmployeeId#.png" />
	    <span>#:FullName#</span>
	</script>

**Step 4** Find the `<script>` section.

###### Example

	<script>
		...
    </script>

**Step 5** Add a function named `getSelectedEmployee` that returns the selected employee from the `EmployeeList`.

###### Example

	function getSelectedEmployee() {
    	var employeeList = $("#EmployeesList").data("kendoListView"),
		employee = employeeList.dataSource.getByUid(employeeList.select().attr("data-uid"));
		return employee;
	}

**Step 6** Add a function named `updateEmployeeAvatar` that binds the selected employee data to the `employeeAvatarTemplate` and places the template's content in the `employee-about` element.

###### Example

	function updateEmployeeAvatar() {
        var employee = getSelectedEmployee(),
            template = kendo.template($("#employeeAvatarTemplate").html());

        //apply template
        $("#employee-about").html(template(employee));
    }

**Step 7** Add a function named `onCriteriaChange`. This function will handle the `Change` event and call `updateEmployeeAvatar`.

###### Example

	function onCriteriaChange() {
        updateEmployeeAvatar();
	}

**Step 8** Refresh the page and select an employee from the `EmployeeList`. Selecting an item should update the dashboard with the selected employee's data.

![selected item to template](images/chapter6/selected-item-to-template.jpg)

**Step 9** Find and remove the `<!-- Employee Avatar -->` placeholder code, it is no longer needed because the element is created dynamically. Remove the code shown in the example below.

###### Example

     <!-- Employee Avatar -->
     @Html.Placehold(90, 90, "Face")
     <span>Full Name </span>

Now that you know how to work with client-side APIs, let's enhance the Team Efficiency Dashboard by working with datasources.

## See Also

Other UI for ASP.NET MVC Quick Start Guide chapters on how to build the Team Efficiency Dashboard application:

* [Getting Up and Running]({% slug gettingupandrunning_timeefficiencyapp_aspnetmvc6 %})
* [Input Controls]({% slug inputcontrols_timeefficiencyapp_aspnetmvc6 %})
* [Scaffolding]({% slug scaffolding_timeefficiencyapp_aspnetmvc6 %})
* [Add and Configure the Kendo UI Grid]({% slug kendouigrid_timeefficiencyapp_aspnetmvc6 %})
* [Add and Configure the Kendo UI ListView]({% slug kendouilistview_timeefficiencyapp_aspnetmvc6 %})
* [Handle the Kendo UI Datasource]({% slug kendouidatasource_timeefficiencyapp_aspnetmvc6 %})
* [Add and Configure the Kendo UI Charts]({% slug kendouicharts_timeefficiencyapp_aspnetmvc6 %})
* [Make the Application Responsive]({% slug goresponsive_timeefficiencyapp_aspnetmvc6 %})
* [Add and Configure the Kendo UI Themes]({% slug kendouithemes_timeefficiencyapp_aspnetmvc6 %})
