package com.kendoui.spring.controllers.radarcharts;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.ChartDataRepository;
import com.kendoui.spring.models.BudgetReportItem;

@Controller("dataviz-radar_charts_smooth_radar_line-controller")
@RequestMapping(value="/radar-charts/")
public class SmoothRadarLineController {
    @RequestMapping(value = "/smooth-radar-line", method = RequestMethod.GET)
    public String index() {
        return "/radar-charts/smooth-radar-line";
    }
    
    @RequestMapping(value = "/smooth-radar-line/read", method = RequestMethod.POST)
    public @ResponseBody List<BudgetReportItem> read() {
        return ChartDataRepository.BudgetReport();
    }
}
