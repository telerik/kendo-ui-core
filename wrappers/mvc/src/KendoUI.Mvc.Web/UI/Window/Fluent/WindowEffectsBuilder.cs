// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    public class WindowEffectsBuilder : EffectsBuilderBase
    {
        private readonly IEffectContainer container;

        public WindowEffectsBuilder(IEffectContainer container) : base(container) 
        {
            this.container = container;
        }

        /// <summary>
        /// Enables zoom animation.
        /// </summary>
        public WindowEffectsBuilder Zoom()
        {
            container.Container.Add(new ZoomAnimation());

            return this;
        }
    }
}
