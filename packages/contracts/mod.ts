import { z } from "zod";

export const CellDataSchema = z.object({
  type: z.literal("cell-data"),
  payload: z.object({
    index: z.number(),
    color: z.string(),
  }),
});

export const SettingsSchema = z.object({
  speed: z.number().positive(),
  amount: z.number().int().positive(),
});

export const StartCommandSchema = z.object({
  type: z.literal("start"),
  payload: SettingsSchema,
});

export const StopCommandSchema = z.object({ type: z.literal("stop") });
export const PingCommandSchema = z.object({ type: z.literal("ping") });
export const PongMessageSchema = z.object({ type: z.literal("pong") });

export const UpdateSettingsCommandSchema = z.object({
  type: z.literal("settings"),
  payload: SettingsSchema.partial(),
});

export const CommandSchema = z.discriminatedUnion("type", [
  StartCommandSchema,
  StopCommandSchema,
  UpdateSettingsCommandSchema,
  PingCommandSchema,
  PongMessageSchema,
]);

export const ServerMessageSchema = z.discriminatedUnion("type", [
  CellDataSchema,
  PongMessageSchema,
]);

export type Settings = z.infer<typeof SettingsSchema>;
export type Command = z.infer<typeof CommandSchema>;
export type ServerMessage = z.infer<typeof ServerMessageSchema>;

export type PingCommand = z.infer<typeof PingCommandSchema>;
export type PongMessage = z.infer<typeof PongMessageSchema>;
export type CellData = z.infer<typeof CellDataSchema>;
export type CellDataPayload = CellData["payload"];

export type WSEventMap = {
  connect: { reconnect: boolean };
  disconnect: { explicit: boolean };
  message: CellDataPayload;
  error: { event: Event };
};

export type WSClientAPI = {
  on<K extends keyof WSEventMap>(
    event: K,
    handler: (payload: WSEventMap[K]) => void,
  ): void;
  off<K extends keyof WSEventMap>(
    event: K,
    handler: (payload: WSEventMap[K]) => void,
  ): void;
  connect(): void;
  disconnect(): void;
  start(payload: unknown): void;
  stop(): void;
  updateSettings(payload: Settings): void;
};

export type Handler<T> = (payload: T) => void;
