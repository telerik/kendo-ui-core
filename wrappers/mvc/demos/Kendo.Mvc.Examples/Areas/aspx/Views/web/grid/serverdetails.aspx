<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master"
    Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.Employee>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <%Html.Kendo().Grid(Model)
    .Name("Employees")
    .Columns(columns =>
    {
        columns.Bound(e => e.FirstName).Width(140);
        columns.Bound(e => e.LastName).Width(140);
        columns.Bound(e => e.Title).Width(200);
        columns.Bound(e => e.Country).Width(200);
        columns.Bound(e => e.City);
    })
    .DetailTemplate(e =>
    {            
            Html.Kendo().TabStrip()
                    .Name("TabStrip_" + e.EmployeeID)
                    .SelectedIndex(0)
                    .Items(items =>
                    {
                        items.Add().Text("Orders").Content(
                            () => { %>
                                  <%: Html.Kendo().Grid(e.Orders)
                                        .Name("Orders_" + e.EmployeeID)
                                        .Columns(columns =>
                                        {
                                            columns.Bound(o => o.OrderID).Width(101);
                                            columns.Bound(o => o.ShipCountry).Width(140);
                                            columns.Bound(o => o.ShipAddress).Width(200);
                                            columns.Bound(o => o.ShipName).Width(200);
                                            columns.Bound(o => o.ShippedDate).Format("{0:d}");
                                        })
                                        .Pageable()
                                        .Sortable()                                       
                                    %>
                        <% });
                        items.Add().Text("Contact Information").Content(  
                            () => { %>                              
                                <div class="employee-details">                                    
                                    <ul>
                                        <li>
                                            <label>Birth Date:</label><%: e.BirthDate.Value.ToString("d") %>
                                        </li>
                                        <li>
                                            <label>Country:</label><%:e.Country %>
                                        </li>
                                        <li>
                                            <label>City:</label><%:e.City %>
                                        </li>
                                        <li>
                                            <label>Address:</label><%:e.Address %>
                                        </li>
                                        <li>
                                            <label>Home Phone:</label><%:e.HomePhone %>
                                        </li>
                                    </ul>
                                </div>
                                <% });                                                                                       
                    })
                    .Render();
    })
    .RowAction(row =>
    {
        if (row.Index == 0)
        {
            row.DetailRow.Expanded = true;
        }
    })
    .Pageable()
    .DataSource(dataSource => dataSource.Server().PageSize(5))
    .Sortable()
    .Render();
    %>
</asp:Content>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
    <style scoped="scoped">
        .employee-details ul
        {
            list-style: none;
            font-style: italic;
            margin-bottom: 20px;
        }
        .employee-details label
        {
            display: inline-block;
            width: 90px;
            font-style: normal;
            font-weight: bold;
        }
    </style>
</asp:Content>
