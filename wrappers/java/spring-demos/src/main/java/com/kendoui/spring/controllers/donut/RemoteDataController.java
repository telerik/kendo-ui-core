package com.kendoui.spring.controllers.donut;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.ChartDataRepository;
import com.kendoui.spring.models.ScreenResolution;

@Controller("dataviz-donut_charts_remote_data-controller")
@RequestMapping(value="/dataviz/donut-charts/")
public class RemoteDataController {
    @RequestMapping(value = "/remote-data", method = RequestMethod.GET)
    public String index() {
        return "/dataviz/donut-charts/remote-data";
    }
    
    @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
    public @ResponseBody List<ScreenResolution> read() {
        return ChartDataRepository.WorldScreenResolution();
    }
}
