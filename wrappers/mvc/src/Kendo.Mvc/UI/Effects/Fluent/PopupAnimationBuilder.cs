namespace Kendo.Mvc.UI.Fluent
{
    using System;

    public class PopupAnimationBuilder
    {
        public PopupAnimationBuilder(PopupAnimation animation)
        {
            Animation = animation;
        }

        protected PopupAnimation Animation 
        { 
            get; 
            private set; 
        }

        public void Enable(bool enable)
        {
            Animation.Enabled = enable;
        }

        public PopupAnimationBuilder Open(Action<EffectsBuilder> effectsAction)
        {
            effectsAction(new EffectsBuilder(Animation.Open));

            return this;
        }

        public PopupAnimationBuilder Close(Action<EffectsBuilder> effectsAction)
        {
            effectsAction(new EffectsBuilder(Animation.Close));

            return this;
        }
    }
}
