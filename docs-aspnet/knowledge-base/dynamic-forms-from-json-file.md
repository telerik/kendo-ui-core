---
title: Creating Dynamic Forms from a JSON File
description: How can I create dynamic Telerik UI for {{ site.framework }} Forms populated through a JSON file?
type: how-to
page_title: Creating Dynamic Forms from a JSON File
slug: dynamic-forms-from-json-file
tags: form, dynamic, read, json, file, editors
ticketid: 1629362
res_type: kb
component: form
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Form</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.3.1114 version</td>
 </tr>
</table>

## Description

How can I generate dynamic {{ site.product }} Forms through a JSON file?

## Solution

1. Create the JSON file with the following structure and save it into the application.

    ```formData.json
        [{
            "Id": 16014,
            "Properties": [
                {
                    "Property": "Name",
                    "EditorType": "TextBox"
                },
                {
                    "Property": "StartDate",
                    "EditorType": "DatePicker"
                },
                {
                    "Property": "IsActive",
                    "EditorType": "CheckBox"
                },
                {
                    "Property": "Country",
                    "EditorType": "DropDownList"
                }
            ]
        },
        {
            "Id": 18231,
            "Properties": [
                {
                    "Property": "Name",
                    "EditorType": "TextBox"
                },
                {
                    "Property": "IsActive",
                    "EditorType": "CheckBox"
                }
            ]
        }]
    ```

1. Create the following Models:
    * <b>FormViewModel</b>—The Model that defines the properties and structure of the JSON data.

        ```FormViewModel
            public class FormViewModel
            {
                public int Id { get; set; } // The unique Form Id.
                public List<FormItems> Properties { get; set; } // The properties that will be used to populate the Form items.
            }
        ```
    * <b>FormItems</b>—The Model that represents the Form item.

        ```FormItems
            public class FormItems
            {
                public string Property { get; set; } // The name of the property that will bind to each Form item.
                public string EditorType { get; set; } // The name of the editor.
            }
        ```
    * <b>UserViewModel</b>—The Model to which each Form will bind.

        ```UserViewModel
            public class UserViewModel
            {
                public string Name { get; set; }
                public DateTime StartDate { get; set; }
                public bool IsActive { get; set; }
                public int Country { get; set; }
            }
        ```

1. Use the [`JsonConvert.DeserializeObject<T>()`](https://www.newtonsoft.com/json/help/html/Overload_Newtonsoft_Json_JsonConvert_DeserializeObject.htm) method to convert the JSON content from the file into a `List<FormViewModel>` objects.

    ```HomeController.cs
        using Newtonsoft.Json;

        public IActionResult Index()
        {
            var formDataitems = PopulateFormItems();
            return View(formDataitems);
        }

        private List<FormViewModel> PopulateFormItems()
        {
            var path = Path.Combine("wwwroot/formData.json");
            var items = new List<FormViewModel>();
            items = JsonConvert.DeserializeObject<List<FormViewModel>>(System.IO.File.ReadAllText(path));
            return items;
        }
    ```

1. Access the Model collection in the View and loop through each <b>FormViewModel</b> record to generate the respective Forms. Within the Form `Items()` configuration, loop through the nested <b>Properties</b> collection and define the editor of each item based on the value of the <b>EditorType</b> property.

    ```Index.cshtml_HtmlHelper
        @model List<FormViewModel>

        @foreach (var item in Model)
        {
            @(Html.Kendo().Form<UserViewModel>()
            .Name("form_" + item.Id)
            .HtmlAttributes(new { action = "/Home/SaveForm", method = "POST" })
            .FormData(new UserViewModel())
            .Orientation("horizontal")
            .Validatable(v =>
            {
                v.ValidateOnBlur(true);
                v.ValidationSummary(vs => vs.Enable(false));
            })
            .Items(i =>
            {
                foreach (var prop in item.Properties)
                {
                    if (prop.EditorType == "DatePicker")
                    {
                        i.Add()
                        .Field(prop.Property)
                        .Label(l => l.Text(prop.Property))
                        .Editor(e => e.DatePicker());
                    }
                    else if (prop.EditorType == "DropDownList")
                    {
                        i.Add()
                        .Field(prop.Property)
                        .Label(l => l.Text(prop.Property))
                        .Editor(e =>
                        {
                            e.DropDownList()
                            .DataTextField("Text")
                            .DataValueField("Value")
                            .BindTo(new List<SelectListItem>() {
                                new SelectListItem() {
                                    Text = "Country 1",
                                    Value = "1"
                                },
                                new SelectListItem() {
                                    Text = "Country 2",
                                    Value = "2"
                                },
                                new SelectListItem() {
                                    Text = "Country 3",
                                    Value = "3"
                                }
                            });
                        });
                    }
                    else if (prop.EditorType == "CheckBox")
                    {
                        i.Add()
                        .Field(prop.Property)
                        .Label(l => l.Text(prop.Property))
                        .Editor(e => e.CheckBox());
                    }
                    else
                    {
                        i.Add()
                        .Field(prop.Property)
                        .Label(l => l.Text(prop.Property))
                        .Editor(e => e.TextBox());
                    }
                }
            })
            )
        }
    ```
    {% if site.core %}
    ```Index.cshtml_TagHelper
        @addTagHelper *, Kendo.Mvc

        @{
            var countries = new List<SelectListItem>()
            {
                new SelectListItem() {
                    Text = "Country 1",
                    Value = "1"
                },
                new SelectListItem() {
                    Text = "Country 2",
                    Value = "2"
                },
                new SelectListItem() {
                    Text = "Country 3",
                    Value = "3"
                }
            };
        }
        @model List<FormViewModel>

        @foreach (var item in Model)
        {
            <kendo-form name="form_@item.Id" form-data="new UserViewModel()" orientation="horizontal" action="SaveForm" method="POST">
                <form-items>
                    @foreach (var prop in item.Properties)
                    {
                        if (prop.EditorType == "DatePicker")
                        {
                            <form-item field=@prop.Property>
                                <item-label text=@prop.Property />
                                <datepicker-editor />
                            </form-item>
                        }
                        else if (prop.EditorType == "DropDownList")
                        {
                            <form-item field=@prop.Property>
                                <item-label text=@prop.Property />
                                <dropdownlist-editor 
                                    datatextfield="Text"
                                    datavaluefield="Value" 
                                    bind-to="countries" />
                            </form-item>
                        }
                        else if (prop.EditorType == "CheckBox")
                        {
                            <form-item field=@prop.Property >
                                <switch-editor>
                                    <messages checked="Active" unchecked="Inactive" />
                                </switch-editor>
                            </form-item>
                        }
                        else
                        {
                            <form-item field=@prop.Property>
                                <item-label text=@prop.Property />
                                <textbox-editor />
                            </form-item>
                        }

                    }
                </form-items>
                <validatable validate-on-blur="true" />
            </kendo-form>
        }
    ```
    {% endif %}


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

* [Client-Side API Reference of the Form for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/form)
* [Server-Side API Reference of the Form for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/form)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Form for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/form)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
