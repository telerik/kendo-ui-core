---
title: Binding
page_title: Binding
description: "Learn how to implement data binding with Telerik UI RadioGroup HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_radiogroup_binding_aspnetcore
position: 2
---

# Binding

When using the Html helpers you can bind the radio button items by using the [Items()](#items) method or the [Bindto()](#bindto) method.

## Items method

The example below demonstrates how to use the Items() method to configure the radio buttons in the RadioGroup widget.

    @(Html.Kendo().RadioGroup()
        .Name("radiogroup")
        .Items(i =>
        {
            i.Add().Label("Phone (SMS)").Value("1");
            i.Add().Label("E-mail").Value("2");
            i.Add().Label("None").Value("3");
        })
        .Value("1")
    )


## BindTo method

You can configure the items in the RadioGroup widget by using the BindTo method.

1. Pass the data to the view through the view model.

        public IActionResult Index()
        {
            var itemsList = new List<RadioGroupItem>()
            {
                new RadioGroupItem()
                {
                    Label = "Yes",
                    Value = "one"
                },
                 new RadioGroupItem()
                {
                    Label = "No",
                    Value = "two"                    
                },
                  new RadioGroupItem()
                {
                    Label = "N/A",
                    Value = "three"
                }
            };

            return View(new RadioGroupViewModel() { Items = itemsList });
        }

        public class RadioGroupViewModel
        {
            public List<RadioGroupItem> Items { get; set; }
        }



1. Add the RadioGroup to the view and bind it to a property of the view model.

        @model MvcApplication1.Models.RadioGroupViewModel

        @(Html.Kendo().RadioGroup()
            .Name("radiogroup")   
            .BindTo(Model.Items)
        )

## See Also

* [Server-Side API](/api/radiogroup)
