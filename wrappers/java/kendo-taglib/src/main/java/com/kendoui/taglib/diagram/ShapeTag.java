
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ShapeTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ShapesTag parent = (ShapesTag)findParentWithClass(ShapesTag.class);

        parent.addShape(this);

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
        return "diagram-shape";
    }

    public void setConnectors(ShapeConnectorsTag value) {

        setProperty("connectors", value.connectors());

    }

    public void setHover(com.kendoui.taglib.diagram.ShapeHoverTag value) {
        setProperty("hover", value);
    }

    public void setRotation(com.kendoui.taglib.diagram.ShapeRotationTag value) {
        setProperty("rotation", value);
    }

    public void setStroke(com.kendoui.taglib.diagram.ShapeStrokeTag value) {
        setProperty("stroke", value);
    }

    public java.lang.String getBackground() {
        return (java.lang.String)getProperty("background");
    }

    public void setBackground(java.lang.String value) {
        setProperty("background", value);
    }

    public java.lang.String getContent() {
        return (java.lang.String)getProperty("content");
    }

    public void setContent(java.lang.String value) {
        setProperty("content", value);
    }

    public boolean getEditable() {
        return (boolean)getProperty("editable");
    }

    public void setEditable(boolean value) {
        setProperty("editable", value);
    }

    public float getHeight() {
        return (float)getProperty("height");
    }

    public void setHeight(float value) {
        setProperty("height", value);
    }

    public float getMinHeight() {
        return (float)getProperty("minHeight");
    }

    public void setMinHeight(float value) {
        setProperty("minHeight", value);
    }

    public float getMinWidth() {
        return (float)getProperty("minWidth");
    }

    public void setMinWidth(float value) {
        setProperty("minWidth", value);
    }

    public java.lang.String getPath() {
        return (java.lang.String)getProperty("path");
    }

    public void setPath(java.lang.String value) {
        setProperty("path", value);
    }

    public boolean getResizable() {
        return (boolean)getProperty("resizable");
    }

    public void setResizable(boolean value) {
        setProperty("resizable", value);
    }

    public boolean getRotatable() {
        return (boolean)getProperty("rotatable");
    }

    public void setRotatable(boolean value) {
        setProperty("rotatable", value);
    }

    public java.lang.String getType() {
        return (java.lang.String)getProperty("type");
    }

    public void setType(java.lang.String value) {
        setProperty("type", value);
    }

    public float getWidth() {
        return (float)getProperty("width");
    }

    public void setWidth(float value) {
        setProperty("width", value);
    }

    public float getX() {
        return (float)getProperty("x");
    }

    public void setX(float value) {
        setProperty("x", value);
    }

    public float getY() {
        return (float)getProperty("y");
    }

    public void setY(float value) {
        setProperty("y", value);
    }

//<< Attributes

}
