<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<c:url value="/web/tabstrip/content/1" var="ajaxContent1" />
<c:url value="/web/tabstrip/content/2" var="ajaxContent2" />
<c:url value="/web/tabstrip/content/3" var="ajaxContent3" />

<div class="wrapper">
	<kendo:tabStrip name="tabstrip">
		<kendo:tabStrip-items>
		    <kendo:tabStrip-item text="Dimensions & Weights" selected="true" contentUrl="${ajaxContent1}"></kendo:tabStrip-item>
	        <kendo:tabStrip-item text="Engine" contentUrl="${ajaxContent2}"></kendo:tabStrip-item>
	        <kendo:tabStrip-item text="Chassis" contentUrl="${ajaxContent3}"></kendo:tabStrip-item>
	    </kendo:tabStrip-items>
	</kendo:tabStrip>
</div>

<style scoped="scoped">
    .wrapper {
        width: 270px;
        height: 455px;
        margin: 20px auto;
        padding: 20px 0 0 390px;
        background: url('<c:url value="/resources/web/tabstrip/bmw.png" />') no-repeat 40px 60px transparent;
    }
    #tabstrip {
        width: 320px;
        float: right;
        margin-bottom: 20px;
    }
    .specification {
        max-width: 670px;
        margin: 10px 0;
        padding: 0;
        height:360px;
        overflow:auto;
    }
    .specification dt, dd {
        width: 140px;
        float: left;
        margin: 0;
        padding: 5px 0 7px 0;
        border-top: 1px solid rgba(0,0,0,0.3);
    }
    .specification dt {
        clear: left;
        width: 120px;
        margin-right: 7px;
        padding-right: 0;
        text-align: right;
        opacity: 0.7;
    }
    .specification:after, .wrapper:after {
        content: "";
        display: block;
        clear: both;
        height: 0;
        visibility: hidden;
    }
</style>

<demo:footer />