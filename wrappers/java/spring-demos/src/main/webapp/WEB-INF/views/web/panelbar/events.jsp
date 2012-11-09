<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />
<c:url value="/web/panelbar/content/1" var="contentUrl" />

<kendo:panelBar name="panelbar" expandMode="single" select="select" expand="expand" collapse="collapse" 
	activate="activate" contentLoad="contentLoad" error="error" style="width:250px;">	
	<kendo:panelBar-items>			
		<kendo:panelBar-item  text="Metallica - Master of Puppets 1986" expanded="true">
			<kendo:panelBar-items>
				<kendo:panelBar-item text="Battery"/>
				<kendo:panelBar-item text="Master of Puppets"/>
				<kendo:panelBar-item text="The Thing That Should Not Be"/>
				<kendo:panelBar-item text="Welcome Home (Sanitarium)"/>
				<kendo:panelBar-item text="Disposable Heroes"/>
				<kendo:panelBar-item text="Leper Messiah"/>
				<kendo:panelBar-item text="Orion (Instrumental)"/>
				<kendo:panelBar-item text="Damage, Inc."/>					
			</kendo:panelBar-items>
		</kendo:panelBar-item>
		<kendo:panelBar-item  text="Iron Maiden - Brave New World 2000">
			<kendo:panelBar-items>
				<kendo:panelBar-item text="The Wicker Man"/>
				<kendo:panelBar-item text="Ghost Of The Navigator"/>
				<kendo:panelBar-item text="Brave New World"/>
				<kendo:panelBar-item text="Blood Brothers"/>
				<kendo:panelBar-item text="The Mercenary"/>
				<kendo:panelBar-item text="Dream Of Mirrors"/>
				<kendo:panelBar-item text="The Fallen Angel"/>
				<kendo:panelBar-item text="The Nomad"/>
				<kendo:panelBar-item text="Out Of The Silent Planet"/>
				<kendo:panelBar-item text="The Thin Line Between Love And Hate"/>					
			</kendo:panelBar-items>
		</kendo:panelBar-item>
		<kendo:panelBar-item  text="Empty Item" />
		<kendo:panelBar-item  text="Ajax Item" contentUrl="${ contentUrl }" />
		<kendo:panelBar-item  text="Error Item" contentUrl="error.html" />					
	</kendo:panelBar-items>
</kendo:panelBar>

<script>
    function select(e) {
        kendoConsole.log("Select: " + $(e.item).find("> .k-link").text());
    }

    function expand(e) {
        kendoConsole.log("Expand: " + $(e.item).find("> .k-link").text());
    }

    function collapse(e) {
        kendoConsole.log("Collapse: " + $(e.item).find("> .k-link").text());
    }

    function activate(e) {
        kendoConsole.log("Activate: " + $(e.item).find("> .k-link").text());
    }

    function contentLoad(e) {
        kendoConsole.log("Content loaded in <b>"+ $(e.item).find("> .k-link").text() +
                            "</b> and starts with <b>" + $(e.contentElement).text().substr(0, 20) + "...</b>");
    }

    function error(e) {
        kendoConsole.error("Loading failed with " + e.xhr.statusText + " " + e.xhr.status);
    }
</script>
	
<div class="console"></div>

<demo:footer />
