import { Widget } from "./widget";
export class DataBoundWidget extends Widget {
    /**
     * Retrieves the data items currently bound to the widget.
     * @returns An array of data items
     */
    dataItems() {
        const dataSource = this.dataSource;
        if (dataSource && typeof dataSource.view === "function") {
            return dataSource.flatView();
        }
        return [];
    }
}
DataBoundWidget.fn = DataBoundWidget.prototype;
