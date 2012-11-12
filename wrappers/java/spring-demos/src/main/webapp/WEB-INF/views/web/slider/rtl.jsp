<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<div class="k-rtl">
    <kendo:slider name="slider" class="temperature" min="0" max="30" smallStep="1" largeStep="10" value="18">
	</kendo:slider>
    <br /><br /><br />	
	<kendo:rangeSlider name="rangeSlider" class="humidity" min="0" max="10" smallStep="1" largeStep="2" tickPlacement="both">
    </kendo:rangeSlider>
</div>

<demo:footer />