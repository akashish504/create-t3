import { string, z } from "zod";
// import { faker } from '@faker-js/faker';
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter =  createTRPCRouter({
	signUp: publicProcedure
		.input(z.object({
			name: z.string().min(1),
			email: z.string().email(),
			password: z.string().min(6),
		}))
		.mutation(async ({ ctx,input }) => {
			console.log('input', input);

			const user = await ctx.db.user.findFirst({
				where: {
					email: input.email,
				},
			});

			if (user) {
				return {
					"error": `User already exists}`,
				};
			}

			return ctx.db.user.create({
				data: {
					name: input.name,
					email: input.email,
					password: input.password,
				},
			});
		}),

	verify: publicProcedure
		.input(z.object({
			email: z.string().email(),
			otp: z.coerce.number(),
		}))
		.mutation(async ({ ctx, input }) => {
			
            const user = await ctx.db.user.findFirst({
				where: {
					email: input.email || "abc@gmail.com",
				},
			});

			if (!user) {
				return {
					"error": `User does not exists, retry again`,
				};
			}

            await ctx.db.user.update({
                where: {
                    email: input.email || "abc@gmail.com",
                },
                data: {
                    isVerified: true,
                },
            });

            return {
                "Success": "user authenticated successfully"
            }

        }),

	// signIn: publicProcedure
    //     .input(z.object({
    //         email: z.string().email(),
    //         password: z.string(),
    //     }))
	// 	.mutation(({ ctx, input }) => {
    //         const user = ctx.db.user.findFirst({
    //             where: {
	// 				email: input.email,
	// 			},
	// 		});
    //         if (!user){
    //             return {
    //                 "error": `User does not exists, retry again`,
    //             };
    //         }
    //         if (user.password != input.password){
    //             return {
    //                 "error": `Invalid password, retry again`,
    //             };
    //         }
    //         //user some user authenciation logic, maybe jwt
	// 		return {
    //             "Success": "user authenticated successfully"
    //         }
	// 	}),	
    categories: publicProcedure
        .query(async ({ ctx,input }) => {

            // need to add some pagination logic with input and page number

            return ctx.db.product.findMany();
        }),
})