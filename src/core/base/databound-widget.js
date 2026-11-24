import { Widget } from "./widget";
export class DataBoundWidget extends Widget {
    dataItems() {
        const dataSource = this.dataSource;
        if (dataSource && typeof dataSource.view === "function") {
            return dataSource.flatView();
        }
        return [];
    }
}
DataBoundWidget.fn = DataBoundWidget.prototype;
