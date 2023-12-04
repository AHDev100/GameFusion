import Review from "../../db/models/Review.js";

export const addReview = async (reviewer : Number, review : String, rating: Number, title: String) => {
    const newReview = await Review.create({
        reviewerID: reviewer, 
        review, 
        rating, 
        title, 
        likes: 0, 
        dislikes: 0,
    }); 
    await newReview.save();
    const reviewAdded = Review.findOne({where: {publisher: reviewer, review, rating, title}});
    return reviewAdded ? true : false;
}; 

export const findAllByUser = (publisher: Number) => {
    const reviews = Review.findAll({where: {reviewerID: publisher}}); 
    return reviews; 
}; 

export const findAll = async () => {
    const reviews = Review.findAll(); 
    return reviews; 
}