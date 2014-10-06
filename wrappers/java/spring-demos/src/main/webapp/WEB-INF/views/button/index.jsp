<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<div class="demo-section k-header">
    <div>
        <h4>Basic Button</h4>
        <p>
            <kendo:button name="primaryTextButton" class="k-primary">
                <kendo:button-content>
                    Primary button
                </kendo:button-content>
            </kendo:button>

            <kendo:button name="textButton">
                <kendo:button-content>
                    Button
                </kendo:button-content>
            </kendo:button>
        </p>
    </div>

     <div>
        <h4>Disabled buttons</h4>
        <p>
            <kendo:button name="primaryDisabledButton" tag="a" enable="false" class="k-primary">
                <kendo:button-content>
                    Disabled primary button
                </kendo:button-content>
            </kendo:button>

            <kendo:button name="disabledButton" enable="false">
                <kendo:button-content>
                    Disabled button
                </kendo:button-content>
            </kendo:button>
        </p>
    </div>

    <div>
       <h4>Buttons with icons</h4>
        <p>
            <kendo:button name="iconTextButton" tag="a" spriteCssClass="k-icon k-i-funnel">
                <kendo:button-content>
                    Filter
                </kendo:button-content>
            </kendo:button>

            <kendo:button name="kendoIconTextButton" tag="a" icon="funnel-clear">
                <kendo:button-content>
                    Clear Filter
                </kendo:button-content>
            </kendo:button>

            <kendo:button name="iconButton" tag="em" spriteCssClass="k-icon k-i-refresh">
            </kendo:button>
        </p>
    </div>


    <style scoped>
        .demo-section {
            width: 400px;
        }
        .demo-section p {
            margin: 0 0 30px;
            line-height: 40px;
        }
        .k-primary {
            width: 150px;
        }
    </style>
</div>

<demo:footer />
