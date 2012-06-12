<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <%: Html.Kendo().Grid<Kendo.Mvc.Examples.Models.EmployeeViewModel>()
            .Name("Employees")
            .Columns(columns =>
            {
                columns.Bound(e => e.FirstName).Width(140);
                columns.Bound(e => e.LastName).Width(140);
                columns.Bound(e => e.Title).Width(200);
                columns.Bound(e => e.Country).Width(200);
                columns.Bound(e => e.City);
            })
            .ClientDetailTemplateId("employeesTemplate")
            .Pageable()
            .DataSource(dataSource => dataSource
                .Ajax()
                .Read(read => read.Action("HierarchyBinding_Employees", "Grid"))
                .PageSize(5)
            )
            .Sortable()
            .Events(events => events.DataBound("dataBound"))            
    %>

    <script id="employeesTemplate" type="text/kendo-tmpl">
        <%: Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
                .Name("Orders_#=EmployeeID#")
                .Columns(columns =>
                {
                    columns.Bound(o => o.OrderID).Width(101);
                    columns.Bound(o => o.ShipCountry).Width(140);
                    columns.Bound(o => o.ShipAddress).Width(200);
                    columns.Bound(o => o.ShipName).Width(200);
                })
                .DataSource(dataSource => dataSource
                    .Ajax()
                    .Read(read => read.Action("HierarchyBinding_Orders", "Grid", new { employeeID = "#=EmployeeID#" }))
                )
                .Pageable()
                .Sortable()
                .ToClientTemplate()                
        %>
    </script>
    <script>
        function dataBound() {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        }
    </script>
</asp:Content>
