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

<div id="organizer">
	<kendo:panelBar name="panelBar" expandMode="single">
		<kendo:panelBar-items>
			<kendo:panelBar-item  text="My Teammates" expanded="true">
				<kendo:panelBar-item-content>
					 <div style="padding: 10px;">
	                        <div class="teamMate">
	                            <img src="${ andrew }" alt="Andrew Fuller">
	                            <h2>Andrew Fuller</h2>
	                            <p>Team Lead</p>
	                        </div>
	                        <div class="teamMate">
	                            <img src="${ nancy }" alt="Nancy Leverling">
	                            <h2>Nancy Leverling</h2>
	                            <p>Sales Associate</p>
	                        </div>
	                        <div class="teamMate">
	                            <img src="${ robert }" alt="Robert King">
	                            <h2>Robert King</h2>
	                            <p>Business System Analyst</p>
	                        </div>
	                    </div>
				</kendo:panelBar-item-content>
			</kendo:panelBar-item>
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

<style scoped="scoped">
    #organizer {
        width: 300px;
        margin: 0 auto;
        padding: 47px 0 0 0;
        background: url('${ orgHead }') transparent no-repeat 0 0;
    }
    #bottom {
        width: 300px;
        height: 90px;
        background: url('${ orgFoot }') transparent no-repeat 0 0;
    }
    .teamMate:after {
        content: ".";
        display: block;
        height: 0;
        line-height: 0;
        clear: both;
        visibility: hidden;
    }
    .teamMate h2 {
        font-size: 1.4em;
        font-weight: normal;
        padding-top: 20px;
    }
    .teamMate p {
        margin: 5px 0;
    }
    .teamMate img {
        float: left;
        margin: 5px 15px 5px 5px;
        border: 1px solid #ccc;
    }
</style>

<demo:footer />
