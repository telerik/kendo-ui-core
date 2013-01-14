namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Extensions;

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

        public EffectsBuilder Fade(FadeDirection direction)
        {
            return Add(EffectsList.Fade, direction.ToString().ToLower());
        }

        public EffectsBuilder Zoom(ZoomDirection direction)
        {
            return Add(EffectsList.Zoom, direction.ToString().ToLower());
        }

        public EffectsBuilder SlideIn(SlideDirection direction)
        {
            return Add(EffectsList.SlideIn, direction.ToString().ToLower());
        }

        public EffectsBuilder Expand()
        {
            return Add(EffectsList.Expand);
        }

        public EffectsBuilder Expand(ExpandDirection direction)
        {
            return Add(EffectsList.Expand, direction.ToString().ToLower());
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