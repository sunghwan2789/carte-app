type SchoolDto = {
  school_code: string;
  domain_code: string;
  course_code: string;
  name: string;
  address: string;
};

type CarteDto = {
  date: string;
  meals: MealDto[];
};

type MealDto = {
  name: string;
  foods: string[];
};

type Highlight = {
  id?: string;
  name?: string;
  words: string[];
  style: any;
};
