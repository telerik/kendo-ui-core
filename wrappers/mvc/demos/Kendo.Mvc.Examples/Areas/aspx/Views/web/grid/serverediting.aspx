<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master"
    Inherits="System.Web.Mvc.ViewPage<IEnumerable<ProductViewModel>>" %>

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
            .Read(read => read.Action("ServerEditing", "Grid"))
            .Update(update => update.Action("Update", "Grid"))
            .Create(update => update.Action("Create", "Grid"))
            .Destroy(update => update.Action("Destroy", "Grid"))
        )
    %>
</asp:Content>
