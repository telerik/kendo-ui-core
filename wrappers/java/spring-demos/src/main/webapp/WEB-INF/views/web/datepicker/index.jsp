<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<div id="email-settings">
    <div style="margin-top: -6px; margin-left: 180px">
        <kendo:datePicker name="datepicker" value="${today}"></kendo:datePicker>
    </div>
    <div style="margin-top: 59px; margin-left: 180px">
        <kendo:datePicker name="monthpicker" value="${today}" start="year" depth="year" format="MMMM yyyy">
        </kendo:datePicker>
    </div>
</div>
<style scoped>
    #example h2 {
        font-weight: normal;
    }
    #email-settings {
        height: 135px;
        width: 395px;
        margin: 30px auto;
        padding: 110px 0 0 30px;
        background: url(<c:url value="/resources/web/datepicker/mailSettings.png" />) transparent no-repeat 0 0;
    }
    
</style>

<demo:footer />