
package com.kendoui.taglib.pivotconfigurator;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.PivotConfiguratorTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SortableTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        PivotConfiguratorTag parent = (PivotConfiguratorTag)findParentWithClass(PivotConfiguratorTag.class);


        parent.setSortable(this);

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
        return "pivotConfigurator-sortable";
    }

    public boolean getAllowUnsort() {
        return (boolean)getProperty("allowUnsort");
    }

    public void setAllowUnsort(boolean value) {
        setProperty("allowUnsort", value);
    }

//<< Attributes

}
