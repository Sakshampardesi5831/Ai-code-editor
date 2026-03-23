import { QueryCtx, MutationCtx } from './_generated/server.d';
export const verifyAuth = async (ctx:QueryCtx | MutationCtx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    return identity;
}