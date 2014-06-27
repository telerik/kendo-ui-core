<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />

<kendo:map name="map" center="<%= new double[] {30.2681, -97.7448} %>" zoom="3">
    <kendo:map-layers>
        <kendo:map-layer type="tile"
            urlTemplate="http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png"
            subdomains="<%= new String[] { \"a\", \"b\", \"c\" } %>"
            attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>" />
    </kendo:map-layers>
    <kendo:map-markers>
        <kendo:map-marker location="<%= new double[] {30.2681, -97.7448} %>" shape="pinTarget">
            <kendo:map-marker-tooltip>
            	<kendo:map-marker-tooltip-content content="Austin, TX" />
            </kendo:map-marker-tooltip>
        </kendo:map-marker>
    </kendo:map-markers>
</kendo:map>

<demo:footer />
