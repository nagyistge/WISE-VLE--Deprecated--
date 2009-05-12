/*
 * Copyright (c) 2009 Regents of the University of California (Regents). Created
 * by TELS, Graduate School of Education, University of California at Berkeley.
 *
 * This software is distributed under the GNU Lesser General Public License, v2.
 *
 * Permission is hereby granted, without written agreement and without license
 * or royalty fees, to use, copy, modify, and distribute this software and its
 * documentation for any purpose, provided that the above copyright notice and
 * the following two paragraphs appear in all copies of this software.
 *
 * REGENTS SPECIFICALLY DISCLAIMS ANY WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE. THE SOFTWAREAND ACCOMPANYING DOCUMENTATION, IF ANY, PROVIDED
 * HEREUNDER IS PROVIDED "AS IS". REGENTS HAS NO OBLIGATION TO PROVIDE
 * MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS, OR MODIFICATIONS.
 *
 * IN NO EVENT SHALL REGENTS BE LIABLE TO ANY PARTY FOR DIRECT, INDIRECT,
 * SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS,
 * ARISING OUT OF THE USE OF THIS SOFTWARE AND ITS DOCUMENTATION, EVEN IF
 * REGENTS HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @author: Hiroki Terashima
 */
/**
 * STATE
 *   buckets
 */
function MSSTATE() {
	this.sourceBucket = null;
    this.buckets = [];
}

/**
 * Returns the current state in xml string format
 */
MSSTATE.prototype.getXMLString = function() {
	var xmlString = "<state>";
	xmlString += "</state>";
	return xmlString;
}

MSSTATE.prototype.getDataXML = function() {
	//implement me
//	return "<response>" + this.response + "</response><timestamp>" + this.timestamp + "</timestamp>";
}

MSSTATE.prototype.parseDataXML = function(stateXML) {
	//implement me
//	var reponse = stateXML.getElementsByTagName("reponse")[0];
//	var timestamp = stateXML.getElementsByTagName("timestamp")[0];
//	
//	if(reponse == undefined || timestamp == undefined) {
//		return null;
//	} else {
//		return new OPENRESPONSESTATE(choiceIdentifier.textContent, timestamp.textContent);		
//	}
}