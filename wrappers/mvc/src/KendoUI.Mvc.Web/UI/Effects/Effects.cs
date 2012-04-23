// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;

    public class Effects : IEffectContainer
    {
        private IList<IEffect> container;
        public Effects()
        {
            container = new List<IEffect>();
            OpenDuration = (int)AnimationDuration.Fast;
            CloseDuration = (int)AnimationDuration.Fast;
        }

        public IList<IEffect> Container 
        {
            get 
            {
                return this.container;
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
    }
}