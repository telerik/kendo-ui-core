<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<%: Html.Kendo().Gantt<Kendo.Mvc.Examples.Models.Gantt.TaskViewModel, Kendo.Mvc.Examples.Models.Gantt.DependencyViewModel>()
    .Name("gantt")
    .Columns(columns =>
    {
        columns.Bound(c => c.TaskID).Title("ID").Width(50);
        columns.Bound("title").Editable(true);
        columns.Bound("start").Title("Start Time").Format("{0:MM/dd/yyyy}").Width(100).Editable(true);
        columns.Bound("end").Title("End Time").Format("{0:MM/dd/yyyy}").Width(100).Editable(true);
    })
    .Views(views =>
    {
        views.DayView();
        views.WeekView(weekView => weekView.Selected(true));
        views.MonthView();
    })
    .Height(400)
    .ShowWorkHours(false)
    .ShowWorkDays(false)
    .Snap(false)
    .DataSource(d => d
        .Model(m =>
        {
            m.Id(f => f.TaskID);
            m.ParentId(f => f.ParentID);
            m.OrderId(f => f.OrderId);
            m.Field(f => f.Expanded).DefaultValue(true);
        })
        .Read("ReadTasks", "Gantt")
        .Create("CreateTask", "Gantt")
        .Destroy("DestroyTask", "Gantt")
        .Update("UpdateTask", "Gantt")
    )
    .DependenciesDataSource(d => d
        .Model(m =>
        {
            m.Id(f => f.DependencyID);
            m.PredecessorId(f => f.PredecessorID);
            m.SuccessorId(f => f.SuccessorID);
            m.Type(f => f.Type);
        })
        .Read("ReadDependencies", "Gantt")
        .Create("CreateDependency", "Gantt")
        .Destroy("DestroyDependency", "Gantt")
        .Update("UpdateDependency", "Gantt")
    )
    %>
</asp:Content>
