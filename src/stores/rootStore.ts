import { configure } from "mobx";
import { createContext } from "react";
import WanikaniStore from "./wanikaniStore";

configure({ enforceActions: "always" });

export class RootStore {
  wanikaniStore: WanikaniStore;

  constructor() {
    this.wanikaniStore = new WanikaniStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
