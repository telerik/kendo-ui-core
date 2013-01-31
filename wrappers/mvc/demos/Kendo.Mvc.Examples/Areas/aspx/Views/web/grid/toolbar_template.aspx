<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <% Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ClientProductViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductID).Visible(true).Width(100);
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).Width(100);
            columns.Bound(p => p.QuantityPerUnit);
        })
        .ToolBar(toolbar =>
        {
            toolbar.Template(() =>
            { %> 
               <div class="toolbar">
                        <label class="category-label" for="category">Show products by category:</label>
                            <%:Html.Kendo().DropDownList()
                                .Name("categories")
                                .OptionLabel("All")
                                .DataTextField("CategoryName")
                                .DataValueField("CategoryID")
                                .AutoBind(false)
                                .Events(e => e.Change("categoriesChange"))
                                .DataSource(ds =>
                                {
                                    ds.Read("ToolbarTemplate_Categories", "Grid");
                                })
                             %> 
                            </div>
            <%});
        })
        .HtmlAttributes(new { style = "height: 430px" })
        .Pageable()
        .Sortable()
        .Scrollable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .ServerOperation(false)
            .Model(model => model.Id(p => p.ProductID))
            .Read("ToolbarTemplate_Read", "Grid")
        ).Render();
    %>

    <script>
        function categoriesChange() {
            var value = this.value(),
		 	     grid = $("#grid").data("kendoGrid");

            if (value) {
                grid.dataSource.filter({ field: "CategoryID", operator: "eq", value: parseInt(value) });
            } else {
                grid.dataSource.filter({});
            }
        }
    </script>

    <style scoped="scoped">
        #grid .k-toolbar
        {
            min-height: 27px;
            padding: 1.3em;
        }
        .category-label
        {
            vertical-align: middle;
            padding-right: .5em;
        }
        #category
        {
            vertical-align: middle;
        }
        .toolbar {
            float: right;
        }
    </style>
</asp:Content>