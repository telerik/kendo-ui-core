package com.kendoui.spring.controllers.scattercharts;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.ChartDataRepository;
import com.kendoui.spring.models.StockDataPoint;

@Controller("dataviz-scatter_charts-date_axis-controller")
@RequestMapping(value="/scatter-charts/")
public class DateAxisController {
    @RequestMapping(value = "/date-axis", method = RequestMethod.GET)
    public String index(Model model) {
        return "/scatter-charts/date-axis";
    }
    
    @RequestMapping(value = "/date-axis/read", method = RequestMethod.POST)
    public @ResponseBody List<StockDataPoint> read() {
        return ChartDataRepository.StockData();
    }
}
