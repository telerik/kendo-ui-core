
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class EditableResizeHandlesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        EditableResizeTag parent = (EditableResizeTag)findParentWithClass(EditableResizeTag.class);


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
        return "diagram-editable-resize-handles";
    }

    public void setFill(com.kendoui.taglib.diagram.EditableResizeHandlesFillTag value) {
        setProperty("fill", value);
    }

    public void setHover(com.kendoui.taglib.diagram.EditableResizeHandlesHoverTag value) {
        setProperty("hover", value);
    }

    public void setStroke(com.kendoui.taglib.diagram.EditableResizeHandlesStrokeTag value) {
        setProperty("stroke", value);
    }

    public java.lang.String getFill() {
        return (java.lang.String)getProperty("fill");
    }

    public void setFill(java.lang.String value) {
        setProperty("fill", value);
    }

    public float getHeight() {
        return (float)getProperty("height");
    }

    public void setHeight(float value) {
        setProperty("height", value);
    }

    public float getWidth() {
        return (float)getProperty("width");
    }

    public void setWidth(float value) {
        setProperty("width", value);
    }

//<< Attributes

}
