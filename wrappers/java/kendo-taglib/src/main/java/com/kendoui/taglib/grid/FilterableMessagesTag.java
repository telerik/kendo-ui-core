
package com.kendoui.taglib.grid;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class FilterableMessagesTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        FilterableTag parent = (FilterableTag)findParentWithClass(FilterableTag.class);


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
        return "grid-filterable-messages";
    }

    public java.lang.String getAnd() {
        return (java.lang.String)getProperty("and");
    }

    public void setAnd(java.lang.String value) {
        setProperty("and", value);
    }

    public java.lang.String getClear() {
        return (java.lang.String)getProperty("clear");
    }

    public void setClear(java.lang.String value) {
        setProperty("clear", value);
    }

    public java.lang.String getFilter() {
        return (java.lang.String)getProperty("filter");
    }

    public void setFilter(java.lang.String value) {
        setProperty("filter", value);
    }

    public java.lang.String getInfo() {
        return (java.lang.String)getProperty("info");
    }

    public void setInfo(java.lang.String value) {
        setProperty("info", value);
    }

    public java.lang.String getIsFalse() {
        return (java.lang.String)getProperty("isFalse");
    }

    public void setIsFalse(java.lang.String value) {
        setProperty("isFalse", value);
    }

    public java.lang.String getIsTrue() {
        return (java.lang.String)getProperty("isTrue");
    }

    public void setIsTrue(java.lang.String value) {
        setProperty("isTrue", value);
    }

    public java.lang.String getOr() {
        return (java.lang.String)getProperty("or");
    }

    public void setOr(java.lang.String value) {
        setProperty("or", value);
    }

    public java.lang.String getSelectValue() {
        return (java.lang.String)getProperty("selectValue");
    }

    public void setSelectValue(java.lang.String value) {
        setProperty("selectValue", value);
    }

//<< Attributes

}
