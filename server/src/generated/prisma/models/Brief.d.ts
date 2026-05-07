import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Brief
 *
 */
export type BriefModel = runtime.Types.Result.DefaultSelection<Prisma.$BriefPayload>;
export type AggregateBrief = {
    _count: BriefCountAggregateOutputType | null;
    _min: BriefMinAggregateOutputType | null;
    _max: BriefMaxAggregateOutputType | null;
};
export type BriefMinAggregateOutputType = {
    id: string | null;
    slug: string | null;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    status: string | null;
    projectName: string | null;
    primaryGoal: string | null;
    needBuilt: string | null;
    targetAudience: string | null;
    keyFeatures: string | null;
    avoid: string | null;
    deadline: Date | null;
    budgetRange: string | null;
    assetsUrls: string | null;
    references: string | null;
    additionalInfo: string | null;
    userId: string | null;
    clientId: string | null;
};
export type BriefMaxAggregateOutputType = {
    id: string | null;
    slug: string | null;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    status: string | null;
    projectName: string | null;
    primaryGoal: string | null;
    needBuilt: string | null;
    targetAudience: string | null;
    keyFeatures: string | null;
    avoid: string | null;
    deadline: Date | null;
    budgetRange: string | null;
    assetsUrls: string | null;
    references: string | null;
    additionalInfo: string | null;
    userId: string | null;
    clientId: string | null;
};
export type BriefCountAggregateOutputType = {
    id: number;
    slug: number;
    name: number;
    createdAt: number;
    updatedAt: number;
    status: number;
    projectName: number;
    primaryGoal: number;
    needBuilt: number;
    targetAudience: number;
    keyFeatures: number;
    avoid: number;
    deadline: number;
    budgetRange: number;
    assetsUrls: number;
    references: number;
    additionalInfo: number;
    userId: number;
    clientId: number;
    _all: number;
};
export type BriefMinAggregateInputType = {
    id?: true;
    slug?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
    status?: true;
    projectName?: true;
    primaryGoal?: true;
    needBuilt?: true;
    targetAudience?: true;
    keyFeatures?: true;
    avoid?: true;
    deadline?: true;
    budgetRange?: true;
    assetsUrls?: true;
    references?: true;
    additionalInfo?: true;
    userId?: true;
    clientId?: true;
};
export type BriefMaxAggregateInputType = {
    id?: true;
    slug?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
    status?: true;
    projectName?: true;
    primaryGoal?: true;
    needBuilt?: true;
    targetAudience?: true;
    keyFeatures?: true;
    avoid?: true;
    deadline?: true;
    budgetRange?: true;
    assetsUrls?: true;
    references?: true;
    additionalInfo?: true;
    userId?: true;
    clientId?: true;
};
export type BriefCountAggregateInputType = {
    id?: true;
    slug?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
    status?: true;
    projectName?: true;
    primaryGoal?: true;
    needBuilt?: true;
    targetAudience?: true;
    keyFeatures?: true;
    avoid?: true;
    deadline?: true;
    budgetRange?: true;
    assetsUrls?: true;
    references?: true;
    additionalInfo?: true;
    userId?: true;
    clientId?: true;
    _all?: true;
};
export type BriefAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Brief to aggregate.
     */
    where?: Prisma.BriefWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Briefs to fetch.
     */
    orderBy?: Prisma.BriefOrderByWithRelationInput | Prisma.BriefOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.BriefWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Briefs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Briefs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Briefs
    **/
    _count?: true | BriefCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: BriefMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: BriefMaxAggregateInputType;
};
export type GetBriefAggregateType<T extends BriefAggregateArgs> = {
    [P in keyof T & keyof AggregateBrief]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBrief[P]> : Prisma.GetScalarType<T[P], AggregateBrief[P]>;
};
export type BriefGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BriefWhereInput;
    orderBy?: Prisma.BriefOrderByWithAggregationInput | Prisma.BriefOrderByWithAggregationInput[];
    by: Prisma.BriefScalarFieldEnum[] | Prisma.BriefScalarFieldEnum;
    having?: Prisma.BriefScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BriefCountAggregateInputType | true;
    _min?: BriefMinAggregateInputType;
    _max?: BriefMaxAggregateInputType;
};
export type BriefGroupByOutputType = {
    id: string;
    slug: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    projectName: string | null;
    primaryGoal: string | null;
    needBuilt: string | null;
    targetAudience: string | null;
    keyFeatures: string | null;
    avoid: string | null;
    deadline: Date | null;
    budgetRange: string | null;
    assetsUrls: string | null;
    references: string | null;
    additionalInfo: string | null;
    userId: string;
    clientId: string | null;
    _count: BriefCountAggregateOutputType | null;
    _min: BriefMinAggregateOutputType | null;
    _max: BriefMaxAggregateOutputType | null;
};
export type GetBriefGroupByPayload<T extends BriefGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BriefGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BriefGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BriefGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BriefGroupByOutputType[P]>;
}>>;
export type BriefWhereInput = {
    AND?: Prisma.BriefWhereInput | Prisma.BriefWhereInput[];
    OR?: Prisma.BriefWhereInput[];
    NOT?: Prisma.BriefWhereInput | Prisma.BriefWhereInput[];
    id?: Prisma.StringFilter<"Brief"> | string;
    slug?: Prisma.StringFilter<"Brief"> | string;
    name?: Prisma.StringFilter<"Brief"> | string;
    createdAt?: Prisma.DateTimeFilter<"Brief"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Brief"> | Date | string;
    status?: Prisma.StringFilter<"Brief"> | string;
    projectName?: Prisma.StringNullableFilter<"Brief"> | string | null;
    primaryGoal?: Prisma.StringNullableFilter<"Brief"> | string | null;
    needBuilt?: Prisma.StringNullableFilter<"Brief"> | string | null;
    targetAudience?: Prisma.StringNullableFilter<"Brief"> | string | null;
    keyFeatures?: Prisma.StringNullableFilter<"Brief"> | string | null;
    avoid?: Prisma.StringNullableFilter<"Brief"> | string | null;
    deadline?: Prisma.DateTimeNullableFilter<"Brief"> | Date | string | null;
    budgetRange?: Prisma.StringNullableFilter<"Brief"> | string | null;
    assetsUrls?: Prisma.StringNullableFilter<"Brief"> | string | null;
    references?: Prisma.StringNullableFilter<"Brief"> | string | null;
    additionalInfo?: Prisma.StringNullableFilter<"Brief"> | string | null;
    userId?: Prisma.StringFilter<"Brief"> | string;
    clientId?: Prisma.StringNullableFilter<"Brief"> | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    client?: Prisma.XOR<Prisma.ClientNullableScalarRelationFilter, Prisma.ClientWhereInput> | null;
};
export type BriefOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    projectName?: Prisma.SortOrderInput | Prisma.SortOrder;
    primaryGoal?: Prisma.SortOrderInput | Prisma.SortOrder;
    needBuilt?: Prisma.SortOrderInput | Prisma.SortOrder;
    targetAudience?: Prisma.SortOrderInput | Prisma.SortOrder;
    keyFeatures?: Prisma.SortOrderInput | Prisma.SortOrder;
    avoid?: Prisma.SortOrderInput | Prisma.SortOrder;
    deadline?: Prisma.SortOrderInput | Prisma.SortOrder;
    budgetRange?: Prisma.SortOrderInput | Prisma.SortOrder;
    assetsUrls?: Prisma.SortOrderInput | Prisma.SortOrder;
    references?: Prisma.SortOrderInput | Prisma.SortOrder;
    additionalInfo?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    clientId?: Prisma.SortOrderInput | Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    client?: Prisma.ClientOrderByWithRelationInput;
};
export type BriefWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    slug?: string;
    AND?: Prisma.BriefWhereInput | Prisma.BriefWhereInput[];
    OR?: Prisma.BriefWhereInput[];
    NOT?: Prisma.BriefWhereInput | Prisma.BriefWhereInput[];
    name?: Prisma.StringFilter<"Brief"> | string;
    createdAt?: Prisma.DateTimeFilter<"Brief"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Brief"> | Date | string;
    status?: Prisma.StringFilter<"Brief"> | string;
    projectName?: Prisma.StringNullableFilter<"Brief"> | string | null;
    primaryGoal?: Prisma.StringNullableFilter<"Brief"> | string | null;
    needBuilt?: Prisma.StringNullableFilter<"Brief"> | string | null;
    targetAudience?: Prisma.StringNullableFilter<"Brief"> | string | null;
    keyFeatures?: Prisma.StringNullableFilter<"Brief"> | string | null;
    avoid?: Prisma.StringNullableFilter<"Brief"> | string | null;
    deadline?: Prisma.DateTimeNullableFilter<"Brief"> | Date | string | null;
    budgetRange?: Prisma.StringNullableFilter<"Brief"> | string | null;
    assetsUrls?: Prisma.StringNullableFilter<"Brief"> | string | null;
    references?: Prisma.StringNullableFilter<"Brief"> | string | null;
    additionalInfo?: Prisma.StringNullableFilter<"Brief"> | string | null;
    userId?: Prisma.StringFilter<"Brief"> | string;
    clientId?: Prisma.StringNullableFilter<"Brief"> | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    client?: Prisma.XOR<Prisma.ClientNullableScalarRelationFilter, Prisma.ClientWhereInput> | null;
}, "id" | "slug">;
export type BriefOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    projectName?: Prisma.SortOrderInput | Prisma.SortOrder;
    primaryGoal?: Prisma.SortOrderInput | Prisma.SortOrder;
    needBuilt?: Prisma.SortOrderInput | Prisma.SortOrder;
    targetAudience?: Prisma.SortOrderInput | Prisma.SortOrder;
    keyFeatures?: Prisma.SortOrderInput | Prisma.SortOrder;
    avoid?: Prisma.SortOrderInput | Prisma.SortOrder;
    deadline?: Prisma.SortOrderInput | Prisma.SortOrder;
    budgetRange?: Prisma.SortOrderInput | Prisma.SortOrder;
    assetsUrls?: Prisma.SortOrderInput | Prisma.SortOrder;
    references?: Prisma.SortOrderInput | Prisma.SortOrder;
    additionalInfo?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    clientId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.BriefCountOrderByAggregateInput;
    _max?: Prisma.BriefMaxOrderByAggregateInput;
    _min?: Prisma.BriefMinOrderByAggregateInput;
};
export type BriefScalarWhereWithAggregatesInput = {
    AND?: Prisma.BriefScalarWhereWithAggregatesInput | Prisma.BriefScalarWhereWithAggregatesInput[];
    OR?: Prisma.BriefScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BriefScalarWhereWithAggregatesInput | Prisma.BriefScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Brief"> | string;
    slug?: Prisma.StringWithAggregatesFilter<"Brief"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Brief"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Brief"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Brief"> | Date | string;
    status?: Prisma.StringWithAggregatesFilter<"Brief"> | string;
    projectName?: Prisma.StringNullableWithAggregatesFilter<"Brief"> | string | null;
    primaryGoal?: Prisma.StringNullableWithAggregatesFilter<"Brief"> | string | null;
    needBuilt?: Prisma.StringNullableWithAggregatesFilter<"Brief"> | string | null;
    targetAudience?: Prisma.StringNullableWithAggregatesFilter<"Brief"> | string | null;
    keyFeatures?: Prisma.StringNullableWithAggregatesFilter<"Brief"> | string | null;
    avoid?: Prisma.StringNullableWithAggregatesFilter<"Brief"> | string | null;
    deadline?: Prisma.DateTimeNullableWithAggregatesFilter<"Brief"> | Date | string | null;
    budgetRange?: Prisma.StringNullableWithAggregatesFilter<"Brief"> | string | null;
    assetsUrls?: Prisma.StringNullableWithAggregatesFilter<"Brief"> | string | null;
    references?: Prisma.StringNullableWithAggregatesFilter<"Brief"> | string | null;
    additionalInfo?: Prisma.StringNullableWithAggregatesFilter<"Brief"> | string | null;
    userId?: Prisma.StringWithAggregatesFilter<"Brief"> | string;
    clientId?: Prisma.StringNullableWithAggregatesFilter<"Brief"> | string | null;
};
export type BriefCreateInput = {
    id?: string;
    slug: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    status?: string;
    projectName?: string | null;
    primaryGoal?: string | null;
    needBuilt?: string | null;
    targetAudience?: string | null;
    keyFeatures?: string | null;
    avoid?: string | null;
    deadline?: Date | string | null;
    budgetRange?: string | null;
    assetsUrls?: string | null;
    references?: string | null;
    additionalInfo?: string | null;
    user: Prisma.UserCreateNestedOneWithoutBriefsInput;
    client?: Prisma.ClientCreateNestedOneWithoutBriefsInput;
};
export type BriefUncheckedCreateInput = {
    id?: string;
    slug: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    status?: string;
    projectName?: string | null;
    primaryGoal?: string | null;
    needBuilt?: string | null;
    targetAudience?: string | null;
    keyFeatures?: string | null;
    avoid?: string | null;
    deadline?: Date | string | null;
    budgetRange?: string | null;
    assetsUrls?: string | null;
    references?: string | null;
    additionalInfo?: string | null;
    userId: string;
    clientId?: string | null;
};
export type BriefUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    projectName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    primaryGoal?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    needBuilt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetAudience?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    keyFeatures?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avoid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgetRange?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetsUrls?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    references?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    additionalInfo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutBriefsNestedInput;
    client?: Prisma.ClientUpdateOneWithoutBriefsNestedInput;
};
export type BriefUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    projectName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    primaryGoal?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    needBuilt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetAudience?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    keyFeatures?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avoid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgetRange?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetsUrls?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    references?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    additionalInfo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    clientId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type BriefCreateManyInput = {
    id?: string;
    slug: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    status?: string;
    projectName?: string | null;
    primaryGoal?: string | null;
    needBuilt?: string | null;
    targetAudience?: string | null;
    keyFeatures?: string | null;
    avoid?: string | null;
    deadline?: Date | string | null;
    budgetRange?: string | null;
    assetsUrls?: string | null;
    references?: string | null;
    additionalInfo?: string | null;
    userId: string;
    clientId?: string | null;
};
export type BriefUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    projectName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    primaryGoal?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    needBuilt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetAudience?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    keyFeatures?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avoid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgetRange?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetsUrls?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    references?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    additionalInfo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type BriefUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    projectName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    primaryGoal?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    needBuilt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetAudience?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    keyFeatures?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avoid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgetRange?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetsUrls?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    references?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    additionalInfo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    clientId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type BriefListRelationFilter = {
    every?: Prisma.BriefWhereInput;
    some?: Prisma.BriefWhereInput;
    none?: Prisma.BriefWhereInput;
};
export type BriefOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BriefCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    projectName?: Prisma.SortOrder;
    primaryGoal?: Prisma.SortOrder;
    needBuilt?: Prisma.SortOrder;
    targetAudience?: Prisma.SortOrder;
    keyFeatures?: Prisma.SortOrder;
    avoid?: Prisma.SortOrder;
    deadline?: Prisma.SortOrder;
    budgetRange?: Prisma.SortOrder;
    assetsUrls?: Prisma.SortOrder;
    references?: Prisma.SortOrder;
    additionalInfo?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
};
export type BriefMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    projectName?: Prisma.SortOrder;
    primaryGoal?: Prisma.SortOrder;
    needBuilt?: Prisma.SortOrder;
    targetAudience?: Prisma.SortOrder;
    keyFeatures?: Prisma.SortOrder;
    avoid?: Prisma.SortOrder;
    deadline?: Prisma.SortOrder;
    budgetRange?: Prisma.SortOrder;
    assetsUrls?: Prisma.SortOrder;
    references?: Prisma.SortOrder;
    additionalInfo?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
};
export type BriefMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    projectName?: Prisma.SortOrder;
    primaryGoal?: Prisma.SortOrder;
    needBuilt?: Prisma.SortOrder;
    targetAudience?: Prisma.SortOrder;
    keyFeatures?: Prisma.SortOrder;
    avoid?: Prisma.SortOrder;
    deadline?: Prisma.SortOrder;
    budgetRange?: Prisma.SortOrder;
    assetsUrls?: Prisma.SortOrder;
    references?: Prisma.SortOrder;
    additionalInfo?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
};
export type BriefCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.BriefCreateWithoutUserInput, Prisma.BriefUncheckedCreateWithoutUserInput> | Prisma.BriefCreateWithoutUserInput[] | Prisma.BriefUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BriefCreateOrConnectWithoutUserInput | Prisma.BriefCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.BriefCreateManyUserInputEnvelope;
    connect?: Prisma.BriefWhereUniqueInput | Prisma.BriefWhereUniqueInput[];
};
export type BriefUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.BriefCreateWithoutUserInput, Prisma.BriefUncheckedCreateWithoutUserInput> | Prisma.BriefCreateWithoutUserInput[] | Prisma.BriefUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BriefCreateOrConnectWithoutUserInput | Prisma.BriefCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.BriefCreateManyUserInputEnvelope;
    connect?: Prisma.BriefWhereUniqueInput | Prisma.BriefWhereUniqueInput[];
};
export type BriefUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.BriefCreateWithoutUserInput, Prisma.BriefUncheckedCreateWithoutUserInput> | Prisma.BriefCreateWithoutUserInput[] | Prisma.BriefUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BriefCreateOrConnectWithoutUserInput | Prisma.BriefCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.BriefUpsertWithWhereUniqueWithoutUserInput | Prisma.BriefUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.BriefCreateManyUserInputEnvelope;
    set?: Prisma.BriefWhereUniqueInput | Prisma.BriefWhereUniqueInput[];
    disconnect?: Prisma.BriefWhereUniqueInput | Prisma.BriefWhereUniqueInput[];
    delete?: Prisma.BriefWhereUniqueInput | Prisma.BriefWhereUniqueInput[];
    connect?: Prisma.BriefWhereUniqueInput | Prisma.BriefWhereUniqueInput[];
    update?: Prisma.BriefUpdateWithWhereUniqueWithoutUserInput | Prisma.BriefUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.BriefUpdateManyWithWhereWithoutUserInput | Prisma.BriefUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.BriefScalarWhereInput | Prisma.BriefScalarWhereInput[];
};
export type BriefUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.BriefCreateWithoutUserInput, Prisma.BriefUncheckedCreateWithoutUserInput> | Prisma.BriefCreateWithoutUserInput[] | Prisma.BriefUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BriefCreateOrConnectWithoutUserInput | Prisma.BriefCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.BriefUpsertWithWhereUniqueWithoutUserInput | Prisma.BriefUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.BriefCreateManyUserInputEnvelope;
    set?: Prisma.BriefWhereUniqueInput | Prisma.BriefWhereUniqueInput[];
    disconnect?: Prisma.BriefWhereUniqueInput | Prisma.BriefWhereUniqueInput[];
    delete?: Prisma.BriefWhereUniqueInput | Prisma.BriefWhereUniqueInput[];
    connect?: Prisma.BriefWhereUniqueInput | Prisma.BriefWhereUniqueInput[];
    update?: Prisma.BriefUpdateWithWhereUniqueWithoutUserInput | Prisma.BriefUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.BriefUpdateManyWithWhereWithoutUserInput | Prisma.BriefUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.BriefScalarWhereInput | Prisma.BriefScalarWhereInput[];
};
export type BriefCreateNestedManyWithoutClientInput = {
    create?: Prisma.XOR<Prisma.BriefCreateWithoutClientInput, Prisma.BriefUncheckedCreateWithoutClientInput> | Prisma.BriefCreateWithoutClientInput[] | Prisma.BriefUncheckedCreateWithoutClientInput[];
    connectOrCreate?: Prisma.BriefCreateOrConnectWithoutClientInput | Prisma.BriefCreateOrConnectWithoutClientInput[];
    createMany?: Prisma.BriefCreateManyClientInputEnvelope;
    connect?: Prisma.BriefWhereUniqueInput | Prisma.BriefWhereUniqueInput[];
};
export type BriefUncheckedCreateNestedManyWithoutClientInput = {
    create?: Prisma.XOR<Prisma.BriefCreateWithoutClientInput, Prisma.BriefUncheckedCreateWithoutClientInput> | Prisma.BriefCreateWithoutClientInput[] | Prisma.BriefUncheckedCreateWithoutClientInput[];
    connectOrCreate?: Prisma.BriefCreateOrConnectWithoutClientInput | Prisma.BriefCreateOrConnectWithoutClientInput[];
    createMany?: Prisma.BriefCreateManyClientInputEnvelope;
    connect?: Prisma.BriefWhereUniqueInput | Prisma.BriefWhereUniqueInput[];
};
export type BriefUpdateManyWithoutClientNestedInput = {
    create?: Prisma.XOR<Prisma.BriefCreateWithoutClientInput, Prisma.BriefUncheckedCreateWithoutClientInput> | Prisma.BriefCreateWithoutClientInput[] | Prisma.BriefUncheckedCreateWithoutClientInput[];
    connectOrCreate?: Prisma.BriefCreateOrConnectWithoutClientInput | Prisma.BriefCreateOrConnectWithoutClientInput[];
    upsert?: Prisma.BriefUpsertWithWhereUniqueWithoutClientInput | Prisma.BriefUpsertWithWhereUniqueWithoutClientInput[];
    createMany?: Prisma.BriefCreateManyClientInputEnvelope;
    set?: Prisma.BriefWhereUniqueInput | Prisma.BriefWhereUniqueInput[];
    disconnect?: Prisma.BriefWhereUniqueInput | Prisma.BriefWhereUniqueInput[];
    delete?: Prisma.BriefWhereUniqueInput | Prisma.BriefWhereUniqueInput[];
    connect?: Prisma.BriefWhereUniqueInput | Prisma.BriefWhereUniqueInput[];
    update?: Prisma.BriefUpdateWithWhereUniqueWithoutClientInput | Prisma.BriefUpdateWithWhereUniqueWithoutClientInput[];
    updateMany?: Prisma.BriefUpdateManyWithWhereWithoutClientInput | Prisma.BriefUpdateManyWithWhereWithoutClientInput[];
    deleteMany?: Prisma.BriefScalarWhereInput | Prisma.BriefScalarWhereInput[];
};
export type BriefUncheckedUpdateManyWithoutClientNestedInput = {
    create?: Prisma.XOR<Prisma.BriefCreateWithoutClientInput, Prisma.BriefUncheckedCreateWithoutClientInput> | Prisma.BriefCreateWithoutClientInput[] | Prisma.BriefUncheckedCreateWithoutClientInput[];
    connectOrCreate?: Prisma.BriefCreateOrConnectWithoutClientInput | Prisma.BriefCreateOrConnectWithoutClientInput[];
    upsert?: Prisma.BriefUpsertWithWhereUniqueWithoutClientInput | Prisma.BriefUpsertWithWhereUniqueWithoutClientInput[];
    createMany?: Prisma.BriefCreateManyClientInputEnvelope;
    set?: Prisma.BriefWhereUniqueInput | Prisma.BriefWhereUniqueInput[];
    disconnect?: Prisma.BriefWhereUniqueInput | Prisma.BriefWhereUniqueInput[];
    delete?: Prisma.BriefWhereUniqueInput | Prisma.BriefWhereUniqueInput[];
    connect?: Prisma.BriefWhereUniqueInput | Prisma.BriefWhereUniqueInput[];
    update?: Prisma.BriefUpdateWithWhereUniqueWithoutClientInput | Prisma.BriefUpdateWithWhereUniqueWithoutClientInput[];
    updateMany?: Prisma.BriefUpdateManyWithWhereWithoutClientInput | Prisma.BriefUpdateManyWithWhereWithoutClientInput[];
    deleteMany?: Prisma.BriefScalarWhereInput | Prisma.BriefScalarWhereInput[];
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type BriefCreateWithoutUserInput = {
    id?: string;
    slug: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    status?: string;
    projectName?: string | null;
    primaryGoal?: string | null;
    needBuilt?: string | null;
    targetAudience?: string | null;
    keyFeatures?: string | null;
    avoid?: string | null;
    deadline?: Date | string | null;
    budgetRange?: string | null;
    assetsUrls?: string | null;
    references?: string | null;
    additionalInfo?: string | null;
    client?: Prisma.ClientCreateNestedOneWithoutBriefsInput;
};
export type BriefUncheckedCreateWithoutUserInput = {
    id?: string;
    slug: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    status?: string;
    projectName?: string | null;
    primaryGoal?: string | null;
    needBuilt?: string | null;
    targetAudience?: string | null;
    keyFeatures?: string | null;
    avoid?: string | null;
    deadline?: Date | string | null;
    budgetRange?: string | null;
    assetsUrls?: string | null;
    references?: string | null;
    additionalInfo?: string | null;
    clientId?: string | null;
};
export type BriefCreateOrConnectWithoutUserInput = {
    where: Prisma.BriefWhereUniqueInput;
    create: Prisma.XOR<Prisma.BriefCreateWithoutUserInput, Prisma.BriefUncheckedCreateWithoutUserInput>;
};
export type BriefCreateManyUserInputEnvelope = {
    data: Prisma.BriefCreateManyUserInput | Prisma.BriefCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type BriefUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.BriefWhereUniqueInput;
    update: Prisma.XOR<Prisma.BriefUpdateWithoutUserInput, Prisma.BriefUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.BriefCreateWithoutUserInput, Prisma.BriefUncheckedCreateWithoutUserInput>;
};
export type BriefUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.BriefWhereUniqueInput;
    data: Prisma.XOR<Prisma.BriefUpdateWithoutUserInput, Prisma.BriefUncheckedUpdateWithoutUserInput>;
};
export type BriefUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.BriefScalarWhereInput;
    data: Prisma.XOR<Prisma.BriefUpdateManyMutationInput, Prisma.BriefUncheckedUpdateManyWithoutUserInput>;
};
export type BriefScalarWhereInput = {
    AND?: Prisma.BriefScalarWhereInput | Prisma.BriefScalarWhereInput[];
    OR?: Prisma.BriefScalarWhereInput[];
    NOT?: Prisma.BriefScalarWhereInput | Prisma.BriefScalarWhereInput[];
    id?: Prisma.StringFilter<"Brief"> | string;
    slug?: Prisma.StringFilter<"Brief"> | string;
    name?: Prisma.StringFilter<"Brief"> | string;
    createdAt?: Prisma.DateTimeFilter<"Brief"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Brief"> | Date | string;
    status?: Prisma.StringFilter<"Brief"> | string;
    projectName?: Prisma.StringNullableFilter<"Brief"> | string | null;
    primaryGoal?: Prisma.StringNullableFilter<"Brief"> | string | null;
    needBuilt?: Prisma.StringNullableFilter<"Brief"> | string | null;
    targetAudience?: Prisma.StringNullableFilter<"Brief"> | string | null;
    keyFeatures?: Prisma.StringNullableFilter<"Brief"> | string | null;
    avoid?: Prisma.StringNullableFilter<"Brief"> | string | null;
    deadline?: Prisma.DateTimeNullableFilter<"Brief"> | Date | string | null;
    budgetRange?: Prisma.StringNullableFilter<"Brief"> | string | null;
    assetsUrls?: Prisma.StringNullableFilter<"Brief"> | string | null;
    references?: Prisma.StringNullableFilter<"Brief"> | string | null;
    additionalInfo?: Prisma.StringNullableFilter<"Brief"> | string | null;
    userId?: Prisma.StringFilter<"Brief"> | string;
    clientId?: Prisma.StringNullableFilter<"Brief"> | string | null;
};
export type BriefCreateWithoutClientInput = {
    id?: string;
    slug: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    status?: string;
    projectName?: string | null;
    primaryGoal?: string | null;
    needBuilt?: string | null;
    targetAudience?: string | null;
    keyFeatures?: string | null;
    avoid?: string | null;
    deadline?: Date | string | null;
    budgetRange?: string | null;
    assetsUrls?: string | null;
    references?: string | null;
    additionalInfo?: string | null;
    user: Prisma.UserCreateNestedOneWithoutBriefsInput;
};
export type BriefUncheckedCreateWithoutClientInput = {
    id?: string;
    slug: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    status?: string;
    projectName?: string | null;
    primaryGoal?: string | null;
    needBuilt?: string | null;
    targetAudience?: string | null;
    keyFeatures?: string | null;
    avoid?: string | null;
    deadline?: Date | string | null;
    budgetRange?: string | null;
    assetsUrls?: string | null;
    references?: string | null;
    additionalInfo?: string | null;
    userId: string;
};
export type BriefCreateOrConnectWithoutClientInput = {
    where: Prisma.BriefWhereUniqueInput;
    create: Prisma.XOR<Prisma.BriefCreateWithoutClientInput, Prisma.BriefUncheckedCreateWithoutClientInput>;
};
export type BriefCreateManyClientInputEnvelope = {
    data: Prisma.BriefCreateManyClientInput | Prisma.BriefCreateManyClientInput[];
    skipDuplicates?: boolean;
};
export type BriefUpsertWithWhereUniqueWithoutClientInput = {
    where: Prisma.BriefWhereUniqueInput;
    update: Prisma.XOR<Prisma.BriefUpdateWithoutClientInput, Prisma.BriefUncheckedUpdateWithoutClientInput>;
    create: Prisma.XOR<Prisma.BriefCreateWithoutClientInput, Prisma.BriefUncheckedCreateWithoutClientInput>;
};
export type BriefUpdateWithWhereUniqueWithoutClientInput = {
    where: Prisma.BriefWhereUniqueInput;
    data: Prisma.XOR<Prisma.BriefUpdateWithoutClientInput, Prisma.BriefUncheckedUpdateWithoutClientInput>;
};
export type BriefUpdateManyWithWhereWithoutClientInput = {
    where: Prisma.BriefScalarWhereInput;
    data: Prisma.XOR<Prisma.BriefUpdateManyMutationInput, Prisma.BriefUncheckedUpdateManyWithoutClientInput>;
};
export type BriefCreateManyUserInput = {
    id?: string;
    slug: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    status?: string;
    projectName?: string | null;
    primaryGoal?: string | null;
    needBuilt?: string | null;
    targetAudience?: string | null;
    keyFeatures?: string | null;
    avoid?: string | null;
    deadline?: Date | string | null;
    budgetRange?: string | null;
    assetsUrls?: string | null;
    references?: string | null;
    additionalInfo?: string | null;
    clientId?: string | null;
};
export type BriefUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    projectName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    primaryGoal?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    needBuilt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetAudience?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    keyFeatures?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avoid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgetRange?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetsUrls?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    references?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    additionalInfo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    client?: Prisma.ClientUpdateOneWithoutBriefsNestedInput;
};
export type BriefUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    projectName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    primaryGoal?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    needBuilt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetAudience?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    keyFeatures?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avoid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgetRange?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetsUrls?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    references?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    additionalInfo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clientId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type BriefUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    projectName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    primaryGoal?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    needBuilt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetAudience?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    keyFeatures?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avoid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgetRange?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetsUrls?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    references?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    additionalInfo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clientId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type BriefCreateManyClientInput = {
    id?: string;
    slug: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    status?: string;
    projectName?: string | null;
    primaryGoal?: string | null;
    needBuilt?: string | null;
    targetAudience?: string | null;
    keyFeatures?: string | null;
    avoid?: string | null;
    deadline?: Date | string | null;
    budgetRange?: string | null;
    assetsUrls?: string | null;
    references?: string | null;
    additionalInfo?: string | null;
    userId: string;
};
export type BriefUpdateWithoutClientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    projectName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    primaryGoal?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    needBuilt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetAudience?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    keyFeatures?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avoid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgetRange?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetsUrls?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    references?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    additionalInfo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutBriefsNestedInput;
};
export type BriefUncheckedUpdateWithoutClientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    projectName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    primaryGoal?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    needBuilt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetAudience?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    keyFeatures?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avoid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgetRange?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetsUrls?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    references?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    additionalInfo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type BriefUncheckedUpdateManyWithoutClientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    projectName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    primaryGoal?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    needBuilt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetAudience?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    keyFeatures?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avoid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deadline?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    budgetRange?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetsUrls?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    references?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    additionalInfo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type BriefSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    slug?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    status?: boolean;
    projectName?: boolean;
    primaryGoal?: boolean;
    needBuilt?: boolean;
    targetAudience?: boolean;
    keyFeatures?: boolean;
    avoid?: boolean;
    deadline?: boolean;
    budgetRange?: boolean;
    assetsUrls?: boolean;
    references?: boolean;
    additionalInfo?: boolean;
    userId?: boolean;
    clientId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    client?: boolean | Prisma.Brief$clientArgs<ExtArgs>;
}, ExtArgs["result"]["brief"]>;
export type BriefSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    slug?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    status?: boolean;
    projectName?: boolean;
    primaryGoal?: boolean;
    needBuilt?: boolean;
    targetAudience?: boolean;
    keyFeatures?: boolean;
    avoid?: boolean;
    deadline?: boolean;
    budgetRange?: boolean;
    assetsUrls?: boolean;
    references?: boolean;
    additionalInfo?: boolean;
    userId?: boolean;
    clientId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    client?: boolean | Prisma.Brief$clientArgs<ExtArgs>;
}, ExtArgs["result"]["brief"]>;
export type BriefSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    slug?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    status?: boolean;
    projectName?: boolean;
    primaryGoal?: boolean;
    needBuilt?: boolean;
    targetAudience?: boolean;
    keyFeatures?: boolean;
    avoid?: boolean;
    deadline?: boolean;
    budgetRange?: boolean;
    assetsUrls?: boolean;
    references?: boolean;
    additionalInfo?: boolean;
    userId?: boolean;
    clientId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    client?: boolean | Prisma.Brief$clientArgs<ExtArgs>;
}, ExtArgs["result"]["brief"]>;
export type BriefSelectScalar = {
    id?: boolean;
    slug?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    status?: boolean;
    projectName?: boolean;
    primaryGoal?: boolean;
    needBuilt?: boolean;
    targetAudience?: boolean;
    keyFeatures?: boolean;
    avoid?: boolean;
    deadline?: boolean;
    budgetRange?: boolean;
    assetsUrls?: boolean;
    references?: boolean;
    additionalInfo?: boolean;
    userId?: boolean;
    clientId?: boolean;
};
export type BriefOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "slug" | "name" | "createdAt" | "updatedAt" | "status" | "projectName" | "primaryGoal" | "needBuilt" | "targetAudience" | "keyFeatures" | "avoid" | "deadline" | "budgetRange" | "assetsUrls" | "references" | "additionalInfo" | "userId" | "clientId", ExtArgs["result"]["brief"]>;
export type BriefInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    client?: boolean | Prisma.Brief$clientArgs<ExtArgs>;
};
export type BriefIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    client?: boolean | Prisma.Brief$clientArgs<ExtArgs>;
};
export type BriefIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    client?: boolean | Prisma.Brief$clientArgs<ExtArgs>;
};
export type $BriefPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Brief";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        client: Prisma.$ClientPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        slug: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        projectName: string | null;
        primaryGoal: string | null;
        needBuilt: string | null;
        targetAudience: string | null;
        keyFeatures: string | null;
        avoid: string | null;
        deadline: Date | null;
        budgetRange: string | null;
        assetsUrls: string | null;
        references: string | null;
        additionalInfo: string | null;
        userId: string;
        clientId: string | null;
    }, ExtArgs["result"]["brief"]>;
    composites: {};
};
export type BriefGetPayload<S extends boolean | null | undefined | BriefDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BriefPayload, S>;
export type BriefCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BriefFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BriefCountAggregateInputType | true;
};
export interface BriefDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Brief'];
        meta: {
            name: 'Brief';
        };
    };
    /**
     * Find zero or one Brief that matches the filter.
     * @param {BriefFindUniqueArgs} args - Arguments to find a Brief
     * @example
     * // Get one Brief
     * const brief = await prisma.brief.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BriefFindUniqueArgs>(args: Prisma.SelectSubset<T, BriefFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BriefClient<runtime.Types.Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Brief that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BriefFindUniqueOrThrowArgs} args - Arguments to find a Brief
     * @example
     * // Get one Brief
     * const brief = await prisma.brief.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BriefFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BriefFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BriefClient<runtime.Types.Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Brief that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BriefFindFirstArgs} args - Arguments to find a Brief
     * @example
     * // Get one Brief
     * const brief = await prisma.brief.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BriefFindFirstArgs>(args?: Prisma.SelectSubset<T, BriefFindFirstArgs<ExtArgs>>): Prisma.Prisma__BriefClient<runtime.Types.Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Brief that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BriefFindFirstOrThrowArgs} args - Arguments to find a Brief
     * @example
     * // Get one Brief
     * const brief = await prisma.brief.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BriefFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BriefFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BriefClient<runtime.Types.Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Briefs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BriefFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Briefs
     * const briefs = await prisma.brief.findMany()
     *
     * // Get first 10 Briefs
     * const briefs = await prisma.brief.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const briefWithIdOnly = await prisma.brief.findMany({ select: { id: true } })
     *
     */
    findMany<T extends BriefFindManyArgs>(args?: Prisma.SelectSubset<T, BriefFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Brief.
     * @param {BriefCreateArgs} args - Arguments to create a Brief.
     * @example
     * // Create one Brief
     * const Brief = await prisma.brief.create({
     *   data: {
     *     // ... data to create a Brief
     *   }
     * })
     *
     */
    create<T extends BriefCreateArgs>(args: Prisma.SelectSubset<T, BriefCreateArgs<ExtArgs>>): Prisma.Prisma__BriefClient<runtime.Types.Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Briefs.
     * @param {BriefCreateManyArgs} args - Arguments to create many Briefs.
     * @example
     * // Create many Briefs
     * const brief = await prisma.brief.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends BriefCreateManyArgs>(args?: Prisma.SelectSubset<T, BriefCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Briefs and returns the data saved in the database.
     * @param {BriefCreateManyAndReturnArgs} args - Arguments to create many Briefs.
     * @example
     * // Create many Briefs
     * const brief = await prisma.brief.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Briefs and only return the `id`
     * const briefWithIdOnly = await prisma.brief.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends BriefCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BriefCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Brief.
     * @param {BriefDeleteArgs} args - Arguments to delete one Brief.
     * @example
     * // Delete one Brief
     * const Brief = await prisma.brief.delete({
     *   where: {
     *     // ... filter to delete one Brief
     *   }
     * })
     *
     */
    delete<T extends BriefDeleteArgs>(args: Prisma.SelectSubset<T, BriefDeleteArgs<ExtArgs>>): Prisma.Prisma__BriefClient<runtime.Types.Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Brief.
     * @param {BriefUpdateArgs} args - Arguments to update one Brief.
     * @example
     * // Update one Brief
     * const brief = await prisma.brief.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends BriefUpdateArgs>(args: Prisma.SelectSubset<T, BriefUpdateArgs<ExtArgs>>): Prisma.Prisma__BriefClient<runtime.Types.Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Briefs.
     * @param {BriefDeleteManyArgs} args - Arguments to filter Briefs to delete.
     * @example
     * // Delete a few Briefs
     * const { count } = await prisma.brief.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends BriefDeleteManyArgs>(args?: Prisma.SelectSubset<T, BriefDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Briefs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BriefUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Briefs
     * const brief = await prisma.brief.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends BriefUpdateManyArgs>(args: Prisma.SelectSubset<T, BriefUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Briefs and returns the data updated in the database.
     * @param {BriefUpdateManyAndReturnArgs} args - Arguments to update many Briefs.
     * @example
     * // Update many Briefs
     * const brief = await prisma.brief.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Briefs and only return the `id`
     * const briefWithIdOnly = await prisma.brief.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends BriefUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BriefUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Brief.
     * @param {BriefUpsertArgs} args - Arguments to update or create a Brief.
     * @example
     * // Update or create a Brief
     * const brief = await prisma.brief.upsert({
     *   create: {
     *     // ... data to create a Brief
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Brief we want to update
     *   }
     * })
     */
    upsert<T extends BriefUpsertArgs>(args: Prisma.SelectSubset<T, BriefUpsertArgs<ExtArgs>>): Prisma.Prisma__BriefClient<runtime.Types.Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Briefs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BriefCountArgs} args - Arguments to filter Briefs to count.
     * @example
     * // Count the number of Briefs
     * const count = await prisma.brief.count({
     *   where: {
     *     // ... the filter for the Briefs we want to count
     *   }
     * })
    **/
    count<T extends BriefCountArgs>(args?: Prisma.Subset<T, BriefCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BriefCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Brief.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BriefAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BriefAggregateArgs>(args: Prisma.Subset<T, BriefAggregateArgs>): Prisma.PrismaPromise<GetBriefAggregateType<T>>;
    /**
     * Group by Brief.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BriefGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends BriefGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BriefGroupByArgs['orderBy'];
    } : {
        orderBy?: BriefGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BriefGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBriefGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Brief model
     */
    readonly fields: BriefFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Brief.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__BriefClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    client<T extends Prisma.Brief$clientArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Brief$clientArgs<ExtArgs>>): Prisma.Prisma__ClientClient<runtime.Types.Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Brief model
 */
export interface BriefFieldRefs {
    readonly id: Prisma.FieldRef<"Brief", 'String'>;
    readonly slug: Prisma.FieldRef<"Brief", 'String'>;
    readonly name: Prisma.FieldRef<"Brief", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Brief", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Brief", 'DateTime'>;
    readonly status: Prisma.FieldRef<"Brief", 'String'>;
    readonly projectName: Prisma.FieldRef<"Brief", 'String'>;
    readonly primaryGoal: Prisma.FieldRef<"Brief", 'String'>;
    readonly needBuilt: Prisma.FieldRef<"Brief", 'String'>;
    readonly targetAudience: Prisma.FieldRef<"Brief", 'String'>;
    readonly keyFeatures: Prisma.FieldRef<"Brief", 'String'>;
    readonly avoid: Prisma.FieldRef<"Brief", 'String'>;
    readonly deadline: Prisma.FieldRef<"Brief", 'DateTime'>;
    readonly budgetRange: Prisma.FieldRef<"Brief", 'String'>;
    readonly assetsUrls: Prisma.FieldRef<"Brief", 'String'>;
    readonly references: Prisma.FieldRef<"Brief", 'String'>;
    readonly additionalInfo: Prisma.FieldRef<"Brief", 'String'>;
    readonly userId: Prisma.FieldRef<"Brief", 'String'>;
    readonly clientId: Prisma.FieldRef<"Brief", 'String'>;
}
/**
 * Brief findUnique
 */
export type BriefFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: Prisma.BriefSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Brief
     */
    omit?: Prisma.BriefOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BriefInclude<ExtArgs> | null;
    /**
     * Filter, which Brief to fetch.
     */
    where: Prisma.BriefWhereUniqueInput;
};
/**
 * Brief findUniqueOrThrow
 */
export type BriefFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: Prisma.BriefSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Brief
     */
    omit?: Prisma.BriefOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BriefInclude<ExtArgs> | null;
    /**
     * Filter, which Brief to fetch.
     */
    where: Prisma.BriefWhereUniqueInput;
};
/**
 * Brief findFirst
 */
export type BriefFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: Prisma.BriefSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Brief
     */
    omit?: Prisma.BriefOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BriefInclude<ExtArgs> | null;
    /**
     * Filter, which Brief to fetch.
     */
    where?: Prisma.BriefWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Briefs to fetch.
     */
    orderBy?: Prisma.BriefOrderByWithRelationInput | Prisma.BriefOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Briefs.
     */
    cursor?: Prisma.BriefWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Briefs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Briefs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Briefs.
     */
    distinct?: Prisma.BriefScalarFieldEnum | Prisma.BriefScalarFieldEnum[];
};
/**
 * Brief findFirstOrThrow
 */
