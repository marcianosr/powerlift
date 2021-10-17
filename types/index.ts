export type Member = {
	name: string;
	weightClass: string;
	lifts: {
		squat: {
			weight: string;
			sets: string;
			reps: string;
		};
		benchpress: {
			weight: string;
			sets: string;
			reps: string;
		};
		deadlift: {
			weight: string;
			sets: string;
			reps: string;
		};
		total: string;
	};
};

export type GymData = {
	data: {
		week: string;
		gym: {
			name: string;
			members: Member[];
		};
	};
};

export type Lifts = {
	squat: {
		weight: string | null;
		reps: string | null;
		sets: string | null;
	};
	benchpress: {
		weight: string | null;
		reps: string | null;
		sets: string | null;
	};
	deadlift: {
		weight: string | null;
		reps: string | null;
		sets: string | null;
	};
};

export type UserResponse = {
	data: Array<User>;
};

export type User = {
	_id: string;
	email: string;
	displayName: string;
	weightClass: string;
	club: string;
	gender: string;
	lifts: Lifts;
	date: any;
};
