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
                    Close = 405,
                    Volume = 6414369,
                    Open = 403.51,
                    High = 406.28,
                    Low = 403.49,
                    Symbol = "2. AAPL"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/11/30"),
                    Close = 382.2,
                    Volume = 14464710,
                    Open = 381.29,
                    High = 382.276,
                    Low = 378.3,
                    Symbol = "2. AAPL"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/10/31"),
                    Close = 404.78,
                    Volume = 13762250,
                    Open = 402.42,
                    High = 409.33,
                    Low = 401.05,
                    Symbol = "2. AAPL"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/9/30"),
                    Close = 381.32,
                    Volume = 19553550,
                    Open = 387.12,
                    High = 388.89,
                    Low = 381.18,
                    Symbol = "2. AAPL"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/8/31"),
                    Close = 384.83,
                    Volume = 18643770,
                    Open = 390.57,
                    High = 392.08,
                    Low = 381.86,
                    Symbol = "2. AAPL"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/7/29"),
                    Close = 390.48,
                    Volume = 22550900,
                    Open = 387.64,
                    High = 395.15,
                    Low = 384,
                    Symbol = "2. AAPL"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/6/30"),
                    Close = 335.67,
                    Volume = 11526680,
                    Open = 334.7,
                    High = 336.13,
                    Low = 332.84,
                    Symbol = "2. AAPL"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/5/31"),
                    Close = 347.83,
                    Volume = 14869200,
                    Open = 341.1,
                    High = 347.83,
                    Low = 341,
                    Symbol = "2. AAPL"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/4/29"),
                    Close = 350.13,
                    Volume = 29776300,
                    Open = 346.78,
                    High = 353.95,
                    Low = 346.666,
                    Symbol = "2. AAPL"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/3/31"),
                    Close = 348.5075,
                    Volume = 9779020,
                    Open = 346.36,
                    High = 349.8,
                    Low = 346.06,
                    Symbol = "2. AAPL"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/2/28"),
                    Close = 353.21,
                    Volume = 14356740,
                    Open = 351.24,
                    High = 355.05,
                    Low = 351.12,
                    Symbol = "2. AAPL"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/1/31"),
                    Close = 339.32,
                    Volume = 13457510,
                    Open = 335.8,
                    High = 340.04,
                    Low = 334.3,
                    Symbol = "2. AAPL"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/12/30"),
                    Close = 173.1,
                    Volume = 4279069,
                    Open = 173.36,
                    High = 175.17,
                    Low = 172.49,
                    Symbol = "3. AMZN"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/11/30"),
                    Close = 192.29,
                    Volume = 7700490,
                    Open = 194.76,
                    High = 195.3,
                    Low = 188.75,
                    Symbol = "3. AMZN"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/10/31"),
                    Close = 213.51,
                    Volume = 7336799,
                    Open = 215.79,
                    High = 218.89,
                    Low = 213.04,
                    Symbol = "3. AMZN"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/9/30"),
                    Close = 216.23,
                    Volume = 6549641,
                    Open = 218.19,
                    High = 223,
                    Low = 215.21,
                    Symbol = "3. AMZN"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/8/31"),
                    Close = 215.23,
                    Volume = 7397287,
                    Open = 212.27,
                    High = 216.17,
                    Low = 211.35,
                    Symbol = "3. AMZN"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/7/29"),
                    Close = 222.52,
                    Volume = 5166268,
                    Open = 221.29,
                    High = 225.75,
                    Low = 219.51,
                    Symbol = "3. AMZN"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/6/30"),
                    Close = 204.49,
                    Volume = 4446007,
                    Open = 200.78,
                    High = 205.2,
                    Low = 200.5,
                    Symbol = "3. AMZN"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/5/31"),
                    Close = 196.69,
                    Volume = 3405698,
                    Open = 195.94,
                    High = 198.44,
                    Low = 195.03,
                    Symbol = "3. AMZN"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/4/29"),
                    Close = 195.81,
                    Volume = 5697726,
                    Open = 194.38,
                    High = 196.59,
                    Low = 193.78,
                    Symbol = "3. AMZN"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/3/31"),
                    Close = 180.13,
                    Volume = 4824628,
                    Open = 179.31,
                    High = 181.57,
                    Low = 178.5,
                    Symbol = "3. AMZN"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/2/28"),
                    Close = 173.29,
                    Volume = 6781774,
                    Open = 173.91,
                    High = 175.89,
                    Low = 172.15,
                    Symbol = "3. AMZN"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/1/31"),
                    Close = 169.64,
                    Volume = 6716002,
                    Open = 170.16,
                    High = 171.44,
                    Low = 167.41,
                    Symbol = "3. AMZN"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/12/30"),
                    Close = 645.9,
                    Volume = 1780941,
                    Open = 642.02,
                    High = 646.76,
                    Low = 642.02,
                    Symbol = "1. GOOG"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/11/30"),
                    Close = 599.39,
                    Volume = 3390173,
                    Open = 597.95,
                    High = 599.51,
                    Low = 592.09,
                    Symbol = "1. GOOG"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/10/31"),
                    Close = 592.64,
                    Volume = 2557538,
                    Open = 595.09,
                    High = 599.69,
                    Low = 591.67,
                    Symbol = "1. GOOG"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/9/30"),
                    Close = 515.04,
                    Volume = 2723353,
                    Open = 520.21,
                    High = 524,
                    Low = 514.38,
                    Symbol = "1. GOOG"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/8/31"),
                    Close = 540.96,
                    Volume = 2689989,
                    Open = 544.74,
                    High = 546.3,
                    Low = 536,
                    Symbol = "1. GOOG"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/7/29"),
                    Close = 603.69,
                    Volume = 4133695,
                    Open = 604.23,
                    High = 614.96,
                    Low = 603.69,
                    Symbol = "1. GOOG"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/6/30"),
                    Close = 506.38,
                    Volume = 2427330,
                    Open = 501.99,
                    High = 506.67,
                    Low = 501.5,
                    Symbol = "1. GOOG"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/5/31"),
                    Close = 529.02,
                    Volume = 2685830,
                    Open = 525,
                    High = 529.05,
                    Low = 523.5,
                    Symbol = "1. GOOG"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/4/29"),
                    Close = 544.1,
                    Volume = 3522997,
                    Open = 540,
                    High = 544.1,
                    Low = 538.51,
                    Symbol = "1. GOOG"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/3/31"),
                    Close = 586.76,
                    Volume = 2028228,
                    Open = 583,
                    High = 588.1612,
                    Low = 581.74,
                    Symbol = "1. GOOG"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/2/28"),
                    Close = 613.4,
                    Volume = 2281411,
                    Open = 610,
                    High = 616.49,
                    Low = 608.01,
                    Symbol = "1. GOOG"
                },
                new StockDataPoint {
                    Date = DateTime.Parse("2011/1/31"),
                    Close = 600.36,
                    Volume = 2804332,
                    Open = 603.6,
                    High = 604.47,
                    Low = 595.55,
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
    }
}