<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/map/remote-markers/read" var="readUrl" />

<demo:header />

<kendo:map name="map" center="<%= new double[] {30.2681, -97.7448} %>" zoom="15">
    <kendo:map-layers>
        <kendo:map-layer type="tile"
            urlTemplate="http://#= subdomain #.tile2.opencyclemap.org/transport/#= zoom #/#= x #/#= y #.png"
            subdomains="<%= new String[] { \"a\", \"b\", \"c\" } %>"
            attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>. Tiles courtesy of <a href='http://www.opencyclemap.org/'>Andy Allan</a>" />
        <kendo:map-layer type="marker" locationField="latLng" titleField="name">
             <kendo:dataSource>
                 <kendo:dataSource-transport>
                     <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
                 </kendo:dataSource-transport>
             </kendo:dataSource>
        </kendo:map-layer>
    </kendo:map-layers>
</kendo:map>

<demo:footer />
