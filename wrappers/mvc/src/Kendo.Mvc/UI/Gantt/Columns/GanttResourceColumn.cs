namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    public class GanttResourceColumn<TModel> : GanttColumnBase<TModel>
        where TModel : class, IGanttTask
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GanttResourceColumn{TModel}"/> class.
        /// </summary>
        /// <param name="Gantt"></param>
        /// <param name="expression"></param>
        public GanttResourceColumn(string memberName)
            :base()
        {
            Member = memberName;
        }
    }
}
