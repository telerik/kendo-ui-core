---
title: Binding
page_title: Binding
description: "Learn how to implement data binding with Telerik UI CheckBoxGroup HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_checkboxgroup_binding_aspnetcore
position: 2
---

# Binding

When using the Html helpers you can bind the checkbox items by using the [Items()](#items) method or the [BindTo()](#bindto) method.

## Items method

The example below demonstrates how to use the Items() method to configure the checkboxes in the CheckBoxGroup widget.

    @(Html.Kendo().CheckBoxGroup()
        .Name("checkboxgroup")
        .Items(i =>
        {
            i.Add().Label("English").Value("1");
            i.Add().Label("Spanish").Value("2");
            i.Add().Label("Russian").Value("3");
        })
        .Value(new string[] { "1" })
    )


## BindTo method

You can configure the items in the CheckBoxGroup widget by using the BindTo method.

1. Pass the data to the view through the view model.

        public IActionResult Index()
        {
            var itemsList = new List<InputGroupItemModel>()
            {
                new InputGroupItemModel()
                {
                    Label = "Yes",
                    Value = "one"
                },
                 new InputGroupItemModel()
                {
                    Label = "No",
                    Value = "two"
                },
                  new InputGroupItemModel()
                {
                    Label = "N/A",
                    Value = "three"
                }
            };

            return View(new CheckBoxGroupViewModel() { Items = itemsList, CheckBoxGroupValue = new string[] { "two" }  });
        }

        public class CheckBoxGroupViewModel
        {
            public List<InputGroupItemModel> Items { get; set; }

			public string[] CheckBoxGroupValue { get; set; }
        }



1. Add the CheckBoxGroup to the view and bind it to a property of the view model.

        @model MvcApplication1.Models.CheckBoxGroupViewModel

        @(Html.Kendo().CheckBoxGroup()
            .Name("checkboxgroup")
            .BindTo(Model.Items)
			.Value(Model.CheckBoxGroupValue)
        )

## See Also

* [Server-Side API](/api/checkboxgroup)
