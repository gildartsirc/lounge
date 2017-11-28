import moment from "moment";
import constants from "../../constants";

export default function(time) {
	const options = require("../../options");
	const format = options.showSeconds ? constants.timeFormats.msgWithSeconds : constants.timeFormats.msgDefault;
	return moment(time).format(format);
}
