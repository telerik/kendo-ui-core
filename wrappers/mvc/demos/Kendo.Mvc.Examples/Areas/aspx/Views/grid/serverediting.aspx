<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master"
    Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.ProductViewModel>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <%: Html.Kendo().Grid(Model)    
        .Name("Grid")
        .Columns(columns => {        
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice);
            columns.Bound(p => p.UnitsInStock);
            columns.Command(command => { command.Edit(); command.Destroy(); });
        })
        .ToolBar(toolbar => toolbar.Create())
        .Editable(editable => editable.Mode(GridEditMode.PopUp))
        .Pageable()
        .Sortable()
        .Scrollable()
        .DataSource(dataSource => dataSource
            .Server()
            .Model(model => model.Id(p => p.ProductID))
            .Read("ServerEditing", "Grid")
            .Update("Update", "Grid")
            .Create("Create", "Grid")
            .Destroy("Destroy", "Grid")
        )
    %>

    <script type="text/javascript">
        $(document).ready(function() {        
            $("form.k-edit-form").kendoValidator();
        });
    </script>
</asp:Content>
