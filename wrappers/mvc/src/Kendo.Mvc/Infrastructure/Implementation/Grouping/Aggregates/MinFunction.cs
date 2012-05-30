namespace Kendo.Mvc
{
    /// <summary>
    /// Represents a function that returns the least item from a set of items.
    /// </summary>
    public class MinFunction : EnumerableSelectorAggregateFunction
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="MinFunction"/> class.
        /// </summary>
        public MinFunction()
        {
        }

        /// <summary>
        /// Gets the the Min method name.
        /// </summary>
        /// <value><c>Min</c>.</value>
        public override string AggregateMethodName
        {
            get
            {
                return "Min";
            }
        }
    }
}