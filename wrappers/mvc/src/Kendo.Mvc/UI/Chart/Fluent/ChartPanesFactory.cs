namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI;

    /// <summary>
    /// Creates panes for the <see cref="Chart{TModel}" />.
    /// </summary>
    /// <typeparam name="TModel">The type of the data item to which the chart is bound to</typeparam>
    public class ChartPanesFactory : IHideObjectMembers
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPanesFactory{TModel}"/> class.
        /// </summary>
        /// <param name="container">The container.</param>
        public ChartPanesFactory(IChart container)
        {
            Container = container;
        }

        /// <summary>
        /// The parent Chart
        /// </summary>
        public IChart Container
        {
            get;
            private set;
        }

        /// <summary>
        /// Defines a chart pane.
        /// </summary>
        public ChartPaneBuilder Add()
        {
            ChartPane pane = new ChartPane();

            Container.Panes.Add(pane);

            return new ChartPaneBuilder(pane);
        }

        /// <summary>
        /// Defines a named chart pane.
        /// </summary>
        /// <param name="name">
        /// The unique pane name
        /// </param>
        public ChartPaneBuilder Add(string name)
        {
            ChartPane pane = new ChartPane(name);

            Container.Panes.Add(pane);

            return new ChartPaneBuilder(pane);
        }
   }
}