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

        public static IEnumerable<StockDataPoint> BoeingStockData()
        {
            return new StockDataPoint[]
            {
                    new StockDataPoint {
        Date = DateTime.Parse("2000/01/03"),
        Open = 41.62,
        High = 41.69,
        Low = 39.81,
        Close = 40.12,
        Volume = 2632000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/04"),
        Open = 39.88,
        High = 41.12,
        Low = 39.75,
        Close = 40.12,
        Volume = 3584700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/05"),
        Open = 42,
        High = 43.31,
        Low = 41.38,
        Close = 42.62,
        Volume = 7631700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/06"),
        Open = 42.25,
        High = 43.44,
        Low = 41.12,
        Close = 43.06,
        Volume = 4922200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/07"),
        Open = 43.88,
        High = 44.88,
        Low = 43.69,
        Close = 44.12,
        Volume = 6008300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/10"),
        Open = 44.31,
        High = 44.5,
        Low = 43.5,
        Close = 43.69,
        Volume = 2400000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/11"),
        Open = 43.38,
        High = 43.94,
        Low = 42.75,
        Close = 42.88,
        Volume = 2450200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/12"),
        Open = 42.75,
        High = 44.19,
        Low = 42.5,
        Close = 43.06,
        Volume = 2326900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/13"),
        Open = 43.31,
        High = 43.38,
        Low = 42,
        Close = 42.38,
        Volume = 3030100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/14"),
        Open = 43.62,
        High = 44.25,
        Low = 42.94,
        Close = 44,
        Volume = 3834900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/18"),
        Open = 43.88,
        High = 45,
        Low = 43.12,
        Close = 45,
        Volume = 5859100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/19"),
        Open = 45.38,
        High = 48.12,
        Low = 45.25,
        Close = 47.62,
        Volume = 11457600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/20"),
        Open = 47.56,
        High = 47.88,
        Low = 45.75,
        Close = 46.5,
        Volume = 8931100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/21"),
        Open = 46.94,
        High = 46.94,
        Low = 45,
        Close = 45.69,
        Volume = 4390000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/24"),
        Open = 45.81,
        High = 46.19,
        Low = 43.62,
        Close = 44.31,
        Volume = 3296200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/25"),
        Open = 45,
        High = 46,
        Low = 44.75,
        Close = 45.69,
        Volume = 5052200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/26"),
        Open = 45.69,
        High = 46.5,
        Low = 45,
        Close = 46.19,
        Volume = 3090100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/27"),
        Open = 46,
        High = 46.88,
        Low = 44.88,
        Close = 45.06,
        Volume = 3329100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/28"),
        Open = 44.81,
        High = 45.62,
        Low = 44.5,
        Close = 44.62,
        Volume = 2258400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/01/31"),
        Open = 44,
        High = 44.56,
        Low = 43.94,
        Close = 44.5,
        Volume = 2340500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/01"),
        Open = 43.88,
        High = 44.19,
        Low = 43.31,
        Close = 43.75,
        Volume = 2670800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/02"),
        Open = 43.38,
        High = 45.19,
        Low = 43.38,
        Close = 44.62,
        Volume = 3295500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/03"),
        Open = 45,
        High = 45.06,
        Low = 43.12,
        Close = 43.44,
        Volume = 2886400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/04"),
        Open = 43.75,
        High = 44.19,
        Low = 42.56,
        Close = 44,
        Volume = 2927200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/07"),
        Open = 43.88,
        High = 43.88,
        Low = 41.69,
        Close = 41.81,
        Volume = 3024400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/08"),
        Open = 41.94,
        High = 42.06,
        Low = 40,
        Close = 41,
        Volume = 5097700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/09"),
        Open = 40.25,
        High = 40.25,
        Low = 38.38,
        Close = 39,
        Volume = 5535800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/10"),
        Open = 38.81,
        High = 40.19,
        Low = 38.75,
        Close = 39.75,
        Volume = 4040600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/11"),
        Open = 39.75,
        High = 40.38,
        Low = 39.12,
        Close = 39.88,
        Volume = 3127800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/14"),
        Open = 39.62,
        High = 39.69,
        Low = 38.06,
        Close = 38.25,
        Volume = 2605900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/15"),
        Open = 38.12,
        High = 38.69,
        Low = 37.38,
        Close = 38.5,
        Volume = 3947800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/16"),
        Open = 37.75,
        High = 37.94,
        Low = 36.88,
        Close = 37.25,
        Volume = 3423000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/17"),
        Open = 37.25,
        High = 37.88,
        Low = 36.56,
        Close = 37.5,
        Volume = 3400500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/18"),
        Open = 37.38,
        High = 37.5,
        Low = 35.88,
        Close = 36,
        Volume = 5536500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/22"),
        Open = 35.94,
        High = 39.94,
        Low = 35.88,
        Close = 38.88,
        Volume = 4768400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/23"),
        Open = 38.62,
        High = 38.69,
        Low = 37.06,
        Close = 37.12,
        Volume = 3880800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/24"),
        Open = 36.88,
        High = 37,
        Low = 35.88,
        Close = 36.56,
        Volume = 4198300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/25"),
        Open = 37.06,
        High = 38,
        Low = 36.81,
        Close = 37.81,
        Volume = 3170600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/28"),
        Open = 37.5,
        High = 37.62,
        Low = 36.56,
        Close = 37,
        Volume = 3573300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/02/29"),
        Open = 37.19,
        High = 37.62,
        Low = 36.12,
        Close = 36.94,
        Volume = 3503100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/01"),
        Open = 36.94,
        High = 36.62,
        Low = 35.94,
        Close = 36.31,
        Volume = 2838000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/02"),
        Open = 35.94,
        High = 37.19,
        Low = 35.38,
        Close = 35.94,
        Volume = 4053200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/03"),
        Open = 35.94,
        High = 36.5,
        Low = 35.69,
        Close = 35.94,
        Volume = 3884100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/06"),
        Open = 35.94,
        High = 36.19,
        Low = 35,
        Close = 35.12,
        Volume = 2879500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/07"),
        Open = 35.12,
        High = 35.12,
        Low = 34.12,
        Close = 34.75,
        Volume = 3565000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/08"),
        Open = 34,
        High = 34.19,
        Low = 33.38,
        Close = 33.38,
        Volume = 4134600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/09"),
        Open = 33.5,
        High = 34.5,
        Low = 33.25,
        Close = 33.75,
        Volume = 3236700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/10"),
        Open = 33.94,
        High = 33.94,
        Low = 32.31,
        Close = 33.25,
        Volume = 5080300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/13"),
        Open = 32.25,
        High = 33.12,
        Low = 32,
        Close = 32.62,
        Volume = 3420200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/14"),
        Open = 32.75,
        High = 33.81,
        Low = 32.44,
        Close = 33.06,
        Volume = 3727900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/15"),
        Open = 32.88,
        High = 35.5,
        Low = 32.81,
        Close = 34.88,
        Volume = 4859300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/16"),
        Open = 35,
        High = 35.94,
        Low = 34.69,
        Close = 35.62,
        Volume = 4725200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/17"),
        Open = 37.25,
        High = 38.94,
        Low = 36,
        Close = 37.19,
        Volume = 15099400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/20"),
        Open = 37.19,
        High = 37.69,
        Low = 36.38,
        Close = 37,
        Volume = 5786400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/21"),
        Open = 37.19,
        High = 37.44,
        Low = 36.19,
        Close = 36.56,
        Volume = 4153400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/22"),
        Open = 36.94,
        High = 37.19,
        Low = 35.75,
        Close = 36.38,
        Volume = 3358600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/23"),
        Open = 35.62,
        High = 35.94,
        Low = 34.81,
        Close = 35.12,
        Volume = 4080400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/24"),
        Open = 36,
        High = 36.44,
        Low = 35.5,
        Close = 36.12,
        Volume = 5797400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/27"),
        Open = 36.25,
        High = 37.31,
        Low = 36.12,
        Close = 37.12,
        Volume = 2534000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/28"),
        Open = 36.94,
        High = 38.19,
        Low = 36.88,
        Close = 38,
        Volume = 5056400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/29"),
        Open = 37.75,
        High = 38.19,
        Low = 37.31,
        Close = 37.88,
        Volume = 2731000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/30"),
        Open = 37.88,
        High = 38.94,
        Low = 37.62,
        Close = 38.62,
        Volume = 3266100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/03/31"),
        Open = 38.75,
        High = 38.81,
        Low = 37.81,
        Close = 37.81,
        Volume = 4630100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/03"),
        Open = 37.75,
        High = 37.75,
        Low = 37.06,
        Close = 37.19,
        Volume = 3234700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/04"),
        Open = 37.38,
        High = 38.25,
        Low = 36.56,
        Close = 37.31,
        Volume = 4002100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/05"),
        Open = 36.88,
        High = 37.25,
        Low = 36,
        Close = 36.06,
        Volume = 2860900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/06"),
        Open = 36,
        High = 36.44,
        Low = 35.62,
        Close = 36.12,
        Volume = 2941900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/07"),
        Open = 36.19,
        High = 36.31,
        Low = 35.38,
        Close = 35.69,
        Volume = 2381600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/10"),
        Open = 35.5,
        High = 35.62,
        Low = 35,
        Close = 35.06,
        Volume = 2452600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/11"),
        Open = 35,
        High = 36.38,
        Low = 35,
        Close = 35.69,
        Volume = 2251100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/12"),
        Open = 35.94,
        High = 38.38,
        Low = 35.88,
        Close = 37.62,
        Volume = 4620200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/13"),
        Open = 37.62,
        High = 37.62,
        Low = 36.5,
        Close = 37,
        Volume = 2916700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/14"),
        Open = 36,
        High = 36.75,
        Low = 34.75,
        Close = 35.38,
        Volume = 3744900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/17"),
        Open = 35.12,
        High = 35.38,
        Low = 34.06,
        Close = 35.31,
        Volume = 3739100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/18"),
        Open = 34.62,
        High = 35.06,
        Low = 34.31,
        Close = 34.75,
        Volume = 3378800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/19"),
        Open = 35.94,
        High = 37.75,
        Low = 35.56,
        Close = 37.25,
        Volume = 5709000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/20"),
        Open = 37.5,
        High = 40.25,
        Low = 37.5,
        Close = 40.06,
        Volume = 8110700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/24"),
        Open = 39.62,
        High = 41.25,
        Low = 37.5,
        Close = 37.88,
        Volume = 10087700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/25"),
        Open = 38.25,
        High = 39.56,
        Low = 38.25,
        Close = 39,
        Volume = 5397100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/26"),
        Open = 39.19,
        High = 40.56,
        Low = 39,
        Close = 39.94,
        Volume = 5338300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/27"),
        Open = 39,
        High = 40.25,
        Low = 38.94,
        Close = 39.81,
        Volume = 3176700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/04/28"),
        Open = 39.62,
        High = 40.06,
        Low = 38.94,
        Close = 39.69,
        Volume = 1853600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/01"),
        Open = 39.69,
        High = 40.19,
        Low = 39,
        Close = 39.06,
        Volume = 2886100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/02"),
        Open = 39.06,
        High = 39.06,
        Low = 37.81,
        Close = 37.94,
        Volume = 2549200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/03"),
        Open = 37.31,
        High = 38.19,
        Low = 36.81,
        Close = 37.31,
        Volume = 3311300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/04"),
        Open = 38.25,
        High = 39.31,
        Low = 37.81,
        Close = 38.19,
        Volume = 2981100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/05"),
        Open = 38,
        High = 39.88,
        Low = 37.94,
        Close = 39.5,
        Volume = 2792900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/08"),
        Open = 39,
        High = 39.5,
        Low = 38.19,
        Close = 38.25,
        Volume = 3146400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/09"),
        Open = 38.5,
        High = 39.19,
        Low = 38.12,
        Close = 38.31,
        Volume = 2567300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/10"),
        Open = 37.75,
        High = 37.94,
        Low = 36.56,
        Close = 36.88,
        Volume = 4820400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/11"),
        Open = 37.12,
        High = 38.19,
        Low = 37.06,
        Close = 37.31,
        Volume = 2887200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/12"),
        Open = 37.62,
        High = 37.62,
        Low = 37.06,
        Close = 37.19,
        Volume = 2453200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/15"),
        Open = 36.62,
        High = 37.5,
        Low = 36.44,
        Close = 37.19,
        Volume = 2913500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/16"),
        Open = 37.19,
        High = 37.88,
        Low = 36.75,
        Close = 37.38,
        Volume = 3815700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/17"),
        Open = 37,
        High = 37.5,
        Low = 36.56,
        Close = 37.38,
        Volume = 2739800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/18"),
        Open = 37.12,
        High = 37.75,
        Low = 37.12,
        Close = 37.62,
        Volume = 2050100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/19"),
        Open = 37,
        High = 37.38,
        Low = 36.25,
        Close = 36.94,
        Volume = 2193900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/22"),
        Open = 37.38,
        High = 37.69,
        Low = 36.25,
        Close = 36.56,
        Volume = 2966000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/23"),
        Open = 36.62,
        High = 37.94,
        Low = 36.62,
        Close = 37.12,
        Volume = 2850600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/24"),
        Open = 37.25,
        High = 39,
        Low = 37.19,
        Close = 38.88,
        Volume = 4642600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/25"),
        Open = 38.62,
        High = 38.69,
        Low = 37.88,
        Close = 38.38,
        Volume = 3027300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/26"),
        Open = 38,
        High = 38.94,
        Low = 38,
        Close = 38.25,
        Volume = 2102100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/30"),
        Open = 38.75,
        High = 39.69,
        Low = 38.56,
        Close = 39.56,
        Volume = 2325300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/05/31"),
        Open = 39.56,
        High = 39.62,
        Low = 39,
        Close = 39.06,
        Volume = 2057000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/01"),
        Open = 39.56,
        High = 39.88,
        Low = 39.31,
        Close = 39.69,
        Volume = 2322400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/02"),
        Open = 40.06,
        High = 40.56,
        Low = 39.5,
        Close = 39.88,
        Volume = 3449500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/05"),
        Open = 39.12,
        High = 39.44,
        Low = 38.56,
        Close = 38.94,
        Volume = 2478000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/06"),
        Open = 39.19,
        High = 40.19,
        Low = 39.06,
        Close = 39.88,
        Volume = 2938800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/07"),
        Open = 39.69,
        High = 40,
        Low = 38.5,
        Close = 38.56,
        Volume = 2520100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/08"),
        Open = 38.5,
        High = 38.62,
        Low = 37.69,
        Close = 38.19,
        Volume = 2481700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/09"),
        Open = 38.75,
        High = 39.69,
        Low = 38.62,
        Close = 39.19,
        Volume = 2714200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/12"),
        Open = 38.62,
        High = 39.06,
        Low = 38.06,
        Close = 38.12,
        Volume = 1551800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/13"),
        Open = 38,
        High = 38.88,
        Low = 37.69,
        Close = 38.81,
        Volume = 2597400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/14"),
        Open = 38.5,
        High = 39.38,
        Low = 38.38,
        Close = 38.81,
        Volume = 2834500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/15"),
        Open = 39.5,
        High = 41,
        Low = 39.25,
        Close = 40.12,
        Volume = 6321600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/16"),
        Open = 40.12,
        High = 40.38,
        Low = 38.81,
        Close = 39.25,
        Volume = 4861000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/19"),
        Open = 39.38,
        High = 39.56,
        Low = 38.56,
        Close = 39,
        Volume = 3950100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/20"),
        Open = 38.88,
        High = 39.69,
        Low = 38.31,
        Close = 39.56,
        Volume = 2824900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/21"),
        Open = 39.44,
        High = 40.12,
        Low = 39.06,
        Close = 39.81,
        Volume = 2531000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/22"),
        Open = 39.75,
        High = 39.94,
        Low = 38.75,
        Close = 38.94,
        Volume = 2102400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/23"),
        Open = 39.5,
        High = 40.12,
        Low = 39.38,
        Close = 39.88,
        Volume = 1984700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/26"),
        Open = 39.5,
        High = 40,
        Low = 39.5,
        Close = 39.75,
        Volume = 2666600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/27"),
        Open = 39.5,
        High = 40.25,
        Low = 39.31,
        Close = 40,
        Volume = 2845500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/28"),
        Open = 40.38,
        High = 41.62,
        Low = 40.25,
        Close = 40.5,
        Volume = 3834100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/29"),
        Open = 40.69,
        High = 41.5,
        Low = 40.5,
        Close = 40.94,
        Volume = 3364100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/06/30"),
        Open = 41,
        High = 42.25,
        Low = 41,
        Close = 41.81,
        Volume = 4694200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/03"),
        Open = 41.62,
        High = 41.94,
        Low = 41.44,
        Close = 41.69,
        Volume = 1232300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/05"),
        Open = 42.12,
        High = 43.38,
        Low = 42.06,
        Close = 42.81,
        Volume = 4990900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/06"),
        Open = 42.88,
        High = 43.19,
        Low = 42.56,
        Close = 43,
        Volume = 3642900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/07"),
        Open = 43.12,
        High = 44.06,
        Low = 43.06,
        Close = 43.75,
        Volume = 4241100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/10"),
        Open = 43.88,
        High = 44,
        Low = 43,
        Close = 43,
        Volume = 2796200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/11"),
        Open = 43.12,
        High = 44.75,
        Low = 43.06,
        Close = 44.31,
        Volume = 3799200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/12"),
        Open = 43.94,
        High = 44.38,
        Low = 43.69,
        Close = 43.88,
        Volume = 2173800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/13"),
        Open = 44.12,
        High = 45,
        Low = 44.12,
        Close = 44.56,
        Volume = 3427700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/14"),
        Open = 44.75,
        High = 45.12,
        Low = 44.31,
        Close = 44.44,
        Volume = 3472100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/17"),
        Open = 44.44,
        High = 44.44,
        Low = 43.44,
        Close = 44,
        Volume = 2465200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/18"),
        Open = 44,
        High = 45.25,
        Low = 43.31,
        Close = 45.12,
        Volume = 4773100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/19"),
        Open = 45,
        High = 46.19,
        Low = 44.06,
        Close = 45.88,
        Volume = 7478900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/20"),
        Open = 46,
        High = 46.25,
        Low = 45.19,
        Close = 46.06,
        Volume = 5032000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/21"),
        Open = 46,
        High = 47.31,
        Low = 45.81,
        Close = 46.81,
        Volume = 7622000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/24"),
        Open = 46.69,
        High = 48.25,
        Low = 46.69,
        Close = 48.12,
        Volume = 5027400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/25"),
        Open = 48,
        High = 50.25,
        Low = 47.88,
        Close = 49.44,
        Volume = 8838400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/26"),
        Open = 49,
        High = 49.44,
        Low = 47.69,
        Close = 48,
        Volume = 5298100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/27"),
        Open = 48.25,
        High = 49.44,
        Low = 48.19,
        Close = 48.25,
        Volume = 3898500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/28"),
        Open = 48.19,
        High = 49.12,
        Low = 47.94,
        Close = 48.81,
        Volume = 3930300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/07/31"),
        Open = 48.5,
        High = 49.25,
        Low = 48.44,
        Close = 49,
        Volume = 4475100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/01"),
        Open = 48.88,
        High = 49.5,
        Low = 48.69,
        Close = 48.69,
        Volume = 3226800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/02"),
        Open = 48.88,
        High = 49.94,
        Low = 48.88,
        Close = 49.88,
        Volume = 4376200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/03"),
        Open = 49.56,
        High = 49.94,
        Low = 48.81,
        Close = 49,
        Volume = 3226900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/04"),
        Open = 49,
        High = 49.12,
        Low = 48.31,
        Close = 49,
        Volume = 2419000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/07"),
        Open = 48.94,
        High = 49.5,
        Low = 48.5,
        Close = 49.06,
        Volume = 2112800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/08"),
        Open = 48.62,
        High = 49.19,
        Low = 48.38,
        Close = 48.56,
        Volume = 3384000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/09"),
        Open = 48.62,
        High = 48.62,
        Low = 47.12,
        Close = 47.75,
        Volume = 4278000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/10"),
        Open = 47.56,
        High = 48.88,
        Low = 47.56,
        Close = 48.88,
        Volume = 2544700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/11"),
        Open = 48.5,
        High = 49.94,
        Low = 48.5,
        Close = 49.62,
        Volume = 3281200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/14"),
        Open = 49.62,
        High = 49.88,
        Low = 49.31,
        Close = 49.5,
        Volume = 2855800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/15"),
        Open = 48.56,
        High = 48.75,
        Low = 47.25,
        Close = 47.25,
        Volume = 3951800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/16"),
        Open = 46.88,
        High = 46.88,
        Low = 45.88,
        Close = 46.56,
        Volume = 6308400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/17"),
        Open = 45.88,
        High = 46.12,
        Low = 45.75,
        Close = 45.88,
        Volume = 2810800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/18"),
        Open = 45.94,
        High = 46.06,
        Low = 45.31,
        Close = 45.69,
        Volume = 4070500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/21"),
        Open = 45.94,
        High = 48.25,
        Low = 45.5,
        Close = 47.75,
        Volume = 4088800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/22"),
        Open = 47.75,
        High = 49.44,
        Low = 47.62,
        Close = 49.31,
        Volume = 4678200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/23"),
        Open = 48.88,
        High = 50.94,
        Low = 48.88,
        Close = 50.56,
        Volume = 6971500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/24"),
        Open = 50.25,
        High = 54,
        Low = 50.19,
        Close = 53.5,
        Volume = 10874700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/25"),
        Open = 53.5,
        High = 54.5,
        Low = 53.38,
        Close = 54.12,
        Volume = 7613400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/28"),
        Open = 54.12,
        High = 54,
        Low = 52.94,
        Close = 53.25,
        Volume = 4938200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/29"),
        Open = 52.94,
        High = 53.12,
        Low = 52.25,
        Close = 52.62,
        Volume = 3984900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/30"),
        Open = 52.12,
        High = 53,
        Low = 51.94,
        Close = 52.5,
        Volume = 3673400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/08/31"),
        Open = 52.25,
        High = 54.88,
        Low = 52.25,
        Close = 53.62,
        Volume = 3758200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/01"),
        Open = 53.81,
        High = 56.25,
        Low = 53.75,
        Close = 54.75,
        Volume = 5087500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/05"),
        Open = 54,
        High = 56.25,
        Low = 54,
        Close = 55.44,
        Volume = 3704900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/06"),
        Open = 55.62,
        High = 58.62,
        Low = 55.56,
        Close = 57.88,
        Volume = 7914100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/07"),
        Open = 57,
        High = 59.94,
        Low = 57,
        Close = 59.38,
        Volume = 10888800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/08"),
        Open = 58.62,
        High = 59,
        Low = 57.62,
        Close = 58.12,
        Volume = 6635000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/11"),
        Open = 57.88,
        High = 59.44,
        Low = 57.69,
        Close = 58.62,
        Volume = 4333700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/12"),
        Open = 58.75,
        High = 60.06,
        Low = 58.12,
        Close = 59,
        Volume = 5625100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/13"),
        Open = 58.88,
        High = 60.12,
        Low = 58.75,
        Close = 59.44,
        Volume = 4063800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/14"),
        Open = 58.88,
        High = 58.88,
        Low = 57.69,
        Close = 58.38,
        Volume = 4237000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/15"),
        Open = 57.88,
        High = 59.19,
        Low = 56.75,
        Close = 56.88,
        Volume = 5781200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/18"),
        Open = 56.75,
        High = 58.56,
        Low = 56.62,
        Close = 56.94,
        Volume = 3178700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/19"),
        Open = 56.62,
        High = 57.56,
        Low = 56.25,
        Close = 56.77,
        Volume = 4220300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/20"),
        Open = 57,
        High = 60.06,
        Low = 56.94,
        Close = 59.06,
        Volume = 6373800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/21"),
        Open = 59.5,
        High = 60.69,
        Low = 59.25,
        Close = 60.12,
        Volume = 6158200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/22"),
        Open = 59.75,
        High = 64.31,
        Low = 59,
        Close = 64,
        Volume = 6829300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/25"),
        Open = 63.75,
        High = 64.31,
        Low = 61.75,
        Close = 63.88,
        Volume = 5338300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/26"),
        Open = 63.12,
        High = 66.94,
        Low = 62.81,
        Close = 66.06,
        Volume = 7064600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/27"),
        Open = 65.75,
        High = 66.5,
        Low = 63.38,
        Close = 65.25,
        Volume = 7533400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/28"),
        Open = 63.88,
        High = 65.38,
        Low = 63.62,
        Close = 64.5,
        Volume = 6704100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/09/29"),
        Open = 62.62,
        High = 63.94,
        Low = 60.62,
        Close = 63.12,
        Volume = 5004300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/02"),
        Open = 61,
        High = 61.25,
        Low = 57.25,
        Close = 58.44,
        Volume = 9275500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/03"),
        Open = 59,
        High = 60.31,
        Low = 59,
        Close = 59.88,
        Volume = 5007200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/04"),
        Open = 59.5,
        High = 62.44,
        Low = 59.5,
        Close = 61.12,
        Volume = 5019900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/05"),
        Open = 61.06,
        High = 63,
        Low = 60.25,
        Close = 61.06,
        Volume = 4016900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/06"),
        Open = 61.19,
        High = 62.19,
        Low = 60.5,
        Close = 61,
        Volume = 3057100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/09"),
        Open = 60.25,
        High = 60.69,
        Low = 59.25,
        Close = 59.44,
        Volume = 2180100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/10"),
        Open = 59.62,
        High = 60.12,
        Low = 59.06,
        Close = 59.56,
        Volume = 2501200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/11"),
        Open = 59,
        High = 61.25,
        Low = 58.81,
        Close = 60.19,
        Volume = 2960800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/12"),
        Open = 59.94,
        High = 60.31,
        Low = 54,
        Close = 56.12,
        Volume = 8935400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/13"),
        Open = 56,
        High = 60.31,
        Low = 55.94,
        Close = 58.75,
        Volume = 4721000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/16"),
        Open = 59.62,
        High = 61.06,
        Low = 59.44,
        Close = 60.19,
        Volume = 2649100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/17"),
        Open = 60.19,
        High = 61.44,
        Low = 58.62,
        Close = 60.5,
        Volume = 2909800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/18"),
        Open = 58.5,
        High = 61.5,
        Low = 58.38,
        Close = 60.75,
        Volume = 4731000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/19"),
        Open = 61,
        High = 61.19,
        Low = 57.31,
        Close = 58.44,
        Volume = 6481600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/20"),
        Open = 58.38,
        High = 60.25,
        Low = 57.81,
        Close = 60,
        Volume = 3795000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/23"),
        Open = 60.5,
        High = 62,
        Low = 60.06,
        Close = 61.25,
        Volume = 5672500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/24"),
        Open = 60.88,
        High = 61.94,
        Low = 60.62,
        Close = 61,
        Volume = 4167200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/25"),
        Open = 61.12,
        High = 63.94,
        Low = 61.12,
        Close = 62.56,
        Volume = 5929900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/26"),
        Open = 62,
        High = 63.62,
        Low = 61.88,
        Close = 63.06,
        Volume = 4459800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/27"),
        Open = 63.06,
        High = 63.81,
        Low = 63,
        Close = 63.75,
        Volume = 2632700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/30"),
        Open = 63.75,
        High = 65.19,
        Low = 63.69,
        Close = 64.69,
        Volume = 4769200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/10/31"),
        Open = 64.69,
        High = 67.88,
        Low = 64.06,
        Close = 67.81,
        Volume = 4694800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/01"),
        Open = 67.56,
        High = 67.75,
        Low = 65.12,
        Close = 65.75,
        Volume = 5574200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/02"),
        Open = 65.38,
        High = 67,
        Low = 63.81,
        Close = 66.12,
        Volume = 5114500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/03"),
        Open = 66.19,
        High = 66.75,
        Low = 65.5,
        Close = 66.12,
        Volume = 2738700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/06"),
        Open = 64.44,
        High = 66.38,
        Low = 64,
        Close = 66,
        Volume = 3576700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/07"),
        Open = 65.5,
        High = 65.94,
        Low = 65.06,
        Close = 65.19,
        Volume = 3025800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/08"),
        Open = 65.19,
        High = 66.12,
        Low = 64.5,
        Close = 65.06,
        Volume = 1595500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/09"),
        Open = 64.88,
        High = 65.94,
        Low = 64.44,
        Close = 65.69,
        Volume = 2047300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/10"),
        Open = 65.44,
        High = 65.75,
        Low = 63.25,
        Close = 63.25,
        Volume = 2847400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/13"),
        Open = 62.12,
        High = 63.62,
        Low = 61.94,
        Close = 62.81,
        Volume = 2943400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/14"),
        Open = 63.06,
        High = 64.81,
        Low = 63.06,
        Close = 64.38,
        Volume = 3553800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/15"),
        Open = 63.75,
        High = 63.81,
        Low = 62.69,
        Close = 63.56,
        Volume = 3089800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/16"),
        Open = 63.56,
        High = 66.38,
        Low = 63.56,
        Close = 65.81,
        Volume = 3557400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/17"),
        Open = 65.75,
        High = 66.81,
        Low = 65.06,
        Close = 65.38,
        Volume = 3517000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/20"),
        Open = 65,
        High = 66.5,
        Low = 65,
        Close = 65.56,
        Volume = 2503900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/21"),
        Open = 65.31,
        High = 69.5,
        Low = 65.31,
        Close = 68.62,
        Volume = 5728600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/22"),
        Open = 68.12,
        High = 68.44,
        Low = 64.88,
        Close = 65.12,
        Volume = 4276000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/24"),
        Open = 66,
        High = 66.81,
        Low = 65.56,
        Close = 65.69,
        Volume = 1122400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/27"),
        Open = 67,
        High = 68,
        Low = 67,
        Close = 67.38,
        Volume = 2771400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/28"),
        Open = 67.31,
        High = 68.19,
        Low = 66.25,
        Close = 67.5,
        Volume = 3243900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/29"),
        Open = 66.44,
        High = 70,
        Low = 66.19,
        Close = 69.88,
        Volume = 6369100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/11/30"),
        Open = 69.44,
        High = 69.69,
        Low = 67.56,
        Close = 68.75,
        Volume = 4245000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/01"),
        Open = 68.69,
        High = 68.69,
        Low = 65.19,
        Close = 65.81,
        Volume = 4420400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/04"),
        Open = 65.81,
        High = 65.81,
        Low = 63.69,
        Close = 64.69,
        Volume = 5188000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/05"),
        Open = 65.94,
        High = 70.19,
        Low = 64.5,
        Close = 68.94,
        Volume = 6329000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/06"),
        Open = 68.94,
        High = 69.44,
        Low = 66.81,
        Close = 67.32,
        Volume = 4597700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/07"),
        Open = 67.12,
        High = 68.12,
        Low = 66.81,
        Close = 66.81,
        Volume = 2295400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/08"),
        Open = 67.56,
        High = 70.94,
        Low = 67.38,
        Close = 67.38,
        Volume = 5175200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/11"),
        Open = 69.69,
        High = 70.62,
        Low = 68.38,
        Close = 68.38,
        Volume = 3799000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/12"),
        Open = 68.12,
        High = 70.44,
        Low = 68.12,
        Close = 69.12,
        Volume = 3164500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/13"),
        Open = 68.75,
        High = 69.81,
        Low = 67.75,
        Close = 67.88,
        Volume = 2366600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/14"),
        Open = 67.38,
        High = 68.94,
        Low = 66.5,
        Close = 67.25,
        Volume = 3319700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/15"),
        Open = 65.88,
        High = 66.69,
        Low = 64.75,
        Close = 64.88,
        Volume = 6202400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/18"),
        Open = 66,
        High = 69.94,
        Low = 66,
        Close = 68.5,
        Volume = 4228800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/19"),
        Open = 67.88,
        High = 68.62,
        Low = 66.12,
        Close = 66.38,
        Volume = 4316000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/20"),
        Open = 66.12,
        High = 66.44,
        Low = 64.06,
        Close = 65,
        Volume = 4035600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/21"),
        Open = 64.75,
        High = 65,
        Low = 62.56,
        Close = 64.62,
        Volume = 4724400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/22"),
        Open = 64.19,
        High = 65,
        Low = 61.44,
        Close = 63.44,
        Volume = 4071700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/26"),
        Open = 63.88,
        High = 64.5,
        Low = 62.25,
        Close = 63,
        Volume = 2366500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/27"),
        Open = 62.25,
        High = 64.88,
        Low = 62.25,
        Close = 64.06,
        Volume = 2723600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/28"),
        Open = 64,
        High = 67,
        Low = 63.75,
        Close = 65.44,
        Volume = 2486100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2000/12/29"),
        Open = 65.88,
        High = 66.75,
        Low = 65.62,
        Close = 66,
        Volume = 2553400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/02"),
        Open = 64.88,
        High = 65.31,
        Low = 60.56,
        Close = 62,
        Volume = 3762200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/03"),
        Open = 60.75,
        High = 63.75,
        Low = 59.19,
        Close = 62.56,
        Volume = 6428500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/04"),
        Open = 64,
        High = 64.19,
        Low = 60.25,
        Close = 61,
        Volume = 3841100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/05"),
        Open = 61.38,
        High = 61.5,
        Low = 58.12,
        Close = 58.75,
        Volume = 3758500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/08"),
        Open = 58.75,
        High = 60.5,
        Low = 58.69,
        Close = 59,
        Volume = 3012100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/09"),
        Open = 59,
        High = 59,
        Low = 57.19,
        Close = 58.94,
        Volume = 4356700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/10"),
        Open = 58.38,
        High = 60.88,
        Low = 58.31,
        Close = 60.38,
        Volume = 3659600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/11"),
        Open = 60,
        High = 60.75,
        Low = 59,
        Close = 59.12,
        Volume = 3371000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/12"),
        Open = 59.56,
        High = 60.69,
        Low = 58.56,
        Close = 60.62,
        Volume = 3150700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/16"),
        Open = 59.94,
        High = 61.62,
        Low = 59.5,
        Close = 61,
        Volume = 3268200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/17"),
        Open = 62.44,
        High = 62.69,
        Low = 58.25,
        Close = 58.75,
        Volume = 6605200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/18"),
        Open = 56.5,
        High = 58,
        Low = 55.62,
        Close = 57.38,
        Volume = 6044500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/19"),
        Open = 57.38,
        High = 57.44,
        Low = 55.5,
        Close = 55.69,
        Volume = 4295900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/22"),
        Open = 56.31,
        High = 56.88,
        Low = 55.69,
        Close = 56,
        Volume = 3604000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/23"),
        Open = 56.94,
        High = 58,
        Low = 56.19,
        Close = 57.5,
        Volume = 4417100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/24"),
        Open = 56.88,
        High = 58,
        Low = 56.88,
        Close = 57.44,
        Volume = 2997300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/25"),
        Open = 56.5,
        High = 59.69,
        Low = 56.5,
        Close = 59.25,
        Volume = 3683300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/26"),
        Open = 58.75,
        High = 59.69,
        Low = 57.5,
        Close = 58.06,
        Volume = 2299000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/29"),
        Open = 57.7,
        High = 57.99,
        Low = 56.31,
        Close = 56.46,
        Volume = 2357500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/30"),
        Open = 56.46,
        High = 56.59,
        Low = 54.56,
        Close = 56.15,
        Volume = 3650100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/01/31"),
        Open = 56.5,
        High = 58.91,
        Low = 56.5,
        Close = 58.5,
        Volume = 3614600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/01"),
        Open = 58,
        High = 58.5,
        Low = 56.06,
        Close = 56.52,
        Volume = 4099000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/02"),
        Open = 56.97,
        High = 57.5,
        Low = 56.04,
        Close = 56.85,
        Volume = 2121700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/05"),
        Open = 56.73,
        High = 58.04,
        Low = 56.42,
        Close = 57.93,
        Volume = 2188100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/06"),
        Open = 57.88,
        High = 58.46,
        Low = 56.47,
        Close = 56.73,
        Volume = 2353100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/07"),
        Open = 56.95,
        High = 57.89,
        Low = 56.65,
        Close = 57.45,
        Volume = 2182900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/08"),
        Open = 57.35,
        High = 58.26,
        Low = 57.12,
        Close = 57.51,
        Volume = 2777000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/09"),
        Open = 57.7,
        High = 58.17,
        Low = 56.78,
        Close = 57.34,
        Volume = 1997200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/12"),
        Open = 58.65,
        High = 59.1,
        Low = 58.21,
        Close = 59.07,
        Volume = 2875500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/13"),
        Open = 59.09,
        High = 61.38,
        Low = 59.09,
        Close = 60.72,
        Volume = 4984900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/14"),
        Open = 61.72,
        High = 61.94,
        Low = 60.34,
        Close = 60.59,
        Volume = 3684200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/15"),
        Open = 60.59,
        High = 60.76,
        Low = 58.84,
        Close = 60.15,
        Volume = 2531900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/16"),
        Open = 59.8,
        High = 60.61,
        Low = 59.63,
        Close = 59.99,
        Volume = 2933600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/20"),
        Open = 60.35,
        High = 62.8,
        Low = 60.15,
        Close = 61.85,
        Volume = 3139500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/21"),
        Open = 61.85,
        High = 62.38,
        Low = 60.15,
        Close = 60.2,
        Volume = 2286300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/22"),
        Open = 60.2,
        High = 62.23,
        Low = 60.2,
        Close = 61.28,
        Volume = 2767600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/23"),
        Open = 60.98,
        High = 61.75,
        Low = 60.55,
        Close = 61.61,
        Volume = 2266900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/26"),
        Open = 61.45,
        High = 62.97,
        Low = 61.02,
        Close = 62.76,
        Volume = 1854600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/27"),
        Open = 62.3,
        High = 63.9,
        Low = 62,
        Close = 63.7,
        Volume = 2993000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/02/28"),
        Open = 63.8,
        High = 63.83,
        Low = 61.99,
        Close = 62.2,
        Volume = 3051400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/01"),
        Open = 61.85,
        High = 61.86,
        Low = 58.6,
        Close = 59.65,
        Volume = 4225700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/02"),
        Open = 59.55,
        High = 61.45,
        Low = 58.3,
        Close = 60.1,
        Volume = 3763900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/05"),
        Open = 59.9,
        High = 62.15,
        Low = 59.88,
        Close = 61.91,
        Volume = 2814700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/06"),
        Open = 62.05,
        High = 62.59,
        Low = 61.29,
        Close = 62.13,
        Volume = 2783400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/07"),
        Open = 61.95,
        High = 64.21,
        Low = 61.87,
        Close = 64.1,
        Volume = 3475400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/08"),
        Open = 64,
        High = 65.2,
        Low = 63.55,
        Close = 64.75,
        Volume = 4224600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/09"),
        Open = 64.45,
        High = 65.6,
        Low = 64.2,
        Close = 65.5,
        Volume = 2716600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/12"),
        Open = 64.2,
        High = 64.32,
        Low = 60.96,
        Close = 61,
        Volume = 4269900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/13"),
        Open = 62.01,
        High = 62.99,
        Low = 60.06,
        Close = 60.57,
        Volume = 4786300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/14"),
        Open = 59.5,
        High = 59.51,
        Low = 56.83,
        Close = 58.02,
        Volume = 5983800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/15"),
        Open = 58.02,
        High = 58.02,
        Low = 55.51,
        Close = 56.1,
        Volume = 5136800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/16"),
        Open = 55.63,
        High = 56.2,
        Low = 52.85,
        Close = 53.75,
        Volume = 10933600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/19"),
        Open = 54.57,
        High = 56.25,
        Low = 53.75,
        Close = 56.02,
        Volume = 6143200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/20"),
        Open = 56.6,
        High = 57.19,
        Low = 54.76,
        Close = 55,
        Volume = 4359800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/21"),
        Open = 54.6,
        High = 55.4,
        Low = 53.2,
        Close = 53.85,
        Volume = 3758400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/22"),
        Open = 53.1,
        High = 53.35,
        Low = 49.7,
        Close = 52,
        Volume = 6600400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/23"),
        Open = 52.75,
        High = 53.44,
        Low = 51.6,
        Close = 53,
        Volume = 4632300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/26"),
        Open = 53.55,
        High = 56.17,
        Low = 53.55,
        Close = 55.44,
        Volume = 4778800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/27"),
        Open = 55.31,
        High = 56.24,
        Low = 54.25,
        Close = 55.2,
        Volume = 3634200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/28"),
        Open = 54.6,
        High = 55.18,
        Low = 51.85,
        Close = 55,
        Volume = 2861600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/29"),
        Open = 54.55,
        High = 56.3,
        Low = 54.25,
        Close = 55.95,
        Volume = 2814300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/03/30"),
        Open = 55.4,
        High = 57.27,
        Low = 55.31,
        Close = 55.71,
        Volume = 3741200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/02"),
        Open = 55.4,
        High = 56.6,
        Low = 54.53,
        Close = 55.02,
        Volume = 3182300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/03"),
        Open = 55.45,
        High = 55.45,
        Low = 54.11,
        Close = 54.61,
        Volume = 3337500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/04"),
        Open = 54.5,
        High = 55.2,
        Low = 53.92,
        Close = 54.63,
        Volume = 2953500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/05"),
        Open = 56,
        High = 57.5,
        Low = 55.84,
        Close = 56.81,
        Volume = 2703000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/06"),
        Open = 56,
        High = 56.65,
        Low = 55.32,
        Close = 55.98,
        Volume = 2768100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/09"),
        Open = 56.05,
        High = 57.74,
        Low = 56,
        Close = 56.87,
        Volume = 2547300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/10"),
        Open = 58.1,
        High = 60.19,
        Low = 57.83,
        Close = 59.82,
        Volume = 4478700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/11"),
        Open = 60.57,
        High = 61,
        Low = 58.5,
        Close = 59.12,
        Volume = 3979200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/12"),
        Open = 58.95,
        High = 60.5,
        Low = 58.62,
        Close = 60.5,
        Volume = 1607100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/16"),
        Open = 60.25,
        High = 60.98,
        Low = 59.18,
        Close = 59.75,
        Volume = 2145500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/17"),
        Open = 59.75,
        High = 60.6,
        Low = 59,
        Close = 60.6,
        Volume = 2257400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/18"),
        Open = 60.85,
        High = 63.73,
        Low = 60.7,
        Close = 61.3,
        Volume = 3076500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/19"),
        Open = 61.48,
        High = 61.62,
        Low = 59.55,
        Close = 60.63,
        Volume = 3549200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/20"),
        Open = 61.9,
        High = 64.91,
        Low = 60.5,
        Close = 61.7,
        Volume = 7126900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/23"),
        Open = 60.9,
        High = 61.28,
        Low = 59.61,
        Close = 60.14,
        Volume = 4319700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/24"),
        Open = 60,
        High = 62.13,
        Low = 60,
        Close = 60.8,
        Volume = 3076600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/25"),
        Open = 59.95,
        High = 60.41,
        Low = 59.9,
        Close = 60.34,
        Volume = 3494100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/26"),
        Open = 60.09,
        High = 61.2,
        Low = 59.77,
        Close = 60.98,
        Volume = 2992200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/27"),
        Open = 60.92,
        High = 61.8,
        Low = 60.84,
        Close = 61.61,
        Volume = 2178600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/04/30"),
        Open = 62.4,
        High = 64.16,
        Low = 61.8,
        Close = 61.8,
        Volume = 3052800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/01"),
        Open = 62.7,
        High = 64.48,
        Low = 62.7,
        Close = 63.43,
        Volume = 4772100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/02"),
        Open = 63.68,
        High = 64.3,
        Low = 63.25,
        Close = 64,
        Volume = 3346200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/03"),
        Open = 63.75,
        High = 64.2,
        Low = 62.71,
        Close = 64,
        Volume = 2168500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/04"),
        Open = 63.15,
        High = 65,
        Low = 63,
        Close = 64.5,
        Volume = 2390700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/07"),
        Open = 64.7,
        High = 65.27,
        Low = 64.25,
        Close = 64.69,
        Volume = 2149200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/08"),
        Open = 64.5,
        High = 65.2,
        Low = 64.3,
        Close = 64.63,
        Volume = 2663000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/09"),
        Open = 64.05,
        High = 65.51,
        Low = 64,
        Close = 65,
        Volume = 2351300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/10"),
        Open = 65.55,
        High = 66,
        Low = 65.16,
        Close = 65.95,
        Volume = 2437300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/11"),
        Open = 65.97,
        High = 66.43,
        Low = 65.3,
        Close = 66.01,
        Volume = 1659000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/14"),
        Open = 66,
        High = 66.75,
        Low = 65.87,
        Close = 66.74,
        Volume = 1399700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/15"),
        Open = 66.02,
        High = 66.7,
        Low = 65.44,
        Close = 66.59,
        Volume = 2583000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/16"),
        Open = 66.6,
        High = 66.75,
        Low = 65.65,
        Close = 66.75,
        Volume = 3985800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/17"),
        Open = 66.75,
        High = 69.85,
        Low = 66.56,
        Close = 68.79,
        Volume = 6049300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/18"),
        Open = 68.79,
        High = 68.9,
        Low = 67.97,
        Close = 68.35,
        Volume = 3360700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/21"),
        Open = 67.9,
        High = 68.75,
        Low = 67.87,
        Close = 68.69,
        Volume = 1554000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/22"),
        Open = 68.1,
        High = 68.95,
        Low = 67.5,
        Close = 68,
        Volume = 2810100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/23"),
        Open = 67.4,
        High = 67.65,
        Low = 66,
        Close = 66,
        Volume = 3684300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/24"),
        Open = 66.2,
        High = 67.46,
        Low = 64.05,
        Close = 65.2,
        Volume = 4250300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/25"),
        Open = 64.9,
        High = 64.9,
        Low = 62.9,
        Close = 63.33,
        Volume = 3136600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/29"),
        Open = 63.5,
        High = 63.9,
        Low = 63.2,
        Close = 63.53,
        Volume = 2271400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/30"),
        Open = 63.57,
        High = 63.95,
        Low = 62.8,
        Close = 63.05,
        Volume = 3197700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/05/31"),
        Open = 63.3,
        High = 63.4,
        Low = 62.33,
        Close = 62.89,
        Volume = 2652800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/01"),
        Open = 63,
        High = 65.57,
        Low = 62.9,
        Close = 65,
        Volume = 3300300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/04"),
        Open = 64.9,
        High = 66.7,
        Low = 64.9,
        Close = 66.03,
        Volume = 2464100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/05"),
        Open = 67.03,
        High = 67.55,
        Low = 66.7,
        Close = 66.93,
        Volume = 3384100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/06"),
        Open = 66.15,
        High = 66.26,
        Low = 65.72,
        Close = 66.1,
        Volume = 3492100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/07"),
        Open = 65.95,
        High = 66.06,
        Low = 65.12,
        Close = 65.65,
        Volume = 2176200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/08"),
        Open = 65.62,
        High = 65.62,
        Low = 64.1,
        Close = 64.59,
        Volume = 2250000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/11"),
        Open = 64.59,
        High = 64.75,
        Low = 63.67,
        Close = 64.5,
        Volume = 1662300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/12"),
        Open = 64.3,
        High = 66.14,
        Low = 64.2,
        Close = 65.71,
        Volume = 3072300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/13"),
        Open = 65.6,
        High = 66.49,
        Low = 65.4,
        Close = 65.49,
        Volume = 2161500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/14"),
        Open = 65.49,
        High = 65.49,
        Low = 63.32,
        Close = 63.56,
        Volume = 3703600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/15"),
        Open = 63.8,
        High = 64.51,
        Low = 63.72,
        Close = 64.25,
        Volume = 5569400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/18"),
        Open = 64.85,
        High = 64.99,
        Low = 64.41,
        Close = 64.88,
        Volume = 2421700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/19"),
        Open = 64.7,
        High = 64.88,
        Low = 61.54,
        Close = 61.8,
        Volume = 4503100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/20"),
        Open = 61.8,
        High = 62.85,
        Low = 60.38,
        Close = 61.11,
        Volume = 5948800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/21"),
        Open = 60,
        High = 60,
        Low = 56.7,
        Close = 57.75,
        Volume = 9704900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/22"),
        Open = 57.75,
        High = 57.88,
        Low = 55.4,
        Close = 57,
        Volume = 6128000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/25"),
        Open = 56.95,
        High = 57.78,
        Low = 56.39,
        Close = 56.96,
        Volume = 5424700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/26"),
        Open = 56.7,
        High = 57.82,
        Low = 56.05,
        Close = 57.02,
        Volume = 4629500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/27"),
        Open = 57.02,
        High = 58.04,
        Low = 56.88,
        Close = 57.7,
        Volume = 3117600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/28"),
        Open = 57.3,
        High = 58.38,
        Low = 56.88,
        Close = 57.24,
        Volume = 4013600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/06/29"),
        Open = 56.89,
        High = 57.5,
        Low = 55.58,
        Close = 55.6,
        Volume = 4835700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/02"),
        Open = 56.6,
        High = 57.22,
        Low = 56.3,
        Close = 56.36,
        Volume = 3338500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/03"),
        Open = 56.36,
        High = 57.06,
        Low = 56.15,
        Close = 56.33,
        Volume = 2202300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/05"),
        Open = 56.7,
        High = 56.72,
        Low = 55.15,
        Close = 55.23,
        Volume = 3139100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/06"),
        Open = 55.05,
        High = 55.48,
        Low = 53.77,
        Close = 54.3,
        Volume = 4104200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/09"),
        Open = 53.85,
        High = 54.02,
        Low = 52.55,
        Close = 52.83,
        Volume = 5520600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/10"),
        Open = 53.73,
        High = 54.62,
        Low = 53.19,
        Close = 54.15,
        Volume = 4709600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/11"),
        Open = 54,
        High = 54.21,
        Low = 52.9,
        Close = 52.9,
        Volume = 3299200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/12"),
        Open = 53.4,
        High = 54.79,
        Low = 53.26,
        Close = 54.5,
        Volume = 3217400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/13"),
        Open = 54.49,
        High = 55.21,
        Low = 53.77,
        Close = 55.07,
        Volume = 1637700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/16"),
        Open = 54.62,
        High = 55.39,
        Low = 54.08,
        Close = 55.28,
        Volume = 1945300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/17"),
        Open = 55.4,
        High = 56.72,
        Low = 55.4,
        Close = 56.3,
        Volume = 3840900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/18"),
        Open = 57.6,
        High = 57.6,
        Low = 55.05,
        Close = 57.13,
        Volume = 5454100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/19"),
        Open = 57.41,
        High = 57.95,
        Low = 55.7,
        Close = 56.39,
        Volume = 3427100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/20"),
        Open = 56.39,
        High = 57.15,
        Low = 56.27,
        Close = 56.79,
        Volume = 1834100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/23"),
        Open = 57.09,
        High = 57.25,
        Low = 56.05,
        Close = 56.25,
        Volume = 2119300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/24"),
        Open = 56.6,
        High = 56.6,
        Low = 55.19,
        Close = 55.26,
        Volume = 2174700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/25"),
        Open = 55.96,
        High = 56.85,
        Low = 55.82,
        Close = 56.67,
        Volume = 1581100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/26"),
        Open = 56.55,
        High = 58.18,
        Low = 56.52,
        Close = 58.11,
        Volume = 2309300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/27"),
        Open = 57.95,
        High = 58.9,
        Low = 57.95,
        Close = 58.14,
        Volume = 2611900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/30"),
        Open = 58.64,
        High = 58.9,
        Low = 57.4,
        Close = 57.4,
        Volume = 2613500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/07/31"),
        Open = 57.2,
        High = 58.79,
        Low = 57.12,
        Close = 58.53,
        Volume = 2612700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/01"),
        Open = 58.65,
        High = 59.34,
        Low = 58.52,
        Close = 59,
        Volume = 2174400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/02"),
        Open = 59.5,
        High = 59.75,
        Low = 58.32,
        Close = 58.82,
        Volume = 2348200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/03"),
        Open = 58.82,
        High = 59.25,
        Low = 58.56,
        Close = 59.21,
        Volume = 1946300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/06"),
        Open = 59,
        High = 59.8,
        Low = 58.34,
        Close = 58.4,
        Volume = 2721600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/07"),
        Open = 57.44,
        High = 57.73,
        Low = 56.5,
        Close = 57.5,
        Volume = 4131100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/08"),
        Open = 57.15,
        High = 57.68,
        Low = 56.32,
        Close = 56.61,
        Volume = 2982800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/09"),
        Open = 56.51,
        High = 57.04,
        Low = 55.88,
        Close = 56.36,
        Volume = 3755500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/10"),
        Open = 56.51,
        High = 56.93,
        Low = 56.11,
        Close = 56.85,
        Volume = 2330500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/13"),
        Open = 56.55,
        High = 57.24,
        Low = 56.15,
        Close = 56.45,
        Volume = 1590500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/14"),
        Open = 56.45,
        High = 56.7,
        Low = 55.85,
        Close = 55.89,
        Volume = 2119000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/15"),
        Open = 55.55,
        High = 56.1,
        Low = 54.39,
        Close = 54.44,
        Volume = 3311300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/16"),
        Open = 54.1,
        High = 55.13,
        Low = 53.79,
        Close = 55.13,
        Volume = 2957000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/17"),
        Open = 55,
        High = 55,
        Low = 53.4,
        Close = 54,
        Volume = 2412300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/20"),
        Open = 53.75,
        High = 53.8,
        Low = 52.8,
        Close = 53.34,
        Volume = 3228000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/21"),
        Open = 53.27,
        High = 53.31,
        Low = 51.94,
        Close = 51.94,
        Volume = 3330300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/22"),
        Open = 51.94,
        High = 52.6,
        Low = 51.78,
        Close = 52.3,
        Volume = 4189500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/23"),
        Open = 52.1,
        High = 52.5,
        Low = 52,
        Close = 52.17,
        Volume = 1561600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/24"),
        Open = 52.34,
        High = 53.95,
        Low = 52.3,
        Close = 53.63,
        Volume = 2352500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/27"),
        Open = 53.91,
        High = 53.91,
        Low = 53.01,
        Close = 53.06,
        Volume = 1694300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/28"),
        Open = 53,
        High = 53.21,
        Low = 51.55,
        Close = 51.65,
        Volume = 4484300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/29"),
        Open = 51.8,
        High = 52,
        Low = 50.51,
        Close = 50.7,
        Volume = 3533500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/30"),
        Open = 50.7,
        High = 51.15,
        Low = 50.17,
        Close = 50.5,
        Volume = 2518100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/08/31"),
        Open = 50.5,
        High = 51.2,
        Low = 50.26,
        Close = 51.2,
        Volume = 1887700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/04"),
        Open = 49.75,
        High = 51.97,
        Low = 49.45,
        Close = 49.95,
        Volume = 3242700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/05"),
        Open = 50.2,
        High = 51.25,
        Low = 49.9,
        Close = 50.61,
        Volume = 3354600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/06"),
        Open = 50.1,
        High = 50.45,
        Low = 48.45,
        Close = 48.84,
        Volume = 3921700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/07"),
        Open = 47.8,
        High = 48,
        Low = 44.79,
        Close = 45.18,
        Volume = 8114600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/10"),
        Open = 44.9,
        High = 45.95,
        Low = 43.46,
        Close = 43.46,
        Volume = 6366000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/17"),
        Open = 35.65,
        High = 38.7,
        Low = 35.45,
        Close = 35.8,
        Volume = 21271800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/18"),
        Open = 35.8,
        High = 36.16,
        Low = 32,
        Close = 33.14,
        Volume = 16785400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/19"),
        Open = 32,
        High = 33.81,
        Low = 31.93,
        Close = 32.61,
        Volume = 15143500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/20"),
        Open = 32.03,
        High = 32.24,
        Low = 29.75,
        Close = 29.76,
        Volume = 12001700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/21"),
        Open = 28.25,
        High = 30.3,
        Low = 27.6,
        Close = 30.1,
        Volume = 13515700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/24"),
        Open = 30.09,
        High = 33.39,
        Low = 30.09,
        Close = 32.8,
        Volume = 14100500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/25"),
        Open = 33.25,
        High = 34.48,
        Low = 32.76,
        Close = 34.33,
        Volume = 10206200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/26"),
        Open = 34.55,
        High = 34.65,
        Low = 33.35,
        Close = 34.29,
        Volume = 6333100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/27"),
        Open = 33.9,
        High = 34.59,
        Low = 32.1,
        Close = 34.4,
        Volume = 8984400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/09/28"),
        Open = 34.41,
        High = 34.41,
        Low = 32.9,
        Close = 33.5,
        Volume = 6773200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/01"),
        Open = 33.5,
        High = 34.25,
        Low = 32.05,
        Close = 32.4,
        Volume = 6785800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/02"),
        Open = 33.48,
        High = 34.48,
        Low = 33.13,
        Close = 34.25,
        Volume = 7077600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/03"),
        Open = 34.51,
        High = 37.52,
        Low = 34.4,
        Close = 36.59,
        Volume = 8575200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/04"),
        Open = 36.59,
        High = 36.88,
        Low = 35.25,
        Close = 36.38,
        Volume = 6449600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/05"),
        Open = 36.5,
        High = 37.04,
        Low = 34.95,
        Close = 36.26,
        Volume = 3969300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/08"),
        Open = 36.2,
        High = 37.64,
        Low = 35.94,
        Close = 36.62,
        Volume = 5168500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/09"),
        Open = 36.9,
        High = 36.97,
        Low = 35.62,
        Close = 36,
        Volume = 3430000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/10"),
        Open = 36.05,
        High = 36.59,
        Low = 35.4,
        Close = 35.76,
        Volume = 4520100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/11"),
        Open = 35.9,
        High = 36.69,
        Low = 35.89,
        Close = 36.18,
        Volume = 5032400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/12"),
        Open = 36.01,
        High = 36.01,
        Low = 34.9,
        Close = 35.9,
        Volume = 5104200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/15"),
        Open = 35.6,
        High = 35.75,
        Low = 34.78,
        Close = 35.27,
        Volume = 4321400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/16"),
        Open = 35.27,
        High = 35.55,
        Low = 34.88,
        Close = 35.12,
        Volume = 3414200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/17"),
        Open = 35.3,
        High = 35.45,
        Low = 33.51,
        Close = 33.7,
        Volume = 4086900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/18"),
        Open = 33.95,
        High = 34.08,
        Low = 32.51,
        Close = 32.86,
        Volume = 5470200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/19"),
        Open = 33.36,
        High = 33.75,
        Low = 32.8,
        Close = 33.45,
        Volume = 3229100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/22"),
        Open = 33.8,
        High = 34.6,
        Low = 33.54,
        Close = 33.7,
        Volume = 3397400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/23"),
        Open = 34.02,
        High = 34.55,
        Low = 33.8,
        Close = 33.89,
        Volume = 3913200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/24"),
        Open = 34.65,
        High = 34.96,
        Low = 33.99,
        Close = 34.24,
        Volume = 3793600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/25"),
        Open = 34.1,
        High = 35.95,
        Low = 33.63,
        Close = 35.9,
        Volume = 5191300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/26"),
        Open = 36.1,
        High = 39.78,
        Low = 36.05,
        Close = 37.68,
        Volume = 11355900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/29"),
        Open = 35.88,
        High = 35.9,
        Low = 33.5,
        Close = 33.75,
        Volume = 9998000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/30"),
        Open = 33.65,
        High = 34.19,
        Low = 33.03,
        Close = 33.03,
        Volume = 5452000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/10/31"),
        Open = 33.05,
        High = 33.55,
        Low = 32.42,
        Close = 32.6,
        Volume = 4579900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/01"),
        Open = 32.5,
        High = 33.5,
        Low = 32.31,
        Close = 33.19,
        Volume = 4548600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/02"),
        Open = 33.49,
        High = 34.55,
        Low = 33.21,
        Close = 34.35,
        Volume = 4514400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/05"),
        Open = 35,
        High = 35.52,
        Low = 34.6,
        Close = 35.05,
        Volume = 4348800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/06"),
        Open = 34.9,
        High = 35.74,
        Low = 34.3,
        Close = 35.52,
        Volume = 3369400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/07"),
        Open = 35.23,
        High = 35.52,
        Low = 34.77,
        Close = 34.89,
        Volume = 2974200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/08"),
        Open = 35,
        High = 35.75,
        Low = 34.6,
        Close = 34.9,
        Volume = 2824000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/09"),
        Open = 35.14,
        High = 35.22,
        Low = 32.8,
        Close = 33.24,
        Volume = 13757400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/12"),
        Open = 33,
        High = 33.28,
        Low = 31.58,
        Close = 33.06,
        Volume = 6317800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/13"),
        Open = 33.95,
        High = 33.96,
        Low = 33.2,
        Close = 33.61,
        Volume = 3116300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/14"),
        Open = 33.95,
        High = 34.25,
        Low = 33.64,
        Close = 34.1,
        Volume = 3688900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/15"),
        Open = 34.1,
        High = 34.55,
        Low = 34.08,
        Close = 34.24,
        Volume = 2804800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/16"),
        Open = 34.8,
        High = 35.01,
        Low = 34.6,
        Close = 34.99,
        Volume = 3898100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/19"),
        Open = 35.01,
        High = 35.45,
        Low = 34.7,
        Close = 35.1,
        Volume = 3802300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/20"),
        Open = 35.2,
        High = 35.2,
        Low = 34.86,
        Close = 34.97,
        Volume = 3414800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/21"),
        Open = 34.97,
        High = 34.97,
        Low = 34.34,
        Close = 34.7,
        Volume = 1779400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/23"),
        Open = 35.09,
        High = 35.65,
        Low = 34.9,
        Close = 35.63,
        Volume = 1156100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/26"),
        Open = 36,
        High = 36.15,
        Low = 35.6,
        Close = 35.89,
        Volume = 3379300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/27"),
        Open = 36.15,
        High = 36.25,
        Low = 35.15,
        Close = 35.5,
        Volume = 3342500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/28"),
        Open = 35.14,
        High = 35.14,
        Low = 33.95,
        Close = 34.17,
        Volume = 3838700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/29"),
        Open = 34.7,
        High = 35.2,
        Low = 34.31,
        Close = 35.15,
        Volume = 3436100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/11/30"),
        Open = 34.95,
        High = 35.1,
        Low = 34.6,
        Close = 35.1,
        Volume = 3518500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/03"),
        Open = 35.1,
        High = 35.1,
        Low = 34.03,
        Close = 35,
        Volume = 3087700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/04"),
        Open = 35.01,
        High = 35.39,
        Low = 34.8,
        Close = 35.38,
        Volume = 3197400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/05"),
        Open = 35.5,
        High = 36.22,
        Low = 35.43,
        Close = 35.89,
        Volume = 4645300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/06"),
        Open = 36.18,
        High = 37.2,
        Low = 36.06,
        Close = 37.11,
        Volume = 6264700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/07"),
        Open = 37.4,
        High = 37.55,
        Low = 36.6,
        Close = 37.3,
        Volume = 4492300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/10"),
        Open = 37.32,
        High = 38.29,
        Low = 36.71,
        Close = 36.9,
        Volume = 3828600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/11"),
        Open = 37.2,
        High = 37.65,
        Low = 36.65,
        Close = 37.07,
        Volume = 2878600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/12"),
        Open = 37.3,
        High = 37.3,
        Low = 36.66,
        Close = 36.8,
        Volume = 3968200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/13"),
        Open = 36.45,
        High = 37.8,
        Low = 36,
        Close = 37,
        Volume = 2711200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/14"),
        Open = 37.15,
        High = 37.65,
        Low = 36.82,
        Close = 37.55,
        Volume = 2517400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/17"),
        Open = 37.35,
        High = 37.67,
        Low = 36.99,
        Close = 37.06,
        Volume = 2762900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/18"),
        Open = 36.6,
        High = 37.43,
        Low = 36.27,
        Close = 37.25,
        Volume = 3165600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/19"),
        Open = 36.35,
        High = 37.88,
        Low = 36.31,
        Close = 37.51,
        Volume = 4764900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/20"),
        Open = 37.85,
        High = 39.08,
        Low = 37.46,
        Close = 38.14,
        Volume = 4427600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/21"),
        Open = 38.4,
        High = 39.2,
        Low = 38.15,
        Close = 38.64,
        Volume = 6478500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/24"),
        Open = 38.54,
        High = 38.9,
        Low = 38.28,
        Close = 38.42,
        Volume = 1155500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/26"),
        Open = 38.45,
        High = 38.85,
        Low = 38.16,
        Close = 38.6,
        Volume = 1958700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/27"),
        Open = 38.73,
        High = 38.84,
        Low = 38.55,
        Close = 38.69,
        Volume = 2167200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/28"),
        Open = 38.93,
        High = 39.12,
        Low = 38.69,
        Close = 39.1,
        Volume = 2348100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2001/12/31"),
        Open = 39.19,
        High = 39.42,
        Low = 38.78,
        Close = 38.78,
        Volume = 2285800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/02"),
        Open = 38.54,
        High = 38.67,
        Low = 37.85,
        Close = 38.1,
        Volume = 3522900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/03"),
        Open = 38.4,
        High = 39,
        Low = 38.32,
        Close = 38.75,
        Volume = 3491400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/04"),
        Open = 39.65,
        High = 40.4,
        Low = 39.42,
        Close = 40.36,
        Volume = 4080300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/07"),
        Open = 41,
        High = 41.89,
        Low = 40.92,
        Close = 41,
        Volume = 6092300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/08"),
        Open = 41.47,
        High = 41.7,
        Low = 40.02,
        Close = 40.33,
        Volume = 4152500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/09"),
        Open = 40.39,
        High = 40.89,
        Low = 39.5,
        Close = 39.9,
        Volume = 4573100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/10"),
        Open = 40.1,
        High = 40.25,
        Low = 39.63,
        Close = 39.84,
        Volume = 2652700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/11"),
        Open = 39.84,
        High = 39.95,
        Low = 38.6,
        Close = 38.69,
        Volume = 3394800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/14"),
        Open = 38.69,
        High = 38.7,
        Low = 38.07,
        Close = 38.25,
        Volume = 2717400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/15"),
        Open = 38.6,
        High = 39.49,
        Low = 38.43,
        Close = 39.35,
        Volume = 3240000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/16"),
        Open = 38.65,
        High = 39.1,
        Low = 38.02,
        Close = 38.02,
        Volume = 3780700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/17"),
        Open = 38.55,
        High = 38.67,
        Low = 37.65,
        Close = 38.33,
        Volume = 3090700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/18"),
        Open = 38.33,
        High = 39.62,
        Low = 38.03,
        Close = 39.15,
        Volume = 2804100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/22"),
        Open = 39.7,
        High = 39.92,
        Low = 39.27,
        Close = 39.78,
        Volume = 2796100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/23"),
        Open = 40.06,
        High = 40.83,
        Low = 38,
        Close = 39.33,
        Volume = 8881400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/24"),
        Open = 39.6,
        High = 40.25,
        Low = 39.4,
        Close = 40,
        Volume = 5631300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/25"),
        Open = 40.03,
        High = 40.48,
        Low = 39.74,
        Close = 40.48,
        Volume = 3083400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/28"),
        Open = 40.72,
        High = 41,
        Low = 40.34,
        Close = 40.9,
        Volume = 2003600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/29"),
        Open = 41.17,
        High = 41.29,
        Low = 40.09,
        Close = 40.23,
        Volume = 2634800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/30"),
        Open = 39.85,
        High = 40.44,
        Low = 39.05,
        Close = 40,
        Volume = 3214200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/01/31"),
        Open = 40.05,
        High = 40.95,
        Low = 39.87,
        Close = 40.95,
        Volume = 4355800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/01"),
        Open = 41,
        High = 41.65,
        Low = 40.9,
        Close = 41.46,
        Volume = 4728700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/04"),
        Open = 41.55,
        High = 41.81,
        Low = 40.8,
        Close = 41.1,
        Volume = 4485700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/05"),
        Open = 40.85,
        High = 41.49,
        Low = 40.5,
        Close = 40.9,
        Volume = 3250700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/06"),
        Open = 40.73,
        High = 41.5,
        Low = 40.56,
        Close = 40.98,
        Volume = 3332900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/07"),
        Open = 41.17,
        High = 41.46,
        Low = 40.96,
        Close = 41.06,
        Volume = 2139500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/08"),
        Open = 41.05,
        High = 41.9,
        Low = 40.81,
        Close = 41.7,
        Volume = 2555000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/11"),
        Open = 41.9,
        High = 43.2,
        Low = 41.72,
        Close = 43,
        Volume = 3962900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/12"),
        Open = 42.75,
        High = 43.35,
        Low = 42.61,
        Close = 43.15,
        Volume = 4440300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/13"),
        Open = 43.6,
        High = 44.99,
        Low = 43.52,
        Close = 44.9,
        Volume = 5587400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/14"),
        Open = 44.7,
        High = 44.8,
        Low = 44,
        Close = 44.77,
        Volume = 3109300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/15"),
        Open = 44.77,
        High = 45.01,
        Low = 44.36,
        Close = 44.9,
        Volume = 3744900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/19"),
        Open = 44.1,
        High = 44.13,
        Low = 43.4,
        Close = 43.71,
        Volume = 4567200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/20"),
        Open = 43.8,
        High = 43.95,
        Low = 42.55,
        Close = 43.31,
        Volume = 4338000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/21"),
        Open = 43.25,
        High = 45.1,
        Low = 43.2,
        Close = 44.21,
        Volume = 4993600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/22"),
        Open = 43.87,
        High = 45.07,
        Low = 43.37,
        Close = 44.76,
        Volume = 4148600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/25"),
        Open = 44.75,
        High = 45,
        Low = 43.9,
        Close = 44.94,
        Volume = 3309100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/26"),
        Open = 44.74,
        High = 45.46,
        Low = 44.25,
        Close = 45.15,
        Volume = 3875600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/27"),
        Open = 45.65,
        High = 46.87,
        Low = 45.42,
        Close = 45.9,
        Volume = 4202400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/02/28"),
        Open = 46.01,
        High = 47.47,
        Low = 45.9,
        Close = 45.96,
        Volume = 4078800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/01"),
        Open = 46.55,
        High = 47.84,
        Low = 46.5,
        Close = 47.84,
        Volume = 3934000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/04"),
        Open = 48,
        High = 49.54,
        Low = 47.9,
        Close = 49.13,
        Volume = 3730200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/05"),
        Open = 49.1,
        High = 49.1,
        Low = 47.41,
        Close = 48.21,
        Volume = 3583800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/06"),
        Open = 48.22,
        High = 49.86,
        Low = 47.74,
        Close = 49.86,
        Volume = 3689600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/07"),
        Open = 49.8,
        High = 50,
        Low = 47.5,
        Close = 48.48,
        Volume = 3820600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/08"),
        Open = 49.5,
        High = 49.89,
        Low = 48.93,
        Close = 49.4,
        Volume = 4340100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/11"),
        Open = 49.4,
        High = 51.07,
        Low = 49.05,
        Close = 50.88,
        Volume = 4616000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/12"),
        Open = 49.88,
        High = 50.48,
        Low = 49.45,
        Close = 50.28,
        Volume = 4087500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/13"),
        Open = 50.18,
        High = 50.25,
        Low = 48.9,
        Close = 49.22,
        Volume = 3410300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/14"),
        Open = 49.23,
        High = 49.23,
        Low = 47.34,
        Close = 47.61,
        Volume = 5417600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/15"),
        Open = 47.68,
        High = 47.99,
        Low = 46.41,
        Close = 47.98,
        Volume = 6354200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/18"),
        Open = 48.27,
        High = 48.44,
        Low = 46.77,
        Close = 47.63,
        Volume = 3091100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/19"),
        Open = 47.63,
        High = 48.25,
        Low = 47.22,
        Close = 48.04,
        Volume = 2764200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/20"),
        Open = 47.6,
        High = 47.65,
        Low = 46.9,
        Close = 47.03,
        Volume = 2385500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/21"),
        Open = 46.73,
        High = 47.85,
        Low = 46.11,
        Close = 47.67,
        Volume = 2972100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/22"),
        Open = 47,
        High = 47.25,
        Low = 46.12,
        Close = 46.39,
        Volume = 2973100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/25"),
        Open = 46.2,
        High = 46.85,
        Low = 45.25,
        Close = 45.72,
        Volume = 2528400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/26"),
        Open = 45.85,
        High = 46.65,
        Low = 45.54,
        Close = 45.79,
        Volume = 2276100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/27"),
        Open = 46.05,
        High = 47.76,
        Low = 46.05,
        Close = 47.33,
        Volume = 4900900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/03/28"),
        Open = 47.57,
        High = 48.72,
        Low = 47.5,
        Close = 48.25,
        Volume = 4074500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/01"),
        Open = 48.25,
        High = 48.75,
        Low = 47.8,
        Close = 47.92,
        Volume = 2992400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/02"),
        Open = 47.92,
        High = 49.55,
        Low = 47.62,
        Close = 49.09,
        Volume = 3423300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/03"),
        Open = 48.65,
        High = 49.85,
        Low = 48.56,
        Close = 48.73,
        Volume = 4746700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/04"),
        Open = 48.73,
        High = 49.5,
        Low = 48.56,
        Close = 49.08,
        Volume = 2656100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/05"),
        Open = 49.45,
        High = 49.68,
        Low = 47.4,
        Close = 48.29,
        Volume = 2653600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/08"),
        Open = 47.9,
        High = 49.12,
        Low = 47.59,
        Close = 49,
        Volume = 2403100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/09"),
        Open = 49,
        High = 49.14,
        Low = 48.3,
        Close = 48.57,
        Volume = 2181400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/10"),
        Open = 48.57,
        High = 49.73,
        Low = 48.39,
        Close = 49.58,
        Volume = 3427000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/11"),
        Open = 49.8,
        High = 50.05,
        Low = 48.6,
        Close = 48.82,
        Volume = 3752600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/12"),
        Open = 49.25,
        High = 49.29,
        Low = 48.23,
        Close = 48.55,
        Volume = 2058600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/15"),
        Open = 48.2,
        High = 48.45,
        Low = 47.53,
        Close = 47.65,
        Volume = 2009400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/16"),
        Open = 48.45,
        High = 48.98,
        Low = 48.19,
        Close = 48.7,
        Volume = 2103100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/17"),
        Open = 47.55,
        High = 47.56,
        Low = 45,
        Close = 45.37,
        Volume = 10675700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/18"),
        Open = 45.38,
        High = 45.38,
        Low = 41.99,
        Close = 43.7,
        Volume = 16715600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/19"),
        Open = 44.06,
        High = 44.3,
        Low = 42.74,
        Close = 42.75,
        Volume = 8422000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/22"),
        Open = 42.8,
        High = 43.38,
        Low = 42.4,
        Close = 43.14,
        Volume = 4344100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/23"),
        Open = 43.19,
        High = 43.77,
        Low = 42,
        Close = 42.5,
        Volume = 5396700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/24"),
        Open = 42.9,
        High = 43.23,
        Low = 42.35,
        Close = 42.4,
        Volume = 3300700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/25"),
        Open = 42.25,
        High = 43,
        Low = 41,
        Close = 41.9,
        Volume = 4282200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/26"),
        Open = 42,
        High = 42.46,
        Low = 41.3,
        Close = 41.51,
        Volume = 2737800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/29"),
        Open = 43.7,
        High = 43.99,
        Low = 43.1,
        Close = 43.63,
        Volume = 6449000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/04/30"),
        Open = 43.8,
        High = 45.73,
        Low = 43.48,
        Close = 44.6,
        Volume = 5494700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/01"),
        Open = 44.9,
        High = 45.5,
        Low = 43.83,
        Close = 45.5,
        Volume = 4285600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/02"),
        Open = 45.49,
        High = 45.5,
        Low = 44.48,
        Close = 44.87,
        Volume = 2616800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/03"),
        Open = 44.67,
        High = 45.1,
        Low = 43.85,
        Close = 44.63,
        Volume = 2112400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/06"),
        Open = 45,
        High = 45.21,
        Low = 43.33,
        Close = 43.38,
        Volume = 2513100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/07"),
        Open = 43.6,
        High = 43.85,
        Low = 42.8,
        Close = 43.14,
        Volume = 3436300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/08"),
        Open = 43.3,
        High = 44.74,
        Low = 43.3,
        Close = 44.41,
        Volume = 2813100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/09"),
        Open = 44.6,
        High = 45.24,
        Low = 44.5,
        Close = 44.98,
        Volume = 2394600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/10"),
        Open = 44.4,
        High = 44.75,
        Low = 43.55,
        Close = 43.63,
        Volume = 4259500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/13"),
        Open = 43.9,
        High = 44.62,
        Low = 43.76,
        Close = 44.28,
        Volume = 2399300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/14"),
        Open = 45.58,
        High = 45.74,
        Low = 44.64,
        Close = 45.48,
        Volume = 3425900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/15"),
        Open = 45.38,
        High = 45.38,
        Low = 44.51,
        Close = 44.55,
        Volume = 2203300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/16"),
        Open = 44.85,
        High = 45.18,
        Low = 44.52,
        Close = 45,
        Volume = 2251700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/17"),
        Open = 45.23,
        High = 45.61,
        Low = 44.8,
        Close = 45.42,
        Volume = 2417300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/20"),
        Open = 45.64,
        High = 46.03,
        Low = 44.87,
        Close = 45.13,
        Volume = 2434400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/21"),
        Open = 45.14,
        High = 45.75,
        Low = 44.11,
        Close = 44.35,
        Volume = 2587200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/22"),
        Open = 44.25,
        High = 44.59,
        Low = 43.29,
        Close = 44.41,
        Volume = 2428900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/23"),
        Open = 43.83,
        High = 44.5,
        Low = 43.39,
        Close = 44.15,
        Volume = 2621600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/24"),
        Open = 44,
        High = 44,
        Low = 43.07,
        Close = 43.35,
        Volume = 2197100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/28"),
        Open = 43.35,
        High = 43.35,
        Low = 42.75,
        Close = 43,
        Volume = 2420500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/29"),
        Open = 42.7,
        High = 43.5,
        Low = 42.65,
        Close = 43,
        Volume = 2907800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/30"),
        Open = 42.6,
        High = 44.19,
        Low = 42.46,
        Close = 43.66,
        Volume = 3061400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/05/31"),
        Open = 43.82,
        High = 44.09,
        Low = 42.65,
        Close = 42.65,
        Volume = 2468600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/03"),
        Open = 43.4,
        High = 43.87,
        Low = 41.83,
        Close = 41.86,
        Volume = 2895000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/04"),
        Open = 41.87,
        High = 42.4,
        Low = 41.45,
        Close = 41.85,
        Volume = 2711300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/05"),
        Open = 42.1,
        High = 42.79,
        Low = 41.87,
        Close = 42.54,
        Volume = 1635700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/06"),
        Open = 42.54,
        High = 42.77,
        Low = 41.92,
        Close = 41.96,
        Volume = 1760700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/07"),
        Open = 41.96,
        High = 43.25,
        Low = 41.75,
        Close = 42.76,
        Volume = 2985900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/10"),
        Open = 42.95,
        High = 43.5,
        Low = 42.83,
        Close = 42.92,
        Volume = 1846000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/11"),
        Open = 43.1,
        High = 43.8,
        Low = 42.3,
        Close = 42.5,
        Volume = 1812200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/12"),
        Open = 42.62,
        High = 43.99,
        Low = 42.6,
        Close = 43.83,
        Volume = 2173800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/13"),
        Open = 43.3,
        High = 43.75,
        Low = 42.39,
        Close = 42.5,
        Volume = 2378700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/14"),
        Open = 42.75,
        High = 43,
        Low = 41.78,
        Close = 42.53,
        Volume = 2527200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/17"),
        Open = 42.54,
        High = 44.35,
        Low = 42.54,
        Close = 44,
        Volume = 3016900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/18"),
        Open = 43.95,
        High = 44.28,
        Low = 43.4,
        Close = 43.78,
        Volume = 1957900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/19"),
        Open = 43.47,
        High = 44.1,
        Low = 43.1,
        Close = 43.13,
        Volume = 1963600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/20"),
        Open = 43.13,
        High = 44.49,
        Low = 43.02,
        Close = 43.77,
        Volume = 2661300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/21"),
        Open = 43.03,
        High = 43.72,
        Low = 42.74,
        Close = 42.97,
        Volume = 3605100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/24"),
        Open = 42.92,
        High = 43.67,
        Low = 41.52,
        Close = 42.74,
        Volume = 3733000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/25"),
        Open = 43.3,
        High = 44.12,
        Low = 42.82,
        Close = 42.87,
        Volume = 3937100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/26"),
        Open = 41.87,
        High = 43.1,
        Low = 41.87,
        Close = 42.72,
        Volume = 3360100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/27"),
        Open = 43,
        High = 44.88,
        Low = 42.96,
        Close = 44.8,
        Volume = 3373600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/06/28"),
        Open = 44.35,
        High = 45.09,
        Low = 44.1,
        Close = 45,
        Volume = 5535800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/01"),
        Open = 44.97,
        High = 45.28,
        Low = 44.56,
        Close = 44.6,
        Volume = 3473800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/02"),
        Open = 44.4,
        High = 44.78,
        Low = 43.86,
        Close = 44.54,
        Volume = 2874400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/03"),
        Open = 44.14,
        High = 44.45,
        Low = 43.17,
        Close = 43.77,
        Volume = 3029300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/05"),
        Open = 44.2,
        High = 45.2,
        Low = 44.05,
        Close = 45,
        Volume = 1805700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/08"),
        Open = 44.72,
        High = 45.09,
        Low = 43.87,
        Close = 44.1,
        Volume = 2689400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/09"),
        Open = 43.99,
        High = 44.69,
        Low = 43.09,
        Close = 43.22,
        Volume = 2621800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/10"),
        Open = 43.52,
        High = 43.7,
        Low = 40.46,
        Close = 40.8,
        Volume = 6563000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/11"),
        Open = 40.8,
        High = 41.47,
        Low = 39.55,
        Close = 41.17,
        Volume = 5690400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/12"),
        Open = 41.24,
        High = 41.49,
        Low = 39.13,
        Close = 40.15,
        Volume = 3220000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/15"),
        Open = 39.85,
        High = 39.87,
        Low = 37.2,
        Close = 39.76,
        Volume = 5180900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/16"),
        Open = 40.05,
        High = 41.8,
        Low = 40.05,
        Close = 40.87,
        Volume = 5418600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/17"),
        Open = 42.42,
        High = 43.19,
        Low = 42.15,
        Close = 42.94,
        Volume = 6335600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/18"),
        Open = 43.09,
        High = 43.1,
        Low = 41.23,
        Close = 41.29,
        Volume = 3626000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/19"),
        Open = 40.89,
        High = 41,
        Low = 39.56,
        Close = 39.92,
        Volume = 4253700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/22"),
        Open = 39.8,
        High = 40.15,
        Low = 37.58,
        Close = 38.53,
        Volume = 5662600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/23"),
        Open = 38.45,
        High = 39.9,
        Low = 38.1,
        Close = 38.85,
        Volume = 5560500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/24"),
        Open = 37.5,
        High = 41.37,
        Low = 37.1,
        Close = 41.19,
        Volume = 5493500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/25"),
        Open = 41,
        High = 42.94,
        Low = 40.31,
        Close = 42.94,
        Volume = 5133200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/26"),
        Open = 42.5,
        High = 42.51,
        Low = 40.14,
        Close = 42,
        Volume = 3374000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/29"),
        Open = 42.94,
        High = 42.99,
        Low = 41.3,
        Close = 42.03,
        Volume = 5595200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/30"),
        Open = 41.99,
        High = 42,
        Low = 40.6,
        Close = 41.65,
        Volume = 5201100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/07/31"),
        Open = 41.66,
        High = 41.66,
        Low = 40.35,
        Close = 41.52,
        Volume = 4391400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/01"),
        Open = 41,
        High = 41.4,
        Low = 40.35,
        Close = 40.63,
        Volume = 3361300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/02"),
        Open = 40.63,
        High = 40.86,
        Low = 39.1,
        Close = 39.85,
        Volume = 2931400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/05"),
        Open = 39.65,
        High = 40.27,
        Low = 38.53,
        Close = 38.61,
        Volume = 3146300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/06"),
        Open = 39.01,
        High = 40.59,
        Low = 39.01,
        Close = 39.41,
        Volume = 3075500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/07"),
        Open = 39.85,
        High = 41.13,
        Low = 39.7,
        Close = 41.1,
        Volume = 3484000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/08"),
        Open = 41,
        High = 41.6,
        Low = 40.25,
        Close = 41.5,
        Volume = 3806300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/09"),
        Open = 41.1,
        High = 41.65,
        Low = 40.41,
        Close = 41,
        Volume = 3368000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/12"),
        Open = 40.15,
        High = 40.65,
        Low = 39.55,
        Close = 40.5,
        Volume = 2868700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/13"),
        Open = 39.9,
        High = 39.91,
        Low = 37.1,
        Close = 37.23,
        Volume = 9540500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/14"),
        Open = 36.83,
        High = 36.84,
        Low = 34.1,
        Close = 36.35,
        Volume = 12105500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/15"),
        Open = 36.35,
        High = 37.95,
        Low = 35.4,
        Close = 37.49,
        Volume = 7548300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/16"),
        Open = 38.19,
        High = 38.4,
        Low = 36.99,
        Close = 37.5,
        Volume = 4649600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/19"),
        Open = 37.51,
        High = 38.56,
        Low = 37.41,
        Close = 38.5,
        Volume = 3630800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/20"),
        Open = 38.57,
        High = 38.57,
        Low = 37.73,
        Close = 37.88,
        Volume = 2990800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/21"),
        Open = 38,
        High = 38.43,
        Low = 36.91,
        Close = 37.57,
        Volume = 2993700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/22"),
        Open = 37.6,
        High = 38.65,
        Low = 37.26,
        Close = 38.5,
        Volume = 2855900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/23"),
        Open = 38.5,
        High = 38.5,
        Low = 36.9,
        Close = 37.13,
        Volume = 3583400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/26"),
        Open = 37.13,
        High = 37.27,
        Low = 35.85,
        Close = 36.89,
        Volume = 3004700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/27"),
        Open = 37.1,
        High = 37.69,
        Low = 36.59,
        Close = 37.03,
        Volume = 2874400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/28"),
        Open = 37.03,
        High = 37.85,
        Low = 36.4,
        Close = 37.53,
        Volume = 4112100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/29"),
        Open = 36.73,
        High = 37.8,
        Low = 36.35,
        Close = 37.17,
        Volume = 3606800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/08/30"),
        Open = 36.93,
        High = 37.7,
        Low = 36.7,
        Close = 37.07,
        Volume = 2062500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/03"),
        Open = 36.8,
        High = 36.85,
        Low = 35.23,
        Close = 35.46,
        Volume = 3485200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/04"),
        Open = 35.5,
        High = 37.06,
        Low = 35.25,
        Close = 36.85,
        Volume = 2833200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/05"),
        Open = 36.45,
        High = 36.95,
        Low = 36,
        Close = 36.03,
        Volume = 2968800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/06"),
        Open = 36.58,
        High = 37.65,
        Low = 36.54,
        Close = 37.21,
        Volume = 2379000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/09"),
        Open = 37.21,
        High = 37.76,
        Low = 36.5,
        Close = 37.35,
        Volume = 3121700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/10"),
        Open = 37.3,
        High = 37.78,
        Low = 36.55,
        Close = 37.18,
        Volume = 2615400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/11"),
        Open = 37.43,
        High = 37.8,
        Low = 36.92,
        Close = 37.08,
        Volume = 2468400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/12"),
        Open = 36.88,
        High = 37.11,
        Low = 36.35,
        Close = 36.45,
        Volume = 2886600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/13"),
        Open = 35.87,
        High = 36.17,
        Low = 35.01,
        Close = 35.58,
        Volume = 3558500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/16"),
        Open = 35.9,
        High = 37.41,
        Low = 35.9,
        Close = 37.23,
        Volume = 3265400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/17"),
        Open = 37.4,
        High = 37.6,
        Low = 36.07,
        Close = 36.29,
        Volume = 3776900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/18"),
        Open = 36.09,
        High = 37.15,
        Low = 36.01,
        Close = 36.77,
        Volume = 3418300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/19"),
        Open = 36,
        High = 36.7,
        Low = 35.45,
        Close = 35.52,
        Volume = 3089900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/20"),
        Open = 35.9,
        High = 36.75,
        Low = 35.65,
        Close = 36.48,
        Volume = 5040400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/23"),
        Open = 35.9,
        High = 36,
        Low = 34.86,
        Close = 35.4,
        Volume = 3624000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/24"),
        Open = 35.12,
        High = 35.7,
        Low = 34.65,
        Close = 34.96,
        Volume = 3649300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/25"),
        Open = 35.1,
        High = 35.5,
        Low = 34.5,
        Close = 35.41,
        Volume = 3632600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/26"),
        Open = 35.81,
        High = 36.59,
        Low = 35.56,
        Close = 36.55,
        Volume = 2328100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/27"),
        Open = 36.3,
        High = 36.3,
        Low = 34.66,
        Close = 34.7,
        Volume = 3478400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/09/30"),
        Open = 34.4,
        High = 34.82,
        Low = 33.2,
        Close = 34.13,
        Volume = 4072100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/01"),
        Open = 34.32,
        High = 36.02,
        Low = 34.25,
        Close = 36,
        Volume = 3355500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/02"),
        Open = 35.5,
        High = 35.5,
        Low = 34.13,
        Close = 34.38,
        Volume = 2953900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/03"),
        Open = 34.78,
        High = 35.3,
        Low = 34.19,
        Close = 34.31,
        Volume = 3650900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/04"),
        Open = 34.32,
        High = 34.32,
        Low = 31.95,
        Close = 32.01,
        Volume = 7042100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/07"),
        Open = 32.22,
        High = 32.9,
        Low = 31.63,
        Close = 32.38,
        Volume = 4367000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/08"),
        Open = 33,
        High = 33.01,
        Low = 31.18,
        Close = 32.01,
        Volume = 4234800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/09"),
        Open = 31.4,
        High = 31.75,
        Low = 29.95,
        Close = 30.44,
        Volume = 6260300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/10"),
        Open = 30.3,
        High = 31.7,
        Low = 29.98,
        Close = 31.35,
        Volume = 4582900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/11"),
        Open = 31.75,
        High = 32.65,
        Low = 31.34,
        Close = 32,
        Volume = 4082700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/14"),
        Open = 30.3,
        High = 31.35,
        Low = 30.25,
        Close = 31.06,
        Volume = 5319100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/15"),
        Open = 31.27,
        High = 32.41,
        Low = 31.14,
        Close = 32.15,
        Volume = 4654900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/16"),
        Open = 32.16,
        High = 32.52,
        Low = 30.27,
        Close = 30.5,
        Volume = 7269100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/17"),
        Open = 30.75,
        High = 31,
        Low = 29.46,
        Close = 29.98,
        Volume = 8574300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/18"),
        Open = 29.25,
        High = 29.45,
        Low = 28.53,
        Close = 29,
        Volume = 7013300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/21"),
        Open = 29,
        High = 30.5,
        Low = 28.58,
        Close = 30.36,
        Volume = 5950400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/22"),
        Open = 29.98,
        High = 30.28,
        Low = 29.55,
        Close = 30.14,
        Volume = 4025700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/23"),
        Open = 29.97,
        High = 30.71,
        Low = 29.88,
        Close = 30.7,
        Volume = 3164300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/24"),
        Open = 30.87,
        High = 31.2,
        Low = 29.7,
        Close = 29.95,
        Volume = 4017600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/25"),
        Open = 29.99,
        High = 30.35,
        Low = 29.35,
        Close = 30.32,
        Volume = 3336200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/28"),
        Open = 30.42,
        High = 30.8,
        Low = 28.7,
        Close = 28.98,
        Volume = 5205300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/29"),
        Open = 28.9,
        High = 29.9,
        Low = 28.54,
        Close = 29.7,
        Volume = 4090100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/30"),
        Open = 29.77,
        High = 30.39,
        Low = 29.2,
        Close = 30.2,
        Volume = 3078200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/10/31"),
        Open = 30.4,
        High = 30.52,
        Low = 29.55,
        Close = 29.75,
        Volume = 2865900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/01"),
        Open = 29.79,
        High = 30.65,
        Low = 29.56,
        Close = 30.4,
        Volume = 2939600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/04"),
        Open = 30.41,
        High = 30.86,
        Low = 29.63,
        Close = 29.67,
        Volume = 4919500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/05"),
        Open = 29.87,
        High = 31.98,
        Low = 29.87,
        Close = 31.52,
        Volume = 4739100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/06"),
        Open = 32.04,
        High = 33.88,
        Low = 32.01,
        Close = 33.58,
        Volume = 8651500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/07"),
        Open = 33.78,
        High = 33.9,
        Low = 32.11,
        Close = 32.29,
        Volume = 4371900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/08"),
        Open = 32.85,
        High = 33.6,
        Low = 32.5,
        Close = 33.18,
        Volume = 4239700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/11"),
        Open = 33.18,
        High = 33.21,
        Low = 31,
        Close = 31.23,
        Volume = 3686300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/12"),
        Open = 31.8,
        High = 32.1,
        Low = 31.25,
        Close = 31.66,
        Volume = 4498300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/13"),
        Open = 31.63,
        High = 32.27,
        Low = 30.87,
        Close = 31.42,
        Volume = 3351400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/14"),
        Open = 32.1,
        High = 32.4,
        Low = 30.87,
        Close = 31.35,
        Volume = 3079800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/15"),
        Open = 31.35,
        High = 32,
        Low = 31.04,
        Close = 31.5,
        Volume = 2634400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/18"),
        Open = 31.54,
        High = 31.78,
        Low = 30.9,
        Close = 30.92,
        Volume = 3389900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/19"),
        Open = 31.02,
        High = 31.65,
        Low = 30.62,
        Close = 31.4,
        Volume = 3510600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/20"),
        Open = 32.1,
        High = 32.24,
        Low = 31.2,
        Close = 31.73,
        Volume = 3401500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/21"),
        Open = 32.2,
        High = 33.02,
        Low = 32.02,
        Close = 32.44,
        Volume = 5257200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/22"),
        Open = 32.69,
        High = 34.43,
        Low = 32.69,
        Close = 34,
        Volume = 5475800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/25"),
        Open = 34.38,
        High = 34.7,
        Low = 33.2,
        Close = 33.49,
        Volume = 3167400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/26"),
        Open = 33.7,
        High = 34.05,
        Low = 33.26,
        Close = 33.67,
        Volume = 3133600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/27"),
        Open = 33.53,
        High = 35.14,
        Low = 33.53,
        Close = 35.02,
        Volume = 3802900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/11/29"),
        Open = 35.03,
        High = 35.03,
        Low = 33.8,
        Close = 34.05,
        Volume = 2375900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/02"),
        Open = 34.6,
        High = 34.88,
        Low = 33.7,
        Close = 34.1,
        Volume = 2625200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/03"),
        Open = 34.49,
        High = 34.5,
        Low = 33.75,
        Close = 34.24,
        Volume = 2868700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/04"),
        Open = 33.77,
        High = 34.38,
        Low = 33.56,
        Close = 33.93,
        Volume = 2646900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/05"),
        Open = 33.75,
        High = 33.76,
        Low = 32.43,
        Close = 32.96,
        Volume = 3851900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/06"),
        Open = 32.4,
        High = 33.75,
        Low = 32.23,
        Close = 33.4,
        Volume = 3698900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/09"),
        Open = 32.63,
        High = 33.25,
        Low = 32.31,
        Close = 32.4,
        Volume = 2863700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/10"),
        Open = 32.35,
        High = 32.6,
        Low = 32,
        Close = 32.25,
        Volume = 3081300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/11"),
        Open = 32.05,
        High = 32.64,
        Low = 31.75,
        Close = 32.53,
        Volume = 3280800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/12"),
        Open = 32,
        High = 32.8,
        Low = 31.8,
        Close = 32.05,
        Volume = 2613900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/13"),
        Open = 32.05,
        High = 32.05,
        Low = 31.4,
        Close = 31.4,
        Volume = 2192500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/16"),
        Open = 31.27,
        High = 32.1,
        Low = 31.25,
        Close = 31.92,
        Volume = 2939600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/17"),
        Open = 32.06,
        High = 32.75,
        Low = 31.84,
        Close = 31.85,
        Volume = 2097500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/18"),
        Open = 31.77,
        High = 32.5,
        Low = 31.42,
        Close = 32.02,
        Volume = 2157700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/19"),
        Open = 31.73,
        High = 32.48,
        Low = 31.73,
        Close = 32.25,
        Volume = 2652000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/20"),
        Open = 32.92,
        High = 32.94,
        Low = 32.29,
        Close = 32.71,
        Volume = 4189000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/23"),
        Open = 32.71,
        High = 32.95,
        Low = 32.4,
        Close = 32.79,
        Volume = 2089400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/24"),
        Open = 33.5,
        High = 33.5,
        Low = 32.53,
        Close = 32.65,
        Volume = 1084500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/26"),
        Open = 32.85,
        High = 33.28,
        Low = 32.52,
        Close = 32.63,
        Volume = 1449300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/27"),
        Open = 32.9,
        High = 33.09,
        Low = 32.14,
        Close = 32.33,
        Volume = 1597200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/30"),
        Open = 32.33,
        High = 33,
        Low = 32.33,
        Close = 32.9,
        Volume = 2238600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2002/12/31"),
        Open = 32.67,
        High = 33.13,
        Low = 32.47,
        Close = 32.99,
        Volume = 2058000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/02"),
        Open = 33,
        High = 33.92,
        Low = 33,
        Close = 33.88,
        Volume = 2099500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/03"),
        Open = 34.1,
        High = 34.44,
        Low = 33.89,
        Close = 34.18,
        Volume = 2296100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/06"),
        Open = 34.05,
        High = 34.56,
        Low = 33.96,
        Close = 34.13,
        Volume = 2198400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/07"),
        Open = 34.12,
        High = 34.13,
        Low = 33.03,
        Close = 33.3,
        Volume = 2914300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/08"),
        Open = 33.37,
        High = 33.5,
        Low = 33.03,
        Close = 33.5,
        Volume = 3027800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/09"),
        Open = 33.75,
        High = 34.05,
        Low = 33.37,
        Close = 33.9,
        Volume = 2791000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/10"),
        Open = 33.9,
        High = 34.1,
        Low = 33.43,
        Close = 33.85,
        Volume = 3074400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/13"),
        Open = 34.15,
        High = 34.59,
        Low = 33.75,
        Close = 34.3,
        Volume = 3033500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/14"),
        Open = 34.15,
        High = 34.24,
        Low = 33.82,
        Close = 34.15,
        Volume = 1855600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/15"),
        Open = 34.05,
        High = 34.39,
        Low = 33.25,
        Close = 33.35,
        Volume = 2195000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/16"),
        Open = 33.8,
        High = 34.24,
        Low = 33.28,
        Close = 33.46,
        Volume = 2389300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/17"),
        Open = 33.35,
        High = 33.73,
        Low = 33.03,
        Close = 33.29,
        Volume = 2031200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/21"),
        Open = 33.29,
        High = 33.31,
        Low = 32.27,
        Close = 32.4,
        Volume = 2463000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/22"),
        Open = 32.05,
        High = 32.7,
        Low = 31.76,
        Close = 31.78,
        Volume = 3161500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/23"),
        Open = 31.8,
        High = 32.27,
        Low = 31.78,
        Close = 31.85,
        Volume = 2426200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/24"),
        Open = 31.8,
        High = 31.85,
        Low = 31,
        Close = 31.01,
        Volume = 2448300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/27"),
        Open = 31.05,
        High = 31.25,
        Low = 30.6,
        Close = 30.62,
        Volume = 2383700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/28"),
        Open = 30.74,
        High = 31.55,
        Low = 30.59,
        Close = 31.45,
        Volume = 2408600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/29"),
        Open = 31.46,
        High = 31.46,
        Low = 30.5,
        Close = 30.61,
        Volume = 2783000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/30"),
        Open = 29.97,
        High = 31.3,
        Low = 29.73,
        Close = 30.66,
        Volume = 3758500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/01/31"),
        Open = 31.11,
        High = 32.22,
        Low = 31,
        Close = 31.59,
        Volume = 3635100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/03"),
        Open = 30.12,
        High = 31.5,
        Low = 30.12,
        Close = 31.11,
        Volume = 3992800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/04"),
        Open = 30.8,
        High = 31.42,
        Low = 30.5,
        Close = 31.24,
        Volume = 3102800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/05"),
        Open = 31.07,
        High = 31.63,
        Low = 30.54,
        Close = 30.67,
        Volume = 3072200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/06"),
        Open = 30.66,
        High = 30.97,
        Low = 30.33,
        Close = 30.55,
        Volume = 2226600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/07"),
        Open = 30.65,
        High = 30.9,
        Low = 29.9,
        Close = 30,
        Volume = 2222500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/10"),
        Open = 30.1,
        High = 30.48,
        Low = 29.89,
        Close = 30.27,
        Volume = 2270300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/11"),
        Open = 30.27,
        High = 30.51,
        Low = 29.57,
        Close = 29.84,
        Volume = 2723800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/12"),
        Open = 29.8,
        High = 29.89,
        Low = 29.36,
        Close = 29.63,
        Volume = 2523400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/13"),
        Open = 30,
        High = 30,
        Low = 28.9,
        Close = 29.5,
        Volume = 2852300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/14"),
        Open = 29.45,
        High = 30.47,
        Low = 29.43,
        Close = 30.15,
        Volume = 2933400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/18"),
        Open = 30.5,
        High = 30.8,
        Low = 29.88,
        Close = 30,
        Volume = 2662600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/19"),
        Open = 30,
        High = 30.18,
        Low = 29.59,
        Close = 30.18,
        Volume = 2175100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/20"),
        Open = 30.18,
        High = 30.2,
        Low = 28.2,
        Close = 29.17,
        Volume = 7105300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/21"),
        Open = 29,
        High = 29.64,
        Low = 28.43,
        Close = 29.64,
        Volume = 4521300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/24"),
        Open = 29.17,
        High = 29.64,
        Low = 28.4,
        Close = 28.49,
        Volume = 4325000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/25"),
        Open = 28.44,
        High = 28.5,
        Low = 28,
        Close = 28.19,
        Volume = 4802900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/26"),
        Open = 29,
        High = 29,
        Low = 27.64,
        Close = 27.84,
        Volume = 3838700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/27"),
        Open = 28.11,
        High = 28.31,
        Low = 27.66,
        Close = 27.95,
        Volume = 3050000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/02/28"),
        Open = 28,
        High = 28.12,
        Low = 27.24,
        Close = 27.56,
        Volume = 3926000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/03"),
        Open = 27.7,
        High = 27.8,
        Low = 27.02,
        Close = 27.11,
        Volume = 4039700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/04"),
        Open = 27.1,
        High = 27.82,
        Low = 26.91,
        Close = 27.45,
        Volume = 5454800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/05"),
        Open = 27.45,
        High = 27.45,
        Low = 26.53,
        Close = 26.74,
        Volume = 5300100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/06"),
        Open = 26.94,
        High = 26.94,
        Low = 26,
        Close = 26.16,
        Volume = 4494600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/07"),
        Open = 25.8,
        High = 25.94,
        Low = 25.4,
        Close = 25.84,
        Volume = 6251500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/10"),
        Open = 26,
        High = 26.2,
        Low = 25.46,
        Close = 25.52,
        Volume = 3678600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/11"),
        Open = 25.63,
        High = 25.84,
        Low = 25.11,
        Close = 25.22,
        Volume = 3378200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/12"),
        Open = 25.15,
        High = 25.42,
        Low = 24.73,
        Close = 25.15,
        Volume = 4213800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/13"),
        Open = 25.42,
        High = 25.52,
        Low = 24.9,
        Close = 25.35,
        Volume = 6456400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/14"),
        Open = 25.25,
        High = 26.25,
        Low = 25.18,
        Close = 25.55,
        Volume = 6318800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/17"),
        Open = 25.5,
        High = 27.09,
        Low = 25.32,
        Close = 26.9,
        Volume = 5832200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/18"),
        Open = 27.37,
        High = 28.42,
        Low = 27,
        Close = 27.83,
        Volume = 5960100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/19"),
        Open = 27.86,
        High = 28.35,
        Low = 27.55,
        Close = 27.95,
        Volume = 3533900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/20"),
        Open = 27.9,
        High = 28.16,
        Low = 27.37,
        Close = 27.82,
        Volume = 3708700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/21"),
        Open = 28.24,
        High = 28.25,
        Low = 27.01,
        Close = 28.1,
        Volume = 6539600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/24"),
        Open = 27.8,
        High = 27.8,
        Low = 26.94,
        Close = 27.03,
        Volume = 3679000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/25"),
        Open = 27.1,
        High = 27.65,
        Low = 26.83,
        Close = 27.37,
        Volume = 3887300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/26"),
        Open = 27.37,
        High = 27.4,
        Low = 26.21,
        Close = 26.4,
        Volume = 5788500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/27"),
        Open = 26.4,
        High = 26.56,
        Low = 25.9,
        Close = 26.52,
        Volume = 4389100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/28"),
        Open = 26.3,
        High = 26.3,
        Low = 25.99,
        Close = 26.1,
        Volume = 3035200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/03/31"),
        Open = 26.11,
        High = 26.11,
        Low = 24.85,
        Close = 25.06,
        Volume = 5606100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/01"),
        Open = 25.15,
        High = 25.96,
        Low = 25.15,
        Close = 25.67,
        Volume = 5610300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/02"),
        Open = 26.33,
        High = 26.76,
        Low = 25.9,
        Close = 26.66,
        Volume = 4835600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/03"),
        Open = 27.25,
        High = 27.25,
        Low = 26.43,
        Close = 26.55,
        Volume = 3485100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/04"),
        Open = 27.03,
        High = 27.03,
        Low = 26.1,
        Close = 26.5,
        Volume = 3367400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/07"),
        Open = 27.56,
        High = 27.8,
        Low = 27.04,
        Close = 27.4,
        Volume = 4908900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/08"),
        Open = 27.15,
        High = 27.72,
        Low = 26.9,
        Close = 27.36,
        Volume = 3947700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/09"),
        Open = 27.68,
        High = 28.05,
        Low = 27.32,
        Close = 27.48,
        Volume = 4063800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/10"),
        Open = 27.48,
        High = 27.48,
        Low = 26.42,
        Close = 27.09,
        Volume = 4908400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/11"),
        Open = 26.9,
        High = 27.1,
        Low = 25.7,
        Close = 26.47,
        Volume = 4935800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/14"),
        Open = 26.48,
        High = 27.25,
        Low = 26.35,
        Close = 27.25,
        Volume = 3530500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/15"),
        Open = 27.25,
        High = 27.29,
        Low = 26.55,
        Close = 27.29,
        Volume = 4145100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/16"),
        Open = 27.36,
        High = 27.46,
        Low = 26.56,
        Close = 26.64,
        Volume = 3334300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/17"),
        Open = 26.64,
        High = 26.72,
        Low = 26.03,
        Close = 26.65,
        Volume = 4469700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/21"),
        Open = 26.65,
        High = 27.11,
        Low = 26.65,
        Close = 26.78,
        Volume = 3540700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/22"),
        Open = 26.6,
        High = 27.9,
        Low = 26.59,
        Close = 27.8,
        Volume = 6337400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/23"),
        Open = 27.92,
        High = 28.66,
        Low = 27.52,
        Close = 28.14,
        Volume = 8853200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/24"),
        Open = 27.94,
        High = 28.44,
        Low = 27.52,
        Close = 27.63,
        Volume = 5166300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/25"),
        Open = 27.83,
        High = 27.85,
        Low = 27.16,
        Close = 27.19,
        Volume = 3785000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/28"),
        Open = 26.8,
        High = 27.46,
        Low = 26.2,
        Close = 27.38,
        Volume = 5369300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/29"),
        Open = 27.38,
        High = 27.84,
        Low = 27.38,
        Close = 27.76,
        Volume = 4225900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/04/30"),
        Open = 27.4,
        High = 27.62,
        Low = 27.23,
        Close = 27.28,
        Volume = 5380100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/01"),
        Open = 27.17,
        High = 27.3,
        Low = 27,
        Close = 27.11,
        Volume = 3210600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/02"),
        Open = 27.55,
        High = 28.77,
        Low = 27.49,
        Close = 28.62,
        Volume = 5663000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/05"),
        Open = 28.2,
        High = 28.39,
        Low = 27.45,
        Close = 27.62,
        Volume = 6992200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/06"),
        Open = 27.5,
        High = 28.26,
        Low = 27.4,
        Close = 28.14,
        Volume = 5436600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/07"),
        Open = 28.14,
        High = 28.97,
        Low = 28.01,
        Close = 28.38,
        Volume = 4643800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/08"),
        Open = 28,
        High = 28.41,
        Low = 27.94,
        Close = 28.14,
        Volume = 2908100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/09"),
        Open = 28.55,
        High = 29.1,
        Low = 28.3,
        Close = 29.1,
        Volume = 4107000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/12"),
        Open = 29.15,
        High = 29.98,
        Low = 28.35,
        Close = 29.82,
        Volume = 5072000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/13"),
        Open = 29.78,
        High = 29.78,
        Low = 29.29,
        Close = 29.55,
        Volume = 3756900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/14"),
        Open = 29.7,
        High = 29.83,
        Low = 29.13,
        Close = 29.49,
        Volume = 3383200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/15"),
        Open = 29.55,
        High = 30.25,
        Low = 29.5,
        Close = 30.16,
        Volume = 4670800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/16"),
        Open = 30.6,
        High = 31,
        Low = 30.1,
        Close = 30.42,
        Volume = 5175800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/19"),
        Open = 29.5,
        High = 30.34,
        Low = 28.95,
        Close = 29.07,
        Volume = 4524200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/20"),
        Open = 29.17,
        High = 29.25,
        Low = 28.62,
        Close = 28.93,
        Volume = 3735600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/21"),
        Open = 28.8,
        High = 29.3,
        Low = 28.55,
        Close = 28.8,
        Volume = 3224200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/22"),
        Open = 28.8,
        High = 29.25,
        Low = 28.76,
        Close = 29.1,
        Volume = 2479900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/23"),
        Open = 29.02,
        High = 30.61,
        Low = 28.76,
        Close = 29.99,
        Volume = 5741300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/27"),
        Open = 30.1,
        High = 30.1,
        Low = 29.41,
        Close = 29.9,
        Volume = 4638600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/28"),
        Open = 29.95,
        High = 30.65,
        Low = 29.9,
        Close = 30.38,
        Volume = 4228700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/29"),
        Open = 30.55,
        High = 30.86,
        Low = 29.81,
        Close = 29.95,
        Volume = 3547200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/05/30"),
        Open = 30.35,
        High = 30.86,
        Low = 30.15,
        Close = 30.67,
        Volume = 4049000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/02"),
        Open = 31,
        High = 32.47,
        Low = 31,
        Close = 31.96,
        Volume = 7338200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/03"),
        Open = 31.96,
        High = 32.15,
        Low = 31.7,
        Close = 32.11,
        Volume = 4376300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/04"),
        Open = 32.12,
        High = 33.64,
        Low = 32.03,
        Close = 33.55,
        Volume = 7322800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/05"),
        Open = 33.55,
        High = 33.95,
        Low = 33.26,
        Close = 33.68,
        Volume = 4625900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/06"),
        Open = 34.15,
        High = 35.18,
        Low = 33.95,
        Close = 34.86,
        Volume = 6731100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/09"),
        Open = 34.4,
        High = 34.7,
        Low = 32.83,
        Close = 33.17,
        Volume = 5926500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/10"),
        Open = 34,
        High = 35.24,
        Low = 33.5,
        Close = 34.31,
        Volume = 6209100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/11"),
        Open = 34.31,
        High = 35.4,
        Low = 34,
        Close = 35.4,
        Volume = 5211100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/12"),
        Open = 35.6,
        High = 35.9,
        Low = 34.93,
        Close = 35.75,
        Volume = 4868200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/13"),
        Open = 35.75,
        High = 35.94,
        Low = 35.03,
        Close = 35.34,
        Volume = 5015200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/16"),
        Open = 36.2,
        High = 36.44,
        Low = 35.4,
        Close = 36.41,
        Volume = 4416900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/17"),
        Open = 37.1,
        High = 37.36,
        Low = 35.53,
        Close = 36.15,
        Volume = 5794500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/18"),
        Open = 36,
        High = 36.01,
        Low = 35.26,
        Close = 35.83,
        Volume = 8141300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/19"),
        Open = 35.45,
        High = 35.72,
        Low = 35.1,
        Close = 35.5,
        Volume = 4611000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/20"),
        Open = 35.5,
        High = 35.83,
        Low = 35.2,
        Close = 35.53,
        Volume = 5815800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/23"),
        Open = 35.53,
        High = 35.53,
        Low = 34.35,
        Close = 34.46,
        Volume = 4724700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/24"),
        Open = 34.36,
        High = 35.1,
        Low = 34.32,
        Close = 34.5,
        Volume = 4052900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/25"),
        Open = 34.54,
        High = 35.15,
        Low = 34.24,
        Close = 34.41,
        Volume = 2337800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/26"),
        Open = 34.22,
        High = 34.88,
        Low = 34.12,
        Close = 34.4,
        Volume = 2779200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/27"),
        Open = 34.3,
        High = 34.8,
        Low = 34.2,
        Close = 34.22,
        Volume = 2348600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/06/30"),
        Open = 34.9,
        High = 34.9,
        Low = 34.03,
        Close = 34.32,
        Volume = 4751300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/01"),
        Open = 33.99,
        High = 34.75,
        Low = 33.89,
        Close = 34.65,
        Volume = 5553200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/02"),
        Open = 34.42,
        High = 34.93,
        Low = 34.25,
        Close = 34.8,
        Volume = 3988400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/03"),
        Open = 33.75,
        High = 34.66,
        Low = 33.75,
        Close = 34.58,
        Volume = 1907800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/07"),
        Open = 34.88,
        High = 35.2,
        Low = 34.71,
        Close = 35.01,
        Volume = 3635600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/08"),
        Open = 35.12,
        High = 35.2,
        Low = 34.38,
        Close = 34.99,
        Volume = 3123400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/09"),
        Open = 35,
        High = 35.55,
        Low = 34.63,
        Close = 35.23,
        Volume = 3450200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/10"),
        Open = 34.83,
        High = 35.15,
        Low = 34.51,
        Close = 34.69,
        Volume = 2101200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/11"),
        Open = 34.72,
        High = 35.18,
        Low = 34.66,
        Close = 35.18,
        Volume = 2083300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/14"),
        Open = 35.4,
        High = 35.43,
        Low = 34.5,
        Close = 34.58,
        Volume = 4104200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/15"),
        Open = 34.45,
        High = 34.45,
        Low = 33,
        Close = 33.44,
        Volume = 9248900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/16"),
        Open = 33.25,
        High = 33.95,
        Low = 33.07,
        Close = 33.39,
        Volume = 3687800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/17"),
        Open = 33.15,
        High = 33.56,
        Low = 32.12,
        Close = 33.17,
        Volume = 3510700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/18"),
        Open = 33.21,
        High = 33.35,
        Low = 32.52,
        Close = 33.35,
        Volume = 4030500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/21"),
        Open = 33,
        High = 33,
        Low = 32.14,
        Close = 32.35,
        Volume = 4486800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/22"),
        Open = 32.2,
        High = 32.75,
        Low = 32.2,
        Close = 32.57,
        Volume = 4446800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/23"),
        Open = 32.56,
        High = 33.25,
        Low = 31.75,
        Close = 32.69,
        Volume = 4801000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/24"),
        Open = 32.6,
        High = 32.85,
        Low = 32.19,
        Close = 32.2,
        Volume = 5763400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/25"),
        Open = 31.45,
        High = 32.77,
        Low = 30.05,
        Close = 32.68,
        Volume = 4211100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/28"),
        Open = 32.68,
        High = 32.99,
        Low = 32.5,
        Close = 32.77,
        Volume = 3303900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/29"),
        Open = 32.6,
        High = 32.87,
        Low = 31.99,
        Close = 32.05,
        Volume = 3494400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/30"),
        Open = 32,
        High = 32.56,
        Low = 32,
        Close = 32.52,
        Volume = 3241300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/07/31"),
        Open = 32.62,
        High = 33.4,
        Low = 32.62,
        Close = 33.12,
        Volume = 5180800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/01"),
        Open = 32.71,
        High = 33,
        Low = 32.38,
        Close = 32.42,
        Volume = 3530700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/04"),
        Open = 32.2,
        High = 32.65,
        Low = 31.95,
        Close = 32.22,
        Volume = 3231400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/05"),
        Open = 31.96,
        High = 32.18,
        Low = 31.22,
        Close = 31.22,
        Volume = 3887700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/06"),
        Open = 31.25,
        High = 32.26,
        Low = 31,
        Close = 31.91,
        Volume = 3216400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/07"),
        Open = 31.72,
        High = 31.98,
        Low = 31.35,
        Close = 31.93,
        Volume = 1663200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/08"),
        Open = 31.93,
        High = 32.53,
        Low = 31.92,
        Close = 32.25,
        Volume = 2742700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/11"),
        Open = 32.4,
        High = 32.55,
        Low = 31.71,
        Close = 32.22,
        Volume = 2164900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/12"),
        Open = 32.12,
        High = 32.62,
        Low = 32.06,
        Close = 32.61,
        Volume = 2033300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/13"),
        Open = 32.44,
        High = 32.73,
        Low = 32.23,
        Close = 32.38,
        Volume = 1829900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/14"),
        Open = 32.5,
        High = 33.05,
        Low = 32.12,
        Close = 32.98,
        Volume = 2240600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/15"),
        Open = 33.15,
        High = 33.15,
        Low = 32.66,
        Close = 32.94,
        Volume = 1585100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/18"),
        Open = 33.1,
        High = 33.66,
        Low = 33,
        Close = 33.58,
        Volume = 2984900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/19"),
        Open = 33.63,
        High = 34.35,
        Low = 33.53,
        Close = 34.33,
        Volume = 4370600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/20"),
        Open = 34.33,
        High = 34.63,
        Low = 33.97,
        Close = 34.36,
        Volume = 3063100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/21"),
        Open = 34.5,
        High = 35.25,
        Low = 34.48,
        Close = 34.94,
        Volume = 3911800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/22"),
        Open = 35.65,
        High = 36.28,
        Low = 35.45,
        Close = 35.68,
        Volume = 6336600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/25"),
        Open = 35.67,
        High = 35.77,
        Low = 35.13,
        Close = 35.3,
        Volume = 2970500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/26"),
        Open = 35.2,
        High = 35.8,
        Low = 35.11,
        Close = 35.71,
        Volume = 3392900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/27"),
        Open = 35.65,
        High = 36.35,
        Low = 35.34,
        Close = 36.14,
        Volume = 3780900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/28"),
        Open = 36.14,
        High = 37.07,
        Low = 36.02,
        Close = 36.98,
        Volume = 3967400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/08/29"),
        Open = 36.9,
        High = 37.46,
        Low = 36.58,
        Close = 37.39,
        Volume = 2705100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/02"),
        Open = 37.49,
        High = 37.78,
        Low = 37.24,
        Close = 37.69,
        Volume = 2951500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/03"),
        Open = 37.8,
        High = 38.9,
        Low = 37.51,
        Close = 38.37,
        Volume = 4865000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/04"),
        Open = 38.37,
        High = 38.76,
        Low = 37.79,
        Close = 37.89,
        Volume = 3046500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/05"),
        Open = 37.89,
        High = 37.89,
        Low = 36.8,
        Close = 37.16,
        Volume = 3861300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/08"),
        Open = 37.45,
        High = 37.59,
        Low = 36.74,
        Close = 36.96,
        Volume = 4602700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/09"),
        Open = 36.75,
        High = 36.91,
        Low = 36.25,
        Close = 36.33,
        Volume = 3442400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/10"),
        Open = 36.1,
        High = 36.49,
        Low = 35.33,
        Close = 35.62,
        Volume = 4012700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/11"),
        Open = 35.62,
        High = 36.1,
        Low = 35.11,
        Close = 35.72,
        Volume = 3862000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/12"),
        Open = 35.72,
        High = 36,
        Low = 35.47,
        Close = 35.66,
        Volume = 3373100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/15"),
        Open = 35.47,
        High = 35.67,
        Low = 35.21,
        Close = 35.5,
        Volume = 2233100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/16"),
        Open = 35.48,
        High = 35.95,
        Low = 35.48,
        Close = 35.81,
        Volume = 3015900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/17"),
        Open = 35.72,
        High = 35.85,
        Low = 35.43,
        Close = 35.43,
        Volume = 1569800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/18"),
        Open = 35.68,
        High = 36.34,
        Low = 35.48,
        Close = 36.14,
        Volume = 3353600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/19"),
        Open = 36.14,
        High = 36.6,
        Low = 35.67,
        Close = 35.79,
        Volume = 3346600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/22"),
        Open = 35.45,
        High = 35.45,
        Low = 34.71,
        Close = 34.89,
        Volume = 2719700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/23"),
        Open = 34.69,
        High = 35.32,
        Low = 34.26,
        Close = 35.15,
        Volume = 3252700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/24"),
        Open = 34.9,
        High = 35.08,
        Low = 34.08,
        Close = 34.2,
        Volume = 3007900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/25"),
        Open = 33.96,
        High = 34.49,
        Low = 33.66,
        Close = 33.76,
        Volume = 3047000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/26"),
        Open = 33.82,
        High = 34.38,
        Low = 33.7,
        Close = 34.01,
        Volume = 3040000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/29"),
        Open = 34.45,
        High = 34.85,
        Low = 34.31,
        Close = 34.45,
        Volume = 3372400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/09/30"),
        Open = 34.15,
        High = 34.6,
        Low = 33.89,
        Close = 34.33,
        Volume = 2724900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/01"),
        Open = 34.5,
        High = 35.36,
        Low = 34.4,
        Close = 35.34,
        Volume = 2623400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/02"),
        Open = 35,
        High = 35.45,
        Low = 34.81,
        Close = 35.33,
        Volume = 2319900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/03"),
        Open = 35.84,
        High = 36.32,
        Low = 35.57,
        Close = 35.85,
        Volume = 3514600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/06"),
        Open = 35.6,
        High = 35.92,
        Low = 35.26,
        Close = 35.81,
        Volume = 2127700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/07"),
        Open = 36.1,
        High = 36.29,
        Low = 35.53,
        Close = 36.17,
        Volume = 2188500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/08"),
        Open = 35.9,
        High = 36.44,
        Low = 35.75,
        Close = 36.28,
        Volume = 2246500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/09"),
        Open = 36.28,
        High = 37.26,
        Low = 36.28,
        Close = 36.79,
        Volume = 3630800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/10"),
        Open = 37,
        High = 37.24,
        Low = 36.88,
        Close = 36.95,
        Volume = 2557900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/13"),
        Open = 36.96,
        High = 37.3,
        Low = 36.9,
        Close = 37.3,
        Volume = 2159800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/14"),
        Open = 37,
        High = 37.23,
        Low = 36.82,
        Close = 37.15,
        Volume = 2871300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/15"),
        Open = 36.92,
        High = 37.09,
        Low = 36.61,
        Close = 37,
        Volume = 2813900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/16"),
        Open = 36.8,
        High = 37.68,
        Low = 36.71,
        Close = 37.45,
        Volume = 2795400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/17"),
        Open = 37.5,
        High = 37.75,
        Low = 37.19,
        Close = 37.24,
        Volume = 2141300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/20"),
        Open = 37.05,
        High = 37.61,
        Low = 36.92,
        Close = 37.27,
        Volume = 1907400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/21"),
        Open = 37.25,
        High = 37.25,
        Low = 36.32,
        Close = 36.6,
        Volume = 2293900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/22"),
        Open = 36.64,
        High = 36.64,
        Low = 35.95,
        Close = 36.16,
        Volume = 2122800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/23"),
        Open = 36.16,
        High = 36.16,
        Low = 35.52,
        Close = 35.94,
        Volume = 2288800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/24"),
        Open = 35.45,
        High = 36.28,
        Low = 35.45,
        Close = 36.28,
        Volume = 2002400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/27"),
        Open = 36.27,
        High = 36.49,
        Low = 35.92,
        Close = 36.04,
        Volume = 1524700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/28"),
        Open = 36.05,
        High = 36.38,
        Low = 35.31,
        Close = 36.04,
        Volume = 3725600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/29"),
        Open = 36.2,
        High = 38.9,
        Low = 36.2,
        Close = 38.5,
        Volume = 8102300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/30"),
        Open = 39,
        High = 39.21,
        Low = 38.68,
        Close = 38.77,
        Volume = 5509800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/10/31"),
        Open = 38.9,
        High = 39,
        Low = 38.11,
        Close = 38.49,
        Volume = 2970300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/03"),
        Open = 38.54,
        High = 39.25,
        Low = 38.54,
        Close = 38.91,
        Volume = 2541400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/04"),
        Open = 38.67,
        High = 39.06,
        Low = 38.51,
        Close = 38.73,
        Volume = 2110000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/05"),
        Open = 38.75,
        High = 39,
        Low = 38.31,
        Close = 38.6,
        Volume = 2581800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/06"),
        Open = 38.9,
        High = 39.05,
        Low = 38.36,
        Close = 38.89,
        Volume = 2927800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/07"),
        Open = 39.2,
        High = 39.23,
        Low = 38.71,
        Close = 38.9,
        Volume = 2572800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/10"),
        Open = 39,
        High = 39,
        Low = 38.39,
        Close = 38.83,
        Volume = 2260800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/11"),
        Open = 38.85,
        High = 38.85,
        Low = 38.06,
        Close = 38.32,
        Volume = 2368000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/12"),
        Open = 38.14,
        High = 39.29,
        Low = 38.1,
        Close = 39.07,
        Volume = 2906600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/13"),
        Open = 40,
        High = 40.15,
        Low = 38.5,
        Close = 39.9,
        Volume = 4035700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/14"),
        Open = 39.98,
        High = 40,
        Low = 38.97,
        Close = 39.25,
        Volume = 1873200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/17"),
        Open = 39,
        High = 39.97,
        Low = 38.9,
        Close = 39.74,
        Volume = 3382600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/18"),
        Open = 39.25,
        High = 39.67,
        Low = 38.51,
        Close = 38.83,
        Volume = 5336200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/19"),
        Open = 38.6,
        High = 39.62,
        Low = 38.53,
        Close = 39.4,
        Volume = 2439700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/20"),
        Open = 39.1,
        High = 39.57,
        Low = 38.54,
        Close = 39.35,
        Volume = 2603700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/21"),
        Open = 39.35,
        High = 39.48,
        Low = 38.5,
        Close = 38.86,
        Volume = 2779200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/24"),
        Open = 38.86,
        High = 39.05,
        Low = 38.02,
        Close = 38.89,
        Volume = 6186300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/25"),
        Open = 38.67,
        High = 38.9,
        Low = 38.2,
        Close = 38.26,
        Volume = 3814500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/26"),
        Open = 38.2,
        High = 38.38,
        Low = 37.61,
        Close = 38.28,
        Volume = 3464600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/11/28"),
        Open = 38.38,
        High = 38.75,
        Low = 38.24,
        Close = 38.39,
        Volume = 1190500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/01"),
        Open = 38,
        High = 38.68,
        Low = 37.49,
        Close = 38.02,
        Volume = 7139900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/02"),
        Open = 37.8,
        High = 38.47,
        Low = 37.6,
        Close = 37.83,
        Volume = 6217000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/03"),
        Open = 37.88,
        High = 38.68,
        Low = 37.65,
        Close = 38.52,
        Volume = 3534900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/04"),
        Open = 38.52,
        High = 39.2,
        Low = 38.35,
        Close = 39.11,
        Volume = 2931200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/05"),
        Open = 38.86,
        High = 38.94,
        Low = 37.87,
        Close = 38,
        Volume = 4283200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/08"),
        Open = 38.01,
        High = 39.12,
        Low = 38.01,
        Close = 39.12,
        Volume = 2935700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/09"),
        Open = 39.05,
        High = 39.12,
        Low = 38.15,
        Close = 38.58,
        Volume = 3329800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/10"),
        Open = 38.5,
        High = 39.58,
        Low = 38.29,
        Close = 38.87,
        Volume = 3176900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/11"),
        Open = 38.9,
        High = 39.61,
        Low = 38.9,
        Close = 39.56,
        Volume = 3054400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/12"),
        Open = 39.65,
        High = 39.65,
        Low = 38.9,
        Close = 39.37,
        Volume = 2601900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/15"),
        Open = 40,
        High = 40,
        Low = 39.2,
        Close = 39.2,
        Volume = 2699700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/16"),
        Open = 39.17,
        High = 39.99,
        Low = 39.17,
        Close = 39.93,
        Volume = 2823400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/17"),
        Open = 40.01,
        High = 41.09,
        Low = 39.97,
        Close = 40.86,
        Volume = 5532800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/18"),
        Open = 40.55,
        High = 41.38,
        Low = 40.55,
        Close = 41.35,
        Volume = 3141600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/19"),
        Open = 41.73,
        High = 41.95,
        Low = 41.15,
        Close = 41.48,
        Volume = 5622100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/22"),
        Open = 40.45,
        High = 41.88,
        Low = 40.45,
        Close = 41.6,
        Volume = 2725800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/23"),
        Open = 41.72,
        High = 42,
        Low = 41.66,
        Close = 41.94,
        Volume = 2110500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/24"),
        Open = 41.6,
        High = 41.86,
        Low = 41.29,
        Close = 41.36,
        Volume = 1334800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/26"),
        Open = 41.5,
        High = 41.66,
        Low = 41.35,
        Close = 41.47,
        Volume = 502100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/29"),
        Open = 41.54,
        High = 42.03,
        Low = 41.37,
        Close = 42,
        Volume = 1802200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/30"),
        Open = 42.9,
        High = 43.37,
        Low = 42.17,
        Close = 42.28,
        Volume = 4842500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2003/12/31"),
        Open = 42.53,
        High = 42.56,
        Low = 41.89,
        Close = 42.14,
        Volume = 2348400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/02"),
        Open = 42.6,
        High = 42.85,
        Low = 41.71,
        Close = 41.99,
        Volume = 3144600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/05"),
        Open = 42,
        High = 42.58,
        Low = 41.94,
        Close = 42.07,
        Volume = 4112500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/06"),
        Open = 42,
        High = 42,
        Low = 41.47,
        Close = 41.93,
        Volume = 2506100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/07"),
        Open = 41.5,
        High = 42.65,
        Low = 41.5,
        Close = 42.28,
        Volume = 4212600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/08"),
        Open = 42.5,
        High = 43.14,
        Low = 42.26,
        Close = 42.86,
        Volume = 3101500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/09"),
        Open = 42.86,
        High = 44.53,
        Low = 42.54,
        Close = 42.64,
        Volume = 4077600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/12"),
        Open = 42.64,
        High = 42.64,
        Low = 42.05,
        Close = 42.41,
        Volume = 2449200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/13"),
        Open = 42.3,
        High = 42.47,
        Low = 41.6,
        Close = 42.24,
        Volume = 2377700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/14"),
        Open = 42.6,
        High = 43.3,
        Low = 42.56,
        Close = 43.11,
        Volume = 2952200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/15"),
        Open = 43.2,
        High = 43.4,
        Low = 42.71,
        Close = 43.04,
        Volume = 2324500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/16"),
        Open = 43.45,
        High = 44.03,
        Low = 43.06,
        Close = 44.01,
        Volume = 2640700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/20"),
        Open = 44.55,
        High = 44.71,
        Low = 42.98,
        Close = 43.18,
        Volume = 4949100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/21"),
        Open = 43.23,
        High = 43.82,
        Low = 42.9,
        Close = 43.6,
        Volume = 3564600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/22"),
        Open = 43.4,
        High = 43.63,
        Low = 42.88,
        Close = 42.9,
        Volume = 2577300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/23"),
        Open = 42.85,
        High = 43.08,
        Low = 41.64,
        Close = 41.85,
        Volume = 3902300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/26"),
        Open = 41.85,
        High = 42.54,
        Low = 41.65,
        Close = 42.44,
        Volume = 2856800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/27"),
        Open = 42.3,
        High = 42.6,
        Low = 41.65,
        Close = 41.94,
        Volume = 2110700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/28"),
        Open = 41.95,
        High = 42.6,
        Low = 41.5,
        Close = 41.54,
        Volume = 3306600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/29"),
        Open = 42.1,
        High = 42.68,
        Low = 42,
        Close = 42.3,
        Volume = 3412300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/01/30"),
        Open = 42,
        High = 42.15,
        Low = 41.52,
        Close = 41.75,
        Volume = 2588900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/02"),
        Open = 41.67,
        High = 43.09,
        Low = 41.6,
        Close = 42.54,
        Volume = 3184400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/03"),
        Open = 42.54,
        High = 43.48,
        Low = 42.21,
        Close = 43.1,
        Volume = 3797200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/04"),
        Open = 43.1,
        High = 44.25,
        Low = 43.05,
        Close = 43.56,
        Volume = 5379600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/05"),
        Open = 43.63,
        High = 44.45,
        Low = 43.58,
        Close = 44.36,
        Volume = 3049800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/06"),
        Open = 44.36,
        High = 45.02,
        Low = 43.99,
        Close = 44.35,
        Volume = 4736100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/09"),
        Open = 44.2,
        High = 44.35,
        Low = 43.72,
        Close = 43.96,
        Volume = 3022200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/10"),
        Open = 43.82,
        High = 43.9,
        Low = 43.5,
        Close = 43.77,
        Volume = 2796600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/11"),
        Open = 43.6,
        High = 44.61,
        Low = 43.32,
        Close = 44.49,
        Volume = 3145400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/12"),
        Open = 44.3,
        High = 44.48,
        Low = 44.02,
        Close = 44.37,
        Volume = 1761500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/13"),
        Open = 44.2,
        High = 44.66,
        Low = 44.17,
        Close = 44.45,
        Volume = 1923700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/17"),
        Open = 44.6,
        High = 44.75,
        Low = 44.39,
        Close = 44.6,
        Volume = 2049200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/18"),
        Open = 44.9,
        High = 45.1,
        Low = 44.38,
        Close = 44.59,
        Volume = 2950400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/19"),
        Open = 44.9,
        High = 44.96,
        Low = 44.4,
        Close = 44.52,
        Volume = 3402700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/20"),
        Open = 44.65,
        High = 44.94,
        Low = 44.3,
        Close = 44.34,
        Volume = 3275100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/23"),
        Open = 44.54,
        High = 44.57,
        Low = 43.09,
        Close = 43.62,
        Volume = 4029300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/24"),
        Open = 43.3,
        High = 43.73,
        Low = 42.9,
        Close = 43.22,
        Volume = 3135300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/25"),
        Open = 43.22,
        High = 44.06,
        Low = 43.09,
        Close = 43.82,
        Volume = 3074000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/26"),
        Open = 43,
        High = 43.72,
        Low = 41.97,
        Close = 42.44,
        Volume = 7116200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/02/27"),
        Open = 42.6,
        High = 43.57,
        Low = 42.6,
        Close = 43.37,
        Volume = 6432900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/01"),
        Open = 43.68,
        High = 43.87,
        Low = 43,
        Close = 43.77,
        Volume = 2612300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/02"),
        Open = 43.55,
        High = 43.86,
        Low = 42.98,
        Close = 43.33,
        Volume = 2842600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/03"),
        Open = 43.07,
        High = 43.4,
        Low = 42.96,
        Close = 43.06,
        Volume = 2838400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/04"),
        Open = 42.87,
        High = 43,
        Low = 42.22,
        Close = 42.63,
        Volume = 2419900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/05"),
        Open = 42.55,
        High = 42.9,
        Low = 42.14,
        Close = 42.72,
        Volume = 3121600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/08"),
        Open = 42.72,
        High = 42.85,
        Low = 42.39,
        Close = 42.42,
        Volume = 2539800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/09"),
        Open = 42.2,
        High = 42.7,
        Low = 41.41,
        Close = 41.68,
        Volume = 3559400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/10"),
        Open = 41.75,
        High = 41.75,
        Low = 40.73,
        Close = 41.12,
        Volume = 3732000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/11"),
        Open = 41,
        High = 41.12,
        Low = 40.07,
        Close = 40.15,
        Volume = 3097100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/12"),
        Open = 40.08,
        High = 40.39,
        Low = 39.43,
        Close = 40.3,
        Volume = 4587900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/15"),
        Open = 39.95,
        High = 40.46,
        Low = 39.7,
        Close = 39.78,
        Volume = 3105100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/16"),
        Open = 39.74,
        High = 39.74,
        Low = 38.98,
        Close = 39.41,
        Volume = 3628100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/17"),
        Open = 39.55,
        High = 39.89,
        Low = 39.48,
        Close = 39.8,
        Volume = 2577700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/18"),
        Open = 39.75,
        High = 39.93,
        Low = 39.3,
        Close = 39.72,
        Volume = 2349100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/19"),
        Open = 39.72,
        High = 40.05,
        Low = 39.37,
        Close = 39.43,
        Volume = 2721700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/22"),
        Open = 39.38,
        High = 39.38,
        Low = 38.04,
        Close = 38.68,
        Volume = 4473700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/23"),
        Open = 38.93,
        High = 39.89,
        Low = 38.93,
        Close = 39.11,
        Volume = 3489100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/24"),
        Open = 38.73,
        High = 39.27,
        Low = 38.34,
        Close = 39.03,
        Volume = 3362300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/25"),
        Open = 39.25,
        High = 39.9,
        Low = 39.1,
        Close = 39.72,
        Volume = 2018400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/26"),
        Open = 39.52,
        High = 39.77,
        Low = 39.1,
        Close = 39.35,
        Volume = 3481000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/29"),
        Open = 39.8,
        High = 40.02,
        Low = 39.6,
        Close = 39.93,
        Volume = 2126500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/30"),
        Open = 39.85,
        High = 40.43,
        Low = 39.7,
        Close = 40.33,
        Volume = 2464800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/03/31"),
        Open = 40.5,
        High = 41.35,
        Low = 40.32,
        Close = 41.07,
        Volume = 3360800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/01"),
        Open = 41.07,
        High = 41.27,
        Low = 40.6,
        Close = 40.77,
        Volume = 2310200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/02"),
        Open = 41.1,
        High = 42.24,
        Low = 41.05,
        Close = 41.84,
        Volume = 3260800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/05"),
        Open = 42.94,
        High = 42.94,
        Low = 41.85,
        Close = 42.54,
        Volume = 2350900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/06"),
        Open = 42.5,
        High = 42.5,
        Low = 42.11,
        Close = 42.36,
        Volume = 1917300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/07"),
        Open = 42.16,
        High = 42.36,
        Low = 41.51,
        Close = 41.76,
        Volume = 2583900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/08"),
        Open = 41.95,
        High = 42.23,
        Low = 41.2,
        Close = 41.35,
        Volume = 2145400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/12"),
        Open = 41.7,
        High = 42.19,
        Low = 41.6,
        Close = 42.15,
        Volume = 1595900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/13"),
        Open = 42.17,
        High = 42.6,
        Low = 41.68,
        Close = 41.78,
        Volume = 2180600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/14"),
        Open = 41.73,
        High = 41.9,
        Low = 41.42,
        Close = 41.57,
        Volume = 1573200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/15"),
        Open = 41.85,
        High = 42.03,
        Low = 41.11,
        Close = 41.53,
        Volume = 1509400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/16"),
        Open = 42.03,
        High = 42.24,
        Low = 41.4,
        Close = 41.5,
        Volume = 2614700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/19"),
        Open = 41.63,
        High = 41.71,
        Low = 41.39,
        Close = 41.49,
        Volume = 1307500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/20"),
        Open = 41.47,
        High = 41.7,
        Low = 40.55,
        Close = 40.55,
        Volume = 2290300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/21"),
        Open = 40.49,
        High = 41.22,
        Low = 40.31,
        Close = 40.85,
        Volume = 2134200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/22"),
        Open = 41.7,
        High = 42.63,
        Low = 41.35,
        Close = 42.27,
        Volume = 3579300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/23"),
        Open = 42.16,
        High = 42.75,
        Low = 41.87,
        Close = 42.45,
        Volume = 2218800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/26"),
        Open = 43.15,
        High = 43.5,
        Low = 42.93,
        Close = 43.24,
        Volume = 3268200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/27"),
        Open = 43.24,
        High = 44,
        Low = 43.24,
        Close = 43.55,
        Volume = 2884300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/28"),
        Open = 44.05,
        High = 44.9,
        Low = 43.55,
        Close = 44.03,
        Volume = 5964000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/29"),
        Open = 44.03,
        High = 44.15,
        Low = 43.07,
        Close = 43.25,
        Volume = 2465800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/04/30"),
        Open = 43.25,
        High = 43.28,
        Low = 42.6,
        Close = 42.69,
        Volume = 2665500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/03"),
        Open = 43.25,
        High = 44,
        Low = 43.2,
        Close = 43.58,
        Volume = 2778400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/04"),
        Open = 43.58,
        High = 43.66,
        Low = 43.01,
        Close = 43.28,
        Volume = 2733400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/05"),
        Open = 43.13,
        High = 44.09,
        Low = 43,
        Close = 43.76,
        Volume = 2467800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/06"),
        Open = 43.68,
        High = 44.3,
        Low = 43.5,
        Close = 43.93,
        Volume = 3396500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/07"),
        Open = 43.6,
        High = 44.05,
        Low = 43.31,
        Close = 43.4,
        Volume = 2247000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/10"),
        Open = 43,
        High = 43.28,
        Low = 42.29,
        Close = 42.59,
        Volume = 3630100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/11"),
        Open = 42.5,
        High = 43.36,
        Low = 42.41,
        Close = 43.18,
        Volume = 3314700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/12"),
        Open = 43.2,
        High = 43.58,
        Low = 42.7,
        Close = 43.58,
        Volume = 2730300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/13"),
        Open = 43.63,
        High = 43.84,
        Low = 43.18,
        Close = 43.62,
        Volume = 1960600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/14"),
        Open = 43.1,
        High = 43.59,
        Low = 42.95,
        Close = 43.44,
        Volume = 2708800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/17"),
        Open = 42.7,
        High = 43.61,
        Low = 42.49,
        Close = 42.73,
        Volume = 2443300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/18"),
        Open = 42.84,
        High = 43.2,
        Low = 42.7,
        Close = 43.02,
        Volume = 1470200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/19"),
        Open = 43.1,
        High = 44.11,
        Low = 43.04,
        Close = 43.38,
        Volume = 3006700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/20"),
        Open = 43.14,
        High = 43.22,
        Low = 42.75,
        Close = 42.92,
        Volume = 2258100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/21"),
        Open = 43.15,
        High = 43.46,
        Low = 43,
        Close = 43.4,
        Volume = 2128900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/24"),
        Open = 44.22,
        High = 44.6,
        Low = 44.02,
        Close = 44.56,
        Volume = 3795300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/25"),
        Open = 44.55,
        High = 44.92,
        Low = 44.25,
        Close = 44.7,
        Volume = 3958300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/26"),
        Open = 44.35,
        High = 44.98,
        Low = 44.13,
        Close = 44.76,
        Volume = 3421800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/27"),
        Open = 45,
        High = 46.62,
        Low = 44.91,
        Close = 46.2,
        Volume = 6674000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/05/28"),
        Open = 46,
        High = 46.5,
        Low = 45.45,
        Close = 45.8,
        Volume = 5144000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/01"),
        Open = 45.9,
        High = 46.3,
        Low = 45.51,
        Close = 45.88,
        Volume = 4210500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/02"),
        Open = 47.22,
        High = 47.22,
        Low = 45.9,
        Close = 46.75,
        Volume = 3637200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/03"),
        Open = 46.45,
        High = 46.65,
        Low = 46.1,
        Close = 46.1,
        Volume = 2359000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/04"),
        Open = 46.3,
        High = 47.03,
        Low = 46.2,
        Close = 46.9,
        Volume = 2832600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/07"),
        Open = 47.5,
        High = 48.4,
        Low = 47.47,
        Close = 48.13,
        Volume = 5744200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/08"),
        Open = 48,
        High = 48.13,
        Low = 47.62,
        Close = 48.09,
        Volume = 3453000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/09"),
        Open = 48.09,
        High = 48.82,
        Low = 48.05,
        Close = 48.66,
        Volume = 3325000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/10"),
        Open = 48.62,
        High = 48.83,
        Low = 48.44,
        Close = 48.75,
        Volume = 2522500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/14"),
        Open = 48.5,
        High = 48.98,
        Low = 48.37,
        Close = 48.83,
        Volume = 3923900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/15"),
        Open = 49.9,
        High = 49.9,
        Low = 48.9,
        Close = 49.25,
        Volume = 6940400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/16"),
        Open = 49.47,
        High = 50,
        Low = 49.31,
        Close = 49.9,
        Volume = 3276700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/17"),
        Open = 49.58,
        High = 49.69,
        Low = 49.3,
        Close = 49.47,
        Volume = 3535800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/18"),
        Open = 49.32,
        High = 49.95,
        Low = 49.24,
        Close = 49.8,
        Volume = 4057600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/21"),
        Open = 49.65,
        High = 49.92,
        Low = 49.47,
        Close = 49.5,
        Volume = 2317400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/22"),
        Open = 49.35,
        High = 49.79,
        Low = 49.33,
        Close = 49.67,
        Volume = 2620200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/23"),
        Open = 49.5,
        High = 50.75,
        Low = 49.4,
        Close = 50.67,
        Volume = 3553500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/24"),
        Open = 50.26,
        High = 50.78,
        Low = 50.11,
        Close = 50.35,
        Volume = 2461800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/25"),
        Open = 50.42,
        High = 51.35,
        Low = 50.4,
        Close = 51.3,
        Volume = 4445000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/28"),
        Open = 51.3,
        High = 51.49,
        Low = 50.1,
        Close = 50.21,
        Volume = 2942800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/29"),
        Open = 49.99,
        High = 50.7,
        Low = 49.82,
        Close = 50.51,
        Volume = 3079300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/06/30"),
        Open = 50.51,
        High = 51.23,
        Low = 50.42,
        Close = 51.09,
        Volume = 2679000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/01"),
        Open = 50.1,
        High = 50.53,
        Low = 49.57,
        Close = 49.9,
        Volume = 3543100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/02"),
        Open = 49.52,
        High = 49.69,
        Low = 48.84,
        Close = 49.52,
        Volume = 2818700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/06"),
        Open = 49.9,
        High = 50.11,
        Low = 49.07,
        Close = 49.31,
        Volume = 3918600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/07"),
        Open = 49.55,
        High = 49.83,
        Low = 49.13,
        Close = 49.39,
        Volume = 2876700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/08"),
        Open = 49.39,
        High = 50.27,
        Low = 48.82,
        Close = 49.97,
        Volume = 3524400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/09"),
        Open = 49.94,
        High = 50.25,
        Low = 49.88,
        Close = 50.04,
        Volume = 2351000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/12"),
        Open = 49.95,
        High = 50.3,
        Low = 49.75,
        Close = 50.2,
        Volume = 2937200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/13"),
        Open = 50.2,
        High = 50.37,
        Low = 49.92,
        Close = 50.26,
        Volume = 2033700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/14"),
        Open = 50.26,
        High = 50.65,
        Low = 49.15,
        Close = 49.32,
        Volume = 2810600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/15"),
        Open = 49.1,
        High = 49.47,
        Low = 48.34,
        Close = 49.14,
        Volume = 3532900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/16"),
        Open = 49.6,
        High = 49.61,
        Low = 49,
        Close = 49.13,
        Volume = 2189500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/19"),
        Open = 49.35,
        High = 49.53,
        Low = 48.48,
        Close = 48.67,
        Volume = 2618900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/20"),
        Open = 48.68,
        High = 48.86,
        Low = 48.31,
        Close = 48.76,
        Volume = 2359700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/21"),
        Open = 48.7,
        High = 49.09,
        Low = 47.68,
        Close = 47.72,
        Volume = 3178700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/22"),
        Open = 47.72,
        High = 48.03,
        Low = 46.4,
        Close = 47.3,
        Volume = 6574000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/23"),
        Open = 47.31,
        High = 47.38,
        Low = 46.61,
        Close = 47.06,
        Volume = 2896100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/26"),
        Open = 47.1,
        High = 47.42,
        Low = 46.89,
        Close = 47,
        Volume = 2233500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/27"),
        Open = 47.35,
        High = 48.35,
        Low = 47.11,
        Close = 48.22,
        Volume = 2972400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/28"),
        Open = 48.74,
        High = 49.77,
        Low = 48.51,
        Close = 49.01,
        Volume = 3990700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/29"),
        Open = 49.4,
        High = 49.95,
        Low = 49.21,
        Close = 49.68,
        Volume = 2884400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/07/30"),
        Open = 49.9,
        High = 51.25,
        Low = 49.74,
        Close = 50.75,
        Volume = 4829100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/02"),
        Open = 50.2,
        High = 51.05,
        Low = 50.16,
        Close = 50.91,
        Volume = 2395200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/03"),
        Open = 50.94,
        High = 51.46,
        Low = 50.61,
        Close = 50.76,
        Volume = 3474800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/04"),
        Open = 50.6,
        High = 51.05,
        Low = 50.3,
        Close = 51,
        Volume = 3563200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/05"),
        Open = 51,
        High = 51.18,
        Low = 49.99,
        Close = 50.01,
        Volume = 2861700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/06"),
        Open = 49.97,
        High = 49.97,
        Low = 48.27,
        Close = 48.33,
        Volume = 3358800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/09"),
        Open = 48.59,
        High = 48.94,
        Low = 48.46,
        Close = 48.76,
        Volume = 2380800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/10"),
        Open = 48.51,
        High = 49.61,
        Low = 48.51,
        Close = 49.61,
        Volume = 3535200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/11"),
        Open = 49.25,
        High = 49.79,
        Low = 48.53,
        Close = 49.68,
        Volume = 2976900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/12"),
        Open = 49.44,
        High = 49.75,
        Low = 48.64,
        Close = 49.33,
        Volume = 2983000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/13"),
        Open = 49.7,
        High = 49.8,
        Low = 49.2,
        Close = 49.72,
        Volume = 2187900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/16"),
        Open = 49.72,
        High = 51.07,
        Low = 49.64,
        Close = 50.95,
        Volume = 4168900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/17"),
        Open = 51.2,
        High = 51.32,
        Low = 50.18,
        Close = 50.31,
        Volume = 3604400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/18"),
        Open = 50.29,
        High = 50.75,
        Low = 49.93,
        Close = 50.74,
        Volume = 2090600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/19"),
        Open = 50.74,
        High = 50.83,
        Low = 49.95,
        Close = 50.25,
        Volume = 2191000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/20"),
        Open = 50,
        High = 50.56,
        Low = 49.97,
        Close = 50.46,
        Volume = 3327300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/23"),
        Open = 50.75,
        High = 50.76,
        Low = 50.35,
        Close = 50.65,
        Volume = 2112300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/24"),
        Open = 50.73,
        High = 51,
        Low = 50.39,
        Close = 50.91,
        Volume = 1706000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/25"),
        Open = 51.55,
        High = 52.82,
        Low = 51.15,
        Close = 52.5,
        Volume = 7291900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/26"),
        Open = 52.51,
        High = 52.65,
        Low = 51.93,
        Close = 52.07,
        Volume = 3359200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/27"),
        Open = 52.13,
        High = 52.6,
        Low = 51.88,
        Close = 51.99,
        Volume = 1446900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/30"),
        Open = 51.99,
        High = 52.51,
        Low = 51.81,
        Close = 51.87,
        Volume = 1587400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/08/31"),
        Open = 51.9,
        High = 52.22,
        Low = 51.69,
        Close = 52.22,
        Volume = 2190200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/01"),
        Open = 52.1,
        High = 52.58,
        Low = 51.94,
        Close = 52.39,
        Volume = 2261000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/02"),
        Open = 52.39,
        High = 53.69,
        Low = 52.36,
        Close = 53.59,
        Volume = 3712700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/03"),
        Open = 53.68,
        High = 53.95,
        Low = 53.1,
        Close = 53.1,
        Volume = 2799400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/07"),
        Open = 53.4,
        High = 54.01,
        Low = 53.4,
        Close = 53.97,
        Volume = 2964700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/08"),
        Open = 53.61,
        High = 54.32,
        Low = 53.6,
        Close = 54.05,
        Volume = 2705400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/09"),
        Open = 53.97,
        High = 54.17,
        Low = 53.23,
        Close = 53.26,
        Volume = 2542700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/10"),
        Open = 52.85,
        High = 54.2,
        Low = 52.65,
        Close = 54.15,
        Volume = 3097300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/13"),
        Open = 54.15,
        High = 54.86,
        Low = 53.81,
        Close = 54.28,
        Volume = 2907300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/14"),
        Open = 54.29,
        High = 54.49,
        Low = 53.72,
        Close = 53.92,
        Volume = 1922200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/15"),
        Open = 54.05,
        High = 54.25,
        Low = 53.33,
        Close = 53.66,
        Volume = 1694900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/16"),
        Open = 53.8,
        High = 54.57,
        Low = 53.67,
        Close = 54.52,
        Volume = 2396300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/17"),
        Open = 54.73,
        High = 55.24,
        Low = 54.56,
        Close = 55.15,
        Volume = 3324500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/20"),
        Open = 54.75,
        High = 55.19,
        Low = 54.42,
        Close = 54.74,
        Volume = 2458400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/21"),
        Open = 54.71,
        High = 55.05,
        Low = 54.52,
        Close = 54.7,
        Volume = 2628900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/22"),
        Open = 54.3,
        High = 54.44,
        Low = 53.41,
        Close = 53.68,
        Volume = 2821400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/23"),
        Open = 53.2,
        High = 53.25,
        Low = 52.58,
        Close = 53,
        Volume = 3999200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/24"),
        Open = 52.98,
        High = 53.4,
        Low = 52.79,
        Close = 53.14,
        Volume = 2731900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/27"),
        Open = 52.9,
        High = 53,
        Low = 52.3,
        Close = 52.51,
        Volume = 2057700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/28"),
        Open = 52.51,
        High = 52.72,
        Low = 51.75,
        Close = 52.32,
        Volume = 3500700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/29"),
        Open = 51.42,
        High = 51.42,
        Low = 50.5,
        Close = 51.01,
        Volume = 5953500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/09/30"),
        Open = 50.85,
        High = 51.99,
        Low = 50.62,
        Close = 51.62,
        Volume = 3748400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/01"),
        Open = 51.62,
        High = 52.49,
        Low = 51.42,
        Close = 52.48,
        Volume = 3382800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/04"),
        Open = 52.55,
        High = 52.87,
        Low = 50.88,
        Close = 52.32,
        Volume = 4831500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/05"),
        Open = 52,
        High = 52.07,
        Low = 51.3,
        Close = 51.49,
        Volume = 3380700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/06"),
        Open = 51.49,
        High = 52.36,
        Low = 51.14,
        Close = 52.36,
        Volume = 2461700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/07"),
        Open = 52.49,
        High = 52.49,
        Low = 51.32,
        Close = 51.32,
        Volume = 1993800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/08"),
        Open = 51.12,
        High = 51.24,
        Low = 49.89,
        Close = 50.1,
        Volume = 3944800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/11"),
        Open = 50.11,
        High = 50.49,
        Low = 49.97,
        Close = 50.26,
        Volume = 2107900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/12"),
        Open = 50.27,
        High = 50.56,
        Low = 49.81,
        Close = 50.4,
        Volume = 2506700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/13"),
        Open = 50.71,
        High = 51.09,
        Low = 49.92,
        Close = 50.23,
        Volume = 2268900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/14"),
        Open = 50.15,
        High = 51,
        Low = 50.15,
        Close = 50.25,
        Volume = 3004100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/15"),
        Open = 50.5,
        High = 51.28,
        Low = 50.18,
        Close = 50.19,
        Volume = 3467000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/18"),
        Open = 49.55,
        High = 49.83,
        Low = 49.25,
        Close = 49.59,
        Volume = 3074500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/19"),
        Open = 49.1,
        High = 50,
        Low = 48.85,
        Close = 49.21,
        Volume = 3181300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/20"),
        Open = 49.3,
        High = 49.55,
        Low = 48.3,
        Close = 48.96,
        Volume = 3208200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/21"),
        Open = 48.95,
        High = 49.98,
        Low = 48.81,
        Close = 49.56,
        Volume = 3702500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/22"),
        Open = 49.5,
        High = 50.1,
        Low = 49.07,
        Close = 49.51,
        Volume = 2455800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/25"),
        Open = 49.05,
        High = 49.32,
        Low = 48.1,
        Close = 49,
        Volume = 3983400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/26"),
        Open = 48.82,
        High = 50.17,
        Low = 48.65,
        Close = 49.98,
        Volume = 3860700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/27"),
        Open = 51,
        High = 51.25,
        Low = 49.8,
        Close = 50.1,
        Volume = 5404400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/28"),
        Open = 50.11,
        High = 50.45,
        Low = 49.54,
        Close = 49.87,
        Volume = 4136900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/10/29"),
        Open = 49.97,
        High = 50.22,
        Low = 49.8,
        Close = 49.9,
        Volume = 2682300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/01"),
        Open = 50.1,
        High = 50.17,
        Low = 49.65,
        Close = 49.95,
        Volume = 2515900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/02"),
        Open = 50.05,
        High = 50.54,
        Low = 49.66,
        Close = 49.88,
        Volume = 2765600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/03"),
        Open = 51,
        High = 52.1,
        Low = 50.94,
        Close = 51.15,
        Volume = 5446300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/04"),
        Open = 50.85,
        High = 50.92,
        Low = 50.17,
        Close = 50.59,
        Volume = 4875500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/05"),
        Open = 50.8,
        High = 51.37,
        Low = 50.41,
        Close = 51.15,
        Volume = 4375500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/08"),
        Open = 51.15,
        High = 52.48,
        Low = 51.06,
        Close = 52.07,
        Volume = 3905400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/09"),
        Open = 51.85,
        High = 52.89,
        Low = 51.6,
        Close = 52.51,
        Volume = 4086400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/10"),
        Open = 52.82,
        High = 53.45,
        Low = 52.74,
        Close = 53.4,
        Volume = 4081600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/11"),
        Open = 53.41,
        High = 54.32,
        Low = 53.41,
        Close = 54.3,
        Volume = 4108000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/12"),
        Open = 54.2,
        High = 54.39,
        Low = 53.52,
        Close = 53.93,
        Volume = 2628000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/15"),
        Open = 53.85,
        High = 54.23,
        Low = 53.61,
        Close = 54.03,
        Volume = 3778100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/16"),
        Open = 54,
        High = 54.21,
        Low = 53.72,
        Close = 54,
        Volume = 2736900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/17"),
        Open = 54.3,
        High = 55.22,
        Low = 54.24,
        Close = 54.75,
        Volume = 4261600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/18"),
        Open = 55.15,
        High = 55.48,
        Low = 54.65,
        Close = 54.85,
        Volume = 3063000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/19"),
        Open = 54.85,
        High = 54.85,
        Low = 53.77,
        Close = 53.77,
        Volume = 2906800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/22"),
        Open = 53.76,
        High = 53.97,
        Low = 53.26,
        Close = 53.97,
        Volume = 3030500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/23"),
        Open = 53.96,
        High = 54.34,
        Low = 53.41,
        Close = 54.33,
        Volume = 3210600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/24"),
        Open = 54.33,
        High = 54.5,
        Low = 53.76,
        Close = 54.12,
        Volume = 3025900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/26"),
        Open = 54.13,
        High = 54.24,
        Low = 53.9,
        Close = 54.02,
        Volume = 1455600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/29"),
        Open = 54.02,
        High = 54.38,
        Low = 53.28,
        Close = 53.62,
        Volume = 2666000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/11/30"),
        Open = 53.45,
        High = 54.04,
        Low = 53.44,
        Close = 53.57,
        Volume = 2407400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/01"),
        Open = 53.6,
        High = 54.7,
        Low = 53.57,
        Close = 54.7,
        Volume = 2972900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/02"),
        Open = 54.5,
        High = 54.9,
        Low = 54.3,
        Close = 54.86,
        Volume = 2432600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/03"),
        Open = 53.27,
        High = 55.29,
        Low = 53.27,
        Close = 55.26,
        Volume = 3346700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/06"),
        Open = 55.26,
        High = 55.26,
        Low = 54.52,
        Close = 54.75,
        Volume = 2271100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/07"),
        Open = 54.75,
        High = 55,
        Low = 53.72,
        Close = 53.75,
        Volume = 2661500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/08"),
        Open = 53.95,
        High = 53.98,
        Low = 52.42,
        Close = 52.8,
        Volume = 4264300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/09"),
        Open = 52.68,
        High = 52.99,
        Low = 52.2,
        Close = 52.78,
        Volume = 4347000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/10"),
        Open = 52.78,
        High = 52.99,
        Low = 52.33,
        Close = 52.42,
        Volume = 4107600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/13"),
        Open = 54.37,
        High = 54.37,
        Low = 52.26,
        Close = 52.67,
        Volume = 2909500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/14"),
        Open = 52.92,
        High = 53.02,
        Low = 52.49,
        Close = 52.64,
        Volume = 3085100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/15"),
        Open = 52.78,
        High = 52.78,
        Low = 52.29,
        Close = 52.4,
        Volume = 3559500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/16"),
        Open = 52.4,
        High = 52.49,
        Low = 51.79,
        Close = 52.08,
        Volume = 3485000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/17"),
        Open = 52,
        High = 53.4,
        Low = 51.98,
        Close = 53.1,
        Volume = 5299500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/20"),
        Open = 53.1,
        High = 53.76,
        Low = 53.09,
        Close = 53.22,
        Volume = 2337100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/21"),
        Open = 53.26,
        High = 53.68,
        Low = 52.72,
        Close = 53.42,
        Volume = 2663300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/22"),
        Open = 50.7,
        High = 54.29,
        Low = 50.7,
        Close = 53.91,
        Volume = 1998400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/23"),
        Open = 53.75,
        High = 53.85,
        Low = 53.32,
        Close = 53.53,
        Volume = 1103900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/27"),
        Open = 53.39,
        High = 53.65,
        Low = 52.91,
        Close = 53.15,
        Volume = 1465000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/28"),
        Open = 52.97,
        High = 53.54,
        Low = 52.97,
        Close = 53.25,
        Volume = 995500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/29"),
        Open = 52.65,
        High = 52.66,
        Low = 51.77,
        Close = 52.07,
        Volume = 4008700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/30"),
        Open = 52.25,
        High = 52.5,
        Low = 51.62,
        Close = 51.9,
        Volume = 2577300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2004/12/31"),
        Open = 51.77,
        High = 52.09,
        Low = 51.69,
        Close = 51.77,
        Volume = 1667600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/03"),
        Open = 51.85,
        High = 52.25,
        Low = 50.92,
        Close = 50.97,
        Volume = 3729300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/04"),
        Open = 51.15,
        High = 51.15,
        Low = 49.88,
        Close = 49.98,
        Volume = 4649600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/05"),
        Open = 50,
        High = 51.13,
        Low = 49.55,
        Close = 50.81,
        Volume = 5334000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/06"),
        Open = 50.68,
        High = 51.12,
        Low = 50.34,
        Close = 50.48,
        Volume = 3066900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/07"),
        Open = 50.5,
        High = 50.85,
        Low = 50.1,
        Close = 50.31,
        Volume = 1951800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/10"),
        Open = 50.13,
        High = 51.33,
        Low = 50.1,
        Close = 50.98,
        Volume = 2844700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/11"),
        Open = 51.03,
        High = 51.1,
        Low = 50.61,
        Close = 50.82,
        Volume = 2025100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/12"),
        Open = 51,
        High = 51.96,
        Low = 50.95,
        Close = 51.94,
        Volume = 4077100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/13"),
        Open = 51.9,
        High = 52.15,
        Low = 50.58,
        Close = 50.63,
        Volume = 4243200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/14"),
        Open = 50.6,
        High = 50.99,
        Low = 50.1,
        Close = 50.91,
        Volume = 3081700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/18"),
        Open = 50.5,
        High = 51.97,
        Low = 50.45,
        Close = 51.88,
        Volume = 3485000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/19"),
        Open = 51.6,
        High = 51.86,
        Low = 51.31,
        Close = 51.41,
        Volume = 2715300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/20"),
        Open = 51.1,
        High = 51.51,
        Low = 50.88,
        Close = 50.9,
        Volume = 2451700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/21"),
        Open = 50.65,
        High = 50.98,
        Low = 50.01,
        Close = 50.07,
        Volume = 2565600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/24"),
        Open = 50.33,
        High = 50.6,
        Low = 49.52,
        Close = 49.64,
        Volume = 3005400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/25"),
        Open = 50.15,
        High = 50.21,
        Low = 49.52,
        Close = 49.84,
        Volume = 2933500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/26"),
        Open = 49.56,
        High = 50.34,
        Low = 49.52,
        Close = 49.86,
        Volume = 3188500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/27"),
        Open = 49.54,
        High = 51,
        Low = 49.54,
        Close = 50.97,
        Volume = 4707400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/28"),
        Open = 50.97,
        High = 50.98,
        Low = 49.54,
        Close = 49.92,
        Volume = 3696200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/01/31"),
        Open = 50.25,
        High = 50.63,
        Low = 50.07,
        Close = 50.6,
        Volume = 3891100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/01"),
        Open = 50.6,
        High = 51.18,
        Low = 50.22,
        Close = 51.04,
        Volume = 2602600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/02"),
        Open = 51.6,
        High = 52.89,
        Low = 51.42,
        Close = 52.23,
        Volume = 6084300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/03"),
        Open = 52.95,
        High = 52.95,
        Low = 51.94,
        Close = 52,
        Volume = 4184700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/04"),
        Open = 51.95,
        High = 52.9,
        Low = 51.9,
        Close = 52.58,
        Volume = 3277600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/07"),
        Open = 52.42,
        High = 52.69,
        Low = 52.3,
        Close = 52.5,
        Volume = 3687000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/08"),
        Open = 52.65,
        High = 53.62,
        Low = 52.39,
        Close = 53.5,
        Volume = 6064300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/09"),
        Open = 53.5,
        High = 54.16,
        Low = 53.36,
        Close = 54.12,
        Volume = 4776600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/10"),
        Open = 54.12,
        High = 54.43,
        Low = 53.63,
        Close = 53.86,
        Volume = 3630800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/11"),
        Open = 53.75,
        High = 54.3,
        Low = 53.35,
        Close = 54.14,
        Volume = 2191300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/14"),
        Open = 54.01,
        High = 54.33,
        Low = 53.72,
        Close = 54.04,
        Volume = 2763700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/15"),
        Open = 54.25,
        High = 54.82,
        Low = 54.01,
        Close = 54.43,
        Volume = 3281800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/16"),
        Open = 54.15,
        High = 54.29,
        Low = 53.8,
        Close = 53.92,
        Volume = 2725300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/17"),
        Open = 54.2,
        High = 54.45,
        Low = 53.12,
        Close = 53.66,
        Volume = 4093400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/18"),
        Open = 53.67,
        High = 53.67,
        Low = 52.55,
        Close = 52.78,
        Volume = 4682700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/22"),
        Open = 52.35,
        High = 52.55,
        Low = 52.07,
        Close = 52.15,
        Volume = 3292200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/23"),
        Open = 52.8,
        High = 53.11,
        Low = 52.56,
        Close = 52.72,
        Volume = 4056700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/24"),
        Open = 53.2,
        High = 53.94,
        Low = 52.96,
        Close = 53.94,
        Volume = 3874400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/25"),
        Open = 53.6,
        High = 55.03,
        Low = 53.33,
        Close = 54.99,
        Volume = 4494700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/02/28"),
        Open = 54.9,
        High = 55.05,
        Low = 54.71,
        Close = 54.97,
        Volume = 4575800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/01"),
        Open = 54.98,
        High = 55.23,
        Low = 54.26,
        Close = 54.49,
        Volume = 4276300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/02"),
        Open = 54.45,
        High = 55.42,
        Low = 54.37,
        Close = 55.3,
        Volume = 4314300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/03"),
        Open = 55.45,
        High = 58.07,
        Low = 55.32,
        Close = 57.42,
        Volume = 8860800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/04"),
        Open = 57.63,
        High = 58.74,
        Low = 56.99,
        Close = 58.38,
        Volume = 6617300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/07"),
        Open = 57.52,
        High = 58.42,
        Low = 57.25,
        Close = 58.3,
        Volume = 6142800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/08"),
        Open = 58.31,
        High = 58.68,
        Low = 57.81,
        Close = 58.15,
        Volume = 4604500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/09"),
        Open = 57.85,
        High = 58.05,
        Low = 57.44,
        Close = 57.75,
        Volume = 3501000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/10"),
        Open = 57.76,
        High = 58.36,
        Low = 57.69,
        Close = 57.98,
        Volume = 3409100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/11"),
        Open = 57.85,
        High = 58.22,
        Low = 57.2,
        Close = 57.49,
        Volume = 3262800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/14"),
        Open = 57.5,
        High = 57.99,
        Low = 57.3,
        Close = 57.71,
        Volume = 3269000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/15"),
        Open = 57.85,
        High = 58.94,
        Low = 57.63,
        Close = 58.48,
        Volume = 4714000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/16"),
        Open = 58.3,
        High = 58.52,
        Low = 56.7,
        Close = 56.77,
        Volume = 4863900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/17"),
        Open = 56.75,
        High = 57.31,
        Low = 56.71,
        Close = 56.89,
        Volume = 3837800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/18"),
        Open = 57.05,
        High = 57.19,
        Low = 56.57,
        Close = 57.16,
        Volume = 5383400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/21"),
        Open = 57,
        High = 57.2,
        Low = 56.58,
        Close = 56.84,
        Volume = 2044400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/22"),
        Open = 57,
        High = 57.7,
        Low = 56.95,
        Close = 57.22,
        Volume = 3642100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/23"),
        Open = 57.23,
        High = 57.4,
        Low = 56.62,
        Close = 56.85,
        Volume = 3021000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/24"),
        Open = 57.02,
        High = 57.24,
        Low = 56.67,
        Close = 56.8,
        Volume = 1658200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/28"),
        Open = 57.3,
        High = 58.13,
        Low = 57.26,
        Close = 58.1,
        Volume = 3562800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/29"),
        Open = 57.73,
        High = 58.17,
        Low = 57,
        Close = 57.25,
        Volume = 5281400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/30"),
        Open = 57.25,
        High = 58.8,
        Low = 57.25,
        Close = 58.79,
        Volume = 3612200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/03/31"),
        Open = 58.79,
        High = 58.79,
        Low = 57.94,
        Close = 58.46,
        Volume = 3365400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/01"),
        Open = 58.55,
        High = 59.12,
        Low = 58.3,
        Close = 58.78,
        Volume = 3835300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/04"),
        Open = 58.6,
        High = 58.72,
        Low = 58.01,
        Close = 58.33,
        Volume = 2960400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/05"),
        Open = 58.32,
        High = 59.45,
        Low = 58.05,
        Close = 58.33,
        Volume = 4404000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/06"),
        Open = 58.72,
        High = 58.78,
        Low = 58.35,
        Close = 58.43,
        Volume = 2589400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/07"),
        Open = 58.45,
        High = 59.14,
        Low = 58.3,
        Close = 59.01,
        Volume = 3453400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/08"),
        Open = 59,
        High = 59.01,
        Low = 58.42,
        Close = 58.6,
        Volume = 2493900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/11"),
        Open = 58.75,
        High = 59.81,
        Low = 58.75,
        Close = 59.4,
        Volume = 4255800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/12"),
        Open = 59.4,
        High = 59.55,
        Low = 57.75,
        Close = 58.45,
        Volume = 6776600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/13"),
        Open = 58.65,
        High = 59.05,
        Low = 58.45,
        Close = 58.67,
        Volume = 3816800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/14"),
        Open = 59.05,
        High = 59.32,
        Low = 58.13,
        Close = 58.16,
        Volume = 3730000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/15"),
        Open = 58.49,
        High = 58.49,
        Low = 57,
        Close = 57,
        Volume = 3332500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/18"),
        Open = 56.65,
        High = 57.32,
        Low = 56.22,
        Close = 56.92,
        Volume = 3490800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/19"),
        Open = 56.93,
        High = 58.36,
        Low = 56.62,
        Close = 58.09,
        Volume = 3564900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/20"),
        Open = 58.1,
        High = 58.37,
        Low = 57.23,
        Close = 57.23,
        Volume = 3940700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/21"),
        Open = 57.85,
        High = 59.08,
        Low = 57.72,
        Close = 59.08,
        Volume = 3352000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/22"),
        Open = 58.55,
        High = 58.84,
        Low = 57.24,
        Close = 57.88,
        Volume = 3015100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/25"),
        Open = 58.8,
        High = 59.76,
        Low = 58.8,
        Close = 59.58,
        Volume = 3481300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/26"),
        Open = 59.85,
        High = 60,
        Low = 58.15,
        Close = 59,
        Volume = 5068200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/27"),
        Open = 58.49,
        High = 60.1,
        Low = 58.25,
        Close = 59.66,
        Volume = 7375900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/28"),
        Open = 60,
        High = 60,
        Low = 58.61,
        Close = 58.72,
        Volume = 4777600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/04/29"),
        Open = 59.03,
        High = 59.6,
        Low = 58.26,
        Close = 59.52,
        Volume = 3665500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/02"),
        Open = 59.52,
        High = 59.88,
        Low = 58.9,
        Close = 59.38,
        Volume = 4265300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/03"),
        Open = 59.65,
        High = 60.4,
        Low = 59.23,
        Close = 59.87,
        Volume = 4464000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/04"),
        Open = 59.75,
        High = 60.48,
        Low = 59.64,
        Close = 60.28,
        Volume = 3280700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/05"),
        Open = 60.1,
        High = 60.38,
        Low = 59.59,
        Close = 59.74,
        Volume = 3139900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/06"),
        Open = 60.18,
        High = 61.25,
        Low = 60.13,
        Close = 61.01,
        Volume = 3255500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/09"),
        Open = 60.75,
        High = 60.96,
        Low = 60.16,
        Close = 60.56,
        Volume = 3837200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/10"),
        Open = 60.56,
        High = 62.5,
        Low = 60.5,
        Close = 61.04,
        Volume = 9028900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/11"),
        Open = 61.05,
        High = 61.38,
        Low = 59.51,
        Close = 60.4,
        Volume = 5584000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/12"),
        Open = 60.53,
        High = 61.25,
        Low = 60.26,
        Close = 60.49,
        Volume = 5362500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/13"),
        Open = 60.89,
        High = 60.89,
        Low = 58.62,
        Close = 59.5,
        Volume = 4189000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/16"),
        Open = 59.7,
        High = 60.49,
        Low = 59.53,
        Close = 60.41,
        Volume = 2244300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/17"),
        Open = 60.5,
        High = 60.97,
        Low = 60.22,
        Close = 60.91,
        Volume = 3440300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/18"),
        Open = 61.17,
        High = 62.51,
        Low = 60.43,
        Close = 61.69,
        Volume = 4584400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/19"),
        Open = 62.05,
        High = 62.27,
        Low = 60.98,
        Close = 61.35,
        Volume = 3575500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/20"),
        Open = 61.75,
        High = 62.24,
        Low = 61.51,
        Close = 61.9,
        Volume = 3716200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/23"),
        Open = 61.95,
        High = 62.12,
        Low = 61.54,
        Close = 61.64,
        Volume = 3180800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/24"),
        Open = 61.4,
        High = 62.59,
        Low = 61.22,
        Close = 62.25,
        Volume = 3608400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/25"),
        Open = 61.73,
        High = 61.8,
        Low = 61.12,
        Close = 61.45,
        Volume = 3097300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/26"),
        Open = 62.05,
        High = 63,
        Low = 61.95,
        Close = 62.99,
        Volume = 2997900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/27"),
        Open = 63,
        High = 63.4,
        Low = 62.82,
        Close = 63.02,
        Volume = 2591500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/05/31"),
        Open = 63.01,
        High = 64.2,
        Low = 62.91,
        Close = 63.9,
        Volume = 4226900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/01"),
        Open = 63.95,
        High = 64.05,
        Low = 63.35,
        Close = 63.8,
        Volume = 3584100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/02"),
        Open = 63.8,
        High = 64.5,
        Low = 63.51,
        Close = 64.38,
        Volume = 2651000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/03"),
        Open = 64.16,
        High = 64.99,
        Low = 64.1,
        Close = 64.66,
        Volume = 4524200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/06"),
        Open = 64.88,
        High = 65.76,
        Low = 64.64,
        Close = 65.55,
        Volume = 4049300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/07"),
        Open = 65.55,
        High = 66.09,
        Low = 65.28,
        Close = 65.28,
        Volume = 5977000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/08"),
        Open = 65.07,
        High = 65.45,
        Low = 64.24,
        Close = 64.47,
        Volume = 4177000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/09"),
        Open = 64.48,
        High = 65.19,
        Low = 64.04,
        Close = 65.11,
        Volume = 3444000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/10"),
        Open = 65.05,
        High = 65.06,
        Low = 64.11,
        Close = 64.65,
        Volume = 2985500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/13"),
        Open = 65.05,
        High = 65.35,
        Low = 61.91,
        Close = 64.63,
        Volume = 5457000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/14"),
        Open = 64.68,
        High = 64.8,
        Low = 62.85,
        Close = 62.93,
        Volume = 6141000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/15"),
        Open = 63.4,
        High = 64.41,
        Low = 63.21,
        Close = 64.41,
        Volume = 3932600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/16"),
        Open = 64.25,
        High = 64.26,
        Low = 63.65,
        Close = 63.69,
        Volume = 2822600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/17"),
        Open = 64.15,
        High = 64.78,
        Low = 63.7,
        Close = 64.62,
        Volume = 4519600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/20"),
        Open = 63.9,
        High = 64.1,
        Low = 63.58,
        Close = 63.67,
        Volume = 2964200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/21"),
        Open = 63.4,
        High = 63.41,
        Low = 62.69,
        Close = 62.78,
        Volume = 4037800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/22"),
        Open = 62.4,
        High = 63.37,
        Low = 62.2,
        Close = 63.13,
        Volume = 3484300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/23"),
        Open = 63.14,
        High = 63.19,
        Low = 61.79,
        Close = 61.86,
        Volume = 2891300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/24"),
        Open = 61.6,
        High = 61.91,
        Low = 60.5,
        Close = 60.59,
        Volume = 4428600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/27"),
        Open = 60.35,
        High = 61.81,
        Low = 59.7,
        Close = 61.76,
        Volume = 6840300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/28"),
        Open = 62.1,
        High = 62.46,
        Low = 61.27,
        Close = 62.45,
        Volume = 3940800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/29"),
        Open = 62.45,
        High = 62.63,
        Low = 61.4,
        Close = 61.67,
        Volume = 3191600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/06/30"),
        Open = 64.5,
        High = 66.85,
        Low = 64.3,
        Close = 66,
        Volume = 17132400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/01"),
        Open = 65.78,
        High = 65.96,
        Low = 64.44,
        Close = 64.68,
        Volume = 6826500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/05"),
        Open = 64.3,
        High = 65.44,
        Low = 64.17,
        Close = 65.42,
        Volume = 3310200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/06"),
        Open = 65.5,
        High = 66.11,
        Low = 64.2,
        Close = 64.29,
        Volume = 3942000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/07"),
        Open = 63.98,
        High = 65.18,
        Low = 63.45,
        Close = 65.18,
        Volume = 5579400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/08"),
        Open = 65.07,
        High = 65.24,
        Low = 64.51,
        Close = 65.07,
        Volume = 3715100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/11"),
        Open = 65.25,
        High = 65.49,
        Low = 64.78,
        Close = 64.97,
        Volume = 1984100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/12"),
        Open = 64.96,
        High = 64.97,
        Low = 64.15,
        Close = 64.3,
        Volume = 2920800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/13"),
        Open = 64.3,
        High = 64.89,
        Low = 64.2,
        Close = 64.58,
        Volume = 3111900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/14"),
        Open = 64.95,
        High = 65.23,
        Low = 64.37,
        Close = 64.58,
        Volume = 2239900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/15"),
        Open = 64.58,
        High = 64.88,
        Low = 64.23,
        Close = 64.75,
        Volume = 2013900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/18"),
        Open = 64.75,
        High = 64.86,
        Low = 64.25,
        Close = 64.74,
        Volume = 1897400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/19"),
        Open = 65,
        High = 65.5,
        Low = 64.63,
        Close = 64.89,
        Volume = 2146000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/20"),
        Open = 64.89,
        High = 66.28,
        Low = 64.63,
        Close = 66.08,
        Volume = 2609000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/21"),
        Open = 66.18,
        High = 66.31,
        Low = 65.69,
        Close = 65.71,
        Volume = 4840500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/22"),
        Open = 65.4,
        High = 66.29,
        Low = 65.26,
        Close = 66.2,
        Volume = 2627000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/25"),
        Open = 66,
        High = 66.79,
        Low = 65.98,
        Close = 66.05,
        Volume = 2958300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/26"),
        Open = 66.61,
        High = 67.12,
        Low = 66.13,
        Close = 66.35,
        Volume = 4108300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/27"),
        Open = 67.7,
        High = 67.95,
        Low = 66.57,
        Close = 66.7,
        Volume = 5108200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/28"),
        Open = 66.71,
        High = 66.77,
        Low = 65.6,
        Close = 66,
        Volume = 4942100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/07/29"),
        Open = 66.21,
        High = 66.82,
        Low = 66.01,
        Close = 66.01,
        Volume = 3557000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/01"),
        Open = 66.3,
        High = 66.49,
        Low = 65.64,
        Close = 65.75,
        Volume = 2359600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/02"),
        Open = 65.75,
        High = 66.4,
        Low = 65.69,
        Close = 66.33,
        Volume = 2290000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/03"),
        Open = 65.98,
        High = 66.68,
        Low = 65.85,
        Close = 66.65,
        Volume = 2238100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/04"),
        Open = 66.64,
        High = 66.77,
        Low = 66.01,
        Close = 66.27,
        Volume = 2631100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/05"),
        Open = 66.13,
        High = 66.52,
        Low = 66.01,
        Close = 66.19,
        Volume = 2141400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/08"),
        Open = 66.3,
        High = 66.5,
        Low = 65.64,
        Close = 65.99,
        Volume = 2206600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/09"),
        Open = 66.3,
        High = 67.49,
        Low = 65.97,
        Close = 67.13,
        Volume = 3256600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/10"),
        Open = 67.16,
        High = 67.32,
        Low = 65.6,
        Close = 65.96,
        Volume = 3096800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/11"),
        Open = 66.11,
        High = 67.31,
        Low = 66.04,
        Close = 67.31,
        Volume = 3083600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/12"),
        Open = 67.31,
        High = 67.5,
        Low = 66.1,
        Close = 66.54,
        Volume = 2815400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/15"),
        Open = 66.4,
        High = 67.68,
        Low = 66.35,
        Close = 67.46,
        Volume = 2149700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/16"),
        Open = 67.4,
        High = 67.72,
        Low = 66.27,
        Close = 66.27,
        Volume = 3267300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/17"),
        Open = 66.39,
        High = 67.58,
        Low = 66.38,
        Close = 67.02,
        Volume = 2394600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/18"),
        Open = 66.94,
        High = 67.18,
        Low = 66.21,
        Close = 66.63,
        Volume = 2872900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/19"),
        Open = 66.7,
        High = 67.45,
        Low = 66.52,
        Close = 67.15,
        Volume = 2279900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/22"),
        Open = 67.39,
        High = 68.38,
        Low = 67.34,
        Close = 67.79,
        Volume = 3433000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/23"),
        Open = 67.65,
        High = 67.9,
        Low = 67.15,
        Close = 67.43,
        Volume = 2310200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/24"),
        Open = 67.3,
        High = 67.95,
        Low = 67.08,
        Close = 67.13,
        Volume = 3522300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/25"),
        Open = 67.13,
        High = 67.4,
        Low = 67.05,
        Close = 67.21,
        Volume = 2527100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/26"),
        Open = 67.15,
        High = 67.15,
        Low = 66.09,
        Close = 66.31,
        Volume = 2811800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/29"),
        Open = 66.1,
        High = 67.66,
        Low = 66.07,
        Close = 67.58,
        Volume = 2946500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/30"),
        Open = 67.3,
        High = 67.55,
        Low = 66.45,
        Close = 66.74,
        Volume = 3158200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/08/31"),
        Open = 66.9,
        High = 67.1,
        Low = 66.04,
        Close = 67.02,
        Volume = 3105800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/01"),
        Open = 66.65,
        High = 66.85,
        Low = 65.87,
        Close = 65.99,
        Volume = 4029800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/02"),
        Open = 64.87,
        High = 64.93,
        Low = 63.95,
        Close = 64.34,
        Volume = 6789500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/06"),
        Open = 64.37,
        High = 65.45,
        Low = 64.25,
        Close = 65.03,
        Volume = 4004200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/07"),
        Open = 64.8,
        High = 64.82,
        Low = 64,
        Close = 64.5,
        Volume = 4498600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/08"),
        Open = 64.8,
        High = 64.9,
        Low = 64.32,
        Close = 64.62,
        Volume = 4313100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/09"),
        Open = 64.83,
        High = 65.63,
        Low = 64.77,
        Close = 65.4,
        Volume = 4197700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/12"),
        Open = 65.15,
        High = 65.45,
        Low = 64.74,
        Close = 65.14,
        Volume = 2718800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/13"),
        Open = 65.14,
        High = 65.65,
        Low = 65.11,
        Close = 65.4,
        Volume = 2628900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/14"),
        Open = 65.41,
        High = 65.69,
        Low = 63.97,
        Close = 64.18,
        Volume = 3534800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/15"),
        Open = 64.19,
        High = 65.2,
        Low = 63.95,
        Close = 65.08,
        Volume = 4235200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/16"),
        Open = 65.45,
        High = 65.45,
        Low = 64.47,
        Close = 64.8,
        Volume = 5173600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/19"),
        Open = 64.5,
        High = 64.6,
        Low = 63.03,
        Close = 64.1,
        Volume = 3717200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/20"),
        Open = 63.85,
        High = 64.46,
        Low = 63.34,
        Close = 63.45,
        Volume = 3576600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/21"),
        Open = 62.47,
        High = 63.32,
        Low = 62.01,
        Close = 62.41,
        Volume = 4642200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/22"),
        Open = 62.35,
        High = 62.81,
        Low = 62.05,
        Close = 62.51,
        Volume = 3181100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/23"),
        Open = 62.56,
        High = 63.45,
        Low = 62.4,
        Close = 63.2,
        Volume = 3293000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/26"),
        Open = 65.5,
        High = 65.95,
        Low = 64.24,
        Close = 64.67,
        Volume = 5876500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/27"),
        Open = 64.99,
        High = 66.71,
        Low = 64.86,
        Close = 66.55,
        Volume = 5394500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/28"),
        Open = 66.5,
        High = 67.33,
        Low = 66.31,
        Close = 67.21,
        Volume = 4802900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/29"),
        Open = 66.95,
        High = 67.34,
        Low = 66.37,
        Close = 67.28,
        Volume = 2474100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/09/30"),
        Open = 67.15,
        High = 68.25,
        Low = 66.8,
        Close = 67.95,
        Volume = 3109300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/03"),
        Open = 67.92,
        High = 67.99,
        Low = 67,
        Close = 67.14,
        Volume = 3231500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/04"),
        Open = 67.45,
        High = 68.48,
        Low = 67.45,
        Close = 67.95,
        Volume = 3605900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/05"),
        Open = 67.45,
        High = 67.66,
        Low = 66.87,
        Close = 67.05,
        Volume = 3571000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/06"),
        Open = 67.55,
        High = 68.24,
        Low = 67.32,
        Close = 67.93,
        Volume = 3785600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/07"),
        Open = 67.71,
        High = 67.71,
        Low = 66.65,
        Close = 67.3,
        Volume = 3593900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/10"),
        Open = 67.06,
        High = 68.07,
        Low = 66.72,
        Close = 67.9,
        Volume = 2432700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/11"),
        Open = 67.55,
        High = 67.79,
        Low = 66.56,
        Close = 66.7,
        Volume = 3211600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/12"),
        Open = 66.8,
        High = 67.9,
        Low = 66.7,
        Close = 67.65,
        Volume = 4424400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/13"),
        Open = 67.27,
        High = 67.62,
        Low = 66.24,
        Close = 66.49,
        Volume = 4205900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/14"),
        Open = 66.61,
        High = 67.78,
        Low = 66.6,
        Close = 67.5,
        Volume = 4252600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/17"),
        Open = 67.15,
        High = 67.45,
        Low = 66.46,
        Close = 67.24,
        Volume = 4176500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/18"),
        Open = 67.11,
        High = 67.34,
        Low = 66.55,
        Close = 67.12,
        Volume = 4778400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/19"),
        Open = 66.87,
        High = 68.4,
        Low = 66.82,
        Close = 68.37,
        Volume = 4447200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/20"),
        Open = 68.5,
        High = 68.98,
        Low = 67.19,
        Close = 67.3,
        Volume = 4304400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/21"),
        Open = 67.28,
        High = 67.55,
        Low = 65.83,
        Close = 66.02,
        Volume = 7189700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/24"),
        Open = 66.5,
        High = 67.78,
        Low = 66.25,
        Close = 67.32,
        Volume = 4354000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/25"),
        Open = 67.35,
        High = 67.35,
        Low = 66.51,
        Close = 66.97,
        Volume = 2957400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/26"),
        Open = 65.4,
        High = 66.2,
        Low = 64.22,
        Close = 65.1,
        Volume = 10049600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/27"),
        Open = 65.1,
        High = 65.11,
        Low = 63.95,
        Close = 64.05,
        Volume = 5324900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/28"),
        Open = 64.25,
        High = 65.75,
        Low = 63.7,
        Close = 65.64,
        Volume = 5235500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/10/31"),
        Open = 65.8,
        High = 66.58,
        Low = 64.59,
        Close = 64.64,
        Volume = 6571900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/01"),
        Open = 65,
        High = 65.7,
        Low = 64.68,
        Close = 65.05,
        Volume = 5603400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/02"),
        Open = 64.72,
        High = 64.95,
        Low = 64.2,
        Close = 64.7,
        Volume = 5864700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/03"),
        Open = 64.4,
        High = 65.6,
        Low = 64.4,
        Close = 65.5,
        Volume = 4091100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/04"),
        Open = 65.2,
        High = 65.71,
        Low = 65.02,
        Close = 65.28,
        Volume = 3544100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/07"),
        Open = 65.48,
        High = 65.71,
        Low = 65.3,
        Close = 65.69,
        Volume = 2963500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/08"),
        Open = 65.05,
        High = 65.15,
        Low = 64.52,
        Close = 65.01,
        Volume = 2783100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/09"),
        Open = 65.1,
        High = 65.32,
        Low = 64.56,
        Close = 64.71,
        Volume = 3528900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/10"),
        Open = 64.77,
        High = 66.11,
        Low = 64.74,
        Close = 66.1,
        Volume = 3237400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/11"),
        Open = 65.8,
        High = 65.93,
        Low = 65.3,
        Close = 65.35,
        Volume = 2612400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/14"),
        Open = 65.25,
        High = 66.61,
        Low = 64.94,
        Close = 66.23,
        Volume = 3869300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/15"),
        Open = 66.21,
        High = 67.08,
        Low = 66,
        Close = 67,
        Volume = 5196800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/16"),
        Open = 67.1,
        High = 68.1,
        Low = 67.1,
        Close = 67.44,
        Volume = 4625900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/17"),
        Open = 67.92,
        High = 68.19,
        Low = 67.51,
        Close = 67.65,
        Volume = 4261100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/18"),
        Open = 67.95,
        High = 68.1,
        Low = 66.75,
        Close = 66.95,
        Volume = 5573800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/21"),
        Open = 68.13,
        High = 69.48,
        Low = 67.9,
        Close = 69,
        Volume = 7662900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/22"),
        Open = 69.01,
        High = 69.1,
        Low = 68.09,
        Close = 69.1,
        Volume = 4233000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/23"),
        Open = 68.95,
        High = 69.9,
        Low = 68.89,
        Close = 69.44,
        Volume = 2641500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/25"),
        Open = 69.6,
        High = 69.65,
        Low = 68.83,
        Close = 69.06,
        Volume = 955400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/28"),
        Open = 69.01,
        High = 69.15,
        Low = 68.4,
        Close = 68.63,
        Volume = 2579800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/29"),
        Open = 69.1,
        High = 69.68,
        Low = 69,
        Close = 69.13,
        Volume = 2820100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/11/30"),
        Open = 69.45,
        High = 69.57,
        Low = 68.18,
        Close = 68.19,
        Volume = 3658700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/01"),
        Open = 68.35,
        High = 69.77,
        Low = 68.32,
        Close = 69.67,
        Volume = 2979100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/02"),
        Open = 69.82,
        High = 70,
        Low = 69.37,
        Close = 69.44,
        Volume = 3236400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/05"),
        Open = 69.45,
        High = 69.6,
        Low = 68.7,
        Close = 69.2,
        Volume = 3890800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/06"),
        Open = 69.65,
        High = 70,
        Low = 69.43,
        Close = 69.57,
        Volume = 3689900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/07"),
        Open = 69.61,
        High = 69.96,
        Low = 69.08,
        Close = 69.65,
        Volume = 3562000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/08"),
        Open = 69.66,
        High = 70.22,
        Low = 69.24,
        Close = 70.07,
        Volume = 3956000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/09"),
        Open = 70.07,
        High = 70.17,
        Low = 69.52,
        Close = 69.65,
        Volume = 3974600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/12"),
        Open = 70,
        High = 70.24,
        Low = 69.54,
        Close = 70.19,
        Volume = 2649900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/13"),
        Open = 70,
        High = 70.94,
        Low = 69.9,
        Close = 70.59,
        Volume = 2721400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/14"),
        Open = 71,
        High = 71.98,
        Low = 70.81,
        Close = 71.45,
        Volume = 4846900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/15"),
        Open = 71.45,
        High = 71.98,
        Low = 70.73,
        Close = 70.79,
        Volume = 3564900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/16"),
        Open = 71.05,
        High = 71.2,
        Low = 70.48,
        Close = 70.75,
        Volume = 5760100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/19"),
        Open = 70.75,
        High = 70.75,
        Low = 69.6,
        Close = 69.97,
        Volume = 3682000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/20"),
        Open = 70.2,
        High = 71.09,
        Low = 70.15,
        Close = 70.74,
        Volume = 2636500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/21"),
        Open = 70.97,
        High = 71.51,
        Low = 70.38,
        Close = 70.39,
        Volume = 2878200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/22"),
        Open = 70.95,
        High = 71.39,
        Low = 70.83,
        Close = 71.32,
        Volume = 2235200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/23"),
        Open = 71.95,
        High = 72.05,
        Low = 71.42,
        Close = 71.49,
        Volume = 2615000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/27"),
        Open = 71.9,
        High = 72.4,
        Low = 70.47,
        Close = 70.53,
        Volume = 2662600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/28"),
        Open = 70.86,
        High = 71.23,
        Low = 70.69,
        Close = 70.96,
        Volume = 1649900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/29"),
        Open = 71.2,
        High = 71.62,
        Low = 71.14,
        Close = 71.18,
        Volume = 1937900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2005/12/30"),
        Open = 71.05,
        High = 71.06,
        Low = 70.16,
        Close = 70.24,
        Volume = 1814500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/03"),
        Open = 70.4,
        High = 70.6,
        Low = 69.33,
        Close = 70.34,
        Volume = 4913600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/04"),
        Open = 70.08,
        High = 71.27,
        Low = 69.86,
        Close = 71.17,
        Volume = 3158400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/05"),
        Open = 70.55,
        High = 70.55,
        Low = 69.58,
        Close = 70.33,
        Volume = 4547600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/06"),
        Open = 70.34,
        High = 70.5,
        Low = 69.05,
        Close = 69.35,
        Volume = 4764100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/09"),
        Open = 69.28,
        High = 69.4,
        Low = 68.66,
        Close = 68.77,
        Volume = 4545300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/10"),
        Open = 68.8,
        High = 69.24,
        Low = 68.57,
        Close = 69.1,
        Volume = 3851200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/11"),
        Open = 69.97,
        High = 70.3,
        Low = 69.11,
        Close = 70.1,
        Volume = 4939800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/12"),
        Open = 70.25,
        High = 70.45,
        Low = 69.54,
        Close = 69.69,
        Volume = 2345400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/13"),
        Open = 69.64,
        High = 70.2,
        Low = 68.79,
        Close = 69.48,
        Volume = 2963100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/17"),
        Open = 69.07,
        High = 69.4,
        Low = 68.66,
        Close = 68.69,
        Volume = 2710100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/18"),
        Open = 68.55,
        High = 68.92,
        Low = 68.05,
        Close = 68.33,
        Volume = 2623700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/19"),
        Open = 68.16,
        High = 68.49,
        Low = 67.72,
        Close = 68.17,
        Volume = 2485600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/20"),
        Open = 68.1,
        High = 68.16,
        Low = 66.49,
        Close = 66.5,
        Volume = 6407200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/23"),
        Open = 65.9,
        High = 67.34,
        Low = 65.9,
        Close = 67.02,
        Volume = 3967900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/24"),
        Open = 67.41,
        High = 67.88,
        Low = 67.13,
        Close = 67.66,
        Volume = 3556000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/25"),
        Open = 67.71,
        High = 67.91,
        Low = 66.91,
        Close = 66.91,
        Volume = 3685600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/26"),
        Open = 67.44,
        High = 68.75,
        Low = 67.32,
        Close = 68.72,
        Volume = 4765800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/27"),
        Open = 68.39,
        High = 69.25,
        Low = 67.99,
        Close = 68.56,
        Volume = 3951900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/30"),
        Open = 68.52,
        High = 69.05,
        Low = 68.2,
        Close = 69.03,
        Volume = 2018500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/01/31"),
        Open = 69,
        High = 69.05,
        Low = 68.31,
        Close = 68.31,
        Volume = 4023300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/01"),
        Open = 70,
        High = 72.17,
        Low = 70,
        Close = 71.62,
        Volume = 11548100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/02"),
        Open = 71.35,
        High = 72.3,
        Low = 71.3,
        Close = 71.7,
        Volume = 6599700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/03"),
        Open = 71.7,
        High = 72.09,
        Low = 70.86,
        Close = 70.87,
        Volume = 3780800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/06"),
        Open = 70.65,
        High = 71.64,
        Low = 70.3,
        Close = 71.14,
        Volume = 2984100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/07"),
        Open = 71.3,
        High = 72.05,
        Low = 71.16,
        Close = 71.55,
        Volume = 4219700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/08"),
        Open = 71.25,
        High = 71.93,
        Low = 71,
        Close = 71.76,
        Volume = 2859200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/09"),
        Open = 71.77,
        High = 72.76,
        Low = 71.37,
        Close = 72.01,
        Volume = 4144400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/10"),
        Open = 72.1,
        High = 72.7,
        Low = 72.03,
        Close = 72.53,
        Volume = 2806800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/13"),
        Open = 71.95,
        High = 72.64,
        Low = 71.82,
        Close = 72.11,
        Volume = 3293500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/14"),
        Open = 72.35,
        High = 72.86,
        Low = 71.93,
        Close = 72.71,
        Volume = 4151800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/15"),
        Open = 72.37,
        High = 72.74,
        Low = 72.05,
        Close = 72.45,
        Volume = 2764700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/16"),
        Open = 72.65,
        High = 72.93,
        Low = 72.2,
        Close = 72.55,
        Volume = 2211500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/17"),
        Open = 72.55,
        High = 73,
        Low = 72.28,
        Close = 72.96,
        Volume = 2668300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/21"),
        Open = 73.15,
        High = 73.4,
        Low = 72.65,
        Close = 73.05,
        Volume = 3245900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/22"),
        Open = 73.06,
        High = 74.61,
        Low = 73.06,
        Close = 74.39,
        Volume = 4997000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/23"),
        Open = 73.95,
        High = 74.2,
        Low = 73.78,
        Close = 73.9,
        Volume = 2570800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/24"),
        Open = 73.65,
        High = 74.59,
        Low = 73.31,
        Close = 74.31,
        Volume = 2627400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/27"),
        Open = 74.05,
        High = 74.89,
        Low = 74,
        Close = 74.13,
        Volume = 1973500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/02/28"),
        Open = 73.9,
        High = 74,
        Low = 72.36,
        Close = 72.69,
        Volume = 3873700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/01"),
        Open = 72.56,
        High = 73.08,
        Low = 72.25,
        Close = 72.95,
        Volume = 2043100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/02"),
        Open = 72.75,
        High = 73.35,
        Low = 72.34,
        Close = 72.8,
        Volume = 1780900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/03"),
        Open = 72.81,
        High = 74.4,
        Low = 72.51,
        Close = 73.39,
        Volume = 2707000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/06"),
        Open = 73.7,
        High = 73.71,
        Low = 72.3,
        Close = 72.63,
        Volume = 2143800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/07"),
        Open = 72.66,
        High = 73.23,
        Low = 72.37,
        Close = 73.16,
        Volume = 1918500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/08"),
        Open = 72.85,
        High = 72.86,
        Low = 71.9,
        Close = 72.82,
        Volume = 2383100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/09"),
        Open = 72.75,
        High = 74.25,
        Low = 72.5,
        Close = 73.76,
        Volume = 3000300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/10"),
        Open = 73.77,
        High = 74.9,
        Low = 73.2,
        Close = 74.79,
        Volume = 3020900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/13"),
        Open = 75.21,
        High = 75.9,
        Low = 74.5,
        Close = 74.84,
        Volume = 3637300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/14"),
        Open = 74.84,
        High = 75.63,
        Low = 74.72,
        Close = 75.45,
        Volume = 2601400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/15"),
        Open = 75.4,
        High = 76.3,
        Low = 75.27,
        Close = 76.05,
        Volume = 2594500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/16"),
        Open = 76.25,
        High = 77.05,
        Low = 76.1,
        Close = 76.73,
        Volume = 2631200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/17"),
        Open = 77.2,
        High = 78.08,
        Low = 77.05,
        Close = 77.85,
        Volume = 4535100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/20"),
        Open = 78.5,
        High = 78.86,
        Low = 77.83,
        Close = 78.18,
        Volume = 3354300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/21"),
        Open = 78.8,
        High = 79.2,
        Low = 78.25,
        Close = 78.26,
        Volume = 3868700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/22"),
        Open = 78.6,
        High = 78.8,
        Low = 78,
        Close = 78.61,
        Volume = 2472900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/23"),
        Open = 78.61,
        High = 78.62,
        Low = 77.51,
        Close = 77.9,
        Volume = 2234900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/24"),
        Open = 78.05,
        High = 79.11,
        Low = 78.05,
        Close = 78.62,
        Volume = 2821700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/27"),
        Open = 78.73,
        High = 78.75,
        Low = 77.82,
        Close = 78.39,
        Volume = 3126300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/28"),
        Open = 78.5,
        High = 79,
        Low = 77.37,
        Close = 77.51,
        Volume = 2876500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/29"),
        Open = 77.95,
        High = 79.48,
        Low = 77.86,
        Close = 79.18,
        Volume = 4042300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/30"),
        Open = 78.95,
        High = 79.5,
        Low = 78.06,
        Close = 78.42,
        Volume = 2912700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/03/31"),
        Open = 78.6,
        High = 78.92,
        Low = 77.81,
        Close = 77.93,
        Volume = 2279000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/03"),
        Open = 78.25,
        High = 79.13,
        Low = 78.01,
        Close = 78.01,
        Volume = 3292700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/04"),
        Open = 78.58,
        High = 78.85,
        Low = 77.5,
        Close = 78.6,
        Volume = 2597600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/05"),
        Open = 78.85,
        High = 79.19,
        Low = 77.82,
        Close = 79.11,
        Volume = 3071700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/06"),
        Open = 79.22,
        High = 80.13,
        Low = 79.22,
        Close = 79.82,
        Volume = 2904500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/07"),
        Open = 79.99,
        High = 80.37,
        Low = 78.72,
        Close = 79.57,
        Volume = 2683800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/10"),
        Open = 79.62,
        High = 80.92,
        Low = 79.61,
        Close = 80.79,
        Volume = 2806400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/11"),
        Open = 80.63,
        High = 80.71,
        Low = 79.71,
        Close = 80.57,
        Volume = 2747500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/12"),
        Open = 81.12,
        High = 84.23,
        Low = 81.11,
        Close = 83.21,
        Volume = 6161600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/13"),
        Open = 83.7,
        High = 83.7,
        Low = 82.81,
        Close = 82.93,
        Volume = 3227900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/17"),
        Open = 83.2,
        High = 83.99,
        Low = 81.95,
        Close = 82.35,
        Volume = 3275100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/18"),
        Open = 82.42,
        High = 83.37,
        Low = 81.88,
        Close = 83.3,
        Volume = 4302800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/19"),
        Open = 83.75,
        High = 84.99,
        Low = 83.7,
        Close = 84.96,
        Volume = 3355500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/20"),
        Open = 84.71,
        High = 86.26,
        Low = 84.71,
        Close = 85.5,
        Volume = 4439200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/21"),
        Open = 86.2,
        High = 86.58,
        Low = 85.86,
        Close = 86.46,
        Volume = 4153500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/24"),
        Open = 86.66,
        High = 87.25,
        Low = 86.1,
        Close = 86.1,
        Volume = 3562800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/25"),
        Open = 86.35,
        High = 86.48,
        Low = 84.9,
        Close = 85.11,
        Volume = 4645900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/26"),
        Open = 84.16,
        High = 86.1,
        Low = 83.2,
        Close = 84.91,
        Volume = 5901500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/27"),
        Open = 84.54,
        High = 84.7,
        Low = 83.1,
        Close = 84.1,
        Volume = 3782700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/04/28"),
        Open = 84.28,
        High = 84.66,
        Low = 83.01,
        Close = 83.45,
        Volume = 3755800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/01"),
        Open = 83.45,
        High = 84.12,
        Low = 82.82,
        Close = 83.86,
        Volume = 3527400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/02"),
        Open = 84.26,
        High = 85.82,
        Low = 83.86,
        Close = 85.33,
        Volume = 2988800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/03"),
        Open = 85.4,
        High = 86.03,
        Low = 85.22,
        Close = 85.87,
        Volume = 3039800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/04"),
        Open = 85.89,
        High = 87.15,
        Low = 85.81,
        Close = 86.64,
        Volume = 3316200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/05"),
        Open = 87.47,
        High = 88.55,
        Low = 87.3,
        Close = 88.47,
        Volume = 3264600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/08"),
        Open = 88.48,
        High = 89.3,
        Low = 87.36,
        Close = 87.59,
        Volume = 3298800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/09"),
        Open = 87.61,
        High = 88,
        Low = 87.1,
        Close = 87.99,
        Volume = 2215300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/10"),
        Open = 88,
        High = 89.58,
        Low = 87.65,
        Close = 88.94,
        Volume = 3781500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/11"),
        Open = 89.45,
        High = 89.55,
        Low = 87.9,
        Close = 88.21,
        Volume = 2652000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/12"),
        Open = 88.21,
        High = 89.01,
        Low = 86.94,
        Close = 87.01,
        Volume = 2929500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/15"),
        Open = 85.76,
        High = 86.47,
        Low = 84.57,
        Close = 85.86,
        Volume = 4161200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/16"),
        Open = 85.89,
        High = 86.98,
        Low = 85.35,
        Close = 86.4,
        Volume = 3042700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/17"),
        Open = 86.4,
        High = 86.4,
        Low = 83.28,
        Close = 83.77,
        Volume = 5266500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/18"),
        Open = 84.25,
        High = 84.84,
        Low = 82.6,
        Close = 82.73,
        Volume = 3603600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/19"),
        Open = 83,
        High = 85.3,
        Low = 82.06,
        Close = 84.61,
        Volume = 5504600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/22"),
        Open = 84.46,
        High = 86.03,
        Low = 84.02,
        Close = 85.71,
        Volume = 4494900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/23"),
        Open = 86.04,
        High = 86.7,
        Low = 85.15,
        Close = 85.15,
        Volume = 4037600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/24"),
        Open = 84.97,
        High = 85.15,
        Low = 81.63,
        Close = 82.38,
        Volume = 6654100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/25"),
        Open = 82.8,
        High = 83.8,
        Low = 82.29,
        Close = 82.99,
        Volume = 3288800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/26"),
        Open = 83.6,
        High = 83.81,
        Low = 83.05,
        Close = 83.5,
        Volume = 2353300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/30"),
        Open = 83.5,
        High = 83.5,
        Low = 81.57,
        Close = 82.13,
        Volume = 3810200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/05/31"),
        Open = 81.21,
        High = 83.44,
        Low = 81.21,
        Close = 83.25,
        Volume = 3689900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/01"),
        Open = 83.6,
        High = 83.72,
        Low = 82.55,
        Close = 83.64,
        Volume = 2367300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/02"),
        Open = 84,
        High = 84.58,
        Low = 83.17,
        Close = 83.8,
        Volume = 3201700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/05"),
        Open = 83.79,
        High = 83.97,
        Low = 82.06,
        Close = 82.13,
        Volume = 3398200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/06"),
        Open = 82,
        High = 82.34,
        Low = 79.47,
        Close = 80.65,
        Volume = 6301800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/07"),
        Open = 80.83,
        High = 81.92,
        Low = 80.29,
        Close = 81.46,
        Volume = 5007800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/08"),
        Open = 81.46,
        High = 81.84,
        Low = 79.01,
        Close = 81.19,
        Volume = 6931500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/09"),
        Open = 81.95,
        High = 81.99,
        Low = 80,
        Close = 80.5,
        Volume = 3927700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/12"),
        Open = 80.6,
        High = 80.75,
        Low = 77.47,
        Close = 77.88,
        Volume = 5243900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/13"),
        Open = 77.77,
        High = 77.88,
        Low = 76.4,
        Close = 76.98,
        Volume = 5152600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/14"),
        Open = 79.4,
        High = 82.01,
        Low = 79.2,
        Close = 82.01,
        Volume = 9526200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/15"),
        Open = 82.01,
        High = 85.13,
        Low = 82.01,
        Close = 84.81,
        Volume = 7885000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/16"),
        Open = 85.1,
        High = 85.85,
        Low = 84.75,
        Close = 85.54,
        Volume = 5997400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/19"),
        Open = 85.65,
        High = 86.23,
        Low = 84.31,
        Close = 84.76,
        Volume = 4326700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/20"),
        Open = 85.25,
        High = 85.48,
        Low = 84.05,
        Close = 84.85,
        Volume = 3090900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/21"),
        Open = 84.9,
        High = 86.08,
        Low = 84.9,
        Close = 85.85,
        Volume = 3588000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/22"),
        Open = 85.55,
        High = 85.68,
        Low = 83.88,
        Close = 84.06,
        Volume = 3617000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/23"),
        Open = 84.06,
        High = 84.48,
        Low = 83.16,
        Close = 83.39,
        Volume = 3062500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/26"),
        Open = 83.48,
        High = 84.28,
        Low = 82.8,
        Close = 83.89,
        Volume = 1927700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/27"),
        Open = 83.85,
        High = 84.2,
        Low = 81.76,
        Close = 81.93,
        Volume = 3210200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/28"),
        Open = 81.94,
        High = 82.69,
        Low = 80.83,
        Close = 82.64,
        Volume = 3167900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/29"),
        Open = 82.64,
        High = 83.5,
        Low = 81.28,
        Close = 83,
        Volume = 5179900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/06/30"),
        Open = 82.99,
        High = 83,
        Low = 81.57,
        Close = 81.91,
        Volume = 4432300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/03"),
        Open = 81.35,
        High = 81.67,
        Low = 80.94,
        Close = 81.3,
        Volume = 1626700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/05"),
        Open = 81.28,
        High = 81.29,
        Low = 79.26,
        Close = 80.17,
        Volume = 5547300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/06"),
        Open = 80.27,
        High = 80.98,
        Low = 80,
        Close = 80.81,
        Volume = 3193500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/07"),
        Open = 80.4,
        High = 81.29,
        Low = 79.53,
        Close = 79.99,
        Volume = 2584400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/10"),
        Open = 80.03,
        High = 81.25,
        Low = 80.03,
        Close = 80.35,
        Volume = 2651800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/11"),
        Open = 80.1,
        High = 81.81,
        Low = 78.86,
        Close = 81.63,
        Volume = 3811200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/12"),
        Open = 81.45,
        High = 81.95,
        Low = 80.37,
        Close = 80.92,
        Volume = 2658400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/13"),
        Open = 80.7,
        High = 81.04,
        Low = 79.47,
        Close = 79.59,
        Volume = 3570300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/14"),
        Open = 79.59,
        High = 79.6,
        Low = 76.89,
        Close = 77.25,
        Volume = 5413100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/17"),
        Open = 78.11,
        High = 79.77,
        Low = 77.8,
        Close = 78.95,
        Volume = 4481400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/18"),
        Open = 79.5,
        High = 80.26,
        Low = 77.97,
        Close = 79.17,
        Volume = 4306900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/19"),
        Open = 79.32,
        High = 82.57,
        Low = 78.36,
        Close = 82.29,
        Volume = 5049500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/20"),
        Open = 82.9,
        High = 83,
        Low = 80.62,
        Close = 80.69,
        Volume = 4441300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/21"),
        Open = 80.69,
        High = 80.69,
        Low = 78.56,
        Close = 79.08,
        Volume = 3978900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/24"),
        Open = 79.45,
        High = 81.61,
        Low = 79.43,
        Close = 81.44,
        Volume = 3977300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/25"),
        Open = 80.75,
        High = 84.06,
        Low = 80.7,
        Close = 83.75,
        Volume = 4550300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/26"),
        Open = 82.18,
        High = 82.36,
        Low = 79.6,
        Close = 79.9,
        Volume = 6552900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/27"),
        Open = 80,
        High = 80.29,
        Low = 78.15,
        Close = 78.71,
        Volume = 5143600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/28"),
        Open = 79.4,
        High = 80.1,
        Low = 78.7,
        Close = 78.91,
        Volume = 4315700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/07/31"),
        Open = 78.46,
        High = 78.52,
        Low = 77.1,
        Close = 77.42,
        Volume = 5472900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/01"),
        Open = 77.42,
        High = 78.28,
        Low = 76.52,
        Close = 78.17,
        Volume = 4215500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/02"),
        Open = 78.7,
        High = 79.65,
        Low = 78.4,
        Close = 78.62,
        Volume = 3783300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/03"),
        Open = 77.88,
        High = 79.89,
        Low = 77.42,
        Close = 79.4,
        Volume = 3681100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/04"),
        Open = 80.16,
        High = 80.7,
        Low = 79.15,
        Close = 79.49,
        Volume = 3584000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/07"),
        Open = 79.1,
        High = 79.95,
        Low = 78.62,
        Close = 79.75,
        Volume = 3225200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/08"),
        Open = 79.55,
        High = 80.83,
        Low = 77.84,
        Close = 78.15,
        Volume = 5674200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/09"),
        Open = 78.25,
        High = 79.02,
        Low = 76.71,
        Close = 77.16,
        Volume = 4000800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/10"),
        Open = 76.8,
        High = 76.8,
        Low = 75.07,
        Close = 76.2,
        Volume = 5604200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/11"),
        Open = 76.22,
        High = 76.76,
        Low = 75.66,
        Close = 75.96,
        Volume = 3273200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/14"),
        Open = 76.65,
        High = 77.19,
        Low = 75.15,
        Close = 75.39,
        Volume = 3519700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/15"),
        Open = 76,
        High = 76.7,
        Low = 75.69,
        Close = 76.58,
        Volume = 3511500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/16"),
        Open = 77.2,
        High = 78.95,
        Low = 76.86,
        Close = 78.83,
        Volume = 4139200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/17"),
        Open = 78.83,
        High = 79.43,
        Low = 77.88,
        Close = 78.59,
        Volume = 2878300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/18"),
        Open = 78.68,
        High = 78.68,
        Low = 77.16,
        Close = 77.62,
        Volume = 3425000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/21"),
        Open = 77.62,
        High = 77.62,
        Low = 76.51,
        Close = 76.63,
        Volume = 2494200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/22"),
        Open = 77,
        High = 77.85,
        Low = 76.25,
        Close = 76.95,
        Volume = 2632600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/23"),
        Open = 77,
        High = 77.55,
        Low = 76.07,
        Close = 76.36,
        Volume = 2435300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/24"),
        Open = 76.85,
        High = 77.04,
        Low = 75,
        Close = 75.24,
        Volume = 3304500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/25"),
        Open = 75.24,
        High = 75.6,
        Low = 73.55,
        Close = 73.93,
        Volume = 4596100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/28"),
        Open = 74.04,
        High = 75.02,
        Low = 73.05,
        Close = 74.72,
        Volume = 4737400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/29"),
        Open = 75.96,
        High = 75.99,
        Low = 72.9,
        Close = 73.78,
        Volume = 7171700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/30"),
        Open = 74,
        High = 75.3,
        Low = 73.64,
        Close = 75.02,
        Volume = 3574100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/08/31"),
        Open = 74.75,
        High = 75.58,
        Low = 74.75,
        Close = 74.9,
        Volume = 3049600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/01"),
        Open = 75,
        High = 75.91,
        Low = 74.46,
        Close = 75.43,
        Volume = 3272200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/05"),
        Open = 75.75,
        High = 76.3,
        Low = 74.71,
        Close = 75.36,
        Volume = 2663500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/06"),
        Open = 75.36,
        High = 75.55,
        Low = 74.2,
        Close = 74.44,
        Volume = 3034200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/07"),
        Open = 74.44,
        High = 74.44,
        Low = 72.76,
        Close = 72.87,
        Volume = 4256100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/08"),
        Open = 73.3,
        High = 73.62,
        Low = 72.17,
        Close = 72.8,
        Volume = 4955200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/11"),
        Open = 72.13,
        High = 74.13,
        Low = 72.13,
        Close = 73.82,
        Volume = 3497600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/12"),
        Open = 73.79,
        High = 74.38,
        Low = 73.61,
        Close = 74.26,
        Volume = 3107400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/13"),
        Open = 74.36,
        High = 76.49,
        Low = 74.36,
        Close = 76.32,
        Volume = 4852700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/14"),
        Open = 75.07,
        High = 75.64,
        Low = 74.65,
        Close = 75.01,
        Volume = 4983600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/15"),
        Open = 75.56,
        High = 76,
        Low = 74.73,
        Close = 75.01,
        Volume = 4161000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/18"),
        Open = 75.1,
        High = 75.64,
        Low = 74.8,
        Close = 75.21,
        Volume = 2312200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/19"),
        Open = 75.35,
        High = 75.5,
        Low = 74.15,
        Close = 74.87,
        Volume = 2350400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/20"),
        Open = 75.51,
        High = 76.4,
        Low = 75.51,
        Close = 76.19,
        Volume = 3996800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/21"),
        Open = 77.05,
        High = 77.27,
        Low = 75.75,
        Close = 76.11,
        Volume = 4429500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/22"),
        Open = 76.2,
        High = 77.77,
        Low = 75.74,
        Close = 77.25,
        Volume = 4682000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/25"),
        Open = 77.7,
        High = 78.55,
        Low = 77.37,
        Close = 77.71,
        Volume = 4585100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/26"),
        Open = 78.15,
        High = 79.29,
        Low = 77.37,
        Close = 79,
        Volume = 4247500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/27"),
        Open = 79.17,
        High = 79.96,
        Low = 79.17,
        Close = 79.41,
        Volume = 4174800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/28"),
        Open = 79.57,
        High = 80.35,
        Low = 79.25,
        Close = 79.28,
        Volume = 4394600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/09/29"),
        Open = 79.5,
        High = 79.75,
        Low = 78.79,
        Close = 78.85,
        Volume = 4027800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/02"),
        Open = 79.35,
        High = 80.28,
        Low = 78.84,
        Close = 79.97,
        Volume = 5723800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/03"),
        Open = 79.98,
        High = 82.09,
        Low = 79.98,
        Close = 81.78,
        Volume = 5805000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/04"),
        Open = 82.5,
        High = 83.98,
        Low = 82.01,
        Close = 83.96,
        Volume = 7114900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/05"),
        Open = 83.97,
        High = 84.12,
        Low = 83.06,
        Close = 83.62,
        Volume = 3622700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/06"),
        Open = 83.62,
        High = 84.39,
        Low = 83.14,
        Close = 83.68,
        Volume = 3649400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/09"),
        Open = 83.69,
        High = 83.87,
        Low = 82.47,
        Close = 82.65,
        Volume = 4427400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/10"),
        Open = 82.5,
        High = 82.67,
        Low = 81.8,
        Close = 82.13,
        Volume = 4003300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/11"),
        Open = 81.95,
        High = 82,
        Low = 80.89,
        Close = 81.64,
        Volume = 3255400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/12"),
        Open = 82.2,
        High = 83.86,
        Low = 82.1,
        Close = 83.64,
        Volume = 4101400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/13"),
        Open = 83.25,
        High = 83.35,
        Low = 81.82,
        Close = 82.39,
        Volume = 4001600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/16"),
        Open = 82.39,
        High = 82.85,
        Low = 81.64,
        Close = 82.66,
        Volume = 2472600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/17"),
        Open = 82.45,
        High = 82.45,
        Low = 81.5,
        Close = 82.29,
        Volume = 2914500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/18"),
        Open = 82.52,
        High = 83.46,
        Low = 81.95,
        Close = 82.74,
        Volume = 3623400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/19"),
        Open = 82.74,
        High = 82.96,
        Low = 81.77,
        Close = 82.41,
        Volume = 2336300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/20"),
        Open = 82.9,
        High = 82.9,
        Low = 81.7,
        Close = 81.74,
        Volume = 3011600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/23"),
        Open = 81.73,
        High = 82.84,
        Low = 81.5,
        Close = 82.8,
        Volume = 2797200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/24"),
        Open = 83.1,
        High = 83.89,
        Low = 82.72,
        Close = 83.59,
        Volume = 3812400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/25"),
        Open = 82.6,
        High = 82.6,
        Low = 80.6,
        Close = 80.86,
        Volume = 6881500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/26"),
        Open = 80.75,
        High = 80.75,
        Low = 77.77,
        Close = 79.14,
        Volume = 10610100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/27"),
        Open = 79.17,
        High = 80.4,
        Low = 78.52,
        Close = 79.74,
        Volume = 6811700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/30"),
        Open = 80.25,
        High = 81.04,
        Low = 80.01,
        Close = 80.22,
        Volume = 3737300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/10/31"),
        Open = 80.6,
        High = 80.6,
        Low = 79.31,
        Close = 79.86,
        Volume = 3663300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/01"),
        Open = 80.01,
        High = 80.75,
        Low = 79.72,
        Close = 80.06,
        Volume = 3175300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/02"),
        Open = 80.06,
        High = 80.4,
        Low = 79.11,
        Close = 79.2,
        Volume = 2678000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/03"),
        Open = 79.47,
        High = 80.35,
        Low = 79.39,
        Close = 79.97,
        Volume = 2679700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/06"),
        Open = 79.98,
        High = 80.87,
        Low = 79.98,
        Close = 80.48,
        Volume = 2921400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/07"),
        Open = 80.73,
        High = 84.98,
        Low = 80.6,
        Close = 84.85,
        Volume = 11839200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/08"),
        Open = 84.25,
        High = 85.87,
        Low = 83.53,
        Close = 85.45,
        Volume = 8444000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/09"),
        Open = 85.75,
        High = 86.5,
        Low = 85.05,
        Close = 85.11,
        Volume = 6138100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/10"),
        Open = 86.4,
        High = 86.98,
        Low = 85.44,
        Close = 85.62,
        Volume = 5452800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/13"),
        Open = 85.7,
        High = 86.34,
        Low = 85.29,
        Close = 85.69,
        Volume = 3313800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/14"),
        Open = 85.69,
        High = 86.09,
        Low = 84.76,
        Close = 85.74,
        Volume = 3422200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/15"),
        Open = 86.4,
        High = 87.58,
        Low = 86.35,
        Close = 87.08,
        Volume = 5833600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/16"),
        Open = 87.92,
        High = 89.43,
        Low = 87.5,
        Close = 88.71,
        Volume = 6935200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/17"),
        Open = 89.05,
        High = 89.63,
        Low = 88.57,
        Close = 89.52,
        Volume = 5719300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/20"),
        Open = 89.05,
        High = 89.22,
        Low = 88.62,
        Close = 89.12,
        Volume = 5388700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/21"),
        Open = 89.85,
        High = 92.05,
        Low = 89.57,
        Close = 91.1,
        Volume = 8392400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/22"),
        Open = 91.1,
        High = 91.59,
        Low = 89.78,
        Close = 90.1,
        Volume = 4480400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/24"),
        Open = 89.25,
        High = 90.08,
        Low = 89.15,
        Close = 89.77,
        Volume = 1180100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/27"),
        Open = 90,
        High = 90.03,
        Low = 86.95,
        Close = 87.37,
        Volume = 6257700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/28"),
        Open = 88.15,
        High = 88.74,
        Low = 87.05,
        Close = 87.94,
        Volume = 4938600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/29"),
        Open = 88.24,
        High = 89.45,
        Low = 87.93,
        Close = 88.89,
        Volume = 4134100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/11/30"),
        Open = 89.1,
        High = 89.44,
        Low = 87.1,
        Close = 88.53,
        Volume = 4186600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/01"),
        Open = 89.6,
        High = 90.05,
        Low = 88.65,
        Close = 89.55,
        Volume = 5142600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/04"),
        Open = 89.55,
        High = 90.6,
        Low = 89.42,
        Close = 89.58,
        Volume = 3480000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/05"),
        Open = 89.59,
        High = 91.1,
        Low = 89.17,
        Close = 90.73,
        Volume = 4355400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/06"),
        Open = 91.6,
        High = 91.85,
        Low = 90.76,
        Close = 90.83,
        Volume = 4118200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/07"),
        Open = 91.3,
        High = 91.65,
        Low = 89.75,
        Close = 90.01,
        Volume = 2969200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/08"),
        Open = 90.07,
        High = 90.72,
        Low = 89.53,
        Close = 90.13,
        Volume = 2774600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/11"),
        Open = 89.77,
        High = 90.2,
        Low = 89.52,
        Close = 89.78,
        Volume = 2363800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/12"),
        Open = 90.03,
        High = 90.75,
        Low = 89.75,
        Close = 90.31,
        Volume = 3626100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/13"),
        Open = 90.82,
        High = 90.99,
        Low = 89.39,
        Close = 89.6,
        Volume = 3676200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/14"),
        Open = 89.3,
        High = 90.13,
        Low = 89.08,
        Close = 89.93,
        Volume = 3481800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/15"),
        Open = 90.17,
        High = 90.9,
        Low = 90.17,
        Close = 90.7,
        Volume = 5290200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/18"),
        Open = 90.75,
        High = 90.9,
        Low = 89.41,
        Close = 89.56,
        Volume = 2601900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/19"),
        Open = 89,
        High = 90.44,
        Low = 88.97,
        Close = 90.17,
        Volume = 2622400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/20"),
        Open = 90.18,
        High = 90.6,
        Low = 89.18,
        Close = 90.1,
        Volume = 3274200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/21"),
        Open = 89.8,
        High = 90.4,
        Low = 89.46,
        Close = 89.94,
        Volume = 2811300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/22"),
        Open = 89.65,
        High = 89.67,
        Low = 88.35,
        Close = 88.76,
        Volume = 2504900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/26"),
        Open = 88.95,
        High = 89,
        Low = 88.35,
        Close = 88.79,
        Volume = 1565000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/27"),
        Open = 89.15,
        High = 89.45,
        Low = 88.74,
        Close = 88.88,
        Volume = 1971500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/28"),
        Open = 88.85,
        High = 89.2,
        Low = 88.41,
        Close = 89,
        Volume = 1265400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2006/12/29"),
        Open = 89.25,
        High = 89.46,
        Low = 88.75,
        Close = 88.84,
        Volume = 1753300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/03"),
        Open = 88.9,
        High = 90.3,
        Low = 88.45,
        Close = 89.17,
        Volume = 4805500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/04"),
        Open = 88.34,
        High = 89.83,
        Low = 87.01,
        Close = 89.53,
        Volume = 2659100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/05"),
        Open = 89.78,
        High = 90,
        Low = 88.5,
        Close = 89.15,
        Volume = 3254200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/08"),
        Open = 88.61,
        High = 89.41,
        Low = 87.56,
        Close = 88.94,
        Volume = 2979700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/09"),
        Open = 88.93,
        High = 89.71,
        Low = 87.56,
        Close = 88,
        Volume = 4107900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/10"),
        Open = 88.04,
        High = 89.34,
        Low = 88,
        Close = 89.27,
        Volume = 3947000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/11"),
        Open = 88.97,
        High = 89.27,
        Low = 88.32,
        Close = 88.84,
        Volume = 3960000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/12"),
        Open = 88.54,
        High = 88.85,
        Low = 87.5,
        Close = 88.13,
        Volume = 3796700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/16"),
        Open = 88.25,
        High = 88.51,
        Low = 87.3,
        Close = 88,
        Volume = 5510100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/17"),
        Open = 88.02,
        High = 89.54,
        Low = 87.22,
        Close = 88.83,
        Volume = 4444800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/18"),
        Open = 89.13,
        High = 89.38,
        Low = 87.76,
        Close = 88,
        Volume = 3206700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/19"),
        Open = 88.45,
        High = 89.1,
        Low = 87.8,
        Close = 88.63,
        Volume = 4347800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/22"),
        Open = 87.51,
        High = 87.86,
        Low = 84.82,
        Close = 85.6,
        Volume = 8184200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/23"),
        Open = 85.01,
        High = 88.18,
        Low = 85,
        Close = 87.36,
        Volume = 6405100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/24"),
        Open = 87.35,
        High = 87.76,
        Low = 86.52,
        Close = 87.6,
        Volume = 3357100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/25"),
        Open = 87.3,
        High = 87.46,
        Low = 86,
        Close = 86.16,
        Volume = 2841200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/26"),
        Open = 86,
        High = 86.25,
        Low = 84.6,
        Close = 85.43,
        Volume = 5114900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/29"),
        Open = 85.05,
        High = 86,
        Low = 85,
        Close = 85.5,
        Volume = 3044800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/30"),
        Open = 85.75,
        High = 86.6,
        Low = 85.55,
        Close = 86,
        Volume = 3140300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/01/31"),
        Open = 89.3,
        High = 90.34,
        Low = 89,
        Close = 89.56,
        Volume = 10905000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/01"),
        Open = 89.95,
        High = 92.24,
        Low = 89.73,
        Close = 91.05,
        Volume = 6576400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/02"),
        Open = 91.05,
        High = 91.48,
        Low = 89.95,
        Close = 90.05,
        Volume = 5071800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/05"),
        Open = 90.45,
        High = 91.42,
        Low = 90.31,
        Close = 90.72,
        Volume = 3022400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/06"),
        Open = 91,
        High = 91,
        Low = 89.9,
        Close = 90.98,
        Volume = 3392000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/07"),
        Open = 90.59,
        High = 91.2,
        Low = 89.7,
        Close = 90.35,
        Volume = 2807800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/08"),
        Open = 89.56,
        High = 90.36,
        Low = 88.55,
        Close = 89.52,
        Volume = 5104600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/09"),
        Open = 89.35,
        High = 90.3,
        Low = 89.03,
        Close = 90,
        Volume = 4265200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/12"),
        Open = 89.55,
        High = 89.89,
        Low = 88.78,
        Close = 89.2,
        Volume = 3342500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/13"),
        Open = 89.2,
        High = 89.37,
        Low = 88.3,
        Close = 89.29,
        Volume = 2998000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/14"),
        Open = 89.27,
        High = 90.17,
        Low = 89.27,
        Close = 89.94,
        Volume = 3832800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/15"),
        Open = 90.02,
        High = 91.8,
        Low = 89.86,
        Close = 91.71,
        Volume = 5681500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/16"),
        Open = 91.98,
        High = 92,
        Low = 90.73,
        Close = 90.94,
        Volume = 4497900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/20"),
        Open = 91.5,
        High = 91.69,
        Low = 89.84,
        Close = 91.03,
        Volume = 3885900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/21"),
        Open = 90.3,
        High = 92,
        Low = 90.05,
        Close = 90.96,
        Volume = 4741100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/22"),
        Open = 91.1,
        High = 91.93,
        Low = 90.27,
        Close = 90.58,
        Volume = 3170500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/23"),
        Open = 90.21,
        High = 90.85,
        Low = 90,
        Close = 90.28,
        Volume = 2341000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/26"),
        Open = 90.48,
        High = 90.73,
        Low = 88.56,
        Close = 88.93,
        Volume = 4534600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/27"),
        Open = 88,
        High = 88.7,
        Low = 85.24,
        Close = 87.2,
        Volume = 5838000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/02/28"),
        Open = 87.4,
        High = 88.41,
        Low = 86.05,
        Close = 87.26,
        Volume = 5582800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/01"),
        Open = 86.6,
        High = 88.8,
        Low = 85.91,
        Close = 87.85,
        Volume = 5136600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/02"),
        Open = 87.87,
        High = 88.54,
        Low = 87.01,
        Close = 87.03,
        Volume = 4154100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/05"),
        Open = 86.96,
        High = 88.19,
        Low = 86.39,
        Close = 87.02,
        Volume = 3692000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/06"),
        Open = 88.03,
        High = 88.03,
        Low = 87.05,
        Close = 87.82,
        Volume = 3277000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/07"),
        Open = 87.82,
        High = 89.25,
        Low = 87.82,
        Close = 88.71,
        Volume = 5084200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/08"),
        Open = 88.98,
        High = 89.67,
        Low = 88.61,
        Close = 88.89,
        Volume = 2787500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/09"),
        Open = 89.7,
        High = 90.09,
        Low = 89.14,
        Close = 89.51,
        Volume = 2799900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/12"),
        Open = 89,
        High = 91.87,
        Low = 89,
        Close = 91.2,
        Volume = 5951200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/13"),
        Open = 90.9,
        High = 91.1,
        Low = 89.45,
        Close = 89.45,
        Volume = 5239800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/14"),
        Open = 89.45,
        High = 90.3,
        Low = 88.53,
        Close = 89.98,
        Volume = 4025900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/15"),
        Open = 89.98,
        High = 91.06,
        Low = 89.57,
        Close = 91.04,
        Volume = 3417800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/16"),
        Open = 91.04,
        High = 91.04,
        Low = 89.68,
        Close = 90,
        Volume = 5787700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/19"),
        Open = 90.5,
        High = 90.95,
        Low = 89.9,
        Close = 90.32,
        Volume = 3526400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/20"),
        Open = 90.32,
        High = 90.93,
        Low = 90.02,
        Close = 90.16,
        Volume = 3459200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/21"),
        Open = 90.16,
        High = 90.95,
        Low = 89.45,
        Close = 90.8,
        Volume = 4187000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/22"),
        Open = 90.4,
        High = 90.8,
        Low = 89.88,
        Close = 90.57,
        Volume = 3449000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/23"),
        Open = 89.79,
        High = 91.31,
        Low = 89.79,
        Close = 90.98,
        Volume = 2256300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/26"),
        Open = 90.88,
        High = 90.94,
        Low = 89.84,
        Close = 90.83,
        Volume = 2881100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/27"),
        Open = 90.6,
        High = 91,
        Low = 90,
        Close = 90.52,
        Volume = 2627200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/28"),
        Open = 90.28,
        High = 90.41,
        Low = 89.01,
        Close = 89.45,
        Volume = 4419000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/29"),
        Open = 90.11,
        High = 90.54,
        Low = 89.16,
        Close = 89.76,
        Volume = 3388100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/03/30"),
        Open = 89.62,
        High = 90.07,
        Low = 88.65,
        Close = 88.91,
        Volume = 4551600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/02"),
        Open = 88.9,
        High = 89.01,
        Low = 88.08,
        Close = 88.83,
        Volume = 3337500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/03"),
        Open = 89.32,
        High = 90.24,
        Low = 89.09,
        Close = 89.9,
        Volume = 3891700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/04"),
        Open = 89.91,
        High = 90.61,
        Low = 89.8,
        Close = 90.27,
        Volume = 2542700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/05"),
        Open = 90.2,
        High = 90.74,
        Low = 90.2,
        Close = 90.5,
        Volume = 2989700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/09"),
        Open = 90.97,
        High = 90.97,
        Low = 90.02,
        Close = 90.03,
        Volume = 2506000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/10"),
        Open = 89.95,
        High = 90.87,
        Low = 89.95,
        Close = 90.84,
        Volume = 2753000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/11"),
        Open = 90.9,
        High = 90.99,
        Low = 89.65,
        Close = 89.97,
        Volume = 3446200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/12"),
        Open = 89.98,
        High = 90.86,
        Low = 89.4,
        Close = 90.85,
        Volume = 2627900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/13"),
        Open = 91.1,
        High = 91.1,
        Low = 90.18,
        Close = 91.03,
        Volume = 3025400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/16"),
        Open = 91,
        High = 91.28,
        Low = 89.93,
        Close = 90.31,
        Volume = 3731600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/17"),
        Open = 90.3,
        High = 91.14,
        Low = 90.05,
        Close = 90.45,
        Volume = 3908200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/18"),
        Open = 90.45,
        High = 94.17,
        Low = 90.34,
        Close = 93.88,
        Volume = 9472000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/19"),
        Open = 93.49,
        High = 94.75,
        Low = 92.76,
        Close = 92.99,
        Volume = 6148600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/20"),
        Open = 93.77,
        High = 94.12,
        Low = 93.06,
        Close = 93.29,
        Volume = 5929600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/23"),
        Open = 94.1,
        High = 94.24,
        Low = 93.31,
        Close = 93.64,
        Volume = 4873400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/24"),
        Open = 94.9,
        High = 94.96,
        Low = 93.37,
        Close = 93.67,
        Volume = 5606900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/25"),
        Open = 94.64,
        High = 94.75,
        Low = 92.75,
        Close = 94.69,
        Volume = 7498200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/26"),
        Open = 94.54,
        High = 95.58,
        Low = 94.04,
        Close = 94.26,
        Volume = 4824900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/27"),
        Open = 94.25,
        High = 94.35,
        Low = 93.28,
        Close = 94.02,
        Volume = 3510700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/04/30"),
        Open = 94.02,
        High = 94.11,
        Low = 92.85,
        Close = 93,
        Volume = 3709800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/01"),
        Open = 93.15,
        High = 93.65,
        Low = 92.5,
        Close = 93.23,
        Volume = 3192300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/02"),
        Open = 93.08,
        High = 94.46,
        Low = 92.84,
        Close = 93.83,
        Volume = 3166900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/03"),
        Open = 94.08,
        High = 94.49,
        Low = 93.5,
        Close = 93.85,
        Volume = 3022800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/04"),
        Open = 94.35,
        High = 94.38,
        Low = 93.12,
        Close = 93.61,
        Volume = 3015100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/07"),
        Open = 93.8,
        High = 95,
        Low = 93.65,
        Close = 94.56,
        Volume = 3915500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/08"),
        Open = 94.41,
        High = 94.41,
        Low = 93.7,
        Close = 94.21,
        Volume = 4407300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/09"),
        Open = 93.87,
        High = 94.27,
        Low = 93.35,
        Close = 94.08,
        Volume = 2942100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/10"),
        Open = 93.75,
        High = 94.16,
        Low = 92.7,
        Close = 92.8,
        Volume = 2572500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/11"),
        Open = 92.81,
        High = 94.23,
        Low = 92.38,
        Close = 93.4,
        Volume = 2684100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/14"),
        Open = 93.4,
        High = 94.14,
        Low = 93.32,
        Close = 93.56,
        Volume = 2057900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/15"),
        Open = 93.98,
        High = 95.45,
        Low = 93.79,
        Close = 94.34,
        Volume = 4951600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/16"),
        Open = 94.5,
        High = 95.46,
        Low = 94.5,
        Close = 95.34,
        Volume = 3981800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/17"),
        Open = 95.34,
        High = 97.18,
        Low = 95.23,
        Close = 96.79,
        Volume = 4774100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/18"),
        Open = 97.07,
        High = 97.5,
        Low = 96.27,
        Close = 96.63,
        Volume = 4129600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/21"),
        Open = 96.42,
        High = 97.74,
        Low = 96.25,
        Close = 96.9,
        Volume = 4417900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/22"),
        Open = 97.24,
        High = 97.6,
        Low = 96.36,
        Close = 96.48,
        Volume = 3716800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/23"),
        Open = 95.95,
        High = 96.45,
        Low = 95.36,
        Close = 95.57,
        Volume = 4217400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/24"),
        Open = 95.9,
        High = 98.84,
        Low = 95.75,
        Close = 97.42,
        Volume = 7288300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/25"),
        Open = 98.3,
        High = 98.64,
        Low = 97.38,
        Close = 98.25,
        Volume = 3200500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/29"),
        Open = 98.52,
        High = 99.2,
        Low = 97.96,
        Close = 98.5,
        Volume = 3250500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/30"),
        Open = 98.47,
        High = 100.64,
        Low = 98.3,
        Close = 100.55,
        Volume = 5648100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/05/31"),
        Open = 100.69,
        High = 100.96,
        Low = 100.47,
        Close = 100.59,
        Volume = 4212400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/01"),
        Open = 101.45,
        High = 101.45,
        Low = 99.45,
        Close = 99.83,
        Volume = 4001500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/04"),
        Open = 101,
        High = 101,
        Low = 99.5,
        Close = 99.98,
        Volume = 2661100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/05"),
        Open = 99.94,
        High = 99.96,
        Low = 98.84,
        Close = 99.5,
        Volume = 3177100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/06"),
        Open = 98.97,
        High = 99.2,
        Low = 97.69,
        Close = 98.29,
        Volume = 3352100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/07"),
        Open = 98.29,
        High = 99.09,
        Low = 96.81,
        Close = 96.84,
        Volume = 4610000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/08"),
        Open = 96.7,
        High = 98.22,
        Low = 95.91,
        Close = 98.19,
        Volume = 3843000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/11"),
        Open = 98.25,
        High = 98.79,
        Low = 97.42,
        Close = 97.55,
        Volume = 3308100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/12"),
        Open = 97.55,
        High = 97.59,
        Low = 96.12,
        Close = 96.48,
        Volume = 4799500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/13"),
        Open = 97.12,
        High = 98.55,
        Low = 96.92,
        Close = 98.47,
        Volume = 5212500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/14"),
        Open = 99,
        High = 99.5,
        Low = 98.73,
        Close = 98.97,
        Volume = 3365900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/15"),
        Open = 99.52,
        High = 100,
        Low = 97.93,
        Close = 98.15,
        Volume = 7137800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/18"),
        Open = 98.03,
        High = 98.58,
        Low = 97.29,
        Close = 97.4,
        Volume = 4005300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/19"),
        Open = 97.4,
        High = 98.24,
        Low = 96.51,
        Close = 96.92,
        Volume = 5046900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/20"),
        Open = 97.1,
        High = 97.72,
        Low = 96.01,
        Close = 96.08,
        Volume = 4634100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/21"),
        Open = 96.08,
        High = 97.2,
        Low = 95.17,
        Close = 97.2,
        Volume = 6257400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/22"),
        Open = 96.64,
        High = 96.9,
        Low = 95.6,
        Close = 95.92,
        Volume = 5168200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/25"),
        Open = 96,
        High = 96.57,
        Low = 94.8,
        Close = 95.57,
        Volume = 4180900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/26"),
        Open = 95.4,
        High = 96.47,
        Low = 94.87,
        Close = 94.98,
        Volume = 4336900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/27"),
        Open = 94.31,
        High = 94.9,
        Low = 93.58,
        Close = 94.65,
        Volume = 4398600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/28"),
        Open = 95,
        High = 95.59,
        Low = 94.26,
        Close = 95.16,
        Volume = 3330700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/06/29"),
        Open = 95.36,
        High = 96.34,
        Low = 95.25,
        Close = 96.16,
        Volume = 5772300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/02"),
        Open = 96.72,
        High = 97.05,
        Low = 96.27,
        Close = 96.77,
        Volume = 2643600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/03"),
        Open = 96.8,
        High = 98.06,
        Low = 96.8,
        Close = 97.65,
        Volume = 2122100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/05"),
        Open = 97.52,
        High = 98.48,
        Low = 97.23,
        Close = 98.36,
        Volume = 2525400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/06"),
        Open = 98.13,
        High = 99.22,
        Low = 98.02,
        Close = 98.88,
        Volume = 2557000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/09"),
        Open = 100.99,
        High = 101.32,
        Low = 99.6,
        Close = 99.9,
        Volume = 4889500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/10"),
        Open = 100.6,
        High = 100.66,
        Low = 99.63,
        Close = 100.25,
        Volume = 6604000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/11"),
        Open = 100.48,
        High = 100.83,
        Low = 99.56,
        Close = 100.12,
        Volume = 4544200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/12"),
        Open = 100.5,
        High = 100.82,
        Low = 99.76,
        Close = 100.78,
        Volume = 3755100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/13"),
        Open = 101.18,
        High = 102.43,
        Low = 100.6,
        Close = 101.88,
        Volume = 4180400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/16"),
        Open = 102,
        High = 102.17,
        Low = 101,
        Close = 102.07,
        Volume = 3388600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/17"),
        Open = 101.91,
        High = 102.73,
        Low = 101.4,
        Close = 102.05,
        Volume = 3259400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/18"),
        Open = 101.85,
        High = 102.75,
        Low = 100.89,
        Close = 101.82,
        Volume = 4081400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/19"),
        Open = 101.63,
        High = 102.82,
        Low = 101.63,
        Close = 102.48,
        Volume = 2448100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/20"),
        Open = 102.8,
        High = 104.42,
        Low = 102.35,
        Close = 103.86,
        Volume = 6394600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/23"),
        Open = 104.48,
        High = 104.55,
        Low = 103.22,
        Close = 104.04,
        Volume = 3928300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/24"),
        Open = 103.45,
        High = 105.67,
        Low = 103.34,
        Close = 103.8,
        Volume = 5395300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/25"),
        Open = 106.98,
        High = 107.83,
        Low = 106.38,
        Close = 107.23,
        Volume = 9389900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/26"),
        Open = 106.06,
        High = 106.8,
        Low = 102.23,
        Close = 103.7,
        Volume = 9893900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/27"),
        Open = 103.6,
        High = 106.39,
        Low = 103.6,
        Close = 103.71,
        Volume = 7675300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/30"),
        Open = 104.6,
        High = 106.15,
        Low = 104,
        Close = 105.54,
        Volume = 5824500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/07/31"),
        Open = 106.54,
        High = 106.54,
        Low = 103.31,
        Close = 103.43,
        Volume = 6293700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/01"),
        Open = 103.03,
        High = 104.84,
        Low = 103,
        Close = 104.53,
        Volume = 5999100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/02"),
        Open = 105.02,
        High = 106,
        Low = 104.51,
        Close = 105.93,
        Volume = 4308600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/03"),
        Open = 105.5,
        High = 106.35,
        Low = 104.22,
        Close = 104.24,
        Volume = 5382500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/06"),
        Open = 104.49,
        High = 104.85,
        Low = 102.09,
        Close = 104.34,
        Volume = 6269100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/07"),
        Open = 103.7,
        High = 104.12,
        Low = 102.3,
        Close = 103.22,
        Volume = 4721300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/08"),
        Open = 103.1,
        High = 104.19,
        Low = 100.71,
        Close = 102.72,
        Volume = 5209500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/09"),
        Open = 100.79,
        High = 102.23,
        Low = 98.02,
        Close = 98.3,
        Volume = 8659200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/10"),
        Open = 96.95,
        High = 98.51,
        Low = 94,
        Close = 98.44,
        Volume = 10005200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/13"),
        Open = 99.46,
        High = 100.91,
        Low = 99.25,
        Close = 100.05,
        Volume = 5569900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/14"),
        Open = 100.33,
        High = 100.72,
        Low = 97.4,
        Close = 97.63,
        Volume = 4481600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/15"),
        Open = 97,
        High = 98.8,
        Low = 95.21,
        Close = 95.51,
        Volume = 5213300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/16"),
        Open = 95.2,
        High = 95.2,
        Low = 90.08,
        Close = 92.74,
        Volume = 12314800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/17"),
        Open = 94.79,
        High = 97.73,
        Low = 94.64,
        Close = 95.93,
        Volume = 7943900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/20"),
        Open = 96.26,
        High = 97.54,
        Low = 94.75,
        Close = 97.21,
        Volume = 4779200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/21"),
        Open = 96.83,
        High = 97.24,
        Low = 96.07,
        Close = 96.95,
        Volume = 2917600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/22"),
        Open = 97.5,
        High = 98.85,
        Low = 97,
        Close = 97.99,
        Volume = 4117000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/23"),
        Open = 98.95,
        High = 98.95,
        Low = 96.22,
        Close = 96.74,
        Volume = 4349000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/24"),
        Open = 96.78,
        High = 98.6,
        Low = 96.63,
        Close = 98.47,
        Volume = 4153000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/27"),
        Open = 98.07,
        High = 98.95,
        Low = 97.13,
        Close = 98.54,
        Volume = 3217600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/28"),
        Open = 97.99,
        High = 98.38,
        Low = 95.44,
        Close = 95.65,
        Volume = 4558200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/29"),
        Open = 96.5,
        High = 97.55,
        Low = 95.84,
        Close = 96.9,
        Volume = 5091600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/30"),
        Open = 96.74,
        High = 97.67,
        Low = 95.93,
        Close = 96.85,
        Volume = 4076400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/08/31"),
        Open = 98,
        High = 98.58,
        Low = 96.7,
        Close = 96.7,
        Volume = 3556900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/04"),
        Open = 96.1,
        High = 96.31,
        Low = 94.9,
        Close = 95.92,
        Volume = 6560300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/05"),
        Open = 95.2,
        High = 97.74,
        Low = 94.02,
        Close = 95.84,
        Volume = 10478400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/06"),
        Open = 95.54,
        High = 96.24,
        Low = 94.5,
        Close = 96.2,
        Volume = 6555800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/07"),
        Open = 95.2,
        High = 96.1,
        Low = 94.66,
        Close = 94.84,
        Volume = 5631000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/10"),
        Open = 95.01,
        High = 95.94,
        Low = 94.05,
        Close = 95.33,
        Volume = 4720900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/11"),
        Open = 95.98,
        High = 97.87,
        Low = 95.52,
        Close = 97.44,
        Volume = 4784300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/12"),
        Open = 97.21,
        High = 98.73,
        Low = 97,
        Close = 98.32,
        Volume = 4107400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/13"),
        Open = 98.6,
        High = 99.37,
        Low = 98.35,
        Close = 98.95,
        Volume = 3888600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/14"),
        Open = 98.4,
        High = 99.58,
        Low = 98.02,
        Close = 99.35,
        Volume = 4200700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/17"),
        Open = 98.8,
        High = 99.73,
        Low = 98.07,
        Close = 98.64,
        Volume = 3632000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/18"),
        Open = 98.6,
        High = 98.82,
        Low = 96.44,
        Close = 98.47,
        Volume = 9869000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/19"),
        Open = 99.4,
        High = 100.71,
        Low = 99.05,
        Close = 100.02,
        Volume = 6854900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/20"),
        Open = 99.94,
        High = 101.35,
        Low = 99.94,
        Close = 101.25,
        Volume = 4600500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/21"),
        Open = 102.35,
        High = 103.23,
        Low = 101.25,
        Close = 102.59,
        Volume = 6567000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/24"),
        Open = 103,
        High = 103.76,
        Low = 102.4,
        Close = 103.05,
        Volume = 4829100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/25"),
        Open = 102.74,
        High = 105.02,
        Low = 102.54,
        Close = 104.93,
        Volume = 5001400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/26"),
        Open = 105.3,
        High = 105.98,
        Low = 103.25,
        Close = 104.45,
        Volume = 4904900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/27"),
        Open = 104.45,
        High = 106.15,
        Low = 104,
        Close = 105.46,
        Volume = 3965200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/09/28"),
        Open = 105.2,
        High = 105.96,
        Low = 104.23,
        Close = 104.99,
        Volume = 4373100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/01"),
        Open = 105.45,
        High = 107,
        Low = 105.22,
        Close = 106.65,
        Volume = 3634600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/02"),
        Open = 106.62,
        High = 107.15,
        Low = 105.27,
        Close = 105.93,
        Volume = 4465800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/03"),
        Open = 105.33,
        High = 105.73,
        Low = 104.25,
        Close = 104.72,
        Volume = 3652000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/04"),
        Open = 105.15,
        High = 105.7,
        Low = 104.45,
        Close = 104.5,
        Volume = 3441800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/05"),
        Open = 105.4,
        High = 105.5,
        Low = 101.09,
        Close = 102.25,
        Volume = 8241700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/08"),
        Open = 103.26,
        High = 103.26,
        Low = 100.09,
        Close = 101.07,
        Volume = 5298700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/09"),
        Open = 101.32,
        High = 101.76,
        Low = 99.66,
        Close = 101.45,
        Volume = 5547100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/10"),
        Open = 100.89,
        High = 102.4,
        Low = 97.04,
        Close = 98.68,
        Volume = 25062800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/11"),
        Open = 99.5,
        High = 99.58,
        Low = 94.96,
        Close = 96.26,
        Volume = 13140500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/12"),
        Open = 96.11,
        High = 97.59,
        Low = 95.42,
        Close = 96.69,
        Volume = 9494700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/15"),
        Open = 95.98,
        High = 96.5,
        Low = 94.45,
        Close = 94.83,
        Volume = 8046100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/16"),
        Open = 94.5,
        High = 96.34,
        Low = 93.03,
        Close = 95.94,
        Volume = 9706600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/17"),
        Open = 96.52,
        High = 97.05,
        Low = 94.63,
        Close = 95.59,
        Volume = 7800700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/18"),
        Open = 95.36,
        High = 97.15,
        Low = 94.8,
        Close = 96.94,
        Volume = 6689500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/19"),
        Open = 96.54,
        High = 97,
        Low = 93.79,
        Close = 93.9,
        Volume = 9050700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/22"),
        Open = 93.16,
        High = 95.04,
        Low = 92.6,
        Close = 94.93,
        Volume = 7916400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/23"),
        Open = 95.76,
        High = 95.96,
        Low = 94.16,
        Close = 94.95,
        Volume = 6054600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/24"),
        Open = 95.69,
        High = 96.08,
        Low = 93.02,
        Close = 94.26,
        Volume = 9612000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/25"),
        Open = 94.88,
        High = 98.97,
        Low = 92,
        Close = 96,
        Volume = 8122700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/26"),
        Open = 96.25,
        High = 96.55,
        Low = 95.05,
        Close = 96.02,
        Volume = 5157400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/29"),
        Open = 95.78,
        High = 97.6,
        Low = 95.24,
        Close = 96.99,
        Volume = 8901400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/30"),
        Open = 97.25,
        High = 98.6,
        Low = 97,
        Close = 97.33,
        Volume = 7379300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/10/31"),
        Open = 98.15,
        High = 98.71,
        Low = 97.33,
        Close = 98.59,
        Volume = 5711200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/01"),
        Open = 98.3,
        High = 98.49,
        Low = 96.5,
        Close = 96.6,
        Volume = 6338600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/02"),
        Open = 96.62,
        High = 97.88,
        Low = 96.34,
        Close = 97.76,
        Volume = 5351600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/05"),
        Open = 97.59,
        High = 98.67,
        Low = 96.51,
        Close = 97.97,
        Volume = 4384900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/06"),
        Open = 98,
        High = 98.43,
        Low = 96.94,
        Close = 97.7,
        Volume = 4043900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/07"),
        Open = 97,
        High = 97.99,
        Low = 96.11,
        Close = 96.89,
        Volume = 5710700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/08"),
        Open = 96.97,
        High = 97.25,
        Low = 94.9,
        Close = 96.28,
        Volume = 6954500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/09"),
        Open = 95.08,
        High = 95.75,
        Low = 94.07,
        Close = 94.21,
        Volume = 5997000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/12"),
        Open = 94.25,
        High = 94.41,
        Low = 92.7,
        Close = 92.86,
        Volume = 6370600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/13"),
        Open = 93.83,
        High = 94.15,
        Low = 92.87,
        Close = 93.7,
        Volume = 6243900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/14"),
        Open = 94.14,
        High = 94.25,
        Low = 92.5,
        Close = 92.79,
        Volume = 6304000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/15"),
        Open = 91.46,
        High = 92.86,
        Low = 90.97,
        Close = 91.34,
        Volume = 6606800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/16"),
        Open = 92,
        High = 92.05,
        Low = 89.45,
        Close = 89.99,
        Volume = 9097900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/19"),
        Open = 89.6,
        High = 89.92,
        Low = 88.12,
        Close = 88.27,
        Volume = 8416200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/20"),
        Open = 88.31,
        High = 88.95,
        Low = 86.92,
        Close = 87.86,
        Volume = 8254900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/21"),
        Open = 86.78,
        High = 88.5,
        Low = 86.75,
        Close = 87.41,
        Volume = 7069300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/23"),
        Open = 88.5,
        High = 89.66,
        Low = 88.07,
        Close = 89.54,
        Volume = 3156600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/26"),
        Open = 90.5,
        High = 92.39,
        Low = 89.86,
        Close = 89.93,
        Volume = 6881400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/27"),
        Open = 90.57,
        High = 92.55,
        Low = 90.52,
        Close = 91.73,
        Volume = 7010900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/28"),
        Open = 92.61,
        High = 93.83,
        Low = 91.76,
        Close = 93.61,
        Volume = 6850200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/29"),
        Open = 93.61,
        High = 94.27,
        Low = 92.61,
        Close = 93.21,
        Volume = 4619900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/11/30"),
        Open = 94.6,
        High = 94.6,
        Low = 91.72,
        Close = 92.54,
        Volume = 9994000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/03"),
        Open = 92.5,
        High = 93.2,
        Low = 91.66,
        Close = 91.79,
        Volume = 5410300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/04"),
        Open = 91.43,
        High = 91.79,
        Low = 89.85,
        Close = 89.99,
        Volume = 7044100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/05"),
        Open = 90.9,
        High = 92.16,
        Low = 90.36,
        Close = 90.7,
        Volume = 9083300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/06"),
        Open = 91.5,
        High = 92.44,
        Low = 90.83,
        Close = 91.78,
        Volume = 5805500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/07"),
        Open = 92.36,
        High = 93.64,
        Low = 92,
        Close = 93.16,
        Volume = 5209500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/10"),
        Open = 93.25,
        High = 93.25,
        Low = 91.78,
        Close = 92.64,
        Volume = 5947800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/11"),
        Open = 92.64,
        High = 93,
        Low = 88.12,
        Close = 88.7,
        Volume = 10280800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/12"),
        Open = 88,
        High = 89.53,
        Low = 85.55,
        Close = 86.92,
        Volume = 18259500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/13"),
        Open = 86.67,
        High = 88.91,
        Low = 86.4,
        Close = 88.55,
        Volume = 7177700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/14"),
        Open = 88.54,
        High = 89.99,
        Low = 88.03,
        Close = 88.42,
        Volume = 4921000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/17"),
        Open = 88.21,
        High = 88.9,
        Low = 87.2,
        Close = 87.4,
        Volume = 4638400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/18"),
        Open = 87.87,
        High = 87.87,
        Low = 86.2,
        Close = 87.17,
        Volume = 5487600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/19"),
        Open = 87.75,
        High = 88.17,
        Low = 86.47,
        Close = 86.62,
        Volume = 8064300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/20"),
        Open = 87.08,
        High = 87.41,
        Low = 86.48,
        Close = 87.19,
        Volume = 3320300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/21"),
        Open = 88.04,
        High = 89.34,
        Low = 87.8,
        Close = 89.07,
        Volume = 7500600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/24"),
        Open = 89.55,
        High = 90.38,
        Low = 89.55,
        Close = 90.02,
        Volume = 1937300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/26"),
        Open = 90,
        High = 90.13,
        Low = 89.28,
        Close = 90,
        Volume = 2609600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/27"),
        Open = 89.99,
        High = 89.99,
        Low = 88.33,
        Close = 88.88,
        Volume = 2880600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/28"),
        Open = 89,
        High = 89.11,
        Low = 87.48,
        Close = 88.25,
        Volume = 2899600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2007/12/31"),
        Open = 88.14,
        High = 88.28,
        Low = 87.24,
        Close = 87.46,
        Volume = 3118300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/02"),
        Open = 87.57,
        High = 87.84,
        Low = 86,
        Close = 86.62,
        Volume = 4160900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/03"),
        Open = 87.07,
        High = 87.64,
        Low = 86.74,
        Close = 86.98,
        Volume = 3348100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/04"),
        Open = 86.32,
        High = 87.16,
        Low = 85.69,
        Close = 85.82,
        Volume = 5361300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/07"),
        Open = 86.25,
        High = 86.3,
        Low = 82.17,
        Close = 82.87,
        Volume = 9946200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/08"),
        Open = 83.11,
        High = 83.37,
        Low = 79.65,
        Close = 79.91,
        Volume = 9481500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/09"),
        Open = 79.7,
        High = 80.43,
        Low = 77.81,
        Close = 80.3,
        Volume = 10138600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/10"),
        Open = 79.86,
        High = 83.19,
        Low = 79.86,
        Close = 82.36,
        Volume = 9213100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/11"),
        Open = 81.77,
        High = 81.78,
        Low = 80,
        Close = 80.52,
        Volume = 6437000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/14"),
        Open = 81.33,
        High = 82.37,
        Low = 80.15,
        Close = 81.67,
        Volume = 7716100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/15"),
        Open = 81.47,
        High = 81.8,
        Low = 76,
        Close = 77.86,
        Volume = 15959100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/16"),
        Open = 77.81,
        High = 81.31,
        Low = 76.5,
        Close = 79.87,
        Volume = 13178600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/17"),
        Open = 81.2,
        High = 82.49,
        Low = 79.02,
        Close = 79.52,
        Volume = 9202000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/18"),
        Open = 80.25,
        High = 80.82,
        Low = 77.76,
        Close = 78.4,
        Volume = 7254900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/22"),
        Open = 74.53,
        High = 78.74,
        Low = 74.4,
        Close = 77.6,
        Volume = 8330800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/23"),
        Open = 75.5,
        High = 77.19,
        Low = 74.12,
        Close = 76.57,
        Volume = 12787700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/24"),
        Open = 77.56,
        High = 78.34,
        Low = 76.48,
        Close = 77.62,
        Volume = 7156200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/25"),
        Open = 78.65,
        High = 79.67,
        Low = 76.97,
        Close = 77.03,
        Volume = 6925400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/28"),
        Open = 77.15,
        High = 77.72,
        Low = 76.48,
        Close = 77.6,
        Volume = 4851200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/29"),
        Open = 78.57,
        High = 81.06,
        Low = 78.27,
        Close = 80.96,
        Volume = 7107800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/30"),
        Open = 79.7,
        High = 84.87,
        Low = 79.69,
        Close = 82.87,
        Volume = 11244100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/01/31"),
        Open = 81.78,
        High = 83.84,
        Low = 80.8,
        Close = 83.18,
        Volume = 7826500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/01"),
        Open = 83.37,
        High = 83.99,
        Low = 81.85,
        Close = 82.76,
        Volume = 5877300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/04"),
        Open = 82.78,
        High = 83.36,
        Low = 81.91,
        Close = 82.9,
        Volume = 3058300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/05"),
        Open = 81.61,
        High = 82.78,
        Low = 81.35,
        Close = 81.69,
        Volume = 4538800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/06"),
        Open = 81.9,
        High = 81.95,
        Low = 79.6,
        Close = 79.91,
        Volume = 5111400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/07"),
        Open = 78.71,
        High = 80.24,
        Low = 78.71,
        Close = 79.75,
        Volume = 6211300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/08"),
        Open = 79.48,
        High = 80.14,
        Low = 78.81,
        Close = 79.33,
        Volume = 4323600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/11"),
        Open = 79.46,
        High = 81.39,
        Low = 78.85,
        Close = 81.13,
        Volume = 4871500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/12"),
        Open = 81.8,
        High = 84.53,
        Low = 81.44,
        Close = 83.56,
        Volume = 7923000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/13"),
        Open = 84.35,
        High = 85.63,
        Low = 84.01,
        Close = 85.48,
        Volume = 5846400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/14"),
        Open = 85.67,
        High = 86.06,
        Low = 84.9,
        Close = 85.22,
        Volume = 6044600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/15"),
        Open = 85.06,
        High = 85.42,
        Low = 84.17,
        Close = 85.18,
        Volume = 5683600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/19"),
        Open = 86.11,
        High = 86.88,
        Low = 84.83,
        Close = 85.37,
        Volume = 4139100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/20"),
        Open = 84.47,
        High = 84.69,
        Low = 82.95,
        Close = 84,
        Volume = 7485900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/21"),
        Open = 84.12,
        High = 84.96,
        Low = 81.87,
        Close = 82.01,
        Volume = 6659800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/22"),
        Open = 82.51,
        High = 83.21,
        Low = 81.75,
        Close = 83.04,
        Volume = 5009500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/25"),
        Open = 83.26,
        High = 84.74,
        Low = 83.12,
        Close = 84.66,
        Volume = 5054900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/26"),
        Open = 85.12,
        High = 85.12,
        Low = 83.9,
        Close = 84.57,
        Volume = 5145200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/27"),
        Open = 84.22,
        High = 85.19,
        Low = 83.4,
        Close = 83.95,
        Volume = 4575600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/28"),
        Open = 83.51,
        High = 85,
        Low = 82.73,
        Close = 84.8,
        Volume = 5709200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/02/29"),
        Open = 84.03,
        High = 84.5,
        Low = 82.4,
        Close = 82.79,
        Volume = 6343900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/03"),
        Open = 79.32,
        High = 80.89,
        Low = 79.25,
        Close = 80.67,
        Volume = 9518900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/04"),
        Open = 79.78,
        High = 79.99,
        Low = 78.34,
        Close = 79.62,
        Volume = 8099200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/05"),
        Open = 79.82,
        High = 81.32,
        Low = 79.67,
        Close = 80.71,
        Volume = 5274400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/06"),
        Open = 80.55,
        High = 80.72,
        Low = 79.38,
        Close = 79.51,
        Volume = 4491200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/07"),
        Open = 78.99,
        High = 79,
        Low = 76.37,
        Close = 76.6,
        Volume = 9595800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/10"),
        Open = 76.53,
        High = 76.71,
        Low = 74.38,
        Close = 74.38,
        Volume = 9851900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/11"),
        Open = 74.78,
        High = 75.75,
        Low = 72.39,
        Close = 73.4,
        Volume = 13613500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/12"),
        Open = 73.71,
        High = 74.75,
        Low = 72.13,
        Close = 72.45,
        Volume = 8954300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/13"),
        Open = 71.81,
        High = 74.42,
        Low = 71.58,
        Close = 74.18,
        Volume = 10497900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/14"),
        Open = 75.79,
        High = 77.19,
        Low = 75.13,
        Close = 76.23,
        Volume = 12716000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/17"),
        Open = 74.46,
        High = 76.2,
        Low = 74.14,
        Close = 75.49,
        Volume = 5306500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/18"),
        Open = 77,
        High = 77,
        Low = 75.26,
        Close = 76.53,
        Volume = 5521800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/19"),
        Open = 76.98,
        High = 77,
        Low = 73.45,
        Close = 73.45,
        Volume = 9168900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/20"),
        Open = 73.55,
        High = 75,
        Low = 72.72,
        Close = 74.8,
        Volume = 7962700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/24"),
        Open = 75.25,
        High = 76.48,
        Low = 74.79,
        Close = 76.29,
        Volume = 4818700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/25"),
        Open = 76.88,
        High = 76.88,
        Low = 75.14,
        Close = 75.9,
        Volume = 5458500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/26"),
        Open = 75.66,
        High = 76.5,
        Low = 75.6,
        Close = 76.3,
        Volume = 4115800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/27"),
        Open = 75.86,
        High = 76.36,
        Low = 74.14,
        Close = 74.22,
        Volume = 7584200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/28"),
        Open = 74.44,
        High = 74.63,
        Low = 73.08,
        Close = 73.47,
        Volume = 4604500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/03/31"),
        Open = 74,
        High = 74.58,
        Low = 73.4,
        Close = 74.37,
        Volume = 7052300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/01"),
        Open = 75.02,
        High = 75.89,
        Low = 74.8,
        Close = 75.88,
        Volume = 5878700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/02"),
        Open = 76.1,
        High = 77.19,
        Low = 75.73,
        Close = 76.85,
        Volume = 6090000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/03"),
        Open = 76.55,
        High = 77.22,
        Low = 75.9,
        Close = 76.14,
        Volume = 5238200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/04"),
        Open = 76.04,
        High = 76.63,
        Low = 75.33,
        Close = 75.65,
        Volume = 5046000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/07"),
        Open = 76.53,
        High = 76.53,
        Low = 74.88,
        Close = 74.98,
        Volume = 5322900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/08"),
        Open = 74.51,
        High = 75.39,
        Low = 74.04,
        Close = 75.02,
        Volume = 5494300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/09"),
        Open = 76.72,
        High = 79.9,
        Low = 76.31,
        Close = 78.6,
        Volume = 18990300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/10"),
        Open = 78.45,
        High = 79.05,
        Low = 77.79,
        Close = 78.43,
        Volume = 7363300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/11"),
        Open = 77.65,
        High = 78.41,
        Low = 76.72,
        Close = 76.86,
        Volume = 5365500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/14"),
        Open = 76.68,
        High = 77.64,
        Low = 76.67,
        Close = 77.22,
        Volume = 4417300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/15"),
        Open = 77.56,
        High = 77.67,
        Low = 75.6,
        Close = 75.7,
        Volume = 6298800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/16"),
        Open = 76.31,
        High = 76.92,
        Low = 75.64,
        Close = 76.67,
        Volume = 4798600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/17"),
        Open = 76.4,
        High = 77.26,
        Low = 76.4,
        Close = 76.91,
        Volume = 3276200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/18"),
        Open = 77.5,
        High = 79.1,
        Low = 77.5,
        Close = 78.66,
        Volume = 6617500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/21"),
        Open = 78.71,
        High = 79.37,
        Low = 78.17,
        Close = 79.09,
        Volume = 4407800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/22"),
        Open = 79.32,
        High = 79.99,
        Low = 77.75,
        Close = 78.56,
        Volume = 7600000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/23"),
        Open = 80.65,
        High = 83.36,
        Low = 79.57,
        Close = 82.09,
        Volume = 14962100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/24"),
        Open = 82.49,
        High = 83.37,
        Low = 81.65,
        Close = 83,
        Volume = 5711200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/25"),
        Open = 83.38,
        High = 85.25,
        Low = 83.38,
        Close = 84.84,
        Volume = 8334100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/28"),
        Open = 85.01,
        High = 85.64,
        Low = 84.28,
        Close = 84.98,
        Volume = 5341200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/29"),
        Open = 84.54,
        High = 86.45,
        Low = 84.54,
        Close = 85.53,
        Volume = 4455000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/04/30"),
        Open = 85.83,
        High = 86.18,
        Low = 84.63,
        Close = 84.86,
        Volume = 4800500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/01"),
        Open = 84.86,
        High = 85.48,
        Low = 84.57,
        Close = 85.41,
        Volume = 5048300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/02"),
        Open = 86.32,
        High = 86.5,
        Low = 84.98,
        Close = 85.69,
        Volume = 3769000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/05"),
        Open = 85.32,
        High = 86.07,
        Low = 85,
        Close = 85.92,
        Volume = 3855500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/06"),
        Open = 85.59,
        High = 86.21,
        Low = 85.13,
        Close = 86.15,
        Volume = 4353900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/07"),
        Open = 86.03,
        High = 86.1,
        Low = 84.42,
        Close = 84.55,
        Volume = 4928200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/08"),
        Open = 84.71,
        High = 85.2,
        Low = 84,
        Close = 84.76,
        Volume = 2658700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/09"),
        Open = 84.43,
        High = 84.75,
        Low = 83.75,
        Close = 84.06,
        Volume = 3210800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/12"),
        Open = 84.4,
        High = 85,
        Low = 83.28,
        Close = 84.8,
        Volume = 3356900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/13"),
        Open = 84.99,
        High = 85.29,
        Low = 84.11,
        Close = 85.08,
        Volume = 4283100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/14"),
        Open = 85.3,
        High = 86.67,
        Low = 85.08,
        Close = 85.69,
        Volume = 4900600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/15"),
        Open = 85.71,
        High = 86.14,
        Low = 85,
        Close = 85.55,
        Volume = 3504100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/16"),
        Open = 85.84,
        High = 85.84,
        Low = 84.74,
        Close = 85.17,
        Volume = 5117100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/19"),
        Open = 85.56,
        High = 88.29,
        Low = 85,
        Close = 87.07,
        Volume = 6725300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/20"),
        Open = 87.05,
        High = 87.05,
        Low = 84.61,
        Close = 85.14,
        Volume = 5252200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/21"),
        Open = 85.41,
        High = 85.6,
        Low = 80.78,
        Close = 81.19,
        Volume = 10538600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/22"),
        Open = 81.05,
        High = 81.72,
        Low = 80.55,
        Close = 81.41,
        Volume = 5950900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/23"),
        Open = 81.21,
        High = 82.09,
        Low = 80.85,
        Close = 81.48,
        Volume = 4456100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/27"),
        Open = 81.6,
        High = 83.3,
        Low = 81.6,
        Close = 82.87,
        Volume = 4417900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/28"),
        Open = 83.25,
        High = 83.25,
        Low = 81.08,
        Close = 82.13,
        Volume = 4123600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/29"),
        Open = 81.82,
        High = 83,
        Low = 81.05,
        Close = 82.11,
        Volume = 3443300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/05/30"),
        Open = 82.4,
        High = 82.94,
        Low = 81.01,
        Close = 82.77,
        Volume = 4605700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/02"),
        Open = 82.61,
        High = 82.61,
        Low = 80.47,
        Close = 81.15,
        Volume = 4469300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/03"),
        Open = 81.5,
        High = 81.8,
        Low = 77.3,
        Close = 78.12,
        Volume = 10135200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/04"),
        Open = 77.54,
        High = 78.82,
        Low = 77.48,
        Close = 78.02,
        Volume = 6738900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/05"),
        Open = 78.19,
        High = 78.2,
        Low = 76.8,
        Close = 77.31,
        Volume = 5722500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/06"),
        Open = 76.54,
        High = 76.57,
        Low = 73,
        Close = 73.16,
        Volume = 12691300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/09"),
        Open = 73.4,
        High = 74.12,
        Low = 73.14,
        Close = 73.95,
        Volume = 6620200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/10"),
        Open = 73.46,
        High = 74.11,
        Low = 72.76,
        Close = 73.67,
        Volume = 5617700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/11"),
        Open = 73.44,
        High = 73.77,
        Low = 72.93,
        Close = 73.31,
        Volume = 6490500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/12"),
        Open = 74.01,
        High = 77.05,
        Low = 73.79,
        Close = 74.12,
        Volume = 9547400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/13"),
        Open = 74.76,
        High = 75.49,
        Low = 74.38,
        Close = 75.12,
        Volume = 6040300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/16"),
        Open = 74.77,
        High = 75.45,
        Low = 74.03,
        Close = 75.02,
        Volume = 3475800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/17"),
        Open = 75.38,
        High = 75.5,
        Low = 73.81,
        Close = 74.38,
        Volume = 5901600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/18"),
        Open = 73.37,
        High = 76.34,
        Low = 73.37,
        Close = 74.65,
        Volume = 11473900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/19"),
        Open = 75.05,
        High = 77.21,
        Low = 74.68,
        Close = 76.95,
        Volume = 7382500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/20"),
        Open = 77.8,
        High = 77.8,
        Low = 75.66,
        Close = 75.83,
        Volume = 8544300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/23"),
        Open = 76.23,
        High = 76.48,
        Low = 75.12,
        Close = 75.59,
        Volume = 3985900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/24"),
        Open = 75.24,
        High = 75.61,
        Low = 74.13,
        Close = 74.79,
        Volume = 4908700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/25"),
        Open = 72.28,
        High = 72.79,
        Low = 69.16,
        Close = 69.64,
        Volume = 20767600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/26"),
        Open = 68.75,
        High = 70.39,
        Low = 68.05,
        Close = 68.21,
        Volume = 10807200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/27"),
        Open = 67.74,
        High = 67.93,
        Low = 66.38,
        Close = 66.92,
        Volume = 9878700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/06/30"),
        Open = 66.63,
        High = 66.75,
        Low = 65.55,
        Close = 65.72,
        Volume = 8509500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/01"),
        Open = 64.95,
        High = 66.22,
        Low = 64.56,
        Close = 65.45,
        Volume = 9692300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/02"),
        Open = 65.82,
        High = 65.99,
        Low = 63.9,
        Close = 63.9,
        Volume = 9681200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/03"),
        Open = 64.01,
        High = 64.6,
        Low = 63.54,
        Close = 64.47,
        Volume = 4039700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/07"),
        Open = 64.66,
        High = 65.69,
        Low = 63.57,
        Close = 64.29,
        Volume = 6119100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/08"),
        Open = 64.43,
        High = 66,
        Low = 64.21,
        Close = 65.92,
        Volume = 6615200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/09"),
        Open = 66.06,
        High = 67.23,
        Low = 65.32,
        Close = 65.59,
        Volume = 9532500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/10"),
        Open = 65.95,
        High = 66.5,
        Low = 65.01,
        Close = 65.99,
        Volume = 6644200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/11"),
        Open = 65.35,
        High = 65.35,
        Low = 62.86,
        Close = 63.28,
        Volume = 9701500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/14"),
        Open = 64.4,
        High = 64.4,
        Low = 62.63,
        Close = 63.19,
        Volume = 5402800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/15"),
        Open = 62.06,
        High = 64.36,
        Low = 62.02,
        Close = 63.88,
        Volume = 7858400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/16"),
        Open = 63.91,
        High = 65.68,
        Low = 63.5,
        Close = 65.58,
        Volume = 5431100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/17"),
        Open = 66.05,
        High = 67.22,
        Low = 65.05,
        Close = 66.92,
        Volume = 6970900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/18"),
        Open = 67.11,
        High = 68.34,
        Low = 66.54,
        Close = 68.14,
        Volume = 8363100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/21"),
        Open = 68.5,
        High = 68.91,
        Low = 67.3,
        Close = 68.24,
        Volume = 5017000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/22"),
        Open = 68.58,
        High = 69.5,
        Low = 67.76,
        Close = 69.26,
        Volume = 5863500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/23"),
        Open = 67.32,
        High = 68.01,
        Low = 65.62,
        Close = 66.72,
        Volume = 10811700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/24"),
        Open = 65.6,
        High = 66.09,
        Low = 62.05,
        Close = 62.53,
        Volume = 13765300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/25"),
        Open = 63,
        High = 64.14,
        Low = 62.34,
        Close = 63.83,
        Volume = 9118200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/28"),
        Open = 63.82,
        High = 64.06,
        Low = 62.26,
        Close = 62.34,
        Volume = 6193300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/29"),
        Open = 62.64,
        High = 63.5,
        Low = 62.32,
        Close = 63.21,
        Volume = 5410600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/30"),
        Open = 63.59,
        High = 63.93,
        Low = 63,
        Close = 63.82,
        Volume = 5971500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/07/31"),
        Open = 63,
        High = 63,
        Low = 61.01,
        Close = 61.11,
        Volume = 10282400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/01"),
        Open = 61.39,
        High = 62.28,
        Low = 60.77,
        Close = 62.01,
        Volume = 5700800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/04"),
        Open = 62.08,
        High = 62.33,
        Low = 61.13,
        Close = 61.36,
        Volume = 6052800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/05"),
        Open = 61.87,
        High = 65.68,
        Low = 61.86,
        Close = 65.2,
        Volume = 8779300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/06"),
        Open = 64.9,
        High = 66.02,
        Low = 64,
        Close = 65.4,
        Volume = 6185600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/07"),
        Open = 65.06,
        High = 66.18,
        Low = 64.65,
        Close = 64.69,
        Volume = 7211100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/08"),
        Open = 64.87,
        High = 68.75,
        Low = 64.31,
        Close = 67.86,
        Volume = 9964100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/11"),
        Open = 67.89,
        High = 67.9,
        Low = 66.21,
        Close = 66.62,
        Volume = 6818500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/12"),
        Open = 66.89,
        High = 66.95,
        Low = 65.57,
        Close = 65.93,
        Volume = 6311700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/13"),
        Open = 66.07,
        High = 66.23,
        Low = 64,
        Close = 64.26,
        Volume = 8939500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/14"),
        Open = 63.74,
        High = 65.43,
        Low = 63.45,
        Close = 64.77,
        Volume = 9165000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/15"),
        Open = 64.77,
        High = 65.33,
        Low = 63.82,
        Close = 64.45,
        Volume = 7632100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/18"),
        Open = 64.5,
        High = 65.22,
        Low = 63.18,
        Close = 63.64,
        Volume = 4837000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/19"),
        Open = 63.48,
        High = 64.19,
        Low = 62.62,
        Close = 62.95,
        Volume = 8091900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/20"),
        Open = 62.99,
        High = 63.97,
        Low = 62.21,
        Close = 63.21,
        Volume = 3941300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/21"),
        Open = 62.97,
        High = 63.79,
        Low = 62.21,
        Close = 63.55,
        Volume = 3969400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/22"),
        Open = 63.94,
        High = 65.71,
        Low = 63.51,
        Close = 65.55,
        Volume = 5425100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/25"),
        Open = 64.91,
        High = 65.49,
        Low = 63.58,
        Close = 64.07,
        Volume = 4459000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/26"),
        Open = 64.09,
        High = 64.39,
        Low = 62.87,
        Close = 63.46,
        Volume = 4464800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/27"),
        Open = 63.57,
        High = 65.2,
        Low = 63.2,
        Close = 64.52,
        Volume = 3876500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/28"),
        Open = 64.78,
        High = 66.98,
        Low = 64.26,
        Close = 66.34,
        Volume = 4426500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/08/29"),
        Open = 66.25,
        High = 66.43,
        Low = 65.1,
        Close = 65.56,
        Volume = 3673300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/02"),
        Open = 67,
        High = 68.47,
        Low = 65.43,
        Close = 65.87,
        Volume = 6366400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/03"),
        Open = 65.69,
        High = 67.08,
        Low = 64.14,
        Close = 66.07,
        Volume = 5226200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/04"),
        Open = 65.01,
        High = 65.3,
        Low = 62.04,
        Close = 63.03,
        Volume = 10831400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/05"),
        Open = 62.52,
        High = 63.49,
        Low = 61.89,
        Close = 62.89,
        Volume = 5561900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/08"),
        Open = 62.47,
        High = 64.07,
        Low = 61.86,
        Close = 63.91,
        Volume = 8089100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/09"),
        Open = 63.92,
        High = 65.22,
        Low = 63.92,
        Close = 64.02,
        Volume = 7659500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/10"),
        Open = 63.58,
        High = 63.81,
        Low = 61.58,
        Close = 61.71,
        Volume = 8608300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/11"),
        Open = 61.13,
        High = 62.71,
        Low = 61.13,
        Close = 62.57,
        Volume = 5326700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/12"),
        Open = 62.38,
        High = 63.42,
        Low = 61.7,
        Close = 63.3,
        Volume = 4928900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/15"),
        Open = 61.81,
        High = 62.8,
        Low = 61,
        Close = 62.25,
        Volume = 9745400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/16"),
        Open = 61.02,
        High = 63,
        Low = 60.16,
        Close = 61.72,
        Volume = 8378000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/17"),
        Open = 60.88,
        High = 61,
        Low = 56.43,
        Close = 57,
        Volume = 14664900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/18"),
        Open = 57.69,
        High = 58.66,
        Low = 54.2,
        Close = 58.11,
        Volume = 13582400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/19"),
        Open = 60.74,
        High = 61,
        Low = 57.6,
        Close = 59.76,
        Volume = 10632300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/22"),
        Open = 59.33,
        High = 60.41,
        Low = 58.26,
        Close = 58.81,
        Volume = 5964700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/23"),
        Open = 58.91,
        High = 60.39,
        Low = 57.19,
        Close = 57.31,
        Volume = 6602200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/24"),
        Open = 57.54,
        High = 58.87,
        Low = 56.93,
        Close = 57.36,
        Volume = 5381000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/25"),
        Open = 57.67,
        High = 58.2,
        Low = 56.8,
        Close = 57.42,
        Volume = 6373000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/26"),
        Open = 56.74,
        High = 58.5,
        Low = 56.01,
        Close = 58.32,
        Volume = 5789900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/29"),
        Open = 57.5,
        High = 57.95,
        Low = 54.75,
        Close = 55.47,
        Volume = 9359900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/09/30"),
        Open = 56.29,
        High = 57.65,
        Low = 55.62,
        Close = 57.35,
        Volume = 6106800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/01"),
        Open = 56.76,
        High = 58,
        Low = 55.37,
        Close = 56.62,
        Volume = 6178700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/02"),
        Open = 56.33,
        High = 56.97,
        Low = 53.34,
        Close = 53.58,
        Volume = 8085500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/03"),
        Open = 54,
        High = 56.4,
        Low = 53.76,
        Close = 53.83,
        Volume = 7062100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/06"),
        Open = 51.77,
        High = 53,
        Low = 47.88,
        Close = 51.29,
        Volume = 12338600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/07"),
        Open = 51.79,
        High = 52.56,
        Low = 48.71,
        Close = 49.28,
        Volume = 10625100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/08"),
        Open = 48.41,
        High = 50,
        Low = 47.18,
        Close = 47.7,
        Volume = 11728300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/09"),
        Open = 47.83,
        High = 48.94,
        Low = 44.41,
        Close = 44.41,
        Volume = 11996600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/10"),
        Open = 40.13,
        High = 44.25,
        Low = 40,
        Close = 41.8,
        Volume = 19234400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/13"),
        Open = 43.57,
        High = 47.31,
        Low = 42.5,
        Close = 47.08,
        Volume = 13795700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/14"),
        Open = 48.63,
        High = 49.47,
        Low = 43.61,
        Close = 45.07,
        Volume = 11745000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/15"),
        Open = 44.18,
        High = 45.48,
        Low = 41.54,
        Close = 42.33,
        Volume = 10008800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/16"),
        Open = 42.64,
        High = 45,
        Low = 39.99,
        Close = 44.79,
        Volume = 11711800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/17"),
        Open = 43.95,
        High = 46.82,
        Low = 43.21,
        Close = 44.55,
        Volume = 9914500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/20"),
        Open = 44.74,
        High = 46.77,
        Low = 43.72,
        Close = 46.71,
        Volume = 7787500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/21"),
        Open = 46.32,
        High = 47.69,
        Low = 45.53,
        Close = 46.4,
        Volume = 7341100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/22"),
        Open = 44.16,
        High = 44.9,
        Low = 41.8,
        Close = 42.91,
        Volume = 9955300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/23"),
        Open = 43.2,
        High = 46.81,
        Low = 42.81,
        Close = 46.52,
        Volume = 13879000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/24"),
        Open = 42.5,
        High = 47.24,
        Low = 41.75,
        Close = 45.24,
        Volume = 9674400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/27"),
        Open = 45.7,
        High = 46.13,
        Low = 42.26,
        Close = 42.36,
        Volume = 9163000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/28"),
        Open = 46.45,
        High = 49.05,
        Low = 43.63,
        Close = 48.91,
        Volume = 13883100
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/29"),
        Open = 48.81,
        High = 52.82,
        Low = 48.81,
        Close = 49.8,
        Volume = 12787300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/30"),
        Open = 52.28,
        High = 52.8,
        Low = 48.58,
        Close = 50.7,
        Volume = 9483200
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/10/31"),
        Open = 50.62,
        High = 52.61,
        Low = 49.28,
        Close = 52.42,
        Volume = 8329800
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/03"),
        Open = 51.9,
        High = 53.18,
        Low = 50.82,
        Close = 52.85,
        Volume = 8279600
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/04"),
        Open = 54.41,
        High = 54.65,
        Low = 52.72,
        Close = 53.62,
        Volume = 9210700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/05"),
        Open = 52.5,
        High = 52.59,
        Low = 49,
        Close = 49.55,
        Volume = 9961700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/06"),
        Open = 48.97,
        High = 50.23,
        Low = 45.35,
        Close = 45.72,
        Volume = 12350500
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/07"),
        Open = 46.58,
        High = 47.3,
        Low = 45.35,
        Close = 46.58,
        Volume = 6995300
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/10"),
        Open = 47.3,
        High = 48.31,
        Low = 45.59,
        Close = 46.14,
        Volume = 5393268
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/11"),
        Open = 44.6,
        High = 45.5,
        Low = 42.75,
        Close = 43.97,
        Volume = 7928518
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/12"),
        Open = 43.23,
        High = 44.09,
        Low = 42,
        Close = 42.52,
        Volume = 7739698
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/13"),
        Open = 42.03,
        High = 43.32,
        Low = 39.07,
        Close = 43.16,
        Volume = 13998148
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/14"),
        Open = 42.01,
        High = 43.76,
        Low = 40.8,
        Close = 41.04,
        Volume = 8909613
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/17"),
        Open = 40.61,
        High = 42.8,
        Low = 40.5,
        Close = 41.18,
        Volume = 7050161
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/18"),
        Open = 40.6,
        High = 40.76,
        Low = 38.05,
        Close = 39.56,
        Volume = 12209287
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/19"),
        Open = 39.28,
        High = 40.13,
        Low = 37.45,
        Close = 37.48,
        Volume = 10614563
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/20"),
        Open = 36.98,
        High = 39.74,
        Low = 36.72,
        Close = 37.11,
        Volume = 13406408
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/21"),
        Open = 37.18,
        High = 39.93,
        Low = 36.17,
        Close = 39.58,
        Volume = 13259691
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/24"),
        Open = 40.05,
        High = 41.25,
        Low = 38.89,
        Close = 40.75,
        Volume = 9682999
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/25"),
        Open = 40.55,
        High = 40.8,
        Low = 39.54,
        Close = 40.18,
        Volume = 9618669
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/26"),
        Open = 39.35,
        High = 41.34,
        Low = 39.02,
        Close = 41.28,
        Volume = 6256444
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/27"),
        Open = 41.28,
        High = 41.28,
        Low = 41.28,
        Close = 41.28,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/11/28"),
        Open = 41.17,
        High = 42.8,
        Low = 41.1,
        Close = 42.63,
        Volume = 2609116
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/01"),
        Open = 41.64,
        High = 42,
        Low = 39.74,
        Close = 39.88,
        Volume = 7902844
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/02"),
        Open = 40.54,
        High = 41,
        Low = 39.25,
        Close = 40.7,
        Volume = 6029450
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/03"),
        Open = 40.23,
        High = 41.1,
        Low = 39.15,
        Close = 40.47,
        Volume = 8007510
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/04"),
        Open = 39.84,
        High = 41.33,
        Low = 38.5,
        Close = 39.19,
        Volume = 7247221
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/05"),
        Open = 38,
        High = 39.57,
        Low = 36.28,
        Close = 39.53,
        Volume = 10564791
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/08"),
        Open = 40.35,
        High = 43.69,
        Low = 40.04,
        Close = 42.85,
        Volume = 13096694
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/09"),
        Open = 41.57,
        High = 42.44,
        Low = 40.65,
        Close = 40.82,
        Volume = 8311791
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/10"),
        Open = 41.49,
        High = 42.69,
        Low = 40.94,
        Close = 41.68,
        Volume = 5181450
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/11"),
        Open = 40.65,
        High = 42.01,
        Low = 40.02,
        Close = 40.27,
        Volume = 7693498
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/12"),
        Open = 39.56,
        High = 39.74,
        Low = 38.2,
        Close = 39.2,
        Volume = 10339591
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/15"),
        Open = 39.6,
        High = 39.88,
        Low = 38.2,
        Close = 38.74,
        Volume = 8227911
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/16"),
        Open = 39.21,
        High = 42,
        Low = 38.2,
        Close = 41.9,
        Volume = 11043685
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/17"),
        Open = 41.16,
        High = 41.5,
        Low = 40.15,
        Close = 41,
        Volume = 7296702
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/18"),
        Open = 41.31,
        High = 41.75,
        Low = 40.69,
        Close = 41.07,
        Volume = 8653023
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/19"),
        Open = 41.32,
        High = 42.39,
        Low = 41,
        Close = 41.24,
        Volume = 9903824
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/22"),
        Open = 40.65,
        High = 41.56,
        Low = 40,
        Close = 41.12,
        Volume = 5397178
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/23"),
        Open = 41.25,
        High = 41.5,
        Low = 39.83,
        Close = 40.15,
        Volume = 5278971
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/24"),
        Open = 40.24,
        High = 40.79,
        Low = 40.04,
        Close = 40.12,
        Volume = 1758134
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/25"),
        Open = 40.12,
        High = 40.12,
        Low = 40.12,
        Close = 40.12,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/26"),
        Open = 39.76,
        High = 40.69,
        Low = 39.76,
        Close = 40.53,
        Volume = 2803350
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/29"),
        Open = 40.38,
        High = 40.55,
        Low = 39.5,
        Close = 39.99,
        Volume = 3876953
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/30"),
        Open = 40.08,
        High = 41.34,
        Low = 39.81,
        Close = 41.25,
        Volume = 4550017
    },
    new StockDataPoint {
        Date = DateTime.Parse("2008/12/31"),
        Open = 41.59,
        High = 43.05,
        Low = 41.5,
        Close = 42.67,
        Volume = 5443052
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/01"),
        Open = 42.67,
        High = 42.67,
        Low = 42.67,
        Close = 42.67,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/02"),
        Open = 42.8,
        High = 45.56,
        Low = 42.78,
        Close = 45.25,
        Volume = 7015401
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/05"),
        Open = 45.5,
        High = 46.81,
        Low = 44.8,
        Close = 46.17,
        Volume = 6917353
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/06"),
        Open = 46.85,
        High = 47,
        Low = 45.5,
        Close = 46.31,
        Volume = 7180978
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/07"),
        Open = 45.1,
        High = 45.61,
        Low = 44.17,
        Close = 44.76,
        Volume = 6586569
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/08"),
        Open = 44.5,
        High = 44.9,
        Low = 43.88,
        Close = 44.79,
        Volume = 5476976
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/09"),
        Open = 44.8,
        High = 45.15,
        Low = 43.93,
        Close = 44.45,
        Volume = 5645042
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/12"),
        Open = 44.28,
        High = 44.45,
        Low = 43.19,
        Close = 43.74,
        Volume = 4989247
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/13"),
        Open = 43.38,
        High = 43.62,
        Low = 41.8,
        Close = 42.46,
        Volume = 6359304
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/14"),
        Open = 41.88,
        High = 41.98,
        Low = 40.87,
        Close = 41.2,
        Volume = 7354895
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/15"),
        Open = 41.07,
        High = 41.6,
        Low = 39.51,
        Close = 40.96,
        Volume = 8470900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/16"),
        Open = 41.45,
        High = 43.05,
        Low = 41.04,
        Close = 42.46,
        Volume = 9310704
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/20"),
        Open = 42.08,
        High = 42.74,
        Low = 40.2,
        Close = 40.36,
        Volume = 9637118
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/21"),
        Open = 40.75,
        High = 42.4,
        Low = 40,
        Close = 42.27,
        Volume = 6933013
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/22"),
        Open = 41.73,
        High = 42.75,
        Low = 41.17,
        Close = 42.26,
        Volume = 6590741
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/23"),
        Open = 40.91,
        High = 42.84,
        Low = 40.91,
        Close = 41.98,
        Volume = 5755506
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/26"),
        Open = 42.46,
        High = 43.77,
        Low = 42.06,
        Close = 43.01,
        Volume = 4659614
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/27"),
        Open = 43.29,
        High = 43.96,
        Low = 42.88,
        Close = 43.22,
        Volume = 5219049
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/28"),
        Open = 43.47,
        High = 44.4,
        Low = 42.76,
        Close = 43.24,
        Volume = 8071591
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/29"),
        Open = 42.76,
        High = 42.76,
        Low = 40.37,
        Close = 40.71,
        Volume = 8446964
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/01/30"),
        Open = 40.76,
        High = 42.49,
        Low = 40.63,
        Close = 42.31,
        Volume = 9098244
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/02"),
        Open = 41.73,
        High = 41.73,
        Low = 40.11,
        Close = 40.8,
        Volume = 8108969
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/03"),
        Open = 41.45,
        High = 42.43,
        Low = 40.76,
        Close = 42.09,
        Volume = 7221234
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/04"),
        Open = 42.12,
        High = 42.97,
        Low = 41.69,
        Close = 41.97,
        Volume = 6729377
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/05"),
        Open = 41.75,
        High = 43.11,
        Low = 40.62,
        Close = 42.72,
        Volume = 9021007
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/06"),
        Open = 42.52,
        High = 43.67,
        Low = 42.25,
        Close = 42.92,
        Volume = 6334157
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/09"),
        Open = 42.8,
        High = 43.42,
        Low = 42.44,
        Close = 42.8,
        Volume = 5091901
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/10"),
        Open = 41.29,
        High = 42.23,
        Low = 40.02,
        Close = 40.21,
        Volume = 9999165
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/11"),
        Open = 40.51,
        High = 40.76,
        Low = 39.86,
        Close = 40.33,
        Volume = 6519292
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/12"),
        Open = 39.58,
        High = 39.99,
        Low = 38.58,
        Close = 39.86,
        Volume = 6028812
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/13"),
        Open = 39.89,
        High = 41.19,
        Low = 39.89,
        Close = 40.48,
        Volume = 5483456
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/17"),
        Open = 39.49,
        High = 39.74,
        Low = 38.3,
        Close = 38.43,
        Volume = 6949373
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/18"),
        Open = 38.77,
        High = 38.77,
        Low = 37.76,
        Close = 37.98,
        Volume = 6324425
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/19"),
        Open = 38.24,
        High = 38.7,
        Low = 37.42,
        Close = 37.57,
        Volume = 5467493
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/20"),
        Open = 36.73,
        High = 37.2,
        Low = 35.32,
        Close = 36.31,
        Volume = 10598817
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/23"),
        Open = 36.73,
        High = 36.79,
        Low = 34.35,
        Close = 34.46,
        Volume = 9519748
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/24"),
        Open = 34.44,
        High = 35.83,
        Low = 33.89,
        Close = 35.44,
        Volume = 10815805
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/25"),
        Open = 35.27,
        High = 35.27,
        Low = 33.22,
        Close = 33.91,
        Volume = 11684407
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/26"),
        Open = 34.5,
        High = 34.62,
        Low = 32.64,
        Close = 32.71,
        Volume = 8772639
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/02/27"),
        Open = 32.3,
        High = 32.37,
        Low = 31.4,
        Close = 31.44,
        Volume = 11791144
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/02"),
        Open = 30.96,
        High = 31,
        Low = 29.32,
        Close = 29.51,
        Volume = 13957450
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/03"),
        Open = 29.7,
        High = 30.11,
        Low = 29.05,
        Close = 29.36,
        Volume = 10434638
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/04"),
        Open = 29.86,
        High = 30.78,
        Low = 29.11,
        Close = 30.31,
        Volume = 11627491
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/05"),
        Open = 29.22,
        High = 30.02,
        Low = 29.07,
        Close = 29.39,
        Volume = 11677478
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/06"),
        Open = 29.61,
        High = 30.2,
        Low = 29.39,
        Close = 30.1,
        Volume = 13134932
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/09"),
        Open = 29.98,
        High = 31.46,
        Low = 29.96,
        Close = 31,
        Volume = 12407248
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/10"),
        Open = 31.42,
        High = 33.02,
        Low = 31.32,
        Close = 33.01,
        Volume = 11503739
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/11"),
        Open = 32.59,
        High = 33.7,
        Low = 32.39,
        Close = 33.27,
        Volume = 10823124
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/12"),
        Open = 33.01,
        High = 33.75,
        Low = 32.39,
        Close = 33.63,
        Volume = 6133118
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/13"),
        Open = 33.72,
        High = 34.1,
        Low = 32.93,
        Close = 33.4,
        Volume = 7433920
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/16"),
        Open = 33.74,
        High = 34.96,
        Low = 33.38,
        Close = 33.83,
        Volume = 7157179
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/17"),
        Open = 33.92,
        High = 34.44,
        Low = 33.26,
        Close = 34.44,
        Volume = 5270819
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/18"),
        Open = 34.29,
        High = 34.75,
        Low = 32.5,
        Close = 33.75,
        Volume = 15880435
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/19"),
        Open = 33.86,
        High = 34.12,
        Low = 32.97,
        Close = 33.19,
        Volume = 10427238
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/20"),
        Open = 33.22,
        High = 33.5,
        Low = 32.54,
        Close = 32.55,
        Volume = 11323372
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/23"),
        Open = 33.2,
        High = 35.5,
        Low = 33.05,
        Close = 35.5,
        Volume = 8224801
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/24"),
        Open = 34.88,
        High = 36.72,
        Low = 34.82,
        Close = 36.1,
        Volume = 8468464
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/25"),
        Open = 36.03,
        High = 37.79,
        Low = 35.97,
        Close = 37.06,
        Volume = 12446132
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/26"),
        Open = 37.32,
        High = 38.68,
        Low = 36.91,
        Close = 38.66,
        Volume = 9545245
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/27"),
        Open = 38.23,
        High = 38.47,
        Low = 37.07,
        Close = 37.53,
        Volume = 7329928
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/30"),
        Open = 36.63,
        High = 36.98,
        Low = 35.11,
        Close = 35.52,
        Volume = 10833746
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/03/31"),
        Open = 35.9,
        High = 36.24,
        Low = 35.05,
        Close = 35.58,
        Volume = 11554622
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/01"),
        Open = 34.52,
        High = 35.6,
        Low = 34.21,
        Close = 35.44,
        Volume = 9288960
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/02"),
        Open = 36.16,
        High = 37.98,
        Low = 36.16,
        Close = 37.2,
        Volume = 9449239
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/03"),
        Open = 37.23,
        High = 38.12,
        Low = 36.39,
        Close = 37.69,
        Volume = 8589054
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/06"),
        Open = 37.48,
        High = 38.22,
        Low = 36.54,
        Close = 38.16,
        Volume = 7390249
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/07"),
        Open = 37.51,
        High = 37.69,
        Low = 36.51,
        Close = 36.64,
        Volume = 6017902
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/08"),
        Open = 36.5,
        High = 37.16,
        Low = 36.24,
        Close = 36.87,
        Volume = 4477215
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/09"),
        Open = 37.68,
        High = 39.18,
        Low = 37.68,
        Close = 39.15,
        Volume = 9069452
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/10"),
        Open = 39.15,
        High = 39.15,
        Low = 39.15,
        Close = 39.15,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/13"),
        Open = 36.97,
        High = 37.48,
        Low = 35.81,
        Close = 37.15,
        Volume = 9531345
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/14"),
        Open = 36.51,
        High = 37.5,
        Low = 36.3,
        Close = 37.04,
        Volume = 5845448
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/15"),
        Open = 36.63,
        High = 38.04,
        Low = 36.61,
        Close = 37.57,
        Volume = 5452170
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/16"),
        Open = 37.62,
        High = 38.75,
        Low = 37,
        Close = 38.39,
        Volume = 6424207
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/17"),
        Open = 38.55,
        High = 38.78,
        Low = 38.18,
        Close = 38.32,
        Volume = 6152358
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/20"),
        Open = 37.65,
        High = 37.86,
        Low = 36.36,
        Close = 36.48,
        Volume = 7016920
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/21"),
        Open = 36.66,
        High = 36.66,
        Low = 35.94,
        Close = 36.65,
        Volume = 7354022
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/22"),
        Open = 37.85,
        High = 38.32,
        Low = 36.54,
        Close = 37.3,
        Volume = 11625938
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/23"),
        Open = 37.29,
        High = 38.12,
        Low = 36.6,
        Close = 37.93,
        Volume = 6400647
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/24"),
        Open = 38.1,
        High = 39.01,
        Low = 37.75,
        Close = 38.72,
        Volume = 8351452
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/27"),
        Open = 37.99,
        High = 39.85,
        Low = 37.72,
        Close = 39.47,
        Volume = 8546412
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/28"),
        Open = 39.11,
        High = 39.42,
        Low = 38.32,
        Close = 38.85,
        Volume = 6628144
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/29"),
        Open = 39.09,
        High = 40.73,
        Low = 39.02,
        Close = 40.55,
        Volume = 7776238
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/04/30"),
        Open = 41.07,
        High = 41.74,
        Low = 39.9,
        Close = 40.05,
        Volume = 7034295
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/01"),
        Open = 40.31,
        High = 41.37,
        Low = 40.09,
        Close = 41.21,
        Volume = 5508746
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/04"),
        Open = 41.9,
        High = 42.18,
        Low = 41.51,
        Close = 42.18,
        Volume = 5269978
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/05"),
        Open = 41.92,
        High = 43.25,
        Low = 41.92,
        Close = 43.15,
        Volume = 7684469
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/06"),
        Open = 43.3,
        High = 44.21,
        Low = 43.08,
        Close = 44.2,
        Volume = 7930736
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/07"),
        Open = 44.47,
        High = 44.62,
        Low = 42.75,
        Close = 43.53,
        Volume = 7106644
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/08"),
        Open = 43.96,
        High = 45.84,
        Low = 43.77,
        Close = 45.83,
        Volume = 7492282
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/11"),
        Open = 45.26,
        High = 45.6,
        Low = 44.53,
        Close = 44.72,
        Volume = 9595953
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/12"),
        Open = 44.54,
        High = 45.07,
        Low = 43.29,
        Close = 44.1,
        Volume = 7068690
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/13"),
        Open = 43.18,
        High = 43.42,
        Low = 42.38,
        Close = 42.95,
        Volume = 6324439
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/14"),
        Open = 42.94,
        High = 43.81,
        Low = 42.72,
        Close = 43.44,
        Volume = 5251582
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/15"),
        Open = 43.27,
        High = 43.99,
        Low = 42.71,
        Close = 43,
        Volume = 5189274
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/18"),
        Open = 44.25,
        High = 44.53,
        Low = 43.81,
        Close = 44.37,
        Volume = 7287980
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/19"),
        Open = 44.36,
        High = 45.06,
        Low = 43.9,
        Close = 44.62,
        Volume = 4792104
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/20"),
        Open = 45.05,
        High = 45.74,
        Low = 44.54,
        Close = 44.58,
        Volume = 4734105
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/21"),
        Open = 43.99,
        High = 44,
        Low = 42.7,
        Close = 43.29,
        Volume = 5784926
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/22"),
        Open = 43.47,
        High = 43.61,
        Low = 42.86,
        Close = 42.94,
        Volume = 2951530
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/25"),
        Open = 42.94,
        High = 42.94,
        Low = 42.94,
        Close = 42.94,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/26"),
        Open = 42.61,
        High = 44.33,
        Low = 42.52,
        Close = 44.16,
        Volume = 4718494
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/27"),
        Open = 43.89,
        High = 44.33,
        Low = 43.45,
        Close = 43.57,
        Volume = 4622463
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/28"),
        Open = 43.99,
        High = 44.45,
        Low = 43.19,
        Close = 44.32,
        Volume = 4559692
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/05/29"),
        Open = 44.61,
        High = 45.08,
        Low = 43.95,
        Close = 44.85,
        Volume = 5417382
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/01"),
        Open = 45.54,
        High = 47.81,
        Low = 45.54,
        Close = 47.7,
        Volume = 6920442
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/02"),
        Open = 47.7,
        High = 49.43,
        Low = 47.31,
        Close = 49.2,
        Volume = 7453324
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/03"),
        Open = 48.71,
        High = 49.2,
        Low = 47.79,
        Close = 48.37,
        Volume = 4700000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/04"),
        Open = 48.63,
        High = 50.91,
        Low = 48.57,
        Close = 50.57,
        Volume = 7324587
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/05"),
        Open = 52.16,
        High = 53.26,
        Low = 52.16,
        Close = 52.65,
        Volume = 13724165
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/08"),
        Open = 52.49,
        High = 53.33,
        Low = 51.13,
        Close = 52.83,
        Volume = 7961110
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/09"),
        Open = 53.39,
        High = 53.39,
        Low = 51.31,
        Close = 52.35,
        Volume = 7729036
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/10"),
        Open = 52.82,
        High = 53.2,
        Low = 51.1,
        Close = 52.3,
        Volume = 6556551
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/11"),
        Open = 51.83,
        High = 52.57,
        Low = 50.48,
        Close = 50.66,
        Volume = 11854971
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/12"),
        Open = 50.76,
        High = 51.56,
        Low = 50.11,
        Close = 51.44,
        Volume = 5476628
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/15"),
        Open = 50.9,
        High = 51.09,
        Low = 49.02,
        Close = 49.52,
        Volume = 6363736
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/16"),
        Open = 49.57,
        High = 50.15,
        Low = 48.7,
        Close = 48.83,
        Volume = 5725789
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/17"),
        Open = 48.55,
        High = 49.16,
        Low = 48.05,
        Close = 48.55,
        Volume = 4870801
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/18"),
        Open = 48.43,
        High = 49.28,
        Low = 48.15,
        Close = 48.96,
        Volume = 3099818
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/19"),
        Open = 49.18,
        High = 49.53,
        Low = 48.11,
        Close = 48.44,
        Volume = 7033003
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/22"),
        Open = 47.83,
        High = 48.03,
        Low = 46.53,
        Close = 46.9,
        Volume = 5200331
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/23"),
        Open = 44.39,
        High = 44.5,
        Low = 42.52,
        Close = 43.87,
        Volume = 27281935
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/24"),
        Open = 43.14,
        High = 43.55,
        Low = 41.09,
        Close = 41.32,
        Volume = 21288390
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/25"),
        Open = 41.4,
        High = 42.6,
        Low = 41.11,
        Close = 42.53,
        Volume = 14004279
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/26"),
        Open = 42.11,
        High = 42.78,
        Low = 41.5,
        Close = 41.88,
        Volume = 15579315
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/29"),
        Open = 42.15,
        High = 43.02,
        Low = 42.08,
        Close = 42.65,
        Volume = 5515509
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/06/30"),
        Open = 43.63,
        High = 43.79,
        Low = 42.1,
        Close = 42.5,
        Volume = 8323070
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/01"),
        Open = 42.63,
        High = 42.95,
        Low = 42.15,
        Close = 42.23,
        Volume = 6349337
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/02"),
        Open = 41.81,
        High = 41.81,
        Low = 40.62,
        Close = 40.83,
        Volume = 7202073
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/03"),
        Open = 40.83,
        High = 40.83,
        Low = 40.83,
        Close = 40.83,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/06"),
        Open = 40.38,
        High = 40.76,
        Low = 39.92,
        Close = 40.56,
        Volume = 7132705
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/07"),
        Open = 40.5,
        High = 40.69,
        Low = 38.94,
        Close = 39.04,
        Volume = 7704977
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/08"),
        Open = 39.12,
        High = 39.83,
        Low = 38.92,
        Close = 39.55,
        Volume = 8800410
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/09"),
        Open = 39.75,
        High = 40,
        Low = 39.02,
        Close = 39.3,
        Volume = 5432882
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/10"),
        Open = 39.2,
        High = 39.71,
        Low = 38.92,
        Close = 39.65,
        Volume = 5833519
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/13"),
        Open = 39.68,
        High = 40.83,
        Low = 39.26,
        Close = 40.44,
        Volume = 6548930
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/14"),
        Open = 40.39,
        High = 40.9,
        Low = 40.11,
        Close = 40.41,
        Volume = 5748486
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/15"),
        Open = 40.77,
        High = 41.46,
        Low = 40.51,
        Close = 41.36,
        Volume = 7867386
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/16"),
        Open = 41.01,
        High = 42.22,
        Low = 41.01,
        Close = 42.05,
        Volume = 5357378
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/17"),
        Open = 42.25,
        High = 42.4,
        Low = 41.1,
        Close = 41.36,
        Volume = 5691633
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/20"),
        Open = 41.71,
        High = 42.26,
        Low = 41.16,
        Close = 42.2,
        Volume = 5535128
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/21"),
        Open = 42.82,
        High = 43.71,
        Low = 42.5,
        Close = 43.02,
        Volume = 9170568
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/22"),
        Open = 42.4,
        High = 43.46,
        Low = 41.95,
        Close = 42,
        Volume = 12054670
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/23"),
        Open = 42,
        High = 42.19,
        Low = 40.78,
        Close = 41.95,
        Volume = 13620201
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/24"),
        Open = 41.95,
        High = 42.49,
        Low = 41.72,
        Close = 42.37,
        Volume = 5068137
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/27"),
        Open = 42,
        High = 42.37,
        Low = 41.43,
        Close = 42.24,
        Volume = 5674196
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/28"),
        Open = 41.99,
        High = 43.35,
        Low = 41.8,
        Close = 43.25,
        Volume = 7831218
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/29"),
        Open = 43,
        High = 43.5,
        Low = 42.64,
        Close = 43.37,
        Volume = 5078235
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/30"),
        Open = 43.94,
        High = 44.5,
        Low = 43.13,
        Close = 43.24,
        Volume = 8281103
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/07/31"),
        Open = 43.32,
        High = 43.49,
        Low = 42.8,
        Close = 42.91,
        Volume = 6029316
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/03"),
        Open = 43.18,
        High = 44.02,
        Low = 42.51,
        Close = 43.79,
        Volume = 6070774
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/04"),
        Open = 43.64,
        High = 44.44,
        Low = 43.35,
        Close = 44.16,
        Volume = 5964801
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/05"),
        Open = 43.63,
        High = 44.21,
        Low = 43.4,
        Close = 44.03,
        Volume = 7129795
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/06"),
        Open = 44.29,
        High = 45.73,
        Low = 44.03,
        Close = 45.52,
        Volume = 10206967
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/07"),
        Open = 45.89,
        High = 47.21,
        Low = 45.38,
        Close = 46.69,
        Volume = 6689010
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/10"),
        Open = 46.41,
        High = 46.41,
        Low = 45.19,
        Close = 45.77,
        Volume = 5620504
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/12"),
        Open = 45.33,
        High = 46.78,
        Low = 45.31,
        Close = 46.34,
        Volume = 4682233
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/13"),
        Open = 46.45,
        High = 46.87,
        Low = 45.75,
        Close = 46.62,
        Volume = 3485707
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/14"),
        Open = 45.82,
        High = 46.24,
        Low = 44.21,
        Close = 44.87,
        Volume = 10507286
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/17"),
        Open = 44.16,
        High = 44.28,
        Low = 43.7,
        Close = 44.16,
        Volume = 5211546
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/18"),
        Open = 44,
        High = 44.53,
        Low = 43.69,
        Close = 43.78,
        Volume = 5444211
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/19"),
        Open = 43.5,
        High = 43.91,
        Low = 43.1,
        Close = 43.52,
        Volume = 6578869
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/20"),
        Open = 43.54,
        High = 44.83,
        Low = 43.49,
        Close = 44.74,
        Volume = 5192085
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/21"),
        Open = 45.18,
        High = 46.02,
        Low = 44.92,
        Close = 45.87,
        Volume = 5529898
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/24"),
        Open = 46.51,
        High = 47.79,
        Low = 45.97,
        Close = 47.13,
        Volume = 6157981
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/25"),
        Open = 47.5,
        High = 48.77,
        Low = 47.28,
        Close = 48.25,
        Volume = 8248067
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/26"),
        Open = 48.07,
        High = 48.38,
        Low = 47.44,
        Close = 47.82,
        Volume = 3955909
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/27"),
        Open = 51.37,
        High = 52.38,
        Low = 51,
        Close = 51.82,
        Volume = 17791897
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/28"),
        Open = 51.68,
        High = 52.53,
        Low = 50.7,
        Close = 51.04,
        Volume = 11456903
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/08/31"),
        Open = 50.17,
        High = 50.25,
        Low = 49.02,
        Close = 49.67,
        Volume = 9298034
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/01"),
        Open = 49.21,
        High = 50.38,
        Low = 48.47,
        Close = 48.77,
        Volume = 8242544
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/02"),
        Open = 48.59,
        High = 48.98,
        Low = 48.16,
        Close = 48.4,
        Volume = 3835813
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/03"),
        Open = 48.67,
        High = 48.83,
        Low = 47.76,
        Close = 48.46,
        Volume = 5466474
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/04"),
        Open = 48.74,
        High = 49.26,
        Low = 48.05,
        Close = 49.15,
        Volume = 5711551
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/08"),
        Open = 49.73,
        High = 49.88,
        Low = 48.81,
        Close = 49.5,
        Volume = 4583854
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/09"),
        Open = 49.7,
        High = 51.15,
        Low = 49.7,
        Close = 50.53,
        Volume = 5895878
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/10"),
        Open = 50.42,
        High = 50.72,
        Low = 49.79,
        Close = 50.49,
        Volume = 3847196
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/11"),
        Open = 50.64,
        High = 51.44,
        Low = 50.48,
        Close = 51.35,
        Volume = 5880487
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/14"),
        Open = 50.99,
        High = 51.26,
        Low = 50.44,
        Close = 50.97,
        Volume = 4392690
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/15"),
        Open = 51.26,
        High = 52.34,
        Low = 50.88,
        Close = 52.07,
        Volume = 6584383
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/16"),
        Open = 52.44,
        High = 52.76,
        Low = 51.79,
        Close = 52.36,
        Volume = 5108533
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/17"),
        Open = 52.25,
        High = 53.16,
        Low = 52.2,
        Close = 52.88,
        Volume = 4676793
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/18"),
        Open = 53.02,
        High = 53.29,
        Low = 52.1,
        Close = 53.02,
        Volume = 6532987
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/21"),
        Open = 52.6,
        High = 53.36,
        Low = 52.42,
        Close = 52.86,
        Volume = 3076162
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/22"),
        Open = 52.96,
        High = 53.31,
        Low = 52.13,
        Close = 53.14,
        Volume = 3898295
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/23"),
        Open = 53.35,
        High = 53.4,
        Low = 52.26,
        Close = 52.37,
        Volume = 4606266
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/24"),
        Open = 52.23,
        High = 52.52,
        Low = 51.52,
        Close = 51.79,
        Volume = 5351955
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/25"),
        Open = 51.86,
        High = 52.4,
        Low = 51.3,
        Close = 51.52,
        Volume = 3638503
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/28"),
        Open = 51.82,
        High = 53.34,
        Low = 51.76,
        Close = 53.07,
        Volume = 4925406
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/29"),
        Open = 53.28,
        High = 55.48,
        Low = 53.28,
        Close = 54.62,
        Volume = 7267767
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/09/30"),
        Open = 54.86,
        High = 55.25,
        Low = 53.46,
        Close = 54.15,
        Volume = 5939577
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/01"),
        Open = 53.85,
        High = 53.9,
        Low = 52.03,
        Close = 52.11,
        Volume = 6605905
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/02"),
        Open = 51.19,
        High = 51.76,
        Low = 50.1,
        Close = 51.4,
        Volume = 6042924
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/05"),
        Open = 51.75,
        High = 52.52,
        Low = 51.38,
        Close = 52.28,
        Volume = 3083033
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/06"),
        Open = 51.54,
        High = 52.57,
        Low = 51.15,
        Close = 52.29,
        Volume = 6244477
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/07"),
        Open = 52.18,
        High = 52.25,
        Low = 51.25,
        Close = 51.79,
        Volume = 3659513
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/08"),
        Open = 52.3,
        High = 52.6,
        Low = 51.86,
        Close = 52.3,
        Volume = 3190520
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/09"),
        Open = 52.49,
        High = 52.75,
        Low = 51.96,
        Close = 52.69,
        Volume = 2591224
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/12"),
        Open = 52.66,
        High = 52.73,
        Low = 51.38,
        Close = 51.66,
        Volume = 3974463
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/13"),
        Open = 51.64,
        High = 51.98,
        Low = 51.36,
        Close = 51.9,
        Volume = 3024957
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/14"),
        Open = 52.31,
        High = 52.55,
        Low = 51.57,
        Close = 52.51,
        Volume = 4646221
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/15"),
        Open = 52.03,
        High = 52.53,
        Low = 50.94,
        Close = 51.76,
        Volume = 5686783
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/16"),
        Open = 51.19,
        High = 53.72,
        Low = 50.85,
        Close = 53.19,
        Volume = 7432893
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/19"),
        Open = 53.32,
        High = 53.75,
        Low = 52.59,
        Close = 53.45,
        Volume = 3841793
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/20"),
        Open = 51.71,
        High = 52.3,
        Low = 51.07,
        Close = 51.89,
        Volume = 8191000
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/21"),
        Open = 51.07,
        High = 52,
        Low = 50.5,
        Close = 50.63,
        Volume = 8115466
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/22"),
        Open = 50.33,
        High = 51.23,
        Low = 49.75,
        Close = 51.07,
        Volume = 6375233
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/23"),
        Open = 51.06,
        High = 51.06,
        Low = 49.5,
        Close = 49.89,
        Volume = 5856650
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/26"),
        Open = 49.85,
        High = 49.98,
        Low = 48,
        Close = 48.29,
        Volume = 7428684
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/27"),
        Open = 48.3,
        High = 48.53,
        Low = 47.55,
        Close = 47.75,
        Volume = 7044833
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/28"),
        Open = 47.72,
        High = 47.8,
        Low = 47.18,
        Close = 47.22,
        Volume = 6909973
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/29"),
        Open = 48.31,
        High = 49.13,
        Low = 47.81,
        Close = 48.81,
        Volume = 8299363
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/10/30"),
        Open = 48.7,
        High = 48.81,
        Low = 47.66,
        Close = 47.8,
        Volume = 8702778
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/02"),
        Open = 47.82,
        High = 48.41,
        Low = 47.33,
        Close = 48.27,
        Volume = 5932576
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/03"),
        Open = 48.17,
        High = 48.35,
        Low = 47.46,
        Close = 48.1,
        Volume = 4900945
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/04"),
        Open = 48.28,
        High = 48.9,
        Low = 47.8,
        Close = 48.07,
        Volume = 5081941
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/05"),
        Open = 48.49,
        High = 49.86,
        Low = 48.32,
        Close = 49.77,
        Volume = 4915994
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/06"),
        Open = 49.71,
        High = 49.98,
        Low = 49.31,
        Close = 49.68,
        Volume = 3212559
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/09"),
        Open = 50.01,
        High = 51.48,
        Low = 49.89,
        Close = 51.35,
        Volume = 4444626
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/10"),
        Open = 51.07,
        High = 51.07,
        Low = 50.13,
        Close = 50.32,
        Volume = 4736870
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/11"),
        Open = 50.78,
        High = 51.42,
        Low = 50.54,
        Close = 50.68,
        Volume = 3546240
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/12"),
        Open = 50.62,
        High = 50.92,
        Low = 50.09,
        Close = 50.28,
        Volume = 3324346
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/13"),
        Open = 49.98,
        High = 50.94,
        Low = 49.72,
        Close = 50.68,
        Volume = 3546788
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/16"),
        Open = 51,
        High = 52.52,
        Low = 50.88,
        Close = 52.48,
        Volume = 5704942
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/17"),
        Open = 52.42,
        High = 52.69,
        Low = 51.7,
        Close = 52.53,
        Volume = 3945816
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/18"),
        Open = 52.59,
        High = 52.64,
        Low = 51.45,
        Close = 52.02,
        Volume = 4377563
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/19"),
        Open = 51.54,
        High = 51.8,
        Low = 50.75,
        Close = 51.43,
        Volume = 3183390
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/20"),
        Open = 51.12,
        High = 51.89,
        Low = 51.07,
        Close = 51.7,
        Volume = 4697176
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/23"),
        Open = 52.5,
        High = 53,
        Low = 52.32,
        Close = 52.63,
        Volume = 3255277
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/24"),
        Open = 52.08,
        High = 52.63,
        Low = 50.95,
        Close = 51.97,
        Volume = 3288144
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/25"),
        Open = 51.97,
        High = 52.95,
        Low = 51.83,
        Close = 52.93,
        Volume = 3021455
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/26"),
        Open = 52.93,
        High = 52.93,
        Low = 52.93,
        Close = 52.93,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/27"),
        Open = 51.35,
        High = 52.81,
        Low = 51,
        Close = 52.45,
        Volume = 3281352
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/11/30"),
        Open = 52.43,
        High = 52.69,
        Low = 51.78,
        Close = 52.41,
        Volume = 5434683
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/01"),
        Open = 52.75,
        High = 54.22,
        Low = 52.75,
        Close = 53.72,
        Volume = 6360088
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/02"),
        Open = 54.04,
        High = 54.57,
        Low = 53.26,
        Close = 53.78,
        Volume = 5980717
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/03"),
        Open = 53.99,
        High = 54.41,
        Low = 53.51,
        Close = 53.77,
        Volume = 3997708
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/04"),
        Open = 54.75,
        High = 55.45,
        Low = 53.62,
        Close = 54.68,
        Volume = 5451771
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/07"),
        Open = 55.2,
        High = 55.95,
        Low = 54.9,
        Close = 55.82,
        Volume = 4950745
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/08"),
        Open = 55.99,
        High = 56.22,
        Low = 55.06,
        Close = 55.66,
        Volume = 4658965
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/09"),
        Open = 55.75,
        High = 55.8,
        Low = 55.11,
        Close = 55.47,
        Volume = 3900359
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/10"),
        Open = 55.65,
        High = 56.39,
        Low = 54.72,
        Close = 55.01,
        Volume = 5755566
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/11"),
        Open = 55.47,
        High = 55.8,
        Low = 55.12,
        Close = 55.6,
        Volume = 7398009
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/14"),
        Open = 56.02,
        High = 56.56,
        Low = 55.82,
        Close = 56.05,
        Volume = 4830871
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/15"),
        Open = 56.37,
        High = 56.37,
        Low = 55.33,
        Close = 55.67,
        Volume = 7365555
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/16"),
        Open = 56.11,
        High = 56.14,
        Low = 54.45,
        Close = 55.13,
        Volume = 7804646
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/17"),
        Open = 54.9,
        High = 55.4,
        Low = 54.41,
        Close = 54.47,
        Volume = 5825441
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/18"),
        Open = 54.7,
        High = 54.74,
        Low = 53.1,
        Close = 53.44,
        Volume = 8922372
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/21"),
        Open = 53.36,
        High = 54.5,
        Low = 53.36,
        Close = 54.3,
        Volume = 3655720
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/22"),
        Open = 54.38,
        High = 55.37,
        Low = 54.31,
        Close = 55.1,
        Volume = 3669971
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/23"),
        Open = 55.41,
        High = 55.65,
        Low = 54.92,
        Close = 54.96,
        Volume = 3062835
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/24"),
        Open = 55.26,
        High = 55.56,
        Low = 55.11,
        Close = 55.48,
        Volume = 1003991
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/25"),
        Open = 55.48,
        High = 55.48,
        Low = 55.48,
        Close = 55.48,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/28"),
        Open = 55.33,
        High = 55.55,
        Low = 54.89,
        Close = 55.14,
        Volume = 2072154
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/29"),
        Open = 55.34,
        High = 55.46,
        Low = 55.14,
        Close = 55.21,
        Volume = 2163935
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/30"),
        Open = 54.86,
        High = 55.29,
        Low = 54.75,
        Close = 54.96,
        Volume = 2460937
    },
    new StockDataPoint {
        Date = DateTime.Parse("2009/12/31"),
        Open = 54.13,
        High = 54.13,
        Low = 54.13,
        Close = 54.13,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/01"),
        Open = 54.13,
        High = 54.13,
        Low = 54.13,
        Close = 54.13,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/04"),
        Open = 55.72,
        High = 56.39,
        Low = 54.8,
        Close = 56.18,
        Volume = 6187088
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/05"),
        Open = 56.25,
        High = 58.28,
        Low = 56,
        Close = 58.02,
        Volume = 8872728
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/06"),
        Open = 58.23,
        High = 59.99,
        Low = 57.88,
        Close = 59.78,
        Volume = 8838016
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/07"),
        Open = 59.51,
        High = 62.31,
        Low = 59.02,
        Close = 62.2,
        Volume = 14380744
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/08"),
        Open = 61.54,
        High = 61.78,
        Low = 60.86,
        Close = 61.6,
        Volume = 7147427
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/11"),
        Open = 61.95,
        High = 62.09,
        Low = 60.51,
        Close = 60.87,
        Volume = 5627699
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/12"),
        Open = 60.07,
        High = 61.2,
        Low = 59.91,
        Close = 60.43,
        Volume = 5273875
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/13"),
        Open = 60.61,
        High = 61.7,
        Low = 60.35,
        Close = 61.16,
        Volume = 4950400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/14"),
        Open = 61.03,
        High = 61.62,
        Low = 60.78,
        Close = 61.56,
        Volume = 3000398
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/15"),
        Open = 60.82,
        High = 60.82,
        Low = 60.82,
        Close = 60.82,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/18"),
        Open = 60.82,
        High = 60.82,
        Low = 60.82,
        Close = 60.82,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/19"),
        Open = 60.6,
        High = 61.01,
        Low = 59.96,
        Close = 60.65,
        Volume = 5428029
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/20"),
        Open = 60.33,
        High = 60.57,
        Low = 58.53,
        Close = 60.2,
        Volume = 5374069
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/21"),
        Open = 60.3,
        High = 61.26,
        Low = 58.9,
        Close = 59.2,
        Volume = 5401938
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/22"),
        Open = 58.62,
        High = 59.17,
        Low = 57.7,
        Close = 57.77,
        Volume = 4745396
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/25"),
        Open = 58.35,
        High = 58.75,
        Low = 57.5,
        Close = 57.78,
        Volume = 3489914
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/26"),
        Open = 57.54,
        High = 58.5,
        Low = 57.23,
        Close = 57.71,
        Volume = 4552136
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/27"),
        Open = 58.84,
        High = 62.08,
        Low = 58.83,
        Close = 61.93,
        Volume = 14760056
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/28"),
        Open = 62.15,
        High = 62.95,
        Low = 61.31,
        Close = 62.56,
        Volume = 8865642
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/01/29"),
        Open = 62.8,
        High = 63.4,
        Low = 60.32,
        Close = 60.6,
        Volume = 8726177
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/01"),
        Open = 60.74,
        High = 61.86,
        Low = 60.72,
        Close = 61.7,
        Volume = 5929599
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/02"),
        Open = 61.29,
        High = 62,
        Low = 61,
        Close = 61.94,
        Volume = 7862734
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/03"),
        Open = 61.52,
        High = 61.8,
        Low = 60.85,
        Close = 61.46,
        Volume = 5480578
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/04"),
        Open = 60.95,
        High = 61.17,
        Low = 59.25,
        Close = 59.32,
        Volume = 7491344
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/05"),
        Open = 59.21,
        High = 59.74,
        Low = 57.14,
        Close = 58.4,
        Volume = 9676128
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/08"),
        Open = 58.33,
        High = 58.97,
        Low = 57.78,
        Close = 57.89,
        Volume = 4724664
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/09"),
        Open = 58.62,
        High = 60.43,
        Low = 58.39,
        Close = 59.74,
        Volume = 8250844
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/10"),
        Open = 59.71,
        High = 60.05,
        Low = 58.94,
        Close = 59.54,
        Volume = 4237165
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/11"),
        Open = 59.75,
        High = 60.75,
        Low = 58.94,
        Close = 60.59,
        Volume = 4395736
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/12"),
        Open = 59.65,
        High = 59.65,
        Low = 59.65,
        Close = 59.65,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/15"),
        Open = 59.65,
        High = 59.65,
        Low = 59.65,
        Close = 59.65,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/16"),
        Open = 60.42,
        High = 61.29,
        Low = 59.9,
        Close = 61.26,
        Volume = 4268659
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/17"),
        Open = 61.39,
        High = 62,
        Low = 61,
        Close = 61.82,
        Volume = 4116171
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/18"),
        Open = 61.78,
        High = 63.01,
        Low = 61.72,
        Close = 62.89,
        Volume = 4391778
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/19"),
        Open = 62.65,
        High = 64.34,
        Low = 62.65,
        Close = 63.59,
        Volume = 7371049
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/22"),
        Open = 63.58,
        High = 64.47,
        Low = 63.19,
        Close = 63.97,
        Volume = 6034004
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/23"),
        Open = 63.81,
        High = 64.17,
        Low = 62.25,
        Close = 62.77,
        Volume = 6484460
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/24"),
        Open = 63,
        High = 63.7,
        Low = 62.64,
        Close = 63.48,
        Volume = 3400361
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/25"),
        Open = 62.72,
        High = 62.97,
        Low = 62,
        Close = 62.87,
        Volume = 5043170
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/02/26"),
        Open = 63.09,
        High = 63.88,
        Low = 63.03,
        Close = 63.16,
        Volume = 4415909
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/01"),
        Open = 63.05,
        High = 64.33,
        Low = 63,
        Close = 64,
        Volume = 5265630
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/02"),
        Open = 64.64,
        High = 65.33,
        Low = 64.36,
        Close = 64.44,
        Volume = 4383103
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/03"),
        Open = 64.58,
        High = 64.97,
        Low = 64.05,
        Close = 64.45,
        Volume = 4289350
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/04"),
        Open = 65.09,
        High = 65.8,
        Low = 64.85,
        Close = 65.55,
        Volume = 7718659
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/05"),
        Open = 66.06,
        High = 68.04,
        Low = 66.03,
        Close = 67.93,
        Volume = 8506441
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/08"),
        Open = 68.01,
        High = 68.01,
        Low = 67.13,
        Close = 67.24,
        Volume = 5077225
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/09"),
        Open = 67.57,
        High = 68.34,
        Low = 67.35,
        Close = 67.79,
        Volume = 7655839
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/10"),
        Open = 68.14,
        High = 70.48,
        Low = 68.03,
        Close = 70.01,
        Volume = 10616531
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/11"),
        Open = 70.08,
        High = 70.43,
        Low = 69.15,
        Close = 70.07,
        Volume = 7293133
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/12"),
        Open = 70.48,
        High = 70.49,
        Low = 69.25,
        Close = 69.83,
        Volume = 5302767
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/15"),
        Open = 69.37,
        High = 69.77,
        Low = 68.52,
        Close = 69.4,
        Volume = 7709023
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/16"),
        Open = 69.24,
        High = 69.31,
        Low = 68.3,
        Close = 68.72,
        Volume = 7495575
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/17"),
        Open = 68.97,
        High = 69.49,
        Low = 68.29,
        Close = 69.38,
        Volume = 6004213
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/18"),
        Open = 69.35,
        High = 70.93,
        Low = 69.19,
        Close = 70.87,
        Volume = 7435774
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/19"),
        Open = 73.2,
        High = 73.3,
        Low = 70.72,
        Close = 70.72,
        Volume = 17722432
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/22"),
        Open = 71.66,
        High = 72.64,
        Low = 71.51,
        Close = 71.91,
        Volume = 9014855
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/23"),
        Open = 72.54,
        High = 72.63,
        Low = 71.51,
        Close = 72.18,
        Volume = 4986322
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/24"),
        Open = 72.42,
        High = 73.2,
        Low = 71.78,
        Close = 72.32,
        Volume = 7699920
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/25"),
        Open = 72.95,
        High = 73.43,
        Low = 72,
        Close = 72.49,
        Volume = 5431155
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/26"),
        Open = 72.66,
        High = 72.99,
        Low = 72.35,
        Close = 72.59,
        Volume = 4933688
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/29"),
        Open = 73.08,
        High = 74.53,
        Low = 73,
        Close = 74.11,
        Volume = 9064111
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/30"),
        Open = 73.84,
        High = 74.18,
        Low = 72.7,
        Close = 73.53,
        Volume = 4381292
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/03/31"),
        Open = 72.92,
        High = 73.06,
        Low = 71.95,
        Close = 72.61,
        Volume = 5884899
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/01"),
        Open = 72.99,
        High = 72.99,
        Low = 72.99,
        Close = 72.99,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/02"),
        Open = 72.99,
        High = 72.99,
        Low = 72.99,
        Close = 72.99,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/05"),
        Open = 72.99,
        High = 73.05,
        Low = 70.95,
        Close = 72.04,
        Volume = 9326414
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/06"),
        Open = 71.84,
        High = 73.18,
        Low = 71.77,
        Close = 72.36,
        Volume = 5194801
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/07"),
        Open = 72.16,
        High = 72.52,
        Low = 71.47,
        Close = 72.1,
        Volume = 6717177
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/08"),
        Open = 71.89,
        High = 72.46,
        Low = 71.21,
        Close = 72.28,
        Volume = 3743018
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/09"),
        Open = 72.26,
        High = 72.66,
        Low = 71.81,
        Close = 72.42,
        Volume = 3345780
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/12"),
        Open = 72.15,
        High = 72.57,
        Low = 71.8,
        Close = 71.92,
        Volume = 3666172
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/13"),
        Open = 71.54,
        High = 71.69,
        Low = 70.5,
        Close = 71.19,
        Volume = 5079284
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/14"),
        Open = 70.83,
        High = 71.76,
        Low = 70.81,
        Close = 71.7,
        Volume = 3496649
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/15"),
        Open = 71.34,
        High = 72.61,
        Low = 71.34,
        Close = 72.09,
        Volume = 2943682
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/16"),
        Open = 72.1,
        High = 72.1,
        Low = 69.88,
        Close = 70.79,
        Volume = 8075323
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/19"),
        Open = 70.27,
        High = 71.28,
        Low = 70.16,
        Close = 70.96,
        Volume = 4203068
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/20"),
        Open = 71.54,
        High = 71.98,
        Low = 70.95,
        Close = 71.41,
        Volume = 4760806
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/21"),
        Open = 71.51,
        High = 74.65,
        Low = 71.51,
        Close = 74.16,
        Volume = 12037705
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/22"),
        Open = 74.46,
        High = 76,
        Low = 73.68,
        Close = 75.59,
        Volume = 9088834
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/23"),
        Open = 75.04,
        High = 75.68,
        Low = 74.55,
        Close = 75.13,
        Volume = 5198190
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/26"),
        Open = 74.58,
        High = 75.29,
        Low = 74.14,
        Close = 74.34,
        Volume = 4024935
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/27"),
        Open = 74.65,
        High = 74.93,
        Low = 72.23,
        Close = 72.48,
        Volume = 6054842
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/28"),
        Open = 72.95,
        High = 72.99,
        Low = 71.34,
        Close = 72.37,
        Volume = 5699477
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/29"),
        Open = 73,
        High = 74,
        Low = 72.67,
        Close = 73.79,
        Volume = 5203310
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/04/30"),
        Open = 73.8,
        High = 74.48,
        Low = 72.26,
        Close = 72.43,
        Volume = 5601081
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/03"),
        Open = 72.62,
        High = 74.7,
        Low = 72.46,
        Close = 74.39,
        Volume = 5407779
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/04"),
        Open = 73.31,
        High = 73.45,
        Low = 72.23,
        Close = 72.79,
        Volume = 6230700
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/05"),
        Open = 71.9,
        High = 72.04,
        Low = 70.44,
        Close = 71,
        Volume = 5509124
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/06"),
        Open = 70.66,
        High = 71.49,
        Low = 62,
        Close = 67.97,
        Volume = 13771537
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/07"),
        Open = 68.29,
        High = 69.12,
        Low = 65.8,
        Close = 66.72,
        Volume = 8927346
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/10"),
        Open = 69.96,
        High = 71.73,
        Low = 69.8,
        Close = 71,
        Volume = 8841884
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/11"),
        Open = 70.31,
        High = 72.67,
        Low = 70.14,
        Close = 71.42,
        Volume = 6551880
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/12"),
        Open = 72.04,
        High = 73.37,
        Low = 72.04,
        Close = 72.87,
        Volume = 6331552
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/13"),
        Open = 72.66,
        High = 73.3,
        Low = 71.56,
        Close = 71.76,
        Volume = 3953696
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/14"),
        Open = 71.08,
        High = 71.4,
        Low = 68.98,
        Close = 69.82,
        Volume = 7954557
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/17"),
        Open = 70.36,
        High = 70.37,
        Low = 67.62,
        Close = 69.68,
        Volume = 4814936
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/18"),
        Open = 69.89,
        High = 70.13,
        Low = 67.3,
        Close = 67.72,
        Volume = 8882829
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/19"),
        Open = 66.85,
        High = 67.55,
        Low = 65.28,
        Close = 66.21,
        Volume = 9974312
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/20"),
        Open = 65,
        High = 65.11,
        Low = 62.8,
        Close = 63,
        Volume = 10904161
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/21"),
        Open = 61.99,
        High = 65,
        Low = 61.39,
        Close = 64.56,
        Volume = 10882625
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/24"),
        Open = 63.66,
        High = 64.61,
        Low = 63.06,
        Close = 63.15,
        Volume = 6168825
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/25"),
        Open = 61,
        High = 62.98,
        Low = 60.61,
        Close = 62.78,
        Volume = 6903135
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/26"),
        Open = 63.6,
        High = 65.41,
        Low = 63,
        Close = 63.26,
        Volume = 7386008
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/27"),
        Open = 64.86,
        High = 65.23,
        Low = 63.91,
        Close = 65.13,
        Volume = 7444591
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/28"),
        Open = 64.18,
        High = 64.18,
        Low = 64.18,
        Close = 64.18,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/05/31"),
        Open = 64.18,
        High = 64.18,
        Low = 64.18,
        Close = 64.18,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/01"),
        Open = 64.27,
        High = 65.2,
        Low = 62.86,
        Close = 62.95,
        Volume = 6318443
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/02"),
        Open = 63.39,
        High = 64.37,
        Low = 62.06,
        Close = 64.34,
        Volume = 4588144
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/03"),
        Open = 64.84,
        High = 64.84,
        Low = 63.51,
        Close = 64.31,
        Volume = 3775793
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/04"),
        Open = 63.25,
        High = 63.41,
        Low = 60.93,
        Close = 61.15,
        Volume = 8228715
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/07"),
        Open = 61.69,
        High = 61.7,
        Low = 60.07,
        Close = 60.11,
        Volume = 5918574
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/08"),
        Open = 60.33,
        High = 61.1,
        Low = 59.84,
        Close = 61.02,
        Volume = 7192623
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/09"),
        Open = 61.48,
        High = 63.18,
        Low = 61.17,
        Close = 61.71,
        Volume = 7729414
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/10"),
        Open = 62.81,
        High = 64.01,
        Low = 62.3,
        Close = 63.89,
        Volume = 5682835
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/11"),
        Open = 63.16,
        High = 65.7,
        Low = 63.15,
        Close = 65.38,
        Volume = 8462575
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/14"),
        Open = 66.22,
        High = 66.55,
        Low = 64.71,
        Close = 64.82,
        Volume = 6000064
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/15"),
        Open = 65.67,
        High = 67.57,
        Low = 65.47,
        Close = 67.48,
        Volume = 6400775
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/16"),
        Open = 66.93,
        High = 67.56,
        Low = 66.6,
        Close = 67.03,
        Volume = 4452275
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/17"),
        Open = 67.48,
        High = 67.49,
        Low = 65.88,
        Close = 67.26,
        Volume = 3637256
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/18"),
        Open = 67.38,
        High = 68.14,
        Low = 67.16,
        Close = 67.96,
        Volume = 6216603
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/21"),
        Open = 68.95,
        High = 69.34,
        Low = 67.57,
        Close = 67.97,
        Volume = 4109588
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/22"),
        Open = 67.97,
        High = 68.47,
        Low = 66.15,
        Close = 66.28,
        Volume = 4188173
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/23"),
        Open = 66.42,
        High = 67.88,
        Low = 65.65,
        Close = 67.45,
        Volume = 6098515
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/24"),
        Open = 67.17,
        High = 68.24,
        Low = 67.14,
        Close = 67.43,
        Volume = 7782533
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/25"),
        Open = 67.31,
        High = 68.77,
        Low = 66.67,
        Close = 68.77,
        Volume = 13325760
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/28"),
        Open = 68.43,
        High = 68.62,
        Low = 67.26,
        Close = 67.3,
        Volume = 5517259
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/29"),
        Open = 66.11,
        High = 66.2,
        Low = 62.56,
        Close = 63.04,
        Volume = 9212875
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/06/30"),
        Open = 63.05,
        High = 64.21,
        Low = 62.58,
        Close = 62.75,
        Volume = 7102383
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/01"),
        Open = 62.48,
        High = 62.72,
        Low = 61.31,
        Close = 62.26,
        Volume = 6465874
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/02"),
        Open = 61.94,
        High = 61.94,
        Low = 61.94,
        Close = 61.94,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/05"),
        Open = 61.94,
        High = 61.94,
        Low = 61.94,
        Close = 61.94,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/06"),
        Open = 62.71,
        High = 63.02,
        Low = 60.65,
        Close = 61.36,
        Volume = 5444212
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/07"),
        Open = 61.48,
        High = 63.37,
        Low = 61.03,
        Close = 63.3,
        Volume = 4785046
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/08"),
        Open = 64.09,
        High = 64.89,
        Low = 63.55,
        Close = 64.73,
        Volume = 4489385
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/09"),
        Open = 65.2,
        High = 65.2,
        Low = 64.01,
        Close = 64.66,
        Volume = 3145076
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/12"),
        Open = 64.55,
        High = 64.98,
        Low = 64.01,
        Close = 64.34,
        Volume = 2299533
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/13"),
        Open = 65.15,
        High = 65.36,
        Low = 64.18,
        Close = 64.43,
        Volume = 6208260
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/14"),
        Open = 64.29,
        High = 65.39,
        Low = 64.05,
        Close = 64.75,
        Volume = 3822487
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/15"),
        Open = 65.65,
        High = 65.78,
        Low = 63.36,
        Close = 64.37,
        Volume = 8069172
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/16"),
        Open = 63.96,
        High = 64.26,
        Low = 61.68,
        Close = 61.9,
        Volume = 7016315
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/19"),
        Open = 62.72,
        High = 63.36,
        Low = 62.04,
        Close = 63.18,
        Volume = 5031493
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/20"),
        Open = 62.26,
        High = 64,
        Low = 61.83,
        Close = 63.88,
        Volume = 5069055
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/21"),
        Open = 64.4,
        High = 64.81,
        Low = 62.66,
        Close = 63.18,
        Volume = 4459407
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/22"),
        Open = 64.02,
        High = 67.11,
        Low = 64.02,
        Close = 66.6,
        Volume = 7574451
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/23"),
        Open = 66.49,
        High = 68.17,
        Low = 66.36,
        Close = 67.93,
        Volume = 5029708
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/26"),
        Open = 68.15,
        High = 68.99,
        Low = 68,
        Close = 68.85,
        Volume = 5836465
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/27"),
        Open = 69.25,
        High = 69.75,
        Low = 68.4,
        Close = 68.62,
        Volume = 5687098
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/28"),
        Open = 67.62,
        High = 68,
        Low = 66.9,
        Close = 67.32,
        Volume = 5540629
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/29"),
        Open = 67.85,
        High = 68.53,
        Low = 66.69,
        Close = 67.22,
        Volume = 4460227
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/07/30"),
        Open = 66.61,
        High = 68.38,
        Low = 66.47,
        Close = 68.14,
        Volume = 6032163
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/02"),
        Open = 69.01,
        High = 69.93,
        Low = 68.5,
        Close = 69.69,
        Volume = 5430717
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/03"),
        Open = 69.31,
        High = 70,
        Low = 68.93,
        Close = 69.54,
        Volume = 3778718
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/04"),
        Open = 69.42,
        High = 69.93,
        Low = 69.16,
        Close = 69.25,
        Volume = 3861191
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/05"),
        Open = 68.73,
        High = 69.25,
        Low = 68.33,
        Close = 68.71,
        Volume = 4318815
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/06"),
        Open = 68.03,
        High = 68.72,
        Low = 67.36,
        Close = 68.7,
        Volume = 4498788
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/09"),
        Open = 69.17,
        High = 69.47,
        Low = 68.45,
        Close = 68.99,
        Volume = 2907790
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/10"),
        Open = 68.29,
        High = 68.97,
        Low = 67.54,
        Close = 68.62,
        Volume = 4127296
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/11"),
        Open = 67.18,
        High = 67.26,
        Low = 64.92,
        Close = 65.6,
        Volume = 5230837
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/12"),
        Open = 64.65,
        High = 65.27,
        Low = 64.44,
        Close = 64.7,
        Volume = 3847607
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/13"),
        Open = 64.59,
        High = 65.7,
        Low = 64.54,
        Close = 64.84,
        Volume = 3667747
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/16"),
        Open = 64.27,
        High = 64.93,
        Low = 63.65,
        Close = 64.4,
        Volume = 3042334
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/17"),
        Open = 65.16,
        High = 66.91,
        Low = 64.65,
        Close = 65.99,
        Volume = 4303899
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/18"),
        Open = 66.05,
        High = 66.36,
        Low = 64.99,
        Close = 66,
        Volume = 2816059
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/19"),
        Open = 65.74,
        High = 65.82,
        Low = 64.15,
        Close = 64.62,
        Volume = 4201568
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/20"),
        Open = 64.2,
        High = 64.73,
        Low = 63.59,
        Close = 64.6,
        Volume = 3865920
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/23"),
        Open = 65.09,
        High = 65.24,
        Low = 63.21,
        Close = 63.3,
        Volume = 3888194
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/24"),
        Open = 62.55,
        High = 62.81,
        Low = 60.53,
        Close = 60.93,
        Volume = 9983972
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/25"),
        Open = 60.49,
        High = 61.11,
        Low = 59.48,
        Close = 60.76,
        Volume = 5144544
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/26"),
        Open = 61.36,
        High = 62.56,
        Low = 61.07,
        Close = 61.32,
        Volume = 4889769
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/27"),
        Open = 61.13,
        High = 63.34,
        Low = 60.57,
        Close = 63.16,
        Volume = 6851673
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/30"),
        Open = 63,
        High = 63.19,
        Low = 62.1,
        Close = 62.1,
        Volume = 3279135
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/08/31"),
        Open = 62,
        High = 62.18,
        Low = 60.8,
        Close = 61.13,
        Volume = 5309421
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/01"),
        Open = 61.79,
        High = 63.09,
        Low = 61.66,
        Close = 62.29,
        Volume = 5688798
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/02"),
        Open = 62.34,
        High = 63.39,
        Low = 62.2,
        Close = 63.39,
        Volume = 3465719
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/03"),
        Open = 64.64,
        High = 64.64,
        Low = 64.64,
        Close = 64.64,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/06"),
        Open = 64.64,
        High = 64.64,
        Low = 64.64,
        Close = 64.64,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/07"),
        Open = 64.25,
        High = 64.25,
        Low = 63.29,
        Close = 63.42,
        Volume = 2529793
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/08"),
        Open = 63.6,
        High = 65,
        Low = 63.58,
        Close = 64.5,
        Volume = 3747703
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/09"),
        Open = 65.51,
        High = 65.63,
        Low = 62.95,
        Close = 63.44,
        Volume = 4190696
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/10"),
        Open = 63.38,
        High = 64.1,
        Low = 62.96,
        Close = 63.84,
        Volume = 3214772
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/13"),
        Open = 64.73,
        High = 64.98,
        Low = 63.92,
        Close = 64.19,
        Volume = 3126886
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/14"),
        Open = 64.02,
        High = 64.35,
        Low = 62.43,
        Close = 62.76,
        Volume = 6025475
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/15"),
        Open = 62.49,
        High = 62.79,
        Low = 61.89,
        Close = 62.73,
        Volume = 4929167
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/16"),
        Open = 62.39,
        High = 63.35,
        Low = 62.2,
        Close = 62.58,
        Volume = 4681838
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/17"),
        Open = 63.26,
        High = 63.34,
        Low = 62,
        Close = 62.95,
        Volume = 10702625
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/20"),
        Open = 62.99,
        High = 63.9,
        Low = 62.53,
        Close = 63.72,
        Volume = 4187283
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/21"),
        Open = 63.8,
        High = 64.5,
        Low = 63.39,
        Close = 64.23,
        Volume = 5361146
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/22"),
        Open = 64.38,
        High = 64.86,
        Low = 63.63,
        Close = 63.9,
        Volume = 3635438
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/23"),
        Open = 63.31,
        High = 63.49,
        Low = 62.56,
        Close = 62.65,
        Volume = 3656936
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/24"),
        Open = 63.52,
        High = 64.83,
        Low = 63.33,
        Close = 64.6,
        Volume = 4626836
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/27"),
        Open = 64.61,
        High = 64.7,
        Low = 63.8,
        Close = 63.89,
        Volume = 2762402
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/28"),
        Open = 63.85,
        High = 64.67,
        Low = 62.94,
        Close = 64.52,
        Volume = 3583321
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/29"),
        Open = 64.71,
        High = 66.26,
        Low = 64.44,
        Close = 65.97,
        Volume = 5874689
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/09/30"),
        Open = 67.09,
        High = 67.97,
        Low = 66.05,
        Close = 66.54,
        Volume = 8214220
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/01"),
        Open = 67.54,
        High = 67.98,
        Low = 66.67,
        Close = 66.83,
        Volume = 4489476
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/04"),
        Open = 66.57,
        High = 67.89,
        Low = 65.86,
        Close = 66.33,
        Volume = 4073665
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/05"),
        Open = 67.02,
        High = 68.98,
        Low = 67.02,
        Close = 68.6,
        Volume = 7517772
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/06"),
        Open = 68.61,
        High = 69.39,
        Low = 68.41,
        Close = 68.58,
        Volume = 4719126
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/07"),
        Open = 68.97,
        High = 69.14,
        Low = 67.8,
        Close = 68.46,
        Volume = 5506142
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/08"),
        Open = 68.47,
        High = 69.71,
        Low = 68.15,
        Close = 69.23,
        Volume = 3335682
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/11"),
        Open = 69.51,
        High = 70.25,
        Low = 69.23,
        Close = 69.99,
        Volume = 3469356
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/12"),
        Open = 70.16,
        High = 70.6,
        Low = 68.91,
        Close = 70.22,
        Volume = 4381517
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/13"),
        Open = 70.73,
        High = 72.17,
        Low = 70.66,
        Close = 71.47,
        Volume = 6038876
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/14"),
        Open = 71.73,
        High = 72,
        Low = 70.85,
        Close = 71.36,
        Volume = 3841826
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/15"),
        Open = 71.85,
        High = 71.9,
        Low = 70.05,
        Close = 70.11,
        Volume = 5641988
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/18"),
        Open = 70.19,
        High = 71.05,
        Low = 70.03,
        Close = 70.23,
        Volume = 4832596
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/19"),
        Open = 69.57,
        High = 69.96,
        Low = 68.35,
        Close = 69.05,
        Volume = 4493842
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/20"),
        Open = 70,
        High = 71.94,
        Low = 69.57,
        Close = 71.36,
        Volume = 8067660
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/21"),
        Open = 71.61,
        High = 71.88,
        Low = 70.57,
        Close = 71.5,
        Volume = 4630931
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/22"),
        Open = 71.38,
        High = 71.63,
        Low = 70.61,
        Close = 71.26,
        Volume = 3062553
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/25"),
        Open = 71.68,
        High = 72.49,
        Low = 71.47,
        Close = 71.66,
        Volume = 4802975
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/26"),
        Open = 71.1,
        High = 71.65,
        Low = 70.73,
        Close = 71.3,
        Volume = 3547112
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/27"),
        Open = 70.87,
        High = 71.11,
        Low = 69.71,
        Close = 70.86,
        Volume = 3818178
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/28"),
        Open = 71.3,
        High = 71.79,
        Low = 70.35,
        Close = 71.27,
        Volume = 4128092
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/10/29"),
        Open = 71.15,
        High = 71.46,
        Low = 70.36,
        Close = 70.64,
        Volume = 3202225
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/01"),
        Open = 70.71,
        High = 71.89,
        Low = 69.91,
        Close = 70.48,
        Volume = 3324632
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/02"),
        Open = 70.85,
        High = 70.98,
        Low = 68.8,
        Close = 69.78,
        Volume = 6340501
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/03"),
        Open = 69.66,
        High = 69.73,
        Low = 68.04,
        Close = 68.94,
        Volume = 4676861
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/04"),
        Open = 70,
        High = 71.58,
        Low = 69.78,
        Close = 70.85,
        Volume = 5758303
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/05"),
        Open = 70.85,
        High = 71.65,
        Low = 70.5,
        Close = 71.27,
        Volume = 3625799
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/08"),
        Open = 70.06,
        High = 70.41,
        Low = 69.75,
        Close = 70.21,
        Volume = 4171524
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/09"),
        Open = 70.27,
        High = 70.55,
        Low = 68.83,
        Close = 69.25,
        Volume = 4587423
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/10"),
        Open = 67.69,
        High = 67.69,
        Low = 66.79,
        Close = 67.07,
        Volume = 10494604
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/11"),
        Open = 66.55,
        High = 66.7,
        Low = 65.04,
        Close = 65.37,
        Volume = 10033682
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/12"),
        Open = 65.01,
        High = 65.25,
        Low = 63.01,
        Close = 63.09,
        Volume = 16721476
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/15"),
        Open = 63.35,
        High = 64.1,
        Low = 62.62,
        Close = 63.61,
        Volume = 10968680
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/16"),
        Open = 63.35,
        High = 63.35,
        Low = 61.84,
        Close = 62.78,
        Volume = 9636736
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/17"),
        Open = 62.67,
        High = 63.02,
        Low = 62.17,
        Close = 62.5,
        Volume = 8173227
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/18"),
        Open = 63.35,
        High = 64.72,
        Low = 62.72,
        Close = 64.61,
        Volume = 11579001
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/19"),
        Open = 64.53,
        High = 64.74,
        Low = 63.39,
        Close = 63.59,
        Volume = 8824612
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/22"),
        Open = 63.02,
        High = 64.17,
        Low = 62.8,
        Close = 64.03,
        Volume = 5917125
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/23"),
        Open = 63.43,
        High = 64.11,
        Low = 63.1,
        Close = 63.6,
        Volume = 6567822
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/24"),
        Open = 65.41,
        High = 65.41,
        Low = 65.41,
        Close = 65.41,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/26"),
        Open = 65.09,
        High = 65.46,
        Low = 64.67,
        Close = 64.8,
        Volume = 2280773
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/29"),
        Open = 64.33,
        High = 64.7,
        Low = 63.44,
        Close = 64.36,
        Volume = 4385199
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/11/30"),
        Open = 63.73,
        High = 64.21,
        Low = 63.47,
        Close = 63.77,
        Volume = 5819079
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/01"),
        Open = 64.66,
        High = 65.79,
        Low = 64.52,
        Close = 65.72,
        Volume = 7515183
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/02"),
        Open = 65.62,
        High = 66.8,
        Low = 65.55,
        Close = 66.59,
        Volume = 4768256
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/03"),
        Open = 66.58,
        High = 66.68,
        Low = 65.95,
        Close = 66.54,
        Volume = 3357522
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/06"),
        Open = 66.41,
        High = 66.96,
        Low = 65.97,
        Close = 66.59,
        Volume = 3455003
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/07"),
        Open = 67.04,
        High = 67.39,
        Low = 66.01,
        Close = 66.23,
        Volume = 4739511
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/08"),
        Open = 66.19,
        High = 66.56,
        Low = 64.92,
        Close = 65.18,
        Volume = 5230594
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/09"),
        Open = 65.61,
        High = 65.61,
        Low = 64.4,
        Close = 64.61,
        Volume = 5188492
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/10"),
        Open = 64.63,
        High = 64.77,
        Low = 63.96,
        Close = 64.16,
        Volume = 5501949
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/13"),
        Open = 64.23,
        High = 64.38,
        Low = 63.63,
        Close = 63.79,
        Volume = 4823758
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/14"),
        Open = 63.85,
        High = 65.11,
        Low = 63.68,
        Close = 64.49,
        Volume = 6304424
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/15"),
        Open = 64.29,
        High = 64.69,
        Low = 64.09,
        Close = 64.24,
        Volume = 3439085
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/16"),
        Open = 64.33,
        High = 64.85,
        Low = 63.71,
        Close = 64.4,
        Volume = 5169047
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/17"),
        Open = 64.89,
        High = 65.28,
        Low = 64.35,
        Close = 65.03,
        Volume = 8884612
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/20"),
        Open = 64.74,
        High = 64.77,
        Low = 62.82,
        Close = 63.27,
        Volume = 9710920
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/21"),
        Open = 63.61,
        High = 64.35,
        Low = 63.28,
        Close = 64.19,
        Volume = 5092820
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/22"),
        Open = 64.45,
        High = 65.14,
        Low = 64.01,
        Close = 64.61,
        Volume = 5255958
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/23"),
        Open = 65.06,
        High = 65.06,
        Low = 65.06,
        Close = 65.06,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/27"),
        Open = 64.73,
        High = 64.91,
        Low = 64.33,
        Close = 64.75,
        Volume = 2549101
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/28"),
        Open = 64.81,
        High = 65,
        Low = 64.33,
        Close = 64.86,
        Volume = 2643380
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/29"),
        Open = 65,
        High = 65.2,
        Low = 64.62,
        Close = 65.05,
        Volume = 2505431
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/30"),
        Open = 65.11,
        High = 65.23,
        Low = 64.73,
        Close = 65.01,
        Volume = 2343020
    },
    new StockDataPoint {
        Date = DateTime.Parse("2010/12/31"),
        Open = 64.9,
        High = 65.29,
        Low = 64.62,
        Close = 65.26,
        Volume = 2137676
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/03"),
        Open = 66.15,
        High = 66.68,
        Low = 66,
        Close = 66.4,
        Volume = 8076267
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/04"),
        Open = 66.79,
        High = 67.61,
        Low = 66.51,
        Close = 66.94,
        Volume = 7979820
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/05"),
        Open = 66.55,
        High = 67.55,
        Low = 66.49,
        Close = 67.48,
        Volume = 5889933
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/06"),
        Open = 67.46,
        High = 69.35,
        Low = 67.46,
        Close = 68.8,
        Volume = 7507113
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/07"),
        Open = 69.16,
        High = 70.1,
        Low = 68.8,
        Close = 69.38,
        Volume = 6804987
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/10"),
        Open = 69.42,
        High = 69.66,
        Low = 68.35,
        Close = 69.09,
        Volume = 4407094
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/11"),
        Open = 69.47,
        High = 69.88,
        Low = 68.67,
        Close = 68.96,
        Volume = 4446521
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/12"),
        Open = 69.6,
        High = 70.49,
        Low = 69.51,
        Close = 70.15,
        Volume = 5936214
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/13"),
        Open = 70.29,
        High = 70.5,
        Low = 69.62,
        Close = 69.83,
        Volume = 4044835
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/14"),
        Open = 70.07,
        High = 70.07,
        Low = 70.07,
        Close = 70.07,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/18"),
        Open = 70.86,
        High = 72.57,
        Low = 70.23,
        Close = 72.47,
        Volume = 9631611
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/19"),
        Open = 72.68,
        High = 72.99,
        Low = 71.18,
        Close = 71.73,
        Volume = 8594621
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/20"),
        Open = 71.35,
        High = 71.96,
        Low = 70.36,
        Close = 71.12,
        Volume = 6919150
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/21"),
        Open = 71.91,
        High = 72.22,
        Low = 71.34,
        Close = 71.68,
        Volume = 4448839
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/24"),
        Open = 71.52,
        High = 72.82,
        Low = 71.51,
        Close = 72.73,
        Volume = 5503636
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/25"),
        Open = 72.49,
        High = 72.73,
        Low = 71.31,
        Close = 72.24,
        Volume = 5186610
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/26"),
        Open = 69.99,
        High = 70.48,
        Low = 69.11,
        Close = 70.02,
        Volume = 13110999
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/27"),
        Open = 70.01,
        High = 71,
        Low = 70,
        Close = 70.56,
        Volume = 5752015
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/28"),
        Open = 70.8,
        High = 70.95,
        Low = 69,
        Close = 69.23,
        Volume = 5376413
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/01/31"),
        Open = 69.26,
        High = 69.96,
        Low = 69.12,
        Close = 69.48,
        Volume = 4559711
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/01"),
        Open = 70,
        High = 70.5,
        Low = 69.6,
        Close = 70.29,
        Volume = 4781902
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/02"),
        Open = 69.83,
        High = 71.19,
        Low = 69.8,
        Close = 71,
        Volume = 4254074
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/03"),
        Open = 71,
        High = 71.38,
        Low = 70.62,
        Close = 70.98,
        Volume = 5093983
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/04"),
        Open = 70.9,
        High = 71.64,
        Low = 70.68,
        Close = 71.38,
        Volume = 4080392
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/07"),
        Open = 71.43,
        High = 72.11,
        Low = 71.15,
        Close = 71.93,
        Volume = 4159276
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/08"),
        Open = 72.17,
        High = 72.82,
        Low = 72.02,
        Close = 72.71,
        Volume = 4089156
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/09"),
        Open = 72.39,
        High = 72.71,
        Low = 72,
        Close = 72.63,
        Volume = 4566257
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/10"),
        Open = 72.43,
        High = 72.99,
        Low = 71.85,
        Close = 72.66,
        Volume = 4916926
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/11"),
        Open = 72.24,
        High = 72.69,
        Low = 71.92,
        Close = 72.14,
        Volume = 4077796
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/14"),
        Open = 72.7,
        High = 72.7,
        Low = 71.6,
        Close = 72.26,
        Volume = 4092314
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/15"),
        Open = 71.92,
        High = 72.02,
        Low = 71.09,
        Close = 71.4,
        Volume = 4388197
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/16"),
        Open = 71.71,
        High = 72.62,
        Low = 71.46,
        Close = 72.48,
        Volume = 4462368
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/17"),
        Open = 72.42,
        High = 72.51,
        Low = 71.94,
        Close = 72.24,
        Volume = 3046369
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/18"),
        Open = 73.04,
        High = 73.04,
        Low = 73.04,
        Close = 73.04,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/22"),
        Open = 72.35,
        High = 72.49,
        Low = 70.38,
        Close = 70.93,
        Volume = 5561369
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/23"),
        Open = 70.94,
        High = 71.49,
        Low = 70,
        Close = 70.23,
        Volume = 5553517
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/24"),
        Open = 70.35,
        High = 72.5,
        Low = 70.09,
        Close = 70.76,
        Volume = 7015671
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/25"),
        Open = 73.94,
        High = 74.29,
        Low = 72.06,
        Close = 72.3,
        Volume = 8127868
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/02/28"),
        Open = 72.47,
        High = 72.9,
        Low = 71.7,
        Close = 72.01,
        Volume = 4104971
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/01"),
        Open = 71.93,
        High = 72.23,
        Low = 69.99,
        Close = 70.12,
        Volume = 5186546
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/02"),
        Open = 70.11,
        High = 70.4,
        Low = 68.6,
        Close = 69.57,
        Volume = 7070647
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/03"),
        Open = 70.13,
        High = 71.83,
        Low = 70.13,
        Close = 71.71,
        Volume = 5457873
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/04"),
        Open = 71.8,
        High = 71.87,
        Low = 70.28,
        Close = 71.8,
        Volume = 5707248
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/07"),
        Open = 71.6,
        High = 72.07,
        Low = 69.91,
        Close = 70.88,
        Volume = 5133965
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/08"),
        Open = 71.48,
        High = 72.5,
        Low = 71.18,
        Close = 72.04,
        Volume = 5663929
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/09"),
        Open = 72.01,
        High = 72.42,
        Low = 71.33,
        Close = 72.09,
        Volume = 5381980
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/10"),
        Open = 71.31,
        High = 72.39,
        Low = 70.51,
        Close = 71.29,
        Volume = 5511190
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/11"),
        Open = 70.29,
        High = 71.89,
        Low = 70.26,
        Close = 71.64,
        Volume = 3865232
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/14"),
        Open = 71.17,
        High = 71.23,
        Low = 69.9,
        Close = 70.74,
        Volume = 4381158
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/15"),
        Open = 68.34,
        High = 70.23,
        Low = 68.34,
        Close = 69.69,
        Volume = 6253202
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/16"),
        Open = 69.23,
        High = 69.67,
        Low = 67.34,
        Close = 67.69,
        Volume = 9632331
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/17"),
        Open = 68.58,
        High = 69.03,
        Low = 67.85,
        Close = 68.3,
        Volume = 4412615
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/18"),
        Open = 69.21,
        High = 69.58,
        Low = 68.67,
        Close = 69.1,
        Volume = 5067064
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/21"),
        Open = 70.29,
        High = 71.68,
        Low = 70.04,
        Close = 71.2,
        Volume = 5298771
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/22"),
        Open = 71.18,
        High = 72.1,
        Low = 70.72,
        Close = 71.85,
        Volume = 4728887
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/23"),
        Open = 71.62,
        High = 73.07,
        Low = 71.14,
        Close = 72.72,
        Volume = 5334654
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/24"),
        Open = 73.24,
        High = 73.33,
        Low = 72.33,
        Close = 72.76,
        Volume = 4361482
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/25"),
        Open = 72.94,
        High = 73.5,
        Low = 72.33,
        Close = 73.34,
        Volume = 4699751
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/28"),
        Open = 73.5,
        High = 73.69,
        Low = 73.11,
        Close = 73.3,
        Volume = 3858494
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/29"),
        Open = 73.07,
        High = 73.93,
        Low = 73.03,
        Close = 73.62,
        Volume = 4784479
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/30"),
        Open = 73.93,
        High = 74.14,
        Low = 73.35,
        Close = 73.8,
        Volume = 3877633
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/03/31"),
        Open = 73.81,
        High = 74.47,
        Low = 73.47,
        Close = 73.93,
        Volume = 4200252
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/01"),
        Open = 74.29,
        High = 74.85,
        Low = 73.94,
        Close = 74.01,
        Volume = 3869760
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/04"),
        Open = 73.38,
        High = 74.11,
        Low = 73.37,
        Close = 73.95,
        Volume = 3699819
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/05"),
        Open = 73.51,
        High = 74.45,
        Low = 72.71,
        Close = 73.23,
        Volume = 5231998
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/06"),
        Open = 73.33,
        High = 73.93,
        Low = 72.8,
        Close = 73.72,
        Volume = 4804410
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/07"),
        Open = 73.74,
        High = 74.58,
        Low = 73.68,
        Close = 74.29,
        Volume = 4379128
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/08"),
        Open = 74.66,
        High = 74.85,
        Low = 73.04,
        Close = 73.47,
        Volume = 3104783
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/11"),
        Open = 73.65,
        High = 74.28,
        Low = 73.5,
        Close = 73.76,
        Volume = 2694958
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/12"),
        Open = 73.22,
        High = 73.58,
        Low = 72.96,
        Close = 73.08,
        Volume = 3444077
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/13"),
        Open = 73.33,
        High = 73.71,
        Low = 71.55,
        Close = 72.13,
        Volume = 5082925
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/14"),
        Open = 71.83,
        High = 72.47,
        Low = 70.88,
        Close = 72.3,
        Volume = 4092711
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/15"),
        Open = 72.45,
        High = 72.98,
        Low = 72.02,
        Close = 72.6,
        Volume = 4177618
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/18"),
        Open = 72.72,
        High = 73.28,
        Low = 71.75,
        Close = 72.79,
        Volume = 6228799
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/19"),
        Open = 72.97,
        High = 73.63,
        Low = 72.64,
        Close = 73.15,
        Volume = 4353471
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/20"),
        Open = 74.21,
        High = 75.32,
        Low = 74.15,
        Close = 75.07,
        Volume = 6365139
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/21"),
        Open = 75.44,
        High = 75.44,
        Low = 75.44,
        Close = 75.44,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/25"),
        Open = 75.51,
        High = 75.56,
        Low = 74.68,
        Close = 74.9,
        Volume = 2524915
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/26"),
        Open = 75.31,
        High = 75.85,
        Low = 75.01,
        Close = 75.55,
        Volume = 5102817
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/27"),
        Open = 76.03,
        High = 77.31,
        Low = 75.05,
        Close = 76.12,
        Volume = 7464019
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/28"),
        Open = 76.03,
        High = 78.86,
        Low = 76.02,
        Close = 78.55,
        Volume = 7360867
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/04/29"),
        Open = 78.88,
        High = 80.34,
        Low = 78.85,
        Close = 79.78,
        Volume = 8050416
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/02"),
        Open = 80.35,
        High = 80.65,
        Low = 79.16,
        Close = 79.53,
        Volume = 5635900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/03"),
        Open = 79.24,
        High = 80.21,
        Low = 79.01,
        Close = 79.51,
        Volume = 4729968
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/04"),
        Open = 79.7,
        High = 80,
        Low = 78.76,
        Close = 78.84,
        Volume = 5738602
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/05"),
        Open = 78.52,
        High = 79.74,
        Low = 78.09,
        Close = 78.45,
        Volume = 4721112
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/06"),
        Open = 79.14,
        High = 80.04,
        Low = 78.97,
        Close = 79.31,
        Volume = 4569364
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/09"),
        Open = 79.31,
        High = 80.15,
        Low = 79.15,
        Close = 79.64,
        Volume = 3137617
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/10"),
        Open = 79.76,
        High = 80.42,
        Low = 79.76,
        Close = 79.95,
        Volume = 3855888
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/11"),
        Open = 79.64,
        High = 79.8,
        Low = 78.73,
        Close = 79.08,
        Volume = 3854565
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/12"),
        Open = 79.04,
        High = 79.75,
        Low = 78.48,
        Close = 79.41,
        Volume = 3710234
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/13"),
        Open = 79.61,
        High = 80.09,
        Low = 78.56,
        Close = 79.03,
        Volume = 3809897
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/16"),
        Open = 78.66,
        High = 78.81,
        Low = 77.65,
        Close = 77.77,
        Volume = 3801072
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/17"),
        Open = 77.61,
        High = 77.73,
        Low = 75.83,
        Close = 76.68,
        Volume = 5202027
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/18"),
        Open = 76.78,
        High = 77.49,
        Low = 76.6,
        Close = 77.14,
        Volume = 3637977
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/19"),
        Open = 77.41,
        High = 78.45,
        Low = 77.25,
        Close = 78.02,
        Volume = 3346199
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/20"),
        Open = 77.89,
        High = 77.99,
        Low = 77.26,
        Close = 77.52,
        Volume = 4002819
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/23"),
        Open = 76.55,
        High = 76.76,
        Low = 75.77,
        Close = 76.28,
        Volume = 3589447
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/24"),
        Open = 76.46,
        High = 76.71,
        Low = 75.24,
        Close = 75.57,
        Volume = 3784298
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/25"),
        Open = 75.26,
        High = 76.78,
        Low = 75.13,
        Close = 76.32,
        Volume = 4134831
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/26"),
        Open = 76.54,
        High = 76.92,
        Low = 75.94,
        Close = 76.66,
        Volume = 4378219
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/27"),
        Open = 76.99,
        High = 76.99,
        Low = 76.99,
        Close = 76.99,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/05/31"),
        Open = 77.8,
        High = 78.35,
        Low = 77.41,
        Close = 78.03,
        Volume = 4708759
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/01"),
        Open = 77.95,
        High = 78.1,
        Low = 75.26,
        Close = 75.35,
        Volume = 5259475
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/02"),
        Open = 75.44,
        High = 76.34,
        Low = 75.3,
        Close = 75.69,
        Volume = 3606253
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/03"),
        Open = 74.71,
        High = 75.05,
        Low = 74.09,
        Close = 74.84,
        Volume = 4239243
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/06"),
        Open = 74.76,
        High = 75.27,
        Low = 74.42,
        Close = 74.58,
        Volume = 3310389
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/07"),
        Open = 74.79,
        High = 75.1,
        Low = 74.16,
        Close = 74.18,
        Volume = 3390458
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/08"),
        Open = 74.13,
        High = 74.4,
        Low = 73.65,
        Close = 73.85,
        Volume = 3772183
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/09"),
        Open = 73.83,
        High = 74.55,
        Low = 73.43,
        Close = 74.18,
        Volume = 2960724
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/10"),
        Open = 73.81,
        High = 74,
        Low = 72.61,
        Close = 72.69,
        Volume = 5140712
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/13"),
        Open = 73.06,
        High = 73.41,
        Low = 72.69,
        Close = 72.94,
        Volume = 4087214
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/14"),
        Open = 73.34,
        High = 75.02,
        Low = 73.19,
        Close = 74.64,
        Volume = 4775610
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/15"),
        Open = 74.07,
        High = 75.51,
        Low = 73.57,
        Close = 73.85,
        Volume = 6532419
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/16"),
        Open = 73.74,
        High = 74.58,
        Low = 73.45,
        Close = 74.01,
        Volume = 4446439
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/17"),
        Open = 74.62,
        High = 74.93,
        Low = 73.76,
        Close = 74.16,
        Volume = 5539477
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/20"),
        Open = 73.96,
        High = 74.8,
        Low = 73.51,
        Close = 74.52,
        Volume = 3812425
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/21"),
        Open = 75.02,
        High = 75.02,
        Low = 73.78,
        Close = 73.98,
        Volume = 5494429
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/22"),
        Open = 73.59,
        High = 73.66,
        Low = 72.06,
        Close = 72.12,
        Volume = 7239345
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/23"),
        Open = 71.17,
        High = 71.63,
        Low = 70.29,
        Close = 71.25,
        Volume = 8040670
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/24"),
        Open = 71.37,
        High = 71.57,
        Low = 70.73,
        Close = 71.26,
        Volume = 6088445
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/27"),
        Open = 71.44,
        High = 71.94,
        Low = 71.33,
        Close = 71.62,
        Volume = 4028127
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/28"),
        Open = 71.82,
        High = 72.24,
        Low = 71.4,
        Close = 72.09,
        Volume = 3837837
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/29"),
        Open = 72.22,
        High = 72.96,
        Low = 71.86,
        Close = 72.72,
        Volume = 3913885
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/06/30"),
        Open = 73,
        High = 74.1,
        Low = 72.9,
        Close = 73.93,
        Volume = 4245732
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/01"),
        Open = 74.27,
        High = 74.27,
        Low = 74.27,
        Close = 74.27,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/05"),
        Open = 74.17,
        High = 74.73,
        Low = 73.85,
        Close = 74.15,
        Volume = 3128376
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/06"),
        Open = 74.13,
        High = 75.16,
        Low = 74.01,
        Close = 74.74,
        Volume = 3757881
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/07"),
        Open = 75.33,
        High = 76.2,
        Low = 74.85,
        Close = 75.99,
        Volume = 4977837
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/08"),
        Open = 75.58,
        High = 75.58,
        Low = 74.57,
        Close = 75.07,
        Volume = 4051169
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/11"),
        Open = 74.17,
        High = 74.73,
        Low = 73,
        Close = 73.35,
        Volume = 4379012
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/12"),
        Open = 73.62,
        High = 73.86,
        Low = 71.79,
        Close = 71.93,
        Volume = 5772914
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/13"),
        Open = 72.56,
        High = 73.25,
        Low = 71.86,
        Close = 72.17,
        Volume = 4707779
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/14"),
        Open = 71.94,
        High = 72.32,
        Low = 71,
        Close = 71.19,
        Volume = 5692256
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/15"),
        Open = 71.7,
        High = 71.71,
        Low = 70.85,
        Close = 71.28,
        Volume = 4058557
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/18"),
        Open = 70.66,
        High = 70.7,
        Low = 69.07,
        Close = 69.55,
        Volume = 7295227
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/19"),
        Open = 70.11,
        High = 70.99,
        Low = 69.31,
        Close = 70.53,
        Volume = 7434351
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/20"),
        Open = 71.12,
        High = 73.3,
        Low = 70.76,
        Close = 72.07,
        Volume = 8026155
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/21"),
        Open = 72.58,
        High = 73.25,
        Low = 72,
        Close = 72.89,
        Volume = 4302417
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/22"),
        Open = 73.19,
        High = 73.19,
        Low = 72.24,
        Close = 72.67,
        Volume = 2921707
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/25"),
        Open = 71.38,
        High = 72.01,
        Low = 71.01,
        Close = 71.31,
        Volume = 3990748
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/26"),
        Open = 71.38,
        High = 71.44,
        Low = 69.86,
        Close = 70.16,
        Volume = 7070440
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/27"),
        Open = 71.73,
        High = 73.2,
        Low = 70.53,
        Close = 70.63,
        Volume = 9807768
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/28"),
        Open = 71,
        High = 72.33,
        Low = 70.59,
        Close = 70.66,
        Volume = 5450001
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/07/29"),
        Open = 70,
        High = 71.11,
        Low = 69.25,
        Close = 70.47,
        Volume = 5964349
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/01"),
        Open = 71.61,
        High = 71.63,
        Low = 69.53,
        Close = 70.33,
        Volume = 5558320
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/02"),
        Open = 69.56,
        High = 70.29,
        Low = 67.69,
        Close = 67.7,
        Volume = 7052360
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/03"),
        Open = 67.89,
        High = 68.11,
        Low = 66.1,
        Close = 67.34,
        Volume = 6750274
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/04"),
        Open = 66.36,
        High = 66.38,
        Low = 63,
        Close = 63.09,
        Volume = 10709104
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/05"),
        Open = 64.09,
        High = 64.45,
        Low = 61.41,
        Close = 62.75,
        Volume = 11643681
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/08"),
        Open = 61.1,
        High = 61.81,
        Low = 58.61,
        Close = 58.71,
        Volume = 13562569
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/09"),
        Open = 60.04,
        High = 62.46,
        Low = 58.76,
        Close = 62.34,
        Volume = 14124373
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/10"),
        Open = 60.92,
        High = 61.2,
        Low = 57.23,
        Close = 57.41,
        Volume = 13551335
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/11"),
        Open = 57.65,
        High = 59.57,
        Low = 56.01,
        Close = 58.85,
        Volume = 15539708
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/12"),
        Open = 59.98,
        High = 61.87,
        Low = 59.16,
        Close = 61.75,
        Volume = 10083494
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/15"),
        Open = 62.06,
        High = 62.73,
        Low = 61.37,
        Close = 62.7,
        Volume = 6933515
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/16"),
        Open = 61.73,
        High = 62.98,
        Low = 61.41,
        Close = 62.23,
        Volume = 6841309
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/17"),
        Open = 62.44,
        High = 62.92,
        Low = 61.61,
        Close = 62.18,
        Volume = 6263385
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/18"),
        Open = 60.4,
        High = 60.72,
        Low = 58.22,
        Close = 58.93,
        Volume = 8110316
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/19"),
        Open = 58.3,
        High = 59.43,
        Low = 57.47,
        Close = 57.54,
        Volume = 9229886
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/22"),
        Open = 59.14,
        High = 59.36,
        Low = 58.04,
        Close = 58.38,
        Volume = 6863980
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/23"),
        Open = 58.7,
        High = 60.77,
        Low = 58.19,
        Close = 60.77,
        Volume = 6527734
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/24"),
        Open = 60.59,
        High = 61.91,
        Low = 60.45,
        Close = 61.69,
        Volume = 4853747
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/25"),
        Open = 62.05,
        High = 62.39,
        Low = 60.5,
        Close = 61.1,
        Volume = 6443765
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/26"),
        Open = 60.64,
        High = 62.97,
        Low = 60.13,
        Close = 62.8,
        Volume = 6201405
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/29"),
        Open = 63.99,
        High = 64.78,
        Low = 63.6,
        Close = 64.6,
        Volume = 4303837
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/30"),
        Open = 65.23,
        High = 66.54,
        Low = 64.8,
        Close = 66.03,
        Volume = 6984939
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/08/31"),
        Open = 66.69,
        High = 67.29,
        Low = 66.14,
        Close = 66.86,
        Volume = 6807902
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/01"),
        Open = 66.96,
        High = 67.73,
        Low = 66,
        Close = 66.05,
        Volume = 6170146
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/02"),
        Open = 65.01,
        High = 65.15,
        Low = 63.71,
        Close = 64.03,
        Volume = 4735530
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/06"),
        Open = 61.91,
        High = 62.9,
        Low = 61.22,
        Close = 62.77,
        Volume = 6478737
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/07"),
        Open = 63.94,
        High = 65.21,
        Low = 63.42,
        Close = 64.9,
        Volume = 5533286
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/08"),
        Open = 64.34,
        High = 64.5,
        Low = 62.61,
        Close = 62.81,
        Volume = 6870363
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/09"),
        Open = 62.11,
        High = 63.09,
        Low = 61.44,
        Close = 61.79,
        Volume = 5415796
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/12"),
        Open = 60.83,
        High = 62.53,
        Low = 60.33,
        Close = 62.39,
        Volume = 5521573
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/13"),
        Open = 62.3,
        High = 63.59,
        Low = 62.03,
        Close = 62.85,
        Volume = 5283518
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/14"),
        Open = 63.05,
        High = 64.07,
        Low = 61.64,
        Close = 63.03,
        Volume = 5782902
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/15"),
        Open = 63.65,
        High = 64.61,
        Low = 63.45,
        Close = 64.32,
        Volume = 5263658
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/16"),
        Open = 64.78,
        High = 65.75,
        Low = 64.52,
        Close = 65.38,
        Volume = 6928142
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/19"),
        Open = 64.08,
        High = 64.4,
        Low = 62.95,
        Close = 64.15,
        Volume = 4837107
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/20"),
        Open = 64.36,
        High = 64.64,
        Low = 63.5,
        Close = 63.56,
        Volume = 3431623
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/21"),
        Open = 63.54,
        High = 63.82,
        Low = 60.99,
        Close = 61.02,
        Volume = 4524971
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/22"),
        Open = 59.33,
        High = 59.59,
        Low = 57.53,
        Close = 58.72,
        Volume = 12055693
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/23"),
        Open = 58.57,
        High = 59.77,
        Low = 58.06,
        Close = 59.51,
        Volume = 6239605
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/26"),
        Open = 60.8,
        High = 62.27,
        Low = 60,
        Close = 62.01,
        Volume = 7033126
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/27"),
        Open = 64.13,
        High = 64.28,
        Low = 62.41,
        Close = 62.78,
        Volume = 6410587
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/28"),
        Open = 63.28,
        High = 64.05,
        Low = 61.81,
        Close = 61.92,
        Volume = 4695911
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/29"),
        Open = 63.2,
        High = 63.7,
        Low = 61.36,
        Close = 62.37,
        Volume = 6094328
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/09/30"),
        Open = 61.5,
        High = 62.18,
        Low = 60.45,
        Close = 60.51,
        Volume = 5467806
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/03"),
        Open = 60.1,
        High = 61.53,
        Low = 57.85,
        Close = 58.25,
        Volume = 8291484
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/04"),
        Open = 57.53,
        High = 59.23,
        Low = 56.9,
        Close = 59.14,
        Volume = 7840037
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/05"),
        Open = 58.9,
        High = 60.04,
        Low = 58.65,
        Close = 59.96,
        Volume = 5825511
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/06"),
        Open = 60.01,
        High = 61.79,
        Low = 59.45,
        Close = 61.48,
        Volume = 5565869
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/07"),
        Open = 61.91,
        High = 62.96,
        Low = 61.43,
        Close = 61.81,
        Volume = 5580750
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/10"),
        Open = 62.87,
        High = 64.19,
        Low = 62.75,
        Close = 64.03,
        Volume = 4605390
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/11"),
        Open = 63.66,
        High = 64.25,
        Low = 63.5,
        Close = 63.97,
        Volume = 3192271
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/12"),
        Open = 64.46,
        High = 65.23,
        Low = 64.13,
        Close = 64.32,
        Volume = 5136547
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/13"),
        Open = 63.78,
        High = 64.09,
        Low = 63.05,
        Close = 63.53,
        Volume = 3154622
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/14"),
        Open = 64,
        High = 64.28,
        Low = 63.41,
        Close = 63.89,
        Volume = 3840122
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/17"),
        Open = 63.34,
        High = 63.51,
        Low = 61.66,
        Close = 61.78,
        Volume = 4873358
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/18"),
        Open = 61.93,
        High = 64.24,
        Low = 61.33,
        Close = 63.47,
        Volume = 6168142
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/19"),
        Open = 62.61,
        High = 64.27,
        Low = 62.53,
        Close = 63.11,
        Volume = 4849491
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/20"),
        Open = 63.01,
        High = 63.73,
        Low = 62.18,
        Close = 62.49,
        Volume = 6291595
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/21"),
        Open = 63.31,
        High = 64.64,
        Low = 63.1,
        Close = 64.59,
        Volume = 6256627
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/24"),
        Open = 64.41,
        High = 65.06,
        Low = 63.92,
        Close = 64.75,
        Volume = 5190758
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/25"),
        Open = 64.81,
        High = 64.95,
        Low = 63.55,
        Close = 63.72,
        Volume = 6529645
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/26"),
        Open = 67.56,
        High = 67.9,
        Low = 65.8,
        Close = 66.56,
        Volume = 12700760
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/27"),
        Open = 68.59,
        High = 68.76,
        Low = 67.18,
        Close = 67.68,
        Volume = 8606967
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/28"),
        Open = 67.55,
        High = 68.39,
        Low = 67.31,
        Close = 68.17,
        Volume = 6102840
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/10/31"),
        Open = 67.12,
        High = 67.49,
        Low = 65.74,
        Close = 65.79,
        Volume = 6879758
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/01"),
        Open = 64.23,
        High = 64.34,
        Low = 62.37,
        Close = 63.17,
        Volume = 8963221
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/02"),
        Open = 63.97,
        High = 64.76,
        Low = 63.83,
        Close = 64.4,
        Volume = 5783293
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/03"),
        Open = 65.16,
        High = 66.37,
        Low = 64.5,
        Close = 66.19,
        Volume = 4897485
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/04"),
        Open = 65.59,
        High = 65.95,
        Low = 65,
        Close = 65.8,
        Volume = 3458005
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/07"),
        Open = 65.71,
        High = 66.4,
        Low = 65.17,
        Close = 66.29,
        Volume = 3624148
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/08"),
        Open = 66.44,
        High = 66.8,
        Low = 65.45,
        Close = 66.65,
        Volume = 4827016
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/09"),
        Open = 65.17,
        High = 65.7,
        Low = 64.33,
        Close = 64.55,
        Volume = 5753946
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/10"),
        Open = 65.09,
        High = 65.6,
        Low = 64.59,
        Close = 64.83,
        Volume = 3854985
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/11"),
        Open = 65.43,
        High = 67.26,
        Low = 65.43,
        Close = 66.92,
        Volume = 4398215
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/14"),
        Open = 68.89,
        High = 68.97,
        Low = 67.7,
        Close = 67.94,
        Volume = 6367008
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/15"),
        Open = 67.9,
        High = 68.34,
        Low = 67.05,
        Close = 67.94,
        Volume = 5112765
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/16"),
        Open = 67.13,
        High = 67.66,
        Low = 66.2,
        Close = 66.34,
        Volume = 5353206
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/17"),
        Open = 67.2,
        High = 67.35,
        Low = 65.41,
        Close = 66.09,
        Volume = 7125002
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/18"),
        Open = 66.93,
        High = 67.85,
        Low = 66.29,
        Close = 67.46,
        Volume = 7055691
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/21"),
        Open = 66.32,
        High = 66.45,
        Low = 64,
        Close = 65.56,
        Volume = 8102833
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/22"),
        Open = 65.3,
        High = 65.44,
        Low = 63.88,
        Close = 64.35,
        Volume = 5001801
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/23"),
        Open = 62.36,
        High = 62.36,
        Low = 62.36,
        Close = 62.36,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/25"),
        Open = 62.16,
        High = 63.62,
        Low = 62.12,
        Close = 62.78,
        Volume = 2122270
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/28"),
        Open = 64.53,
        High = 65.63,
        Low = 64.53,
        Close = 64.99,
        Volume = 4621077
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/29"),
        Open = 65.02,
        High = 66,
        Low = 64.84,
        Close = 65.26,
        Volume = 5317818
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/11/30"),
        Open = 67.08,
        High = 68.75,
        Low = 66.99,
        Close = 68.69,
        Volume = 8602614
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/01"),
        Open = 68.7,
        High = 71.71,
        Low = 68.51,
        Close = 70.98,
        Volume = 12019243
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/02"),
        Open = 71.7,
        High = 71.98,
        Low = 70.93,
        Close = 71.3,
        Volume = 7252534
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/05"),
        Open = 72.28,
        High = 72.76,
        Low = 70.35,
        Close = 71.09,
        Volume = 8133778
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/06"),
        Open = 70.92,
        High = 71.59,
        Low = 70.8,
        Close = 70.87,
        Volume = 4624791
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/07"),
        Open = 70.3,
        High = 71.51,
        Low = 69.64,
        Close = 70.6,
        Volume = 6455898
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/08"),
        Open = 70.46,
        High = 71.13,
        Low = 69.83,
        Close = 70.17,
        Volume = 6035125
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/09"),
        Open = 70.81,
        High = 72,
        Low = 70.41,
        Close = 71.93,
        Volume = 5545848
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/12"),
        Open = 71.51,
        High = 71.96,
        Low = 70.18,
        Close = 70.9,
        Volume = 5465587
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/13"),
        Open = 71.67,
        High = 72.65,
        Low = 70.62,
        Close = 70.9,
        Volume = 7560205
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/14"),
        Open = 70.35,
        High = 71.54,
        Low = 69.72,
        Close = 69.94,
        Volume = 6000866
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/15"),
        Open = 70.81,
        High = 70.95,
        Low = 70.05,
        Close = 70.61,
        Volume = 4076632
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/16"),
        Open = 71.11,
        High = 72.37,
        Low = 70.56,
        Close = 71.01,
        Volume = 8856028
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/19"),
        Open = 71.2,
        High = 71.62,
        Low = 69.91,
        Close = 70.16,
        Volume = 3572696
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/20"),
        Open = 71.23,
        High = 72.68,
        Low = 71.23,
        Close = 72.44,
        Volume = 5408685
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/21"),
        Open = 72.73,
        High = 73.71,
        Low = 72.06,
        Close = 73.59,
        Volume = 5471785
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/22"),
        Open = 73.83,
        High = 74.74,
        Low = 73.48,
        Close = 74.29,
        Volume = 5849305
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/23"),
        Open = 73.97,
        High = 73.97,
        Low = 73.97,
        Close = 73.97,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/27"),
        Open = 73.68,
        High = 74.49,
        Low = 73.37,
        Close = 74.27,
        Volume = 2536693
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/28"),
        Open = 74.48,
        High = 74.6,
        Low = 73.03,
        Close = 73.26,
        Volume = 2568121
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/29"),
        Open = 73.44,
        High = 74.36,
        Low = 73.31,
        Close = 74.11,
        Volume = 2749261
    },
    new StockDataPoint {
        Date = DateTime.Parse("2011/12/30"),
        Open = 73.35,
        High = 73.35,
        Low = 73.35,
        Close = 73.35,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/03"),
        Open = 74.7,
        High = 75,
        Low = 74.12,
        Close = 74.22,
        Volume = 6859222
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/04"),
        Open = 74.1,
        High = 74.6,
        Low = 73.59,
        Close = 74.33,
        Volume = 4923063
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/05"),
        Open = 73.77,
        High = 73.9,
        Low = 72.74,
        Close = 73.53,
        Volume = 6798561
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/06"),
        Open = 73.73,
        High = 74.27,
        Low = 72.95,
        Close = 73.98,
        Volume = 4783280
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/09"),
        Open = 74.81,
        High = 74.87,
        Low = 74.18,
        Close = 74.53,
        Volume = 4469933
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/10"),
        Open = 75.13,
        High = 75.34,
        Low = 74.5,
        Close = 75,
        Volume = 4622548
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/11"),
        Open = 74.78,
        High = 74.95,
        Low = 74.23,
        Close = 74.74,
        Volume = 3082660
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/12"),
        Open = 74.81,
        High = 75.69,
        Low = 74.78,
        Close = 75.51,
        Volume = 3934504
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/13"),
        Open = 74.6,
        High = 74.6,
        Low = 74.6,
        Close = 74.6,
        Volume = 0
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/17"),
        Open = 75.3,
        High = 76,
        Low = 75.14,
        Close = 75.24,
        Volume = 3700019
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/18"),
        Open = 74.95,
        High = 75.45,
        Low = 74.77,
        Close = 75.06,
        Volume = 4189925
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/19"),
        Open = 75.27,
        High = 75.92,
        Low = 75.1,
        Close = 75.56,
        Volume = 5397265
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/20"),
        Open = 75.68,
        High = 75.9,
        Low = 74.96,
        Close = 75.52,
        Volume = 4552369
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/23"),
        Open = 75.66,
        High = 76.37,
        Low = 75.32,
        Close = 75.51,
        Volume = 4083937
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/24"),
        Open = 75.06,
        High = 75.62,
        Low = 74.6,
        Close = 75.36,
        Volume = 4945839
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/25"),
        Open = 73.97,
        High = 76.7,
        Low = 72.85,
        Close = 75.82,
        Volume = 14049068
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/26"),
        Open = 75.84,
        High = 76.36,
        Low = 75,
        Close = 75.31,
        Volume = 4187609
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/27"),
        Open = 74.8,
        High = 75.23,
        Low = 74.4,
        Close = 74.55,
        Volume = 4754604
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/30"),
        Open = 73.99,
        High = 74.35,
        Low = 73.68,
        Close = 74.16,
        Volume = 5043622
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/01/31"),
        Open = 74.51,
        High = 75.2,
        Low = 73.96,
        Close = 74.18,
        Volume = 4777251
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/01"),
        Open = 74.96,
        High = 75.89,
        Low = 74.96,
        Close = 75.37,
        Volume = 4296501
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/02"),
        Open = 75.2,
        High = 75.33,
        Low = 74.5,
        Close = 75.22,
        Volume = 3528072
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/03"),
        Open = 76.09,
        High = 76.74,
        Low = 75.86,
        Close = 76.34,
        Volume = 3472759
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/06"),
        Open = 75.26,
        High = 75.55,
        Low = 75.16,
        Close = 75.46,
        Volume = 4163247
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/07"),
        Open = 75.04,
        High = 75.35,
        Low = 74.3,
        Close = 75.2,
        Volume = 4438621
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/08"),
        Open = 74.71,
        High = 75.65,
        Low = 74.51,
        Close = 75.46,
        Volume = 5350337
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/09"),
        Open = 75.78,
        High = 76.23,
        Low = 75.37,
        Close = 75.9,
        Volume = 4491173
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/10"),
        Open = 75.45,
        High = 75.56,
        Low = 74.57,
        Close = 74.95,
        Volume = 3362453
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/13"),
        Open = 75.5,
        High = 75.51,
        Low = 74.75,
        Close = 74.85,
        Volume = 3456593
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/14"),
        Open = 75.51,
        High = 75.57,
        Low = 74.9,
        Close = 75.56,
        Volume = 4652130
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/15"),
        Open = 75.86,
        High = 76,
        Low = 75,
        Close = 75.21,
        Volume = 4252431
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/16"),
        Open = 75.04,
        High = 75.47,
        Low = 74.87,
        Close = 75.27,
        Volume = 4993960
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/17"),
        Open = 75.53,
        High = 75.55,
        Low = 75.02,
        Close = 75.35,
        Volume = 4927482
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/21"),
        Open = 75.67,
        High = 75.95,
        Low = 75.08,
        Close = 75.72,
        Volume = 3978086
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/22"),
        Open = 75.56,
        High = 76.3,
        Low = 75.31,
        Close = 76.06,
        Volume = 3764747
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/23"),
        Open = 75.76,
        High = 76.17,
        Low = 75.52,
        Close = 75.85,
        Volume = 4187674
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/24"),
        Open = 75.75,
        High = 76.64,
        Low = 75.63,
        Close = 76.06,
        Volume = 3346959
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/27"),
        Open = 75.69,
        High = 75.78,
        Low = 75.01,
        Close = 75.21,
        Volume = 5379304
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/28"),
        Open = 75.18,
        High = 75.41,
        Low = 74.81,
        Close = 75.16,
        Volume = 3667760
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/02/29"),
        Open = 75.28,
        High = 75.72,
        Low = 74.75,
        Close = 74.95,
        Volume = 4633018
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/01"),
        Open = 74.96,
        High = 75.63,
        Low = 74.86,
        Close = 75.08,
        Volume = 3343441
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/02"),
        Open = 75.07,
        High = 75.28,
        Low = 74.63,
        Close = 74.9,
        Volume = 2806509
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/05"),
        Open = 74.95,
        High = 74.98,
        Low = 73.93,
        Close = 74.13,
        Volume = 4157820
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/06"),
        Open = 73.24,
        High = 73.24,
        Low = 72.3,
        Close = 72.56,
        Volume = 5456237
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/07"),
        Open = 72.58,
        High = 73.7,
        Low = 72.51,
        Close = 73.52,
        Volume = 4278942
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/08"),
        Open = 74.27,
        High = 74.7,
        Low = 73.83,
        Close = 74.17,
        Volume = 3881176
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/09"),
        Open = 74.14,
        High = 74.31,
        Low = 73.17,
        Close = 73.29,
        Volume = 5537742
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/12"),
        Open = 73.2,
        High = 74.03,
        Low = 73.2,
        Close = 73.6,
        Volume = 2833818
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/13"),
        Open = 73.88,
        High = 74.35,
        Low = 73.38,
        Close = 74.31,
        Volume = 4533277
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/14"),
        Open = 74.32,
        High = 75.38,
        Low = 74.31,
        Close = 75.23,
        Volume = 5297076
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/15"),
        Open = 75.5,
        High = 75.63,
        Low = 74.88,
        Close = 75.43,
        Volume = 4850646
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/16"),
        Open = 75.76,
        High = 75.81,
        Low = 75,
        Close = 75.2,
        Volume = 7079832
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/19"),
        Open = 75,
        High = 75.69,
        Low = 75,
        Close = 75.4,
        Volume = 2683796
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/20"),
        Open = 75.09,
        High = 75.47,
        Low = 74.52,
        Close = 75.14,
        Volume = 4384050
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/21"),
        Open = 75.05,
        High = 75.46,
        Low = 74.8,
        Close = 75.01,
        Volume = 3644039
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/22"),
        Open = 74.62,
        High = 74.66,
        Low = 73.37,
        Close = 73.92,
        Volume = 4921380
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/23"),
        Open = 74.05,
        High = 74.34,
        Low = 73.75,
        Close = 73.97,
        Volume = 2518614
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/26"),
        Open = 74.52,
        High = 75.23,
        Low = 74.47,
        Close = 75.18,
        Volume = 3715860
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/27"),
        Open = 75.11,
        High = 75.25,
        Low = 74.8,
        Close = 74.81,
        Volume = 3510684
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/28"),
        Open = 74.99,
        High = 75.29,
        Low = 73.9,
        Close = 74.33,
        Volume = 3412147
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/29"),
        Open = 73.77,
        High = 74.15,
        Low = 72.95,
        Close = 74.08,
        Volume = 3587511
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/03/30"),
        Open = 74.32,
        High = 74.44,
        Low = 73.78,
        Close = 74.37,
        Volume = 3204110
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/02"),
        Open = 74,
        High = 75.48,
        Low = 73.61,
        Close = 75.17,
        Volume = 4104580
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/03"),
        Open = 75,
        High = 75.11,
        Low = 74.15,
        Close = 74.65,
        Volume = 3485900
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/04"),
        Open = 73.97,
        High = 74.19,
        Low = 73.49,
        Close = 73.67,
        Volume = 2490420
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/05"),
        Open = 73.42,
        High = 73.89,
        Low = 73.3,
        Close = 73.59,
        Volume = 2640176
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/09"),
        Open = 72.63,
        High = 72.79,
        Low = 72.27,
        Close = 72.43,
        Volume = 2443561
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/10"),
        Open = 72.25,
        High = 72.31,
        Low = 70.59,
        Close = 70.6,
        Volume = 5340337
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/11"),
        Open = 71.63,
        High = 72.51,
        Low = 71.49,
        Close = 71.77,
        Volume = 5100061
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/12"),
        Open = 71.69,
        High = 73.83,
        Low = 71.69,
        Close = 73.5,
        Volume = 3938960
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/13"),
        Open = 73.18,
        High = 73.38,
        Low = 72.37,
        Close = 72.92,
        Volume = 3329065
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/16"),
        Open = 72.98,
        High = 73.19,
        Low = 72.3,
        Close = 72.68,
        Volume = 4800373
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/17"),
        Open = 73.13,
        High = 74.36,
        Low = 73.1,
        Close = 74.09,
        Volume = 3345339
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/18"),
        Open = 73.58,
        High = 74.24,
        Low = 73.47,
        Close = 73.71,
        Volume = 2248878
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/19"),
        Open = 73.73,
        High = 73.96,
        Low = 72.66,
        Close = 73.1,
        Volume = 3729518
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/20"),
        Open = 73.27,
        High = 74.03,
        Low = 73.1,
        Close = 73.55,
        Volume = 4302019
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/23"),
        Open = 72.69,
        High = 73.13,
        Low = 72.17,
        Close = 72.86,
        Volume = 5022483
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/24"),
        Open = 73.21,
        High = 73.74,
        Low = 72.77,
        Close = 73.21,
        Volume = 3665410
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/25"),
        Open = 75.05,
        High = 77.5,
        Low = 74.9,
        Close = 77.08,
        Volume = 10622471
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/26"),
        Open = 76.71,
        High = 77.2,
        Low = 76.55,
        Close = 76.99,
        Volume = 4704744
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/27"),
        Open = 77.28,
        High = 77.57,
        Low = 76.9,
        Close = 77.27,
        Volume = 3756644
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/04/30"),
        Open = 76.51,
        High = 76.87,
        Low = 75.68,
        Close = 76.8,
        Volume = 5811059
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/01"),
        Open = 76.59,
        High = 77.83,
        Low = 75.85,
        Close = 77.25,
        Volume = 4287855
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/02"),
        Open = 76.77,
        High = 77.5,
        Low = 76.34,
        Close = 77.26,
        Volume = 3073459
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/03"),
        Open = 77.13,
        High = 77.33,
        Low = 76.52,
        Close = 76.83,
        Volume = 3305192
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/04"),
        Open = 76.35,
        High = 76.56,
        Low = 75.5,
        Close = 75.84,
        Volume = 3366323
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/07"),
        Open = 75.79,
        High = 76.08,
        Low = 75.37,
        Close = 75.96,
        Volume = 3551718
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/08"),
        Open = 75.38,
        High = 75.6,
        Low = 74.55,
        Close = 75.4,
        Volume = 4033939
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/09"),
        Open = 74.25,
        High = 74.86,
        Low = 73.32,
        Close = 74.05,
        Volume = 3926975
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/10"),
        Open = 74.46,
        High = 75.07,
        Low = 73.63,
        Close = 73.8,
        Volume = 2952733
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/11"),
        Open = 73.59,
        High = 74.11,
        Low = 73.25,
        Close = 73.56,
        Volume = 3188953
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/14"),
        Open = 72.89,
        High = 73.79,
        Low = 72.35,
        Close = 73.12,
        Volume = 3585624
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/15"),
        Open = 73,
        High = 73.67,
        Low = 72.42,
        Close = 72.58,
        Volume = 3252323
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/16"),
        Open = 72.82,
        High = 73.51,
        Low = 72.29,
        Close = 72.35,
        Volume = 3648392
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/17"),
        Open = 72.31,
        High = 72.48,
        Low = 69.46,
        Close = 69.73,
        Volume = 6173903
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/18"),
        Open = 69.95,
        High = 70.34,
        Low = 68.93,
        Close = 69.15,
        Volume = 5597367
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/21"),
        Open = 70.46,
        High = 71.85,
        Low = 70.14,
        Close = 71.78,
        Volume = 4709898
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/22"),
        Open = 71.65,
        High = 72.21,
        Low = 71.08,
        Close = 71.48,
        Volume = 4269380
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/23"),
        Open = 70.69,
        High = 71.63,
        Low = 69.92,
        Close = 71.57,
        Volume = 4222625
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/24"),
        Open = 71.64,
        High = 71.95,
        Low = 70.25,
        Close = 71.39,
        Volume = 2942602
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/25"),
        Open = 71.21,
        High = 71.39,
        Low = 69.66,
        Close = 70,
        Volume = 5163399
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/29"),
        Open = 70.28,
        High = 70.5,
        Low = 69.75,
        Close = 70.4,
        Volume = 3973690
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/30"),
        Open = 69.88,
        High = 70.09,
        Low = 69.25,
        Close = 69.39,
        Volume = 4677582
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/05/31"),
        Open = 69.54,
        High = 70.11,
        Low = 69.07,
        Close = 69.61,
        Volume = 4191450
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/01"),
        Open = 68.67,
        High = 68.88,
        Low = 67.14,
        Close = 67.24,
        Volume = 5594282
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/04"),
        Open = 68.15,
        High = 68.15,
        Low = 67.05,
        Close = 67.5,
        Volume = 5478845
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/05"),
        Open = 67.31,
        High = 67.7,
        Low = 66.82,
        Close = 67.58,
        Volume = 3747728
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/06"),
        Open = 67.97,
        High = 69.02,
        Low = 67.96,
        Close = 69.02,
        Volume = 4050424
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/07"),
        Open = 69.57,
        High = 70.33,
        Low = 69.43,
        Close = 69.95,
        Volume = 4004502
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/08"),
        Open = 69.66,
        High = 69.97,
        Low = 69.27,
        Close = 69.94,
        Volume = 3933572
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/11"),
        Open = 70.61,
        High = 70.85,
        Low = 69.8,
        Close = 70.11,
        Volume = 4369378
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/12"),
        Open = 70.93,
        High = 72.82,
        Low = 70.74,
        Close = 72.58,
        Volume = 6458167
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/13"),
        Open = 72.41,
        High = 72.7,
        Low = 71.58,
        Close = 72.06,
        Volume = 4720247
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/14"),
        Open = 72.08,
        High = 72.3,
        Low = 71.39,
        Close = 71.85,
        Volume = 5822847
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/15"),
        Open = 72.09,
        High = 72.38,
        Low = 71.58,
        Close = 71.99,
        Volume = 5312746
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/18"),
        Open = 71.69,
        High = 72.34,
        Low = 71.25,
        Close = 71.9,
        Volume = 3435372
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/19"),
        Open = 72.36,
        High = 73.22,
        Low = 72.02,
        Close = 72.92,
        Volume = 4167103
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/20"),
        Open = 72.7,
        High = 73.46,
        Low = 72.35,
        Close = 73.01,
        Volume = 3468694
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/21"),
        Open = 73.35,
        High = 73.62,
        Low = 71.25,
        Close = 71.37,
        Volume = 3660254
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/22"),
        Open = 71.55,
        High = 72.1,
        Low = 71.07,
        Close = 71.96,
        Volume = 3278260
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/25"),
        Open = 71.81,
        High = 71.92,
        Low = 71.03,
        Close = 71.05,
        Volume = 4116613
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/26"),
        Open = 71.3,
        High = 71.63,
        Low = 70.48,
        Close = 70.93,
        Volume = 2757976
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/27"),
        Open = 70.98,
        High = 72.04,
        Low = 70.95,
        Close = 71.87,
        Volume = 2514547
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/28"),
        Open = 71.15,
        High = 71.74,
        Low = 70.63,
        Close = 71.58,
        Volume = 3144751
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/06/29"),
        Open = 73.06,
        High = 74.37,
        Low = 72.89,
        Close = 74.3,
        Volume = 4419908
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/02"),
        Open = 74.21,
        High = 74.74,
        Low = 72.45,
        Close = 73.18,
        Volume = 4893337
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/03"),
        Open = 73.08,
        High = 74.27,
        Low = 73.08,
        Close = 74.27,
        Volume = 2166183
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/05"),
        Open = 74.38,
        High = 74.74,
        Low = 73.85,
        Close = 74.44,
        Volume = 2539193
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/06"),
        Open = 73.78,
        High = 73.81,
        Low = 72.9,
        Close = 73.69,
        Volume = 3579766
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/09"),
        Open = 74.27,
        High = 74.85,
        Low = 73.8,
        Close = 74.03,
        Volume = 4357834
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/10"),
        Open = 74.63,
        High = 75.05,
        Low = 72.89,
        Close = 73.22,
        Volume = 4756701
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/11"),
        Open = 72.69,
        High = 72.76,
        Low = 71.23,
        Close = 71.52,
        Volume = 6073803
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/12"),
        Open = 71.2,
        High = 72.02,
        Low = 70.85,
        Close = 71.71,
        Volume = 5799745
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/13"),
        Open = 71.93,
        High = 73.56,
        Low = 71.85,
        Close = 73.51,
        Volume = 3616090
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/16"),
        Open = 73.13,
        High = 73.19,
        Low = 72.25,
        Close = 72.97,
        Volume = 3538397
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/17"),
        Open = 73.25,
        High = 73.51,
        Low = 72.04,
        Close = 73.11,
        Volume = 2753811
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/18"),
        Open = 72.71,
        High = 74.44,
        Low = 72.71,
        Close = 73.89,
        Volume = 3756167
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/19"),
        Open = 73.99,
        High = 75.1,
        Low = 73.7,
        Close = 74.86,
        Volume = 4543120
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/20"),
        Open = 74.5,
        High = 74.8,
        Low = 73.61,
        Close = 73.89,
        Volume = 3148117
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/23"),
        Open = 72.31,
        High = 73.08,
        Low = 71.58,
        Close = 72.91,
        Volume = 3433911
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/24"),
        Open = 72.87,
        High = 73.17,
        Low = 71.35,
        Close = 72.03,
        Volume = 3866628
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/25"),
        Open = 74.2,
        High = 74.48,
        Low = 72.7,
        Close = 74.03,
        Volume = 6131400
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/26"),
        Open = 75.13,
        High = 75.96,
        Low = 74.27,
        Close = 74.91,
        Volume = 4949365
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/27"),
        Open = 75.58,
        High = 75.94,
        Low = 75.08,
        Close = 75.51,
        Volume = 4066995
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/30"),
        Open = 74.6,
        High = 75.59,
        Low = 74.43,
        Close = 74.86,
        Volume = 4999974
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/07/31"),
        Open = 74.82,
        High = 75.06,
        Low = 73.88,
        Close = 73.91,
        Volume = 3978771
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/01"),
        Open = 74.32,
        High = 74.48,
        Low = 72.64,
        Close = 72.77,
        Volume = 4696302
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/02"),
        Open = 72.39,
        High = 72.52,
        Low = 71.16,
        Close = 71.99,
        Volume = 4430747
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/03"),
        Open = 73.16,
        High = 73.33,
        Low = 72.68,
        Close = 72.81,
        Volume = 800947
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/06"),
        Open = 73.01,
        High = 73.32,
        Low = 72.72,
        Close = 72.89,
        Volume = 714866
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/07"),
        Open = 73.1,
        High = 74.55,
        Low = 72.99,
        Close = 74.46,
        Volume = 878407
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/08"),
        Open = 74.2,
        High = 74.68,
        Low = 74.01,
        Close = 74.6,
        Volume = 616663
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/09"),
        Open = 74.61,
        High = 74.61,
        Low = 73.91,
        Close = 74.28,
        Volume = 452979
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/10"),
        Open = 73.87,
        High = 74.3,
        Low = 73.77,
        Close = 74.21,
        Volume = 654181
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/13"),
        Open = 73.69,
        High = 74.42,
        Low = 73.6,
        Close = 74.19,
        Volume = 470842
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/14"),
        Open = 74.3,
        High = 74.41,
        Low = 73.61,
        Close = 73.81,
        Volume = 490847
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/15"),
        Open = 73.3,
        High = 73.64,
        Low = 72.75,
        Close = 73.07,
        Volume = 558461
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/16"),
        Open = 73.1,
        High = 73.75,
        Low = 73.02,
        Close = 73.64,
        Volume = 553793
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/17"),
        Open = 73.64,
        High = 73.96,
        Low = 73.41,
        Close = 73.91,
        Volume = 1199997
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/20"),
        Open = 73.61,
        High = 74,
        Low = 73.34,
        Close = 73.83,
        Volume = 2481972
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/21"),
        Open = 74.09,
        High = 74.36,
        Low = 73.12,
        Close = 73.27,
        Volume = 3136740
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/22"),
        Open = 73.34,
        High = 73.6,
        Low = 72.55,
        Close = 72.8,
        Volume = 4245048
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/23"),
        Open = 72.09,
        High = 72.15,
        Low = 70.02,
        Close = 70.36,
        Volume = 9433833
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/24"),
        Open = 70.32,
        High = 71.17,
        Low = 70.05,
        Close = 71.09,
        Volume = 5351394
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/27"),
        Open = 70.95,
        High = 71.78,
        Low = 70.88,
        Close = 71.38,
        Volume = 3538075
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/28"),
        Open = 71.18,
        High = 71.85,
        Low = 71.05,
        Close = 71.52,
        Volume = 3029274
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/29"),
        Open = 71.64,
        High = 71.99,
        Low = 71.13,
        Close = 71.44,
        Volume = 2687111
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/30"),
        Open = 71.05,
        High = 71.13,
        Low = 70.5,
        Close = 70.82,
        Volume = 3393096
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/08/31"),
        Open = 71.27,
        High = 71.75,
        Low = 70.61,
        Close = 71.4,
        Volume = 3171737
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/04"),
        Open = 70.7,
        High = 71.5,
        Low = 70.4,
        Close = 70.87,
        Volume = 3916796
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/05"),
        Open = 71.38,
        High = 72.05,
        Low = 71.11,
        Close = 71.92,
        Volume = 4946887
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/06"),
        Open = 72.37,
        High = 73.27,
        Low = 72.37,
        Close = 72.82,
        Volume = 4358906
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/07"),
        Open = 72.87,
        High = 73.03,
        Low = 72.55,
        Close = 72.89,
        Volume = 3080445
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/10"),
        Open = 72.31,
        High = 72.32,
        Low = 70.81,
        Close = 71.08,
        Volume = 8354695
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/11"),
        Open = 71.19,
        High = 71.67,
        Low = 71.15,
        Close = 71.27,
        Volume = 3951692
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/12"),
        Open = 71.43,
        High = 71.68,
        Low = 70.8,
        Close = 70.96,
        Volume = 4400715
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/13"),
        Open = 70.68,
        High = 71.99,
        Low = 70.44,
        Close = 71.58,
        Volume = 5320329
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/14"),
        Open = 72.02,
        High = 72.43,
        Low = 71,
        Close = 71.28,
        Volume = 6530818
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/17"),
        Open = 70.77,
        High = 70.82,
        Low = 69.89,
        Close = 69.92,
        Volume = 6918255
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/18"),
        Open = 69.86,
        High = 70.46,
        Low = 69.56,
        Close = 70.45,
        Volume = 5490414
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/19"),
        Open = 70.74,
        High = 70.74,
        Low = 69.88,
        Close = 69.9,
        Volume = 5194477
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/20"),
        Open = 69.35,
        High = 69.86,
        Low = 69.03,
        Close = 69.85,
        Volume = 4875211
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/21"),
        Open = 70.09,
        High = 70.15,
        Low = 69.47,
        Close = 69.97,
        Volume = 13164383
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/24"),
        Open = 69.45,
        High = 70.18,
        Low = 69.21,
        Close = 70.03,
        Volume = 5037975
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/25"),
        Open = 70.29,
        High = 70.49,
        Low = 69.38,
        Close = 69.38,
        Volume = 4086826
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/26"),
        Open = 69.34,
        High = 70.51,
        Low = 69.31,
        Close = 70.25,
        Volume = 5256491
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/27"),
        Open = 70.4,
        High = 70.55,
        Low = 69.71,
        Close = 70.1,
        Volume = 4147748
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/09/28"),
        Open = 69.75,
        High = 70.05,
        Low = 69.18,
        Close = 69.6,
        Volume = 4057939
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/10/01"),
        Open = 69.86,
        High = 70.66,
        Low = 69.8,
        Close = 70.01,
        Volume = 4012594
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/10/02"),
        Open = 70.11,
        High = 70.3,
        Low = 69.2,
        Close = 69.53,
        Volume = 3077829
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/10/03"),
        Open = 69.9,
        High = 70,
        Low = 69.36,
        Close = 69.86,
        Volume = 3106358
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/10/04"),
        Open = 70.24,
        High = 70.38,
        Low = 69.72,
        Close = 69.94,
        Volume = 2818315
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/10/05"),
        Open = 70.26,
        High = 71.25,
        Low = 70.21,
        Close = 70.89,
        Volume = 3741887
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/10/08"),
        Open = 70.72,
        High = 71.19,
        Low = 70.55,
        Close = 70.57,
        Volume = 2838886
    },
    new StockDataPoint {
        Date = DateTime.Parse("2012/10/09"),
        Open = 70.7,
        High = 71.21,
        Low = 70.36,
        Close = 70.64,
        Volume = 4116678
    }
            };
        }
    }
}