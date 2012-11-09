<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<c:url value="/web/tabstrip/content/1" var="ajaxContent1" />
<c:url value="/web/tabstrip/content/error" var="error" />

<kendo:tabStrip name="tabstrip" select="onSelect" activate="onActivate" contentLoad="onContentLoad" error="onError">
    <kendo:tabStrip-items>
        <kendo:tabStrip-item text="First tab" selected="true">
            <kendo:tabStrip-item-content>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer felis libero, lobortis ac rutrum quis, varius a velit. Donec lacus erat, cursus sed porta quis, adipiscing et ligula. Duis volutpat, sem pharetra accumsan pharetra, mi ligula cursus felis, ac aliquet leo diam eget risus. Integer facilisis, justo cursus venenatis vehicula, massa nisl tempor sem, in ullamcorper neque mauris in orci.</p>
            </kendo:tabStrip-item-content>
        </kendo:tabStrip-item>
        <kendo:tabStrip-item text="Second tab">
            <kendo:tabStrip-item-content>
                <p>Ut orci ligula, varius ac consequat in, rhoncus in dolor. Mauris pulvinar molestie accumsan. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean velit ligula, pharetra quis aliquam sed, scelerisque sed sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam dui mi, vulputate vitae pulvinar ac, condimentum sed eros.</p>
            </kendo:tabStrip-item-content>
        </kendo:tabStrip-item>
        <kendo:tabStrip-item text="Third tab">
            <kendo:tabStrip-item-content>
                <p>Aliquam at nisl quis est adipiscing bibendum. Nam malesuada eros facilisis arcu vulputate at aliquam nunc tempor. In commodo scelerisque enim, eget sodales lorem condimentum rutrum. Phasellus sem metus, ultricies at commodo in, tristique non est. Morbi vel mauris eget mauris commodo elementum. Nam eget libero lacus, ut sollicitudin ante. Nam odio quam, suscipit a fringilla eget, dignissim nec arcu. Donec tristique arcu ut sapien elementum pellentesque.</p>
            </kendo:tabStrip-item-content>
        </kendo:tabStrip-item>
        <kendo:tabStrip-item text="Ajax Tab" contentUrl="${ajaxContent1}"></kendo:tabStrip-item>
        <kendo:tabStrip-item text="Error Tab" contentUrl="${error}"></kendo:tabStrip-item>
    </kendo:tabStrip-items>
</kendo:tabStrip>

<script>
	function onSelect(e) {
	    kendoConsole.log("Selected: " + $(e.item).find("> .k-link").text());
	}
	
	function onActivate(e) {
	    kendoConsole.log("Activated: " + $(e.item).find("> .k-link").text());
	}
	
	function onContentLoad(e) {
	    kendoConsole.log("Content loaded in <b>"+ $(e.item).find("> .k-link").text() + "</b> and starts with <b>" + $(e.contentElement).text().substr(0, 20) + "...</b>");
	}
	
	function onError(e) {
	    kendoConsole.error("Loading failed with " + e.xhr.statusText + " " + e.xhr.status);
	}
</script>
<div class="console"></div>

<demo:footer />