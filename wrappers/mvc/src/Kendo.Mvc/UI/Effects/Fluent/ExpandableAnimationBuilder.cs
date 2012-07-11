namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent API for configuring the <see cref="ExpandableAnimation"/> object.
    /// </summary>
    public class ExpandableAnimationBuilder
    {
        public ExpandableAnimationBuilder(ExpandableAnimation animation)
        {
            Animation = animation;
        }

        protected ExpandableAnimation Animation
        { 
            get; 
            private set; 
        }

        public void Enable(bool enable)
        {
            Animation.Enabled = enable;
        }

        public ExpandableAnimationBuilder Expand(Action<EffectsBuilder> effectsAction)
        {
            effectsAction(new EffectsBuilder(Animation.Expand));

            return this;
        }

        public ExpandableAnimationBuilder Collapse(Action<EffectsBuilder> effectsAction)
        {
            effectsAction(new EffectsBuilder(Animation.Collapse));

            return this;
        }
    }
}
