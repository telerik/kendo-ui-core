
package com.kendoui.taglib.scheduler;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ToolbarItemTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ToolbarTag parent = (ToolbarTag)findParentWithClass(ToolbarTag.class);

        parent.addToolbarItem(this);

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
        return "scheduler-toolbarItem";
    }

    public java.lang.String getName() {
        return (java.lang.String)getProperty("name");
    }

    public void setName(java.lang.String value) {
        setProperty("name", value);
    }

//<< Attributes

}
