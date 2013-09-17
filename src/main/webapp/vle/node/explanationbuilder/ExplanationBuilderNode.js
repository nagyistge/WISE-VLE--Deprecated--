/*
 * This a template Node that developers can use to create new 
 * step types. Copy this file and rename it to 
 *
 * <new step type>Node.js
 * e.g. for example if you are creating a quiz step type it would
 * look something like QuizNode.js
 * 
 * and then in this file change all occurrences of the word 'TemplateNode' to 
 * 
 * <new step type>Node
 * 
 * e.g. for example if you are creating a quiz step type you would
 * change it to be QuizNode
 */

ExplanationBuilderNode.prototype = new Node(); //xTODO: rename TemplateNode
ExplanationBuilderNode.prototype.constructor = ExplanationBuilderNode; //xTODO: rename TemplateNode
ExplanationBuilderNode.prototype.parentNode = Node.prototype; //xTODO: rename TemplateNode

/*
 * the name that displays in the authoring tool when the author creates a new step
 * 
 * xTODO: rename TemplateNode
 * xTODO: rename Template to whatever you would like this step to be displayed as in
 * the authoring tool when the author creates a new step
 */
ExplanationBuilderNode.authoringToolName = "Explanation Builder"; 

ExplanationBuilderNode.authoringToolDescription = "Students use ideas from their Idea Basket to generate a response"; //xTODO: rename TemplateNode
ExplanationBuilderNode.prototype.i18nEnabled = true;
ExplanationBuilderNode.prototype.i18nPath = "/vlewrapper/vle/node/explanationbuilder/i18n/";
ExplanationBuilderNode.prototype.supportedLocales = {
	"en_US":"en_US",
	"es":"es"	
};

ExplanationBuilderNode.tagMapFunctions = [
	{functionName:'importWork', functionArgs:[]},
	{functionName:'showPreviousWork', functionArgs:[]}
];

/**
 * This is the constructor for the Node
 * 
 * xTODO: rename TemplateNode
 * @constructor
 * @extends Node
 * @param nodeType
 * @param view
 */
function ExplanationBuilderNode(nodeType, view) {
	this.view = view;
	this.type = nodeType;
	this.prevWorkNodeIds = [];
	
	/*
	 * subscribe this node to the 'ideaBasketChanged' so it will know when
	 * anyone outside this step has changed the idea basket
	 */
	view.eventManager.subscribe('ideaBasketChanged', this.ideaBasketChanged, this);
	
	this.tagMapFunctions = this.tagMapFunctions.concat(ExplanationBuilderNode.tagMapFunctions);
}

/**
 * Sets up constraints before rendering.
 * 
 * @param contentPanel
 * @param studentWork
 */
ExplanationBuilderNode.prototype.render = function(contentPanel,studentWork, disable){
	if(!this.constraintKey){
		this.constraintKey = this.utils.generateKey(20);
	}
	
	/* call super */
	Node.prototype.render.call(this, contentPanel, studentWork, disable);
};

/**
 * This function is called when the vle loads the step and parses
 * the previous student answers, if any, so that it can reload
 * the student's previous answers into the step.
 * 
 * xTODO: rename TemplateNode
 * 
 * @param stateJSONObj
 * @return a new state object
 */
ExplanationBuilderNode.prototype.parseDataJSONObj = function(stateJSONObj) {
	/*
	 * xTODO: rename TEMPLATESTATE
	 * 
	 * make sure you rename TEMPLATESTATE to the state object type
	 * that you will use for representing student data for this
	 * type of step. copy and modify the file below
	 * 
	 * vlewrapper/WebContent/vle/node/template/templatestate.js
	 * 
	 * and use the object defined in your new state.js file instead
	 * of TEMPLATESTATE. for example if you are creating a
	 * quiz step type you would copy the file above to
	 * 
	 * vlewrapper/WebContent/vle/node/quiz/quizstate.js
	 * 
	 * and in that file you would define QUIZSTATE and therefore
	 * would change the TEMPLATESTATE to QUIZSTATE below
	 */ 
	return ExplanationBuilderState.prototype.parseDataJSONObj(stateJSONObj);
};

