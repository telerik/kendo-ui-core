<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />

<kendo:splitter name="vertical" orientation="vertical">
    <kendo:splitter-panes>
        <kendo:splitter-pane collapsible="false">
            <kendo:splitter-pane-content>
                <kendo:splitter name="horizontal" style="height: 100%; width: 100%;">
				    <kendo:splitter-panes>
				        <kendo:splitter-pane collapsible="true" size="220px" id="left-pane">
				            <kendo:splitter-pane-content>
				                <div class="pane-content">
					                <h3>Inner splitter / left pane</h3>
	                                <p>Resizable and collapsible.</p>
                                </div>
				            </kendo:splitter-pane-content>
				           
				        </kendo:splitter-pane>
				        <kendo:splitter-pane collapsible="false"  id="center-pane">
				            <kendo:splitter-pane-content>
				                <div class="pane-content">
					                <h3>Inner splitter / center pane</h3>
	                                <p>Resizable only.</p>
                                </div>
				            </kendo:splitter-pane-content>
				        </kendo:splitter-pane>
				        <kendo:splitter-pane collapsible="true" size="220px"  id="right-pane">
				            <kendo:splitter-pane-content>
				                <div class="pane-content">
					                <h3>Inner splitter / right pane</h3>
	                                <p>Resizable and collapsible.</p>
                                </div>
				            </kendo:splitter-pane-content>
				        </kendo:splitter-pane>
				    </kendo:splitter-panes>
				</kendo:splitter>
            </kendo:splitter-pane-content>
        </kendo:splitter-pane>
        <kendo:splitter-pane collapsible="false" resizable="false" size="100px"  id="bottom-pane">
            <kendo:splitter-pane-content>
                <div class="pane-content">
	                <h3>Outer splitter / bottom pane</h3>
	                <p>Non-resizable and non-collapsible.</p>
                </div>
            </kendo:splitter-pane-content>
        </kendo:splitter-pane>
    </kendo:splitter-panes>
</kendo:splitter>

<ul id="keyboard-nav" class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button leftAlign wider">Alt</span>
            <span class="key-button">w</span>
        </span>
        <span class="button-descr">
            focuses first splitbar
        </span>
    </li>
</ul>

<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">left arrow</span>
        </span>
        <span class="button-descr">
            moves focused splitbar to the left (if horizontal splitter)
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">right arrow</span>
        </span>
        <span class="button-descr">
            moves focused splitbar to the right (if horizontal splitter)
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">up arrow</span>
        </span>
        <span class="button-descr">
            moves focused splitbar up (if vertical splitter)
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">down arrow</span>
        </span>
        <span class="button-descr">
            moves focused splitbar down (if vertical splitter)
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider rightAlign">enter</span>
        </span>
        <span class="button-descr">
            accepts current position of the splitbar
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">esc</span>
        </span>
        <span class="button-descr">
            returns splitbar to its initial position
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">ctrl</span>
            <span class="key-button wider leftAlign">left arrow</span>
        </span>
        <span class="button-descr">
            collapses the left pane or expands the right one
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">ctrl</span>
            <span class="key-button wider leftAlign">right arrow</span>
        </span>
        <span class="button-descr">
            collapses the right pane or expands the left one
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">ctrl</span>
            <span class="key-button wider leftAlign">down arrow</span>
        </span>
        <span class="button-descr">
            collapses the upper pane or expands the lower one
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">ctrl</span>
            <span class="key-button wider leftAlign">up arrow</span>
        </span>
        <span class="button-descr">
            collapses the lower pane or expands the upper one
        </span>
    </li>
</ul>

<script>
	//focus the widget
	$(document).on("keydown.examples", function(e) {
	    if (e.altKey && e.keyCode === 87 /* w */) {
	        $("#horizontal").find(".k-splitbar:first").focus();
	    }
	});
</script>

<style scoped>
    #vertical {
        height: 200px;
        width: 700px;
        margin: 0 auto;
    }

    #middle-pane { background-color: rgba(60, 70, 80, 0.10); }
    #bottom-pane { background-color: rgba(60, 70, 80, 0.15); }
    #left-pane, #center-pane, #right-pane  { background-color: rgba(60, 70, 80, 0.05); }

    .pane-content {
        padding: 0 10px;
    }

    #keyboard-nav
    {
        padding-top: 35px;
    }

    ul.keyboard-legend li
    {
        margin: 5px 0 15px 5px;
    }

    div.demo-section
    {
        margin: 0px auto;
    }
</style>

<demo:footer />