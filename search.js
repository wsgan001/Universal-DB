
$(document).ready(function() {

//    var availableTags = [
//        "ActionScript",
//        "AppleScript",
//        "Asp",
//        "BASIC",
//        "C",
//        "C++",
//        "Clojure",
//        "COBOL",
//        "ColdFusion",
//        "Erlang",
//        "Fortran",
//        "Groovy",
//        "Haskell",
//        "Java",
//        "JavaScript",
//        "Lisp",
//        "Perl",
//        "PHP",
//        "Python",
//        "Ruby",
//        "Scala",
//        "Scheme"
//    ];

    var query_file = "data\\ranking\\top2000_q100_movie_imdb_to_freebase_results\\query.txt";
    var query_list;

    readFile(query_file, function(queries) {
        var words = [];
        query_list = queries;
        for (var i = 1; i < queries.length; i++) {
            words.push(queries[i]);
        }
        $("#search-box").autocomplete({
            source: words
        });
        $("#search-box").val("the replacements (2000)");
        doIt();
    });


    $('#search-button').click(function() {
        doIt();
    });

    $(document).on('change', '#topk input:radio', function(event) {
        var k = ($(this).val());
        doIt(k);
    });

    function doIt(k) {
        var q = $('#search-box').val();
//        alert(q);
        var q_index = 0;
        for (var i = 1; i < query_list.length; i++) {
            if (query_list[i] == q) {
                q_index = i;
                break;
            }
        }
        var tk;
        if (k === undefined) {
            tk = $('#topk label.active input').val();
        } else {
            tk = k;
        }
//        alert(tk);
        generateAllLists(q_index, tk);
    }
});