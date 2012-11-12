<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<c:url value="/web/splitter/content/1" var="ajaxContent1" />

<kendo:splitter name="splitter" expand="onExpand" collapse="onCollapse" contentLoad="onContentLoad" resize="onResize">
    <kendo:splitter-panes>
	    <kendo:splitter-pane id="top_pane" size="100px" collapsible="true">
	        <p>
	            Top pane
	        </p> 
	    </kendo:splitter-pane>    
	    <kendo:splitter-pane id="ajax_pane" collapsible="false" contentUrl="${ajaxContent1}"></kendo:splitter-pane>    
	    <kendo:splitter-pane id="bottom_pane" size="20%" collapsible="true">
	        <p>
	            Bottom pane
	        </p> 
	    </kendo:splitter-pane>
    </kendo:splitter-panes>    
</kendo:splitter>

<script>
    function onResize(e) {
        kendoConsole.log("Resized :: Splitter <b>#" + this.element[0].id + "</b>");
    }

    function onExpand(e) {
        kendoConsole.log("Expanded :: Pane <b>#" + e.pane.id + "</b> from splitter <b>#" + this.element[0].id + "</b> expanded");
    }

    function onCollapse(e) {
        kendoConsole.log("Collapsed :: Pane <b>#" + e.pane.id + "</b> from splitter <b>#" + this.element[0].id + "</b> collapsed");
    }

    function onContentLoad(e) {
        kendoConsole.log("Content loaded in <b>#"+ e.pane.id +
            "</b> and starts with <b>" + $(e.pane).text().substr(0, 20) + "...</b>");
    }
</script>

<div class="console"></div>

<demo:footer />