
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ConnectionsDefaultsHoverTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ConnectionsDefaultsTag parent = (ConnectionsDefaultsTag)findParentWithClass(ConnectionsDefaultsTag.class);


        parent.setHover(this);

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
        return "diagram-connectionsDefaults-hover";
    }

    public void setStroke(com.kendoui.taglib.diagram.ConnectionsDefaultsHoverStrokeTag value) {
        setProperty("stroke", value);
    }

//<< Attributes

}
