<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" 
Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section k-header">
    <%:Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
        .Name("treelist")
        .Toolbar(toolbar => toolbar.Create())
        .Columns(columns =>
        {
            columns.Add().Field(e => e.FirstName).Width(220);
            columns.Add().Field(e => e.LastName).Width(160);
            columns.Add().Field(e => e.Position);
            columns.Add().Field(e => e.HireDate).Format("{0:MMMM d, yyyy}");
            columns.Add().Field(e => e.Phone);
            columns.Add().Field(e => e.Extension).Title("Ext").Format("{0:#}");
            columns.Add().Title("Edit").Width(200).Command(c =>
            {
                c.Edit();
                c.Destroy();
            })
            .Attributes(new {
                style = "text-align: center;"
            });
        })
        .DataSource(dataSource => dataSource
            .Create(create => create.Action("Create", "EmployeeDirectory"))
            .Read(read => read.Action("All", "EmployeeDirectory"))
            .Update(update => update.Action("Update", "EmployeeDirectory"))
            .Destroy(delete => delete.Action("Destroy", "EmployeeDirectory"))
            .Model(m => {
                m.Id(f => f.EmployeeId);
                m.ParentId(f => f.ReportsTo);
                m.Field(f => f.FirstName);
                m.Field(f => f.LastName);
                m.Field(f => f.ReportsTo);
                m.Field(f => f.HireDate);
                m.Field(f => f.BirthDate);
                m.Field(f => f.Extension);
                m.Field(f => f.Position);
            })
        )
        .Height(540)
     %>
</div>
</asp:Content>
