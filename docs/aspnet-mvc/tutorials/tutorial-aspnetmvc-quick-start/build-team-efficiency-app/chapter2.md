---
title: Input Controls
page_title: Input Controls | Team Efficiency Dashboard Tutorial
description: "Add, configure, and render Kendo UI widgets while building the Team Efficiency Dashboard application by using Telerik UI for ASP.NET MVC."
slug: inputcontrols_timeefficiencyapp_aspnetmvc6
position: 3
---

# Input Controls

In this chapter you'll learn how to add Kendo UI widgets to your application. UI for MVC has powerful HTML Helpers that configure and render Kendo UI widgets.

## Kendo UI Helper Overview

### Server-Side Wrappers

Telerik UI for ASP.NET MVC is a set of server-side wrappers. A server-wrapper does the following:

- Allows the developer to configure a Kendo UI widget via C# or VB.NET code&mdash;set its value, data source, etc.
- Renders the HTML and JavaScript needed to initialize the Kendo UI widget. The widget options propagate to the client side via the widget initialization script.

![Server-side wrapper outputs HTML and JavaScript](../images/chapter2/wrapper-output.png)

### Configuration

The Kendo UI HtmlHelper exposes all Kendo UI server wrappers.

![Kendo HtmlHelper extension method](../images/chapter2/kendo-extension.png)

### Widget Options

The widget options are exposed via a fluent interface.

![Fluent interface](../images/chapter2/fluent-interface.png)

Below is an example of how a NumericTextBox input is created.

###### Example

    @(Html.Kendo().NumericTextBox()
        .Name("name") // set the name of the NumericTextBox
        .Value(10) //set the value
        .Spinners(false) // disable the spinners
    )

## Adding a Kendo UI DatePicker

### Overview

Let's open the `Index.cshtml` page under the folder `views/home/`. The `Index.cshtml` page is where most of the application's UI lives. This page currently contains basic HTML inputs to collect date input from the user. To provide a better user experience, replace the standard HTML inputs with Kendo UI date picker controls. The Kendo UI date picker controls offer users a flyout calendar to choose a desired date.

> **Note**
>
> The Kendo UI DatePicker control is touch and mouse friendly. No additional code is necessary to support tablets and phones.

### Exercise: Replace StatsFrom and StatsTo TextBoxes with Kendo UI Date Pickers

**Step 1** Open `Views/Home/Index.cshtml` and find the `StatsFrom` text box helper.

###### Example

    <!-- Stats From Date Picker -->
	@Html.TextBox("StatsFrom", new DateTime(1996, 1, 1))

**Step 2** Replace the text box helper with a Kendo UI date picker. Set the `Name` property to `StatsFrom` and the `Value` with a new `DateTime` of `1996,1,1`.

###### Example

	<!-- Stats From Date Picker -->
	@(Html.Kendo().DatePicker()
           .Name("StatsFrom")
           .Value(new DateTime(1996, 1, 1))
    )        

**Step 3** Find the `StatsTo` text box helper.

###### Example

	<!-- Stats To Date Picker -->
	@Html.TextBox("StatsTo", new DateTime(1996, 1, 1))    

**Step 4** Replace the text box helper with a Kendo UI DatePicker. Set the `Name` property to `StatsTo` and the `Value` with a new `DateTime` of `1998,8,1`.

###### Example

	<!-- Stats To Date Picker -->
	@(Html.Kendo().DatePicker()
    		.Name("StatsTo")
			.Value(new DateTime(1998, 8, 1))
	)

The Kendo UI HTML helper's fluent interface lets you configure a widget's behavior and appearance. The code you just added uses the following properties:

- `Name`&mdash;The property sets the rendered HTML element's id property.
- `Value`&mdash;Sets a default selected date value for the date picker.

After you run your app with this change, you will see a calendar icon in the **Stats from** field. Click or tap the icon to reveal the date picker.

![Tap to show a date picker](../images/chapter2/date-picker-flyout.jpg)

With the inputs upgraded, let's move on to the extremely robust Kendo UI Grid.

## See Also

Other UI for ASP.NET MVC Quick Start Guide chapters on how to build the Team Efficiency Dashboard application:

* [Getting Up and Running]({% slug gettingupandrunning_timeefficiencyapp_aspnetmvc6 %})
* [Scaffolding]({% slug scaffolding_timeefficiencyapp_aspnetmvc6 %})
* [Add and Configure the Kendo UI Grid]({% slug kendouigrid_timeefficiencyapp_aspnetmvc6 %})
* [Add and Configure the Kendo UI ListView]({% slug kendouilistview_timeefficiencyapp_aspnetmvc6 %})
* [Manage the Client Side]({% slug clientside_timeefficiencyapp_aspnetmvc6 %})
* [Handle the Kendo UI Datasource]({% slug kendouidatasource_timeefficiencyapp_aspnetmvc6 %})
* [Add and Configure the Kendo UI Charts]({% slug kendouicharts_timeefficiencyapp_aspnetmvc6 %})
* [Make the Application Responsive]({% slug goresponsive_timeefficiencyapp_aspnetmvc6 %})
* [Add and Configure the Kendo UI Themes]({% slug kendouithemes_timeefficiencyapp_aspnetmvc6 %})
