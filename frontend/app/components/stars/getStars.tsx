import FullStar from "./fullStar"
import BlankStar from "./blankStar"

export default function Rating({ Rating } : { Rating : number }){
    const starsArray : any[] = [];
    const intRating = Math.round(Rating-1);
    for(let i = 0; i < 5; i++){
        if (i <= intRating) {
            starsArray.push(<FullStar />);
        } else {
            starsArray.push(<BlankStar />);
        }
    }
    return (
        <div className="flex mb-4">
            {starsArray}
        </div>
    )
}