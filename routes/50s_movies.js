var express = require('express');
var router = express.Router();
var d3 = require('d3-sparql');

/* GET Data */
router.get('/', async(req, res) => {
    try {
        var myQuery = `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX dbr: <http://dbpedia.org/resource/> 
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
        PREFIX foaf: <http://xmlns.com/foaf/0.1/> 
        
        
        
        SELECT  *
        WHERE {
            ?x rdfs:img ?img .
            ?x rdfs:name ?name .
            ?x rdfs:release ?release .
            ?x rdfs:director ?director .
            ?x rdfs:leadactor ?leadactor .
            ?x rdfs:genres ?genres .
            ?x rdfs:IMDBrating ?IMDBrating .
            ?x rdfs:AcademyAwards ?AcademyAwards .
            ?x rdfs:Synopsis ?Synopsis .
            FILTER (?release >= 1950 && ?release <1960)
        
        }`;
        
        var sparqlEndpoint = 'http://localhost:3030/vinmov/sparql';

        d3.sparql(sparqlEndpoint, myQuery).then((results) => {
            console.log(results); 
            res.render('50s_movies', {movies: results });
        });
    } catch (err) {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else if (err.request) {
            console.log(err.request);
        } else {
            console.error('Error', err.message);
        }
    }
});

module.exports = router;
