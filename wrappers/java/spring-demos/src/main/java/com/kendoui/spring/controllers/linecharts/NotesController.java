package com.kendoui.spring.controllers.linecharts;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ChartDataRepository;

@Controller("dataviz-line_chart-notes-controller")
@RequestMapping(value="/line-charts/")
public class NotesController {
    @RequestMapping(value = "/notes", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("grandSlam", ChartDataRepository.GrandSlam());
     
        return "/line-charts/notes";
    }
}
