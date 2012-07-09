namespace Kendo.Mvc
{
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