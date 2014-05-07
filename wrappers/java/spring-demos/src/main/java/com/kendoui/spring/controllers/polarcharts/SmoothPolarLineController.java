package com.kendoui.spring.controllers.polarcharts;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;

@Controller("dataviz-polar_chart-smooth_polar_line-controller")
@RequestMapping(value="/polar-charts/")
public class SmoothPolarLineController {
    @RequestMapping(value = "/smooth-polar-line", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("sunPosition", ChartDataRepository.SunPositionData());
     
        return "/polar-charts/smooth-polar-line";
    }
}
