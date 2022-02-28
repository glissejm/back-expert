import { Question } from "../models/question.model";

export async function getQuestions(req, res) {
  try {
    //first we extract the query filter
    //url/dashboard/?difficult=dificil
    const difficult = req.query.difficult;
    //dificultad is a string

    const questions = await Question.find({ difficult });
    if (questions.length === 0) {
      return res.status(400).json({ message: "No questions" });
    }
    res.status(201).json(questions);
  } catch (e) {
    res.status(404).json({ message: "We cannot get questions, ERROR" });
  }
}
