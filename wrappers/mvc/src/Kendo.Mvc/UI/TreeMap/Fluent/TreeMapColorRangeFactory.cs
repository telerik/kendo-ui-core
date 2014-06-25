namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.UI;

    /// <summary>
    /// Creates plot bands for the <see cref="TreeMapColorRangeFactory" />.
    /// </summary>
    public class TreeMapColorRangeFactory
    {
        private readonly TreeMap container;
        /// <summary>
        /// Initializes a new instance of the <see cref="TreeMapColorRangeFactory"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public TreeMapColorRangeFactory(TreeMap component)
        {
            container = component;
        }

        /// <summary>
        /// Adds color range.
        /// </summary>
        /// <returns></returns>
        public TreeMapColorRangeFactory AddRange(string fromColor, string toColor)
        {
            container.ColorRanges.Add(new string[] { fromColor, toColor });

            return new TreeMapColorRangeFactory(container);
        }
    }
}