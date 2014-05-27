<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />

<kendo:menu name="verticalMenu" orientation="vertical" style="width:140px;margin-bottom:30px">
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

<kendo:menu name="horizontalMenu">
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

<script>  
	$(document.body).keydown(function(e) {
	    if (e.altKey && e.keyCode == 87) {
	        $("#verticalMenu").focus();
	    } else if (e.altKey && e.keyCode == 81) {
	        $("#horizontalMenu").focus();
	    }
	});
</script>

<ul class="keyboard-legend" style="padding-top: 25px">
    <li>
        <span class="button-preview">
            <span class="key-button leftAlign">Alt</span>
            +
            <span class="key-button">W</span>
        </span>
        <span class="button-descr">
            focuses vertical menu (clicking on it or tabbing also work)
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button leftAlign">Alt</span>
            +
            <span class="key-button">Q</span>
        </span>
        <span class="button-descr">
            focuses the horizontal menu (clicking on it or tabbing also work)
        </span>
    </li>
</ul>

<h4>Supported keys and user actions</h4>
<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button">Right</span>
        </span>
        <span class="button-descr">
            Goes to the next item or opens an item group
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">Left</span>
        </span>
        <span class="button-descr">
            Goes to the previous item or closes an item group
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">Down</span>
        </span>
        <span class="button-descr">
            Opens an item group or goes to the next item in a group
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">Up</span>
        </span>
        <span class="button-descr">
            Goes to the previous item in a group
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">Enter</span>
        </span>
        <span class="button-descr">
            Select or navigate item (same as click)
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">Esc</span>
        </span>
        <span class="button-descr">
            closes the innermost open group
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">Tab</span>
        </span>
        <span class="button-descr">
            tabs away from the Menu on the next focusable page element
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button leftAlign">Shift</span>
            +
            <span class="key-button">Tab</span>
        </span>
        <span class="button-descr">
            tabs away from the Menu on the previous focusable page element
        </span>
    </li>
</ul>
<demo:footer />