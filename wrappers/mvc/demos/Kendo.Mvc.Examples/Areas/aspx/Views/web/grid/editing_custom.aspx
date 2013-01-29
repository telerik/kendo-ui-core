<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <%: Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ClientProductViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.Category).ClientTemplate("#=Category.CategoryName#").Width(160);
            columns.Bound(p => p.UnitPrice).Width(120);
            columns.Command(command => command.Destroy()).Width(90);
        })
        .ToolBar(toolBar =>
        {
            toolBar.Create();
            toolBar.Save();
        })
        .Editable(editable => editable.Mode(GridEditMode.InCell))
        .Pageable()
        .Sortable()
        .Scrollable()
        .HtmlAttributes(new { style = "height:430px;" })
        .DataSource(dataSource => dataSource
            .Ajax()
            .Batch(true)
            .ServerOperation(false)
            .Events(events => events.Error("error_handler"))
            .Model(model =>
            {
                model.Id(p => p.ProductID);
                model.Field(p => p.ProductID).Editable(false);
                model.Field(p => p.Category).DefaultValue(
                    ViewData["defaultCategory"] as Kendo.Mvc.Examples.Models.ClientCategoryViewModel);
            })
            .PageSize(20)
            .Read(read => read.Action("EditingCustom_Read", "Grid"))
            .Create(create => create.Action("EditingCustom_Create", "Grid"))
            .Update(update => update.Action("EditingCustom_Update", "Grid"))
            .Destroy(destroy => destroy.Action("EditingCustom_Destroy", "Grid"))
        )
    %>
    <script type="text/javascript">
        function error_handler(e) {
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
