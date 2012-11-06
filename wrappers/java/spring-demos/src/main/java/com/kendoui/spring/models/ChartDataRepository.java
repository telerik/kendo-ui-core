package com.kendoui.spring.models;

import java.util.ArrayList;

public class ChartDataRepository{
    @SuppressWarnings("serial")
    public ArrayList<PricePerformance> PricePerformanceData()
    {
        return new ArrayList<PricePerformance>() {{
            new PricePerformance() {{
                setFamily("Pentium");
                setModel("D 820");
                setPrice(105);
                setPerformance(100);
            }};
            new PricePerformance() {{
                setFamily("Pentium");
                setModel("D 915");
                setPrice(120);
                setPerformance(102);
            }};
            new PricePerformance() {{
                setFamily("Pentium");
                setModel("D 945");
                setPrice(160);
                setPerformance(118);
            }};
            new PricePerformance() {{
                setFamily("Pentium");
                setModel("XE 965");
                setPrice(1000);
                setPerformance(137);
            }};
            new PricePerformance() {{
                setFamily("Core 2 Duo");
                setModel("E6300");
                setPrice(185);
                setPerformance(134);
            }};
            new PricePerformance() {{
                setFamily("Core 2 Duo");
                setModel("E6400");
                setPrice(210);
                setPerformance(143);
            }};
            new PricePerformance() {{
                setFamily("Core 2 Duo");
                setModel("E6600");
                setPrice(305);
                setPerformance(163);
            }};
            new PricePerformance() {{
                setFamily("Core 2 Duo");
                setModel("E6700");
                setPrice(530);
                setPerformance(177);
            }};
            new PricePerformance() {{
                setFamily("Core 2 Extreme");
                setModel("X6800");
                setPrice(1000);
                setPerformance(190);
            }};
            new PricePerformance() {{
                setFamily("Athlon 64");
                setModel("X2 3800+");
                setPrice(148);
                setPerformance(115);
            }};
            new PricePerformance() {{
                setFamily("Athlon 64");
                setModel("X2 4200+");
                setPrice(170);
                setPerformance(125);
            }};
            new PricePerformance() {{
                setFamily("Athlon 64");
                setModel("X2 4600+");
                setPrice(205);
                setPerformance(138);
            }};
            new PricePerformance() {{
                setFamily("Athlon 64");
                setModel("X2 5000+");
                setPrice(290);
                setPerformance(143);
            }};
            new PricePerformance() {{
                setFamily("Athlon 64");
                setModel("FX-62");
                setPrice(800);
                setPerformance(147);
            }};
        }};
    }
    
    @SuppressWarnings("serial")
    public ArrayList<EngineDataPoint> EngineData()
    {
        return new ArrayList<EngineDataPoint>() {{
            new PricePerformance() {{
                
            }};
        }};
    }
}
