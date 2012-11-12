package com.kendoui.spring.controllers.bubblecharts;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.ChartDataRepository;
import com.kendoui.spring.models.JobGrowth;

@Controller("dataviz-bubble_charts-grouped_data-controller")
@RequestMapping(value="/dataviz/bubble-charts/")
public class GroupedDataController {
    @RequestMapping(value = "/grouped-data", method = RequestMethod.GET)
    public String index() {
        return "/dataviz/bubble-charts/grouped-data";
    }
    
    @RequestMapping(value = "/grouped-data/read", method = RequestMethod.POST)
    public @ResponseBody List<JobGrowth> read() {
        return ChartDataRepository.JobGrowthDataComparative();
    }
}
