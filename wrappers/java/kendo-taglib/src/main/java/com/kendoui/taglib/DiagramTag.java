
package com.kendoui.taglib;

import javax.servlet.jsp.JspException;

import com.kendoui.taglib.json.Function;
import com.kendoui.taglib.diagram.*;

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

    public void setConnections(ConnectionsTag value) {

        setProperty("connections", value.connections());

    }

    public void setLayout(com.kendoui.taglib.diagram.LayoutTag value) {
        setProperty("layout", value);
    }

    public void setShapeDefaults(com.kendoui.taglib.diagram.ShapeDefaultsTag value) {
        setProperty("shapeDefaults", value);
    }

    public void setShapes(ShapesTag value) {

        setProperty("shapes", value.shapes());

    }

    public void setChange(ChangeFunctionTag value) {
        setEvent("change", value.getBody());
    }

    public void setClick(ClickFunctionTag value) {
        setEvent("click", value.getBody());
    }

    public void setItemBoundsChange(ItemBoundsChangeFunctionTag value) {
        setEvent("itemBoundsChange", value.getBody());
    }

    public void setItemRotate(ItemRotateFunctionTag value) {
        setEvent("itemRotate", value.getBody());
    }

    public void setPan(PanFunctionTag value) {
        setEvent("pan", value.getBody());
    }

    public void setSelect(SelectFunctionTag value) {
        setEvent("select", value.getBody());
    }

    public void setZoom(ZoomFunctionTag value) {
        setEvent("zoom", value.getBody());
    }

    public boolean getAutoBind() {
        return (boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean value) {
        setProperty("autoBind", value);
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

    public java.lang.String getTemplate() {
        return (java.lang.String)getProperty("template");
    }

    public void setTemplate(java.lang.String value) {
        setProperty("template", value);
    }

    public float getZoomRate() {
        return (float)getProperty("zoomRate");
    }

    public void setZoomRate(float value) {
        setProperty("zoomRate", value);
    }

    public String getChange() {
        Function property = ((Function)getProperty("change"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setChange(String value) {
        setProperty("change", new Function(value));
    }

    public String getClick() {
        Function property = ((Function)getProperty("click"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setClick(String value) {
        setProperty("click", new Function(value));
    }

    public String getItemBoundsChange() {
        Function property = ((Function)getProperty("itemBoundsChange"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setItemBoundsChange(String value) {
        setProperty("itemBoundsChange", new Function(value));
    }

    public String getItemRotate() {
        Function property = ((Function)getProperty("itemRotate"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setItemRotate(String value) {
        setProperty("itemRotate", new Function(value));
    }

    public String getPan() {
        Function property = ((Function)getProperty("pan"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setPan(String value) {
        setProperty("pan", new Function(value));
    }

    public String getSelect() {
        Function property = ((Function)getProperty("select"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setSelect(String value) {
        setProperty("select", new Function(value));
    }

    public String getZoom() {
        Function property = ((Function)getProperty("zoom"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setZoom(String value) {
        setProperty("zoom", new Function(value));
    }

//<< Attributes

}
