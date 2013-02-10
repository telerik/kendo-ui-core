<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <%: Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ClientProductViewModel>()
        .Name("Grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName);
            columns.ForeignKey(p => p.CategoryID, (System.Collections.IEnumerable)ViewData["categories"], "CategoryID", "CategoryName")
                .Title("Category").Width(150);
            columns.Bound(p => p.UnitPrice).Width(150);
            columns.Command(command => command.Destroy()).Width(110);
        })
        .ToolBar(toolBar =>
            {
                toolBar.Save();
                toolBar.Create();
            })
        .Editable(editable => editable.Mode(GridEditMode.InCell))
        .Filterable()
        .Groupable()
        .Pageable()     
        .Scrollable()
        .HtmlAttributes(new { style = "height:430px;" })    
        .DataSource(dataSource => dataSource
            .Ajax()
            .Batch(true)
            .PageSize(20)
            .ServerOperation(false)
            .Events(events => events.Error("errorHandler"))
            .Model(model =>
            {
                model.Id(p => p.ProductID);
                model.Field(p => p.ProductID).Editable(false);
                model.Field(p => p.CategoryID).DefaultValue(1);       
            })
            .Read(read => read.Action("ForeignKeyColumn_Read", "Grid"))
            .Update(update => update.Action("ForeignKeyColumn_Update", "Grid"))
            .Create(create => create.Action("ForeignKeyColumn_Create", "Grid"))
            .Destroy(destroy => destroy.Action("ForeignKeyColumn_Destroy", "Grid"))
        )
    %>
    <script type="text/javascript">
        function errorHandler(e) {
            if (e.errors) {
                var message = "Errors:\n";
                $.each(e.errors, function (key, value) {
                    if ('errors' in value) {
                        $.each(value.errors, function () {
                            message += this + "\n";
                        });
                    }
                });
                alert(message);
            }
        }
    </script>
</asp:Content>
