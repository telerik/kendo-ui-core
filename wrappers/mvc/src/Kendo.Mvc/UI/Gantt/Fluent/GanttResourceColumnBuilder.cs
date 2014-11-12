using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI.Fluent
{
    public class GanttResourceColumnBuilder<TTaskModel> : GanttColumnBuilderBase<IGanttColumn, GanttResourceColumnBuilder<TTaskModel>>
        where TTaskModel : class, IGanttTask
    {
         /// <summary>
        /// Initializes a new instance of the <see cref="GanttResourceColumnBuilder{T}"/> class.
        /// </summary>
        /// <param name="column">The column.</param>
        public GanttResourceColumnBuilder(IGanttColumn column)
            : base(column)
        {
        }
    }
}
