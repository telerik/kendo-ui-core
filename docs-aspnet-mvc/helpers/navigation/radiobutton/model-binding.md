---
title: Model Binding
page_title: Model Binding | Telerik UI PanelBar HtmlHelper for ASP.NET MVC
description: "Implement model binding in the Telerik UI RadioButton for ASP.NET MVC."
slug: modelbinding_radiobuttonhelper_aspnetmvc
position: 4
---

# Model Binding

You can bind a Telerik UI RadioButton to a model.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method and pass the instance of the model to the View.

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

    ```ASPX
        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
            Inherits="System.Web.Mvc.ViewPage<Kendo.Mvc.Examples.Controllers.RadioButtonModel>" %>
    ```
    ```Razor
        @model Kendo.Mvc.Examples.Controllers.RadioButtonModel
    ```

1. Add two RadioButtons and set the Boolean values for the checked state through the `.Value` setting. The matched Boolean value from model will define the initial checked state.

    The following example demonstrates how the radio button with the **I Disagree** label will be checked because its false value matches the model value.

    ```Razor
        @(Html.Kendo().RadioButtonFor(m => m.IAgreeProp).Label("I agree").Value(true))
        @(Html.Kendo().RadioButtonFor(m => m.IAgreeProp).Label("I Disagree").Value(false))
    ```
    ```ASPX
        <%= Html.Kendo().RadioButtonFor(m => m.IAgreeProp).Label("I agree").Value(true) %>
        <%= Html.Kendo().RadioButtonFor(m => m.IAgreeProp).Label("I Disagree").Value(false) %>
    ```

## See Also

* [Basic Usage of the RadioButton HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/styling/radios)
* [RadioButtonBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/RadioButtonBuilder)
* [RadioButton Server-Side API](/api/radiobutton)
