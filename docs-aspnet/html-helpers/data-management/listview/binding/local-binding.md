---
title: Local Binding
page_title: Local Binding
description: "Learn how to implement Local Binding with Telerik UI ListView component for {{ site.framework }}."
components: ["listview"]
slug: htmlhelpers_listview_aspnetcore_localbinding
position: 1
---

# Local Binding

When configured for local binding, the ListView serializes the data as part of its `DataSource` and performs all data operations, such as paging, sorting, and filtering, on the client. This binding approach is beneficial if read-only data needs to be employed in the UI.

For a runnable example, refer to the [demo on local binding of the ListView](https://demos.telerik.com/{{ site.platform }}/listview/local-data-binding).  

To configure the ListView for {{ site.framework }} to do local binding:

1. Define a model class or use an existing one from your application.

    ```C#
        public class EmployeeViewModel
        {
            public int EmployeeID
            {
                get;
                set;
            }

            [Required]
            public string FirstName
            {
                get;
                set;
            }

            [Required]
            public string LastName
            {
                get;
                set;
            }

            public string Title
            {
                get;
                set;
            }


            [Required]        
            public string Notes
            {
                get;
                set;
            }
        }
    ```

1. Open the `HomeController.cs` and return an `IEnumerable` of the model type with the View. This is the `View()` which holds the ListView definition.


    ```C#
        public ActionResult Index()
        {
            // Returns a collection of EmployeeViewModels.
            var employees = Enumerable.Range(1, 9)
                .Select(new EmployeeViewModel{
                    EmployeeID = i,
                    FirstName = "FirstName" + i,
                    LastName = "LastName" + i,
                    Title = i % 2 == 0 ? "Manager": "CEO",
                    Notes = i % 2 == 0 ? "Manager at your service": "CEO at your service"
                }); // For the purposes of demonstration, you can mock the data, and copy and paste this snippet.

            return View(employees);
        }
    ```

1. In the `Index.cshtml` view, configure the ListView to accept the model in its constructor and set `ServerOperations(false)`.

    ```HtmlHelper
        @model IEnumerable<Kendo.Mvc.Examples.Models.EmployeeViewModel>
        
        <script type="text/x-kendo-tmpl" id="template">
            <div class="employee">
                 <div class="details">
                     <h2>#=FirstName# #=LastName#</h2>
                     <p>#=Title#</p>
                 </div>
                 <div class='bio'>
                   #=Notes#
                 </div>
            </div>
        </script>

        @(Html.Kendo().ListView(Model)
            .Name("listView")
            .TagName("div")
            .ClientTemplateId("template")
            .DataSource(dataSource => dataSource
                .Ajax()
                .ServerOperation(false)
                .PageSize(3)
            )
            .Pageable()
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc
        @model IEnumerable<Kendo.Mvc.Examples.Models.EmployeeViewModel>

        <script type="text/x-kendo-tmpl" id="template">
            <div class="employee">
                 <div class="details">
                     <h2>#=FirstName# #=LastName#</h2>
                     <p>#=Title#</p>
                 </div>
                 <div class='bio'>
                   #=Notes#
                 </div>
            </div>
        </script>

        <kendo-listview name="listView"
                        tag-name="div"
                        template-id="template">
            <datasource type="DataSourceTagHelperType.Ajax" page-size="3" server-operation="false" data="@Model">
            </datasource>
            <pageable enabled="true" />
        </kendo-listview>
    ```
    {% endif %}

## See Also

* [Knowledge Base Section](/knowledge-base)
* [Server-Side API](/api/listview)