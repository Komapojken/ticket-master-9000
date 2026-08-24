export type Ticket = {
    id: string;
    createdAt: string;
    usedAt: string | null;
    deletedAt: string | null;
};