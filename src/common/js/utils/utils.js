/*
 * @Author: fengchaoran 
 * @Date: 2018-12-28 10:33:52 
 * @Last Modified by: fengchaoran
 * @Last Modified time: 2019-02-22 10:14:07
 */
import moment from "moment";
/**
 * 遍历返回数据，动态next()第一个满足条件的路由
 * @param {需要遍历的对象数组} data 
 * @param {返回数据location代表位置} location 
 */
export function getFirstChild(data, location) {
  for (let item of data) {
    if (item.location == location && item.url)
      return item
    else {
      if (item.children && item.children.length) {
        return getFirstChild(item.children, location)
      }
    }
  }
}
/**
 * 获取指定日期所在周的周一和周日
 */
export function getMondaySunday(date) {
  let now = date;
  let nowTime = now.getTime();
  let day = now.getDay();
  let oneDayTime = 24 * 60 * 60 * 1000;
  let MondayTime = nowTime - (day - 1) * oneDayTime;//显示周一
  let SundayTime = nowTime + (7 - day) * oneDayTime;//显示周日
  return {
    MondayTime,
    SundayTime
  }
}
/**
 * 获取指定日期所在周的周二
 * element-ui周插件,修改日期样式后，周插件获取的是周二的日期，回写时，需要提供周二的日期date格式
 */
export function getWeekDay(date) {
  let now = date;
  let nowTime = now.getTime();
  let day = now.getDay();
  let oneDayTime = 24 * 60 * 60 * 1000;
  let MondayTime = new Date(nowTime - (day - 1) * oneDayTime);//显示周一
  MondayTime.setTime(MondayTime.getTime() + oneDayTime);
  let Tuesday = MondayTime;
  return Tuesday
}

/**
 * 获取上一个月
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
export function getPreMonth(date) {
  var arr = date.split('-');
  var year = arr[0]; //获取当前日期的年份
  var month = arr[1]; //获取当前日期的月份
  var day = arr[2]; //获取当前日期的日
  var days = new Date(year, month, 0);
  days = days.getDate(); //获取当前日期中月的天数
  var year2 = year;
  var month2 = parseInt(month) - 1;
  if (month2 == 0) {
    year2 = parseInt(year2) - 1;
    month2 = 12;
  }
  var day2 = day;
  var days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  if (day2 > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }
  var t2 = year2 + '-' + month2 + '-' + day2;
  return t2;
}
/**
 * 获取下一个月
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
export function getNextMonth(date) {
  var arr = date.split('-');
  var year = arr[0]; //获取当前日期的年份
  var month = arr[1]; //获取当前日期的月份
  var day = arr[2]; //获取当前日期的日
  var days = new Date(year, month, 0);
  days = days.getDate(); //获取当前日期中的月的天数
  var year2 = year;
  var month2 = parseInt(month) + 1;
  if (month2 == 13) {
    year2 = parseInt(year2) + 1;
    month2 = 1;
  }
  var day2 = day;
  var days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  if (day2 > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }
  // var t2 = year2 + '-' + month2 + '-' + day2;
  var t2 = year2 + '-' + month2;
  return t2;
}

/**
 * 获取年份月份
 */
export function getYearMonth(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" + month : month);
  return (year.toString() + '-' + month.toString());
}

export function getMonthArea(arrDate) {
  let currentDate = new Date();
  let currentDateN = new Date();
  return {
    from:currentDate.setDate(currentDate.getMonth()+arrDate[0]),
    to:currentDateN.setDate(currentDateN.getMonth()+arrDate[0])
  }
}

/**
 * 处理散点图的数据，获取最大值和最小值
 */
export function getScatterMaxMin(data) {
  return {
    max: Math.max.apply(null, data),
    min: Math.min.apply(null, data)
  }
}
/**
 * 散点图数据映射算法
 * oldMax/oldMin原始数据最大值最小值
 * newMax/min 映射区间最大值最小值
 */
export function normalizeData(data, oldMax, oldMin, newMax, newMin) {
  return (((newMax - newMin) / (oldMax - oldMin)) * (data - oldMin)) + newMin
}

/**
 * 获取+-n天的日期(*7适用于周的控件)
 */
export function getWeekDate(day) {
  let date1 = new Date();
  let date2 = new Date(date1);
  date2.setDate(date1.getDate() + day * 7); //*7代表一周
  let time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
  return time2;
}
export function getConfigCondition(key) {
  let condition = window.ConditionConfig.ProgramEffect[key];
  //动态配置
  if (condition.DataType == "dynamic") {
    return {
      MondayTime: moment(
        getMondaySunday(
          new Date(getWeekDate(parseInt(condition.dynamicDate)))
        ).MondayTime
      ).format("YYYY-MM-DD"),
      SundayTime: moment(
        getMondaySunday(
          new Date(getWeekDate(parseInt(condition.dynamicDate)))
        ).SundayTime
      ).format("YYYY-MM-DD"),
      defaultType: condition.defaultType
    };
  } else
    return {
      MondayTime: condition.staticDate[0],
      SundayTime: condition.staticDate[1],
      defaultType: condition.defaultType
    };
}


function getAttr(obj, itemName, result) {
  // console.log(Object.keys(obj).length)
  for (let key in obj) {
    if (typeof obj[key] == "object") {
      if (key == itemName) {
        result = obj[key];
        return result
      }
      else
        return getAttr(obj[key], itemName,result)
    }
    else
      continue
  }
}
