package com.kendoui.spring.controllers.scattercharts;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.ChartDataRepository;
import com.kendoui.spring.models.StockDataPoint;

@Controller("dataviz-scatter_charts-grouped_data-controller")
@RequestMapping(value="/scatter-charts/")
public class GroupedDataController {
    @RequestMapping(value = "/grouped-data", method = RequestMethod.GET)
    public String index() {
        return "/scatter-charts/grouped-data";
    }
    
    @RequestMapping(value = "/grouped-data/read", method = RequestMethod.POST)
    public @ResponseBody List<StockDataPoint> read() {
        return ChartDataRepository.StockData();
    }
}
