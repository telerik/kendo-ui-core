<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<p>

<kendo:button name="textButton" tag="span" content="Text button">
</kendo:button>

<kendo:button name="iconTextButton" type="button" spriteCssClass="k-icon k-i-ungroup" content="Icon and text">
</kendo:button>

<kendo:button name="iconButton" spriteCssClass="k-icon k-i-refresh" content="<span class='k-sprite'>Refresh</span>">
</kendo:button>

</p><p>

<kendo:button name="disabledButton1" enable="false" content="Disabled via configuration">
</kendo:button>

<kendo:button name="disabledButton2" disabled="disabled" content="Disabled via HTML attribute">
</kendo:button>

</p>

<demo:footer />