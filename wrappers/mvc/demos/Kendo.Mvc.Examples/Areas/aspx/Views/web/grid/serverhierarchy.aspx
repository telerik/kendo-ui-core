<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master"
    Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.Employee>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <% Html.Kendo().Grid(Model)
        .Name("Employees")
        .Columns(columns =>
        {
            columns.Bound(e => e.FirstName).Width(140);
            columns.Bound(e => e.LastName).Width(140);
            columns.Bound(e => e.Title).Width(200);
            columns.Bound(e => e.Country).Width(200);
            columns.Bound(e => e.City);
        })
        .DetailTemplate(employee => {
            %>            
                <%: Html.Kendo().Grid(employee.Orders)
                        .Name("Orders_" + employee.EmployeeID)
                        .Columns(columns =>
                        {
                            columns.Bound(o => o.OrderID).Width(101);
                            columns.Bound(o => o.ShipCountry).Width(140);
                            columns.Bound(o => o.ShipAddress).Width(200);
                            columns.Bound(o => o.ShipName).Width(200);
                            columns.Bound(o => o.ShippedDate).Format("{0:d}");
                        })
                        .DataSource(dataSource => dataSource.Server())                    
                        .Pageable()
                        .Sortable()
                        .Filterable()
                %>
            <%}
        )
        .RowAction(row => 
        {
            if (row.Index == 0)
            {
                row.DetailRow.Expanded = true;
            }
            else
            {
                var requestKeys = Request.QueryString.Keys.Cast<string>();
                var expanded = requestKeys.Any(key => key.StartsWith("Orders_" + row.DataItem.EmployeeID) ||
                    key.StartsWith("OrderDetails_" + row.DataItem.EmployeeID));
                row.DetailRow.Expanded = expanded;
            }
        })
        .Pageable()
        .DataSource(dataSource => dataSource.Server().PageSize(5))    
        .Sortable()
        .Render();
    %>
</asp:Content>
