// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    /// <summary>
    /// Represents a numeric axis in the <see cref="Chart{T}"/> component
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class ChartNumericAxis<T> : ChartAxisBase<T>, IChartNumericAxis where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartNumericAxis{T}" /> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        public ChartNumericAxis(Chart<T> chart)
            : base(chart)
        {
            MajorGridLines = new ChartLine();
            MinorGridLines = new ChartLine();
            Labels = new ChartAxisLabels();
            Format = "";
        }

        /// <summary>
        /// The minimum axis value.
        /// </summary>
        public double? Min 
        { 
            get; 
            set; 
        }

        /// <summary>
        /// The axis maximum value.
        /// </summary>
        public double? Max 
        { 
            get; 
            set; 
        }

        /// <summary>
        /// The interval between major divisions
        /// </summary>
        public double? MajorUnit
        {
            get;
            set;
        }

        /// <summary>
        /// The axis label format
        /// </summary>
        public string Format { get; set; }

        /// <summary>
        /// Gets the axis serializer.
        /// </summary>
        public override IChartSerializer CreateSerializer()
        {
            return new ChartNumericAxisSerializer(this);
        }
    }
}