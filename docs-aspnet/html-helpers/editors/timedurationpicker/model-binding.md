---
title: Model Binding
page_title: Model Binding
description: "Learn how to implement model binding with the Telerik UI TimeDurationPicker component for {{ site.framework }}."
components: ["timedurationpicker"]
slug: htmlhelpers_timedurationpickerhelper_model_binding
position: 6
---

# Model Binding

You can bind the Telerik UI for {{ site.framework }} TimeDurationPicker to model fields, allowing you to edit and submit model properties directly.

The component is designed to work with the `decimal?` (nullable decimal) type. The value is expressed in milliseconds.

## Example

```csharp Model
    public class TimeDurationPickerViewModel
    {
        public decimal? Duration { get; set; }
    }
```
```csharp Controller
    public ActionResult Index()
    {
        var model = new TimeDurationPickerViewModel
        {
            // 1 hour 30 minutes in milliseconds
            Duration = 5400000m
        };
    
        return View(model);
    }
```
```HtmlHelper 
    @model TimeDurationPickerViewModel
    
    @(Html.Kendo().TimeDurationPickerFor(m => m.Duration)
          .InputMode("numeric")
          .Columns(c =>
          {
              c.Hours().Format("## hours");
              c.Minutes().Format("## minutes");
          })
    )
```
{% if site.core %}
```TagHelper 
    @addTagHelper *, Kendo.Mvc
    @model TimeDurationPickerViewModel
    
    <kendo-timedurationpicker for="Duration" input-mode="numeric">
        <timedurationpicker-columns>
            <timedurationpicker-column name="hours" format="## hours"></timedurationpicker-column>
            <timedurationpicker-column name="minutes" format="## minutes"></timedurationpicker-column>
        </timedurationpicker-columns>
    </kendo-timedurationpicker>
```
{% endif %}

## Notes

* The recommended binding type is `decimal?`.
* The unit of the value is milliseconds.
* Validation attributes such as `[Required]` are supported.
* Use the `InputMode()` and `Columns()` configuration to define how the duration values are displayed and ensure proper accessibility labeling.labeling may break in some scenarios.

## See Also

* [TimeDurationPicker Overview]({% slug htmlhelpers_timedurationpickerhelper_overview %})
* [Server-Side API](/api/timedurationpicker)
{% if site.core %}
* [TagHelper API](/api/taghelpers/timedurationpicker)
{% endif %}
