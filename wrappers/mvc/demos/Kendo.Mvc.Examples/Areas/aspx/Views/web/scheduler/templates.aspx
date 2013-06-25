<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.Scheduler.Projection>>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">


<%=Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Projection>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .StartTime(new DateTime(2013, 6, 13, 10, 00, 00))
        .EndTime(new DateTime(2013, 6, 13, 23, 00, 00))
        .Editable(e =>
        {
            e.Create(false);
            e.Confirmation(true);
        })
        .Height(600)
        .EventTemplate(
            "<div style='color:white'>" +
                "<img src='" + Url.Content("~/Content/web/scheduler/") + "#= Image #' style='float:left'>" +
                "<p>" +
                    "#: kendo.toString(Start, 'hh:mm') # - #: kendo.toString(End, 'hh:mm') #" +
                    "</p>" +
                    "<h3>#: title #</h3>" +
                        "<a href='#= Imdb #' style='color:white'>Movie in IMDB</a>" +
                "</div>")
            .Views(views =>
            {
                views.DayView();
                views.AgendaView();
            })
            .BindTo(Model)
 %>

</asp:Content>
