
package com.kendoui.taglib.calendar;

import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.CalendarTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MonthTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        CalendarTag parent = (CalendarTag)findParentWithClass(CalendarTag.class);

        parent.setMonth(this);

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
        return "calendar-month";
    }

    public String getContent() {
        return (String)getProperty("content");
    }

    public void setContent(String value) {
        setProperty("content", value);
    }

    public String getEmpty() {
        return (String)getProperty("empty");
    }

    public void setEmpty(String value) {
        setProperty("empty", value);
    }

//<< Attributes

}
