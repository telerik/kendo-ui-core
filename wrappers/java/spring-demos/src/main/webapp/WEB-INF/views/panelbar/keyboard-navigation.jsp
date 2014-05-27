<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/resources/web/window/armchair-402.png" var="armchair" />

<demo:header />
<c:url value="/resources/web/panelbar/andrew.jpg" var="andrew" />
<c:url value="/resources/web/panelbar/nancy.jpg" var="nancy" />
<c:url value="/resources/web/panelbar/robert.jpg" var="robert" />

<c:url value="/resources/web/panelbar/orgHead.png" var="orgHead" />
<c:url value="/resources/web/panelbar/orgFoot.png" var="orgFoot" />

<div class="demo-section">
	<kendo:panelBar name="panelBar" accesskey="w">
		<kendo:panelBar-items>
			<kendo:panelBar-item  text="Projects">
				<kendo:panelBar-items>
					<kendo:panelBar-item text="New Business Plan"/>
					<kendo:panelBar-item text="Sales Forecasts">
						<kendo:panelBar-items>
							<kendo:panelBar-item text="Q1 Forecast"/>
							<kendo:panelBar-item text="Q2 Forecast"/>
							<kendo:panelBar-item text="Q3 Forecast"/>
							<kendo:panelBar-item text="Q4 Forecast"/>		
						</kendo:panelBar-items>
					</kendo:panelBar-item>
					<kendo:panelBar-item text="Sales Reports"/>
				</kendo:panelBar-items>
			</kendo:panelBar-item>
			<kendo:panelBar-item  text="Programs">
				<kendo:panelBar-items>
					<kendo:panelBar-item text="Monday"/>
					<kendo:panelBar-item text="Tuesday"/>
					<kendo:panelBar-item text="Wednesday"/>
					<kendo:panelBar-item text="Thursday"/>
					<kendo:panelBar-item text="Friday"/>
				</kendo:panelBar-items>
			</kendo:panelBar-item>
			<kendo:panelBar-item text="Communication" enabled="false"/>
		</kendo:panelBar-items>
	</kendo:panelBar>
	<div id="bottom"></div>
</div>

<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button leftAlign wider"><a target="_blank" href="http://en.wikipedia.org/wiki/Access_key">Access key</a></span>
            +
            <span class="key-button">w</span>
        </span>
        <span class="button-descr">
            focuses the widget
        </span>
    </li>
</ul>

<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">up arrow</span>
        </span>
        <span class="button-descr">
            highlights previous item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">left arrow</span>
        </span>
        <span class="button-descr">
            highlights previous item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">down arrow</span>
        </span>
        <span class="button-descr">
            highlights next item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">right arrow</span>
        </span>
        <span class="button-descr">
            highlights next item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">home</span>
        </span>
        <span class="button-descr">
            selects first item in the list
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">end</span>
        </span>
        <span class="button-descr">
            selects last item in the list
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider rightAlign">enter</span>
        </span>
        <span class="button-descr">
            selects highlighted item / toggles item's group
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button widest">space</span>
        </span>
        <span class="button-descr">
            selects highlighted item / toggles item's group
        </span>
    </li>
</ul>

<style scoped>
    .demo-section
    {
        width: 200px;
    }
</style>

<demo:footer />
