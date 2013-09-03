
package com.kendoui.taglib.grid;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PageableMessagesTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        PageableTag parent = (PageableTag)findParentWithClass(PageableTag.class);


        parent.setMessages(this);

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
        return "grid-pageable-messages";
    }

    public java.lang.String getDisplay() {
        return (java.lang.String)getProperty("display");
    }

    public void setDisplay(java.lang.String value) {
        setProperty("display", value);
    }

    public java.lang.String getEmpty() {
        return (java.lang.String)getProperty("empty");
    }

    public void setEmpty(java.lang.String value) {
        setProperty("empty", value);
    }

    public java.lang.String getFirst() {
        return (java.lang.String)getProperty("first");
    }

    public void setFirst(java.lang.String value) {
        setProperty("first", value);
    }

    public java.lang.String getItemsPerPage() {
        return (java.lang.String)getProperty("itemsPerPage");
    }

    public void setItemsPerPage(java.lang.String value) {
        setProperty("itemsPerPage", value);
    }

    public java.lang.String getLast() {
        return (java.lang.String)getProperty("last");
    }

    public void setLast(java.lang.String value) {
        setProperty("last", value);
    }

    public java.lang.String getNext() {
        return (java.lang.String)getProperty("next");
    }

    public void setNext(java.lang.String value) {
        setProperty("next", value);
    }

    public java.lang.String getOf() {
        return (java.lang.String)getProperty("of");
    }

    public void setOf(java.lang.String value) {
        setProperty("of", value);
    }

    public java.lang.String getPage() {
        return (java.lang.String)getProperty("page");
    }

    public void setPage(java.lang.String value) {
        setProperty("page", value);
    }

    public java.lang.String getPrevious() {
        return (java.lang.String)getProperty("previous");
    }

    public void setPrevious(java.lang.String value) {
        setProperty("previous", value);
    }

    public java.lang.String getRefresh() {
        return (java.lang.String)getProperty("refresh");
    }

    public void setRefresh(java.lang.String value) {
        setProperty("refresh", value);
    }

//<< Attributes

}