/**
 * This function is called if there needs to be any special translation
 * of the student work from the way the student work is stored to a
 * human readable form. For example if the student work is stored
 * as an array that contains 3 elements, for example
 * ["apple", "banana", "orange"]
 *  
 * and you wanted to display the student work like this
 * 
 * Answer 1: apple
 * Answer 2: banana
 * Answer 3: orange
 * 
 * you would perform that translation in this function.
 * 
 * Note: In most cases you will not have to change the code in this function
 * 
 * xTODO: rename TemplateNode
 * 
 * @param studentWork
 * @return translated student work
 */
ExplanationBuilderNode.prototype.translateStudentWork = function(studentWork) {
	return studentWork;
};

/**
 * This function is called when the student exits the step. It is mostly
 * used for error checking.
 * 
 * xTODO: rename TemplateNode
 * 
 * Note: In most cases you will not have to change anything here.
 */
ExplanationBuilderNode.prototype.onExit = function() {
	//check if the content panel has been set
	if(this.contentPanel) {
		try {
			/*
			 * check if the onExit function has been implemented or if we
			 * can access attributes of this.contentPanel. if the user
			 * is currently at an outside link, this.contentPanel.onExit
			 * will throw an exception because we aren't permitted
			 * to access attributes of pages outside the context of our
			 * server.
			 */
			if(this.contentPanel.save) {
				try {
					//run the on exit cleanup
					this.contentPanel.save();					
				} catch(err) {
					//error when onExit() was called, e.g. mysystem editor undefined
				}
			}	
		} catch(err) {
			/*
			 * an exception was thrown because this.contentPanel is an
			 * outside link. we will need to go back in the history
			 * and then trying to render the original node.
			 */
			history.back();
		}
	}
};

/**
 * Renders the student work into the div. The grading tool will pass in a
 * div id to this function and this function will insert the student data
 * into the div.
 * 
 * @param displayStudentWorkDiv the div we will render the student work into
 * @param nodeVisit the student work
 * @param childDivIdPrefix (optional) a string that will be prepended to all the 
 * div ids use this to prevent DOM conflicts such as when the show all work div
 * uses the same ids as the show flagged work div
 * 
 * xTODO: rename TemplateNode
 * Note: you may need to add code to this function if the student
 * data for your step is complex or requires additional processing.
 * look at SensorNode.renderGradingView() as an example of a step that
 * requires additional processing
 */
