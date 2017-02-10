---
title: Overview
page_title: Overview | Kendo UI RadioButton HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI RadioButton for ASP.NET MVC."
slug: overview_radiobuttonhelper_aspnetmvc
position: 1
---

# RadioButton HtmlHelper Overview

The RadioButton HtmlHelper extension is a server-side wrapper for the [Kendo UI RadioButton](http://demos.telerik.com/kendo-ui/styling/radios) widget.

Make sure you are familiar with the fundamental Kendo UI widget concepts and that the [Kendo UI MVC wrappers]({% slug overview_aspnetmvc %}) are set up correctly.

## Getting Started

### The Basics

The Kendo UI RadioButton widget is rendered as an `input type='radio'` element that is immediately followed by a `label` element. The styling comes from the  `k-radio` class being attached to the `input` element and the `k-radio-label` class being attached to the `label` element.

### Initialization

The following example demonstrates how to initialize the RadioButton.

###### Example

```tab-Razor

        @(Html.Kendo().RadioButton()
                .Name("MyRadioButton")
                .Label("I agree")
                .Checked(true))
```
```tab-ASPX

        <%= Html.Kendo().RadioButton()
                .Name("MyRadioButton")
                .Label("I agree")
                .Checked(true) %>
```

## Features

### Check and Uncheck Buttons

The RadioButton can be configured to be initially checked through its `.Checked()` setting. The widget can also be checked or unchecked at any time by using jQuery.

The following example demonstrates how to use the `.Checked()` configuration option.

###### Example

```tab-Razor

        @(Html.Kendo().RadioButton()
                .Name("MyRadioButton")
                .Label("I agree")
                .Checked(true))
```
```tab-ASPX

        <%= Html.Kendo().RadioButton()
                .Name("MyRadioButton")
                .Label("I agree")
                .Checked(true) %>
```

### Enable and Disable Buttons

The business logic of an application often requires a certain radio button to be temporarily enabled or disabled. The RadioButton can be configured to be initially disabled through its `.Enable()` setting. The widget can also be enabled or disabled at any time by using jQuery.

The following example demonstrates how to use the `.Enable()` configuration option.

###### Example

```tab-Razor

        @(Html.Kendo().RadioButton()
                .Name("disabledRadioButton")
                .Enable(false)
                .Label("Disabled radio button")
                .Checked(false))
```
```tab-ASPX

        <%= Html.Kendo().RadioButton()
                .Name("disabledRadioButton")
                .Enable(false)
                .Label("Disabled radio button")
                .Checked(false) %>
```

### Bind to Model

Below are listed the steps for you to follow when binding a Kendo UI RadioButton to a model.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method and pass the instance of the model to the View.

  ###### Example

      public class RadioButtonModel
      {
          public bool IAgreeProp { get; set; }
      }

      public partial class ButtonController : Controller
      {
          public ActionResult RadioButton()
          {
              RadioButtonModel myModel = new RadioButtonModel() { IAgreeProp = false };
              return View(myModel);
          }
      }

1. Make your view strongly typed.

    ###### Example

    ```tab-ASPX

            <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
                Inherits="System.Web.Mvc.ViewPage<Kendo.Mvc.Examples.Controllers.RadioButtonModel>" %>
    ```
    ```tab-Razor

            @model Kendo.Mvc.Examples.Controllers.RadioButtonModel
    ```

1. Add two RadioButtons and set the Boolean values for the checked state through the `.Value` setting. The matched Boolean value from model will define the initial checked state.

    The following example demonstrates how the radio button with the **I Disagree** label will be checked because its false value matches the model value.

    ###### Example

    ```tab-Razor

            @(Html.Kendo().RadioButtonFor(m => m.IAgreeProp).Label("I agree").Value(true))
            @(Html.Kendo().RadioButtonFor(m => m.IAgreeProp).Label("I Disagree").Value(false))
    ```
    ```tab-ASPX

            <%= Html.Kendo().RadioButtonFor(m => m.IAgreeProp).Label("I agree").Value(true) %>
            <%= Html.Kendo().RadioButtonFor(m => m.IAgreeProp).Label("I Disagree").Value(false) %>
    ```

## See Also

* [ASP.NET MVC API Reference: RadioButtonBuilder](/api/Kendo.Mvc.UI.Fluent/RadioButtonBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI RadioButton Widget](http://docs.telerik.com/kendo-ui/styles-and-layout/appearance-styling#customize-checkboxes-and-radio-buttons)
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
