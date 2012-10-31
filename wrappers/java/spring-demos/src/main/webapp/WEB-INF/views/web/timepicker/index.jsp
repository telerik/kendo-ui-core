<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<label for="timepicker">Select alarm time:</label>

<kendo:timePicker name="timepicker" value="${now}"></kendo:timePicker>

<demo:footer />