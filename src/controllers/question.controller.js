import { Question } from "../models/question.model";
import { User } from "../models/user.model";

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
    const questions = await Question.find(request);
    if (questions.length === 0) {
      return res.status(201).json([]);
    }
    res.status(201).json(questions);
  } catch (e) {
    res.status(404).json({ message: "We cannot get questions, ERROR" });
  }
}

export async function getQuestion(req, res, next) {
  try {
    const question_u = await Question.findById(req.params.q_id);
    res.status(201).json(question_u);
  } catch (e) {
    //console.log(e)
    res.status(404).json({ message: "We cannot get this question, ERROR" });
    next();
  }
}

export async function getProgress(req, res) {
  try {
    const { id } = req.body;
    const user = await User.findById({ _id: id });
    if (!user) {
      res.status(404).json({ message: "We cannot get the user, ERROR" });
    }
    const { progress } = user;

    const questionsArray = await Question.find({
      _id: progress,
    }).select("name course topic difficult");

    res.status(200).json(questionsArray);
  } catch (e) {
    res.status(404).json({ message: "We cannot get this question, ERROR" });
  }
}

export async function getIdProgress(req, res) {
  try {
    const { id } = req.body;
    const user = await User.findById({ _id: id });
    if (!user) {
      res.status(404).json({ message: "We cannot get the user, ERROR" });
    }
    const { progress } = user;

    res.status(200).json(progress);
  } catch (e) {
    res.status(404).json({ message: "We cannot get this question, ERROR" });
  }
}
