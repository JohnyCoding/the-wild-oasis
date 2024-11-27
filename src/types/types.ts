export type SettingsInfo = {
	id: number;
	createdAt: string;
	minBookingLength: number;
	maxBookingLength: number;
	maxGuestsPerBooking: number;
	breakfastPrice: number;
};

export type UpdateSettingsValues = {
	minBookingLength?: number;
	maxBookingLength?: number;
	maxGuestsPerBooking?: number;
	breakfastPrice?: number;
};

export type CabinInfo = {
	id: number;
	createdAt: string;
	name: string;
	maxCapacity: number;
	regularPrice: number;
	discount: number;
	description: string;
	image: string;
};

export type CabinFormValues = {
	name: string;
	maxCapacity: number;
	regularPrice: number;
	discount: number;
	description: string;
	image: string | File;
};

export type BookingPricesInfo = {
	created_at: string;
	totalPrice: number;
	extrasPrice: number;
};

export type BookingInfo = {
	id: number;
	created_at: string;
	startDate: string;
	endDate: string;
	numNights: number;
	numGuests: number;
	status: string;
	totalPrice: number;
	cabins: { name: string };
	guests: { email: string; fullName: string };
};

export type BreakfastInfo = {
	hasBreakfast?: boolean;
	extrasPrice?: number;
	totalPrice?: number;
};

export type UpdateBookingInfo = {
	status?: string;
	isPaid?: boolean;
	breakfast?: BreakfastInfo;
};

export type TableFilter = {
	field: string;
	value: string;
} | null;

export type TableSortBy = {
	field: string;
	direction: string;
};

export type StayInfo = {
	cabinId: number | null;
	cabinPrice: number | null;
	created_at: string | null;
	endDate: string | null;
	extrasPrice: number | null;
	guestId: number | null;
	guests: {
		fullName: string | null;
	} | null;
	hasBreakfast: boolean | null;
	id: number | null;
	isPaid: boolean | null;
	numGuests: number | null;
	numNights: number | null;
	observations: string | null;
	startDate: string | null;
	status: string | null;
	totalPrice: number | null;
};

export type TodayActivityInfo = {
	cabinId: number | null;
	cabinPrice: number | null;
	created_at: string | null;
	endDate: string | null;
	extrasPrice: number | null;
	guestId: number | null;
	guests: {
		countryFlag: string | null;
		fullName: string | null;
		nationality: string | null;
	} | null;
	hasBreakfast: boolean | null;
	id: number | null;
	isPaid: boolean | null;
	numGuests: number | null;
	numNights: number | null;
	observations: string | null;
	startDate: string | null;
	status: string | null;
	totalPrice: number | null;
};

export interface BookingDataBoxInfo {
	id: number | null;
	created_at: string | null;
	startDate: string | null;
	endDate: string | null;
	numNights: number | null;
	numGuests: number | null;
	cabinPrice: number | null;
	extrasPrice: number | null;
	totalPrice: number | null;
	status: string | null;
	hasBreakfast: boolean | null;
	isPaid: boolean | null;
	observations: string | null;
	cabinId: number | null;
	guestId: number | null;
	cabins: {
		id: number | null;
		name: string | null;
		image: string | null;
		discount: number | null;
		created_at: string | null;
		description: string | null;
		maxCapacity: number | null;
		regularPrice: number | null;
	} | null;
	guests: {
		id: number | null;
		email: string | null;
		fullName: string | null;
		created_at: string | null;
		nationalID: string | null;
		countryFlag: string | null;
		nationality: string | null;
	} | null;
}

export type BookingTableInfo = {
	id: number;
	created_at: string;
	startDate: string | null;
	endDate: string | null;
	numNights: number | null;
	numGuests: number | null;
	status: string | null;
	totalPrice: number | null;
	cabins: {
		name: string | null;
	} | null;
	guests: {
		email: string | null;
		fullName: string | null;
	} | null;
};
