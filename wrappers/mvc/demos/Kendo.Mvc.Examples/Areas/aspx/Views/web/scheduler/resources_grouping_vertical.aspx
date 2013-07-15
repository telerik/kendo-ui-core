<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content  ContentPlaceHolderID="MainContent" runat="server">

<%=Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.MeetingViewModel>()
    .Name("scheduler")
    .Date(new DateTime(2013,6 ,13))
    .StartTime(new DateTime(2013, 6, 13, 7, 00, 00))
    .Height(600)
    .Views(views =>
    {
        views.DayView();
        views.WeekView(weekView => weekView.Selected(true));
        views.MonthView();
        views.AgendaView();
    })
    .Timezone("Etc/UTC")
    .Group(group => group.Resources("Rooms", "Atendees").Orientation(SchedulerGroupOrientation.Vertical))
    .Resources(resource =>
         {
            resource.Add(m => m.RoomID)
                .Title("Room")
                .Name("Rooms")
                .DataTextField("Text")
                .DataValueField("Value")
                .DataColorField("Color")
                .BindTo(new[] { 
                    new { Text = "Meeting Room 101", Value = 1, Color = "#1c9ec4" },
                    new { Text = "Meeting Room 201", Value = 2, Color = "#ff7663" } 
                });
            resource.Add(m => m.Atendees)
                .Title("Atendees")
                .Name("Atendees")
                .Multiple(true)
                .DataTextField("Text")
                .DataValueField("Value")
                .DataColorField("Color")
                .BindTo(new[] { 
                    new { Text = "Alex", Value = 1, Color = "#ff7663" } ,
                    new { Text = "Bob", Value = 2, Color = "#3a8bd8" } ,
                    new { Text = "Charlie", Value = 3, Color = "#3ba96a" } 
                });
         })
    .DataSource(d => d
            .Model(m => { 
                m.Id(f => f.MeetingID);                                                 
            })
            .Read("Grouping_Vertical_Read", "Scheduler")
                .Create(create => create.Action("Grouping_Vertical_Create", "Scheduler").Data("serialize"))
                .Destroy("Grouping_Vertical_Destroy", "Scheduler")
                .Update(update => update.Action("Grouping_Vertical_Update", "Scheduler").Data("serialize"))
    )
%>

<script type="text/javascript">
    function serialize(data) {
        for (var property in data) {
            if ($.isArray(data[property])) {
                serializeArray(property, data[property], data);
            }
        }
    }

    function serializeArray(prefix, array, result) {
        for (var i = 0; i < array.length; i++) {
            if ($.isPlainObject(array[i])) {
                for (var property in array[i]) {
                    result[prefix + "[" + i + "]." + property] = array[i][property];
                }
            }
            else {
                result[prefix + "[" + i + "]"] = array[i];
            }
        }
    }
</script>

</asp:Content>
