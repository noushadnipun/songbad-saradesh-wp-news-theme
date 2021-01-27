var dayOffset = 2;
var month_names = {
	'bn':{
		1:'জানুয়ারি',
		2:'ফেব্রুয়ারি',
		3:'মার্চ',
		4:'এপ্রিল',
		5:'মে',
		6:'জুন',
		7:'জুলাই',
		8:'আগস্ট',
		9:'সেপ্টেম্বর',
		10:'অক্টোবর',
		11:'নভেম্বর',
		12:'ডিসেম্বর'
		},
	'en':{
		1:'January',
		2:'February',
		3:'March',
		4:'April',
		5:'May',
		6:'June',
		7:'July',
		8:'August',
		9:'September',
		10:'October',
		11:'November',
		12:'December'
		}
	};
	
var mDays = new Array(13);
	mDays[1] = 31;
	mDays[2] = 29;
	mDays[3] = 31;
	mDays[4] = 30;
	mDays[5] = 31;
	mDays[6] = 30;
	mDays[7] = 31;
	mDays[8] = 31;
	mDays[9] = 30;
	mDays[10] = 31;
	mDays[11] = 30;
	mDays[12] = 31;

var bDays = new Array(11);
	bDays[0] = '০';
	bDays[1] = '১';
	bDays[2] = '২';
	bDays[3] = '৩';
	bDays[4] = '৪';
	bDays[5] = '৫';
	bDays[6] = '৬';
	bDays[7] = '৭';
	bDays[8] = '৮';
	bDays[9] = '৯';

function banglaNumber(v){
	//IE7 FIX, IE7 does not index string
	v = v.toString();
	v = v.split("");
	var bangla = "";
	$(v).each(function(index, element) {
		if(parseInt(element)>=0 && parseInt(element)<=9)
			bangla += bDays[element];
		else
			bangla += element;
		});
	return bangla;
	}

function languageNumber(v,l){
	if( l == 'bn' ){
		return banglaNumber(v);
		}
	else{
		return v;
		}
	}

//IE 8 and 7 FIX
/**Parses string formatted as YYYY-MM-DD to a Date object.
 * If the supplied string does not match the format, an 
 * invalid Date (value NaN) is returned.
 * @param {string} dateStringInRange format YYYY-MM-DD, with year in
 * range of 0000-9999, inclusive.
 * @return {Date} Date object representing the string.
 */
function parseISO8601(dateStringInRange) {
	var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,
		date = new Date(NaN), month,
		parts = isoExp.exec(dateStringInRange);

	if(parts) {
		month = +parts[2];
		date.setFullYear(parts[1], month - 1, parts[3]);
		if(month != date.getMonth() + 1){
			date.setTime(NaN);
			}
		}
	return date;
	}



