package com.kendoui.spring.controllers.radarcharts;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.ChartDataRepository;
import com.kendoui.spring.models.WindDataItem;

@Controller("dataviz-radar_charts-grouped_data-controller")
@RequestMapping(value="/radar-charts/")
public class GroupedDataController {
    @RequestMapping(value = "/grouped-data", method = RequestMethod.GET)
    public String index() {
        return "/radar-charts/grouped-data";
    }
    
    @RequestMapping(value = "/grouped-data/read", method = RequestMethod.POST)
    public @ResponseBody List<WindDataItem> read() {
        return ChartDataRepository.WindData();
    }
}
