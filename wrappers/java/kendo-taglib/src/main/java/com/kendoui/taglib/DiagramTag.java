
package com.kendoui.taglib;

import javax.servlet.jsp.JspException;
import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class DiagramTag extends WidgetTag /* interfaces *//* interfaces */ {

    public DiagramTag() {
        super("Diagram");
    }
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
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
        return "diagram";
    }

    public void setConnections(ConnectionsTag value) {

        setProperty("connections", value.connections());

    }

    public void setConnectionsDefaults(com.kendoui.taglib.diagram.ConnectionsDefaultsTag value) {
        setProperty("connectionsDefaults", value);
    }

    public void setShapeDefaults(com.kendoui.taglib.diagram.ShapeDefaultsTag value) {
        setProperty("shapeDefaults", value);
    }

    public void setShapes(ShapesTag value) {

        setProperty("shapes", value.shapes());

    }

    public boolean getAutoBind() {
        return (boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean value) {
        setProperty("autoBind", value);
    }

    public java.lang.Object getCopy() {
        return (java.lang.Object)getProperty("copy");
    }

    public void setCopy(java.lang.Object value) {
        setProperty("copy", value);
    }

    public boolean getDraggable() {
        return (boolean)getProperty("draggable");
    }

    public void setDraggable(boolean value) {
        setProperty("draggable", value);
    }

    public java.lang.String getName() {
        return (java.lang.String)getProperty("name");
    }

    public void setName(java.lang.String value) {
        setProperty("name", value);
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

    public java.lang.String getTemplate() {
        return (java.lang.String)getProperty("template");
    }

    public void setTemplate(java.lang.String value) {
        setProperty("template", value);
    }

    public java.lang.Object getTooltip() {
        return (java.lang.Object)getProperty("tooltip");
    }

    public void setTooltip(java.lang.Object value) {
        setProperty("tooltip", value);
    }

    public String getVisualTemplate() {
        Function property = ((Function)getProperty("visualTemplate"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setVisualTemplate(String value) {
        setProperty("visualTemplate", new Function(value));
    }

    public float getZoomRate() {
        return (float)getProperty("zoomRate");
    }

    public void setZoomRate(float value) {
        setProperty("zoomRate", value);
    }

//<< Attributes

}
