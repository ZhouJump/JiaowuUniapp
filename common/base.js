const baseUrl = 'http://edu.zhoujump.club/jwglxt/' //公网环境

//const baseUrl = 'http://192.168.1.138/jwglxt/' //寝室内网环境

//const baseUrl = 'http://172.19.119.8:8080/jwglxt/' //校园网环境

const startWeek = 8 //本学期起始周数

function getWeekInYear() {
    var endDate = new Date(),
        curYear = endDate.getFullYear(),
        startDate = new Date(curYear, 0, 1);

    var startWeek = startDate.getDay(), // 1月1号是星期几:0-6
        offsetWeek = 0; //用来计算不完整的第一周，如果1月1号为星期一则为0，否则为1

    if (startWeek != 1) {
        offsetWeek = 1;
        if (!startWeek) {
            startDate.setDate(1);
        } else {
            startDate.setDate(8 - startWeek); // (7 - startWeek + 1)
        }

    }
    var distanceTimestamp = endDate - startDate,
        days = Math.ceil(distanceTimestamp / (24 * 60 * 60 * 1000)) + startWeek,
        weeks = Math.ceil(days / 7) + offsetWeek;
    return weeks;
}

function getWeek()
{
	return "7123456".charAt(new Date().getDay());alert(str);
}

export default {
	baseUrl,
	getWeekInYear,
	getWeek,
	startWeek
}