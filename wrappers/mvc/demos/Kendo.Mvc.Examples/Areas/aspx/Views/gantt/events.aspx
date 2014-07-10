<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<%=Html.Kendo().Gantt<Kendo.Mvc.Examples.Models.Gantt.TaskViewModel, Kendo.Mvc.Examples.Models.Gantt.DependencyViewModel>()
    .Name("gantt")
    .Columns(columns =>
    {
        columns.Bound(c => c.TaskID).Title("ID").Width(50);
        columns.Bound("title").Editable(true);
        columns.Bound("start").Title("Start Time").Format("{0:MM/dd/yyyy}").Width(100);
        columns.Bound("end").Title("End Time").Format("{0:MM/dd/yyyy}").Width(100);
    })
    .Views(views =>
    {
        views.DayView();
        views.WeekView(weekView => weekView.Selected(true));
        views.MonthView();
    })
    .Events(events => events
        .DataBound("onDataBound")
        .DataBinding("onDataBinding")
        .Add("onAdd")
        .Edit("onEdit")
        .Cancel("onCancel")
        .Change("onChange")
        .Remove("onRemove")
        .Save("onSave")
        .Navigate("onNavigate")
        .MoveStart("onMoveStart")
        .Move("onMove")
        .MoveEnd("onMoveEnd")
        .ResizeStart("onResizeStart")
        .Resize("onResize")
        .ResizeEnd("onResizeEnd")
    )
    .Height(400)
    .ShowWorkHours(false)
    .ShowWorkDays(false)
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

<div id="example">
    <div class="box">
        <h4>Console log</h4>
        <div class="console"></div>
    </div>

    <script>
        function onChange(e) {
            var gantt = e.sender;
            var selection = gantt.select();

            if (selection.length) {
                var dataItem = gantt.dataItem(selection);
                kendoConsole.log("Gantt selection change :: " + dataItem.title);
            }
        }

        function onAdd(e) {
            kendoConsole.log("Task added");
        }

        function onEdit(e) {
            kendoConsole.log("Task about to be edited :: " + e.task.title);
        }

        function onCancel(e) {
            kendoConsole.log("Cancel task edit :: " + e.task.title);
        }

        function onRemove(e) {
            kendoConsole.log("Task removed :: " + e.task.title);
        }

        function onSave(e) {
            kendoConsole.log("Task saved :: " + e.task.title);
        }

        function onDataBound() {
            kendoConsole.log("Gantt data bound");
        }

        function onDataBinding() {
            kendoConsole.log("Gantt data binding");
        }

        function onNavigate(e) {
            kendoConsole.log(kendo.format("navigate:: view:{0};", e.view));
        }

        function onMoveStart(e) {
            kendoConsole.log("moveStart");
        }

        function onMove(e) {
            kendoConsole.log("move");
        }

        function onMoveEnd(e) {
            kendoConsole.log("moveEnd");
        }

        function onResizeStart(e) {
            kendoConsole.log("resizeStart");
        }

        function onResize(e) {
            kendoConsole.log("resize");
        }

        function onResizeEnd(e) {
            kendoConsole.log("resizeEnd");
        }
    </script>
</div>

</asp:Content>

