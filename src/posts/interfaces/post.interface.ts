export interface PostInterface {
    id: string;
    title: string;
    description?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }