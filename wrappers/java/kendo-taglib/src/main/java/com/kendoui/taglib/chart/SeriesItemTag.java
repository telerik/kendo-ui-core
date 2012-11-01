
package com.kendoui.taglib.chart;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import com.kendoui.taglib.BaseTag;
import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesItemTag extends  BaseTag  /* interfaces *//* interfaces */ {
    @Override
    public int doEndTag() throws JspException {
        SeriesTag parent = (SeriesTag)findParentWithClass(SeriesTag.class);

        parent.addSeriesItem(json);

        return super.doEndTag();
    }

    @Override
    public void initialize() {
        json = new ArrayList<Map<String, Object>>();
        super.initialize();
    }

    @Override
    public void destroy() {
        super.destroy();
    }
   
    private List<Map<String, Object>> json;
    public void AddValue(BaseTag value) {
        json.add((Map<String, Object>)value.properties());
        
    }

    public static String tagName() {
        return "chart-seriesItem";
    }

    public void setArea(SeriesItemAreaTag value) {
        AddValue(value);
    }

    public void setLine(SeriesItemLineTag value) {
        AddValue(value);
    }

    public void setBar(SeriesItemBarTag value) {
        AddValue(value);
    }

    public void setBubble(SeriesItemBubbleTag value) {
        AddValue(value);
    }

    public void setDonut(SeriesItemDonutTag value) {
        AddValue(value);
    }

    public void setPie(SeriesItemPieTag value) {
        AddValue(value);
    }

    public void setScatter(SeriesItemScatterTag value) {
        AddValue(value);
    }

    public void setScatterLine(SeriesItemScatterLineTag value) {
        AddValue(value);
    }

    public void setCandlestick(SeriesItemCandlestickTag value) {
        AddValue(value);
    }

    public void setOhlc(SeriesItemOhlcTag value) {
        AddValue(value);
    }
}
