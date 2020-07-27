package com.revature.DataService.util;

import java.sql.Date;

public class Dates {

	public static Date getToday() {
		return new Date(System.currentTimeMillis());
	}
	
	public static Date getTomorrow() {
		return new Date(getToday().getTime() + 86400000L);
	}
	
	public static Date getOneMonthFromToday() {
		return new Date(getToday().getTime() + 2629800000L);
	}
	
	public static Date getOneMonthAndOneDayFromToday() {
		return new Date(getToday().getTime() + 2716200000L);
	}
	
	public static Date getThreeMonthsFromToday() {
		return new Date(getToday().getTime() + 7889400000L);
	}	
	
	public static Date calcPotentialFutureEndDate(int numWeeks) {
		long weekInMillis = 604800000L;
		long dayInMillis = 86400000L;
		long threeDays = dayInMillis * 3;
		long duration = weekInMillis * numWeeks;
		return new Date(getToday().getTime() + (duration - threeDays));
	}
}
