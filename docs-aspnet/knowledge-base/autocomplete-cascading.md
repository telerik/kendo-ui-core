---
title: Cascading AutoComplete
description: An example on how to implement cascading Telerik UI for {{ site.framework }} AutoComplete control.
type: how-to
page_title: Cascading AutoComplete
slug: autocomplete-cascading
tags: autocomplete, cascading, model, binding, telerik, core, mvc
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} AutoComplete</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.2.718 version</td>
 </tr>
</table>

## Description

How can I implement a cascading Telerik UI for {{ site.framework }} AutoComplete? 

## Solution

The following example consists of two AutoComplete editors that bind to Model properties - `OrganizarionName` and `OrganizationNumber`. When the user types the name of an organization in the first AutoComplete, if the searched name appears as an option and the user selects it, then the second AutoComplete is filtered automatically based on the selected option in the first one and the respective option (the organization number) is selected. Also, when the user types an organization number (the second AutoComplete), the organization name is selected automatically in the first AutoComplete editor.

1. Define the two AutoCompletes bound to the Model properties and configure them to use [server filtering](https://demos.telerik.com/{{ site.platform }}/autocomplete/serverfiltering).

    ```View
        @model OrganizatioViewModel

        <form id="exampleForm" class="k-form k-form-vertical" method="post">
            <label for="OrganizationID" class="k-form-label">Name:</label>
            @(Html.Kendo().AutoCompleteFor(m => m.OrganizationID)
                .DataTextField("Name")
                .Filter("contains")
                .MinLength(1)                            
                .DataSource(source =>
                {
                    source.Read(read =>
                    {
                        read.Action("GetOrganizations", "Home");
                    })
                    .ServerFiltering(true);
                })
            )
                  
            <label asp-for="OrganizationNumber" class="form-label">Number:</label>
            @(Html.Kendo().AutoCompleteFor(m => m.OrganizationNumber)
                .DataTextField("Number")
                .Filter("contains")
                .MinLength(1)
                .DataSource(source =>
                {
                    source.Read(read =>
                    {
                        read.Action("GetOrganizationNumbers", "Home");
                    })
                    .ServerFiltering(true);
                })
            )
            <div class="k-form-buttons">
                <button class="k-button k-button-solid-primary k-button-solid k-button-md k-rounded-md" type="submit">Submit</button>
            </div>
        </form> 
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        @model OrganizatioViewModel

        <form id="exampleForm" class="k-form k-form-vertical" method="post">
            <label for="OrganizationID" class="k-form-label">Name:</label>
            <kendo-autocomplete name="OrganizationID" 
                dataTextField="Name"
                filter="FilterType.Contains"
                min-length="1">
                <datasource type="DataSourceTagHelperType.Custom" server-filtering="true">
                    <transport>
                        <read url="@Url.Action("GetOrganizations", "Home")"/>
                    </transport>
                </datasource>
            </kendo-autocomplete>
                  
            <label asp-for="OrganizationNumber" class="form-label">Number:</label>
            <kendo-autocomplete name="OrganizationNumber" 
                dataTextField="Number"
                filter="FilterType.Contains"
                min-length="1">
                <datasource type="DataSourceTagHelperType.Custom" server-filtering="true">
                    <transport>
                        <read url="@Url.Action("GetOrganizationNumbers", "Home")"/>
                    </transport>
                </datasource>
            </kendo-autocomplete>
            <div class="k-form-buttons">
                <button class="k-button k-button-solid-primary k-button-solid k-button-md k-rounded-md" type="submit">Submit</button>
            </div>
        </form> 
    ```
    {% endif %}
    ```Controller
        public class HomeController : Controller
        {
            public IActionResult Index()
            {
                return View(new OrganizatioViewModel());
            }

            public async Task<JsonResult> GetOrganizations(string text)
            {
                var organizations = await _organizationsDataService.GetAsync();
                if (!string.IsNullOrEmpty(text))
                {
                    var filteredData = organizations.Where(p => p.Name.ToLower().Contains(text.ToLower())).ToList();
                    return Json(filteredData);
                }
                return Json(organizations);
            }

            public async Task<JsonResult> GetOrganizationNumbers(string text)
            {
                var organizations = await _organizationsDataService.GetAsync();
                if (!string.IsNullOrEmpty(text))
                {
                    int organizationNumber = int.Parse(text);
                    var filteredData = organizations.Where(p => p.Number == intOrganizationNumber).ToList();
                    return Json(filteredData);
                }
                return Json(organizations);
            }
        }
    ```
    ```Model
        public class OrganizatioViewModel
        {
            public int? OrganizationID { get; set; }
            public int? OrganizationNumber { get; set; }
        }
    ```

1. Use the [`Data()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/crudoperationbuilder#datasystemstring) method of the DataSource to pass the selected option of the AutoComplete through the Read request of the cascaded AutoComplete. For example, when the user selects an organization name (the first AutoComplete), the name will be sent to the server through the Read request of the OrganizationNumber AutoComplete.

    ```View
        @(Html.Kendo().AutoCompleteFor(m => m.OrganizationID)
            ...                         
            .DataSource(source =>
            {
                source.Read(read =>
                {
                    read.Action("GetOrganizations", "Home").Data("onAdditionalData1");
                })
                .ServerFiltering(true);
            })
        )

        @(Html.Kendo().AutoCompleteFor(m => m.OrganizationNumber)
            ...                         
            .DataSource(source =>
            {
                source.Read(read =>
                {
                    read.Action("GetOrganizationNumbers", "Home").Data("onAdditionalData2");
                })
                .ServerFiltering(true);
            })
        )              
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-autocomplete name="OrganizationID">
            <datasource type="DataSourceTagHelperType.Custom" server-filtering="true">
                <transport>
                    <read url="@Url.Action("GetOrganizations", "Home")" data="onAdditionalData1"/>
                </transport>
            </datasource>
        </kendo-autocomplete>

        <kendo-autocomplete name="OrganizationNumber">
            <datasource type="DataSourceTagHelperType.Custom" server-filtering="true">
                <transport>
                    <read url="@Url.Action("GetOrganizationNumbers", "Home")" data="onAdditionalData2"/>
                </transport>
            </datasource>
        </kendo-autocomplete>
    ```
    {% endif %}
    ```Scripts
        <script>
            function onAdditionalData1() {
                let selectedOrganizationNumber = $("#OrganizationNumber").data("kendoAutoComplete").value(); // Get the currently selected option of the OrganizationNumber AutoComplete, if any
                return {
                    text: $("#OrganizationID").val(), // Pass the search entry of the AutoComplete (the ServerFiltering() is enabled).
                    Number: selectedOrganizationNumber != null ? selectedOrganizationNumber : "" // Pass the selected OrganizationNumber to the server
                };
            }
            function onAdditionalData2() {
                let selectedOrganization = $("#OrganizationID").data("kendoAutoComplete").value();
                return {
                    text: $("#OrganizationNumber").val(),
                    Name: selectedOrganization != null ? selectedOrganization : "" // Pass the selected OrganizationName to the server.
                };
            }
        </script>
    ```

1. Filter the data server-side based on the selected AutoComplete option.

    ```Controller
        public class HomeController : Controller
        {

            public async Task<JsonResult> GetOrganizations(string text, string Number)
            {
                var organizations = await _organizationsDataService.GetAsync();
                if (!string.IsNullOrEmpty(Number))
                {
                    int organizationNumber = int.Parse(Number);
                    var filteredData = organizations.Where(p => p.Number == organizationNumber).ToList();
                    return Json(filteredData);
                }
                if (!string.IsNullOrEmpty(text))
                {
                    var filteredData = organizations.Where(p => p.Name.ToLower().Contains(text.ToLower())).ToList();
                    return Json(filteredData);
                }
                return Json(organizations);
            }

            public async Task<JsonResult> GetOrganizationNumbers(string text, string Name)
            {
                var organizations = await _organizationsDataService.GetAsync();
                if (!string.IsNullOrEmpty(Name))
                {
                    var filteredData = organizations.Where(p => p.Name == Name).ToList();
                    return Json(filteredData);
                }
                if (!string.IsNullOrEmpty(text))
                {
                    int organizationNumber = int.Parse(text);
                    var filteredData = organizations.Where(p => p.Number == intOrganizationNumber).ToList();
                    return Json(filteredData);
                }
                return Json(organizations);
            }
        }
    ```

1. Handle the `Select` event of each AutoComplete component and select the value in the other AutoComplete based on the selected option.

    ```View
        @(Html.Kendo().AutoCompleteFor(m => m.OrganizationID)
            .Events(ev => ev.Select("onSelectOrganizationName"))
            ...                         
        )

        @(Html.Kendo().AutoCompleteFor(m => m.OrganizationNumber)
            .Events(ev => ev.Select("onSelectOrganizationNumber"))
            ...                         
        )              
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-autocomplete name="OrganizationID"  on-select="onSelectOrganizationName">
            ...
        </kendo-autocomplete>

        <kendo-autocomplete name="OrganizationNumber"  on-select="onSelectOrganizationNumber">
            ...
        </kendo-autocomplete>
    ```
    {% endif %}
    ```Scripts
        <script>
            function onSelectOrganizationName(e) {
                let selectedOption = e.sender.value(); // Get the selected organization name.
                var organizationNumbersControl = $("#OrganizationNumber").data("kendoAutoComplete"); // Get a reference to the 2nd AutoComplete that holds the organization number.
                setTimeout(function () {
                    if (selectedOption != null && organizationNumbersControl.value() != selectedOption) {
                        organizationNumbersControl.dataSource.fetch(function () { // Make a request to the server to get the Organization numbers data
                            let data = this.data(); // The server returns the filtered data.
                            if (data.length == 1) {
                                organizationNumbersControl.value(data[0].Number); // Set the organization number value.
                                organizationNumbersControl.trigger("change");
                            }
                        });
                    }
                }, 100);
            }

            function onSelectOrganizationNumber(e) {
                let selectedOption = e.sender.value();
                var organizationNamesControl = $("#OrganizationID").data("kendoAutoComplete");
                setTimeout(function () {
                    if (selectedOption != null && organizationNamesControl.value() != selectedOption) {
                        organizationNamesControl.dataSource.fetch(function () {
                            let data = this.data();
                            if (data.length == 1) {
                                organizationNamesControl.value(data[0].Name);
                                organizationNamesControl.trigger("change");
                            }
                        });
                    }
                }, 100);
            }
        </script>
    ```

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} AutoComplete Documentation]({%slug htmlhelpers_autocomplete_aspnetcore%})

* [{{ site.framework }} AutoComplete Demos](https://demos.telerik.com/{{ site.platform }}/autocomplete/index)

{% if site.core %}
* [{{ site.framework }} AutoComplete Product Page](https://www.telerik.com/aspnet-core-ui/autocomplete)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} AutoComplete Product Page](https://www.telerik.com/aspnet-mvc/autocomplete)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the AutoComplete for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/autocomplete)
* [Server-Side API Reference of the AutoComplete for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/autocomplete)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

