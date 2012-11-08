<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />
<c:url value="/web/panelbar/content/1" var="ajaxContent1" />
<c:url value="/web/panelbar/content/2" var="ajaxContent2" />
<c:url value="/web/panelbar/content/3" var="ajaxContent3" />
<c:url value="/web/panelbar/content/4" var="ajaxContent4" />
<c:url value="/resources/web/panelbar/astonmartin.png" var="astonmartin" />

<div class="wrapper">

	<kendo:panelBar name="panelbar" expandMode="single">				
		<kendo:panelBar-items>
			<kendo:panelBar-item text="BODY" contentUrl="${ ajaxContent1 }" />
			<kendo:panelBar-item text="ENGINE" contentUrl="${ ajaxContent2 }" />
			<kendo:panelBar-item text="TRANSMISSION" contentUrl="${ ajaxContent3 }" />
			<kendo:panelBar-item text="PERFORMANCE" contentUrl="${ ajaxContent4 }" />			
		</kendo:panelBar-items>
	</kendo:panelBar>
		
</div>

<div class="configuration configuration-horizontal-bottom">
    <span class="infoHead">Information</span>
    <p>Image courtesy of Aston Martin</p>   
</div>

<style scoped>
    .wrapper {
        width: 310px;
        height: 400px;
        margin: 20px auto;
        padding: 75px 0 0 390px;
         background: url('${astonmartin}') no-repeat 0 50px transparent;
    }
    #panelbar {
        width: 300px;
    }
    #panelbar p {
        margin-left: 1em;
        margin-right: 1em;
    }
</style>

<demo:footer />
