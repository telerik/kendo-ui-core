<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<kendo:tabStrip name="tabStrip" accesskey="w">
	<kendo:tabStrip-items>
	    <kendo:tabStrip-item text="Paris" selected="true">
			<kendo:tabStrip-item-content>
	            <div class="weather">
	                <h2>17<span>&ordm;C</span></h2>
	                <p>Rainy weather in Paris.</p>
	            </div>
	            <span class="rainy">&nbsp;</span>
		    </kendo:tabStrip-item-content>    
	    </kendo:tabStrip-item>
        <kendo:tabStrip-item text="New York">
            <kendo:tabStrip-item-content>
                <div class="weather">
                    <h2>29<span>&ordm;C</span></h2>
                    <p>Sunny weather in New York.</p>
                </div>
                <span class="sunny">&nbsp;</span>
            </kendo:tabStrip-item-content>    
        </kendo:tabStrip-item>
        <kendo:tabStrip-item text="London">
            <kendo:tabStrip-item-content>
                <div class="weather">
                    <h2>21<span>&ordm;C</span></h2>
                    <p>Sunny weather in London.</p>
                </div>
                <span class="sunny">&nbsp;</span>
            </kendo:tabStrip-item-content>    
        </kendo:tabStrip-item>
        <kendo:tabStrip-item text="Moscow">
            <kendo:tabStrip-item-content>
                <div class="weather">
                    <h2>16<span>&ordm;C</span></h2>
                    <p>Cloudy weather in Moscow.</p>
                </div>
                <span class="cloudy">&nbsp;</span>
            </kendo:tabStrip-item-content>    
        </kendo:tabStrip-item>
        <kendo:tabStrip-item text="Sydney">
            <kendo:tabStrip-item-content>
                <div class="weather">
                    <h2>17<span>&ordm;C</span></h2>
                    <p>Rainy weather in Sidney.</p>
                </div>
                <span class="rainy">&nbsp;</span>
            </kendo:tabStrip-item-content>    
        </kendo:tabStrip-item>
    </kendo:tabStrip-items>
</kendo:tabStrip>

<ul id="keyboard-nav" class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button leftAlign wider"><a target="_blank" href="http://en.wikipedia.org/wiki/Access_key">Access key</a></span>
            +
            <span class="key-button">w</span>
        </span>
        <span class="button-descr">
            focuses the widget
        </span>
    </li>
</ul>

<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">left arrow</span>
        </span>
        <span class="button-descr">
            selects previous tab
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">right arrow</span>
        </span>
        <span class="button-descr">
            selects next tab
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">home</span>
        </span>
        <span class="button-descr">
            selects first tab
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">end</span>
        </span>
        <span class="button-descr">
            selects last tab
        </span>
    </li>
</ul>

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
	
	#keyboard-nav
    {
        padding-top: 35px;
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