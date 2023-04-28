---
title: Displaying a Validation Summary in a Dialog
description: Learn how to show a validation summary in the {{ site.product }} Dialog by following the steps in the Knowledge Base section of the {{ site.product }} components.
type: how-to
page_title: Showing a Validation Summary in a Dialog
slug: dialog-validation-summary
tags: mvc, core, dialog, validation, summary
res_type: kb
component: dialog
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Dialog</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.2.621 version</td>
 </tr>
</table>

## Description

How can I show a validation summary in the {{ site.product }} Dialog?

## Solution

1. Set an initial HTML content within the Dialog which will act as a container for the error messages.
1. Get the reference of the validator and attach a handler to the `validate` event through the `.bind()` configuration method.
1. Within the handler, assess if any errors have occurred by using the `.errors()` method. Based on the evaluation, append the error messages to the content of the Dialog and open it.

```Index.cshtml
    <form id="myform">
        <input name="username" required /> <br />
        <input name="password" required /> <br />
        <button>Validate</button>
    </form>

    @(Html.Kendo().Dialog()
            .Name("SMEValidationSummary")
            .Title("SME Validation Summary")
            .Closable(false)
            .Content("<div class='errors'></div>")
            .Width(400)
            .Modal(true)
            .Visible(false)
            .Actions(actions =>
            {
                actions.Add().Text("OK").Primary(true);
            })
    )
```
```Script.js
    $(document).ready(function(){
        var validator = $("#myform").kendoValidator().data("kendoValidator");
        validator.bind("validate", function (e) {        
                var errors = this.errors();
                
                if (errors.length) {
                    var html = "<ul style='color:red;'>";
                    for (var i = 0; i < errors.length; i++) {
                        html += "<li>" + errors[i] + "</li>";
                    }
                    html += "</ul>";
                    $(".errors").html($(html));
                    $("#SMEValidationSummary").data("kendoDialog").open();
                }
        });
    })
```

For the complete implementation of the suggested approach, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/cmasECbw25M5uiBi06) example.

## More {{ site.framework }} Dialog Resources

* [{{ site.framework }} Dialog Documentation]({%slug overview_dialoghelper_aspnetcore%})

* [{{ site.framework }} Dialog Demos](https://demos.telerik.com/{{ site.platform }}/dialog)

{% if site.core %}
* [{{ site.framework }} Dialog Product Page](https://www.telerik.com/aspnet-core-ui/dialog)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Dialog Product Page](https://www.telerik.com/aspnet-mvc/dialog-for-mvc)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Telerik REPL: Displaying a Validation Summary in a Dialog](https://netcorerepl.telerik.com/cmasECbw25M5uiBi06)
* [Client-Side API Reference of the Dialog  for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/dialog)
* [Server-Side API Reference of the Dialog  for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/dialog)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
