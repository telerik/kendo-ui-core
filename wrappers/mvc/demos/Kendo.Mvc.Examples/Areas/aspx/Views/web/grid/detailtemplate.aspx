<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <%: Html.Kendo().Grid<Kendo.Mvc.Examples.Models.EmployeeViewModel>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.Bound(e => e.FirstName).Width(120);
                columns.Bound(e => e.LastName).Width(120);
                columns.Bound(e => e.Country).Width(120);
                columns.Bound(e => e.City).Width(120);
                columns.Bound(e => e.Title);
            })
            .Sortable()
            .Pageable()
            .Scrollable()
            .ClientDetailTemplateId("template")
            .HtmlAttributes(new { style = "height:430px;" })
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(5)
                .Read(read => read.Action("HierarchyBinding_Employees", "Grid"))
            )
            .Events(events => events.DataBound("dataBound"))
    %>

    <script id="template" type="text/kendo-tmpl">
       <%: Html.Kendo().TabStrip()
            .Name("tabStrip_#=EmployeeID#")
            .SelectedIndex(0)
            .Animation(animation => animation.Open(open => open.Fade(FadeDirection.In)))
            .Items(items =>
            {
                items.Add().Text("Orders").Content(obj => 
                     Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
                        .Name("grid_#=EmployeeID#")
                        .Columns(columns =>
                        {
                            columns.Bound(o => o.OrderID).Title("ID").Width(56);
                            columns.Bound(o => o.ShipCountry).Width(110);
                            columns.Bound(o => o.ShipAddress);
                            columns.Bound(o => o.ShipName).Width(190);
                        })
                        .DataSource(dataSource => dataSource
                            .Ajax()
                            .PageSize(5)
                            .Read(read => read.Action("HierarchyBinding_Orders", "Grid", new { employeeID = "#=EmployeeID#" }))
                        )
                        .Pageable()
                        .Sortable()
                        .ToClientTemplate()                     
                );
                items.Add().Text("Contact Information").Content(
                    "<div class='employee-details'>" +
                        "<ul>" +
                            "<li><label>Country:</label>#= Country #</li>" +
                            "<li><label>City:</label>#= City #</li>" +
                            "<li><label>Address:</label>#= Address #</li>" +
                            "<li><label>Home Phone:</label>#= HomePhone #</li>" +
                        "</ul>" +
                    "</div>"
                );                
            })
            .ToClientTemplate()
            %>
    </script>

    <script>
        function dataBound() {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        }
    </script>

    <style scoped="scoped">
        .k-detail-cell .k-tabstrip .k-content {
            padding: 0.2em;
        }
        .employee-details ul
        {
            list-style:none;
            font-style:italic;
            margin: 15px;
            padding: 0;
        }
        .employee-details ul li
        {
            margin: 0;
            line-height: 1.7em;
        }

        .employee-details label
        {
            display:inline-block;
            width:90px;
            padding-right: 10px;
            text-align: right;
            font-style:normal;
            font-weight:bold;
        }
    </style>
</asp:Content>
