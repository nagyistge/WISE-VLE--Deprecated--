<html>
<title>Loading Sample PAS Project to Virtual Learning Environment</title>
<head>
<script type="text/javascript" src="js/VLE.js"></script>
<script type="text/javascript" src="js/contentpanel/ContentPanel.js"></script>
<script type="text/javascript" src="js/navigation/NavigationLogic.js"></script>
<script type="text/javascript" src="js/navigation/DFS.js"></script>
<script type="text/javascript" src="js/navigation/NavigationPanel.js"></script>
<script type="text/javascript" src="js/common/loadxmldoc.js"></script>
<script type="text/javascript" src="js/node/Node.js"></script>
<script type="text/javascript" src="js/node/HtmlNode.js"></script>
<script type="text/javascript" src="js/node/CustomNode.js"></script>
<script type="text/javascript" src="js/node/MatchSequenceNode.js"></script>
<script type="text/javascript" src="js/node/FillinNode.js"></script>
<script type="text/javascript" src="js/project/Project.js"></script>
<script type="text/javascript" src="js/project/pas/PasOtmlProject.js"></script>

<script type="text/javascript" src="js/common/niftycube.js"></script>
<script type="text/javascript" src="js/common/sdmenu.js"></script>
<script type="text/javascript" src="js/common/dropdown.js"></script>

<link rel="stylesheet" type="text/css" href="css/niftyCube.css" />
<link rel="stylesheet" type="text/css" href="css/navigation.css" />
<link rel="stylesheet" type="text/css" href="css/sdmenu.css" />

<!-- Dependency --> 
<script type="text/javascript" src="http://yui.yahooapis.com/2.7.0/build/yahoo/yahoo-min.js" ></script>

<!-- Event source file -->
<script type="text/javascript" src="http://yui.yahooapis.com/2.7.0/build/event/event-min.js" ></script>


<script type="text/javascript">
window.onload=function(){
Nifty("div#none","bottom");
render();
parent.foo2();
}
</script>

<!--  Javascript Pop up window -->

<script type="text/javascript">

var newWin = null;
function popUp(strURL, strType, strHeight, strWidth) {
 if (newWin != null && !newWin.closed)
   newWin.close();
 var strOptions="";
 if (strType=="console")
   strOptions="resizable,height="+
     strHeight+",width="+strWidth;
 if (strType=="fixed")
   strOptions="status,height="+
     strHeight+",width="+strWidth;
 if (strType=="elastic")
   strOptions="toolbar,menubar,scrollbars,"+
     "resizable,location,height="+
     strHeight+",width="+strWidth;
 newWin = window.open(strURL, 'newWin', strOptions);
 newWin.focus();
}
</script>

</head>

<body>
	
<div id="centeredDiv">	
	
<div id="projectLeftBox">
	
	<div id="projectLogoBox">
		<a href="CourseProjectInfoBox.html" onclick="popUp(this.href,'console',700,720);return false;" target="_blank"><img src="./assets/images/robots/small_logo.png" alt="Robot Art Header" width="210" height="55" border="0" />
			<div id="projectCurriculum">
				<div class="title">Level Up! Programming</div>
				<div class="unit">Unit 3: Section 1</div>
			</div>
		</a>
	</div>
	
	<div id="logInBox">
		<p>SignIn: Keyser Soze</p>
	</div>


	 <!-- <div id="toolsArea">
		
		  <dl class="dropdown">
		  <dt id="one-ddheader" onclick="ddMenu('one',1);" onmouseout="ddMenu('one',-1);">
		  		tools
				<img src="./assets/images/go-down.png" alt="Menu Arrow" width="15" height="14" border="0" />
		</dt>
		
		  <dd id="one-ddcontent" onmouseover="cancelHide('one');" onmouseout="ddMenu('one',-1);">
		    <ul>
		      <li><a class="underline">Show My Journal</a></li>
		      <li><a onclick="vle.showAllWork();" class="underline2">Show All Work</a></li>
		      <li><a class="underline">Save</a></li>
			  <li><a class="underline2">Save & Exit</a></li>
			  <li><a class="underline">Report an Issue</a></li>
		    </ul>
		  </dd>
		</dl>
	</div>  -->
	
	<div id="toolsArea">
		
		  <dl class="dropdown">
		  <dt id="one-ddheader" onclick="ddMenu('one',1);" onmouseout="ddMenu('one',-1);">
		  		tools
				<img src="./assets/images/go-down.png" alt="Menu Arrow" width="15" height="14" border="0" />
		</dt>
		
		  <dd id="one-ddcontent" onmouseover="cancelHide('one');" onmouseout="ddMenu('one',-1);">
		    <ul>
		      <li><a class="underline">Show My Journal</a></li>
		      <li><a onclick="vle.showAllWork();" class="underline2">Show All Work</a></li>
		      <li><a class="underline">Save</a></li>
			  <li><a class="underline2">Save & Exit</a></li>
			  <li><a class="underline">Report an Issue</a></li>
		    </ul>
		  </dd>
		</dl>
	</div>

	<div id="audioControls">
		<table>
			<tr>
				<td class="rightPadding">Audio Controls:</td>
				<td><a class="rewind" onclick="rewindStepAudio();"></a></td>
				<td><a class="pause" onclick=""></a></td>
				<td><a class="play" onclick="playPauseStepAudio();"></a></td>
			</tr>
		</table>
	</div>
	
	<div id="navigationArea">

			 <!-- <div class="sectionHeader">Navigation</div> -->
		
			<div id="menuControls">
				        <input type="button" value="Expand All" onclick="myMenu.expandAll()" />
				        <input type="button" value="Collapse All" onclick="myMenu.collapseAll()" />
					</div>
					
			<div id="navigationMenuBox" >
				    <div id="my_menu" class="sdmenu">
					  <div>
				        <span>A1: Lessons Goals</span>
				        <a href="">Step1: name for the step here</a>
				        <a href="">Step2: name for the step here</a>
					  </div>
				      <div class="collapsed">
				        <span>A2: My Ideas</span>
				       <a href="">Step1: Here's an example of a very long step name</a>
				        <a href="">Step2: name for the step here</a>
						<a href="">Step3: name for the step here</a>
						<a href="">Step4: name for the step here</a>
						<a href="">Step5: name for the step here</a>
				      </div>
				      <div class="collapsed">
				       <span>A3: Explore New Ideas</span>
				        <a href="">Step1: another example of a long and intrguing step name</a>
				        <a href="">Step2: name for the step here</a>
						<a href="">Step3: name for the step here</a>
						<a href="">Step4: name for the step here</a>
						<a href="">Step5: name for the step here</a>
				      </div>
					  <div class="collapsed">
				       <span>A4: Test My Knowledge</span>
				       <a href="">Step1: name for the step here</a>
				        <a href="">Step2: name for the step here</a>
						<a href="">Step3: name for the step here</a>
					 </div>
				      <div class="collapsed">
				       <span>A5: Power Programming</span>
				       <a href="">Step1: name for the step here</a>
				        <a href="">Step2: name for the step here</a>
						<a href="">Step3: name for the step here</a>
						<a href="">Ste4: name for the step here</a>
				      </div>
					  <div class="collapsed">
				       <span>A6: Sum It Up</span>
				       <a href="">Step1: name for the step here</a>
				        <a href="">Step2: name for the step here</a>
					   </div>							
				   	</div>
		    </div>   <!-- end of #navigationMenuBox -->
	</div>   <!-- end of #navigationArea -->
		
	<div id="hostBrandingBox">
		<a href=""><img src="./assets/images/UCCP-Logo.png" alt="UCCP College Prep Online Logo" width="210" height="32" border="0" /></a>
	</div>
	
