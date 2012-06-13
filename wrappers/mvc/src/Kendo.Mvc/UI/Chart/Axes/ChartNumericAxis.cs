namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    /// <summary>
    /// Represents a numeric axis in the <see cref="Chart{T}"/> component
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class ChartNumericAxis<T> : ChartAxisBase<T, double>, IChartNumericAxis where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartNumericAxis{T}" /> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        public ChartNumericAxis(Chart<T> chart)
            : base(chart)
        {
            AxisCrossingValues = new List<double>();
            MajorGridLines = new ChartLine();
            MinorGridLines = new ChartLine();
            Labels = new ChartAxisLabels();
        }

        /// <summary>
        /// The values at which perpendicular axes cross this axis.
        /// </summary>
        public IEnumerable<double> AxisCrossingValues
        {
            get;
            set;
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
        /// Gets the axis serializer.
        /// </summary>
        public override IChartSerializer CreateSerializer()
        {
            return new ChartNumericAxisSerializer(this);
        }
    }
}