import type { Tickets } from "@/lib/types";

export function createMockTicket(overrides: Partial<Tickets> = {}): Tickets {
    return {
        id: "11111111-1111-1111-1111-111111111111",
        createdAt: "2026-08-28T08:00:00.000Z",
        usedAt: null,
        deletedAt: null,
        ...overrides,
    };
}
