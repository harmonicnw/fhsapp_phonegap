function checkDay(){var a=new Date,b=a.getDay(),c=["no school","an A/B day","an A day","a B day","an A day","a B day","no school"];$(".dayticker").html("Today is: "+c[b])}function setSchedule(){var a=new Date,b=a.getDay(),c=["bsmonAB.png","bsmonAB.png","bstueA.png","bswedB.png","bsthuA.png","bsfriB.png","bsmonAB.png"];$(".scheduleholder").html("<img src='Images/"+c[b]+"' class='schedulepicture'>")}function ajaxFeed(a,b){$.ajax({url:a,dataType:"jsonp",type:"get",success:function(a){b(a)},error:function(){}})}function getUserData(){var a=JSON.parse(localStorage.getItem("userData"));return a&&a.hasOwnProperty("feeds")?a:!1}function showLoader(){$("#dContent").empty().append(LoadWB),LoadWB.css({"margin-top":"50px","margin-left":($(".over").width()-LoadWB.width())/2+"px"})}function setTitle(a){var b=20;a.length>b&&(a=a.slice(0,b)+"&hellip;"),$("#topTitle").html(a)}function makeQueryUrlString(a){for(var b="?catids=",c=0;c<a.length;c++)c>0&&(b+=","),b+=a[c];return b}function setAppHeight(){setTimeout(function(){var a=window.innerHeight;$(".wrapper").css("height",a+"px"),$(".under").css("height",a+"px"),$(".over").css("height",a+"px"),$("body").css("height",a+"px"),isSlid===!0&&$(".over").css({left:.7*$(document).width()+"px"})},250)}function initializeHide(){$(".ans .content").hide(),$(".ans .title").toggle(function(){isSlid||($(".ans .content:visible").slideUp(750),$(this).next(".content").slideDown(750))},function(){isSlid||($(this).next(".content").slideUp(750),annHide=$(this).next(".content"),setTimeout(function(){annHide.stop(!0,!0).hide()},740))})}function initializeL2Hide(){$(".L2").hide(),$(".L1 h1").toggle(function(){L2isSlid||$(this).next(".L2").slideDown(750)},function(){L3isSlid||($(this).next(".L2").slideUp(750),annHide=$(this).next(".L2"),setTimeout(function(){annHide.stop(!0,!0).hide()},740))})}function initializeL3Hide(){$(".L3").hide(),$(".L2 h2").toggle(function(){L3isSlid||$(this).next(".L3").slideDown(750)},function(){L3isSlid||($(this).next(".L3").slideUp(750),annHide=$(this).next(".L3"),setTimeout(function(){annHide.stop(!0,!0).hide()},740))})}function makelogoimage(){x=6>time?"Images/nighttime.png":8>time?"Images/sunrise.png":18>time?"Images/daytime.png":20>time?"Images/sunset.png":"Images/nighttime.png",$("#logo").append("<img src='"+x+"' class='timelogofull' /> ")}function initializeSlideoutHide(){$(".under .acontent").hide(),$(".under .atitle").toggle(function(){$(this).next(".acontent").slideDown(750),$(this).removeClass("closed"),$(this).addClass("open")},function(){$(this).next(".acontent").slideUp(750),annHide=$(this).next(".acontent"),setTimeout(function(){annHide.stop(!0,!0).hide()},740),$(this).removeClass("open"),$(this).addClass("closed")}),$(".under .dd .atitle").addClass("closed")}function initializeEasyCheck(){$(".bottom").each(function(){var a=$(this).find("input");$(this).click(function(){a.is(":checked")?a.prop("checked",!1):a.prop("checked","checked"),updateUserDataFromSettings()})})}function fhsIndex(){console.log("fhsIndex: check it?"),userData=getUserData(),userData&&userData.hasOwnProperty("feeds")&&userData.feeds.length>0?(loadFeedList(userData.feeds),loadAnnouncements(userData.feeds,"Your Announcements")):loadHowTo()}function loadAnnouncements(a,b){showLoader(),slideLeft2(),feedData.entries=[];var c=makeQueryUrlString(a),d=annoQueryUrl+c;ajaxFeed(d,addAnnouncements),setTitle(b),$("#dContent").find("a").each(function(){$(this).click(function(a){window.open(encodeURI($(this).attr("href")),"_system"),a.preventDefault()})})}function addAnnouncements(a){for(var b=0;b<a.feed.entries.length;b++){for(var c=!1,d=0;d<feedData.entries.length;d++)feedData.entries[d].id==a.feed.entries[b].id&&(c=!0);c||feedData.entries.push(a.feed.entries[b])}displayAnnouncements(sortAnnouncements(feedData))}function displayAnnouncements(){var a="<ul class='ans'>";if(0==feedData.entries.length){var b=Math.floor(8*Math.random());a+="<li><p class='title'>You Have No Announcements Currently :(</p><div class='content' style='display: block'><div class='details'><img src='Images/ran"+b+".gif'/></div></div></li>"}else for(var c=0;c<feedData.entries.length;c++){var d=feedData.entries[c].title,e=feedData.entries[c].content,f=feedData.entries[c].category,g=feedData.entries[c].topCategory,h=feedData.entries[c].period,i=[0,"Classes1","Classes2","Classes3","Classes4","Classes5","Classes6","Classes7","Classes8"],j=feedData.entries[c].eventDate;if("0000-00-00"!=j){j=new Date(j);var k=j.getUTCDate(),l=m_names[j.getMonth()];j=l+" 	"+k}var m=feedData.entries[c].eventTime,n=feedData.entries[c].eventLocation;a+=0==h?"<li class='"+g+"'>":"<li class='"+i[h]+"'>",a+="<p class='title'>"+d+"</p>",a+="<div class='content'>",a+="<div class='details'>",a+="<p>"+e+"</p>",a+="</div>",a+="<div class='specs'>",a+="<p>",a+="<span class='info'><span class='tspecs'>Category: </span>"+f+"</span>","0000-00-00"!=j&&(a+="<span class='info'><span class='tspecs'>Date: </span>"+j+"</span>"),""!=m&&(a+="<span class='info'><span class='tspecs'>Time: </span>"+m+"</span>"),""!=n&&(a+="<span class='info'><span class='tspecs'>Where: </span>"+n+"</span>"),a+="</p>",a+="</div>",a+="</div>",a+="</li>"}a+="</ul>",$("#dContent").html(a),$("#dContent").fitVids(),$("#dContent").find(".content a").each(function(){$(this).click(function(a){window.open(encodeURI($(this).attr("href")),"_system"),a.preventDefault()})}),initializeHide()}function sortAnnouncements(a){var b=a.entries;return b.sort(function(a,b){var c=new Date(a.expirationDate),d=new Date(b.expirationDate);return d>c?-1:c>d?1:0}),a.entries=b,a}function addFeedsToList(a){for(var b=0;b<a.feed.feeds.length;b++)feedData.feedList.push({feedTitle:a.feed.feeds[b].title,feedCategory:a.feed.feeds[b].topCategory,feedCatId:a.feed.feeds[b].catId,feedPeriod:a.feed.feeds[b].period});displayFeedList()}function loadFeedList(a){feedData.feedList=[];var b=makeQueryUrlString(a);ajaxFeed(annoQueryUrl+b,addFeedsToList)}function displayFeedList(){if(0==feedData.allCats.length)return void ajaxFeed(annoListUrl,function(a){feedData.allCats=a.allcats,feedData.allTeachers=a.allteachers,feedData.surveyUrl=a.surveyUrl,displayFeedList()});$(".getStart").hide();for(var a=[],b="",c=0;c<feedData.feedList.length;c++)"General"!=feedData.feedList[c].feedCategory&&a.push("'"+feedData.feedList[c].feedCatId+"'");b+='<li class="atypes dynamic"><div class="atitle personal"><a href=\'#\' onclick="loadAnnouncements(['+a.join()+"], 'Your Announcements'); return false;\">Your Announcements</a></div></li>";for(var c=0;c<feedData.allCats.length;c++){for(var d=[],e=0;e<feedData.feedList.length;e++)feedData.feedList[e].feedCategory==feedData.allCats[c]&&d.push(feedData.feedList[e]);if(d.length>0){d.sort(function(a,b){return a.feedTitle<b.feedTitle?-1:a.feedTitle>b.feedTitle?1:0}),d.sort(function(a,b){return a.feedPeriod<b.feedPeriod?-1:a.feedPeriod>b.feedPeriod?1:0});var f=feedData.allCats[c].toLowerCase().replace(" ","-");b+="<li class='atypes dynamic dd'>",b+="<div class='atitle "+f+"'><a>"+feedData.allCats[c]+"</a></div>",b+="<ul class='acontent'>";for(var g=[],h="",i=0;i<d.length;i++)h+=0!=d[i].feedPeriod?"<li><a href='#'onclick=\"loadAnnouncements(['"+d[i].feedCatId+"'], '"+d[i].feedTitle+"'); return false;\">"+d[i].feedPeriod+" - "+d[i].feedTitle+"</a></li>":"<li><a href='#'onclick=\"loadAnnouncements(['"+d[i].feedCatId+"'], '"+d[i].feedTitle+"'); return false;\">"+d[i].feedTitle+"</a></li>",g.push(d[i].feedCatId);var j=g.join();b+="<li><a href='#'onclick=\"loadAnnouncements(["+j+"], 'All "+feedData.allCats[c]+"'); return false;\">All "+feedData.allCats[c]+"</a></li>",b+=h,b+="</ul>",b+="</li>"}}$(".under ul .dynamic").remove(),$(".under ul").prepend(b),loadFeedListGeneral(),initializeSlideoutHide()}function addFeedsToListGeneral(a){for(var b=0;b<a.feed.feeds.length;b++)feedData.generalFeedList.push({feedTitle:a.feed.feeds[b].title,feedCategory:a.feed.feeds[b].topCategory,feedCatId:a.feed.feeds[b].catId});displayFeedListGeneral()}function loadFeedListGeneral(){feedData.generalFeedList=[];var a=makeQueryUrlString(userData.generalFeeds);ajaxFeed(annoQueryUrl+a,addFeedsToListGeneral)}function displayFeedListGeneral(){for(var a="",b=[],c=0;c<feedData.generalFeedList.length;c++)"General"==feedData.generalFeedList[c].feedCategory&&b.push(feedData.generalFeedList[c]);if(b.length>0){b.sort(function(a,b){return a.feedTitle<b.feedTitle?-1:a.feedTitle>b.feedTitle?1:0}),a+="<li class='atypes dynamic dd'>",a+="<div class='atitle general closed'><a>Daily Bulletin</a></div>",a+="<ul class='acontent'>";for(var d=[],e="",f=0;f<b.length;f++)e+="<li><a href='#'onclick=\"loadAnnouncements(['"+b[f].feedCatId+"'], '"+b[f].feedTitle+"'); return false;\">"+b[f].feedTitle+"</a></li>",d.push(b[f].feedCatId);var g=d.join();a+="<li><a href='#'onclick=\"loadAnnouncements(["+g+"], 'Daily Bulletin'); return false;\">All of Daily Bulletin</a></li>",a+=e,a+="</ul>",a+="</li>"}$(".under ul li:first").after(a),initializeSlideoutHide()}function loadSettings(){showLoader(),setTitle("Settings"),fhsSettings()}function fhsSettings(){ajaxFeed(annoListUrl,initSettingsList)}function initSettingsList(a){var b=$("<form id='feedSelections' class='settingsWrapper' />"),c=$("<ul class='L1' />"),d='<div style="margin:.25em;"><p style="text-align:center;padding:.5em;font-style:italic;font-weight:bold;border:3px solid rgb(200,200,200);">Set your announcements here!</p></div>',e=0;feedData.allCats=a.allcats,feedData.allTeachers=a.allteachers,feedData.allTeachers.sort(function(a,b){return b>a?-1:a>b?1:0}),feedData.surveyUrl=a.surveyUrl;for(var f=0;f<feedData.allCats.length;f++){for(var g=[],h=0;h<a.feed.entries.length;h++)a.feed.entries[h].category==feedData.allCats[f]&&g.push(a.feed.entries[h]);if(g.length>0){if(g.sort(function(a,b){return a.title<b.title?-1:a.title>b.title?1:0}),"General"==feedData.allCats[f])var i=" general";else var i="";if(d+="<li class='"+i+"'>",d+="<h1>"+feedData.allCats[f]+"</h1>",d+="<ul class='L2'>","Classes"==feedData.allCats[f])for(var j=0;j<feedData.allTeachers.length;j++){for(var k=[],l=0;l<g.length;l++)g[l].teacher==feedData.allTeachers[j]&&""!=g[l].title&&"Tester, Beta"!=feedData.allTeachers[j]&&"Reviewer, Admin"!=feedData.allTeachers[j]&&"Admin, Supreme"!=feedData.allTeachers[j]&&k.push(g[l]);if(k.length>0){d+="<h2>"+feedData.allTeachers[j]+"</h2>",d+="<ul class='L3'>",k.sort(function(a,b){return a.period<b.period?-1:a.period>b.period?1:0});for(var l=0;l<k.length;l++)d+="<li class='bottom'><label for='cb"+e+"'>"+k[l].period+" - "+k[l].title+"</label><input id='cb"+e+"' type='checkbox' value='"+k[l].catId+"' /></li>",e++;d+="</ul>"}}else for(var j=0;j<g.length;j++)d+="<li class='bottom'><label for='cb"+e+"'>"+g[j].title+"</label><input id='cb"+e+"' type='checkbox' value='"+g[j].catId+"' /></li>",e++;d+="</ul>",d+="</li>"}}c.html(d),feedCbs=c.find("input[type=checkbox]"),updateSettingsFromUserData(),feedCbs.change(function(){updateUserDataFromSettings()}),b.append(c),$("#dContent").empty().append(b),$("#dContent .general").each(function(){var a=$(this).find("input[type=checkbox]");a.prop("checked",!0),$(this).hide()}),updateUserDataFromSettings(),initializeL3Hide(),initializeL2Hide()}function updateSettingsFromUserData(){if(userData=getUserData())for(var a=0;a<userData.feeds.length;a++)feedCbs.each(function(){$(this).val()==userData.feeds[a]&&$(this).attr("checked","checked")})}function updateUserDataFromSettings(){var a=[],b=[];feedCbs.each(function(){$(this).is(":checked")&&$(this).parents("li.general").length>0?b.push($(this).val()):$(this).is(":checked")&&a.push($(this).val())}),userData={feeds:a,generalFeeds:b},feedData.feedList=a,feedData.generalFeeds=b,localStorage.setItem("userData",JSON.stringify(userData)),console.log("userData = "+JSON.parse(localStorage.getItem("userData"))),console.dir(JSON.parse(localStorage.getItem("userData"))),loadFeedList(feedData.feedList)}function embedCal(){var a=$(document).width()-20,b=$(document).height()-20-$(".top").outerHeight(),c='<iframe width="'+a+'" scrolling="no" height="'+b+'" frameborder="0" src="https://www.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height='+b+'&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=ib30j629l0s3qv0help912kc4o%40group.calendar.google.com&amp;color=%23705770&amp;src=b4li8fjv8vbus7delh6q4or5b8%40group.calendar.google.com&amp;color=%234E5D6C&amp;ctz=America%2FLos_Angeles" style="border-width: 0px;"/>';$("#dContent").html(c),setTitle("Calendar")}function embedSurvey(){var a=$(document).width(),b=$(document).height()-20-$(".top").outerHeight(),c=$('<div class="sIFrame" width="'+a+'" height="'+b+'"><iframe id="sIFrame" width="'+a+'" scrolling="yes" height="'+b+'" frameborder="0" src="http://www.fhsapp.com/admin/feedbackForm.html" style="border-width: 0px;margin: 0;overflow-y:auto;"/></div>');c.bind("orientationchange",function(){setTimeout(function(){var a=$(document).width(),b=$(document).height()-20-$(".top").outerHeight();$("#sIFrame").prop("width",a),$("#sIFrame").prop("height",b),$(".sIFrame").prop("width",a),$(".sIFrame").prop("height",b)},300)}),$(".over").addClass("SurveyBG"),$("#dContent").empty().append(c),setTitle("Feedback")}function loadHowTo(){$("#dContent").load("howTo.html",function(){makelogoimage()}),setTitle("Getting Started"),slideLeft2()}function makelogoimage(){x=6>time?"Images/nighttime.png":8>time?"Images/sunrise.png":18>time?"Images/daytime.png":20>time?"Images/sunset.png":"Images/nighttime.png",$("#logo").append("<img src='"+x+"' class='timelogo' /> ")}function initApp(){"function"==typeof navigator.splashscreen&&navigator.splashscreen.hide()}$(document).ready(function(){$("#calLink").click(function(a){a.preventDefault(),$(this).blur(),embedCal(),slideLeft2()}),$("#settingsLink").click(function(a){a.preventDefault(),$(this).blur(),loadSettings(),slideLeft2()}),$(".pageLink").click(function(a){a.preventDefault(),$(this).blur(),showLoader(),$("#dContent").load($(this).attr("href")),setTitle($(this).text()),slideLeft2()}),$(".resourcesLink").click(function(a){a.preventDefault(),$(this).blur(),showLoader(),$("#dContent").load($(this).attr("href"),function(){$("#dContent").find("a").each(function(){$(this).click(function(a){window.open(encodeURI($(this).attr("href")),"_system"),a.preventDefault()})})}),setTitle($(this).text()),slideLeft2()}),$("#feedbackLink").click(function(a){a.preventDefault(),$(this).blur(),showLoader(),slideLeft(),embedSurvey()}),$(".howToLink").click(function(a){a.preventDefault(),$(this).blur(),showLoader(),$("#dContent").load($(this).attr("href")),setTitle($(this).text()),slideLeft2()})});var userData,feedData={entries:[],feedList:[],allCats:[],allTeachers:[]},feedListItemsTotal,feedListItemsLoaded,annoListUrl="http://www.fhsapp.com/admin/anno_list.php",annoQueryUrl="http://www.fhsapp.com/admin/anno_query.php",LoadWB=$("<img class='loading' src='Images/LoadWB.gif' width='32' height='32' />"),LoadBB=$("<img class='loading' src='Images/LoadBB.gif' width='32' height='32' />"),cookieOptions={expires:999999999,domain:window.location.hostname},slideLeft,slideLeft2,slideRight,isSlid=!1,L3isSlid=!1,L2isSlid=!1;$(document).ready(function(){slideRight=function(){a.animate({left:.7*$(document).width()+"px"},250),isSlid=!0,a.bind("touchmove",function(a){a.preventDefault()})},slideLeft=function(){a.animate({left:"0px"},250),isSlid=!1,a.unbind("touchmove")},slideLeft2=function(){a.animate({left:"0px"},250),isSlid=!1,a.unbind("touchmove"),$(".over").removeClass("SurveyBG")},$(".under .acontent").hide();{var a=$(".over");$("body")}a.swiperight(function(){isSlid===!1&&slideRight()}),a.swipeleft(function(){isSlid===!0&&slideLeft()});var b=$(".btnSlide");b.click(function(){isSlid===!0?slideLeft():slideRight()}),setAppHeight(),$(window).bind("orientationchange",setAppHeight),fhsIndex()});var annHide,date=new Date,time=date.getHours(),feedListExists=!1,m_names=new Array("Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"),feedCbs,date=new Date,time=date.getHours(),app={initialize:function(){this.bindEvents()},bindEvents:function(){document.addEventListener("deviceready",this.onDeviceReady,!1)},onDeviceReady:initApp};