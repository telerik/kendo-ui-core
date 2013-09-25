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

<kendo:button name="iconButton" spriteCssClass="k-icon k-i-refresh" content="Sprite icon">
</kendo:button>

<kendo:button name="imageButton" imageUrl="${snowboarding}" content="Image icon">
</kendo:button>

<demo:footer />