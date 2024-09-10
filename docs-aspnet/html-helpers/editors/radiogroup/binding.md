---
title: Binding
page_title: Binding
description: "Learn how to implement data binding with Telerik UI RadioGroup component for {{ site.framework }}."
slug: htmlhelpers_radiogroup_binding_aspnetcore
position: 2
---

# Binding

When using the RadioGroup component, you can bind the radio button items by using the [Items()](#items) method or the [BindTo()](#bindto) method.

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

        public ActionResult Index()
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


## Model Binding

You can implement model binding both with [local](#items-method) and [remote data](#bindto-method).

> The RadioGroup component is not accustomed to complex object-binding scenarios.

### Model Binding with Local Data

```HtmlHelper
    @model RadioGroupModel

    @(Html.Kendo().RadioGroupFor(model => model.RadioGroupGroupValue)
        .Name("radiogroup")
        .Items(items =>
        {
            items.Add().Label("Phone (SMS)").Value("1");
            items.Add().Label("E-mail").Value("2");
            items.Add().Label("None").Value("3");
        })
    )
```
{% if site.core %}
```TagHelper
    @model RadioGroupModel

    <kendo-radiogroup for="RadioGroupGroupValue">
        <kendo-radiogroup-items>
            <kendo-radiogroup-item value="1" label="Phone (SMS)"></kendo-radiogroup-item>
            <kendo-radiogroup-item value="2" label="E-mail"></kendo-radiogroup-item>
            <kendo-radiogroup-item value="3" label="None"></kendo-radiogroup-item>
        </kendo-radiogroup-items>
    </kendo-radiogroup>
```
{% endif %}

```Controller
    public ActionResult Index()
    {
        var model = new RadioGroupModel
        {
            RadioGroupGroupValue = new List<string>() { "1" }
        };  

        return View(model);
    }
```
```Model
    public class RadioGroupModel
    {
        public string[] RadioGroupGroupValue { get; set; }
    }
```

### Model Binding with Remote Data

```HtmlHelper
    @model RadioGroupModel

    @(Html.Kendo().RadioGroupFor(model => model.RadioGroupGroupValue)
         .HtmlAttributes(new { style = "height: auto;" })
         .Layout(radiogroupLayout.Vertical)
         .BindTo((List<IInputGroupItem>)ViewData["radiogroupItems"])
    )
```
{% if site.core %}
```TagHelper
    @model RadioGroupModel

    <kendo-radiogroup  for="RadioGroupGroupValue"
                       value="Model.RadioGroupGroupValue"
                       bind-to='(List<IInputGroupItem>)ViewData["radiogroupItems"]'>
    </kendo-radiogroup>
```
{% endif %}

```Controller
        private List<InputGroupItemModel> GetRadioGroupItems()
         => new List<InputGroupItemModel>()
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

        public ActionResult Index()
        {
            var model = new RadioGroupModel
            {
                RadioGroupGroupValue = new List<string>() { "one" }
            };

            ViewData["RadioGroupItems"] = GetRadioGroupItems();

            return View(model);
        }
```

```Model
    public class RadioGroupModel
    {
        public string[] RadioGroupGroupValue { get; set; }
    }
```

## See Also

* [Server-Side API](/api/radiogroup)
