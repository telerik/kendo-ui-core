<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />

<kendo:map name="map" center="<%= new double[] {30.2681, -97.7448} %>" zoom="3">
    <kendo:map-layers>
        <kendo:map-layer type="tile" urlTemplate="http://tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png" attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors" />
    </kendo:map-layers>
</kendo:map>

<demo:footer />
