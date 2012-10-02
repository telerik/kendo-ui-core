
package com.kendoui.taglib.calendar;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MonthTag extends BaseTag /* interfaces *//* interfaces */ {

//>> Attributes

    @Override
    public int doEndTag() throws JspException {
        Month parent = (Month)findParentWithClass(Month.class);

        parent.setMonth(this);

        return EVAL_PAGE;
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
