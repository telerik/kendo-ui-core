<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<%=Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.TaskViewModel>()
    .Name("scheduler")
    .Date(new DateTime(2013, 6, 13))
    .StartTime(new DateTime(2013, 6, 13, 7, 00, 00))
    .Height(400)
    .Timezone("Etc/UTC")
    .Views(views =>
    {
        views.DayView();
        views.WeekView(weekView => weekView.Selected(true));
        views.MonthView();
        views.AgendaView();
    })
    .DataSource(d => d
        .Model(m => m.Id(f => f.TaskID))
        .Read("Read", "Scheduler")
        .Create("Create", "Scheduler")
        .Destroy("Destroy", "Scheduler")
        .Update("Update", "Scheduler")
    )
%>

<div class="demo-section">
    <p>
        <label>Current Date:</label> <input id="date" />
    </p>
    <p>
        <label>Current View:</label>
        <select id="views">
            <option value="agenda">Agenda</option>
            <option value="day">Day</option>
            <option value="month">Month</option>
            <option value="week">Week</option>
        </select>
    </p>
</div>
<script>
    $(function () {
        var scheduler = $("#scheduler").data("kendoScheduler");

        $("#date").kendoDatePicker({
            value: new Date("2013/6/13"),
            change: function () {
                scheduler.date(this.value());
            }
        });

        $("#views").kendoDropDownList({
            value: scheduler.view(),
            change: function () {
                scheduler.view(this.value());
            }
        });
    });
</script>

</asp:Content>

