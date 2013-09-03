
package com.kendoui.taglib.grid;

import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.GridTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class EditableTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        GridTag parent = (GridTag)findParentWithClass(GridTag.class);


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
        return "grid-editable";
    }

    public void setTemplate(EditableTemplateFunctionTag value) {
        setEvent("template", value.getBody());
    }

    public java.lang.Object getConfirmation() {
        return (java.lang.Object)getProperty("confirmation");
    }

    public void setConfirmation(java.lang.Object value) {
        setProperty("confirmation", value);
    }

    public java.lang.String getCreateAt() {
        return (java.lang.String)getProperty("createAt");
    }

    public void setCreateAt(java.lang.String value) {
        setProperty("createAt", value);
    }

    public boolean getDestroy() {
        return (boolean)getProperty("destroy");
    }

    public void setDestroy(boolean value) {
        setProperty("destroy", value);
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

    public boolean getUpdate() {
        return (boolean)getProperty("update");
    }

    public void setUpdate(boolean value) {
        setProperty("update", value);
    }

//<< Attributes

}
