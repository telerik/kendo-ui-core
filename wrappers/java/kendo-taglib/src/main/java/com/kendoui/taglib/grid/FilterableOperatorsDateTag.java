
package com.kendoui.taglib.grid;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class FilterableOperatorsDateTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        FilterableOperatorsTag parent = (FilterableOperatorsTag)findParentWithClass(FilterableOperatorsTag.class);


        parent.setDate(this);

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
        return "grid-filterable-operators-date";
    }

    public java.lang.String getEq() {
        return (java.lang.String)getProperty("eq");
    }

    public void setEq(java.lang.String value) {
        setProperty("eq", value);
    }

    public java.lang.String getGt() {
        return (java.lang.String)getProperty("gt");
    }

    public void setGt(java.lang.String value) {
        setProperty("gt", value);
    }

    public java.lang.String getGte() {
        return (java.lang.String)getProperty("gte");
    }

    public void setGte(java.lang.String value) {
        setProperty("gte", value);
    }

    public java.lang.String getLt() {
        return (java.lang.String)getProperty("lt");
    }

    public void setLt(java.lang.String value) {
        setProperty("lt", value);
    }

    public java.lang.String getLte() {
        return (java.lang.String)getProperty("lte");
    }

    public void setLte(java.lang.String value) {
        setProperty("lte", value);
    }

    public java.lang.String getNeq() {
        return (java.lang.String)getProperty("neq");
    }

    public void setNeq(java.lang.String value) {
        setProperty("neq", value);
    }

//<< Attributes

}
