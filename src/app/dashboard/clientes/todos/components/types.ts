import { RowPositionStatus } from "@prisma/client";

interface FinishedHaircuts {
    createdAt: Date
}

export interface UserAll {
    name: string
    id: string
    phone: string
    email: string | null
    rowId: string | null
    businessId: string | null
    position: number | null
    rowStatus: RowPositionStatus
    createdAt: Date
    lastCall: Date | null
    joinRowAt: Date | null
    updatedAt: Date
    FinishedHaircuts: FinishedHaircuts[]
}