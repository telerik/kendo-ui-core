<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />

<c:url value="/resources/dataviz/map/countries-users.geo.json" var="readUrl" />
<c:url value="/resources/dataviz/map/js/chroma.min.js" var="chroma" />

<kendo:map name="map" center="<%= new double[] {51.505, -0.09 } %>" zoom="4" shapeCreated="onShapeCreated" shapeMouseEnter="onShapeMouseEnter" shapeMouseLeave="onShapeMouseLeave">
	<kendo:map-layers>
		<kendo:map-layer type="shape">
			<kendo:dataSource type="geojson">
				<kendo:dataSource-transport>
					<kendo:dataSource-transport-read url="${readUrl}" />
				</kendo:dataSource-transport>
			</kendo:dataSource>
			<kendo:map-layer-style>
				<kendo:map-layer-style-fill opacity="0.7"/>
			</kendo:map-layer-style>
		</kendo:map-layer>
	</kendo:map-layers>
</kendo:map>

<script src="${chroma}"></script>
<script>
var scale = chroma
.scale(["white", "green"])
.domain([1, 1000]);

function onShapeCreated(e) {
	var shape = e.shape;
	var users = shape.dataItem.properties.users;
	if (users) {
	    var color = scale(users).hex();
	    shape.fill(color);
	}
}

function onShapeMouseEnter(e) {
	e.shape.options.set("fill.opacity", 1);
}

function onShapeMouseLeave(e) {
	e.shape.options.set("fill.opacity", 0.7);
}

</script>

<demo:footer />
