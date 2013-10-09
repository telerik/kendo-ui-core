<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<p>

<kendo:button name="textButton" type="button" content="Text button">
</kendo:button>

<kendo:button name="iconTextButton" tag="a" spriteCssClass="k-icon k-i-ungroup" content="Icon and text">
</kendo:button>

<kendo:button name="kendoIconTextButton" tag="a" icon="plus" content="Kendo UI Icon">
</kendo:button>

<kendo:button name="iconButton" tag="em" spriteCssClass="k-icon k-i-refresh" content="<span class='k-sprite'>Refresh</span>">
</kendo:button>

</p><p>

<kendo:button name="disabledButton1" tag="span" enable="false" content="Disabled via configuration">
</kendo:button>

<kendo:button name="disabledButton2" tag="span" disabled="disabled" content="Disabled via HTML attribute">
</kendo:button>

</p>

<demo:footer />