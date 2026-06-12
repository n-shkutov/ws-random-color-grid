import z from "zod";

const EnvSchema = z.object({
  VITE_WS_URL: z.url().default("/ws"),
});

export const env = EnvSchema.parse(import.meta.env);
export type Env = z.infer<typeof EnvSchema>;
