<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/web/window/content" var="remoteUrl" />

<demo:header />
	<kendo:window name="window" title="Rams's Ten Principles of Good Design" draggable="true" resizable="true" 
		width="615" close="onClose" content="${remoteUrl }">				
	</kendo:window>    
	
	<span id="undo" style="display:none" class="k-button">Click here to open the window.</span>

	<script>
	    function onClose() {
	        $("#undo").show();
	    }
	
	    $(document).ready(function() {
	        $("#undo").bind("click", function() {
	                $("#window").data("kendoWindow").open();
	                $("#undo").hide();
	            });
	    });
	</script>	
	
	<style scoped="scoped">
         #example 
         {
             min-height:500px;
         }

         #undo {
             text-align: center;
             position: absolute;
             white-space: nowrap;
             padding: 1em;
             cursor: pointer;
         }
         .armchair {
         	float: left;
         	margin: 30px 30px 120px 30px;
         	text-align: center;
         }
         .armchair img {
             display: block;
             margin-bottom: 10px;
         }
     </style>
<demo:footer />
