<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<div id="wrapper">
	<kendo:slider name="slider" increaseButtonTitle="Right" decreaseButtonTitle="Left" min="-10" max="10"
				  smallStep="2" largeStep="5" value="0" class="balSlider">
	</kendo:slider>

    <div id="equalizer">
	    <kendo:slider name="eqSlider1" orientation="vertical" min="-20" max="20"
				  smallStep="1" largeStep="20" showButtons="false" value="10" class="eqSlider">
		</kendo:slider>
		
		<kendo:slider name="eqSlider2" orientation="vertical" min="-20" max="20"
				  smallStep="1" largeStep="20" showButtons="false" value="5" class="eqSlider">
		</kendo:slider>
		
		<kendo:slider name="eqSlider3" orientation="vertical" min="-20" max="20"
				  smallStep="1" largeStep="20" showButtons="false" value="0" class="eqSlider">
		</kendo:slider>

		<kendo:slider name="eqSlider4" orientation="vertical" min="-20" max="20"
				  smallStep="1" largeStep="20" showButtons="false" value="10" class="eqSlider">
		</kendo:slider>
		
		<kendo:slider name="eqSlider5" orientation="vertical" min="-20" max="20"
				  smallStep="1" largeStep="20" showButtons="false" value="15" class="eqSlider">
		</kendo:slider>
	</div>
</div>
	
<style>
    #wrapper {
        width: 300px;
        height: 255px;
        padding: 45px 0 0 0;
        margin: 0 auto;
        background: url('<c:url value="/resources/web/slider/eqBack.png" />') no-repeat 0 0;
        text-align: center;
    }
    #equalizer {
        margin-top: 75px;
        padding-right: 15px;
    }
    .balSlider {
        width: 240px;
    }
    .balSlider .k-slider-selection {
        display: none;
    }
    .eqSlider {
        display: inline-block;
        zoom: 1;
        margin: 0 12px;
        height: 122px;
    }
                
    *+html .eqSlider {display:inline;}
                
</style>

<demo:footer />