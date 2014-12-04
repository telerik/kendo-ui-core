
package com.kendoui.taglib.gantt;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesEditorTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MessagesTag parent = (MessagesTag)findParentWithClass(MessagesTag.class);


        parent.setEditor(this);

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
        return "gantt-messages-editor";
    }

    public java.lang.String getAssignButton() {
        return (java.lang.String)getProperty("assignButton");
    }

    public void setAssignButton(java.lang.String value) {
        setProperty("assignButton", value);
    }

    public java.lang.String getEditorTitle() {
        return (java.lang.String)getProperty("editorTitle");
    }

    public void setEditorTitle(java.lang.String value) {
        setProperty("editorTitle", value);
    }

    public java.lang.String getEnd() {
        return (java.lang.String)getProperty("end");
    }

    public void setEnd(java.lang.String value) {
        setProperty("end", value);
    }

    public java.lang.String getPercentComplete() {
        return (java.lang.String)getProperty("percentComplete");
    }

    public void setPercentComplete(java.lang.String value) {
        setProperty("percentComplete", value);
    }

    public java.lang.String getResources() {
        return (java.lang.String)getProperty("resources");
    }

    public void setResources(java.lang.String value) {
        setProperty("resources", value);
    }

    public java.lang.String getResourcesEditorTitle() {
        return (java.lang.String)getProperty("resourcesEditorTitle");
    }

    public void setResourcesEditorTitle(java.lang.String value) {
        setProperty("resourcesEditorTitle", value);
    }

    public java.lang.String getResourcesHeader() {
        return (java.lang.String)getProperty("resourcesHeader");
    }

    public void setResourcesHeader(java.lang.String value) {
        setProperty("resourcesHeader", value);
    }

    public java.lang.String getStart() {
        return (java.lang.String)getProperty("start");
    }

    public void setStart(java.lang.String value) {
        setProperty("start", value);
    }

    public java.lang.String getTitle() {
        return (java.lang.String)getProperty("title");
    }

    public void setTitle(java.lang.String value) {
        setProperty("title", value);
    }

    public java.lang.String getUnitsHeader() {
        return (java.lang.String)getProperty("unitsHeader");
    }

    public void setUnitsHeader(java.lang.String value) {
        setProperty("unitsHeader", value);
    }

//<< Attributes

}
