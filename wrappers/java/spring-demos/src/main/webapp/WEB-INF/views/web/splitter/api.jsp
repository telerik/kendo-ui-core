<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<div class="configuration k-widget k-header" style="z-index:10000">
    <span class="configHead">API Functions</span>
    <ul class="options">
        <li>
            The pane index: <input id="index" type="text" value="0" class="k-textbox" style="margin-top: -5px;" />
        </li>
        <li>Functions:</li>
        <li>
             <button id="toggle" class="k-button">Expand/Collapse</button>
        </li>
        <li>
            <input id="size" type="text" value="100px" class="k-textbox" /> <button id="setSize" class="k-button">Set size</button>
        </li>
        <li>
            <input id="min" type="text" value="50px" class="k-textbox" /> <button id="setMinSize" class="k-button">Set minimum size</button>
        </li>
        <li>
            <input id="max" type="text" value="150px" class="k-textbox" /> <button id="setMaxSize" class="k-button">Set maximum size</button>
        </li>
    </ul>
</div>

<c:url value="/web/splitter/content/1" var="ajaxContent1" />

<kendo:splitter name="splitter" style="height: 300px; width: 72%" orientation="horizontal">
    <kendo:splitter-panes>
	    <kendo:splitter-pane id="left_pane" size="100px" collapsible="true">
	        <p>
	            Left pane
	        </p> 
	    </kendo:splitter-pane>    
	    <kendo:splitter-pane id="ajax_pane" collapsible="false" contentUrl="${ajaxContent1}"></kendo:splitter-pane>    
	    <kendo:splitter-pane id="right_pane" size="20%" collapsible="true">
	        <p>
	            Right pane
	        </p> 
	    </kendo:splitter-pane>
    </kendo:splitter-panes>    
</kendo:splitter>

<script>
	$(document).ready(function() {
	    var panes = $("#splitter").children(),
		    splitter = $("#splitter").data("kendoSplitter"),
	        getPane = function (index) {
	            index = Number(index);
	
	            if(!isNaN(index) && index < panes.length) {
	                return panes[index];
	            }
	        },
	        setSize = function (e) {
	            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
	                var pane = getPane($("#index").val());
	
	                if (!pane) return;
	
	                splitter.size(pane, $("#size").val());
	            }
	        },
	        setMinSize = function (e) {
	            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
	                var pane = getPane($("#index").val());
	
	                if (!pane) return;
	
	                splitter.min(pane, $("#min").val());
	            }
	        },
	        setMaxSize = function (e) {
	            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
	                var pane = getPane($("#index").val());
	
	                if (!pane) return;
	
	                splitter.max(pane, $("#max").val());
	            }
	        };
	
	    $("#toggle").click( function (e) {
	        var pane = getPane($("#index").val());
	        if (!pane) return;
	
	        splitter.toggle(pane, $(pane).width() <= 0);
	    });
	
	    $("#setSize").click(setSize);
	    $("#size").keypress(setSize);
	
	    $("#setMinSize").click(setMinSize);
	    $("#min").keypress(setMinSize);
	
	    $("#setMaxSize").click(setMaxSize);
	    $("#max").keypress(setMaxSize);	
	});
</script>
<style scoped>
	.configuration .options input
	{
	    width: 40px;
	}
</style>

<demo:footer />