export type BriefFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: Prisma.BriefSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Brief
     */
    omit?: Prisma.BriefOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BriefInclude<ExtArgs> | null;
    /**
     * Filter, which Brief to fetch.
     */
    where?: Prisma.BriefWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Briefs to fetch.
     */
    orderBy?: Prisma.BriefOrderByWithRelationInput | Prisma.BriefOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Briefs.
     */
    cursor?: Prisma.BriefWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Briefs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Briefs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Briefs.
     */
    distinct?: Prisma.BriefScalarFieldEnum | Prisma.BriefScalarFieldEnum[];
};
/**
 * Brief findMany
 */
export type BriefFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: Prisma.BriefSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Brief
     */
    omit?: Prisma.BriefOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BriefInclude<ExtArgs> | null;
    /**
     * Filter, which Briefs to fetch.
     */
    where?: Prisma.BriefWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Briefs to fetch.
     */
    orderBy?: Prisma.BriefOrderByWithRelationInput | Prisma.BriefOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Briefs.
     */
    cursor?: Prisma.BriefWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Briefs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Briefs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Briefs.
     */
    distinct?: Prisma.BriefScalarFieldEnum | Prisma.BriefScalarFieldEnum[];
};
/**
 * Brief create
 */
export type BriefCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: Prisma.BriefSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Brief
     */
    omit?: Prisma.BriefOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BriefInclude<ExtArgs> | null;
    /**
     * The data needed to create a Brief.
     */
    data: Prisma.XOR<Prisma.BriefCreateInput, Prisma.BriefUncheckedCreateInput>;
};
/**
 * Brief createMany
 */
