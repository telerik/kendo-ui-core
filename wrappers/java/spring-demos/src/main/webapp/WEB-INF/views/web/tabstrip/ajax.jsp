<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<kendo:tabStrip name="tabstrip">
	<kendo:tabStrip-items>
	    <kendo:tabStrip-item text="Dimensions & Weights" selected="true">    
	    </kendo:tabStrip-item>
        <kendo:tabStrip-item text="Engine">
        </kendo:tabStrip-item>
        <kendo:tabStrip-item text="Chassis">
        </kendo:tabStrip-item>
    </kendo:tabStrip-items>
</kendo:tabStrip>

<style scoped>
	#forecast {
	    width: 360px;
	    height: 337px;
	    margin: 30px auto;
	    padding: 80px 15px 0 15px;
	    background: url('<c:url value="/resources/web/tabstrip/forecast.png" />') transparent no-repeat 0 0;
	}
	
	.sunny, .cloudy, .rainy {
	    display: inline-block;
	    margin: 20px 0 20px 10px;
	    width: 128px;
	    height: 128px;
	    background: url('<c:url value="/resources/web/tabstrip/weather.png" />') transparent no-repeat 0 0;
	}
	
	.cloudy{
	    background-position: -128px 0;
	}
	
	.rainy{
	    background-position: -256px 0;
	}
	
	.weather {
	    width: 160px;
	    padding: 40px 0 0 0;
	    float: right;
	}
	
	#forecast h2 {
	    font-weight: lighter;
	    font-size: 5em;
	    padding: 0;
	    margin: 0;
	}
	
	#forecast h2 span {
	    background: none;
	    padding-left: 5px;
	    font-size: .5em;
	    vertical-align: top;
	}
	
	#forecast p {
	    margin: 0;
	    padding: 0;
	}
</style>

<demo:footer />