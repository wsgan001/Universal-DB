
$(document).ready(function() {


//    var datafile = "data.json";
    var datafile = "data/uw-courses/data.json";
//    var datafile =  "data/samplegraph/data.json";

    generateGraph("#rwr-src", datafile);
    generateGraph("#rwr-target", datafile);

    generateGraph("#simrank-src", datafile);
    generateGraph("#simrank-target", datafile);

    generateGraph("#rpathsim-src", datafile);
    generateGraph("#rpathsim-target", datafile);
    
    
    generateGraph("#rpathsim2-src", datafile);
    generateGraph("#rpathsim2-target", datafile);
    function generateGraph(container, inputdata) {
        var width = $(container).width();
//            height = $("#rwr-src").width();
        var height = 162;
//    alert(width);
//    alert(height);
        var color = d3.scale.category20();
        var force = d3.layout.force()
                .charge(-120)
                .linkDistance(30)
                .size([width, height]);
        var svg = d3.select(container).append("svg")
                .attr("width", width)
                .attr("height", height);
        d3.json(inputdata, function(error, graph) {
            if (error)
                throw error;
            force
                    .nodes(graph.nodes)
                    .links(graph.links)
                    .start();
            var link = svg.selectAll(".link")
                    .data(graph.links)
                    .enter().append("line")
                    .attr("class", "link")
                    .style("stroke-width", function(d) {
                        return Math.sqrt(d.value);
                    });
            var node = svg.selectAll(".node")
                    .data(graph.nodes)
                    .enter().append("circle")
                    .attr("class", "node")
                    .attr("r", 10)
                    .style("fill", function(d) {
                        return color(d.group);
                    })
                    .call(force.drag);
            node.append("title")
                    .text(function(d) {
                        return d.name + " (" + d.type + ")";
                    });
            force.on("tick", function() {
                link.attr("x1", function(d) {
                    return d.source.x;
                })
                        .attr("y1", function(d) {
                            return d.source.y;
                        })
                        .attr("x2", function(d) {
                            return d.target.x;
                        })
                        .attr("y2", function(d) {
                            return d.target.y;
                        });
                node.attr("cx", function(d) {
                    return d.x;
                })
                        .attr("cy", function(d) {
                            return d.y;
                        });
            });
        });
    }
});