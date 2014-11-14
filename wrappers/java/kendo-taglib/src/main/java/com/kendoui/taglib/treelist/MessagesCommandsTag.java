
package com.kendoui.taglib.treelist;


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
        return "treeList-messages-commands";
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

    public java.lang.String getCreatechild() {
        return (java.lang.String)getProperty("createchild");
    }

    public void setCreatechild(java.lang.String value) {
        setProperty("createchild", value);
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

    public java.lang.String getExcel() {
        return (java.lang.String)getProperty("excel");
    }

    public void setExcel(java.lang.String value) {
        setProperty("excel", value);
    }

    public java.lang.String getPdf() {
        return (java.lang.String)getProperty("pdf");
    }

    public void setPdf(java.lang.String value) {
        setProperty("pdf", value);
    }

    public java.lang.String getUpdate() {
        return (java.lang.String)getProperty("update");
    }

    public void setUpdate(java.lang.String value) {
        setProperty("update", value);
    }

//<< Attributes

}
