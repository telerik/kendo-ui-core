// (c) Copyright 2002-2011 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Web.Mvc;
    
    class EditorUrlBuilder : IEditorUrlBuilder
    {
        private readonly IUrlGenerator urlGenerator;
        private readonly ViewContext viewContext;

        public EditorUrlBuilder(IUrlGenerator urlGenerator, ViewContext viewContext)
        {
            this.urlGenerator = urlGenerator;
            this.viewContext = viewContext;
        }

        public string PrepareUrl(INavigatable navigatable)
        {
            return navigatable.GenerateUrl(viewContext, urlGenerator);
        }
    }
}
