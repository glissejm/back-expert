import { Question } from "../models/question.model";

export async function getQuestions(req, res) {
  try {
    //first we extract the query filter
    //url/dashboard/?difficult=dificil only two filters
    const { difficult, course } = req.query;
    //default value
    let request = {};
    if (difficult !== undefined || course !== undefined) {
      request = difficult !== undefined ? { difficult } : { course };
    }
    //two values at the same time
    if (difficult !== undefined && course !== undefined) {
      request = { $and: [{ course }, { difficult }] };
    }
    const questions = await Question.find(request).limit(20);
    if (questions.length === 0) {
      return res.status(400).json({ message: "No questions" });
    }
    res.status(201).json(questions);
  } catch (e) {
    res.status(404).json({ message: "We cannot get questions, ERROR" });
  }
}
