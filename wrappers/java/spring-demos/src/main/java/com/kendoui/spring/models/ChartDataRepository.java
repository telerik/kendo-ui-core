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
    
    public static List<InternetUsers> InternetUsers() {
        List<InternetUsers> result =  new ArrayList<InternetUsers>();
        result.add(new InternetUsers(2005, 67.96, "United States"));
        result.add(new InternetUsers(2006, 68.93, "United States"));
        result.add(new InternetUsers(2007, 75, "United States"));
        result.add(new InternetUsers(2008, 74, "United States"));
        result.add(new InternetUsers(2009, 78, "United States"));
        
        return result;
    }
    
    @SuppressWarnings("serial")
    public static List<StockDataPoint> StockData() {
        return new ArrayList<StockDataPoint>() {{
            add(new StockDataPoint() {{
                setDate("12/30/2011");
                setClose(405);
                setVolume(6414369);
                setOpen(403.51);
                setHigh(406.28);
                setLow(403.49);
                setSymbol("2. AAPL");
            }});
            add(new StockDataPoint() {{
                setDate("11/30/2011");
                setClose(382.2);
                setVolume(14464710);
                setOpen(381.29);
                setHigh(382.276);
                setLow(378.3);
                setSymbol("2. AAPL");
            }});
            add(new StockDataPoint() {{
                setDate("10/31/2011");
                setClose(404.78);
                setVolume(13762250);
                setOpen(402.42);
                setHigh(409.33);
                setLow(401.05);
                setSymbol("2. AAPL");
            }});
            add(new StockDataPoint() {{
                setDate("9/30/2011");
                setClose(381.32);
                setVolume(19553550);
                setOpen(387.12);
                setHigh(388.89);
                setLow(381.18);
                setSymbol("2. AAPL");
            }});
            add(new StockDataPoint() {{
                setDate("8/31/2011");
                setClose(384.83);
                setVolume(18643770);
                setOpen(390.57);
                setHigh(392.08);
                setLow(381.86);
                setSymbol("2. AAPL");
            }});
            add(new StockDataPoint() {{
                setDate("7/29/2011");
                setClose(390.48);
                setVolume(22550900);
                setOpen(387.64);
                setHigh(395.15);
                setLow(384);
                setSymbol("2. AAPL");
            }});
            add(new StockDataPoint() {{
                setDate("6/30/2011");
                setClose(335.67);
                setVolume(11526680);
                setOpen(334.7);
                setHigh(336.13);
                setLow(332.84);
                setSymbol("2. AAPL");
            }});
            add(new StockDataPoint() {{
                setDate("5/31/2011");
                setClose(347.83);
                setVolume(14869200);
                setOpen(341.1);
                setHigh(347.83);
                setLow(341);
                setSymbol("2. AAPL");
            }});
            add(new StockDataPoint() {{
                setDate("4/29/2011");
                setClose(350.13);
                setVolume(29776300);
                setOpen(346.78);
                setHigh(353.95);
                setLow(346.666);
                setSymbol("2. AAPL");
            }});
            add(new StockDataPoint() {{
                setDate("3/31/2011");
                setClose(348.5075);
                setVolume(9779020);
                setOpen(346.36);
                setHigh(349.8);
                setLow(346.06);
                setSymbol("2. AAPL");
            }});
            add(new StockDataPoint() {{
                setDate("2/28/2011");
                setClose(353.21);
                setVolume(14356740);
                setOpen(351.24);
                setHigh(355.05);
                setLow(351.12);
                setSymbol("2. AAPL");
            }});
            add(new StockDataPoint() {{
                setDate("1/31/2011");
                setClose(339.32);
                setVolume(13457510);
                setOpen(335.8);
                setHigh(340.04);
                setLow(334.3);
                setSymbol("2. AAPL");
            }});
            add(new StockDataPoint() {{
                setDate("12/30/2011");
                setClose(173.1);
                setVolume(4279069);
                setOpen(173.36);
                setHigh(175.17);
                setLow(172.49);
                setSymbol("3. AMZN");
            }});
            add(new StockDataPoint() {{
                setDate("11/30/2011");
                setClose(192.29);
                setVolume(7700490);
                setOpen(194.76);
                setHigh(195.3);
                setLow(188.75);
                setSymbol("3. AMZN");
            }});
            add(new StockDataPoint() {{
                setDate("10/31/2011");
                setClose(213.51);
                setVolume(7336799);
                setOpen(215.79);
                setHigh(218.89);
                setLow(213.04);
                setSymbol("3. AMZN");
            }});
            add(new StockDataPoint() {{
                setDate("9/30/2011");
                setClose(216.23);
                setVolume(6549641);
                setOpen(218.19);
                setHigh(223);
                setLow(215.21);
                setSymbol("3. AMZN");
            }});
            add(new StockDataPoint() {{
                setDate("8/31/2011");
                setClose(215.23);
                setVolume(7397287);
                setOpen(212.27);
                setHigh(216.17);
                setLow(211.35);
                setSymbol("3. AMZN");
            }});
            add(new StockDataPoint() {{
                setDate("7/29/2011");
                setClose(222.52);
                setVolume(5166268);
                setOpen(221.29);
                setHigh(225.75);
                setLow(219.51);
                setSymbol("3. AMZN");
            }});
            add(new StockDataPoint() {{
                setDate("6/30/2011");
                setClose(204.49);
                setVolume(4446007);
                setOpen(200.78);
                setHigh(205.2);
                setLow(200.5);
                setSymbol("3. AMZN");
            }});
            add(new StockDataPoint() {{
                setDate("5/31/2011");
                setClose(196.69);
                setVolume(3405698);
                setOpen(195.94);
                setHigh(198.44);
                setLow(195.03);
                setSymbol("3. AMZN");
            }});
            add(new StockDataPoint() {{
                setDate("4/29/2011");
                setClose(195.81);
                setVolume(5697726);
                setOpen(194.38);
                setHigh(196.59);
                setLow(193.78);
                setSymbol("3. AMZN");
            }});
            add(new StockDataPoint() {{
                setDate("3/31/2011");
                setClose(180.13);
                setVolume(4824628);
                setOpen(179.31);
                setHigh(181.57);
                setLow(178.5);
                setSymbol("3. AMZN");
            }});
            add(new StockDataPoint() {{
                setDate("2/28/2011");
                setClose(173.29);
                setVolume(6781774);
                setOpen(173.91);
                setHigh(175.89);
                setLow(172.15);
                setSymbol("3. AMZN");
            }});
            add(new StockDataPoint() {{
                setDate("1/31/2011");
                setClose(169.64);
                setVolume(6716002);
                setOpen(170.16);
                setHigh(171.44);
                setLow(167.41);
                setSymbol("3. AMZN");
            }});
            add(new StockDataPoint() {{
                setDate("12/30/2011");
                setClose(645.9);
                setVolume(1780941);
                setOpen(642.02);
                setHigh(646.76);
                setLow(642.02);
                setSymbol("1. GOOG");
            }});
            add(new StockDataPoint() {{
                setDate("11/30/2011");
                setClose(599.39);
                setVolume(3390173);
                setOpen(597.95);
                setHigh(599.51);
                setLow(592.09);
                setSymbol("1. GOOG");
            }});
            add(new StockDataPoint() {{
                setDate("10/31/2011");
                setClose(592.64);
                setVolume(2557538);
                setOpen(595.09);
                setHigh(599.69);
                setLow(591.67);
                setSymbol("1. GOOG");
            }});
            add(new StockDataPoint() {{
                setDate("9/30/2011");
                setClose(515.04);
                setVolume(2723353);
                setOpen(520.21);
                setHigh(524);
                setLow(514.38);
                setSymbol("1. GOOG");
            }});
            add(new StockDataPoint() {{
                setDate("8/31/2011");
                setClose(540.96);
                setVolume(2689989);
                setOpen(544.74);
                setHigh(546.3);
                setLow(536);
                setSymbol("1. GOOG");
            }});
            add(new StockDataPoint() {{
                setDate("7/29/2011");
                setClose(603.69);
                setVolume(4133695);
                setOpen(604.23);
                setHigh(614.96);
                setLow(603.69);
                setSymbol("1. GOOG");
            }});
            add(new StockDataPoint() {{
                setDate("6/30/2011");
                setClose(506.38);
                setVolume(2427330);
                setOpen(501.99);
                setHigh(506.67);
                setLow(501.5);
                setSymbol("1. GOOG");
            }});
            add(new StockDataPoint() {{
                setDate("5/31/2011");
                setClose(529.02);
                setVolume(2685830);
                setOpen(525);
                setHigh(529.05);
                setLow(523.5);
                setSymbol("1. GOOG");
            }});
            add(new StockDataPoint() {{
                setDate("4/29/2011");
                setClose(544.1);
                setVolume(3522997);
                setOpen(540);
                setHigh(544.1);
                setLow(538.51);
                setSymbol("1. GOOG");
            }});
            add(new StockDataPoint() {{
                setDate("3/31/2011");
                setClose(586.76);
                setVolume(2028228);
                setOpen(583);
                setHigh(588.1612);
                setLow(581.74);
                setSymbol("1. GOOG");
            }});
            add(new StockDataPoint() {{
                setDate("2/28/2011");
                setClose(613.4);
                setVolume(2281411);
                setOpen(610);
                setHigh(616.49);
                setLow(608.01);
                setSymbol("1. GOOG");
            }});
            add(new StockDataPoint() {{
                setDate("1/31/2011");
                setClose(600.36);
                setVolume(2804332);
                setOpen(603.6);
                setHigh(604.47);
                setLow(595.55);
                setSymbol("1. GOOG");
            }});
        }};
    }
    
    public static List<ElectricitySource> SpainElectricityBreakdown() {
        List<ElectricitySource> result =  new ArrayList<ElectricitySource>();
        result.add(new ElectricitySource("Hydro", 22, true));
        result.add(new ElectricitySource("Solar", 2, false));
        result.add(new ElectricitySource("Nuclear", 49, false));
        result.add(new ElectricitySource("Wind", 27, false));
        
        return result;
    }
    
    public static List<ScreenResolution> WorldScreenResolution() {
        List<ScreenResolution> result =  new ArrayList<ScreenResolution>();
        result.add(new ScreenResolution("2006", "Higher", 17, true, 1));
        result.add(new ScreenResolution("2006", "1024x768", 57, true, 2));
        result.add(new ScreenResolution("2006", "800x600", 20, true, 3));
        result.add(new ScreenResolution("2006", "640x480", 0, true, 4));
        result.add(new ScreenResolution("2006", "Unknown", 6, true, 5));
        result.add(new ScreenResolution("2008", "Higher", 38, false, 1));
        result.add(new ScreenResolution("2008", "1024x768", 48, false, 2));
        result.add(new ScreenResolution("2008", "800x600", 8, false, 3));
        result.add(new ScreenResolution("2008", "640x480", 0, false, 4));
        result.add(new ScreenResolution("2008", "Unknown", 6, false, 5));
        result.add(new ScreenResolution("2010", "Higher", 76, false, 1));
        result.add(new ScreenResolution("2010", "1024x768", 20, false, 2));
        result.add(new ScreenResolution("2010", "800x600", 3, false, 3));
        result.add(new ScreenResolution("2010", "640x480", 0, false, 4));
        result.add(new ScreenResolution("2010", "Unknown", 3, false, 5));
        
        return result;
    }
    
    public static List<JobGrowth> JobGrowthData() {
        List<JobGrowth> result =  new ArrayList<JobGrowth>();
        result.add(new JobGrowth(-2500, 50000, 500000, "Microsoft", 0));
        result.add(new JobGrowth(500, 110000, 7600000, "Starbucks", 0));
        result.add(new JobGrowth(7000, 19000, 700000, "Google", 0));
        result.add(new JobGrowth(1400, 150000, 700000, "Publix Super Markets", 0));
        result.add(new JobGrowth(2400, 30000, 300000, "PricewaterhouseCoopers", 0));
        result.add(new JobGrowth(2450, 34000, 90000, "Cisco", 0));
        result.add(new JobGrowth(2700, 34000, 400000, "Accenture", 0));
        result.add(new JobGrowth(2900, 40000,450000, "Deloitte", 0));
        result.add(new JobGrowth(3000, 55000, 900000, "Whole Foods Market", 0));
        
        return result;
    }
    
    public static List<JobGrowth> JobGrowthDataComparative() {
        List<JobGrowth> result =  new ArrayList<JobGrowth>();
        result.add(new JobGrowth(-2500, 50000, 500000, "Microsoft", 2011));
        result.add(new JobGrowth(500, 110000, 7600000, "Starbucks", 2011));
        result.add(new JobGrowth(7000, 19000, 700000, "Google", 2011));
        result.add(new JobGrowth(-2000, 60000, 900000, "Microsoft", 2012));
        result.add(new JobGrowth(4000, 130000, 8600000, "Starbucks", 2012));
        result.add(new JobGrowth(9000, 29000, 2200000, "Google", 2012));
        
        return result;
    }
    
    public static List<CrimeData> CrimeStats() {
        List<CrimeData> result = new ArrayList<CrimeData>();
        result.add(new CrimeData("Alabama", 8.2, 953.8, 4627851));
        result.add(new CrimeData("Alaska", 4.8, 622.5, 686293));
        result.add(new CrimeData("Arizona", 7.5, 948.4, 6500180));
        result.add(new CrimeData("Arkansas", 6.7, 1084.6, 2855390));
        result.add(new CrimeData("California", 6.9, 693.3, 36756666));
        result.add(new CrimeData("Colorado", 3.7, 744.8, 4861515));
        result.add(new CrimeData("Connecticut", 2.9, 437.1, 3501252));
        result.add(new CrimeData("Delaware", 4.4, 688.9, 873092));
        result.add(new CrimeData("Florida", 5, 926.3, 18328340));
        result.add(new CrimeData("Georgia", 6.2, 931, 9685744));
        result.add(new CrimeData("Hawaii", 1.9, 767.9, 1288198));
        result.add(new CrimeData("Idaho", 2.4, 564.4, 1523816));
        result.add(new CrimeData("Illinois", 6, 606.9, 12901563));
        result.add(new CrimeData("Indiana", 5.7, 697.6, 6376792));
        result.add(new CrimeData("Iowa", 1.3, 606.4, 3002555));
        result.add(new CrimeData("Kansas", 3.7, 689.2, 2802134));
        result.add(new CrimeData("Kentucky", 4.6, 634, 4269245));
        result.add(new CrimeData("Louisiana", 9.9, 870.6, 4410796));
        result.add(new CrimeData("Maine", 1.4, 478.5, 1316456));
        result.add(new CrimeData("Maryland", 9.9, 641.4, 5633597));
        result.add(new CrimeData("Massachusetts", 2.7, 541.1, 6497967));
        result.add(new CrimeData("Michigan", 6.1, 696.8, 10003422));
        result.add(new CrimeData("Minnesota", 2.2, 578.9, 5220393));
        result.add(new CrimeData("Mississippi", 7.3, 919.7, 2938618));
        result.add(new CrimeData("Missouri", 6.9, 738.3, 5911605));
        result.add(new CrimeData("Montana", 1.9, 389.2, 967440));
        result.add(new CrimeData("Nebraska", 2.5, 532.4, 1783432));
        result.add(new CrimeData("Nevada", 8.5, 972.4, 2600167));
        result.add(new CrimeData("New Hampshire", 1.4, 317, 1315809));
        result.add(new CrimeData("New Jersey", 4.8, 447.1, 8682661));
        result.add(new CrimeData("New Mexico", 7.4, 1093.9, 1984356));
        result.add(new CrimeData("New York", 4.5, 353.3, 19490297));
        result.add(new CrimeData("North Carolina", 6.7, 1201.1, 9222414));
        result.add(new CrimeData("North Dakota", 1.1, 311.9, 641481));
        result.add(new CrimeData("Ohio", 5.1, 872.8, 11485910));
        result.add(new CrimeData("Oklahoma", 5.3, 1006, 3642361));
        result.add(new CrimeData("Oregon", 2.2, 758.6, 3790060));
        result.add(new CrimeData("Pennsylvania", 6.1, 451.6, 12448279));
        result.add(new CrimeData("Rhode Island", 3.2, 494.2, 1050788));
        result.add(new CrimeData("South Carolina", 7.4, 1000.9, 4479800));
        result.add(new CrimeData("South Dakota", 2.3, 324.4, 804194));
        result.add(new CrimeData("Tennessee", 7.2, 1026.9, 6214888));
        result.add(new CrimeData("Texas", 6.2, 961.6, 24326974));
        result.add(new CrimeData("Utah", 2.3, 606.2, 2736424));
        result.add(new CrimeData("Vermont", 1.3, 491.8, 621270));
        result.add(new CrimeData("Virginia", 6.1, 392.1, 7769089));
        result.add(new CrimeData("Washington", 3.3, 959.7, 6549224));
        result.add(new CrimeData("West Virginia", 4.4, 621.2, 1814468));
        result.add(new CrimeData("Wisconsin", 3.5, 440.8, 5627967));
        result.add(new CrimeData("Wyoming", 2.7, 476.3, 532668));
        
        return result;
    }
}
