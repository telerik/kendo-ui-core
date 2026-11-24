import { WidgetEventsBinder } from "./events-binder.js";
import { WidgetCheckedBinder } from "./checked-binder.js";
import { WidgetStartBinder } from "./start-binder.js";
import { WidgetEndBinder } from "./end-binder.js";
import { WidgetVisibleBinder } from "./visible-binder.js";
import { WidgetInvisibleBinder } from "./invisible-binder.js";
import { FloatingLabelBinder } from "./floating-label-binder.js";
import { WidgetEnabledBinder } from "./enabled-binder.js";
import { WidgetDisabledBinder } from "./disabled-binder.js";
import { WidgetSourceBinder } from "./source-binder.js";
import { WidgetValueBinder } from "./value-binder.js";
import { DropDownTreeValueBinder } from "./dropdowntree-binder.js";
import { GanttDependenciesBinder } from "./gantt-binder.js";
import { MultiSelectValueBinder } from "./multiselect-binder.js";
import { SchedulerSourceBinder } from "./scheduler-binder.js";
import { GridSourceBinder } from "./grid-binder.js";
import { WidgetTextBinder } from "./text-binder.js";
export const widget = {
    events: WidgetEventsBinder,
    checked: WidgetCheckedBinder,
    start: WidgetStartBinder,
    end: WidgetEndBinder,
    visible: WidgetVisibleBinder,
    invisible: WidgetInvisibleBinder,
    floatingLabel: FloatingLabelBinder,
    enabled: WidgetEnabledBinder,
    disabled: WidgetDisabledBinder,
    source: WidgetSourceBinder,
    value: WidgetValueBinder,
    dropdowntree: {
        value: DropDownTreeValueBinder
    },
    gantt: {
        dependencies: GanttDependenciesBinder
    },
    multiselect: {
        value: MultiSelectValueBinder
    },
    scheduler: {
        source: SchedulerSourceBinder
    },
    grid: {
        source: GridSourceBinder
    },
    badge: {
        text: WidgetTextBinder
    }
};
