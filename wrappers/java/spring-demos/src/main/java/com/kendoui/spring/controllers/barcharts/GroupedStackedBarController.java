package com.kendoui.spring.controllers.barcharts;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.ChartDataRepository;
import com.kendoui.spring.models.StockDataPoint;

@Controller("dataviz-bar_charts-grouped_stacked_bar-controller")
@RequestMapping(value="/bar-charts/")
public class GroupedStackedBarController {
    @RequestMapping(value = "/grouped-stacked-bar", method = RequestMethod.GET)
    public String index() {
        return "/bar-charts/grouped-stacked-bar";
    }
    
    @RequestMapping(value = "/grouped-stacked-bar/read", method = RequestMethod.POST)
    public @ResponseBody List<StockDataPoint> read() {
        return ChartDataRepository.StockData();
    }
}
