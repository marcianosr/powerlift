import "next-auth";

declare module "next-auth" {
	interface User {
		displayName: string;
	}

	interface Session {
		user: User;
	}
}
