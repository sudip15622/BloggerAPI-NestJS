export interface PostInterface {
    id: string;
    title: string;
    description?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface UserInterface {
    id: string;
    username: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
  }