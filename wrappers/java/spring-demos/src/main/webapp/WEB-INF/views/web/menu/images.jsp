<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<c:url value="/resources/shared/icons/sports/baseball.png" var="baseball"/>
<c:url value="/resources/shared/icons/sports/golf.png" var="golf"/>
<c:url value="/resources/shared/icons/sports/swimming.png" var="swimming"/>
<c:url value="/resources/shared/icons/sports/snowboarding.png" var="snowboarding"/>

<c:url value="/resources/shared/icons/16/star.png" var="star"/>
<c:url value="/resources/shared/icons/16/photo.png" var="photo"/>
<c:url value="/resources/shared/icons/16/video.png" var="video"/>
<c:url value="/resources/shared/icons/16/speaker.png" var="speaker"/>

<div class="demo-section">
<kendo:menu name="menuImages">
    <kendo:menu-items>
        <kendo:menu-item text="Baseball" imageUrl="${baseball}">
            <kendo:menu-items>
                <kendo:menu-item text="Top News" imageUrl="${star}"></kendo:menu-item>
                <kendo:menu-item text="Photo Galleries" imageUrl="${photo}"></kendo:menu-item>
                <kendo:menu-item text="Videos Records" imageUrl="${video}"></kendo:menu-item>
                <kendo:menu-item text="Radio Records" imageUrl="${speaker}"></kendo:menu-item>
            </kendo:menu-items>
        </kendo:menu-item>
        <kendo:menu-item text="Golf" imageUrl="${golf}">
            <kendo:menu-items>
                <kendo:menu-item text="Top News" imageUrl="${star}"></kendo:menu-item>
                <kendo:menu-item text="Photo Galleries" imageUrl="${photo}"></kendo:menu-item>
                <kendo:menu-item text="Videos Records" imageUrl="${video}"></kendo:menu-item>
                <kendo:menu-item text="Radio Records" imageUrl="${speaker}"></kendo:menu-item>
            </kendo:menu-items>
        </kendo:menu-item>
        <kendo:menu-item text="Swimming" imageUrl="${swimming}">
            <kendo:menu-items>
                <kendo:menu-item text="Top News" imageUrl="${star}"></kendo:menu-item>
                <kendo:menu-item text="Photo Galleries" imageUrl="${photo}"></kendo:menu-item>
            </kendo:menu-items>
        </kendo:menu-item>
        <kendo:menu-item text="Snowboarding" imageUrl="${snowboarding}">
            <kendo:menu-items>
                <kendo:menu-item text="Top News" imageUrl="${star}"></kendo:menu-item>
                <kendo:menu-item text="Photo Galleries" imageUrl="${photo}"></kendo:menu-item>
            </kendo:menu-items>
        </kendo:menu-item>
    </kendo:menu-items>
</kendo:menu>
</div>

<div class="demo-section">
<kendo:menu name="menuSprites">
    <kendo:menu-items>
        <kendo:menu-item text="Brazil" spriteCssClass="brazilFlag">
	        <kendo:menu-items>
	           <kendo:menu-item text="History" spriteCssClass="historyIcon"></kendo:menu-item>
	           <kendo:menu-item text="Geography" spriteCssClass="geographyIcon"></kendo:menu-item>
            </kendo:menu-items>
        </kendo:menu-item>
        <kendo:menu-item text="India" spriteCssClass="indiaFlag">
            <kendo:menu-items>
               <kendo:menu-item text="History" spriteCssClass="historyIcon"></kendo:menu-item>
               <kendo:menu-item text="Geography" spriteCssClass="geographyIcon"></kendo:menu-item>
            </kendo:menu-items>
        </kendo:menu-item>
        <kendo:menu-item text="Netherlands" spriteCssClass="netherlandsFlag">
            <kendo:menu-items>
               <kendo:menu-item text="History" spriteCssClass="historyIcon"></kendo:menu-item>
               <kendo:menu-item text="Geography" spriteCssClass="geographyIcon"></kendo:menu-item>
            </kendo:menu-items>
        </kendo:menu-item>        
    </kendo:menu-items>
</kendo:menu>
</div>

<style>
    .demo-section {
        margin: 30px auto;
    }
</style>

<demo:footer />