var js_calender = function(st){	
		var ths = new Object;
		
		ths.container = st.container?st.container:'';
		ths.language = st.language?st.language:'en';
		ths.lowest_year = st.lowest_year?st.lowest_year:'2005';
		ths.current_date = st.current_date?st.current_date:'';
		ths.last_date = st.last_date?st.last_date:'';
		ths.url_prefix = st.url_prefix?st.url_prefix:'';
		ths.url_postfix = st.url_postfix?st.url_postfix:'';	
		ths.delimeter = st.delimeter?st.delimeter:'-';	
		
		ths.afterresizeinterval = null;
		
		ths.init = function(){
			
			var total_width = $(ths.container).parent().width() - 1;
			
			var each_cell_width = parseInt(total_width / 7);
			ths.fixed_cell_width = each_cell_width - 3;
			
			$(ths.container + " .dayZone dt").width(ths.fixed_cell_width);
			$(ths.container + " .dayZone dt").height(ths.fixed_cell_width);
			$(ths.container + " .dayZone dt").css('line-height',ths.fixed_cell_width + "px");
			
			$(ths.container).width((each_cell_width*7) + 1);
			ths.calenderRender('init');
			
			$(ths.container + " .yearSelector").change(ths.YearcalenderRender)
			$(ths.container + " .monthSelector").change(ths.MonthcalenderRender);
			$(ths.container + " .editionType span").click(ths.EditioncalenderRender);
			
			}
		
		ths.YearcalenderRender = function(){
			ths.calenderRender('year');
			}
		ths.MonthcalenderRender = function(){
			ths.calenderRender('month');
			}
		ths.EditioncalenderRender = function(){
			$(ths.container + " .editionType span").removeClass('active');
			$(this).addClass('active');
			ths.calenderRender('edition');
		}
		ths.calenderRender = function(status){
			var month;
			var year;
			var last_month;
			var last_year;
			var d_last = new Date(parseISO8601(ths.last_date));
			var d = new Date(parseISO8601(ths.current_date));
			var d_lowest = new Date(parseISO8601(ths.lowest_year));

			if( status == 'init' ){
				last_month = d_last.getMonth();
				last_year = d_last.getFullYear();
				month = d.getMonth();
				year = d.getFullYear();
				
				if( d > d_last ){
					month = last_month;
					year = last_year;
					}
				
				$(ths.container + " .calendarTop .monthSelector").html("");
				
				if(d_last.getFullYear() == d.getFullYear()){
					for(i=1;i<=d_last.getMonth()+1;i++){
						$(ths.container + " .calendarTop .monthSelector").append("<option value="+i+">"+ month_names[ths.language][i] +"</option>");
						}
					}
				else if(d_lowest.getFullYear() == d.getFullYear()){
					for(i=d_lowest.getMonth()+1;i<=12;i++){
						$(ths.container + " .calendarTop .monthSelector").append("<option value="+i+">"+ month_names[ths.language][i] +"</option>");
						}
					}
				else{
					for(i=1;i<=12;i++){
						$(ths.container + " .calendarTop .monthSelector").append("<option value="+i+">"+ month_names[ths.language][i] +"</option>");
						}
					}
				
				$(ths.container + " .calendarTop .yearSelector").html("");
				for(i=d_lowest.getFullYear();i<=d_last.getFullYear();i++){
					var bang_year = languageNumber(i,ths.language);
					$(ths.container + " .calendarTop .yearSelector").append("<option value="+i+">"+ bang_year +"</option>");
					}
				
				$(ths.container + " .monthSelector").val(month+1);
				$(ths.container + " .yearSelector").val(year);

				}
			else if( status == 'year' || status == 'init' ){
				$(ths.container + " .calendarTop .monthSelector").html("");
				//var d_last = new Date(parseISO8601(ths.last_date));
				
				if(d_last.getFullYear() == $(ths.container + " .yearSelector").val()){
					for(i=1;i<=d_last.getMonth()+1;i++){
						$(ths.container + " .calendarTop .monthSelector").append("<option value="+i+">"+ month_names[ths.language][i] +"</option>");
						}
					}
				else if(d_lowest.getFullYear() == $(ths.container + " .yearSelector").val()){
					for(i=d_lowest.getMonth()+1;i<=12;i++){
						$(ths.container + " .calendarTop .monthSelector").append("<option value="+i+">"+ month_names[ths.language][i] +"</option>");
						}
					}
				else{
					for(i=1;i<=12;i++){
						$(ths.container + " .calendarTop .monthSelector").append("<option value="+i+">"+ month_names[ths.language][i] +"</option>");
						}
					}
				}

				/*$(ths.container + " .calendarTop .monthSelector").prepend("<option>aa</option>");
				$(ths.container + " .calendarTop .yearSelector").prepend("<option>aa</option>");*/
			
			month = $(ths.container + " .monthSelector").val();
			year = $(ths.container + " .yearSelector").val();			
			
			tmpD = new Date(year,month-1,1);
			var startDay = tmpD.getDay()+dayOffset;
			
			var tDays = mDays[month];
			
			if( year % 4 && month == 2 ){
				tDays = 28;
				}
			
			if( startDay > 7 ){
				startDay = startDay % 7;
				}
			
			$(ths.container + " .dayHolder").html(ths.jFillDay(tDays,startDay,year,month));
			$(ths.container + " .dayZone dd, " + ths.container + " .dateZone dd, " + ths.container + " .dateZone dt, " + ths.container + " .dateZone a").width(ths.fixed_cell_width);
			$(ths.container + " .dayZone dd, " + ths.container + " .dateZone dd, " + ths.container + " .dateZone dt, " + ths.container + " .dateZone a").height(ths.fixed_cell_width);
			$(ths.container + " .dayZone dd, " + ths.container + " .dateZone dd, " + ths.container + " .dateZone dt, " + ths.container + " .dateZone a").css('line-height',ths.fixed_cell_width + "px");
			
		}
		
		ths.jFillDay = function(month_length,startDay,y,m){
			
			var day = 1
			var tBox = 42;
			var html = "";
			//var curDate = new Date(parseISO8601(__jwArchiveDate));
			var curDate = new Date(parseISO8601(ths.current_date));
			var d_lowest = new Date(parseISO8601(ths.lowest_year));
			//last published date will be archived too, purpose will not server if arvhived date
			//var lDate = new Date(); //new Date(__jwLastPublishedDate);
			var lDate = new Date(parseISO8601(ths.last_date));
			var d = y + "-" + ( m < 10 ? '0' : '' ) + m + "-";
			// pad boxs
			for (var i=1;i<startDay;i++){	
				html += '<dd><a href="javascript:" class="blank_day disabled">&nbsp;</a></dd>';
				tBox--;
				}
			
			// fill days
			tmp2 = new Date(parseISO8601(d + "01"));

			if(d_lowest.getFullYear() == y && d_lowest.getMonth()+1 == m){
				while(day < d_lowest.getDate()) {
					t = ( day < 10 ? '0' : '' ) + day;
					html += '<dd><a href="javascript:" class="disabled">'+languageNumber(t,ths.language)+'</a></dd>';
					day++
					tBox--;
					}
				}
			
			edition = $(ths.container + " .editionType .active").data('val');

			while( day <= month_length && ( tmp2.getFullYear() == lDate.getFullYear() && tmp2.getMonth() <= lDate.getMonth() || tmp2.getFullYear() < lDate.getFullYear() ) ){
				t = ( day < 10 ? '0' : '' ) + day;
				tmp = d + t;
				
				tmp2 = new Date(parseISO8601(tmp));
				if( tmp2.getFullYear() == lDate.getFullYear() && tmp2.getMonth() == lDate.getMonth() && lDate.getDate() < tmp2.getDate() ) break;
				
				classs = '';
				if( tmp2.getFullYear() == curDate.getFullYear() && tmp2.getMonth() == curDate.getMonth() && curDate.getDate() == tmp2.getDate() ) classs = "active";
				
				html += '<dd><a href="' + ths.url_prefix + (edition?edition+'/':'') + tmp.replace(/(-)/g, ths.delimeter) + ths.url_postfix + '" class="' + classs + '">' + languageNumber(t,ths.language) + '</a></dd>';
				day++
				tBox--;
				}
				
			// fill disabled days
			
			while(day <= month_length) {
				t = ( day < 10 ? '0' : '' ) + day;
				html += '<dd><a href="javascript:" class="disabled">'+languageNumber(t,ths.language)+'</a></dd>';
				day++
				tBox--;
				}
			
			
			//remaining box
			/*while(tBox){
				html += '<dd><a href="javascript:" class="disabled">&nbsp;</a></dd>';
				tBox--;
				}*/
			return html;
			}
		
		
		ths.resizeinit = function(){
			if( !ths.afterresizeinterval ) return;
			clearInterval(ths.afterresizeinterval);
			ths.init();
			}
		ths.resize_event = function(){
			clearInterval(ths.afterresizeinterval);
			ths.afterresizeinterval = setInterval(ths.resizeinit,500);
			}
			
		ths.afterresizeinterval = setInterval(ths.resizeinit,100);
			
		$(window).resize(ths.resize_event);
	}