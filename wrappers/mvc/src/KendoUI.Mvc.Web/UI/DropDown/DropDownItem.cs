// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{    
    using System.Web.Script.Serialization;

    /// <summary>
    /// Represent item in the DropDownList/ComboBox items.
    /// </summary>
    public class DropDownItem
    {
        public string Text { get; set; }
        public string Value { get; set; }
        [ScriptIgnore]
        public bool Selected { get; set; }
    }
}
