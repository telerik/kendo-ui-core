
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesItemTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
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
        return "chart-seriesItem";
    }

    public void setBorder(com.kendoui.taglib.chart.SeriesItemBorderTag value) {
        setProperty("border", value);
    }

    public void setConnectors(com.kendoui.taglib.chart.SeriesItemConnectorsTag value) {
        setProperty("connectors", value);
    }

    public void setHighlight(com.kendoui.taglib.chart.SeriesItemHighlightTag value) {
        setProperty("highlight", value);
    }

    public void setLabels(com.kendoui.taglib.chart.SeriesItemLabelsTag value) {
        setProperty("labels", value);
    }

    public void setLine(com.kendoui.taglib.chart.SeriesItemLineTag value) {
        setProperty("line", value);
    }

    public void setMargin(com.kendoui.taglib.chart.SeriesItemMarginTag value) {
        setProperty("margin", value);
    }

    public void setMarkers(com.kendoui.taglib.chart.SeriesItemMarkersTag value) {
        setProperty("markers", value);
    }

    public void setNegativeValues(com.kendoui.taglib.chart.SeriesItemNegativeValuesTag value) {
        setProperty("negativeValues", value);
    }

    public void setNotes(com.kendoui.taglib.chart.SeriesItemNotesTag value) {
        setProperty("notes", value);
    }

    public void setOverlay(com.kendoui.taglib.chart.SeriesItemOverlayTag value) {
        setProperty("overlay", value);
    }

    public void setTarget(com.kendoui.taglib.chart.SeriesItemTargetTag value) {
        setProperty("target", value);
    }

    public void setTooltip(com.kendoui.taglib.chart.SeriesItemTooltipTag value) {
        setProperty("tooltip", value);
    }

    public void setColor(SeriesItemColorFunctionTag value) {
        setEvent("color", value.getBody());
    }

    public void setDownColor(SeriesItemDownColorFunctionTag value) {
        setEvent("downColor", value.getBody());
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

    public java.lang.String getCloseField() {
        return (java.lang.String)getProperty("closeField");
    }

    public void setCloseField(java.lang.String value) {
        setProperty("closeField", value);
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

    public java.lang.String getDownColor() {
        return (java.lang.String)getProperty("downColor");
    }

    public void setDownColor(java.lang.String value) {
        setProperty("downColor", value);
    }

    public java.lang.String getDownColorField() {
        return (java.lang.String)getProperty("downColorField");
    }

    public void setDownColorField(java.lang.String value) {
        setProperty("downColorField", value);
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

    public java.lang.String getHighField() {
        return (java.lang.String)getProperty("highField");
    }

    public void setHighField(java.lang.String value) {
        setProperty("highField", value);
    }

    public float getHoleSize() {
        return (float)getProperty("holeSize");
    }

    public void setHoleSize(float value) {
        setProperty("holeSize", value);
    }

    public java.lang.String getLine() {
        return (java.lang.String)getProperty("line");
    }

    public void setLine(java.lang.String value) {
        setProperty("line", value);
    }

    public java.lang.String getLowField() {
        return (java.lang.String)getProperty("lowField");
    }

    public void setLowField(java.lang.String value) {
        setProperty("lowField", value);
    }

    public float getMargin() {
        return (float)getProperty("margin");
    }

    public void setMargin(float value) {
        setProperty("margin", value);
    }

    public float getMaxSize() {
        return (float)getProperty("maxSize");
    }

    public void setMaxSize(float value) {
        setProperty("maxSize", value);
    }

    public float getMinSize() {
        return (float)getProperty("minSize");
    }

    public void setMinSize(float value) {
        setProperty("minSize", value);
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

    public java.lang.String getNoteTextField() {
        return (java.lang.String)getProperty("noteTextField");
    }

    public void setNoteTextField(java.lang.String value) {
        setProperty("noteTextField", value);
    }

    public float getOpacity() {
        return (float)getProperty("opacity");
    }

    public void setOpacity(float value) {
        setProperty("opacity", value);
    }

    public java.lang.String getOpenField() {
        return (java.lang.String)getProperty("openField");
    }

    public void setOpenField(java.lang.String value) {
        setProperty("openField", value);
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

    public java.lang.String getSizeField() {
        return (java.lang.String)getProperty("sizeField");
    }

    public void setSizeField(java.lang.String value) {
        setProperty("sizeField", value);
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

    public boolean getVisibleInLegend() {
        return (boolean)getProperty("visibleInLegend");
    }

    public void setVisibleInLegend(boolean value) {
        setProperty("visibleInLegend", value);
    }

    public java.lang.String getVisibleInLegendField() {
        return (java.lang.String)getProperty("visibleInLegendField");
    }

    public void setVisibleInLegendField(java.lang.String value) {
        setProperty("visibleInLegendField", value);
    }

    public float getWidth() {
        return (float)getProperty("width");
    }

    public void setWidth(float value) {
        setProperty("width", value);
    }

    public java.lang.String getXaxis() {
        return (java.lang.String)getProperty("xAxis");
    }

    public void setXaxis(java.lang.String value) {
        setProperty("xAxis", value);
    }

    public java.lang.String getXfield() {
        return (java.lang.String)getProperty("xField");
    }

    public void setXfield(java.lang.String value) {
        setProperty("xField", value);
    }

    public java.lang.String getYaxis() {
        return (java.lang.String)getProperty("yAxis");
    }

    public void setYaxis(java.lang.String value) {
        setProperty("yAxis", value);
    }

    public java.lang.String getYfield() {
        return (java.lang.String)getProperty("yField");
    }

    public void setYfield(java.lang.String value) {
        setProperty("yField", value);
    }

//<< Attributes

}
