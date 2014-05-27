package com.kendoui.spring.controllers.radarcharts;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.ChartDataRepository;
import com.kendoui.spring.models.BudgetReportItem;

@Controller("dataviz-radar_charts_remote_data-controller")
@RequestMapping(value="/radar-charts/")
public class RemoteDataBindingController {
    @RequestMapping(value = "/remote-data-binding", method = RequestMethod.GET)
    public String index() {
        return "/radar-charts/remote-data-binding";
    }
    
    @RequestMapping(value = "/remote-data-binding/read", method = RequestMethod.POST)
    public @ResponseBody List<BudgetReportItem> read() {
        return ChartDataRepository.BudgetReport();
    }
}
