
package com.kendoui.taglib.grid;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesCommandsTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MessagesTag parent = (MessagesTag)findParentWithClass(MessagesTag.class);


        parent.setCommands(this);

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
        return "grid-messages-commands";
    }

    public java.lang.String getCancel() {
        return (java.lang.String)getProperty("cancel");
    }

    public void setCancel(java.lang.String value) {
        setProperty("cancel", value);
    }

    public java.lang.String getCanceledit() {
        return (java.lang.String)getProperty("canceledit");
    }

    public void setCanceledit(java.lang.String value) {
        setProperty("canceledit", value);
    }

    public java.lang.String getCreate() {
        return (java.lang.String)getProperty("create");
    }

    public void setCreate(java.lang.String value) {
        setProperty("create", value);
    }

    public java.lang.String getDestroy() {
        return (java.lang.String)getProperty("destroy");
    }

    public void setDestroy(java.lang.String value) {
        setProperty("destroy", value);
    }

    public java.lang.String getEdit() {
        return (java.lang.String)getProperty("edit");
    }

    public void setEdit(java.lang.String value) {
        setProperty("edit", value);
    }

    public java.lang.String getSave() {
        return (java.lang.String)getProperty("save");
    }

    public void setSave(java.lang.String value) {
        setProperty("save", value);
    }

    public java.lang.String getUpdate() {
        return (java.lang.String)getProperty("update");
    }

    public void setUpdate(java.lang.String value) {
        setProperty("update", value);
    }

//<< Attributes

}
