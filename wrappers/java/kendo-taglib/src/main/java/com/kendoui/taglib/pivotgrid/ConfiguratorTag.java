
package com.kendoui.taglib.pivotgrid;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.PivotGridTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ConfiguratorTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
        PivotGridTag parent = (PivotGridTag)findParentWithClass(PivotGridTag.class);

        parent.setConfigurator(this);

        return super.doEndTag();
    }

    @Override
    public void initialize() {
        super.initialize();
    }

    @Override
    public void destroy() {
        super.destroy();
    }

    public static String tagName() {
        return "pivotGrid-configurator";
    }

    public java.lang.String getName() {
        return (java.lang.String)getProperty("name");
    }

    public void setName(java.lang.String value) {
        setProperty("name", value);
    }
}
