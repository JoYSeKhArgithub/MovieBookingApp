const badRequestResponse = {
    error: "",
    message: "Invalid request data",
    success: false,
    data: {},
};

const validateMovieCreateRequest = async(req,res,next)=>{
    if(!req.body.name){
        badRequestResponse.error = "Movie name is required";
        return res.status(400).json(badRequestResponse);
    }

    if(!req.body.description){
        badRequestResponse.error = "Movie description is required";
        return res.status(400).json(badRequestResponse);
    }

    if(!req.body.casts || !Array.isArray(req.body.casts) || req.body.casts.length === 0){
        badRequestResponse.error = "Movie duration is casts are required ";
        return res.status(400).json(badRequestResponse);
    }

    if(!req.body.trailerUrl){
        badRequestResponse.error = "Movie trailerUrl is required";
        return res.status(400).json(badRequestResponse);
    }  

    if(!req.body.posterUrl){
        badRequestResponse.error = "Movie posterUrl is required";
        return res.status(400).json(badRequestResponse);
    }
    if(!req.body.releaseDate){
        badRequestResponse.error = "Movie releaseDate is required";
        return res.status(400).json(badRequestResponse);
    }
    if(!req.body.director){
        badRequestResponse.error = "Movie director is required";
        return res.status(400).json(badRequestResponse);
    }
    if(!req.body.language || !Array.isArray(req.body.language) || req.body.language.length === 0){
      badRequestResponse.error = "Movie language is required ";
      return res.status(400).json(badRequestResponse);
    }
    next();

}

export default {validateMovieCreateRequest}