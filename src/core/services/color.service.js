/**
 * Color Service Implementation
 * Provides utilities for extracting theme colors.
 
 */
class ColorService {
    /**
     * Get series colors from CSS custom properties.
     */
    getSeriesColors() {
        const seriesColorsTemplate = '<div class="k-var--series-a"></div>' +
            '<div class="k-var--series-b"></div>' +
            '<div class="k-var--series-c"></div>' +
            '<div class="k-var--series-d"></div>' +
            '<div class="k-var--series-e"></div>' +
            '<div class="k-var--series-f"></div>';
        const series = $(seriesColorsTemplate);
        const colors = [];
        series.appendTo($("body"));
        series.each((_i, item) => {
            colors.push($(item).css("background-color"));
        });
        series.remove();
        return colors;
    }
}
export const colorService = new ColorService();
