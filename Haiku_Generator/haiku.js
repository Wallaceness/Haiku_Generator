var fs=require("fs");
var cmudictFile=readCmudictFile('./cmudict.txt');
var formatObject={};

function readCmudictFile(file){
	return fs.readFileSync(file).toString();
}

function formatData(data){
	//formatData sorts all the words in the cmudict.txt file into indexes in the global formatObject based on their number of syllables. This will come in handy later...
	var count=0
	var lines=data.toString().split("\n");
	for (line in lines){
		count=0;
		var lineSplit=lines[line].split("  ");
		if (lineSplit[1]==undefined)
			continue
		var syllables=lineSplit[1].split(" ");
		for (syllable in syllables){
			if (/\d+/.test(syllables[syllable]))
				count+=1;}
		if (!formatObject[+count])
			formatObject[+count]=[lineSplit[0]];
		else
			formatObject[+count].push(lineSplit[0]);
	}
}


formatData(cmudictFile);


function createHaiku(structure){
	//The basic procedure for the haiku program is to create an empty string, then for every line in the structure, represented by a number for how many syllables, start a while loop and generate random syllable numbers between 1 and that number (0 is skipped). The program then references the formatObject under the correct syllable index, and returns a random word from the list of words with that many syllables. It continues to do this until the line has been reduced to 0, and then moves on to the next line in the structure. It then returns the completed haiku.
	var haiku="";
	for (line in structure){
		var count=structure[line];
		while (count>0){
			var syllables=Math.round(Math.random()*count);
			if (syllables==0)
				continue;
			count-=syllables;
			var word=Math.round(Math.random()*formatObject[syllables].length-1);
			haiku+=formatObject[syllables][word]+" ";
		}
		haiku+="\n";
	}
	return haiku;
}

console.log(createHaiku([5, 7, 5]));
//You can create haikus with different structures by just altering the list you input.

module.exports={
createHaiku:createHaiku,
};

