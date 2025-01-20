import { vi } from "vitest";

export const TimerUtils = {
    initTimer: function() {
        vi.useFakeTimers();
    },

    destroyTimer: function() {
        vi.useRealTimers();
    },

    advanceTimer: function(time) {
        vi.advanceTimersByTime(time);
    }
};