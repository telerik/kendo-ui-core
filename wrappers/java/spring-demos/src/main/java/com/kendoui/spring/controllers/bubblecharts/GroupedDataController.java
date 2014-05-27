package com.kendoui.spring.controllers.bubblecharts;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.BubbleChartsGroupedDataViewModel;
import com.kendoui.spring.models.ChartDataRepository;
import com.kendoui.spring.models.Medals;

@Controller("dataviz-bubble_charts-grouped_data-controller")
@RequestMapping(value="/bubble-charts/")
public class GroupedDataController {
    @RequestMapping(value = "/grouped-data", method = RequestMethod.GET)
    public String index() {
        return "/bubble-charts/grouped-data";
    }
    
    private Map<Integer, String> medalColors = new HashMap<Integer, String>(){{
        put(1,"#f3ac32");
        put(2,"#b8b8b8");
        put(3,"#bb6e36");
    }};
    
    @RequestMapping(value = "/grouped-data/read", method = RequestMethod.POST)
    public @ResponseBody List<BubbleChartsGroupedDataViewModel> read() {
        List<Medals> medals = ChartDataRepository.Medals();
        List<BubbleChartsGroupedDataViewModel> viewModel =  new ArrayList<BubbleChartsGroupedDataViewModel>();
        
        for (int i = 0; i < medals.size(); i++)
        {
            Medals data = medals.get(i);
            BubbleChartsGroupedDataViewModel item = new BubbleChartsGroupedDataViewModel(data);
            item.setColor(medalColors.get(item.getStanding()));
            viewModel.add(item);
        }
        
        return viewModel;
    }
}
