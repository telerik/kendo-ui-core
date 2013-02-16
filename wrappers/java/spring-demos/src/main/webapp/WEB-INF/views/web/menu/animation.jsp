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
            <input id="slide" name="animation" type="radio" ${ animation == "slide" ? "checked=\"checked\"" : "" } value="slide" /> <label for="slide">slide animation</label>
        </li> 
        <li>
            <input id="expand" name="animation" type="radio" ${ animation == "expand" ? "checked=\"checked\"" : "" } value="expand" /> <label for="expand">expand animation</label>
        </li>  
        <li> 
        	<input id="opacity" name="opacity" type="checkbox" ${ opacity ? "checked=\"checked\"" : "" } /> <label for="opacity">animate opacity</label>           
        </li>
        <li>
        	<input id="delay" name="delay" type="text" value="${delay}" class="k-textbox" /> <label for="delay">open/close delay</label>
        </li>
    </ul>

    <button class="k-button">Apply</button>
</form>

<kendo:menu name="menu" hoverDelay="${delay}">
	<kendo:menu-animation>
		<kendo:menu-animation-open effects="${animationString}" duration="400"/>
	</kendo:menu-animation>	
    <kendo:menu-items>
        <kendo:menu-item text="Furniture">
            <kendo:menu-items>
                <kendo:menu-item text="Tables & Chairs"></kendo:menu-item>
                <kendo:menu-item text="Sofas"></kendo:menu-item>
                <kendo:menu-item text="Occasional Furniture"></kendo:menu-item>
                <kendo:menu-item text="Childerns Furniture"></kendo:menu-item>
                <kendo:menu-item text="Beds"></kendo:menu-item>
            </kendo:menu-items>
        </kendo:menu-item>
        <kendo:menu-item text="Decor">
            <kendo:menu-items>
                <kendo:menu-item text="Bed Linen"></kendo:menu-item>
                <kendo:menu-item text="Throws"></kendo:menu-item>
                <kendo:menu-item text="Curtains & Blinds"></kendo:menu-item>
                <kendo:menu-item text="Rugs"></kendo:menu-item>
                <kendo:menu-item text="Carpets"></kendo:menu-item>
            </kendo:menu-items>
        </kendo:menu-item>               
        <kendo:menu-item text="Storage">
            <kendo:menu-items>
                <kendo:menu-item text="Wall Shelving"></kendo:menu-item>
                <kendo:menu-item text="Kids Storage"></kendo:menu-item>
                <kendo:menu-item text="Baskets"></kendo:menu-item>
                <kendo:menu-item text="Multimedia Storage"></kendo:menu-item>
                <kendo:menu-item text="Floor Shelving"></kendo:menu-item>
                <kendo:menu-item text="Toilet Roll Holders"></kendo:menu-item>
                <kendo:menu-item text="Storage Jars"></kendo:menu-item>
                <kendo:menu-item text="Drawers"></kendo:menu-item>
                <kendo:menu-item text="Boxes"></kendo:menu-item>
            </kendo:menu-items>
        </kendo:menu-item>
        <kendo:menu-item text="Lights">
            <kendo:menu-items>
                <kendo:menu-item text="Ceiling"></kendo:menu-item>
                <kendo:menu-item text="Table"></kendo:menu-item>
                <kendo:menu-item text="Floor"></kendo:menu-item>
                <kendo:menu-item text="Shades"></kendo:menu-item>
                <kendo:menu-item text="Wall Lights"></kendo:menu-item>
                <kendo:menu-item text="Spotlights"></kendo:menu-item>
                <kendo:menu-item text="Push Light"></kendo:menu-item>
                <kendo:menu-item text="String Lights"></kendo:menu-item>
            </kendo:menu-items>
        </kendo:menu-item>      
    </kendo:menu-items>
</kendo:menu>

<style scoped>
    .configuration .k-textbox
    {
        margin-top: -3px;
    }

    .k-menu
    {
        margin-right: 220px;
    }
</style>

<demo:footer />