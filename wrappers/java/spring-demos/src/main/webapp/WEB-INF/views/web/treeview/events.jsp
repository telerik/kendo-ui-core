<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />
<div class="demo-section" style="width: 200px">
    <kendo:treeView name="treeview" select="onSelect" collapse="onCollapse" expand="onExpand" 
                    dragAndDrop="true" dragstart="onDragStart" drag="onDrag" drop="onDrop" 
                    dragend="onDragEnd">
        <kendo:treeView-items>
            <kendo:treeView-item text="Furniture" expanded="true">
                <kendo:treeView-items>
                    <kendo:treeView-item text="Tables & Chairs" />
                    <kendo:treeView-item text="Sofas" />
                    <kendo:treeView-item text="Occasional Furniture" />
                </kendo:treeView-items>
            </kendo:treeView-item>
            <kendo:treeView-item text="Decor" expanded="true">
                <kendo:treeView-items>
                    <kendo:treeView-item text="Bed Linen" />
                    <kendo:treeView-item text="Curtains & Blinds" />
                    <kendo:treeView-item text="Carpets" />
                </kendo:treeView-items>
            </kendo:treeView-item>
            <kendo:treeView-item text="Storage" />
        </kendo:treeView-items>
    </kendo:treeView>
</div>    
    <div class="demo-section">
	    <h3 class="title">Console log
	    </h3>
	    <div class="console"></div>
	</div>
    <script>
	    function onSelect(e) {
	        kendoConsole.log("Selected: " + this.text(e.node));
	    }
	
	    function onCollapse(e) {
	        kendoConsole.log("Collapsing " + this.text(e.node));
	    }
	
	    function onExpand(e) {
	        kendoConsole.log("Expanding " + this.text(e.node));
	    }
	
	    function onDragStart(e) {
	        kendoConsole.log("Started dragging " + this.text(e.sourceNode));
	    }
	
	    function onDrag(e) {
	        kendoConsole.log("Started dragging " + this.text(e.sourceNode));
	    }
	
	    function onDrop(e) {
	        kendoConsole.log(
	        "Dropped " + this.text(e.sourceNode) +
	        " (" + (e.valid ? "valid" : "invalid") + ")"
	        );
	    }
	
	    function onDragEnd(e) {
	        kendoConsole.log("Finished dragging " + this.text(e.sourceNode));
	    }
	
	    function onSelect(e) {
	        kendoConsole.log("Selected: " + this.text(e.node));
	    }
	
	    function onCollapse(e) {
	        kendoConsole.log("Collapsing " + this.text(e.node));
	    }
	
	    function onExpand(e) {
	        kendoConsole.log("Expanding " + this.text(e.node));
	    }
	
	    function onDragStart(e) {
	        kendoConsole.log("Started dragging " + this.text(e.sourceNode));
	    }
	
	    function onDrag(e) {
	        kendoConsole.log("Started dragging " + this.text(e.sourceNode));
	    }
	
	    function onDrop(e) {
	        kendoConsole.log(
	        "Dropped " + this.text(e.sourceNode) +
	        " (" + (e.valid ? "valid" : "invalid") + ")"
	        );
	    }
	
	    function onDragEnd(e) {
	        kendoConsole.log("Finished dragging " + this.text(e.sourceNode));
	    }
	
	    function onNavigate(e) {
	        kendoConsole.log("Navigate " + this.text(e.node));
	    }
    </script>
    
    <style scoped>
    </style>
<demo:footer />
