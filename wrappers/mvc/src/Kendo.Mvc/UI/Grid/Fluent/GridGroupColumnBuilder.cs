using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;

namespace Kendo.Mvc.UI.Fluent
{
    public class GridColumnGroupBuilder<T> : GridColumnBuilderBase<IGridColumnGroup, GridColumnGroupBuilder<T>>
        where T : class 
    {
        private IUrlGenerator urlGenerator;
        private ViewContext viewContext;

        /// <summary>
        /// Initializes a new instance of the <see cref="GridColumnGroupBuilder{TModel}"/> class.
        /// </summary>
        /// <param name="container">The container.</param>
        public GridColumnGroupBuilder(IGridColumnGroup column, Grid<T> container, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(column)
        {
            Container = container;
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
        }

        public Grid<T> Container
        {
            get;
            private set;
        }

        public GridColumnGroupBuilder<T> Columns(Action<GridColumnFactory<T>> configurator)
        {
            GridColumnFactory<T> factory = new GridColumnFactory<T>(Container, viewContext, urlGenerator, (GridColumnGroup<T>)Column);

            configurator(factory);

            return this;
        }
    }
}
