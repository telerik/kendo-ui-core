<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master"
    Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="k-rtl">
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
</div>
</asp:Content>
