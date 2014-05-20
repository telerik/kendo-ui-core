package com.kendoui.spring.controllers.radarcharts;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;

@Controller("dataviz-radar_chart-local_data-controller")
@RequestMapping(value="/radar-charts/")
public class LocalDataBindingController {
    @RequestMapping(value = "/local-data-binding", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("proteinQuality", ChartDataRepository.ProteinQualityData());
     
        return "/radar-charts/local-data-binding";
    }
}