</div>    <!-- end of #projectLeftBox-->

<div id="projectRightUpperBox">
	<div id="stepInfoBar">
		<div class="currentLessonSection">Lesson 3.1</div>
    	<div class="instantQuizIcon"></div>
		<div class="stepTypeLabel">
    		<a href="InstantQuizInfoBox.html" onclick="popUp(this.href,'console',440,720);return false;" target="_blank">Instant Quiz</a>
		    <span class="gradingStatus">(Grading Off)</span>
			<span class="subStepCounter">Question 1 of 8</span> 
		</div>
		<div id="stepNavButtons">
    		<a onclick="vle.renderPrevNode();" ><img src="./assets/images/go-previous.png" alt="Previous Arrow" width="32" height="32" border="0" /></a>
			<a onclick="vle.renderNextNode();" ><img src="./assets/images/go-next.png" alt="Previous Arrow" width="32" height="32" border="0" /></a>
			<a onclick="vle.toggleNavigationPanelVisibility();"><img src="./assets/images/view-fullscreen.png" alt="Previous Arrow" width="32" height="32" border="0" /></a>
		</div>
    	
	</div>
</div>

<div id="projectRightLowerBox">
	<div id="contentDiv">
<iframe id="ifrm" name="ifrm" scrolling="auto" onload="contentPanelOnLoad();"
 width="100%" height="100%" frameborder="0">
 [Content for browsers that don't support iframes goes here.]
</iframe>
</div>
</div>





<div id="experimental" style="display:none;">	experimental section<br/>
	<div id="experimentalbuttons">
	<input type="button" onclick="vle.getNodeVisitedInfo();" value="Get Node Visit Information" />
	</div>
	<div id="experimentaloutput">
	</div>
</div>

</div>  <!-- centerDiv -->
<script type="text/javascript">
	
	
var vle = null;
function render() {
	  //var xmlDoc= loadXMLDoc("uccp_lesson_0.otml");
	  //var project = new PasOtmlProject(xmlDoc);
	  var xmlDocObj = new LoadXMLDocObj();
	  var project = new PasOtmlProject(xmlDocObj);
	  xmlDocObj.load("uccp_lesson_0.otml");
	  //var dfs = new DFS(project.rootNode);
	  //vle = new VLE();
	  //vle.setProject(project);
	  //vle.navigationLogic = new NavigationLogic(dfs);
	  //vle.renderNode("0:0:0");
}

function loadFromString(xmlString) {
	alert('load this: ' + xmlString);
	  var xmlDocObj = new LoadXMLDocObj();
	  var project = new PasOtmlProject(xmlDocObj);
	  xmlDocObj.loadString(xmlString);
	  parent.foo();
}

function toggleNavigationPanelVisibility() {
	vle.toggleNavigationPanelVisibility();
}
var myMenu;

</script>

</body>
</html>