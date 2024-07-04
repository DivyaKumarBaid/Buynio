export type SavedHopQueryResp = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    ownerId: number;
    blueprint: string;
    name: string;
}

export type AllSavedHopQueryResp = SavedHopQueryResp[]