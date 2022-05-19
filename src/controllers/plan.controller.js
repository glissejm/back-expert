import { Plan } from "../models/plan.model.js";

export async function getPlans(req, res) {
  
  try {
    const plans = await Plan.find();
    if (plans.length === 0) {
      return res.status(201).json([]);
    }
    res.status(201).json(plans);
  } catch (e) {
    res.status(404).json({ message: "We cannot get plans, ERROR" });
  }
}