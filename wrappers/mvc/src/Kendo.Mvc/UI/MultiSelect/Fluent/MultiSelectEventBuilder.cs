namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    public class MultiSelectEventBuilder : DropDownListEventBuilderBase<MultiSelectEventBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="MultiSelectEventBuilder"/> class.
        /// </summary>
        /// <param name="Events">The client events.</param>
        public MultiSelectEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }
    }
}
