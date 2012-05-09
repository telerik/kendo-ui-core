namespace Kendo.Mvc
{
    /// <summary>
    /// Represents a function that returns the arithmetic mean of a set of arguments.
    /// </summary>
    public class AverageFunction : EnumerableSelectorAggregateFunction
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AverageFunction"/> class.
        /// </summary>
        public AverageFunction()
        {
        }

        /// <summary>
        /// Gets the the Average method name.
        /// </summary>
        /// <value><c>Average</c>.</value>
        public override string AggregateMethodName
        {
            get
            {
                return "Average";
            }
        }
    }
}