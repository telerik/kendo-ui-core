
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

    public void setHover(com.kendoui.taglib.diagram.ConnectionHoverTag value) {
        setProperty("hover", value);
    }

    public void setPoints(ConnectionPointsTag value) {

        setProperty("points", value.points());

    }

    public void setStroke(com.kendoui.taglib.diagram.ConnectionStrokeTag value) {
        setProperty("stroke", value);
    }

    public java.lang.String getEndCap() {
        return (java.lang.String)getProperty("endCap");
    }

    public void setEndCap(java.lang.String value) {
        setProperty("endCap", value);
    }

    public java.lang.String getStartCap() {
        return (java.lang.String)getProperty("startCap");
    }

    public void setStartCap(java.lang.String value) {
        setProperty("startCap", value);
    }

//<< Attributes

}
