namespace Kendo.Mvc.UI
{
    using Extensions;
    using Infrastructure;
    using System.Collections.Generic;

    public class EffectsBuilder : IHideObjectMembers
    {
        public EffectsBuilder(Effects effects)
        {
            Effects = effects;

            Container.Clear();
        }

        protected Effects Effects
        {
            get;
            set;
        }

        protected IList<string> Container
        {
            get
            {
                return Effects.Container;
            }
        }

        private EffectsBuilder Add(string effect)
        {

            Container.Add(effect);

            return this;
        }

        private EffectsBuilder Add(string effect, string direction)
        {

            Container.Add("{0}:{1}".FormatWith(effect, direction));

            return this;
        }

        public EffectsBuilder Fade(string direction)
        {
            return Add(EffectsList.Fade, direction);
        }

        public EffectsBuilder Zoom(string direction)
        {
            return Add(EffectsList.Zoom, direction);
        }

        public EffectsBuilder Slide(string direction)
        {
            return Add(EffectsList.Slide, direction);
        }

        public EffectsBuilder SlideIn(string direction)
        {
            return Add(EffectsList.SlideIn, direction);
        }

        public EffectsBuilder Expand()
        {
            return Add(EffectsList.Expand);
        }

        public EffectsBuilder Expand(string direction)
        {
            return Add(EffectsList.Expand, direction);
        }

        public EffectsBuilder Duration(int value)
        {

            Effects.Duration = value;

            return this;
        }

        public EffectsBuilder Duration(AnimationDuration value)
        {
            return Duration((int)value);
        }
    }
}