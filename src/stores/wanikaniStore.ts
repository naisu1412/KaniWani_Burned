import { action, makeObservable, observable, runInAction } from "mobx";
import { act } from "react-dom/test-utils";
import { isTemplateExpression } from "typescript";
import { KanjiAttempt, SingularResult, UserAttempt } from "../models/user";
import { IAssignment } from "../models/wanikani";
import agent from "./../api/agent";

export default class WaniKaniStore {
  rootStore: any;
  currentIndex: number = 0;
  @observable subjectItems: string[] = [];
  @observable isItemLoaded: boolean = false;
  @observable currentItem: any = {};
  @observable user: UserAttempt = { kanjiAttempt: [] };
  @observable isCorrect: boolean = false;
  @observable isDisplayingResult: boolean = false;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
    makeObservable(this);
    this.getBurns().then(() => {
      if (this.subjectItems.length !== 0) {
        this.getSubject(this.subjectItems[this.currentIndex]);
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
          localStorage.setItem(
            "subjectItem",
            JSON.stringify(this.subjectItems)
          );
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
        console.log(subject["data"], "trying");
        this.currentItem = subject["data"];
        this.isItemLoaded = true;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action attemptAnswer = async (answerAttempt: string) => {
    try {
      runInAction(() => {
        this.isCorrect = false;

        let acceptedAnswers = this.currentItem["meanings"].filter(
          (item: any) => item["accepted_answer"] === true
        );

        let userAttempt = acceptedAnswers.filter(
          (item: any) => answerAttempt === item["meaning"]
        );

        if (userAttempt.length !== 0) {
          this.isCorrect = true;
        }

        this.isDisplayingResult = true;

      });
    } catch (error) {
      console.log(error);
    }
  };

  @action nextItem = async () => {
    this.currentIndex += 1;
    this.getSubject(this.subjectItems[this.currentIndex]);

    this.isCorrect = false;
    this.isDisplayingResult = false;
  };
}
