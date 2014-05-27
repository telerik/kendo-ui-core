<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<kendo:notification name="notification" width="12em">
    <kendo:notification-templates>
        <kendo:notification-template type="time" template="<div style='padding: .6em 1em'>Time is: <span class='timeWrap'>#: time #</span></div>"/>
    </kendo:notification-templates>
</kendo:notification>

<div class="demo-section">
    <p>
        <button id="showNotification" class="k-button">Show notification</button>

        <button id="hideAllNotifications" class="k-button">Hide All Notifications</button>
    </p>
</div>
 
<div class="demo-section">                
    <h3 class="title">Console log</h3>
    <div class="console"></div>
</div>
           
<script>

    $(document).ready(function () {

        var notification = $("#notification").data("kendoNotification");

        $("#showNotification").click(function () {
            var d = new Date();
            notification.show({ time: kendo.toString(d, 'HH:MM:ss.') + kendo.toString(d.getMilliseconds(), "000") }, "time");
        });

        $("#hideAllNotifications").click(function () {
            notification.hide();
        });
    });
</script>

<demo:footer />