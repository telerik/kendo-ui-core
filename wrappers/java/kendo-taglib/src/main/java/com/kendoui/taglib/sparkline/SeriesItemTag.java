
package com.kendoui.taglib.sparkline;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesItemTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        SeriesTag parent = (SeriesTag)findParentWithClass(SeriesTag.class);

        parent.addSeriesItem(this);

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
        return "sparkline-seriesItem";
    }

    public void setBorder(com.kendoui.taglib.sparkline.SeriesItemBorderTag value) {
        setProperty("border", value);
    }

    public void setConnectors(com.kendoui.taglib.sparkline.SeriesItemConnectorsTag value) {
        setProperty("connectors", value);
    }

    public void setHighlight(com.kendoui.taglib.sparkline.SeriesItemHighlightTag value) {
        setProperty("highlight", value);
    }

    public void setLabels(com.kendoui.taglib.sparkline.SeriesItemLabelsTag value) {
        setProperty("labels", value);
    }

    public void setLine(com.kendoui.taglib.sparkline.SeriesItemLineTag value) {
        setProperty("line", value);
    }

    public void setMarkers(com.kendoui.taglib.sparkline.SeriesItemMarkersTag value) {
        setProperty("markers", value);
    }

    public void setNotes(com.kendoui.taglib.sparkline.SeriesItemNotesTag value) {
        setProperty("notes", value);
    }

    public void setOverlay(com.kendoui.taglib.sparkline.SeriesItemOverlayTag value) {
        setProperty("overlay", value);
    }

    public void setTarget(com.kendoui.taglib.sparkline.SeriesItemTargetTag value) {
        setProperty("target", value);
    }

    public void setTooltip(com.kendoui.taglib.sparkline.SeriesItemTooltipTag value) {
        setProperty("tooltip", value);
    }

    public void setColor(SeriesItemColorFunctionTag value) {
        setEvent("color", value.getBody());
    }

    public java.lang.String getAggregate() {
        return (java.lang.String)getProperty("aggregate");
    }

    public void setAggregate(java.lang.String value) {
        setProperty("aggregate", value);
    }

    public java.lang.String getAxis() {
        return (java.lang.String)getProperty("axis");
    }

    public void setAxis(java.lang.String value) {
        setProperty("axis", value);
    }

    public java.lang.String getCategoryField() {
        return (java.lang.String)getProperty("categoryField");
    }

    public void setCategoryField(java.lang.String value) {
        setProperty("categoryField", value);
    }

    public java.lang.String getColor() {
        return (java.lang.String)getProperty("color");
    }

    public void setColor(java.lang.String value) {
        setProperty("color", value);
    }

    public java.lang.String getColorField() {
        return (java.lang.String)getProperty("colorField");
    }

    public void setColorField(java.lang.String value) {
        setProperty("colorField", value);
    }

    public java.lang.String getCurrentField() {
        return (java.lang.String)getProperty("currentField");
    }

    public void setCurrentField(java.lang.String value) {
        setProperty("currentField", value);
    }

    public java.lang.String getDashType() {
        return (java.lang.String)getProperty("dashType");
    }

    public void setDashType(java.lang.String value) {
        setProperty("dashType", value);
    }

    public java.lang.Object getData() {
        return (java.lang.Object)getProperty("data");
    }

    public void setData(java.lang.Object value) {
        setProperty("data", value);
    }

    public java.lang.String getExplodeField() {
        return (java.lang.String)getProperty("explodeField");
    }

    public void setExplodeField(java.lang.String value) {
        setProperty("explodeField", value);
    }

    public java.lang.String getField() {
        return (java.lang.String)getProperty("field");
    }

    public void setField(java.lang.String value) {
        setProperty("field", value);
    }

    public float getGap() {
        return (float)getProperty("gap");
    }

    public void setGap(float value) {
        setProperty("gap", value);
    }

    public java.lang.String getLine() {
        return (java.lang.String)getProperty("line");
    }

    public void setLine(java.lang.String value) {
        setProperty("line", value);
    }

    public java.lang.String getMissingValues() {
        return (java.lang.String)getProperty("missingValues");
    }

    public void setMissingValues(java.lang.String value) {
        setProperty("missingValues", value);
    }

    public java.lang.String getName() {
        return (java.lang.String)getProperty("name");
    }

    public void setName(java.lang.String value) {
        setProperty("name", value);
    }

    public java.lang.String getNegativeColor() {
        return (java.lang.String)getProperty("negativeColor");
    }

    public void setNegativeColor(java.lang.String value) {
        setProperty("negativeColor", value);
    }

    public float getOpacity() {
        return (float)getProperty("opacity");
    }

    public void setOpacity(float value) {
        setProperty("opacity", value);
    }

    public float getPadding() {
        return (float)getProperty("padding");
    }

    public void setPadding(float value) {
        setProperty("padding", value);
    }

    public float getSize() {
        return (float)getProperty("size");
    }

    public void setSize(float value) {
        setProperty("size", value);
    }

    public float getSpacing() {
        return (float)getProperty("spacing");
    }

    public void setSpacing(float value) {
        setProperty("spacing", value);
    }

    public java.lang.Object getStack() {
        return (java.lang.Object)getProperty("stack");
    }

    public void setStack(java.lang.Object value) {
        setProperty("stack", value);
    }

    public float getStartAngle() {
        return (float)getProperty("startAngle");
    }

    public void setStartAngle(float value) {
        setProperty("startAngle", value);
    }

    public java.lang.String getTargetField() {
        return (java.lang.String)getProperty("targetField");
    }

    public void setTargetField(java.lang.String value) {
        setProperty("targetField", value);
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

//<< Attributes

}
