
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

    public void setMarkers(com.kendoui.taglib.chart.SeriesItemMarkersTag value) {
        setProperty("markers", value);
    }

    public void setNegativeValues(com.kendoui.taglib.chart.SeriesItemNegativeValuesTag value) {
        setProperty("negativeValues", value);
    }

    public void setOverlay(com.kendoui.taglib.chart.SeriesItemOverlayTag value) {
        setProperty("overlay", value);
    }

    public void setTooltip(com.kendoui.taglib.chart.SeriesItemTooltipTag value) {
        setProperty("tooltip", value);
    }

    public String getAggregate() {
        return (String)getProperty("aggregate");
    }

    public void setAggregate(String value) {
        setProperty("aggregate", value);
    }

    public String getAxis() {
        return (String)getProperty("axis");
    }

    public void setAxis(String value) {
        setProperty("axis", value);
    }

    public String getCategoryField() {
        return (String)getProperty("categoryField");
    }

    public void setCategoryField(String value) {
        setProperty("categoryField", value);
    }

    public String getCloseField() {
        return (String)getProperty("closeField");
    }

    public void setCloseField(String value) {
        setProperty("closeField", value);
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
        setProperty("color", value);
    }

    public String getColorField() {
        return (String)getProperty("colorField");
    }

    public void setColorField(String value) {
        setProperty("colorField", value);
    }

    public String getDashType() {
        return (String)getProperty("dashType");
    }

    public void setDashType(String value) {
        setProperty("dashType", value);
    }

    public Object getData() {
        return (Object)getProperty("data");
    }

    public void setData(Object value) {
        setProperty("data", value);
    }

    public String getDownColor() {
        return (String)getProperty("downColor");
    }

    public void setDownColor(String value) {
        setProperty("downColor", value);
    }

    public String getDownColorField() {
        return (String)getProperty("downColorField");
    }

    public void setDownColorField(String value) {
        setProperty("downColorField", value);
    }

    public String getExplodeField() {
        return (String)getProperty("explodeField");
    }

    public void setExplodeField(String value) {
        setProperty("explodeField", value);
    }

    public String getField() {
        return (String)getProperty("field");
    }

    public void setField(String value) {
        setProperty("field", value);
    }

    public float getGap() {
        return (float)getProperty("gap");
    }

    public void setGap(float value) {
        setProperty("gap", value);
    }

    public String getGroupNameTemplate() {
        return (String)getProperty("groupNameTemplate");
    }

    public void setGroupNameTemplate(String value) {
        setProperty("groupNameTemplate", value);
    }

    public String getHighField() {
        return (String)getProperty("highField");
    }

    public void setHighField(String value) {
        setProperty("highField", value);
    }

    public float getHoleSize() {
        return (float)getProperty("holeSize");
    }

    public void setHoleSize(float value) {
        setProperty("holeSize", value);
    }

    public String getLine() {
        return (String)getProperty("line");
    }

    public void setLine(String value) {
        setProperty("line", value);
    }

    public String getLowField() {
        return (String)getProperty("lowField");
    }

    public void setLowField(String value) {
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

    public String getMissingValues() {
        return (String)getProperty("missingValues");
    }

    public void setMissingValues(String value) {
        setProperty("missingValues", value);
    }

    public String getName() {
        return (String)getProperty("name");
    }

    public void setName(String value) {
        setProperty("name", value);
    }

    public String getNegativeColor() {
        return (String)getProperty("negativeColor");
    }

    public void setNegativeColor(String value) {
        setProperty("negativeColor", value);
    }

    public float getOpacity() {
        return (float)getProperty("opacity");
    }

    public void setOpacity(float value) {
        setProperty("opacity", value);
    }

    public String getOpenField() {
        return (String)getProperty("openField");
    }

    public void setOpenField(String value) {
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

    public String getSizeField() {
        return (String)getProperty("sizeField");
    }

    public void setSizeField(String value) {
        setProperty("sizeField", value);
    }

    public float getSpacing() {
        return (float)getProperty("spacing");
    }

    public void setSpacing(float value) {
        setProperty("spacing", value);
    }

    public Object getStack() {
        return (Object)getProperty("stack");
    }

    public void setStack(Object value) {
        setProperty("stack", value);
    }

    public float getStartAngle() {
        return (float)getProperty("startAngle");
    }

    public void setStartAngle(float value) {
        setProperty("startAngle", value);
    }

    public String getType() {
        return (String)getProperty("type");
    }

    public void setType(String value) {
        setProperty("type", value);
    }

    public String getVisibleInLegendField() {
        return (String)getProperty("visibleInLegendField");
    }

    public void setVisibleInLegendField(String value) {
        setProperty("visibleInLegendField", value);
    }

    public float getWidth() {
        return (float)getProperty("width");
    }

    public void setWidth(float value) {
        setProperty("width", value);
    }

    public String getXaxis() {
        return (String)getProperty("xAxis");
    }

    public void setXaxis(String value) {
        setProperty("xAxis", value);
    }

    public String getXfield() {
        return (String)getProperty("xField");
    }

    public void setXfield(String value) {
        setProperty("xField", value);
    }

    public String getYaxis() {
        return (String)getProperty("yAxis");
    }

    public void setYaxis(String value) {
        setProperty("yAxis", value);
    }

    public String getYfield() {
        return (String)getProperty("yField");
    }

    public void setYfield(String value) {
        setProperty("yField", value);
    }

//<< Attributes

}
