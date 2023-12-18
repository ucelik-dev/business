export type Business = {
    created_at: string | null;
    id: number;
    title: string | null;
    user_email: string | null;
  };

export type User = {
    id: number;
    email: string;
    password: string;
  };