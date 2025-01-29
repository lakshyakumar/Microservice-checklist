import { dbConnect } from '@/dbConfig/dbConfig';
import Marks from '@/models/marksModel';

dbConnect();

export class MarksService {
  addMarks = async (
    rollNumber: string,
    name: string,
    grade: string,
    section: string,
    subject: string,
    marks: number
  ) => {
    try {
      const newMarks = new Marks({ rollNumber, name, grade, section, subject, marks });
      return await newMarks.save();
    } catch (e) {
      console.error((e as Error).message, 'while adding marks');
      throw new Error((e as Error).message);
    }
  };

  getMarksData = async (rollNumber: string | null = null) => {
    try {
      if (rollNumber) {
        return await Marks.find({ rollNumber });
      } else {
        return await Marks.find();
      }
    } catch (e) {
      console.error((e as Error).message, 'while fetching marks data');
      throw new Error((e as Error).message);
    }
  };
}
