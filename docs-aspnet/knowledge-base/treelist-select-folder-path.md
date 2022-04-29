---
title: Select the Folder Path When Clicking a TreeList Node
description: An example of how to bind the Telerik UI TreeList for ASP.NET {{ site.framework }} to Hierarchical data and select the folder path when a node is clicked.
type: how-to
page_title: Select the Folder Path When Clicking a Telerik UI TreeList for ASP.NET {{ site.framework }} Node
slug: treelist-select-folder-path
tags: treelist, hierarchical, folder, path, tree
ticketid: 1558365
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>TreeList for Progress® Telerik® UI for {{ site.framework }}</td>
 </tr>
</table>

## Description

How can I bind the TreeList to Hierarchical data and select the folder path when a specified node is clicked?

## Solution

To achieve the desired scenario: 

1. Customize the TreeList rows by using the `RowTemplateId` and `AltRowTemplateId` methods. 
1. Enable the `Selectable` option to allow multiple row selection: `.Selectable(s => s.Mode(TreeListSelectionMode.Multiple))`.
1. Handle the `change` event of the TreeList, get the selected node, and manually select its parent nodes.

```View
    @(Html.Kendo().TreeList<HierarchicalViewModel>()
        .Name("treelist")
        .Columns(columns =>
        {
            columns.Add().Field(e => e.ID);
        })
        .Selectable(s => s.Mode(TreeListSelectionMode.Multiple))
        .RowTemplateId("rowTemplate")
        .AltRowTemplateId("altRowTemplate")
        .DataSource(dataSource => dataSource
            .Read(read => read.Action("All", "Home"))
            .Model(m =>
            {
                m.Id(f => f.ID);
                m.ParentId(f => f.ParentID);
                m.Expanded(true);
            })
        )
        .Events(ev => ev.Change("onChange"))
    )

    <script id="rowTemplate" type="text/x-kendo-template">
        <tr data-uid='#: data.model.uid #' role="row" class='#=data.hasChildren? 'parentRow' : 'childRow'#'>
            <td role="gridcell">
                #for(var i = 0; i < (hasChildren ? level : (level + 1)); i++){#
                    <span class="k-icon k-i-none"></span>
                #}#
                #if(data.hasChildren){#
                    <span class="k-icon k-i-#=data.model.expanded? 'collapse' : 'expand'#"></span>
                #}#
                <span class="k-sprite #: data.model.SpriteCssClass #"></span>
                <span> #: data.model.Name # </span>
            </td>
        </tr>
    </script>

    <script id="altRowTemplate" type="text/x-kendo-template">
        <tr data-uid='#: data.model.uid #' role="row" class="k-alt #=data.hasChildren? 'parentRow' : 'childRow'#">
            <td role="gridcell">
                #for(var i = 0; i < (hasChildren ? level : (level + 1)); i++){#
                    <span class="k-icon k-i-none"></span>
                #}#
                #if(data.hasChildren){#
                    <span class="k-icon k-i-#=data.model.expanded? 'collapse' : 'expand'#"></span>
                #}#
                <span class="k-sprite #: data.model.SpriteCssClass #"></span>
                <span> #: data.model.Name # </span>
            </td>
        </tr>
    </script>

    <script>
        function findParentItems(allParentRows, selectedDataItem, selectedParentRows, level) {
            var treeList = $("#treelist").data("kendoTreeList");
            
            for(var i = 0; i < allParentRows.length; i++) {
                var currentDataItem = treeList.dataItem(allParentRows[i]);
                var addedItem = $.inArray( allParentRows[i], selectedParentRows );
                var currentLevel = $(allParentRows[i]).find(".k-icon").length; //get the current item level
                if(currentDataItem.ParentID != null && addedItem == -1 && currentLevel < level){
                    for(var j = 0; j < selectedParentRows.length; j++) { //loop through the already stored items
                        var dt = treeList.dataItem(selectedParentRows[j]);
                        if(currentDataItem.ID == dt.ParentID) { //check if the parent is a direct parent of the stored item
                            selectedParentRows.push(allParentRows[i]); //store it
                            findParentItems(allParentRows,currentDataItem, selectedParentRows, currentLevel);
                            break;
                        }
                    }
                }
            }
            return selectedParentRows;
        }

        function onChange(e) {
            var treeList = e.sender;
            var selectedRow = $("#treelist .k-grid-content table tbody").find("tr.k-state-selected");
            var rootLevel = $("#treelist .k-grid-content table tbody").find("tr:first").find(".k-icon").length;
            var level = $(selectedRow).find(".k-icon").length;
            var selectedRowDataItem = treeList.dataItem($(selectedRow));
            var prevParentRows = $(selectedRow).prevAll(".parentRow");

            if(rootLevel < level){ //selecting the root folder
                $("#treelist .k-grid-content table tbody").find("tr:first").addClass("k-state-selected").attr("aria-selected", true);
            }

            if(prevParentRows.length > 0) {
                var selectedParentRows = [];
                prevParentRows = $.grep(prevParentRows, function(n, i) { //get the direct parent of the selected item
                    var dataItem = treeList.dataItem($(n));
                    return (dataItem.ID == selectedRowDataItem.ParentID);
                });
                selectedParentRows.push(prevParentRows[0]); //store it
                var result = findParentItems($(selectedRow).prevAll(".parentRow"), selectedRowDataItem, selectedParentRows, level);

                for(var i = 0; i < result.length; i++) {
                    $(result[i]).addClass("k-state-selected").attr("aria-selected", true); //select the parent folder
                }
            }
        }
    </script>
```
```Controller
    public IActionResult Index()
    {
        return View();
    }

    public JsonResult All([DataSourceRequest] DataSourceRequest request)
    {
        var result = GetHierarchicalData().ToTreeDataSourceResult(request,
            e => e.ID,
            e => e.ParentID,
            e => e
        );
        return Json(result);
    }

    //Populate Hierarchical data
    public static IList<HierarchicalViewModel> GetHierarchicalData()
    {
        var result = new List<HierarchicalViewModel>()
        {
            new HierarchicalViewModel() { ID = 1, ParentID = null, HasChildren = true, Name = "My Documents", Expanded = true, SpriteCssClass = "folder" },
            new HierarchicalViewModel() { ID = 2, ParentID = 1, HasChildren = true, Name = "Test Directory 1", Expanded = true, SpriteCssClass = "folder" },
            new HierarchicalViewModel() { ID = 3, ParentID = 2, HasChildren = true, Name = "Test Directory 1.1",  Expanded = true, SpriteCssClass = "folder" },
            new HierarchicalViewModel() { ID = 301, ParentID = 3, HasChildren = true, Name = "Test Directory 1.1.1",  Expanded = true, SpriteCssClass = "folder" },
            new HierarchicalViewModel() { ID = 302, ParentID = 3, HasChildren = false, Name = "Test Directory 1.1.2", SpriteCssClass = "folder" },
            new HierarchicalViewModel() { ID = 3021, ParentID = 301, HasChildren = false, Name = "Test Directory 1.1.1.1", SpriteCssClass = "folder" },
            new HierarchicalViewModel() { ID = 3022, ParentID = 301, HasChildren = true, Name = "Test Directory 1.1.1.2", Expanded = true, SpriteCssClass = "folder" },
            new HierarchicalViewModel() { ID = 3023, ParentID = 3022, HasChildren = false, Name = "Test Directory 1.1.1.2.1", SpriteCssClass = "folder" },
            new HierarchicalViewModel() { ID = 3024, ParentID = 3022, HasChildren = false, Name = "Test Directory 1.1.1.2.2", SpriteCssClass = "folder" },
            new HierarchicalViewModel() { ID = 4, ParentID = 1, HasChildren = true, Name = "New Web Site", Expanded = true, SpriteCssClass = "folder" },
            new HierarchicalViewModel() { ID = 5, ParentID = 4, HasChildren = true, Name = "mockup.jpg", Expanded = true, SpriteCssClass = "folder" },
            new HierarchicalViewModel() { ID = 100, ParentID = 5, HasChildren = false, Name = "mockup100.jpg", SpriteCssClass = "folder" },
            new HierarchicalViewModel() { ID = 101, ParentID = 5, HasChildren = false, Name = "mockup101.jpg", SpriteCssClass = "folder" }
        };
        return result;
    }

```
```Model
    public class HierarchicalViewModel
    {
        public int ID { get; set; }
        public int? ParentID { get; set; }
        public bool HasChildren { get; set; }
        public string Name { get; set; }
        public string SpriteCssClass { get; set; }
        public string ImageUrl { get; set; }
        public bool Expanded { get; set; }
    }
```

## See Also
* [Using Row Templates in the TreeList for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/rowtemplate)
* [TreeList Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist)