using System.Collections.Generic;
using System;

namespace Kendo.Mvc.Examples.Models
{
    public partial class ChartDataRepository
    {
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
    }
}