ExplanationBuilderNode.prototype.renderGradingView = function(displayStudentWorkDiv, nodeVisit, childDivIdPrefix, workgroupId) {
	//get the step work id
	var stepWorkId = nodeVisit.id;
	
	if(childDivIdPrefix == null) {
		childDivIdPrefix = '';
	}
	
	//create an ExplanationBuilder object so that we can retrieve the prompt an background
	var explanationBuilder = new ExplanationBuilder(this, this.view);
	explanationBuilder.prompt = explanationBuilder.content.prompt;
	explanationBuilder.background = explanationBuilder.content.background;
	
	var backgroundPath = null;
	
	if(explanationBuilder.background != null && explanationBuilder.background != "") {
		if(explanationBuilder.background.indexOf('http') != -1) {
			//background image path is absolute
			backgroundPath = explanationBuilder.background;
		} else {
			//background image is relative so we need to create the full path to the background image
			backgroundPath = this.view.getConfig().getConfigParam('getContentBaseUrl') + explanationBuilder.background;			
		}
	}

	/*
	 * the default background width and height values. these
	 * values will be overridden once the backgroundImage.onload
	 * function gets called
	 */
	var backgroundWidth = 1000;
	var backgroundHeight = 800;
	
	//create the div that will contain the ideas div
	var explanationBuilderContainerDivId = childDivIdPrefix + 'explanationBuilderContainerDiv_' + stepWorkId;
	var explanationBuilderContainerDiv = createElement(document, 'div', {id: explanationBuilderContainerDivId, style:'width:' + 490 + 'px;height:' + 300 + 'px;border: 1px solid;position:relative;overflow:auto'});
	
	//create the div that will contain the ideas
	var explanationBuilderIdeasDivId = childDivIdPrefix + 'explanationBuilderIdeasDiv_' + stepWorkId;
	var explanationBuilderIdeasDiv = createElement(document, 'div', {id: explanationBuilderIdeasDivId, style:'width:' + backgroundWidth + 'px;height:' + backgroundHeight + 'px;border: 1px solid;position:relative'});
	
	/*
	 * create an image object so we can obtain the width and height
	 * of the background image
	 */
	var backgroundImage = new Image();
	
	/*
	 * we can't immediately retrieve the width and height so
	 * we must implement the onload function which gets called
	 * when the image actually loads and only then can we
	 * retrieve the width and height
	 */ 
	backgroundImage.onload = function() {
		//set the dimensions of the div that contains the background image
		$(explanationBuilderIdeasDiv).css('width', this.width);
		$(explanationBuilderIdeasDiv).css('height', this.height);
	};
	
	//set the path of the background image
	backgroundImage.src = backgroundPath;

	//create the enlarge button
	var enlargeButton = $('<button/>', {id:'enlargeExplanationBuilderButton_' + stepWorkId, text:'Enlarge'});
	
	//create the function to call when the 'Enlarge' button is clicked
	var enlargeFunction = function() {
		//open the html page that will display the enlarged view of the student work
		var newWindow = window.open("/vlewrapper/vle/node/explanationbuilder/enlargeExplanationBuilder.html");
		
		/*
		 * send the necessary ids to the new window so we can reference 
		 * and increase the dimension sizes of the necessary div and also
		 * remove the 'Enlarge' button. the processing will only occur
		 * on the html page that opens in the new tab, it will not change
		 * any of the elements in the grading tool page.
		 */
		newWindow.explanationBuilderContainerDivId = $(explanationBuilderContainerDiv).attr('id');
		newWindow.explanationBuilderIdeasDivId = $(explanationBuilderIdeasDiv).attr('id');
		newWindow.enlargeButtonId = $(enlargeButton).attr('id');
		
		//copy the html in the grading view so we can display it in the enlarged view
		newWindow.html = $(displayStudentWorkDiv).html();
	}
	
	//add the 'Enlarge' button to the UI
	displayStudentWorkDiv.append(enlargeButton);
	
	//bind the enlargeFunction to the click event
	enlargeButton.click(enlargeFunction);
	
	//add the explanationBuilderContainerDiv to the grading div
	displayStudentWorkDiv.append(explanationBuilderContainerDiv);
	
	//add the explanationBuilderIdeasDiv to the explanationBuilderContainerDiv
	$(explanationBuilderContainerDiv).append(explanationBuilderIdeasDiv);

	if(backgroundPath != null) {
		//set the background attributes
		$(explanationBuilderIdeasDiv).css('background-image','url(' + backgroundPath + ')');
		$(explanationBuilderIdeasDiv).css('background-repeat','no-repeat');
		$(explanationBuilderIdeasDiv).css('background-position','left top');		
	}
	
	//get the idea basket for this student
	var ideaBasket = this.view.getIdeaBasketByWorkgroupId(workgroupId);
	
	/*
	 * Get the latest student state object for this step
	 * xTODO: rename templateState to reflect your new step type
	 * 
	 * e.g. if you are creating a quiz step you would change it to quizState
	 */
	var explanationBuilderState = nodeVisit.getLatestWork();
	
	//get the explanation ideas the student used
	var explanationIdeas = explanationBuilderState.explanationIdeas;
	
	//get the student text answer
	var answer = explanationBuilderState.answer;
	
	//loop through all the explanation ideas
	for(var x=0; x<explanationIdeas.length; x++) {
		//get an explanation idea
		var explanationIdea = explanationIdeas[x];
		
		//get the attributes of the explanation idea
		var id = explanationIdea.id;
		var left = explanationIdea.xpos;
		var top  = explanationIdea.ypos;
		var currColor = explanationIdea.color;
		
		var text = "";
		
		if(ideaBasket != null) {
			//get the idea from the basket
			var idea = ideaBasket.getIdeaById(id);
			
			if(idea != null) {
				//get the text for the idea
				text = idea.text;
			}
		}
		
		//create a div for the idea that will be displayed as a rectangle
		var explanationIdeaHtml = '<div class="exIdea" class="selected" title="' + view.getI18NString('usedIdea_title','ExplanationBuilderNode') + '" id="' + childDivIdPrefix + 'explanationIdea' 
			+ id + '_' + stepWorkId + '" style="position:absolute; left:' + left + 'px; top:' + top + 'px; background-color:' + currColor + '">' + text + '</div>';
		
		//add the idea div to the explanationBuilderIdeasDiv
		$(explanationBuilderIdeasDiv).append(explanationIdeaHtml);
	}
	
	//create a div to display the student answer
	var explanationBuilderAnswerDivId = childDivIdPrefix + 'explanationBuilderAnswerDiv_' + stepWorkId;
	var answerDiv = createElement(document, 'div', {id: explanationBuilderAnswerDivId});
	displayStudentWorkDiv.append(answerDiv);

	//replace \n with <br>
	answer = this.view.replaceSlashNWithBR(answer);
	
	/*
	 * add a <br> before the answer so there will be a new 
	 * line between the ideas and this text answer
	 */
	answer = "<br>" + answer;
	
	$(answerDiv).html(answer);
};

