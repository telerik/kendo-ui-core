
package com.kendoui.taglib.chart;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesTag extends BaseTag /* interfaces */implements Labels, Border, Line, Markers, Tooltip, Overlay, NegativeValues, Connectors/* interfaces */ {

//>> Attributes

    @Override
    public int doEndTag() throws JspException {
        Series parent = (Series)findParentWithClass(Series.class);

        parent.setSeries(this);

        return EVAL_PAGE;
    }

    @Override
    public void setLabels(LabelsTag value) {
        setProperty("labels", value);
    }

    @Override
    public void setBorder(BorderTag value) {
        setProperty("border", value);
    }

    @Override
    public void setLine(LineTag value) {
        setProperty("line", value);
    }

    @Override
    public void setMarkers(MarkersTag value) {
        setProperty("markers", value);
    }

    @Override
    public void setTooltip(TooltipTag value) {
        setProperty("tooltip", value);
    }

    @Override
    public void setOverlay(OverlayTag value) {
        setProperty("overlay", value);
    }

    @Override
    public void setNegativeValues(NegativeValuesTag value) {
        setProperty("negativeValues", value);
    }

    @Override
    public void setConnectors(ConnectorsTag value) {
        setProperty("connectors", value);
    }

    public String getField() {
        return (String)getProperty("field");
    }

    public void setField(String value) {
        setProperty("field", value);
    }

    public String getGroupNameTemplate() {
        return (String)getProperty("groupNameTemplate");
    }

    public void setGroupNameTemplate(String value) {
        setProperty("groupNameTemplate", value);
    }

    public String getName() {
        return (String)getProperty("name");
    }

    public void setName(String value) {
        setProperty("name", value);
    }

    public String getAggregate() {
        return (String)getProperty("aggregate");
    }

    public void setAggregate(String value) {
        setProperty("aggregate", value);
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
        setProperty("color", value);
    }

    public String getMissingValues() {
        return (String)getProperty("missingValues");
    }

    public void setMissingValues(String value) {
        setProperty("missingValues", value);
    }

    public int getOpacity() {
        return (int)getProperty("opacity");
    }

    public void setOpacity(int value) {
        setProperty("opacity", value);
    }

    public boolean getStack() {
        return (boolean)getProperty("stack");
    }

    public void setStack(boolean value) {
        setProperty("stack", value);
    }

    public String getAxis() {
        return (String)getProperty("axis");
    }

    public void setAxis(String value) {
        setProperty("axis", value);
    }

    public String getColorField() {
        return (String)getProperty("colorField");
    }

    public void setColorField(String value) {
        setProperty("colorField", value);
    }

    public int getGap() {
        return (int)getProperty("gap");
    }

    public void setGap(int value) {
        setProperty("gap", value);
    }

    public int getSpacing() {
        return (int)getProperty("spacing");
    }

    public void setSpacing(int value) {
        setProperty("spacing", value);
    }

    public String getCategoryField() {
        return (String)getProperty("categoryField");
    }

    public void setCategoryField(String value) {
        setProperty("categoryField", value);
    }

    public int getMaxSize() {
        return (int)getProperty("maxSize");
    }

    public void setMaxSize(int value) {
        setProperty("maxSize", value);
    }

    public int getMinSize() {
        return (int)getProperty("minSize");
    }

    public void setMinSize(int value) {
        setProperty("minSize", value);
    }

    public String getSizeField() {
        return (String)getProperty("sizeField");
    }

    public void setSizeField(String value) {
        setProperty("sizeField", value);
    }

    public String getVisibleInLegendField() {
        return (String)getProperty("visibleInLegendField");
    }

    public void setVisibleInLegendField(String value) {
        setProperty("visibleInLegendField", value);
    }

    public String getXAxis() {
        return (String)getProperty("xAxis");
    }

    public void setXAxis(String value) {
        setProperty("xAxis", value);
    }

    public String getXField() {
        return (String)getProperty("xField");
    }

    public void setXField(String value) {
        setProperty("xField", value);
    }

    public String getYAxis() {
        return (String)getProperty("yAxis");
    }

    public void setYAxis(String value) {
        setProperty("yAxis", value);
    }

    public String getYField() {
        return (String)getProperty("yField");
    }

    public void setYField(String value) {
        setProperty("yField", value);
    }

    public String getExplodeField() {
        return (String)getProperty("explodeField");
    }

    public void setExplodeField(String value) {
        setProperty("explodeField", value);
    }

    public int getHoleSize() {
        return (int)getProperty("holeSize");
    }

    public void setHoleSize(int value) {
        setProperty("holeSize", value);
    }

    public int getMargin() {
        return (int)getProperty("margin");
    }

    public void setMargin(int value) {
        setProperty("margin", value);
    }

    public int getPadding() {
        return (int)getProperty("padding");
    }

    public void setPadding(int value) {
        setProperty("padding", value);
    }

    public int getSize() {
        return (int)getProperty("size");
    }

    public void setSize(int value) {
        setProperty("size", value);
    }

    public String getDashType() {
        return (String)getProperty("dashType");
    }

    public void setDashType(String value) {
        setProperty("dashType", value);
    }

    public String getWidth() {
        return (String)getProperty("width");
    }

    public void setWidth(String value) {
        setProperty("width", value);
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

    public String getOpenField() {
        return (String)getProperty("openField");
    }

    public void setOpenField(String value) {
        setProperty("openField", value);
    }

    public String getHighField() {
        return (String)getProperty("highField");
    }

    public void setHighField(String value) {
        setProperty("highField", value);
    }

    public String getLowField() {
        return (String)getProperty("lowField");
    }

    public void setLowField(String value) {
        setProperty("lowField", value);
    }

    public String getCloseField() {
        return (String)getProperty("closeField");
    }

    public void setCloseField(String value) {
        setProperty("closeField", value);
    }

    public String getLine() {
        return (String)getProperty("line");
    }

    public void setLine(String value) {
        setProperty("line", value);
    }

//<< Attributes
}
