---
title: Model Binding
page_title: Model Binding | Telerik UI for ASP.NET Core HTML Helpers
description: "Implement model binding in the Telerik UI RadioButton for ASP.NET MVC."
slug: modelbinding_radiobutton_aspnetcore
position: 4
---

# Model Binding

You can bind a Telerik UI RadioButton to a model.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %}).
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

        @model Kendo.Mvc.Examples.Controllers.RadioButtonModel

1. Add two RadioButtons and set the Boolean values for the checked state through the `.Value` setting. The matched Boolean value from model will define the initial checked state.

    The following example demonstrates how the radio button with the **I Disagree** label will be checked because its false value matches the model value.

        @(Html.Kendo().RadioButtonFor(m => m.IAgreeProp).Label("I agree").Value(true))
        @(Html.Kendo().RadioButtonFor(m => m.IAgreeProp).Label("I Disagree").Value(false))

## See Also

* [RadioButton Server-Side API](/api/radiobutton)
* [RadioButtonBuilder Server-Side API](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/RadioButtonBuilder)
