---
title: Model Binding
page_title: Model Binding
description: "Learn how to implement model binding with Telerik UI Rating component for {{ site.framework }}."
slug: htmlhelpers_rating_model_binding_aspnetcore
position: 8
---

# Model Binding

When using the {{ site.product }} Rating component, you can bind the value to an arbitrary model property by using the `RatingFor` Helper.

```Controller
    public IActionResult Index()
    {
        var model = new RatingModel 
        {
            Rating = 7
        };

        return View(model);
    }
```
```Model
    public class RatingModel
    {
        public int Rating { get; set; }
    }
```
```HtmlHelper
    @model RatingModel

    @(Html.Kendo().RatingFor(model => model.Rating))
```
{% if site.core %}
```TagHelper
    <kendo-rating for="Rating"></kendo-rating>
```
{% endif %}


## See Also

* [Server-Side API](/api/rating)
