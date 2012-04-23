// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;
    using Telerik.Web.Mvc.Extensions;

    public abstract class HtmlBuilderBase : IHtmlBuilder
    {
        public HtmlBuilderBase()
        {
            Adorners = new List<IHtmlAdorner>();
        }
        
        public IHtmlNode Build()
        {
            var result = BuildCore();

            Adorners.Each(adorner => adorner.ApplyTo(result));

            return result;
        }

        protected abstract IHtmlNode BuildCore();

        public IList<IHtmlAdorner> Adorners
        {
            get;
            private set;
        }
    }
}
