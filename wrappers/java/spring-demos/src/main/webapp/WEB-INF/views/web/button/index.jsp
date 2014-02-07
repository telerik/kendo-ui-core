<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<p>

<kendo:button name="textButton" type="button">
	<kendo:button-content>
		Text button
	</kendo:button-content>
</kendo:button>

<kendo:button name="iconTextButton" tag="a" spriteCssClass="k-icon k-i-ungroup">
   Icon and Text
</kendo:button>

<kendo:button name="kendoIconTextButton" tag="a" icon="plus">
	<kendo:button-content>
		Kendo UI Icon
	</kendo:button-content>
</kendo:button>

<kendo:button name="iconButton" tag="em" spriteCssClass="k-icon k-i-refresh">
	<kendo:button-content>
		<span class='k-sprite'>Refresh</span>
	</kendo:button-content>
</kendo:button>

</p><p>

<kendo:button name="disabledButton1" tag="span" enable="false">
	<kendo:button-content>
		Disabled via configuration
	</kendo:button-content>
</kendo:button>

<kendo:button name="disabledButton2" disabled="disabled">
	<kendo:button-content>
		Disabled via HTML attribute
	</kendo:button-content>
</kendo:button>

</p>

<demo:footer />