export type BriefCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Briefs.
     */
    data: Prisma.BriefCreateManyInput | Prisma.BriefCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Brief createManyAndReturn
 */
export type BriefCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: Prisma.BriefSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Brief
     */
    omit?: Prisma.BriefOmit<ExtArgs> | null;
    /**
     * The data used to create many Briefs.
     */
    data: Prisma.BriefCreateManyInput | Prisma.BriefCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BriefIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Brief update
 */
export type BriefUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: Prisma.BriefSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Brief
     */
    omit?: Prisma.BriefOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BriefInclude<ExtArgs> | null;
    /**
     * The data needed to update a Brief.
     */
    data: Prisma.XOR<Prisma.BriefUpdateInput, Prisma.BriefUncheckedUpdateInput>;
    /**
     * Choose, which Brief to update.
     */
    where: Prisma.BriefWhereUniqueInput;
};
/**
 * Brief updateMany
 */
export type BriefUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Briefs.
     */
    data: Prisma.XOR<Prisma.BriefUpdateManyMutationInput, Prisma.BriefUncheckedUpdateManyInput>;
    /**
     * Filter which Briefs to update
     */
    where?: Prisma.BriefWhereInput;
    /**
     * Limit how many Briefs to update.
     */
    limit?: number;
};
/**
 * Brief updateManyAndReturn
 */
