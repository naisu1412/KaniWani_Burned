export interface User {
  correctAnswers: String[];
  incorrectAnswers: String[];
}

export interface KanjiAttempt {
  subjectID: Number;
  subjectType: string;
  hasAnsweredKanji: boolean;
  hasAnsweredMeaning: boolean;
}

export interface UserAttempt {
  kanjiAttempt: KanjiAttempt[] | undefined;
}

export interface SingularResult {
    isDoneAnswering: boolean,
    isDisplayingResult: boolean,
    isCorrect: boolean,
    currentAttempt: string
}
