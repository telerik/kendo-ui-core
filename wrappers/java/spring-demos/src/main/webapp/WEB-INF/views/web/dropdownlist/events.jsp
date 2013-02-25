<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
	<div class="demo-section">
	    <h3 class="title">Select item</h3>
        <kendo:dropDownList name="dropdownlist" open="onOpen" close="onClose" change="onChange" select="onSelect"
            dataTextField="text" dataValueField="value">
            <kendo:dataSource data="${items}">
            </kendo:dataSource>
        </kendo:dropDownList>
    </div>
    
	<div class="demo-section">
	    <h3 class="title">Console log</h3>
	    <div class="console"></div>
	</div>
    
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
                kendoConsole.log("event :: select (" + dataItem.text + " : " + dataItem.value + ")" );
            }
        }
    </script>
    <style scoped>
	    .demo-section
	    {
	        text-align:center;
	    }
	</style>
<demo:footer />