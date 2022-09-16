---
title: Binding
page_title: Binding
description: "Learn how to implement data binding with Telerik UI RadioGroup component for {{ site.framework }}."
slug: htmlhelpers_radiogroup_binding_aspnetcore
position: 2
---

# Binding

When using the RadioGroup component, you can bind the radio button items by using the [Items()](#items) method or the [Bindto()](#bindto) method.

## Items method

The example below demonstrates how to use the Items() method to configure the radio buttons in the RadioGroup widget.

```HtmlHelper
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
```
{% if site.core %}
```TagHelper
     <kendo-radiogroup name="radiogroup" 
                       radio-name="radiogroup" 
                       value="1">
          <kendo-radiogroup-items>
              <kendo-radiogroup-item label="Phone (SMS)" value="1"></kendo-radiogroup-item>
              <kendo-radiogroup-item label="E-mail" value="2"></kendo-radiogroup-item>
              <kendo-radiogroup-item label="None" value="3"></kendo-radiogroup-item>
          </kendo-radiogroup-items>
     </kendo-radiogroup>
```
{% endif %}

## BindTo method

You can configure the items in the RadioGroup widget by using the BindTo method.

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

            return View(new RadioGroupViewModel() { Items = itemsList });
        }

        public class RadioGroupViewModel
        {
            public List<InputGroupItemModel> Items { get; set; }
        }
		
		public class InputGroupItemModel : IInputGroupItem
		{
			public IDictionary<string, object> HtmlAttributes { get; set; }
	
			public string CssClass { get; set; }
	
			public bool? Enabled { get; set; }
	
			public bool? Encoded { get; set; }
	
			public string Label { get; set; }
	
			public string Value { get; set; }
		}	


1. Add the RadioGroup to the view and bind it to a property of the view model.

    ```HtmlHelper
        @model MvcApplication1.Models.RadioGroupViewModel

        @(Html.Kendo().RadioGroup()
            .Name("radiogroup")   
            .BindTo(Model.Items)
        )
    ```
    {% if site.core %}
    ```TagHelper
        @model MvcApplication1.Models.RadioGroupViewModel

        <kendo-radiogroup name="radiogroup"
                          radio-name="radiogroup"                      
                          bind-to="Model.Items">
        </kendo-radiogroup>
    ```
    {% endif %}

## See Also

* [Server-Side API](/api/radiogroup)