export type BriefUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: Prisma.BriefSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Brief
     */
    omit?: Prisma.BriefOmit<ExtArgs> | null;
    /**
     * The data used to update Briefs.
     */
    data: Prisma.XOR<Prisma.BriefUpdateManyMutationInput, Prisma.BriefUncheckedUpdateManyInput>;
    /**
     * Filter which Briefs to update
     */
    where?: Prisma.BriefWhereInput;
    /**
     * Limit how many Briefs to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BriefIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Brief upsert
 */
export type BriefUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: Prisma.BriefSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Brief
     */
    omit?: Prisma.BriefOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BriefInclude<ExtArgs> | null;
    /**
     * The filter to search for the Brief to update in case it exists.
     */
    where: Prisma.BriefWhereUniqueInput;
    /**
     * In case the Brief found by the `where` argument doesn't exist, create a new Brief with this data.
     */
    create: Prisma.XOR<Prisma.BriefCreateInput, Prisma.BriefUncheckedCreateInput>;
    /**
     * In case the Brief was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.BriefUpdateInput, Prisma.BriefUncheckedUpdateInput>;
};
/**
 * Brief delete
 */
export type BriefDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: Prisma.BriefSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Brief
     */
    omit?: Prisma.BriefOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BriefInclude<ExtArgs> | null;
    /**
     * Filter which Brief to delete.
     */
    where: Prisma.BriefWhereUniqueInput;
};
/**
 * Brief deleteMany
 */
export type BriefDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Briefs to delete
     */
    where?: Prisma.BriefWhereInput;
    /**
     * Limit how many Briefs to delete.
     */
    limit?: number;
};
/**
 * Brief.client
 */
export type Brief$clientArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: Prisma.ClientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Client
     */
    omit?: Prisma.ClientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ClientInclude<ExtArgs> | null;
    where?: Prisma.ClientWhereInput;
};
/**
 * Brief without action
 */
export type BriefDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: Prisma.BriefSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Brief
     */
    omit?: Prisma.BriefOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BriefInclude<ExtArgs> | null;
};
//# sourceMappingURL=Brief.d.ts.map