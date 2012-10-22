
package com.kendoui.taglib.datetimepicker;

import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.DateTimePickerTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MonthTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        DateTimePickerTag parent = (DateTimePickerTag)findParentWithClass(DateTimePickerTag.class);

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
        return "dateTimePicker-month";
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
