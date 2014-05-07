<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

    <div id="to-do">
        <kendo:dateTimePicker name="datetimepicker" value="${today}"></kendo:dateTimePicker>
    </div>
    <style scoped>
        .k-datetimepicker 
        {
            width: 200px;
        }
        #to-do {
            height: 52px;
            width: 221px;
            margin: 30px auto;
            padding: 91px 0 0 188px;
            background: url(<c:url value="/resources/web/datepicker/todo.png" />) transparent no-repeat 0 0;
        }
    </style>

<demo:footer />