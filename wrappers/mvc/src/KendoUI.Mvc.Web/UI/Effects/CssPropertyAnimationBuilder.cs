namespace Telerik.Web.Mvc.UI
{
    using Infrastructure;
    using System.Collections.Generic;

    public class CssPropertyAnimationBuilder
    {
        private readonly PropertyAnimation effect;

        public CssPropertyAnimationBuilder(PropertyAnimation effect)
        {
            this.effect = effect;
        }

        public CssPropertyAnimationBuilder AnimationType(PropertyAnimationType animatedProperty) 
        {
            effect.Animations = new List<PropertyAnimationType> { animatedProperty };

            return this;
        }

        public CssPropertyAnimationBuilder OpenDuration(int value)
        {
            Guard.IsNotNegative(value, "value");

            effect.OpenDuration = value;

            return this;
        }

        public CssPropertyAnimationBuilder CloseDuration(int value)
        {
            Guard.IsNotNegative(value, "value");

            effect.CloseDuration = value;

            return this;
        }

        public CssPropertyAnimationBuilder OpenDuration(AnimationDuration value)
        {
            return OpenDuration((int) value);
        }

        public CssPropertyAnimationBuilder CloseDuration(AnimationDuration value)
        {
            return CloseDuration((int) value);
        }
    }
}
