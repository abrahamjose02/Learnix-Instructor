export class Instructor {
    constructor(
      public readonly userId: string,
      public readonly degree: string,
      public readonly institution: string,
      public readonly subject: string,
      public readonly yearOfCompletion: string,
      public readonly certificateName: string,
      public readonly certificateDate: Date,
      public readonly fieldName: string,
      public readonly mimeType: string,
      public readonly createdCourses?: Array<{ courseId: string }>,
      public readonly certificate?: string,
      public readonly verified?: boolean,
      public buffer?: { data: Buffer }
    ) {}
  }