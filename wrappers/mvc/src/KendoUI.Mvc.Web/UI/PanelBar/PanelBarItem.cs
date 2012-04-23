// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;

    using Infrastructure;

    public class PanelBarItem : NavigationItem<PanelBarItem>, INavigationItemContainer<PanelBarItem>, IAsyncContentContainer
    {
        private string loadContentFromUrl;

        public PanelBarItem()
        {
            Items = new LinkedObjectCollection<PanelBarItem>(this);
        }

        public bool Expanded
        {
            get;
            set;
        }

        public string ContentUrl
        {
            get
            {
                return loadContentFromUrl;
            }
            set
            {
                Guard.IsNotNullOrEmpty(value, "value");

                loadContentFromUrl = value;
                ContentHtmlAttributes.Clear();
                Content = null;
            }
        }

        public IList<PanelBarItem> Items
        {
            get;
            private set;
        }
    }
}