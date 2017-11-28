import moment from "moment";

export default function(time) {
	return moment(time).format("D MMMM YYYY");
}
