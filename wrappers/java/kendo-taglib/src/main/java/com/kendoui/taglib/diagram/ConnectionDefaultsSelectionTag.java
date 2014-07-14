
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ConnectionDefaultsSelectionTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ConnectionDefaultsTag parent = (ConnectionDefaultsTag)findParentWithClass(ConnectionDefaultsTag.class);


        parent.setSelection(this);

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
        return "diagram-connectionDefaults-selection";
    }

    public void setHandles(com.kendoui.taglib.diagram.ConnectionDefaultsSelectionHandlesTag value) {
        setProperty("handles", value);
    }

//<< Attributes

}
