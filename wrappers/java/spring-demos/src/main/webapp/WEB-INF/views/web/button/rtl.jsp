<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<div class="k-rtl">

<p>

<kendo:button name="textButton" type="button" content="Text button">
</kendo:button>

<kendo:button name="iconTextButton" tag="a" icon="ungroup" content="Icon and text">
</kendo:button>

<kendo:button name="iconButton" tag="em" icon="refresh" content="<span class='k-icon'>Refresh</span>">
</kendo:button>

</p><p>

<kendo:button name="disabledButton" tag="span" enable="false" content="Disabled button">
</kendo:button>

</p>

</div>

<demo:footer />