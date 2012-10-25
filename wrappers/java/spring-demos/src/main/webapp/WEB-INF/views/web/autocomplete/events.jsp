<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
    <div>
        <label for="states">Select a state in USA:</label>
        <kendo:autoComplete name="states" filter="contains" open="onOpen" close="onClose" change="onChange" select="onSelect">
            <kendo:dataSource data="${states}">
            </kendo:dataSource>
        </kendo:autoComplete>
    </div>
    
    <div class="console"></div>
    
    <script>
        function onOpen() {
            if ("kendoConsole" in window) {
                kendoConsole.log("event :: open");
            }
        }
    
        function onClose() {
            if ("kendoConsole" in window) {
                kendoConsole.log("event :: close");
            }
        }
    
        function onChange() {
            if ("kendoConsole" in window) {
                kendoConsole.log("event :: change");
            }
        }
    
        function onSelect(e) {
            if ("kendoConsole" in window) {
                var dataItem = this.dataItem(e.item.index());
                kendoConsole.log("event :: select (" + dataItem + ")" );
            }
        }
    </script>
<demo:footer />