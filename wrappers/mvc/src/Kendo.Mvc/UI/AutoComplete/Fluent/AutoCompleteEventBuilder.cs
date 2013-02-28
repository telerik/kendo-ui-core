namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    public class AutoCompleteEventBuilder : DropDownListEventBuilderBase<AutoCompleteEventBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AutoCompleteEventBuilder"/> class.
        /// </summary>
        /// <param name="Events">The client events.</param>
        public AutoCompleteEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }
    }
}
