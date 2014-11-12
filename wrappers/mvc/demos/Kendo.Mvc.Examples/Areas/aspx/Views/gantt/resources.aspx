<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" %>

<%@ Import Namespace="Kendo.Mvc.Examples.Models.Gantt" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <%: Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
        .Name("gantt")
        .Columns(columns =>
        {
            columns.Bound("title").Editable(true).Sortable(true);
            columns.Resources("resources").Editable(true).Title("Assigned Resources");
        })
        .Views(views =>
        {
            views.DayView();
            views.WeekView();
            views.MonthView(monthView => monthView.Selected(true));
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
        .Resources(r => r
            .Field("resources")
            .DataColorField("Color")
            .DataTextField("Name")
            .DataSource(d => d
                .Custom()
                .Schema(s => s
                    .Model(m => m.Id("ID"))
                    .Data("Data")
                )
                .Transport(t =>
                {
                    t.Read("ReadResources", "Gantt");
                })
            )
        )
        .Assignments<ResourceAssignmentViewModel>(a => a
            .DataTaskIdField("TaskID")
            .DataResourceIdField("ResourceID")
            .DataValueField("Units")
            .DataSource(d => d
                .Model(m => 
                {
                    m.Id(f => f.ID);
                })
                .Read("ReadAssignments", "Gantt")
                .Create("CreateAssignment", "Gantt")
                .Destroy("DestroyAssignment", "Gantt")
                .Update("UpdateAssignment", "Gantt")
            )
        )
        %>
</asp:Content>
