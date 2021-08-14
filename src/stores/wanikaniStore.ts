import { action, makeObservable, observable, runInAction } from "mobx";
import { IAssignment } from "../models/wanikani";
import agent from "./../api/agent";

export default class WaniKaniStore {
  rootStore: any;
  @observable subjectItems: string[] = [];
  @observable isItemLoaded: boolean = false;
  @observable currentItem: any = {};

  constructor(rootStore: any) {
    this.rootStore = rootStore;
    makeObservable(this);
    this.getBurns().then(() => {
      if (this.subjectItems.length !== 0) {
        this.getSubject(this.subjectItems[0]);
      }
    });
  }

  @action getBurns = async () => {
    try {
      this.isItemLoaded = false;
      let items: any = await agent.wanikani.getAssignments("kanji", false);
      runInAction(() => {
        items["data"].forEach(async (item: IAssignment) => {
          let burnedSubjectID = item.data["subject_id"].toString();
          this.subjectItems.push(burnedSubjectID);
          localStorage.setItem("subjectItem", JSON.stringify(this.subjectItems));
        });
        this.isItemLoaded = true;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action getSubject = async (id: string) => {
    try {
      this.isItemLoaded = false;
      let subject: any = await agent.wanikani.getSubject(id);
      runInAction(() => {
        console.log(subject["data"]);
        this.currentItem = subject["data"];
        this.isItemLoaded = true;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action attempAnswer = async () => {};
}
