<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" 
Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section k-header">
    <%: Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
        .Name("treelist")
        .Columns(columns =>
        {
            columns.Add().Field(e => e.FirstName)
                .Title("Name").Width(400)
                .Template("#: FirstName # #: LastName #")
                .FooterTemplate("#= count # employee(s)");            
            columns.Add().Field(e => e.Position);
            columns.Add().Field(e => e.HireDate).Format("{0:MMMM d, yyyy}")
                .FooterTemplate("Last employee hired on #= kendo.format('{0:MMMM d, yyyy}', kendo.parseDate(max)) #");
        })
        .Filterable()
        .Sortable()
        .DataSource(dataSource => dataSource
            .Read(read => read.Action("All", "EmployeeDirectory"))
            .Aggregates(aggr => {
                aggr.Add(e => e.FirstName).Count();
                aggr.Add(e => e.HireDate).Max();
            })
            .Model(m => {
                m.Id(f => f.EmployeeId);
                m.ParentId(f => f.ReportsTo);                
                m.Field(f => f.ReportsTo);
            })
        )
        .Height(540)
    %>
</div>

</asp:Content>
