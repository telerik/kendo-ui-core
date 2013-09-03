
package com.kendoui.taglib.treeview;

import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.TreeViewTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class CheckboxesTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        TreeViewTag parent = (TreeViewTag)findParentWithClass(TreeViewTag.class);


        parent.setCheckboxes(this);

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
        return "treeView-checkboxes";
    }

    public void setTemplate(CheckboxesTemplateFunctionTag value) {
        setEvent("template", value.getBody());
    }

    public boolean getCheckChildren() {
        return (boolean)getProperty("checkChildren");
    }

    public void setCheckChildren(boolean value) {
        setProperty("checkChildren", value);
    }

    public java.lang.String getName() {
        return (java.lang.String)getProperty("name");
    }

    public void setName(java.lang.String value) {
        setProperty("name", value);
    }

    public java.lang.String getTemplate() {
        return (java.lang.String)getProperty("template");
    }

    public void setTemplate(java.lang.String value) {
        setProperty("template", value);
    }

//<< Attributes

}
