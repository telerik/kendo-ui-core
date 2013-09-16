<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.Scheduler.MeetingViewModel>>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<%=Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.MeetingViewModel>()
    .Name("scheduler")
    .Date(new DateTime(2013, 6, 13))
    .StartTime(new DateTime(2013, 6, 13, 7, 00, 00))
    .EndTime(new DateTime(2013, 6, 13, 23, 00, 00))    
    .Height(600)   
    .Views(views =>
    {
        views.DayView();        
    })
    .Timezone("Etc/UTC")
    .Group(group => group.Resources("Rooms"))
    .Resources(resource =>
    {
        resource.Add(m => m.RoomID)
            .Title("Room")
            .Name("Rooms")
            .DataTextField("Text")
            .DataValueField("Value")
            .DataColorField("Color")
            .BindTo(new[] { 
                new { Text = "Meeting Room 101", Value = 1, Color = "#6eb3fa" },
                new { Text = "Meeting Room 201", Value = 2, Color = "#f58a8a" } 
            });
        resource.Add(m => m.Atendees)
            .Title("Atendees")
            .Multiple(true)
            .DataTextField("Text")
            .DataValueField("Value")
            .DataColorField("Color")
            .BindTo(new[] { 
                new { Text = "Alex", Value = 1, Color = "#f8a398" },
                new { Text = "Bob", Value = 2, Color = "#51a0ed" }                
            });
    })
    .Events(events => events
        .Add("scheduler_add")
        .Save("scheduler_save")
        .Resize("scheduler_resize")
        .ResizeEnd("scheduler_resizeEnd")
        .Move("scheduler_move")
        .MoveEnd("scheduler_moveEnd")
    )
    .DataSource(dataSource => 
        dataSource.Model(m => { 
               m.Id(f => f.MeetingID);                                                 
        })
    )
    .BindTo(Model) 
%>

<script>
    function scheduler_resize(e) {
        if (roomIsOccupied(e.start, e.end, e.event, e.resources) || attendeeIsOccupied(e.start, e.end, e.event, e.resources)) {
            this.wrapper.find(".k-marquee-color").addClass("invalid-slot");
            e.preventDefault();
        }
    }

    function scheduler_resizeEnd(e) {
        if (!checkAvailability(e.start, e.end, e.events)) {
            e.preventDefault();
        }
    }

    function scheduler_move(e) {
        if (roomIsOccupied(e.start, e.end, e.event, e.resources) || attendeeIsOccupied(e.start, e.end, e.event, e.resources)) {
            this.wrapper.find(".k-event-drag-hint").addClass("invalid-slot");
        }
    }

    function scheduler_moveEnd(e) {
        if (!checkAvailability(e.start, e.end, e.event, e.resources)) {
            e.preventDefault();
        }
    }

    function scheduler_add(e) {
        if (!checkAvailability(e.event.start, e.event.end, e.event)) {
            e.preventDefault();
        }
    }

    function scheduler_save(e) {
        if (!checkAvailability(e.event.start, e.event.end, e.event)) {
            e.preventDefault();
        }
    }

    function occurrencesInRangeByResource(start, end, resourceFieldName, event, resources) {
        var scheduler = $("#scheduler").getKendoScheduler();

        var occurrences = scheduler.occurrencesInRange(start, end);

        var idx = occurrences.indexOf(event);
        if (idx > -1) {
            occurrences.splice(idx, 1);
        }

        event = $.extend({}, event, resources);

        return filterByResource(occurrences, resourceFieldName, event[resourceFieldName]);
    }

    function filterByResource(occurrences, resourceFieldName, value) {
        var result = [];
        var occurrence;

        for (var idx = 0, length = occurrences.length; idx < length; idx++) {
            occurrence = occurrences[idx];
            if (occurrence[resourceFieldName] === value) {
                result.push(occurrence);
            }
        }
        return result;
    }

    function attendeeIsOccupied(start, end, event, resources) {
        var occurrences = occurrencesInRangeByResource(start, end, "attendee", event, resources);
        if (occurrences.length > 0) {
            return true;
        }
        return false;
    }

    function roomIsOccupied(start, end, event, resources) {
        var occurrences = occurrencesInRangeByResource(start, end, "roomId", event, resources);
        if (occurrences.length > 0) {
            return true;
        }
        return false;
    }

    function checkAvailability(start, end, event, resources) {

        if (attendeeIsOccupied(start, end, event, resources)) {
            setTimeout(function () {
                alert("This person is not available in this time period.");
            }, 0);

            return false;
        }

        if (roomIsOccupied(start, end, event, resources)) {
            setTimeout(function () {
                alert("This room is not available in this time period.");
            }, 0);

            return false;
        }

        return true;
    }

</script>

<style scoped>
    .invalid-slot {
        background: red !important;
        cursor: no-drop;
    }
</style>          


</asp:Content>
