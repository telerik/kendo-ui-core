
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

    public String getDisplay() {
        return (String)getProperty("display");
    }

    public void setDisplay(String value) {
        setProperty("display", value);
    }

    public String getEmpty() {
        return (String)getProperty("empty");
    }

    public void setEmpty(String value) {
        setProperty("empty", value);
    }

    public String getFirst() {
        return (String)getProperty("first");
    }

    public void setFirst(String value) {
        setProperty("first", value);
    }

    public String getItemsPerPage() {
        return (String)getProperty("itemsPerPage");
    }

    public void setItemsPerPage(String value) {
        setProperty("itemsPerPage", value);
    }

    public String getLast() {
        return (String)getProperty("last");
    }

    public void setLast(String value) {
        setProperty("last", value);
    }

    public String getNext() {
        return (String)getProperty("next");
    }

    public void setNext(String value) {
        setProperty("next", value);
    }

    public String getOf() {
        return (String)getProperty("of");
    }

    public void setOf(String value) {
        setProperty("of", value);
    }

    public String getPage() {
        return (String)getProperty("page");
    }

    public void setPage(String value) {
        setProperty("page", value);
    }

    public String getPrevious() {
        return (String)getProperty("previous");
    }

    public void setPrevious(String value) {
        setProperty("previous", value);
    }

    public String getRefresh() {
        return (String)getProperty("refresh");
    }

    public void setRefresh(String value) {
        setProperty("refresh", value);
    }

//<< Attributes

}
