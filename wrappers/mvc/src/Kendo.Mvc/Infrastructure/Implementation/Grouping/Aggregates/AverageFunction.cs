namespace Kendo.Mvc
{
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