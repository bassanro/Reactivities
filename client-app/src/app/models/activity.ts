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

// Partial -> would mean all props are optional.
export interface IActivityFormValues extends Partial<IActivity> {
  time?: Date;
}

export class ActivityFormValues implements IActivityFormValues {
  id?: string = undefined;
  title: string = "";
  category: string = "";
  description: string = "";
  date?: Date = undefined;
  time?: Date = undefined;
  city: string = "";
  venue: string = "";

  constructor(init?: IActivityFormValues) {
    if (init && init.date) {
      init.time = init.date;
    }
    // Asssign init values to class
    Object.assign(this, init);
  }
}
