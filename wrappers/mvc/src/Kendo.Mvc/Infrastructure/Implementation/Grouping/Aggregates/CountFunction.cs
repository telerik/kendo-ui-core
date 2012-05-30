namespace Kendo.Mvc
{
    /// <summary>
    /// Represents a function that returns the number of items in a set of items, including nested sets.
    /// </summary>
    public class CountFunction : EnumerableAggregateFunction
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="CountFunction"/> class.
        /// </summary>
        public CountFunction()
        {
        }

        /// <summary>
        /// Gets the the Count method name.
        /// </summary>
        /// <value><c>Count</c>.</value>
        public override string AggregateMethodName
        {
            get
            {
                return "Count";
            }
        }
    }
}