<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<div class="k-rtl">

<p>

<kendo:button name="textButton" content="Text button">
</kendo:button>

<kendo:button name="iconTextButton" spriteCssClass="k-icon k-i-ungroup" content="Icon and text">
</kendo:button>

<kendo:button name="iconButton" spriteCssClass="k-icon k-i-refresh" content="<span class='k-sprite'>Refresh</span>">
</kendo:button>

</p><p>

<kendo:button name="disabledButton" enable="false" content="Disabled button">
</kendo:button>

</p>

</div>

<demo:footer />