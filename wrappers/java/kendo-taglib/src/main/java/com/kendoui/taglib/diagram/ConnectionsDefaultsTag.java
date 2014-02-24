
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.DiagramTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ConnectionsDefaultsTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        DiagramTag parent = (DiagramTag)findParentWithClass(DiagramTag.class);


        parent.setConnectionsDefaults(this);

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
        return "diagram-connectionsDefaults";
    }

    public void setHover(com.kendoui.taglib.diagram.ConnectionsDefaultsHoverTag value) {
        setProperty("hover", value);
    }

    public void setPoints(ConnectionsDefaultsPointsTag value) {

        setProperty("points", value.points());

    }

    public void setStroke(com.kendoui.taglib.diagram.ConnectionsDefaultsStrokeTag value) {
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