/**
 * Get the html file associated with this step that we will use to
 * display to the student.
 * 
 * xTODO: rename TemplateNode
 * 
 * @return a content object containing the content of the associated
 * html for this step type
 */
ExplanationBuilderNode.prototype.getHTMLContentTemplate = function() {
	/*
	 * xTODO: rename both occurrences of template
	 * 
	 * e.g. if you are creating a quiz step you would change it to
	 * 
	 * node/quiz/quiz.html
	 */
	return createContent('node/explanationbuilder/explanationBuilder.html');
};

/**
 * Get the prompt for this step
 * @return the prompt for this step as a string
 */
ExplanationBuilderNode.prototype.getPrompt = function() {
	var prompt = "";
	
	if(this.content != null) {
		//get the content for the node
		var contentJSON = this.content.getContentJSON();

		//see if the node content has a prompt
		if(contentJSON != null && contentJSON.prompt != null) {
			prompt = contentJSON.prompt;	
		}
	}
	
	//return the prompt
	return prompt;
};

/**
 * Called when the 'ideaBasketChanged' is fired
 * @param type
 * @param args
 * @param obj this node (since this context is not actually in this node
 * because this function is called from an event fire)
 */
ExplanationBuilderNode.prototype.ideaBasketChanged = function(type,args,obj) {
	//get this node
	var thisNode = obj;
	
	/*
	 * make sure this node is the current node the student is on because
	 * all ExplanationBuilderNode steps will be listening for the event
	 * and we only need to update the basket if the student is on 
	 * an ExplanationBuilderNode step.
	 */
	if(thisNode.view.getCurrentNode().id == thisNode.id) {
		//update the idea basket within the step
		thisNode.contentPanel.explanationBuilder.ideaBasketChanged(thisNode.view.ideaBasket);
	}
};

