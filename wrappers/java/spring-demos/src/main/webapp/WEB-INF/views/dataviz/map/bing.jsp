<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />

<kendo:map name="map" center="<%= new double[] {51.505, -0.09} %>" zoom="3">
    <kendo:map-layers>
    	<!-- IMPORTANT: This key is locked to demos.telerik.com/kendo-ui -->
    	<!-- Please replace with your own Bing Key -->
        <kendo:map-layer type="bing" key="AjQF548guEF8MWgEspVokNny7l_GULKsZ81tR-LvPK96Bm3REkCjNHs2aC_b7nvF" />
    </kendo:map-layers>
</kendo:map>

<demo:footer />
