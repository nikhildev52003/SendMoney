import zod from "zod";

export const signupBody = zod.object({
  username: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
  password: zod.string().min(6, "Password must be at least 6 characters long"),
});
export const signinBody = zod.object({
  username: zod.string(),
  password: zod.string().min(6, "Password must be at least 6 characters long"),
});
 export const updateBody = zod.object({
  password: zod.string().optional(),
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
});
export const finduserBody = zod.object({
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
  username: zod.string().optional(),
});