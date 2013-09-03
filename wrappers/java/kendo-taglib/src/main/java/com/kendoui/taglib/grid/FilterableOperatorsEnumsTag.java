
package com.kendoui.taglib.grid;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class FilterableOperatorsEnumsTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        FilterableOperatorsTag parent = (FilterableOperatorsTag)findParentWithClass(FilterableOperatorsTag.class);


        parent.setEnums(this);

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
        return "grid-filterable-operators-enums";
    }

    public java.lang.String getEq() {
        return (java.lang.String)getProperty("eq");
    }

    public void setEq(java.lang.String value) {
        setProperty("eq", value);
    }

    public java.lang.String getNeq() {
        return (java.lang.String)getProperty("neq");
    }

    public void setNeq(java.lang.String value) {
        setProperty("neq", value);
    }

//<< Attributes

}
