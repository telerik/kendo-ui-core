package com.kendoui.spring.models;

import java.util.ArrayList;
import java.util.List;

public class ChartDataRepository {
    @SuppressWarnings("serial")
    public static List<PricePerformance> PricePerformanceData() {
        return new ArrayList<PricePerformance>() {{
            add(new PricePerformance() {{
                setFamily("Pentium");
                setModel("D 820");
                setPrice(105);
                setPerformance(100);
            }});
            add(new PricePerformance() {{
                setFamily("Pentium");
                setModel("D 915");
                setPrice(120);
                setPerformance(102);
            }});
            add(new PricePerformance() {{
                setFamily("Pentium");
                setModel("D 945");
                setPrice(160);
                setPerformance(118);
            }});
            add(new PricePerformance() {{
                setFamily("Pentium");
                setModel("XE 965");
                setPrice(1000);
                setPerformance(137);
            }});
            add(new PricePerformance() {{
                setFamily("Core 2 Duo");
                setModel("E6300");
                setPrice(185);
                setPerformance(134);
            }});
            add(new PricePerformance() {{
                setFamily("Core 2 Duo");
                setModel("E6400");
                setPrice(210);
                setPerformance(143);
            }});
            add(new PricePerformance() {{
                setFamily("Core 2 Duo");
                setModel("E6600");
                setPrice(305);
                setPerformance(163);
            }});
            add(new PricePerformance() {{
                setFamily("Core 2 Duo");
                setModel("E6700");
                setPrice(530);
                setPerformance(177);
            }});
            add(new PricePerformance() {{
                setFamily("Core 2 Extreme");
                setModel("X6800");
                setPrice(1000);
                setPerformance(190);
            }});
            add(new PricePerformance() {{
                setFamily("Athlon 64");
                setModel("X2 3800+");
                setPrice(148);
                setPerformance(115);
            }});
            add(new PricePerformance() {{
                setFamily("Athlon 64");
                setModel("X2 4200+");
                setPrice(170);
                setPerformance(125);
            }});
            add(new PricePerformance() {{
                setFamily("Athlon 64");
                setModel("X2 4600+");
                setPrice(205);
                setPerformance(138);
            }});
            add(new PricePerformance() {{
                setFamily("Athlon 64");
                setModel("X2 5000+");
                setPrice(290);
                setPerformance(143);
            }});
            add(new PricePerformance() {{
                setFamily("Athlon 64");
                setModel("FX-62");
                setPrice(800);
                setPerformance(147);
            }});
        }};
    }
    
    @SuppressWarnings("serial")
    public static List<ElectricityProduction> SpainElectricityProduction() {
        return new ArrayList<ElectricityProduction>() {{
            add(new ElectricityProduction() {{
                setCountry("Spain");
                setYear("2008");
                setUnit("GWh");
                setSolar(2578);
                setHydro(26112);
                setWind(32203);
                setNuclear(58973);
            }});
            add(new ElectricityProduction() {{
                setCountry("Spain");
                setYear("2007");
                setUnit("GWh");
                setSolar(508);
                setHydro(30522);
                setWind(27568);
                setNuclear(55103);
            }});
            add(new ElectricityProduction() {{
                setCountry("Spain");
                setYear("2006");
                setUnit("GWh");
                setSolar(119);
                setHydro(29831);
                setWind(23297);
                setNuclear(60126);
            }});
            add(new ElectricityProduction() {{
                setCountry("Spain");
                setYear("2005");
                setUnit("GWh");
                setSolar(41);
                setHydro(23025);
                setWind(21176);
                setNuclear(57539);
            }});
            add(new ElectricityProduction() {{
                setCountry("Spain");
                setYear("2004");
                setUnit("GWh");
                setSolar(56);
                setHydro(34439);
                setWind(15700);
                setNuclear(63606);
            }});
            add(new ElectricityProduction() {{
                setCountry("Spain");
                setYear("2003");
                setUnit("GWh");
                setSolar(41);
                setHydro(43897);
                setWind(12075);
                setNuclear(61875);
            }});
            add(new ElectricityProduction() {{
                setCountry("Spain");
                setYear("2002");
                setUnit("GWh");
                setSolar(30);
                setHydro(26270);
                setWind(9342);
                setNuclear(63016);
            }});
            add(new ElectricityProduction() {{
                setCountry("Spain");
                setYear("2001");
                setUnit("GWh");
                setSolar(24);
                setHydro(43864);
                setWind(6759);
                setNuclear(63708);
            }});
            add(new ElectricityProduction() {{
                setCountry("Spain");
                setYear("2000");
                setUnit("GWh");
                setSolar(18);
                setHydro(31807);
                setWind(4727);
                setNuclear(62206);
            }});
        }};
    }
}
