
function countFrequentlyUsedWords(input, n) {

  //https://github.com/first20hours/google-10000-english


  // create word array from input
  var wordArray = input.match(/\w+/g)
      for (var i = 0; i < wordArray.length; i++) {
        wordArray[i] = wordArray[i].toLowerCase()
      }

  //count occurences of unique words and put in hash
  var wordCounts = {}
  for (var i = 0; i < wordArray.length; i++) {
    if ( wordCounts[wordArray[i]] != null) {
      wordCounts[wordArray[i]] +=  1;
    }
    else {
      wordCounts[wordArray[i]] = 1;
    }
  }

  for(var key in wordCounts){
    if (excludeWords.includes(key)){
      delete wordCounts[key]
    }
  }

  //seperate each word out and
  words = []
  for (var key in wordCounts) {
    words.push({word: key, count: wordCounts[key]})
  }

  //sort words from most to least used
  let sortedWords = words.sort((a, b) => b.count - a.count)
  sortedWords = sortedWords.slice(0, n)
  return sortedWords

}

  var sortedWords = countFrequentlyUsedWords(inputString, 40)
  var highest = sortedWords[0].count
  var lowest = sortedWords.slice(-1)[0].count

  var scale = d3.scaleLinear()
      .domain([lowest, highest])
      .range([30, 100])


  var interpolate = d3.scaleLinear()
            .domain([lowest, highest])
            .range([0.6,1])


  var width = 1000,
      height = 1000

  var svg = d3.select('svg')
              .attr('width', width)
              .attr('height', height)

  var words = svg.selectAll('text')
          .data(sortedWords)
          .enter()
          .append('g')

        words.append('circle')
          .attr('r', (d) => scale(d.count))
          .attr('fill', (d) => d3.interpolateBlues(interpolate(d.count)))


        var text = words.append('text')
          .text((d) => (d.word))
          .attr('text-anchor', 'middle')
          .attr('alignment-baseline', 'middle')
          .attr('transform', () => `rotate(${35 - Math.floor((Math.random() * 70))})`)
          .style('font-size', function(d) { return `${Math.min(2 * scale(d.count), (2 * scale(d.count) - 15) / this.getComputedTextLength()*12)}px`})


  var simulation = d3.forceSimulation(sortedWords)
          .force('center', d3.forceCenter(width/2, height/2))
          .force('push', d3.forceManyBody().strength(10))
          .force('collision', d3.forceCollide().radius((d) => scale(d.count)))
          .on('tick', tick)


  function tick(){
    words.attr('transform', (d) => `translate(${d.y}, ${d.x})`)

  }

  //method borrowed from http://jsfiddle.net/eNzjZ/34/
  function getTextWidth(text, font) {
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
  }








