// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Globalization;

    public class ToggleEffect : IEffect
    {
        public string Name
        {
            get
            {
                return "toggle";
            }
        }

        public string Serialize()
        {
            return String.Format(CultureInfo.CurrentCulture, "{{name:'{0}'}}", Name);
        }
    }
}