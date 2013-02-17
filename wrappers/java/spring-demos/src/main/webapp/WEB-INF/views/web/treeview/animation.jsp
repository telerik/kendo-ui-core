<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />

<form class="configuration k-widget k-header" method="Post">
    <span class="configHead">Animation Settings</span>
    <ul class="options">
        <li>
            <input id="toggle" name="animation" type="radio" ${ animation == "toggle" ? "checked=\"checked\"" : "" } value="toggle" /> <label for="toggle">toggle animation</label>
        </li>
        <li>
            <input id="expand" name="animation" type="radio" ${ animation == "expand" ? "checked=\"checked\"" : "" } value="expand" /> <label for="expand">expand animation</label>
        </li>  
        <li> 
        	<input id="opacity" name="opacity" type="checkbox" ${ opacity ? "checked=\"checked\"" : "" } value="true" /> <label for="opacity">animate opacity</label>
        	<input name="opacity" type="hidden" value="false">           
        </li>
    </ul>

    <button class="k-button">Apply</button>
</form>

<div class="demo-section">
    <kendo:treeView name="treeview">
	    <kendo:treeView-animation>
	    	<kendo:treeView-animation-expand effects="${animationConfig}"/>
	    </kendo:treeView-animation>    	
        <kendo:treeView-items>
            <kendo:treeView-item text="Furniture">
                <kendo:treeView-items>
                    <kendo:treeView-item text="Tables & Chairs" />
                    <kendo:treeView-item text="Sofas" />
                    <kendo:treeView-item text="Occasional Furniture" />
                    <kendo:treeView-item text="Childerns Furniture" />
                    <kendo:treeView-item text="Beds" />
                </kendo:treeView-items>
            </kendo:treeView-item>
            <kendo:treeView-item text="Decor" expanded="true">
                <kendo:treeView-items>
                    <kendo:treeView-item text="Bed Linen" />
                    <kendo:treeView-item text="Throws" />
                    <kendo:treeView-item text="Curtains & Blinds" />
                    <kendo:treeView-item text="Rugs" />
                    <kendo:treeView-item text="Carpets" />
                </kendo:treeView-items>
            </kendo:treeView-item>
            <kendo:treeView-item text="Storage">
            	<kendo:treeView-items>
            		<kendo:treeView-item text="Wall Shelving" />
            		<kendo:treeView-item text="Kids Storage" />
            		<kendo:treeView-item text="Baskets" />
            		<kendo:treeView-item text="Multimedia Storage" />
            		<kendo:treeView-item text="Floor Shelving" />
            		<kendo:treeView-item text="Toilet Roll Holders" />
            		<kendo:treeView-item text="Storage Jars" />
            		<kendo:treeView-item text="Drawers" />
            		<kendo:treeView-item text="Boxes" />
            	</kendo:treeView-items>
            </kendo:treeView-item>
        </kendo:treeView-items>
    </kendo:treeView>
</div>

<style scoped>
   .demo-section {
       width: 200px;
   }
</style>

<demo:footer />   