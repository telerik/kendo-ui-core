
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ConnectionTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ConnectionsTag parent = (ConnectionsTag)findParentWithClass(ConnectionsTag.class);

        parent.addConnection(this);

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
        return "diagram-connection";
    }

    public void setContent(com.kendoui.taglib.diagram.ConnectionContentTag value) {
        setProperty("content", value);
    }

    public void setEditable(com.kendoui.taglib.diagram.ConnectionEditableTag value) {
        setProperty("editable", value);
    }

    public void setFrom(com.kendoui.taglib.diagram.ConnectionFromTag value) {
        setProperty("from", value);
    }

    public void setHover(com.kendoui.taglib.diagram.ConnectionHoverTag value) {
        setProperty("hover", value);
    }

    public void setPoints(ConnectionPointsTag value) {

        setProperty("points", value.points());

    }

    public void setSelection(com.kendoui.taglib.diagram.ConnectionSelectionTag value) {
        setProperty("selection", value);
    }

    public void setStroke(com.kendoui.taglib.diagram.ConnectionStrokeTag value) {
        setProperty("stroke", value);
    }

    public void setTo(com.kendoui.taglib.diagram.ConnectionToTag value) {
        setProperty("to", value);
    }

    public boolean getEditable() {
        return (boolean)getProperty("editable");
    }

    public void setEditable(boolean value) {
        setProperty("editable", value);
    }

    public java.lang.String getEndCap() {
        return (java.lang.String)getProperty("endCap");
    }

    public void setEndCap(java.lang.String value) {
        setProperty("endCap", value);
    }

    public java.lang.Object getFrom() {
        return (java.lang.Object)getProperty("from");
    }

    public void setFrom(java.lang.Object value) {
        setProperty("from", value);
    }

    public java.lang.String getStartCap() {
        return (java.lang.String)getProperty("startCap");
    }

    public void setStartCap(java.lang.String value) {
        setProperty("startCap", value);
    }

    public java.lang.Object getTo() {
        return (java.lang.Object)getProperty("to");
    }

    public void setTo(java.lang.Object value) {
        setProperty("to", value);
    }

//<< Attributes

}
