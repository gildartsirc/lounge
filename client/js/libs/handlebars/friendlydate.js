import moment from "moment";

export default function(time) {
	// See http://momentjs.com/docs/#/displaying/calendar-time/
	return moment(time).calendar(null, {
		sameDay: "[Today]",
		lastDay: "[Yesterday]",
		lastWeek: "D MMMM YYYY",
		sameElse: "D MMMM YYYY",
	});
}
