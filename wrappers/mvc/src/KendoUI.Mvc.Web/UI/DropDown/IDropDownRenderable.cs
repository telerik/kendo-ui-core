// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;

    public interface IDropDownRenderable : IViewComponent, IHtmlAttributesContainer
    {
        IList<DropDownItem> Items { get; }

        IDictionary<string, object> HiddenInputHtmlAttributes { get; }

        int SelectedIndex { get; set; }

        string Value { get; set; }

        bool Enabled { get; }

        bool Encoded { get; set; }
    }
}