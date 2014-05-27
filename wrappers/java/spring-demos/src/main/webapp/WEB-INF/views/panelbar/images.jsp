<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/resources/web/window/armchair-402.png" var="armchair" />

<demo:header />
<c:url value="/resources/shared/icons/sports/baseball.png" var="baseball" />
<c:url value="/resources/shared/icons/sports/golf.png" var="golf" />
<c:url value="/resources/shared/icons/sports/swimming.png" var="swimming" />
<c:url value="/resources/shared/icons/sports/snowboarding.png" var="snowboarding" />

<c:url value="/resources/shared/styles/flags.png" var="flags" />

<c:url value="/resources/shared/icons/16/star.png" var="star" />
<c:url value="/resources/shared/icons/16/photo.png" var="photo" />
<c:url value="/resources/shared/icons/16/video.png" var="video" />
<c:url value="/resources/shared/icons/16/speaker.png" var="speaker" />


<div class="demo-section">
	<h3>PanelBar with images</h3>
	
	<kendo:panelBar name="panelbar-images">
		<kendo:panelBar-items>
			<kendo:panelBar-item text="Baseball" imageUrl="${ baseball }">
				<kendo:panelBar-items>
					<kendo:panelBar-item text="Top News" imageUrl="${ star }"/>
					<kendo:panelBar-item text="Photo Galleries" imageUrl="${ photo }"/>
					<kendo:panelBar-item text="Video Records" imageUrl="${ video }"/>
					<kendo:panelBar-item text="Radio Records" imageUrl="${ speaker }"/>
				</kendo:panelBar-items>		
			</kendo:panelBar-item>
			<kendo:panelBar-item text="Golf" imageUrl="${ golf }">
				<kendo:panelBar-items>
					<kendo:panelBar-item text="Top News" imageUrl="${ star }"/>
					<kendo:panelBar-item text="Photo Galleries" imageUrl="${ photo }"/>
					<kendo:panelBar-item text="Video Records" imageUrl="${ video }"/>
					<kendo:panelBar-item text="Radio Records" imageUrl="${ speaker }"/>
				</kendo:panelBar-items>		
			</kendo:panelBar-item>
			<kendo:panelBar-item text="Swimming" imageUrl="${ swimming }">
				<kendo:panelBar-items>
					<kendo:panelBar-item text="Top News" imageUrl="${ star }"/>
					<kendo:panelBar-item text="Photo Galleries" imageUrl="${ photo }"/>					
				</kendo:panelBar-items>		
			</kendo:panelBar-item>
			<kendo:panelBar-item text="Snowboarding" imageUrl="${ snowboarding }">
				<kendo:panelBar-items>
					<kendo:panelBar-item text="Top News" imageUrl="${ star }"/>
					<kendo:panelBar-item text="Photo Galleries" imageUrl="${ photo }"/>					
				</kendo:panelBar-items>		
			</kendo:panelBar-item>
		</kendo:panelBar-items>
	</kendo:panelBar>	
</div>


<div class="demo-section">
	<h3>PanelBar with sprites</h3>
	
	<kendo:panelBar name="panelbar-sprites">
		<kendo:panelBar-items>
			<kendo:panelBar-item text="Brazil" spriteCssClass="brazilFlag">
				<kendo:panelBar-items>
					<kendo:panelBar-item text="History" spriteCssClass="historyIcon"/>				
					<kendo:panelBar-item text="Geography" spriteCssClass="geographyIcon"/>
				</kendo:panelBar-items>		
			</kendo:panelBar-item>
			<kendo:panelBar-item text="India" spriteCssClass="indiaFlag">
				<kendo:panelBar-items>
					<kendo:panelBar-item text="History" spriteCssClass="historyIcon"/>				
					<kendo:panelBar-item text="Geography" spriteCssClass="geographyIcon"/>
				</kendo:panelBar-items>		
			</kendo:panelBar-item>		
			<kendo:panelBar-item text="Netherlands" spriteCssClass="netherlandsFlag">
				<kendo:panelBar-items>
					<kendo:panelBar-item text="History" spriteCssClass="historyIcon"/>				
					<kendo:panelBar-item text="Geography" spriteCssClass="geographyIcon"/>
				</kendo:panelBar-items>		
			</kendo:panelBar-item>
							
		</kendo:panelBar-items>
	</kendo:panelBar>	
</div>

<style scoped>
    .k-panel
    {
        -webkit-transform: translatez(0);
    }

    .demo-section {
        width: 300px;
    }
    .demo-section h3 {
        font-weight: normal;
        padding-bottom: 10px;
    }
    #panelbar-images > .k-item > .k-link > .k-image
    {
        margin-top: 2px;
        margin-left: -5px;
    }

    #panelbar-sprites > .k-item > .k-link > .k-sprite
    {
        margin-top: 6px;
    }

    #panelbar-sprites .k-sprite {
        background-image: url("${flags}");
    }
    .brazilFlag { background-position: 0 0; }
    .indiaFlag { background-position: 0 -32px; }
    .netherlandsFlag { background-position: 0 -64px; }
    .historyIcon { background-position: 0 -96px; }
    .geographyIcon { background-position: 0 -128px; }
</style>

<demo:footer />
