---
title: Binding
page_title: Binding
description: "Learn how to implement data binding with Telerik UI CheckBoxGroup component for {{ site.framework }}."
slug: htmlhelpers_checkboxgroup_binding_aspnetcore
position: 2
---

# Binding

When using the helpers, you can bind the checkbox items by using the [Items()](#items) method or the [BindTo()](#bindto) method.

## Items Method

The example below demonstrates how to use the Items() method to configure the checkboxes in the CheckBoxGroup widget.

```HtmlHelper
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
```
{% if site.core %}
```TagHelper
    @{ 
        var data = new string[] { "1" };
    }
    <kendo-checkboxgroup name="checkboxgroup"
                        value="data">
        <kendo-checkboxgroup-items>
            <kendo-checkboxgroup-item value="1" label="English"></kendo-checkboxgroup-item>
            <kendo-checkboxgroup-item value="2" label="Spanish"></kendo-checkboxgroup-item>
            <kendo-checkboxgroup-item value="3" label="Russian"></kendo-checkboxgroup-item>
        </kendo-checkboxgroup-items>
    </kendo-checkboxgroup>
```
{% endif %}

## BindTo Method

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
		
		public class InputGroupItemModel : IInputGroupItem
		{
			public IDictionary<string, object> HtmlAttributes { get; set; }
	
			public string CssClass { get; set; }
	
			public bool? Enabled { get; set; }
	
			public bool? Encoded { get; set; }
	
			public string Label { get; set; }
	
			public string Value { get; set; }
		}



1. Add the CheckBoxGroup to the view and bind it to a property of the view model.

    ```HtmlHelper
        @model MvcApplication1.Models.CheckBoxGroupViewModel

        @(Html.Kendo().CheckBoxGroup()
            .Name("checkboxgroup")
            .BindTo(Model.Items)
			.Value(Model.CheckBoxGroupValue)
        )
    ```
    {% if site.core %}
    ```TagHelper
        @model MvcApplication1.Models.CheckBoxGroupViewModel

        <kendo-checkboxgroup name="checkboxgroup"
                      value="Model.CheckBoxGroupValue"
                      bind-to="Model.Items">
        </kendo-checkboxgroup>
    ```
    {% endif %}


## Model Binding

You can implement model binding both with [local](#items-method) and [remote data](#bindto-method).

> The CheckBoxGroup component is not accustomed to complex object-binding scenarios.

### Model Binding with Local Data

```HtmlHelper
    @model CheckBoxGroupModel

    @(Html.Kendo().CheckBoxGroupFor(model => model.CheckBoxGroupValue)
        .Name("checkboxgroup")
        .Items(i =>
        {
            i.Add().Label("English").Value("1");
            i.Add().Label("Spanish").Value("2");
            i.Add().Label("Russian").Value("3");
        })
    )
```
{% if site.core %}
```TagHelper
    @model CheckBoxGroupModel

    <kendo-checkboxgroup for="CheckBoxGroupValue">
        <kendo-checkboxgroup-items>
            <kendo-checkboxgroup-item value="1" label="English"></kendo-checkboxgroup-item>
            <kendo-checkboxgroup-item value="2" label="Spanish"></kendo-checkboxgroup-item>
            <kendo-checkboxgroup-item value="3" label="Russian"></kendo-checkboxgroup-item>
        </kendo-checkboxgroup-items>
    </kendo-checkboxgroup>
```
{% endif %}

```Controller
    public IActionResult Index()
    {
        var model = new CheckBoxGroupModel
        {
            CheckBoxGroupValue = new List<string>() { "1" }
        };  

        return View(model);
    }
```
```Model
    public class CheckBoxGroupModel
    {
        public string[] CheckBoxGroupValue { get; set; }
    }
```

### Model Binding with Remote Data

```HtmlHelper
    @model CheckBoxGroupModel

    @(Html.Kendo().CheckBoxGroupFor(model => model.CheckBoxGroupValue)
         .HtmlAttributes(new { style = "height: auto;" })
         .Layout(CheckBoxGroupLayout.Vertical)
         .BindTo((List<IInputGroupItem>)ViewData["CheckBoxGroupItems"])
    )
```
{% if site.core %}
```TagHelper
    @model CheckBoxGroupModel

    <kendo-checkboxgroup for="CheckBoxGroupValue"
                         value="Model.CheckBoxGroupValue"
                         bind-to='(List<IInputGroupItem>)ViewData["CheckBoxGroupItems"]'>
    </kendo-checkboxgroup>
```
{% endif %}

```Controller
        private List<InputGroupItemModel> GetCheckBoxGroupItems()
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

        public IActionResult Index()
        {
            var model = new CheckBoxGroupModel
            {
                CheckBoxGroupValue = new List<string>() { "one" }
            };

            ViewData["CheckBoxGroupItems"] = GetCheckBoxGroupItems();

            return View(model);
        }
```

```Model
    public class CheckBoxGroupModel
    {
        public string[] CheckBoxGroupValue { get; set; }
    }
```

## See Also

* [Server-Side API](/api/checkboxgroup)
