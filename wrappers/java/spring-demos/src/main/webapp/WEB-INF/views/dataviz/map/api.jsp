<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />

<div id="example" class="k-content absConf">
    <div class="map-wrapper" style="margin: auto;">
		<kendo:map name="map" center="<%= new double[] {30.2681, -97.7448} %>"
				   zoom="3" panEnd="updateControls" zoomEnd="updateControls">
		    <kendo:map-layers>
		        <kendo:map-layer type="tile"
		        				 urlTemplate="http://tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png"
		        				 subdomains="<%= new String[] { \"a\", \"b\", \"c\" } %>"
		        				 attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors" />
		    </kendo:map-layers>
		</kendo:map>
    </div>
    <div class="configuration-horizontal" id="mapConfig">
        <div class="config-section">
            <span class="configHead">Center</span>
            <ul class="options">
                <li>
                    <input id="centerLat" data-role="numerictextbox"
                           data-format="N4" value="30.2681" data-decimals="4" />
                    <input id="centerLng" data-role="numerictextbox"
                           data-format="N4" value="-97.7448" data-decimals="4" />
                    <button id="center" class="k-button">center()</button>
                </li>
            </ul>
        </div>
        <div class="config-section">
            <span class="configHead">Zoom level</span>
            <ul class="options">
                <li>
                   <select id="zoomLevel" data-role="dropdownlist">
                        <option value="1">1 (min)</option>
                        <option value="2">2</option>
                        <option value="3" selected="selected">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18 (max)</option>
                    </select>
                    <button id="zoom" class="k-button">zoom()</button>
                </li>
            </ul>
        </div>
    </div>
    <script>
        $(document).ready(function() {
       		kendo.init($("#mapConfig"));
       		
			$("#center").click( function (e) {
			    $("#map").data("kendoMap").center([
			        parseFloat($("#centerLat").val()),
			        parseFloat($("#centerLng").val())
			    ]);
			});
			
			$("#zoom").click( function (e) {
			    $("#map").data("kendoMap").zoom(
			        parseInt($("#zoomLevel").val(), 10)
			    );
			});
        });
        
        function updateControls() {
            var map = $("#map").data("kendoMap");
            var center = map.center();

            if (kendo.ui.NumericTextBox) {
                $("#centerLat").data("kendoNumericTextBox").value(center.lat);
                $("#centerLng").data("kendoNumericTextBox").value(center.lng);
                $("#zoomLevel").data("kendoDropDownList").value(map.zoom());
            }
        }

    </script>
    <style scoped>
        .demo-section {
            width: 700px;
        }
    </style>
</div>

<demo:footer />
