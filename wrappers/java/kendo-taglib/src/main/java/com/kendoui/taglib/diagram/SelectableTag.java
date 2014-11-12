
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.DiagramTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SelectableTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        DiagramTag parent = (DiagramTag)findParentWithClass(DiagramTag.class);


        parent.setSelectable(this);

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
        return "diagram-selectable";
    }

    public void setStroke(com.kendoui.taglib.diagram.SelectableStrokeTag value) {
        setProperty("stroke", value);
    }

    public java.lang.String getKey() {
        return (java.lang.String)getProperty("key");
    }

    public void setKey(java.lang.String value) {
        setProperty("key", value);
    }

//<< Attributes

}
