<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />

<kendo:map name="map" center="<%= new double[] {51.505, -0.09 } %>" zoom="4">
	<kendo:map-layers>
		<kendo:map-layer type="tile" urlTemplate="http://tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png" />
	</kendo:map-layers>
</kendo:map>

<demo:footer />
