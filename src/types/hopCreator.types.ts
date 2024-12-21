export type SavedHopQueryResp = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  ownerId: number;
  blueprint: string;
  name: string;
};

export type AllSavedHopQueryResp = {
  hops: SavedHopQueryResp[];
  meta: {
    count: string;
    currentPage: string;
    totalPages: string;
  };
};
