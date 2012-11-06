package com.kendoui.spring.controllers.dataviz.areacharts;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.ChartDataRepository;
import com.kendoui.spring.models.ElectricityProduction;

@Controller("dataviz-area_chart-local_data-controller")
@RequestMapping(value="/dataviz/area-charts/")
public class LocalDataController {
    @RequestMapping(value = "/local-data", method = RequestMethod.GET)
    public String index() {
        return "/dataviz/area-charts/local-data";
    }
}
