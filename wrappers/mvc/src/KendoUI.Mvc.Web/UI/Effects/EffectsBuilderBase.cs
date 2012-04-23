// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;

    using Infrastructure;

    public class EffectsBuilderBase : IHideObjectMembers
    {
        private readonly IEffectContainer container;

        public EffectsBuilderBase(IEffectContainer container)
        {
            Guard.IsNotNull(container, "component");

            this.container = container;

            this.container.Container.Clear();
        }

        /// <summary>
        /// Enables toggle animation.
        /// </summary>
        public EffectsBuilderBase Toggle()
        {
            container.Container.Add(new ToggleEffect());

            return this;
        }

        /// <summary>
        /// Enables opacity animation.
        /// </summary>
        public EffectsBuilderBase Opacity()
        {
            container.Container.Add(new PropertyAnimation(PropertyAnimationType.Opacity));

            return this;
        }

        /// <summary>
        /// Enables opacity animation.
        /// </summary>
        /// <param name="setEffectProperties">Builder, which sets different opacity properties.</param>
        [Obsolete("Use Effects(fx => fx.Opacity().OpenDuration().CloseDuration()")]
        public EffectsBuilderBase Opacity(Action<AnimationBuilder> setEffectProperties)
        {
            var effect = new PropertyAnimation(PropertyAnimationType.Opacity);

            setEffectProperties(new AnimationBuilder(effect));

            container.Container.Add(effect);

            return this;
        }

        /// <summary>
        /// Enables expand animation.
        /// </summary>
        public EffectsBuilderBase Expand()
        {
            container.Container.Add(new PropertyAnimation(PropertyAnimationType.Height));

            return this;
        }

        /// <summary>
        /// Enables expand animation.
        /// </summary>
        /// <param name="setEffectProperties">Builder, which sets different expand properties.</param>
        [Obsolete("Use Effects(fx => fx.Expand().OpenDuration().CloseDuration()")]
        public EffectsBuilderBase Expand(Action<AnimationBuilder> setEffectProperties)
        {
            var effect = new PropertyAnimation(PropertyAnimationType.Height);

            setEffectProperties(new AnimationBuilder(effect));

            container.Container.Add(effect);

            return this;
        }

        public EffectsBuilderBase OpenDuration(int value)
        {
            Guard.IsNotNegative(value, "value");

            container.OpenDuration = value;

            return this;
        }

        public EffectsBuilderBase CloseDuration(int value)
        {
            Guard.IsNotNegative(value, "value");

            container.CloseDuration = value;

            return this;
        }

        public EffectsBuilderBase OpenDuration(AnimationDuration value)
        {
            return OpenDuration((int)value);
        }

        public EffectsBuilderBase CloseDuration(AnimationDuration value)
        {
            return CloseDuration((int)value);
        }
    }
}