---
title: Dynamically Adjusting Form Field Validation Based on Available Options in the DropDownList Editor
description: Learn how to make the Form fields required or non-required based on the available options of the DropDownList editors, which are configured for remote data binding.
type: how-to
page_title: Dynamically Adjusting Form Field Validation Based on Available Options in the DropDownList Editor
slug: form-fields-validation-dropdownlist-data
tags: form, fields, required, dropdownlist, remote, data, options, requestend
res_type: kb
components: ["general"]
ticketid: 1637672
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>{{ site.product }} Form</td>
</tr>
<tr>
<td>Product</td>
<td>{{ site.product }} DropDownList</td>
</tr>
<tr>
<td>Product Version</td>
<td>2024.3.806</td>
</tr>
</tbody>
</table>

## Description

How can I dynamically set the fields in a Form as required or non-required based on the available options in their DropDownList editors?

When using {{ site.product }} Form, which contains {{ site.product }} DropDownList editors that bind to remote data, you can make the fields non-required in cases when no options are received from the server. Otherwise, the users will be forced to select an option to submit the Form.

## Solution

1. Subscribe to the [`RequestEnd`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/datasourceeventbuilder#requestendsystemstring) event of the DataSource of each DropDownList editor using a template delegate.
1. Within the inline event handler, access the event data and pass it to a JavaScript function along with the name of the field to which the DropDownList binds.
1. Within the JavaScript function **validateField**, check if there are available options received from the server and set the attribute `required` to the input element of the respective field with jQuery.
1. Reuse the **validateField** function for all DropDownList editors that loads data from the server.

```HtmlHelper
    @(Html.Kendo().Form<FormItems>()
        .Name("exampleForm")
        .HtmlAttributes(new { action = "Items", method = "POST" })
        .Items(i =>
        {
            i.Add()
            .Field(f => f.EquipmentType)
            .Label(l => l.Text("Equipment Type"))
            .Editor(e =>
            {
                e.DropDownList()
                .DataTextField("ShortName")
                .DataValueField("EquipmentTypeID")
                .OptionLabel("Select")
                .DataSource(source =>
                {
                    source
                        .Read(read => { read.Action("GetItems","Home"); })
                        .Events(ev => ev.RequestEnd(@<text> // Subscribe to the event by a template delegate.
                            function(eventData) { // Access the event data.
                                return validateField(eventData, "EquipmentType"); // Pass the event data and the name of the field to the custom function.
                            }
                        </text>));
                });
            });
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    @model FormItems

    <kendo-form name="exampleForm" form-data="@Model" method="POST" asp-action="Items">
        <form-items>
            <form-item field="EquipmentType">
                <item-label text="Equipment Type:" />
                <dropdownlist-editor placeholder="Select" datatextfield="ShortName" datavaluefield="EquipmentTypeID">
                    <datasource on-request-end="function(eventData) {
                            return validateField(eventData, 'EquipmentType');
                        }">
                        <transport>
                            <read url="@Url.Action("GetItems", "Home")"/>
                        </transport>
                    </datasource>
                </dropdownlist-editor>
            </form-item>
        </form-items>
    </kendo-form>
```
{% endif %}
```JS scripts
    <script>
        function validateField(eventData, fieldName) { // Reuse this handler for all editors that loads data from the server.
            if (eventData.response.length > 0) {
                $("#" + fieldName).attr("required", "required");
            } else {
                $("#" + fieldName).removeAttr("required");
            }
        }
    </script>
```

## More {{ site.framework }} Form Resources

* [{{ site.framework }} Form Documentation]({%slug htmlhelpers_form_aspnetcore_overview%})

* [{{ site.framework }} Form Demos](https://demos.telerik.com/{{ site.platform }}/form)

{% if site.core %}
* [{{ site.framework }} Form Product Page](https://www.telerik.com/aspnet-core-ui/form)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Form Product Page](https://www.telerik.com/aspnet-mvc/form)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Server-Side API Reference of the Form for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/form)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Form for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/form)
{% endif %}
* [Server-Side API Reference of the DropDownList for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/dropdownlist)
{% if site.core %}
* [Server-Side TagHelper API Reference of the DropDownList for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/dropdownlist)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
