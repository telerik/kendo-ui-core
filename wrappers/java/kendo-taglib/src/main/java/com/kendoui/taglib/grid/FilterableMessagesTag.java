
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

    public String getAnd() {
        return (String)getProperty("and");
    }

    public void setAnd(String value) {
        setProperty("and", value);
    }

    public String getClear() {
        return (String)getProperty("clear");
    }

    public void setClear(String value) {
        setProperty("clear", value);
    }

    public String getFilter() {
        return (String)getProperty("filter");
    }

    public void setFilter(String value) {
        setProperty("filter", value);
    }

    public String getInfo() {
        return (String)getProperty("info");
    }

    public void setInfo(String value) {
        setProperty("info", value);
    }

    public String getIsFalse() {
        return (String)getProperty("isFalse");
    }

    public void setIsFalse(String value) {
        setProperty("isFalse", value);
    }

    public String getIsTrue() {
        return (String)getProperty("isTrue");
    }

    public void setIsTrue(String value) {
        setProperty("isTrue", value);
    }

    public String getOr() {
        return (String)getProperty("or");
    }

    public void setOr(String value) {
        setProperty("or", value);
    }

    public String getSelectValue() {
        return (String)getProperty("selectValue");
    }

    public void setSelectValue(String value) {
        setProperty("selectValue", value);
    }

//<< Attributes

}
