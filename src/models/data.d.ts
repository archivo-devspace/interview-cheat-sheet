import { Category } from "../constants";

export interface Resource {
  id: string | number;
  title: string;
  ques: string;
  category: Category;
}
