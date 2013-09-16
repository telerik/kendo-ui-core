<%@page import="java.util.HashMap"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
	Date date = new SimpleDateFormat("yyyy/MM/dd").parse("2013/6/13");
	
	Date startTime = new SimpleDateFormat("yyyy/MM/dd hh:mm").parse("2013/6/13 7:00");
	Date endTime = new SimpleDateFormat("yyyy/MM/dd hh:mm").parse("2013/6/13 23:00");

	ArrayList<HashMap<String, Object>> people = new ArrayList<HashMap<String, Object>>();
	
	HashMap<String, Object> alex = new HashMap<String, Object>();
	alex.put("text", "Alex");
	alex.put("value", 1);
	alex.put("color", "#f8a398");
	people.add(alex);
	HashMap<String, Object> bob = new HashMap<String, Object>();
	bob.put("text", "Bob");
	bob.put("value", 2);
	bob.put("color", "#51a0ed");
	people.add(bob);
	
	ArrayList<HashMap<String, Object>> rooms = new ArrayList<HashMap<String, Object>>();
	
	HashMap<String, Object> room1 = new HashMap<String, Object>();
	room1.put("text", "Meeting Room 101");
	room1.put("value", 1);
	room1.put("color", "#6eb3fa");
	rooms.add(room1);
	HashMap<String, Object> room2 = new HashMap<String, Object>();
	room2.put("text", "Meeting Room 102");
	room2.put("value", 2);
	room2.put("color", "#f58a8a");
	rooms.add(room2);

%>

<demo:header />
    <kendo:scheduler name="scheduler" height="600" date="<%= date %>" 
    	 startTime="<%= startTime %>" endTime="<%= endTime %>" 
    	 resize="scheduler_resize" resizeEnd="scheduler_resizeEnd" move="scheduler_move"
    	 moveEnd="scheduler_moveEnd" add="scheduler_add" save="scheduler_save" >
    	<kendo:scheduler-views>
    		<kendo:scheduler-view type="day" />    		
    	</kendo:scheduler-views>
    	<kendo:dataSource data="${ meetings }" />
    	<kendo:scheduler-group resources="<%= new String[] { \"Rooms\" } %>"/>
    	<kendo:scheduler-resources>
    	    <kendo:scheduler-resource field="roomId" title="Room" name="Rooms">
    			<kendo:dataSource data="<%= rooms %>" />
    		</kendo:scheduler-resource>
    		<kendo:scheduler-resource field="atendees" title="Atendees" multiple="true" name="Atendees">
    			<kendo:dataSource data="<%= people %>" />
    		</kendo:scheduler-resource>
    	</kendo:scheduler-resources>
    </kendo:scheduler>

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

        for(var idx = 0, length = occurrences.length; idx < length; idx++) {
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
            setTimeout(function() {
                alert("This person is not available in this time period.");
            }, 0);

            return false;
        }

        if (roomIsOccupied(start, end, event, resources)) {
            setTimeout(function() {
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

<demo:footer />