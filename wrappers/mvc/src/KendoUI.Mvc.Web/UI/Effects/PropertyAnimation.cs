// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Globalization;

    public class PropertyAnimation : IEffect, IAnimation
    {
        public PropertyAnimation()
        {
            OpenDuration = (int) AnimationDuration.Fast;
            CloseDuration = (int) AnimationDuration.Fast;
            AnimationType = PropertyAnimationType.Opacity;
        }

        public PropertyAnimation(PropertyAnimationType value) : this()
        {
            AnimationType = value;
        }

        public string Name
        {
            get
            {
                return "property";
            }
        }

        public int OpenDuration
        {
            get;
            set;
        }

        public int CloseDuration
        {
            get;
            set;
        }

        public PropertyAnimationType AnimationType
        {
            get;
            set;
        }

        public string Serialize()
        {
            return String.Format(CultureInfo.CurrentCulture, "{{name:'{0}',properties:['{1}']}}",
                                 Name,
                                 AnimationType.ToString().ToLowerInvariant());
        }
    }
}