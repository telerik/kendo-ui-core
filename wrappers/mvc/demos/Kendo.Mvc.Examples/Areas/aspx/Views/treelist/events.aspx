<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" 
Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<%: Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
    .Name("treelist")
    .Toolbar(toolbar => toolbar.Create())
    .Columns(columns =>
    {
        columns.Add().Field(e => e.FirstName).Width(220);
        columns.Add().Field(e => e.LastName).Width(160);
        columns.Add().Field(e => e.HireDate).Format("{0:MMMM d, yyyy}");
        columns.Add().Field(e => e.Extension).Title("Ext").Format("{0:#}");
        columns.Add().Title("Edit").Width(200).Command(c =>
        {
            c.Edit();
            c.Destroy();
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
    .Events(events => {
        events.Edit("onEdit");
        events.Save("onSave");
        events.Remove("onRemove");
        events.DataBinding("onDataBinding");
        events.DataBound("onDataBound");
    })
%>
<div class="box console-section">
    <h4>Console</h4>
    <div class="console"></div>
</div>

<script>
    function onEdit(arg) {
        var model = arg.model;

        kendoConsole.log("TreeList edit: " + model.FirstName + " " + model.LastName);
    }

    function onSave(arg) {
        kendoConsole.log("TreeList save");
    }

    function onRemove(arg) {
        kendoConsole.log("TreeList remove");
    }

    function onDataBound(arg) {
        kendoConsole.log("TreeList data bound");
    }

    function onDataBinding(arg) {
        kendoConsole.log("TreeList data binding");
    }
</script>
</asp:Content>
