<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />

<div class="demo-section">
    <kendo:calendar name="calendar"></kendo:calendar>
</div>

<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button wider">Alt</span>
            +
            <span class="key-button">w</span>
        </span>
        <span class="button-descr">
            focuses the widget
        </span>
    </li>
</ul>

<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">left arrow</span>
        </span>
        <span class="button-descr">
            highlights previous day
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">right arrow</span>
        </span>
        <span class="button-descr">
            highlights next day
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">up arrow</span>
        </span>
        <span class="button-descr">
            highlights same day from the previous week
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">down arrow</span>
        </span>
        <span class="button-descr">
            highlights same day from the next week
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">ctrl</span>
            <span class="key-button wider leftAlign">left arrow</span>
        </span>
        <span class="button-descr">
            navigates to previous month
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">ctrl</span>
            <span class="key-button wider leftAlign">right arrow</span>
        </span>
        <span class="button-descr">
            navigates to next month
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">ctrl</span>
            <span class="key-button wider leftAlign">up arrow</span>
        </span>
        <span class="button-descr">
            navigates to previous view
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">ctrl</span>
            <span class="key-button wider leftAlign">down arrow</span>
        </span>
        <span class="button-descr">
            navigates to next view
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">home</span>
        </span>
        <span class="button-descr">
            highlights first day of the month
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">end</span>
        </span>
        <span class="button-descr">
            highlights last day of the month
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider rightAlign">enter</span>
        </span>
        <span class="button-descr">
            if in "month" view selects the highlighted day. In other
            views navigates to lower view
        </span>
    </li>
</ul>

<script>
    $(document).ready(function() {
        //focus the widget
        $(document).on("keydown.examples", function(e) {
            if (e.altKey && e.keyCode === 87 /* w */) {
                $("#calendar").data("kendoCalendar").focus();
            }
        });
    });
</script>

<demo:footer />