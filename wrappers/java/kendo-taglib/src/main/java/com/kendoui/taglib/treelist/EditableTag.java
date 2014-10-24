
package com.kendoui.taglib.treelist;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.TreeListTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class EditableTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        TreeListTag parent = (TreeListTag)findParentWithClass(TreeListTag.class);


        parent.setEditable(this);

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
        return "treeList-editable";
    }

    public void setTemplate(EditableTemplateFunctionTag value) {
        setEvent("template", value.getBody());
    }

    public java.lang.String getMode() {
        return (java.lang.String)getProperty("mode");
    }

    public void setMode(java.lang.String value) {
        setProperty("mode", value);
    }

    public java.lang.String getTemplate() {
        return (java.lang.String)getProperty("template");
    }

    public void setTemplate(java.lang.String value) {
        setProperty("template", value);
    }

    public java.lang.Object getWindow() {
        return (java.lang.Object)getProperty("window");
    }

    public void setWindow(java.lang.Object value) {
        setProperty("window", value);
    }

//<< Attributes

}
