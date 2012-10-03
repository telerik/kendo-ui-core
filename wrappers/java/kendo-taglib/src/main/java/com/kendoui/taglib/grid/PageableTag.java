
package com.kendoui.taglib.grid;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PageableTag extends BaseTag /* interfaces */implements Messages/* interfaces */ {

//>> Attributes

    @Override
    public int doEndTag() throws JspException {
        Pageable parent = (Pageable)findParentWithClass(Pageable.class);

        parent.setPageable(this);

        return super.doEndTag();
    }

    @Override
    public void setMessages(MessagesTag value) {
        setProperty("messages", value.properties());
    }

    public int getPageSize() {
        return (int)getProperty("pageSize");
    }

    public void setPageSize(int value) {
        setProperty("pageSize", value);
    }

    public boolean getPreviousNext() {
        return (boolean)getProperty("previousNext");
    }

    public void setPreviousNext(boolean value) {
        setProperty("previousNext", value);
    }

    public boolean getNumeric() {
        return (boolean)getProperty("numeric");
    }

    public void setNumeric(boolean value) {
        setProperty("numeric", value);
    }

    public int getButtonCount() {
        return (int)getProperty("buttonCount");
    }

    public void setButtonCount(int value) {
        setProperty("buttonCount", value);
    }

    public boolean getInput() {
        return (boolean)getProperty("input");
    }

    public void setInput(boolean value) {
        setProperty("input", value);
    }

    public boolean getPageSizes() {
        return (boolean)getProperty("pageSizes");
    }

    public void setPageSizes(boolean value) {
        setProperty("pageSizes", value);
    }

    public boolean getRefresh() {
        return (boolean)getProperty("refresh");
    }

    public void setRefresh(boolean value) {
        setProperty("refresh", value);
    }

    public boolean getInfo() {
        return (boolean)getProperty("info");
    }

    public void setInfo(boolean value) {
        setProperty("info", value);
    }

//<< Attributes
}
