<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />
<div class="demo-section">
	<kendo:menu name="menu" open="onOpen" close="onClose" select="onSelect" activate="onActivate" deactivate="onDeactivate">
	    <kendo:menu-items>
		    <kendo:menu-item text="First Item">
		        <kendo:menu-items>
		            <kendo:menu-item text="Sub Item 1"></kendo:menu-item>
		            <kendo:menu-item text="Sub Item 2"></kendo:menu-item>
		            <kendo:menu-item text="Sub Item 3"></kendo:menu-item>
		            <kendo:menu-item text="Sub Item 4"></kendo:menu-item>
		        </kendo:menu-items>
		    </kendo:menu-item>
		    <kendo:menu-item text="Second Item">
	            <kendo:menu-items>
	                <kendo:menu-item text="Sub Item 1"></kendo:menu-item>
	                <kendo:menu-item text="Sub Item 2"></kendo:menu-item>
	                <kendo:menu-item text="Sub Item 3"></kendo:menu-item>
	                <kendo:menu-item text="Sub Item 4"></kendo:menu-item>
	            </kendo:menu-items>
	        </kendo:menu-item>
	        <kendo:menu-item text="Third Item">
	            <kendo:menu-items>
	                <kendo:menu-item text="Sub Item 1"></kendo:menu-item>
	                <kendo:menu-item text="Sub Item 2"></kendo:menu-item>
	                <kendo:menu-item text="Sub Item 3"></kendo:menu-item>
	                <kendo:menu-item text="Sub Item 4"></kendo:menu-item>
	            </kendo:menu-items>
	        </kendo:menu-item>
	        <kendo:menu-item text="Fourth Item">
	            <kendo:menu-items>
	                <kendo:menu-item text="Sub Item 1"></kendo:menu-item>
	                <kendo:menu-item text="Sub Item 2"></kendo:menu-item>
	                <kendo:menu-item text="Sub Item 3"></kendo:menu-item>
	                <kendo:menu-item text="Sub Item 4"></kendo:menu-item>
	            </kendo:menu-items>
	        </kendo:menu-item>
	        <kendo:menu-item text="Fifth Item">
	            <kendo:menu-items>
	                <kendo:menu-item text="Sub Item 1"></kendo:menu-item>
	                <kendo:menu-item text="Sub Item 2"></kendo:menu-item>
	                <kendo:menu-item text="Sub Item 3"></kendo:menu-item>
	                <kendo:menu-item text="Sub Item 4"></kendo:menu-item>
	            </kendo:menu-items>
	        </kendo:menu-item>
	    </kendo:menu-items>
	</kendo:menu>
    <br/>
    <div id="context-target">
        Context Menu Target
    </div>

    <kendo:contextMenu name="context-menu" open="onOpen" close="onClose" select="onSelect" activate="onActivate" deactivate="onDeactivate" target="#context-target">
   	    <kendo:contextMenu-items>
   		    <kendo:contextMenu-item text="Item 1">
   		        <kendo:contextMenu-items>
   		            <kendo:contextMenu-item text="Sub Item 1"></kendo:contextMenu-item>
   		            <kendo:contextMenu-item text="Sub Item 2"></kendo:contextMenu-item>
   		            <kendo:contextMenu-item text="Sub Item 3"></kendo:contextMenu-item>
   		            <kendo:contextMenu-item text="Sub Item 4"></kendo:contextMenu-item>
   		        </kendo:contextMenu-items>
   		    </kendo:contextMenu-item>
   		    <kendo:contextMenu-item text="Item 2">
   	            <kendo:contextMenu-items>
   	                <kendo:contextMenu-item text="Sub Item 1"></kendo:contextMenu-item>
   	                <kendo:contextMenu-item text="Sub Item 2"></kendo:contextMenu-item>
   	                <kendo:contextMenu-item text="Sub Item 3"></kendo:contextMenu-item>
   	                <kendo:contextMenu-item text="Sub Item 4"></kendo:contextMenu-item>
   	            </kendo:contextMenu-items>
   	        </kendo:contextMenu-item>
   	        <kendo:contextMenu-item text="Item 3">
   	            <kendo:contextMenu-items>
   	                <kendo:contextMenu-item text="Sub Item 1"></kendo:contextMenu-item>
   	                <kendo:contextMenu-item text="Sub Item 2"></kendo:contextMenu-item>
   	                <kendo:contextMenu-item text="Sub Item 3"></kendo:contextMenu-item>
   	                <kendo:contextMenu-item text="Sub Item 4"></kendo:contextMenu-item>
   	            </kendo:contextMenu-items>
   	        </kendo:contextMenu-item>
   	    </kendo:contextMenu-items>
   	</kendo:contextMenu>
</div>
<div class="demo-section">
    <h3 class="title">Console log
    </h3>
    <div class="console"></div>
</div>	
<script>
    function onOpen(e) {
        kendoConsole.log("Opened: " + ($(e.item).children(".k-link").text() || "ContextMenu"));
    }

    function onClose(e) {
        kendoConsole.log("Closed: " + ($(e.item).children(".k-link").text() || "ContextMenu"));
    }

    function onSelect(e) {
        kendoConsole.log("Selected: " + $(e.item).children(".k-link").text());
    }

    function onActivate(e) {
        kendoConsole.log("Activated: " + ($(e.item).children(".k-link").text() || "ContextMenu"));
    }

    function onDeactivate(e) {
        kendoConsole.log("Deactivated: " + ($(e.item).children(".k-link").text() || "ContextMenu"));
    }
</script>
<style scoped>
    #context-target
    {
        height: 50px;
        border: 1px solid red;
    }
</style>
<demo:footer />
