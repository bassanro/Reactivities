// structure used for type checking. We can use class as well, but that will be transcompiled to js.
// which will take more space.
export interface IActivity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date;
  city: string;
  venue: string;
}
