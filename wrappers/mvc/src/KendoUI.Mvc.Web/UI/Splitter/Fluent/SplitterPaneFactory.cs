// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Telerik.Web.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Splitter.Panes"/>.
    /// </summary>
    public class SplitterPaneFactory : IHideObjectMembers
    {
        private readonly Splitter container;
        private readonly ViewContext viewContext;

        public SplitterPaneFactory(Splitter container, ViewContext viewContext)
        {
            Guard.IsNotNull(container, "container");
            Guard.IsNotNull(viewContext, "viewContext");

            this.container = container;
            this.viewContext = viewContext;
        }

        public virtual SplitterPaneBuilder Add()
        {
            SplitterPane item = new SplitterPane();

            container.Panes.Add(item);

            return new SplitterPaneBuilder(item, viewContext);
        }
    }
}