/**
 * Override of Node.overridesIsCompleted
 * Specifies whether the node overrides Node.isCompleted
 * Note: we don't need to add a Node.isCompleted() override function, as
 * we explicitly set node isCompleted() and isNotCompleted() in explanation.js
 * after the appropriate conditions are met/not met.
 */
ExplanationBuilderNode.prototype.overridesIsCompleted = function(){
	return true;
};

/**
 * Adds a new constraint for this explanation if the content specifies that
 * student must complete work before exiting to another step
 */
/*ExplanationBuilderNode.prototype.addConstraints = function() {
	var content = this.content.getContentJSON(),
		project = this.view.getProject();
	var stepNumAndTitle = project.getStepNumberAndTitle(this.id);
	if('isMustComplete' in content && content.isMustComplete){
    	//isMustComplete is true so we will create the constraint
		
		var stepTerm = project.getStepTerm() ? project.getStepTerm() : this.view.getI18NString('stepTerm');
		
		// set constraint alert message depending on whether student text area is enabled
		var message = '';
		if(content.enableStudentTextArea == null || content.enableStudentTextArea) {
			message = 'You must complete work for "' + stepTerm + ' ' + stepNumAndTitle + '" before moving ahead.\n\nArrange some ideas in the Organizing Space. Then click the "Ready to Exlpain!" button and type your answer.  When you are finished, click the "Save Response" button.';
		} else {
			message = 'You must complete work for "' + stepTerm + ' ' + stepNumAndTitle + '" before moving ahead.\n\nArrange some of your ideas in the Organizing Space.';
		}
	}
};*/

ExplanationBuilderNode.prototype.removeConstraints = function(){
};

/**
 * Override of Node.processStateConstraints
 * Checks to see if the work was completed. If it was, then no constraint is needed.
 * If not, then we need to add a constraint.
 */
ExplanationBuilderNode.prototype.processStateConstraints = function() {
	if(!this.isCompleted()){
	}
};

/**
 * Override on Node.canExit
 */
ExplanationBuilderNode.prototype.canExit = function(){
	//check if the content panel has been set
	if(this.contentPanel) {
		if(this.contentPanel.explanationBuilder){
			return this.contentPanel.explanationBuilder.canExit();
		}
	}
	return true;
};

/**
 * Determine whether the student has completed the step or not
 * @param nodeState the latest node state for the step
 * @return whether the student has completed the step or not
 */
ExplanationBuilderNode.prototype.isCompleted = function(nodeVisits) {
	var result = false;
	var nodeState = this.view.getLatestNodeStateWithWorkFromNodeVisits(nodeVisits);
	
	if(nodeState != null && nodeState != '') {
		var content = this.content.getContentJSON();
		
		if(content!= null && content.isMustComplete) {
			/*
			 * this step has a correct answer so we will check if the
			 * student answered correctly
			 */
			if (nodeState.explanationIdeas != null && nodeState.explanationIdeas.length > 0) {
				if(content.enableStudentTextArea){
					if(nodeState.answer != null && nodeState.answer != ''){
						result = true;
					}
				} else {
					result = true;
				}
			}
		} else {
			result = true;
		}
	}
	
	return result;
};

/*
 * Add this node to the node factory so the vle knows it exists.
 * xTODO: rename both occurrences of TemplateNode
 * 
 * e.g. if you are creating a quiz step you would change it to
 * 
 * NodeFactory.addNode('QuizNode', QuizNode);
 */
NodeFactory.addNode('ExplanationBuilderNode', ExplanationBuilderNode);

//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	/*
	 * xTODO: rename template to your new folder name
	 * xTODO: rename TemplateNode
	 * 
	 * e.g. if you were creating a quiz step it would look like
	 * 
	 * eventManager.fire('scriptLoaded', 'vle/node/quiz/QuizNode.js');
	 */
	eventManager.fire('scriptLoaded', 'vle/node/explanationbuilder/ExplanationBuilderNode.js');
};