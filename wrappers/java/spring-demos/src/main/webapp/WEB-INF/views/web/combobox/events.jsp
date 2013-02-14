<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
    <div>
        <kendo:comboBox name="input" open="onOpen" close="onClose" change="onChange" dataBound="onDataBound" select="onSelect"
            dataTextField="text" dataValueField="value">
            <kendo:dataSource data="${items}">
            </kendo:dataSource>
        </kendo:comboBox>
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
        
        function onDataBound() {
            if ("kendoConsole" in window) {
                kendoConsole.log("event :: dataBound");
            }
        }
    
        function onSelect(e) {
            if ("kendoConsole" in window) {
                var dataItem = this.dataItem(e.item.index());
                kendoConsole.log("event :: select (" + dataItem.text + " : " + dataItem.value + ")" );
            }
        }
    </script>
<demo:footer />