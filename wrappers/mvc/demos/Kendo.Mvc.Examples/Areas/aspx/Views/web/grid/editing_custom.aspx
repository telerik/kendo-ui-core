<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <%: Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ClientOrderViewModel>()
        .Name("Grid")    
        .Columns(columns => {        
            columns.Bound(p => p.OrderID);
            columns.Bound(p => p.Employee).ClientTemplate("#=Employee.EmployeeName#");
            columns.Bound(p => p.ShipAddress);        
        })    
        .ToolBar(toolBar => toolBar.Save())
        .Editable(editable => editable.Mode(GridEditMode.InCell))
        .Pageable()
        .Sortable()
        .Scrollable()
        .DataSource(dataSource => dataSource        
            .Ajax()         
            .Batch(true)
            .ServerOperation(false)
            .Events(events => events.Error("error_handler"))
            .Model(model => model.Id(p => p.OrderID))      
            .Read(read => read.Action("EditingCustom_Read", "Grid"))
            .Update(update => update.Action("EditingCustom_Update", "Grid"))       
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
