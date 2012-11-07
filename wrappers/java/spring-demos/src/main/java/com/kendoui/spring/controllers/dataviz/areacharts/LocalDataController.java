package com.kendoui.spring.controllers.dataviz.areacharts;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;

@Controller("dataviz-area_chart-local_data-controller")
@RequestMapping(value="/dataviz/area-charts/")
public class LocalDataController {
    @RequestMapping(value = "/local-data", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("internetUsers", ChartDataRepository.InternetUsers());
     
        return "/dataviz/area-charts/local-data";
    }
}
