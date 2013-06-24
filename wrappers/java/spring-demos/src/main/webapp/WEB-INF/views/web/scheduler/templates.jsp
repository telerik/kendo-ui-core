<%@page import="java.util.HashMap"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
	Date date = new SimpleDateFormat("yyyy/MM/dd").parse("2013/6/13");
	
	Date startTime = new SimpleDateFormat("yyyy/MM/dd hh:mm").parse("2013/6/13 10:00");
	Date endTime = new SimpleDateFormat("yyyy/MM/dd hh:mm").parse("2013/6/13 23:00");
	
%>
<demo:header />
    <kendo:scheduler name="scheduler" eventTemplate="event-template" height="600" date="<%= date %>" 
    	editable="false" startTime="<%= startTime %>" endTime="<%= endTime %>">
    	<kendo:scheduler-views>
    		<kendo:scheduler-view type="day" />
    		<kendo:scheduler-view type="agenda" />
    	</kendo:scheduler-views>
    	<kendo:dataSource data="${ projections }" />
    </kendo:scheduler>
    
<script id="event-template" type="text/x-kendo-template">
    <div style="color:white">
        <img src="#= image #" style="float:left">
        <p>
            #: kendo.toString(start, "hh:mm") # - #: kendo.toString(end, "hh:mm") #
        </p>
        <h3>#: title #</h3>
        <a href="#= imdb #" style="color:white">Movie in IMDB</a>
    </div>
</script>
<demo:footer />