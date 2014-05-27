<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />

    <div class="chart-wrapper">
        <h2>Sales statistics</h2>        
        <kendo:chart name="chart-oct">
             <kendo:chart-title text="October" position="bottom" />
             <kendo:chart-legend visible="false" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="funnel" data="${octData}" dynamicSlope="false" dynamicHeight="false">
                	<kendo:chart-seriesItem-labels visible="true" color="white" background="transparent" format="N0" />
                </kendo:chart-seriesItem>
             </kendo:chart-series>
             <kendo:chart-tooltip visible="true" template="#= category #" />
         </kendo:chart>
         <kendo:chart name="chart-nov">
             <kendo:chart-title text="November" position="bottom" />
             <kendo:chart-legend visible="false" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="funnel" data="${novData}" dynamicSlope="false" dynamicHeight="false">
                	<kendo:chart-seriesItem-labels visible="true" color="white" background="transparent" format="N0" />
                </kendo:chart-seriesItem>
             </kendo:chart-series>
             <kendo:chart-tooltip visible="true" template="#= category #" />
         </kendo:chart>
         <kendo:chart name="chart-dec">
             <kendo:chart-title text="December" position="bottom" />
             <kendo:chart-legend visible="false" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="funnel" data="${decData}" dynamicSlope="false" dynamicHeight="false">
                	<kendo:chart-seriesItem-labels visible="true" color="white" background="transparent" format="N0" />
                </kendo:chart-seriesItem>
             </kendo:chart-series>
             <kendo:chart-tooltip visible="true" template="#= category #" />
         </kendo:chart>
    </div>
    <div class="configuration-horizontal">
        <div class="config-section">
            <label class="configHead"><input type="checkbox" id="dynamicSlope"/> Dynamic Slope</label> 
            <i>The slope for each segment depends on the ratio between the current and the next value</i>           
        </div>
        <div class="config-section">
            <label class="configHead"><input type="checkbox" id="dynamicHeight"/> Dynamic Height</label>
            <i>The height of the segment is the overall percentage for that dataItem</i>  
        </div>
        <div class="config-section">
            <span class="configHead">Neck Ratio</span>
            <ul class="options">
                <li><input id="neckSlider" value="0.3"/></li>
            </ul>
            <i>The ratio between the bases of the whole funnel element</i>
        </div>  
    </div>
    
    <script>
	    function refresh() {
	        var slider = $('#neckSlider').data("kendoSlider");
	        var chartNames = ["chart-oct", "chart-nov", "chart-dec"];
	
	        for (var idx in chartNames) {
	            var chart = $("#" + chartNames[idx]).data("kendoChart");
	            
	            var options =
	            {
	                seriesDefaults: {
	                    neckRatio: slider.value(),
	                    dynamicHeight : $('#dynamicHeight').is(':checked'),
	                    dynamicSlope : $('#dynamicSlope').is(':checked'),
	                    labels: {
	                        visible: true,
	                        background: "transparent",
	                        color:"white",
	                        format: "N0"
	                    },
	                }
	            }
	
	            chart.setOptions({
	                series: [$.extend(true, {}, chart.options.series[0], options.seriesDefaults)]	                
	            });
	            
	            slider.enable(!options.seriesDefaults.dynamicSlope);
	        }
	    }	
    
    
	    $(document).ready(function () {
	        $("#neckSlider").kendoSlider({
	            change: refresh,
	            value: 0.3,
	            min: 0,
	            max: 10,
	            smallStep: 0.01,
	            largeStep: 0.1
	        });	      
	
	        $('.configuration-horizontal').on('click', ':checkbox', refresh);	        
	    });
    </script>  
    
    <style scoped>
      	.config-section
        {
            width:125px;
        }
        .chart-wrapper {
            height: 360px;
	        width:730px;
	        margin: 20px auto;            
        }
        .chart-wrapper h2 {
            padding: 20px 0 0 25px;
        }
        #chart-oct,
        #chart-nov,
        #chart-dec {
            display: inline-block;
            width: 180px;
            height: 300px;
            margin: 15px 25px;
        }
     </style>
<demo:footer />
