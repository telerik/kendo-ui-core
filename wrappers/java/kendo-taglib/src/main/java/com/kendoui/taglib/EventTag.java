package com.kendoui.taglib;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.BodyContent;

@SuppressWarnings("serial")
public class EventTag extends FunctionTag {
    private String name;
    
    @Override
    public int doEndTag() throws JspException {
        WidgetTag widget = (WidgetTag)findParentWithClass(WidgetTag.class);

        BodyContent bodyContent = getBodyContent();

        if (bodyContent != null) {
            setBody(bodyContent.getString());
        }

        widget.setEvent(getName(), getBody());

        return EVAL_PAGE;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public static String tagName() {
        return "event";
    }

}
