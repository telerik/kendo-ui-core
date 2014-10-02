<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" %>

<%@ Import Namespace="Kendo.Mvc.Examples.Models.Gantt" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <%: Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
        .Name("gantt")
        .Columns(columns =>
        {
            columns.Bound(c => c.TaskID).Title("ID").Width(50);
            columns.Bound("title").Editable(true).Sortable(true);
            columns.Bound("start").Title("Start Time").Format("{0:MM/dd/yyyy}").Width(100).Editable(true).Sortable(true);
            columns.Bound("end").Title("End Time").Format("{0:MM/dd/yyyy}").Width(100).Editable(true).Sortable(true);
        })
        .Views(views =>
        {
            views.DayView();
            views.WeekView(weekView => weekView.Selected(true));
            views.MonthView();
        })
        .Height(400)
        .Navigatable(true)
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

        <h4>Focus</h4>
        <ul class="keyboard-legend" style="margin-bottom: 1em;">
            <li>
                <span class="button-preview">
                    <span class="key-button leftAlign">Alt</span>
                    +
                        <span class="key-button">w</span>
                </span>
                <span class="button-descr">focuses the widget
                </span>
            </li>
        </ul>

        <h4>Actions applied on Gantt's Timeline</h4>
        <ul class="keyboard-legend" style="margin-bottom: 1em;">
            <li>
                <span class="button-preview">
                    <span class="key-button">Delete</span>
                </span>
                <span class="button-descr">deletes currently selected task and/or dependency
                </span>
            </li>
        </ul>

        <h4>Actions applied on Gantt's TreeList header</h4>
        <ul class="keyboard-legend">
            <li>
                <span class="button-preview">
                    <span class="key-button">Enter</span>
                </span>
                <span class="button-descr">sort by the column
                </span>
            </li>
        </ul>

        <h4>Actions applied on Gantt's TreeList data table</h4>
        <ul class="keyboard-legend">
            <li>
                <span class="button-preview">
                    <span class="key-button wider">Arrow Keys</span>
                </span>
                <span class="button-descr">to navigate over the cells.
                </span>
            </li>
            <li>
                <span class="button-preview">
                    <span class="key-button">Enter</span>
                </span>
                <span class="button-descr">opens cell editor.
                </span>
            </li>
            <li>
                <span class="button-preview">
                    <span class="key-button">Esc</span>
                </span>
                <span class="button-descr">closes cell editor.
                </span>
            </li>
            <li>
                <span class="button-preview">
                    <span class="key-button">Space</span>
                </span>
                <span class="button-descr">selects currently highlighted cell's row.
                </span>
            </li>
            <li>
                <span class="button-preview">
                    <span class="key-button">Delete</span>
                </span>
                <span class="button-descr">deletes currently selected task.
                </span>
            </li>
            <li>
                <span class="button-preview">
                    <span class="key-button">1</span>
                    -
                    <span class="key-button">3</span>
                </span>
                <span class="button-descr">moves between the available views.
                </span>
            </li>
            <li>
                <span class="button-preview">
                    <span class="key-button">Alt Left Arrow</span>
                    /
                    <span class="key-button">Alt Right Arrow</span>
                </span>
                <span class="button-descr">scrolls timeline.
                </span>
            </li>
            <li>
                <span class="button-preview">
                    <span class="key-button">Ctrl Right Arrow</span>
                    /
                    <span class="key-button">Ctrl Left Arrow</span>
                </span>
                <span class="button-descr">expand/collapse summary row.
                </span>
            </li>
        </ul>

        <h4>Actions applied on 'Add Task' action DropDown</h4>
        <ul class="keyboard-legend">
            <li>
                <span class="button-preview">
                    <span class="key-button wider leftAlign">Up Arrow</span>
                </span>
                <span class="button-descr">highlights previous item.
                </span>
            </li>
            <li>
                <span class="button-preview">
                    <span class="key-button wider leftAlign">Down Arrow</span>
                </span>
                <span class="button-descr">highlights next item.
                </span>
            </li>
            <li>
                <span class="button-preview">
                    <span class="key-button wider rightAlign">Enter</span>
                </span>
                <span class="button-descr">selects highlighted item.
                </span>
            </li>
            <li>
                <span class="button-preview">
                    <span class="key-button">Esc</span>
                </span>
                <span class="button-descr">closes the dropdown.
                </span>
            </li>
        </ul>

    <script>
        $(document.body).keydown(function(e) {
            if (e.altKey && e.keyCode == 87) {
                $("#gantt").data("kendoGantt").list.content.find("table").focus();
            }
        });
    </script>

</div>

</asp:Content>