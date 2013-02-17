package com.kendoui.spring.controllers.donut;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.DonutChartsRemoteDataViewModel;
import com.kendoui.spring.models.ChartDataRepository;
import com.kendoui.spring.models.ScreenResolution;

@Controller("dataviz-donut_charts_remote_data-controller")
@RequestMapping(value="/dataviz/donut-charts/")
public class RemoteDataController {
    private Map<Integer, String> resolutionColors = new HashMap<Integer, String>(){{
        put(1,"#ccc");
        put(2,"#c00");
    }};
    
    @RequestMapping(value = "/remote-data", method = RequestMethod.GET)
    public String index() {
        return "/dataviz/donut-charts/remote-data";
    }
    
    @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
    public @ResponseBody List<DonutChartsRemoteDataViewModel> read() {
        
        
        List<ScreenResolution> screenResolutions = ChartDataRepository.WorldScreenResolution();
        List<DonutChartsRemoteDataViewModel> viewModel =  new ArrayList<DonutChartsRemoteDataViewModel>();
        
        for (int i = 0; i < screenResolutions.size(); i++)
        {
            ScreenResolution data = screenResolutions.get(i);
            DonutChartsRemoteDataViewModel item = new DonutChartsRemoteDataViewModel(data);
            if (item.getYear() == "2005" && item.getResolution() == "1024x768")
            {
                item.setColor(resolutionColors.get(2));
            } else if (item.getResolution() == "Other") {
                item.setColor(resolutionColors.get(1));
            }

            viewModel.add(item);
        }
        return viewModel;
    }
}
