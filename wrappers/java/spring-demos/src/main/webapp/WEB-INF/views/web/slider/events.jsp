<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<div id="climateCtrl">
    <kendo:slider name="slider" class="temperature" change="sliderOnChange" slide="sliderOnSlide"
                  min="0" max="30" smallStep="1" largeStep="10" value="18">
	</kendo:slider>
	
	<kendo:slider name="rangeSlider" class="humidity" change="rangeSliderOnChange" slide="rangeSliderOnSlide"
                  min="0" max="10" smallStep="1" largeStep="2" tickPlacement="both">
    </kendo:slider>
</div>

<script>
	function sliderOnSlide(e) {
	    kendoConsole.log("Slide :: new slide value is: " + e.value);
	}
	
	function sliderOnChange(e) {
	    kendoConsole.log("Change :: new value is: " + e.value);
	}
	
	function rangeSliderOnSlide(e) {
	    kendoConsole.log("Slide :: new slide value is: " + e.value.toString().replace(",", " - "));
	}
	
	function rangeSliderOnChange(e) {
	    kendoConsole.log("Change :: new value is: " + e.value.toString().replace(",", " - "));
	}
</script>


<style>
	#climateCtrl {
	    width: 245px;
	    height: 167px;
	    margin: 30px auto;
	    padding: 102px 0 0 156px;
	    background: url('<c:url value="/resources/web/slider/climateController.png" />') transparent no-repeat 0 0;
	}
	.humidity {
	    margin: 67px 0 0 15px;
	    width: 170px;
	}
</style>

<div class="console"></div>

<demo:footer />