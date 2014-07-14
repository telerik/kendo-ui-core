
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ShapeEditableTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ShapeTag parent = (ShapeTag)findParentWithClass(ShapeTag.class);


        parent.setEditable(this);

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
        return "diagram-shape-editable";
    }

    public boolean getConnect() {
        return (boolean)getProperty("connect");
    }

    public void setConnect(boolean value) {
        setProperty("connect", value);
    }

//<< Attributes

}
