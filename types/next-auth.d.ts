import "next-auth";

declare module "next-auth" {
	interface User {
		displayName: string;
		gender: string;
		weightClass: string;
		club: string;
	}

	interface Session {
		user: User;
	}
}
