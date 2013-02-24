<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/resources/web/calendar/calendar.png" var="calendarImg"/>
<demo:header />
<div id="background">		
	<kendo:calendar name="calendar">
	</kendo:calendar>
</div>

<style scoped>
	#background {
		width: 254px;
		height: 250px;
		margin: 30px auto;
		padding: 69px 0 0 11px;
		background: url('${calendarImg}') transparent no-repeat 0 0;
	}
	#calendar {
		width: 241px;
	}
</style>
<demo:footer />