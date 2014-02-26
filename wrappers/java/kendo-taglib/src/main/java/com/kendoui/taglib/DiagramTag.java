
package com.kendoui.taglib;

import javax.servlet.jsp.JspException;

import com.kendoui.taglib.diagram.ConnectionsTag;
import com.kendoui.taglib.diagram.ShapesTag;
import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class DiagramTag extends WidgetTag /* interfaces */implements DataBoundWidget/* interfaces */ {

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

    public void setConnectionDefaults(com.kendoui.taglib.diagram.ConnectionDefaultsTag value) {
        setProperty("connectionDefaults", value);
    }

    public void setLayout(com.kendoui.taglib.diagram.LayoutTag value) {
        setProperty("layout", value);
    }

    public void setShapeDefaults(com.kendoui.taglib.diagram.ShapeDefaultsTag value) {
        setProperty("shapeDefaults", value);
    }

    public boolean getAutoBind() {
        return (boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean value) {
        setProperty("autoBind", value);
    }

    public java.lang.Object getConnections() {
        return (java.lang.Object)getProperty("connections");
    }

    public void setConnections(java.lang.Object value) {
        setProperty("connections", value);
    }

    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

    public boolean getDraggable() {
        return (boolean)getProperty("draggable");
    }

    public void setDraggable(boolean value) {
        setProperty("draggable", value);
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

    public java.lang.Object getShapes() {
        return (java.lang.Object)getProperty("shapes");
    }

    public void setShapes(java.lang.Object value) {
        setProperty("shapes", value);
    }

    public java.lang.String getTemplate() {
        return (java.lang.String)getProperty("template");
    }

    public void setTemplate(java.lang.String value) {
        setProperty("template", value);
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
