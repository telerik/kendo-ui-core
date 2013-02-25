<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />
<div class="demo-section">
	<kendo:menu name="Menu" open="onOpen" close="onClose" select="onSelect">
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
</div>
<div class="demo-section">
    <h3 class="title">Console log
    </h3>
    <div class="console"></div>
</div>	
<script>
	function onOpen(e) {
	    kendoConsole.log("Opened: " + $(e.item).children(".k-link").text());
	}
	
	function onClose(e) {
	    kendoConsole.log("Closed: " + $(e.item).children(".k-link").text());
	}
	
	function onSelect(e) {
	    kendoConsole.log("Selected: " + $(e.item).children(".k-link").text());
	}
</script>
<div class="console"></div>
<demo:footer />