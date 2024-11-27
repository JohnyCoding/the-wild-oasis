import supabase from "./supabase";

import { TableFilter, TableSortBy, UpdateBookingInfo } from "../types/types";
import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";

export async function getBookings({ filter, sortBy, page }: { filter: TableFilter; sortBy: TableSortBy; page: number }) {
	let query = supabase
		.from("bookings")
		.select("id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice , cabins(name), guests(fullName, email)", {
			count: "exact",
		});

	if (filter) query = query.eq(filter.field, filter.value);

	if (sortBy) query = query.order(sortBy.field, { ascending: sortBy.direction === "asc" });

	if (page) {
		const from = (page - 1) * PAGE_SIZE;
		const to = from + PAGE_SIZE - 1;
		query = query.range(from, to);
	}

	const { data, error, count } = await query;

	if (error) {
		console.error(error);
		throw new Error("Bookings could not be loaded");
	}

	return { data, count };
}

export async function getBooking(id: number) {
	const { data, error } = await supabase.from("bookings").select("*, cabins(*), guests(*)").eq("id", id).single();

	if (error) {
		console.error(error);
		throw new Error("Booking not found");
	}

	return data;
}

export async function getBookingsAfterDate(date: string) {
	const { data, error } = await supabase
		.from("bookings")
		.select("created_at, totalPrice, extrasPrice")
		.gte("created_at", date)
		.lte("created_at", getToday({ end: true }));

	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}

	return data;
}

export async function getStaysAfterDate(date: string) {
	const { data, error } = await supabase.from("bookings").select("*, guests(fullName)").gte("startDate", date).lte("startDate", getToday());

	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}
	return data;
}

export async function getStaysTodayActivity() {
	const { data, error } = await supabase
		.from("bookings")
		.select("*, guests(fullName, nationality, countryFlag)")
		.or(`and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`)
		.order("created_at");

	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}
	return data;
}

export async function updateBooking(id: number, obj: UpdateBookingInfo) {
	const { data, error } = await supabase.from("bookings").update(obj).eq("id", id).select().single();

	if (error) {
		console.error(error);
		throw new Error("Booking could not be updated");
	}
	return data;
}

export async function deleteBooking(id: number) {
	const { data, error } = await supabase.from("bookings").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Booking could not be deleted");
	}
	return data;
}
