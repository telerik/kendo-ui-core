// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;

    using Infrastructure;

    public class EffectsBuilder : EffectsBuilderBase
    {
        private readonly IEffectContainer container;

        public EffectsBuilder(IEffectContainer container)
            :base(container)
        {
            Guard.IsNotNull(container, "component");

            this.container = container;

        }

        /// <summary>
        /// Enables slide animation.
        /// </summary>
        public EffectsBuilder Slide()
        {
            container.Container.Add(new SlideAnimation());

            return this;
        }

        /// <summary>
        /// Enables slide animation.
        /// </summary>
        /// <param name="setEffectProperties">Builder, which sets different slide properties.</param>
        [Obsolete("Use Effects(fx => fx.SlideAnimation().OpenDuration().CloseDuration()")]
        public EffectsBuilder Slide(Action<AnimationBuilder> setEffectProperties)
        {
            var effect = new SlideAnimation();

            setEffectProperties(new AnimationBuilder(effect));

            container.Container.Add(effect);

            return this;
        }
    }
}