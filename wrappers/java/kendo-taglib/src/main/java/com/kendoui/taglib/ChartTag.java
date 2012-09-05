package com.kendoui.taglib;

import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class ChartTag extends WidgetTag {
    public ChartTag() {
        super("Chart");
    }

    //>> Attributes

    public String getTheme() {
        return (String)getProperty("theme");
    }

    public void setTheme(String theme) {
        setProperty("theme", theme);
    }

    public boolean getAutoBind() {
        return (boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean autoBind) {
        setProperty("autoBind", autoBind);
    }

    public boolean getTransitions() {
        return (boolean)getProperty("transitions");
    }

    public void setTransitions(boolean transitions) {
        setProperty("transitions", transitions);
    }

    public Function getDataBound() {
        return (Function)getProperty("dataBound");
    }

    public void setDataBound(String dataBound) {
        setProperty("dataBound", new Function(dataBound));
    }

    public Function getSeriesClick() {
        return (Function)getProperty("seriesClick");
    }

    public void setSeriesClick(String seriesClick) {
        setProperty("seriesClick", new Function(seriesClick));
    }

    public Function getSeriesHover() {
        return (Function)getProperty("seriesHover");
    }

    public void setSeriesHover(String seriesHover) {
        setProperty("seriesHover", new Function(seriesHover));
    }

    public Function getAxisLabelClick() {
        return (Function)getProperty("axisLabelClick");
    }

    public void setAxisLabelClick(String axisLabelClick) {
        setProperty("axisLabelClick", new Function(axisLabelClick));
    }

    public Function getPlotAreaClick() {
        return (Function)getProperty("plotAreaClick");
    }

    public void setPlotAreaClick(String plotAreaClick) {
        setProperty("plotAreaClick", new Function(plotAreaClick));
    }

    //<< Attributes
}