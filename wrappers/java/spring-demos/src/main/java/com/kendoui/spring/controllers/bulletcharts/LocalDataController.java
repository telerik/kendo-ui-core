package com.kendoui.spring.controllers.bulletcharts;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;

@Controller("dataviz-bullet_chart-local_data-controller")
@RequestMapping(value="/dataviz/bullet-charts/")
public class LocalDataController {
    @RequestMapping(value = "/local-data", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("mmhgData", ChartDataRepository.mmhgData());
        model.addAttribute("hPaData", ChartDataRepository.hPaData());
     
        return "/dataviz/bullet-charts/local-data";
    }
}
