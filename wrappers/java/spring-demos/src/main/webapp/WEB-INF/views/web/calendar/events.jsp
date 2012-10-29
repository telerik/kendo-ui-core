<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
    <kendo:calendar name="calendar" change="onChange" navigate="onNavigate">
    </kendo:calendar>
   
    <div class="console"></div>
    
    <script>
        function onChange() {
            if ("kendoConsole" in window) {
                kendoConsole.log("event :: change");
            }
        }
    
        function onNavigate() {
            if ("kendoConsole" in window) {
                kendoConsole.log("event :: navigate");
            }
        }
    </script>
<demo:footer />