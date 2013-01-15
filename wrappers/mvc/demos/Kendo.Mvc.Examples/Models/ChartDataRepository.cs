using System.Collections.Generic;
using System;

namespace Kendo.Mvc.Examples.Models
{
    public class ChartDataRepository
    {
        public static IList<PricePerformance> PricePerformanceData()
        {
            return new List<PricePerformance>
            {
                new PricePerformance {
                    Family = "Pentium",
                    Model = "D 820",
                    Price = 105,
                    Performance = 100
                },
                
                new PricePerformance {
                    Family = "Pentium",
                    Model = "D 915",
                    Price = 120,
                    Performance = 102
                }, 
                
                new PricePerformance {
                    Family = "Pentium",
                    Model = "D 945",
                    Price = 160,
                    Performance = 118
                }, 
                
                new PricePerformance {
                    Family = "Pentium",
                    Model = "XE 965",
                    Price = 1000,
                    Performance = 137
                }, 
                
                new PricePerformance {
                    Family = "Core 2 Duo",
                    Model = "E6300",
                    Price = 185,
                    Performance = 134
                }, 
                
                new PricePerformance {
                    Family = "Core 2 Duo",
                    Model = "E6400",
                    Price = 210,
                    Performance = 143
                }, 
                
                new PricePerformance {
                    Family = "Core 2 Duo",
                    Model = "E6600",
                    Price = 305,
                    Performance = 163
                }, 
                
                new PricePerformance {
                    Family = "Core 2 Duo",
                    Model = "E6700",
                    Price = 530,
                    Performance = 177
                }, 
                
                new PricePerformance {
                    Family = "Core 2 Extreme",
                    Model = "X6800",
                    Price = 1000,
                    Performance = 190
                }, 
                
                new PricePerformance {
                    Family = "Athlon 64",
                    Model = "X2 3800+",
                    Price = 148,
                    Performance = 115
                }, 
            
                new PricePerformance {
                    Family = "Athlon 64",
                    Model = "X2 4200+",
                    Price = 170,
                    Performance = 125
                }, 
                
                new PricePerformance {
                    Family = "Athlon 64",
                    Model = "X2 4600+",
                    Price = 205,
                    Performance = 138
                }, 
                
                new PricePerformance {
                    Family = "Athlon 64",
                    Model = "X2 5000+",
                    Price = 290,
                    Performance = 143
                }, 
                
                new PricePerformance {
                    Family = "Athlon 64",
                    Model = "FX-62",
                    Price = 800,
                    Performance = 147
                }
            };
        }

        public static IList<EngineDataPoint> EngineData()
        {
            return new EngineDataPoint[]
            {
                new EngineDataPoint(1000, 50,  10),
                new EngineDataPoint(1500, 65,  19),
                new EngineDataPoint(2000, 80,  30),
                new EngineDataPoint(2500, 92,  44),
                new EngineDataPoint(3000, 104, 59),
                new EngineDataPoint(3500, 114, 76),
                new EngineDataPoint(4000, 120, 91),
                new EngineDataPoint(4500, 125, 107),
                new EngineDataPoint(5000, 130, 124),
                new EngineDataPoint(5500, 133, 139),
                new EngineDataPoint(6000, 130, 149),
                new EngineDataPoint(6500, 122, 151),
                new EngineDataPoint(7000, 110, 147)
            };
        }

        public static IList<InternetUsers> InternetUsers()
        {
            return new InternetUsers[] {
                new InternetUsers(2005, "United States", 67.96),
                new InternetUsers(2006, "United States", 68.93),
                new InternetUsers(2007, "United States", 75),
                new InternetUsers(2008, "United States", 74),
                new InternetUsers(2009, "United States", 78)
            };
        }

        public static IEnumerable<ElectricityProduction> SpainElectricityProduction()
        {
            return new ElectricityProduction[] {
                new ElectricityProduction("2000", 18, 31807, 4727, 62206),
                new ElectricityProduction("2001", 24, 43864, 6759, 63708),
                new ElectricityProduction("2002", 30, 26270, 9342, 63016),
                new ElectricityProduction("2003", 41, 43897, 12075, 61875),
                new ElectricityProduction("2004", 56, 34439, 15700, 63606),
                new ElectricityProduction("2005", 41, 23025, 21176, 57539),
                new ElectricityProduction("2006", 119, 29831, 23297, 60126),
                new ElectricityProduction("2007", 508, 30522, 27568, 55103),
                new ElectricityProduction("2008", 2578, 26112, 32203, 58973)
            };
        }

        public static IEnumerable<ScreenResolution> WorldScreenResolution()
        {
            return new ScreenResolution[] {
                new ScreenResolution() { Year = "2006", Resolution = "Higher", Share = 17, VisibleInLegend = true, OrderNumber = 1 },
                new ScreenResolution() { Year = "2006", Resolution = "1024x768", Share = 57, VisibleInLegend = true, OrderNumber = 2 },
                new ScreenResolution() { Year = "2006", Resolution = "800x600", Share = 20, VisibleInLegend = true, OrderNumber = 3 },
                new ScreenResolution() { Year = "2006", Resolution = "640x480", Share = 0, VisibleInLegend = true, OrderNumber = 4 },
                new ScreenResolution() { Year = "2006", Resolution = "Unknown", Share = 6, VisibleInLegend = true, OrderNumber = 5 },
                new ScreenResolution() { Year = "2008", Resolution = "Higher", Share = 38, VisibleInLegend = false, OrderNumber = 1 },
                new ScreenResolution() { Year = "2008", Resolution = "1024x768", Share = 48, VisibleInLegend = false, OrderNumber = 2 },
                new ScreenResolution() { Year = "2008", Resolution = "800x600", Share = 8, VisibleInLegend = false, OrderNumber = 3 },
                new ScreenResolution() { Year = "2008", Resolution = "640x480", Share = 0, VisibleInLegend = false, OrderNumber = 4 },
                new ScreenResolution() { Year = "2008", Resolution = "Unknown", Share = 6, VisibleInLegend = false, OrderNumber = 5 },
                new ScreenResolution() { Year = "2010", Resolution = "Higher", Share = 76, VisibleInLegend = false, OrderNumber = 1 },
                new ScreenResolution() { Year = "2010", Resolution = "1024x768", Share = 20, VisibleInLegend = false, OrderNumber = 2 },
                new ScreenResolution() { Year = "2010", Resolution = "800x600", Share = 3, VisibleInLegend = false, OrderNumber = 3 },
                new ScreenResolution() { Year = "2010", Resolution = "640x480", Share = 0, VisibleInLegend = false, OrderNumber = 4 },
                new ScreenResolution() { Year = "2010", Resolution = "Unknown", Share = 3, VisibleInLegend = false, OrderNumber = 5 }
            };
        }

        public static IEnumerable<ElectricitySource> SpainElectricityBreakdown()
        {
            return new ElectricitySource[] {
                new ElectricitySource("Hydro", 22) { Explode = true },
                new ElectricitySource("Solar", 2),
                new ElectricitySource("Nuclear", 49),
                new ElectricitySource("Wind", 27)
            };
        }

        public static IEnumerable<StockDataPoint> StockData()
        {
            return new StockDataPoint[]
            {
                new StockDataPoint {
                    Date = DateTime.Parse("2011/12/30"),
                    Close = 405m,
                    Volume = 6414369,
                    Open = 403.51m,
                    High = 406.28m,
                    Low = 403.49m,
                    Symbol = "2. AAPL"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/11/30"),
                    Close = 382.2m,
                    Volume = 14464710,
                    Open = 381.29m,
                    High = 382.276m,
                    Low = 378.3m,
                    Symbol = "2. AAPL"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/10/31"),
                    Close = 404.78m,
                    Volume = 13762250,
                    Open = 402.42m,
                    High = 409.33m,
                    Low = 401.05m,
                    Symbol = "2. AAPL"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/9/30"),
                    Close = 381.32m,
                    Volume = 19553550,
                    Open = 387.12m,
                    High = 388.89m,
                    Low = 381.18m,
                    Symbol = "2. AAPL"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/8/31"),
                    Close = 384.83m,
                    Volume = 18643770,
                    Open = 390.57m,
                    High = 392.08m,
                    Low = 381.86m,
                    Symbol = "2. AAPL"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/7/29"),
                    Close = 390.48m,
                    Volume = 22550900,
                    Open = 387.64m,
                    High = 395.15m,
                    Low = 384m,
                    Symbol = "2. AAPL"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/6/30"),
                    Close = 335.67m,
                    Volume = 11526680,
                    Open = 334.7m,
                    High = 336.13m,
                    Low = 332.84m,
                    Symbol = "2. AAPL"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/5/31"),
                    Close = 347.83m,
                    Volume = 14869200,
                    Open = 341.1m,
                    High = 347.83m,
                    Low = 341m,
                    Symbol = "2. AAPL"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/4/29"),
                    Close = 350.13m,
                    Volume = 29776300,
                    Open = 346.78m,
                    High = 353.95m,
                    Low = 346.666m,
                    Symbol = "2. AAPL"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/3/31"),
                    Close = 348.5075m,
                    Volume = 9779020,
                    Open = 346.36m,
                    High = 349.8m,
                    Low = 346.06m,
                    Symbol = "2. AAPL"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/2/28"),
                    Close = 353.21m,
                    Volume = 14356740,
                    Open = 351.24m,
                    High = 355.05m,
                    Low = 351.12m,
                    Symbol = "2. AAPL"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/1/31"),
                    Close = 339.32m,
                    Volume = 13457510,
                    Open = 335.8m,
                    High = 340.04m,
                    Low = 334.3m,
                    Symbol = "2. AAPL"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/12/30"),
                    Close = 173.1m,
                    Volume = 4279069,
                    Open = 173.36m,
                    High = 175.17m,
                    Low = 172.49m,
                    Symbol = "3. AMZN"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/11/30"),
                    Close = 192.29m,
                    Volume = 7700490,
                    Open = 194.76m,
                    High = 195.3m,
                    Low = 188.75m,
                    Symbol = "3. AMZN"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/10/31"),
                    Close = 213.51m,
                    Volume = 7336799,
                    Open = 215.79m,
                    High = 218.89m,
                    Low = 213.04m,
                    Symbol = "3. AMZN"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/9/30"),
                    Close = 216.23m,
                    Volume = 6549641,
                    Open = 218.19m,
                    High = 223m,
                    Low = 215.21m,
                    Symbol = "3. AMZN"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/8/31"),
                    Close = 215.23m,
                    Volume = 7397287,
                    Open = 212.27m,
                    High = 216.17m,
                    Low = 211.35m,
                    Symbol = "3. AMZN"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/7/29"),
                    Close = 222.52m,
                    Volume = 5166268,
                    Open = 221.29m,
                    High = 225.75m,
                    Low = 219.51m,
                    Symbol = "3. AMZN"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/6/30"),
                    Close = 204.49m,
                    Volume = 4446007,
                    Open = 200.78m,
                    High = 205.2m,
                    Low = 200.5m,
                    Symbol = "3. AMZN"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/5/31"),
                    Close = 196.69m,
                    Volume = 3405698,
                    Open = 195.94m,
                    High = 198.44m,
                    Low = 195.03m,
                    Symbol = "3. AMZN"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/4/29"),
                    Close = 195.81m,
                    Volume = 5697726,
                    Open = 194.38m,
                    High = 196.59m,
                    Low = 193.78m,
                    Symbol = "3. AMZN"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/3/31"),
                    Close = 180.13m,
                    Volume = 4824628,
                    Open = 179.31m,
                    High = 181.57m,
                    Low = 178.5m,
                    Symbol = "3. AMZN"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/2/28"),
                    Close = 173.29m,
                    Volume = 6781774,
                    Open = 173.91m,
                    High = 175.89m,
                    Low = 172.15m,
                    Symbol = "3. AMZN"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/1/31"),
                    Close = 169.64m,
                    Volume = 6716002,
                    Open = 170.16m,
                    High = 171.44m,
                    Low = 167.41m,
                    Symbol = "3. AMZN"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/12/30"),
                    Close = 645.9m,
                    Volume = 1780941,
                    Open = 642.02m,
                    High = 646.76m,
                    Low = 642.02m,
                    Symbol = "1. GOOG"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/11/30"),
                    Close = 599.39m,
                    Volume = 3390173,
                    Open = 597.95m,
                    High = 599.51m,
                    Low = 592.09m,
                    Symbol = "1. GOOG"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/10/31"),
                    Close = 592.64m,
                    Volume = 2557538,
                    Open = 595.09m,
                    High = 599.69m,
                    Low = 591.67m,
                    Symbol = "1. GOOG"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/9/30"),
                    Close = 515.04m,
                    Volume = 2723353,
                    Open = 520.21m,
                    High = 524m,
                    Low = 514.38m,
                    Symbol = "1. GOOG"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/8/31"),
                    Close = 540.96m,
                    Volume = 2689989,
                    Open = 544.74m,
                    High = 546.3m,
                    Low = 536m,
                    Symbol = "1. GOOG"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/7/29"),
                    Close = 603.69m,
                    Volume = 4133695,
                    Open = 604.23m,
                    High = 614.96m,
                    Low = 603.69m,
                    Symbol = "1. GOOG"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/6/30"),
                    Close = 506.38m,
                    Volume = 2427330,
                    Open = 501.99m,
                    High = 506.67m,
                    Low = 501.5m,
                    Symbol = "1. GOOG"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/5/31"),
                    Close = 529.02m,
                    Volume = 2685830,
                    Open = 525m,
                    High = 529.05m,
                    Low = 523.5m,
                    Symbol = "1. GOOG"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/4/29"),
                    Close = 544.1m,
                    Volume = 3522997,
                    Open = 540m,
                    High = 544.1m,
                    Low = 538.51m,
                    Symbol = "1. GOOG"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/3/31"),
                    Close = 586.76m,
                    Volume = 2028228,
                    Open = 583m,
                    High = 588.1612m,
                    Low = 581.74m,
                    Symbol = "1. GOOG"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/2/28"),
                    Close = 613.4m,
                    Volume = 2281411,
                    Open = 610m,
                    High = 616.49m,
                    Low = 608.01m,
                    Symbol = "1. GOOG"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/1/31"),
                    Close = 600.36m,
                    Volume = 2804332,
                    Open = 603.6m,
                    High = 604.47m,
                    Low = 595.55m,
                    Symbol = "1. GOOG"
                }
            };
        }

        public static IList<JobGrowth> JobGrowthData()
        {
            return new JobGrowth[] {
                new JobGrowth {
                    Growth = -2500,
                    Jobs = 50000,
                    Applications = 500000,
                    Company = "Microsoft"
                }, new JobGrowth {
                    Growth = 500,
                    Jobs = 110000,
                    Applications = 7600000,
                    Company = "Starbucks"
                }, new JobGrowth {
                    Growth = 7000,
                    Jobs = 19000,
                    Applications = 700000,
                    Company = "Google"
                }, new JobGrowth {
                    Growth = 1400,
                    Jobs = 150000,
                    Applications = 700000,
                    Company = "Publix Super Markets"
                }, new JobGrowth {
                    Growth = 2400,
                    Jobs = 30000,
                    Applications = 300000,
                    Company = "PricewaterhouseCoopers"
                }, new JobGrowth {
                    Growth = 2450,
                    Jobs = 34000,
                    Applications = 90000,
                    Company = "Cisco"
                }, new JobGrowth {
                    Growth = 2700,
                    Jobs = 34000,
                    Applications = 400000,
                    Company = "Accenture"
                }, new JobGrowth {
                    Growth = 2900,
                    Jobs = 40000,
                    Applications = 450000,
                    Company = "Deloitte"
                }, new JobGrowth {
                    Growth = 3000,
                    Jobs = 55000,
                    Applications = 900000,
                    Company = "Whole Foods Market"
                }
            };
        }

        public static IList<JobGrowth> JobGrowthDataComparative()
        {
            return new JobGrowth[] {
                new JobGrowth {
                    Growth = -2500,
                    Jobs = 50000,
                    Applications = 500000,
                    Company = "Microsoft",
                    Year = 2011
                }, new JobGrowth {
                    Growth = 500,
                    Jobs = 110000,
                    Applications = 7600000,
                    Company = "Starbucks",
                    Year = 2011
                }, new JobGrowth {
                    Growth = 7000,
                    Jobs = 19000,
                    Applications = 700000,
                    Company = "Google",
                    Year = 2011
                }, 
                new JobGrowth {
                    Growth = -2000,
                    Jobs = 60000,
                    Applications = 900000,
                    Company = "Microsoft",
                    Year = 2012
                }, new JobGrowth {
                    Growth = 4000,
                    Jobs = 130000,
                    Applications = 8600000,
                    Company = "Starbucks",
                    Year = 2012
                }, new JobGrowth {
                    Growth = 9000,
                    Jobs = 29000,
                    Applications = 2200000,
                    Company = "Google",
                    Year = 2012
                }
            };
        }

        public static IList<CrimeData> CrimeStats()
        {
            return new CrimeData[] {
                new CrimeData {
                    State = "Alabama",
                    Murder = 8.2,
                    Burglary = 953.8,
                    Population = 4627851
                },
                new CrimeData {
                    State = "Alaska",
                    Murder = 4.8,
                    Burglary = 622.5,
                    Population = 686293
                },
                new CrimeData {
                    State = "Arizona",
                    Murder = 7.5,
                    Burglary = 948.4,
                    Population = 6500180
                },
                new CrimeData {
                    State = "Arkansas",
                    Murder = 6.7,
                    Burglary = 1084.6,
                    Population = 2855390
                },
                new CrimeData {
                    State = "California",
                    Murder = 6.9,
                    Burglary = 693.3,
                    Population = 36756666
                },
                new CrimeData {
                    State = "Colorado",
                    Murder = 3.7,
                    Burglary = 744.8,
                    Population = 4861515
                },
                new CrimeData {
                    State = "Connecticut",
                    Murder = 2.9,
                    Burglary = 437.1,
                    Population = 3501252
                },
                new CrimeData {
                    State = "Delaware",
                    Murder = 4.4,
                    Burglary = 688.9,
                    Population = 873092
                },
                new CrimeData {
                    State = "Florida",
                    Murder = 5,
                    Burglary = 926.3,
                    Population = 18328340
                },
                new CrimeData {
                    State = "Georgia",
                    Murder = 6.2,
                    Burglary = 931,
                    Population = 9685744
                },
                new CrimeData {
                    State = "Hawaii",
                    Murder = 1.9,
                    Burglary = 767.9,
                    Population = 1288198
                },
                new CrimeData {
                    State = "Idaho",
                    Murder = 2.4,
                    Burglary = 564.4,
                    Population = 1523816
                },
                new CrimeData {
                    State = "Illinois",
                    Murder = 6,
                    Burglary = 606.9,
                    Population = 12901563
                },
                new CrimeData {
                    State = "Indiana",
                    Murder = 5.7,
                    Burglary = 697.6,
                    Population = 6376792
                },
                new CrimeData {
                    State = "Iowa",
                    Murder = 1.3,
                    Burglary = 606.4,
                    Population = 3002555
                },
                new CrimeData {
                    State = "Kansas",
                    Murder = 3.7,
                    Burglary = 689.2,
                    Population = 2802134
                },
                new CrimeData {
                    State = "Kentucky",
                    Murder = 4.6,
                    Burglary = 634,
                    Population = 4269245
                },
                new CrimeData {
                    State = "Louisiana",
                    Murder = 9.9,
                    Burglary = 870.6,
                    Population = 4410796
                },
                new CrimeData {
                    State = "Maine",
                    Murder = 1.4,
                    Burglary = 478.5,
                    Population = 1316456
                },
                new CrimeData {
                    State = "Maryland",
                    Murder = 9.9,
                    Burglary = 641.4,
                    Population = 5633597
                },
                new CrimeData {
                    State = "Massachusetts",
                    Murder = 2.7,
                    Burglary = 541.1,
                    Population = 6497967
                },
                new CrimeData {
                    State = "Michigan",
                    Murder = 6.1,
                    Burglary = 696.8,
                    Population = 10003422
                },
                new CrimeData {
                    State = "Minnesota",
                    Murder = 2.2,
                    Burglary = 578.9,
                    Population = 5220393
                },
                new CrimeData {
                    State = "Mississippi",
                    Murder = 7.3,
                    Burglary = 919.7,
                    Population = 2938618
                },
                new CrimeData {
                    State = "Missouri",
                    Murder = 6.9,
                    Burglary = 738.3,
                    Population = 5911605
                },
                new CrimeData {
                    State = "Montana",
                    Murder = 1.9,
                    Burglary = 389.2,
                    Population = 967440
                },
                new CrimeData {
                    State = "Nebraska",
                    Murder = 2.5,
                    Burglary = 532.4,
                    Population = 1783432
                },
                new CrimeData {
                    State = "Nevada",
                    Murder = 8.5,
                    Burglary = 972.4,
                    Population = 2600167
                },
                new CrimeData {
                    State = "New Hampshire",
                    Murder = 1.4,
                    Burglary = 317,
                    Population = 1315809
                },
                new CrimeData {
                    State = "New Jersey",
                    Murder = 4.8,
                    Burglary = 447.1,
                    Population = 8682661
                },
                new CrimeData {
                    State = "New Mexico",
                    Murder = 7.4,
                    Burglary = 1093.9,
                    Population = 1984356
                },
                new CrimeData {
                    State = "New York",
                    Murder = 4.5,
                    Burglary = 353.3,
                    Population = 19490297
                },
                new CrimeData {
                    State = "North Carolina",
                    Murder = 6.7,
                    Burglary = 1201.1,
                    Population = 9222414
                },
                new CrimeData {
                    State = "North Dakota",
                    Murder = 1.1,
                    Burglary = 311.9,
                    Population = 641481
                },
                new CrimeData {
                    State = "Ohio",
                    Murder = 5.1,
                    Burglary = 872.8,
                    Population = 11485910
                },
                new CrimeData {
                    State = "Oklahoma",
                    Murder = 5.3,
                    Burglary = 1006,
                    Population = 3642361
                },
                new CrimeData {
                    State = "Oregon",
                    Murder = 2.2,
                    Burglary = 758.6,
                    Population = 3790060
                },
                new CrimeData {
                    State = "Pennsylvania",
                    Murder = 6.1,
                    Burglary = 451.6,
                    Population = 12448279
                },
                new CrimeData {
                    State = "Rhode Island",
                    Murder = 3.2,
                    Burglary = 494.2,
                    Population = 1050788
                },
                new CrimeData {
                    State = "South Carolina",
                    Murder = 7.4,
                    Burglary = 1000.9,
                    Population = 4479800
                },
                new CrimeData {
                    State = "South Dakota",
                    Murder = 2.3,
                    Burglary = 324.4,
                    Population = 804194
                },
                new CrimeData {
                    State = "Tennessee",
                    Murder = 7.2,
                    Burglary = 1026.9,
                    Population = 6214888
                },
                new CrimeData {
                    State = "Texas",
                    Murder = 6.2,
                    Burglary = 961.6,
                    Population = 24326974
                },
                new CrimeData {
                    State = "Utah",
                    Murder = 2.3,
                    Burglary = 606.2,
                    Population = 2736424
                },
                new CrimeData {
                    State = "Vermont",
                    Murder = 1.3,
                    Burglary = 491.8,
                    Population = 621270
                },
                new CrimeData {
                    State = "Virginia",
                    Murder = 6.1,
                    Burglary = 392.1,
                    Population = 7769089
                },
                new CrimeData {
                    State = "Washington",
                    Murder = 3.3,
                    Burglary = 959.7,
                    Population = 6549224
                },
                new CrimeData {
                    State = "West Virginia",
                    Murder = 4.4,
                    Burglary = 621.2,
                    Population = 1814468
                },
                new CrimeData {
                    State = "Wisconsin",
                    Murder = 3.5,
                    Burglary = 440.8,
                    Population = 5627967
                },
                new CrimeData {
                    State = "Wyoming",
                    Murder = 2.7,
                    Burglary = 476.3,
                    Population = 532668
                }
            };
        }

        public static IEnumerable<StockDataPoint> BoeingStockData()
        {
            return new StockDataPoint[]
            {
                    new StockDataPoint {
        Date = DateTime.Parse("2000/01/03"),
        Open = 41.62m,
        High = 41.69m,
        Low = 39.81m,
        Close = 40.12m,
        Volume = 2632000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/04"),
        Open = 39.88m,
        High = 41.12m,
        Low = 39.75m,
        Close = 40.12m,
        Volume = 3584700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/05"),
        Open = 42m,
        High = 43.31m,
        Low = 41.38m,
        Close = 42.62m,
        Volume = 7631700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/06"),
        Open = 42.25m,
        High = 43.44m,
        Low = 41.12m,
        Close = 43.06m,
        Volume = 4922200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/07"),
        Open = 43.88m,
        High = 44.88m,
        Low = 43.69m,
        Close = 44.12m,
        Volume = 6008300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/10"),
        Open = 44.31m,
        High = 44.5m,
        Low = 43.5m,
        Close = 43.69m,
        Volume = 2400000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/11"),
        Open = 43.38m,
        High = 43.94m,
        Low = 42.75m,
        Close = 42.88m,
        Volume = 2450200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/12"),
        Open = 42.75m,
        High = 44.19m,
        Low = 42.5m,
        Close = 43.06m,
        Volume = 2326900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/13"),
        Open = 43.31m,
        High = 43.38m,
        Low = 42m,
        Close = 42.38m,
        Volume = 3030100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/14"),
        Open = 43.62m,
        High = 44.25m,
        Low = 42.94m,
        Close = 44m,
        Volume = 3834900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/18"),
        Open = 43.88m,
        High = 45m,
        Low = 43.12m,
        Close = 45m,
        Volume = 5859100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/19"),
        Open = 45.38m,
        High = 48.12m,
        Low = 45.25m,
        Close = 47.62m,
        Volume = 11457600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/20"),
        Open = 47.56m,
        High = 47.88m,
        Low = 45.75m,
        Close = 46.5m,
        Volume = 8931100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/21"),
        Open = 46.94m,
        High = 46.94m,
        Low = 45m,
        Close = 45.69m,
        Volume = 4390000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/24"),
        Open = 45.81m,
        High = 46.19m,
        Low = 43.62m,
        Close = 44.31m,
        Volume = 3296200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/25"),
        Open = 45m,
        High = 46m,
        Low = 44.75m,
        Close = 45.69m,
        Volume = 5052200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/26"),
        Open = 45.69m,
        High = 46.5m,
        Low = 45m,
        Close = 46.19m,
        Volume = 3090100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/27"),
        Open = 46m,
        High = 46.88m,
        Low = 44.88m,
        Close = 45.06m,
        Volume = 3329100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/28"),
        Open = 44.81m,
        High = 45.62m,
        Low = 44.5m,
        Close = 44.62m,
        Volume = 2258400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/31"),
        Open = 44m,
        High = 44.56m,
        Low = 43.94m,
        Close = 44.5m,
        Volume = 2340500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/01"),
        Open = 43.88m,
        High = 44.19m,
        Low = 43.31m,
        Close = 43.75m,
        Volume = 2670800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/02"),
        Open = 43.38m,
        High = 45.19m,
        Low = 43.38m,
        Close = 44.62m,
        Volume = 3295500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/03"),
        Open = 45m,
        High = 45.06m,
        Low = 43.12m,
        Close = 43.44m,
        Volume = 2886400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/04"),
        Open = 43.75m,
        High = 44.19m,
        Low = 42.56m,
        Close = 44m,
        Volume = 2927200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/07"),
        Open = 43.88m,
        High = 43.88m,
        Low = 41.69m,
        Close = 41.81m,
        Volume = 3024400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/08"),
        Open = 41.94m,
        High = 42.06m,
        Low = 40m,
        Close = 41m,
        Volume = 5097700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/09"),
        Open = 40.25m,
        High = 40.25m,
        Low = 38.38m,
        Close = 39m,
        Volume = 5535800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/10"),
        Open = 38.81m,
        High = 40.19m,
        Low = 38.75m,
        Close = 39.75m,
        Volume = 4040600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/11"),
        Open = 39.75m,
        High = 40.38m,
        Low = 39.12m,
        Close = 39.88m,
        Volume = 3127800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/14"),
        Open = 39.62m,
        High = 39.69m,
        Low = 38.06m,
        Close = 38.25m,
        Volume = 2605900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/15"),
        Open = 38.12m,
        High = 38.69m,
        Low = 37.38m,
        Close = 38.5m,
        Volume = 3947800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/16"),
        Open = 37.75m,
        High = 37.94m,
        Low = 36.88m,
        Close = 37.25m,
        Volume = 3423000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/17"),
        Open = 37.25m,
        High = 37.88m,
        Low = 36.56m,
        Close = 37.5m,
        Volume = 3400500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/18"),
        Open = 37.38m,
        High = 37.5m,
        Low = 35.88m,
        Close = 36m,
        Volume = 5536500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/22"),
        Open = 35.94m,
        High = 39.94m,
        Low = 35.88m,
        Close = 38.88m,
        Volume = 4768400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/23"),
        Open = 38.62m,
        High = 38.69m,
        Low = 37.06m,
        Close = 37.12m,
        Volume = 3880800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/24"),
        Open = 36.88m,
        High = 37m,
        Low = 35.88m,
        Close = 36.56m,
        Volume = 4198300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/25"),
        Open = 37.06m,
        High = 38m,
        Low = 36.81m,
        Close = 37.81m,
        Volume = 3170600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/28"),
        Open = 37.5m,
        High = 37.62m,
        Low = 36.56m,
        Close = 37m,
        Volume = 3573300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/29"),
        Open = 37.19m,
        High = 37.62m,
        Low = 36.12m,
        Close = 36.94m,
        Volume = 3503100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/01"),
        Open = 36.94m,
        High = 36.62m,
        Low = 35.94m,
        Close = 36.31m,
        Volume = 2838000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/02"),
        Open = 35.94m,
        High = 37.19m,
        Low = 35.38m,
        Close = 35.94m,
        Volume = 4053200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/03"),
        Open = 35.94m,
        High = 36.5m,
        Low = 35.69m,
        Close = 35.94m,
        Volume = 3884100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/06"),
        Open = 35.94m,
        High = 36.19m,
        Low = 35m,
        Close = 35.12m,
        Volume = 2879500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/07"),
        Open = 35.12m,
        High = 35.12m,
        Low = 34.12m,
        Close = 34.75m,
        Volume = 3565000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/08"),
        Open = 34m,
        High = 34.19m,
        Low = 33.38m,
        Close = 33.38m,
        Volume = 4134600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/09"),
        Open = 33.5m,
        High = 34.5m,
        Low = 33.25m,
        Close = 33.75m,
        Volume = 3236700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/10"),
        Open = 33.94m,
        High = 33.94m,
        Low = 32.31m,
        Close = 33.25m,
        Volume = 5080300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/13"),
        Open = 32.25m,
        High = 33.12m,
        Low = 32m,
        Close = 32.62m,
        Volume = 3420200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/14"),
        Open = 32.75m,
        High = 33.81m,
        Low = 32.44m,
        Close = 33.06m,
        Volume = 3727900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/15"),
        Open = 32.88m,
        High = 35.5m,
        Low = 32.81m,
        Close = 34.88m,
        Volume = 4859300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/16"),
        Open = 35m,
        High = 35.94m,
        Low = 34.69m,
        Close = 35.62m,
        Volume = 4725200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/17"),
        Open = 37.25m,
        High = 38.94m,
        Low = 36m,
        Close = 37.19m,
        Volume = 15099400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/20"),
        Open = 37.19m,
        High = 37.69m,
        Low = 36.38m,
        Close = 37m,
        Volume = 5786400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/21"),
        Open = 37.19m,
        High = 37.44m,
        Low = 36.19m,
        Close = 36.56m,
        Volume = 4153400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/22"),
        Open = 36.94m,
        High = 37.19m,
        Low = 35.75m,
        Close = 36.38m,
        Volume = 3358600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/23"),
        Open = 35.62m,
        High = 35.94m,
        Low = 34.81m,
        Close = 35.12m,
        Volume = 4080400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/24"),
        Open = 36m,
        High = 36.44m,
        Low = 35.5m,
        Close = 36.12m,
        Volume = 5797400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/27"),
        Open = 36.25m,
        High = 37.31m,
        Low = 36.12m,
        Close = 37.12m,
        Volume = 2534000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/28"),
        Open = 36.94m,
        High = 38.19m,
        Low = 36.88m,
        Close = 38m,
        Volume = 5056400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/29"),
        Open = 37.75m,
        High = 38.19m,
        Low = 37.31m,
        Close = 37.88m,
        Volume = 2731000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/30"),
        Open = 37.88m,
        High = 38.94m,
        Low = 37.62m,
        Close = 38.62m,
        Volume = 3266100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/31"),
        Open = 38.75m,
        High = 38.81m,
        Low = 37.81m,
        Close = 37.81m,
        Volume = 4630100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/03"),
        Open = 37.75m,
        High = 37.75m,
        Low = 37.06m,
        Close = 37.19m,
        Volume = 3234700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/04"),
        Open = 37.38m,
        High = 38.25m,
        Low = 36.56m,
        Close = 37.31m,
        Volume = 4002100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/05"),
        Open = 36.88m,
        High = 37.25m,
        Low = 36m,
        Close = 36.06m,
        Volume = 2860900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/06"),
        Open = 36m,
        High = 36.44m,
        Low = 35.62m,
        Close = 36.12m,
        Volume = 2941900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/07"),
        Open = 36.19m,
        High = 36.31m,
        Low = 35.38m,
        Close = 35.69m,
        Volume = 2381600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/10"),
        Open = 35.5m,
        High = 35.62m,
        Low = 35m,
        Close = 35.06m,
        Volume = 2452600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/11"),
        Open = 35m,
        High = 36.38m,
        Low = 35m,
        Close = 35.69m,
        Volume = 2251100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/12"),
        Open = 35.94m,
        High = 38.38m,
        Low = 35.88m,
        Close = 37.62m,
        Volume = 4620200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/13"),
        Open = 37.62m,
        High = 37.62m,
        Low = 36.5m,
        Close = 37m,
        Volume = 2916700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/14"),
        Open = 36m,
        High = 36.75m,
        Low = 34.75m,
        Close = 35.38m,
        Volume = 3744900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/17"),
        Open = 35.12m,
        High = 35.38m,
        Low = 34.06m,
        Close = 35.31m,
        Volume = 3739100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/18"),
        Open = 34.62m,
        High = 35.06m,
        Low = 34.31m,
        Close = 34.75m,
        Volume = 3378800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/19"),
        Open = 35.94m,
        High = 37.75m,
        Low = 35.56m,
        Close = 37.25m,
        Volume = 5709000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/20"),
        Open = 37.5m,
        High = 40.25m,
        Low = 37.5m,
        Close = 40.06m,
        Volume = 8110700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/24"),
        Open = 39.62m,
        High = 41.25m,
        Low = 37.5m,
        Close = 37.88m,
        Volume = 10087700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/25"),
        Open = 38.25m,
        High = 39.56m,
        Low = 38.25m,
        Close = 39m,
        Volume = 5397100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/26"),
        Open = 39.19m,
        High = 40.56m,
        Low = 39m,
        Close = 39.94m,
        Volume = 5338300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/27"),
        Open = 39m,
        High = 40.25m,
        Low = 38.94m,
        Close = 39.81m,
        Volume = 3176700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/28"),
        Open = 39.62m,
        High = 40.06m,
        Low = 38.94m,
        Close = 39.69m,
        Volume = 1853600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/01"),
        Open = 39.69m,
        High = 40.19m,
        Low = 39m,
        Close = 39.06m,
        Volume = 2886100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/02"),
        Open = 39.06m,
        High = 39.06m,
        Low = 37.81m,
        Close = 37.94m,
        Volume = 2549200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/03"),
        Open = 37.31m,
        High = 38.19m,
        Low = 36.81m,
        Close = 37.31m,
        Volume = 3311300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/04"),
        Open = 38.25m,
        High = 39.31m,
        Low = 37.81m,
        Close = 38.19m,
        Volume = 2981100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/05"),
        Open = 38m,
        High = 39.88m,
        Low = 37.94m,
        Close = 39.5m,
        Volume = 2792900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/08"),
        Open = 39m,
        High = 39.5m,
        Low = 38.19m,
        Close = 38.25m,
        Volume = 3146400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/09"),
        Open = 38.5m,
        High = 39.19m,
        Low = 38.12m,
        Close = 38.31m,
        Volume = 2567300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/10"),
        Open = 37.75m,
        High = 37.94m,
        Low = 36.56m,
        Close = 36.88m,
        Volume = 4820400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/11"),
        Open = 37.12m,
        High = 38.19m,
        Low = 37.06m,
        Close = 37.31m,
        Volume = 2887200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/12"),
        Open = 37.62m,
        High = 37.62m,
        Low = 37.06m,
        Close = 37.19m,
        Volume = 2453200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/15"),
        Open = 36.62m,
        High = 37.5m,
        Low = 36.44m,
        Close = 37.19m,
        Volume = 2913500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/16"),
        Open = 37.19m,
        High = 37.88m,
        Low = 36.75m,
        Close = 37.38m,
        Volume = 3815700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/17"),
        Open = 37m,
        High = 37.5m,
        Low = 36.56m,
        Close = 37.38m,
        Volume = 2739800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/18"),
        Open = 37.12m,
        High = 37.75m,
        Low = 37.12m,
        Close = 37.62m,
        Volume = 2050100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/19"),
        Open = 37m,
        High = 37.38m,
        Low = 36.25m,
        Close = 36.94m,
        Volume = 2193900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/22"),
        Open = 37.38m,
        High = 37.69m,
        Low = 36.25m,
        Close = 36.56m,
        Volume = 2966000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/23"),
        Open = 36.62m,
        High = 37.94m,
        Low = 36.62m,
        Close = 37.12m,
        Volume = 2850600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/24"),
        Open = 37.25m,
        High = 39m,
        Low = 37.19m,
        Close = 38.88m,
        Volume = 4642600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/25"),
        Open = 38.62m,
        High = 38.69m,
        Low = 37.88m,
        Close = 38.38m,
        Volume = 3027300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/26"),
        Open = 38m,
        High = 38.94m,
        Low = 38m,
        Close = 38.25m,
        Volume = 2102100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/30"),
        Open = 38.75m,
        High = 39.69m,
        Low = 38.56m,
        Close = 39.56m,
        Volume = 2325300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/31"),
        Open = 39.56m,
        High = 39.62m,
        Low = 39m,
        Close = 39.06m,
        Volume = 2057000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/01"),
        Open = 39.56m,
        High = 39.88m,
        Low = 39.31m,
        Close = 39.69m,
        Volume = 2322400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/02"),
        Open = 40.06m,
        High = 40.56m,
        Low = 39.5m,
        Close = 39.88m,
        Volume = 3449500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/05"),
        Open = 39.12m,
        High = 39.44m,
        Low = 38.56m,
        Close = 38.94m,
        Volume = 2478000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/06"),
        Open = 39.19m,
        High = 40.19m,
        Low = 39.06m,
        Close = 39.88m,
        Volume = 2938800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/07"),
        Open = 39.69m,
        High = 40m,
        Low = 38.5m,
        Close = 38.56m,
        Volume = 2520100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/08"),
        Open = 38.5m,
        High = 38.62m,
        Low = 37.69m,
        Close = 38.19m,
        Volume = 2481700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/09"),
        Open = 38.75m,
        High = 39.69m,
        Low = 38.62m,
        Close = 39.19m,
        Volume = 2714200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/12"),
        Open = 38.62m,
        High = 39.06m,
        Low = 38.06m,
        Close = 38.12m,
        Volume = 1551800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/13"),
        Open = 38m,
        High = 38.88m,
        Low = 37.69m,
        Close = 38.81m,
        Volume = 2597400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/14"),
        Open = 38.5m,
        High = 39.38m,
        Low = 38.38m,
        Close = 38.81m,
        Volume = 2834500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/15"),
        Open = 39.5m,
        High = 41m,
        Low = 39.25m,
        Close = 40.12m,
        Volume = 6321600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/16"),
        Open = 40.12m,
        High = 40.38m,
        Low = 38.81m,
        Close = 39.25m,
        Volume = 4861000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/19"),
        Open = 39.38m,
        High = 39.56m,
        Low = 38.56m,
        Close = 39m,
        Volume = 3950100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/20"),
        Open = 38.88m,
        High = 39.69m,
        Low = 38.31m,
        Close = 39.56m,
        Volume = 2824900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/21"),
        Open = 39.44m,
        High = 40.12m,
        Low = 39.06m,
        Close = 39.81m,
        Volume = 2531000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/22"),
        Open = 39.75m,
        High = 39.94m,
        Low = 38.75m,
        Close = 38.94m,
        Volume = 2102400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/23"),
        Open = 39.5m,
        High = 40.12m,
        Low = 39.38m,
        Close = 39.88m,
        Volume = 1984700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/26"),
        Open = 39.5m,
        High = 40m,
        Low = 39.5m,
        Close = 39.75m,
        Volume = 2666600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/27"),
        Open = 39.5m,
        High = 40.25m,
        Low = 39.31m,
        Close = 40m,
        Volume = 2845500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/28"),
        Open = 40.38m,
        High = 41.62m,
        Low = 40.25m,
        Close = 40.5m,
        Volume = 3834100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/29"),
        Open = 40.69m,
        High = 41.5m,
        Low = 40.5m,
        Close = 40.94m,
        Volume = 3364100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/30"),
        Open = 41m,
        High = 42.25m,
        Low = 41m,
        Close = 41.81m,
        Volume = 4694200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/03"),
        Open = 41.62m,
        High = 41.94m,
        Low = 41.44m,
        Close = 41.69m,
        Volume = 1232300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/05"),
        Open = 42.12m,
        High = 43.38m,
        Low = 42.06m,
        Close = 42.81m,
        Volume = 4990900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/06"),
        Open = 42.88m,
        High = 43.19m,
        Low = 42.56m,
        Close = 43m,
        Volume = 3642900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/07"),
        Open = 43.12m,
        High = 44.06m,
        Low = 43.06m,
        Close = 43.75m,
        Volume = 4241100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/10"),
        Open = 43.88m,
        High = 44m,
        Low = 43m,
        Close = 43m,
        Volume = 2796200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/11"),
        Open = 43.12m,
        High = 44.75m,
        Low = 43.06m,
        Close = 44.31m,
        Volume = 3799200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/12"),
        Open = 43.94m,
        High = 44.38m,
        Low = 43.69m,
        Close = 43.88m,
        Volume = 2173800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/13"),
        Open = 44.12m,
        High = 45m,
        Low = 44.12m,
        Close = 44.56m,
        Volume = 3427700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/14"),
        Open = 44.75m,
        High = 45.12m,
        Low = 44.31m,
        Close = 44.44m,
        Volume = 3472100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/17"),
        Open = 44.44m,
        High = 44.44m,
        Low = 43.44m,
        Close = 44m,
        Volume = 2465200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/18"),
        Open = 44m,
        High = 45.25m,
        Low = 43.31m,
        Close = 45.12m,
        Volume = 4773100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/19"),
        Open = 45m,
        High = 46.19m,
        Low = 44.06m,
        Close = 45.88m,
        Volume = 7478900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/20"),
        Open = 46m,
        High = 46.25m,
        Low = 45.19m,
        Close = 46.06m,
        Volume = 5032000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/21"),
        Open = 46m,
        High = 47.31m,
        Low = 45.81m,
        Close = 46.81m,
        Volume = 7622000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/24"),
        Open = 46.69m,
        High = 48.25m,
        Low = 46.69m,
        Close = 48.12m,
        Volume = 5027400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/25"),
        Open = 48m,
        High = 50.25m,
        Low = 47.88m,
        Close = 49.44m,
        Volume = 8838400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/26"),
        Open = 49m,
        High = 49.44m,
        Low = 47.69m,
        Close = 48m,
        Volume = 5298100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/27"),
        Open = 48.25m,
        High = 49.44m,
        Low = 48.19m,
        Close = 48.25m,
        Volume = 3898500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/28"),
        Open = 48.19m,
        High = 49.12m,
        Low = 47.94m,
        Close = 48.81m,
        Volume = 3930300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/31"),
        Open = 48.5m,
        High = 49.25m,
        Low = 48.44m,
        Close = 49m,
        Volume = 4475100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/01"),
        Open = 48.88m,
        High = 49.5m,
        Low = 48.69m,
        Close = 48.69m,
        Volume = 3226800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/02"),
        Open = 48.88m,
        High = 49.94m,
        Low = 48.88m,
        Close = 49.88m,
        Volume = 4376200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/03"),
        Open = 49.56m,
        High = 49.94m,
        Low = 48.81m,
        Close = 49m,
        Volume = 3226900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/04"),
        Open = 49m,
        High = 49.12m,
        Low = 48.31m,
        Close = 49m,
        Volume = 2419000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/07"),
        Open = 48.94m,
        High = 49.5m,
        Low = 48.5m,
        Close = 49.06m,
        Volume = 2112800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/08"),
        Open = 48.62m,
        High = 49.19m,
        Low = 48.38m,
        Close = 48.56m,
        Volume = 3384000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/09"),
        Open = 48.62m,
        High = 48.62m,
        Low = 47.12m,
        Close = 47.75m,
        Volume = 4278000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/10"),
        Open = 47.56m,
        High = 48.88m,
        Low = 47.56m,
        Close = 48.88m,
        Volume = 2544700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/11"),
        Open = 48.5m,
        High = 49.94m,
        Low = 48.5m,
        Close = 49.62m,
        Volume = 3281200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/14"),
        Open = 49.62m,
        High = 49.88m,
        Low = 49.31m,
        Close = 49.5m,
        Volume = 2855800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/15"),
        Open = 48.56m,
        High = 48.75m,
        Low = 47.25m,
        Close = 47.25m,
        Volume = 3951800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/16"),
        Open = 46.88m,
        High = 46.88m,
        Low = 45.88m,
        Close = 46.56m,
        Volume = 6308400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/17"),
        Open = 45.88m,
        High = 46.12m,
        Low = 45.75m,
        Close = 45.88m,
        Volume = 2810800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/18"),
        Open = 45.94m,
        High = 46.06m,
        Low = 45.31m,
        Close = 45.69m,
        Volume = 4070500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/21"),
        Open = 45.94m,
        High = 48.25m,
        Low = 45.5m,
        Close = 47.75m,
        Volume = 4088800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/22"),
        Open = 47.75m,
        High = 49.44m,
        Low = 47.62m,
        Close = 49.31m,
        Volume = 4678200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/23"),
        Open = 48.88m,
        High = 50.94m,
        Low = 48.88m,
        Close = 50.56m,
        Volume = 6971500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/24"),
        Open = 50.25m,
        High = 54m,
        Low = 50.19m,
        Close = 53.5m,
        Volume = 10874700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/25"),
        Open = 53.5m,
        High = 54.5m,
        Low = 53.38m,
        Close = 54.12m,
        Volume = 7613400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/28"),
        Open = 54.12m,
        High = 54m,
        Low = 52.94m,
        Close = 53.25m,
        Volume = 4938200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/29"),
        Open = 52.94m,
        High = 53.12m,
        Low = 52.25m,
        Close = 52.62m,
        Volume = 3984900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/30"),
        Open = 52.12m,
        High = 53m,
        Low = 51.94m,
        Close = 52.5m,
        Volume = 3673400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/31"),
        Open = 52.25m,
        High = 54.88m,
        Low = 52.25m,
        Close = 53.62m,
        Volume = 3758200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/01"),
        Open = 53.81m,
        High = 56.25m,
        Low = 53.75m,
        Close = 54.75m,
        Volume = 5087500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/05"),
        Open = 54m,
        High = 56.25m,
        Low = 54m,
        Close = 55.44m,
        Volume = 3704900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/06"),
        Open = 55.62m,
        High = 58.62m,
        Low = 55.56m,
        Close = 57.88m,
        Volume = 7914100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/07"),
        Open = 57m,
        High = 59.94m,
        Low = 57m,
        Close = 59.38m,
        Volume = 10888800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/08"),
        Open = 58.62m,
        High = 59m,
        Low = 57.62m,
        Close = 58.12m,
        Volume = 6635000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/11"),
        Open = 57.88m,
        High = 59.44m,
        Low = 57.69m,
        Close = 58.62m,
        Volume = 4333700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/12"),
        Open = 58.75m,
        High = 60.06m,
        Low = 58.12m,
        Close = 59m,
        Volume = 5625100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/13"),
        Open = 58.88m,
        High = 60.12m,
        Low = 58.75m,
        Close = 59.44m,
        Volume = 4063800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/14"),
        Open = 58.88m,
        High = 58.88m,
        Low = 57.69m,
        Close = 58.38m,
        Volume = 4237000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/15"),
        Open = 57.88m,
        High = 59.19m,
        Low = 56.75m,
        Close = 56.88m,
        Volume = 5781200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/18"),
        Open = 56.75m,
        High = 58.56m,
        Low = 56.62m,
        Close = 56.94m,
        Volume = 3178700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/19"),
        Open = 56.62m,
        High = 57.56m,
        Low = 56.25m,
        Close = 56.77m,
        Volume = 4220300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/20"),
        Open = 57m,
        High = 60.06m,
        Low = 56.94m,
        Close = 59.06m,
        Volume = 6373800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/21"),
        Open = 59.5m,
        High = 60.69m,
        Low = 59.25m,
        Close = 60.12m,
        Volume = 6158200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/22"),
        Open = 59.75m,
        High = 64.31m,
        Low = 59m,
        Close = 64m,
        Volume = 6829300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/25"),
        Open = 63.75m,
        High = 64.31m,
        Low = 61.75m,
        Close = 63.88m,
        Volume = 5338300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/26"),
        Open = 63.12m,
        High = 66.94m,
        Low = 62.81m,
        Close = 66.06m,
        Volume = 7064600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/27"),
        Open = 65.75m,
        High = 66.5m,
        Low = 63.38m,
        Close = 65.25m,
        Volume = 7533400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/28"),
        Open = 63.88m,
        High = 65.38m,
        Low = 63.62m,
        Close = 64.5m,
        Volume = 6704100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/29"),
        Open = 62.62m,
        High = 63.94m,
        Low = 60.62m,
        Close = 63.12m,
        Volume = 5004300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/02"),
        Open = 61m,
        High = 61.25m,
        Low = 57.25m,
        Close = 58.44m,
        Volume = 9275500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/03"),
        Open = 59m,
        High = 60.31m,
        Low = 59m,
        Close = 59.88m,
        Volume = 5007200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/04"),
        Open = 59.5m,
        High = 62.44m,
        Low = 59.5m,
        Close = 61.12m,
        Volume = 5019900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/05"),
        Open = 61.06m,
        High = 63m,
        Low = 60.25m,
        Close = 61.06m,
        Volume = 4016900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/06"),
        Open = 61.19m,
        High = 62.19m,
        Low = 60.5m,
        Close = 61m,
        Volume = 3057100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/09"),
        Open = 60.25m,
        High = 60.69m,
        Low = 59.25m,
        Close = 59.44m,
        Volume = 2180100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/10"),
        Open = 59.62m,
        High = 60.12m,
        Low = 59.06m,
        Close = 59.56m,
        Volume = 2501200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/11"),
        Open = 59m,
        High = 61.25m,
        Low = 58.81m,
        Close = 60.19m,
        Volume = 2960800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/12"),
        Open = 59.94m,
        High = 60.31m,
        Low = 54m,
        Close = 56.12m,
        Volume = 8935400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/13"),
        Open = 56m,
        High = 60.31m,
        Low = 55.94m,
        Close = 58.75m,
        Volume = 4721000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/16"),
        Open = 59.62m,
        High = 61.06m,
        Low = 59.44m,
        Close = 60.19m,
        Volume = 2649100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/17"),
        Open = 60.19m,
        High = 61.44m,
        Low = 58.62m,
        Close = 60.5m,
        Volume = 2909800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/18"),
        Open = 58.5m,
        High = 61.5m,
        Low = 58.38m,
        Close = 60.75m,
        Volume = 4731000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/19"),
        Open = 61m,
        High = 61.19m,
        Low = 57.31m,
        Close = 58.44m,
        Volume = 6481600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/20"),
        Open = 58.38m,
        High = 60.25m,
        Low = 57.81m,
        Close = 60m,
        Volume = 3795000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/23"),
        Open = 60.5m,
        High = 62m,
        Low = 60.06m,
        Close = 61.25m,
        Volume = 5672500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/24"),
        Open = 60.88m,
        High = 61.94m,
        Low = 60.62m,
        Close = 61m,
        Volume = 4167200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/25"),
        Open = 61.12m,
        High = 63.94m,
        Low = 61.12m,
        Close = 62.56m,
        Volume = 5929900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/26"),
        Open = 62m,
        High = 63.62m,
        Low = 61.88m,
        Close = 63.06m,
        Volume = 4459800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/27"),
        Open = 63.06m,
        High = 63.81m,
        Low = 63m,
        Close = 63.75m,
        Volume = 2632700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/30"),
        Open = 63.75m,
        High = 65.19m,
        Low = 63.69m,
        Close = 64.69m,
        Volume = 4769200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/31"),
        Open = 64.69m,
        High = 67.88m,
        Low = 64.06m,
        Close = 67.81m,
        Volume = 4694800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/01"),
        Open = 67.56m,
        High = 67.75m,
        Low = 65.12m,
        Close = 65.75m,
        Volume = 5574200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/02"),
        Open = 65.38m,
        High = 67m,
        Low = 63.81m,
        Close = 66.12m,
        Volume = 5114500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/03"),
        Open = 66.19m,
        High = 66.75m,
        Low = 65.5m,
        Close = 66.12m,
        Volume = 2738700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/06"),
        Open = 64.44m,
        High = 66.38m,
        Low = 64m,
        Close = 66m,
        Volume = 3576700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/07"),
        Open = 65.5m,
        High = 65.94m,
        Low = 65.06m,
        Close = 65.19m,
        Volume = 3025800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/08"),
        Open = 65.19m,
        High = 66.12m,
        Low = 64.5m,
        Close = 65.06m,
        Volume = 1595500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/09"),
        Open = 64.88m,
        High = 65.94m,
        Low = 64.44m,
        Close = 65.69m,
        Volume = 2047300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/10"),
        Open = 65.44m,
        High = 65.75m,
        Low = 63.25m,
        Close = 63.25m,
        Volume = 2847400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/13"),
        Open = 62.12m,
        High = 63.62m,
        Low = 61.94m,
        Close = 62.81m,
        Volume = 2943400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/14"),
        Open = 63.06m,
        High = 64.81m,
        Low = 63.06m,
        Close = 64.38m,
        Volume = 3553800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/15"),
        Open = 63.75m,
        High = 63.81m,
        Low = 62.69m,
        Close = 63.56m,
        Volume = 3089800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/16"),
        Open = 63.56m,
        High = 66.38m,
        Low = 63.56m,
        Close = 65.81m,
        Volume = 3557400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/17"),
        Open = 65.75m,
        High = 66.81m,
        Low = 65.06m,
        Close = 65.38m,
        Volume = 3517000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/20"),
        Open = 65m,
        High = 66.5m,
        Low = 65m,
        Close = 65.56m,
        Volume = 2503900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/21"),
        Open = 65.31m,
        High = 69.5m,
        Low = 65.31m,
        Close = 68.62m,
        Volume = 5728600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/22"),
        Open = 68.12m,
        High = 68.44m,
        Low = 64.88m,
        Close = 65.12m,
        Volume = 4276000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/24"),
        Open = 66m,
        High = 66.81m,
        Low = 65.56m,
        Close = 65.69m,
        Volume = 1122400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/27"),
        Open = 67m,
        High = 68m,
        Low = 67m,
        Close = 67.38m,
        Volume = 2771400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/28"),
        Open = 67.31m,
        High = 68.19m,
        Low = 66.25m,
        Close = 67.5m,
        Volume = 3243900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/29"),
        Open = 66.44m,
        High = 70m,
        Low = 66.19m,
        Close = 69.88m,
        Volume = 6369100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/30"),
        Open = 69.44m,
        High = 69.69m,
        Low = 67.56m,
        Close = 68.75m,
        Volume = 4245000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/01"),
        Open = 68.69m,
        High = 68.69m,
        Low = 65.19m,
        Close = 65.81m,
        Volume = 4420400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/04"),
        Open = 65.81m,
        High = 65.81m,
        Low = 63.69m,
        Close = 64.69m,
        Volume = 5188000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/05"),
        Open = 65.94m,
        High = 70.19m,
        Low = 64.5m,
        Close = 68.94m,
        Volume = 6329000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/06"),
        Open = 68.94m,
        High = 69.44m,
        Low = 66.81m,
        Close = 67.32m,
        Volume = 4597700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/07"),
        Open = 67.12m,
        High = 68.12m,
        Low = 66.81m,
        Close = 66.81m,
        Volume = 2295400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/08"),
        Open = 67.56m,
        High = 70.94m,
        Low = 67.38m,
        Close = 67.38m,
        Volume = 5175200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/11"),
        Open = 69.69m,
        High = 70.62m,
        Low = 68.38m,
        Close = 68.38m,
        Volume = 3799000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/12"),
        Open = 68.12m,
        High = 70.44m,
        Low = 68.12m,
        Close = 69.12m,
        Volume = 3164500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/13"),
        Open = 68.75m,
        High = 69.81m,
        Low = 67.75m,
        Close = 67.88m,
        Volume = 2366600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/14"),
        Open = 67.38m,
        High = 68.94m,
        Low = 66.5m,
        Close = 67.25m,
        Volume = 3319700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/15"),
        Open = 65.88m,
        High = 66.69m,
        Low = 64.75m,
        Close = 64.88m,
        Volume = 6202400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/18"),
        Open = 66m,
        High = 69.94m,
        Low = 66m,
        Close = 68.5m,
        Volume = 4228800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/19"),
        Open = 67.88m,
        High = 68.62m,
        Low = 66.12m,
        Close = 66.38m,
        Volume = 4316000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/20"),
        Open = 66.12m,
        High = 66.44m,
        Low = 64.06m,
        Close = 65m,
        Volume = 4035600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/21"),
        Open = 64.75m,
        High = 65m,
        Low = 62.56m,
        Close = 64.62m,
        Volume = 4724400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/22"),
        Open = 64.19m,
        High = 65m,
        Low = 61.44m,
        Close = 63.44m,
        Volume = 4071700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/26"),
        Open = 63.88m,
        High = 64.5m,
        Low = 62.25m,
        Close = 63m,
        Volume = 2366500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/27"),
        Open = 62.25m,
        High = 64.88m,
        Low = 62.25m,
        Close = 64.06m,
        Volume = 2723600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/28"),
        Open = 64m,
        High = 67m,
        Low = 63.75m,
        Close = 65.44m,
        Volume = 2486100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/29"),
        Open = 65.88m,
        High = 66.75m,
        Low = 65.62m,
        Close = 66m,
        Volume = 2553400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/02"),
        Open = 64.88m,
        High = 65.31m,
        Low = 60.56m,
        Close = 62m,
        Volume = 3762200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/03"),
        Open = 60.75m,
        High = 63.75m,
        Low = 59.19m,
        Close = 62.56m,
        Volume = 6428500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/04"),
        Open = 64m,
        High = 64.19m,
        Low = 60.25m,
        Close = 61m,
        Volume = 3841100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/05"),
        Open = 61.38m,
        High = 61.5m,
        Low = 58.12m,
        Close = 58.75m,
        Volume = 3758500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/08"),
        Open = 58.75m,
        High = 60.5m,
        Low = 58.69m,
        Close = 59m,
        Volume = 3012100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/09"),
        Open = 59m,
        High = 59m,
        Low = 57.19m,
        Close = 58.94m,
        Volume = 4356700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/10"),
        Open = 58.38m,
        High = 60.88m,
        Low = 58.31m,
        Close = 60.38m,
        Volume = 3659600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/11"),
        Open = 60m,
        High = 60.75m,
        Low = 59m,
        Close = 59.12m,
        Volume = 3371000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/12"),
        Open = 59.56m,
        High = 60.69m,
        Low = 58.56m,
        Close = 60.62m,
        Volume = 3150700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/16"),
        Open = 59.94m,
        High = 61.62m,
        Low = 59.5m,
        Close = 61m,
        Volume = 3268200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/17"),
        Open = 62.44m,
        High = 62.69m,
        Low = 58.25m,
        Close = 58.75m,
        Volume = 6605200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/18"),
        Open = 56.5m,
        High = 58m,
        Low = 55.62m,
        Close = 57.38m,
        Volume = 6044500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/19"),
        Open = 57.38m,
        High = 57.44m,
        Low = 55.5m,
        Close = 55.69m,
        Volume = 4295900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/22"),
        Open = 56.31m,
        High = 56.88m,
        Low = 55.69m,
        Close = 56m,
        Volume = 3604000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/23"),
        Open = 56.94m,
        High = 58m,
        Low = 56.19m,
        Close = 57.5m,
        Volume = 4417100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/24"),
        Open = 56.88m,
        High = 58m,
        Low = 56.88m,
        Close = 57.44m,
        Volume = 2997300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/25"),
        Open = 56.5m,
        High = 59.69m,
        Low = 56.5m,
        Close = 59.25m,
        Volume = 3683300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/26"),
        Open = 58.75m,
        High = 59.69m,
        Low = 57.5m,
        Close = 58.06m,
        Volume = 2299000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/29"),
        Open = 57.7m,
        High = 57.99m,
        Low = 56.31m,
        Close = 56.46m,
        Volume = 2357500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/30"),
        Open = 56.46m,
        High = 56.59m,
        Low = 54.56m,
        Close = 56.15m,
        Volume = 3650100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/31"),
        Open = 56.5m,
        High = 58.91m,
        Low = 56.5m,
        Close = 58.5m,
        Volume = 3614600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/01"),
        Open = 58m,
        High = 58.5m,
        Low = 56.06m,
        Close = 56.52m,
        Volume = 4099000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/02"),
        Open = 56.97m,
        High = 57.5m,
        Low = 56.04m,
        Close = 56.85m,
        Volume = 2121700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/05"),
        Open = 56.73m,
        High = 58.04m,
        Low = 56.42m,
        Close = 57.93m,
        Volume = 2188100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/06"),
        Open = 57.88m,
        High = 58.46m,
        Low = 56.47m,
        Close = 56.73m,
        Volume = 2353100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/07"),
        Open = 56.95m,
        High = 57.89m,
        Low = 56.65m,
        Close = 57.45m,
        Volume = 2182900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/08"),
        Open = 57.35m,
        High = 58.26m,
        Low = 57.12m,
        Close = 57.51m,
        Volume = 2777000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/09"),
        Open = 57.7m,
        High = 58.17m,
        Low = 56.78m,
        Close = 57.34m,
        Volume = 1997200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/12"),
        Open = 58.65m,
        High = 59.1m,
        Low = 58.21m,
        Close = 59.07m,
        Volume = 2875500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/13"),
        Open = 59.09m,
        High = 61.38m,
        Low = 59.09m,
        Close = 60.72m,
        Volume = 4984900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/14"),
        Open = 61.72m,
        High = 61.94m,
        Low = 60.34m,
        Close = 60.59m,
        Volume = 3684200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/15"),
        Open = 60.59m,
        High = 60.76m,
        Low = 58.84m,
        Close = 60.15m,
        Volume = 2531900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/16"),
        Open = 59.8m,
        High = 60.61m,
        Low = 59.63m,
        Close = 59.99m,
        Volume = 2933600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/20"),
        Open = 60.35m,
        High = 62.8m,
        Low = 60.15m,
        Close = 61.85m,
        Volume = 3139500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/21"),
        Open = 61.85m,
        High = 62.38m,
        Low = 60.15m,
        Close = 60.2m,
        Volume = 2286300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/22"),
        Open = 60.2m,
        High = 62.23m,
        Low = 60.2m,
        Close = 61.28m,
        Volume = 2767600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/23"),
        Open = 60.98m,
        High = 61.75m,
        Low = 60.55m,
        Close = 61.61m,
        Volume = 2266900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/26"),
        Open = 61.45m,
        High = 62.97m,
        Low = 61.02m,
        Close = 62.76m,
        Volume = 1854600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/27"),
        Open = 62.3m,
        High = 63.9m,
        Low = 62m,
        Close = 63.7m,
        Volume = 2993000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/28"),
        Open = 63.8m,
        High = 63.83m,
        Low = 61.99m,
        Close = 62.2m,
        Volume = 3051400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/01"),
        Open = 61.85m,
        High = 61.86m,
        Low = 58.6m,
        Close = 59.65m,
        Volume = 4225700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/02"),
        Open = 59.55m,
        High = 61.45m,
        Low = 58.3m,
        Close = 60.1m,
        Volume = 3763900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/05"),
        Open = 59.9m,
        High = 62.15m,
        Low = 59.88m,
        Close = 61.91m,
        Volume = 2814700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/06"),
        Open = 62.05m,
        High = 62.59m,
        Low = 61.29m,
        Close = 62.13m,
        Volume = 2783400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/07"),
        Open = 61.95m,
        High = 64.21m,
        Low = 61.87m,
        Close = 64.1m,
        Volume = 3475400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/08"),
        Open = 64m,
        High = 65.2m,
        Low = 63.55m,
        Close = 64.75m,
        Volume = 4224600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/09"),
        Open = 64.45m,
        High = 65.6m,
        Low = 64.2m,
        Close = 65.5m,
        Volume = 2716600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/12"),
        Open = 64.2m,
        High = 64.32m,
        Low = 60.96m,
        Close = 61m,
        Volume = 4269900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/13"),
        Open = 62.01m,
        High = 62.99m,
        Low = 60.06m,
        Close = 60.57m,
        Volume = 4786300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/14"),
        Open = 59.5m,
        High = 59.51m,
        Low = 56.83m,
        Close = 58.02m,
        Volume = 5983800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/15"),
        Open = 58.02m,
        High = 58.02m,
        Low = 55.51m,
        Close = 56.1m,
        Volume = 5136800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/16"),
        Open = 55.63m,
        High = 56.2m,
        Low = 52.85m,
        Close = 53.75m,
        Volume = 10933600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/19"),
        Open = 54.57m,
        High = 56.25m,
        Low = 53.75m,
        Close = 56.02m,
        Volume = 6143200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/20"),
        Open = 56.6m,
        High = 57.19m,
        Low = 54.76m,
        Close = 55m,
        Volume = 4359800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/21"),
        Open = 54.6m,
        High = 55.4m,
        Low = 53.2m,
        Close = 53.85m,
        Volume = 3758400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/22"),
        Open = 53.1m,
        High = 53.35m,
        Low = 49.7m,
        Close = 52m,
        Volume = 6600400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/23"),
        Open = 52.75m,
        High = 53.44m,
        Low = 51.6m,
        Close = 53m,
        Volume = 4632300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/26"),
        Open = 53.55m,
        High = 56.17m,
        Low = 53.55m,
        Close = 55.44m,
        Volume = 4778800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/27"),
        Open = 55.31m,
        High = 56.24m,
        Low = 54.25m,
        Close = 55.2m,
        Volume = 3634200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/28"),
        Open = 54.6m,
        High = 55.18m,
        Low = 51.85m,
        Close = 55m,
        Volume = 2861600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/29"),
        Open = 54.55m,
        High = 56.3m,
        Low = 54.25m,
        Close = 55.95m,
        Volume = 2814300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/30"),
        Open = 55.4m,
        High = 57.27m,
        Low = 55.31m,
        Close = 55.71m,
        Volume = 3741200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/02"),
        Open = 55.4m,
        High = 56.6m,
        Low = 54.53m,
        Close = 55.02m,
        Volume = 3182300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/03"),
        Open = 55.45m,
        High = 55.45m,
        Low = 54.11m,
        Close = 54.61m,
        Volume = 3337500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/04"),
        Open = 54.5m,
        High = 55.2m,
        Low = 53.92m,
        Close = 54.63m,
        Volume = 2953500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/05"),
        Open = 56m,
        High = 57.5m,
        Low = 55.84m,
        Close = 56.81m,
        Volume = 2703000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/06"),
        Open = 56m,
        High = 56.65m,
        Low = 55.32m,
        Close = 55.98m,
        Volume = 2768100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/09"),
        Open = 56.05m,
        High = 57.74m,
        Low = 56m,
        Close = 56.87m,
        Volume = 2547300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/10"),
        Open = 58.1m,
        High = 60.19m,
        Low = 57.83m,
        Close = 59.82m,
        Volume = 4478700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/11"),
        Open = 60.57m,
        High = 61m,
        Low = 58.5m,
        Close = 59.12m,
        Volume = 3979200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/12"),
        Open = 58.95m,
        High = 60.5m,
        Low = 58.62m,
        Close = 60.5m,
        Volume = 1607100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/16"),
        Open = 60.25m,
        High = 60.98m,
        Low = 59.18m,
        Close = 59.75m,
        Volume = 2145500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/17"),
        Open = 59.75m,
        High = 60.6m,
        Low = 59m,
        Close = 60.6m,
        Volume = 2257400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/18"),
        Open = 60.85m,
        High = 63.73m,
        Low = 60.7m,
        Close = 61.3m,
        Volume = 3076500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/19"),
        Open = 61.48m,
        High = 61.62m,
        Low = 59.55m,
        Close = 60.63m,
        Volume = 3549200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/20"),
        Open = 61.9m,
        High = 64.91m,
        Low = 60.5m,
        Close = 61.7m,
        Volume = 7126900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/23"),
        Open = 60.9m,
        High = 61.28m,
        Low = 59.61m,
        Close = 60.14m,
        Volume = 4319700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/24"),
        Open = 60m,
        High = 62.13m,
        Low = 60m,
        Close = 60.8m,
        Volume = 3076600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/25"),
        Open = 59.95m,
        High = 60.41m,
        Low = 59.9m,
        Close = 60.34m,
        Volume = 3494100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/26"),
        Open = 60.09m,
        High = 61.2m,
        Low = 59.77m,
        Close = 60.98m,
        Volume = 2992200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/27"),
        Open = 60.92m,
        High = 61.8m,
        Low = 60.84m,
        Close = 61.61m,
        Volume = 2178600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/30"),
        Open = 62.4m,
        High = 64.16m,
        Low = 61.8m,
        Close = 61.8m,
        Volume = 3052800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/01"),
        Open = 62.7m,
        High = 64.48m,
        Low = 62.7m,
        Close = 63.43m,
        Volume = 4772100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/02"),
        Open = 63.68m,
        High = 64.3m,
        Low = 63.25m,
        Close = 64m,
        Volume = 3346200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/03"),
        Open = 63.75m,
        High = 64.2m,
        Low = 62.71m,
        Close = 64m,
        Volume = 2168500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/04"),
        Open = 63.15m,
        High = 65m,
        Low = 63m,
        Close = 64.5m,
        Volume = 2390700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/07"),
        Open = 64.7m,
        High = 65.27m,
        Low = 64.25m,
        Close = 64.69m,
        Volume = 2149200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/08"),
        Open = 64.5m,
        High = 65.2m,
        Low = 64.3m,
        Close = 64.63m,
        Volume = 2663000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/09"),
        Open = 64.05m,
        High = 65.51m,
        Low = 64m,
        Close = 65m,
        Volume = 2351300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/10"),
        Open = 65.55m,
        High = 66m,
        Low = 65.16m,
        Close = 65.95m,
        Volume = 2437300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/11"),
        Open = 65.97m,
        High = 66.43m,
        Low = 65.3m,
        Close = 66.01m,
        Volume = 1659000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/14"),
        Open = 66m,
        High = 66.75m,
        Low = 65.87m,
        Close = 66.74m,
        Volume = 1399700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/15"),
        Open = 66.02m,
        High = 66.7m,
        Low = 65.44m,
        Close = 66.59m,
        Volume = 2583000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/16"),
        Open = 66.6m,
        High = 66.75m,
        Low = 65.65m,
        Close = 66.75m,
        Volume = 3985800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/17"),
        Open = 66.75m,
        High = 69.85m,
        Low = 66.56m,
        Close = 68.79m,
        Volume = 6049300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/18"),
        Open = 68.79m,
        High = 68.9m,
        Low = 67.97m,
        Close = 68.35m,
        Volume = 3360700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/21"),
        Open = 67.9m,
        High = 68.75m,
        Low = 67.87m,
        Close = 68.69m,
        Volume = 1554000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/22"),
        Open = 68.1m,
        High = 68.95m,
        Low = 67.5m,
        Close = 68m,
        Volume = 2810100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/23"),
        Open = 67.4m,
        High = 67.65m,
        Low = 66m,
        Close = 66m,
        Volume = 3684300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/24"),
        Open = 66.2m,
        High = 67.46m,
        Low = 64.05m,
        Close = 65.2m,
        Volume = 4250300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/25"),
        Open = 64.9m,
        High = 64.9m,
        Low = 62.9m,
        Close = 63.33m,
        Volume = 3136600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/29"),
        Open = 63.5m,
        High = 63.9m,
        Low = 63.2m,
        Close = 63.53m,
        Volume = 2271400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/30"),
        Open = 63.57m,
        High = 63.95m,
        Low = 62.8m,
        Close = 63.05m,
        Volume = 3197700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/31"),
        Open = 63.3m,
        High = 63.4m,
        Low = 62.33m,
        Close = 62.89m,
        Volume = 2652800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/01"),
        Open = 63m,
        High = 65.57m,
        Low = 62.9m,
        Close = 65m,
        Volume = 3300300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/04"),
        Open = 64.9m,
        High = 66.7m,
        Low = 64.9m,
        Close = 66.03m,
        Volume = 2464100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/05"),
        Open = 67.03m,
        High = 67.55m,
        Low = 66.7m,
        Close = 66.93m,
        Volume = 3384100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/06"),
        Open = 66.15m,
        High = 66.26m,
        Low = 65.72m,
        Close = 66.1m,
        Volume = 3492100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/07"),
        Open = 65.95m,
        High = 66.06m,
        Low = 65.12m,
        Close = 65.65m,
        Volume = 2176200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/08"),
        Open = 65.62m,
        High = 65.62m,
        Low = 64.1m,
        Close = 64.59m,
        Volume = 2250000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/11"),
        Open = 64.59m,
        High = 64.75m,
        Low = 63.67m,
        Close = 64.5m,
        Volume = 1662300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/12"),
        Open = 64.3m,
        High = 66.14m,
        Low = 64.2m,
        Close = 65.71m,
        Volume = 3072300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/13"),
        Open = 65.6m,
        High = 66.49m,
        Low = 65.4m,
        Close = 65.49m,
        Volume = 2161500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/14"),
        Open = 65.49m,
        High = 65.49m,
        Low = 63.32m,
        Close = 63.56m,
        Volume = 3703600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/15"),
        Open = 63.8m,
        High = 64.51m,
        Low = 63.72m,
        Close = 64.25m,
        Volume = 5569400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/18"),
        Open = 64.85m,
        High = 64.99m,
        Low = 64.41m,
        Close = 64.88m,
        Volume = 2421700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/19"),
        Open = 64.7m,
        High = 64.88m,
        Low = 61.54m,
        Close = 61.8m,
        Volume = 4503100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/20"),
        Open = 61.8m,
        High = 62.85m,
        Low = 60.38m,
        Close = 61.11m,
        Volume = 5948800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/21"),
        Open = 60m,
        High = 60m,
        Low = 56.7m,
        Close = 57.75m,
        Volume = 9704900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/22"),
        Open = 57.75m,
        High = 57.88m,
        Low = 55.4m,
        Close = 57m,
        Volume = 6128000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/25"),
        Open = 56.95m,
        High = 57.78m,
        Low = 56.39m,
        Close = 56.96m,
        Volume = 5424700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/26"),
        Open = 56.7m,
        High = 57.82m,
        Low = 56.05m,
        Close = 57.02m,
        Volume = 4629500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/27"),
        Open = 57.02m,
        High = 58.04m,
        Low = 56.88m,
        Close = 57.7m,
        Volume = 3117600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/28"),
        Open = 57.3m,
        High = 58.38m,
        Low = 56.88m,
        Close = 57.24m,
        Volume = 4013600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/29"),
        Open = 56.89m,
        High = 57.5m,
        Low = 55.58m,
        Close = 55.6m,
        Volume = 4835700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/02"),
        Open = 56.6m,
        High = 57.22m,
        Low = 56.3m,
        Close = 56.36m,
        Volume = 3338500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/03"),
        Open = 56.36m,
        High = 57.06m,
        Low = 56.15m,
        Close = 56.33m,
        Volume = 2202300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/05"),
        Open = 56.7m,
        High = 56.72m,
        Low = 55.15m,
        Close = 55.23m,
        Volume = 3139100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/06"),
        Open = 55.05m,
        High = 55.48m,
        Low = 53.77m,
        Close = 54.3m,
        Volume = 4104200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/09"),
        Open = 53.85m,
        High = 54.02m,
        Low = 52.55m,
        Close = 52.83m,
        Volume = 5520600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/10"),
        Open = 53.73m,
        High = 54.62m,
        Low = 53.19m,
        Close = 54.15m,
        Volume = 4709600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/11"),
        Open = 54m,
        High = 54.21m,
        Low = 52.9m,
        Close = 52.9m,
        Volume = 3299200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/12"),
        Open = 53.4m,
        High = 54.79m,
        Low = 53.26m,
        Close = 54.5m,
        Volume = 3217400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/13"),
        Open = 54.49m,
        High = 55.21m,
        Low = 53.77m,
        Close = 55.07m,
        Volume = 1637700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/16"),
        Open = 54.62m,
        High = 55.39m,
        Low = 54.08m,
        Close = 55.28m,
        Volume = 1945300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/17"),
        Open = 55.4m,
        High = 56.72m,
        Low = 55.4m,
        Close = 56.3m,
        Volume = 3840900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/18"),
        Open = 57.6m,
        High = 57.6m,
        Low = 55.05m,
        Close = 57.13m,
        Volume = 5454100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/19"),
        Open = 57.41m,
        High = 57.95m,
        Low = 55.7m,
        Close = 56.39m,
        Volume = 3427100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/20"),
        Open = 56.39m,
        High = 57.15m,
        Low = 56.27m,
        Close = 56.79m,
        Volume = 1834100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/23"),
        Open = 57.09m,
        High = 57.25m,
        Low = 56.05m,
        Close = 56.25m,
        Volume = 2119300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/24"),
        Open = 56.6m,
        High = 56.6m,
        Low = 55.19m,
        Close = 55.26m,
        Volume = 2174700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/25"),
        Open = 55.96m,
        High = 56.85m,
        Low = 55.82m,
        Close = 56.67m,
        Volume = 1581100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/26"),
        Open = 56.55m,
        High = 58.18m,
        Low = 56.52m,
        Close = 58.11m,
        Volume = 2309300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/27"),
        Open = 57.95m,
        High = 58.9m,
        Low = 57.95m,
        Close = 58.14m,
        Volume = 2611900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/30"),
        Open = 58.64m,
        High = 58.9m,
        Low = 57.4m,
        Close = 57.4m,
        Volume = 2613500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/31"),
        Open = 57.2m,
        High = 58.79m,
        Low = 57.12m,
        Close = 58.53m,
        Volume = 2612700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/01"),
        Open = 58.65m,
        High = 59.34m,
        Low = 58.52m,
        Close = 59m,
        Volume = 2174400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/02"),
        Open = 59.5m,
        High = 59.75m,
        Low = 58.32m,
        Close = 58.82m,
        Volume = 2348200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/03"),
        Open = 58.82m,
        High = 59.25m,
        Low = 58.56m,
        Close = 59.21m,
        Volume = 1946300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/06"),
        Open = 59m,
        High = 59.8m,
        Low = 58.34m,
        Close = 58.4m,
        Volume = 2721600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/07"),
        Open = 57.44m,
        High = 57.73m,
        Low = 56.5m,
        Close = 57.5m,
        Volume = 4131100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/08"),
        Open = 57.15m,
        High = 57.68m,
        Low = 56.32m,
        Close = 56.61m,
        Volume = 2982800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/09"),
        Open = 56.51m,
        High = 57.04m,
        Low = 55.88m,
        Close = 56.36m,
        Volume = 3755500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/10"),
        Open = 56.51m,
        High = 56.93m,
        Low = 56.11m,
        Close = 56.85m,
        Volume = 2330500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/13"),
        Open = 56.55m,
        High = 57.24m,
        Low = 56.15m,
        Close = 56.45m,
        Volume = 1590500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/14"),
        Open = 56.45m,
        High = 56.7m,
        Low = 55.85m,
        Close = 55.89m,
        Volume = 2119000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/15"),
        Open = 55.55m,
        High = 56.1m,
        Low = 54.39m,
        Close = 54.44m,
        Volume = 3311300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/16"),
        Open = 54.1m,
        High = 55.13m,
        Low = 53.79m,
        Close = 55.13m,
        Volume = 2957000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/17"),
        Open = 55m,
        High = 55m,
        Low = 53.4m,
        Close = 54m,
        Volume = 2412300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/20"),
        Open = 53.75m,
        High = 53.8m,
        Low = 52.8m,
        Close = 53.34m,
        Volume = 3228000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/21"),
        Open = 53.27m,
        High = 53.31m,
        Low = 51.94m,
        Close = 51.94m,
        Volume = 3330300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/22"),
        Open = 51.94m,
        High = 52.6m,
        Low = 51.78m,
        Close = 52.3m,
        Volume = 4189500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/23"),
        Open = 52.1m,
        High = 52.5m,
        Low = 52m,
        Close = 52.17m,
        Volume = 1561600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/24"),
        Open = 52.34m,
        High = 53.95m,
        Low = 52.3m,
        Close = 53.63m,
        Volume = 2352500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/27"),
        Open = 53.91m,
        High = 53.91m,
        Low = 53.01m,
        Close = 53.06m,
        Volume = 1694300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/28"),
        Open = 53m,
        High = 53.21m,
        Low = 51.55m,
        Close = 51.65m,
        Volume = 4484300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/29"),
        Open = 51.8m,
        High = 52m,
        Low = 50.51m,
        Close = 50.7m,
        Volume = 3533500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/30"),
        Open = 50.7m,
        High = 51.15m,
        Low = 50.17m,
        Close = 50.5m,
        Volume = 2518100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/31"),
        Open = 50.5m,
        High = 51.2m,
        Low = 50.26m,
        Close = 51.2m,
        Volume = 1887700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/04"),
        Open = 49.75m,
        High = 51.97m,
        Low = 49.45m,
        Close = 49.95m,
        Volume = 3242700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/05"),
        Open = 50.2m,
        High = 51.25m,
        Low = 49.9m,
        Close = 50.61m,
        Volume = 3354600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/06"),
        Open = 50.1m,
        High = 50.45m,
        Low = 48.45m,
        Close = 48.84m,
        Volume = 3921700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/07"),
        Open = 47.8m,
        High = 48m,
        Low = 44.79m,
        Close = 45.18m,
        Volume = 8114600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/10"),
        Open = 44.9m,
        High = 45.95m,
        Low = 43.46m,
        Close = 43.46m,
        Volume = 6366000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/17"),
        Open = 35.65m,
        High = 38.7m,
        Low = 35.45m,
        Close = 35.8m,
        Volume = 21271800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/18"),
        Open = 35.8m,
        High = 36.16m,
        Low = 32m,
        Close = 33.14m,
        Volume = 16785400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/19"),
        Open = 32m,
        High = 33.81m,
        Low = 31.93m,
        Close = 32.61m,
        Volume = 15143500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/20"),
        Open = 32.03m,
        High = 32.24m,
        Low = 29.75m,
        Close = 29.76m,
        Volume = 12001700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/21"),
        Open = 28.25m,
        High = 30.3m,
        Low = 27.6m,
        Close = 30.1m,
        Volume = 13515700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/24"),
        Open = 30.09m,
        High = 33.39m,
        Low = 30.09m,
        Close = 32.8m,
        Volume = 14100500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/25"),
        Open = 33.25m,
        High = 34.48m,
        Low = 32.76m,
        Close = 34.33m,
        Volume = 10206200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/26"),
        Open = 34.55m,
        High = 34.65m,
        Low = 33.35m,
        Close = 34.29m,
        Volume = 6333100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/27"),
        Open = 33.9m,
        High = 34.59m,
        Low = 32.1m,
        Close = 34.4m,
        Volume = 8984400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/28"),
        Open = 34.41m,
        High = 34.41m,
        Low = 32.9m,
        Close = 33.5m,
        Volume = 6773200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/01"),
        Open = 33.5m,
        High = 34.25m,
        Low = 32.05m,
        Close = 32.4m,
        Volume = 6785800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/02"),
        Open = 33.48m,
        High = 34.48m,
        Low = 33.13m,
        Close = 34.25m,
        Volume = 7077600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/03"),
        Open = 34.51m,
        High = 37.52m,
        Low = 34.4m,
        Close = 36.59m,
        Volume = 8575200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/04"),
        Open = 36.59m,
        High = 36.88m,
        Low = 35.25m,
        Close = 36.38m,
        Volume = 6449600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/05"),
        Open = 36.5m,
        High = 37.04m,
        Low = 34.95m,
        Close = 36.26m,
        Volume = 3969300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/08"),
        Open = 36.2m,
        High = 37.64m,
        Low = 35.94m,
        Close = 36.62m,
        Volume = 5168500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/09"),
        Open = 36.9m,
        High = 36.97m,
        Low = 35.62m,
        Close = 36m,
        Volume = 3430000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/10"),
        Open = 36.05m,
        High = 36.59m,
        Low = 35.4m,
        Close = 35.76m,
        Volume = 4520100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/11"),
        Open = 35.9m,
        High = 36.69m,
        Low = 35.89m,
        Close = 36.18m,
        Volume = 5032400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/12"),
        Open = 36.01m,
        High = 36.01m,
        Low = 34.9m,
        Close = 35.9m,
        Volume = 5104200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/15"),
        Open = 35.6m,
        High = 35.75m,
        Low = 34.78m,
        Close = 35.27m,
        Volume = 4321400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/16"),
        Open = 35.27m,
        High = 35.55m,
        Low = 34.88m,
        Close = 35.12m,
        Volume = 3414200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/17"),
        Open = 35.3m,
        High = 35.45m,
        Low = 33.51m,
        Close = 33.7m,
        Volume = 4086900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/18"),
        Open = 33.95m,
        High = 34.08m,
        Low = 32.51m,
        Close = 32.86m,
        Volume = 5470200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/19"),
        Open = 33.36m,
        High = 33.75m,
        Low = 32.8m,
        Close = 33.45m,
        Volume = 3229100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/22"),
        Open = 33.8m,
        High = 34.6m,
        Low = 33.54m,
        Close = 33.7m,
        Volume = 3397400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/23"),
        Open = 34.02m,
        High = 34.55m,
        Low = 33.8m,
        Close = 33.89m,
        Volume = 3913200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/24"),
        Open = 34.65m,
        High = 34.96m,
        Low = 33.99m,
        Close = 34.24m,
        Volume = 3793600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/25"),
        Open = 34.1m,
        High = 35.95m,
        Low = 33.63m,
        Close = 35.9m,
        Volume = 5191300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/26"),
        Open = 36.1m,
        High = 39.78m,
        Low = 36.05m,
        Close = 37.68m,
        Volume = 11355900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/29"),
        Open = 35.88m,
        High = 35.9m,
        Low = 33.5m,
        Close = 33.75m,
        Volume = 9998000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/30"),
        Open = 33.65m,
        High = 34.19m,
        Low = 33.03m,
        Close = 33.03m,
        Volume = 5452000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/31"),
        Open = 33.05m,
        High = 33.55m,
        Low = 32.42m,
        Close = 32.6m,
        Volume = 4579900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/01"),
        Open = 32.5m,
        High = 33.5m,
        Low = 32.31m,
        Close = 33.19m,
        Volume = 4548600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/02"),
        Open = 33.49m,
        High = 34.55m,
        Low = 33.21m,
        Close = 34.35m,
        Volume = 4514400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/05"),
        Open = 35m,
        High = 35.52m,
        Low = 34.6m,
        Close = 35.05m,
        Volume = 4348800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/06"),
        Open = 34.9m,
        High = 35.74m,
        Low = 34.3m,
        Close = 35.52m,
        Volume = 3369400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/07"),
        Open = 35.23m,
        High = 35.52m,
        Low = 34.77m,
        Close = 34.89m,
        Volume = 2974200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/08"),
        Open = 35m,
        High = 35.75m,
        Low = 34.6m,
        Close = 34.9m,
        Volume = 2824000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/09"),
        Open = 35.14m,
        High = 35.22m,
        Low = 32.8m,
        Close = 33.24m,
        Volume = 13757400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/12"),
        Open = 33m,
        High = 33.28m,
        Low = 31.58m,
        Close = 33.06m,
        Volume = 6317800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/13"),
        Open = 33.95m,
        High = 33.96m,
        Low = 33.2m,
        Close = 33.61m,
        Volume = 3116300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/14"),
        Open = 33.95m,
        High = 34.25m,
        Low = 33.64m,
        Close = 34.1m,
        Volume = 3688900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/15"),
        Open = 34.1m,
        High = 34.55m,
        Low = 34.08m,
        Close = 34.24m,
        Volume = 2804800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/16"),
        Open = 34.8m,
        High = 35.01m,
        Low = 34.6m,
        Close = 34.99m,
        Volume = 3898100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/19"),
        Open = 35.01m,
        High = 35.45m,
        Low = 34.7m,
        Close = 35.1m,
        Volume = 3802300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/20"),
        Open = 35.2m,
        High = 35.2m,
        Low = 34.86m,
        Close = 34.97m,
        Volume = 3414800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/21"),
        Open = 34.97m,
        High = 34.97m,
        Low = 34.34m,
        Close = 34.7m,
        Volume = 1779400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/23"),
        Open = 35.09m,
        High = 35.65m,
        Low = 34.9m,
        Close = 35.63m,
        Volume = 1156100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/26"),
        Open = 36m,
        High = 36.15m,
        Low = 35.6m,
        Close = 35.89m,
        Volume = 3379300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/27"),
        Open = 36.15m,
        High = 36.25m,
        Low = 35.15m,
        Close = 35.5m,
        Volume = 3342500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/28"),
        Open = 35.14m,
        High = 35.14m,
        Low = 33.95m,
        Close = 34.17m,
        Volume = 3838700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/29"),
        Open = 34.7m,
        High = 35.2m,
        Low = 34.31m,
        Close = 35.15m,
        Volume = 3436100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/30"),
        Open = 34.95m,
        High = 35.1m,
        Low = 34.6m,
        Close = 35.1m,
        Volume = 3518500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/03"),
        Open = 35.1m,
        High = 35.1m,
        Low = 34.03m,
        Close = 35m,
        Volume = 3087700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/04"),
        Open = 35.01m,
        High = 35.39m,
        Low = 34.8m,
        Close = 35.38m,
        Volume = 3197400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/05"),
        Open = 35.5m,
        High = 36.22m,
        Low = 35.43m,
        Close = 35.89m,
        Volume = 4645300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/06"),
        Open = 36.18m,
        High = 37.2m,
        Low = 36.06m,
        Close = 37.11m,
        Volume = 6264700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/07"),
        Open = 37.4m,
        High = 37.55m,
        Low = 36.6m,
        Close = 37.3m,
        Volume = 4492300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/10"),
        Open = 37.32m,
        High = 38.29m,
        Low = 36.71m,
        Close = 36.9m,
        Volume = 3828600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/11"),
        Open = 37.2m,
        High = 37.65m,
        Low = 36.65m,
        Close = 37.07m,
        Volume = 2878600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/12"),
        Open = 37.3m,
        High = 37.3m,
        Low = 36.66m,
        Close = 36.8m,
        Volume = 3968200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/13"),
        Open = 36.45m,
        High = 37.8m,
        Low = 36m,
        Close = 37m,
        Volume = 2711200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/14"),
        Open = 37.15m,
        High = 37.65m,
        Low = 36.82m,
        Close = 37.55m,
        Volume = 2517400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/17"),
        Open = 37.35m,
        High = 37.67m,
        Low = 36.99m,
        Close = 37.06m,
        Volume = 2762900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/18"),
        Open = 36.6m,
        High = 37.43m,
        Low = 36.27m,
        Close = 37.25m,
        Volume = 3165600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/19"),
        Open = 36.35m,
        High = 37.88m,
        Low = 36.31m,
        Close = 37.51m,
        Volume = 4764900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/20"),
        Open = 37.85m,
        High = 39.08m,
        Low = 37.46m,
        Close = 38.14m,
        Volume = 4427600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/21"),
        Open = 38.4m,
        High = 39.2m,
        Low = 38.15m,
        Close = 38.64m,
        Volume = 6478500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/24"),
        Open = 38.54m,
        High = 38.9m,
        Low = 38.28m,
        Close = 38.42m,
        Volume = 1155500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/26"),
        Open = 38.45m,
        High = 38.85m,
        Low = 38.16m,
        Close = 38.6m,
        Volume = 1958700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/27"),
        Open = 38.73m,
        High = 38.84m,
        Low = 38.55m,
        Close = 38.69m,
        Volume = 2167200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/28"),
        Open = 38.93m,
        High = 39.12m,
        Low = 38.69m,
        Close = 39.1m,
        Volume = 2348100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/31"),
        Open = 39.19m,
        High = 39.42m,
        Low = 38.78m,
        Close = 38.78m,
        Volume = 2285800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/02"),
        Open = 38.54m,
        High = 38.67m,
        Low = 37.85m,
        Close = 38.1m,
        Volume = 3522900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/03"),
        Open = 38.4m,
        High = 39m,
        Low = 38.32m,
        Close = 38.75m,
        Volume = 3491400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/04"),
        Open = 39.65m,
        High = 40.4m,
        Low = 39.42m,
        Close = 40.36m,
        Volume = 4080300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/07"),
        Open = 41m,
        High = 41.89m,
        Low = 40.92m,
        Close = 41m,
        Volume = 6092300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/08"),
        Open = 41.47m,
        High = 41.7m,
        Low = 40.02m,
        Close = 40.33m,
        Volume = 4152500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/09"),
        Open = 40.39m,
        High = 40.89m,
        Low = 39.5m,
        Close = 39.9m,
        Volume = 4573100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/10"),
        Open = 40.1m,
        High = 40.25m,
        Low = 39.63m,
        Close = 39.84m,
        Volume = 2652700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/11"),
        Open = 39.84m,
        High = 39.95m,
        Low = 38.6m,
        Close = 38.69m,
        Volume = 3394800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/14"),
        Open = 38.69m,
        High = 38.7m,
        Low = 38.07m,
        Close = 38.25m,
        Volume = 2717400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/15"),
        Open = 38.6m,
        High = 39.49m,
        Low = 38.43m,
        Close = 39.35m,
        Volume = 3240000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/16"),
        Open = 38.65m,
        High = 39.1m,
        Low = 38.02m,
        Close = 38.02m,
        Volume = 3780700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/17"),
        Open = 38.55m,
        High = 38.67m,
        Low = 37.65m,
        Close = 38.33m,
        Volume = 3090700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/18"),
        Open = 38.33m,
        High = 39.62m,
        Low = 38.03m,
        Close = 39.15m,
        Volume = 2804100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/22"),
        Open = 39.7m,
        High = 39.92m,
        Low = 39.27m,
        Close = 39.78m,
        Volume = 2796100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/23"),
        Open = 40.06m,
        High = 40.83m,
        Low = 38m,
        Close = 39.33m,
        Volume = 8881400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/24"),
        Open = 39.6m,
        High = 40.25m,
        Low = 39.4m,
        Close = 40m,
        Volume = 5631300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/25"),
        Open = 40.03m,
        High = 40.48m,
        Low = 39.74m,
        Close = 40.48m,
        Volume = 3083400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/28"),
        Open = 40.72m,
        High = 41m,
        Low = 40.34m,
        Close = 40.9m,
        Volume = 2003600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/29"),
        Open = 41.17m,
        High = 41.29m,
        Low = 40.09m,
        Close = 40.23m,
        Volume = 2634800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/30"),
        Open = 39.85m,
        High = 40.44m,
        Low = 39.05m,
        Close = 40m,
        Volume = 3214200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/31"),
        Open = 40.05m,
        High = 40.95m,
        Low = 39.87m,
        Close = 40.95m,
        Volume = 4355800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/01"),
        Open = 41m,
        High = 41.65m,
        Low = 40.9m,
        Close = 41.46m,
        Volume = 4728700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/04"),
        Open = 41.55m,
        High = 41.81m,
        Low = 40.8m,
        Close = 41.1m,
        Volume = 4485700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/05"),
        Open = 40.85m,
        High = 41.49m,
        Low = 40.5m,
        Close = 40.9m,
        Volume = 3250700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/06"),
        Open = 40.73m,
        High = 41.5m,
        Low = 40.56m,
        Close = 40.98m,
        Volume = 3332900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/07"),
        Open = 41.17m,
        High = 41.46m,
        Low = 40.96m,
        Close = 41.06m,
        Volume = 2139500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/08"),
        Open = 41.05m,
        High = 41.9m,
        Low = 40.81m,
        Close = 41.7m,
        Volume = 2555000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/11"),
        Open = 41.9m,
        High = 43.2m,
        Low = 41.72m,
        Close = 43m,
        Volume = 3962900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/12"),
        Open = 42.75m,
        High = 43.35m,
        Low = 42.61m,
        Close = 43.15m,
        Volume = 4440300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/13"),
        Open = 43.6m,
        High = 44.99m,
        Low = 43.52m,
        Close = 44.9m,
        Volume = 5587400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/14"),
        Open = 44.7m,
        High = 44.8m,
        Low = 44m,
        Close = 44.77m,
        Volume = 3109300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/15"),
        Open = 44.77m,
        High = 45.01m,
        Low = 44.36m,
        Close = 44.9m,
        Volume = 3744900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/19"),
        Open = 44.1m,
        High = 44.13m,
        Low = 43.4m,
        Close = 43.71m,
        Volume = 4567200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/20"),
        Open = 43.8m,
        High = 43.95m,
        Low = 42.55m,
        Close = 43.31m,
        Volume = 4338000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/21"),
        Open = 43.25m,
        High = 45.1m,
        Low = 43.2m,
        Close = 44.21m,
        Volume = 4993600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/22"),
        Open = 43.87m,
        High = 45.07m,
        Low = 43.37m,
        Close = 44.76m,
        Volume = 4148600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/25"),
        Open = 44.75m,
        High = 45m,
        Low = 43.9m,
        Close = 44.94m,
        Volume = 3309100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/26"),
        Open = 44.74m,
        High = 45.46m,
        Low = 44.25m,
        Close = 45.15m,
        Volume = 3875600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/27"),
        Open = 45.65m,
        High = 46.87m,
        Low = 45.42m,
        Close = 45.9m,
        Volume = 4202400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/28"),
        Open = 46.01m,
        High = 47.47m,
        Low = 45.9m,
        Close = 45.96m,
        Volume = 4078800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/01"),
        Open = 46.55m,
        High = 47.84m,
        Low = 46.5m,
        Close = 47.84m,
        Volume = 3934000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/04"),
        Open = 48m,
        High = 49.54m,
        Low = 47.9m,
        Close = 49.13m,
        Volume = 3730200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/05"),
        Open = 49.1m,
        High = 49.1m,
        Low = 47.41m,
        Close = 48.21m,
        Volume = 3583800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/06"),
        Open = 48.22m,
        High = 49.86m,
        Low = 47.74m,
        Close = 49.86m,
        Volume = 3689600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/07"),
        Open = 49.8m,
        High = 50m,
        Low = 47.5m,
        Close = 48.48m,
        Volume = 3820600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/08"),
        Open = 49.5m,
        High = 49.89m,
        Low = 48.93m,
        Close = 49.4m,
        Volume = 4340100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/11"),
        Open = 49.4m,
        High = 51.07m,
        Low = 49.05m,
        Close = 50.88m,
        Volume = 4616000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/12"),
        Open = 49.88m,
        High = 50.48m,
        Low = 49.45m,
        Close = 50.28m,
        Volume = 4087500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/13"),
        Open = 50.18m,
        High = 50.25m,
        Low = 48.9m,
        Close = 49.22m,
        Volume = 3410300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/14"),
        Open = 49.23m,
        High = 49.23m,
        Low = 47.34m,
        Close = 47.61m,
        Volume = 5417600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/15"),
        Open = 47.68m,
        High = 47.99m,
        Low = 46.41m,
        Close = 47.98m,
        Volume = 6354200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/18"),
        Open = 48.27m,
        High = 48.44m,
        Low = 46.77m,
        Close = 47.63m,
        Volume = 3091100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/19"),
        Open = 47.63m,
        High = 48.25m,
        Low = 47.22m,
        Close = 48.04m,
        Volume = 2764200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/20"),
        Open = 47.6m,
        High = 47.65m,
        Low = 46.9m,
        Close = 47.03m,
        Volume = 2385500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/21"),
        Open = 46.73m,
        High = 47.85m,
        Low = 46.11m,
        Close = 47.67m,
        Volume = 2972100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/22"),
        Open = 47m,
        High = 47.25m,
        Low = 46.12m,
        Close = 46.39m,
        Volume = 2973100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/25"),
        Open = 46.2m,
        High = 46.85m,
        Low = 45.25m,
        Close = 45.72m,
        Volume = 2528400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/26"),
        Open = 45.85m,
        High = 46.65m,
        Low = 45.54m,
        Close = 45.79m,
        Volume = 2276100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/27"),
        Open = 46.05m,
        High = 47.76m,
        Low = 46.05m,
        Close = 47.33m,
        Volume = 4900900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/28"),
        Open = 47.57m,
        High = 48.72m,
        Low = 47.5m,
        Close = 48.25m,
        Volume = 4074500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/01"),
        Open = 48.25m,
        High = 48.75m,
        Low = 47.8m,
        Close = 47.92m,
        Volume = 2992400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/02"),
        Open = 47.92m,
        High = 49.55m,
        Low = 47.62m,
        Close = 49.09m,
        Volume = 3423300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/03"),
        Open = 48.65m,
        High = 49.85m,
        Low = 48.56m,
        Close = 48.73m,
        Volume = 4746700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/04"),
        Open = 48.73m,
        High = 49.5m,
        Low = 48.56m,
        Close = 49.08m,
        Volume = 2656100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/05"),
        Open = 49.45m,
        High = 49.68m,
        Low = 47.4m,
        Close = 48.29m,
        Volume = 2653600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/08"),
        Open = 47.9m,
        High = 49.12m,
        Low = 47.59m,
        Close = 49m,
        Volume = 2403100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/09"),
        Open = 49m,
        High = 49.14m,
        Low = 48.3m,
        Close = 48.57m,
        Volume = 2181400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/10"),
        Open = 48.57m,
        High = 49.73m,
        Low = 48.39m,
        Close = 49.58m,
        Volume = 3427000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/11"),
        Open = 49.8m,
        High = 50.05m,
        Low = 48.6m,
        Close = 48.82m,
        Volume = 3752600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/12"),
        Open = 49.25m,
        High = 49.29m,
        Low = 48.23m,
        Close = 48.55m,
        Volume = 2058600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/15"),
        Open = 48.2m,
        High = 48.45m,
        Low = 47.53m,
        Close = 47.65m,
        Volume = 2009400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/16"),
        Open = 48.45m,
        High = 48.98m,
        Low = 48.19m,
        Close = 48.7m,
        Volume = 2103100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/17"),
        Open = 47.55m,
        High = 47.56m,
        Low = 45m,
        Close = 45.37m,
        Volume = 10675700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/18"),
        Open = 45.38m,
        High = 45.38m,
        Low = 41.99m,
        Close = 43.7m,
        Volume = 16715600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/19"),
        Open = 44.06m,
        High = 44.3m,
        Low = 42.74m,
        Close = 42.75m,
        Volume = 8422000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/22"),
        Open = 42.8m,
        High = 43.38m,
        Low = 42.4m,
        Close = 43.14m,
        Volume = 4344100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/23"),
        Open = 43.19m,
        High = 43.77m,
        Low = 42m,
        Close = 42.5m,
        Volume = 5396700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/24"),
        Open = 42.9m,
        High = 43.23m,
        Low = 42.35m,
        Close = 42.4m,
        Volume = 3300700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/25"),
        Open = 42.25m,
        High = 43m,
        Low = 41m,
        Close = 41.9m,
        Volume = 4282200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/26"),
        Open = 42m,
        High = 42.46m,
        Low = 41.3m,
        Close = 41.51m,
        Volume = 2737800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/29"),
        Open = 43.7m,
        High = 43.99m,
        Low = 43.1m,
        Close = 43.63m,
        Volume = 6449000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/30"),
        Open = 43.8m,
        High = 45.73m,
        Low = 43.48m,
        Close = 44.6m,
        Volume = 5494700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/01"),
        Open = 44.9m,
        High = 45.5m,
        Low = 43.83m,
        Close = 45.5m,
        Volume = 4285600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/02"),
        Open = 45.49m,
        High = 45.5m,
        Low = 44.48m,
        Close = 44.87m,
        Volume = 2616800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/03"),
        Open = 44.67m,
        High = 45.1m,
        Low = 43.85m,
        Close = 44.63m,
        Volume = 2112400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/06"),
        Open = 45m,
        High = 45.21m,
        Low = 43.33m,
        Close = 43.38m,
        Volume = 2513100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/07"),
        Open = 43.6m,
        High = 43.85m,
        Low = 42.8m,
        Close = 43.14m,
        Volume = 3436300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/08"),
        Open = 43.3m,
        High = 44.74m,
        Low = 43.3m,
        Close = 44.41m,
        Volume = 2813100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/09"),
        Open = 44.6m,
        High = 45.24m,
        Low = 44.5m,
        Close = 44.98m,
        Volume = 2394600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/10"),
        Open = 44.4m,
        High = 44.75m,
        Low = 43.55m,
        Close = 43.63m,
        Volume = 4259500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/13"),
        Open = 43.9m,
        High = 44.62m,
        Low = 43.76m,
        Close = 44.28m,
        Volume = 2399300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/14"),
        Open = 45.58m,
        High = 45.74m,
        Low = 44.64m,
        Close = 45.48m,
        Volume = 3425900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/15"),
        Open = 45.38m,
        High = 45.38m,
        Low = 44.51m,
        Close = 44.55m,
        Volume = 2203300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/16"),
        Open = 44.85m,
        High = 45.18m,
        Low = 44.52m,
        Close = 45m,
        Volume = 2251700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/17"),
        Open = 45.23m,
        High = 45.61m,
        Low = 44.8m,
        Close = 45.42m,
        Volume = 2417300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/20"),
        Open = 45.64m,
        High = 46.03m,
        Low = 44.87m,
        Close = 45.13m,
        Volume = 2434400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/21"),
        Open = 45.14m,
        High = 45.75m,
        Low = 44.11m,
        Close = 44.35m,
        Volume = 2587200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/22"),
        Open = 44.25m,
        High = 44.59m,
        Low = 43.29m,
        Close = 44.41m,
        Volume = 2428900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/23"),
        Open = 43.83m,
        High = 44.5m,
        Low = 43.39m,
        Close = 44.15m,
        Volume = 2621600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/24"),
        Open = 44m,
        High = 44m,
        Low = 43.07m,
        Close = 43.35m,
        Volume = 2197100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/28"),
        Open = 43.35m,
        High = 43.35m,
        Low = 42.75m,
        Close = 43m,
        Volume = 2420500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/29"),
        Open = 42.7m,
        High = 43.5m,
        Low = 42.65m,
        Close = 43m,
        Volume = 2907800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/30"),
        Open = 42.6m,
        High = 44.19m,
        Low = 42.46m,
        Close = 43.66m,
        Volume = 3061400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/31"),
        Open = 43.82m,
        High = 44.09m,
        Low = 42.65m,
        Close = 42.65m,
        Volume = 2468600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/03"),
        Open = 43.4m,
        High = 43.87m,
        Low = 41.83m,
        Close = 41.86m,
        Volume = 2895000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/04"),
        Open = 41.87m,
        High = 42.4m,
        Low = 41.45m,
        Close = 41.85m,
        Volume = 2711300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/05"),
        Open = 42.1m,
        High = 42.79m,
        Low = 41.87m,
        Close = 42.54m,
        Volume = 1635700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/06"),
        Open = 42.54m,
        High = 42.77m,
        Low = 41.92m,
        Close = 41.96m,
        Volume = 1760700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/07"),
        Open = 41.96m,
        High = 43.25m,
        Low = 41.75m,
        Close = 42.76m,
        Volume = 2985900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/10"),
        Open = 42.95m,
        High = 43.5m,
        Low = 42.83m,
        Close = 42.92m,
        Volume = 1846000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/11"),
        Open = 43.1m,
        High = 43.8m,
        Low = 42.3m,
        Close = 42.5m,
        Volume = 1812200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/12"),
        Open = 42.62m,
        High = 43.99m,
        Low = 42.6m,
        Close = 43.83m,
        Volume = 2173800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/13"),
        Open = 43.3m,
        High = 43.75m,
        Low = 42.39m,
        Close = 42.5m,
        Volume = 2378700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/14"),
        Open = 42.75m,
        High = 43m,
        Low = 41.78m,
        Close = 42.53m,
        Volume = 2527200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/17"),
        Open = 42.54m,
        High = 44.35m,
        Low = 42.54m,
        Close = 44m,
        Volume = 3016900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/18"),
        Open = 43.95m,
        High = 44.28m,
        Low = 43.4m,
        Close = 43.78m,
        Volume = 1957900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/19"),
        Open = 43.47m,
        High = 44.1m,
        Low = 43.1m,
        Close = 43.13m,
        Volume = 1963600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/20"),
        Open = 43.13m,
        High = 44.49m,
        Low = 43.02m,
        Close = 43.77m,
        Volume = 2661300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/21"),
        Open = 43.03m,
        High = 43.72m,
        Low = 42.74m,
        Close = 42.97m,
        Volume = 3605100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/24"),
        Open = 42.92m,
        High = 43.67m,
        Low = 41.52m,
        Close = 42.74m,
        Volume = 3733000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/25"),
        Open = 43.3m,
        High = 44.12m,
        Low = 42.82m,
        Close = 42.87m,
        Volume = 3937100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/26"),
        Open = 41.87m,
        High = 43.1m,
        Low = 41.87m,
        Close = 42.72m,
        Volume = 3360100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/27"),
        Open = 43m,
        High = 44.88m,
        Low = 42.96m,
        Close = 44.8m,
        Volume = 3373600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/28"),
        Open = 44.35m,
        High = 45.09m,
        Low = 44.1m,
        Close = 45m,
        Volume = 5535800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/01"),
        Open = 44.97m,
        High = 45.28m,
        Low = 44.56m,
        Close = 44.6m,
        Volume = 3473800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/02"),
        Open = 44.4m,
        High = 44.78m,
        Low = 43.86m,
        Close = 44.54m,
        Volume = 2874400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/03"),
        Open = 44.14m,
        High = 44.45m,
        Low = 43.17m,
        Close = 43.77m,
        Volume = 3029300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/05"),
        Open = 44.2m,
        High = 45.2m,
        Low = 44.05m,
        Close = 45m,
        Volume = 1805700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/08"),
        Open = 44.72m,
        High = 45.09m,
        Low = 43.87m,
        Close = 44.1m,
        Volume = 2689400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/09"),
        Open = 43.99m,
        High = 44.69m,
        Low = 43.09m,
        Close = 43.22m,
        Volume = 2621800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/10"),
        Open = 43.52m,
        High = 43.7m,
        Low = 40.46m,
        Close = 40.8m,
        Volume = 6563000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/11"),
        Open = 40.8m,
        High = 41.47m,
        Low = 39.55m,
        Close = 41.17m,
        Volume = 5690400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/12"),
        Open = 41.24m,
        High = 41.49m,
        Low = 39.13m,
        Close = 40.15m,
        Volume = 3220000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/15"),
        Open = 39.85m,
        High = 39.87m,
        Low = 37.2m,
        Close = 39.76m,
        Volume = 5180900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/16"),
        Open = 40.05m,
        High = 41.8m,
        Low = 40.05m,
        Close = 40.87m,
        Volume = 5418600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/17"),
        Open = 42.42m,
        High = 43.19m,
        Low = 42.15m,
        Close = 42.94m,
        Volume = 6335600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/18"),
        Open = 43.09m,
        High = 43.1m,
        Low = 41.23m,
        Close = 41.29m,
        Volume = 3626000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/19"),
        Open = 40.89m,
        High = 41m,
        Low = 39.56m,
        Close = 39.92m,
        Volume = 4253700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/22"),
        Open = 39.8m,
        High = 40.15m,
        Low = 37.58m,
        Close = 38.53m,
        Volume = 5662600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/23"),
        Open = 38.45m,
        High = 39.9m,
        Low = 38.1m,
        Close = 38.85m,
        Volume = 5560500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/24"),
        Open = 37.5m,
        High = 41.37m,
        Low = 37.1m,
        Close = 41.19m,
        Volume = 5493500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/25"),
        Open = 41m,
        High = 42.94m,
        Low = 40.31m,
        Close = 42.94m,
        Volume = 5133200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/26"),
        Open = 42.5m,
        High = 42.51m,
        Low = 40.14m,
        Close = 42m,
        Volume = 3374000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/29"),
        Open = 42.94m,
        High = 42.99m,
        Low = 41.3m,
        Close = 42.03m,
        Volume = 5595200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/30"),
        Open = 41.99m,
        High = 42m,
        Low = 40.6m,
        Close = 41.65m,
        Volume = 5201100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/31"),
        Open = 41.66m,
        High = 41.66m,
        Low = 40.35m,
        Close = 41.52m,
        Volume = 4391400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/01"),
        Open = 41m,
        High = 41.4m,
        Low = 40.35m,
        Close = 40.63m,
        Volume = 3361300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/02"),
        Open = 40.63m,
        High = 40.86m,
        Low = 39.1m,
        Close = 39.85m,
        Volume = 2931400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/05"),
        Open = 39.65m,
        High = 40.27m,
        Low = 38.53m,
        Close = 38.61m,
        Volume = 3146300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/06"),
        Open = 39.01m,
        High = 40.59m,
        Low = 39.01m,
        Close = 39.41m,
        Volume = 3075500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/07"),
        Open = 39.85m,
        High = 41.13m,
        Low = 39.7m,
        Close = 41.1m,
        Volume = 3484000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/08"),
        Open = 41m,
        High = 41.6m,
        Low = 40.25m,
        Close = 41.5m,
        Volume = 3806300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/09"),
        Open = 41.1m,
        High = 41.65m,
        Low = 40.41m,
        Close = 41m,
        Volume = 3368000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/12"),
        Open = 40.15m,
        High = 40.65m,
        Low = 39.55m,
        Close = 40.5m,
        Volume = 2868700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/13"),
        Open = 39.9m,
        High = 39.91m,
        Low = 37.1m,
        Close = 37.23m,
        Volume = 9540500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/14"),
        Open = 36.83m,
        High = 36.84m,
        Low = 34.1m,
        Close = 36.35m,
        Volume = 12105500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/15"),
        Open = 36.35m,
        High = 37.95m,
        Low = 35.4m,
        Close = 37.49m,
        Volume = 7548300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/16"),
        Open = 38.19m,
        High = 38.4m,
        Low = 36.99m,
        Close = 37.5m,
        Volume = 4649600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/19"),
        Open = 37.51m,
        High = 38.56m,
        Low = 37.41m,
        Close = 38.5m,
        Volume = 3630800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/20"),
        Open = 38.57m,
        High = 38.57m,
        Low = 37.73m,
        Close = 37.88m,
        Volume = 2990800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/21"),
        Open = 38m,
        High = 38.43m,
        Low = 36.91m,
        Close = 37.57m,
        Volume = 2993700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/22"),
        Open = 37.6m,
        High = 38.65m,
        Low = 37.26m,
        Close = 38.5m,
        Volume = 2855900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/23"),
        Open = 38.5m,
        High = 38.5m,
        Low = 36.9m,
        Close = 37.13m,
        Volume = 3583400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/26"),
        Open = 37.13m,
        High = 37.27m,
        Low = 35.85m,
        Close = 36.89m,
        Volume = 3004700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/27"),
        Open = 37.1m,
        High = 37.69m,
        Low = 36.59m,
        Close = 37.03m,
        Volume = 2874400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/28"),
        Open = 37.03m,
        High = 37.85m,
        Low = 36.4m,
        Close = 37.53m,
        Volume = 4112100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/29"),
        Open = 36.73m,
        High = 37.8m,
        Low = 36.35m,
        Close = 37.17m,
        Volume = 3606800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/30"),
        Open = 36.93m,
        High = 37.7m,
        Low = 36.7m,
        Close = 37.07m,
        Volume = 2062500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/03"),
        Open = 36.8m,
        High = 36.85m,
        Low = 35.23m,
        Close = 35.46m,
        Volume = 3485200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/04"),
        Open = 35.5m,
        High = 37.06m,
        Low = 35.25m,
        Close = 36.85m,
        Volume = 2833200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/05"),
        Open = 36.45m,
        High = 36.95m,
        Low = 36m,
        Close = 36.03m,
        Volume = 2968800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/06"),
        Open = 36.58m,
        High = 37.65m,
        Low = 36.54m,
        Close = 37.21m,
        Volume = 2379000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/09"),
        Open = 37.21m,
        High = 37.76m,
        Low = 36.5m,
        Close = 37.35m,
        Volume = 3121700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/10"),
        Open = 37.3m,
        High = 37.78m,
        Low = 36.55m,
        Close = 37.18m,
        Volume = 2615400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/11"),
        Open = 37.43m,
        High = 37.8m,
        Low = 36.92m,
        Close = 37.08m,
        Volume = 2468400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/12"),
        Open = 36.88m,
        High = 37.11m,
        Low = 36.35m,
        Close = 36.45m,
        Volume = 2886600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/13"),
        Open = 35.87m,
        High = 36.17m,
        Low = 35.01m,
        Close = 35.58m,
        Volume = 3558500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/16"),
        Open = 35.9m,
        High = 37.41m,
        Low = 35.9m,
        Close = 37.23m,
        Volume = 3265400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/17"),
        Open = 37.4m,
        High = 37.6m,
        Low = 36.07m,
        Close = 36.29m,
        Volume = 3776900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/18"),
        Open = 36.09m,
        High = 37.15m,
        Low = 36.01m,
        Close = 36.77m,
        Volume = 3418300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/19"),
        Open = 36m,
        High = 36.7m,
        Low = 35.45m,
        Close = 35.52m,
        Volume = 3089900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/20"),
        Open = 35.9m,
        High = 36.75m,
        Low = 35.65m,
        Close = 36.48m,
        Volume = 5040400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/23"),
        Open = 35.9m,
        High = 36m,
        Low = 34.86m,
        Close = 35.4m,
        Volume = 3624000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/24"),
        Open = 35.12m,
        High = 35.7m,
        Low = 34.65m,
        Close = 34.96m,
        Volume = 3649300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/25"),
        Open = 35.1m,
        High = 35.5m,
        Low = 34.5m,
        Close = 35.41m,
        Volume = 3632600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/26"),
        Open = 35.81m,
        High = 36.59m,
        Low = 35.56m,
        Close = 36.55m,
        Volume = 2328100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/27"),
        Open = 36.3m,
        High = 36.3m,
        Low = 34.66m,
        Close = 34.7m,
        Volume = 3478400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/30"),
        Open = 34.4m,
        High = 34.82m,
        Low = 33.2m,
        Close = 34.13m,
        Volume = 4072100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/01"),
        Open = 34.32m,
        High = 36.02m,
        Low = 34.25m,
        Close = 36m,
        Volume = 3355500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/02"),
        Open = 35.5m,
        High = 35.5m,
        Low = 34.13m,
        Close = 34.38m,
        Volume = 2953900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/03"),
        Open = 34.78m,
        High = 35.3m,
        Low = 34.19m,
        Close = 34.31m,
        Volume = 3650900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/04"),
        Open = 34.32m,
        High = 34.32m,
        Low = 31.95m,
        Close = 32.01m,
        Volume = 7042100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/07"),
        Open = 32.22m,
        High = 32.9m,
        Low = 31.63m,
        Close = 32.38m,
        Volume = 4367000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/08"),
        Open = 33m,
        High = 33.01m,
        Low = 31.18m,
        Close = 32.01m,
        Volume = 4234800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/09"),
        Open = 31.4m,
        High = 31.75m,
        Low = 29.95m,
        Close = 30.44m,
        Volume = 6260300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/10"),
        Open = 30.3m,
        High = 31.7m,
        Low = 29.98m,
        Close = 31.35m,
        Volume = 4582900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/11"),
        Open = 31.75m,
        High = 32.65m,
        Low = 31.34m,
        Close = 32m,
        Volume = 4082700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/14"),
        Open = 30.3m,
        High = 31.35m,
        Low = 30.25m,
        Close = 31.06m,
        Volume = 5319100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/15"),
        Open = 31.27m,
        High = 32.41m,
        Low = 31.14m,
        Close = 32.15m,
        Volume = 4654900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/16"),
        Open = 32.16m,
        High = 32.52m,
        Low = 30.27m,
        Close = 30.5m,
        Volume = 7269100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/17"),
        Open = 30.75m,
        High = 31m,
        Low = 29.46m,
        Close = 29.98m,
        Volume = 8574300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/18"),
        Open = 29.25m,
        High = 29.45m,
        Low = 28.53m,
        Close = 29m,
        Volume = 7013300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/21"),
        Open = 29m,
        High = 30.5m,
        Low = 28.58m,
        Close = 30.36m,
        Volume = 5950400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/22"),
        Open = 29.98m,
        High = 30.28m,
        Low = 29.55m,
        Close = 30.14m,
        Volume = 4025700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/23"),
        Open = 29.97m,
        High = 30.71m,
        Low = 29.88m,
        Close = 30.7m,
        Volume = 3164300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/24"),
        Open = 30.87m,
        High = 31.2m,
        Low = 29.7m,
        Close = 29.95m,
        Volume = 4017600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/25"),
        Open = 29.99m,
        High = 30.35m,
        Low = 29.35m,
        Close = 30.32m,
        Volume = 3336200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/28"),
        Open = 30.42m,
        High = 30.8m,
        Low = 28.7m,
        Close = 28.98m,
        Volume = 5205300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/29"),
        Open = 28.9m,
        High = 29.9m,
        Low = 28.54m,
        Close = 29.7m,
        Volume = 4090100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/30"),
        Open = 29.77m,
        High = 30.39m,
        Low = 29.2m,
        Close = 30.2m,
        Volume = 3078200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/31"),
        Open = 30.4m,
        High = 30.52m,
        Low = 29.55m,
        Close = 29.75m,
        Volume = 2865900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/01"),
        Open = 29.79m,
        High = 30.65m,
        Low = 29.56m,
        Close = 30.4m,
        Volume = 2939600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/04"),
        Open = 30.41m,
        High = 30.86m,
        Low = 29.63m,
        Close = 29.67m,
        Volume = 4919500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/05"),
        Open = 29.87m,
        High = 31.98m,
        Low = 29.87m,
        Close = 31.52m,
        Volume = 4739100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/06"),
        Open = 32.04m,
        High = 33.88m,
        Low = 32.01m,
        Close = 33.58m,
        Volume = 8651500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/07"),
        Open = 33.78m,
        High = 33.9m,
        Low = 32.11m,
        Close = 32.29m,
        Volume = 4371900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/08"),
        Open = 32.85m,
        High = 33.6m,
        Low = 32.5m,
        Close = 33.18m,
        Volume = 4239700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/11"),
        Open = 33.18m,
        High = 33.21m,
        Low = 31m,
        Close = 31.23m,
        Volume = 3686300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/12"),
        Open = 31.8m,
        High = 32.1m,
        Low = 31.25m,
        Close = 31.66m,
        Volume = 4498300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/13"),
        Open = 31.63m,
        High = 32.27m,
        Low = 30.87m,
        Close = 31.42m,
        Volume = 3351400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/14"),
        Open = 32.1m,
        High = 32.4m,
        Low = 30.87m,
        Close = 31.35m,
        Volume = 3079800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/15"),
        Open = 31.35m,
        High = 32m,
        Low = 31.04m,
        Close = 31.5m,
        Volume = 2634400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/18"),
        Open = 31.54m,
        High = 31.78m,
        Low = 30.9m,
        Close = 30.92m,
        Volume = 3389900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/19"),
        Open = 31.02m,
        High = 31.65m,
        Low = 30.62m,
        Close = 31.4m,
        Volume = 3510600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/20"),
        Open = 32.1m,
        High = 32.24m,
        Low = 31.2m,
        Close = 31.73m,
        Volume = 3401500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/21"),
        Open = 32.2m,
        High = 33.02m,
        Low = 32.02m,
        Close = 32.44m,
        Volume = 5257200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/22"),
        Open = 32.69m,
        High = 34.43m,
        Low = 32.69m,
        Close = 34m,
        Volume = 5475800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/25"),
        Open = 34.38m,
        High = 34.7m,
        Low = 33.2m,
        Close = 33.49m,
        Volume = 3167400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/26"),
        Open = 33.7m,
        High = 34.05m,
        Low = 33.26m,
        Close = 33.67m,
        Volume = 3133600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/27"),
        Open = 33.53m,
        High = 35.14m,
        Low = 33.53m,
        Close = 35.02m,
        Volume = 3802900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/29"),
        Open = 35.03m,
        High = 35.03m,
        Low = 33.8m,
        Close = 34.05m,
        Volume = 2375900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/02"),
        Open = 34.6m,
        High = 34.88m,
        Low = 33.7m,
        Close = 34.1m,
        Volume = 2625200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/03"),
        Open = 34.49m,
        High = 34.5m,
        Low = 33.75m,
        Close = 34.24m,
        Volume = 2868700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/04"),
        Open = 33.77m,
        High = 34.38m,
        Low = 33.56m,
        Close = 33.93m,
        Volume = 2646900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/05"),
        Open = 33.75m,
        High = 33.76m,
        Low = 32.43m,
        Close = 32.96m,
        Volume = 3851900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/06"),
        Open = 32.4m,
        High = 33.75m,
        Low = 32.23m,
        Close = 33.4m,
        Volume = 3698900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/09"),
        Open = 32.63m,
        High = 33.25m,
        Low = 32.31m,
        Close = 32.4m,
        Volume = 2863700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/10"),
        Open = 32.35m,
        High = 32.6m,
        Low = 32m,
        Close = 32.25m,
        Volume = 3081300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/11"),
        Open = 32.05m,
        High = 32.64m,
        Low = 31.75m,
        Close = 32.53m,
        Volume = 3280800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/12"),
        Open = 32m,
        High = 32.8m,
        Low = 31.8m,
        Close = 32.05m,
        Volume = 2613900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/13"),
        Open = 32.05m,
        High = 32.05m,
        Low = 31.4m,
        Close = 31.4m,
        Volume = 2192500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/16"),
        Open = 31.27m,
        High = 32.1m,
        Low = 31.25m,
        Close = 31.92m,
        Volume = 2939600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/17"),
        Open = 32.06m,
        High = 32.75m,
        Low = 31.84m,
        Close = 31.85m,
        Volume = 2097500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/18"),
        Open = 31.77m,
        High = 32.5m,
        Low = 31.42m,
        Close = 32.02m,
        Volume = 2157700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/19"),
        Open = 31.73m,
        High = 32.48m,
        Low = 31.73m,
        Close = 32.25m,
        Volume = 2652000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/20"),
        Open = 32.92m,
        High = 32.94m,
        Low = 32.29m,
        Close = 32.71m,
        Volume = 4189000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/23"),
        Open = 32.71m,
        High = 32.95m,
        Low = 32.4m,
        Close = 32.79m,
        Volume = 2089400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/24"),
        Open = 33.5m,
        High = 33.5m,
        Low = 32.53m,
        Close = 32.65m,
        Volume = 1084500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/26"),
        Open = 32.85m,
        High = 33.28m,
        Low = 32.52m,
        Close = 32.63m,
        Volume = 1449300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/27"),
        Open = 32.9m,
        High = 33.09m,
        Low = 32.14m,
        Close = 32.33m,
        Volume = 1597200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/30"),
        Open = 32.33m,
        High = 33m,
        Low = 32.33m,
        Close = 32.9m,
        Volume = 2238600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/31"),
        Open = 32.67m,
        High = 33.13m,
        Low = 32.47m,
        Close = 32.99m,
        Volume = 2058000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/02"),
        Open = 33m,
        High = 33.92m,
        Low = 33m,
        Close = 33.88m,
        Volume = 2099500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/03"),
        Open = 34.1m,
        High = 34.44m,
        Low = 33.89m,
        Close = 34.18m,
        Volume = 2296100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/06"),
        Open = 34.05m,
        High = 34.56m,
        Low = 33.96m,
        Close = 34.13m,
        Volume = 2198400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/07"),
        Open = 34.12m,
        High = 34.13m,
        Low = 33.03m,
        Close = 33.3m,
        Volume = 2914300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/08"),
        Open = 33.37m,
        High = 33.5m,
        Low = 33.03m,
        Close = 33.5m,
        Volume = 3027800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/09"),
        Open = 33.75m,
        High = 34.05m,
        Low = 33.37m,
        Close = 33.9m,
        Volume = 2791000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/10"),
        Open = 33.9m,
        High = 34.1m,
        Low = 33.43m,
        Close = 33.85m,
        Volume = 3074400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/13"),
        Open = 34.15m,
        High = 34.59m,
        Low = 33.75m,
        Close = 34.3m,
        Volume = 3033500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/14"),
        Open = 34.15m,
        High = 34.24m,
        Low = 33.82m,
        Close = 34.15m,
        Volume = 1855600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/15"),
        Open = 34.05m,
        High = 34.39m,
        Low = 33.25m,
        Close = 33.35m,
        Volume = 2195000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/16"),
        Open = 33.8m,
        High = 34.24m,
        Low = 33.28m,
        Close = 33.46m,
        Volume = 2389300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/17"),
        Open = 33.35m,
        High = 33.73m,
        Low = 33.03m,
        Close = 33.29m,
        Volume = 2031200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/21"),
        Open = 33.29m,
        High = 33.31m,
        Low = 32.27m,
        Close = 32.4m,
        Volume = 2463000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/22"),
        Open = 32.05m,
        High = 32.7m,
        Low = 31.76m,
        Close = 31.78m,
        Volume = 3161500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/23"),
        Open = 31.8m,
        High = 32.27m,
        Low = 31.78m,
        Close = 31.85m,
        Volume = 2426200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/24"),
        Open = 31.8m,
        High = 31.85m,
        Low = 31m,
        Close = 31.01m,
        Volume = 2448300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/27"),
        Open = 31.05m,
        High = 31.25m,
        Low = 30.6m,
        Close = 30.62m,
        Volume = 2383700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/28"),
        Open = 30.74m,
        High = 31.55m,
        Low = 30.59m,
        Close = 31.45m,
        Volume = 2408600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/29"),
        Open = 31.46m,
        High = 31.46m,
        Low = 30.5m,
        Close = 30.61m,
        Volume = 2783000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/30"),
        Open = 29.97m,
        High = 31.3m,
        Low = 29.73m,
        Close = 30.66m,
        Volume = 3758500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/31"),
        Open = 31.11m,
        High = 32.22m,
        Low = 31m,
        Close = 31.59m,
        Volume = 3635100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/03"),
        Open = 30.12m,
        High = 31.5m,
        Low = 30.12m,
        Close = 31.11m,
        Volume = 3992800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/04"),
        Open = 30.8m,
        High = 31.42m,
        Low = 30.5m,
        Close = 31.24m,
        Volume = 3102800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/05"),
        Open = 31.07m,
        High = 31.63m,
        Low = 30.54m,
        Close = 30.67m,
        Volume = 3072200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/06"),
        Open = 30.66m,
        High = 30.97m,
        Low = 30.33m,
        Close = 30.55m,
        Volume = 2226600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/07"),
        Open = 30.65m,
        High = 30.9m,
        Low = 29.9m,
        Close = 30m,
        Volume = 2222500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/10"),
        Open = 30.1m,
        High = 30.48m,
        Low = 29.89m,
        Close = 30.27m,
        Volume = 2270300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/11"),
        Open = 30.27m,
        High = 30.51m,
        Low = 29.57m,
        Close = 29.84m,
        Volume = 2723800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/12"),
        Open = 29.8m,
        High = 29.89m,
        Low = 29.36m,
        Close = 29.63m,
        Volume = 2523400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/13"),
        Open = 30m,
        High = 30m,
        Low = 28.9m,
        Close = 29.5m,
        Volume = 2852300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/14"),
        Open = 29.45m,
        High = 30.47m,
        Low = 29.43m,
        Close = 30.15m,
        Volume = 2933400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/18"),
        Open = 30.5m,
        High = 30.8m,
        Low = 29.88m,
        Close = 30m,
        Volume = 2662600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/19"),
        Open = 30m,
        High = 30.18m,
        Low = 29.59m,
        Close = 30.18m,
        Volume = 2175100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/20"),
        Open = 30.18m,
        High = 30.2m,
        Low = 28.2m,
        Close = 29.17m,
        Volume = 7105300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/21"),
        Open = 29m,
        High = 29.64m,
        Low = 28.43m,
        Close = 29.64m,
        Volume = 4521300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/24"),
        Open = 29.17m,
        High = 29.64m,
        Low = 28.4m,
        Close = 28.49m,
        Volume = 4325000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/25"),
        Open = 28.44m,
        High = 28.5m,
        Low = 28m,
        Close = 28.19m,
        Volume = 4802900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/26"),
        Open = 29m,
        High = 29m,
        Low = 27.64m,
        Close = 27.84m,
        Volume = 3838700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/27"),
        Open = 28.11m,
        High = 28.31m,
        Low = 27.66m,
        Close = 27.95m,
        Volume = 3050000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/28"),
        Open = 28m,
        High = 28.12m,
        Low = 27.24m,
        Close = 27.56m,
        Volume = 3926000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/03"),
        Open = 27.7m,
        High = 27.8m,
        Low = 27.02m,
        Close = 27.11m,
        Volume = 4039700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/04"),
        Open = 27.1m,
        High = 27.82m,
        Low = 26.91m,
        Close = 27.45m,
        Volume = 5454800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/05"),
        Open = 27.45m,
        High = 27.45m,
        Low = 26.53m,
        Close = 26.74m,
        Volume = 5300100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/06"),
        Open = 26.94m,
        High = 26.94m,
        Low = 26m,
        Close = 26.16m,
        Volume = 4494600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/07"),
        Open = 25.8m,
        High = 25.94m,
        Low = 25.4m,
        Close = 25.84m,
        Volume = 6251500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/10"),
        Open = 26m,
        High = 26.2m,
        Low = 25.46m,
        Close = 25.52m,
        Volume = 3678600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/11"),
        Open = 25.63m,
        High = 25.84m,
        Low = 25.11m,
        Close = 25.22m,
        Volume = 3378200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/12"),
        Open = 25.15m,
        High = 25.42m,
        Low = 24.73m,
        Close = 25.15m,
        Volume = 4213800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/13"),
        Open = 25.42m,
        High = 25.52m,
        Low = 24.9m,
        Close = 25.35m,
        Volume = 6456400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/14"),
        Open = 25.25m,
        High = 26.25m,
        Low = 25.18m,
        Close = 25.55m,
        Volume = 6318800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/17"),
        Open = 25.5m,
        High = 27.09m,
        Low = 25.32m,
        Close = 26.9m,
        Volume = 5832200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/18"),
        Open = 27.37m,
        High = 28.42m,
        Low = 27m,
        Close = 27.83m,
        Volume = 5960100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/19"),
        Open = 27.86m,
        High = 28.35m,
        Low = 27.55m,
        Close = 27.95m,
        Volume = 3533900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/20"),
        Open = 27.9m,
        High = 28.16m,
        Low = 27.37m,
        Close = 27.82m,
        Volume = 3708700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/21"),
        Open = 28.24m,
        High = 28.25m,
        Low = 27.01m,
        Close = 28.1m,
        Volume = 6539600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/24"),
        Open = 27.8m,
        High = 27.8m,
        Low = 26.94m,
        Close = 27.03m,
        Volume = 3679000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/25"),
        Open = 27.1m,
        High = 27.65m,
        Low = 26.83m,
        Close = 27.37m,
        Volume = 3887300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/26"),
        Open = 27.37m,
        High = 27.4m,
        Low = 26.21m,
        Close = 26.4m,
        Volume = 5788500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/27"),
        Open = 26.4m,
        High = 26.56m,
        Low = 25.9m,
        Close = 26.52m,
        Volume = 4389100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/28"),
        Open = 26.3m,
        High = 26.3m,
        Low = 25.99m,
        Close = 26.1m,
        Volume = 3035200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/31"),
        Open = 26.11m,
        High = 26.11m,
        Low = 24.85m,
        Close = 25.06m,
        Volume = 5606100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/01"),
        Open = 25.15m,
        High = 25.96m,
        Low = 25.15m,
        Close = 25.67m,
        Volume = 5610300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/02"),
        Open = 26.33m,
        High = 26.76m,
        Low = 25.9m,
        Close = 26.66m,
        Volume = 4835600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/03"),
        Open = 27.25m,
        High = 27.25m,
        Low = 26.43m,
        Close = 26.55m,
        Volume = 3485100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/04"),
        Open = 27.03m,
        High = 27.03m,
        Low = 26.1m,
        Close = 26.5m,
        Volume = 3367400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/07"),
        Open = 27.56m,
        High = 27.8m,
        Low = 27.04m,
        Close = 27.4m,
        Volume = 4908900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/08"),
        Open = 27.15m,
        High = 27.72m,
        Low = 26.9m,
        Close = 27.36m,
        Volume = 3947700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/09"),
        Open = 27.68m,
        High = 28.05m,
        Low = 27.32m,
        Close = 27.48m,
        Volume = 4063800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/10"),
        Open = 27.48m,
        High = 27.48m,
        Low = 26.42m,
        Close = 27.09m,
        Volume = 4908400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/11"),
        Open = 26.9m,
        High = 27.1m,
        Low = 25.7m,
        Close = 26.47m,
        Volume = 4935800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/14"),
        Open = 26.48m,
        High = 27.25m,
        Low = 26.35m,
        Close = 27.25m,
        Volume = 3530500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/15"),
        Open = 27.25m,
        High = 27.29m,
        Low = 26.55m,
        Close = 27.29m,
        Volume = 4145100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/16"),
        Open = 27.36m,
        High = 27.46m,
        Low = 26.56m,
        Close = 26.64m,
        Volume = 3334300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/17"),
        Open = 26.64m,
        High = 26.72m,
        Low = 26.03m,
        Close = 26.65m,
        Volume = 4469700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/21"),
        Open = 26.65m,
        High = 27.11m,
        Low = 26.65m,
        Close = 26.78m,
        Volume = 3540700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/22"),
        Open = 26.6m,
        High = 27.9m,
        Low = 26.59m,
        Close = 27.8m,
        Volume = 6337400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/23"),
        Open = 27.92m,
        High = 28.66m,
        Low = 27.52m,
        Close = 28.14m,
        Volume = 8853200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/24"),
        Open = 27.94m,
        High = 28.44m,
        Low = 27.52m,
        Close = 27.63m,
        Volume = 5166300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/25"),
        Open = 27.83m,
        High = 27.85m,
        Low = 27.16m,
        Close = 27.19m,
        Volume = 3785000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/28"),
        Open = 26.8m,
        High = 27.46m,
        Low = 26.2m,
        Close = 27.38m,
        Volume = 5369300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/29"),
        Open = 27.38m,
        High = 27.84m,
        Low = 27.38m,
        Close = 27.76m,
        Volume = 4225900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/30"),
        Open = 27.4m,
        High = 27.62m,
        Low = 27.23m,
        Close = 27.28m,
        Volume = 5380100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/01"),
        Open = 27.17m,
        High = 27.3m,
        Low = 27m,
        Close = 27.11m,
        Volume = 3210600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/02"),
        Open = 27.55m,
        High = 28.77m,
        Low = 27.49m,
        Close = 28.62m,
        Volume = 5663000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/05"),
        Open = 28.2m,
        High = 28.39m,
        Low = 27.45m,
        Close = 27.62m,
        Volume = 6992200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/06"),
        Open = 27.5m,
        High = 28.26m,
        Low = 27.4m,
        Close = 28.14m,
        Volume = 5436600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/07"),
        Open = 28.14m,
        High = 28.97m,
        Low = 28.01m,
        Close = 28.38m,
        Volume = 4643800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/08"),
        Open = 28m,
        High = 28.41m,
        Low = 27.94m,
        Close = 28.14m,
        Volume = 2908100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/09"),
        Open = 28.55m,
        High = 29.1m,
        Low = 28.3m,
        Close = 29.1m,
        Volume = 4107000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/12"),
        Open = 29.15m,
        High = 29.98m,
        Low = 28.35m,
        Close = 29.82m,
        Volume = 5072000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/13"),
        Open = 29.78m,
        High = 29.78m,
        Low = 29.29m,
        Close = 29.55m,
        Volume = 3756900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/14"),
        Open = 29.7m,
        High = 29.83m,
        Low = 29.13m,
        Close = 29.49m,
        Volume = 3383200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/15"),
        Open = 29.55m,
        High = 30.25m,
        Low = 29.5m,
        Close = 30.16m,
        Volume = 4670800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/16"),
        Open = 30.6m,
        High = 31m,
        Low = 30.1m,
        Close = 30.42m,
        Volume = 5175800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/19"),
        Open = 29.5m,
        High = 30.34m,
        Low = 28.95m,
        Close = 29.07m,
        Volume = 4524200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/20"),
        Open = 29.17m,
        High = 29.25m,
        Low = 28.62m,
        Close = 28.93m,
        Volume = 3735600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/21"),
        Open = 28.8m,
        High = 29.3m,
        Low = 28.55m,
        Close = 28.8m,
        Volume = 3224200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/22"),
        Open = 28.8m,
        High = 29.25m,
        Low = 28.76m,
        Close = 29.1m,
        Volume = 2479900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/23"),
        Open = 29.02m,
        High = 30.61m,
        Low = 28.76m,
        Close = 29.99m,
        Volume = 5741300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/27"),
        Open = 30.1m,
        High = 30.1m,
        Low = 29.41m,
        Close = 29.9m,
        Volume = 4638600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/28"),
        Open = 29.95m,
        High = 30.65m,
        Low = 29.9m,
        Close = 30.38m,
        Volume = 4228700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/29"),
        Open = 30.55m,
        High = 30.86m,
        Low = 29.81m,
        Close = 29.95m,
        Volume = 3547200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/30"),
        Open = 30.35m,
        High = 30.86m,
        Low = 30.15m,
        Close = 30.67m,
        Volume = 4049000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/02"),
        Open = 31m,
        High = 32.47m,
        Low = 31m,
        Close = 31.96m,
        Volume = 7338200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/03"),
        Open = 31.96m,
        High = 32.15m,
        Low = 31.7m,
        Close = 32.11m,
        Volume = 4376300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/04"),
        Open = 32.12m,
        High = 33.64m,
        Low = 32.03m,
        Close = 33.55m,
        Volume = 7322800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/05"),
        Open = 33.55m,
        High = 33.95m,
        Low = 33.26m,
        Close = 33.68m,
        Volume = 4625900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/06"),
        Open = 34.15m,
        High = 35.18m,
        Low = 33.95m,
        Close = 34.86m,
        Volume = 6731100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/09"),
        Open = 34.4m,
        High = 34.7m,
        Low = 32.83m,
        Close = 33.17m,
        Volume = 5926500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/10"),
        Open = 34m,
        High = 35.24m,
        Low = 33.5m,
        Close = 34.31m,
        Volume = 6209100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/11"),
        Open = 34.31m,
        High = 35.4m,
        Low = 34m,
        Close = 35.4m,
        Volume = 5211100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/12"),
        Open = 35.6m,
        High = 35.9m,
        Low = 34.93m,
        Close = 35.75m,
        Volume = 4868200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/13"),
        Open = 35.75m,
        High = 35.94m,
        Low = 35.03m,
        Close = 35.34m,
        Volume = 5015200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/16"),
        Open = 36.2m,
        High = 36.44m,
        Low = 35.4m,
        Close = 36.41m,
        Volume = 4416900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/17"),
        Open = 37.1m,
        High = 37.36m,
        Low = 35.53m,
        Close = 36.15m,
        Volume = 5794500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/18"),
        Open = 36m,
        High = 36.01m,
        Low = 35.26m,
        Close = 35.83m,
        Volume = 8141300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/19"),
        Open = 35.45m,
        High = 35.72m,
        Low = 35.1m,
        Close = 35.5m,
        Volume = 4611000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/20"),
        Open = 35.5m,
        High = 35.83m,
        Low = 35.2m,
        Close = 35.53m,
        Volume = 5815800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/23"),
        Open = 35.53m,
        High = 35.53m,
        Low = 34.35m,
        Close = 34.46m,
        Volume = 4724700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/24"),
        Open = 34.36m,
        High = 35.1m,
        Low = 34.32m,
        Close = 34.5m,
        Volume = 4052900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/25"),
        Open = 34.54m,
        High = 35.15m,
        Low = 34.24m,
        Close = 34.41m,
        Volume = 2337800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/26"),
        Open = 34.22m,
        High = 34.88m,
        Low = 34.12m,
        Close = 34.4m,
        Volume = 2779200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/27"),
        Open = 34.3m,
        High = 34.8m,
        Low = 34.2m,
        Close = 34.22m,
        Volume = 2348600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/30"),
        Open = 34.9m,
        High = 34.9m,
        Low = 34.03m,
        Close = 34.32m,
        Volume = 4751300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/01"),
        Open = 33.99m,
        High = 34.75m,
        Low = 33.89m,
        Close = 34.65m,
        Volume = 5553200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/02"),
        Open = 34.42m,
        High = 34.93m,
        Low = 34.25m,
        Close = 34.8m,
        Volume = 3988400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/03"),
        Open = 33.75m,
        High = 34.66m,
        Low = 33.75m,
        Close = 34.58m,
        Volume = 1907800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/07"),
        Open = 34.88m,
        High = 35.2m,
        Low = 34.71m,
        Close = 35.01m,
        Volume = 3635600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/08"),
        Open = 35.12m,
        High = 35.2m,
        Low = 34.38m,
        Close = 34.99m,
        Volume = 3123400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/09"),
        Open = 35m,
        High = 35.55m,
        Low = 34.63m,
        Close = 35.23m,
        Volume = 3450200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/10"),
        Open = 34.83m,
        High = 35.15m,
        Low = 34.51m,
        Close = 34.69m,
        Volume = 2101200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/11"),
        Open = 34.72m,
        High = 35.18m,
        Low = 34.66m,
        Close = 35.18m,
        Volume = 2083300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/14"),
        Open = 35.4m,
        High = 35.43m,
        Low = 34.5m,
        Close = 34.58m,
        Volume = 4104200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/15"),
        Open = 34.45m,
        High = 34.45m,
        Low = 33m,
        Close = 33.44m,
        Volume = 9248900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/16"),
        Open = 33.25m,
        High = 33.95m,
        Low = 33.07m,
        Close = 33.39m,
        Volume = 3687800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/17"),
        Open = 33.15m,
        High = 33.56m,
        Low = 32.12m,
        Close = 33.17m,
        Volume = 3510700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/18"),
        Open = 33.21m,
        High = 33.35m,
        Low = 32.52m,
        Close = 33.35m,
        Volume = 4030500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/21"),
        Open = 33m,
        High = 33m,
        Low = 32.14m,
        Close = 32.35m,
        Volume = 4486800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/22"),
        Open = 32.2m,
        High = 32.75m,
        Low = 32.2m,
        Close = 32.57m,
        Volume = 4446800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/23"),
        Open = 32.56m,
        High = 33.25m,
        Low = 31.75m,
        Close = 32.69m,
        Volume = 4801000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/24"),
        Open = 32.6m,
        High = 32.85m,
        Low = 32.19m,
        Close = 32.2m,
        Volume = 5763400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/25"),
        Open = 31.45m,
        High = 32.77m,
        Low = 30.05m,
        Close = 32.68m,
        Volume = 4211100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/28"),
        Open = 32.68m,
        High = 32.99m,
        Low = 32.5m,
        Close = 32.77m,
        Volume = 3303900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/29"),
        Open = 32.6m,
        High = 32.87m,
        Low = 31.99m,
        Close = 32.05m,
        Volume = 3494400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/30"),
        Open = 32m,
        High = 32.56m,
        Low = 32m,
        Close = 32.52m,
        Volume = 3241300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/31"),
        Open = 32.62m,
        High = 33.4m,
        Low = 32.62m,
        Close = 33.12m,
        Volume = 5180800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/01"),
        Open = 32.71m,
        High = 33m,
        Low = 32.38m,
        Close = 32.42m,
        Volume = 3530700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/04"),
        Open = 32.2m,
        High = 32.65m,
        Low = 31.95m,
        Close = 32.22m,
        Volume = 3231400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/05"),
        Open = 31.96m,
        High = 32.18m,
        Low = 31.22m,
        Close = 31.22m,
        Volume = 3887700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/06"),
        Open = 31.25m,
        High = 32.26m,
        Low = 31m,
        Close = 31.91m,
        Volume = 3216400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/07"),
        Open = 31.72m,
        High = 31.98m,
        Low = 31.35m,
        Close = 31.93m,
        Volume = 1663200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/08"),
        Open = 31.93m,
        High = 32.53m,
        Low = 31.92m,
        Close = 32.25m,
        Volume = 2742700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/11"),
        Open = 32.4m,
        High = 32.55m,
        Low = 31.71m,
        Close = 32.22m,
        Volume = 2164900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/12"),
        Open = 32.12m,
        High = 32.62m,
        Low = 32.06m,
        Close = 32.61m,
        Volume = 2033300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/13"),
        Open = 32.44m,
        High = 32.73m,
        Low = 32.23m,
        Close = 32.38m,
        Volume = 1829900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/14"),
        Open = 32.5m,
        High = 33.05m,
        Low = 32.12m,
        Close = 32.98m,
        Volume = 2240600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/15"),
        Open = 33.15m,
        High = 33.15m,
        Low = 32.66m,
        Close = 32.94m,
        Volume = 1585100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/18"),
        Open = 33.1m,
        High = 33.66m,
        Low = 33m,
        Close = 33.58m,
        Volume = 2984900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/19"),
        Open = 33.63m,
        High = 34.35m,
        Low = 33.53m,
        Close = 34.33m,
        Volume = 4370600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/20"),
        Open = 34.33m,
        High = 34.63m,
        Low = 33.97m,
        Close = 34.36m,
        Volume = 3063100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/21"),
        Open = 34.5m,
        High = 35.25m,
        Low = 34.48m,
        Close = 34.94m,
        Volume = 3911800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/22"),
        Open = 35.65m,
        High = 36.28m,
        Low = 35.45m,
        Close = 35.68m,
        Volume = 6336600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/25"),
        Open = 35.67m,
        High = 35.77m,
        Low = 35.13m,
        Close = 35.3m,
        Volume = 2970500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/26"),
        Open = 35.2m,
        High = 35.8m,
        Low = 35.11m,
        Close = 35.71m,
        Volume = 3392900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/27"),
        Open = 35.65m,
        High = 36.35m,
        Low = 35.34m,
        Close = 36.14m,
        Volume = 3780900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/28"),
        Open = 36.14m,
        High = 37.07m,
        Low = 36.02m,
        Close = 36.98m,
        Volume = 3967400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/29"),
        Open = 36.9m,
        High = 37.46m,
        Low = 36.58m,
        Close = 37.39m,
        Volume = 2705100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/02"),
        Open = 37.49m,
        High = 37.78m,
        Low = 37.24m,
        Close = 37.69m,
        Volume = 2951500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/03"),
        Open = 37.8m,
        High = 38.9m,
        Low = 37.51m,
        Close = 38.37m,
        Volume = 4865000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/04"),
        Open = 38.37m,
        High = 38.76m,
        Low = 37.79m,
        Close = 37.89m,
        Volume = 3046500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/05"),
        Open = 37.89m,
        High = 37.89m,
        Low = 36.8m,
        Close = 37.16m,
        Volume = 3861300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/08"),
        Open = 37.45m,
        High = 37.59m,
        Low = 36.74m,
        Close = 36.96m,
        Volume = 4602700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/09"),
        Open = 36.75m,
        High = 36.91m,
        Low = 36.25m,
        Close = 36.33m,
        Volume = 3442400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/10"),
        Open = 36.1m,
        High = 36.49m,
        Low = 35.33m,
        Close = 35.62m,
        Volume = 4012700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/11"),
        Open = 35.62m,
        High = 36.1m,
        Low = 35.11m,
        Close = 35.72m,
        Volume = 3862000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/12"),
        Open = 35.72m,
        High = 36m,
        Low = 35.47m,
        Close = 35.66m,
        Volume = 3373100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/15"),
        Open = 35.47m,
        High = 35.67m,
        Low = 35.21m,
        Close = 35.5m,
        Volume = 2233100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/16"),
        Open = 35.48m,
        High = 35.95m,
        Low = 35.48m,
        Close = 35.81m,
        Volume = 3015900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/17"),
        Open = 35.72m,
        High = 35.85m,
        Low = 35.43m,
        Close = 35.43m,
        Volume = 1569800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/18"),
        Open = 35.68m,
        High = 36.34m,
        Low = 35.48m,
        Close = 36.14m,
        Volume = 3353600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/19"),
        Open = 36.14m,
        High = 36.6m,
        Low = 35.67m,
        Close = 35.79m,
        Volume = 3346600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/22"),
        Open = 35.45m,
        High = 35.45m,
        Low = 34.71m,
        Close = 34.89m,
        Volume = 2719700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/23"),
        Open = 34.69m,
        High = 35.32m,
        Low = 34.26m,
        Close = 35.15m,
        Volume = 3252700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/24"),
        Open = 34.9m,
        High = 35.08m,
        Low = 34.08m,
        Close = 34.2m,
        Volume = 3007900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/25"),
        Open = 33.96m,
        High = 34.49m,
        Low = 33.66m,
        Close = 33.76m,
        Volume = 3047000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/26"),
        Open = 33.82m,
        High = 34.38m,
        Low = 33.7m,
        Close = 34.01m,
        Volume = 3040000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/29"),
        Open = 34.45m,
        High = 34.85m,
        Low = 34.31m,
        Close = 34.45m,
        Volume = 3372400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/30"),
        Open = 34.15m,
        High = 34.6m,
        Low = 33.89m,
        Close = 34.33m,
        Volume = 2724900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/01"),
        Open = 34.5m,
        High = 35.36m,
        Low = 34.4m,
        Close = 35.34m,
        Volume = 2623400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/02"),
        Open = 35m,
        High = 35.45m,
        Low = 34.81m,
        Close = 35.33m,
        Volume = 2319900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/03"),
        Open = 35.84m,
        High = 36.32m,
        Low = 35.57m,
        Close = 35.85m,
        Volume = 3514600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/06"),
        Open = 35.6m,
        High = 35.92m,
        Low = 35.26m,
        Close = 35.81m,
        Volume = 2127700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/07"),
        Open = 36.1m,
        High = 36.29m,
        Low = 35.53m,
        Close = 36.17m,
        Volume = 2188500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/08"),
        Open = 35.9m,
        High = 36.44m,
        Low = 35.75m,
        Close = 36.28m,
        Volume = 2246500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/09"),
        Open = 36.28m,
        High = 37.26m,
        Low = 36.28m,
        Close = 36.79m,
        Volume = 3630800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/10"),
        Open = 37m,
        High = 37.24m,
        Low = 36.88m,
        Close = 36.95m,
        Volume = 2557900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/13"),
        Open = 36.96m,
        High = 37.3m,
        Low = 36.9m,
        Close = 37.3m,
        Volume = 2159800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/14"),
        Open = 37m,
        High = 37.23m,
        Low = 36.82m,
        Close = 37.15m,
        Volume = 2871300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/15"),
        Open = 36.92m,
        High = 37.09m,
        Low = 36.61m,
        Close = 37m,
        Volume = 2813900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/16"),
        Open = 36.8m,
        High = 37.68m,
        Low = 36.71m,
        Close = 37.45m,
        Volume = 2795400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/17"),
        Open = 37.5m,
        High = 37.75m,
        Low = 37.19m,
        Close = 37.24m,
        Volume = 2141300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/20"),
        Open = 37.05m,
        High = 37.61m,
        Low = 36.92m,
        Close = 37.27m,
        Volume = 1907400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/21"),
        Open = 37.25m,
        High = 37.25m,
        Low = 36.32m,
        Close = 36.6m,
        Volume = 2293900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/22"),
        Open = 36.64m,
        High = 36.64m,
        Low = 35.95m,
        Close = 36.16m,
        Volume = 2122800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/23"),
        Open = 36.16m,
        High = 36.16m,
        Low = 35.52m,
        Close = 35.94m,
        Volume = 2288800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/24"),
        Open = 35.45m,
        High = 36.28m,
        Low = 35.45m,
        Close = 36.28m,
        Volume = 2002400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/27"),
        Open = 36.27m,
        High = 36.49m,
        Low = 35.92m,
        Close = 36.04m,
        Volume = 1524700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/28"),
        Open = 36.05m,
        High = 36.38m,
        Low = 35.31m,
        Close = 36.04m,
        Volume = 3725600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/29"),
        Open = 36.2m,
        High = 38.9m,
        Low = 36.2m,
        Close = 38.5m,
        Volume = 8102300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/30"),
        Open = 39m,
        High = 39.21m,
        Low = 38.68m,
        Close = 38.77m,
        Volume = 5509800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/31"),
        Open = 38.9m,
        High = 39m,
        Low = 38.11m,
        Close = 38.49m,
        Volume = 2970300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/03"),
        Open = 38.54m,
        High = 39.25m,
        Low = 38.54m,
        Close = 38.91m,
        Volume = 2541400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/04"),
        Open = 38.67m,
        High = 39.06m,
        Low = 38.51m,
        Close = 38.73m,
        Volume = 2110000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/05"),
        Open = 38.75m,
        High = 39m,
        Low = 38.31m,
        Close = 38.6m,
        Volume = 2581800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/06"),
        Open = 38.9m,
        High = 39.05m,
        Low = 38.36m,
        Close = 38.89m,
        Volume = 2927800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/07"),
        Open = 39.2m,
        High = 39.23m,
        Low = 38.71m,
        Close = 38.9m,
        Volume = 2572800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/10"),
        Open = 39m,
        High = 39m,
        Low = 38.39m,
        Close = 38.83m,
        Volume = 2260800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/11"),
        Open = 38.85m,
        High = 38.85m,
        Low = 38.06m,
        Close = 38.32m,
        Volume = 2368000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/12"),
        Open = 38.14m,
        High = 39.29m,
        Low = 38.1m,
        Close = 39.07m,
        Volume = 2906600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/13"),
        Open = 40m,
        High = 40.15m,
        Low = 38.5m,
        Close = 39.9m,
        Volume = 4035700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/14"),
        Open = 39.98m,
        High = 40m,
        Low = 38.97m,
        Close = 39.25m,
        Volume = 1873200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/17"),
        Open = 39m,
        High = 39.97m,
        Low = 38.9m,
        Close = 39.74m,
        Volume = 3382600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/18"),
        Open = 39.25m,
        High = 39.67m,
        Low = 38.51m,
        Close = 38.83m,
        Volume = 5336200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/19"),
        Open = 38.6m,
        High = 39.62m,
        Low = 38.53m,
        Close = 39.4m,
        Volume = 2439700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/20"),
        Open = 39.1m,
        High = 39.57m,
        Low = 38.54m,
        Close = 39.35m,
        Volume = 2603700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/21"),
        Open = 39.35m,
        High = 39.48m,
        Low = 38.5m,
        Close = 38.86m,
        Volume = 2779200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/24"),
        Open = 38.86m,
        High = 39.05m,
        Low = 38.02m,
        Close = 38.89m,
        Volume = 6186300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/25"),
        Open = 38.67m,
        High = 38.9m,
        Low = 38.2m,
        Close = 38.26m,
        Volume = 3814500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/26"),
        Open = 38.2m,
        High = 38.38m,
        Low = 37.61m,
        Close = 38.28m,
        Volume = 3464600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/28"),
        Open = 38.38m,
        High = 38.75m,
        Low = 38.24m,
        Close = 38.39m,
        Volume = 1190500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/01"),
        Open = 38m,
        High = 38.68m,
        Low = 37.49m,
        Close = 38.02m,
        Volume = 7139900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/02"),
        Open = 37.8m,
        High = 38.47m,
        Low = 37.6m,
        Close = 37.83m,
        Volume = 6217000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/03"),
        Open = 37.88m,
        High = 38.68m,
        Low = 37.65m,
        Close = 38.52m,
        Volume = 3534900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/04"),
        Open = 38.52m,
        High = 39.2m,
        Low = 38.35m,
        Close = 39.11m,
        Volume = 2931200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/05"),
        Open = 38.86m,
        High = 38.94m,
        Low = 37.87m,
        Close = 38m,
        Volume = 4283200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/08"),
        Open = 38.01m,
        High = 39.12m,
        Low = 38.01m,
        Close = 39.12m,
        Volume = 2935700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/09"),
        Open = 39.05m,
        High = 39.12m,
        Low = 38.15m,
        Close = 38.58m,
        Volume = 3329800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/10"),
        Open = 38.5m,
        High = 39.58m,
        Low = 38.29m,
        Close = 38.87m,
        Volume = 3176900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/11"),
        Open = 38.9m,
        High = 39.61m,
        Low = 38.9m,
        Close = 39.56m,
        Volume = 3054400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/12"),
        Open = 39.65m,
        High = 39.65m,
        Low = 38.9m,
        Close = 39.37m,
        Volume = 2601900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/15"),
        Open = 40m,
        High = 40m,
        Low = 39.2m,
        Close = 39.2m,
        Volume = 2699700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/16"),
        Open = 39.17m,
        High = 39.99m,
        Low = 39.17m,
        Close = 39.93m,
        Volume = 2823400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/17"),
        Open = 40.01m,
        High = 41.09m,
        Low = 39.97m,
        Close = 40.86m,
        Volume = 5532800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/18"),
        Open = 40.55m,
        High = 41.38m,
        Low = 40.55m,
        Close = 41.35m,
        Volume = 3141600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/19"),
        Open = 41.73m,
        High = 41.95m,
        Low = 41.15m,
        Close = 41.48m,
        Volume = 5622100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/22"),
        Open = 40.45m,
        High = 41.88m,
        Low = 40.45m,
        Close = 41.6m,
        Volume = 2725800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/23"),
        Open = 41.72m,
        High = 42m,
        Low = 41.66m,
        Close = 41.94m,
        Volume = 2110500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/24"),
        Open = 41.6m,
        High = 41.86m,
        Low = 41.29m,
        Close = 41.36m,
        Volume = 1334800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/26"),
        Open = 41.5m,
        High = 41.66m,
        Low = 41.35m,
        Close = 41.47m,
        Volume = 502100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/29"),
        Open = 41.54m,
        High = 42.03m,
        Low = 41.37m,
        Close = 42m,
        Volume = 1802200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/30"),
        Open = 42.9m,
        High = 43.37m,
        Low = 42.17m,
        Close = 42.28m,
        Volume = 4842500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/31"),
        Open = 42.53m,
        High = 42.56m,
        Low = 41.89m,
        Close = 42.14m,
        Volume = 2348400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/02"),
        Open = 42.6m,
        High = 42.85m,
        Low = 41.71m,
        Close = 41.99m,
        Volume = 3144600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/05"),
        Open = 42m,
        High = 42.58m,
        Low = 41.94m,
        Close = 42.07m,
        Volume = 4112500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/06"),
        Open = 42m,
        High = 42m,
        Low = 41.47m,
        Close = 41.93m,
        Volume = 2506100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/07"),
        Open = 41.5m,
        High = 42.65m,
        Low = 41.5m,
        Close = 42.28m,
        Volume = 4212600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/08"),
        Open = 42.5m,
        High = 43.14m,
        Low = 42.26m,
        Close = 42.86m,
        Volume = 3101500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/09"),
        Open = 42.86m,
        High = 44.53m,
        Low = 42.54m,
        Close = 42.64m,
        Volume = 4077600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/12"),
        Open = 42.64m,
        High = 42.64m,
        Low = 42.05m,
        Close = 42.41m,
        Volume = 2449200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/13"),
        Open = 42.3m,
        High = 42.47m,
        Low = 41.6m,
        Close = 42.24m,
        Volume = 2377700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/14"),
        Open = 42.6m,
        High = 43.3m,
        Low = 42.56m,
        Close = 43.11m,
        Volume = 2952200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/15"),
        Open = 43.2m,
        High = 43.4m,
        Low = 42.71m,
        Close = 43.04m,
        Volume = 2324500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/16"),
        Open = 43.45m,
        High = 44.03m,
        Low = 43.06m,
        Close = 44.01m,
        Volume = 2640700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/20"),
        Open = 44.55m,
        High = 44.71m,
        Low = 42.98m,
        Close = 43.18m,
        Volume = 4949100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/21"),
        Open = 43.23m,
        High = 43.82m,
        Low = 42.9m,
        Close = 43.6m,
        Volume = 3564600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/22"),
        Open = 43.4m,
        High = 43.63m,
        Low = 42.88m,
        Close = 42.9m,
        Volume = 2577300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/23"),
        Open = 42.85m,
        High = 43.08m,
        Low = 41.64m,
        Close = 41.85m,
        Volume = 3902300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/26"),
        Open = 41.85m,
        High = 42.54m,
        Low = 41.65m,
        Close = 42.44m,
        Volume = 2856800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/27"),
        Open = 42.3m,
        High = 42.6m,
        Low = 41.65m,
        Close = 41.94m,
        Volume = 2110700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/28"),
        Open = 41.95m,
        High = 42.6m,
        Low = 41.5m,
        Close = 41.54m,
        Volume = 3306600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/29"),
        Open = 42.1m,
        High = 42.68m,
        Low = 42m,
        Close = 42.3m,
        Volume = 3412300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/30"),
        Open = 42m,
        High = 42.15m,
        Low = 41.52m,
        Close = 41.75m,
        Volume = 2588900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/02"),
        Open = 41.67m,
        High = 43.09m,
        Low = 41.6m,
        Close = 42.54m,
        Volume = 3184400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/03"),
        Open = 42.54m,
        High = 43.48m,
        Low = 42.21m,
        Close = 43.1m,
        Volume = 3797200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/04"),
        Open = 43.1m,
        High = 44.25m,
        Low = 43.05m,
        Close = 43.56m,
        Volume = 5379600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/05"),
        Open = 43.63m,
        High = 44.45m,
        Low = 43.58m,
        Close = 44.36m,
        Volume = 3049800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/06"),
        Open = 44.36m,
        High = 45.02m,
        Low = 43.99m,
        Close = 44.35m,
        Volume = 4736100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/09"),
        Open = 44.2m,
        High = 44.35m,
        Low = 43.72m,
        Close = 43.96m,
        Volume = 3022200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/10"),
        Open = 43.82m,
        High = 43.9m,
        Low = 43.5m,
        Close = 43.77m,
        Volume = 2796600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/11"),
        Open = 43.6m,
        High = 44.61m,
        Low = 43.32m,
        Close = 44.49m,
        Volume = 3145400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/12"),
        Open = 44.3m,
        High = 44.48m,
        Low = 44.02m,
        Close = 44.37m,
        Volume = 1761500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/13"),
        Open = 44.2m,
        High = 44.66m,
        Low = 44.17m,
        Close = 44.45m,
        Volume = 1923700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/17"),
        Open = 44.6m,
        High = 44.75m,
        Low = 44.39m,
        Close = 44.6m,
        Volume = 2049200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/18"),
        Open = 44.9m,
        High = 45.1m,
        Low = 44.38m,
        Close = 44.59m,
        Volume = 2950400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/19"),
        Open = 44.9m,
        High = 44.96m,
        Low = 44.4m,
        Close = 44.52m,
        Volume = 3402700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/20"),
        Open = 44.65m,
        High = 44.94m,
        Low = 44.3m,
        Close = 44.34m,
        Volume = 3275100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/23"),
        Open = 44.54m,
        High = 44.57m,
        Low = 43.09m,
        Close = 43.62m,
        Volume = 4029300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/24"),
        Open = 43.3m,
        High = 43.73m,
        Low = 42.9m,
        Close = 43.22m,
        Volume = 3135300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/25"),
        Open = 43.22m,
        High = 44.06m,
        Low = 43.09m,
        Close = 43.82m,
        Volume = 3074000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/26"),
        Open = 43m,
        High = 43.72m,
        Low = 41.97m,
        Close = 42.44m,
        Volume = 7116200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/27"),
        Open = 42.6m,
        High = 43.57m,
        Low = 42.6m,
        Close = 43.37m,
        Volume = 6432900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/01"),
        Open = 43.68m,
        High = 43.87m,
        Low = 43m,
        Close = 43.77m,
        Volume = 2612300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/02"),
        Open = 43.55m,
        High = 43.86m,
        Low = 42.98m,
        Close = 43.33m,
        Volume = 2842600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/03"),
        Open = 43.07m,
        High = 43.4m,
        Low = 42.96m,
        Close = 43.06m,
        Volume = 2838400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/04"),
        Open = 42.87m,
        High = 43m,
        Low = 42.22m,
        Close = 42.63m,
        Volume = 2419900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/05"),
        Open = 42.55m,
        High = 42.9m,
        Low = 42.14m,
        Close = 42.72m,
        Volume = 3121600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/08"),
        Open = 42.72m,
        High = 42.85m,
        Low = 42.39m,
        Close = 42.42m,
        Volume = 2539800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/09"),
        Open = 42.2m,
        High = 42.7m,
        Low = 41.41m,
        Close = 41.68m,
        Volume = 3559400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/10"),
        Open = 41.75m,
        High = 41.75m,
        Low = 40.73m,
        Close = 41.12m,
        Volume = 3732000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/11"),
        Open = 41m,
        High = 41.12m,
        Low = 40.07m,
        Close = 40.15m,
        Volume = 3097100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/12"),
        Open = 40.08m,
        High = 40.39m,
        Low = 39.43m,
        Close = 40.3m,
        Volume = 4587900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/15"),
        Open = 39.95m,
        High = 40.46m,
        Low = 39.7m,
        Close = 39.78m,
        Volume = 3105100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/16"),
        Open = 39.74m,
        High = 39.74m,
        Low = 38.98m,
        Close = 39.41m,
        Volume = 3628100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/17"),
        Open = 39.55m,
        High = 39.89m,
        Low = 39.48m,
        Close = 39.8m,
        Volume = 2577700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/18"),
        Open = 39.75m,
        High = 39.93m,
        Low = 39.3m,
        Close = 39.72m,
        Volume = 2349100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/19"),
        Open = 39.72m,
        High = 40.05m,
        Low = 39.37m,
        Close = 39.43m,
        Volume = 2721700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/22"),
        Open = 39.38m,
        High = 39.38m,
        Low = 38.04m,
        Close = 38.68m,
        Volume = 4473700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/23"),
        Open = 38.93m,
        High = 39.89m,
        Low = 38.93m,
        Close = 39.11m,
        Volume = 3489100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/24"),
        Open = 38.73m,
        High = 39.27m,
        Low = 38.34m,
        Close = 39.03m,
        Volume = 3362300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/25"),
        Open = 39.25m,
        High = 39.9m,
        Low = 39.1m,
        Close = 39.72m,
        Volume = 2018400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/26"),
        Open = 39.52m,
        High = 39.77m,
        Low = 39.1m,
        Close = 39.35m,
        Volume = 3481000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/29"),
        Open = 39.8m,
        High = 40.02m,
        Low = 39.6m,
        Close = 39.93m,
        Volume = 2126500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/30"),
        Open = 39.85m,
        High = 40.43m,
        Low = 39.7m,
        Close = 40.33m,
        Volume = 2464800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/31"),
        Open = 40.5m,
        High = 41.35m,
        Low = 40.32m,
        Close = 41.07m,
        Volume = 3360800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/01"),
        Open = 41.07m,
        High = 41.27m,
        Low = 40.6m,
        Close = 40.77m,
        Volume = 2310200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/02"),
        Open = 41.1m,
        High = 42.24m,
        Low = 41.05m,
        Close = 41.84m,
        Volume = 3260800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/05"),
        Open = 42.94m,
        High = 42.94m,
        Low = 41.85m,
        Close = 42.54m,
        Volume = 2350900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/06"),
        Open = 42.5m,
        High = 42.5m,
        Low = 42.11m,
        Close = 42.36m,
        Volume = 1917300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/07"),
        Open = 42.16m,
        High = 42.36m,
        Low = 41.51m,
        Close = 41.76m,
        Volume = 2583900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/08"),
        Open = 41.95m,
        High = 42.23m,
        Low = 41.2m,
        Close = 41.35m,
        Volume = 2145400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/12"),
        Open = 41.7m,
        High = 42.19m,
        Low = 41.6m,
        Close = 42.15m,
        Volume = 1595900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/13"),
        Open = 42.17m,
        High = 42.6m,
        Low = 41.68m,
        Close = 41.78m,
        Volume = 2180600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/14"),
        Open = 41.73m,
        High = 41.9m,
        Low = 41.42m,
        Close = 41.57m,
        Volume = 1573200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/15"),
        Open = 41.85m,
        High = 42.03m,
        Low = 41.11m,
        Close = 41.53m,
        Volume = 1509400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/16"),
        Open = 42.03m,
        High = 42.24m,
        Low = 41.4m,
        Close = 41.5m,
        Volume = 2614700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/19"),
        Open = 41.63m,
        High = 41.71m,
        Low = 41.39m,
        Close = 41.49m,
        Volume = 1307500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/20"),
        Open = 41.47m,
        High = 41.7m,
        Low = 40.55m,
        Close = 40.55m,
        Volume = 2290300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/21"),
        Open = 40.49m,
        High = 41.22m,
        Low = 40.31m,
        Close = 40.85m,
        Volume = 2134200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/22"),
        Open = 41.7m,
        High = 42.63m,
        Low = 41.35m,
        Close = 42.27m,
        Volume = 3579300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/23"),
        Open = 42.16m,
        High = 42.75m,
        Low = 41.87m,
        Close = 42.45m,
        Volume = 2218800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/26"),
        Open = 43.15m,
        High = 43.5m,
        Low = 42.93m,
        Close = 43.24m,
        Volume = 3268200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/27"),
        Open = 43.24m,
        High = 44m,
        Low = 43.24m,
        Close = 43.55m,
        Volume = 2884300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/28"),
        Open = 44.05m,
        High = 44.9m,
        Low = 43.55m,
        Close = 44.03m,
        Volume = 5964000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/29"),
        Open = 44.03m,
        High = 44.15m,
        Low = 43.07m,
        Close = 43.25m,
        Volume = 2465800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/30"),
        Open = 43.25m,
        High = 43.28m,
        Low = 42.6m,
        Close = 42.69m,
        Volume = 2665500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/03"),
        Open = 43.25m,
        High = 44m,
        Low = 43.2m,
        Close = 43.58m,
        Volume = 2778400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/04"),
        Open = 43.58m,
        High = 43.66m,
        Low = 43.01m,
        Close = 43.28m,
        Volume = 2733400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/05"),
        Open = 43.13m,
        High = 44.09m,
        Low = 43m,
        Close = 43.76m,
        Volume = 2467800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/06"),
        Open = 43.68m,
        High = 44.3m,
        Low = 43.5m,
        Close = 43.93m,
        Volume = 3396500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/07"),
        Open = 43.6m,
        High = 44.05m,
        Low = 43.31m,
        Close = 43.4m,
        Volume = 2247000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/10"),
        Open = 43m,
        High = 43.28m,
        Low = 42.29m,
        Close = 42.59m,
        Volume = 3630100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/11"),
        Open = 42.5m,
        High = 43.36m,
        Low = 42.41m,
        Close = 43.18m,
        Volume = 3314700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/12"),
        Open = 43.2m,
        High = 43.58m,
        Low = 42.7m,
        Close = 43.58m,
        Volume = 2730300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/13"),
        Open = 43.63m,
        High = 43.84m,
        Low = 43.18m,
        Close = 43.62m,
        Volume = 1960600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/14"),
        Open = 43.1m,
        High = 43.59m,
        Low = 42.95m,
        Close = 43.44m,
        Volume = 2708800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/17"),
        Open = 42.7m,
        High = 43.61m,
        Low = 42.49m,
        Close = 42.73m,
        Volume = 2443300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/18"),
        Open = 42.84m,
        High = 43.2m,
        Low = 42.7m,
        Close = 43.02m,
        Volume = 1470200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/19"),
        Open = 43.1m,
        High = 44.11m,
        Low = 43.04m,
        Close = 43.38m,
        Volume = 3006700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/20"),
        Open = 43.14m,
        High = 43.22m,
        Low = 42.75m,
        Close = 42.92m,
        Volume = 2258100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/21"),
        Open = 43.15m,
        High = 43.46m,
        Low = 43m,
        Close = 43.4m,
        Volume = 2128900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/24"),
        Open = 44.22m,
        High = 44.6m,
        Low = 44.02m,
        Close = 44.56m,
        Volume = 3795300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/25"),
        Open = 44.55m,
        High = 44.92m,
        Low = 44.25m,
        Close = 44.7m,
        Volume = 3958300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/26"),
        Open = 44.35m,
        High = 44.98m,
        Low = 44.13m,
        Close = 44.76m,
        Volume = 3421800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/27"),
        Open = 45m,
        High = 46.62m,
        Low = 44.91m,
        Close = 46.2m,
        Volume = 6674000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/28"),
        Open = 46m,
        High = 46.5m,
        Low = 45.45m,
        Close = 45.8m,
        Volume = 5144000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/01"),
        Open = 45.9m,
        High = 46.3m,
        Low = 45.51m,
        Close = 45.88m,
        Volume = 4210500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/02"),
        Open = 47.22m,
        High = 47.22m,
        Low = 45.9m,
        Close = 46.75m,
        Volume = 3637200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/03"),
        Open = 46.45m,
        High = 46.65m,
        Low = 46.1m,
        Close = 46.1m,
        Volume = 2359000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/04"),
        Open = 46.3m,
        High = 47.03m,
        Low = 46.2m,
        Close = 46.9m,
        Volume = 2832600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/07"),
        Open = 47.5m,
        High = 48.4m,
        Low = 47.47m,
        Close = 48.13m,
        Volume = 5744200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/08"),
        Open = 48m,
        High = 48.13m,
        Low = 47.62m,
        Close = 48.09m,
        Volume = 3453000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/09"),
        Open = 48.09m,
        High = 48.82m,
        Low = 48.05m,
        Close = 48.66m,
        Volume = 3325000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/10"),
        Open = 48.62m,
        High = 48.83m,
        Low = 48.44m,
        Close = 48.75m,
        Volume = 2522500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/14"),
        Open = 48.5m,
        High = 48.98m,
        Low = 48.37m,
        Close = 48.83m,
        Volume = 3923900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/15"),
        Open = 49.9m,
        High = 49.9m,
        Low = 48.9m,
        Close = 49.25m,
        Volume = 6940400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/16"),
        Open = 49.47m,
        High = 50m,
        Low = 49.31m,
        Close = 49.9m,
        Volume = 3276700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/17"),
        Open = 49.58m,
        High = 49.69m,
        Low = 49.3m,
        Close = 49.47m,
        Volume = 3535800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/18"),
        Open = 49.32m,
        High = 49.95m,
        Low = 49.24m,
        Close = 49.8m,
        Volume = 4057600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/21"),
        Open = 49.65m,
        High = 49.92m,
        Low = 49.47m,
        Close = 49.5m,
        Volume = 2317400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/22"),
        Open = 49.35m,
        High = 49.79m,
        Low = 49.33m,
        Close = 49.67m,
        Volume = 2620200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/23"),
        Open = 49.5m,
        High = 50.75m,
        Low = 49.4m,
        Close = 50.67m,
        Volume = 3553500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/24"),
        Open = 50.26m,
        High = 50.78m,
        Low = 50.11m,
        Close = 50.35m,
        Volume = 2461800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/25"),
        Open = 50.42m,
        High = 51.35m,
        Low = 50.4m,
        Close = 51.3m,
        Volume = 4445000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/28"),
        Open = 51.3m,
        High = 51.49m,
        Low = 50.1m,
        Close = 50.21m,
        Volume = 2942800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/29"),
        Open = 49.99m,
        High = 50.7m,
        Low = 49.82m,
        Close = 50.51m,
        Volume = 3079300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/30"),
        Open = 50.51m,
        High = 51.23m,
        Low = 50.42m,
        Close = 51.09m,
        Volume = 2679000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/01"),
        Open = 50.1m,
        High = 50.53m,
        Low = 49.57m,
        Close = 49.9m,
        Volume = 3543100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/02"),
        Open = 49.52m,
        High = 49.69m,
        Low = 48.84m,
        Close = 49.52m,
        Volume = 2818700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/06"),
        Open = 49.9m,
        High = 50.11m,
        Low = 49.07m,
        Close = 49.31m,
        Volume = 3918600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/07"),
        Open = 49.55m,
        High = 49.83m,
        Low = 49.13m,
        Close = 49.39m,
        Volume = 2876700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/08"),
        Open = 49.39m,
        High = 50.27m,
        Low = 48.82m,
        Close = 49.97m,
        Volume = 3524400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/09"),
        Open = 49.94m,
        High = 50.25m,
        Low = 49.88m,
        Close = 50.04m,
        Volume = 2351000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/12"),
        Open = 49.95m,
        High = 50.3m,
        Low = 49.75m,
        Close = 50.2m,
        Volume = 2937200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/13"),
        Open = 50.2m,
        High = 50.37m,
        Low = 49.92m,
        Close = 50.26m,
        Volume = 2033700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/14"),
        Open = 50.26m,
        High = 50.65m,
        Low = 49.15m,
        Close = 49.32m,
        Volume = 2810600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/15"),
        Open = 49.1m,
        High = 49.47m,
        Low = 48.34m,
        Close = 49.14m,
        Volume = 3532900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/16"),
        Open = 49.6m,
        High = 49.61m,
        Low = 49m,
        Close = 49.13m,
        Volume = 2189500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/19"),
        Open = 49.35m,
        High = 49.53m,
        Low = 48.48m,
        Close = 48.67m,
        Volume = 2618900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/20"),
        Open = 48.68m,
        High = 48.86m,
        Low = 48.31m,
        Close = 48.76m,
        Volume = 2359700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/21"),
        Open = 48.7m,
        High = 49.09m,
        Low = 47.68m,
        Close = 47.72m,
        Volume = 3178700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/22"),
        Open = 47.72m,
        High = 48.03m,
        Low = 46.4m,
        Close = 47.3m,
        Volume = 6574000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/23"),
        Open = 47.31m,
        High = 47.38m,
        Low = 46.61m,
        Close = 47.06m,
        Volume = 2896100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/26"),
        Open = 47.1m,
        High = 47.42m,
        Low = 46.89m,
        Close = 47m,
        Volume = 2233500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/27"),
        Open = 47.35m,
        High = 48.35m,
        Low = 47.11m,
        Close = 48.22m,
        Volume = 2972400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/28"),
        Open = 48.74m,
        High = 49.77m,
        Low = 48.51m,
        Close = 49.01m,
        Volume = 3990700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/29"),
        Open = 49.4m,
        High = 49.95m,
        Low = 49.21m,
        Close = 49.68m,
        Volume = 2884400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/30"),
        Open = 49.9m,
        High = 51.25m,
        Low = 49.74m,
        Close = 50.75m,
        Volume = 4829100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/02"),
        Open = 50.2m,
        High = 51.05m,
        Low = 50.16m,
        Close = 50.91m,
        Volume = 2395200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/03"),
        Open = 50.94m,
        High = 51.46m,
        Low = 50.61m,
        Close = 50.76m,
        Volume = 3474800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/04"),
        Open = 50.6m,
        High = 51.05m,
        Low = 50.3m,
        Close = 51m,
        Volume = 3563200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/05"),
        Open = 51m,
        High = 51.18m,
        Low = 49.99m,
        Close = 50.01m,
        Volume = 2861700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/06"),
        Open = 49.97m,
        High = 49.97m,
        Low = 48.27m,
        Close = 48.33m,
        Volume = 3358800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/09"),
        Open = 48.59m,
        High = 48.94m,
        Low = 48.46m,
        Close = 48.76m,
        Volume = 2380800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/10"),
        Open = 48.51m,
        High = 49.61m,
        Low = 48.51m,
        Close = 49.61m,
        Volume = 3535200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/11"),
        Open = 49.25m,
        High = 49.79m,
        Low = 48.53m,
        Close = 49.68m,
        Volume = 2976900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/12"),
        Open = 49.44m,
        High = 49.75m,
        Low = 48.64m,
        Close = 49.33m,
        Volume = 2983000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/13"),
        Open = 49.7m,
        High = 49.8m,
        Low = 49.2m,
        Close = 49.72m,
        Volume = 2187900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/16"),
        Open = 49.72m,
        High = 51.07m,
        Low = 49.64m,
        Close = 50.95m,
        Volume = 4168900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/17"),
        Open = 51.2m,
        High = 51.32m,
        Low = 50.18m,
        Close = 50.31m,
        Volume = 3604400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/18"),
        Open = 50.29m,
        High = 50.75m,
        Low = 49.93m,
        Close = 50.74m,
        Volume = 2090600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/19"),
        Open = 50.74m,
        High = 50.83m,
        Low = 49.95m,
        Close = 50.25m,
        Volume = 2191000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/20"),
        Open = 50m,
        High = 50.56m,
        Low = 49.97m,
        Close = 50.46m,
        Volume = 3327300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/23"),
        Open = 50.75m,
        High = 50.76m,
        Low = 50.35m,
        Close = 50.65m,
        Volume = 2112300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/24"),
        Open = 50.73m,
        High = 51m,
        Low = 50.39m,
        Close = 50.91m,
        Volume = 1706000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/25"),
        Open = 51.55m,
        High = 52.82m,
        Low = 51.15m,
        Close = 52.5m,
        Volume = 7291900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/26"),
        Open = 52.51m,
        High = 52.65m,
        Low = 51.93m,
        Close = 52.07m,
        Volume = 3359200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/27"),
        Open = 52.13m,
        High = 52.6m,
        Low = 51.88m,
        Close = 51.99m,
        Volume = 1446900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/30"),
        Open = 51.99m,
        High = 52.51m,
        Low = 51.81m,
        Close = 51.87m,
        Volume = 1587400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/31"),
        Open = 51.9m,
        High = 52.22m,
        Low = 51.69m,
        Close = 52.22m,
        Volume = 2190200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/01"),
        Open = 52.1m,
        High = 52.58m,
        Low = 51.94m,
        Close = 52.39m,
        Volume = 2261000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/02"),
        Open = 52.39m,
        High = 53.69m,
        Low = 52.36m,
        Close = 53.59m,
        Volume = 3712700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/03"),
        Open = 53.68m,
        High = 53.95m,
        Low = 53.1m,
        Close = 53.1m,
        Volume = 2799400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/07"),
        Open = 53.4m,
        High = 54.01m,
        Low = 53.4m,
        Close = 53.97m,
        Volume = 2964700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/08"),
        Open = 53.61m,
        High = 54.32m,
        Low = 53.6m,
        Close = 54.05m,
        Volume = 2705400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/09"),
        Open = 53.97m,
        High = 54.17m,
        Low = 53.23m,
        Close = 53.26m,
        Volume = 2542700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/10"),
        Open = 52.85m,
        High = 54.2m,
        Low = 52.65m,
        Close = 54.15m,
        Volume = 3097300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/13"),
        Open = 54.15m,
        High = 54.86m,
        Low = 53.81m,
        Close = 54.28m,
        Volume = 2907300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/14"),
        Open = 54.29m,
        High = 54.49m,
        Low = 53.72m,
        Close = 53.92m,
        Volume = 1922200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/15"),
        Open = 54.05m,
        High = 54.25m,
        Low = 53.33m,
        Close = 53.66m,
        Volume = 1694900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/16"),
        Open = 53.8m,
        High = 54.57m,
        Low = 53.67m,
        Close = 54.52m,
        Volume = 2396300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/17"),
        Open = 54.73m,
        High = 55.24m,
        Low = 54.56m,
        Close = 55.15m,
        Volume = 3324500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/20"),
        Open = 54.75m,
        High = 55.19m,
        Low = 54.42m,
        Close = 54.74m,
        Volume = 2458400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/21"),
        Open = 54.71m,
        High = 55.05m,
        Low = 54.52m,
        Close = 54.7m,
        Volume = 2628900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/22"),
        Open = 54.3m,
        High = 54.44m,
        Low = 53.41m,
        Close = 53.68m,
        Volume = 2821400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/23"),
        Open = 53.2m,
        High = 53.25m,
        Low = 52.58m,
        Close = 53m,
        Volume = 3999200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/24"),
        Open = 52.98m,
        High = 53.4m,
        Low = 52.79m,
        Close = 53.14m,
        Volume = 2731900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/27"),
        Open = 52.9m,
        High = 53m,
        Low = 52.3m,
        Close = 52.51m,
        Volume = 2057700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/28"),
        Open = 52.51m,
        High = 52.72m,
        Low = 51.75m,
        Close = 52.32m,
        Volume = 3500700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/29"),
        Open = 51.42m,
        High = 51.42m,
        Low = 50.5m,
        Close = 51.01m,
        Volume = 5953500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/30"),
        Open = 50.85m,
        High = 51.99m,
        Low = 50.62m,
        Close = 51.62m,
        Volume = 3748400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/01"),
        Open = 51.62m,
        High = 52.49m,
        Low = 51.42m,
        Close = 52.48m,
        Volume = 3382800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/04"),
        Open = 52.55m,
        High = 52.87m,
        Low = 50.88m,
        Close = 52.32m,
        Volume = 4831500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/05"),
        Open = 52m,
        High = 52.07m,
        Low = 51.3m,
        Close = 51.49m,
        Volume = 3380700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/06"),
        Open = 51.49m,
        High = 52.36m,
        Low = 51.14m,
        Close = 52.36m,
        Volume = 2461700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/07"),
        Open = 52.49m,
        High = 52.49m,
        Low = 51.32m,
        Close = 51.32m,
        Volume = 1993800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/08"),
        Open = 51.12m,
        High = 51.24m,
        Low = 49.89m,
        Close = 50.1m,
        Volume = 3944800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/11"),
        Open = 50.11m,
        High = 50.49m,
        Low = 49.97m,
        Close = 50.26m,
        Volume = 2107900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/12"),
        Open = 50.27m,
        High = 50.56m,
        Low = 49.81m,
        Close = 50.4m,
        Volume = 2506700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/13"),
        Open = 50.71m,
        High = 51.09m,
        Low = 49.92m,
        Close = 50.23m,
        Volume = 2268900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/14"),
        Open = 50.15m,
        High = 51m,
        Low = 50.15m,
        Close = 50.25m,
        Volume = 3004100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/15"),
        Open = 50.5m,
        High = 51.28m,
        Low = 50.18m,
        Close = 50.19m,
        Volume = 3467000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/18"),
        Open = 49.55m,
        High = 49.83m,
        Low = 49.25m,
        Close = 49.59m,
        Volume = 3074500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/19"),
        Open = 49.1m,
        High = 50m,
        Low = 48.85m,
        Close = 49.21m,
        Volume = 3181300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/20"),
        Open = 49.3m,
        High = 49.55m,
        Low = 48.3m,
        Close = 48.96m,
        Volume = 3208200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/21"),
        Open = 48.95m,
        High = 49.98m,
        Low = 48.81m,
        Close = 49.56m,
        Volume = 3702500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/22"),
        Open = 49.5m,
        High = 50.1m,
        Low = 49.07m,
        Close = 49.51m,
        Volume = 2455800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/25"),
        Open = 49.05m,
        High = 49.32m,
        Low = 48.1m,
        Close = 49m,
        Volume = 3983400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/26"),
        Open = 48.82m,
        High = 50.17m,
        Low = 48.65m,
        Close = 49.98m,
        Volume = 3860700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/27"),
        Open = 51m,
        High = 51.25m,
        Low = 49.8m,
        Close = 50.1m,
        Volume = 5404400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/28"),
        Open = 50.11m,
        High = 50.45m,
        Low = 49.54m,
        Close = 49.87m,
        Volume = 4136900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/29"),
        Open = 49.97m,
        High = 50.22m,
        Low = 49.8m,
        Close = 49.9m,
        Volume = 2682300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/01"),
        Open = 50.1m,
        High = 50.17m,
        Low = 49.65m,
        Close = 49.95m,
        Volume = 2515900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/02"),
        Open = 50.05m,
        High = 50.54m,
        Low = 49.66m,
        Close = 49.88m,
        Volume = 2765600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/03"),
        Open = 51m,
        High = 52.1m,
        Low = 50.94m,
        Close = 51.15m,
        Volume = 5446300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/04"),
        Open = 50.85m,
        High = 50.92m,
        Low = 50.17m,
        Close = 50.59m,
        Volume = 4875500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/05"),
        Open = 50.8m,
        High = 51.37m,
        Low = 50.41m,
        Close = 51.15m,
        Volume = 4375500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/08"),
        Open = 51.15m,
        High = 52.48m,
        Low = 51.06m,
        Close = 52.07m,
        Volume = 3905400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/09"),
        Open = 51.85m,
        High = 52.89m,
        Low = 51.6m,
        Close = 52.51m,
        Volume = 4086400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/10"),
        Open = 52.82m,
        High = 53.45m,
        Low = 52.74m,
        Close = 53.4m,
        Volume = 4081600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/11"),
        Open = 53.41m,
        High = 54.32m,
        Low = 53.41m,
        Close = 54.3m,
        Volume = 4108000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/12"),
        Open = 54.2m,
        High = 54.39m,
        Low = 53.52m,
        Close = 53.93m,
        Volume = 2628000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/15"),
        Open = 53.85m,
        High = 54.23m,
        Low = 53.61m,
        Close = 54.03m,
        Volume = 3778100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/16"),
        Open = 54m,
        High = 54.21m,
        Low = 53.72m,
        Close = 54m,
        Volume = 2736900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/17"),
        Open = 54.3m,
        High = 55.22m,
        Low = 54.24m,
        Close = 54.75m,
        Volume = 4261600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/18"),
        Open = 55.15m,
        High = 55.48m,
        Low = 54.65m,
        Close = 54.85m,
        Volume = 3063000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/19"),
        Open = 54.85m,
        High = 54.85m,
        Low = 53.77m,
        Close = 53.77m,
        Volume = 2906800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/22"),
        Open = 53.76m,
        High = 53.97m,
        Low = 53.26m,
        Close = 53.97m,
        Volume = 3030500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/23"),
        Open = 53.96m,
        High = 54.34m,
        Low = 53.41m,
        Close = 54.33m,
        Volume = 3210600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/24"),
        Open = 54.33m,
        High = 54.5m,
        Low = 53.76m,
        Close = 54.12m,
        Volume = 3025900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/26"),
        Open = 54.13m,
        High = 54.24m,
        Low = 53.9m,
        Close = 54.02m,
        Volume = 1455600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/29"),
        Open = 54.02m,
        High = 54.38m,
        Low = 53.28m,
        Close = 53.62m,
        Volume = 2666000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/30"),
        Open = 53.45m,
        High = 54.04m,
        Low = 53.44m,
        Close = 53.57m,
        Volume = 2407400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/01"),
        Open = 53.6m,
        High = 54.7m,
        Low = 53.57m,
        Close = 54.7m,
        Volume = 2972900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/02"),
        Open = 54.5m,
        High = 54.9m,
        Low = 54.3m,
        Close = 54.86m,
        Volume = 2432600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/03"),
        Open = 53.27m,
        High = 55.29m,
        Low = 53.27m,
        Close = 55.26m,
        Volume = 3346700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/06"),
        Open = 55.26m,
        High = 55.26m,
        Low = 54.52m,
        Close = 54.75m,
        Volume = 2271100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/07"),
        Open = 54.75m,
        High = 55m,
        Low = 53.72m,
        Close = 53.75m,
        Volume = 2661500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/08"),
        Open = 53.95m,
        High = 53.98m,
        Low = 52.42m,
        Close = 52.8m,
        Volume = 4264300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/09"),
        Open = 52.68m,
        High = 52.99m,
        Low = 52.2m,
        Close = 52.78m,
        Volume = 4347000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/10"),
        Open = 52.78m,
        High = 52.99m,
        Low = 52.33m,
        Close = 52.42m,
        Volume = 4107600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/13"),
        Open = 54.37m,
        High = 54.37m,
        Low = 52.26m,
        Close = 52.67m,
        Volume = 2909500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/14"),
        Open = 52.92m,
        High = 53.02m,
        Low = 52.49m,
        Close = 52.64m,
        Volume = 3085100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/15"),
        Open = 52.78m,
        High = 52.78m,
        Low = 52.29m,
        Close = 52.4m,
        Volume = 3559500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/16"),
        Open = 52.4m,
        High = 52.49m,
        Low = 51.79m,
        Close = 52.08m,
        Volume = 3485000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/17"),
        Open = 52m,
        High = 53.4m,
        Low = 51.98m,
        Close = 53.1m,
        Volume = 5299500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/20"),
        Open = 53.1m,
        High = 53.76m,
        Low = 53.09m,
        Close = 53.22m,
        Volume = 2337100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/21"),
        Open = 53.26m,
        High = 53.68m,
        Low = 52.72m,
        Close = 53.42m,
        Volume = 2663300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/22"),
        Open = 50.7m,
        High = 54.29m,
        Low = 50.7m,
        Close = 53.91m,
        Volume = 1998400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/23"),
        Open = 53.75m,
        High = 53.85m,
        Low = 53.32m,
        Close = 53.53m,
        Volume = 1103900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/27"),
        Open = 53.39m,
        High = 53.65m,
        Low = 52.91m,
        Close = 53.15m,
        Volume = 1465000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/28"),
        Open = 52.97m,
        High = 53.54m,
        Low = 52.97m,
        Close = 53.25m,
        Volume = 995500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/29"),
        Open = 52.65m,
        High = 52.66m,
        Low = 51.77m,
        Close = 52.07m,
        Volume = 4008700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/30"),
        Open = 52.25m,
        High = 52.5m,
        Low = 51.62m,
        Close = 51.9m,
        Volume = 2577300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/31"),
        Open = 51.77m,
        High = 52.09m,
        Low = 51.69m,
        Close = 51.77m,
        Volume = 1667600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/03"),
        Open = 51.85m,
        High = 52.25m,
        Low = 50.92m,
        Close = 50.97m,
        Volume = 3729300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/04"),
        Open = 51.15m,
        High = 51.15m,
        Low = 49.88m,
        Close = 49.98m,
        Volume = 4649600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/05"),
        Open = 50m,
        High = 51.13m,
        Low = 49.55m,
        Close = 50.81m,
        Volume = 5334000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/06"),
        Open = 50.68m,
        High = 51.12m,
        Low = 50.34m,
        Close = 50.48m,
        Volume = 3066900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/07"),
        Open = 50.5m,
        High = 50.85m,
        Low = 50.1m,
        Close = 50.31m,
        Volume = 1951800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/10"),
        Open = 50.13m,
        High = 51.33m,
        Low = 50.1m,
        Close = 50.98m,
        Volume = 2844700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/11"),
        Open = 51.03m,
        High = 51.1m,
        Low = 50.61m,
        Close = 50.82m,
        Volume = 2025100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/12"),
        Open = 51m,
        High = 51.96m,
        Low = 50.95m,
        Close = 51.94m,
        Volume = 4077100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/13"),
        Open = 51.9m,
        High = 52.15m,
        Low = 50.58m,
        Close = 50.63m,
        Volume = 4243200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/14"),
        Open = 50.6m,
        High = 50.99m,
        Low = 50.1m,
        Close = 50.91m,
        Volume = 3081700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/18"),
        Open = 50.5m,
        High = 51.97m,
        Low = 50.45m,
        Close = 51.88m,
        Volume = 3485000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/19"),
        Open = 51.6m,
        High = 51.86m,
        Low = 51.31m,
        Close = 51.41m,
        Volume = 2715300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/20"),
        Open = 51.1m,
        High = 51.51m,
        Low = 50.88m,
        Close = 50.9m,
        Volume = 2451700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/21"),
        Open = 50.65m,
        High = 50.98m,
        Low = 50.01m,
        Close = 50.07m,
        Volume = 2565600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/24"),
        Open = 50.33m,
        High = 50.6m,
        Low = 49.52m,
        Close = 49.64m,
        Volume = 3005400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/25"),
        Open = 50.15m,
        High = 50.21m,
        Low = 49.52m,
        Close = 49.84m,
        Volume = 2933500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/26"),
        Open = 49.56m,
        High = 50.34m,
        Low = 49.52m,
        Close = 49.86m,
        Volume = 3188500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/27"),
        Open = 49.54m,
        High = 51m,
        Low = 49.54m,
        Close = 50.97m,
        Volume = 4707400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/28"),
        Open = 50.97m,
        High = 50.98m,
        Low = 49.54m,
        Close = 49.92m,
        Volume = 3696200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/31"),
        Open = 50.25m,
        High = 50.63m,
        Low = 50.07m,
        Close = 50.6m,
        Volume = 3891100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/01"),
        Open = 50.6m,
        High = 51.18m,
        Low = 50.22m,
        Close = 51.04m,
        Volume = 2602600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/02"),
        Open = 51.6m,
        High = 52.89m,
        Low = 51.42m,
        Close = 52.23m,
        Volume = 6084300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/03"),
        Open = 52.95m,
        High = 52.95m,
        Low = 51.94m,
        Close = 52m,
        Volume = 4184700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/04"),
        Open = 51.95m,
        High = 52.9m,
        Low = 51.9m,
        Close = 52.58m,
        Volume = 3277600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/07"),
        Open = 52.42m,
        High = 52.69m,
        Low = 52.3m,
        Close = 52.5m,
        Volume = 3687000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/08"),
        Open = 52.65m,
        High = 53.62m,
        Low = 52.39m,
        Close = 53.5m,
        Volume = 6064300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/09"),
        Open = 53.5m,
        High = 54.16m,
        Low = 53.36m,
        Close = 54.12m,
        Volume = 4776600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/10"),
        Open = 54.12m,
        High = 54.43m,
        Low = 53.63m,
        Close = 53.86m,
        Volume = 3630800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/11"),
        Open = 53.75m,
        High = 54.3m,
        Low = 53.35m,
        Close = 54.14m,
        Volume = 2191300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/14"),
        Open = 54.01m,
        High = 54.33m,
        Low = 53.72m,
        Close = 54.04m,
        Volume = 2763700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/15"),
        Open = 54.25m,
        High = 54.82m,
        Low = 54.01m,
        Close = 54.43m,
        Volume = 3281800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/16"),
        Open = 54.15m,
        High = 54.29m,
        Low = 53.8m,
        Close = 53.92m,
        Volume = 2725300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/17"),
        Open = 54.2m,
        High = 54.45m,
        Low = 53.12m,
        Close = 53.66m,
        Volume = 4093400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/18"),
        Open = 53.67m,
        High = 53.67m,
        Low = 52.55m,
        Close = 52.78m,
        Volume = 4682700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/22"),
        Open = 52.35m,
        High = 52.55m,
        Low = 52.07m,
        Close = 52.15m,
        Volume = 3292200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/23"),
        Open = 52.8m,
        High = 53.11m,
        Low = 52.56m,
        Close = 52.72m,
        Volume = 4056700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/24"),
        Open = 53.2m,
        High = 53.94m,
        Low = 52.96m,
        Close = 53.94m,
        Volume = 3874400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/25"),
        Open = 53.6m,
        High = 55.03m,
        Low = 53.33m,
        Close = 54.99m,
        Volume = 4494700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/28"),
        Open = 54.9m,
        High = 55.05m,
        Low = 54.71m,
        Close = 54.97m,
        Volume = 4575800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/01"),
        Open = 54.98m,
        High = 55.23m,
        Low = 54.26m,
        Close = 54.49m,
        Volume = 4276300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/02"),
        Open = 54.45m,
        High = 55.42m,
        Low = 54.37m,
        Close = 55.3m,
        Volume = 4314300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/03"),
        Open = 55.45m,
        High = 58.07m,
        Low = 55.32m,
        Close = 57.42m,
        Volume = 8860800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/04"),
        Open = 57.63m,
        High = 58.74m,
        Low = 56.99m,
        Close = 58.38m,
        Volume = 6617300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/07"),
        Open = 57.52m,
        High = 58.42m,
        Low = 57.25m,
        Close = 58.3m,
        Volume = 6142800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/08"),
        Open = 58.31m,
        High = 58.68m,
        Low = 57.81m,
        Close = 58.15m,
        Volume = 4604500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/09"),
        Open = 57.85m,
        High = 58.05m,
        Low = 57.44m,
        Close = 57.75m,
        Volume = 3501000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/10"),
        Open = 57.76m,
        High = 58.36m,
        Low = 57.69m,
        Close = 57.98m,
        Volume = 3409100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/11"),
        Open = 57.85m,
        High = 58.22m,
        Low = 57.2m,
        Close = 57.49m,
        Volume = 3262800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/14"),
        Open = 57.5m,
        High = 57.99m,
        Low = 57.3m,
        Close = 57.71m,
        Volume = 3269000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/15"),
        Open = 57.85m,
        High = 58.94m,
        Low = 57.63m,
        Close = 58.48m,
        Volume = 4714000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/16"),
        Open = 58.3m,
        High = 58.52m,
        Low = 56.7m,
        Close = 56.77m,
        Volume = 4863900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/17"),
        Open = 56.75m,
        High = 57.31m,
        Low = 56.71m,
        Close = 56.89m,
        Volume = 3837800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/18"),
        Open = 57.05m,
        High = 57.19m,
        Low = 56.57m,
        Close = 57.16m,
        Volume = 5383400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/21"),
        Open = 57m,
        High = 57.2m,
        Low = 56.58m,
        Close = 56.84m,
        Volume = 2044400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/22"),
        Open = 57m,
        High = 57.7m,
        Low = 56.95m,
        Close = 57.22m,
        Volume = 3642100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/23"),
        Open = 57.23m,
        High = 57.4m,
        Low = 56.62m,
        Close = 56.85m,
        Volume = 3021000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/24"),
        Open = 57.02m,
        High = 57.24m,
        Low = 56.67m,
        Close = 56.8m,
        Volume = 1658200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/28"),
        Open = 57.3m,
        High = 58.13m,
        Low = 57.26m,
        Close = 58.1m,
        Volume = 3562800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/29"),
        Open = 57.73m,
        High = 58.17m,
        Low = 57m,
        Close = 57.25m,
        Volume = 5281400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/30"),
        Open = 57.25m,
        High = 58.8m,
        Low = 57.25m,
        Close = 58.79m,
        Volume = 3612200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/31"),
        Open = 58.79m,
        High = 58.79m,
        Low = 57.94m,
        Close = 58.46m,
        Volume = 3365400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/01"),
        Open = 58.55m,
        High = 59.12m,
        Low = 58.3m,
        Close = 58.78m,
        Volume = 3835300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/04"),
        Open = 58.6m,
        High = 58.72m,
        Low = 58.01m,
        Close = 58.33m,
        Volume = 2960400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/05"),
        Open = 58.32m,
        High = 59.45m,
        Low = 58.05m,
        Close = 58.33m,
        Volume = 4404000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/06"),
        Open = 58.72m,
        High = 58.78m,
        Low = 58.35m,
        Close = 58.43m,
        Volume = 2589400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/07"),
        Open = 58.45m,
        High = 59.14m,
        Low = 58.3m,
        Close = 59.01m,
        Volume = 3453400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/08"),
        Open = 59m,
        High = 59.01m,
        Low = 58.42m,
        Close = 58.6m,
        Volume = 2493900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/11"),
        Open = 58.75m,
        High = 59.81m,
        Low = 58.75m,
        Close = 59.4m,
        Volume = 4255800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/12"),
        Open = 59.4m,
        High = 59.55m,
        Low = 57.75m,
        Close = 58.45m,
        Volume = 6776600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/13"),
        Open = 58.65m,
        High = 59.05m,
        Low = 58.45m,
        Close = 58.67m,
        Volume = 3816800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/14"),
        Open = 59.05m,
        High = 59.32m,
        Low = 58.13m,
        Close = 58.16m,
        Volume = 3730000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/15"),
        Open = 58.49m,
        High = 58.49m,
        Low = 57m,
        Close = 57m,
        Volume = 3332500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/18"),
        Open = 56.65m,
        High = 57.32m,
        Low = 56.22m,
        Close = 56.92m,
        Volume = 3490800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/19"),
        Open = 56.93m,
        High = 58.36m,
        Low = 56.62m,
        Close = 58.09m,
        Volume = 3564900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/20"),
        Open = 58.1m,
        High = 58.37m,
        Low = 57.23m,
        Close = 57.23m,
        Volume = 3940700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/21"),
        Open = 57.85m,
        High = 59.08m,
        Low = 57.72m,
        Close = 59.08m,
        Volume = 3352000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/22"),
        Open = 58.55m,
        High = 58.84m,
        Low = 57.24m,
        Close = 57.88m,
        Volume = 3015100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/25"),
        Open = 58.8m,
        High = 59.76m,
        Low = 58.8m,
        Close = 59.58m,
        Volume = 3481300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/26"),
        Open = 59.85m,
        High = 60m,
        Low = 58.15m,
        Close = 59m,
        Volume = 5068200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/27"),
        Open = 58.49m,
        High = 60.1m,
        Low = 58.25m,
        Close = 59.66m,
        Volume = 7375900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/28"),
        Open = 60m,
        High = 60m,
        Low = 58.61m,
        Close = 58.72m,
        Volume = 4777600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/29"),
        Open = 59.03m,
        High = 59.6m,
        Low = 58.26m,
        Close = 59.52m,
        Volume = 3665500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/02"),
        Open = 59.52m,
        High = 59.88m,
        Low = 58.9m,
        Close = 59.38m,
        Volume = 4265300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/03"),
        Open = 59.65m,
        High = 60.4m,
        Low = 59.23m,
        Close = 59.87m,
        Volume = 4464000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/04"),
        Open = 59.75m,
        High = 60.48m,
        Low = 59.64m,
        Close = 60.28m,
        Volume = 3280700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/05"),
        Open = 60.1m,
        High = 60.38m,
        Low = 59.59m,
        Close = 59.74m,
        Volume = 3139900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/06"),
        Open = 60.18m,
        High = 61.25m,
        Low = 60.13m,
        Close = 61.01m,
        Volume = 3255500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/09"),
        Open = 60.75m,
        High = 60.96m,
        Low = 60.16m,
        Close = 60.56m,
        Volume = 3837200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/10"),
        Open = 60.56m,
        High = 62.5m,
        Low = 60.5m,
        Close = 61.04m,
        Volume = 9028900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/11"),
        Open = 61.05m,
        High = 61.38m,
        Low = 59.51m,
        Close = 60.4m,
        Volume = 5584000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/12"),
        Open = 60.53m,
        High = 61.25m,
        Low = 60.26m,
        Close = 60.49m,
        Volume = 5362500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/13"),
        Open = 60.89m,
        High = 60.89m,
        Low = 58.62m,
        Close = 59.5m,
        Volume = 4189000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/16"),
        Open = 59.7m,
        High = 60.49m,
        Low = 59.53m,
        Close = 60.41m,
        Volume = 2244300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/17"),
        Open = 60.5m,
        High = 60.97m,
        Low = 60.22m,
        Close = 60.91m,
        Volume = 3440300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/18"),
        Open = 61.17m,
        High = 62.51m,
        Low = 60.43m,
        Close = 61.69m,
        Volume = 4584400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/19"),
        Open = 62.05m,
        High = 62.27m,
        Low = 60.98m,
        Close = 61.35m,
        Volume = 3575500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/20"),
        Open = 61.75m,
        High = 62.24m,
        Low = 61.51m,
        Close = 61.9m,
        Volume = 3716200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/23"),
        Open = 61.95m,
        High = 62.12m,
        Low = 61.54m,
        Close = 61.64m,
        Volume = 3180800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/24"),
        Open = 61.4m,
        High = 62.59m,
        Low = 61.22m,
        Close = 62.25m,
        Volume = 3608400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/25"),
        Open = 61.73m,
        High = 61.8m,
        Low = 61.12m,
        Close = 61.45m,
        Volume = 3097300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/26"),
        Open = 62.05m,
        High = 63m,
        Low = 61.95m,
        Close = 62.99m,
        Volume = 2997900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/27"),
        Open = 63m,
        High = 63.4m,
        Low = 62.82m,
        Close = 63.02m,
        Volume = 2591500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/31"),
        Open = 63.01m,
        High = 64.2m,
        Low = 62.91m,
        Close = 63.9m,
        Volume = 4226900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/01"),
        Open = 63.95m,
        High = 64.05m,
        Low = 63.35m,
        Close = 63.8m,
        Volume = 3584100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/02"),
        Open = 63.8m,
        High = 64.5m,
        Low = 63.51m,
        Close = 64.38m,
        Volume = 2651000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/03"),
        Open = 64.16m,
        High = 64.99m,
        Low = 64.1m,
        Close = 64.66m,
        Volume = 4524200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/06"),
        Open = 64.88m,
        High = 65.76m,
        Low = 64.64m,
        Close = 65.55m,
        Volume = 4049300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/07"),
        Open = 65.55m,
        High = 66.09m,
        Low = 65.28m,
        Close = 65.28m,
        Volume = 5977000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/08"),
        Open = 65.07m,
        High = 65.45m,
        Low = 64.24m,
        Close = 64.47m,
        Volume = 4177000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/09"),
        Open = 64.48m,
        High = 65.19m,
        Low = 64.04m,
        Close = 65.11m,
        Volume = 3444000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/10"),
        Open = 65.05m,
        High = 65.06m,
        Low = 64.11m,
        Close = 64.65m,
        Volume = 2985500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/13"),
        Open = 65.05m,
        High = 65.35m,
        Low = 61.91m,
        Close = 64.63m,
        Volume = 5457000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/14"),
        Open = 64.68m,
        High = 64.8m,
        Low = 62.85m,
        Close = 62.93m,
        Volume = 6141000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/15"),
        Open = 63.4m,
        High = 64.41m,
        Low = 63.21m,
        Close = 64.41m,
        Volume = 3932600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/16"),
        Open = 64.25m,
        High = 64.26m,
        Low = 63.65m,
        Close = 63.69m,
        Volume = 2822600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/17"),
        Open = 64.15m,
        High = 64.78m,
        Low = 63.7m,
        Close = 64.62m,
        Volume = 4519600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/20"),
        Open = 63.9m,
        High = 64.1m,
        Low = 63.58m,
        Close = 63.67m,
        Volume = 2964200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/21"),
        Open = 63.4m,
        High = 63.41m,
        Low = 62.69m,
        Close = 62.78m,
        Volume = 4037800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/22"),
        Open = 62.4m,
        High = 63.37m,
        Low = 62.2m,
        Close = 63.13m,
        Volume = 3484300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/23"),
        Open = 63.14m,
        High = 63.19m,
        Low = 61.79m,
        Close = 61.86m,
        Volume = 2891300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/24"),
        Open = 61.6m,
        High = 61.91m,
        Low = 60.5m,
        Close = 60.59m,
        Volume = 4428600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/27"),
        Open = 60.35m,
        High = 61.81m,
        Low = 59.7m,
        Close = 61.76m,
        Volume = 6840300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/28"),
        Open = 62.1m,
        High = 62.46m,
        Low = 61.27m,
        Close = 62.45m,
        Volume = 3940800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/29"),
        Open = 62.45m,
        High = 62.63m,
        Low = 61.4m,
        Close = 61.67m,
        Volume = 3191600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/30"),
        Open = 64.5m,
        High = 66.85m,
        Low = 64.3m,
        Close = 66m,
        Volume = 17132400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/01"),
        Open = 65.78m,
        High = 65.96m,
        Low = 64.44m,
        Close = 64.68m,
        Volume = 6826500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/05"),
        Open = 64.3m,
        High = 65.44m,
        Low = 64.17m,
        Close = 65.42m,
        Volume = 3310200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/06"),
        Open = 65.5m,
        High = 66.11m,
        Low = 64.2m,
        Close = 64.29m,
        Volume = 3942000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/07"),
        Open = 63.98m,
        High = 65.18m,
        Low = 63.45m,
        Close = 65.18m,
        Volume = 5579400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/08"),
        Open = 65.07m,
        High = 65.24m,
        Low = 64.51m,
        Close = 65.07m,
        Volume = 3715100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/11"),
        Open = 65.25m,
        High = 65.49m,
        Low = 64.78m,
        Close = 64.97m,
        Volume = 1984100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/12"),
        Open = 64.96m,
        High = 64.97m,
        Low = 64.15m,
        Close = 64.3m,
        Volume = 2920800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/13"),
        Open = 64.3m,
        High = 64.89m,
        Low = 64.2m,
        Close = 64.58m,
        Volume = 3111900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/14"),
        Open = 64.95m,
        High = 65.23m,
        Low = 64.37m,
        Close = 64.58m,
        Volume = 2239900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/15"),
        Open = 64.58m,
        High = 64.88m,
        Low = 64.23m,
        Close = 64.75m,
        Volume = 2013900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/18"),
        Open = 64.75m,
        High = 64.86m,
        Low = 64.25m,
        Close = 64.74m,
        Volume = 1897400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/19"),
        Open = 65m,
        High = 65.5m,
        Low = 64.63m,
        Close = 64.89m,
        Volume = 2146000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/20"),
        Open = 64.89m,
        High = 66.28m,
        Low = 64.63m,
        Close = 66.08m,
        Volume = 2609000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/21"),
        Open = 66.18m,
        High = 66.31m,
        Low = 65.69m,
        Close = 65.71m,
        Volume = 4840500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/22"),
        Open = 65.4m,
        High = 66.29m,
        Low = 65.26m,
        Close = 66.2m,
        Volume = 2627000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/25"),
        Open = 66m,
        High = 66.79m,
        Low = 65.98m,
        Close = 66.05m,
        Volume = 2958300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/26"),
        Open = 66.61m,
        High = 67.12m,
        Low = 66.13m,
        Close = 66.35m,
        Volume = 4108300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/27"),
        Open = 67.7m,
        High = 67.95m,
        Low = 66.57m,
        Close = 66.7m,
        Volume = 5108200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/28"),
        Open = 66.71m,
        High = 66.77m,
        Low = 65.6m,
        Close = 66m,
        Volume = 4942100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/29"),
        Open = 66.21m,
        High = 66.82m,
        Low = 66.01m,
        Close = 66.01m,
        Volume = 3557000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/01"),
        Open = 66.3m,
        High = 66.49m,
        Low = 65.64m,
        Close = 65.75m,
        Volume = 2359600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/02"),
        Open = 65.75m,
        High = 66.4m,
        Low = 65.69m,
        Close = 66.33m,
        Volume = 2290000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/03"),
        Open = 65.98m,
        High = 66.68m,
        Low = 65.85m,
        Close = 66.65m,
        Volume = 2238100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/04"),
        Open = 66.64m,
        High = 66.77m,
        Low = 66.01m,
        Close = 66.27m,
        Volume = 2631100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/05"),
        Open = 66.13m,
        High = 66.52m,
        Low = 66.01m,
        Close = 66.19m,
        Volume = 2141400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/08"),
        Open = 66.3m,
        High = 66.5m,
        Low = 65.64m,
        Close = 65.99m,
        Volume = 2206600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/09"),
        Open = 66.3m,
        High = 67.49m,
        Low = 65.97m,
        Close = 67.13m,
        Volume = 3256600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/10"),
        Open = 67.16m,
        High = 67.32m,
        Low = 65.6m,
        Close = 65.96m,
        Volume = 3096800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/11"),
        Open = 66.11m,
        High = 67.31m,
        Low = 66.04m,
        Close = 67.31m,
        Volume = 3083600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/12"),
        Open = 67.31m,
        High = 67.5m,
        Low = 66.1m,
        Close = 66.54m,
        Volume = 2815400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/15"),
        Open = 66.4m,
        High = 67.68m,
        Low = 66.35m,
        Close = 67.46m,
        Volume = 2149700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/16"),
        Open = 67.4m,
        High = 67.72m,
        Low = 66.27m,
        Close = 66.27m,
        Volume = 3267300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/17"),
        Open = 66.39m,
        High = 67.58m,
        Low = 66.38m,
        Close = 67.02m,
        Volume = 2394600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/18"),
        Open = 66.94m,
        High = 67.18m,
        Low = 66.21m,
        Close = 66.63m,
        Volume = 2872900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/19"),
        Open = 66.7m,
        High = 67.45m,
        Low = 66.52m,
        Close = 67.15m,
        Volume = 2279900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/22"),
        Open = 67.39m,
        High = 68.38m,
        Low = 67.34m,
        Close = 67.79m,
        Volume = 3433000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/23"),
        Open = 67.65m,
        High = 67.9m,
        Low = 67.15m,
        Close = 67.43m,
        Volume = 2310200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/24"),
        Open = 67.3m,
        High = 67.95m,
        Low = 67.08m,
        Close = 67.13m,
        Volume = 3522300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/25"),
        Open = 67.13m,
        High = 67.4m,
        Low = 67.05m,
        Close = 67.21m,
        Volume = 2527100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/26"),
        Open = 67.15m,
        High = 67.15m,
        Low = 66.09m,
        Close = 66.31m,
        Volume = 2811800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/29"),
        Open = 66.1m,
        High = 67.66m,
        Low = 66.07m,
        Close = 67.58m,
        Volume = 2946500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/30"),
        Open = 67.3m,
        High = 67.55m,
        Low = 66.45m,
        Close = 66.74m,
        Volume = 3158200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/31"),
        Open = 66.9m,
        High = 67.1m,
        Low = 66.04m,
        Close = 67.02m,
        Volume = 3105800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/01"),
        Open = 66.65m,
        High = 66.85m,
        Low = 65.87m,
        Close = 65.99m,
        Volume = 4029800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/02"),
        Open = 64.87m,
        High = 64.93m,
        Low = 63.95m,
        Close = 64.34m,
        Volume = 6789500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/06"),
        Open = 64.37m,
        High = 65.45m,
        Low = 64.25m,
        Close = 65.03m,
        Volume = 4004200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/07"),
        Open = 64.8m,
        High = 64.82m,
        Low = 64m,
        Close = 64.5m,
        Volume = 4498600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/08"),
        Open = 64.8m,
        High = 64.9m,
        Low = 64.32m,
        Close = 64.62m,
        Volume = 4313100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/09"),
        Open = 64.83m,
        High = 65.63m,
        Low = 64.77m,
        Close = 65.4m,
        Volume = 4197700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/12"),
        Open = 65.15m,
        High = 65.45m,
        Low = 64.74m,
        Close = 65.14m,
        Volume = 2718800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/13"),
        Open = 65.14m,
        High = 65.65m,
        Low = 65.11m,
        Close = 65.4m,
        Volume = 2628900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/14"),
        Open = 65.41m,
        High = 65.69m,
        Low = 63.97m,
        Close = 64.18m,
        Volume = 3534800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/15"),
        Open = 64.19m,
        High = 65.2m,
        Low = 63.95m,
        Close = 65.08m,
        Volume = 4235200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/16"),
        Open = 65.45m,
        High = 65.45m,
        Low = 64.47m,
        Close = 64.8m,
        Volume = 5173600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/19"),
        Open = 64.5m,
        High = 64.6m,
        Low = 63.03m,
        Close = 64.1m,
        Volume = 3717200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/20"),
        Open = 63.85m,
        High = 64.46m,
        Low = 63.34m,
        Close = 63.45m,
        Volume = 3576600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/21"),
        Open = 62.47m,
        High = 63.32m,
        Low = 62.01m,
        Close = 62.41m,
        Volume = 4642200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/22"),
        Open = 62.35m,
        High = 62.81m,
        Low = 62.05m,
        Close = 62.51m,
        Volume = 3181100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/23"),
        Open = 62.56m,
        High = 63.45m,
        Low = 62.4m,
        Close = 63.2m,
        Volume = 3293000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/26"),
        Open = 65.5m,
        High = 65.95m,
        Low = 64.24m,
        Close = 64.67m,
        Volume = 5876500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/27"),
        Open = 64.99m,
        High = 66.71m,
        Low = 64.86m,
        Close = 66.55m,
        Volume = 5394500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/28"),
        Open = 66.5m,
        High = 67.33m,
        Low = 66.31m,
        Close = 67.21m,
        Volume = 4802900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/29"),
        Open = 66.95m,
        High = 67.34m,
        Low = 66.37m,
        Close = 67.28m,
        Volume = 2474100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/30"),
        Open = 67.15m,
        High = 68.25m,
        Low = 66.8m,
        Close = 67.95m,
        Volume = 3109300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/03"),
        Open = 67.92m,
        High = 67.99m,
        Low = 67m,
        Close = 67.14m,
        Volume = 3231500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/04"),
        Open = 67.45m,
        High = 68.48m,
        Low = 67.45m,
        Close = 67.95m,
        Volume = 3605900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/05"),
        Open = 67.45m,
        High = 67.66m,
        Low = 66.87m,
        Close = 67.05m,
        Volume = 3571000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/06"),
        Open = 67.55m,
        High = 68.24m,
        Low = 67.32m,
        Close = 67.93m,
        Volume = 3785600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/07"),
        Open = 67.71m,
        High = 67.71m,
        Low = 66.65m,
        Close = 67.3m,
        Volume = 3593900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/10"),
        Open = 67.06m,
        High = 68.07m,
        Low = 66.72m,
        Close = 67.9m,
        Volume = 2432700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/11"),
        Open = 67.55m,
        High = 67.79m,
        Low = 66.56m,
        Close = 66.7m,
        Volume = 3211600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/12"),
        Open = 66.8m,
        High = 67.9m,
        Low = 66.7m,
        Close = 67.65m,
        Volume = 4424400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/13"),
        Open = 67.27m,
        High = 67.62m,
        Low = 66.24m,
        Close = 66.49m,
        Volume = 4205900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/14"),
        Open = 66.61m,
        High = 67.78m,
        Low = 66.6m,
        Close = 67.5m,
        Volume = 4252600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/17"),
        Open = 67.15m,
        High = 67.45m,
        Low = 66.46m,
        Close = 67.24m,
        Volume = 4176500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/18"),
        Open = 67.11m,
        High = 67.34m,
        Low = 66.55m,
        Close = 67.12m,
        Volume = 4778400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/19"),
        Open = 66.87m,
        High = 68.4m,
        Low = 66.82m,
        Close = 68.37m,
        Volume = 4447200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/20"),
        Open = 68.5m,
        High = 68.98m,
        Low = 67.19m,
        Close = 67.3m,
        Volume = 4304400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/21"),
        Open = 67.28m,
        High = 67.55m,
        Low = 65.83m,
        Close = 66.02m,
        Volume = 7189700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/24"),
        Open = 66.5m,
        High = 67.78m,
        Low = 66.25m,
        Close = 67.32m,
        Volume = 4354000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/25"),
        Open = 67.35m,
        High = 67.35m,
        Low = 66.51m,
        Close = 66.97m,
        Volume = 2957400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/26"),
        Open = 65.4m,
        High = 66.2m,
        Low = 64.22m,
        Close = 65.1m,
        Volume = 10049600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/27"),
        Open = 65.1m,
        High = 65.11m,
        Low = 63.95m,
        Close = 64.05m,
        Volume = 5324900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/28"),
        Open = 64.25m,
        High = 65.75m,
        Low = 63.7m,
        Close = 65.64m,
        Volume = 5235500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/31"),
        Open = 65.8m,
        High = 66.58m,
        Low = 64.59m,
        Close = 64.64m,
        Volume = 6571900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/01"),
        Open = 65m,
        High = 65.7m,
        Low = 64.68m,
        Close = 65.05m,
        Volume = 5603400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/02"),
        Open = 64.72m,
        High = 64.95m,
        Low = 64.2m,
        Close = 64.7m,
        Volume = 5864700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/03"),
        Open = 64.4m,
        High = 65.6m,
        Low = 64.4m,
        Close = 65.5m,
        Volume = 4091100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/04"),
        Open = 65.2m,
        High = 65.71m,
        Low = 65.02m,
        Close = 65.28m,
        Volume = 3544100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/07"),
        Open = 65.48m,
        High = 65.71m,
        Low = 65.3m,
        Close = 65.69m,
        Volume = 2963500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/08"),
        Open = 65.05m,
        High = 65.15m,
        Low = 64.52m,
        Close = 65.01m,
        Volume = 2783100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/09"),
        Open = 65.1m,
        High = 65.32m,
        Low = 64.56m,
        Close = 64.71m,
        Volume = 3528900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/10"),
        Open = 64.77m,
        High = 66.11m,
        Low = 64.74m,
        Close = 66.1m,
        Volume = 3237400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/11"),
        Open = 65.8m,
        High = 65.93m,
        Low = 65.3m,
        Close = 65.35m,
        Volume = 2612400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/14"),
        Open = 65.25m,
        High = 66.61m,
        Low = 64.94m,
        Close = 66.23m,
        Volume = 3869300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/15"),
        Open = 66.21m,
        High = 67.08m,
        Low = 66m,
        Close = 67m,
        Volume = 5196800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/16"),
        Open = 67.1m,
        High = 68.1m,
        Low = 67.1m,
        Close = 67.44m,
        Volume = 4625900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/17"),
        Open = 67.92m,
        High = 68.19m,
        Low = 67.51m,
        Close = 67.65m,
        Volume = 4261100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/18"),
        Open = 67.95m,
        High = 68.1m,
        Low = 66.75m,
        Close = 66.95m,
        Volume = 5573800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/21"),
        Open = 68.13m,
        High = 69.48m,
        Low = 67.9m,
        Close = 69m,
        Volume = 7662900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/22"),
        Open = 69.01m,
        High = 69.1m,
        Low = 68.09m,
        Close = 69.1m,
        Volume = 4233000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/23"),
        Open = 68.95m,
        High = 69.9m,
        Low = 68.89m,
        Close = 69.44m,
        Volume = 2641500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/25"),
        Open = 69.6m,
        High = 69.65m,
        Low = 68.83m,
        Close = 69.06m,
        Volume = 955400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/28"),
        Open = 69.01m,
        High = 69.15m,
        Low = 68.4m,
        Close = 68.63m,
        Volume = 2579800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/29"),
        Open = 69.1m,
        High = 69.68m,
        Low = 69m,
        Close = 69.13m,
        Volume = 2820100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/30"),
        Open = 69.45m,
        High = 69.57m,
        Low = 68.18m,
        Close = 68.19m,
        Volume = 3658700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/01"),
        Open = 68.35m,
        High = 69.77m,
        Low = 68.32m,
        Close = 69.67m,
        Volume = 2979100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/02"),
        Open = 69.82m,
        High = 70m,
        Low = 69.37m,
        Close = 69.44m,
        Volume = 3236400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/05"),
        Open = 69.45m,
        High = 69.6m,
        Low = 68.7m,
        Close = 69.2m,
        Volume = 3890800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/06"),
        Open = 69.65m,
        High = 70m,
        Low = 69.43m,
        Close = 69.57m,
        Volume = 3689900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/07"),
        Open = 69.61m,
        High = 69.96m,
        Low = 69.08m,
        Close = 69.65m,
        Volume = 3562000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/08"),
        Open = 69.66m,
        High = 70.22m,
        Low = 69.24m,
        Close = 70.07m,
        Volume = 3956000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/09"),
        Open = 70.07m,
        High = 70.17m,
        Low = 69.52m,
        Close = 69.65m,
        Volume = 3974600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/12"),
        Open = 70m,
        High = 70.24m,
        Low = 69.54m,
        Close = 70.19m,
        Volume = 2649900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/13"),
        Open = 70m,
        High = 70.94m,
        Low = 69.9m,
        Close = 70.59m,
        Volume = 2721400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/14"),
        Open = 71m,
        High = 71.98m,
        Low = 70.81m,
        Close = 71.45m,
        Volume = 4846900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/15"),
        Open = 71.45m,
        High = 71.98m,
        Low = 70.73m,
        Close = 70.79m,
        Volume = 3564900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/16"),
        Open = 71.05m,
        High = 71.2m,
        Low = 70.48m,
        Close = 70.75m,
        Volume = 5760100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/19"),
        Open = 70.75m,
        High = 70.75m,
        Low = 69.6m,
        Close = 69.97m,
        Volume = 3682000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/20"),
        Open = 70.2m,
        High = 71.09m,
        Low = 70.15m,
        Close = 70.74m,
        Volume = 2636500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/21"),
        Open = 70.97m,
        High = 71.51m,
        Low = 70.38m,
        Close = 70.39m,
        Volume = 2878200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/22"),
        Open = 70.95m,
        High = 71.39m,
        Low = 70.83m,
        Close = 71.32m,
        Volume = 2235200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/23"),
        Open = 71.95m,
        High = 72.05m,
        Low = 71.42m,
        Close = 71.49m,
        Volume = 2615000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/27"),
        Open = 71.9m,
        High = 72.4m,
        Low = 70.47m,
        Close = 70.53m,
        Volume = 2662600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/28"),
        Open = 70.86m,
        High = 71.23m,
        Low = 70.69m,
        Close = 70.96m,
        Volume = 1649900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/29"),
        Open = 71.2m,
        High = 71.62m,
        Low = 71.14m,
        Close = 71.18m,
        Volume = 1937900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/30"),
        Open = 71.05m,
        High = 71.06m,
        Low = 70.16m,
        Close = 70.24m,
        Volume = 1814500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/03"),
        Open = 70.4m,
        High = 70.6m,
        Low = 69.33m,
        Close = 70.34m,
        Volume = 4913600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/04"),
        Open = 70.08m,
        High = 71.27m,
        Low = 69.86m,
        Close = 71.17m,
        Volume = 3158400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/05"),
        Open = 70.55m,
        High = 70.55m,
        Low = 69.58m,
        Close = 70.33m,
        Volume = 4547600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/06"),
        Open = 70.34m,
        High = 70.5m,
        Low = 69.05m,
        Close = 69.35m,
        Volume = 4764100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/09"),
        Open = 69.28m,
        High = 69.4m,
        Low = 68.66m,
        Close = 68.77m,
        Volume = 4545300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/10"),
        Open = 68.8m,
        High = 69.24m,
        Low = 68.57m,
        Close = 69.1m,
        Volume = 3851200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/11"),
        Open = 69.97m,
        High = 70.3m,
        Low = 69.11m,
        Close = 70.1m,
        Volume = 4939800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/12"),
        Open = 70.25m,
        High = 70.45m,
        Low = 69.54m,
        Close = 69.69m,
        Volume = 2345400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/13"),
        Open = 69.64m,
        High = 70.2m,
        Low = 68.79m,
        Close = 69.48m,
        Volume = 2963100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/17"),
        Open = 69.07m,
        High = 69.4m,
        Low = 68.66m,
        Close = 68.69m,
        Volume = 2710100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/18"),
        Open = 68.55m,
        High = 68.92m,
        Low = 68.05m,
        Close = 68.33m,
        Volume = 2623700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/19"),
        Open = 68.16m,
        High = 68.49m,
        Low = 67.72m,
        Close = 68.17m,
        Volume = 2485600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/20"),
        Open = 68.1m,
        High = 68.16m,
        Low = 66.49m,
        Close = 66.5m,
        Volume = 6407200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/23"),
        Open = 65.9m,
        High = 67.34m,
        Low = 65.9m,
        Close = 67.02m,
        Volume = 3967900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/24"),
        Open = 67.41m,
        High = 67.88m,
        Low = 67.13m,
        Close = 67.66m,
        Volume = 3556000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/25"),
        Open = 67.71m,
        High = 67.91m,
        Low = 66.91m,
        Close = 66.91m,
        Volume = 3685600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/26"),
        Open = 67.44m,
        High = 68.75m,
        Low = 67.32m,
        Close = 68.72m,
        Volume = 4765800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/27"),
        Open = 68.39m,
        High = 69.25m,
        Low = 67.99m,
        Close = 68.56m,
        Volume = 3951900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/30"),
        Open = 68.52m,
        High = 69.05m,
        Low = 68.2m,
        Close = 69.03m,
        Volume = 2018500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/31"),
        Open = 69m,
        High = 69.05m,
        Low = 68.31m,
        Close = 68.31m,
        Volume = 4023300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/01"),
        Open = 70m,
        High = 72.17m,
        Low = 70m,
        Close = 71.62m,
        Volume = 11548100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/02"),
        Open = 71.35m,
        High = 72.3m,
        Low = 71.3m,
        Close = 71.7m,
        Volume = 6599700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/03"),
        Open = 71.7m,
        High = 72.09m,
        Low = 70.86m,
        Close = 70.87m,
        Volume = 3780800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/06"),
        Open = 70.65m,
        High = 71.64m,
        Low = 70.3m,
        Close = 71.14m,
        Volume = 2984100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/07"),
        Open = 71.3m,
        High = 72.05m,
        Low = 71.16m,
        Close = 71.55m,
        Volume = 4219700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/08"),
        Open = 71.25m,
        High = 71.93m,
        Low = 71m,
        Close = 71.76m,
        Volume = 2859200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/09"),
        Open = 71.77m,
        High = 72.76m,
        Low = 71.37m,
        Close = 72.01m,
        Volume = 4144400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/10"),
        Open = 72.1m,
        High = 72.7m,
        Low = 72.03m,
        Close = 72.53m,
        Volume = 2806800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/13"),
        Open = 71.95m,
        High = 72.64m,
        Low = 71.82m,
        Close = 72.11m,
        Volume = 3293500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/14"),
        Open = 72.35m,
        High = 72.86m,
        Low = 71.93m,
        Close = 72.71m,
        Volume = 4151800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/15"),
        Open = 72.37m,
        High = 72.74m,
        Low = 72.05m,
        Close = 72.45m,
        Volume = 2764700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/16"),
        Open = 72.65m,
        High = 72.93m,
        Low = 72.2m,
        Close = 72.55m,
        Volume = 2211500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/17"),
        Open = 72.55m,
        High = 73m,
        Low = 72.28m,
        Close = 72.96m,
        Volume = 2668300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/21"),
        Open = 73.15m,
        High = 73.4m,
        Low = 72.65m,
        Close = 73.05m,
        Volume = 3245900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/22"),
        Open = 73.06m,
        High = 74.61m,
        Low = 73.06m,
        Close = 74.39m,
        Volume = 4997000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/23"),
        Open = 73.95m,
        High = 74.2m,
        Low = 73.78m,
        Close = 73.9m,
        Volume = 2570800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/24"),
        Open = 73.65m,
        High = 74.59m,
        Low = 73.31m,
        Close = 74.31m,
        Volume = 2627400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/27"),
        Open = 74.05m,
        High = 74.89m,
        Low = 74m,
        Close = 74.13m,
        Volume = 1973500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/28"),
        Open = 73.9m,
        High = 74m,
        Low = 72.36m,
        Close = 72.69m,
        Volume = 3873700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/01"),
        Open = 72.56m,
        High = 73.08m,
        Low = 72.25m,
        Close = 72.95m,
        Volume = 2043100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/02"),
        Open = 72.75m,
        High = 73.35m,
        Low = 72.34m,
        Close = 72.8m,
        Volume = 1780900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/03"),
        Open = 72.81m,
        High = 74.4m,
        Low = 72.51m,
        Close = 73.39m,
        Volume = 2707000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/06"),
        Open = 73.7m,
        High = 73.71m,
        Low = 72.3m,
        Close = 72.63m,
        Volume = 2143800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/07"),
        Open = 72.66m,
        High = 73.23m,
        Low = 72.37m,
        Close = 73.16m,
        Volume = 1918500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/08"),
        Open = 72.85m,
        High = 72.86m,
        Low = 71.9m,
        Close = 72.82m,
        Volume = 2383100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/09"),
        Open = 72.75m,
        High = 74.25m,
        Low = 72.5m,
        Close = 73.76m,
        Volume = 3000300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/10"),
        Open = 73.77m,
        High = 74.9m,
        Low = 73.2m,
        Close = 74.79m,
        Volume = 3020900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/13"),
        Open = 75.21m,
        High = 75.9m,
        Low = 74.5m,
        Close = 74.84m,
        Volume = 3637300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/14"),
        Open = 74.84m,
        High = 75.63m,
        Low = 74.72m,
        Close = 75.45m,
        Volume = 2601400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/15"),
        Open = 75.4m,
        High = 76.3m,
        Low = 75.27m,
        Close = 76.05m,
        Volume = 2594500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/16"),
        Open = 76.25m,
        High = 77.05m,
        Low = 76.1m,
        Close = 76.73m,
        Volume = 2631200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/17"),
        Open = 77.2m,
        High = 78.08m,
        Low = 77.05m,
        Close = 77.85m,
        Volume = 4535100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/20"),
        Open = 78.5m,
        High = 78.86m,
        Low = 77.83m,
        Close = 78.18m,
        Volume = 3354300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/21"),
        Open = 78.8m,
        High = 79.2m,
        Low = 78.25m,
        Close = 78.26m,
        Volume = 3868700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/22"),
        Open = 78.6m,
        High = 78.8m,
        Low = 78m,
        Close = 78.61m,
        Volume = 2472900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/23"),
        Open = 78.61m,
        High = 78.62m,
        Low = 77.51m,
        Close = 77.9m,
        Volume = 2234900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/24"),
        Open = 78.05m,
        High = 79.11m,
        Low = 78.05m,
        Close = 78.62m,
        Volume = 2821700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/27"),
        Open = 78.73m,
        High = 78.75m,
        Low = 77.82m,
        Close = 78.39m,
        Volume = 3126300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/28"),
        Open = 78.5m,
        High = 79m,
        Low = 77.37m,
        Close = 77.51m,
        Volume = 2876500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/29"),
        Open = 77.95m,
        High = 79.48m,
        Low = 77.86m,
        Close = 79.18m,
        Volume = 4042300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/30"),
        Open = 78.95m,
        High = 79.5m,
        Low = 78.06m,
        Close = 78.42m,
        Volume = 2912700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/31"),
        Open = 78.6m,
        High = 78.92m,
        Low = 77.81m,
        Close = 77.93m,
        Volume = 2279000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/03"),
        Open = 78.25m,
        High = 79.13m,
        Low = 78.01m,
        Close = 78.01m,
        Volume = 3292700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/04"),
        Open = 78.58m,
        High = 78.85m,
        Low = 77.5m,
        Close = 78.6m,
        Volume = 2597600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/05"),
        Open = 78.85m,
        High = 79.19m,
        Low = 77.82m,
        Close = 79.11m,
        Volume = 3071700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/06"),
        Open = 79.22m,
        High = 80.13m,
        Low = 79.22m,
        Close = 79.82m,
        Volume = 2904500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/07"),
        Open = 79.99m,
        High = 80.37m,
        Low = 78.72m,
        Close = 79.57m,
        Volume = 2683800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/10"),
        Open = 79.62m,
        High = 80.92m,
        Low = 79.61m,
        Close = 80.79m,
        Volume = 2806400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/11"),
        Open = 80.63m,
        High = 80.71m,
        Low = 79.71m,
        Close = 80.57m,
        Volume = 2747500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/12"),
        Open = 81.12m,
        High = 84.23m,
        Low = 81.11m,
        Close = 83.21m,
        Volume = 6161600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/13"),
        Open = 83.7m,
        High = 83.7m,
        Low = 82.81m,
        Close = 82.93m,
        Volume = 3227900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/17"),
        Open = 83.2m,
        High = 83.99m,
        Low = 81.95m,
        Close = 82.35m,
        Volume = 3275100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/18"),
        Open = 82.42m,
        High = 83.37m,
        Low = 81.88m,
        Close = 83.3m,
        Volume = 4302800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/19"),
        Open = 83.75m,
        High = 84.99m,
        Low = 83.7m,
        Close = 84.96m,
        Volume = 3355500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/20"),
        Open = 84.71m,
        High = 86.26m,
        Low = 84.71m,
        Close = 85.5m,
        Volume = 4439200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/21"),
        Open = 86.2m,
        High = 86.58m,
        Low = 85.86m,
        Close = 86.46m,
        Volume = 4153500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/24"),
        Open = 86.66m,
        High = 87.25m,
        Low = 86.1m,
        Close = 86.1m,
        Volume = 3562800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/25"),
        Open = 86.35m,
        High = 86.48m,
        Low = 84.9m,
        Close = 85.11m,
        Volume = 4645900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/26"),
        Open = 84.16m,
        High = 86.1m,
        Low = 83.2m,
        Close = 84.91m,
        Volume = 5901500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/27"),
        Open = 84.54m,
        High = 84.7m,
        Low = 83.1m,
        Close = 84.1m,
        Volume = 3782700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/28"),
        Open = 84.28m,
        High = 84.66m,
        Low = 83.01m,
        Close = 83.45m,
        Volume = 3755800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/01"),
        Open = 83.45m,
        High = 84.12m,
        Low = 82.82m,
        Close = 83.86m,
        Volume = 3527400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/02"),
        Open = 84.26m,
        High = 85.82m,
        Low = 83.86m,
        Close = 85.33m,
        Volume = 2988800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/03"),
        Open = 85.4m,
        High = 86.03m,
        Low = 85.22m,
        Close = 85.87m,
        Volume = 3039800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/04"),
        Open = 85.89m,
        High = 87.15m,
        Low = 85.81m,
        Close = 86.64m,
        Volume = 3316200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/05"),
        Open = 87.47m,
        High = 88.55m,
        Low = 87.3m,
        Close = 88.47m,
        Volume = 3264600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/08"),
        Open = 88.48m,
        High = 89.3m,
        Low = 87.36m,
        Close = 87.59m,
        Volume = 3298800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/09"),
        Open = 87.61m,
        High = 88m,
        Low = 87.1m,
        Close = 87.99m,
        Volume = 2215300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/10"),
        Open = 88m,
        High = 89.58m,
        Low = 87.65m,
        Close = 88.94m,
        Volume = 3781500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/11"),
        Open = 89.45m,
        High = 89.55m,
        Low = 87.9m,
        Close = 88.21m,
        Volume = 2652000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/12"),
        Open = 88.21m,
        High = 89.01m,
        Low = 86.94m,
        Close = 87.01m,
        Volume = 2929500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/15"),
        Open = 85.76m,
        High = 86.47m,
        Low = 84.57m,
        Close = 85.86m,
        Volume = 4161200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/16"),
        Open = 85.89m,
        High = 86.98m,
        Low = 85.35m,
        Close = 86.4m,
        Volume = 3042700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/17"),
        Open = 86.4m,
        High = 86.4m,
        Low = 83.28m,
        Close = 83.77m,
        Volume = 5266500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/18"),
        Open = 84.25m,
        High = 84.84m,
        Low = 82.6m,
        Close = 82.73m,
        Volume = 3603600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/19"),
        Open = 83m,
        High = 85.3m,
        Low = 82.06m,
        Close = 84.61m,
        Volume = 5504600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/22"),
        Open = 84.46m,
        High = 86.03m,
        Low = 84.02m,
        Close = 85.71m,
        Volume = 4494900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/23"),
        Open = 86.04m,
        High = 86.7m,
        Low = 85.15m,
        Close = 85.15m,
        Volume = 4037600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/24"),
        Open = 84.97m,
        High = 85.15m,
        Low = 81.63m,
        Close = 82.38m,
        Volume = 6654100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/25"),
        Open = 82.8m,
        High = 83.8m,
        Low = 82.29m,
        Close = 82.99m,
        Volume = 3288800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/26"),
        Open = 83.6m,
        High = 83.81m,
        Low = 83.05m,
        Close = 83.5m,
        Volume = 2353300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/30"),
        Open = 83.5m,
        High = 83.5m,
        Low = 81.57m,
        Close = 82.13m,
        Volume = 3810200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/31"),
        Open = 81.21m,
        High = 83.44m,
        Low = 81.21m,
        Close = 83.25m,
        Volume = 3689900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/01"),
        Open = 83.6m,
        High = 83.72m,
        Low = 82.55m,
        Close = 83.64m,
        Volume = 2367300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/02"),
        Open = 84m,
        High = 84.58m,
        Low = 83.17m,
        Close = 83.8m,
        Volume = 3201700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/05"),
        Open = 83.79m,
        High = 83.97m,
        Low = 82.06m,
        Close = 82.13m,
        Volume = 3398200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/06"),
        Open = 82m,
        High = 82.34m,
        Low = 79.47m,
        Close = 80.65m,
        Volume = 6301800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/07"),
        Open = 80.83m,
        High = 81.92m,
        Low = 80.29m,
        Close = 81.46m,
        Volume = 5007800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/08"),
        Open = 81.46m,
        High = 81.84m,
        Low = 79.01m,
        Close = 81.19m,
        Volume = 6931500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/09"),
        Open = 81.95m,
        High = 81.99m,
        Low = 80m,
        Close = 80.5m,
        Volume = 3927700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/12"),
        Open = 80.6m,
        High = 80.75m,
        Low = 77.47m,
        Close = 77.88m,
        Volume = 5243900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/13"),
        Open = 77.77m,
        High = 77.88m,
        Low = 76.4m,
        Close = 76.98m,
        Volume = 5152600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/14"),
        Open = 79.4m,
        High = 82.01m,
        Low = 79.2m,
        Close = 82.01m,
        Volume = 9526200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/15"),
        Open = 82.01m,
        High = 85.13m,
        Low = 82.01m,
        Close = 84.81m,
        Volume = 7885000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/16"),
        Open = 85.1m,
        High = 85.85m,
        Low = 84.75m,
        Close = 85.54m,
        Volume = 5997400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/19"),
        Open = 85.65m,
        High = 86.23m,
        Low = 84.31m,
        Close = 84.76m,
        Volume = 4326700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/20"),
        Open = 85.25m,
        High = 85.48m,
        Low = 84.05m,
        Close = 84.85m,
        Volume = 3090900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/21"),
        Open = 84.9m,
        High = 86.08m,
        Low = 84.9m,
        Close = 85.85m,
        Volume = 3588000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/22"),
        Open = 85.55m,
        High = 85.68m,
        Low = 83.88m,
        Close = 84.06m,
        Volume = 3617000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/23"),
        Open = 84.06m,
        High = 84.48m,
        Low = 83.16m,
        Close = 83.39m,
        Volume = 3062500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/26"),
        Open = 83.48m,
        High = 84.28m,
        Low = 82.8m,
        Close = 83.89m,
        Volume = 1927700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/27"),
        Open = 83.85m,
        High = 84.2m,
        Low = 81.76m,
        Close = 81.93m,
        Volume = 3210200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/28"),
        Open = 81.94m,
        High = 82.69m,
        Low = 80.83m,
        Close = 82.64m,
        Volume = 3167900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/29"),
        Open = 82.64m,
        High = 83.5m,
        Low = 81.28m,
        Close = 83m,
        Volume = 5179900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/30"),
        Open = 82.99m,
        High = 83m,
        Low = 81.57m,
        Close = 81.91m,
        Volume = 4432300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/03"),
        Open = 81.35m,
        High = 81.67m,
        Low = 80.94m,
        Close = 81.3m,
        Volume = 1626700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/05"),
        Open = 81.28m,
        High = 81.29m,
        Low = 79.26m,
        Close = 80.17m,
        Volume = 5547300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/06"),
        Open = 80.27m,
        High = 80.98m,
        Low = 80m,
        Close = 80.81m,
        Volume = 3193500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/07"),
        Open = 80.4m,
        High = 81.29m,
        Low = 79.53m,
        Close = 79.99m,
        Volume = 2584400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/10"),
        Open = 80.03m,
        High = 81.25m,
        Low = 80.03m,
        Close = 80.35m,
        Volume = 2651800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/11"),
        Open = 80.1m,
        High = 81.81m,
        Low = 78.86m,
        Close = 81.63m,
        Volume = 3811200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/12"),
        Open = 81.45m,
        High = 81.95m,
        Low = 80.37m,
        Close = 80.92m,
        Volume = 2658400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/13"),
        Open = 80.7m,
        High = 81.04m,
        Low = 79.47m,
        Close = 79.59m,
        Volume = 3570300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/14"),
        Open = 79.59m,
        High = 79.6m,
        Low = 76.89m,
        Close = 77.25m,
        Volume = 5413100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/17"),
        Open = 78.11m,
        High = 79.77m,
        Low = 77.8m,
        Close = 78.95m,
        Volume = 4481400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/18"),
        Open = 79.5m,
        High = 80.26m,
        Low = 77.97m,
        Close = 79.17m,
        Volume = 4306900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/19"),
        Open = 79.32m,
        High = 82.57m,
        Low = 78.36m,
        Close = 82.29m,
        Volume = 5049500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/20"),
        Open = 82.9m,
        High = 83m,
        Low = 80.62m,
        Close = 80.69m,
        Volume = 4441300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/21"),
        Open = 80.69m,
        High = 80.69m,
        Low = 78.56m,
        Close = 79.08m,
        Volume = 3978900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/24"),
        Open = 79.45m,
        High = 81.61m,
        Low = 79.43m,
        Close = 81.44m,
        Volume = 3977300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/25"),
        Open = 80.75m,
        High = 84.06m,
        Low = 80.7m,
        Close = 83.75m,
        Volume = 4550300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/26"),
        Open = 82.18m,
        High = 82.36m,
        Low = 79.6m,
        Close = 79.9m,
        Volume = 6552900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/27"),
        Open = 80m,
        High = 80.29m,
        Low = 78.15m,
        Close = 78.71m,
        Volume = 5143600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/28"),
        Open = 79.4m,
        High = 80.1m,
        Low = 78.7m,
        Close = 78.91m,
        Volume = 4315700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/31"),
        Open = 78.46m,
        High = 78.52m,
        Low = 77.1m,
        Close = 77.42m,
        Volume = 5472900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/01"),
        Open = 77.42m,
        High = 78.28m,
        Low = 76.52m,
        Close = 78.17m,
        Volume = 4215500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/02"),
        Open = 78.7m,
        High = 79.65m,
        Low = 78.4m,
        Close = 78.62m,
        Volume = 3783300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/03"),
        Open = 77.88m,
        High = 79.89m,
        Low = 77.42m,
        Close = 79.4m,
        Volume = 3681100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/04"),
        Open = 80.16m,
        High = 80.7m,
        Low = 79.15m,
        Close = 79.49m,
        Volume = 3584000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/07"),
        Open = 79.1m,
        High = 79.95m,
        Low = 78.62m,
        Close = 79.75m,
        Volume = 3225200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/08"),
        Open = 79.55m,
        High = 80.83m,
        Low = 77.84m,
        Close = 78.15m,
        Volume = 5674200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/09"),
        Open = 78.25m,
        High = 79.02m,
        Low = 76.71m,
        Close = 77.16m,
        Volume = 4000800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/10"),
        Open = 76.8m,
        High = 76.8m,
        Low = 75.07m,
        Close = 76.2m,
        Volume = 5604200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/11"),
        Open = 76.22m,
        High = 76.76m,
        Low = 75.66m,
        Close = 75.96m,
        Volume = 3273200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/14"),
        Open = 76.65m,
        High = 77.19m,
        Low = 75.15m,
        Close = 75.39m,
        Volume = 3519700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/15"),
        Open = 76m,
        High = 76.7m,
        Low = 75.69m,
        Close = 76.58m,
        Volume = 3511500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/16"),
        Open = 77.2m,
        High = 78.95m,
        Low = 76.86m,
        Close = 78.83m,
        Volume = 4139200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/17"),
        Open = 78.83m,
        High = 79.43m,
        Low = 77.88m,
        Close = 78.59m,
        Volume = 2878300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/18"),
        Open = 78.68m,
        High = 78.68m,
        Low = 77.16m,
        Close = 77.62m,
        Volume = 3425000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/21"),
        Open = 77.62m,
        High = 77.62m,
        Low = 76.51m,
        Close = 76.63m,
        Volume = 2494200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/22"),
        Open = 77m,
        High = 77.85m,
        Low = 76.25m,
        Close = 76.95m,
        Volume = 2632600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/23"),
        Open = 77m,
        High = 77.55m,
        Low = 76.07m,
        Close = 76.36m,
        Volume = 2435300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/24"),
        Open = 76.85m,
        High = 77.04m,
        Low = 75m,
        Close = 75.24m,
        Volume = 3304500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/25"),
        Open = 75.24m,
        High = 75.6m,
        Low = 73.55m,
        Close = 73.93m,
        Volume = 4596100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/28"),
        Open = 74.04m,
        High = 75.02m,
        Low = 73.05m,
        Close = 74.72m,
        Volume = 4737400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/29"),
        Open = 75.96m,
        High = 75.99m,
        Low = 72.9m,
        Close = 73.78m,
        Volume = 7171700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/30"),
        Open = 74m,
        High = 75.3m,
        Low = 73.64m,
        Close = 75.02m,
        Volume = 3574100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/31"),
        Open = 74.75m,
        High = 75.58m,
        Low = 74.75m,
        Close = 74.9m,
        Volume = 3049600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/01"),
        Open = 75m,
        High = 75.91m,
        Low = 74.46m,
        Close = 75.43m,
        Volume = 3272200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/05"),
        Open = 75.75m,
        High = 76.3m,
        Low = 74.71m,
        Close = 75.36m,
        Volume = 2663500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/06"),
        Open = 75.36m,
        High = 75.55m,
        Low = 74.2m,
        Close = 74.44m,
        Volume = 3034200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/07"),
        Open = 74.44m,
        High = 74.44m,
        Low = 72.76m,
        Close = 72.87m,
        Volume = 4256100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/08"),
        Open = 73.3m,
        High = 73.62m,
        Low = 72.17m,
        Close = 72.8m,
        Volume = 4955200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/11"),
        Open = 72.13m,
        High = 74.13m,
        Low = 72.13m,
        Close = 73.82m,
        Volume = 3497600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/12"),
        Open = 73.79m,
        High = 74.38m,
        Low = 73.61m,
        Close = 74.26m,
        Volume = 3107400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/13"),
        Open = 74.36m,
        High = 76.49m,
        Low = 74.36m,
        Close = 76.32m,
        Volume = 4852700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/14"),
        Open = 75.07m,
        High = 75.64m,
        Low = 74.65m,
        Close = 75.01m,
        Volume = 4983600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/15"),
        Open = 75.56m,
        High = 76m,
        Low = 74.73m,
        Close = 75.01m,
        Volume = 4161000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/18"),
        Open = 75.1m,
        High = 75.64m,
        Low = 74.8m,
        Close = 75.21m,
        Volume = 2312200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/19"),
        Open = 75.35m,
        High = 75.5m,
        Low = 74.15m,
        Close = 74.87m,
        Volume = 2350400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/20"),
        Open = 75.51m,
        High = 76.4m,
        Low = 75.51m,
        Close = 76.19m,
        Volume = 3996800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/21"),
        Open = 77.05m,
        High = 77.27m,
        Low = 75.75m,
        Close = 76.11m,
        Volume = 4429500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/22"),
        Open = 76.2m,
        High = 77.77m,
        Low = 75.74m,
        Close = 77.25m,
        Volume = 4682000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/25"),
        Open = 77.7m,
        High = 78.55m,
        Low = 77.37m,
        Close = 77.71m,
        Volume = 4585100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/26"),
        Open = 78.15m,
        High = 79.29m,
        Low = 77.37m,
        Close = 79m,
        Volume = 4247500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/27"),
        Open = 79.17m,
        High = 79.96m,
        Low = 79.17m,
        Close = 79.41m,
        Volume = 4174800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/28"),
        Open = 79.57m,
        High = 80.35m,
        Low = 79.25m,
        Close = 79.28m,
        Volume = 4394600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/29"),
        Open = 79.5m,
        High = 79.75m,
        Low = 78.79m,
        Close = 78.85m,
        Volume = 4027800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/02"),
        Open = 79.35m,
        High = 80.28m,
        Low = 78.84m,
        Close = 79.97m,
        Volume = 5723800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/03"),
        Open = 79.98m,
        High = 82.09m,
        Low = 79.98m,
        Close = 81.78m,
        Volume = 5805000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/04"),
        Open = 82.5m,
        High = 83.98m,
        Low = 82.01m,
        Close = 83.96m,
        Volume = 7114900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/05"),
        Open = 83.97m,
        High = 84.12m,
        Low = 83.06m,
        Close = 83.62m,
        Volume = 3622700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/06"),
        Open = 83.62m,
        High = 84.39m,
        Low = 83.14m,
        Close = 83.68m,
        Volume = 3649400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/09"),
        Open = 83.69m,
        High = 83.87m,
        Low = 82.47m,
        Close = 82.65m,
        Volume = 4427400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/10"),
        Open = 82.5m,
        High = 82.67m,
        Low = 81.8m,
        Close = 82.13m,
        Volume = 4003300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/11"),
        Open = 81.95m,
        High = 82m,
        Low = 80.89m,
        Close = 81.64m,
        Volume = 3255400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/12"),
        Open = 82.2m,
        High = 83.86m,
        Low = 82.1m,
        Close = 83.64m,
        Volume = 4101400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/13"),
        Open = 83.25m,
        High = 83.35m,
        Low = 81.82m,
        Close = 82.39m,
        Volume = 4001600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/16"),
        Open = 82.39m,
        High = 82.85m,
        Low = 81.64m,
        Close = 82.66m,
        Volume = 2472600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/17"),
        Open = 82.45m,
        High = 82.45m,
        Low = 81.5m,
        Close = 82.29m,
        Volume = 2914500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/18"),
        Open = 82.52m,
        High = 83.46m,
        Low = 81.95m,
        Close = 82.74m,
        Volume = 3623400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/19"),
        Open = 82.74m,
        High = 82.96m,
        Low = 81.77m,
        Close = 82.41m,
        Volume = 2336300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/20"),
        Open = 82.9m,
        High = 82.9m,
        Low = 81.7m,
        Close = 81.74m,
        Volume = 3011600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/23"),
        Open = 81.73m,
        High = 82.84m,
        Low = 81.5m,
        Close = 82.8m,
        Volume = 2797200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/24"),
        Open = 83.1m,
        High = 83.89m,
        Low = 82.72m,
        Close = 83.59m,
        Volume = 3812400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/25"),
        Open = 82.6m,
        High = 82.6m,
        Low = 80.6m,
        Close = 80.86m,
        Volume = 6881500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/26"),
        Open = 80.75m,
        High = 80.75m,
        Low = 77.77m,
        Close = 79.14m,
        Volume = 10610100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/27"),
        Open = 79.17m,
        High = 80.4m,
        Low = 78.52m,
        Close = 79.74m,
        Volume = 6811700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/30"),
        Open = 80.25m,
        High = 81.04m,
        Low = 80.01m,
        Close = 80.22m,
        Volume = 3737300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/31"),
        Open = 80.6m,
        High = 80.6m,
        Low = 79.31m,
        Close = 79.86m,
        Volume = 3663300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/01"),
        Open = 80.01m,
        High = 80.75m,
        Low = 79.72m,
        Close = 80.06m,
        Volume = 3175300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/02"),
        Open = 80.06m,
        High = 80.4m,
        Low = 79.11m,
        Close = 79.2m,
        Volume = 2678000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/03"),
        Open = 79.47m,
        High = 80.35m,
        Low = 79.39m,
        Close = 79.97m,
        Volume = 2679700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/06"),
        Open = 79.98m,
        High = 80.87m,
        Low = 79.98m,
        Close = 80.48m,
        Volume = 2921400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/07"),
        Open = 80.73m,
        High = 84.98m,
        Low = 80.6m,
        Close = 84.85m,
        Volume = 11839200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/08"),
        Open = 84.25m,
        High = 85.87m,
        Low = 83.53m,
        Close = 85.45m,
        Volume = 8444000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/09"),
        Open = 85.75m,
        High = 86.5m,
        Low = 85.05m,
        Close = 85.11m,
        Volume = 6138100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/10"),
        Open = 86.4m,
        High = 86.98m,
        Low = 85.44m,
        Close = 85.62m,
        Volume = 5452800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/13"),
        Open = 85.7m,
        High = 86.34m,
        Low = 85.29m,
        Close = 85.69m,
        Volume = 3313800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/14"),
        Open = 85.69m,
        High = 86.09m,
        Low = 84.76m,
        Close = 85.74m,
        Volume = 3422200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/15"),
        Open = 86.4m,
        High = 87.58m,
        Low = 86.35m,
        Close = 87.08m,
        Volume = 5833600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/16"),
        Open = 87.92m,
        High = 89.43m,
        Low = 87.5m,
        Close = 88.71m,
        Volume = 6935200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/17"),
        Open = 89.05m,
        High = 89.63m,
        Low = 88.57m,
        Close = 89.52m,
        Volume = 5719300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/20"),
        Open = 89.05m,
        High = 89.22m,
        Low = 88.62m,
        Close = 89.12m,
        Volume = 5388700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/21"),
        Open = 89.85m,
        High = 92.05m,
        Low = 89.57m,
        Close = 91.1m,
        Volume = 8392400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/22"),
        Open = 91.1m,
        High = 91.59m,
        Low = 89.78m,
        Close = 90.1m,
        Volume = 4480400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/24"),
        Open = 89.25m,
        High = 90.08m,
        Low = 89.15m,
        Close = 89.77m,
        Volume = 1180100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/27"),
        Open = 90m,
        High = 90.03m,
        Low = 86.95m,
        Close = 87.37m,
        Volume = 6257700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/28"),
        Open = 88.15m,
        High = 88.74m,
        Low = 87.05m,
        Close = 87.94m,
        Volume = 4938600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/29"),
        Open = 88.24m,
        High = 89.45m,
        Low = 87.93m,
        Close = 88.89m,
        Volume = 4134100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/30"),
        Open = 89.1m,
        High = 89.44m,
        Low = 87.1m,
        Close = 88.53m,
        Volume = 4186600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/01"),
        Open = 89.6m,
        High = 90.05m,
        Low = 88.65m,
        Close = 89.55m,
        Volume = 5142600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/04"),
        Open = 89.55m,
        High = 90.6m,
        Low = 89.42m,
        Close = 89.58m,
        Volume = 3480000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/05"),
        Open = 89.59m,
        High = 91.1m,
        Low = 89.17m,
        Close = 90.73m,
        Volume = 4355400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/06"),
        Open = 91.6m,
        High = 91.85m,
        Low = 90.76m,
        Close = 90.83m,
        Volume = 4118200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/07"),
        Open = 91.3m,
        High = 91.65m,
        Low = 89.75m,
        Close = 90.01m,
        Volume = 2969200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/08"),
        Open = 90.07m,
        High = 90.72m,
        Low = 89.53m,
        Close = 90.13m,
        Volume = 2774600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/11"),
        Open = 89.77m,
        High = 90.2m,
        Low = 89.52m,
        Close = 89.78m,
        Volume = 2363800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/12"),
        Open = 90.03m,
        High = 90.75m,
        Low = 89.75m,
        Close = 90.31m,
        Volume = 3626100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/13"),
        Open = 90.82m,
        High = 90.99m,
        Low = 89.39m,
        Close = 89.6m,
        Volume = 3676200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/14"),
        Open = 89.3m,
        High = 90.13m,
        Low = 89.08m,
        Close = 89.93m,
        Volume = 3481800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/15"),
        Open = 90.17m,
        High = 90.9m,
        Low = 90.17m,
        Close = 90.7m,
        Volume = 5290200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/18"),
        Open = 90.75m,
        High = 90.9m,
        Low = 89.41m,
        Close = 89.56m,
        Volume = 2601900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/19"),
        Open = 89m,
        High = 90.44m,
        Low = 88.97m,
        Close = 90.17m,
        Volume = 2622400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/20"),
        Open = 90.18m,
        High = 90.6m,
        Low = 89.18m,
        Close = 90.1m,
        Volume = 3274200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/21"),
        Open = 89.8m,
        High = 90.4m,
        Low = 89.46m,
        Close = 89.94m,
        Volume = 2811300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/22"),
        Open = 89.65m,
        High = 89.67m,
        Low = 88.35m,
        Close = 88.76m,
        Volume = 2504900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/26"),
        Open = 88.95m,
        High = 89m,
        Low = 88.35m,
        Close = 88.79m,
        Volume = 1565000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/27"),
        Open = 89.15m,
        High = 89.45m,
        Low = 88.74m,
        Close = 88.88m,
        Volume = 1971500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/28"),
        Open = 88.85m,
        High = 89.2m,
        Low = 88.41m,
        Close = 89m,
        Volume = 1265400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/29"),
        Open = 89.25m,
        High = 89.46m,
        Low = 88.75m,
        Close = 88.84m,
        Volume = 1753300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/03"),
        Open = 88.9m,
        High = 90.3m,
        Low = 88.45m,
        Close = 89.17m,
        Volume = 4805500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/04"),
        Open = 88.34m,
        High = 89.83m,
        Low = 87.01m,
        Close = 89.53m,
        Volume = 2659100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/05"),
        Open = 89.78m,
        High = 90m,
        Low = 88.5m,
        Close = 89.15m,
        Volume = 3254200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/08"),
        Open = 88.61m,
        High = 89.41m,
        Low = 87.56m,
        Close = 88.94m,
        Volume = 2979700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/09"),
        Open = 88.93m,
        High = 89.71m,
        Low = 87.56m,
        Close = 88m,
        Volume = 4107900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/10"),
        Open = 88.04m,
        High = 89.34m,
        Low = 88m,
        Close = 89.27m,
        Volume = 3947000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/11"),
        Open = 88.97m,
        High = 89.27m,
        Low = 88.32m,
        Close = 88.84m,
        Volume = 3960000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/12"),
        Open = 88.54m,
        High = 88.85m,
        Low = 87.5m,
        Close = 88.13m,
        Volume = 3796700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/16"),
        Open = 88.25m,
        High = 88.51m,
        Low = 87.3m,
        Close = 88m,
        Volume = 5510100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/17"),
        Open = 88.02m,
        High = 89.54m,
        Low = 87.22m,
        Close = 88.83m,
        Volume = 4444800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/18"),
        Open = 89.13m,
        High = 89.38m,
        Low = 87.76m,
        Close = 88m,
        Volume = 3206700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/19"),
        Open = 88.45m,
        High = 89.1m,
        Low = 87.8m,
        Close = 88.63m,
        Volume = 4347800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/22"),
        Open = 87.51m,
        High = 87.86m,
        Low = 84.82m,
        Close = 85.6m,
        Volume = 8184200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/23"),
        Open = 85.01m,
        High = 88.18m,
        Low = 85m,
        Close = 87.36m,
        Volume = 6405100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/24"),
        Open = 87.35m,
        High = 87.76m,
        Low = 86.52m,
        Close = 87.6m,
        Volume = 3357100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/25"),
        Open = 87.3m,
        High = 87.46m,
        Low = 86m,
        Close = 86.16m,
        Volume = 2841200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/26"),
        Open = 86m,
        High = 86.25m,
        Low = 84.6m,
        Close = 85.43m,
        Volume = 5114900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/29"),
        Open = 85.05m,
        High = 86m,
        Low = 85m,
        Close = 85.5m,
        Volume = 3044800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/30"),
        Open = 85.75m,
        High = 86.6m,
        Low = 85.55m,
        Close = 86m,
        Volume = 3140300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/31"),
        Open = 89.3m,
        High = 90.34m,
        Low = 89m,
        Close = 89.56m,
        Volume = 10905000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/01"),
        Open = 89.95m,
        High = 92.24m,
        Low = 89.73m,
        Close = 91.05m,
        Volume = 6576400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/02"),
        Open = 91.05m,
        High = 91.48m,
        Low = 89.95m,
        Close = 90.05m,
        Volume = 5071800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/05"),
        Open = 90.45m,
        High = 91.42m,
        Low = 90.31m,
        Close = 90.72m,
        Volume = 3022400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/06"),
        Open = 91m,
        High = 91m,
        Low = 89.9m,
        Close = 90.98m,
        Volume = 3392000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/07"),
        Open = 90.59m,
        High = 91.2m,
        Low = 89.7m,
        Close = 90.35m,
        Volume = 2807800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/08"),
        Open = 89.56m,
        High = 90.36m,
        Low = 88.55m,
        Close = 89.52m,
        Volume = 5104600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/09"),
        Open = 89.35m,
        High = 90.3m,
        Low = 89.03m,
        Close = 90m,
        Volume = 4265200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/12"),
        Open = 89.55m,
        High = 89.89m,
        Low = 88.78m,
        Close = 89.2m,
        Volume = 3342500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/13"),
        Open = 89.2m,
        High = 89.37m,
        Low = 88.3m,
        Close = 89.29m,
        Volume = 2998000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/14"),
        Open = 89.27m,
        High = 90.17m,
        Low = 89.27m,
        Close = 89.94m,
        Volume = 3832800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/15"),
        Open = 90.02m,
        High = 91.8m,
        Low = 89.86m,
        Close = 91.71m,
        Volume = 5681500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/16"),
        Open = 91.98m,
        High = 92m,
        Low = 90.73m,
        Close = 90.94m,
        Volume = 4497900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/20"),
        Open = 91.5m,
        High = 91.69m,
        Low = 89.84m,
        Close = 91.03m,
        Volume = 3885900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/21"),
        Open = 90.3m,
        High = 92m,
        Low = 90.05m,
        Close = 90.96m,
        Volume = 4741100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/22"),
        Open = 91.1m,
        High = 91.93m,
        Low = 90.27m,
        Close = 90.58m,
        Volume = 3170500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/23"),
        Open = 90.21m,
        High = 90.85m,
        Low = 90m,
        Close = 90.28m,
        Volume = 2341000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/26"),
        Open = 90.48m,
        High = 90.73m,
        Low = 88.56m,
        Close = 88.93m,
        Volume = 4534600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/27"),
        Open = 88m,
        High = 88.7m,
        Low = 85.24m,
        Close = 87.2m,
        Volume = 5838000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/28"),
        Open = 87.4m,
        High = 88.41m,
        Low = 86.05m,
        Close = 87.26m,
        Volume = 5582800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/01"),
        Open = 86.6m,
        High = 88.8m,
        Low = 85.91m,
        Close = 87.85m,
        Volume = 5136600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/02"),
        Open = 87.87m,
        High = 88.54m,
        Low = 87.01m,
        Close = 87.03m,
        Volume = 4154100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/05"),
        Open = 86.96m,
        High = 88.19m,
        Low = 86.39m,
        Close = 87.02m,
        Volume = 3692000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/06"),
        Open = 88.03m,
        High = 88.03m,
        Low = 87.05m,
        Close = 87.82m,
        Volume = 3277000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/07"),
        Open = 87.82m,
        High = 89.25m,
        Low = 87.82m,
        Close = 88.71m,
        Volume = 5084200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/08"),
        Open = 88.98m,
        High = 89.67m,
        Low = 88.61m,
        Close = 88.89m,
        Volume = 2787500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/09"),
        Open = 89.7m,
        High = 90.09m,
        Low = 89.14m,
        Close = 89.51m,
        Volume = 2799900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/12"),
        Open = 89m,
        High = 91.87m,
        Low = 89m,
        Close = 91.2m,
        Volume = 5951200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/13"),
        Open = 90.9m,
        High = 91.1m,
        Low = 89.45m,
        Close = 89.45m,
        Volume = 5239800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/14"),
        Open = 89.45m,
        High = 90.3m,
        Low = 88.53m,
        Close = 89.98m,
        Volume = 4025900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/15"),
        Open = 89.98m,
        High = 91.06m,
        Low = 89.57m,
        Close = 91.04m,
        Volume = 3417800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/16"),
        Open = 91.04m,
        High = 91.04m,
        Low = 89.68m,
        Close = 90m,
        Volume = 5787700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/19"),
        Open = 90.5m,
        High = 90.95m,
        Low = 89.9m,
        Close = 90.32m,
        Volume = 3526400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/20"),
        Open = 90.32m,
        High = 90.93m,
        Low = 90.02m,
        Close = 90.16m,
        Volume = 3459200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/21"),
        Open = 90.16m,
        High = 90.95m,
        Low = 89.45m,
        Close = 90.8m,
        Volume = 4187000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/22"),
        Open = 90.4m,
        High = 90.8m,
        Low = 89.88m,
        Close = 90.57m,
        Volume = 3449000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/23"),
        Open = 89.79m,
        High = 91.31m,
        Low = 89.79m,
        Close = 90.98m,
        Volume = 2256300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/26"),
        Open = 90.88m,
        High = 90.94m,
        Low = 89.84m,
        Close = 90.83m,
        Volume = 2881100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/27"),
        Open = 90.6m,
        High = 91m,
        Low = 90m,
        Close = 90.52m,
        Volume = 2627200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/28"),
        Open = 90.28m,
        High = 90.41m,
        Low = 89.01m,
        Close = 89.45m,
        Volume = 4419000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/29"),
        Open = 90.11m,
        High = 90.54m,
        Low = 89.16m,
        Close = 89.76m,
        Volume = 3388100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/30"),
        Open = 89.62m,
        High = 90.07m,
        Low = 88.65m,
        Close = 88.91m,
        Volume = 4551600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/02"),
        Open = 88.9m,
        High = 89.01m,
        Low = 88.08m,
        Close = 88.83m,
        Volume = 3337500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/03"),
        Open = 89.32m,
        High = 90.24m,
        Low = 89.09m,
        Close = 89.9m,
        Volume = 3891700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/04"),
        Open = 89.91m,
        High = 90.61m,
        Low = 89.8m,
        Close = 90.27m,
        Volume = 2542700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/05"),
        Open = 90.2m,
        High = 90.74m,
        Low = 90.2m,
        Close = 90.5m,
        Volume = 2989700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/09"),
        Open = 90.97m,
        High = 90.97m,
        Low = 90.02m,
        Close = 90.03m,
        Volume = 2506000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/10"),
        Open = 89.95m,
        High = 90.87m,
        Low = 89.95m,
        Close = 90.84m,
        Volume = 2753000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/11"),
        Open = 90.9m,
        High = 90.99m,
        Low = 89.65m,
        Close = 89.97m,
        Volume = 3446200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/12"),
        Open = 89.98m,
        High = 90.86m,
        Low = 89.4m,
        Close = 90.85m,
        Volume = 2627900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/13"),
        Open = 91.1m,
        High = 91.1m,
        Low = 90.18m,
        Close = 91.03m,
        Volume = 3025400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/16"),
        Open = 91m,
        High = 91.28m,
        Low = 89.93m,
        Close = 90.31m,
        Volume = 3731600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/17"),
        Open = 90.3m,
        High = 91.14m,
        Low = 90.05m,
        Close = 90.45m,
        Volume = 3908200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/18"),
        Open = 90.45m,
        High = 94.17m,
        Low = 90.34m,
        Close = 93.88m,
        Volume = 9472000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/19"),
        Open = 93.49m,
        High = 94.75m,
        Low = 92.76m,
        Close = 92.99m,
        Volume = 6148600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/20"),
        Open = 93.77m,
        High = 94.12m,
        Low = 93.06m,
        Close = 93.29m,
        Volume = 5929600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/23"),
        Open = 94.1m,
        High = 94.24m,
        Low = 93.31m,
        Close = 93.64m,
        Volume = 4873400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/24"),
        Open = 94.9m,
        High = 94.96m,
        Low = 93.37m,
        Close = 93.67m,
        Volume = 5606900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/25"),
        Open = 94.64m,
        High = 94.75m,
        Low = 92.75m,
        Close = 94.69m,
        Volume = 7498200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/26"),
        Open = 94.54m,
        High = 95.58m,
        Low = 94.04m,
        Close = 94.26m,
        Volume = 4824900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/27"),
        Open = 94.25m,
        High = 94.35m,
        Low = 93.28m,
        Close = 94.02m,
        Volume = 3510700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/30"),
        Open = 94.02m,
        High = 94.11m,
        Low = 92.85m,
        Close = 93m,
        Volume = 3709800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/01"),
        Open = 93.15m,
        High = 93.65m,
        Low = 92.5m,
        Close = 93.23m,
        Volume = 3192300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/02"),
        Open = 93.08m,
        High = 94.46m,
        Low = 92.84m,
        Close = 93.83m,
        Volume = 3166900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/03"),
        Open = 94.08m,
        High = 94.49m,
        Low = 93.5m,
        Close = 93.85m,
        Volume = 3022800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/04"),
        Open = 94.35m,
        High = 94.38m,
        Low = 93.12m,
        Close = 93.61m,
        Volume = 3015100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/07"),
        Open = 93.8m,
        High = 95m,
        Low = 93.65m,
        Close = 94.56m,
        Volume = 3915500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/08"),
        Open = 94.41m,
        High = 94.41m,
        Low = 93.7m,
        Close = 94.21m,
        Volume = 4407300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/09"),
        Open = 93.87m,
        High = 94.27m,
        Low = 93.35m,
        Close = 94.08m,
        Volume = 2942100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/10"),
        Open = 93.75m,
        High = 94.16m,
        Low = 92.7m,
        Close = 92.8m,
        Volume = 2572500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/11"),
        Open = 92.81m,
        High = 94.23m,
        Low = 92.38m,
        Close = 93.4m,
        Volume = 2684100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/14"),
        Open = 93.4m,
        High = 94.14m,
        Low = 93.32m,
        Close = 93.56m,
        Volume = 2057900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/15"),
        Open = 93.98m,
        High = 95.45m,
        Low = 93.79m,
        Close = 94.34m,
        Volume = 4951600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/16"),
        Open = 94.5m,
        High = 95.46m,
        Low = 94.5m,
        Close = 95.34m,
        Volume = 3981800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/17"),
        Open = 95.34m,
        High = 97.18m,
        Low = 95.23m,
        Close = 96.79m,
        Volume = 4774100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/18"),
        Open = 97.07m,
        High = 97.5m,
        Low = 96.27m,
        Close = 96.63m,
        Volume = 4129600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/21"),
        Open = 96.42m,
        High = 97.74m,
        Low = 96.25m,
        Close = 96.9m,
        Volume = 4417900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/22"),
        Open = 97.24m,
        High = 97.6m,
        Low = 96.36m,
        Close = 96.48m,
        Volume = 3716800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/23"),
        Open = 95.95m,
        High = 96.45m,
        Low = 95.36m,
        Close = 95.57m,
        Volume = 4217400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/24"),
        Open = 95.9m,
        High = 98.84m,
        Low = 95.75m,
        Close = 97.42m,
        Volume = 7288300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/25"),
        Open = 98.3m,
        High = 98.64m,
        Low = 97.38m,
        Close = 98.25m,
        Volume = 3200500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/29"),
        Open = 98.52m,
        High = 99.2m,
        Low = 97.96m,
        Close = 98.5m,
        Volume = 3250500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/30"),
        Open = 98.47m,
        High = 100.64m,
        Low = 98.3m,
        Close = 100.55m,
        Volume = 5648100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/31"),
        Open = 100.69m,
        High = 100.96m,
        Low = 100.47m,
        Close = 100.59m,
        Volume = 4212400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/01"),
        Open = 101.45m,
        High = 101.45m,
        Low = 99.45m,
        Close = 99.83m,
        Volume = 4001500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/04"),
        Open = 101m,
        High = 101m,
        Low = 99.5m,
        Close = 99.98m,
        Volume = 2661100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/05"),
        Open = 99.94m,
        High = 99.96m,
        Low = 98.84m,
        Close = 99.5m,
        Volume = 3177100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/06"),
        Open = 98.97m,
        High = 99.2m,
        Low = 97.69m,
        Close = 98.29m,
        Volume = 3352100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/07"),
        Open = 98.29m,
        High = 99.09m,
        Low = 96.81m,
        Close = 96.84m,
        Volume = 4610000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/08"),
        Open = 96.7m,
        High = 98.22m,
        Low = 95.91m,
        Close = 98.19m,
        Volume = 3843000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/11"),
        Open = 98.25m,
        High = 98.79m,
        Low = 97.42m,
        Close = 97.55m,
        Volume = 3308100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/12"),
        Open = 97.55m,
        High = 97.59m,
        Low = 96.12m,
        Close = 96.48m,
        Volume = 4799500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/13"),
        Open = 97.12m,
        High = 98.55m,
        Low = 96.92m,
        Close = 98.47m,
        Volume = 5212500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/14"),
        Open = 99m,
        High = 99.5m,
        Low = 98.73m,
        Close = 98.97m,
        Volume = 3365900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/15"),
        Open = 99.52m,
        High = 100m,
        Low = 97.93m,
        Close = 98.15m,
        Volume = 7137800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/18"),
        Open = 98.03m,
        High = 98.58m,
        Low = 97.29m,
        Close = 97.4m,
        Volume = 4005300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/19"),
        Open = 97.4m,
        High = 98.24m,
        Low = 96.51m,
        Close = 96.92m,
        Volume = 5046900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/20"),
        Open = 97.1m,
        High = 97.72m,
        Low = 96.01m,
        Close = 96.08m,
        Volume = 4634100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/21"),
        Open = 96.08m,
        High = 97.2m,
        Low = 95.17m,
        Close = 97.2m,
        Volume = 6257400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/22"),
        Open = 96.64m,
        High = 96.9m,
        Low = 95.6m,
        Close = 95.92m,
        Volume = 5168200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/25"),
        Open = 96m,
        High = 96.57m,
        Low = 94.8m,
        Close = 95.57m,
        Volume = 4180900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/26"),
        Open = 95.4m,
        High = 96.47m,
        Low = 94.87m,
        Close = 94.98m,
        Volume = 4336900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/27"),
        Open = 94.31m,
        High = 94.9m,
        Low = 93.58m,
        Close = 94.65m,
        Volume = 4398600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/28"),
        Open = 95m,
        High = 95.59m,
        Low = 94.26m,
        Close = 95.16m,
        Volume = 3330700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/29"),
        Open = 95.36m,
        High = 96.34m,
        Low = 95.25m,
        Close = 96.16m,
        Volume = 5772300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/02"),
        Open = 96.72m,
        High = 97.05m,
        Low = 96.27m,
        Close = 96.77m,
        Volume = 2643600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/03"),
        Open = 96.8m,
        High = 98.06m,
        Low = 96.8m,
        Close = 97.65m,
        Volume = 2122100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/05"),
        Open = 97.52m,
        High = 98.48m,
        Low = 97.23m,
        Close = 98.36m,
        Volume = 2525400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/06"),
        Open = 98.13m,
        High = 99.22m,
        Low = 98.02m,
        Close = 98.88m,
        Volume = 2557000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/09"),
        Open = 100.99m,
        High = 101.32m,
        Low = 99.6m,
        Close = 99.9m,
        Volume = 4889500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/10"),
        Open = 100.6m,
        High = 100.66m,
        Low = 99.63m,
        Close = 100.25m,
        Volume = 6604000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/11"),
        Open = 100.48m,
        High = 100.83m,
        Low = 99.56m,
        Close = 100.12m,
        Volume = 4544200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/12"),
        Open = 100.5m,
        High = 100.82m,
        Low = 99.76m,
        Close = 100.78m,
        Volume = 3755100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/13"),
        Open = 101.18m,
        High = 102.43m,
        Low = 100.6m,
        Close = 101.88m,
        Volume = 4180400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/16"),
        Open = 102m,
        High = 102.17m,
        Low = 101m,
        Close = 102.07m,
        Volume = 3388600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/17"),
        Open = 101.91m,
        High = 102.73m,
        Low = 101.4m,
        Close = 102.05m,
        Volume = 3259400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/18"),
        Open = 101.85m,
        High = 102.75m,
        Low = 100.89m,
        Close = 101.82m,
        Volume = 4081400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/19"),
        Open = 101.63m,
        High = 102.82m,
        Low = 101.63m,
        Close = 102.48m,
        Volume = 2448100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/20"),
        Open = 102.8m,
        High = 104.42m,
        Low = 102.35m,
        Close = 103.86m,
        Volume = 6394600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/23"),
        Open = 104.48m,
        High = 104.55m,
        Low = 103.22m,
        Close = 104.04m,
        Volume = 3928300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/24"),
        Open = 103.45m,
        High = 105.67m,
        Low = 103.34m,
        Close = 103.8m,
        Volume = 5395300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/25"),
        Open = 106.98m,
        High = 107.83m,
        Low = 106.38m,
        Close = 107.23m,
        Volume = 9389900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/26"),
        Open = 106.06m,
        High = 106.8m,
        Low = 102.23m,
        Close = 103.7m,
        Volume = 9893900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/27"),
        Open = 103.6m,
        High = 106.39m,
        Low = 103.6m,
        Close = 103.71m,
        Volume = 7675300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/30"),
        Open = 104.6m,
        High = 106.15m,
        Low = 104m,
        Close = 105.54m,
        Volume = 5824500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/31"),
        Open = 106.54m,
        High = 106.54m,
        Low = 103.31m,
        Close = 103.43m,
        Volume = 6293700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/01"),
        Open = 103.03m,
        High = 104.84m,
        Low = 103m,
        Close = 104.53m,
        Volume = 5999100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/02"),
        Open = 105.02m,
        High = 106m,
        Low = 104.51m,
        Close = 105.93m,
        Volume = 4308600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/03"),
        Open = 105.5m,
        High = 106.35m,
        Low = 104.22m,
        Close = 104.24m,
        Volume = 5382500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/06"),
        Open = 104.49m,
        High = 104.85m,
        Low = 102.09m,
        Close = 104.34m,
        Volume = 6269100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/07"),
        Open = 103.7m,
        High = 104.12m,
        Low = 102.3m,
        Close = 103.22m,
        Volume = 4721300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/08"),
        Open = 103.1m,
        High = 104.19m,
        Low = 100.71m,
        Close = 102.72m,
        Volume = 5209500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/09"),
        Open = 100.79m,
        High = 102.23m,
        Low = 98.02m,
        Close = 98.3m,
        Volume = 8659200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/10"),
        Open = 96.95m,
        High = 98.51m,
        Low = 94m,
        Close = 98.44m,
        Volume = 10005200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/13"),
        Open = 99.46m,
        High = 100.91m,
        Low = 99.25m,
        Close = 100.05m,
        Volume = 5569900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/14"),
        Open = 100.33m,
        High = 100.72m,
        Low = 97.4m,
        Close = 97.63m,
        Volume = 4481600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/15"),
        Open = 97m,
        High = 98.8m,
        Low = 95.21m,
        Close = 95.51m,
        Volume = 5213300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/16"),
        Open = 95.2m,
        High = 95.2m,
        Low = 90.08m,
        Close = 92.74m,
        Volume = 12314800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/17"),
        Open = 94.79m,
        High = 97.73m,
        Low = 94.64m,
        Close = 95.93m,
        Volume = 7943900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/20"),
        Open = 96.26m,
        High = 97.54m,
        Low = 94.75m,
        Close = 97.21m,
        Volume = 4779200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/21"),
        Open = 96.83m,
        High = 97.24m,
        Low = 96.07m,
        Close = 96.95m,
        Volume = 2917600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/22"),
        Open = 97.5m,
        High = 98.85m,
        Low = 97m,
        Close = 97.99m,
        Volume = 4117000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/23"),
        Open = 98.95m,
        High = 98.95m,
        Low = 96.22m,
        Close = 96.74m,
        Volume = 4349000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/24"),
        Open = 96.78m,
        High = 98.6m,
        Low = 96.63m,
        Close = 98.47m,
        Volume = 4153000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/27"),
        Open = 98.07m,
        High = 98.95m,
        Low = 97.13m,
        Close = 98.54m,
        Volume = 3217600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/28"),
        Open = 97.99m,
        High = 98.38m,
        Low = 95.44m,
        Close = 95.65m,
        Volume = 4558200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/29"),
        Open = 96.5m,
        High = 97.55m,
        Low = 95.84m,
        Close = 96.9m,
        Volume = 5091600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/30"),
        Open = 96.74m,
        High = 97.67m,
        Low = 95.93m,
        Close = 96.85m,
        Volume = 4076400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/31"),
        Open = 98m,
        High = 98.58m,
        Low = 96.7m,
        Close = 96.7m,
        Volume = 3556900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/04"),
        Open = 96.1m,
        High = 96.31m,
        Low = 94.9m,
        Close = 95.92m,
        Volume = 6560300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/05"),
        Open = 95.2m,
        High = 97.74m,
        Low = 94.02m,
        Close = 95.84m,
        Volume = 10478400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/06"),
        Open = 95.54m,
        High = 96.24m,
        Low = 94.5m,
        Close = 96.2m,
        Volume = 6555800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/07"),
        Open = 95.2m,
        High = 96.1m,
        Low = 94.66m,
        Close = 94.84m,
        Volume = 5631000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/10"),
        Open = 95.01m,
        High = 95.94m,
        Low = 94.05m,
        Close = 95.33m,
        Volume = 4720900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/11"),
        Open = 95.98m,
        High = 97.87m,
        Low = 95.52m,
        Close = 97.44m,
        Volume = 4784300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/12"),
        Open = 97.21m,
        High = 98.73m,
        Low = 97m,
        Close = 98.32m,
        Volume = 4107400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/13"),
        Open = 98.6m,
        High = 99.37m,
        Low = 98.35m,
        Close = 98.95m,
        Volume = 3888600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/14"),
        Open = 98.4m,
        High = 99.58m,
        Low = 98.02m,
        Close = 99.35m,
        Volume = 4200700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/17"),
        Open = 98.8m,
        High = 99.73m,
        Low = 98.07m,
        Close = 98.64m,
        Volume = 3632000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/18"),
        Open = 98.6m,
        High = 98.82m,
        Low = 96.44m,
        Close = 98.47m,
        Volume = 9869000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/19"),
        Open = 99.4m,
        High = 100.71m,
        Low = 99.05m,
        Close = 100.02m,
        Volume = 6854900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/20"),
        Open = 99.94m,
        High = 101.35m,
        Low = 99.94m,
        Close = 101.25m,
        Volume = 4600500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/21"),
        Open = 102.35m,
        High = 103.23m,
        Low = 101.25m,
        Close = 102.59m,
        Volume = 6567000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/24"),
        Open = 103m,
        High = 103.76m,
        Low = 102.4m,
        Close = 103.05m,
        Volume = 4829100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/25"),
        Open = 102.74m,
        High = 105.02m,
        Low = 102.54m,
        Close = 104.93m,
        Volume = 5001400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/26"),
        Open = 105.3m,
        High = 105.98m,
        Low = 103.25m,
        Close = 104.45m,
        Volume = 4904900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/27"),
        Open = 104.45m,
        High = 106.15m,
        Low = 104m,
        Close = 105.46m,
        Volume = 3965200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/28"),
        Open = 105.2m,
        High = 105.96m,
        Low = 104.23m,
        Close = 104.99m,
        Volume = 4373100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/01"),
        Open = 105.45m,
        High = 107m,
        Low = 105.22m,
        Close = 106.65m,
        Volume = 3634600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/02"),
        Open = 106.62m,
        High = 107.15m,
        Low = 105.27m,
        Close = 105.93m,
        Volume = 4465800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/03"),
        Open = 105.33m,
        High = 105.73m,
        Low = 104.25m,
        Close = 104.72m,
        Volume = 3652000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/04"),
        Open = 105.15m,
        High = 105.7m,
        Low = 104.45m,
        Close = 104.5m,
        Volume = 3441800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/05"),
        Open = 105.4m,
        High = 105.5m,
        Low = 101.09m,
        Close = 102.25m,
        Volume = 8241700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/08"),
        Open = 103.26m,
        High = 103.26m,
        Low = 100.09m,
        Close = 101.07m,
        Volume = 5298700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/09"),
        Open = 101.32m,
        High = 101.76m,
        Low = 99.66m,
        Close = 101.45m,
        Volume = 5547100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/10"),
        Open = 100.89m,
        High = 102.4m,
        Low = 97.04m,
        Close = 98.68m,
        Volume = 25062800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/11"),
        Open = 99.5m,
        High = 99.58m,
        Low = 94.96m,
        Close = 96.26m,
        Volume = 13140500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/12"),
        Open = 96.11m,
        High = 97.59m,
        Low = 95.42m,
        Close = 96.69m,
        Volume = 9494700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/15"),
        Open = 95.98m,
        High = 96.5m,
        Low = 94.45m,
        Close = 94.83m,
        Volume = 8046100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/16"),
        Open = 94.5m,
        High = 96.34m,
        Low = 93.03m,
        Close = 95.94m,
        Volume = 9706600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/17"),
        Open = 96.52m,
        High = 97.05m,
        Low = 94.63m,
        Close = 95.59m,
        Volume = 7800700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/18"),
        Open = 95.36m,
        High = 97.15m,
        Low = 94.8m,
        Close = 96.94m,
        Volume = 6689500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/19"),
        Open = 96.54m,
        High = 97m,
        Low = 93.79m,
        Close = 93.9m,
        Volume = 9050700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/22"),
        Open = 93.16m,
        High = 95.04m,
        Low = 92.6m,
        Close = 94.93m,
        Volume = 7916400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/23"),
        Open = 95.76m,
        High = 95.96m,
        Low = 94.16m,
        Close = 94.95m,
        Volume = 6054600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/24"),
        Open = 95.69m,
        High = 96.08m,
        Low = 93.02m,
        Close = 94.26m,
        Volume = 9612000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/25"),
        Open = 94.88m,
        High = 98.97m,
        Low = 92m,
        Close = 96m,
        Volume = 8122700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/26"),
        Open = 96.25m,
        High = 96.55m,
        Low = 95.05m,
        Close = 96.02m,
        Volume = 5157400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/29"),
        Open = 95.78m,
        High = 97.6m,
        Low = 95.24m,
        Close = 96.99m,
        Volume = 8901400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/30"),
        Open = 97.25m,
        High = 98.6m,
        Low = 97m,
        Close = 97.33m,
        Volume = 7379300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/31"),
        Open = 98.15m,
        High = 98.71m,
        Low = 97.33m,
        Close = 98.59m,
        Volume = 5711200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/01"),
        Open = 98.3m,
        High = 98.49m,
        Low = 96.5m,
        Close = 96.6m,
        Volume = 6338600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/02"),
        Open = 96.62m,
        High = 97.88m,
        Low = 96.34m,
        Close = 97.76m,
        Volume = 5351600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/05"),
        Open = 97.59m,
        High = 98.67m,
        Low = 96.51m,
        Close = 97.97m,
        Volume = 4384900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/06"),
        Open = 98m,
        High = 98.43m,
        Low = 96.94m,
        Close = 97.7m,
        Volume = 4043900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/07"),
        Open = 97m,
        High = 97.99m,
        Low = 96.11m,
        Close = 96.89m,
        Volume = 5710700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/08"),
        Open = 96.97m,
        High = 97.25m,
        Low = 94.9m,
        Close = 96.28m,
        Volume = 6954500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/09"),
        Open = 95.08m,
        High = 95.75m,
        Low = 94.07m,
        Close = 94.21m,
        Volume = 5997000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/12"),
        Open = 94.25m,
        High = 94.41m,
        Low = 92.7m,
        Close = 92.86m,
        Volume = 6370600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/13"),
        Open = 93.83m,
        High = 94.15m,
        Low = 92.87m,
        Close = 93.7m,
        Volume = 6243900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/14"),
        Open = 94.14m,
        High = 94.25m,
        Low = 92.5m,
        Close = 92.79m,
        Volume = 6304000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/15"),
        Open = 91.46m,
        High = 92.86m,
        Low = 90.97m,
        Close = 91.34m,
        Volume = 6606800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/16"),
        Open = 92m,
        High = 92.05m,
        Low = 89.45m,
        Close = 89.99m,
        Volume = 9097900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/19"),
        Open = 89.6m,
        High = 89.92m,
        Low = 88.12m,
        Close = 88.27m,
        Volume = 8416200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/20"),
        Open = 88.31m,
        High = 88.95m,
        Low = 86.92m,
        Close = 87.86m,
        Volume = 8254900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/21"),
        Open = 86.78m,
        High = 88.5m,
        Low = 86.75m,
        Close = 87.41m,
        Volume = 7069300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/23"),
        Open = 88.5m,
        High = 89.66m,
        Low = 88.07m,
        Close = 89.54m,
        Volume = 3156600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/26"),
        Open = 90.5m,
        High = 92.39m,
        Low = 89.86m,
        Close = 89.93m,
        Volume = 6881400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/27"),
        Open = 90.57m,
        High = 92.55m,
        Low = 90.52m,
        Close = 91.73m,
        Volume = 7010900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/28"),
        Open = 92.61m,
        High = 93.83m,
        Low = 91.76m,
        Close = 93.61m,
        Volume = 6850200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/29"),
        Open = 93.61m,
        High = 94.27m,
        Low = 92.61m,
        Close = 93.21m,
        Volume = 4619900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/30"),
        Open = 94.6m,
        High = 94.6m,
        Low = 91.72m,
        Close = 92.54m,
        Volume = 9994000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/03"),
        Open = 92.5m,
        High = 93.2m,
        Low = 91.66m,
        Close = 91.79m,
        Volume = 5410300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/04"),
        Open = 91.43m,
        High = 91.79m,
        Low = 89.85m,
        Close = 89.99m,
        Volume = 7044100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/05"),
        Open = 90.9m,
        High = 92.16m,
        Low = 90.36m,
        Close = 90.7m,
        Volume = 9083300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/06"),
        Open = 91.5m,
        High = 92.44m,
        Low = 90.83m,
        Close = 91.78m,
        Volume = 5805500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/07"),
        Open = 92.36m,
        High = 93.64m,
        Low = 92m,
        Close = 93.16m,
        Volume = 5209500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/10"),
        Open = 93.25m,
        High = 93.25m,
        Low = 91.78m,
        Close = 92.64m,
        Volume = 5947800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/11"),
        Open = 92.64m,
        High = 93m,
        Low = 88.12m,
        Close = 88.7m,
        Volume = 10280800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/12"),
        Open = 88m,
        High = 89.53m,
        Low = 85.55m,
        Close = 86.92m,
        Volume = 18259500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/13"),
        Open = 86.67m,
        High = 88.91m,
        Low = 86.4m,
        Close = 88.55m,
        Volume = 7177700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/14"),
        Open = 88.54m,
        High = 89.99m,
        Low = 88.03m,
        Close = 88.42m,
        Volume = 4921000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/17"),
        Open = 88.21m,
        High = 88.9m,
        Low = 87.2m,
        Close = 87.4m,
        Volume = 4638400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/18"),
        Open = 87.87m,
        High = 87.87m,
        Low = 86.2m,
        Close = 87.17m,
        Volume = 5487600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/19"),
        Open = 87.75m,
        High = 88.17m,
        Low = 86.47m,
        Close = 86.62m,
        Volume = 8064300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/20"),
        Open = 87.08m,
        High = 87.41m,
        Low = 86.48m,
        Close = 87.19m,
        Volume = 3320300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/21"),
        Open = 88.04m,
        High = 89.34m,
        Low = 87.8m,
        Close = 89.07m,
        Volume = 7500600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/24"),
        Open = 89.55m,
        High = 90.38m,
        Low = 89.55m,
        Close = 90.02m,
        Volume = 1937300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/26"),
        Open = 90m,
        High = 90.13m,
        Low = 89.28m,
        Close = 90m,
        Volume = 2609600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/27"),
        Open = 89.99m,
        High = 89.99m,
        Low = 88.33m,
        Close = 88.88m,
        Volume = 2880600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/28"),
        Open = 89m,
        High = 89.11m,
        Low = 87.48m,
        Close = 88.25m,
        Volume = 2899600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/31"),
        Open = 88.14m,
        High = 88.28m,
        Low = 87.24m,
        Close = 87.46m,
        Volume = 3118300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/02"),
        Open = 87.57m,
        High = 87.84m,
        Low = 86m,
        Close = 86.62m,
        Volume = 4160900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/03"),
        Open = 87.07m,
        High = 87.64m,
        Low = 86.74m,
        Close = 86.98m,
        Volume = 3348100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/04"),
        Open = 86.32m,
        High = 87.16m,
        Low = 85.69m,
        Close = 85.82m,
        Volume = 5361300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/07"),
        Open = 86.25m,
        High = 86.3m,
        Low = 82.17m,
        Close = 82.87m,
        Volume = 9946200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/08"),
        Open = 83.11m,
        High = 83.37m,
        Low = 79.65m,
        Close = 79.91m,
        Volume = 9481500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/09"),
        Open = 79.7m,
        High = 80.43m,
        Low = 77.81m,
        Close = 80.3m,
        Volume = 10138600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/10"),
        Open = 79.86m,
        High = 83.19m,
        Low = 79.86m,
        Close = 82.36m,
        Volume = 9213100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/11"),
        Open = 81.77m,
        High = 81.78m,
        Low = 80m,
        Close = 80.52m,
        Volume = 6437000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/14"),
        Open = 81.33m,
        High = 82.37m,
        Low = 80.15m,
        Close = 81.67m,
        Volume = 7716100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/15"),
        Open = 81.47m,
        High = 81.8m,
        Low = 76m,
        Close = 77.86m,
        Volume = 15959100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/16"),
        Open = 77.81m,
        High = 81.31m,
        Low = 76.5m,
        Close = 79.87m,
        Volume = 13178600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/17"),
        Open = 81.2m,
        High = 82.49m,
        Low = 79.02m,
        Close = 79.52m,
        Volume = 9202000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/18"),
        Open = 80.25m,
        High = 80.82m,
        Low = 77.76m,
        Close = 78.4m,
        Volume = 7254900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/22"),
        Open = 74.53m,
        High = 78.74m,
        Low = 74.4m,
        Close = 77.6m,
        Volume = 8330800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/23"),
        Open = 75.5m,
        High = 77.19m,
        Low = 74.12m,
        Close = 76.57m,
        Volume = 12787700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/24"),
        Open = 77.56m,
        High = 78.34m,
        Low = 76.48m,
        Close = 77.62m,
        Volume = 7156200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/25"),
        Open = 78.65m,
        High = 79.67m,
        Low = 76.97m,
        Close = 77.03m,
        Volume = 6925400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/28"),
        Open = 77.15m,
        High = 77.72m,
        Low = 76.48m,
        Close = 77.6m,
        Volume = 4851200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/29"),
        Open = 78.57m,
        High = 81.06m,
        Low = 78.27m,
        Close = 80.96m,
        Volume = 7107800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/30"),
        Open = 79.7m,
        High = 84.87m,
        Low = 79.69m,
        Close = 82.87m,
        Volume = 11244100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/31"),
        Open = 81.78m,
        High = 83.84m,
        Low = 80.8m,
        Close = 83.18m,
        Volume = 7826500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/01"),
        Open = 83.37m,
        High = 83.99m,
        Low = 81.85m,
        Close = 82.76m,
        Volume = 5877300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/04"),
        Open = 82.78m,
        High = 83.36m,
        Low = 81.91m,
        Close = 82.9m,
        Volume = 3058300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/05"),
        Open = 81.61m,
        High = 82.78m,
        Low = 81.35m,
        Close = 81.69m,
        Volume = 4538800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/06"),
        Open = 81.9m,
        High = 81.95m,
        Low = 79.6m,
        Close = 79.91m,
        Volume = 5111400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/07"),
        Open = 78.71m,
        High = 80.24m,
        Low = 78.71m,
        Close = 79.75m,
        Volume = 6211300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/08"),
        Open = 79.48m,
        High = 80.14m,
        Low = 78.81m,
        Close = 79.33m,
        Volume = 4323600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/11"),
        Open = 79.46m,
        High = 81.39m,
        Low = 78.85m,
        Close = 81.13m,
        Volume = 4871500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/12"),
        Open = 81.8m,
        High = 84.53m,
        Low = 81.44m,
        Close = 83.56m,
        Volume = 7923000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/13"),
        Open = 84.35m,
        High = 85.63m,
        Low = 84.01m,
        Close = 85.48m,
        Volume = 5846400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/14"),
        Open = 85.67m,
        High = 86.06m,
        Low = 84.9m,
        Close = 85.22m,
        Volume = 6044600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/15"),
        Open = 85.06m,
        High = 85.42m,
        Low = 84.17m,
        Close = 85.18m,
        Volume = 5683600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/19"),
        Open = 86.11m,
        High = 86.88m,
        Low = 84.83m,
        Close = 85.37m,
        Volume = 4139100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/20"),
        Open = 84.47m,
        High = 84.69m,
        Low = 82.95m,
        Close = 84m,
        Volume = 7485900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/21"),
        Open = 84.12m,
        High = 84.96m,
        Low = 81.87m,
        Close = 82.01m,
        Volume = 6659800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/22"),
        Open = 82.51m,
        High = 83.21m,
        Low = 81.75m,
        Close = 83.04m,
        Volume = 5009500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/25"),
        Open = 83.26m,
        High = 84.74m,
        Low = 83.12m,
        Close = 84.66m,
        Volume = 5054900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/26"),
        Open = 85.12m,
        High = 85.12m,
        Low = 83.9m,
        Close = 84.57m,
        Volume = 5145200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/27"),
        Open = 84.22m,
        High = 85.19m,
        Low = 83.4m,
        Close = 83.95m,
        Volume = 4575600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/28"),
        Open = 83.51m,
        High = 85m,
        Low = 82.73m,
        Close = 84.8m,
        Volume = 5709200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/29"),
        Open = 84.03m,
        High = 84.5m,
        Low = 82.4m,
        Close = 82.79m,
        Volume = 6343900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/03"),
        Open = 79.32m,
        High = 80.89m,
        Low = 79.25m,
        Close = 80.67m,
        Volume = 9518900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/04"),
        Open = 79.78m,
        High = 79.99m,
        Low = 78.34m,
        Close = 79.62m,
        Volume = 8099200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/05"),
        Open = 79.82m,
        High = 81.32m,
        Low = 79.67m,
        Close = 80.71m,
        Volume = 5274400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/06"),
        Open = 80.55m,
        High = 80.72m,
        Low = 79.38m,
        Close = 79.51m,
        Volume = 4491200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/07"),
        Open = 78.99m,
        High = 79m,
        Low = 76.37m,
        Close = 76.6m,
        Volume = 9595800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/10"),
        Open = 76.53m,
        High = 76.71m,
        Low = 74.38m,
        Close = 74.38m,
        Volume = 9851900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/11"),
        Open = 74.78m,
        High = 75.75m,
        Low = 72.39m,
        Close = 73.4m,
        Volume = 13613500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/12"),
        Open = 73.71m,
        High = 74.75m,
        Low = 72.13m,
        Close = 72.45m,
        Volume = 8954300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/13"),
        Open = 71.81m,
        High = 74.42m,
        Low = 71.58m,
        Close = 74.18m,
        Volume = 10497900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/14"),
        Open = 75.79m,
        High = 77.19m,
        Low = 75.13m,
        Close = 76.23m,
        Volume = 12716000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/17"),
        Open = 74.46m,
        High = 76.2m,
        Low = 74.14m,
        Close = 75.49m,
        Volume = 5306500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/18"),
        Open = 77m,
        High = 77m,
        Low = 75.26m,
        Close = 76.53m,
        Volume = 5521800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/19"),
        Open = 76.98m,
        High = 77m,
        Low = 73.45m,
        Close = 73.45m,
        Volume = 9168900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/20"),
        Open = 73.55m,
        High = 75m,
        Low = 72.72m,
        Close = 74.8m,
        Volume = 7962700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/24"),
        Open = 75.25m,
        High = 76.48m,
        Low = 74.79m,
        Close = 76.29m,
        Volume = 4818700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/25"),
        Open = 76.88m,
        High = 76.88m,
        Low = 75.14m,
        Close = 75.9m,
        Volume = 5458500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/26"),
        Open = 75.66m,
        High = 76.5m,
        Low = 75.6m,
        Close = 76.3m,
        Volume = 4115800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/27"),
        Open = 75.86m,
        High = 76.36m,
        Low = 74.14m,
        Close = 74.22m,
        Volume = 7584200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/28"),
        Open = 74.44m,
        High = 74.63m,
        Low = 73.08m,
        Close = 73.47m,
        Volume = 4604500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/31"),
        Open = 74m,
        High = 74.58m,
        Low = 73.4m,
        Close = 74.37m,
        Volume = 7052300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/01"),
        Open = 75.02m,
        High = 75.89m,
        Low = 74.8m,
        Close = 75.88m,
        Volume = 5878700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/02"),
        Open = 76.1m,
        High = 77.19m,
        Low = 75.73m,
        Close = 76.85m,
        Volume = 6090000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/03"),
        Open = 76.55m,
        High = 77.22m,
        Low = 75.9m,
        Close = 76.14m,
        Volume = 5238200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/04"),
        Open = 76.04m,
        High = 76.63m,
        Low = 75.33m,
        Close = 75.65m,
        Volume = 5046000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/07"),
        Open = 76.53m,
        High = 76.53m,
        Low = 74.88m,
        Close = 74.98m,
        Volume = 5322900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/08"),
        Open = 74.51m,
        High = 75.39m,
        Low = 74.04m,
        Close = 75.02m,
        Volume = 5494300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/09"),
        Open = 76.72m,
        High = 79.9m,
        Low = 76.31m,
        Close = 78.6m,
        Volume = 18990300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/10"),
        Open = 78.45m,
        High = 79.05m,
        Low = 77.79m,
        Close = 78.43m,
        Volume = 7363300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/11"),
        Open = 77.65m,
        High = 78.41m,
        Low = 76.72m,
        Close = 76.86m,
        Volume = 5365500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/14"),
        Open = 76.68m,
        High = 77.64m,
        Low = 76.67m,
        Close = 77.22m,
        Volume = 4417300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/15"),
        Open = 77.56m,
        High = 77.67m,
        Low = 75.6m,
        Close = 75.7m,
        Volume = 6298800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/16"),
        Open = 76.31m,
        High = 76.92m,
        Low = 75.64m,
        Close = 76.67m,
        Volume = 4798600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/17"),
        Open = 76.4m,
        High = 77.26m,
        Low = 76.4m,
        Close = 76.91m,
        Volume = 3276200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/18"),
        Open = 77.5m,
        High = 79.1m,
        Low = 77.5m,
        Close = 78.66m,
        Volume = 6617500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/21"),
        Open = 78.71m,
        High = 79.37m,
        Low = 78.17m,
        Close = 79.09m,
        Volume = 4407800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/22"),
        Open = 79.32m,
        High = 79.99m,
        Low = 77.75m,
        Close = 78.56m,
        Volume = 7600000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/23"),
        Open = 80.65m,
        High = 83.36m,
        Low = 79.57m,
        Close = 82.09m,
        Volume = 14962100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/24"),
        Open = 82.49m,
        High = 83.37m,
        Low = 81.65m,
        Close = 83m,
        Volume = 5711200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/25"),
        Open = 83.38m,
        High = 85.25m,
        Low = 83.38m,
        Close = 84.84m,
        Volume = 8334100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/28"),
        Open = 85.01m,
        High = 85.64m,
        Low = 84.28m,
        Close = 84.98m,
        Volume = 5341200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/29"),
        Open = 84.54m,
        High = 86.45m,
        Low = 84.54m,
        Close = 85.53m,
        Volume = 4455000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/30"),
        Open = 85.83m,
        High = 86.18m,
        Low = 84.63m,
        Close = 84.86m,
        Volume = 4800500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/01"),
        Open = 84.86m,
        High = 85.48m,
        Low = 84.57m,
        Close = 85.41m,
        Volume = 5048300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/02"),
        Open = 86.32m,
        High = 86.5m,
        Low = 84.98m,
        Close = 85.69m,
        Volume = 3769000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/05"),
        Open = 85.32m,
        High = 86.07m,
        Low = 85m,
        Close = 85.92m,
        Volume = 3855500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/06"),
        Open = 85.59m,
        High = 86.21m,
        Low = 85.13m,
        Close = 86.15m,
        Volume = 4353900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/07"),
        Open = 86.03m,
        High = 86.1m,
        Low = 84.42m,
        Close = 84.55m,
        Volume = 4928200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/08"),
        Open = 84.71m,
        High = 85.2m,
        Low = 84m,
        Close = 84.76m,
        Volume = 2658700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/09"),
        Open = 84.43m,
        High = 84.75m,
        Low = 83.75m,
        Close = 84.06m,
        Volume = 3210800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/12"),
        Open = 84.4m,
        High = 85m,
        Low = 83.28m,
        Close = 84.8m,
        Volume = 3356900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/13"),
        Open = 84.99m,
        High = 85.29m,
        Low = 84.11m,
        Close = 85.08m,
        Volume = 4283100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/14"),
        Open = 85.3m,
        High = 86.67m,
        Low = 85.08m,
        Close = 85.69m,
        Volume = 4900600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/15"),
        Open = 85.71m,
        High = 86.14m,
        Low = 85m,
        Close = 85.55m,
        Volume = 3504100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/16"),
        Open = 85.84m,
        High = 85.84m,
        Low = 84.74m,
        Close = 85.17m,
        Volume = 5117100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/19"),
        Open = 85.56m,
        High = 88.29m,
        Low = 85m,
        Close = 87.07m,
        Volume = 6725300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/20"),
        Open = 87.05m,
        High = 87.05m,
        Low = 84.61m,
        Close = 85.14m,
        Volume = 5252200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/21"),
        Open = 85.41m,
        High = 85.6m,
        Low = 80.78m,
        Close = 81.19m,
        Volume = 10538600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/22"),
        Open = 81.05m,
        High = 81.72m,
        Low = 80.55m,
        Close = 81.41m,
        Volume = 5950900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/23"),
        Open = 81.21m,
        High = 82.09m,
        Low = 80.85m,
        Close = 81.48m,
        Volume = 4456100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/27"),
        Open = 81.6m,
        High = 83.3m,
        Low = 81.6m,
        Close = 82.87m,
        Volume = 4417900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/28"),
        Open = 83.25m,
        High = 83.25m,
        Low = 81.08m,
        Close = 82.13m,
        Volume = 4123600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/29"),
        Open = 81.82m,
        High = 83m,
        Low = 81.05m,
        Close = 82.11m,
        Volume = 3443300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/30"),
        Open = 82.4m,
        High = 82.94m,
        Low = 81.01m,
        Close = 82.77m,
        Volume = 4605700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/02"),
        Open = 82.61m,
        High = 82.61m,
        Low = 80.47m,
        Close = 81.15m,
        Volume = 4469300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/03"),
        Open = 81.5m,
        High = 81.8m,
        Low = 77.3m,
        Close = 78.12m,
        Volume = 10135200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/04"),
        Open = 77.54m,
        High = 78.82m,
        Low = 77.48m,
        Close = 78.02m,
        Volume = 6738900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/05"),
        Open = 78.19m,
        High = 78.2m,
        Low = 76.8m,
        Close = 77.31m,
        Volume = 5722500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/06"),
        Open = 76.54m,
        High = 76.57m,
        Low = 73m,
        Close = 73.16m,
        Volume = 12691300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/09"),
        Open = 73.4m,
        High = 74.12m,
        Low = 73.14m,
        Close = 73.95m,
        Volume = 6620200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/10"),
        Open = 73.46m,
        High = 74.11m,
        Low = 72.76m,
        Close = 73.67m,
        Volume = 5617700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/11"),
        Open = 73.44m,
        High = 73.77m,
        Low = 72.93m,
        Close = 73.31m,
        Volume = 6490500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/12"),
        Open = 74.01m,
        High = 77.05m,
        Low = 73.79m,
        Close = 74.12m,
        Volume = 9547400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/13"),
        Open = 74.76m,
        High = 75.49m,
        Low = 74.38m,
        Close = 75.12m,
        Volume = 6040300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/16"),
        Open = 74.77m,
        High = 75.45m,
        Low = 74.03m,
        Close = 75.02m,
        Volume = 3475800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/17"),
        Open = 75.38m,
        High = 75.5m,
        Low = 73.81m,
        Close = 74.38m,
        Volume = 5901600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/18"),
        Open = 73.37m,
        High = 76.34m,
        Low = 73.37m,
        Close = 74.65m,
        Volume = 11473900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/19"),
        Open = 75.05m,
        High = 77.21m,
        Low = 74.68m,
        Close = 76.95m,
        Volume = 7382500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/20"),
        Open = 77.8m,
        High = 77.8m,
        Low = 75.66m,
        Close = 75.83m,
        Volume = 8544300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/23"),
        Open = 76.23m,
        High = 76.48m,
        Low = 75.12m,
        Close = 75.59m,
        Volume = 3985900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/24"),
        Open = 75.24m,
        High = 75.61m,
        Low = 74.13m,
        Close = 74.79m,
        Volume = 4908700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/25"),
        Open = 72.28m,
        High = 72.79m,
        Low = 69.16m,
        Close = 69.64m,
        Volume = 20767600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/26"),
        Open = 68.75m,
        High = 70.39m,
        Low = 68.05m,
        Close = 68.21m,
        Volume = 10807200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/27"),
        Open = 67.74m,
        High = 67.93m,
        Low = 66.38m,
        Close = 66.92m,
        Volume = 9878700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/30"),
        Open = 66.63m,
        High = 66.75m,
        Low = 65.55m,
        Close = 65.72m,
        Volume = 8509500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/01"),
        Open = 64.95m,
        High = 66.22m,
        Low = 64.56m,
        Close = 65.45m,
        Volume = 9692300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/02"),
        Open = 65.82m,
        High = 65.99m,
        Low = 63.9m,
        Close = 63.9m,
        Volume = 9681200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/03"),
        Open = 64.01m,
        High = 64.6m,
        Low = 63.54m,
        Close = 64.47m,
        Volume = 4039700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/07"),
        Open = 64.66m,
        High = 65.69m,
        Low = 63.57m,
        Close = 64.29m,
        Volume = 6119100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/08"),
        Open = 64.43m,
        High = 66m,
        Low = 64.21m,
        Close = 65.92m,
        Volume = 6615200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/09"),
        Open = 66.06m,
        High = 67.23m,
        Low = 65.32m,
        Close = 65.59m,
        Volume = 9532500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/10"),
        Open = 65.95m,
        High = 66.5m,
        Low = 65.01m,
        Close = 65.99m,
        Volume = 6644200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/11"),
        Open = 65.35m,
        High = 65.35m,
        Low = 62.86m,
        Close = 63.28m,
        Volume = 9701500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/14"),
        Open = 64.4m,
        High = 64.4m,
        Low = 62.63m,
        Close = 63.19m,
        Volume = 5402800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/15"),
        Open = 62.06m,
        High = 64.36m,
        Low = 62.02m,
        Close = 63.88m,
        Volume = 7858400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/16"),
        Open = 63.91m,
        High = 65.68m,
        Low = 63.5m,
        Close = 65.58m,
        Volume = 5431100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/17"),
        Open = 66.05m,
        High = 67.22m,
        Low = 65.05m,
        Close = 66.92m,
        Volume = 6970900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/18"),
        Open = 67.11m,
        High = 68.34m,
        Low = 66.54m,
        Close = 68.14m,
        Volume = 8363100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/21"),
        Open = 68.5m,
        High = 68.91m,
        Low = 67.3m,
        Close = 68.24m,
        Volume = 5017000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/22"),
        Open = 68.58m,
        High = 69.5m,
        Low = 67.76m,
        Close = 69.26m,
        Volume = 5863500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/23"),
        Open = 67.32m,
        High = 68.01m,
        Low = 65.62m,
        Close = 66.72m,
        Volume = 10811700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/24"),
        Open = 65.6m,
        High = 66.09m,
        Low = 62.05m,
        Close = 62.53m,
        Volume = 13765300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/25"),
        Open = 63m,
        High = 64.14m,
        Low = 62.34m,
        Close = 63.83m,
        Volume = 9118200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/28"),
        Open = 63.82m,
        High = 64.06m,
        Low = 62.26m,
        Close = 62.34m,
        Volume = 6193300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/29"),
        Open = 62.64m,
        High = 63.5m,
        Low = 62.32m,
        Close = 63.21m,
        Volume = 5410600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/30"),
        Open = 63.59m,
        High = 63.93m,
        Low = 63m,
        Close = 63.82m,
        Volume = 5971500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/31"),
        Open = 63m,
        High = 63m,
        Low = 61.01m,
        Close = 61.11m,
        Volume = 10282400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/01"),
        Open = 61.39m,
        High = 62.28m,
        Low = 60.77m,
        Close = 62.01m,
        Volume = 5700800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/04"),
        Open = 62.08m,
        High = 62.33m,
        Low = 61.13m,
        Close = 61.36m,
        Volume = 6052800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/05"),
        Open = 61.87m,
        High = 65.68m,
        Low = 61.86m,
        Close = 65.2m,
        Volume = 8779300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/06"),
        Open = 64.9m,
        High = 66.02m,
        Low = 64m,
        Close = 65.4m,
        Volume = 6185600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/07"),
        Open = 65.06m,
        High = 66.18m,
        Low = 64.65m,
        Close = 64.69m,
        Volume = 7211100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/08"),
        Open = 64.87m,
        High = 68.75m,
        Low = 64.31m,
        Close = 67.86m,
        Volume = 9964100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/11"),
        Open = 67.89m,
        High = 67.9m,
        Low = 66.21m,
        Close = 66.62m,
        Volume = 6818500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/12"),
        Open = 66.89m,
        High = 66.95m,
        Low = 65.57m,
        Close = 65.93m,
        Volume = 6311700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/13"),
        Open = 66.07m,
        High = 66.23m,
        Low = 64m,
        Close = 64.26m,
        Volume = 8939500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/14"),
        Open = 63.74m,
        High = 65.43m,
        Low = 63.45m,
        Close = 64.77m,
        Volume = 9165000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/15"),
        Open = 64.77m,
        High = 65.33m,
        Low = 63.82m,
        Close = 64.45m,
        Volume = 7632100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/18"),
        Open = 64.5m,
        High = 65.22m,
        Low = 63.18m,
        Close = 63.64m,
        Volume = 4837000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/19"),
        Open = 63.48m,
        High = 64.19m,
        Low = 62.62m,
        Close = 62.95m,
        Volume = 8091900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/20"),
        Open = 62.99m,
        High = 63.97m,
        Low = 62.21m,
        Close = 63.21m,
        Volume = 3941300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/21"),
        Open = 62.97m,
        High = 63.79m,
        Low = 62.21m,
        Close = 63.55m,
        Volume = 3969400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/22"),
        Open = 63.94m,
        High = 65.71m,
        Low = 63.51m,
        Close = 65.55m,
        Volume = 5425100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/25"),
        Open = 64.91m,
        High = 65.49m,
        Low = 63.58m,
        Close = 64.07m,
        Volume = 4459000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/26"),
        Open = 64.09m,
        High = 64.39m,
        Low = 62.87m,
        Close = 63.46m,
        Volume = 4464800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/27"),
        Open = 63.57m,
        High = 65.2m,
        Low = 63.2m,
        Close = 64.52m,
        Volume = 3876500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/28"),
        Open = 64.78m,
        High = 66.98m,
        Low = 64.26m,
        Close = 66.34m,
        Volume = 4426500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/29"),
        Open = 66.25m,
        High = 66.43m,
        Low = 65.1m,
        Close = 65.56m,
        Volume = 3673300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/02"),
        Open = 67m,
        High = 68.47m,
        Low = 65.43m,
        Close = 65.87m,
        Volume = 6366400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/03"),
        Open = 65.69m,
        High = 67.08m,
        Low = 64.14m,
        Close = 66.07m,
        Volume = 5226200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/04"),
        Open = 65.01m,
        High = 65.3m,
        Low = 62.04m,
        Close = 63.03m,
        Volume = 10831400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/05"),
        Open = 62.52m,
        High = 63.49m,
        Low = 61.89m,
        Close = 62.89m,
        Volume = 5561900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/08"),
        Open = 62.47m,
        High = 64.07m,
        Low = 61.86m,
        Close = 63.91m,
        Volume = 8089100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/09"),
        Open = 63.92m,
        High = 65.22m,
        Low = 63.92m,
        Close = 64.02m,
        Volume = 7659500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/10"),
        Open = 63.58m,
        High = 63.81m,
        Low = 61.58m,
        Close = 61.71m,
        Volume = 8608300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/11"),
        Open = 61.13m,
        High = 62.71m,
        Low = 61.13m,
        Close = 62.57m,
        Volume = 5326700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/12"),
        Open = 62.38m,
        High = 63.42m,
        Low = 61.7m,
        Close = 63.3m,
        Volume = 4928900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/15"),
        Open = 61.81m,
        High = 62.8m,
        Low = 61m,
        Close = 62.25m,
        Volume = 9745400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/16"),
        Open = 61.02m,
        High = 63m,
        Low = 60.16m,
        Close = 61.72m,
        Volume = 8378000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/17"),
        Open = 60.88m,
        High = 61m,
        Low = 56.43m,
        Close = 57m,
        Volume = 14664900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/18"),
        Open = 57.69m,
        High = 58.66m,
        Low = 54.2m,
        Close = 58.11m,
        Volume = 13582400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/19"),
        Open = 60.74m,
        High = 61m,
        Low = 57.6m,
        Close = 59.76m,
        Volume = 10632300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/22"),
        Open = 59.33m,
        High = 60.41m,
        Low = 58.26m,
        Close = 58.81m,
        Volume = 5964700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/23"),
        Open = 58.91m,
        High = 60.39m,
        Low = 57.19m,
        Close = 57.31m,
        Volume = 6602200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/24"),
        Open = 57.54m,
        High = 58.87m,
        Low = 56.93m,
        Close = 57.36m,
        Volume = 5381000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/25"),
        Open = 57.67m,
        High = 58.2m,
        Low = 56.8m,
        Close = 57.42m,
        Volume = 6373000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/26"),
        Open = 56.74m,
        High = 58.5m,
        Low = 56.01m,
        Close = 58.32m,
        Volume = 5789900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/29"),
        Open = 57.5m,
        High = 57.95m,
        Low = 54.75m,
        Close = 55.47m,
        Volume = 9359900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/30"),
        Open = 56.29m,
        High = 57.65m,
        Low = 55.62m,
        Close = 57.35m,
        Volume = 6106800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/01"),
        Open = 56.76m,
        High = 58m,
        Low = 55.37m,
        Close = 56.62m,
        Volume = 6178700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/02"),
        Open = 56.33m,
        High = 56.97m,
        Low = 53.34m,
        Close = 53.58m,
        Volume = 8085500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/03"),
        Open = 54m,
        High = 56.4m,
        Low = 53.76m,
        Close = 53.83m,
        Volume = 7062100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/06"),
        Open = 51.77m,
        High = 53m,
        Low = 47.88m,
        Close = 51.29m,
        Volume = 12338600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/07"),
        Open = 51.79m,
        High = 52.56m,
        Low = 48.71m,
        Close = 49.28m,
        Volume = 10625100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/08"),
        Open = 48.41m,
        High = 50m,
        Low = 47.18m,
        Close = 47.7m,
        Volume = 11728300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/09"),
        Open = 47.83m,
        High = 48.94m,
        Low = 44.41m,
        Close = 44.41m,
        Volume = 11996600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/10"),
        Open = 40.13m,
        High = 44.25m,
        Low = 40m,
        Close = 41.8m,
        Volume = 19234400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/13"),
        Open = 43.57m,
        High = 47.31m,
        Low = 42.5m,
        Close = 47.08m,
        Volume = 13795700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/14"),
        Open = 48.63m,
        High = 49.47m,
        Low = 43.61m,
        Close = 45.07m,
        Volume = 11745000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/15"),
        Open = 44.18m,
        High = 45.48m,
        Low = 41.54m,
        Close = 42.33m,
        Volume = 10008800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/16"),
        Open = 42.64m,
        High = 45m,
        Low = 39.99m,
        Close = 44.79m,
        Volume = 11711800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/17"),
        Open = 43.95m,
        High = 46.82m,
        Low = 43.21m,
        Close = 44.55m,
        Volume = 9914500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/20"),
        Open = 44.74m,
        High = 46.77m,
        Low = 43.72m,
        Close = 46.71m,
        Volume = 7787500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/21"),
        Open = 46.32m,
        High = 47.69m,
        Low = 45.53m,
        Close = 46.4m,
        Volume = 7341100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/22"),
        Open = 44.16m,
        High = 44.9m,
        Low = 41.8m,
        Close = 42.91m,
        Volume = 9955300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/23"),
        Open = 43.2m,
        High = 46.81m,
        Low = 42.81m,
        Close = 46.52m,
        Volume = 13879000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/24"),
        Open = 42.5m,
        High = 47.24m,
        Low = 41.75m,
        Close = 45.24m,
        Volume = 9674400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/27"),
        Open = 45.7m,
        High = 46.13m,
        Low = 42.26m,
        Close = 42.36m,
        Volume = 9163000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/28"),
        Open = 46.45m,
        High = 49.05m,
        Low = 43.63m,
        Close = 48.91m,
        Volume = 13883100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/29"),
        Open = 48.81m,
        High = 52.82m,
        Low = 48.81m,
        Close = 49.8m,
        Volume = 12787300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/30"),
        Open = 52.28m,
        High = 52.8m,
        Low = 48.58m,
        Close = 50.7m,
        Volume = 9483200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/31"),
        Open = 50.62m,
        High = 52.61m,
        Low = 49.28m,
        Close = 52.42m,
        Volume = 8329800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/03"),
        Open = 51.9m,
        High = 53.18m,
        Low = 50.82m,
        Close = 52.85m,
        Volume = 8279600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/04"),
        Open = 54.41m,
        High = 54.65m,
        Low = 52.72m,
        Close = 53.62m,
        Volume = 9210700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/05"),
        Open = 52.5m,
        High = 52.59m,
        Low = 49m,
        Close = 49.55m,
        Volume = 9961700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/06"),
        Open = 48.97m,
        High = 50.23m,
        Low = 45.35m,
        Close = 45.72m,
        Volume = 12350500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/07"),
        Open = 46.58m,
        High = 47.3m,
        Low = 45.35m,
        Close = 46.58m,
        Volume = 6995300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/10"),
        Open = 47.3m,
        High = 48.31m,
        Low = 45.59m,
        Close = 46.14m,
        Volume = 5393268
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/11"),
        Open = 44.6m,
        High = 45.5m,
        Low = 42.75m,
        Close = 43.97m,
        Volume = 7928518
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/12"),
        Open = 43.23m,
        High = 44.09m,
        Low = 42m,
        Close = 42.52m,
        Volume = 7739698
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/13"),
        Open = 42.03m,
        High = 43.32m,
        Low = 39.07m,
        Close = 43.16m,
        Volume = 13998148
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/14"),
        Open = 42.01m,
        High = 43.76m,
        Low = 40.8m,
        Close = 41.04m,
        Volume = 8909613
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/17"),
        Open = 40.61m,
        High = 42.8m,
        Low = 40.5m,
        Close = 41.18m,
        Volume = 7050161
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/18"),
        Open = 40.6m,
        High = 40.76m,
        Low = 38.05m,
        Close = 39.56m,
        Volume = 12209287
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/19"),
        Open = 39.28m,
        High = 40.13m,
        Low = 37.45m,
        Close = 37.48m,
        Volume = 10614563
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/20"),
        Open = 36.98m,
        High = 39.74m,
        Low = 36.72m,
        Close = 37.11m,
        Volume = 13406408
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/21"),
        Open = 37.18m,
        High = 39.93m,
        Low = 36.17m,
        Close = 39.58m,
        Volume = 13259691
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/24"),
        Open = 40.05m,
        High = 41.25m,
        Low = 38.89m,
        Close = 40.75m,
        Volume = 9682999
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/25"),
        Open = 40.55m,
        High = 40.8m,
        Low = 39.54m,
        Close = 40.18m,
        Volume = 9618669
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/26"),
        Open = 39.35m,
        High = 41.34m,
        Low = 39.02m,
        Close = 41.28m,
        Volume = 6256444
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/27"),
        Open = 41.28m,
        High = 41.28m,
        Low = 41.28m,
        Close = 41.28m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/28"),
        Open = 41.17m,
        High = 42.8m,
        Low = 41.1m,
        Close = 42.63m,
        Volume = 2609116
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/01"),
        Open = 41.64m,
        High = 42m,
        Low = 39.74m,
        Close = 39.88m,
        Volume = 7902844
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/02"),
        Open = 40.54m,
        High = 41m,
        Low = 39.25m,
        Close = 40.7m,
        Volume = 6029450
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/03"),
        Open = 40.23m,
        High = 41.1m,
        Low = 39.15m,
        Close = 40.47m,
        Volume = 8007510
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/04"),
        Open = 39.84m,
        High = 41.33m,
        Low = 38.5m,
        Close = 39.19m,
        Volume = 7247221
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/05"),
        Open = 38m,
        High = 39.57m,
        Low = 36.28m,
        Close = 39.53m,
        Volume = 10564791
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/08"),
        Open = 40.35m,
        High = 43.69m,
        Low = 40.04m,
        Close = 42.85m,
        Volume = 13096694
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/09"),
        Open = 41.57m,
        High = 42.44m,
        Low = 40.65m,
        Close = 40.82m,
        Volume = 8311791
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/10"),
        Open = 41.49m,
        High = 42.69m,
        Low = 40.94m,
        Close = 41.68m,
        Volume = 5181450
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/11"),
        Open = 40.65m,
        High = 42.01m,
        Low = 40.02m,
        Close = 40.27m,
        Volume = 7693498
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/12"),
        Open = 39.56m,
        High = 39.74m,
        Low = 38.2m,
        Close = 39.2m,
        Volume = 10339591
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/15"),
        Open = 39.6m,
        High = 39.88m,
        Low = 38.2m,
        Close = 38.74m,
        Volume = 8227911
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/16"),
        Open = 39.21m,
        High = 42m,
        Low = 38.2m,
        Close = 41.9m,
        Volume = 11043685
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/17"),
        Open = 41.16m,
        High = 41.5m,
        Low = 40.15m,
        Close = 41m,
        Volume = 7296702
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/18"),
        Open = 41.31m,
        High = 41.75m,
        Low = 40.69m,
        Close = 41.07m,
        Volume = 8653023
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/19"),
        Open = 41.32m,
        High = 42.39m,
        Low = 41m,
        Close = 41.24m,
        Volume = 9903824
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/22"),
        Open = 40.65m,
        High = 41.56m,
        Low = 40m,
        Close = 41.12m,
        Volume = 5397178
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/23"),
        Open = 41.25m,
        High = 41.5m,
        Low = 39.83m,
        Close = 40.15m,
        Volume = 5278971
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/24"),
        Open = 40.24m,
        High = 40.79m,
        Low = 40.04m,
        Close = 40.12m,
        Volume = 1758134
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/25"),
        Open = 40.12m,
        High = 40.12m,
        Low = 40.12m,
        Close = 40.12m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/26"),
        Open = 39.76m,
        High = 40.69m,
        Low = 39.76m,
        Close = 40.53m,
        Volume = 2803350
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/29"),
        Open = 40.38m,
        High = 40.55m,
        Low = 39.5m,
        Close = 39.99m,
        Volume = 3876953
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/30"),
        Open = 40.08m,
        High = 41.34m,
        Low = 39.81m,
        Close = 41.25m,
        Volume = 4550017
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/31"),
        Open = 41.59m,
        High = 43.05m,
        Low = 41.5m,
        Close = 42.67m,
        Volume = 5443052
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/01"),
        Open = 42.67m,
        High = 42.67m,
        Low = 42.67m,
        Close = 42.67m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/02"),
        Open = 42.8m,
        High = 45.56m,
        Low = 42.78m,
        Close = 45.25m,
        Volume = 7015401
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/05"),
        Open = 45.5m,
        High = 46.81m,
        Low = 44.8m,
        Close = 46.17m,
        Volume = 6917353
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/06"),
        Open = 46.85m,
        High = 47m,
        Low = 45.5m,
        Close = 46.31m,
        Volume = 7180978
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/07"),
        Open = 45.1m,
        High = 45.61m,
        Low = 44.17m,
        Close = 44.76m,
        Volume = 6586569
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/08"),
        Open = 44.5m,
        High = 44.9m,
        Low = 43.88m,
        Close = 44.79m,
        Volume = 5476976
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/09"),
        Open = 44.8m,
        High = 45.15m,
        Low = 43.93m,
        Close = 44.45m,
        Volume = 5645042
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/12"),
        Open = 44.28m,
        High = 44.45m,
        Low = 43.19m,
        Close = 43.74m,
        Volume = 4989247
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/13"),
        Open = 43.38m,
        High = 43.62m,
        Low = 41.8m,
        Close = 42.46m,
        Volume = 6359304
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/14"),
        Open = 41.88m,
        High = 41.98m,
        Low = 40.87m,
        Close = 41.2m,
        Volume = 7354895
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/15"),
        Open = 41.07m,
        High = 41.6m,
        Low = 39.51m,
        Close = 40.96m,
        Volume = 8470900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/16"),
        Open = 41.45m,
        High = 43.05m,
        Low = 41.04m,
        Close = 42.46m,
        Volume = 9310704
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/20"),
        Open = 42.08m,
        High = 42.74m,
        Low = 40.2m,
        Close = 40.36m,
        Volume = 9637118
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/21"),
        Open = 40.75m,
        High = 42.4m,
        Low = 40m,
        Close = 42.27m,
        Volume = 6933013
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/22"),
        Open = 41.73m,
        High = 42.75m,
        Low = 41.17m,
        Close = 42.26m,
        Volume = 6590741
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/23"),
        Open = 40.91m,
        High = 42.84m,
        Low = 40.91m,
        Close = 41.98m,
        Volume = 5755506
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/26"),
        Open = 42.46m,
        High = 43.77m,
        Low = 42.06m,
        Close = 43.01m,
        Volume = 4659614
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/27"),
        Open = 43.29m,
        High = 43.96m,
        Low = 42.88m,
        Close = 43.22m,
        Volume = 5219049
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/28"),
        Open = 43.47m,
        High = 44.4m,
        Low = 42.76m,
        Close = 43.24m,
        Volume = 8071591
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/29"),
        Open = 42.76m,
        High = 42.76m,
        Low = 40.37m,
        Close = 40.71m,
        Volume = 8446964
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/30"),
        Open = 40.76m,
        High = 42.49m,
        Low = 40.63m,
        Close = 42.31m,
        Volume = 9098244
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/02"),
        Open = 41.73m,
        High = 41.73m,
        Low = 40.11m,
        Close = 40.8m,
        Volume = 8108969
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/03"),
        Open = 41.45m,
        High = 42.43m,
        Low = 40.76m,
        Close = 42.09m,
        Volume = 7221234
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/04"),
        Open = 42.12m,
        High = 42.97m,
        Low = 41.69m,
        Close = 41.97m,
        Volume = 6729377
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/05"),
        Open = 41.75m,
        High = 43.11m,
        Low = 40.62m,
        Close = 42.72m,
        Volume = 9021007
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/06"),
        Open = 42.52m,
        High = 43.67m,
        Low = 42.25m,
        Close = 42.92m,
        Volume = 6334157
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/09"),
        Open = 42.8m,
        High = 43.42m,
        Low = 42.44m,
        Close = 42.8m,
        Volume = 5091901
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/10"),
        Open = 41.29m,
        High = 42.23m,
        Low = 40.02m,
        Close = 40.21m,
        Volume = 9999165
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/11"),
        Open = 40.51m,
        High = 40.76m,
        Low = 39.86m,
        Close = 40.33m,
        Volume = 6519292
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/12"),
        Open = 39.58m,
        High = 39.99m,
        Low = 38.58m,
        Close = 39.86m,
        Volume = 6028812
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/13"),
        Open = 39.89m,
        High = 41.19m,
        Low = 39.89m,
        Close = 40.48m,
        Volume = 5483456
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/17"),
        Open = 39.49m,
        High = 39.74m,
        Low = 38.3m,
        Close = 38.43m,
        Volume = 6949373
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/18"),
        Open = 38.77m,
        High = 38.77m,
        Low = 37.76m,
        Close = 37.98m,
        Volume = 6324425
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/19"),
        Open = 38.24m,
        High = 38.7m,
        Low = 37.42m,
        Close = 37.57m,
        Volume = 5467493
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/20"),
        Open = 36.73m,
        High = 37.2m,
        Low = 35.32m,
        Close = 36.31m,
        Volume = 10598817
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/23"),
        Open = 36.73m,
        High = 36.79m,
        Low = 34.35m,
        Close = 34.46m,
        Volume = 9519748
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/24"),
        Open = 34.44m,
        High = 35.83m,
        Low = 33.89m,
        Close = 35.44m,
        Volume = 10815805
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/25"),
        Open = 35.27m,
        High = 35.27m,
        Low = 33.22m,
        Close = 33.91m,
        Volume = 11684407
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/26"),
        Open = 34.5m,
        High = 34.62m,
        Low = 32.64m,
        Close = 32.71m,
        Volume = 8772639
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/27"),
        Open = 32.3m,
        High = 32.37m,
        Low = 31.4m,
        Close = 31.44m,
        Volume = 11791144
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/02"),
        Open = 30.96m,
        High = 31m,
        Low = 29.32m,
        Close = 29.51m,
        Volume = 13957450
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/03"),
        Open = 29.7m,
        High = 30.11m,
        Low = 29.05m,
        Close = 29.36m,
        Volume = 10434638
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/04"),
        Open = 29.86m,
        High = 30.78m,
        Low = 29.11m,
        Close = 30.31m,
        Volume = 11627491
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/05"),
        Open = 29.22m,
        High = 30.02m,
        Low = 29.07m,
        Close = 29.39m,
        Volume = 11677478
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/06"),
        Open = 29.61m,
        High = 30.2m,
        Low = 29.39m,
        Close = 30.1m,
        Volume = 13134932
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/09"),
        Open = 29.98m,
        High = 31.46m,
        Low = 29.96m,
        Close = 31m,
        Volume = 12407248
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/10"),
        Open = 31.42m,
        High = 33.02m,
        Low = 31.32m,
        Close = 33.01m,
        Volume = 11503739
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/11"),
        Open = 32.59m,
        High = 33.7m,
        Low = 32.39m,
        Close = 33.27m,
        Volume = 10823124
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/12"),
        Open = 33.01m,
        High = 33.75m,
        Low = 32.39m,
        Close = 33.63m,
        Volume = 6133118
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/13"),
        Open = 33.72m,
        High = 34.1m,
        Low = 32.93m,
        Close = 33.4m,
        Volume = 7433920
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/16"),
        Open = 33.74m,
        High = 34.96m,
        Low = 33.38m,
        Close = 33.83m,
        Volume = 7157179
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/17"),
        Open = 33.92m,
        High = 34.44m,
        Low = 33.26m,
        Close = 34.44m,
        Volume = 5270819
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/18"),
        Open = 34.29m,
        High = 34.75m,
        Low = 32.5m,
        Close = 33.75m,
        Volume = 15880435
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/19"),
        Open = 33.86m,
        High = 34.12m,
        Low = 32.97m,
        Close = 33.19m,
        Volume = 10427238
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/20"),
        Open = 33.22m,
        High = 33.5m,
        Low = 32.54m,
        Close = 32.55m,
        Volume = 11323372
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/23"),
        Open = 33.2m,
        High = 35.5m,
        Low = 33.05m,
        Close = 35.5m,
        Volume = 8224801
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/24"),
        Open = 34.88m,
        High = 36.72m,
        Low = 34.82m,
        Close = 36.1m,
        Volume = 8468464
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/25"),
        Open = 36.03m,
        High = 37.79m,
        Low = 35.97m,
        Close = 37.06m,
        Volume = 12446132
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/26"),
        Open = 37.32m,
        High = 38.68m,
        Low = 36.91m,
        Close = 38.66m,
        Volume = 9545245
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/27"),
        Open = 38.23m,
        High = 38.47m,
        Low = 37.07m,
        Close = 37.53m,
        Volume = 7329928
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/30"),
        Open = 36.63m,
        High = 36.98m,
        Low = 35.11m,
        Close = 35.52m,
        Volume = 10833746
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/31"),
        Open = 35.9m,
        High = 36.24m,
        Low = 35.05m,
        Close = 35.58m,
        Volume = 11554622
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/01"),
        Open = 34.52m,
        High = 35.6m,
        Low = 34.21m,
        Close = 35.44m,
        Volume = 9288960
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/02"),
        Open = 36.16m,
        High = 37.98m,
        Low = 36.16m,
        Close = 37.2m,
        Volume = 9449239
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/03"),
        Open = 37.23m,
        High = 38.12m,
        Low = 36.39m,
        Close = 37.69m,
        Volume = 8589054
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/06"),
        Open = 37.48m,
        High = 38.22m,
        Low = 36.54m,
        Close = 38.16m,
        Volume = 7390249
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/07"),
        Open = 37.51m,
        High = 37.69m,
        Low = 36.51m,
        Close = 36.64m,
        Volume = 6017902
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/08"),
        Open = 36.5m,
        High = 37.16m,
        Low = 36.24m,
        Close = 36.87m,
        Volume = 4477215
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/09"),
        Open = 37.68m,
        High = 39.18m,
        Low = 37.68m,
        Close = 39.15m,
        Volume = 9069452
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/10"),
        Open = 39.15m,
        High = 39.15m,
        Low = 39.15m,
        Close = 39.15m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/13"),
        Open = 36.97m,
        High = 37.48m,
        Low = 35.81m,
        Close = 37.15m,
        Volume = 9531345
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/14"),
        Open = 36.51m,
        High = 37.5m,
        Low = 36.3m,
        Close = 37.04m,
        Volume = 5845448
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/15"),
        Open = 36.63m,
        High = 38.04m,
        Low = 36.61m,
        Close = 37.57m,
        Volume = 5452170
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/16"),
        Open = 37.62m,
        High = 38.75m,
        Low = 37m,
        Close = 38.39m,
        Volume = 6424207
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/17"),
        Open = 38.55m,
        High = 38.78m,
        Low = 38.18m,
        Close = 38.32m,
        Volume = 6152358
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/20"),
        Open = 37.65m,
        High = 37.86m,
        Low = 36.36m,
        Close = 36.48m,
        Volume = 7016920
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/21"),
        Open = 36.66m,
        High = 36.66m,
        Low = 35.94m,
        Close = 36.65m,
        Volume = 7354022
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/22"),
        Open = 37.85m,
        High = 38.32m,
        Low = 36.54m,
        Close = 37.3m,
        Volume = 11625938
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/23"),
        Open = 37.29m,
        High = 38.12m,
        Low = 36.6m,
        Close = 37.93m,
        Volume = 6400647
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/24"),
        Open = 38.1m,
        High = 39.01m,
        Low = 37.75m,
        Close = 38.72m,
        Volume = 8351452
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/27"),
        Open = 37.99m,
        High = 39.85m,
        Low = 37.72m,
        Close = 39.47m,
        Volume = 8546412
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/28"),
        Open = 39.11m,
        High = 39.42m,
        Low = 38.32m,
        Close = 38.85m,
        Volume = 6628144
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/29"),
        Open = 39.09m,
        High = 40.73m,
        Low = 39.02m,
        Close = 40.55m,
        Volume = 7776238
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/30"),
        Open = 41.07m,
        High = 41.74m,
        Low = 39.9m,
        Close = 40.05m,
        Volume = 7034295
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/01"),
        Open = 40.31m,
        High = 41.37m,
        Low = 40.09m,
        Close = 41.21m,
        Volume = 5508746
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/04"),
        Open = 41.9m,
        High = 42.18m,
        Low = 41.51m,
        Close = 42.18m,
        Volume = 5269978
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/05"),
        Open = 41.92m,
        High = 43.25m,
        Low = 41.92m,
        Close = 43.15m,
        Volume = 7684469
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/06"),
        Open = 43.3m,
        High = 44.21m,
        Low = 43.08m,
        Close = 44.2m,
        Volume = 7930736
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/07"),
        Open = 44.47m,
        High = 44.62m,
        Low = 42.75m,
        Close = 43.53m,
        Volume = 7106644
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/08"),
        Open = 43.96m,
        High = 45.84m,
        Low = 43.77m,
        Close = 45.83m,
        Volume = 7492282
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/11"),
        Open = 45.26m,
        High = 45.6m,
        Low = 44.53m,
        Close = 44.72m,
        Volume = 9595953
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/12"),
        Open = 44.54m,
        High = 45.07m,
        Low = 43.29m,
        Close = 44.1m,
        Volume = 7068690
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/13"),
        Open = 43.18m,
        High = 43.42m,
        Low = 42.38m,
        Close = 42.95m,
        Volume = 6324439
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/14"),
        Open = 42.94m,
        High = 43.81m,
        Low = 42.72m,
        Close = 43.44m,
        Volume = 5251582
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/15"),
        Open = 43.27m,
        High = 43.99m,
        Low = 42.71m,
        Close = 43m,
        Volume = 5189274
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/18"),
        Open = 44.25m,
        High = 44.53m,
        Low = 43.81m,
        Close = 44.37m,
        Volume = 7287980
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/19"),
        Open = 44.36m,
        High = 45.06m,
        Low = 43.9m,
        Close = 44.62m,
        Volume = 4792104
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/20"),
        Open = 45.05m,
        High = 45.74m,
        Low = 44.54m,
        Close = 44.58m,
        Volume = 4734105
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/21"),
        Open = 43.99m,
        High = 44m,
        Low = 42.7m,
        Close = 43.29m,
        Volume = 5784926
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/22"),
        Open = 43.47m,
        High = 43.61m,
        Low = 42.86m,
        Close = 42.94m,
        Volume = 2951530
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/25"),
        Open = 42.94m,
        High = 42.94m,
        Low = 42.94m,
        Close = 42.94m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/26"),
        Open = 42.61m,
        High = 44.33m,
        Low = 42.52m,
        Close = 44.16m,
        Volume = 4718494
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/27"),
        Open = 43.89m,
        High = 44.33m,
        Low = 43.45m,
        Close = 43.57m,
        Volume = 4622463
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/28"),
        Open = 43.99m,
        High = 44.45m,
        Low = 43.19m,
        Close = 44.32m,
        Volume = 4559692
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/29"),
        Open = 44.61m,
        High = 45.08m,
        Low = 43.95m,
        Close = 44.85m,
        Volume = 5417382
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/01"),
        Open = 45.54m,
        High = 47.81m,
        Low = 45.54m,
        Close = 47.7m,
        Volume = 6920442
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/02"),
        Open = 47.7m,
        High = 49.43m,
        Low = 47.31m,
        Close = 49.2m,
        Volume = 7453324
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/03"),
        Open = 48.71m,
        High = 49.2m,
        Low = 47.79m,
        Close = 48.37m,
        Volume = 4700000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/04"),
        Open = 48.63m,
        High = 50.91m,
        Low = 48.57m,
        Close = 50.57m,
        Volume = 7324587
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/05"),
        Open = 52.16m,
        High = 53.26m,
        Low = 52.16m,
        Close = 52.65m,
        Volume = 13724165
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/08"),
        Open = 52.49m,
        High = 53.33m,
        Low = 51.13m,
        Close = 52.83m,
        Volume = 7961110
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/09"),
        Open = 53.39m,
        High = 53.39m,
        Low = 51.31m,
        Close = 52.35m,
        Volume = 7729036
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/10"),
        Open = 52.82m,
        High = 53.2m,
        Low = 51.1m,
        Close = 52.3m,
        Volume = 6556551
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/11"),
        Open = 51.83m,
        High = 52.57m,
        Low = 50.48m,
        Close = 50.66m,
        Volume = 11854971
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/12"),
        Open = 50.76m,
        High = 51.56m,
        Low = 50.11m,
        Close = 51.44m,
        Volume = 5476628
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/15"),
        Open = 50.9m,
        High = 51.09m,
        Low = 49.02m,
        Close = 49.52m,
        Volume = 6363736
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/16"),
        Open = 49.57m,
        High = 50.15m,
        Low = 48.7m,
        Close = 48.83m,
        Volume = 5725789
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/17"),
        Open = 48.55m,
        High = 49.16m,
        Low = 48.05m,
        Close = 48.55m,
        Volume = 4870801
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/18"),
        Open = 48.43m,
        High = 49.28m,
        Low = 48.15m,
        Close = 48.96m,
        Volume = 3099818
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/19"),
        Open = 49.18m,
        High = 49.53m,
        Low = 48.11m,
        Close = 48.44m,
        Volume = 7033003
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/22"),
        Open = 47.83m,
        High = 48.03m,
        Low = 46.53m,
        Close = 46.9m,
        Volume = 5200331
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/23"),
        Open = 44.39m,
        High = 44.5m,
        Low = 42.52m,
        Close = 43.87m,
        Volume = 27281935
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/24"),
        Open = 43.14m,
        High = 43.55m,
        Low = 41.09m,
        Close = 41.32m,
        Volume = 21288390
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/25"),
        Open = 41.4m,
        High = 42.6m,
        Low = 41.11m,
        Close = 42.53m,
        Volume = 14004279
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/26"),
        Open = 42.11m,
        High = 42.78m,
        Low = 41.5m,
        Close = 41.88m,
        Volume = 15579315
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/29"),
        Open = 42.15m,
        High = 43.02m,
        Low = 42.08m,
        Close = 42.65m,
        Volume = 5515509
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/30"),
        Open = 43.63m,
        High = 43.79m,
        Low = 42.1m,
        Close = 42.5m,
        Volume = 8323070
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/01"),
        Open = 42.63m,
        High = 42.95m,
        Low = 42.15m,
        Close = 42.23m,
        Volume = 6349337
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/02"),
        Open = 41.81m,
        High = 41.81m,
        Low = 40.62m,
        Close = 40.83m,
        Volume = 7202073
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/03"),
        Open = 40.83m,
        High = 40.83m,
        Low = 40.83m,
        Close = 40.83m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/06"),
        Open = 40.38m,
        High = 40.76m,
        Low = 39.92m,
        Close = 40.56m,
        Volume = 7132705
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/07"),
        Open = 40.5m,
        High = 40.69m,
        Low = 38.94m,
        Close = 39.04m,
        Volume = 7704977
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/08"),
        Open = 39.12m,
        High = 39.83m,
        Low = 38.92m,
        Close = 39.55m,
        Volume = 8800410
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/09"),
        Open = 39.75m,
        High = 40m,
        Low = 39.02m,
        Close = 39.3m,
        Volume = 5432882
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/10"),
        Open = 39.2m,
        High = 39.71m,
        Low = 38.92m,
        Close = 39.65m,
        Volume = 5833519
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/13"),
        Open = 39.68m,
        High = 40.83m,
        Low = 39.26m,
        Close = 40.44m,
        Volume = 6548930
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/14"),
        Open = 40.39m,
        High = 40.9m,
        Low = 40.11m,
        Close = 40.41m,
        Volume = 5748486
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/15"),
        Open = 40.77m,
        High = 41.46m,
        Low = 40.51m,
        Close = 41.36m,
        Volume = 7867386
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/16"),
        Open = 41.01m,
        High = 42.22m,
        Low = 41.01m,
        Close = 42.05m,
        Volume = 5357378
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/17"),
        Open = 42.25m,
        High = 42.4m,
        Low = 41.1m,
        Close = 41.36m,
        Volume = 5691633
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/20"),
        Open = 41.71m,
        High = 42.26m,
        Low = 41.16m,
        Close = 42.2m,
        Volume = 5535128
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/21"),
        Open = 42.82m,
        High = 43.71m,
        Low = 42.5m,
        Close = 43.02m,
        Volume = 9170568
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/22"),
        Open = 42.4m,
        High = 43.46m,
        Low = 41.95m,
        Close = 42m,
        Volume = 12054670
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/23"),
        Open = 42m,
        High = 42.19m,
        Low = 40.78m,
        Close = 41.95m,
        Volume = 13620201
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/24"),
        Open = 41.95m,
        High = 42.49m,
        Low = 41.72m,
        Close = 42.37m,
        Volume = 5068137
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/27"),
        Open = 42m,
        High = 42.37m,
        Low = 41.43m,
        Close = 42.24m,
        Volume = 5674196
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/28"),
        Open = 41.99m,
        High = 43.35m,
        Low = 41.8m,
        Close = 43.25m,
        Volume = 7831218
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/29"),
        Open = 43m,
        High = 43.5m,
        Low = 42.64m,
        Close = 43.37m,
        Volume = 5078235
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/30"),
        Open = 43.94m,
        High = 44.5m,
        Low = 43.13m,
        Close = 43.24m,
        Volume = 8281103
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/31"),
        Open = 43.32m,
        High = 43.49m,
        Low = 42.8m,
        Close = 42.91m,
        Volume = 6029316
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/03"),
        Open = 43.18m,
        High = 44.02m,
        Low = 42.51m,
        Close = 43.79m,
        Volume = 6070774
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/04"),
        Open = 43.64m,
        High = 44.44m,
        Low = 43.35m,
        Close = 44.16m,
        Volume = 5964801
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/05"),
        Open = 43.63m,
        High = 44.21m,
        Low = 43.4m,
        Close = 44.03m,
        Volume = 7129795
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/06"),
        Open = 44.29m,
        High = 45.73m,
        Low = 44.03m,
        Close = 45.52m,
        Volume = 10206967
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/07"),
        Open = 45.89m,
        High = 47.21m,
        Low = 45.38m,
        Close = 46.69m,
        Volume = 6689010
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/10"),
        Open = 46.41m,
        High = 46.41m,
        Low = 45.19m,
        Close = 45.77m,
        Volume = 5620504
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/12"),
        Open = 45.33m,
        High = 46.78m,
        Low = 45.31m,
        Close = 46.34m,
        Volume = 4682233
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/13"),
        Open = 46.45m,
        High = 46.87m,
        Low = 45.75m,
        Close = 46.62m,
        Volume = 3485707
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/14"),
        Open = 45.82m,
        High = 46.24m,
        Low = 44.21m,
        Close = 44.87m,
        Volume = 10507286
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/17"),
        Open = 44.16m,
        High = 44.28m,
        Low = 43.7m,
        Close = 44.16m,
        Volume = 5211546
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/18"),
        Open = 44m,
        High = 44.53m,
        Low = 43.69m,
        Close = 43.78m,
        Volume = 5444211
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/19"),
        Open = 43.5m,
        High = 43.91m,
        Low = 43.1m,
        Close = 43.52m,
        Volume = 6578869
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/20"),
        Open = 43.54m,
        High = 44.83m,
        Low = 43.49m,
        Close = 44.74m,
        Volume = 5192085
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/21"),
        Open = 45.18m,
        High = 46.02m,
        Low = 44.92m,
        Close = 45.87m,
        Volume = 5529898
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/24"),
        Open = 46.51m,
        High = 47.79m,
        Low = 45.97m,
        Close = 47.13m,
        Volume = 6157981
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/25"),
        Open = 47.5m,
        High = 48.77m,
        Low = 47.28m,
        Close = 48.25m,
        Volume = 8248067
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/26"),
        Open = 48.07m,
        High = 48.38m,
        Low = 47.44m,
        Close = 47.82m,
        Volume = 3955909
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/27"),
        Open = 51.37m,
        High = 52.38m,
        Low = 51m,
        Close = 51.82m,
        Volume = 17791897
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/28"),
        Open = 51.68m,
        High = 52.53m,
        Low = 50.7m,
        Close = 51.04m,
        Volume = 11456903
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/31"),
        Open = 50.17m,
        High = 50.25m,
        Low = 49.02m,
        Close = 49.67m,
        Volume = 9298034
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/01"),
        Open = 49.21m,
        High = 50.38m,
        Low = 48.47m,
        Close = 48.77m,
        Volume = 8242544
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/02"),
        Open = 48.59m,
        High = 48.98m,
        Low = 48.16m,
        Close = 48.4m,
        Volume = 3835813
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/03"),
        Open = 48.67m,
        High = 48.83m,
        Low = 47.76m,
        Close = 48.46m,
        Volume = 5466474
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/04"),
        Open = 48.74m,
        High = 49.26m,
        Low = 48.05m,
        Close = 49.15m,
        Volume = 5711551
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/08"),
        Open = 49.73m,
        High = 49.88m,
        Low = 48.81m,
        Close = 49.5m,
        Volume = 4583854
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/09"),
        Open = 49.7m,
        High = 51.15m,
        Low = 49.7m,
        Close = 50.53m,
        Volume = 5895878
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/10"),
        Open = 50.42m,
        High = 50.72m,
        Low = 49.79m,
        Close = 50.49m,
        Volume = 3847196
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/11"),
        Open = 50.64m,
        High = 51.44m,
        Low = 50.48m,
        Close = 51.35m,
        Volume = 5880487
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/14"),
        Open = 50.99m,
        High = 51.26m,
        Low = 50.44m,
        Close = 50.97m,
        Volume = 4392690
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/15"),
        Open = 51.26m,
        High = 52.34m,
        Low = 50.88m,
        Close = 52.07m,
        Volume = 6584383
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/16"),
        Open = 52.44m,
        High = 52.76m,
        Low = 51.79m,
        Close = 52.36m,
        Volume = 5108533
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/17"),
        Open = 52.25m,
        High = 53.16m,
        Low = 52.2m,
        Close = 52.88m,
        Volume = 4676793
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/18"),
        Open = 53.02m,
        High = 53.29m,
        Low = 52.1m,
        Close = 53.02m,
        Volume = 6532987
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/21"),
        Open = 52.6m,
        High = 53.36m,
        Low = 52.42m,
        Close = 52.86m,
        Volume = 3076162
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/22"),
        Open = 52.96m,
        High = 53.31m,
        Low = 52.13m,
        Close = 53.14m,
        Volume = 3898295
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/23"),
        Open = 53.35m,
        High = 53.4m,
        Low = 52.26m,
        Close = 52.37m,
        Volume = 4606266
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/24"),
        Open = 52.23m,
        High = 52.52m,
        Low = 51.52m,
        Close = 51.79m,
        Volume = 5351955
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/25"),
        Open = 51.86m,
        High = 52.4m,
        Low = 51.3m,
        Close = 51.52m,
        Volume = 3638503
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/28"),
        Open = 51.82m,
        High = 53.34m,
        Low = 51.76m,
        Close = 53.07m,
        Volume = 4925406
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/29"),
        Open = 53.28m,
        High = 55.48m,
        Low = 53.28m,
        Close = 54.62m,
        Volume = 7267767
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/30"),
        Open = 54.86m,
        High = 55.25m,
        Low = 53.46m,
        Close = 54.15m,
        Volume = 5939577
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/01"),
        Open = 53.85m,
        High = 53.9m,
        Low = 52.03m,
        Close = 52.11m,
        Volume = 6605905
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/02"),
        Open = 51.19m,
        High = 51.76m,
        Low = 50.1m,
        Close = 51.4m,
        Volume = 6042924
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/05"),
        Open = 51.75m,
        High = 52.52m,
        Low = 51.38m,
        Close = 52.28m,
        Volume = 3083033
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/06"),
        Open = 51.54m,
        High = 52.57m,
        Low = 51.15m,
        Close = 52.29m,
        Volume = 6244477
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/07"),
        Open = 52.18m,
        High = 52.25m,
        Low = 51.25m,
        Close = 51.79m,
        Volume = 3659513
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/08"),
        Open = 52.3m,
        High = 52.6m,
        Low = 51.86m,
        Close = 52.3m,
        Volume = 3190520
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/09"),
        Open = 52.49m,
        High = 52.75m,
        Low = 51.96m,
        Close = 52.69m,
        Volume = 2591224
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/12"),
        Open = 52.66m,
        High = 52.73m,
        Low = 51.38m,
        Close = 51.66m,
        Volume = 3974463
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/13"),
        Open = 51.64m,
        High = 51.98m,
        Low = 51.36m,
        Close = 51.9m,
        Volume = 3024957
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/14"),
        Open = 52.31m,
        High = 52.55m,
        Low = 51.57m,
        Close = 52.51m,
        Volume = 4646221
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/15"),
        Open = 52.03m,
        High = 52.53m,
        Low = 50.94m,
        Close = 51.76m,
        Volume = 5686783
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/16"),
        Open = 51.19m,
        High = 53.72m,
        Low = 50.85m,
        Close = 53.19m,
        Volume = 7432893
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/19"),
        Open = 53.32m,
        High = 53.75m,
        Low = 52.59m,
        Close = 53.45m,
        Volume = 3841793
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/20"),
        Open = 51.71m,
        High = 52.3m,
        Low = 51.07m,
        Close = 51.89m,
        Volume = 8191000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/21"),
        Open = 51.07m,
        High = 52m,
        Low = 50.5m,
        Close = 50.63m,
        Volume = 8115466
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/22"),
        Open = 50.33m,
        High = 51.23m,
        Low = 49.75m,
        Close = 51.07m,
        Volume = 6375233
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/23"),
        Open = 51.06m,
        High = 51.06m,
        Low = 49.5m,
        Close = 49.89m,
        Volume = 5856650
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/26"),
        Open = 49.85m,
        High = 49.98m,
        Low = 48m,
        Close = 48.29m,
        Volume = 7428684
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/27"),
        Open = 48.3m,
        High = 48.53m,
        Low = 47.55m,
        Close = 47.75m,
        Volume = 7044833
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/28"),
        Open = 47.72m,
        High = 47.8m,
        Low = 47.18m,
        Close = 47.22m,
        Volume = 6909973
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/29"),
        Open = 48.31m,
        High = 49.13m,
        Low = 47.81m,
        Close = 48.81m,
        Volume = 8299363
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/30"),
        Open = 48.7m,
        High = 48.81m,
        Low = 47.66m,
        Close = 47.8m,
        Volume = 8702778
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/02"),
        Open = 47.82m,
        High = 48.41m,
        Low = 47.33m,
        Close = 48.27m,
        Volume = 5932576
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/03"),
        Open = 48.17m,
        High = 48.35m,
        Low = 47.46m,
        Close = 48.1m,
        Volume = 4900945
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/04"),
        Open = 48.28m,
        High = 48.9m,
        Low = 47.8m,
        Close = 48.07m,
        Volume = 5081941
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/05"),
        Open = 48.49m,
        High = 49.86m,
        Low = 48.32m,
        Close = 49.77m,
        Volume = 4915994
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/06"),
        Open = 49.71m,
        High = 49.98m,
        Low = 49.31m,
        Close = 49.68m,
        Volume = 3212559
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/09"),
        Open = 50.01m,
        High = 51.48m,
        Low = 49.89m,
        Close = 51.35m,
        Volume = 4444626
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/10"),
        Open = 51.07m,
        High = 51.07m,
        Low = 50.13m,
        Close = 50.32m,
        Volume = 4736870
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/11"),
        Open = 50.78m,
        High = 51.42m,
        Low = 50.54m,
        Close = 50.68m,
        Volume = 3546240
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/12"),
        Open = 50.62m,
        High = 50.92m,
        Low = 50.09m,
        Close = 50.28m,
        Volume = 3324346
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/13"),
        Open = 49.98m,
        High = 50.94m,
        Low = 49.72m,
        Close = 50.68m,
        Volume = 3546788
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/16"),
        Open = 51m,
        High = 52.52m,
        Low = 50.88m,
        Close = 52.48m,
        Volume = 5704942
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/17"),
        Open = 52.42m,
        High = 52.69m,
        Low = 51.7m,
        Close = 52.53m,
        Volume = 3945816
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/18"),
        Open = 52.59m,
        High = 52.64m,
        Low = 51.45m,
        Close = 52.02m,
        Volume = 4377563
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/19"),
        Open = 51.54m,
        High = 51.8m,
        Low = 50.75m,
        Close = 51.43m,
        Volume = 3183390
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/20"),
        Open = 51.12m,
        High = 51.89m,
        Low = 51.07m,
        Close = 51.7m,
        Volume = 4697176
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/23"),
        Open = 52.5m,
        High = 53m,
        Low = 52.32m,
        Close = 52.63m,
        Volume = 3255277
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/24"),
        Open = 52.08m,
        High = 52.63m,
        Low = 50.95m,
        Close = 51.97m,
        Volume = 3288144
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/25"),
        Open = 51.97m,
        High = 52.95m,
        Low = 51.83m,
        Close = 52.93m,
        Volume = 3021455
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/26"),
        Open = 52.93m,
        High = 52.93m,
        Low = 52.93m,
        Close = 52.93m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/27"),
        Open = 51.35m,
        High = 52.81m,
        Low = 51m,
        Close = 52.45m,
        Volume = 3281352
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/30"),
        Open = 52.43m,
        High = 52.69m,
        Low = 51.78m,
        Close = 52.41m,
        Volume = 5434683
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/01"),
        Open = 52.75m,
        High = 54.22m,
        Low = 52.75m,
        Close = 53.72m,
        Volume = 6360088
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/02"),
        Open = 54.04m,
        High = 54.57m,
        Low = 53.26m,
        Close = 53.78m,
        Volume = 5980717
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/03"),
        Open = 53.99m,
        High = 54.41m,
        Low = 53.51m,
        Close = 53.77m,
        Volume = 3997708
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/04"),
        Open = 54.75m,
        High = 55.45m,
        Low = 53.62m,
        Close = 54.68m,
        Volume = 5451771
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/07"),
        Open = 55.2m,
        High = 55.95m,
        Low = 54.9m,
        Close = 55.82m,
        Volume = 4950745
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/08"),
        Open = 55.99m,
        High = 56.22m,
        Low = 55.06m,
        Close = 55.66m,
        Volume = 4658965
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/09"),
        Open = 55.75m,
        High = 55.8m,
        Low = 55.11m,
        Close = 55.47m,
        Volume = 3900359
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/10"),
        Open = 55.65m,
        High = 56.39m,
        Low = 54.72m,
        Close = 55.01m,
        Volume = 5755566
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/11"),
        Open = 55.47m,
        High = 55.8m,
        Low = 55.12m,
        Close = 55.6m,
        Volume = 7398009
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/14"),
        Open = 56.02m,
        High = 56.56m,
        Low = 55.82m,
        Close = 56.05m,
        Volume = 4830871
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/15"),
        Open = 56.37m,
        High = 56.37m,
        Low = 55.33m,
        Close = 55.67m,
        Volume = 7365555
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/16"),
        Open = 56.11m,
        High = 56.14m,
        Low = 54.45m,
        Close = 55.13m,
        Volume = 7804646
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/17"),
        Open = 54.9m,
        High = 55.4m,
        Low = 54.41m,
        Close = 54.47m,
        Volume = 5825441
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/18"),
        Open = 54.7m,
        High = 54.74m,
        Low = 53.1m,
        Close = 53.44m,
        Volume = 8922372
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/21"),
        Open = 53.36m,
        High = 54.5m,
        Low = 53.36m,
        Close = 54.3m,
        Volume = 3655720
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/22"),
        Open = 54.38m,
        High = 55.37m,
        Low = 54.31m,
        Close = 55.1m,
        Volume = 3669971
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/23"),
        Open = 55.41m,
        High = 55.65m,
        Low = 54.92m,
        Close = 54.96m,
        Volume = 3062835
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/24"),
        Open = 55.26m,
        High = 55.56m,
        Low = 55.11m,
        Close = 55.48m,
        Volume = 1003991
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/25"),
        Open = 55.48m,
        High = 55.48m,
        Low = 55.48m,
        Close = 55.48m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/28"),
        Open = 55.33m,
        High = 55.55m,
        Low = 54.89m,
        Close = 55.14m,
        Volume = 2072154
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/29"),
        Open = 55.34m,
        High = 55.46m,
        Low = 55.14m,
        Close = 55.21m,
        Volume = 2163935
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/30"),
        Open = 54.86m,
        High = 55.29m,
        Low = 54.75m,
        Close = 54.96m,
        Volume = 2460937
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/31"),
        Open = 54.13m,
        High = 54.13m,
        Low = 54.13m,
        Close = 54.13m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/01"),
        Open = 54.13m,
        High = 54.13m,
        Low = 54.13m,
        Close = 54.13m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/04"),
        Open = 55.72m,
        High = 56.39m,
        Low = 54.8m,
        Close = 56.18m,
        Volume = 6187088
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/05"),
        Open = 56.25m,
        High = 58.28m,
        Low = 56m,
        Close = 58.02m,
        Volume = 8872728
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/06"),
        Open = 58.23m,
        High = 59.99m,
        Low = 57.88m,
        Close = 59.78m,
        Volume = 8838016
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/07"),
        Open = 59.51m,
        High = 62.31m,
        Low = 59.02m,
        Close = 62.2m,
        Volume = 14380744
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/08"),
        Open = 61.54m,
        High = 61.78m,
        Low = 60.86m,
        Close = 61.6m,
        Volume = 7147427
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/11"),
        Open = 61.95m,
        High = 62.09m,
        Low = 60.51m,
        Close = 60.87m,
        Volume = 5627699
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/12"),
        Open = 60.07m,
        High = 61.2m,
        Low = 59.91m,
        Close = 60.43m,
        Volume = 5273875
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/13"),
        Open = 60.61m,
        High = 61.7m,
        Low = 60.35m,
        Close = 61.16m,
        Volume = 4950400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/14"),
        Open = 61.03m,
        High = 61.62m,
        Low = 60.78m,
        Close = 61.56m,
        Volume = 3000398
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/15"),
        Open = 60.82m,
        High = 60.82m,
        Low = 60.82m,
        Close = 60.82m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/18"),
        Open = 60.82m,
        High = 60.82m,
        Low = 60.82m,
        Close = 60.82m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/19"),
        Open = 60.6m,
        High = 61.01m,
        Low = 59.96m,
        Close = 60.65m,
        Volume = 5428029
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/20"),
        Open = 60.33m,
        High = 60.57m,
        Low = 58.53m,
        Close = 60.2m,
        Volume = 5374069
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/21"),
        Open = 60.3m,
        High = 61.26m,
        Low = 58.9m,
        Close = 59.2m,
        Volume = 5401938
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/22"),
        Open = 58.62m,
        High = 59.17m,
        Low = 57.7m,
        Close = 57.77m,
        Volume = 4745396
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/25"),
        Open = 58.35m,
        High = 58.75m,
        Low = 57.5m,
        Close = 57.78m,
        Volume = 3489914
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/26"),
        Open = 57.54m,
        High = 58.5m,
        Low = 57.23m,
        Close = 57.71m,
        Volume = 4552136
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/27"),
        Open = 58.84m,
        High = 62.08m,
        Low = 58.83m,
        Close = 61.93m,
        Volume = 14760056
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/28"),
        Open = 62.15m,
        High = 62.95m,
        Low = 61.31m,
        Close = 62.56m,
        Volume = 8865642
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/29"),
        Open = 62.8m,
        High = 63.4m,
        Low = 60.32m,
        Close = 60.6m,
        Volume = 8726177
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/01"),
        Open = 60.74m,
        High = 61.86m,
        Low = 60.72m,
        Close = 61.7m,
        Volume = 5929599
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/02"),
        Open = 61.29m,
        High = 62m,
        Low = 61m,
        Close = 61.94m,
        Volume = 7862734
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/03"),
        Open = 61.52m,
        High = 61.8m,
        Low = 60.85m,
        Close = 61.46m,
        Volume = 5480578
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/04"),
        Open = 60.95m,
        High = 61.17m,
        Low = 59.25m,
        Close = 59.32m,
        Volume = 7491344
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/05"),
        Open = 59.21m,
        High = 59.74m,
        Low = 57.14m,
        Close = 58.4m,
        Volume = 9676128
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/08"),
        Open = 58.33m,
        High = 58.97m,
        Low = 57.78m,
        Close = 57.89m,
        Volume = 4724664
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/09"),
        Open = 58.62m,
        High = 60.43m,
        Low = 58.39m,
        Close = 59.74m,
        Volume = 8250844
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/10"),
        Open = 59.71m,
        High = 60.05m,
        Low = 58.94m,
        Close = 59.54m,
        Volume = 4237165
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/11"),
        Open = 59.75m,
        High = 60.75m,
        Low = 58.94m,
        Close = 60.59m,
        Volume = 4395736
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/12"),
        Open = 59.65m,
        High = 59.65m,
        Low = 59.65m,
        Close = 59.65m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/15"),
        Open = 59.65m,
        High = 59.65m,
        Low = 59.65m,
        Close = 59.65m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/16"),
        Open = 60.42m,
        High = 61.29m,
        Low = 59.9m,
        Close = 61.26m,
        Volume = 4268659
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/17"),
        Open = 61.39m,
        High = 62m,
        Low = 61m,
        Close = 61.82m,
        Volume = 4116171
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/18"),
        Open = 61.78m,
        High = 63.01m,
        Low = 61.72m,
        Close = 62.89m,
        Volume = 4391778
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/19"),
        Open = 62.65m,
        High = 64.34m,
        Low = 62.65m,
        Close = 63.59m,
        Volume = 7371049
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/22"),
        Open = 63.58m,
        High = 64.47m,
        Low = 63.19m,
        Close = 63.97m,
        Volume = 6034004
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/23"),
        Open = 63.81m,
        High = 64.17m,
        Low = 62.25m,
        Close = 62.77m,
        Volume = 6484460
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/24"),
        Open = 63m,
        High = 63.7m,
        Low = 62.64m,
        Close = 63.48m,
        Volume = 3400361
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/25"),
        Open = 62.72m,
        High = 62.97m,
        Low = 62m,
        Close = 62.87m,
        Volume = 5043170
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/26"),
        Open = 63.09m,
        High = 63.88m,
        Low = 63.03m,
        Close = 63.16m,
        Volume = 4415909
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/01"),
        Open = 63.05m,
        High = 64.33m,
        Low = 63m,
        Close = 64m,
        Volume = 5265630
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/02"),
        Open = 64.64m,
        High = 65.33m,
        Low = 64.36m,
        Close = 64.44m,
        Volume = 4383103
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/03"),
        Open = 64.58m,
        High = 64.97m,
        Low = 64.05m,
        Close = 64.45m,
        Volume = 4289350
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/04"),
        Open = 65.09m,
        High = 65.8m,
        Low = 64.85m,
        Close = 65.55m,
        Volume = 7718659
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/05"),
        Open = 66.06m,
        High = 68.04m,
        Low = 66.03m,
        Close = 67.93m,
        Volume = 8506441
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/08"),
        Open = 68.01m,
        High = 68.01m,
        Low = 67.13m,
        Close = 67.24m,
        Volume = 5077225
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/09"),
        Open = 67.57m,
        High = 68.34m,
        Low = 67.35m,
        Close = 67.79m,
        Volume = 7655839
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/10"),
        Open = 68.14m,
        High = 70.48m,
        Low = 68.03m,
        Close = 70.01m,
        Volume = 10616531
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/11"),
        Open = 70.08m,
        High = 70.43m,
        Low = 69.15m,
        Close = 70.07m,
        Volume = 7293133
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/12"),
        Open = 70.48m,
        High = 70.49m,
        Low = 69.25m,
        Close = 69.83m,
        Volume = 5302767
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/15"),
        Open = 69.37m,
        High = 69.77m,
        Low = 68.52m,
        Close = 69.4m,
        Volume = 7709023
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/16"),
        Open = 69.24m,
        High = 69.31m,
        Low = 68.3m,
        Close = 68.72m,
        Volume = 7495575
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/17"),
        Open = 68.97m,
        High = 69.49m,
        Low = 68.29m,
        Close = 69.38m,
        Volume = 6004213
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/18"),
        Open = 69.35m,
        High = 70.93m,
        Low = 69.19m,
        Close = 70.87m,
        Volume = 7435774
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/19"),
        Open = 73.2m,
        High = 73.3m,
        Low = 70.72m,
        Close = 70.72m,
        Volume = 17722432
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/22"),
        Open = 71.66m,
        High = 72.64m,
        Low = 71.51m,
        Close = 71.91m,
        Volume = 9014855
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/23"),
        Open = 72.54m,
        High = 72.63m,
        Low = 71.51m,
        Close = 72.18m,
        Volume = 4986322
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/24"),
        Open = 72.42m,
        High = 73.2m,
        Low = 71.78m,
        Close = 72.32m,
        Volume = 7699920
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/25"),
        Open = 72.95m,
        High = 73.43m,
        Low = 72m,
        Close = 72.49m,
        Volume = 5431155
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/26"),
        Open = 72.66m,
        High = 72.99m,
        Low = 72.35m,
        Close = 72.59m,
        Volume = 4933688
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/29"),
        Open = 73.08m,
        High = 74.53m,
        Low = 73m,
        Close = 74.11m,
        Volume = 9064111
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/30"),
        Open = 73.84m,
        High = 74.18m,
        Low = 72.7m,
        Close = 73.53m,
        Volume = 4381292
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/31"),
        Open = 72.92m,
        High = 73.06m,
        Low = 71.95m,
        Close = 72.61m,
        Volume = 5884899
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/01"),
        Open = 72.99m,
        High = 72.99m,
        Low = 72.99m,
        Close = 72.99m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/02"),
        Open = 72.99m,
        High = 72.99m,
        Low = 72.99m,
        Close = 72.99m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/05"),
        Open = 72.99m,
        High = 73.05m,
        Low = 70.95m,
        Close = 72.04m,
        Volume = 9326414
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/06"),
        Open = 71.84m,
        High = 73.18m,
        Low = 71.77m,
        Close = 72.36m,
        Volume = 5194801
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/07"),
        Open = 72.16m,
        High = 72.52m,
        Low = 71.47m,
        Close = 72.1m,
        Volume = 6717177
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/08"),
        Open = 71.89m,
        High = 72.46m,
        Low = 71.21m,
        Close = 72.28m,
        Volume = 3743018
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/09"),
        Open = 72.26m,
        High = 72.66m,
        Low = 71.81m,
        Close = 72.42m,
        Volume = 3345780
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/12"),
        Open = 72.15m,
        High = 72.57m,
        Low = 71.8m,
        Close = 71.92m,
        Volume = 3666172
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/13"),
        Open = 71.54m,
        High = 71.69m,
        Low = 70.5m,
        Close = 71.19m,
        Volume = 5079284
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/14"),
        Open = 70.83m,
        High = 71.76m,
        Low = 70.81m,
        Close = 71.7m,
        Volume = 3496649
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/15"),
        Open = 71.34m,
        High = 72.61m,
        Low = 71.34m,
        Close = 72.09m,
        Volume = 2943682
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/16"),
        Open = 72.1m,
        High = 72.1m,
        Low = 69.88m,
        Close = 70.79m,
        Volume = 8075323
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/19"),
        Open = 70.27m,
        High = 71.28m,
        Low = 70.16m,
        Close = 70.96m,
        Volume = 4203068
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/20"),
        Open = 71.54m,
        High = 71.98m,
        Low = 70.95m,
        Close = 71.41m,
        Volume = 4760806
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/21"),
        Open = 71.51m,
        High = 74.65m,
        Low = 71.51m,
        Close = 74.16m,
        Volume = 12037705
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/22"),
        Open = 74.46m,
        High = 76m,
        Low = 73.68m,
        Close = 75.59m,
        Volume = 9088834
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/23"),
        Open = 75.04m,
        High = 75.68m,
        Low = 74.55m,
        Close = 75.13m,
        Volume = 5198190
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/26"),
        Open = 74.58m,
        High = 75.29m,
        Low = 74.14m,
        Close = 74.34m,
        Volume = 4024935
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/27"),
        Open = 74.65m,
        High = 74.93m,
        Low = 72.23m,
        Close = 72.48m,
        Volume = 6054842
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/28"),
        Open = 72.95m,
        High = 72.99m,
        Low = 71.34m,
        Close = 72.37m,
        Volume = 5699477
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/29"),
        Open = 73m,
        High = 74m,
        Low = 72.67m,
        Close = 73.79m,
        Volume = 5203310
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/30"),
        Open = 73.8m,
        High = 74.48m,
        Low = 72.26m,
        Close = 72.43m,
        Volume = 5601081
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/03"),
        Open = 72.62m,
        High = 74.7m,
        Low = 72.46m,
        Close = 74.39m,
        Volume = 5407779
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/04"),
        Open = 73.31m,
        High = 73.45m,
        Low = 72.23m,
        Close = 72.79m,
        Volume = 6230700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/05"),
        Open = 71.9m,
        High = 72.04m,
        Low = 70.44m,
        Close = 71m,
        Volume = 5509124
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/06"),
        Open = 70.66m,
        High = 71.49m,
        Low = 62m,
        Close = 67.97m,
        Volume = 13771537
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/07"),
        Open = 68.29m,
        High = 69.12m,
        Low = 65.8m,
        Close = 66.72m,
        Volume = 8927346
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/10"),
        Open = 69.96m,
        High = 71.73m,
        Low = 69.8m,
        Close = 71m,
        Volume = 8841884
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/11"),
        Open = 70.31m,
        High = 72.67m,
        Low = 70.14m,
        Close = 71.42m,
        Volume = 6551880
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/12"),
        Open = 72.04m,
        High = 73.37m,
        Low = 72.04m,
        Close = 72.87m,
        Volume = 6331552
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/13"),
        Open = 72.66m,
        High = 73.3m,
        Low = 71.56m,
        Close = 71.76m,
        Volume = 3953696
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/14"),
        Open = 71.08m,
        High = 71.4m,
        Low = 68.98m,
        Close = 69.82m,
        Volume = 7954557
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/17"),
        Open = 70.36m,
        High = 70.37m,
        Low = 67.62m,
        Close = 69.68m,
        Volume = 4814936
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/18"),
        Open = 69.89m,
        High = 70.13m,
        Low = 67.3m,
        Close = 67.72m,
        Volume = 8882829
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/19"),
        Open = 66.85m,
        High = 67.55m,
        Low = 65.28m,
        Close = 66.21m,
        Volume = 9974312
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/20"),
        Open = 65m,
        High = 65.11m,
        Low = 62.8m,
        Close = 63m,
        Volume = 10904161
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/21"),
        Open = 61.99m,
        High = 65m,
        Low = 61.39m,
        Close = 64.56m,
        Volume = 10882625
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/24"),
        Open = 63.66m,
        High = 64.61m,
        Low = 63.06m,
        Close = 63.15m,
        Volume = 6168825
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/25"),
        Open = 61m,
        High = 62.98m,
        Low = 60.61m,
        Close = 62.78m,
        Volume = 6903135
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/26"),
        Open = 63.6m,
        High = 65.41m,
        Low = 63m,
        Close = 63.26m,
        Volume = 7386008
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/27"),
        Open = 64.86m,
        High = 65.23m,
        Low = 63.91m,
        Close = 65.13m,
        Volume = 7444591
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/28"),
        Open = 64.18m,
        High = 64.18m,
        Low = 64.18m,
        Close = 64.18m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/31"),
        Open = 64.18m,
        High = 64.18m,
        Low = 64.18m,
        Close = 64.18m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/01"),
        Open = 64.27m,
        High = 65.2m,
        Low = 62.86m,
        Close = 62.95m,
        Volume = 6318443
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/02"),
        Open = 63.39m,
        High = 64.37m,
        Low = 62.06m,
        Close = 64.34m,
        Volume = 4588144
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/03"),
        Open = 64.84m,
        High = 64.84m,
        Low = 63.51m,
        Close = 64.31m,
        Volume = 3775793
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/04"),
        Open = 63.25m,
        High = 63.41m,
        Low = 60.93m,
        Close = 61.15m,
        Volume = 8228715
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/07"),
        Open = 61.69m,
        High = 61.7m,
        Low = 60.07m,
        Close = 60.11m,
        Volume = 5918574
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/08"),
        Open = 60.33m,
        High = 61.1m,
        Low = 59.84m,
        Close = 61.02m,
        Volume = 7192623
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/09"),
        Open = 61.48m,
        High = 63.18m,
        Low = 61.17m,
        Close = 61.71m,
        Volume = 7729414
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/10"),
        Open = 62.81m,
        High = 64.01m,
        Low = 62.3m,
        Close = 63.89m,
        Volume = 5682835
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/11"),
        Open = 63.16m,
        High = 65.7m,
        Low = 63.15m,
        Close = 65.38m,
        Volume = 8462575
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/14"),
        Open = 66.22m,
        High = 66.55m,
        Low = 64.71m,
        Close = 64.82m,
        Volume = 6000064
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/15"),
        Open = 65.67m,
        High = 67.57m,
        Low = 65.47m,
        Close = 67.48m,
        Volume = 6400775
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/16"),
        Open = 66.93m,
        High = 67.56m,
        Low = 66.6m,
        Close = 67.03m,
        Volume = 4452275
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/17"),
        Open = 67.48m,
        High = 67.49m,
        Low = 65.88m,
        Close = 67.26m,
        Volume = 3637256
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/18"),
        Open = 67.38m,
        High = 68.14m,
        Low = 67.16m,
        Close = 67.96m,
        Volume = 6216603
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/21"),
        Open = 68.95m,
        High = 69.34m,
        Low = 67.57m,
        Close = 67.97m,
        Volume = 4109588
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/22"),
        Open = 67.97m,
        High = 68.47m,
        Low = 66.15m,
        Close = 66.28m,
        Volume = 4188173
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/23"),
        Open = 66.42m,
        High = 67.88m,
        Low = 65.65m,
        Close = 67.45m,
        Volume = 6098515
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/24"),
        Open = 67.17m,
        High = 68.24m,
        Low = 67.14m,
        Close = 67.43m,
        Volume = 7782533
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/25"),
        Open = 67.31m,
        High = 68.77m,
        Low = 66.67m,
        Close = 68.77m,
        Volume = 13325760
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/28"),
        Open = 68.43m,
        High = 68.62m,
        Low = 67.26m,
        Close = 67.3m,
        Volume = 5517259
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/29"),
        Open = 66.11m,
        High = 66.2m,
        Low = 62.56m,
        Close = 63.04m,
        Volume = 9212875
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/30"),
        Open = 63.05m,
        High = 64.21m,
        Low = 62.58m,
        Close = 62.75m,
        Volume = 7102383
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/01"),
        Open = 62.48m,
        High = 62.72m,
        Low = 61.31m,
        Close = 62.26m,
        Volume = 6465874
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/02"),
        Open = 61.94m,
        High = 61.94m,
        Low = 61.94m,
        Close = 61.94m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/05"),
        Open = 61.94m,
        High = 61.94m,
        Low = 61.94m,
        Close = 61.94m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/06"),
        Open = 62.71m,
        High = 63.02m,
        Low = 60.65m,
        Close = 61.36m,
        Volume = 5444212
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/07"),
        Open = 61.48m,
        High = 63.37m,
        Low = 61.03m,
        Close = 63.3m,
        Volume = 4785046
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/08"),
        Open = 64.09m,
        High = 64.89m,
        Low = 63.55m,
        Close = 64.73m,
        Volume = 4489385
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/09"),
        Open = 65.2m,
        High = 65.2m,
        Low = 64.01m,
        Close = 64.66m,
        Volume = 3145076
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/12"),
        Open = 64.55m,
        High = 64.98m,
        Low = 64.01m,
        Close = 64.34m,
        Volume = 2299533
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/13"),
        Open = 65.15m,
        High = 65.36m,
        Low = 64.18m,
        Close = 64.43m,
        Volume = 6208260
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/14"),
        Open = 64.29m,
        High = 65.39m,
        Low = 64.05m,
        Close = 64.75m,
        Volume = 3822487
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/15"),
        Open = 65.65m,
        High = 65.78m,
        Low = 63.36m,
        Close = 64.37m,
        Volume = 8069172
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/16"),
        Open = 63.96m,
        High = 64.26m,
        Low = 61.68m,
        Close = 61.9m,
        Volume = 7016315
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/19"),
        Open = 62.72m,
        High = 63.36m,
        Low = 62.04m,
        Close = 63.18m,
        Volume = 5031493
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/20"),
        Open = 62.26m,
        High = 64m,
        Low = 61.83m,
        Close = 63.88m,
        Volume = 5069055
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/21"),
        Open = 64.4m,
        High = 64.81m,
        Low = 62.66m,
        Close = 63.18m,
        Volume = 4459407
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/22"),
        Open = 64.02m,
        High = 67.11m,
        Low = 64.02m,
        Close = 66.6m,
        Volume = 7574451
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/23"),
        Open = 66.49m,
        High = 68.17m,
        Low = 66.36m,
        Close = 67.93m,
        Volume = 5029708
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/26"),
        Open = 68.15m,
        High = 68.99m,
        Low = 68m,
        Close = 68.85m,
        Volume = 5836465
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/27"),
        Open = 69.25m,
        High = 69.75m,
        Low = 68.4m,
        Close = 68.62m,
        Volume = 5687098
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/28"),
        Open = 67.62m,
        High = 68m,
        Low = 66.9m,
        Close = 67.32m,
        Volume = 5540629
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/29"),
        Open = 67.85m,
        High = 68.53m,
        Low = 66.69m,
        Close = 67.22m,
        Volume = 4460227
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/30"),
        Open = 66.61m,
        High = 68.38m,
        Low = 66.47m,
        Close = 68.14m,
        Volume = 6032163
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/02"),
        Open = 69.01m,
        High = 69.93m,
        Low = 68.5m,
        Close = 69.69m,
        Volume = 5430717
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/03"),
        Open = 69.31m,
        High = 70m,
        Low = 68.93m,
        Close = 69.54m,
        Volume = 3778718
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/04"),
        Open = 69.42m,
        High = 69.93m,
        Low = 69.16m,
        Close = 69.25m,
        Volume = 3861191
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/05"),
        Open = 68.73m,
        High = 69.25m,
        Low = 68.33m,
        Close = 68.71m,
        Volume = 4318815
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/06"),
        Open = 68.03m,
        High = 68.72m,
        Low = 67.36m,
        Close = 68.7m,
        Volume = 4498788
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/09"),
        Open = 69.17m,
        High = 69.47m,
        Low = 68.45m,
        Close = 68.99m,
        Volume = 2907790
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/10"),
        Open = 68.29m,
        High = 68.97m,
        Low = 67.54m,
        Close = 68.62m,
        Volume = 4127296
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/11"),
        Open = 67.18m,
        High = 67.26m,
        Low = 64.92m,
        Close = 65.6m,
        Volume = 5230837
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/12"),
        Open = 64.65m,
        High = 65.27m,
        Low = 64.44m,
        Close = 64.7m,
        Volume = 3847607
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/13"),
        Open = 64.59m,
        High = 65.7m,
        Low = 64.54m,
        Close = 64.84m,
        Volume = 3667747
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/16"),
        Open = 64.27m,
        High = 64.93m,
        Low = 63.65m,
        Close = 64.4m,
        Volume = 3042334
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/17"),
        Open = 65.16m,
        High = 66.91m,
        Low = 64.65m,
        Close = 65.99m,
        Volume = 4303899
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/18"),
        Open = 66.05m,
        High = 66.36m,
        Low = 64.99m,
        Close = 66m,
        Volume = 2816059
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/19"),
        Open = 65.74m,
        High = 65.82m,
        Low = 64.15m,
        Close = 64.62m,
        Volume = 4201568
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/20"),
        Open = 64.2m,
        High = 64.73m,
        Low = 63.59m,
        Close = 64.6m,
        Volume = 3865920
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/23"),
        Open = 65.09m,
        High = 65.24m,
        Low = 63.21m,
        Close = 63.3m,
        Volume = 3888194
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/24"),
        Open = 62.55m,
        High = 62.81m,
        Low = 60.53m,
        Close = 60.93m,
        Volume = 9983972
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/25"),
        Open = 60.49m,
        High = 61.11m,
        Low = 59.48m,
        Close = 60.76m,
        Volume = 5144544
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/26"),
        Open = 61.36m,
        High = 62.56m,
        Low = 61.07m,
        Close = 61.32m,
        Volume = 4889769
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/27"),
        Open = 61.13m,
        High = 63.34m,
        Low = 60.57m,
        Close = 63.16m,
        Volume = 6851673
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/30"),
        Open = 63m,
        High = 63.19m,
        Low = 62.1m,
        Close = 62.1m,
        Volume = 3279135
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/31"),
        Open = 62m,
        High = 62.18m,
        Low = 60.8m,
        Close = 61.13m,
        Volume = 5309421
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/01"),
        Open = 61.79m,
        High = 63.09m,
        Low = 61.66m,
        Close = 62.29m,
        Volume = 5688798
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/02"),
        Open = 62.34m,
        High = 63.39m,
        Low = 62.2m,
        Close = 63.39m,
        Volume = 3465719
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/03"),
        Open = 64.64m,
        High = 64.64m,
        Low = 64.64m,
        Close = 64.64m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/06"),
        Open = 64.64m,
        High = 64.64m,
        Low = 64.64m,
        Close = 64.64m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/07"),
        Open = 64.25m,
        High = 64.25m,
        Low = 63.29m,
        Close = 63.42m,
        Volume = 2529793
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/08"),
        Open = 63.6m,
        High = 65m,
        Low = 63.58m,
        Close = 64.5m,
        Volume = 3747703
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/09"),
        Open = 65.51m,
        High = 65.63m,
        Low = 62.95m,
        Close = 63.44m,
        Volume = 4190696
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/10"),
        Open = 63.38m,
        High = 64.1m,
        Low = 62.96m,
        Close = 63.84m,
        Volume = 3214772
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/13"),
        Open = 64.73m,
        High = 64.98m,
        Low = 63.92m,
        Close = 64.19m,
        Volume = 3126886
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/14"),
        Open = 64.02m,
        High = 64.35m,
        Low = 62.43m,
        Close = 62.76m,
        Volume = 6025475
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/15"),
        Open = 62.49m,
        High = 62.79m,
        Low = 61.89m,
        Close = 62.73m,
        Volume = 4929167
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/16"),
        Open = 62.39m,
        High = 63.35m,
        Low = 62.2m,
        Close = 62.58m,
        Volume = 4681838
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/17"),
        Open = 63.26m,
        High = 63.34m,
        Low = 62m,
        Close = 62.95m,
        Volume = 10702625
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/20"),
        Open = 62.99m,
        High = 63.9m,
        Low = 62.53m,
        Close = 63.72m,
        Volume = 4187283
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/21"),
        Open = 63.8m,
        High = 64.5m,
        Low = 63.39m,
        Close = 64.23m,
        Volume = 5361146
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/22"),
        Open = 64.38m,
        High = 64.86m,
        Low = 63.63m,
        Close = 63.9m,
        Volume = 3635438
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/23"),
        Open = 63.31m,
        High = 63.49m,
        Low = 62.56m,
        Close = 62.65m,
        Volume = 3656936
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/24"),
        Open = 63.52m,
        High = 64.83m,
        Low = 63.33m,
        Close = 64.6m,
        Volume = 4626836
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/27"),
        Open = 64.61m,
        High = 64.7m,
        Low = 63.8m,
        Close = 63.89m,
        Volume = 2762402
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/28"),
        Open = 63.85m,
        High = 64.67m,
        Low = 62.94m,
        Close = 64.52m,
        Volume = 3583321
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/29"),
        Open = 64.71m,
        High = 66.26m,
        Low = 64.44m,
        Close = 65.97m,
        Volume = 5874689
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/30"),
        Open = 67.09m,
        High = 67.97m,
        Low = 66.05m,
        Close = 66.54m,
        Volume = 8214220
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/01"),
        Open = 67.54m,
        High = 67.98m,
        Low = 66.67m,
        Close = 66.83m,
        Volume = 4489476
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/04"),
        Open = 66.57m,
        High = 67.89m,
        Low = 65.86m,
        Close = 66.33m,
        Volume = 4073665
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/05"),
        Open = 67.02m,
        High = 68.98m,
        Low = 67.02m,
        Close = 68.6m,
        Volume = 7517772
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/06"),
        Open = 68.61m,
        High = 69.39m,
        Low = 68.41m,
        Close = 68.58m,
        Volume = 4719126
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/07"),
        Open = 68.97m,
        High = 69.14m,
        Low = 67.8m,
        Close = 68.46m,
        Volume = 5506142
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/08"),
        Open = 68.47m,
        High = 69.71m,
        Low = 68.15m,
        Close = 69.23m,
        Volume = 3335682
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/11"),
        Open = 69.51m,
        High = 70.25m,
        Low = 69.23m,
        Close = 69.99m,
        Volume = 3469356
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/12"),
        Open = 70.16m,
        High = 70.6m,
        Low = 68.91m,
        Close = 70.22m,
        Volume = 4381517
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/13"),
        Open = 70.73m,
        High = 72.17m,
        Low = 70.66m,
        Close = 71.47m,
        Volume = 6038876
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/14"),
        Open = 71.73m,
        High = 72m,
        Low = 70.85m,
        Close = 71.36m,
        Volume = 3841826
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/15"),
        Open = 71.85m,
        High = 71.9m,
        Low = 70.05m,
        Close = 70.11m,
        Volume = 5641988
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/18"),
        Open = 70.19m,
        High = 71.05m,
        Low = 70.03m,
        Close = 70.23m,
        Volume = 4832596
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/19"),
        Open = 69.57m,
        High = 69.96m,
        Low = 68.35m,
        Close = 69.05m,
        Volume = 4493842
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/20"),
        Open = 70m,
        High = 71.94m,
        Low = 69.57m,
        Close = 71.36m,
        Volume = 8067660
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/21"),
        Open = 71.61m,
        High = 71.88m,
        Low = 70.57m,
        Close = 71.5m,
        Volume = 4630931
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/22"),
        Open = 71.38m,
        High = 71.63m,
        Low = 70.61m,
        Close = 71.26m,
        Volume = 3062553
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/25"),
        Open = 71.68m,
        High = 72.49m,
        Low = 71.47m,
        Close = 71.66m,
        Volume = 4802975
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/26"),
        Open = 71.1m,
        High = 71.65m,
        Low = 70.73m,
        Close = 71.3m,
        Volume = 3547112
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/27"),
        Open = 70.87m,
        High = 71.11m,
        Low = 69.71m,
        Close = 70.86m,
        Volume = 3818178
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/28"),
        Open = 71.3m,
        High = 71.79m,
        Low = 70.35m,
        Close = 71.27m,
        Volume = 4128092
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/29"),
        Open = 71.15m,
        High = 71.46m,
        Low = 70.36m,
        Close = 70.64m,
        Volume = 3202225
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/01"),
        Open = 70.71m,
        High = 71.89m,
        Low = 69.91m,
        Close = 70.48m,
        Volume = 3324632
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/02"),
        Open = 70.85m,
        High = 70.98m,
        Low = 68.8m,
        Close = 69.78m,
        Volume = 6340501
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/03"),
        Open = 69.66m,
        High = 69.73m,
        Low = 68.04m,
        Close = 68.94m,
        Volume = 4676861
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/04"),
        Open = 70m,
        High = 71.58m,
        Low = 69.78m,
        Close = 70.85m,
        Volume = 5758303
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/05"),
        Open = 70.85m,
        High = 71.65m,
        Low = 70.5m,
        Close = 71.27m,
        Volume = 3625799
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/08"),
        Open = 70.06m,
        High = 70.41m,
        Low = 69.75m,
        Close = 70.21m,
        Volume = 4171524
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/09"),
        Open = 70.27m,
        High = 70.55m,
        Low = 68.83m,
        Close = 69.25m,
        Volume = 4587423
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/10"),
        Open = 67.69m,
        High = 67.69m,
        Low = 66.79m,
        Close = 67.07m,
        Volume = 10494604
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/11"),
        Open = 66.55m,
        High = 66.7m,
        Low = 65.04m,
        Close = 65.37m,
        Volume = 10033682
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/12"),
        Open = 65.01m,
        High = 65.25m,
        Low = 63.01m,
        Close = 63.09m,
        Volume = 16721476
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/15"),
        Open = 63.35m,
        High = 64.1m,
        Low = 62.62m,
        Close = 63.61m,
        Volume = 10968680
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/16"),
        Open = 63.35m,
        High = 63.35m,
        Low = 61.84m,
        Close = 62.78m,
        Volume = 9636736
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/17"),
        Open = 62.67m,
        High = 63.02m,
        Low = 62.17m,
        Close = 62.5m,
        Volume = 8173227
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/18"),
        Open = 63.35m,
        High = 64.72m,
        Low = 62.72m,
        Close = 64.61m,
        Volume = 11579001
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/19"),
        Open = 64.53m,
        High = 64.74m,
        Low = 63.39m,
        Close = 63.59m,
        Volume = 8824612
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/22"),
        Open = 63.02m,
        High = 64.17m,
        Low = 62.8m,
        Close = 64.03m,
        Volume = 5917125
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/23"),
        Open = 63.43m,
        High = 64.11m,
        Low = 63.1m,
        Close = 63.6m,
        Volume = 6567822
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/24"),
        Open = 65.41m,
        High = 65.41m,
        Low = 65.41m,
        Close = 65.41m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/26"),
        Open = 65.09m,
        High = 65.46m,
        Low = 64.67m,
        Close = 64.8m,
        Volume = 2280773
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/29"),
        Open = 64.33m,
        High = 64.7m,
        Low = 63.44m,
        Close = 64.36m,
        Volume = 4385199
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/30"),
        Open = 63.73m,
        High = 64.21m,
        Low = 63.47m,
        Close = 63.77m,
        Volume = 5819079
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/01"),
        Open = 64.66m,
        High = 65.79m,
        Low = 64.52m,
        Close = 65.72m,
        Volume = 7515183
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/02"),
        Open = 65.62m,
        High = 66.8m,
        Low = 65.55m,
        Close = 66.59m,
        Volume = 4768256
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/03"),
        Open = 66.58m,
        High = 66.68m,
        Low = 65.95m,
        Close = 66.54m,
        Volume = 3357522
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/06"),
        Open = 66.41m,
        High = 66.96m,
        Low = 65.97m,
        Close = 66.59m,
        Volume = 3455003
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/07"),
        Open = 67.04m,
        High = 67.39m,
        Low = 66.01m,
        Close = 66.23m,
        Volume = 4739511
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/08"),
        Open = 66.19m,
        High = 66.56m,
        Low = 64.92m,
        Close = 65.18m,
        Volume = 5230594
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/09"),
        Open = 65.61m,
        High = 65.61m,
        Low = 64.4m,
        Close = 64.61m,
        Volume = 5188492
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/10"),
        Open = 64.63m,
        High = 64.77m,
        Low = 63.96m,
        Close = 64.16m,
        Volume = 5501949
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/13"),
        Open = 64.23m,
        High = 64.38m,
        Low = 63.63m,
        Close = 63.79m,
        Volume = 4823758
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/14"),
        Open = 63.85m,
        High = 65.11m,
        Low = 63.68m,
        Close = 64.49m,
        Volume = 6304424
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/15"),
        Open = 64.29m,
        High = 64.69m,
        Low = 64.09m,
        Close = 64.24m,
        Volume = 3439085
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/16"),
        Open = 64.33m,
        High = 64.85m,
        Low = 63.71m,
        Close = 64.4m,
        Volume = 5169047
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/17"),
        Open = 64.89m,
        High = 65.28m,
        Low = 64.35m,
        Close = 65.03m,
        Volume = 8884612
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/20"),
        Open = 64.74m,
        High = 64.77m,
        Low = 62.82m,
        Close = 63.27m,
        Volume = 9710920
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/21"),
        Open = 63.61m,
        High = 64.35m,
        Low = 63.28m,
        Close = 64.19m,
        Volume = 5092820
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/22"),
        Open = 64.45m,
        High = 65.14m,
        Low = 64.01m,
        Close = 64.61m,
        Volume = 5255958
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/23"),
        Open = 65.06m,
        High = 65.06m,
        Low = 65.06m,
        Close = 65.06m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/27"),
        Open = 64.73m,
        High = 64.91m,
        Low = 64.33m,
        Close = 64.75m,
        Volume = 2549101
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/28"),
        Open = 64.81m,
        High = 65m,
        Low = 64.33m,
        Close = 64.86m,
        Volume = 2643380
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/29"),
        Open = 65m,
        High = 65.2m,
        Low = 64.62m,
        Close = 65.05m,
        Volume = 2505431
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/30"),
        Open = 65.11m,
        High = 65.23m,
        Low = 64.73m,
        Close = 65.01m,
        Volume = 2343020
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/31"),
        Open = 64.9m,
        High = 65.29m,
        Low = 64.62m,
        Close = 65.26m,
        Volume = 2137676
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/03"),
        Open = 66.15m,
        High = 66.68m,
        Low = 66m,
        Close = 66.4m,
        Volume = 8076267
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/04"),
        Open = 66.79m,
        High = 67.61m,
        Low = 66.51m,
        Close = 66.94m,
        Volume = 7979820
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/05"),
        Open = 66.55m,
        High = 67.55m,
        Low = 66.49m,
        Close = 67.48m,
        Volume = 5889933
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/06"),
        Open = 67.46m,
        High = 69.35m,
        Low = 67.46m,
        Close = 68.8m,
        Volume = 7507113
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/07"),
        Open = 69.16m,
        High = 70.1m,
        Low = 68.8m,
        Close = 69.38m,
        Volume = 6804987
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/10"),
        Open = 69.42m,
        High = 69.66m,
        Low = 68.35m,
        Close = 69.09m,
        Volume = 4407094
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/11"),
        Open = 69.47m,
        High = 69.88m,
        Low = 68.67m,
        Close = 68.96m,
        Volume = 4446521
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/12"),
        Open = 69.6m,
        High = 70.49m,
        Low = 69.51m,
        Close = 70.15m,
        Volume = 5936214
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/13"),
        Open = 70.29m,
        High = 70.5m,
        Low = 69.62m,
        Close = 69.83m,
        Volume = 4044835
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/14"),
        Open = 70.07m,
        High = 70.07m,
        Low = 70.07m,
        Close = 70.07m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/18"),
        Open = 70.86m,
        High = 72.57m,
        Low = 70.23m,
        Close = 72.47m,
        Volume = 9631611
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/19"),
        Open = 72.68m,
        High = 72.99m,
        Low = 71.18m,
        Close = 71.73m,
        Volume = 8594621
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/20"),
        Open = 71.35m,
        High = 71.96m,
        Low = 70.36m,
        Close = 71.12m,
        Volume = 6919150
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/21"),
        Open = 71.91m,
        High = 72.22m,
        Low = 71.34m,
        Close = 71.68m,
        Volume = 4448839
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/24"),
        Open = 71.52m,
        High = 72.82m,
        Low = 71.51m,
        Close = 72.73m,
        Volume = 5503636
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/25"),
        Open = 72.49m,
        High = 72.73m,
        Low = 71.31m,
        Close = 72.24m,
        Volume = 5186610
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/26"),
        Open = 69.99m,
        High = 70.48m,
        Low = 69.11m,
        Close = 70.02m,
        Volume = 13110999
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/27"),
        Open = 70.01m,
        High = 71m,
        Low = 70m,
        Close = 70.56m,
        Volume = 5752015
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/28"),
        Open = 70.8m,
        High = 70.95m,
        Low = 69m,
        Close = 69.23m,
        Volume = 5376413
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/31"),
        Open = 69.26m,
        High = 69.96m,
        Low = 69.12m,
        Close = 69.48m,
        Volume = 4559711
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/01"),
        Open = 70m,
        High = 70.5m,
        Low = 69.6m,
        Close = 70.29m,
        Volume = 4781902
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/02"),
        Open = 69.83m,
        High = 71.19m,
        Low = 69.8m,
        Close = 71m,
        Volume = 4254074
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/03"),
        Open = 71m,
        High = 71.38m,
        Low = 70.62m,
        Close = 70.98m,
        Volume = 5093983
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/04"),
        Open = 70.9m,
        High = 71.64m,
        Low = 70.68m,
        Close = 71.38m,
        Volume = 4080392
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/07"),
        Open = 71.43m,
        High = 72.11m,
        Low = 71.15m,
        Close = 71.93m,
        Volume = 4159276
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/08"),
        Open = 72.17m,
        High = 72.82m,
        Low = 72.02m,
        Close = 72.71m,
        Volume = 4089156
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/09"),
        Open = 72.39m,
        High = 72.71m,
        Low = 72m,
        Close = 72.63m,
        Volume = 4566257
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/10"),
        Open = 72.43m,
        High = 72.99m,
        Low = 71.85m,
        Close = 72.66m,
        Volume = 4916926
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/11"),
        Open = 72.24m,
        High = 72.69m,
        Low = 71.92m,
        Close = 72.14m,
        Volume = 4077796
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/14"),
        Open = 72.7m,
        High = 72.7m,
        Low = 71.6m,
        Close = 72.26m,
        Volume = 4092314
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/15"),
        Open = 71.92m,
        High = 72.02m,
        Low = 71.09m,
        Close = 71.4m,
        Volume = 4388197
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/16"),
        Open = 71.71m,
        High = 72.62m,
        Low = 71.46m,
        Close = 72.48m,
        Volume = 4462368
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/17"),
        Open = 72.42m,
        High = 72.51m,
        Low = 71.94m,
        Close = 72.24m,
        Volume = 3046369
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/18"),
        Open = 73.04m,
        High = 73.04m,
        Low = 73.04m,
        Close = 73.04m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/22"),
        Open = 72.35m,
        High = 72.49m,
        Low = 70.38m,
        Close = 70.93m,
        Volume = 5561369
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/23"),
        Open = 70.94m,
        High = 71.49m,
        Low = 70m,
        Close = 70.23m,
        Volume = 5553517
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/24"),
        Open = 70.35m,
        High = 72.5m,
        Low = 70.09m,
        Close = 70.76m,
        Volume = 7015671
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/25"),
        Open = 73.94m,
        High = 74.29m,
        Low = 72.06m,
        Close = 72.3m,
        Volume = 8127868
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/28"),
        Open = 72.47m,
        High = 72.9m,
        Low = 71.7m,
        Close = 72.01m,
        Volume = 4104971
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/01"),
        Open = 71.93m,
        High = 72.23m,
        Low = 69.99m,
        Close = 70.12m,
        Volume = 5186546
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/02"),
        Open = 70.11m,
        High = 70.4m,
        Low = 68.6m,
        Close = 69.57m,
        Volume = 7070647
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/03"),
        Open = 70.13m,
        High = 71.83m,
        Low = 70.13m,
        Close = 71.71m,
        Volume = 5457873
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/04"),
        Open = 71.8m,
        High = 71.87m,
        Low = 70.28m,
        Close = 71.8m,
        Volume = 5707248
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/07"),
        Open = 71.6m,
        High = 72.07m,
        Low = 69.91m,
        Close = 70.88m,
        Volume = 5133965
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/08"),
        Open = 71.48m,
        High = 72.5m,
        Low = 71.18m,
        Close = 72.04m,
        Volume = 5663929
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/09"),
        Open = 72.01m,
        High = 72.42m,
        Low = 71.33m,
        Close = 72.09m,
        Volume = 5381980
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/10"),
        Open = 71.31m,
        High = 72.39m,
        Low = 70.51m,
        Close = 71.29m,
        Volume = 5511190
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/11"),
        Open = 70.29m,
        High = 71.89m,
        Low = 70.26m,
        Close = 71.64m,
        Volume = 3865232
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/14"),
        Open = 71.17m,
        High = 71.23m,
        Low = 69.9m,
        Close = 70.74m,
        Volume = 4381158
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/15"),
        Open = 68.34m,
        High = 70.23m,
        Low = 68.34m,
        Close = 69.69m,
        Volume = 6253202
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/16"),
        Open = 69.23m,
        High = 69.67m,
        Low = 67.34m,
        Close = 67.69m,
        Volume = 9632331
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/17"),
        Open = 68.58m,
        High = 69.03m,
        Low = 67.85m,
        Close = 68.3m,
        Volume = 4412615
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/18"),
        Open = 69.21m,
        High = 69.58m,
        Low = 68.67m,
        Close = 69.1m,
        Volume = 5067064
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/21"),
        Open = 70.29m,
        High = 71.68m,
        Low = 70.04m,
        Close = 71.2m,
        Volume = 5298771
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/22"),
        Open = 71.18m,
        High = 72.1m,
        Low = 70.72m,
        Close = 71.85m,
        Volume = 4728887
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/23"),
        Open = 71.62m,
        High = 73.07m,
        Low = 71.14m,
        Close = 72.72m,
        Volume = 5334654
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/24"),
        Open = 73.24m,
        High = 73.33m,
        Low = 72.33m,
        Close = 72.76m,
        Volume = 4361482
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/25"),
        Open = 72.94m,
        High = 73.5m,
        Low = 72.33m,
        Close = 73.34m,
        Volume = 4699751
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/28"),
        Open = 73.5m,
        High = 73.69m,
        Low = 73.11m,
        Close = 73.3m,
        Volume = 3858494
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/29"),
        Open = 73.07m,
        High = 73.93m,
        Low = 73.03m,
        Close = 73.62m,
        Volume = 4784479
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/30"),
        Open = 73.93m,
        High = 74.14m,
        Low = 73.35m,
        Close = 73.8m,
        Volume = 3877633
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/31"),
        Open = 73.81m,
        High = 74.47m,
        Low = 73.47m,
        Close = 73.93m,
        Volume = 4200252
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/01"),
        Open = 74.29m,
        High = 74.85m,
        Low = 73.94m,
        Close = 74.01m,
        Volume = 3869760
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/04"),
        Open = 73.38m,
        High = 74.11m,
        Low = 73.37m,
        Close = 73.95m,
        Volume = 3699819
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/05"),
        Open = 73.51m,
        High = 74.45m,
        Low = 72.71m,
        Close = 73.23m,
        Volume = 5231998
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/06"),
        Open = 73.33m,
        High = 73.93m,
        Low = 72.8m,
        Close = 73.72m,
        Volume = 4804410
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/07"),
        Open = 73.74m,
        High = 74.58m,
        Low = 73.68m,
        Close = 74.29m,
        Volume = 4379128
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/08"),
        Open = 74.66m,
        High = 74.85m,
        Low = 73.04m,
        Close = 73.47m,
        Volume = 3104783
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/11"),
        Open = 73.65m,
        High = 74.28m,
        Low = 73.5m,
        Close = 73.76m,
        Volume = 2694958
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/12"),
        Open = 73.22m,
        High = 73.58m,
        Low = 72.96m,
        Close = 73.08m,
        Volume = 3444077
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/13"),
        Open = 73.33m,
        High = 73.71m,
        Low = 71.55m,
        Close = 72.13m,
        Volume = 5082925
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/14"),
        Open = 71.83m,
        High = 72.47m,
        Low = 70.88m,
        Close = 72.3m,
        Volume = 4092711
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/15"),
        Open = 72.45m,
        High = 72.98m,
        Low = 72.02m,
        Close = 72.6m,
        Volume = 4177618
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/18"),
        Open = 72.72m,
        High = 73.28m,
        Low = 71.75m,
        Close = 72.79m,
        Volume = 6228799
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/19"),
        Open = 72.97m,
        High = 73.63m,
        Low = 72.64m,
        Close = 73.15m,
        Volume = 4353471
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/20"),
        Open = 74.21m,
        High = 75.32m,
        Low = 74.15m,
        Close = 75.07m,
        Volume = 6365139
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/21"),
        Open = 75.44m,
        High = 75.44m,
        Low = 75.44m,
        Close = 75.44m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/25"),
        Open = 75.51m,
        High = 75.56m,
        Low = 74.68m,
        Close = 74.9m,
        Volume = 2524915
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/26"),
        Open = 75.31m,
        High = 75.85m,
        Low = 75.01m,
        Close = 75.55m,
        Volume = 5102817
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/27"),
        Open = 76.03m,
        High = 77.31m,
        Low = 75.05m,
        Close = 76.12m,
        Volume = 7464019
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/28"),
        Open = 76.03m,
        High = 78.86m,
        Low = 76.02m,
        Close = 78.55m,
        Volume = 7360867
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/29"),
        Open = 78.88m,
        High = 80.34m,
        Low = 78.85m,
        Close = 79.78m,
        Volume = 8050416
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/02"),
        Open = 80.35m,
        High = 80.65m,
        Low = 79.16m,
        Close = 79.53m,
        Volume = 5635900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/03"),
        Open = 79.24m,
        High = 80.21m,
        Low = 79.01m,
        Close = 79.51m,
        Volume = 4729968
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/04"),
        Open = 79.7m,
        High = 80m,
        Low = 78.76m,
        Close = 78.84m,
        Volume = 5738602
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/05"),
        Open = 78.52m,
        High = 79.74m,
        Low = 78.09m,
        Close = 78.45m,
        Volume = 4721112
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/06"),
        Open = 79.14m,
        High = 80.04m,
        Low = 78.97m,
        Close = 79.31m,
        Volume = 4569364
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/09"),
        Open = 79.31m,
        High = 80.15m,
        Low = 79.15m,
        Close = 79.64m,
        Volume = 3137617
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/10"),
        Open = 79.76m,
        High = 80.42m,
        Low = 79.76m,
        Close = 79.95m,
        Volume = 3855888
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/11"),
        Open = 79.64m,
        High = 79.8m,
        Low = 78.73m,
        Close = 79.08m,
        Volume = 3854565
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/12"),
        Open = 79.04m,
        High = 79.75m,
        Low = 78.48m,
        Close = 79.41m,
        Volume = 3710234
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/13"),
        Open = 79.61m,
        High = 80.09m,
        Low = 78.56m,
        Close = 79.03m,
        Volume = 3809897
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/16"),
        Open = 78.66m,
        High = 78.81m,
        Low = 77.65m,
        Close = 77.77m,
        Volume = 3801072
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/17"),
        Open = 77.61m,
        High = 77.73m,
        Low = 75.83m,
        Close = 76.68m,
        Volume = 5202027
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/18"),
        Open = 76.78m,
        High = 77.49m,
        Low = 76.6m,
        Close = 77.14m,
        Volume = 3637977
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/19"),
        Open = 77.41m,
        High = 78.45m,
        Low = 77.25m,
        Close = 78.02m,
        Volume = 3346199
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/20"),
        Open = 77.89m,
        High = 77.99m,
        Low = 77.26m,
        Close = 77.52m,
        Volume = 4002819
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/23"),
        Open = 76.55m,
        High = 76.76m,
        Low = 75.77m,
        Close = 76.28m,
        Volume = 3589447
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/24"),
        Open = 76.46m,
        High = 76.71m,
        Low = 75.24m,
        Close = 75.57m,
        Volume = 3784298
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/25"),
        Open = 75.26m,
        High = 76.78m,
        Low = 75.13m,
        Close = 76.32m,
        Volume = 4134831
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/26"),
        Open = 76.54m,
        High = 76.92m,
        Low = 75.94m,
        Close = 76.66m,
        Volume = 4378219
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/27"),
        Open = 76.99m,
        High = 76.99m,
        Low = 76.99m,
        Close = 76.99m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/31"),
        Open = 77.8m,
        High = 78.35m,
        Low = 77.41m,
        Close = 78.03m,
        Volume = 4708759
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/01"),
        Open = 77.95m,
        High = 78.1m,
        Low = 75.26m,
        Close = 75.35m,
        Volume = 5259475
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/02"),
        Open = 75.44m,
        High = 76.34m,
        Low = 75.3m,
        Close = 75.69m,
        Volume = 3606253
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/03"),
        Open = 74.71m,
        High = 75.05m,
        Low = 74.09m,
        Close = 74.84m,
        Volume = 4239243
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/06"),
        Open = 74.76m,
        High = 75.27m,
        Low = 74.42m,
        Close = 74.58m,
        Volume = 3310389
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/07"),
        Open = 74.79m,
        High = 75.1m,
        Low = 74.16m,
        Close = 74.18m,
        Volume = 3390458
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/08"),
        Open = 74.13m,
        High = 74.4m,
        Low = 73.65m,
        Close = 73.85m,
        Volume = 3772183
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/09"),
        Open = 73.83m,
        High = 74.55m,
        Low = 73.43m,
        Close = 74.18m,
        Volume = 2960724
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/10"),
        Open = 73.81m,
        High = 74m,
        Low = 72.61m,
        Close = 72.69m,
        Volume = 5140712
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/13"),
        Open = 73.06m,
        High = 73.41m,
        Low = 72.69m,
        Close = 72.94m,
        Volume = 4087214
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/14"),
        Open = 73.34m,
        High = 75.02m,
        Low = 73.19m,
        Close = 74.64m,
        Volume = 4775610
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/15"),
        Open = 74.07m,
        High = 75.51m,
        Low = 73.57m,
        Close = 73.85m,
        Volume = 6532419
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/16"),
        Open = 73.74m,
        High = 74.58m,
        Low = 73.45m,
        Close = 74.01m,
        Volume = 4446439
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/17"),
        Open = 74.62m,
        High = 74.93m,
        Low = 73.76m,
        Close = 74.16m,
        Volume = 5539477
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/20"),
        Open = 73.96m,
        High = 74.8m,
        Low = 73.51m,
        Close = 74.52m,
        Volume = 3812425
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/21"),
        Open = 75.02m,
        High = 75.02m,
        Low = 73.78m,
        Close = 73.98m,
        Volume = 5494429
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/22"),
        Open = 73.59m,
        High = 73.66m,
        Low = 72.06m,
        Close = 72.12m,
        Volume = 7239345
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/23"),
        Open = 71.17m,
        High = 71.63m,
        Low = 70.29m,
        Close = 71.25m,
        Volume = 8040670
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/24"),
        Open = 71.37m,
        High = 71.57m,
        Low = 70.73m,
        Close = 71.26m,
        Volume = 6088445
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/27"),
        Open = 71.44m,
        High = 71.94m,
        Low = 71.33m,
        Close = 71.62m,
        Volume = 4028127
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/28"),
        Open = 71.82m,
        High = 72.24m,
        Low = 71.4m,
        Close = 72.09m,
        Volume = 3837837
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/29"),
        Open = 72.22m,
        High = 72.96m,
        Low = 71.86m,
        Close = 72.72m,
        Volume = 3913885
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/30"),
        Open = 73m,
        High = 74.1m,
        Low = 72.9m,
        Close = 73.93m,
        Volume = 4245732
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/01"),
        Open = 74.27m,
        High = 74.27m,
        Low = 74.27m,
        Close = 74.27m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/05"),
        Open = 74.17m,
        High = 74.73m,
        Low = 73.85m,
        Close = 74.15m,
        Volume = 3128376
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/06"),
        Open = 74.13m,
        High = 75.16m,
        Low = 74.01m,
        Close = 74.74m,
        Volume = 3757881
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/07"),
        Open = 75.33m,
        High = 76.2m,
        Low = 74.85m,
        Close = 75.99m,
        Volume = 4977837
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/08"),
        Open = 75.58m,
        High = 75.58m,
        Low = 74.57m,
        Close = 75.07m,
        Volume = 4051169
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/11"),
        Open = 74.17m,
        High = 74.73m,
        Low = 73m,
        Close = 73.35m,
        Volume = 4379012
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/12"),
        Open = 73.62m,
        High = 73.86m,
        Low = 71.79m,
        Close = 71.93m,
        Volume = 5772914
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/13"),
        Open = 72.56m,
        High = 73.25m,
        Low = 71.86m,
        Close = 72.17m,
        Volume = 4707779
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/14"),
        Open = 71.94m,
        High = 72.32m,
        Low = 71m,
        Close = 71.19m,
        Volume = 5692256
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/15"),
        Open = 71.7m,
        High = 71.71m,
        Low = 70.85m,
        Close = 71.28m,
        Volume = 4058557
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/18"),
        Open = 70.66m,
        High = 70.7m,
        Low = 69.07m,
        Close = 69.55m,
        Volume = 7295227
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/19"),
        Open = 70.11m,
        High = 70.99m,
        Low = 69.31m,
        Close = 70.53m,
        Volume = 7434351
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/20"),
        Open = 71.12m,
        High = 73.3m,
        Low = 70.76m,
        Close = 72.07m,
        Volume = 8026155
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/21"),
        Open = 72.58m,
        High = 73.25m,
        Low = 72m,
        Close = 72.89m,
        Volume = 4302417
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/22"),
        Open = 73.19m,
        High = 73.19m,
        Low = 72.24m,
        Close = 72.67m,
        Volume = 2921707
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/25"),
        Open = 71.38m,
        High = 72.01m,
        Low = 71.01m,
        Close = 71.31m,
        Volume = 3990748
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/26"),
        Open = 71.38m,
        High = 71.44m,
        Low = 69.86m,
        Close = 70.16m,
        Volume = 7070440
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/27"),
        Open = 71.73m,
        High = 73.2m,
        Low = 70.53m,
        Close = 70.63m,
        Volume = 9807768
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/28"),
        Open = 71m,
        High = 72.33m,
        Low = 70.59m,
        Close = 70.66m,
        Volume = 5450001
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/29"),
        Open = 70m,
        High = 71.11m,
        Low = 69.25m,
        Close = 70.47m,
        Volume = 5964349
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/01"),
        Open = 71.61m,
        High = 71.63m,
        Low = 69.53m,
        Close = 70.33m,
        Volume = 5558320
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/02"),
        Open = 69.56m,
        High = 70.29m,
        Low = 67.69m,
        Close = 67.7m,
        Volume = 7052360
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/03"),
        Open = 67.89m,
        High = 68.11m,
        Low = 66.1m,
        Close = 67.34m,
        Volume = 6750274
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/04"),
        Open = 66.36m,
        High = 66.38m,
        Low = 63m,
        Close = 63.09m,
        Volume = 10709104
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/05"),
        Open = 64.09m,
        High = 64.45m,
        Low = 61.41m,
        Close = 62.75m,
        Volume = 11643681
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/08"),
        Open = 61.1m,
        High = 61.81m,
        Low = 58.61m,
        Close = 58.71m,
        Volume = 13562569
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/09"),
        Open = 60.04m,
        High = 62.46m,
        Low = 58.76m,
        Close = 62.34m,
        Volume = 14124373
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/10"),
        Open = 60.92m,
        High = 61.2m,
        Low = 57.23m,
        Close = 57.41m,
        Volume = 13551335
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/11"),
        Open = 57.65m,
        High = 59.57m,
        Low = 56.01m,
        Close = 58.85m,
        Volume = 15539708
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/12"),
        Open = 59.98m,
        High = 61.87m,
        Low = 59.16m,
        Close = 61.75m,
        Volume = 10083494
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/15"),
        Open = 62.06m,
        High = 62.73m,
        Low = 61.37m,
        Close = 62.7m,
        Volume = 6933515
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/16"),
        Open = 61.73m,
        High = 62.98m,
        Low = 61.41m,
        Close = 62.23m,
        Volume = 6841309
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/17"),
        Open = 62.44m,
        High = 62.92m,
        Low = 61.61m,
        Close = 62.18m,
        Volume = 6263385
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/18"),
        Open = 60.4m,
        High = 60.72m,
        Low = 58.22m,
        Close = 58.93m,
        Volume = 8110316
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/19"),
        Open = 58.3m,
        High = 59.43m,
        Low = 57.47m,
        Close = 57.54m,
        Volume = 9229886
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/22"),
        Open = 59.14m,
        High = 59.36m,
        Low = 58.04m,
        Close = 58.38m,
        Volume = 6863980
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/23"),
        Open = 58.7m,
        High = 60.77m,
        Low = 58.19m,
        Close = 60.77m,
        Volume = 6527734
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/24"),
        Open = 60.59m,
        High = 61.91m,
        Low = 60.45m,
        Close = 61.69m,
        Volume = 4853747
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/25"),
        Open = 62.05m,
        High = 62.39m,
        Low = 60.5m,
        Close = 61.1m,
        Volume = 6443765
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/26"),
        Open = 60.64m,
        High = 62.97m,
        Low = 60.13m,
        Close = 62.8m,
        Volume = 6201405
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/29"),
        Open = 63.99m,
        High = 64.78m,
        Low = 63.6m,
        Close = 64.6m,
        Volume = 4303837
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/30"),
        Open = 65.23m,
        High = 66.54m,
        Low = 64.8m,
        Close = 66.03m,
        Volume = 6984939
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/31"),
        Open = 66.69m,
        High = 67.29m,
        Low = 66.14m,
        Close = 66.86m,
        Volume = 6807902
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/01"),
        Open = 66.96m,
        High = 67.73m,
        Low = 66m,
        Close = 66.05m,
        Volume = 6170146
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/02"),
        Open = 65.01m,
        High = 65.15m,
        Low = 63.71m,
        Close = 64.03m,
        Volume = 4735530
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/06"),
        Open = 61.91m,
        High = 62.9m,
        Low = 61.22m,
        Close = 62.77m,
        Volume = 6478737
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/07"),
        Open = 63.94m,
        High = 65.21m,
        Low = 63.42m,
        Close = 64.9m,
        Volume = 5533286
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/08"),
        Open = 64.34m,
        High = 64.5m,
        Low = 62.61m,
        Close = 62.81m,
        Volume = 6870363
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/09"),
        Open = 62.11m,
        High = 63.09m,
        Low = 61.44m,
        Close = 61.79m,
        Volume = 5415796
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/12"),
        Open = 60.83m,
        High = 62.53m,
        Low = 60.33m,
        Close = 62.39m,
        Volume = 5521573
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/13"),
        Open = 62.3m,
        High = 63.59m,
        Low = 62.03m,
        Close = 62.85m,
        Volume = 5283518
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/14"),
        Open = 63.05m,
        High = 64.07m,
        Low = 61.64m,
        Close = 63.03m,
        Volume = 5782902
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/15"),
        Open = 63.65m,
        High = 64.61m,
        Low = 63.45m,
        Close = 64.32m,
        Volume = 5263658
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/16"),
        Open = 64.78m,
        High = 65.75m,
        Low = 64.52m,
        Close = 65.38m,
        Volume = 6928142
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/19"),
        Open = 64.08m,
        High = 64.4m,
        Low = 62.95m,
        Close = 64.15m,
        Volume = 4837107
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/20"),
        Open = 64.36m,
        High = 64.64m,
        Low = 63.5m,
        Close = 63.56m,
        Volume = 3431623
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/21"),
        Open = 63.54m,
        High = 63.82m,
        Low = 60.99m,
        Close = 61.02m,
        Volume = 4524971
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/22"),
        Open = 59.33m,
        High = 59.59m,
        Low = 57.53m,
        Close = 58.72m,
        Volume = 12055693
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/23"),
        Open = 58.57m,
        High = 59.77m,
        Low = 58.06m,
        Close = 59.51m,
        Volume = 6239605
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/26"),
        Open = 60.8m,
        High = 62.27m,
        Low = 60m,
        Close = 62.01m,
        Volume = 7033126
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/27"),
        Open = 64.13m,
        High = 64.28m,
        Low = 62.41m,
        Close = 62.78m,
        Volume = 6410587
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/28"),
        Open = 63.28m,
        High = 64.05m,
        Low = 61.81m,
        Close = 61.92m,
        Volume = 4695911
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/29"),
        Open = 63.2m,
        High = 63.7m,
        Low = 61.36m,
        Close = 62.37m,
        Volume = 6094328
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/30"),
        Open = 61.5m,
        High = 62.18m,
        Low = 60.45m,
        Close = 60.51m,
        Volume = 5467806
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/03"),
        Open = 60.1m,
        High = 61.53m,
        Low = 57.85m,
        Close = 58.25m,
        Volume = 8291484
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/04"),
        Open = 57.53m,
        High = 59.23m,
        Low = 56.9m,
        Close = 59.14m,
        Volume = 7840037
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/05"),
        Open = 58.9m,
        High = 60.04m,
        Low = 58.65m,
        Close = 59.96m,
        Volume = 5825511
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/06"),
        Open = 60.01m,
        High = 61.79m,
        Low = 59.45m,
        Close = 61.48m,
        Volume = 5565869
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/07"),
        Open = 61.91m,
        High = 62.96m,
        Low = 61.43m,
        Close = 61.81m,
        Volume = 5580750
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/10"),
        Open = 62.87m,
        High = 64.19m,
        Low = 62.75m,
        Close = 64.03m,
        Volume = 4605390
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/11"),
        Open = 63.66m,
        High = 64.25m,
        Low = 63.5m,
        Close = 63.97m,
        Volume = 3192271
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/12"),
        Open = 64.46m,
        High = 65.23m,
        Low = 64.13m,
        Close = 64.32m,
        Volume = 5136547
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/13"),
        Open = 63.78m,
        High = 64.09m,
        Low = 63.05m,
        Close = 63.53m,
        Volume = 3154622
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/14"),
        Open = 64m,
        High = 64.28m,
        Low = 63.41m,
        Close = 63.89m,
        Volume = 3840122
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/17"),
        Open = 63.34m,
        High = 63.51m,
        Low = 61.66m,
        Close = 61.78m,
        Volume = 4873358
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/18"),
        Open = 61.93m,
        High = 64.24m,
        Low = 61.33m,
        Close = 63.47m,
        Volume = 6168142
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/19"),
        Open = 62.61m,
        High = 64.27m,
        Low = 62.53m,
        Close = 63.11m,
        Volume = 4849491
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/20"),
        Open = 63.01m,
        High = 63.73m,
        Low = 62.18m,
        Close = 62.49m,
        Volume = 6291595
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/21"),
        Open = 63.31m,
        High = 64.64m,
        Low = 63.1m,
        Close = 64.59m,
        Volume = 6256627
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/24"),
        Open = 64.41m,
        High = 65.06m,
        Low = 63.92m,
        Close = 64.75m,
        Volume = 5190758
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/25"),
        Open = 64.81m,
        High = 64.95m,
        Low = 63.55m,
        Close = 63.72m,
        Volume = 6529645
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/26"),
        Open = 67.56m,
        High = 67.9m,
        Low = 65.8m,
        Close = 66.56m,
        Volume = 12700760
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/27"),
        Open = 68.59m,
        High = 68.76m,
        Low = 67.18m,
        Close = 67.68m,
        Volume = 8606967
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/28"),
        Open = 67.55m,
        High = 68.39m,
        Low = 67.31m,
        Close = 68.17m,
        Volume = 6102840
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/31"),
        Open = 67.12m,
        High = 67.49m,
        Low = 65.74m,
        Close = 65.79m,
        Volume = 6879758
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/01"),
        Open = 64.23m,
        High = 64.34m,
        Low = 62.37m,
        Close = 63.17m,
        Volume = 8963221
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/02"),
        Open = 63.97m,
        High = 64.76m,
        Low = 63.83m,
        Close = 64.4m,
        Volume = 5783293
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/03"),
        Open = 65.16m,
        High = 66.37m,
        Low = 64.5m,
        Close = 66.19m,
        Volume = 4897485
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/04"),
        Open = 65.59m,
        High = 65.95m,
        Low = 65m,
        Close = 65.8m,
        Volume = 3458005
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/07"),
        Open = 65.71m,
        High = 66.4m,
        Low = 65.17m,
        Close = 66.29m,
        Volume = 3624148
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/08"),
        Open = 66.44m,
        High = 66.8m,
        Low = 65.45m,
        Close = 66.65m,
        Volume = 4827016
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/09"),
        Open = 65.17m,
        High = 65.7m,
        Low = 64.33m,
        Close = 64.55m,
        Volume = 5753946
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/10"),
        Open = 65.09m,
        High = 65.6m,
        Low = 64.59m,
        Close = 64.83m,
        Volume = 3854985
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/11"),
        Open = 65.43m,
        High = 67.26m,
        Low = 65.43m,
        Close = 66.92m,
        Volume = 4398215
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/14"),
        Open = 68.89m,
        High = 68.97m,
        Low = 67.7m,
        Close = 67.94m,
        Volume = 6367008
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/15"),
        Open = 67.9m,
        High = 68.34m,
        Low = 67.05m,
        Close = 67.94m,
        Volume = 5112765
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/16"),
        Open = 67.13m,
        High = 67.66m,
        Low = 66.2m,
        Close = 66.34m,
        Volume = 5353206
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/17"),
        Open = 67.2m,
        High = 67.35m,
        Low = 65.41m,
        Close = 66.09m,
        Volume = 7125002
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/18"),
        Open = 66.93m,
        High = 67.85m,
        Low = 66.29m,
        Close = 67.46m,
        Volume = 7055691
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/21"),
        Open = 66.32m,
        High = 66.45m,
        Low = 64m,
        Close = 65.56m,
        Volume = 8102833
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/22"),
        Open = 65.3m,
        High = 65.44m,
        Low = 63.88m,
        Close = 64.35m,
        Volume = 5001801
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/23"),
        Open = 62.36m,
        High = 62.36m,
        Low = 62.36m,
        Close = 62.36m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/25"),
        Open = 62.16m,
        High = 63.62m,
        Low = 62.12m,
        Close = 62.78m,
        Volume = 2122270
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/28"),
        Open = 64.53m,
        High = 65.63m,
        Low = 64.53m,
        Close = 64.99m,
        Volume = 4621077
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/29"),
        Open = 65.02m,
        High = 66m,
        Low = 64.84m,
        Close = 65.26m,
        Volume = 5317818
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/30"),
        Open = 67.08m,
        High = 68.75m,
        Low = 66.99m,
        Close = 68.69m,
        Volume = 8602614
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/01"),
        Open = 68.7m,
        High = 71.71m,
        Low = 68.51m,
        Close = 70.98m,
        Volume = 12019243
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/02"),
        Open = 71.7m,
        High = 71.98m,
        Low = 70.93m,
        Close = 71.3m,
        Volume = 7252534
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/05"),
        Open = 72.28m,
        High = 72.76m,
        Low = 70.35m,
        Close = 71.09m,
        Volume = 8133778
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/06"),
        Open = 70.92m,
        High = 71.59m,
        Low = 70.8m,
        Close = 70.87m,
        Volume = 4624791
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/07"),
        Open = 70.3m,
        High = 71.51m,
        Low = 69.64m,
        Close = 70.6m,
        Volume = 6455898
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/08"),
        Open = 70.46m,
        High = 71.13m,
        Low = 69.83m,
        Close = 70.17m,
        Volume = 6035125
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/09"),
        Open = 70.81m,
        High = 72m,
        Low = 70.41m,
        Close = 71.93m,
        Volume = 5545848
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/12"),
        Open = 71.51m,
        High = 71.96m,
        Low = 70.18m,
        Close = 70.9m,
        Volume = 5465587
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/13"),
        Open = 71.67m,
        High = 72.65m,
        Low = 70.62m,
        Close = 70.9m,
        Volume = 7560205
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/14"),
        Open = 70.35m,
        High = 71.54m,
        Low = 69.72m,
        Close = 69.94m,
        Volume = 6000866
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/15"),
        Open = 70.81m,
        High = 70.95m,
        Low = 70.05m,
        Close = 70.61m,
        Volume = 4076632
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/16"),
        Open = 71.11m,
        High = 72.37m,
        Low = 70.56m,
        Close = 71.01m,
        Volume = 8856028
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/19"),
        Open = 71.2m,
        High = 71.62m,
        Low = 69.91m,
        Close = 70.16m,
        Volume = 3572696
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/20"),
        Open = 71.23m,
        High = 72.68m,
        Low = 71.23m,
        Close = 72.44m,
        Volume = 5408685
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/21"),
        Open = 72.73m,
        High = 73.71m,
        Low = 72.06m,
        Close = 73.59m,
        Volume = 5471785
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/22"),
        Open = 73.83m,
        High = 74.74m,
        Low = 73.48m,
        Close = 74.29m,
        Volume = 5849305
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/23"),
        Open = 73.97m,
        High = 73.97m,
        Low = 73.97m,
        Close = 73.97m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/27"),
        Open = 73.68m,
        High = 74.49m,
        Low = 73.37m,
        Close = 74.27m,
        Volume = 2536693
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/28"),
        Open = 74.48m,
        High = 74.6m,
        Low = 73.03m,
        Close = 73.26m,
        Volume = 2568121
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/29"),
        Open = 73.44m,
        High = 74.36m,
        Low = 73.31m,
        Close = 74.11m,
        Volume = 2749261
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/30"),
        Open = 73.35m,
        High = 73.35m,
        Low = 73.35m,
        Close = 73.35m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/03"),
        Open = 74.7m,
        High = 75m,
        Low = 74.12m,
        Close = 74.22m,
        Volume = 6859222
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/04"),
        Open = 74.1m,
        High = 74.6m,
        Low = 73.59m,
        Close = 74.33m,
        Volume = 4923063
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/05"),
        Open = 73.77m,
        High = 73.9m,
        Low = 72.74m,
        Close = 73.53m,
        Volume = 6798561
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/06"),
        Open = 73.73m,
        High = 74.27m,
        Low = 72.95m,
        Close = 73.98m,
        Volume = 4783280
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/09"),
        Open = 74.81m,
        High = 74.87m,
        Low = 74.18m,
        Close = 74.53m,
        Volume = 4469933
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/10"),
        Open = 75.13m,
        High = 75.34m,
        Low = 74.5m,
        Close = 75m,
        Volume = 4622548
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/11"),
        Open = 74.78m,
        High = 74.95m,
        Low = 74.23m,
        Close = 74.74m,
        Volume = 3082660
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/12"),
        Open = 74.81m,
        High = 75.69m,
        Low = 74.78m,
        Close = 75.51m,
        Volume = 3934504
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/13"),
        Open = 74.6m,
        High = 74.6m,
        Low = 74.6m,
        Close = 74.6m,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/17"),
        Open = 75.3m,
        High = 76m,
        Low = 75.14m,
        Close = 75.24m,
        Volume = 3700019
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/18"),
        Open = 74.95m,
        High = 75.45m,
        Low = 74.77m,
        Close = 75.06m,
        Volume = 4189925
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/19"),
        Open = 75.27m,
        High = 75.92m,
        Low = 75.1m,
        Close = 75.56m,
        Volume = 5397265
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/20"),
        Open = 75.68m,
        High = 75.9m,
        Low = 74.96m,
        Close = 75.52m,
        Volume = 4552369
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/23"),
        Open = 75.66m,
        High = 76.37m,
        Low = 75.32m,
        Close = 75.51m,
        Volume = 4083937
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/24"),
        Open = 75.06m,
        High = 75.62m,
        Low = 74.6m,
        Close = 75.36m,
        Volume = 4945839
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/25"),
        Open = 73.97m,
        High = 76.7m,
        Low = 72.85m,
        Close = 75.82m,
        Volume = 14049068
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/26"),
        Open = 75.84m,
        High = 76.36m,
        Low = 75m,
        Close = 75.31m,
        Volume = 4187609
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/27"),
        Open = 74.8m,
        High = 75.23m,
        Low = 74.4m,
        Close = 74.55m,
        Volume = 4754604
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/30"),
        Open = 73.99m,
        High = 74.35m,
        Low = 73.68m,
        Close = 74.16m,
        Volume = 5043622
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/31"),
        Open = 74.51m,
        High = 75.2m,
        Low = 73.96m,
        Close = 74.18m,
        Volume = 4777251
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/01"),
        Open = 74.96m,
        High = 75.89m,
        Low = 74.96m,
        Close = 75.37m,
        Volume = 4296501
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/02"),
        Open = 75.2m,
        High = 75.33m,
        Low = 74.5m,
        Close = 75.22m,
        Volume = 3528072
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/03"),
        Open = 76.09m,
        High = 76.74m,
        Low = 75.86m,
        Close = 76.34m,
        Volume = 3472759
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/06"),
        Open = 75.26m,
        High = 75.55m,
        Low = 75.16m,
        Close = 75.46m,
        Volume = 4163247
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/07"),
        Open = 75.04m,
        High = 75.35m,
        Low = 74.3m,
        Close = 75.2m,
        Volume = 4438621
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/08"),
        Open = 74.71m,
        High = 75.65m,
        Low = 74.51m,
        Close = 75.46m,
        Volume = 5350337
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/09"),
        Open = 75.78m,
        High = 76.23m,
        Low = 75.37m,
        Close = 75.9m,
        Volume = 4491173
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/10"),
        Open = 75.45m,
        High = 75.56m,
        Low = 74.57m,
        Close = 74.95m,
        Volume = 3362453
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/13"),
        Open = 75.5m,
        High = 75.51m,
        Low = 74.75m,
        Close = 74.85m,
        Volume = 3456593
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/14"),
        Open = 75.51m,
        High = 75.57m,
        Low = 74.9m,
        Close = 75.56m,
        Volume = 4652130
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/15"),
        Open = 75.86m,
        High = 76m,
        Low = 75m,
        Close = 75.21m,
        Volume = 4252431
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/16"),
        Open = 75.04m,
        High = 75.47m,
        Low = 74.87m,
        Close = 75.27m,
        Volume = 4993960
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/17"),
        Open = 75.53m,
        High = 75.55m,
        Low = 75.02m,
        Close = 75.35m,
        Volume = 4927482
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/21"),
        Open = 75.67m,
        High = 75.95m,
        Low = 75.08m,
        Close = 75.72m,
        Volume = 3978086
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/22"),
        Open = 75.56m,
        High = 76.3m,
        Low = 75.31m,
        Close = 76.06m,
        Volume = 3764747
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/23"),
        Open = 75.76m,
        High = 76.17m,
        Low = 75.52m,
        Close = 75.85m,
        Volume = 4187674
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/24"),
        Open = 75.75m,
        High = 76.64m,
        Low = 75.63m,
        Close = 76.06m,
        Volume = 3346959
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/27"),
        Open = 75.69m,
        High = 75.78m,
        Low = 75.01m,
        Close = 75.21m,
        Volume = 5379304
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/28"),
        Open = 75.18m,
        High = 75.41m,
        Low = 74.81m,
        Close = 75.16m,
        Volume = 3667760
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/29"),
        Open = 75.28m,
        High = 75.72m,
        Low = 74.75m,
        Close = 74.95m,
        Volume = 4633018
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/01"),
        Open = 74.96m,
        High = 75.63m,
        Low = 74.86m,
        Close = 75.08m,
        Volume = 3343441
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/02"),
        Open = 75.07m,
        High = 75.28m,
        Low = 74.63m,
        Close = 74.9m,
        Volume = 2806509
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/05"),
        Open = 74.95m,
        High = 74.98m,
        Low = 73.93m,
        Close = 74.13m,
        Volume = 4157820
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/06"),
        Open = 73.24m,
        High = 73.24m,
        Low = 72.3m,
        Close = 72.56m,
        Volume = 5456237
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/07"),
        Open = 72.58m,
        High = 73.7m,
        Low = 72.51m,
        Close = 73.52m,
        Volume = 4278942
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/08"),
        Open = 74.27m,
        High = 74.7m,
        Low = 73.83m,
        Close = 74.17m,
        Volume = 3881176
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/09"),
        Open = 74.14m,
        High = 74.31m,
        Low = 73.17m,
        Close = 73.29m,
        Volume = 5537742
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/12"),
        Open = 73.2m,
        High = 74.03m,
        Low = 73.2m,
        Close = 73.6m,
        Volume = 2833818
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/13"),
        Open = 73.88m,
        High = 74.35m,
        Low = 73.38m,
        Close = 74.31m,
        Volume = 4533277
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/14"),
        Open = 74.32m,
        High = 75.38m,
        Low = 74.31m,
        Close = 75.23m,
        Volume = 5297076
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/15"),
        Open = 75.5m,
        High = 75.63m,
        Low = 74.88m,
        Close = 75.43m,
        Volume = 4850646
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/16"),
        Open = 75.76m,
        High = 75.81m,
        Low = 75m,
        Close = 75.2m,
        Volume = 7079832
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/19"),
        Open = 75m,
        High = 75.69m,
        Low = 75m,
        Close = 75.4m,
        Volume = 2683796
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/20"),
        Open = 75.09m,
        High = 75.47m,
        Low = 74.52m,
        Close = 75.14m,
        Volume = 4384050
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/21"),
        Open = 75.05m,
        High = 75.46m,
        Low = 74.8m,
        Close = 75.01m,
        Volume = 3644039
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/22"),
        Open = 74.62m,
        High = 74.66m,
        Low = 73.37m,
        Close = 73.92m,
        Volume = 4921380
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/23"),
        Open = 74.05m,
        High = 74.34m,
        Low = 73.75m,
        Close = 73.97m,
        Volume = 2518614
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/26"),
        Open = 74.52m,
        High = 75.23m,
        Low = 74.47m,
        Close = 75.18m,
        Volume = 3715860
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/27"),
        Open = 75.11m,
        High = 75.25m,
        Low = 74.8m,
        Close = 74.81m,
        Volume = 3510684
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/28"),
        Open = 74.99m,
        High = 75.29m,
        Low = 73.9m,
        Close = 74.33m,
        Volume = 3412147
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/29"),
        Open = 73.77m,
        High = 74.15m,
        Low = 72.95m,
        Close = 74.08m,
        Volume = 3587511
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/30"),
        Open = 74.32m,
        High = 74.44m,
        Low = 73.78m,
        Close = 74.37m,
        Volume = 3204110
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/02"),
        Open = 74m,
        High = 75.48m,
        Low = 73.61m,
        Close = 75.17m,
        Volume = 4104580
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/03"),
        Open = 75m,
        High = 75.11m,
        Low = 74.15m,
        Close = 74.65m,
        Volume = 3485900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/04"),
        Open = 73.97m,
        High = 74.19m,
        Low = 73.49m,
        Close = 73.67m,
        Volume = 2490420
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/05"),
        Open = 73.42m,
        High = 73.89m,
        Low = 73.3m,
        Close = 73.59m,
        Volume = 2640176
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/09"),
        Open = 72.63m,
        High = 72.79m,
        Low = 72.27m,
        Close = 72.43m,
        Volume = 2443561
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/10"),
        Open = 72.25m,
        High = 72.31m,
        Low = 70.59m,
        Close = 70.6m,
        Volume = 5340337
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/11"),
        Open = 71.63m,
        High = 72.51m,
        Low = 71.49m,
        Close = 71.77m,
        Volume = 5100061
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/12"),
        Open = 71.69m,
        High = 73.83m,
        Low = 71.69m,
        Close = 73.5m,
        Volume = 3938960
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/13"),
        Open = 73.18m,
        High = 73.38m,
        Low = 72.37m,
        Close = 72.92m,
        Volume = 3329065
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/16"),
        Open = 72.98m,
        High = 73.19m,
        Low = 72.3m,
        Close = 72.68m,
        Volume = 4800373
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/17"),
        Open = 73.13m,
        High = 74.36m,
        Low = 73.1m,
        Close = 74.09m,
        Volume = 3345339
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/18"),
        Open = 73.58m,
        High = 74.24m,
        Low = 73.47m,
        Close = 73.71m,
        Volume = 2248878
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/19"),
        Open = 73.73m,
        High = 73.96m,
        Low = 72.66m,
        Close = 73.1m,
        Volume = 3729518
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/20"),
        Open = 73.27m,
        High = 74.03m,
        Low = 73.1m,
        Close = 73.55m,
        Volume = 4302019
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/23"),
        Open = 72.69m,
        High = 73.13m,
        Low = 72.17m,
        Close = 72.86m,
        Volume = 5022483
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/24"),
        Open = 73.21m,
        High = 73.74m,
        Low = 72.77m,
        Close = 73.21m,
        Volume = 3665410
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/25"),
        Open = 75.05m,
        High = 77.5m,
        Low = 74.9m,
        Close = 77.08m,
        Volume = 10622471
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/26"),
        Open = 76.71m,
        High = 77.2m,
        Low = 76.55m,
        Close = 76.99m,
        Volume = 4704744
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/27"),
        Open = 77.28m,
        High = 77.57m,
        Low = 76.9m,
        Close = 77.27m,
        Volume = 3756644
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/30"),
        Open = 76.51m,
        High = 76.87m,
        Low = 75.68m,
        Close = 76.8m,
        Volume = 5811059
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/01"),
        Open = 76.59m,
        High = 77.83m,
        Low = 75.85m,
        Close = 77.25m,
        Volume = 4287855
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/02"),
        Open = 76.77m,
        High = 77.5m,
        Low = 76.34m,
        Close = 77.26m,
        Volume = 3073459
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/03"),
        Open = 77.13m,
        High = 77.33m,
        Low = 76.52m,
        Close = 76.83m,
        Volume = 3305192
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/04"),
        Open = 76.35m,
        High = 76.56m,
        Low = 75.5m,
        Close = 75.84m,
        Volume = 3366323
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/07"),
        Open = 75.79m,
        High = 76.08m,
        Low = 75.37m,
        Close = 75.96m,
        Volume = 3551718
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/08"),
        Open = 75.38m,
        High = 75.6m,
        Low = 74.55m,
        Close = 75.4m,
        Volume = 4033939
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/09"),
        Open = 74.25m,
        High = 74.86m,
        Low = 73.32m,
        Close = 74.05m,
        Volume = 3926975
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/10"),
        Open = 74.46m,
        High = 75.07m,
        Low = 73.63m,
        Close = 73.8m,
        Volume = 2952733
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/11"),
        Open = 73.59m,
        High = 74.11m,
        Low = 73.25m,
        Close = 73.56m,
        Volume = 3188953
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/14"),
        Open = 72.89m,
        High = 73.79m,
        Low = 72.35m,
        Close = 73.12m,
        Volume = 3585624
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/15"),
        Open = 73m,
        High = 73.67m,
        Low = 72.42m,
        Close = 72.58m,
        Volume = 3252323
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/16"),
        Open = 72.82m,
        High = 73.51m,
        Low = 72.29m,
        Close = 72.35m,
        Volume = 3648392
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/17"),
        Open = 72.31m,
        High = 72.48m,
        Low = 69.46m,
        Close = 69.73m,
        Volume = 6173903
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/18"),
        Open = 69.95m,
        High = 70.34m,
        Low = 68.93m,
        Close = 69.15m,
        Volume = 5597367
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/21"),
        Open = 70.46m,
        High = 71.85m,
        Low = 70.14m,
        Close = 71.78m,
        Volume = 4709898
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/22"),
        Open = 71.65m,
        High = 72.21m,
        Low = 71.08m,
        Close = 71.48m,
        Volume = 4269380
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/23"),
        Open = 70.69m,
        High = 71.63m,
        Low = 69.92m,
        Close = 71.57m,
        Volume = 4222625
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/24"),
        Open = 71.64m,
        High = 71.95m,
        Low = 70.25m,
        Close = 71.39m,
        Volume = 2942602
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/25"),
        Open = 71.21m,
        High = 71.39m,
        Low = 69.66m,
        Close = 70m,
        Volume = 5163399
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/29"),
        Open = 70.28m,
        High = 70.5m,
        Low = 69.75m,
        Close = 70.4m,
        Volume = 3973690
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/30"),
        Open = 69.88m,
        High = 70.09m,
        Low = 69.25m,
        Close = 69.39m,
        Volume = 4677582
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/31"),
        Open = 69.54m,
        High = 70.11m,
        Low = 69.07m,
        Close = 69.61m,
        Volume = 4191450
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/01"),
        Open = 68.67m,
        High = 68.88m,
        Low = 67.14m,
        Close = 67.24m,
        Volume = 5594282
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/04"),
        Open = 68.15m,
        High = 68.15m,
        Low = 67.05m,
        Close = 67.5m,
        Volume = 5478845
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/05"),
        Open = 67.31m,
        High = 67.7m,
        Low = 66.82m,
        Close = 67.58m,
        Volume = 3747728
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/06"),
        Open = 67.97m,
        High = 69.02m,
        Low = 67.96m,
        Close = 69.02m,
        Volume = 4050424
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/07"),
        Open = 69.57m,
        High = 70.33m,
        Low = 69.43m,
        Close = 69.95m,
        Volume = 4004502
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/08"),
        Open = 69.66m,
        High = 69.97m,
        Low = 69.27m,
        Close = 69.94m,
        Volume = 3933572
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/11"),
        Open = 70.61m,
        High = 70.85m,
        Low = 69.8m,
        Close = 70.11m,
        Volume = 4369378
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/12"),
        Open = 70.93m,
        High = 72.82m,
        Low = 70.74m,
        Close = 72.58m,
        Volume = 6458167
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/13"),
        Open = 72.41m,
        High = 72.7m,
        Low = 71.58m,
        Close = 72.06m,
        Volume = 4720247
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/14"),
        Open = 72.08m,
        High = 72.3m,
        Low = 71.39m,
        Close = 71.85m,
        Volume = 5822847
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/15"),
        Open = 72.09m,
        High = 72.38m,
        Low = 71.58m,
        Close = 71.99m,
        Volume = 5312746
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/18"),
        Open = 71.69m,
        High = 72.34m,
        Low = 71.25m,
        Close = 71.9m,
        Volume = 3435372
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/19"),
        Open = 72.36m,
        High = 73.22m,
        Low = 72.02m,
        Close = 72.92m,
        Volume = 4167103
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/20"),
        Open = 72.7m,
        High = 73.46m,
        Low = 72.35m,
        Close = 73.01m,
        Volume = 3468694
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/21"),
        Open = 73.35m,
        High = 73.62m,
        Low = 71.25m,
        Close = 71.37m,
        Volume = 3660254
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/22"),
        Open = 71.55m,
        High = 72.1m,
        Low = 71.07m,
        Close = 71.96m,
        Volume = 3278260
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/25"),
        Open = 71.81m,
        High = 71.92m,
        Low = 71.03m,
        Close = 71.05m,
        Volume = 4116613
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/26"),
        Open = 71.3m,
        High = 71.63m,
        Low = 70.48m,
        Close = 70.93m,
        Volume = 2757976
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/27"),
        Open = 70.98m,
        High = 72.04m,
        Low = 70.95m,
        Close = 71.87m,
        Volume = 2514547
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/28"),
        Open = 71.15m,
        High = 71.74m,
        Low = 70.63m,
        Close = 71.58m,
        Volume = 3144751
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/29"),
        Open = 73.06m,
        High = 74.37m,
        Low = 72.89m,
        Close = 74.3m,
        Volume = 4419908
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/02"),
        Open = 74.21m,
        High = 74.74m,
        Low = 72.45m,
        Close = 73.18m,
        Volume = 4893337
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/03"),
        Open = 73.08m,
        High = 74.27m,
        Low = 73.08m,
        Close = 74.27m,
        Volume = 2166183
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/05"),
        Open = 74.38m,
        High = 74.74m,
        Low = 73.85m,
        Close = 74.44m,
        Volume = 2539193
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/06"),
        Open = 73.78m,
        High = 73.81m,
        Low = 72.9m,
        Close = 73.69m,
        Volume = 3579766
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/09"),
        Open = 74.27m,
        High = 74.85m,
        Low = 73.8m,
        Close = 74.03m,
        Volume = 4357834
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/10"),
        Open = 74.63m,
        High = 75.05m,
        Low = 72.89m,
        Close = 73.22m,
        Volume = 4756701
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/11"),
        Open = 72.69m,
        High = 72.76m,
        Low = 71.23m,
        Close = 71.52m,
        Volume = 6073803
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/12"),
        Open = 71.2m,
        High = 72.02m,
        Low = 70.85m,
        Close = 71.71m,
        Volume = 5799745
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/13"),
        Open = 71.93m,
        High = 73.56m,
        Low = 71.85m,
        Close = 73.51m,
        Volume = 3616090
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/16"),
        Open = 73.13m,
        High = 73.19m,
        Low = 72.25m,
        Close = 72.97m,
        Volume = 3538397
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/17"),
        Open = 73.25m,
        High = 73.51m,
        Low = 72.04m,
        Close = 73.11m,
        Volume = 2753811
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/18"),
        Open = 72.71m,
        High = 74.44m,
        Low = 72.71m,
        Close = 73.89m,
        Volume = 3756167
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/19"),
        Open = 73.99m,
        High = 75.1m,
        Low = 73.7m,
        Close = 74.86m,
        Volume = 4543120
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/20"),
        Open = 74.5m,
        High = 74.8m,
        Low = 73.61m,
        Close = 73.89m,
        Volume = 3148117
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/23"),
        Open = 72.31m,
        High = 73.08m,
        Low = 71.58m,
        Close = 72.91m,
        Volume = 3433911
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/24"),
        Open = 72.87m,
        High = 73.17m,
        Low = 71.35m,
        Close = 72.03m,
        Volume = 3866628
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/25"),
        Open = 74.2m,
        High = 74.48m,
        Low = 72.7m,
        Close = 74.03m,
        Volume = 6131400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/26"),
        Open = 75.13m,
        High = 75.96m,
        Low = 74.27m,
        Close = 74.91m,
        Volume = 4949365
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/27"),
        Open = 75.58m,
        High = 75.94m,
        Low = 75.08m,
        Close = 75.51m,
        Volume = 4066995
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/30"),
        Open = 74.6m,
        High = 75.59m,
        Low = 74.43m,
        Close = 74.86m,
        Volume = 4999974
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/31"),
        Open = 74.82m,
        High = 75.06m,
        Low = 73.88m,
        Close = 73.91m,
        Volume = 3978771
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/01"),
        Open = 74.32m,
        High = 74.48m,
        Low = 72.64m,
        Close = 72.77m,
        Volume = 4696302
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/02"),
        Open = 72.39m,
        High = 72.52m,
        Low = 71.16m,
        Close = 71.99m,
        Volume = 4430747
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/03"),
        Open = 73.16m,
        High = 73.33m,
        Low = 72.68m,
        Close = 72.81m,
        Volume = 800947
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/06"),
        Open = 73.01m,
        High = 73.32m,
        Low = 72.72m,
        Close = 72.89m,
        Volume = 714866
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/07"),
        Open = 73.1m,
        High = 74.55m,
        Low = 72.99m,
        Close = 74.46m,
        Volume = 878407
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/08"),
        Open = 74.2m,
        High = 74.68m,
        Low = 74.01m,
        Close = 74.6m,
        Volume = 616663
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/09"),
        Open = 74.61m,
        High = 74.61m,
        Low = 73.91m,
        Close = 74.28m,
        Volume = 452979
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/10"),
        Open = 73.87m,
        High = 74.3m,
        Low = 73.77m,
        Close = 74.21m,
        Volume = 654181
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/13"),
        Open = 73.69m,
        High = 74.42m,
        Low = 73.6m,
        Close = 74.19m,
        Volume = 470842
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/14"),
        Open = 74.3m,
        High = 74.41m,
        Low = 73.61m,
        Close = 73.81m,
        Volume = 490847
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/15"),
        Open = 73.3m,
        High = 73.64m,
        Low = 72.75m,
        Close = 73.07m,
        Volume = 558461
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/16"),
        Open = 73.1m,
        High = 73.75m,
        Low = 73.02m,
        Close = 73.64m,
        Volume = 553793
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/17"),
        Open = 73.64m,
        High = 73.96m,
        Low = 73.41m,
        Close = 73.91m,
        Volume = 1199997
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/20"),
        Open = 73.61m,
        High = 74m,
        Low = 73.34m,
        Close = 73.83m,
        Volume = 2481972
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/21"),
        Open = 74.09m,
        High = 74.36m,
        Low = 73.12m,
        Close = 73.27m,
        Volume = 3136740
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/22"),
        Open = 73.34m,
        High = 73.6m,
        Low = 72.55m,
        Close = 72.8m,
        Volume = 4245048
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/23"),
        Open = 72.09m,
        High = 72.15m,
        Low = 70.02m,
        Close = 70.36m,
        Volume = 9433833
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/24"),
        Open = 70.32m,
        High = 71.17m,
        Low = 70.05m,
        Close = 71.09m,
        Volume = 5351394
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/27"),
        Open = 70.95m,
        High = 71.78m,
        Low = 70.88m,
        Close = 71.38m,
        Volume = 3538075
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/28"),
        Open = 71.18m,
        High = 71.85m,
        Low = 71.05m,
        Close = 71.52m,
        Volume = 3029274
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/29"),
        Open = 71.64m,
        High = 71.99m,
        Low = 71.13m,
        Close = 71.44m,
        Volume = 2687111
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/30"),
        Open = 71.05m,
        High = 71.13m,
        Low = 70.5m,
        Close = 70.82m,
        Volume = 3393096
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/31"),
        Open = 71.27m,
        High = 71.75m,
        Low = 70.61m,
        Close = 71.4m,
        Volume = 3171737
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/04"),
        Open = 70.7m,
        High = 71.5m,
        Low = 70.4m,
        Close = 70.87m,
        Volume = 3916796
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/05"),
        Open = 71.38m,
        High = 72.05m,
        Low = 71.11m,
        Close = 71.92m,
        Volume = 4946887
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/06"),
        Open = 72.37m,
        High = 73.27m,
        Low = 72.37m,
        Close = 72.82m,
        Volume = 4358906
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/07"),
        Open = 72.87m,
        High = 73.03m,
        Low = 72.55m,
        Close = 72.89m,
        Volume = 3080445
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/10"),
        Open = 72.31m,
        High = 72.32m,
        Low = 70.81m,
        Close = 71.08m,
        Volume = 8354695
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/11"),
        Open = 71.19m,
        High = 71.67m,
        Low = 71.15m,
        Close = 71.27m,
        Volume = 3951692
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/12"),
        Open = 71.43m,
        High = 71.68m,
        Low = 70.8m,
        Close = 70.96m,
        Volume = 4400715
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/13"),
        Open = 70.68m,
        High = 71.99m,
        Low = 70.44m,
        Close = 71.58m,
        Volume = 5320329
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/14"),
        Open = 72.02m,
        High = 72.43m,
        Low = 71m,
        Close = 71.28m,
        Volume = 6530818
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/17"),
        Open = 70.77m,
        High = 70.82m,
        Low = 69.89m,
        Close = 69.92m,
        Volume = 6918255
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/18"),
        Open = 69.86m,
        High = 70.46m,
        Low = 69.56m,
        Close = 70.45m,
        Volume = 5490414
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/19"),
        Open = 70.74m,
        High = 70.74m,
        Low = 69.88m,
        Close = 69.9m,
        Volume = 5194477
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/20"),
        Open = 69.35m,
        High = 69.86m,
        Low = 69.03m,
        Close = 69.85m,
        Volume = 4875211
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/21"),
        Open = 70.09m,
        High = 70.15m,
        Low = 69.47m,
        Close = 69.97m,
        Volume = 13164383
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/24"),
        Open = 69.45m,
        High = 70.18m,
        Low = 69.21m,
        Close = 70.03m,
        Volume = 5037975
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/25"),
        Open = 70.29m,
        High = 70.49m,
        Low = 69.38m,
        Close = 69.38m,
        Volume = 4086826
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/26"),
        Open = 69.34m,
        High = 70.51m,
        Low = 69.31m,
        Close = 70.25m,
        Volume = 5256491
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/27"),
        Open = 70.4m,
        High = 70.55m,
        Low = 69.71m,
        Close = 70.1m,
        Volume = 4147748
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/28"),
        Open = 69.75m,
        High = 70.05m,
        Low = 69.18m,
        Close = 69.6m,
        Volume = 4057939
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/10/01"),
        Open = 69.86m,
        High = 70.66m,
        Low = 69.8m,
        Close = 70.01m,
        Volume = 4012594
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/10/02"),
        Open = 70.11m,
        High = 70.3m,
        Low = 69.2m,
        Close = 69.53m,
        Volume = 3077829
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/10/03"),
        Open = 69.9m,
        High = 70m,
        Low = 69.36m,
        Close = 69.86m,
        Volume = 3106358
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/10/04"),
        Open = 70.24m,
        High = 70.38m,
        Low = 69.72m,
        Close = 69.94m,
        Volume = 2818315
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/10/05"),
        Open = 70.26m,
        High = 71.25m,
        Low = 70.21m,
        Close = 70.89m,
        Volume = 3741887
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/10/08"),
        Open = 70.72m,
        High = 71.19m,
        Low = 70.55m,
        Close = 70.57m,
        Volume = 2838886
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/10/09"),
        Open = 70.7m,
        High = 71.21m,
        Low = 70.36m,
        Close = 70.64m,
        Volume = 4116678
    }
            };
        }
    }
}