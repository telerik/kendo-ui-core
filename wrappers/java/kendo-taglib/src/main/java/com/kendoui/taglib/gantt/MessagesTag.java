
package com.kendoui.taglib.gantt;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.GanttTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        GanttTag parent = (GanttTag)findParentWithClass(GanttTag.class);


        parent.setMessages(this);

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
        return "gantt-messages";
    }

    public void setActions(com.kendoui.taglib.gantt.MessagesActionsTag value) {
        setProperty("actions", value);
    }

    public void setEditor(com.kendoui.taglib.gantt.MessagesEditorTag value) {
        setProperty("editor", value);
    }

    public void setViews(com.kendoui.taglib.gantt.MessagesViewsTag value) {
        setProperty("views", value);
    }

    public java.lang.String getCancel() {
        return (java.lang.String)getProperty("cancel");
    }

    public void setCancel(java.lang.String value) {
        setProperty("cancel", value);
    }

    public java.lang.String getDeleteDependencyWindowTitle() {
        return (java.lang.String)getProperty("deleteDependencyWindowTitle");
    }

    public void setDeleteDependencyWindowTitle(java.lang.String value) {
        setProperty("deleteDependencyWindowTitle", value);
    }

    public java.lang.String getDeleteTaskWindowTitle() {
        return (java.lang.String)getProperty("deleteTaskWindowTitle");
    }

    public void setDeleteTaskWindowTitle(java.lang.String value) {
        setProperty("deleteTaskWindowTitle", value);
    }

    public java.lang.String getDestroy() {
        return (java.lang.String)getProperty("destroy");
    }

    public void setDestroy(java.lang.String value) {
        setProperty("destroy", value);
    }

    public java.lang.String getSave() {
        return (java.lang.String)getProperty("save");
    }

    public void setSave(java.lang.String value) {
        setProperty("save", value);
    }

//<< Attributes

}
