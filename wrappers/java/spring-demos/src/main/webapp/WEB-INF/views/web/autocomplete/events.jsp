<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/resources/web/autocomplete/taxi.png" var="taxiImg"/>

<demo:header />

	<div class="configuration k-widget k-header" style="width: 200px">
		<span class="configHead">Events log</span>
		<div class="console"></div>
	</div>
	<div id="taxi">
		<label for="states">Select a state in USA:</label>
		<kendo:autoComplete name="states" open="onOpen" close="onClose" change="onChange" select="onSelect" dataBound="onDataBound">
			<kendo:dataSource data="${states}">
			</kendo:dataSource>
		</kendo:autoComplete>
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
                kendoConsole.log("event :: select (" + dataItem + ")" );
            }
        }
        
        function onDataBound(e) {
            if ("kendoConsole" in window) {
               kendoConsole.log("event :: dataBound");
            }
        }
    </script>
    
	<style scoped>
		#taxi {
			width: 240px;
			height: 160px;
			padding: 80px 0 0 200px;
			background: url('${taxiImg}') transparent no-repeat 0 0;
			margin: 40px 0 30px 40px;
		}
		#taxi label {
			display: block;
			color: #333;
			padding-bottom: 5px;
		}
		.k-autocomplete {
			display: block;
			clear: left;
			width: 200px;
			vertical-align: middle;
		}
		.configuration {
			height: 360px;
			margin-bottom: -21px;
		}
		.configuration .console {
			background-color: transparent;
			border: 0;
			height: 320px;
			overflow: auto;
		}
	</style>
<demo:footer />