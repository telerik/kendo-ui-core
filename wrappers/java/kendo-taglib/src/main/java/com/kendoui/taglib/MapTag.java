
package com.kendoui.taglib;


import com.kendoui.taglib.map.*;
import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MapTag extends WidgetTag /* interfaces *//* interfaces */ {

    public MapTag() {
        super("Map");
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
        return "map";
    }

    public void setControls(com.kendoui.taglib.map.ControlsTag value) {
        setProperty("controls", value);
    }

    public void setLayerDefaults(com.kendoui.taglib.map.LayerDefaultsTag value) {
        setProperty("layerDefaults", value);
    }

    public void setLayers(LayersTag value) {

        setProperty("layers", value.layers());

    }

    public void setMarkerDefaults(com.kendoui.taglib.map.MarkerDefaultsTag value) {
        setProperty("markerDefaults", value);
    }

    public void setMarkers(MarkersTag value) {

        setProperty("markers", value.markers());

    }

    public void setClick(ClickFunctionTag value) {
        setEvent("click", value.getBody());
    }

    public void setMarkerCreated(MarkerCreatedFunctionTag value) {
        setEvent("markerCreated", value.getBody());
    }

    public void setPan(PanFunctionTag value) {
        setEvent("pan", value.getBody());
    }

    public void setPanEnd(PanEndFunctionTag value) {
        setEvent("panEnd", value.getBody());
    }

    public void setReset(ResetFunctionTag value) {
        setEvent("reset", value.getBody());
    }

    public void setShapeClick(ShapeClickFunctionTag value) {
        setEvent("shapeClick", value.getBody());
    }

    public void setShapeCreated(ShapeCreatedFunctionTag value) {
        setEvent("shapeCreated", value.getBody());
    }

    public void setShapeMouseEnter(ShapeMouseEnterFunctionTag value) {
        setEvent("shapeMouseEnter", value.getBody());
    }

    public void setShapeMouseLeave(ShapeMouseLeaveFunctionTag value) {
        setEvent("shapeMouseLeave", value.getBody());
    }

    public void setZoomEnd(ZoomEndFunctionTag value) {
        setEvent("zoomEnd", value.getBody());
    }

    public void setZoomStart(ZoomStartFunctionTag value) {
        setEvent("zoomStart", value.getBody());
    }

    public java.lang.Object getCenter() {
        return (java.lang.Object)getProperty("center");
    }

    public void setCenter(java.lang.Object value) {
        setProperty("center", value);
    }

    public float getMaxZoom() {
        return (float)getProperty("maxZoom");
    }

    public void setMaxZoom(float value) {
        setProperty("maxZoom", value);
    }

    public float getMinSize() {
        return (float)getProperty("minSize");
    }

    public void setMinSize(float value) {
        setProperty("minSize", value);
    }

    public float getMinZoom() {
        return (float)getProperty("minZoom");
    }

    public void setMinZoom(float value) {
        setProperty("minZoom", value);
    }

    public boolean getWraparound() {
        return (boolean)getProperty("wraparound");
    }

    public void setWraparound(boolean value) {
        setProperty("wraparound", value);
    }

    public float getZoom() {
        return (float)getProperty("zoom");
    }

    public void setZoom(float value) {
        setProperty("zoom", value);
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

    public String getMarkerCreated() {
        Function property = ((Function)getProperty("markerCreated"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setMarkerCreated(String value) {
        setProperty("markerCreated", new Function(value));
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

    public String getPanEnd() {
        Function property = ((Function)getProperty("panEnd"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setPanEnd(String value) {
        setProperty("panEnd", new Function(value));
    }

    public String getReset() {
        Function property = ((Function)getProperty("reset"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setReset(String value) {
        setProperty("reset", new Function(value));
    }

    public String getShapeClick() {
        Function property = ((Function)getProperty("shapeClick"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setShapeClick(String value) {
        setProperty("shapeClick", new Function(value));
    }

    public String getShapeCreated() {
        Function property = ((Function)getProperty("shapeCreated"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setShapeCreated(String value) {
        setProperty("shapeCreated", new Function(value));
    }

    public String getShapeMouseEnter() {
        Function property = ((Function)getProperty("shapeMouseEnter"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setShapeMouseEnter(String value) {
        setProperty("shapeMouseEnter", new Function(value));
    }

    public String getShapeMouseLeave() {
        Function property = ((Function)getProperty("shapeMouseLeave"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setShapeMouseLeave(String value) {
        setProperty("shapeMouseLeave", new Function(value));
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
