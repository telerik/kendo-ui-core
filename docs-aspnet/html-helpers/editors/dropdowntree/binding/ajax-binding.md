---
title:  Ajax Binding
page_title: Ajax Binding
description: "Learn how to implement Ajax Binding with Telerik UI DropDownTree component for {{ site.framework }}."
previous_url: /helpers/editors/dropdowntree/ajax-binding
slug: htmlhelpers_dropdowntree_ajaxbinding_aspnetcore
position: 3
---

# Ajax Binding

The DropDownTree provides support for remote data binding by using a `DataSource` configuration object. You can specify a remote endpoint or web service returning data in a `JSON` or `JSONP` format and display the data in the component.

The following example shows how to set up a DropDownTree to use Ajax data binding.

1. Define the data Model.

    >The Model must have a property field that represents the hierarchical relationship of the entries. In this example, this is the `ParentID` field.

    >The `HasChildren` property of the Model is required to render items as parent nodes on the client-side.

    ```Model
        public class HierarchicalViewModel
        {
            public int ID { get; set; }

            public string Name { get; set; }

            public int? ParentID { get; set; }

            public bool HasChildren { get; set; }
        }
    ```

1. Define an Action method in the Controller that returns a JSON-formatted data collection.
By default, the DropDownTree sends to the remote endpoint the `id` of the expanded node as a query string parameter. In this way, you can filter the data collection in the Action method based on the received id parameter, and return the child nodes to the DataSource of the component.

    ```Controller
        public IActionResult Read_DropDownTreeData(int? id)
        {
            var result = GetHierarchicalData()
                .Where(x => id.HasValue ? x.ParentID == id : x.ParentID == null)
                .Select(item => new {
                    id = item.ID,
                    Name = item.Name,
                    hasChildren = item.HasChildren
                });

            return Json(result);
        }

        public static IList<HierarchicalViewModel> GetHierarchicalData()
        {
            var result = new List<HierarchicalViewModel>()
            {
                new HierarchicalViewModel() { ID = 1, ParentID = null, HasChildren = true, Name = "Parent item" },
                new HierarchicalViewModel() { ID = 2, ParentID = 1, HasChildren = true, Name = "Parent item" },
                new HierarchicalViewModel() { ID = 3, ParentID = 1, HasChildren = false, Name = "Item" },
                new HierarchicalViewModel() { ID = 4, ParentID = 2, HasChildren = false, Name = "Item" },
                new HierarchicalViewModel() { ID = 5, ParentID = 2, HasChildren = false, Name = "Item" }
            };

            return result;
        }
    ```

1. Configure the DropDownTree to use remote data binding.

    ```HtmlHelper
        @(Html.Kendo().DropDownTree()
            .Name("dropdowntree")
            .DataTextField("Name")
            .DataValueField("id")
            .DataSource(dataSource => dataSource
                .Read(read => read
                    .Action("Read_DropDownTreeData", "Home")
                )
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-dropdowntree datatextfield="Name" datavaluefield="id" name="dropdowntree" >
            <hierarchical-datasource>
                <schema>
                    <hierarchical-model id="id"></hierarchical-model>
                </schema>
                <transport>
                    <read url="@Url.Action("Read_DropDownTreeData", "Home")" />
                </transport>
            </hierarchical-datasource>
        </kendo-dropdowntree>
    ```
    {% endif %}


## See Also

* [Remote Data Binding by the DropDownTree for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdowntree/remote-data-binding)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdowntree)
* [Server-Side API](/api/dropdowntree)
