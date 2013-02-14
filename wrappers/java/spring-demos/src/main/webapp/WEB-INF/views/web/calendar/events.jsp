<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />
    
   	<div class="configuration k-widget k-header">
	    <span class="configHead">Events log</span>
	    <div class="console"></div>
	</div>

	<div class='reports'>
		<kendo:calendar name="calendar" style="width:243px" change="onChange" navigate="onNavigate">
    	</kendo:calendar>
	</div>
    
    <script>
        function onChange() {
            if ("kendoConsole" in window) {
                kendoConsole.log("Change :: "+kendo.toString(this.value(), 'd'));
            }
        }
    
        function onNavigate() {
            if ("kendoConsole" in window) {
                kendoConsole.log("Navigate");
            }
        }
    </script>
    
    <style scoped="scoped">
	    .reports {
	        width: 265px;
	        height: 247px;
	        padding: 108px 0 0 20px;
	        background: url(<c:url value="/resources/web/calendar/reports.png" />) transparent no-repeat 0 0;
	        margin: 30px 105px 20px;
	    }
	    .configuration {
	        height: 390px;
	        width: 200px;
	    }
	    .configuration .console {
	        background-color: transparent;
	        border: 0;
	        height: 342px;
	        overflow: auto;
	    }
	</style>
<demo:footer />