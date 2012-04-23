// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Html
{
    using System;

    public class GridPagerData
    {
        public GridPagerStyles Style
        {
            get;
            set;
        }

        public int CurrentPage
        {
            get;
            set;
        }

        public int PageCount
        {
            get;
            set;
        }

        public string PageText
        {
            get;
            set;
        }

        public int Total
        {
            get;
            set;
        }

        public IGridUrlBuilder UrlBuilder
        {
            get;
            set;
        }

        public string PageOfText
        {
            get;
            set;
        }

        public int Colspan
        {
            get;
            set;
        }

        public string DisplayingItemsText
        {
            get;
            set;
        }

        public int PageSize
        {
            get;
            set;
        }

        public string RefreshText
        {
            get;
            set;
        }
    }
}