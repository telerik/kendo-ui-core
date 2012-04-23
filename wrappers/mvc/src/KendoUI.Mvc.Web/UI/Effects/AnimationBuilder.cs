// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using Infrastructure;

    public class AnimationBuilder : IHideObjectMembers
    {
        private readonly IAnimation animation;

        public AnimationBuilder(IAnimation animation)
        {
            this.animation = animation;
        }

        public AnimationBuilder OpenDuration(int value)
        {
            Guard.IsNotNegative(value, "value");

            animation.OpenDuration = value;

            return this;
        }

        public AnimationBuilder CloseDuration(int value)
        {
            Guard.IsNotNegative(value, "value");

            animation.CloseDuration = value;

            return this;
        }

        public AnimationBuilder OpenDuration(AnimationDuration value)
        {
            return OpenDuration((int)value);
        }

        public AnimationBuilder CloseDuration(AnimationDuration value)
        {
            return CloseDuration((int)value);
        }

    }
}
