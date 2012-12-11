
package com.kendoui.taglib.grid;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class OperatorsNumberTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        FilterableOperatorsTag parent = (FilterableOperatorsTag)findParentWithClass(FilterableOperatorsTag.class);


        parent.setNumber(this);

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
        return "grid-filterable-operators-number";
    }

    public String getEq() {
        return (String)getProperty("eq");
    }

    public void setEq(String value) {
        setProperty("eq", value);
    }

    public String getNeq() {
        return (String)getProperty("neq");
    }

    public void setNeq(String value) {
        setProperty("neq", value);
    }

    public String getGte() {
        return (String)getProperty("gte");
    }

    public void setGte(String value) {
        setProperty("gte", value);
    }

    public String getGt() {
        return (String)getProperty("gt");
    }

    public void setGt(String value) {
        setProperty("gt", value);
    }

    public String getLte() {
        return (String)getProperty("lte");
    }

    public void setLte(String value) {
        setProperty("lte", value);
    }

    public String getLt() {
        return (String)getProperty("lt");
    }

    public void setLt(String value) {
        setProperty("lt", value);
    }

//<< Attributes

}
