
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ConnectionDefaultsSelectionHandlesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ConnectionDefaultsSelectionTag parent = (ConnectionDefaultsSelectionTag)findParentWithClass(ConnectionDefaultsSelectionTag.class);


        parent.setHandles(this);

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
        return "diagram-connectionDefaults-selection-handles";
    }

    public void setFill(com.kendoui.taglib.diagram.ConnectionDefaultsSelectionHandlesFillTag value) {
        setProperty("fill", value);
    }

    public void setStroke(com.kendoui.taglib.diagram.ConnectionDefaultsSelectionHandlesStrokeTag value) {
        setProperty("stroke", value);
    }

    public java.lang.String getFill() {
        return (java.lang.String)getProperty("fill");
    }

    public void setFill(java.lang.String value) {
        setProperty("fill", value);
    }

//<< Attributes

}
