namespace Kendo.Mvc
{
    public class LastFunction : EnumerableAggregateFunction
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="LastFunction"/> class.
        /// </summary>
        public LastFunction()
        {
        }

        /// <summary>
        /// Gets the the Last method name.
        /// </summary>
        /// <value><c>Last</c>.</value>
        public override string AggregateMethodName
        {
            get
            {
                return "LastOrDefault";
            }
        }
    }
}