
package com.kendoui.taglib.calendar;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.CalendarTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class NavigateFunctionTag extends FunctionTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        CalendarTag parent = (CalendarTag)findParentWithClass(CalendarTag.class);

        parent.setNavigate(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize
//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy

        super.destroy();
    }

//>> Attributes

    public static String tagName() {
        return "calendar-navigate";
    }

//<< Attributes

}
