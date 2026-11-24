import { dataRegistry } from "./data/registry.js";
import { SignalRTransport } from "./data/transports/signalr.transport.js";

export const __meta__ = {
    id: "data.signalr",
    name: "SignalR",
    category: "framework",
    depends: ["data"],
    hidden: true
};

const kendo = window.kendo || (window.kendo = {});

dataRegistry.register({
    transports: {
        signalr: SignalRTransport
    }
});

export default kendo;
