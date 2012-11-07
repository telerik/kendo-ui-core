<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/web/window/content" var="remoteUrl" />

<demo:header />
	<div class="wrap">
		<kendo:window name="window" title="About Alvar Aalto" draggable="true" 
			width="630"
			height="315"  
			content="${remoteUrl}"
			actions="<%=new String[] { \"Refresh\", \"Close\" } %>"
			close="onClose"
			open="onOpen"
			refresh="onRefresh" 	
			activate="onActivate" 
			deactivate="onDeactivate" 
			resize="onResize" 
			dragstart="onDragStart" 
			dragend="onDragEnd">			
		</kendo:window>
	
		<span id="undo" style="display:none" class="k-button">Click here to open the window.</span>
	</div>
	<div class="console"></div>

	<script>
	
	    $(document).ready(function() {
	        $("#undo").bind("click", function() {
                $("#window").data("kendoWindow").open();
                $("#undo").hide();
            });
	    });
	
	    function onOpen(e) {
	        kendoConsole.log("event :: open");
	    }
	
	    function onClose(e) {
	    	$("#undo").show();
	        kendoConsole.log("event :: close");
	    }
	
	    function onActivate(e) {
	        kendoConsole.log("event :: activate");
	    }
	
	    function onDeactivate(e) {
	        kendoConsole.log("event :: deactivate");
	    }
	
	    function onRefresh(e) {
	        kendoConsole.log("event :: refresh");
	    }
	
	    function onResize(e) {
	        kendoConsole.log("event :: resize");
	    }
	
	    function onDragStart(e) {
	        kendoConsole.log("event :: dragstart");
	    }
	
	    function onDragEnd(e) {
	        kendoConsole.log("event :: dragend");
	    }	
	    
	</script>

	<br/>
	
	<style scoped="scoped">
         .wrap 
         {
             min-height:400px;
         }   
         #undo {
             text-align: center;
             position: absolute;
             white-space: nowrap;
             border-width: 1px;
             border-style: solid;
             padding: 2em;
             cursor: pointer;
       	}     
     </style>
<demo:footer />
