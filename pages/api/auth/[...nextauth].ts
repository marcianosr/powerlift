// Collection of auth routes which the next auth lib should handle

import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../lib/auth";
import { connect } from "../../../lib/db";

export default NextAuth({
	session: {
		jwt: true,
	},
	callbacks: {
		async jwt(token, profile) {
			// Explicitly pass the fields you want to expose to the session on the client.
			if (profile) {
				token.displayName = profile.displayName;
				token.gender = profile.gender;
				token.club = profile.club;
				token.weightClass = profile.weightClass;
			}

			return token;
		},
		async session(session, userOrToken) {
			// console.log("session", session);
			session.user.displayName = userOrToken.displayName;
			session.user.gender = userOrToken.gender;
			session.user.club = userOrToken.club;
			session.user.weightClass = userOrToken.weightClass;

			return session;
		},
	},
	providers: [
		Providers.Credentials({
			// Next js will call this when it receives an incoming request
			async authorize(credentials) {
				const client = await connect();

				const usersCollection = client.db().collection("users");
				const user = await usersCollection.findOne({
					email: credentials.email,
				});

				if (!user) {
					client.close();

					throw new Error("User not found.");
				}

				const isValid = await verifyPassword(
					credentials.password,
					user.password
				);

				if (!isValid) {
					client.close();

					throw new Error("Can't log in");
				}
				client.close();

				// prepare JWT:
				// Return an object to let next auth know the auth succeeded.
				// Don't return the user, or else the password is returned, so we only return the required fields
				// This object will be encoded in JWT
				return {
					email: user.email,
					displayName: user.displayName,
					gender: user.gender,
					club: user.club,
					weightClass: user.weightClass,
				};
			},
		}),
	],
});
