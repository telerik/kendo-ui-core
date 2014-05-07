<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<c:url value="/resources/shared/icons/sports/snowboarding.png" var="snowboarding"/>

<style scoped>

.k-button .k-image
{
    height: 16px;
}
            
</style>

<kendo:button name="iconButton" type="button" spriteCssClass="k-icon k-i-refresh">
    <kendo:button-content>
        Sprite icon
    </kendo:button-content>
</kendo:button>

<kendo:button name="kendoIconButton" type="button" icon="note">
    <kendo:button-content>
        Kendo UI sprite icon
    </kendo:button-content>
</kendo:button>

<kendo:button name="imageButton" type="button" imageUrl="${snowboarding}">
    <kendo:button-content>
        Image icon
    </kendo:button-content>
</kendo:button>

<demo:footer />