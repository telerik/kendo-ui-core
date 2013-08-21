package com.kendoui.spring.controllers.steplinecharts;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;

@Controller("dataviz-step_line_chart-notes-controller")
@RequestMapping(value="/dataviz/step-line-charts/")
public class NotesController {
    @RequestMapping(value = "/notes", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("grandSlam", ChartDataRepository.GrandSlam());
     
        return "/dataviz/step-line-charts/notes";
    }
}
