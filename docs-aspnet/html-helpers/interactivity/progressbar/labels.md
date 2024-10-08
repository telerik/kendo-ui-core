---
title: Labels
page_title: Labels
description: "Learn how to set the Labels of the Telerik UI ProgressBar component for {{ site.framework }}."
slug: progressbar_labels
position: 3
---

# Labels

Labels and text description overall is beneficial for the users to better grasp the application functionality.

You can display informative labels for the ProgressBar using one of these options:

1. Regular label element:
```HtmlHelper
 @using Kendo.Mvc.UI

<label>Password strength</label>
@(Html.Kendo().ProgressBar()
      .Name("passStrength")
      .Type(ProgressBarType.Value)
      .Max(9)
      .Animation(false)
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

     <label>Password strength</label>
      <kendo-progressbar enable="true" max="9" reverse="false" show-    status="true"  type="ProgressBarType.Value" name="passStrength">
      </kendo-progressbar>
```
{% endif %}

2. Using the dedicated Label property:
```HtmlHelper
 @using Kendo.Mvc.UI

@(Html.Kendo().ProgressBar()
      .Name("passStrength")
      .Type(ProgressBarType.Value)
      .Max(9)
      .Animation(false)
      .Label("Password Strength")
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

      <kendo-progressbar enable="true" max="9" reverse="false" show-    status="true"  type="ProgressBarType.Value" name="passStrength"
      label="Password Strength">
      </kendo-progressbar>
```
{% endif %}

3. Explicitly setting the name of an external label element:
```HtmlHelper
 @using Kendo.Mvc.UI

<label id="progressBarLabel">Password strength</label>
@(Html.Kendo().ProgressBar()
      .Name("passStrength")
      .Type(ProgressBarType.Value)
      .Max(9)
      .Animation(false)
      .LabelId("progressBarLabel")
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

     <label id="progressBarLabel">Password strength</label>
      <kendo-progressbar enable="true" max="9" reverse="false" show-    status="true"  type="ProgressBarType.Value" name="passStrength"
      label-id="progressBarLabel">
      </kendo-progressbar>
```
{% endif %}

## See Also

* [Custom Label of the ProgressBar for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/progressbar/customlabel)
* [Server-Side API of the ProgressBar](/api/progressbar)
* [Client-Side API of the ProgressBar](https://docs.telerik.com/kendo-ui/api/javascript/ui/progressbar)
