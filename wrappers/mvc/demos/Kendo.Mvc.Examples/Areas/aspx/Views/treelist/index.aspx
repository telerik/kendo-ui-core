<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" 
Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<script id="photo-template" type="text/x-kendo-template">
   <div class='employee-photo'
        style='background-image: url(<%= Url.Content("~/content/web/treelist/people") %>/#: EmployeeId #.jpg);'></div>
   <div class='employee-name'>#: FirstName #</div>
</script>

<div class="demo-section k-header">
    <%: Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
        .Name("treelist")
        .Columns(columns =>
        {
            columns.Add().Field(e => e.FirstName).Width(220).TemplateId("photo-template");
            columns.Add().Field(e => e.LastName).Width(160);
            columns.Add().Field(e => e.Position);
            columns.Add().Field(e => e.Phone).Width(200);
            columns.Add().Field(e => e.Extension).Width(140);
            columns.Add().Field(e => e.Address);
        })
        .Filterable()
        .Sortable()
        .DataSource(dataSource => dataSource
            .Read(read => read.Action("All", "EmployeeDirectory"))
            .Model(m => {
                m.Id(f => f.EmployeeId);
                m.ParentId(f => f.ReportsTo);
                m.Field(f => f.FirstName);
                m.Field(f => f.LastName);
                m.Field(f => f.ReportsTo);
            })
        )
        .Height(540)
    %>
</div>

<style>
    .employee-photo {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-size: 40px 44px;
        background-position: center center;
        vertical-align: middle;
        line-height: 41px;
        box-shadow: inset 0 0 1px #999, inset 0 0 10px rgba(0,0,0,.2);
    }

    .employee-name {
        display: inline-block;
        vertical-align: middle;
        line-height: 41px;
        padding-left: 10px;
    }
</style>

</asp:Content>
