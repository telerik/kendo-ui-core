package com.kendoui.spring.controllers.radarcharts;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;

@Controller("dataviz-radar_chart-local_data-controller")
@RequestMapping(value="/dataviz/radar-charts/")
public class LocalDataController {
    @RequestMapping(value = "/local-data", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("proteinQuality", ChartDataRepository.ProteinQualityData());
     
        return "/dataviz/radar-charts/local-data";
    }
}
