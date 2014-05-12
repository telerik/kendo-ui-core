
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

    public void setEditable(com.kendoui.taglib.diagram.EditableTag value) {
        setProperty("editable", value);
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

    public void setZoomEnd(ZoomEndFunctionTag value) {
        setEvent("zoomEnd", value.getBody());
    }

    public void setZoomStart(ZoomStartFunctionTag value) {
        setEvent("zoomStart", value.getBody());
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

    public boolean getEditable() {
        return (boolean)getProperty("editable");
    }

    public void setEditable(boolean value) {
        setProperty("editable", value);
    }

    public java.lang.String getTemplate() {
        return (java.lang.String)getProperty("template");
    }

    public void setTemplate(java.lang.String value) {
        setProperty("template", value);
    }

    public float getZoom() {
        return (float)getProperty("zoom");
    }

    public void setZoom(float value) {
        setProperty("zoom", value);
    }

    public float getZoomMax() {
        return (float)getProperty("zoomMax");
    }

    public void setZoomMax(float value) {
        setProperty("zoomMax", value);
    }

    public float getZoomMin() {
        return (float)getProperty("zoomMin");
    }

    public void setZoomMin(float value) {
        setProperty("zoomMin", value);
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

    public String getZoomEnd() {
        Function property = ((Function)getProperty("zoomEnd"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setZoomEnd(String value) {
        setProperty("zoomEnd", new Function(value));
    }

    public String getZoomStart() {
        Function property = ((Function)getProperty("zoomStart"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setZoomStart(String value) {
        setProperty("zoomStart", new Function(value));
    }

//<< Attributes

}
